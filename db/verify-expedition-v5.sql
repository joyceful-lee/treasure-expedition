DO $$
DECLARE a uuid:=gen_random_uuid(); b uuid:=gen_random_uuid(); result jsonb; tid uuid; cp integer; price integer; first_start timestamptz; old_coins integer; qty integer;
BEGIN
 BEGIN
  INSERT INTO neon_auth."user"(id,name,email,"emailVerified","createdAt","updatedAt") VALUES(a,'V5 QA A',a::text||'@example.invalid',false,now(),now()),(b,'V5 QA B',b::text||'@example.invalid',false,now(),now());
  INSERT INTO expedition.users(id,username) VALUES(a,'v5a_'||substr(a::text,1,8)),(b,'v5b_'||substr(b::text,1,8));
  PERFORM expedition.begin_checkpoint(a,1);
  SELECT started_at INTO first_start FROM expedition.route_progress WHERE user_id=a AND checkpoint=1;
  PERFORM expedition.begin_checkpoint(a,1);
  ASSERT (SELECT started_at=first_start FROM expedition.route_progress WHERE user_id=a AND checkpoint=1),'Reopening never restarts the timer';
  UPDATE expedition.route_progress SET started_at=clock_timestamp()-interval '7 seconds' WHERE user_id=a AND checkpoint=1;
  PERFORM expedition.submit_artifact_answer(a,1,true);
  ASSERT (SELECT duration_ms>=7000 FROM expedition.route_progress WHERE user_id=a AND checkpoint=1),'Duration measured on server';
  PERFORM expedition.submit_artifact_answer(b,1,true);
  ASSERT (SELECT duration_ms IS NULL FROM expedition.route_progress WHERE user_id=b AND checkpoint=1),'No fabricated timing';
  PERFORM expedition.grant_artifact(a,'coin'); PERFORM expedition.grant_artifact(b,'moon');
  tid:=expedition.make_artifact_trade(a,'coin','moon');
  result:=expedition.exchange_artifact_trade(b,tid,false);
  ASSERT result->>'given'='moon' AND result->>'received'='coin','Taker confirmation records both sides';
  ASSERT (SELECT count(*)=1 FROM expedition.trade_notifications WHERE user_id=a AND trade_id=tid AND taker_id=b AND offered='coin' AND received='moon' AND read_at IS NULL),'Only maker gets an unread notification';
  ASSERT NOT EXISTS(SELECT 1 FROM expedition.trade_notifications WHERE user_id=b),'No notice leaks to taker';
  BEGIN
   PERFORM expedition.exchange_artifact_trade(b,tid,false);
   RAISE EXCEPTION 'Duplicate trade accepted' USING ERRCODE='ZX002';
  EXCEPTION WHEN SQLSTATE 'P0001' THEN NULL; END;
  UPDATE expedition.trade_notifications SET read_at=clock_timestamp() WHERE user_id=a AND trade_id=tid;
  ASSERT NOT EXISTS(SELECT 1 FROM expedition.trade_notifications WHERE user_id=a AND read_at IS NULL),'Notifications dismiss persistently';
  SELECT coins INTO old_coins FROM expedition.users WHERE id=a;
  SELECT quantity INTO qty FROM expedition.all_inventory WHERE user_id=a AND treasure_id='moon';
  price:=expedition.sell_artifact(a,'moon');
  ASSERT price=240,'Rare sale price';
  ASSERT (SELECT coins=old_coins+240 FROM expedition.users WHERE id=a),'Sale credits coins';
  ASSERT (SELECT quantity=qty-1 FROM expedition.all_inventory WHERE user_id=a AND treasure_id='moon'),'Sale debits a single artifact';
  PERFORM expedition.grant_artifact(a,'phoenix');
  tid:=expedition.make_artifact_trade(a,'phoenix','orb');
  BEGIN
   PERFORM expedition.sell_artifact(a,'phoenix');
   RAISE EXCEPTION 'Escrow treasure sold' USING ERRCODE='ZX002';
  EXCEPTION WHEN SQLSTATE 'P0001' THEN NULL; END;
  PERFORM expedition.exchange_artifact_trade(a,tid,true);
  ASSERT NOT EXISTS(SELECT 1 FROM expedition.trade_notifications WHERE trade_id=tid),'Cancelled trades do not notify';
  FOR cp IN 2..60 LOOP
   PERFORM expedition.begin_checkpoint(a,cp);
   PERFORM expedition.submit_artifact_answer(a,cp,true);
  END LOOP;
  ASSERT (SELECT count(*)=60 AND count(duration_ms)=60 FROM expedition.route_progress WHERE user_id=a AND completed_at IS NOT NULL),'Completion badge and full timed route eligibility';
  PERFORM expedition.reset_expedition(a);
  ASSERT NOT EXISTS(SELECT 1 FROM expedition.route_progress WHERE user_id=a AND (duration_ms IS NOT NULL OR started_at IS NOT NULL)),'Reset clears timers';
  RAISE EXCEPTION 'Rollback fixtures' USING ERRCODE='ZX001';
 EXCEPTION WHEN SQLSTATE 'ZX001' THEN NULL; END;
 RAISE NOTICE 'Timing, trade notifications, receipts, sale accounting, escrow protection and completion eligibility verified; fixtures rolled back.';
END $$;
