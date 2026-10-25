export const reliquaryObjects = [
  "comb",
  "mirror",
  "needle",
  "river",
  "sponge",
  "towel",
];
export const objectValues: Record<string, number> = {
  comb: 6,
  mirror: 8,
  needle: 5,
  river: 4,
  sponge: 1,
  towel: 3,
};
export const reliquaryClues = [
  "I show a traveller their face without ever seeing it myself. Turn me away, and the face is gone.",
  "My body has many holes, yet I carry water when lifted from a basin.",
  "I have one eye that never sees, and I pull a thread wherever I go.",
  "The more thoroughly I dry a traveller, the wetter I become.",
  "My teeth pass through a traveller’s hair, but they never take a bite.",
  "I run from the hills without legs, and my mouth opens into the sea without eating.",
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
