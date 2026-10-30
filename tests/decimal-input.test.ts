import { test } from "node:test";
import assert from "node:assert/strict";
import { decimalAnswerPattern } from "../lib/challenges.ts";
import { isCorrect } from "../lib/puzzles-route.ts";
test("decimal fields accept decimal points, signs and precision while rejecting incomplete submissions", () => {
  const complete = new RegExp(`^(?:${decimalAnswerPattern})$`, "v");
  for (const answer of [
    "5.2",
    "-0.8",
    "0.5",
    ".5",
    "-.8",
    "31.40",
    "5.",
    "0",
    "+5.2",
  ])
    assert.ok(complete.test(answer), answer);
  for (const answer of ["", "-", ".", "-.", "5..2", "five", "1/2"])
    assert.equal(complete.test(answer), false, answer);
  assert.ok(
    isCorrect(
      60,
      JSON.stringify({ rare: "20", twice: "4", resale: "5.20", net: "-0.80" }),
    ),
  );
  assert.equal(
    isCorrect(
      60,
      JSON.stringify({ rare: "20", twice: "4", resale: "52", net: "-0.8" }),
    ),
    false,
  );
});
