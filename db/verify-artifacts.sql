-- Exercise real reward, leaderboard, pack and trade functions, then roll back fixtures.
DO $$
DECLARE a uuid:=gen_random_uuid(); b uuid:=gen_random_uuid(); result jsonb; cp integer; tid uuid; reward text; before_count integer;
BEGIN
 BEGIN
  INSERT INTO neon_auth."user"(id,name,email,"emailVerified","createdAt","updatedAt") VALUES (a,'Artifact QA A',a::text||'@example.invalid',false,now(),now()),(b,'Artifact QA B',b::text||'@example.invalid',false,now(),now());
  INSERT INTO expedition.users(id,username) VALUES(a,'art_'||substr(a::text,1,8)),(b,'art_'||substr(b::text,1,8));
  ASSERT (SELECT count(*)=24 AND sum(weight)=400 FROM expedition.artifact_catalog),'Catalog weights';
  FOR cp IN 1..60 LOOP
   result:=expedition.submit_artifact_answer(a,cp,true);
   ASSERT (result->>'completed')::boolean,'Solve is saved';
   ASSERT EXISTS(SELECT 1 FROM expedition.artifact_catalog WHERE id=result->>'reward'),'Valid random artifact';
   ASSERT EXISTS(SELECT 1 FROM expedition.route_progress p JOIN expedition.users u ON u.id=p.user_id WHERE p.user_id=a AND p.checkpoint=cp AND p.completed_at IS NOT NULL AND p.score=(result->>'score')::integer AND p.treasure_id=result->>'reward'),'Leaderboard and reward record commit together';
  END LOOP;
  ASSERT (SELECT sum(quantity)=60 FROM expedition.all_inventory WHERE user_id=a),'One draw per completion';
  ASSERT (SELECT count(DISTINCT treasure_id)>1 FROM expedition.route_progress WHERE user_id=a),'Rewards vary across the route';
  result:=expedition.submit_artifact_answer(a,60,true);
  ASSERT (result->>'alreadyCompleted')::boolean,'Replay protection';
  ASSERT (SELECT sum(quantity)=60 FROM expedition.all_inventory WHERE user_id=a),'No reroll on replay';
  reward:=expedition.open_artifact_pack(a);
  ASSERT (SELECT coins=7100 FROM expedition.users WHERE id=a),'Pack debit';
  ASSERT (SELECT sum(quantity)=61 FROM expedition.all_inventory WHERE user_id=a),'Pack artifact saved';
  INSERT INTO expedition.inventory VALUES(a,'compass',2);
  PERFORM expedition.grant_artifact(b,'phoenix');
  tid:=expedition.make_artifact_trade(a,'compass','phoenix');
  PERFORM expedition.finish_artifact_trade(b,tid,false);
  ASSERT (SELECT quantity>=1 FROM expedition.all_inventory WHERE user_id=a AND treasure_id='phoenix'),'New artifact trade received';
  ASSERT (SELECT quantity=1 FROM expedition.all_inventory WHERE user_id=b AND treasure_id='compass'),'Legacy artifact trade received';
  BEGIN
   PERFORM expedition.finish_artifact_trade(b,tid,false);
   RAISE EXCEPTION 'Repeated trade accepted' USING ERRCODE='ZX002';
  EXCEPTION WHEN SQLSTATE 'P0001' THEN NULL; END;
  -- Old offers remain usable, including payment with a newly drawn legacy artifact.
  tid:=expedition.make_trade(a,'compass','scarab');
  PERFORM expedition.grant_artifact(b,'scarab');
  PERFORM expedition.finish_artifact_trade(b,tid,false);
  ASSERT (SELECT status='accepted' FROM expedition.trades WHERE id=tid),'Old offer accepted';
  tid:=expedition.make_artifact_trade(a,'phoenix','orb');
  SELECT quantity INTO before_count FROM expedition.all_inventory WHERE user_id=a AND treasure_id='phoenix';
  PERFORM expedition.finish_artifact_trade(a,tid,true);
  ASSERT (SELECT quantity=before_count+1 FROM expedition.all_inventory WHERE user_id=a AND treasure_id='phoenix'),'Escrow refund';
  ASSERT NOT EXISTS(SELECT 1 FROM expedition.all_inventory WHERE quantity<0),'Inventory remains nonnegative';
  RAISE EXCEPTION 'Rollback successful fixtures' USING ERRCODE='ZX001';
 EXCEPTION WHEN SQLSTATE 'ZX001' THEN NULL; END;
 RAISE NOTICE 'Artifact, score, pack and trade integration checks passed; fixtures rolled back.';
END $$;
