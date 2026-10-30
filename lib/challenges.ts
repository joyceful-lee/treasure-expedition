// Permit complete decimals on submission while text inputs preserve partial typing.
export const decimalAnswerPattern = String.raw`(?:\+|-)?(?:[0-9]+(?:\.[0-9]*)?|\.[0-9]+)`;

export type ActivityField = {
  id: string;
  label: string;
  help: string;
  options?: string[];
  min?: number;
  max?: number;
  step?: number;
};
export const activities: Record<
  number,
  { title: string; fields: ActivityField[] }
> = {
  10: {
    title: "Expedition supply plan",
    fields: [
      {
        id: "water",
        label: "Drinking water (liters)",
        help: "Supply all 12 explorers for all three days.",
        min: 0,
        max: 120,
        step: 0.5,
      },
      {
        id: "concentrate",
        label: "Fruit concentrate (liters)",
        help: "Make the separate 15-liter batch at a concentrate-to-water ratio of 1:4.",
        min: 0,
        max: 15,
        step: 0.5,
      },
      {
        id: "bill",
        label: "Discounted food bill (coins)",
        help: "Apply 25% off the total price of four crates.",
        min: 0,
        max: 80,
        step: 1,
      },
      {
        id: "remaining",
        label: "Food budget left (coins)",
        help: "Subtract the discounted bill from 80 coins.",
        min: 0,
        max: 80,
        step: 1,
      },
    ],
  },
  20: {
    title: "Stream investigation",
    fields: [
      {
        id: "cause",
        label: "Most supported explanation",
        help: "Choose the explanation that fits the pattern across the records.",
        options: [
          "unusually cold water",
          "nutrient runoff",
          "a change in stream direction",
        ],
      },
      {
        id: "evidence",
        label: "Evidence supporting that explanation",
        help: "Compare the two sites, rather than relying on one measurement.",
        options: [
          "identical oxygen at both sites",
          "fewer algae and more oxygen",
          "more nutrients and algae, less oxygen",
        ],
      },
      {
        id: "action",
        label: "Recommended response",
        help: "Choose a response that addresses nutrients entering the stream.",
        options: [
          "plant a streamside buffer",
          "add more fertilizer beside the stream",
          "remove all streamside plants",
        ],
      },
      {
        id: "prediction",
        label: "Predicted oxygen change if blooms shrink",
        help: "Assume less dead algae decomposes and other conditions remain the same.",
        options: ["decrease", "increase", "always stay identical"],
      },
    ],
  },
  30: {
    title: "Harbor evidence board",
    fields: [
      {
        id: "source",
        label: "Firsthand source for the storm",
        help: "Consider when the account was written and what its author observed.",
        options: ["later oral history", "modern adventure story", "dock log"],
      },
      {
        id: "sequence",
        label: "Sequence supported by the dated records",
        help: "Use the dates in the dock log and warehouse ledger.",
        options: [
          "evacuation then storm",
          "storm then evacuation",
          "both happened on day 1",
        ],
      },
      {
        id: "cause",
        label: "Most supported reason for moving the grain",
        help: "Choose what is supported by the ledger, while treating it as evidence rather than certainty.",
        options: ["a festival", "pirate attack", "flood risk"],
      },
      {
        id: "check",
        label: "Best independent evidence to investigate next",
        help: "Seek evidence that could test the explanation.",
        options: [
          "another retelling of the pirate story",
          "dated repairs and water marks",
          "the most exciting painting",
        ],
      },
    ],
  },
  40: {
    title: "Bridge construction plan",
    fields: [
      {
        id: "span",
        label: "Straight bridge span (m)",
        help: "The span is the hypotenuse, not the sum of the two legs.",
        min: 0,
        max: 20,
        step: 0.5,
      },
      {
        id: "area",
        label: "Deck area (square meters)",
        help: "Use the bridge span as length and 2 m as width.",
        min: 0,
        max: 40,
        step: 0.5,
      },
      {
        id: "planks",
        label: "Number of planks",
        help: "Each plank covers 0.5 square meters with no waste.",
        min: 0,
        max: 80,
        step: 1,
      },
      {
        id: "support",
        label: "Triangular support area (square meters)",
        help: "Use a base of 4 m and perpendicular height of 3 m.",
        min: 0,
        max: 20,
        step: 0.5,
      },
    ],
  },
  50: {
    title: "Observatory field report",
    fields: [
      {
        id: "moon",
        label: "Full-moon position relative to Earth",
        help: "Place the Moon so its sunlit face points toward Earth.",
        options: [
          "toward the Sun",
          "opposite the Sun",
          "directly above Earth in this diagram",
        ],
      },
      {
        id: "season",
        label: "Northern Hemisphere season",
        help: "The north is tilted toward the Sun.",
        options: ["winter", "summer", "autumn"],
      },
      {
        id: "forecast",
        label: "Weather forecast",
        help: "Use falling pressure and gathering thick clouds.",
        options: [
          "rain is guaranteed at noon",
          "clear skies are guaranteed",
          "rain is more likely",
        ],
      },
      {
        id: "process",
        label: "Vapor becoming cloud droplets",
        help: "Identify the change from gas to liquid.",
        options: ["evaporation", "condensation", "precipitation"],
      },
    ],
  },
  60: {
    title: "Treasure pack investigation",
    fields: [
      {
        id: "rare",
        label: "Rare treasure chance (%)",
        help: "Convert 2 favorable outcomes out of 10 to a percent.",
        min: 0,
        max: 100,
        step: 1,
      },
      {
        id: "twice",
        label: "Two rare treasures in two independent packs (%)",
        help: "Multiply the probabilities, then convert to a percent.",
        min: 0,
        max: 100,
        step: 1,
      },
      {
        id: "resale",
        label: "Expected resale per pack (coins)",
        help: "Add the probability-weighted resale values for all three rarities.",
        min: 0,
        max: 12,
        step: 0.1,
      },
      {
        id: "net",
        label: "Expected net gain per pack (coins)",
        help: "Subtract the 6-coin price. Enter a negative number for an average loss.",
        min: -6,
        max: 6,
        step: 0.1,
      },
    ],
  },
};
