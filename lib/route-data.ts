export const regions = [
  {
    name: "The Landing",
    theme: "Riddles",
    reward: "compass",
    area: "Sunwashed shore",
  },
  {
    name: "Whispering Woods",
    theme: "Numbers",
    reward: "scarab",
    area: "Emerald forest",
  },
  {
    name: "The Sunken Ruins",
    theme: "Ciphers",
    reward: "vase",
    area: "Forgotten temple",
  },
  {
    name: "Serpent Pass",
    theme: "Logic",
    reward: "gem",
    area: "Mountain trail",
  },
  {
    name: "The Moon Observatory",
    theme: "Navigation",
    reward: "moon",
    area: "Celestial summit",
  },
  {
    name: "The Lost Treasury",
    theme: "Deductions",
    reward: "crown",
    area: "Heart of the island",
  },
] as const;
export type Challenge =
  "reliquary" | "magic-square" | "rotors" | "bridge" | "star-chart" | "vault";
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
};
type Clue = [name: string, prompt: string, hint: string];
const clues: Clue[][] = [
  [
    [
      "The Landing",
      "I have a face and two hands, but no arms or legs. I help explorers arrive on time. What am I?",
      "You might find me on a wall or on your wrist.",
    ],
    [
      "Folded Coast",
      "I have cities without houses, forests without trees, and rivers without water. What am I?",
      "An explorer folds me before putting me in a pocket.",
    ],
    [
      "Hollow Cove",
      "I answer when you call, though I have no voice of my own. What am I?",
      "Listen after shouting into a cave.",
    ],
    [
      "Wax Lantern",
      "I become shorter the longer I work, and a breeze can end my work. What am I?",
      "My work gives you light.",
    ],
    [
      "Sand Tracks",
      "The more steps you take along the beach, the more of me you leave behind. What am I?",
      "Look at the sand behind you.",
    ],
    [
      "Empty Well",
      "The more earth you take from me, the larger I become. What am I?",
      "Digging makes me.",
    ],
    [
      "Silent Arch",
      "I disappear as soon as you say my name aloud. What am I?",
      "Think of what a sound interrupts.",
    ],
    [
      "Long Shadow",
      "I follow your shape without touching you, grow long near sunset, and vanish in complete darkness. What am I?",
      "Light creates me on the ground.",
    ],
    [
      "Diver’s Rest",
      "You can hold me without your hands, but keeping me too long makes you need the air above the sea. What am I?",
      "A diver takes me before going underwater.",
    ],
  ],
  [
    [
      "The Carved Trees",
      "Carved into five trees are the numbers 3, 7, 15, 31, ?. What number belongs on the last tree?",
      "Double each number, then add one.",
    ],
    [
      "Triangular Clearing",
      "Stone piles contain 1, 3, 6, 10, 15, and 21 stones. How many belong in the next pile?",
      "The gaps increase by one each time.",
    ],
    [
      "Square Roots",
      "A trail reads 1, 4, 9, 16, 25, 36, ?. What comes next?",
      "Each number is a whole number multiplied by itself.",
    ],
    [
      "Branching Steps",
      "A ladder has steps marked 2, 6, 12, 20, 30, ?. Find the next number.",
      "Try multiplying each position by the next whole number.",
    ],
    [
      "Spiral Trunk",
      "The numbers 1, 1, 2, 3, 5, 8, 13, 21, 34, 55 wind around a tree. What comes next?",
      "Add the previous two numbers.",
    ],
    [
      "Remainder Stones",
      "Find the positive number below 100 that is divisible by 7, leaves remainder 1 when divided by 5, and remainder 3 when divided by 4.",
      "List multiples of seven, then test both remainders.",
    ],
    [
      "Unequal Weights",
      "Two stones weigh 84 units together. The larger weighs three times as much as the smaller. What does the smaller stone weigh?",
      "The total contains four equal shares.",
    ],
    [
      "Crossing Paths",
      "A grid has four rows and four columns of intersections. From the bottom-left corner, how many different routes reach the top-right if every move goes one intersection right or up?",
      "Every route has three right moves and three up moves.",
    ],
    [
      "The Last Digit",
      "Only the last digit of 7 raised to the power 2026 is needed to open a gate. What is that digit?",
      "The last digits repeat in a cycle of four.",
    ],
  ],
  [
    [
      "The Inscribed Stone",
      "A stone reads WUHDVXUH. Each letter was shifted three places forward in the alphabet. Decode the word.",
      "Move each letter back three places.",
    ],
    [
      "Numbered Columns",
      "Using A=1 through Z=26, decode 3–15–13–16–1–19–19.",
      "Convert each number to a letter in order.",
    ],
    [
      "Mirror Alphabet",
      "The inscription NZK uses an alphabet reflected from end to end: A becomes Z, B becomes Y, and so on. Decode it.",
      "N reflects to M.",
    ],
    [
      "Backwards Stream",
      "A reflection reads RETAW. Read the letters in the opposite order to recover the word.",
      "Start with the final letter.",
    ],
    [
      "Binary Tablet",
      "Three eight-bit ASCII groups read 01001011 01000101 01011001. What word do they spell?",
      "The groups represent decimal 75, 69, and 89; A has ASCII value 65.",
    ],
    [
      "Signal Chamber",
      "Decode the Morse message -. / --- / .-. / - / .... . The needed letters are N=-., O=---, R=.-., T=-, H=.... .",
      "Read one letter between each slash.",
    ],
    [
      "False Scratches",
      "The stone reads SxExAxLx. Every second character is a scratch added to hide the real word. What remains?",
      "Keep positions 1, 3, 5, and 7.",
    ],
    [
      "Twin Rails",
      "A scribe split a six-letter word into its odd-position letters and even-position letters, then joined the two groups as SCEERT. Reconstruct the word.",
      "Interleave SCE and ERT.",
    ],
    [
      "The Repeating Key",
      "Decode DIKZPC with the repeating key KEY. Using A=0 through Z=25, subtract each key letter from the matching message letter and wrap below zero.",
      "Repeat KEY as KEYKEY; D minus K wraps to T.",
    ],
  ],
  [
    [
      "Three Chests",
      "Three chests are labeled GOLD, SILVER, and MIXED, and every label is wrong. A gold coin is drawn from the chest labeled MIXED. Does that chest contain gold, silver, or mixed coins?",
      "The chest labeled MIXED cannot contain a mix.",
    ],
    [
      "The Jade Rule",
      "Every scarab is made of jade, and no jade object is made of iron. Can an iron object be one of these scarabs? Answer yes or no.",
      "Follow the rule through the shared material.",
    ],
    [
      "One True Plaque",
      "Gold is in exactly one chest. A says ‘Gold is in B.’ B says ‘Gold is not in B.’ C says ‘Gold is not in A.’ Exactly one plaque is true. Which chest holds gold: A, B, or C?",
      "Test each possible location and count true plaques.",
    ],
    [
      "The Two Guides",
      "Each guide always tells the truth or always lies. A says ‘B is a liar.’ B says ‘A and I are different types.’ Which guide tells the truth?",
      "If B were lying, A would be truthful, making B’s statement true.",
    ],
    [
      "The River Cargo",
      "A boat carries a keeper and at most one of a wolf, a goat, and a cabbage. The wolf cannot be left with the goat, or the goat with the cabbage, without the keeper. What is the minimum number of one-way crossings to move them all across?",
      "The goat must sometimes travel back.",
    ],
    [
      "The Heavy Coin",
      "One of nine identical-looking coins is heavier. What is the fewest balance-scale weighings that always identify it?",
      "Split the coins into three equal groups.",
    ],
    [
      "Moonlit Door",
      "A door opens only if the moon is visible. The moon is visible tonight. Does that fact alone guarantee the door opens? Answer yes or no.",
      "A necessary condition need not be sufficient.",
    ],
    [
      "Two True Tests",
      "The code is one of 10, 15, 21, or 24. Exactly two statements are true: it is even; it is divisible by 3; it exceeds 20. What is the code?",
      "Count true statements separately for each choice.",
    ],
    [
      "The Warm Lamp",
      "Switch A was on for several minutes and is now off. B is on, while C has never been on. A lamp is warm but unlit. Which switch controls it?",
      "Warmth remains after a lamp is turned off.",
    ],
  ],
  [
    [
      "The Moon Gate",
      "The observatory needs a three-digit code. Its digits add to 15, the hundreds digit is twice the tens digit, and the ones digit is three more than the tens digit. What is the code?",
      "If the tens digit is x, then 2x+x+(x+3)=15.",
    ],
    [
      "Turning Compass",
      "Starting north, turn clockwise through 135 degrees. Which compass direction are you facing?",
      "A quarter-turn is 90 degrees, and the next halfway direction adds 45.",
    ],
    [
      "The Star Grid",
      "Columns A–G run west to east, and rows 1–7 run south to north. Start at B2, move two rows north and three columns east. Where do you finish?",
      "Change the row and column separately.",
    ],
    [
      "Surveyor’s Scale",
      "On a chart, 1 cm represents 250 metres. How many metres does a 3.6 cm trail represent?",
      "Multiply the chart distance by 250.",
    ],
    [
      "Return Bearing",
      "A ship travels on a bearing of 070 degrees, measured clockwise from north. What bearing points directly back along its route?",
      "Reverse a bearing by adding 180 degrees and wrapping at 360.",
    ],
    [
      "Across the Courtyard",
      "A star is three units east and four units south of the telescope. What is the straight-line distance in units?",
      "Use a right triangle with legs 3 and 4.",
    ],
    [
      "Rotating Chart",
      "Rotate the point (2,1) by 90 degrees clockwise around the origin. Enter the new coordinates as x,y.",
      "A clockwise quarter-turn maps (x,y) to (y,-x).",
    ],
    [
      "The Clockwork Sky",
      "What is the smaller angle, in degrees, between the hands of a clock at 3:20?",
      "The hour hand moves between the hour marks as the minutes pass.",
    ],
    [
      "Across Midnight",
      "Two stars have right ascensions of 23 hours and 1 hour. At 15 degrees per hour, what is their shorter angular separation?",
      "The shorter route crosses midnight.",
    ],
  ],
  [
    [
      "The Reversed Inscription",
      "Using A=1 through Z=26, decode 19–5–3–18–5–20. Reverse that word and enter its third letter.",
      "Decode the whole word before reversing it.",
    ],
    [
      "The Quiet Anagram",
      "Rearrange all six letters of LISTEN to form a word meaning ‘making no sound.’",
      "The answer begins with S.",
    ],
    [
      "Four-Step Key",
      "A number pattern begins 7, 11, 15, 19. Use its common difference as a Caesar shift to decode OIC by moving backwards.",
      "Find the difference, then shift each letter back by that amount.",
    ],
    [
      "The Treasure Weights",
      "A key weighs as much as three compasses, a compass weighs as much as two scarabs, and a scarab weighs four units. What does the key weigh?",
      "Work upwards from the scarab.",
    ],
    [
      "The Hidden Position",
      "A vault chart has eastward columns A–G and northward rows 1–7. Its note says ‘From B2, add the number of sides of a triangle to the column and the number of eyes on a face to the row.’ Which square is named?",
      "A triangle gives the eastward move, and a pair of eyes gives the northward move.",
    ],
    [
      "The Divisible Seal",
      "Find the two-digit code strictly between 30 and 40 that is odd, divisible by three, and has digits adding to six.",
      "Use the digit sum to narrow the possible multiples of three.",
    ],
    [
      "The Margin Message",
      "Read the first letters of these five lines: Night covers the shore; Old paths vanish; Rivers turn silver; Towers hold their watch; Home lies beyond the trees. What direction do they spell?",
      "Ignore every letter except the first on each line.",
    ],
    [
      "The Roman Seal",
      "The numeral XLIX is stamped on a weight. What number does it represent?",
      "XL means ten before fifty, and IX means one before ten.",
    ],
    [
      "The Last Reflection",
      "Reflect GIVZHFIV through the alphabet, where A swaps with Z, then reverse the decoded word. Enter the third letter of the reversed result.",
      "The reflected word is the thing you have been collecting.",
    ],
  ],
];
const finales: {
  name: string;
  challenge: Challenge;
  prompt: string;
  hint: string;
}[] = [
  {
    name: "The Landing Reliquary",
    challenge: "reliquary",
    prompt:
      "Identify the six objects described on the reliquary, then use their engraved values to form the seal. Read the values of objects 1, 3, and 5 in that order.",
    hint: "Solve each description independently, then use the value table rather than the letters in the object names.",
  },
  {
    name: "Whispering Woods",
    challenge: "magic-square",
    prompt:
      "Restore the forest’s four-by-four square with every whole number from 1 to 16 exactly once. Every row, every column, and both long diagonals must add to 34; the engraved cells cannot be changed.",
    hint: "The eight unfilled cells come from 2, 3, 5, 8, 9, 12, 14, and 15. Start with rows that contain two engraved values.",
  },
  {
    name: "The Sunken Ruins",
    challenge: "rotors",
    prompt:
      "Use the outer rotor to recover an instruction from ZOPMA MPCL, then apply that instruction to the inner inscription YMJ LFYJ TUJSX FY IFBS. Reverse the final word of the inner inscription to open the chamber.",
    hint: "Each rotor subtracts its shift from every letter. The outer instruction tells you how to set the inner rotor.",
  },
  {
    name: "Serpent Pass",
    challenge: "bridge",
    prompt:
      "Rearrange all eight stone plates so that every inscription holds true. The bridge opens only when the complete order is correct.",
    hint: "Combine the owl–crown pair with the three-place gap from key to owl, then locate the moon relative to the river.",
  },
  {
    name: "The Moon Observatory",
    challenge: "star-chart",
    prompt:
      "The star chart is rotated: chart north points right, east points down, south points left, and west points up. Starting at C3, mark each landing from the bearings below, then add the numbers at landings 2, 4, 6, and 8 to obtain the seal.",
    hint: "Translate the chart’s directions to screen directions before moving. The row number increases downwards on this chart.",
  },
  {
    name: "The Lost Treasury",
    challenge: "vault",
    prompt:
      "Set the three number rings, arrange the levers, and decipher the final word. All three mechanisms must agree before the treasury opens.",
    hint: "Solve the ring equation first; the first digit minus the second gives the alphabet shift. Test each lever order against the plaques and the moon-before-river rule.",
  },
];
const positions: number[][][] = [
  [
    [13, 74],
    [17, 80],
    [22, 83],
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
    [54, 58],
    [51, 66],
  ],
  [
    [53, 52],
    [53, 44],
    [51, 36],
    [53, 28],
    [57, 23],
    [62, 22],
    [67, 24],
    [70, 29],
    [69, 37],
    [63, 36],
  ],
  [
    [68, 45],
    [71, 51],
    [69, 59],
    [71, 66],
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
  const entries = clues[r].map(([name, prompt, hint], i) => ({
    id: r * 10 + i + 1,
    name,
    prompt,
    hint,
    subtitle: `${region.theme} recorded along the ${region.area.toLowerCase()}.`,
    area: region.area,
    region: r,
    theme: region.theme,
    kind: region.theme,
    difficulty: i < 3 ? "Measured" : i < 6 ? "Difficult" : "Advanced",
    reward: region.reward,
    x: positions[r][i][0],
    y: positions[r][i][1],
    major: false,
  }));
  const finale = finales[r];
  return [
    ...entries,
    {
      ...finale,
      id: (r + 1) * 10,
      subtitle: `The final mechanism guarding ${region.name.toLowerCase()} puts this region’s theme to its hardest test.`,
      area: region.area,
      region: r,
      theme: region.theme,
      kind: "Interactive challenge",
      difficulty: "Extreme",
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
