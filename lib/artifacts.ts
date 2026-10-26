export const treasures = [
  [
    "compass",
    "Bronze Compass",
    "Common",
    40,
    "A worn brass compass with a red north needle.",
  ],
  [
    "coin",
    "Harbor Coin",
    "Common",
    40,
    "A copper trade coin rubbed smooth by many hands.",
  ],
  [
    "shard",
    "Painted Shard",
    "Common",
    40,
    "A fragment of blue-glazed pottery with a wave border.",
  ],
  [
    "arrowhead",
    "Flint Arrowhead",
    "Common",
    40,
    "A knapped flint point with finely chipped edges.",
  ],
  [
    "bead",
    "Clay Bead",
    "Common",
    40,
    "An ochre bead threaded on a faded linen cord.",
  ],
  [
    "button",
    "Sailor’s Button",
    "Common",
    40,
    "A bronze coat button stamped with an anchor.",
  ],
  [
    "scarab",
    "Jade Scarab",
    "Uncommon",
    16,
    "A green carved beetle with bronze legs.",
  ],
  [
    "vase",
    "Painted Amphora",
    "Uncommon",
    16,
    "A two-handled vessel painted with geometric bands.",
  ],
  [
    "key",
    "Cistern Key",
    "Uncommon",
    16,
    "An iron key with a pierced trefoil bow.",
  ],
  [
    "shell",
    "Pearl Shell",
    "Uncommon",
    16,
    "An iridescent shell holding a single pale pearl.",
  ],
  [
    "lantern",
    "Amber Lantern",
    "Uncommon",
    16,
    "A latticed bronze lantern with amber glass.",
  ],
  [
    "tablet",
    "Clay Star Tablet",
    "Uncommon",
    16,
    "A clay tablet impressed with an early star chart.",
  ],
  [
    "gem",
    "Serpent Emerald",
    "Rare",
    8,
    "A deep green crystal cut into steep facets.",
  ],
  [
    "moon",
    "Moonstone",
    "Rare",
    8,
    "A translucent stone held in a narrow bronze setting.",
  ],
  [
    "astrolabe",
    "Navigator’s Astrolabe",
    "Rare",
    8,
    "An engraved instrument with a movable sighting arm.",
  ],
  [
    "mask",
    "Obsidian Mask",
    "Rare",
    8,
    "A dark ceremonial face inlaid with turquoise.",
  ],
  [
    "dagger",
    "Crystal Dagger",
    "Rare",
    8,
    "A clear mineral blade with a wrapped gold hilt.",
  ],
  [
    "brooch",
    "Kingfisher Brooch",
    "Rare",
    8,
    "An enamel bird with a long silver beak.",
  ],
  [
    "idol",
    "Jade Guardian",
    "Epic",
    3,
    "A seated guardian carved from a single piece of jade.",
  ],
  [
    "chalice",
    "Twilight Chalice",
    "Epic",
    3,
    "A silver cup set with violet stones around its rim.",
  ],
  [
    "orb",
    "Stormglass Orb",
    "Epic",
    3,
    "A blue glass sphere held in an engraved bronze cradle.",
  ],
  [
    "lyre",
    "Sunstring Lyre",
    "Epic",
    3,
    "A small gilded lyre with seven surviving strings.",
  ],
  [
    "crown",
    "Sun King’s Crown",
    "Legendary",
    2,
    "A hammered gold circlet set with red and green stones.",
  ],
  [
    "phoenix",
    "Phoenix Medallion",
    "Legendary",
    2,
    "A gold firebird pendant with a ruby at its heart.",
  ],
].map(([id, name, rarity, weight, description]) => ({
  id: String(id),
  name: String(name),
  rarity: String(rarity),
  weight: Number(weight),
  description: String(description),
}));
export const totalArtifactWeight = treasures.reduce(
  (sum, t) => sum + t.weight,
  0,
);
export const rarityChances = [
  "Common",
  "Uncommon",
  "Rare",
  "Epic",
  "Legendary",
].map((rarity) => ({
  rarity,
  chance:
    (treasures
      .filter((t) => t.rarity === rarity)
      .reduce((sum, t) => sum + t.weight, 0) /
      totalArtifactWeight) *
    100,
}));

export const sellPrices: Record<string, number> = {
  Common: 40,
  Uncommon: 100,
  Rare: 240,
  Epic: 600,
  Legendary: 1500,
};
