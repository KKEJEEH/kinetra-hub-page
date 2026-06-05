export type SystemSlug = "velocity" | "strength" | "nutrition" | "recovery";

export interface SystemData {
  index: string;
  slug: SystemSlug;
  title: string;
  tagline: string;
  description: string;
  longDescription: string;
  subcategories: string[];
  to: `/${SystemSlug}`;
}

export const SYSTEMS: SystemData[] = [
  {
    index: "01",
    slug: "velocity",
    title: "Velocity System",
    tagline: "Sprint 100m & 200m",
    description:
      "Sprint engineering across the three phases of the 100m and 200m. Built for raw acceleration, terminal speed and lactic resistance.",
    longDescription:
      "The Velocity System decomposes the sprint into measurable phases. Each block targets a specific neuromuscular signature — from the explosive drive of the first 30 meters to the lactic battlefield of the final 40. Programming, technique cues, and benchmarks live here.",
    subcategories: [
      "Acceleration Phase I (0–30m)",
      "Top Speed Phase II (30–60m)",
      "Speed Endurance III (60–100m)",
    ],
    to: "/velocity",
  },
  {
    index: "02",
    slug: "strength",
    title: "Strength System",
    tagline: "Force / Power / Control",
    description:
      "From the snatch to the planche. A complete framework for explosive force, structural strength and full bodyweight mastery.",
    longDescription:
      "The Strength System unifies olympic-style explosivity, max-strength protocols and high-skill bodyweight progressions into a single architecture. Cycles are designed to layer power on top of structural integrity rather than trade one for the other.",
    subcategories: [
      "Explosive Power",
      "Upper Body Strength",
      "Lower Body Strength",
      "Bodyweight Skills",
    ],
    to: "/strength",
  },
  {
    index: "03",
    slug: "nutrition",
    title: "Performance Nutrition",
    tagline: "Fuel / Adapt / Recover",
    description:
      "Nutrition and supplementation calibrated to training load. Engineered for output, body composition and long-term resilience.",
    longDescription:
      "The Performance Nutrition System translates training stimulus into nutritional strategy. Daily intake, peri-workout fueling, and evidence-based supplementation are framed as performance levers, not aesthetic ones.",
    subcategories: ["Nutrition", "Supplementation"],
    to: "/nutrition",
  },
  {
    index: "04",
    slug: "recovery",
    title: "Recovery & Mobility",
    tagline: "Restore / Protect / Sustain",
    description:
      "The hidden half of performance. Mobility, sleep architecture, injury prevention and active recovery built around your training week.",
    longDescription:
      "Recovery is not a day off — it is the adaptation engine. This system maps out mobility work, sleep optimization, injury-prevention screens and recovery modalities into a coherent weekly protocol.",
    subcategories: [
      "Mobility",
      "Sleep Optimization",
      "Injury Prevention",
      "Recovery Methods",
    ],
    to: "/recovery",
  },
];

export const FUTURE_ARTICLES: Record<SystemSlug, string[]> = {
  velocity: [
    "Block Start Mechanics: The First Three Steps",
    "Building Top Speed Without Burning Out",
    "Lactate Tolerance Protocols for the 200m",
    "Sprint Drills That Actually Transfer",
  ],
  strength: [
    "Programming Explosive Power Across a 12-Week Block",
    "The Pull-Up Pyramid: From 10 Reps to a Front Lever",
    "Posterior Chain: Why Most Athletes Get It Wrong",
    "Bodyweight Skills as a Strength Diagnostic",
  ],
  nutrition: [
    "Periodizing Carbohydrates Around Sprint Sessions",
    "Creatine, Caffeine, Beta-Alanine: What Actually Works",
    "Game-Day Fueling Protocol",
    "Recovery Nutrition in the 60-Minute Window",
  ],
  recovery: [
    "A Hip Mobility Routine for Sprinters",
    "Sleep Architecture: The Athlete's 8-Hour Blueprint",
    "Pre-Habilitation for Hamstrings and Achilles",
    "Cold, Heat, Compression: A Practical Guide",
  ],
};
