CREATE SCHEMA IF NOT EXISTS expedition;
CREATE TABLE IF NOT EXISTS expedition.users (
 id uuid PRIMARY KEY REFERENCES neon_auth."user"(id) ON DELETE CASCADE,
 username text NOT NULL UNIQUE CHECK (username ~ '^[a-zA-Z0-9_]{3,20}$'),
 coins integer NOT NULL DEFAULT 0 CHECK (coins >= 0), created_at timestamptz NOT NULL DEFAULT now()
);
CREATE UNIQUE INDEX IF NOT EXISTS username_lower ON expedition.users(lower(username));
CREATE TABLE IF NOT EXISTS expedition.progress (
 user_id uuid REFERENCES expedition.users(id) ON DELETE CASCADE, checkpoint integer CHECK(checkpoint BETWEEN 1 AND 6),
 attempts integer NOT NULL DEFAULT 0, last_attempt timestamptz, completed_at timestamptz, score integer NOT NULL DEFAULT 0,
 PRIMARY KEY(user_id, checkpoint)
);
CREATE TABLE IF NOT EXISTS expedition.inventory (
 user_id uuid REFERENCES expedition.users(id) ON DELETE CASCADE,
 treasure_id text CHECK(treasure_id IN ('compass','scarab','vase','gem','moon','crown')), quantity integer NOT NULL CHECK(quantity>=0), PRIMARY KEY(user_id,treasure_id)
);
CREATE TABLE IF NOT EXISTS expedition.trades (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), maker_id uuid NOT NULL REFERENCES expedition.users(id) ON DELETE CASCADE,
 offered text NOT NULL CHECK(offered IN ('compass','scarab','vase','gem','moon','crown')),
 requested text NOT NULL CHECK(requested IN ('compass','scarab','vase','gem','moon','crown')),
 status text NOT NULL DEFAULT 'open' CHECK(status IN ('open','accepted','cancelled')), taker_id uuid REFERENCES expedition.users(id),
 created_at timestamptz DEFAULT now(), CHECK(offered <> requested)
);
CREATE INDEX IF NOT EXISTS leaderboard_score ON expedition.progress(checkpoint,score DESC,completed_at) WHERE completed_at IS NOT NULL;
CREATE INDEX IF NOT EXISTS trades_open ON expedition.trades(created_at DESC) WHERE status='open';
-- Keep user tables inaccessible to browser database roles. All access uses authenticated server routes.
REVOKE ALL ON SCHEMA expedition FROM PUBLIC;
REVOKE ALL ON ALL TABLES IN SCHEMA expedition FROM PUBLIC;

CREATE OR REPLACE FUNCTION expedition.submit_answer(uid uuid, cp integer, correct boolean)
RETURNS jsonb LANGUAGE plpgsql AS $$
DECLARE p expedition.progress; pts integer; reward text;
BEGIN
 PERFORM 1 FROM expedition.users WHERE id=uid FOR UPDATE;
 IF NOT FOUND THEN RAISE EXCEPTION 'Create your explorer profile first.'; END IF;
 IF cp NOT BETWEEN 1 AND 6 THEN RAISE EXCEPTION 'Unknown checkpoint.'; END IF;
 IF cp>1 AND NOT EXISTS(SELECT 1 FROM expedition.progress WHERE user_id=uid AND checkpoint=cp-1 AND completed_at IS NOT NULL) THEN RAISE EXCEPTION 'Complete the previous checkpoint first.'; END IF;
 INSERT INTO expedition.progress(user_id,checkpoint) VALUES(uid,cp) ON CONFLICT DO NOTHING;
 SELECT * INTO p FROM expedition.progress WHERE user_id=uid AND checkpoint=cp;
 IF p.completed_at IS NOT NULL THEN RETURN jsonb_build_object('completed',true,'alreadyCompleted',true,'score',p.score); END IF;
 IF p.last_attempt > now()-interval '2 seconds' THEN RAISE EXCEPTION 'Take a breath! Try again in two seconds.'; END IF;
 UPDATE expedition.progress SET attempts=attempts+1,last_attempt=now() WHERE user_id=uid AND checkpoint=cp RETURNING * INTO p;
 IF NOT correct THEN RETURN jsonb_build_object('completed',false,'attempts',p.attempts); END IF;
 pts:=greatest(100,cp*250-(p.attempts-1)*25);
 reward:=(ARRAY['compass','scarab','vase','gem','moon','crown'])[cp];
 UPDATE expedition.progress SET completed_at=now(),score=pts WHERE user_id=uid AND checkpoint=cp;
 UPDATE expedition.users SET coins=coins+100 WHERE id=uid;
 INSERT INTO expedition.inventory VALUES(uid,reward,1) ON CONFLICT(user_id,treasure_id) DO UPDATE SET quantity=expedition.inventory.quantity+1;
 RETURN jsonb_build_object('completed',true,'score',pts,'reward',reward,'coins',100);
END $$;

CREATE OR REPLACE FUNCTION expedition.open_pack(uid uuid)
RETURNS text LANGUAGE plpgsql AS $$
DECLARE reward text; roll float;
BEGIN
 UPDATE expedition.users SET coins=coins-100 WHERE id=uid AND coins>=100;
 IF NOT FOUND THEN RAISE EXCEPTION 'You need 100 coins to open a pack.'; END IF;
 roll:=random();
 reward:=CASE WHEN roll<0.4 THEN 'compass' WHEN roll<0.65 THEN 'scarab' WHEN roll<0.85 THEN 'vase' WHEN roll<0.93 THEN 'gem' WHEN roll<0.99 THEN 'moon' ELSE 'crown' END;
 INSERT INTO expedition.inventory VALUES(uid,reward,1) ON CONFLICT(user_id,treasure_id) DO UPDATE SET quantity=expedition.inventory.quantity+1;
 RETURN reward;
END $$;

CREATE OR REPLACE FUNCTION expedition.make_trade(uid uuid, offered_item text, requested_item text)
RETURNS uuid LANGUAGE plpgsql AS $$
DECLARE trade_id uuid;
BEGIN
 IF offered_item=requested_item OR requested_item NOT IN ('compass','scarab','vase','gem','moon','crown') THEN RAISE EXCEPTION 'Choose two different treasures.'; END IF;
 PERFORM 1 FROM expedition.users WHERE id=uid FOR UPDATE;
 IF (SELECT count(*) FROM expedition.trades WHERE maker_id=uid AND status='open')>=5 THEN RAISE EXCEPTION 'You can have up to five open trades.'; END IF;
 UPDATE expedition.inventory SET quantity=quantity-1 WHERE user_id=uid AND treasure_id=offered_item AND quantity>0;
 IF NOT FOUND THEN RAISE EXCEPTION 'You do not have that treasure to trade.'; END IF;
 INSERT INTO expedition.trades(maker_id,offered,requested) VALUES(uid,offered_item,requested_item) RETURNING id INTO trade_id;
 RETURN trade_id;
END $$;

CREATE OR REPLACE FUNCTION expedition.finish_trade(uid uuid, tid uuid, cancel_offer boolean)
RETURNS void LANGUAGE plpgsql AS $$
DECLARE t expedition.trades;
BEGIN
 SELECT * INTO t FROM expedition.trades WHERE id=tid FOR UPDATE;
 IF NOT FOUND OR t.status<>'open' THEN RAISE EXCEPTION 'This trade is no longer available.'; END IF;
 -- Lock both profiles in a consistent order to serialize inventory exchanges.
 PERFORM 1 FROM expedition.users WHERE id IN(uid,t.maker_id) ORDER BY id FOR UPDATE;
 IF cancel_offer THEN
  IF uid<>t.maker_id THEN RAISE EXCEPTION 'Only the explorer who posted this trade can cancel it.'; END IF;
  INSERT INTO expedition.inventory VALUES(uid,t.offered,1) ON CONFLICT(user_id,treasure_id) DO UPDATE SET quantity=expedition.inventory.quantity+1;
  UPDATE expedition.trades SET status='cancelled' WHERE id=tid;
 ELSE
  IF uid=t.maker_id THEN RAISE EXCEPTION 'You cannot accept your own trade.'; END IF;
  UPDATE expedition.inventory SET quantity=quantity-1 WHERE user_id=uid AND treasure_id=t.requested AND quantity>0;
  IF NOT FOUND THEN RAISE EXCEPTION 'You need the requested treasure to accept this trade.'; END IF;
  INSERT INTO expedition.inventory VALUES(uid,t.offered,1) ON CONFLICT(user_id,treasure_id) DO UPDATE SET quantity=expedition.inventory.quantity+1;
  INSERT INTO expedition.inventory VALUES(t.maker_id,t.requested,1) ON CONFLICT(user_id,treasure_id) DO UPDATE SET quantity=expedition.inventory.quantity+1;
  UPDATE expedition.trades SET status='accepted',taker_id=uid WHERE id=tid;
 END IF;
END $$;
REVOKE EXECUTE ON ALL FUNCTIONS IN SCHEMA expedition FROM PUBLIC;
