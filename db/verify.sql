-- Integration checks run in a subtransaction that is rolled back deliberately.
-- This leaves no test accounts, scores, treasures, or trades behind.
DO $$
DECLARE a uuid:=gen_random_uuid(); b uuid:=gen_random_uuid(); result jsonb; tid uuid; before_coins integer; after_coins integer;
BEGIN
 BEGIN
  INSERT INTO neon_auth."user"(id,name,email,"emailVerified","createdAt","updatedAt") VALUES
  (a,'QA Explorer A',a::text||'@example.invalid',false,now(),now()),
  (b,'QA Explorer B',b::text||'@example.invalid',false,now(),now());
  INSERT INTO expedition.users(id,username) VALUES(a,'qa_'||substr(a::text,1,8)),(b,'qa_'||substr(b::text,1,8));
  BEGIN
   PERFORM expedition.submit_answer(a,2,true);
   RAISE EXCEPTION 'Locked checkpoint accepted' USING ERRCODE='ZX002';
  EXCEPTION WHEN SQLSTATE 'P0001' THEN NULL;
  END;
  result:=expedition.submit_answer(a,1,true);
  ASSERT (result->>'score')::integer=250,'First solve score';
  result:=expedition.submit_answer(a,1,true);
  ASSERT (result->>'alreadyCompleted')::boolean,'Duplicate solve protection';
  SELECT coins INTO before_coins FROM expedition.users WHERE id=a;
  ASSERT before_coins=100,'Reward only once';
  ASSERT (SELECT quantity=1 FROM expedition.inventory WHERE user_id=a AND treasure_id='compass'),'Treasure only once';
  result:=expedition.submit_answer(a,2,false);
  ASSERT NOT (result->>'completed')::boolean,'Incorrect answer recorded';
  ASSERT (SELECT attempts=1 FROM expedition.progress WHERE user_id=a AND checkpoint=2),'Attempts recorded';
  UPDATE expedition.progress SET last_attempt=now()-interval '3 seconds' WHERE user_id=a AND checkpoint=2;
  result:=expedition.submit_answer(a,2,true);
  ASSERT (result->>'score')::integer=475,'Wrong-answer score penalty';
  INSERT INTO expedition.inventory VALUES(b,'scarab',1);
  tid:=expedition.make_trade(a,'compass','scarab');
  ASSERT (SELECT quantity=0 FROM expedition.inventory WHERE user_id=a AND treasure_id='compass'),'Trade reserves treasure';
  PERFORM expedition.finish_trade(b,tid,false);
  ASSERT (SELECT quantity=1 FROM expedition.inventory WHERE user_id=b AND treasure_id='compass'),'Taker receives offered treasure';
  ASSERT (SELECT quantity=0 FROM expedition.inventory WHERE user_id=b AND treasure_id='scarab'),'Taker pays requested treasure';
  ASSERT (SELECT quantity>=2 FROM expedition.inventory WHERE user_id=a AND treasure_id='scarab'),'Maker receives requested treasure';
  BEGIN
   PERFORM expedition.finish_trade(b,tid,false);
   RAISE EXCEPTION 'Double accept succeeded' USING ERRCODE='ZX002';
  EXCEPTION WHEN SQLSTATE 'P0001' THEN NULL;
  END;
  tid:=expedition.make_trade(b,'compass','moon');
  PERFORM expedition.finish_trade(b,tid,true);
  ASSERT (SELECT quantity=1 FROM expedition.inventory WHERE user_id=b AND treasure_id='compass'),'Cancellation returns escrow';
  ASSERT NOT EXISTS(SELECT 1 FROM expedition.inventory WHERE quantity<0),'No negative inventory';
  PERFORM expedition.open_pack(a);
  SELECT coins INTO after_coins FROM expedition.users WHERE id=a;
  ASSERT after_coins=100,'Pack costs 100 coins';
  RAISE EXCEPTION 'Rollback successful verification fixtures' USING ERRCODE='ZX001';
 EXCEPTION WHEN SQLSTATE 'ZX001' THEN NULL;
 END;
 RAISE NOTICE 'All integration checks passed. Test fixtures rolled back.';
END $$;
