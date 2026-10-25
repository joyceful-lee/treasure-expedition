import { test } from "node:test";
import assert from "node:assert/strict";
import { isCorrect, scoreFor } from "../lib/puzzles.ts";
import { stateFor, type Progress } from "../lib/expedition.ts";
test("all puzzle solutions follow their clues", () => {
  assert.ok(isCorrect(1, " A CLOCK! "));
  assert.ok(isCorrect(2, String(31 * 2 + 1)));
  const cipher = "WUHDVXUH";
  const decoded = [...cipher]
    .map((c) =>
      String.fromCharCode(((c.charCodeAt(0) - 65 - 3 + 26) % 26) + 65),
    )
    .join("");
  assert.ok(isCorrect(3, decoded));
  assert.ok(isCorrect(4, "gold"));
  const codes = [];
  for (let n = 100; n < 1000; n++) {
    const [a, b, c] = String(n).split("").map(Number);
    if (a + b + c === 15 && a === 2 * b && c === b + 3) codes.push(n);
  }
  assert.deepEqual(codes, [636]);
  assert.ok(isCorrect(5, String(codes[0])));
  const final = [19, 5, 3, 18, 5, 20]
    .map((n) => String.fromCharCode(64 + n))
    .reverse()[2];
  assert.ok(isCorrect(6, final));
  assert.equal(isCorrect(7, "anything"), false);
  assert.equal(isCorrect(1, "compass"), false);
});
test("progress unlocks in order and records attempted and completed", () => {
  assert.equal(stateFor(1, []), "available");
  assert.equal(stateFor(2, []), "locked");
  const p: Progress[] = [
    { checkpoint: 1, attempts: 1, completed_at: null, score: 0 },
  ];
  assert.equal(stateFor(1, p), "attempted");
  assert.equal(stateFor(2, p), "locked");
  p[0].completed_at = new Date().toISOString();
  assert.equal(stateFor(1, p), "completed");
  assert.equal(stateFor(2, p), "available");
  assert.equal(stateFor(3, p), "locked");
});
test("scores penalize wrong attempts and never fall below 100", () => {
  assert.equal(scoreFor(1, 1), 250);
  assert.equal(scoreFor(6, 1), 1500);
  assert.equal(scoreFor(3, 2), 725);
  assert.equal(scoreFor(1, 100), 100);
});
