-- Rollback-only integration checks for the 60-checkpoint route.
DO $$
DECLARE uid uuid:=gen_random_uuid(); result jsonb; cp integer;
BEGIN
 BEGIN
  INSERT INTO neon_auth."user"(id,name,email,"emailVerified","createdAt","updatedAt") VALUES(uid,'Route QA',uid::text||'@example.invalid',false,now(),now());
  INSERT INTO expedition.users(id,username) VALUES(uid,'route_'||substr(uid::text,1,8));
  BEGIN
   PERFORM expedition.submit_route_answer(uid,2,true);
   RAISE EXCEPTION 'Skip accepted' USING ERRCODE='ZX002';
  EXCEPTION WHEN SQLSTATE 'P0001' THEN NULL;
  END;
  BEGIN
   PERFORM expedition.submit_route_answer(uid,61,true);
   RAISE EXCEPTION 'Invalid checkpoint accepted' USING ERRCODE='ZX002';
  EXCEPTION WHEN SQLSTATE 'P0001' THEN NULL;
  END;
  result:=expedition.submit_route_answer(uid,1,false);
  ASSERT NOT (result->>'completed')::boolean,'Incorrect answer recorded';
  BEGIN
   PERFORM expedition.submit_route_answer(uid,1,true);
   RAISE EXCEPTION 'Rate limit bypassed' USING ERRCODE='ZX002';
  EXCEPTION WHEN SQLSTATE 'P0001' THEN NULL;
  END;
  UPDATE expedition.route_progress SET last_attempt=now()-interval '3 seconds' WHERE user_id=uid AND checkpoint=1;
  result:=expedition.submit_route_answer(uid,1,true);
  ASSERT (result->>'score')::integer=225,'Wrong answer penalty';
  INSERT INTO expedition.route_progress(user_id,checkpoint,attempts,completed_at,score) VALUES(uid,11,1,now(),500);
  BEGIN
   PERFORM expedition.submit_route_answer(uid,12,true);
   RAISE EXCEPTION 'Legacy gap bypassed' USING ERRCODE='ZX002';
  EXCEPTION WHEN SQLSTATE 'P0001' THEN NULL;
  END;
  -- Simulate the pre-existing reward for checkpoint 11 without changing real users.
  UPDATE expedition.users SET coins=coins+100 WHERE id=uid;
  INSERT INTO expedition.inventory VALUES(uid,'scarab',1);
  FOR cp IN 2..60 LOOP
   result:=expedition.submit_route_answer(uid,cp,true);
   IF cp%10=0 THEN
    ASSERT (result->>'coins')::integer=300,'Finale coins';
    ASSERT (result->>'score')::integer=((cp-1)/10+1)*250+225+1000,'Finale points';
   END IF;
  END LOOP;
  ASSERT (SELECT count(*)=60 FROM expedition.route_progress WHERE user_id=uid AND completed_at IS NOT NULL),'All checkpoints complete';
  ASSERT (SELECT coins=7200 FROM expedition.users WHERE id=uid),'Full route coins';
  ASSERT (SELECT sum(quantity)=60 FROM expedition.inventory WHERE user_id=uid),'Full route treasure rewards';
  result:=expedition.submit_route_answer(uid,60,true);
  ASSERT (result->>'alreadyCompleted')::boolean,'Duplicate completion';
  ASSERT (SELECT coins=7200 FROM expedition.users WHERE id=uid),'No repeat rewards';
  ASSERT (SELECT score=500 FROM expedition.route_progress WHERE user_id=uid AND checkpoint=11),'Preserved score';
  RAISE EXCEPTION 'Rollback successful fixtures' USING ERRCODE='ZX001';
 EXCEPTION WHEN SQLSTATE 'ZX001' THEN NULL;
 END;
 RAISE NOTICE 'Route integration checks passed; fixtures rolled back.';
END $$;
