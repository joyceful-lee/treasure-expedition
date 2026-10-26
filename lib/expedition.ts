export {
  checkpoints,
  regions,
  TOTAL_CHECKPOINTS,
  pinStates,
  baseScore,
  coinReward,
} from "./route-data.ts";
export type { Checkpoint } from "./route-data.ts";
export { treasures, rarityChances } from "./artifacts.ts";
export type Progress = {
  checkpoint: number;
  attempts: number;
  completed_at: string | null;
  score: number;
  treasure_id?: string | null;
  started_at?: string | null;
  duration_ms?: number | null;
};
export type Profile = { id: string; username: string; coins: number };
export type Item = { treasure_id: string; quantity: number };
export type Trade = {
  id: string;
  maker_id: string;
  username: string;
  offered: string;
  requested: string;
  status: string;
};
export function stateFor(id: number, progress: Progress[]) {
  const current = progress.find((p) => p.checkpoint === id);
  if (current?.completed_at) return "completed";
  if (
    Array.from({ length: id - 1 }, (_, i) => i + 1).some(
      (previous) =>
        !progress.some((p) => p.checkpoint === previous && p.completed_at),
    )
  )
    return "locked";
  return current?.attempts ? "attempted" : "available";
}
