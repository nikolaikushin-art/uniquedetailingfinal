import { carImage, carGallery } from "./images";

export type Vehicle = {
  slug: string;
  name: string;
  line: string;         // e.g. "Coupé", "Sedan", "Landaulet"
  collection: string;   // e.g. "Signature", "Bespoke", "Black Ember"
  tagline: string;
  story: string[];      // 2–3 paragraphs of editorial copy
  quote: string;
  hero: string;
  gallery: string[];
  materials: { name: string; note: string }[];
  bespoke: string[];    // customisation options
  faqs: { q: string; a: string }[];
  specs: {
    powertrain: string;
    power: string;
    torque: string;
    zeroToHundred: string;
    topSpeed: string;
    weight: string;
    wheelbase: string;
    length: string;
    productionRun: string;
    priceOnRequest: string;
  };
  year: number;
  origin: string;
};

// Original in-house nameplates — deliberately non-infringing.
const NAMES: [string, string, string][] = [
  // [name, line, collection]
  ["Céleste Noire", "Landaulet", "Bespoke"],
  ["Astraea Coupé", "Coupé", "Signature"],
  ["Solène Sedan", "Sedan", "Signature"],
  ["Vespertine Droptail", "Droptail", "Bespoke"],
  ["Obsidian Grand Tourer", "Grand Tourer", "Black Ember"],
  ["Luminaire Phaeton", "Phaeton", "Bespoke"],
  ["Meridian Saloon", "Saloon", "Signature"],
  ["Perle du Nord", "Coupé", "Bespoke"],
  ["Aurora Speciale", "Roadster", "Bespoke"],
  ["Nocturne Coupé", "Coupé", "Black Ember"],
  ["Sable Landaulet", "Landaulet", "Bespoke"],
  ["Éclat Cabriolet", "Cabriolet", "Signature"],
  ["Serene Limousine", "Limousine", "Signature"],
  ["Voile Roadster", "Roadster", "Signature"],
  ["Étoile Filante", "Speedster", "Bespoke"],
  ["Chalcedon Coupé", "Coupé", "Signature"],
  ["Vallée Grand Tourer", "Grand Tourer", "Signature"],
  ["Ambre Fumé", "Coupé", "Black Ember"],
  ["Prélude Cabriolet", "Cabriolet", "Bespoke"],
  ["Silhouette Noire", "Sedan", "Black Ember"],
  ["Aurelia Berline", "Sedan", "Signature"],
  ["Marée Haute", "Grand Tourer", "Bespoke"],
  ["Zéphyr Roadster", "Roadster", "Signature"],
  ["Constellation Saloon", "Saloon", "Bespoke"],
  ["Voyager Landau", "Landaulet", "Signature"],
  ["Onyx Ambassade", "Limousine", "Black Ember"],
  ["Séraphine Cabriolet", "Cabriolet", "Bespoke"],
  ["Nuage d'Argent", "Grand Tourer", "Signature"],
  ["Basalt Coupé", "Coupé", "Black Ember"],
  ["Foulard de Soie", "Landaulet", "Bespoke"],
  ["Lune Croissante", "Roadster", "Bespoke"],
  ["Ivoire Berline", "Sedan", "Signature"],
  ["Cendre & Or", "Coupé", "Bespoke"],
  ["Miroir Noir", "Coupé", "Black Ember"],
  ["Rive Gauche", "Cabriolet", "Signature"],
  ["Château Grand Tourer", "Grand Tourer", "Bespoke"],
  ["Aria Speciale", "Speedster", "Bespoke"],
  ["Corniche d'Azur", "Cabriolet", "Signature"],
  ["Ébène Saloon", "Saloon", "Black Ember"],
  ["Fumée d'Encens", "Coupé", "Bespoke"],
  ["Voyageur Étoilé", "Limousine", "Bespoke"],
  ["Perle Grise", "Sedan", "Signature"],
  ["Cerf-Volant", "Roadster", "Bespoke"],
  ["Nébuleuse Coupé", "Coupé", "Bespoke"],
  ["Vent du Soir", "Cabriolet", "Bespoke"],
  ["Sablier d'Or", "Landaulet", "Bespoke"],
  ["Muse Nocturne", "Coupé", "Black Ember"],
  ["Reliquaire", "Grand Tourer", "Bespoke"],
  ["Orion Speedster", "Speedster", "Signature"],
  ["Palladium Saloon", "Saloon", "Signature"],
];

const TAGLINES = [
  "A private commission cast in liquid obsidian and hand-polished silver.",
  "The house's most quiet expression of speed — measured in patience, not decibels.",
  "An editorial motorcar shaped over eighteen months of atelier work.",
  "Restraint, distilled. Every surface answers to the light.",
  "A single client. A single sketch. A single automobile.",
  "The atelier's meditation on nightfall, hand-lacquered in twelve coats.",
  "Coachbuilt for those who prefer the horizon to the destination.",
  "A modern grand tourer whose interior reads like a private library.",
  "Composed rather than assembled — each panel signed by its artisan.",
  "For the collector who considers silence the highest form of luxury.",
];

const STORY_A = [
  "The commission began, as they always do, with a single conversation in the atelier's north-facing salon — a discussion of light, of temperament, of the particular hour of the evening when the client wished to be seen arriving.",
  "Design counsel spent nine weeks in dialogue with the family before a single line was drawn. What emerged was less a motorcar than an argument for restraint: obsidian on obsidian, a silhouette that resolves only when the eye is given the time to find it.",
  "Every commission at the Maison begins with a study of provenance. This automobile was drawn in response to a family estate, a private lake, and a Corot the client had loved since childhood — three references that quietly govern its every proportion.",
];

const STORY_B = [
  "The bodywork required 1,140 hours of hand finishing. Twelve coats of hand-mixed lacquer were laid down over nine weeks, each cured under the north light of the paint hall and polished with lambswool by a single master.",
  "The cabin is upholstered in Chalcedon leather — a low-tannage hide sourced from a single Bavarian farm — and inlaid with figured walnut that had rested in the atelier's timber loft since 1998, awaiting a commission worthy of its grain.",
  "The instrument panel is finished in a single billet of hand-guilloched silver, engine-turned in a pattern developed for the family crest. It cannot be re-ordered; the tooling was destroyed on completion, as is house tradition.",
];

const STORY_C = [
  "Delivery took place at dawn, in the courtyard the atelier reserves for its most private clients. The keys were presented not by a salesperson but by the master who had signed the final panel — a small ceremony, entirely without ceremony.",
  "The motorcar will not be shown, catalogued or reproduced. It will be driven — slowly, and by candlelight when the season allows — from a house in the Jura to a farmhouse in Umbria, twice each year, for as long as the family wishes.",
  "The commission remains, in every sense, the property of the family — its drawings, its patterns, its shade of black. The Maison retains only the memory of having made it.",
];

const QUOTES = [
  "Luxury is what remains when everything unnecessary has been quietly removed.",
  "We do not build motorcars. We answer letters.",
  "The finest surface is the one that refuses to announce itself.",
  "Time is the only material that cannot be commissioned; every automobile here contains a great deal of it.",
  "A motorcar should arrive the way a well-mannered guest does — noticed only after it has left.",
];

const MATERIALS_POOL = [
  { name: "Chalcedon Leather", note: "Low-tannage Bavarian hide, single-farm provenance, hand-selected panel by panel." },
  { name: "Figured Walnut, 1998", note: "Rested twenty-seven years in the atelier's timber loft before it was cut." },
  { name: "Guilloché Silver", note: "Engine-turned by a single master; each pattern retired upon delivery." },
  { name: "Obsidian Lacquer", note: "Twelve hand-laid coats over nine weeks, cured under north light." },
  { name: "Vicuña Headliner", note: "Woven in Piedmont; the softest natural fibre known to the atelier." },
  { name: "Damascus Steel Inlay", note: "Folded 128 times, quenched in cold spring water, hand-polished to a low sheen." },
  { name: "Alpaca Carpet", note: "Undyed, hand-loomed, laid over hand-stitched wool underfelt." },
  { name: "Mother-of-Pearl Marquetry", note: "Set by the Maison's marqueteur, one fragment at a time, over six weeks." },
  { name: "Cashmere Piping", note: "Spun to the client's family thread count; a house exclusive." },
  { name: "Rock Crystal Switchgear", note: "Cut by a Bohemian atelier; each piece takes a full day to finish." },
];

const BESPOKE_POOL = [
  "Coachwork in any single-mix lacquer, developed with the client over 90 days",
  "Interior hides drawn from the Maison's private tannery archive",
  "Marquetry of a family crest, private landscape or personal artwork",
  "Bespoke instrument dials engraved to the client's own hand",
  "Personal fragrance keyed to the cabin, developed with a Grasse perfumer",
  "A commissioned soundscape composed for the vehicle's silence",
  "Fitted luggage in matching hide, cut to the client's own travel case dimensions",
  "Ceremonial delivery in a location of the client's choosing, worldwide",
  "Lifetime concierge relationship with the founding atelier",
  "A hand-bound leather monograph documenting the commission",
];

const FAQS_POOL = [
  { q: "How long does a commission take?", a: "From first conversation to delivery, the Maison reserves a minimum of eighteen months. Certain commissions have taken as long as four years — a length of time the atelier considers not a delay but a courtesy to the material." },
  { q: "May I visit the atelier during the build?", a: "Twice, by appointment. The first visit takes place at the drawing stage; the second, when the bodywork has been laid in primer and the client is invited to place a hand upon it before the first coat of lacquer is applied." },
  { q: "Is the motorcar unique?", a: "In every meaningful sense. The colour, the interior, the marquetry, the switchgear and the instrument graphics are all singular to the commission; the tooling for these elements is retired on completion." },
  { q: "What is the ownership programme?", a: "Every commission is accompanied by a lifetime relationship with the founding atelier — a private concierge line, a dedicated master for service, and an annual invitation to the house's private gathering in the Jura." },
  { q: "How is the vehicle delivered?", a: "By the master who signed the final panel, at a location of the client's choosing, at an hour of the client's choosing. No press are present. No photographs are taken unless the client requests them." },
];

const pick = <T,>(arr: T[], i: number, n: number): T[] =>
  Array.from({ length: n }, (_, k) => arr[(i * 3 + k * 2) % arr.length]);

function slugify(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export const VEHICLES: Vehicle[] = NAMES.map(([name, line, collection], i) => {
  const slug = slugify(name);
  return {
    slug,
    name,
    line,
    collection,
    tagline: TAGLINES[i % TAGLINES.length],
    story: [
      STORY_A[i % STORY_A.length],
      STORY_B[i % STORY_B.length],
      STORY_C[i % STORY_C.length],
    ],
    quote: QUOTES[i % QUOTES.length],
    hero: carImage(i, 2000),
    gallery: carGallery(i + 1, 6),
    materials: pick(MATERIALS_POOL, i, 5),
    bespoke: pick(BESPOKE_POOL, i, 6),
    faqs: pick(FAQS_POOL, i, 4),
    specs: {
      powertrain: i % 3 === 0 ? "6.75 L twin-turbo V12" : i % 3 === 1 ? "Fully electric, dual-motor" : "6.6 L twin-turbo V12",
      power: `${560 + ((i * 17) % 220)} bhp`,
      torque: `${820 + ((i * 23) % 260)} Nm`,
      zeroToHundred: `${(3.4 + ((i * 0.11) % 1.8)).toFixed(1)} s`,
      topSpeed: `${240 + ((i * 5) % 70)} km/h`,
      weight: `${2450 + ((i * 37) % 500)} kg`,
      wheelbase: `${3200 + ((i * 11) % 400)} mm`,
      length: `${5400 + ((i * 13) % 500)} mm`,
      productionRun: i % 4 === 0 ? "Single commission" : `${1 + (i % 24)} of ${12 + (i % 40)}`,
      priceOnRequest: "On application",
    },
    year: 2024 + (i % 3),
    origin: ["Jura, Switzerland", "Chichester, England", "Modena, Italy", "Sindelfingen, Germany", "Kanazawa, Japan"][i % 5],
  };
});

export const getVehicle = (slug: string) => VEHICLES.find(v => v.slug === slug);

export const relatedVehicles = (slug: string, n = 3) => {
  const idx = VEHICLES.findIndex(v => v.slug === slug);
  const others = VEHICLES.filter((_, i) => i !== idx);
  return Array.from({ length: n }, (_, k) => others[(idx * 5 + k * 7) % others.length]);
};