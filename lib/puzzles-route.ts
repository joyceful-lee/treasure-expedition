// Server-side solutions; client components import only public clues.
import { baseScore } from "./route-data.ts";
import {
  magicEngravings,
  objectValues,
  starNumbers,
  starBearings,
} from "./challenges.ts";
const reliquarySolution = [
  "mirror",
  "sponge",
  "needle",
  "towel",
  "comb",
  "river",
];
export const solutions: Record<number, string[]> = {
  1: ["clock", "a clock", "watch", "a watch"],
  2: ["map", "a map"],
  3: ["echo", "an echo"],
  4: ["candle", "a candle"],
  5: ["footsteps", "footprints", "foot prints"],
  6: ["hole", "a hole"],
  7: ["silence"],
  8: ["shadow", "a shadow"],
  9: ["breath", "your breath", "my breath"],
  11: ["63"],
  12: ["28"],
  13: ["49"],
  14: ["42"],
  15: ["89"],
  16: ["91"],
  17: ["21"],
  18: ["20"],
  19: ["9"],
  21: ["treasure"],
  22: ["compass"],
  23: ["map"],
  24: ["water"],
  25: ["key"],
  26: ["north"],
  27: ["seal"],
  28: ["secret"],
  29: ["temple"],
  31: ["gold"],
  32: ["no"],
  33: ["a", "chest a"],
  34: ["b", "guide b"],
  35: ["7", "seven"],
  36: ["2", "two"],
  37: ["no"],
  38: ["21"],
  39: ["a", "switch a"],
  41: ["636"],
  42: ["southeast", "south-east", "se"],
  43: ["e4"],
  44: ["900", "900 metres", "900 meters"],
  45: ["250", "250 degrees"],
  46: ["5", "5 units"],
  47: ["1,-2", "(1,-2)"],
  48: ["20", "20 degrees"],
  49: ["30", "30 degrees"],
  51: ["r"],
  52: ["silent"],
  53: ["key"],
  54: ["24"],
  55: ["e4"],
  56: ["33"],
  57: ["north"],
  58: ["49"],
  59: ["u"],
};
function normal(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[\s.!?]+/g, "");
}
function uniqueTokens(input: unknown, tokens: string[]): input is string[] {
  return (
    Array.isArray(input) &&
    input.length === tokens.length &&
    new Set(input).size === tokens.length &&
    input.every((x) => typeof x === "string" && tokens.includes(x))
  );
}
export function validMagicSquare(input: unknown) {
  if (
    !Array.isArray(input) ||
    input.length !== 16 ||
    new Set(input).size !== 16 ||
    !input.every((n) => Number.isInteger(n) && n >= 1 && n <= 16)
  )
    return false;
  if (
    !Object.entries(magicEngravings).every(([i, n]) => input[Number(i)] === n)
  )
    return false;
  const lines = [
    ...Array.from({ length: 4 }, (_, r) =>
      Array.from({ length: 4 }, (_, c) => r * 4 + c),
    ),
    ...Array.from({ length: 4 }, (_, c) =>
      Array.from({ length: 4 }, (_, r) => r * 4 + c),
    ),
    [0, 5, 10, 15],
    [3, 6, 9, 12],
  ];
  return lines.every(
    (line) => line.reduce((sum, i) => sum + input[i], 0) === 34,
  );
}
export function validBridge(input: unknown) {
  if (
    !uniqueTokens(input, [
      "sun",
      "key",
      "crown",
      "moon",
      "owl",
      "river",
      "tree",
      "serpent",
    ])
  )
    return false;
  const p = (s: string) => input.indexOf(s);
  return (
    (p("tree") === 0 || p("tree") === 7) &&
    p("tree") < p("moon") &&
    p("crown") === p("owl") + 1 &&
    p("owl") === p("key") + 3 &&
    p("river") === p("key") + 1 &&
    p("sun") > p("river") &&
    p("sun") < p("owl") &&
    p("river") === p("moon") + 3 &&
    p("serpent") > p("moon") &&
    p("serpent") < p("key")
  );
}
function validateChallenge(cp: number, p: Record<string, unknown>) {
  if (cp === 10)
    return (
      Array.isArray(p.objects) &&
      p.objects.length === 6 &&
      p.objects.every((o, i) => o === reliquarySolution[i]) &&
      String(p.code) ===
        reliquarySolution
          .filter((_, i) => i % 2 === 0)
          .map((o) => objectValues[o])
          .join("")
    );
  if (cp === 20) return validMagicSquare(p.cells);
  if (cp === 30)
    return (
      p.outer === 7 &&
      p.inner === 5 &&
      typeof p.word === "string" &&
      normal(p.word) === "nwad"
    );
  if (cp === 40) return validBridge(p.order);
  if (cp === 50) {
    if (!Array.isArray(p.route) || p.route.length !== 8) return false;
    let x = 2,
      y = 2;
    const route: number[] = [];
    for (const bearing of starBearings) {
      const n = Number(bearing[1]);
      if (bearing[0] === "N") x += n;
      if (bearing[0] === "E") y += n;
      if (bearing[0] === "S") x -= n;
      if (bearing[0] === "W") y -= n;
      route.push(y * 5 + x);
    }
    return (
      route.every((v, i) => (p.route as unknown[])[i] === v) &&
      Number(p.code) ===
        route.reduce(
          (sum, index, i) => sum + (i % 2 === 1 ? starNumbers[index] : 0),
          0,
        )
    );
  }
  if (cp === 60) {
    if (
      !Array.isArray(p.rings) ||
      p.rings.length !== 3 ||
      !p.rings.every((n) => Number.isInteger(n) && n >= 0 && n <= 9)
    )
      return false;
    const [a, b, c] = p.rings;
    if (
      a === 0 ||
      a + b + c !== 12 ||
      a !== 2 * b ||
      c !== 3 * b ||
      !uniqueTokens(p.levers, ["sun", "moon", "river"])
    )
      return false;
    const [first, , last] = p.levers;
    const truths = [first === "moon", first === "sun", last === "river"].filter(
      Boolean,
    ).length;
    return (
      truths === 1 &&
      p.levers.indexOf("moon") < p.levers.indexOf("river") &&
      typeof p.word === "string" &&
      normal(p.word) === "treasure"
    );
  }
  return false;
}
export function isCorrect(checkpoint: number, answer: string) {
  if (!Number.isInteger(checkpoint) || checkpoint < 1 || checkpoint > 60)
    return false;
  if (checkpoint % 10 !== 0)
    return (
      solutions[checkpoint]?.some((v) => normal(v) === normal(answer)) ?? false
    );
  try {
    const p = JSON.parse(answer);
    return (
      !!p &&
      typeof p === "object" &&
      !Array.isArray(p) &&
      validateChallenge(checkpoint, p)
    );
  } catch {
    return false;
  }
}
export function scoreFor(checkpoint: number, attempts: number) {
  return Math.max(100, baseScore(checkpoint) - Math.max(0, attempts - 1) * 25);
}
