// Public questions and teaching hints. Answers stay in curriculum-answers.ts.
export const lessons = [
  [
    {
      name: "The Landing",
      prompt:
        "A quarter means one of four equal parts: one quarter of 8 is 2. Your crew has 12 water flasks. How many flasks make one quarter of the supply?",
      hint: "Divide the total into four equal groups.",
    },
    {
      name: "Seabird Cove",
      prompt:
        "There are 24 snack bars in a crate. The scouting team receives 3/8 of them. How many bars does the team receive?",
      hint: "Find one eighth first, then take three of those groups.",
    },
    {
      name: "Eastern Arch",
      prompt:
        "The crew drinks 1/4 of a full water barrel in the morning and 1/3 of the original full barrel in the afternoon. What fraction of the original barrel remains?",
      hint: "Write both fractions with a denominator of 12, add what was used, then subtract from one whole.",
    },
    {
      name: "Watchkeeper’s Shelter",
      prompt:
        "Pack water crates and food crates in a ratio of 2:3. If you pack 18 food crates, how many water crates keep the same ratio?",
      hint: "The three food parts have become 18 crates. Apply the same scale factor to the two water parts.",
    },
    {
      name: "Southern Trail",
      prompt:
        "Four explorers need 6 liters of drinking water for a day. At the same rate per person, how many liters do 10 explorers need?",
      hint: "Find the liters needed by one explorer before scaling up.",
    },
    {
      name: "Abandoned Camp",
      prompt:
        "A tent costs 80 coins before a 25% discount. How many coins will you pay after the discount?",
      hint: "25% is one quarter. Subtract that part of the original price.",
    },
    {
      name: "Weathered Arch",
      prompt:
        "A guide charges 40 coins. Your crew adds a 15% tip. How many coins is the tip alone?",
      hint: "Find 10% and 5% of 40, then add them.",
    },
    {
      name: "Western Ridge",
      prompt:
        "A camp’s water reserve rises from 50 liters to 65 liters. What is the percentage increase? Enter the percent, such as 20 for 20%.",
      hint: "Divide the increase by the starting amount, then multiply by 100.",
    },
    {
      name: "Tidal Steps",
      prompt:
        "On a map, 1 cm represents 250 m. The trail measures 4.8 cm on the map. How long is the real trail in meters?",
      hint: "Each centimeter represents another 250 meters; multiply the map length by the scale.",
    },
  ],
  [
    {
      name: "The Carved Trees",
      prompt:
        "Plants are producers because they make food using sunlight. In the chain grass → rabbit → fox, which organism is the producer?",
      hint: "Identify the organism that can make food rather than eat another organism.",
      options: ["Fox", "Grass", "Rabbit"],
    },
    {
      name: "Fern Clearing",
      prompt:
        "In the chain grass → rabbit → fox, where does the energy originally enter this food chain?",
      hint: "Think about what powers the grass’s food-making process.",
      options: ["Sunlight", "Soil", "The fox"],
    },
    {
      name: "Mossy Bank",
      prompt:
        "Frogs eat insects in a pond. If the frog population falls and other conditions stay the same, what will most likely happen to the insect population?",
      hint: "Consider how many insects are eaten when there are fewer frogs.",
      options: ["Decrease", "Stay exactly the same", "Increase"],
    },
    {
      name: "Canopy Walk",
      prompt:
        "A desert plant has a thick, waxy surface. Which benefit best explains this adaptation?",
      hint: "A waxy barrier slows the movement of water out of a plant.",
      options: [
        "Absorbing less water through roots",
        "Reducing water loss",
        "Attracting predators",
      ],
    },
    {
      name: "Stream Bend",
      prompt:
        "Fungi break down fallen leaves and return nutrients to the soil. What is their role in the ecosystem?",
      hint: "Name the role that breaks down dead material.",
      options: ["Producer", "Predator", "Decomposer"],
    },
    {
      name: "Rock Pools",
      prompt:
        "An introduced vine grows over native plants and blocks their sunlight. Which interaction does this demonstrate?",
      hint: "Both plants need a resource that has become harder to get.",
      options: ["Pollination", "Camouflage", "Competition"],
    },
    {
      name: "Forest Edge",
      prompt:
        "You test whether sunlight affects seedling growth. Both groups use the same plant species and soil. Which factor should also stay the same?",
      hint: "Change only the light treatment so another difference cannot explain the result.",
      options: ["Growth results", "Water amount", "Light duration"],
    },
    {
      name: "Ranger’s Camp",
      prompt:
        "After fertilizer washes into a pond, algae grow rapidly. When large amounts of algae die, decomposers use more oxygen. What will most likely happen to the oxygen available to fish?",
      hint: "The decomposers and fish both use dissolved oxygen.",
      options: ["Increase", "Decrease", "Stay exactly the same"],
    },
    {
      name: "Watershed Lookout",
      prompt:
        "A farm may be adding nutrients to a stream. Which study gives the strongest comparison?",
      hint: "Use a nearby comparison and repeated observations under similar conditions.",
      options: [
        "One downstream sample",
        "Two unrelated lakes",
        "Upstream and downstream",
      ],
    },
  ],
  [
    {
      name: "The Inscribed Stone",
      prompt:
        "A journal reads: “Waves damaged our seawall. Neighbors carried stone to the harbor. By evening, we had repaired the gap.” Which main idea best fits this passage?",
      hint: "Choose the idea that connects all three sentences rather than one small detail.",
      options: [
        "Repairing storm damage",
        "Preparing a feast",
        "Finding a new island",
      ],
    },
    {
      name: "Pottery Courtyard",
      prompt:
        "A room contains rows of large storage jars, traces of grain, and a delivery tally. Which use of the room is best supported?",
      hint: "Look for an explanation supported by several separate clues.",
      options: ["Sleeping quarters", "A watchtower", "Food storage"],
    },
    {
      name: "Broken Stair",
      prompt: "Which is a primary source for life at the ancient port?",
      hint: "A primary source comes directly from the time or people being studied.",
      options: [
        "Recent historical novel",
        "Merchant’s diary",
        "Modern textbook",
      ],
    },
    {
      name: "Harbor Wall",
      prompt:
        "A wealthy merchant writes, “Everyone loved the new harbor tax.” Why should you check other accounts?",
      hint: "A person’s position and interests can limit the viewpoints they record.",
      options: [
        "The author may not represent everyone",
        "Old writing is always false",
        "A diary cannot contain facts",
      ],
    },
    {
      name: "Archive Room",
      prompt:
        "In an undisturbed excavation, layer A is at the bottom, B is above A, and C is at the top. Which layer is generally oldest? Enter A, B, or C.",
      hint: "Later material usually builds up over earlier material when the layers have not been disturbed.",
      options: ["B", "C", "A"],
    },
    {
      name: "Market Steps",
      prompt:
        "Which statement is a checkable observation rather than an opinion?",
      hint: "Choose the statement that can be checked by measurement.",
      options: [
        "The builders had excellent taste",
        "The wall is 2 meters high",
        "This was the finest port",
      ],
    },
    {
      name: "Workshop Floor",
      prompt: "Which finding most directly supports trade with another region?",
      hint: "Look for an object whose origin connects this place with another community.",
      options: [
        "Coins minted in a distant city",
        "Locally made roof tiles",
        "Cracks from an earthquake",
      ],
    },
    {
      name: "Flood Mark",
      prompt:
        "Two accounts give different dates for a harbor closure. Which next step would best help you investigate the disagreement?",
      hint: "Look for independent evidence that can help check the disputed dates.",
      options: [
        "Trust the longer account",
        "Discard both accounts",
        "Compare dated repair records",
      ],
    },
    {
      name: "Council Chamber",
      prompt:
        "Account A says, “A storm struck on day 3; the market shut on day 4.” Account B says, “The market closed the day after the storm, although the tax dispute was the real cause.” What do both accounts agree on?",
      hint: "Separate the shared sequence of events from the authors’ different explanations.",
      options: [
        "Flooding was the only cause of closure",
        "The storm came before closure",
        "Taxes caused the storm",
      ],
    },
  ],
  [
    {
      name: "Trail Marker",
      prompt:
        "The area of a rectangle is length × width. A 5 m by 3 m shelter covers 15 square meters. How many square meters does a 7 m by 4 m camp cover?",
      hint: "Multiply the two side lengths; area counts squares inside the boundary.",
    },
    {
      name: "Cliffside Camp",
      prompt:
        "A rectangular camp is 7 m long and 4 m wide. How many meters of rope are needed to go once around its boundary?",
      hint: "Perimeter includes all four sides, not the space inside.",
    },
    {
      name: "Rope Crossing",
      prompt:
        "A triangular sail has a base of 8 m and a perpendicular height of 5 m. Its area is half of base × height. What is its area in square meters?",
      hint: "A triangle with this base and height covers half the corresponding rectangle.",
    },
    {
      name: "Stone Mosaic",
      prompt:
        "A 10 m by 6 m courtyard has a rectangular 2 m by 3 m pond inside it. How many square meters of courtyard remain outside the pond?",
      hint: "Find the large rectangle’s area and subtract the pond’s area.",
    },
    {
      name: "Lookout Platform",
      prompt:
        "A circular platform has a diameter of 10 m. Circumference = π × diameter. Using π = 3.14, what is the circumference in meters?",
      hint: "Use the diameter directly; you do not need to halve it for this formula.",
    },
    {
      name: "Water Cistern",
      prompt:
        "A rectangular cistern is 4 m long, 3 m wide, and 2 m deep. What is its volume in cubic meters?",
      hint: "Volume is length × width × height.",
    },
    {
      name: "Surveyor’s Post",
      prompt:
        "A drawing uses a scale of 1:50, so 1 cm on paper represents 50 cm in real life. A wall is 4 m long. How many centimeters long should it be on the drawing?",
      hint: "Convert the real length into centimeters before dividing by the scale factor.",
    },
    {
      name: "Switchback Trail",
      prompt:
        "A triangular trail marker has angles of 48° and 67°. The three interior angles total 180°. What is the third angle in degrees?",
      hint: "Add the two known angles, then find what is missing from 180°.",
    },
    {
      name: "Bridge Abutment",
      prompt:
        "A shortcut crosses a right triangle whose perpendicular sides are 6 m and 8 m. The shortcut is the hypotenuse. Using a² + b² = c², how many meters long is it?",
      hint: "Square both perpendicular side lengths, add them, then take the square root.",
    },
  ],
  [
    {
      name: "The Moon Gate",
      prompt:
        "The Moon does not produce its own visible light. What makes the bright part of the Moon visible?",
      hint: "Think about which nearby object produces the light.",
      options: [
        "Burning gases on the Moon",
        "Reflected sunlight",
        "Light from Earth’s core",
      ],
    },
    {
      name: "Eastern Terrace",
      prompt:
        "A full moon looks like a bright disk. When half the Moon’s visible disk is illuminated, which phase group is it in?",
      hint: "A phase name can describe the Moon’s place in its orbit rather than the fraction of the visible disk that looks bright.",
      options: ["New moon", "Quarter moon", "Full moon"],
    },
    {
      name: "Shadow Column",
      prompt: "What normally causes the Moon’s phases?",
      hint: "Distinguish ordinary phases from the special alignment that causes a lunar eclipse.",
      options: [
        "Earth’s shadow covering it every week",
        "The Moon switching its light on and off",
        "Our changing view of its sunlit half as it orbits Earth",
      ],
    },
    {
      name: "Solar Gallery",
      prompt: "What is the main cause of Earth’s seasons?",
      hint: "The tilt changes sunlight angle and daylight length in each hemisphere.",
      options: [
        "The Sun turning off in winter",
        "Earth’s tilted axis as it travels around the Sun",
        "Changing distance from the Moon",
      ],
    },
    {
      name: "Star Window",
      prompt:
        "When it is summer in the Northern Hemisphere, which season is it in the Southern Hemisphere?",
      hint: "The hemispheres tilt toward and away from the Sun in opposite ways.",
      options: ["Summer", "Autumn", "Winter", "Spring"],
    },
    {
      name: "Weather Station",
      prompt:
        "For this expedition, use 24 hours for one Earth rotation. How many hours pass during three rotations?",
      hint: "One rotation corresponds to one day in this model.",
    },
    {
      name: "Cloud Balcony",
      prompt:
        "Sunlight warms a lake, and liquid water becomes water vapor. What is this process called?",
      hint: "Name the change from liquid water to a gas.",
      options: ["Precipitation", "Evaporation", "Condensation"],
    },
    {
      name: "Rain Gauge",
      prompt:
        "The rain gauge records 4 mm on Monday, 0 mm on Tuesday, 6 mm on Wednesday, and 2 mm on Thursday. What is the total rainfall in millimeters?",
      hint: "Add each day’s measurement, including the zero.",
    },
    {
      name: "Storm Watch",
      prompt:
        "Air pressure is falling while thick, dark clouds gather. Which forecast is best supported?",
      hint: "A forecast describes likelihood; these observations cannot give a guaranteed exact time.",
      options: [
        "Rain is guaranteed at exactly noon",
        "Skies must stay clear",
        "Rain is becoming more likely",
      ],
    },
  ],
  [
    {
      name: "Coin Counter",
      prompt:
        "A treasure tally has 4 shells, 7 coins, 5 beads, and 2 brooches. How many objects are recorded altogether?",
      hint: "A total combines all the categories.",
    },
    {
      name: "Ledger Room",
      prompt:
        "Three teams recover 6, 8, and 10 artifacts. The mean is the total divided by the number of teams. What is the mean number of artifacts?",
      hint: "Add the three values, then divide by three.",
    },
    {
      name: "Counting Table",
      prompt:
        "Daily coin finds, already ordered, are 3, 4, 8, 9, and 20. What is the median?",
      hint: "The median is the middle value when the data are ordered.",
    },
    {
      name: "Market Board",
      prompt:
        "A crew records daily finds of 2, 3, 3, 4, and 28 coins. Which value is the outlier?",
      hint: "Look for the value far from the cluster of other measurements.",
    },
    {
      name: "Pack Archive",
      prompt:
        "A bag contains 2 blue stones, 3 green stones, and 5 brown stones. Every stone is equally likely to be drawn. What fraction of draws will be blue in the long run?",
      hint: "Probability is favorable outcomes divided by all equally likely outcomes.",
    },
    {
      name: "Dice Chamber",
      prompt:
        "The same bag has 2 blue stones out of 10. Draw a stone, replace it, mix the bag, and draw again. What is the probability that both draws are blue? Give a fraction or decimal.",
      hint: "Replacement keeps the second chance the same as the first. Multiply the two probabilities.",
    },
    {
      name: "Prize Wheel",
      prompt:
        "Now draw twice from a bag with 2 blue stones and 8 other stones without replacement. What is the probability that both stones are blue? Give a fraction.",
      hint: "After a blue stone is removed, only one blue stone and nine total stones remain.",
    },
    {
      name: "Trade Ledger",
      prompt:
        "A game pays 10 coins with probability 1/4 and 0 coins otherwise. Ignoring any entry fee, what is its expected payout per play over many plays?",
      hint: "Multiply each payout by its probability and add the results.",
    },
    {
      name: "Vault Approach",
      prompt:
        "Daily finds are 2, 3, 3, 4, and 28 coins. Which summary gives a better picture of an ordinary day here?",
      hint: "Consider which summary is less affected by the unusually large final value.",
      options: [
        "Both always describe an ordinary day equally well",
        "Mean",
        "Median",
      ],
    },
  ],
];
export const finales = [
  {
    name: "The Landing Reliquary",
    challenge: "field-study",
    prompt:
      "Prepare a three-day expedition for 12 explorers. Each explorer needs 2.5 liters of water per day. For a separate batch of fruit drink, mix concentrate and water in a 1:4 ratio to make 15 liters total. Four food crates cost 18 coins each before a 25% discount; your food budget is 80 coins. Set the supplies and budget below.",
    hint: "Calculate person-days for drinking water. The fruit drink has five equal parts. Apply the discount to all four crates before subtracting the bill from the budget.",
  },
  {
    name: "Whispering Woods",
    challenge: "field-study",
    prompt:
      "Investigate the stream beside a farm. Water flows from the upstream site toward the downstream site. Measurements were repeated under matching conditions. Fertilizer runoff adds nutrients that can fuel algae blooms; decomposition of dead algae uses oxygen. Build the best explanation and choose a response using the field records.",
    hint: "Compare the nutrient, algae, and oxygen measurements together. Choose a response that keeps nutrients out of the stream, and make a prediction about oxygen.",
  },
  {
    name: "The Sunken Ruins",
    challenge: "field-study",
    prompt:
      "The harbor chamber contains three accounts of a warehouse evacuation. Compare their dates, their authors, and the supporting observations. Assemble the explanation best supported by the surviving records rather than the most dramatic story.",
    hint: "A record written during the events is a primary source. Separate the shared sequence from claims about the cause, then look for independent supporting evidence.",
  },
  {
    name: "Serpent Pass",
    challenge: "field-study",
    prompt:
      "Design a straight bridge across the diagonal of the marked right triangle. Its perpendicular sides measure 6 m and 8 m. The deck must be 2 m wide, and each plank covers 0.5 square meters with no waste. A triangular support has a base of 4 m and a perpendicular height of 3 m. Set the four measurements to approve your plan.",
    hint: "Find the hypotenuse first. Use it as the rectangle’s length, divide deck area by each plank’s coverage, and halve base × height for the support.",
  },
  {
    name: "The Moon Observatory",
    challenge: "field-study",
    prompt:
      "Prepare the observatory’s evening report. In the overhead Moon model, sunlight travels from left to right, and the orbit is tilted enough that Earth does not block sunlight at the full-moon position. Earth’s Northern Hemisphere is tilted toward the Sun. At the weather station, pressure is falling and thick clouds are gathering; water vapor has cooled into liquid droplets. Complete the four observations.",
    hint: "For a full moon, Earth lies between the Sun and Moon in this overhead view. A hemisphere tilted toward the Sun receives longer days. Forecast likelihood rather than certainty, and identify the gas-to-liquid change.",
  },
  {
    name: "The Lost Treasury",
    challenge: "field-study",
    prompt:
      "Evaluate a fictional treasure pack. Each pack independently draws from the same odds: 5 common, 3 uncommon, and 2 rare outcomes out of 10 equally likely outcomes. Common treasures sell for 2 coins, uncommon for 6, and rare for 12. A pack costs 6 coins. Calculate the probabilities, expected resale value, and expected net gain; a negative gain means an average loss.",
    hint: "Weight each sale price by its probability. Subtract the pack cost for net gain. Independent rare draws multiply; convert the resulting chances to percentages.",
  },
] as const;
