CREATE TABLE IF NOT EXISTS expedition.artifact_catalog(id text PRIMARY KEY, name text NOT NULL, rarity text NOT NULL, weight integer NOT NULL CHECK(weight>0));
INSERT INTO expedition.artifact_catalog(id,name,rarity,weight) VALUES
('compass','Bronze Compass','Common',40),
('coin','Harbor Coin','Common',40),
('shard','Painted Shard','Common',40),
('arrowhead','Flint Arrowhead','Common',40),
('bead','Clay Bead','Common',40),
('button','Sailor’s Button','Common',40),
('scarab','Jade Scarab','Uncommon',16),
('vase','Painted Amphora','Uncommon',16),
('key','Cistern Key','Uncommon',16),
('shell','Pearl Shell','Uncommon',16),
('lantern','Amber Lantern','Uncommon',16),
('tablet','Clay Star Tablet','Uncommon',16),
('gem','Serpent Emerald','Rare',8),
('moon','Moonstone','Rare',8),
('astrolabe','Navigator’s Astrolabe','Rare',8),
('mask','Obsidian Mask','Rare',8),
('dagger','Crystal Dagger','Rare',8),
('brooch','Kingfisher Brooch','Rare',8),
('idol','Jade Guardian','Epic',3),
('chalice','Twilight Chalice','Epic',3),
('orb','Stormglass Orb','Epic',3),
('lyre','Sunstring Lyre','Epic',3),
('crown','Sun King’s Crown','Legendary',2),
('phoenix','Phoenix Medallion','Legendary',2)
ON CONFLICT(id) DO UPDATE SET name=excluded.name,rarity=excluded.rarity,weight=excluded.weight;
CREATE TABLE IF NOT EXISTS expedition.artifact_inventory(user_id uuid REFERENCES expedition.users(id) ON DELETE CASCADE, treasure_id text REFERENCES expedition.artifact_catalog(id), quantity integer NOT NULL CHECK(quantity>=0), PRIMARY KEY(user_id,treasure_id));
CREATE TABLE IF NOT EXISTS expedition.artifact_trades(id uuid PRIMARY KEY DEFAULT gen_random_uuid(), maker_id uuid NOT NULL REFERENCES expedition.users(id), offered text NOT NULL REFERENCES expedition.artifact_catalog(id), requested text NOT NULL REFERENCES expedition.artifact_catalog(id), status text NOT NULL DEFAULT 'open' CHECK(status IN ('open','accepted','cancelled')), taker_id uuid REFERENCES expedition.users(id), created_at timestamptz NOT NULL DEFAULT now(), CHECK(offered<>requested));
CREATE INDEX IF NOT EXISTS artifact_trades_open ON expedition.artifact_trades(created_at DESC) WHERE status='open';
ALTER TABLE expedition.route_progress ADD COLUMN IF NOT EXISTS treasure_id text REFERENCES expedition.artifact_catalog(id);
CREATE OR REPLACE VIEW expedition.all_inventory AS SELECT user_id,treasure_id,sum(quantity)::integer AS quantity FROM (SELECT * FROM expedition.inventory UNION ALL SELECT * FROM expedition.artifact_inventory) items GROUP BY user_id,treasure_id;
CREATE OR REPLACE VIEW expedition.all_trades AS SELECT id,maker_id,offered,requested,status,taker_id,created_at,false AS legacy FROM expedition.artifact_trades UNION ALL SELECT id,maker_id,offered,requested,status,taker_id,created_at,true AS legacy FROM expedition.trades;
REVOKE ALL ON expedition.artifact_catalog,expedition.artifact_inventory,expedition.artifact_trades,expedition.all_inventory,expedition.all_trades FROM PUBLIC;

CREATE OR REPLACE FUNCTION expedition.draw_artifact() RETURNS text LANGUAGE plpgsql AS $$
DECLARE roll double precision; result text;
BEGIN
 SELECT random()*sum(weight) INTO roll FROM expedition.artifact_catalog;
 SELECT id INTO result FROM (SELECT id,sum(weight) OVER(ORDER BY id) AS threshold FROM expedition.artifact_catalog) draws WHERE threshold>roll ORDER BY threshold LIMIT 1;
 IF result IS NULL THEN RAISE EXCEPTION 'The artifact catalog is unavailable.'; END IF;
 RETURN result;
END $$;
CREATE OR REPLACE FUNCTION expedition.grant_artifact(uid uuid,item text) RETURNS void LANGUAGE plpgsql AS $$
BEGIN
 INSERT INTO expedition.artifact_inventory VALUES(uid,item,1) ON CONFLICT(user_id,treasure_id) DO UPDATE SET quantity=expedition.artifact_inventory.quantity+1;
END $$;
CREATE OR REPLACE FUNCTION expedition.take_artifact(uid uuid,item text) RETURNS void LANGUAGE plpgsql AS $$
BEGIN
 PERFORM 1 FROM expedition.users WHERE id=uid FOR UPDATE;
 UPDATE expedition.artifact_inventory SET quantity=quantity-1 WHERE user_id=uid AND treasure_id=item AND quantity>0;
 IF FOUND THEN RETURN; END IF;
 UPDATE expedition.inventory SET quantity=quantity-1 WHERE user_id=uid AND treasure_id=item AND quantity>0;
 IF NOT FOUND THEN RAISE EXCEPTION 'You do not have that artifact to trade.'; END IF;
END $$;
CREATE OR REPLACE FUNCTION expedition.open_artifact_pack(uid uuid) RETURNS text LANGUAGE plpgsql AS $$
DECLARE reward text;
BEGIN
 UPDATE expedition.users SET coins=coins-100 WHERE id=uid AND coins>=100;
 IF NOT FOUND THEN RAISE EXCEPTION 'You need 100 coins to open a pack.'; END IF;
 reward:=expedition.draw_artifact(); PERFORM expedition.grant_artifact(uid,reward); RETURN reward;
END $$;
CREATE OR REPLACE FUNCTION expedition.submit_artifact_answer(uid uuid,cp integer,correct boolean) RETURNS jsonb LANGUAGE plpgsql AS $$
DECLARE p expedition.route_progress; pts integer; reward text; coins_earned integer;
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
 reward:=expedition.draw_artifact();
 UPDATE expedition.route_progress SET completed_at=now(),score=pts,treasure_id=reward WHERE user_id=uid AND checkpoint=cp;
 UPDATE expedition.users SET coins=coins+coins_earned WHERE id=uid;
 PERFORM expedition.grant_artifact(uid,reward);
 RETURN jsonb_build_object('completed',true,'score',pts,'reward',reward,'coins',coins_earned);
END $$;
CREATE OR REPLACE FUNCTION expedition.make_artifact_trade(uid uuid,offered_item text,requested_item text) RETURNS uuid LANGUAGE plpgsql AS $$
DECLARE tid uuid;
BEGIN
 IF offered_item=requested_item OR NOT EXISTS(SELECT 1 FROM expedition.artifact_catalog WHERE id=offered_item) OR NOT EXISTS(SELECT 1 FROM expedition.artifact_catalog WHERE id=requested_item) THEN RAISE EXCEPTION 'Choose two different artifacts.'; END IF;
 PERFORM 1 FROM expedition.users WHERE id=uid FOR UPDATE;
 IF (SELECT count(*) FROM expedition.all_trades WHERE maker_id=uid AND status='open')>=5 THEN RAISE EXCEPTION 'You can have up to five open trades.'; END IF;
 PERFORM expedition.take_artifact(uid,offered_item);
 INSERT INTO expedition.artifact_trades(maker_id,offered,requested) VALUES(uid,offered_item,requested_item) RETURNING id INTO tid; RETURN tid;
END $$;
CREATE OR REPLACE FUNCTION expedition.finish_artifact_trade(uid uuid,tid uuid,cancel_offer boolean) RETURNS void LANGUAGE plpgsql AS $$
DECLARE t record; is_legacy boolean:=false;
BEGIN
 SELECT * INTO t FROM expedition.artifact_trades WHERE id=tid FOR UPDATE;
 IF NOT FOUND THEN SELECT * INTO t FROM expedition.trades WHERE id=tid FOR UPDATE; is_legacy:=true; END IF;
 IF t.id IS NULL OR t.status<>'open' THEN RAISE EXCEPTION 'This trade is no longer available.'; END IF;
 PERFORM 1 FROM expedition.users WHERE id IN(uid,t.maker_id) ORDER BY id FOR UPDATE;
 IF cancel_offer THEN
  IF uid<>t.maker_id THEN RAISE EXCEPTION 'Only the explorer who posted this trade can cancel it.'; END IF;
  PERFORM expedition.grant_artifact(uid,t.offered);
  IF is_legacy THEN UPDATE expedition.trades SET status='cancelled' WHERE id=tid; ELSE UPDATE expedition.artifact_trades SET status='cancelled' WHERE id=tid; END IF;
 ELSE
  IF uid=t.maker_id THEN RAISE EXCEPTION 'You cannot accept your own trade.'; END IF;
  PERFORM expedition.take_artifact(uid,t.requested);
  PERFORM expedition.grant_artifact(uid,t.offered); PERFORM expedition.grant_artifact(t.maker_id,t.requested);
  IF is_legacy THEN UPDATE expedition.trades SET status='accepted',taker_id=uid WHERE id=tid; ELSE UPDATE expedition.artifact_trades SET status='accepted',taker_id=uid WHERE id=tid; END IF;
 END IF;
END $$;
REVOKE EXECUTE ON FUNCTION expedition.draw_artifact(),expedition.grant_artifact(uuid,text),expedition.take_artifact(uuid,text),expedition.open_artifact_pack(uuid),expedition.submit_artifact_answer(uuid,integer,boolean),expedition.make_artifact_trade(uuid,text,text),expedition.finish_artifact_trade(uuid,uuid,boolean) FROM PUBLIC;
