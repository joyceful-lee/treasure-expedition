// Server-only answer module. Never import into a client component.
const answers: Record<number, string[]> = {
  1: ["clock", "a clock", "watch", "a watch"],
  2: ["63"],
  3: ["treasure"],
  4: ["gold"],
  5: ["636"],
  6: ["r"],
};
export function isCorrect(checkpoint: number, answer: string) {
  return (
    answers[checkpoint]?.includes(
      answer
        .trim()
        .toLowerCase()
        .replace(/[.!?]+$/, ""),
    ) ?? false
  );
}
export function scoreFor(checkpoint: number, attempts: number) {
  return Math.max(100, checkpoint * 250 - Math.max(0, attempts - 1) * 25);
}
