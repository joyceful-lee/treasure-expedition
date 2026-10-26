DO $$
DECLARE a uuid:=gen_random_uuid(); b uuid:=gen_random_uuid(); price integer; balance integer; qty integer; result jsonb; draw integer;
BEGIN
 BEGIN
  INSERT INTO neon_auth."user"(id,name,email,"emailVerified","createdAt","updatedAt") VALUES(a,'Bulk QA A',a::text||'@example.invalid',false,now(),now()),(b,'Bulk QA B',b::text||'@example.invalid',false,now(),now());
  INSERT INTO expedition.users(id,username) VALUES(a,'Bulk_'||substr(a::text,1,8)),(b,'Other_'||substr(b::text,1,8));
  INSERT INTO expedition.inventory VALUES(a,'compass',4);
  INSERT INTO expedition.artifact_inventory VALUES(a,'compass',3),(b,'compass',2);
  SELECT coins INTO balance FROM expedition.users WHERE id=a;
  price:=expedition.sell_artifacts(a,'compass',5);
  ASSERT price=200,'Total matches quantity and rarity';
  ASSERT (SELECT coins=balance+200 FROM expedition.users WHERE id=a),'Bulk sale credits coins once';
  ASSERT (SELECT quantity=2 FROM expedition.all_inventory WHERE user_id=a AND treasure_id='compass'),'Sale spans legacy and current inventory';
  ASSERT (SELECT quantity=2 FROM expedition.all_inventory WHERE user_id=b AND treasure_id='compass'),'Other inventory unchanged';
  BEGIN
   PERFORM expedition.sell_artifacts(a,'compass',3);
   RAISE EXCEPTION 'Oversold inventory' USING ERRCODE='ZX002';
  EXCEPTION WHEN SQLSTATE 'P0001' THEN NULL; END;
  ASSERT (SELECT quantity=2 FROM expedition.all_inventory WHERE user_id=a AND treasure_id='compass'),'Failed sale leaves inventory intact';
  ASSERT (SELECT coins=balance+200 FROM expedition.users WHERE id=a),'Failed sale leaves coins intact';
  BEGIN
   PERFORM expedition.sell_artifacts(a,'compass',0);
   RAISE EXCEPTION 'Zero quantity accepted' USING ERRCODE='ZX002';
  EXCEPTION WHEN SQLSTATE 'P0001' THEN NULL; END;
  UPDATE expedition.users SET username='Renamed_'||substr(a::text,1,8) WHERE id=a;
  ASSERT (SELECT username='Renamed_'||substr(a::text,1,8) FROM expedition.users WHERE id=a),'Public username editable';
  BEGIN
   UPDATE expedition.users SET username='RENAMED_'||upper(substr(a::text,1,8)) WHERE id=b;
   RAISE EXCEPTION 'Case duplicate username accepted' USING ERRCODE='ZX002';
  EXCEPTION WHEN unique_violation THEN NULL; END;
  -- First draw is new; owning every artifact makes the next draw a duplicate.
  UPDATE expedition.users SET coins=800 WHERE id=b;
  UPDATE expedition.artifact_inventory SET quantity=0 WHERE user_id=b;
  result:=expedition.open_artifact_pack_receipt(b);
  ASSERT (result->>'isNew')::boolean,'First owned copy is a new discovery';
  INSERT INTO expedition.artifact_inventory SELECT b,id,2 FROM expedition.artifact_catalog ON CONFLICT(user_id,treasure_id) DO UPDATE SET quantity=2;
  result:=expedition.open_artifact_pack_receipt(b);
  ASSERT NOT (result->>'isNew')::boolean,'Duplicate reward receipt';
  RAISE EXCEPTION 'Rollback fixtures'  USING ERRCODE='ZX001';
 EXCEPTION WHEN SQLSTATE 'ZX001' THEN NULL; END;
 RAISE NOTICE 'Bulk selling, accounting, player isolation, renamed usernames and case-insensitive uniqueness verified; fixtures rolled back.';
END $$;
