import { test } from "node:test";
import assert from "node:assert/strict";
import { formatTime } from "../lib/time.ts";
import { sellPrices, treasures } from "../lib/artifacts.ts";
test("time labels distinguish missing historic timers and include hours", () => {
  assert.equal(formatTime(null), "Not timed");
  assert.equal(formatTime(0), "00:00");
  assert.equal(formatTime(65000), "01:05");
  assert.equal(formatTime(3661000), "1:01:01");
});
test("every rarity has a sale price and the average pack resale stays below its cost", () => {
  assert.ok(treasures.every((t) => sellPrices[t.rarity] > 0));
  assert.ok(
    treasures.reduce(
      (sum, t) => sum + (sellPrices[t.rarity] * t.weight) / 400,
      0,
    ) < 400,
  );
});
