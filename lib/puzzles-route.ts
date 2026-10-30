// Server-side validation; public questions never import the answer key.
import { baseScore } from "./route-data.ts";
import { answerKey } from "./curriculum-answers.ts";
export const solutions: Record<number, string[]> = Object.fromEntries(
  Object.entries(answerKey)
    .filter(([, entry]) => entry.answers)
    .map(([id, entry]) => [id, entry.answers!]),
);
function normal(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[’‘]/g, "'")
    .replace(/\s+/g, " ")
    .replace(/[.!?]+$/g, "");
}
function numeric(value: string): number | null {
  const text = normal(value);
  const fraction = text.match(/^([+-]?\d+)\s*\/\s*(\d+)$/);
  if (fraction)
    return Number(fraction[2])
      ? Number(fraction[1]) / Number(fraction[2])
      : null;
  if (/^[+-]?\d{1,3}(,\d{3})+(\.\d+)?$/.test(text))
    return Number(text.replaceAll(",", ""));
  if (!/^[+-]?(?:\d+(?:\.\d*)?|\.\d+)$/.test(text)) return null;
  const result = Number(text);
  return Number.isFinite(result) ? result : null;
}
export function matchesAnswer(input: string, expected: string) {
  if (normal(input) === normal(expected)) return true;
  const actualNumber = numeric(input),
    expectedNumber = numeric(expected);
  return (
    actualNumber !== null &&
    expectedNumber !== null &&
    Math.abs(actualNumber - expectedNumber) < 1e-10
  );
}
export function isCorrect(checkpoint: number, answer: string) {
  if (
    !Number.isInteger(checkpoint) ||
    checkpoint < 1 ||
    checkpoint > 60 ||
    typeof answer !== "string"
  )
    return false;
  const entry = answerKey[checkpoint];
  if (entry.answers)
    return entry.answers.some((expected) => matchesAnswer(answer, expected));
  try {
    const data: unknown = JSON.parse(answer);
    if (
      !data ||
      typeof data !== "object" ||
      Array.isArray(data) ||
      !entry.fields
    )
      return false;
    const fields = data as Record<string, unknown>;
    return (
      Object.keys(fields).length === Object.keys(entry.fields).length &&
      Object.entries(entry.fields).every(([key, expected]) => {
        const value = fields[key];
        return (
          (typeof value === "string" || typeof value === "number") &&
          matchesAnswer(String(value), expected)
        );
      })
    );
  } catch {
    return false;
  }
}
export function explanationFor(checkpoint: number) {
  return answerKey[checkpoint]?.explanation ?? "";
}
export function scoreFor(checkpoint: number, attempts: number) {
  return Math.max(100, baseScore(checkpoint) - Math.max(0, attempts - 1) * 25);
}
