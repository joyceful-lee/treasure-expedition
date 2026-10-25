export const reliquaryObjects = [
  "book",
  "candle",
  "clock",
  "echo",
  "key",
  "map",
];
export const objectValues: Record<string, number> = {
  map: 3,
  candle: 7,
  echo: 2,
  key: 9,
  book: 4,
  clock: 6,
};
export const reliquaryClues = [
  "I hold countries and rivers within a folded sheet, yet neither soil nor water can escape me.",
  "My life is measured by the light I give, and each hour consumes a little more of my body.",
  "I return a traveller’s words after they have finished speaking, though no traveller lives inside me.",
  "My teeth have never bitten, but a turn of my body can release what iron has imprisoned.",
  "I can carry many voices across centuries while remaining silent on a shelf.",
  "My hands chase one another around the same face, though neither ever catches the other.",
];
export const magicEngravings: Record<number, number> = {
  0: 16,
  3: 13,
  5: 10,
  6: 11,
  9: 6,
  10: 7,
  12: 4,
  15: 1,
};
export const bridgeTokens = [
  "sun",
  "key",
  "crown",
  "moon",
  "owl",
  "river",
  "tree",
  "serpent",
];
export const bridgeClues = [
  "The tree stands at one end of the bridge and comes before the moon.",
  "The crown immediately follows the owl.",
  "The key stands exactly three places before the owl.",
  "The river immediately follows the key.",
  "The sun stands after the river but before the owl.",
  "The moon stands exactly three places before the river.",
  "The serpent stands after the moon but before the key.",
];
export const starNumbers = [
  2, 9, 4, 7, 1, 8, 3, 6, 2, 5, 1, 7, 5, 9, 4, 6, 2, 8, 3, 7, 4, 5, 1, 6, 9,
];
export const starBearings = ["W2", "N2", "E3", "S4", "W1", "N1", "E2", "N3"];
export const vaultPlaques = [
  "Sun plaque: ‘The moon lever must be pulled first.’",
  "Moon plaque: ‘The sun lever must be pulled first.’",
  "River plaque: ‘The river lever must be pulled last.’",
];
export function shiftText(text: string, shift: number) {
  return text.replace(/[A-Z]/g, (c) =>
    String.fromCharCode(((c.charCodeAt(0) - 65 - shift + 26) % 26) + 65),
  );
}
