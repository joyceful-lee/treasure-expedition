export {
  checkpoints,
  regions,
  TOTAL_CHECKPOINTS,
  pinStates,
  baseScore,
  coinReward,
} from "./route-data.ts";
export type { Checkpoint } from "./route-data.ts";
export const treasures = [
  {
    id: "compass",
    name: "Bronze Compass",
    rarity: "Common",
    description:
      "A brass-cased compass with a worn sighting ring and a red north needle.",
  },
  {
    id: "scarab",
    name: "Jade Scarab",
    rarity: "Uncommon",
    description: "A carved green scarab mounted on six slender bronze legs.",
  },
  {
    id: "vase",
    name: "Painted Amphora",
    rarity: "Uncommon",
    description:
      "A two-handled clay vessel with geometric bands around its shoulder.",
  },
  {
    id: "gem",
    name: "Serpent Emerald",
    rarity: "Rare",
    description:
      "A cut green crystal whose pale seams follow the shape of its facets.",
  },
  {
    id: "moon",
    name: "Moonstone",
    rarity: "Rare",
    description:
      "A translucent stone set into a narrow bronze base beneath a crescent mark.",
  },
  {
    id: "crown",
    name: "Sun King’s Crown",
    rarity: "Legendary",
    description:
      "A hammered gold circlet set with green stone and two red cabochons.",
  },
] as const;
export type Progress = {
  checkpoint: number;
  attempts: number;
  completed_at: string | null;
  score: number;
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
