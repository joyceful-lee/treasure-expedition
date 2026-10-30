import { test } from "node:test";
import assert from "node:assert/strict";
import { isCorrect, scoreFor } from "../lib/puzzles.ts";
import { solutions, explanationFor } from "../lib/puzzles-route.ts";
import { answerKey } from "../lib/curriculum-answers.ts";
import { activities } from "../lib/challenges.ts";
import {
  checkpoints,
  regions,
  pinStates,
  stateFor,
  type Progress,
} from "../lib/expedition.ts";

test("60 stable checkpoints teach six subjects with one four-part finale per region", () => {
  assert.deepEqual(
    checkpoints.map((c) => c.id),
    Array.from({ length: 60 }, (_, i) => i + 1),
  );
  assert.equal(new Set(checkpoints.map((c) => `${c.x},${c.y}`)).size, 60);
  for (const [i, region] of regions.entries()) {
    const part = checkpoints.filter((c) => c.region === i);
    assert.equal(part.length, 10);
    assert.ok(part.every((c) => c.theme === region.theme));
    assert.equal(part.filter((c) => c.major).length, 1);
    const finale = part[9];
    assert.equal(finale.challenge, "field-study");
    assert.equal(activities[finale.id].fields.length, 4);
    assert.deepEqual(
      activities[finale.id].fields.map((f) => f.id).sort(),
      Object.keys(answerKey[finale.id].fields!).sort(),
    );
  }
  assert.equal(new Set(pinStates.map((s) => s.color)).size, 4);
});

test("all ordinary answers and every displayed choice are usable", () => {
  assert.equal(Object.keys(solutions).length, 54);
  for (const [id, answers] of Object.entries(solutions)) {
    for (const answer of answers)
      assert.ok(
        isCorrect(Number(id), ` ${answer.toUpperCase()}! `),
        `${id}: ${answer}`,
      );
  }
  for (const cp of checkpoints.filter((c) => c.options)) {
    assert.equal(
      cp.options!.filter((option) => isCorrect(cp.id, option)).length,
      1,
      `exactly one correct choice at ${cp.id}`,
    );
  }
  for (const cp of checkpoints)
    assert.ok(
      explanationFor(cp.id).trim().length > 0,
      `teaching feedback at ${cp.id}`,
    );
});

test("independent arithmetic checks cover the new fraction, ratio, geometry and probability questions", () => {
  const computed: Record<number, string | number> = {
    1: 12 / 4,
    2: (24 * 3) / 8,
    3: "5/12",
    4: (18 / 3) * 2,
    5: (6 / 4) * 10,
    6: 80 * 0.75,
    7: 40 * 0.15,
    8: ((65 - 50) / 50) * 100,
    9: 4.8 * 250,
    31: 7 * 4,
    32: 2 * (7 + 4),
    33: (8 * 5) / 2,
    34: 10 * 6 - 2 * 3,
    35: 3.14 * 10,
    36: 4 * 3 * 2,
    37: 400 / 50,
    38: 180 - 48 - 67,
    39: Math.hypot(6, 8),
    46: 24 * 3,
    48: 4 + 0 + 6 + 2,
    51: 4 + 7 + 5 + 2,
    52: (6 + 8 + 10) / 3,
    53: 8,
    54: 28,
    55: 2 / 10,
    56: (2 / 10) ** 2,
    57: ((2 / 10) * 1) / 9,
    58: 10 / 4,
  };
  for (const [id, value] of Object.entries(computed))
    assert.ok(
      isCorrect(Number(id), String(value)),
      `calculated answer at ${id}: ${value}`,
    );
  assert.ok(isCorrect(3, "10/24"));
  assert.ok(isCorrect(9, "1,200"));
  assert.ok(isCorrect(35, "31.40"));
  assert.equal(isCorrect(35, "314"), false, "decimal point must not disappear");
  assert.equal(isCorrect(58, "25"), false, "2.5 must not be confused with 25");
  assert.equal(
    isCorrect(55, "20"),
    false,
    "a fraction question must not silently treat a percent as a fraction",
  );
  for (const input of [
    "",
    "Infinity",
    "NaN",
    "1/0",
    "3/4/5",
    "<script>3</script>",
  ])
    assert.equal(isCorrect(1, input), false, input);
  for (const id of [0, 61, 1.5, NaN]) assert.equal(isCorrect(id, "3"), false);
  assert.equal(
    isCorrect(1, "clock"),
    false,
    "legacy riddle answers are no longer accepted",
  );
});

test("each finale requires all four parts and rejects malformed or partially correct submissions", () => {
  for (const id of [10, 20, 30, 40, 50, 60]) {
    const fields = answerKey[id].fields!;
    assert.ok(isCorrect(id, JSON.stringify(fields)), String(id));
    for (const field of activities[id].fields) {
      if (field.options)
        assert.equal(
          field.options.filter((option) =>
            isCorrect(id, JSON.stringify({ ...fields, [field.id]: option })),
          ).length,
          1,
          `${id}: ${field.id} has one correct option`,
        );
      else {
        const value = Number(fields[field.id]);
        assert.ok(
          value >= field.min! && value <= field.max!,
          `${id}: answer fits the controls`,
        );
        assert.ok(
          Math.abs(
            (value - field.min!) / field.step! -
              Math.round((value - field.min!) / field.step!),
          ) < 1e-8,
          `${id}: answer fits the step`,
        );
      }
      assert.equal(
        isCorrect(id, JSON.stringify({ ...fields, [field.id]: "incorrect" })),
        false,
        `${id}: every part matters`,
      );
      const partial = { ...fields };
      delete partial[field.id];
      assert.equal(
        isCorrect(id, JSON.stringify(partial)),
        false,
        `${id}: missing ${field.id}`,
      );
    }
    for (const value of ["{}", "null", "[]", "true", '"text"', "not json"])
      assert.equal(isCorrect(id, value), false, `${id}: ${value}`);
  }
  const plan = {
    water: 12 * 3 * 2.5,
    concentrate: 15 / 5,
    bill: 4 * 18 * 0.75,
    remaining: 80 - 4 * 18 * 0.75,
  };
  assert.ok(isCorrect(10, JSON.stringify(plan)));
  assert.ok(
    isCorrect(
      40,
      JSON.stringify({
        span: Math.hypot(6, 8),
        area: 10 * 2,
        planks: 20 / 0.5,
        support: (4 * 3) / 2,
      }),
    ),
  );
  const resale = 0.5 * 2 + 0.3 * 6 + 0.2 * 12;
  assert.ok(
    isCorrect(
      60,
      JSON.stringify({
        rare: (2 / 10) * 100,
        twice: (2 / 10) ** 2 * 100,
        resale,
        net: resale - 6,
      }),
    ),
  );
});

test("all earlier checkpoints are required, including gaps in preserved legacy progress", () => {
  const p: Progress[] = [
    { checkpoint: 1, attempts: 1, completed_at: null, score: 0 },
  ];
  assert.equal(stateFor(1, []), "available");
  assert.equal(stateFor(2, []), "locked");
  assert.equal(stateFor(1, p), "attempted");
  p[0].completed_at = new Date().toISOString();
  assert.equal(stateFor(2, p), "available");
  p.push({
    checkpoint: 11,
    attempts: 1,
    completed_at: new Date().toISOString(),
    score: 500,
  });
  assert.equal(stateFor(11, p), "completed");
  assert.equal(stateFor(12, p), "locked");
  assert.equal(stateFor(10, p), "locked");
  const all: Progress[] = Array.from({ length: 59 }, (_, i) => ({
    checkpoint: i + 1,
    attempts: 1,
    completed_at: new Date().toISOString(),
    score: 100,
  }));
  assert.equal(stateFor(60, all), "available");
  all.push({ checkpoint: 60, attempts: 1, completed_at: null, score: 0 });
  assert.equal(stateFor(60, all), "attempted");
});
test("scores preserve original clues and include finale bonuses and attempt penalties", () => {
  for (let r = 0; r < 6; r++)
    assert.equal(scoreFor(r * 10 + 1, 1), (r + 1) * 250);
  assert.equal(scoreFor(10, 1), 1475);
  assert.equal(scoreFor(60, 1), 2725);
  assert.equal(scoreFor(21, 2), 725);
  assert.equal(scoreFor(1, 100), 100);
});
