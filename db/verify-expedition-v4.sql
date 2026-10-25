-- All test accounts and their changes are rolled back together.
DO $$
DECLARE a uuid:=gen_random_uuid(); b uuid:=gen_random_uuid(); result jsonb; cp integer; kept_coins integer; kept_items integer;
BEGIN
 BEGIN
  INSERT INTO neon_auth."user"(id,name,email,"emailVerified","createdAt","updatedAt") VALUES(a,'Reset QA',a::text||'@example.invalid',false,now(),now()),(b,'Other QA',b::text||'@example.invalid',false,now(),now());
  INSERT INTO expedition.users(id,username) VALUES(a,'reset_'||substr(a::text,1,8)),(b,'other_'||substr(b::text,1,8));
  FOR cp IN 1..4 LOOP PERFORM expedition.submit_artifact_answer(a,cp,true); END LOOP;
  PERFORM expedition.submit_artifact_answer(b,1,true);
  ASSERT (SELECT sum(score)=1150 FROM expedition.route_progress WHERE user_id=a),'Cumulative score sums all four checkpoints';
  PERFORM expedition.open_artifact_pack(a);
  ASSERT (SELECT coins=0 FROM expedition.users WHERE id=a),'Satchel costs exactly 400 coins';
  BEGIN
   PERFORM expedition.open_artifact_pack(a);
   RAISE EXCEPTION 'Pack allowed without enough coins' USING ERRCODE='ZX002';
  EXCEPTION WHEN SQLSTATE 'P0001' THEN NULL; END;
  SELECT coins INTO kept_coins FROM expedition.users WHERE id=a;
  SELECT sum(quantity) INTO kept_items FROM expedition.all_inventory WHERE user_id=a;
  PERFORM expedition.reset_expedition(a);
  ASSERT NOT EXISTS(SELECT 1 FROM expedition.route_progress WHERE user_id=a AND (completed_at IS NOT NULL OR score<>0 OR attempts<>0 OR last_attempt IS NOT NULL)),'Progress and ratings reset';
  ASSERT EXISTS(SELECT 1 FROM expedition.reset_history WHERE user_id=a AND jsonb_array_length(progress)=4),'Reset archives the previous run';
  ASSERT (SELECT count(*)=4 FROM expedition.checkpoint_claims WHERE user_id=a),'Lifetime claims preserved';
  ASSERT (SELECT coins=kept_coins FROM expedition.users WHERE id=a),'Coins retained';
  ASSERT (SELECT sum(quantity)=kept_items FROM expedition.all_inventory WHERE user_id=a),'Collection retained';
  ASSERT (SELECT count(*)=1 FROM expedition.route_progress WHERE user_id=b AND completed_at IS NOT NULL),'Other player unaffected';
  result:=expedition.submit_artifact_answer(a,1,true);
  ASSERT (result->>'coins')::integer=0,'No coin farming after reset';
  ASSERT (SELECT sum(quantity)=kept_items FROM expedition.all_inventory WHERE user_id=a),'No artifact farming after reset';
  ASSERT (SELECT score=250 AND attempts=1 FROM expedition.route_progress WHERE user_id=a AND checkpoint=1),'New run scores and stars saved';
  FOR cp IN 2..5 LOOP PERFORM expedition.submit_artifact_answer(a,cp,true); END LOOP;
  ASSERT (SELECT coins=100 FROM expedition.users WHERE id=a),'Previously unclaimed checkpoints still award coins';
  ASSERT (SELECT sum(quantity)=kept_items+1 FROM expedition.all_inventory WHERE user_id=a),'Previously unclaimed checkpoint grants a treasure';
  RAISE EXCEPTION 'Rollback fixtures' USING ERRCODE='ZX001';
 EXCEPTION WHEN SQLSTATE 'ZX001' THEN NULL; END;
 RAISE NOTICE 'Reset, reward claims, satchel price, cumulative scores and player isolation verified; fixtures rolled back.';
END $$;
