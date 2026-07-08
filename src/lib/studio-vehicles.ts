export type StudioBody = "coupe" | "convertible" | "sedan" | "suv" | "wagon" | "supercar" | "hypercar";

export type StudioVehicle = {
  slug: string;
  brand: string;
  model: string;
  category: "PPF" | "Смена цвета" | "Керамика" | "Восстановление";
  tagline: string;
  hours: string;
  body: StudioBody;
  paint: string;
  paintName: string;
  interior: string;
  wheel: string;
  year: number;
  performance: { power: string; torque: string; zeroTo: string; top: string; weight: string };
};

export const STUDIO_VIEWS = [
  { label: "главный передний ракурс", key: "front-three-quarter" },
  { label: "вид спереди", key: "front" },
  { label: "вид сзади", key: "rear" },
  { label: "левая сторона", key: "left-side" },
  { label: "правая сторона", key: "right-side" },
  { label: "интерьер — передний ряд", key: "interior-front" },
  { label: "интерьер — задний ряд", key: "interior-rear" },
  { label: "колесо и арка", key: "wheel-detail" },
  { label: "лак и плёнка", key: "paint-detail" },
  { label: "студийный верхний ракурс", key: "studio-overhead" },
] as const;

const slugify = (brand: string, model: string) =>
  `${brand}-${model}`.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

type VehicleRow = Omit<StudioVehicle, "slug">;

const ROWS: VehicleRow[] = [
  { brand: "Mercedes-Benz", model: "G 63 AMG", category: "PPF", tagline: "Один и тот же G 63: графитовый кузов, чёрные AMG-диски и студийные ракурсы без подмены модели.", hours: "70 часов", body: "suv", paint: "#2f3438", paintName: "Graphite Magno", interior: "#231713", wheel: "#111315", year: 2025, performance: { power: "585 л.с.", torque: "850 Н·м", zeroTo: "4.5 с", top: "240 км/ч", weight: "2 560 кг" } },
  { brand: "Rolls-Royce", model: "Cullinan Black Badge", category: "Восстановление", tagline: "Cullinan Black Badge в единой студийной серии: высокий кузов, Pantheon-пропорции и глубокий ониксовый лак.", hours: "94 часа", body: "suv", paint: "#090a0c", paintName: "Black Diamond", interior: "#4a2517", wheel: "#141414", year: 2025, performance: { power: "600 л.с.", torque: "900 Н·м", zeroTo: "5.0 с", top: "250 км/ч", weight: "2 750 кг" } },
  { brand: "Rolls-Royce", model: "Phantom Series II", category: "PPF", tagline: "Phantom Series II: длинная база, строгий чёрный кузов и десять согласованных кадров одной машины.", hours: "112 часов", body: "sedan", paint: "#111416", paintName: "Infinity Black", interior: "#d8c0a4", wheel: "#202124", year: 2024, performance: { power: "571 л.с.", torque: "900 Н·м", zeroTo: "5.3 с", top: "250 км/ч", weight: "2 630 кг" } },
  { brand: "Rolls-Royce", model: "Ghost Extended", category: "PPF", tagline: "Ghost Extended показан как один автомобиль: серебристый лак, удлинённый силуэт и тихая клубная геометрия.", hours: "96 часов", body: "sedan", paint: "#b9bdc0", paintName: "Silver Ghost", interior: "#302018", wheel: "#2b2c2f", year: 2025, performance: { power: "571 л.с.", torque: "850 Н·м", zeroTo: "4.8 с", top: "250 км/ч", weight: "2 553 кг" } },
  { brand: "Rolls-Royce", model: "Spectre", category: "Керамика", tagline: "Spectre в жемчужном серебре: купе Rolls-Royce без случайных подмен и с единым комплектом колёс.", hours: "42 часа", body: "coupe", paint: "#cfd5d9", paintName: "Arctic Pearl", interior: "#273344", wheel: "#24272b", year: 2025, performance: { power: "585 л.с.", torque: "900 Н·м", zeroTo: "4.5 с", top: "250 км/ч", weight: "2 890 кг" } },
  { brand: "Bentley", model: "Continental GT Speed", category: "Смена цвета", tagline: "Continental GT Speed в Midnight Sapphire — один grand tourer, одна окраска, один студийный сет.", hours: "132 часа", body: "coupe", paint: "#102033", paintName: "Midnight Sapphire", interior: "#6b3d25", wheel: "#1d2023", year: 2024, performance: { power: "659 л.с.", torque: "900 Н·м", zeroTo: "3.5 с", top: "335 км/ч", weight: "2 273 кг" } },
  { brand: "Bentley", model: "Bentayga Speed", category: "PPF", tagline: "Bentayga Speed — крупный SUV Crewe, сохранённый в каждом ракурсе с тем же цветом и дисками.", hours: "82 часа", body: "suv", paint: "#22322a", paintName: "Verdant Jade", interior: "#c3a57d", wheel: "#191b1e", year: 2025, performance: { power: "635 л.с.", torque: "900 Н·м", zeroTo: "3.9 с", top: "310 км/ч", weight: "2 495 кг" } },
  { brand: "Bentley", model: "Flying Spur Mulliner", category: "Смена цвета", tagline: "Flying Spur Mulliner в двухтональном графите: представительский седан без повторов чужих автомобилей.", hours: "168 часов", body: "sedan", paint: "#394047", paintName: "Mulliner Graphite", interior: "#efe4d6", wheel: "#27292d", year: 2025, performance: { power: "635 л.с.", torque: "900 Н·м", zeroTo: "3.7 с", top: "333 км/ч", weight: "2 437 кг" } },
  { brand: "Porsche", model: "911 Turbo S", category: "Керамика", tagline: "911 Turbo S в единой низкой посадке: широкие арки, серебристый кузов и один комплект дисков.", hours: "36 часов", body: "coupe", paint: "#c7ced3", paintName: "GT Silver", interior: "#171717", wheel: "#202225", year: 2024, performance: { power: "650 л.с.", torque: "800 Н·м", zeroTo: "2.7 с", top: "330 км/ч", weight: "1 640 кг" } },
  { brand: "Porsche", model: "Taycan Turbo S", category: "PPF", tagline: "Taycan Turbo S: электрический силуэт Porsche, одна белая окраска и десять точных студийных кадров.", hours: "60 часов", body: "sedan", paint: "#eef2f2", paintName: "Carrara White", interior: "#20252a", wheel: "#151719", year: 2025, performance: { power: "761 л.с.", torque: "1 050 Н·м", zeroTo: "2.4 с", top: "260 км/ч", weight: "2 295 кг" } },
  { brand: "Porsche", model: "Cayenne Turbo GT", category: "PPF", tagline: "Cayenne Turbo GT показан как один SUV: серый лак, агрессивные арки и стабильная студийная среда.", hours: "66 часов", body: "suv", paint: "#42464a", paintName: "Arctic Grey", interior: "#191919", wheel: "#111315", year: 2025, performance: { power: "640 л.с.", torque: "850 Н·м", zeroTo: "3.3 с", top: "300 км/ч", weight: "2 220 кг" } },
  { brand: "Ferrari", model: "Roma", category: "PPF", tagline: "Ferrari Roma в Rosso Portofino: один автомобиль, один красный тон и чистые ракурсы без чужих кузовов.", hours: "68 часов", body: "coupe", paint: "#8b0e10", paintName: "Rosso Portofino", interior: "#2a1913", wheel: "#202020", year: 2024, performance: { power: "620 л.с.", torque: "760 Н·м", zeroTo: "3.4 с", top: "320 км/ч", weight: "1 570 кг" } },
  { brand: "Ferrari", model: "SF90 Stradale", category: "PPF", tagline: "SF90 Stradale — низкий гибридный суперкар в одном цвете и с одинаковой аэродинамикой во всех видах.", hours: "92 часа", body: "supercar", paint: "#d20f1c", paintName: "Rosso Corsa", interior: "#161616", wheel: "#17191b", year: 2025, performance: { power: "1 000 л.с.", torque: "800 Н·м", zeroTo: "2.5 с", top: "340 км/ч", weight: "1 570 кг" } },
  { brand: "Ferrari", model: "Purosangue", category: "PPF", tagline: "Purosangue как один V12-кроссовер: высокая посадка Ferrari и согласованная серия салона и кузова.", hours: "86 часов", body: "suv", paint: "#6c1114", paintName: "Rosso Maranello", interior: "#4c2216", wheel: "#1c1d20", year: 2025, performance: { power: "725 л.с.", torque: "716 Н·м", zeroTo: "3.3 с", top: "310 км/ч", weight: "2 033 кг" } },
  { brand: "Lamborghini", model: "Urus Performante", category: "PPF", tagline: "Urus Performante в сатиновом зелёном: одинаковые колёса, одинаковый кузов, разные студийные углы.", hours: "84 часа", body: "suv", paint: "#2c4a32", paintName: "Verde Selvans", interior: "#121212", wheel: "#111111", year: 2025, performance: { power: "666 л.с.", torque: "850 Н·м", zeroTo: "3.3 с", top: "306 км/ч", weight: "2 150 кг" } },
  { brand: "Lamborghini", model: "Revuelto", category: "PPF", tagline: "Revuelto в Arancio Borealis: один гибридный V12, один острый силуэт, без случайных Huracán или Aventador.", hours: "104 часа", body: "hypercar", paint: "#e45b16", paintName: "Arancio Borealis", interior: "#151515", wheel: "#171717", year: 2025, performance: { power: "1 015 л.с.", torque: "725 Н·м", zeroTo: "2.5 с", top: "350 км/ч", weight: "1 772 кг" } },
  { brand: "Lamborghini", model: "Huracán STO", category: "PPF", tagline: "Huracán STO в Blu Laufey: гоночный силуэт сохранён во всех десяти изображениях одной машины.", hours: "70 часов", body: "supercar", paint: "#1d4c7c", paintName: "Blu Laufey", interior: "#111827", wheel: "#141414", year: 2024, performance: { power: "640 л.с.", torque: "565 Н·м", zeroTo: "3.0 с", top: "310 км/ч", weight: "1 339 кг" } },
  { brand: "Aston Martin", model: "DBX 707", category: "PPF", tagline: "DBX 707 в британском зелёном: один SUV Aston Martin с правильной высотой кузова и пропорциями.", hours: "74 часа", body: "suv", paint: "#21392e", paintName: "Aston Racing Green", interior: "#3a251b", wheel: "#1b1d20", year: 2025, performance: { power: "707 л.с.", torque: "900 Н·м", zeroTo: "3.3 с", top: "310 км/ч", weight: "2 245 кг" } },
  { brand: "Aston Martin", model: "DB12", category: "PPF", tagline: "DB12 как чистый super tourer: низкое купе, глубокий зелёный и согласованный интерьер.", hours: "72 часа", body: "coupe", paint: "#18342f", paintName: "Q Satin Green", interior: "#201b18", wheel: "#202226", year: 2025, performance: { power: "680 л.с.", torque: "800 Н·м", zeroTo: "3.6 с", top: "325 км/ч", weight: "1 685 кг" } },
  { brand: "Aston Martin", model: "DBS 770 Ultimate", category: "PPF", tagline: "DBS 770 Ultimate: финальное купе Aston в одной серебристой спецификации и без чужих изображений.", hours: "94 часа", body: "coupe", paint: "#aeb5b8", paintName: "Titanium Silver", interior: "#191919", wheel: "#1d1f22", year: 2024, performance: { power: "770 л.с.", torque: "900 Н·м", zeroTo: "3.2 с", top: "340 км/ч", weight: "1 795 кг" } },
  { brand: "McLaren", model: "765LT", category: "PPF", tagline: "765LT в Papaya Spark: один длиннохвостый McLaren и десять ракурсов той же машины.", hours: "80 часов", body: "supercar", paint: "#e46d1f", paintName: "Papaya Spark", interior: "#111111", wheel: "#111315", year: 2024, performance: { power: "765 л.с.", torque: "800 Н·м", zeroTo: "2.8 с", top: "330 км/ч", weight: "1 339 кг" } },
  { brand: "McLaren", model: "750S Spider", category: "PPF", tagline: "750S Spider: открытая архитектура, серебристый кузов и один комплект тёмных дисков во всех кадрах.", hours: "82 часа", body: "convertible", paint: "#c8ced1", paintName: "Supernova Silver", interior: "#101010", wheel: "#151719", year: 2025, performance: { power: "750 л.с.", torque: "800 Н·м", zeroTo: "2.8 с", top: "332 км/ч", weight: "1 438 кг" } },
  { brand: "BMW", model: "X6 M Competition", category: "PPF", tagline: "X6 M Competition в Brooklyn Grey: купе-SUV BMW, одинаковая посадка и фирменная масса в каждом кадре.", hours: "58 часов", body: "suv", paint: "#8f979d", paintName: "Brooklyn Grey", interior: "#1b1715", wheel: "#151719", year: 2025, performance: { power: "625 л.с.", torque: "750 Н·м", zeroTo: "3.8 с", top: "290 км/ч", weight: "2 295 кг" } },
  { brand: "BMW", model: "M8 Competition Gran Coupé", category: "PPF", tagline: "M8 Gran Coupé — длинный силуэт BMW M, матовый серый лак и единый салонный сценарий.", hours: "76 часов", body: "sedan", paint: "#51565c", paintName: "Frozen Grey", interior: "#211714", wheel: "#17191c", year: 2024, performance: { power: "625 л.с.", torque: "750 Н·м", zeroTo: "3.2 с", top: "305 км/ч", weight: "2 020 кг" } },
  { brand: "BMW", model: "XM Label Red", category: "PPF", tagline: "XM Label Red: крупный M-SUV с красным акцентом и одной точной студийной спецификацией.", hours: "92 часа", body: "suv", paint: "#161819", paintName: "Carbon Black Redline", interior: "#281111", wheel: "#111111", year: 2025, performance: { power: "748 л.с.", torque: "1 000 Н·м", zeroTo: "3.7 с", top: "290 км/ч", weight: "2 785 кг" } },
  { brand: "Audi", model: "R8 V10 Performance", category: "PPF", tagline: "R8 V10 Performance: низкий среднемоторный Audi в одной серебристой студийной серии.", hours: "62 часа", body: "supercar", paint: "#bcc3c7", paintName: "Suzuka Silver", interior: "#151515", wheel: "#131517", year: 2024, performance: { power: "620 л.с.", torque: "580 Н·м", zeroTo: "3.1 с", top: "331 км/ч", weight: "1 655 кг" } },
  { brand: "Audi", model: "RS6 Avant Performance", category: "PPF", tagline: "RS6 Avant Performance — универсал Audi Sport, сохранённый как один автомобиль во всех ракурсах.", hours: "44 часа", body: "wagon", paint: "#596168", paintName: "Nardo Grey", interior: "#171717", wheel: "#151719", year: 2025, performance: { power: "630 л.с.", torque: "850 Н·м", zeroTo: "3.4 с", top: "305 км/ч", weight: "2 090 кг" } },
  { brand: "Range Rover", model: "SV L460", category: "PPF", tagline: "Range Rover SV L460: спокойный зелёный SUV, одна база, один комплект колёс и полный интерьерный набор.", hours: "82 часа", body: "suv", paint: "#27342d", paintName: "Belgravia Green", interior: "#e4d7c7", wheel: "#202124", year: 2025, performance: { power: "615 л.с.", torque: "800 Н·м", zeroTo: "4.5 с", top: "261 км/ч", weight: "2 810 кг" } },
  { brand: "Mercedes-Maybach", model: "S 680", category: "PPF", tagline: "Maybach S 680 в двухтональном исполнении: длинный седан, мягкая посадка и единый клубный фон.", hours: "104 часа", body: "sedan", paint: "#25282b", paintName: "Obsidian Two-Tone", interior: "#f0e1ce", wheel: "#222428", year: 2025, performance: { power: "612 л.с.", torque: "900 Н·м", zeroTo: "4.5 с", top: "250 км/ч", weight: "2 350 кг" } },
  { brand: "Mercedes-Maybach", model: "GLS 600", category: "PPF", tagline: "Maybach GLS 600: высокий luxury-SUV, тёплый чёрный кузов и одинаковый фон студии UNIQUE.", hours: "94 часа", body: "suv", paint: "#191a1c", paintName: "Obsidian Black", interior: "#efe2d2", wheel: "#24262a", year: 2025, performance: { power: "558 л.с.", torque: "730 Н·м", zeroTo: "4.9 с", top: "250 км/ч", weight: "2 785 кг" } },
  { brand: "Lucid", model: "Air Sapphire", category: "Керамика", tagline: "Lucid Air Sapphire: электрический седан на 1 234 л.с., один синий кузов и согласованные детали.", hours: "44 часа", body: "sedan", paint: "#16324f", paintName: "Sapphire Blue", interior: "#202225", wheel: "#151719", year: 2025, performance: { power: "1 234 л.с.", torque: "1 700 Н·м", zeroTo: "2.0 с", top: "330 км/ч", weight: "2 505 кг" } },
];

export const STUDIO_VEHICLES: StudioVehicle[] = ROWS.map((row) => ({
  ...row,
  slug: slugify(row.brand, row.model),
}));

export const getStudioVehicle = (slug: string) => STUDIO_VEHICLES.find((vehicle) => vehicle.slug === slug);
