-- Expand the expedition without deleting or rewriting the original progress ledger.
CREATE TABLE IF NOT EXISTS expedition.route_progress (
 user_id uuid REFERENCES expedition.users(id) ON DELETE CASCADE,
 checkpoint integer CHECK(checkpoint BETWEEN 1 AND 60),
 attempts integer NOT NULL DEFAULT 0, last_attempt timestamptz,
 completed_at timestamptz, score integer NOT NULL DEFAULT 0,
 PRIMARY KEY(user_id,checkpoint)
);
CREATE INDEX IF NOT EXISTS route_leaderboard_score ON expedition.route_progress(checkpoint,score DESC,completed_at) WHERE completed_at IS NOT NULL;
REVOKE ALL ON expedition.route_progress FROM PUBLIC;
-- The original six clues remain at the start of their corresponding regions.
-- Both completed and attempted records keep their original score and timestamps.
INSERT INTO expedition.route_progress(user_id,checkpoint,attempts,last_attempt,completed_at,score)
SELECT user_id,(checkpoint-1)*10+1,attempts,last_attempt,completed_at,score FROM expedition.progress
ON CONFLICT(user_id,checkpoint) DO NOTHING;

CREATE OR REPLACE FUNCTION expedition.submit_route_answer(uid uuid, cp integer, correct boolean)
RETURNS jsonb LANGUAGE plpgsql AS $$
DECLARE p expedition.route_progress; pts integer; reward text; coins_earned integer; region_number integer;
BEGIN
 PERFORM 1 FROM expedition.users WHERE id=uid FOR UPDATE;
 IF NOT FOUND THEN RAISE EXCEPTION 'Create your explorer profile first.'; END IF;
 IF cp NOT BETWEEN 1 AND 60 THEN RAISE EXCEPTION 'Unknown checkpoint.'; END IF;
 SELECT * INTO p FROM expedition.route_progress WHERE user_id=uid AND checkpoint=cp;
 IF p.completed_at IS NOT NULL THEN RETURN jsonb_build_object('completed',true,'alreadyCompleted',true,'score',p.score); END IF;
 IF (SELECT count(*) FROM expedition.route_progress WHERE user_id=uid AND checkpoint<cp AND completed_at IS NOT NULL)<>cp-1 THEN RAISE EXCEPTION 'Complete all earlier checkpoints before attempting this one.'; END IF;
 INSERT INTO expedition.route_progress(user_id,checkpoint) VALUES(uid,cp) ON CONFLICT DO NOTHING;
 SELECT * INTO p FROM expedition.route_progress WHERE user_id=uid AND checkpoint=cp;
 IF p.last_attempt > now()-interval '2 seconds' THEN RAISE EXCEPTION 'Please wait two seconds before submitting another answer.'; END IF;
 UPDATE expedition.route_progress SET attempts=attempts+1,last_attempt=now() WHERE user_id=uid AND checkpoint=cp RETURNING * INTO p;
 IF NOT correct THEN RETURN jsonb_build_object('completed',false,'attempts',p.attempts); END IF;
 region_number:=(cp-1)/10+1;
 pts:=greatest(100,region_number*250+((cp-1)%10)*25+CASE WHEN cp%10=0 THEN 1000 ELSE 0 END-(p.attempts-1)*25);
 coins_earned:=CASE WHEN cp%10=0 THEN 300 ELSE 100 END;
 reward:=(ARRAY['compass','scarab','vase','gem','moon','crown'])[region_number];
 UPDATE expedition.route_progress SET completed_at=now(),score=pts WHERE user_id=uid AND checkpoint=cp;
 UPDATE expedition.users SET coins=coins+coins_earned WHERE id=uid;
 INSERT INTO expedition.inventory VALUES(uid,reward,1) ON CONFLICT(user_id,treasure_id) DO UPDATE SET quantity=expedition.inventory.quantity+1;
 RETURN jsonb_build_object('completed',true,'score',pts,'reward',reward,'coins',coins_earned);
END $$;
REVOKE EXECUTE ON FUNCTION expedition.submit_route_answer(uuid,integer,boolean) FROM PUBLIC;
