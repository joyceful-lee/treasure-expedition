-- Preserve lifetime reward claims across optional progress resets.
CREATE TABLE IF NOT EXISTS expedition.checkpoint_claims(user_id uuid REFERENCES expedition.users(id),checkpoint integer CHECK(checkpoint BETWEEN 1 AND 60),treasure_id text REFERENCES expedition.artifact_catalog(id),PRIMARY KEY(user_id,checkpoint));
INSERT INTO expedition.checkpoint_claims(user_id,checkpoint,treasure_id) SELECT user_id,checkpoint,treasure_id FROM expedition.route_progress WHERE completed_at IS NOT NULL ON CONFLICT DO NOTHING;
CREATE TABLE IF NOT EXISTS expedition.reset_history(id uuid PRIMARY KEY DEFAULT gen_random_uuid(),user_id uuid NOT NULL REFERENCES expedition.users(id),reset_at timestamptz NOT NULL DEFAULT now(),progress jsonb NOT NULL);
REVOKE ALL ON expedition.checkpoint_claims,expedition.reset_history FROM PUBLIC;
CREATE OR REPLACE FUNCTION expedition.open_artifact_pack(uid uuid) RETURNS text LANGUAGE plpgsql AS $$
DECLARE reward text;
BEGIN
 UPDATE expedition.users SET coins=coins-400 WHERE id=uid AND coins>=400;
 IF NOT FOUND THEN RAISE EXCEPTION 'You need 400 coins to open a pack.'; END IF;
 reward:=expedition.draw_artifact(); PERFORM expedition.grant_artifact(uid,reward); RETURN reward;
END $$;
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
 UPDATE expedition.route_progress SET completed_at=now(),score=pts,treasure_id=reward WHERE user_id=uid AND checkpoint=cp;
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
 UPDATE expedition.route_progress SET attempts=0,last_attempt=NULL,completed_at=NULL,score=0,treasure_id=NULL WHERE user_id=uid;
END $$;
REVOKE EXECUTE ON FUNCTION expedition.reset_expedition(uuid) FROM PUBLIC;
