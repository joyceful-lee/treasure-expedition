import { test } from "node:test";
import assert from "node:assert/strict";
import {
  treasures,
  rarityChances,
  totalArtifactWeight,
} from "../lib/artifacts.ts";

test("the expanded artifact pool preserves legacy IDs and has five weighted rarities", () => {
  assert.equal(treasures.length, 24);
  assert.equal(new Set(treasures.map((t) => t.id)).size, 24);
  for (const id of ["compass", "scarab", "vase", "gem", "moon", "crown"])
    assert.ok(treasures.some((t) => t.id === id));
  assert.equal(totalArtifactWeight, 400);
  assert.deepEqual(
    rarityChances.map((r) => r.chance),
    [60, 24, 12, 3, 1],
  );
  assert.ok(treasures.every((t) => t.weight > 0));
});
