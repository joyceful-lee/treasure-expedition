export const checkpoints = [
  {
    id: 1,
    name: "The Landing",
    subtitle: "Every adventure starts with a clue.",
    area: "Sunwashed shore",
    difficulty: "Beginner",
    kind: "Riddle",
    prompt:
      "I have a face and two hands, but no arms or legs. I help explorers arrive on time. What am I?",
    hint: "You might find me on a wall or on your wrist.",
    reward: "compass",
    x: 18,
    y: 70,
  },
  {
    id: 2,
    name: "Whispering Woods",
    subtitle: "Listen closely. The forest has a pattern.",
    area: "Emerald forest",
    difficulty: "Easy",
    kind: "Number pattern",
    prompt:
      "Carved into five trees are the numbers 3, 7, 15, 31, ?. What number belongs on the last tree?",
    hint: "Double each number, then add one.",
    reward: "scarab",
    x: 34,
    y: 47,
  },
  {
    id: 3,
    name: "The Sunken Ruins",
    subtitle: "An ancient message beneath the surface.",
    area: "Forgotten temple",
    difficulty: "Medium",
    kind: "Cipher",
    prompt:
      "A stone reads: WUHDVXUH. Each letter was shifted 3 places forward in the alphabet (A became D). Decode the word.",
    hint: "Move each letter back three places. W becomes T.",
    reward: "vase",
    x: 51,
    y: 66,
  },
  {
    id: 4,
    name: "Serpent Pass",
    subtitle: "A winding path. A sharper mind.",
    area: "Mountain trail",
    difficulty: "Tricky",
    kind: "Logic",
    prompt:
      "Three chests are labeled GOLD, SILVER, and MIXED. Every label is wrong. You draw a gold coin from the chest labeled MIXED. What does that chest actually contain: gold, silver, or mixed?",
    hint: "The chest labeled MIXED cannot contain a mix.",
    reward: "gem",
    x: 63,
    y: 36,
  },
  {
    id: 5,
    name: "The Moon Observatory",
    subtitle: "Look beyond what meets the eye.",
    area: "Celestial summit",
    difficulty: "Hard",
    kind: "Number puzzle",
    prompt:
      "A moon gate needs a 3-digit code. The digits add up to 15. The hundreds digit is twice the tens digit. The ones digit is 3 more than the tens digit. What is the code?",
    hint: "Let the tens digit be x: 2x + x + (x + 3) = 15.",
    reward: "moon",
    x: 78,
    y: 54,
  },
  {
    id: 6,
    name: "The Lost Treasury",
    subtitle: "One final secret. A legendary discovery.",
    area: "Heart of the island",
    difficulty: "Expert",
    kind: "Final cipher",
    prompt:
      "The treasury uses A=1, B=2, … Z=26. The numbers 19–5–3–18–5–20 spell a word. Reverse that word, then tell us its third letter.",
    hint: "Decode the word first. Write it backwards carefully.",
    reward: "crown",
    x: 84,
    y: 22,
  },
] as const;
export const treasures = [
  {
    id: "compass",
    name: "Bronze Compass",
    icon: "🧭",
    rarity: "Common",
    description: "A little direction for a big adventure.",
  },
  {
    id: "scarab",
    name: "Jade Scarab",
    icon: "🪲",
    rarity: "Uncommon",
    description: "A tiny guardian of ancient secrets.",
  },
  {
    id: "vase",
    name: "Painted Amphora",
    icon: "🏺",
    rarity: "Uncommon",
    description: "Stories painted a thousand years ago.",
  },
  {
    id: "gem",
    name: "Serpent Emerald",
    icon: "💎",
    rarity: "Rare",
    description: "The green heart of the mountain.",
  },
  {
    id: "moon",
    name: "Moonstone",
    icon: "🌙",
    rarity: "Rare",
    description: "A piece of the night sky, kept safe.",
  },
  {
    id: "crown",
    name: "Sun King’s Crown",
    icon: "👑",
    rarity: "Legendary",
    description: "The greatest discovery on the island.",
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
    id > 1 &&
    !progress.some((p) => p.checkpoint === id - 1 && p.completed_at)
  )
    return "locked";
  return current?.attempts ? "attempted" : "available";
}
