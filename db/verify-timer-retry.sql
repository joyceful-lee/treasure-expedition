DO $$
DECLARE uid uuid:=gen_random_uuid(); retry_start timestamptz; saved_duration bigint;
BEGIN
 BEGIN
  INSERT INTO neon_auth."user"(id,name,email,"emailVerified","createdAt","updatedAt") VALUES(uid,'Timer QA',uid::text||'@example.invalid',false,now(),now());
  INSERT INTO expedition.users(id,username) VALUES(uid,'timer_'||substr(uid::text,1,8));
  PERFORM expedition.begin_checkpoint(uid,1);
  UPDATE expedition.route_progress SET started_at=clock_timestamp()-interval '1 hour' WHERE user_id=uid AND checkpoint=1;
  PERFORM expedition.begin_checkpoint(uid,1);
  UPDATE expedition.route_progress SET started_at=clock_timestamp(),duration_ms=NULL WHERE user_id=uid AND checkpoint=1 AND completed_at IS NULL;
  ASSERT (SELECT started_at>clock_timestamp()-interval '5 seconds' AND attempts=0 FROM expedition.route_progress WHERE user_id=uid AND checkpoint=1),'Reopening without submitting an answer also resets the timer';
  PERFORM expedition.submit_artifact_answer(uid,1,false);
  UPDATE expedition.route_progress SET started_at=clock_timestamp()-interval '1 hour',last_attempt=NULL WHERE user_id=uid AND checkpoint=1;
  PERFORM expedition.begin_checkpoint(uid,1);
  UPDATE expedition.route_progress SET started_at=clock_timestamp(),duration_ms=NULL WHERE user_id=uid AND checkpoint=1 AND completed_at IS NULL;
  SELECT started_at INTO retry_start FROM expedition.route_progress WHERE user_id=uid AND checkpoint=1;
  ASSERT retry_start>clock_timestamp()-interval '5 seconds','Explicit retry starts a fresh timer';
  ASSERT (SELECT attempts=1 FROM expedition.route_progress WHERE user_id=uid AND checkpoint=1),'Retry preserves incorrect attempts';
  PERFORM expedition.begin_checkpoint(uid,1);
  ASSERT (SELECT started_at=retry_start FROM expedition.route_progress WHERE user_id=uid AND checkpoint=1),'Ordinary reopening preserves the retry timer';
  PERFORM expedition.submit_artifact_answer(uid,1,true);
  SELECT duration_ms INTO saved_duration FROM expedition.route_progress WHERE user_id=uid AND checkpoint=1;
  ASSERT saved_duration BETWEEN 1 AND 5000,'Completion records elapsed time from the retry';
  ASSERT (SELECT attempts=2 AND score=225 FROM expedition.route_progress WHERE user_id=uid AND checkpoint=1),'Retry preserves scoring and star history';
  PERFORM expedition.begin_checkpoint(uid,1);
  UPDATE expedition.route_progress SET started_at=clock_timestamp(),duration_ms=NULL WHERE user_id=uid AND checkpoint=1 AND completed_at IS NULL;
  ASSERT (SELECT started_at=retry_start AND duration_ms=saved_duration FROM expedition.route_progress WHERE user_id=uid AND checkpoint=1),'Completed checkpoint timing is immutable';
  RAISE EXCEPTION 'Rollback fixtures' USING ERRCODE='ZX001';
 EXCEPTION WHEN SQLSTATE 'ZX001' THEN NULL; END;
END $$;
