/** An unfinished checkpoint has no stars; successful attempts earn at least one. */
export function starsFor(attempts: number, completed: boolean): number {
  return completed && attempts > 0 ? Math.max(1, 4 - attempts) : 0;
}
