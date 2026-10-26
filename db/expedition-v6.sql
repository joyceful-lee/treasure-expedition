CREATE UNIQUE INDEX IF NOT EXISTS users_username_case_insensitive ON expedition.users(lower(username));
CREATE OR REPLACE FUNCTION expedition.sell_artifacts(uid uuid,item text,amount integer) RETURNS integer LANGUAGE plpgsql AS $$
DECLARE price integer; available integer; from_new integer;
BEGIN
 IF amount IS NULL OR amount NOT BETWEEN 1 AND 10000 THEN RAISE EXCEPTION 'Choose a whole number from 1 to 10,000.'; END IF;
 PERFORM 1 FROM expedition.users WHERE id=uid FOR UPDATE;
 IF NOT FOUND THEN RAISE EXCEPTION 'Create your explorer profile first.'; END IF;
 SELECT sell_price INTO price FROM expedition.artifact_catalog WHERE id=item;
 IF price IS NULL THEN RAISE EXCEPTION 'Choose a treasure from your collection.'; END IF;
 SELECT quantity INTO available FROM expedition.all_inventory WHERE user_id=uid AND treasure_id=item;
 IF coalesce(available,0)<amount THEN RAISE EXCEPTION 'You do not have that many available treasures to sell.'; END IF;
 SELECT least(quantity,amount) INTO from_new FROM expedition.artifact_inventory WHERE user_id=uid AND treasure_id=item;
 from_new:=coalesce(from_new,0);
 UPDATE expedition.artifact_inventory SET quantity=quantity-from_new WHERE user_id=uid AND treasure_id=item;
 IF amount>from_new THEN UPDATE expedition.inventory SET quantity=quantity-(amount-from_new) WHERE user_id=uid AND treasure_id=item; END IF;
 UPDATE expedition.users SET coins=coins+price*amount WHERE id=uid;
 RETURN price*amount;
END $$;
REVOKE EXECUTE ON FUNCTION expedition.sell_artifacts(uuid,text,integer) FROM PUBLIC;

CREATE OR REPLACE FUNCTION expedition.open_artifact_pack_receipt(uid uuid) RETURNS jsonb LANGUAGE plpgsql AS $$
DECLARE reward text; owned integer;
BEGIN
 reward:=expedition.open_artifact_pack(uid);
 SELECT quantity INTO owned FROM expedition.all_inventory WHERE user_id=uid AND treasure_id=reward;
 RETURN jsonb_build_object('reward',reward,'isNew',owned=1);
END $$;
REVOKE EXECUTE ON FUNCTION expedition.open_artifact_pack_receipt(uuid) FROM PUBLIC;
