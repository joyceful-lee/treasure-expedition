import { test } from "node:test";
import assert from "node:assert/strict";
import {
  treasures,
  rarityChances,
  totalArtifactWeight,
} from "../lib/artifacts.ts";
import { checkpoints } from "../lib/route-data.ts";
import { reliquaryObjects } from "../lib/challenges.ts";
import { solutions } from "../lib/puzzles-route.ts";

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

test("riddle titles conceal their answer and the landing finale has six fresh answers", () => {
  const starterAnswers = Array.from(
    { length: 9 },
    (_, i) => solutions[i + 1],
  ).flat();
  for (const cp of checkpoints.slice(0, 9))
    assert.ok(
      !solutions[cp.id].some((answer) =>
        cp.name.toLowerCase().includes(answer),
      ),
      cp.name,
    );
  assert.equal(new Set(reliquaryObjects).size, 6);
  assert.ok(
    reliquaryObjects.every((answer) => !starterAnswers.includes(answer)),
  );
});
