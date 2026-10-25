import { test } from "node:test";
import assert from "node:assert/strict";
import { starsFor } from "../lib/ratings.ts";
test("stars reflect successful attempt count and reset with incomplete progress", () => {
  assert.equal(starsFor(0, false), 0);
  assert.equal(starsFor(9, false), 0);
  assert.equal(starsFor(0, true), 0);
  assert.equal(starsFor(1, true), 3);
  assert.equal(starsFor(2, true), 2);
  assert.equal(starsFor(3, true), 1);
  assert.equal(starsFor(100, true), 1);
});
