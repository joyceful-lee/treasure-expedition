import { test } from "node:test";
import assert from "node:assert/strict";
import { isCorrect, scoreFor } from "../lib/puzzles.ts";
import { solutions, validBridge } from "../lib/puzzles-route.ts";
import {
  checkpoints,
  regions,
  pinStates,
  stateFor,
  type Progress,
} from "../lib/expedition.ts";
import { shiftText } from "../lib/challenges.ts";
const bosses: Record<number, object> = {
  10: {
    objects: ["mirror", "sponge", "needle", "towel", "comb", "river"],
    code: "856",
  },
  20: { cells: [16, 3, 2, 13, 5, 10, 11, 8, 9, 6, 7, 12, 4, 15, 14, 1] },
  30: { outer: 7, inner: 5, word: "NWAD" },
  40: {
    order: ["tree", "moon", "serpent", "key", "river", "sun", "owl", "crown"],
  },
  50: { route: [2, 4, 19, 15, 10, 11, 21, 24], code: "23" },
  60: { rings: [4, 2, 6], levers: ["moon", "river", "sun"], word: "treasure" },
};
test("60 unique checkpoints form six themed regions with six interactive finales", () => {
  assert.deepEqual(
    checkpoints.map((c) => c.id),
    Array.from({ length: 60 }, (_, i) => i + 1),
  );
  assert.equal(new Set(checkpoints.map((c) => `${c.x},${c.y}`)).size, 60);
  regions.forEach((r, i) => {
    const part = checkpoints.filter((c) => c.region === i);
    assert.equal(part.length, 10);
    assert.ok(part.every((c) => c.theme === r.theme));
    assert.equal(part.filter((c) => c.major).length, 1);
  });
  assert.deepEqual(
    checkpoints.filter((c) => c.challenge).map((c) => c.id),
    [10, 20, 30, 40, 50, 60],
  );
  assert.equal(new Set(pinStates.map((s) => s.color)).size, 4);
});
test("all 54 ordinary answers are accepted; normalization and invalid inputs are handled", () => {
  assert.equal(Object.keys(solutions).length, 54);
  for (const [id, answers] of Object.entries(solutions))
    for (const answer of answers)
      assert.ok(
        isCorrect(Number(id), ` ${answer.toUpperCase()}! `),
        `${id}: ${answer}`,
      );
  assert.ok(isCorrect(1, " A CLOCK! "));
  for (const id of [0, 61, 1.5, NaN])
    assert.equal(isCorrect(id, "anything"), false);
  assert.equal(isCorrect(1, "compass"), false);
  assert.equal(isCorrect(10, "null"), false);
  assert.equal(isCorrect(10, "[]"), false);
});
test("number, cipher, and deduction clues independently produce the expected answers", () => {
  assert.ok(isCorrect(11, String(31 * 2 + 1)));
  assert.ok(
    isCorrect(
      16,
      String(
        Array.from({ length: 99 }, (_, i) => i + 1).find(
          (n) => n % 7 === 0 && n % 5 === 1 && n % 4 === 3,
        ),
      ),
    ),
  );
  assert.ok(isCorrect(21, shiftText("WUHDVXUH", 3)));
  assert.equal(shiftText("ZOPMA MPCL", 7), "SHIFT FIVE");
  const secondary = shiftText("RNWWTW FQUMFGJY: LXA YELA QPARM EL BEIR", 5);
  assert.equal(secondary, "MIRROR ALPHABET: GSV TZGV LKVMH ZG WZDM");
  assert.equal(
    [...secondary.split(": ")[1]]
      .map((c) =>
        /[A-Z]/.test(c) ? String.fromCharCode(90 - (c.charCodeAt(0) - 65)) : c,
      )
      .join(""),
    "THE GATE OPENS AT DAWN",
  );
  const extracted = [2, 3, 5, 7, 11]
    .map((n) => "LTQNWZVQCDGHS"[n - 1])
    .join("");
  assert.equal(shiftText(extracted, 2), "ROUTE");
  const rails = shiftText("FQHYWRRVUDLQ", 3);
  assert.equal(
    Array.from({ length: 6 }, (_, i) => rails[i] + rails[i + 6]).join(""),
    "CONSERVATION",
  );
  const candidates = [];
  for (let n = 100; n < 1000; n++) {
    const [a, b, c] = String(n).split("").map(Number);
    if (a + b + c === 15 && a === 2 * b && c === b + 3) candidates.push(n);
  }
  assert.deepEqual(candidates, [636]);
  assert.ok(isCorrect(41, String(candidates[0])));
  assert.ok(isCorrect(48, String(Math.abs(120 - (90 + (20 / 60) * 30)))));
  assert.ok(
    isCorrect(
      59,
      [..."GIVZHFIV"]
        .map((c) => String.fromCharCode(90 - (c.charCodeAt(0) - 65)))
        .reverse()[2],
    ),
  );
});
test("each interactive challenge requires its complete correct mechanism", () => {
  for (const [id, payload] of Object.entries(bosses)) {
    assert.ok(isCorrect(Number(id), JSON.stringify(payload)), id);
    assert.equal(isCorrect(Number(id), "{}"), false);
    assert.equal(isCorrect(Number(id), "treasure"), false);
  }
  assert.equal(
    isCorrect(10, JSON.stringify({ ...bosses[10], code: "342" })),
    false,
  );
  assert.equal(
    isCorrect(10, JSON.stringify({ objects: ["map"], code: "856" })),
    false,
  );
  assert.equal(
    isCorrect(20, JSON.stringify({ cells: Array(16).fill(8.5) })),
    false,
  );
  assert.equal(
    isCorrect(
      20,
      JSON.stringify({
        cells: [3, 16, 2, 13, 5, 10, 11, 8, 9, 6, 7, 12, 4, 15, 14, 1],
      }),
    ),
    false,
  );
  assert.equal(
    isCorrect(30, JSON.stringify({ ...bosses[30], outer: 6 })),
    false,
  );
  assert.equal(
    isCorrect(
      40,
      JSON.stringify({
        order: [
          "tree",
          "moon",
          "serpent",
          "key",
          "river",
          "sun",
          "crown",
          "owl",
        ],
      }),
    ),
    false,
  );
  assert.equal(
    isCorrect(50, JSON.stringify({ ...bosses[50], code: "24" })),
    false,
  );
  assert.equal(
    isCorrect(
      50,
      JSON.stringify({ route: [2, 4, 19, 15, 10, 11, 21], code: "23" }),
    ),
    false,
  );
  assert.equal(
    isCorrect(60, JSON.stringify({ ...bosses[60], rings: [2, 4, 6] })),
    false,
  );
  assert.equal(
    isCorrect(
      60,
      JSON.stringify({ ...bosses[60], levers: ["moon", "sun", "river"] }),
    ),
    false,
  );
});
function* permutations(a: string[]): Generator<string[]> {
  if (!a.length) {
    yield [];
    return;
  }
  for (let i = 0; i < a.length; i++)
    for (const rest of permutations(a.filter((_, j) => j !== i)))
      yield [a[i], ...rest];
}
test("bridge and vault lever clues have exactly one solution", () => {
  assert.deepEqual(
    [
      ...permutations([
        "sun",
        "key",
        "crown",
        "moon",
        "owl",
        "river",
        "tree",
        "serpent",
      ]),
    ].filter(validBridge),
    [(bosses[40] as { order: string[] }).order],
  );
  const possible = [...permutations(["sun", "moon", "river"])].filter(
    (levers) => isCorrect(60, JSON.stringify({ ...bosses[60], levers })),
  );
  assert.deepEqual(possible, [["moon", "river", "sun"]]);
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
