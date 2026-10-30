import { lessons, finales } from "./curriculum.ts";
export const regions = [
  {
    name: "The Landing",
    theme: "Fractions, ratios & percentages",
    reward: "compass",
    area: "Sunwashed shore",
  },
  {
    name: "Whispering Woods",
    theme: "Ecosystems & environment",
    reward: "scarab",
    area: "Emerald forest",
  },
  {
    name: "The Sunken Ruins",
    theme: "Reading & historical evidence",
    reward: "vase",
    area: "Forgotten temple",
  },
  {
    name: "Serpent Pass",
    theme: "Geometry & measurement",
    reward: "gem",
    area: "Mountain trail",
  },
  {
    name: "The Moon Observatory",
    theme: "Earth & space science",
    reward: "moon",
    area: "Celestial summit",
  },
  {
    name: "The Lost Treasury",
    theme: "Data & probability",
    reward: "crown",
    area: "Heart of the island",
  },
] as const;
export type Challenge = "field-study";
export type Checkpoint = {
  id: number;
  name: string;
  subtitle: string;
  area: string;
  region: number;
  theme: string;
  difficulty: string;
  kind: string;
  prompt: string;
  hint: string;
  reward: string;
  x: number;
  y: number;
  major: boolean;
  challenge?: Challenge;
  options?: string[];
};
const positions: number[][][] = [
  [
    [15, 75],
    [19, 77],
    [23, 80],
    [27, 81],
    [29, 75],
    [26, 70],
    [22, 67],
    [18, 63],
    [14, 67],
    [18, 70],
  ],
  [
    [22, 58],
    [23, 51],
    [25, 44],
    [28, 38],
    [33, 35],
    [38, 37],
    [42, 42],
    [43, 49],
    [39, 55],
    [34, 47],
  ],
  [
    [39, 62],
    [43, 66],
    [43, 73],
    [46, 79],
    [51, 82],
    [56, 78],
    [59, 72],
    [58, 64],
    [57, 58],
    [51, 66],
  ],
  [
    [53, 52],
    [53, 44],
    [51, 36],
    [53, 28],
    [57, 23],
    [62, 22],
    [65, 24],
    [66, 31],
    [59, 39],
    [63, 36],
  ],
  [
    [74, 45],
    [73, 51],
    [73, 58],
    [73, 65],
    [76, 71],
    [81, 69],
    [86, 65],
    [88, 58],
    [85, 50],
    [78, 54],
  ],
  [
    [85, 43],
    [90, 41],
    [93, 34],
    [91, 27],
    [91, 19],
    [88, 13],
    [83, 10],
    [78, 14],
    [78, 22],
    [84, 22],
  ],
];
export const checkpoints: Checkpoint[] = regions.flatMap((region, r) => {
  const entries = lessons[r].map((lesson, i) => ({
    ...lesson,
    id: r * 10 + i + 1,
    subtitle: `Explore ${region.theme.toLowerCase()} along the ${region.area.toLowerCase()}.`,
    area: region.area,
    region: r,
    theme: region.theme,
    kind: region.theme,
    difficulty:
      i < 3
        ? "Getting started"
        : i < 6
          ? "Building skills"
          : "Putting it together",
    reward: region.reward,
    x: positions[r][i][0],
    y: positions[r][i][1],
    major: false,
  }));
  return [
    ...entries,
    {
      ...finales[r],
      id: (r + 1) * 10,
      subtitle: `Put your ${region.theme.toLowerCase()} skills to work in ${region.name.toLowerCase()}.`,
      area: region.area,
      region: r,
      theme: region.theme,
      kind: "Expedition challenge",
      difficulty: "Advanced",
      reward: region.reward,
      x: positions[r][9][0],
      y: positions[r][9][1],
      major: true,
    },
  ];
});
export const TOTAL_CHECKPOINTS = checkpoints.length;
export const pinStates = [
  { id: "available", label: "Available", color: "#975133" },
  { id: "attempted", label: "Attempted", color: "#856216" },
  { id: "completed", label: "Completed", color: "#365c43" },
  { id: "locked", label: "Locked", color: "#666d64" },
] as const;
export function baseScore(id: number) {
  return (
    Math.ceil(id / 10) * 250 + ((id - 1) % 10) * 25 + (id % 10 === 0 ? 1000 : 0)
  );
}
export function coinReward(id: number) {
  return id % 10 === 0 ? 300 : 100;
}
