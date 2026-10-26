ALTER TABLE expedition.route_progress ADD COLUMN IF NOT EXISTS started_at timestamptz;
ALTER TABLE expedition.route_progress ADD COLUMN IF NOT EXISTS duration_ms bigint CHECK(duration_ms>0);
ALTER TABLE expedition.artifact_catalog ADD COLUMN IF NOT EXISTS sell_price integer NOT NULL DEFAULT 40 CHECK(sell_price>0);
UPDATE expedition.artifact_catalog SET sell_price=CASE rarity WHEN 'Common' THEN 40 WHEN 'Uncommon' THEN 100 WHEN 'Rare' THEN 240 WHEN 'Epic' THEN 600 ELSE 1500 END;
CREATE TABLE IF NOT EXISTS expedition.trade_notifications(id uuid PRIMARY KEY DEFAULT gen_random_uuid(),user_id uuid NOT NULL REFERENCES expedition.users(id),trade_id uuid NOT NULL UNIQUE,taker_id uuid NOT NULL REFERENCES expedition.users(id),offered text NOT NULL REFERENCES expedition.artifact_catalog(id),received text NOT NULL REFERENCES expedition.artifact_catalog(id),created_at timestamptz NOT NULL DEFAULT clock_timestamp(),read_at timestamptz);
CREATE INDEX IF NOT EXISTS unread_trade_notifications ON expedition.trade_notifications(user_id,created_at DESC) WHERE read_at IS NULL;
REVOKE ALL ON expedition.trade_notifications FROM PUBLIC;
CREATE OR REPLACE FUNCTION expedition.begin_checkpoint(uid uuid,cp integer) RETURNS void LANGUAGE plpgsql AS $$
BEGIN
 PERFORM 1 FROM expedition.users WHERE id=uid FOR UPDATE;
 IF NOT FOUND THEN RAISE EXCEPTION 'Create your explorer profile first.'; END IF;
 IF cp NOT BETWEEN 1 AND 60 THEN RAISE EXCEPTION 'Unknown checkpoint.'; END IF;
 IF EXISTS(SELECT 1 FROM expedition.route_progress WHERE user_id=uid AND checkpoint=cp AND completed_at IS NOT NULL) THEN RETURN; END IF;
 IF (SELECT count(*) FROM expedition.route_progress WHERE user_id=uid AND checkpoint<cp AND completed_at IS NOT NULL)<>cp-1 THEN RAISE EXCEPTION 'Complete the earlier checkpoints first.'; END IF;
 INSERT INTO expedition.route_progress(user_id,checkpoint,started_at) VALUES(uid,cp,clock_timestamp()) ON CONFLICT(user_id,checkpoint) DO UPDATE SET started_at=coalesce(expedition.route_progress.started_at,excluded.started_at);
END $$;
CREATE OR REPLACE FUNCTION expedition.sell_artifact(uid uuid,item text) RETURNS integer LANGUAGE plpgsql AS $$
DECLARE price integer;
BEGIN
 SELECT sell_price INTO price FROM expedition.artifact_catalog WHERE id=item;
 IF price IS NULL THEN RAISE EXCEPTION 'Choose a treasure from your collection.'; END IF;
 PERFORM expedition.take_artifact(uid,item);
 UPDATE expedition.users SET coins=coins+price WHERE id=uid;
 RETURN price;
END $$;
CREATE OR REPLACE FUNCTION expedition.exchange_artifact_trade(uid uuid,tid uuid,cancel_offer boolean) RETURNS jsonb LANGUAGE plpgsql AS $$
DECLARE t record; other_name text;
BEGIN
 SELECT * INTO t FROM expedition.all_trades WHERE id=tid;
 PERFORM expedition.finish_artifact_trade(uid,tid,cancel_offer);
 IF cancel_offer THEN RETURN jsonb_build_object('cancelled',true); END IF;
 INSERT INTO expedition.trade_notifications(user_id,trade_id,taker_id,offered,received) VALUES(t.maker_id,tid,uid,t.offered,t.requested);
 SELECT username INTO other_name FROM expedition.users WHERE id=t.maker_id;
 RETURN jsonb_build_object('username',other_name,'given',t.requested,'received',t.offered);
END $$;
REVOKE EXECUTE ON FUNCTION expedition.begin_checkpoint(uuid,integer),expedition.sell_artifact(uuid,text),expedition.exchange_artifact_trade(uuid,uuid,boolean) FROM PUBLIC;
CREATE OR REPLACE FUNCTION expedition.submit_artifact_answer(uid uuid,cp integer,correct boolean) RETURNS jsonb LANGUAGE plpgsql AS $$
DECLARE p expedition.route_progress; pts integer; reward text; coins_earned integer; first_claim boolean;
BEGIN
 PERFORM 1 FROM expedition.users WHERE id=uid FOR UPDATE;
 IF NOT FOUND THEN RAISE EXCEPTION 'Create your explorer profile first.'; END IF;
 IF cp NOT BETWEEN 1 AND 60 THEN RAISE EXCEPTION 'Unknown checkpoint.'; END IF;
 SELECT * INTO p FROM expedition.route_progress WHERE user_id=uid AND checkpoint=cp;
 IF p.completed_at IS NOT NULL THEN RETURN jsonb_build_object('completed',true,'alreadyCompleted',true,'score',p.score,'reward',p.treasure_id); END IF;
 IF (SELECT count(*) FROM expedition.route_progress WHERE user_id=uid AND checkpoint<cp AND completed_at IS NOT NULL)<>cp-1 THEN RAISE EXCEPTION 'Complete all earlier checkpoints before attempting this one.'; END IF;
 INSERT INTO expedition.route_progress(user_id,checkpoint) VALUES(uid,cp) ON CONFLICT DO NOTHING;
 SELECT * INTO p FROM expedition.route_progress WHERE user_id=uid AND checkpoint=cp;
 IF p.last_attempt>now()-interval '2 seconds' THEN RAISE EXCEPTION 'Please wait two seconds before submitting another answer.'; END IF;
 UPDATE expedition.route_progress SET attempts=attempts+1,last_attempt=now() WHERE user_id=uid AND checkpoint=cp RETURNING * INTO p;
 IF NOT correct THEN RETURN jsonb_build_object('completed',false,'attempts',p.attempts); END IF;
 pts:=greatest(100,((cp-1)/10+1)*250+((cp-1)%10)*25+CASE WHEN cp%10=0 THEN 1000 ELSE 0 END-(p.attempts-1)*25);
 coins_earned:=CASE WHEN cp%10=0 THEN 300 ELSE 100 END;
 INSERT INTO expedition.checkpoint_claims(user_id,checkpoint) VALUES(uid,cp) ON CONFLICT DO NOTHING;
 first_claim:=FOUND;
 IF first_claim THEN
  reward:=expedition.draw_artifact();
  UPDATE expedition.checkpoint_claims SET treasure_id=reward WHERE user_id=uid AND checkpoint=cp;
 ELSE
  coins_earned:=0;
  SELECT treasure_id INTO reward FROM expedition.checkpoint_claims WHERE user_id=uid AND checkpoint=cp;
 END IF;
 UPDATE expedition.route_progress SET completed_at=clock_timestamp(),duration_ms=CASE WHEN started_at IS NOT NULL THEN greatest(1,floor(extract(epoch FROM (clock_timestamp()-started_at))*1000))::bigint ELSE NULL END,score=pts,treasure_id=reward WHERE user_id=uid AND checkpoint=cp;
 UPDATE expedition.users SET coins=coins+coins_earned WHERE id=uid;
 IF first_claim THEN PERFORM expedition.grant_artifact(uid,reward); END IF;
 RETURN jsonb_build_object('completed',true,'score',pts,'reward',reward,'coins',coins_earned);
END $$;

CREATE OR REPLACE FUNCTION expedition.reset_expedition(uid uuid) RETURNS void LANGUAGE plpgsql AS $$
BEGIN
 PERFORM 1 FROM expedition.users WHERE id=uid FOR UPDATE;
 IF NOT FOUND THEN RAISE EXCEPTION 'Create your explorer profile first.'; END IF;
 INSERT INTO expedition.reset_history(user_id,progress) SELECT uid,coalesce(jsonb_agg(to_jsonb(p)),'[]'::jsonb) FROM expedition.route_progress p WHERE user_id=uid;
 INSERT INTO expedition.checkpoint_claims(user_id,checkpoint,treasure_id) SELECT user_id,checkpoint,treasure_id FROM expedition.route_progress WHERE user_id=uid AND completed_at IS NOT NULL ON CONFLICT DO NOTHING;
 UPDATE expedition.route_progress SET attempts=0,last_attempt=NULL,completed_at=NULL,score=0,treasure_id=NULL,started_at=NULL,duration_ms=NULL WHERE user_id=uid;
END $$;
