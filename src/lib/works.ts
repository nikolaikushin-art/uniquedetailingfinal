// UNIQUE Detailing — portfolio data
// Each portfolio entry uses a dedicated photo set generated for that exact
// vehicle (brand, model, body, paint), stored under /public/portfolio and
// keyed by slug, so every card and detail page matches its label.
import { asset } from "./asset";
import { STUDIO_VEHICLES, type StudioVehicle } from "./studio-vehicles";

export type Spec = { label: string; value: string };
export type Bespoke = { title: string; note: string; options: string[] };

export type Work = {
  slug: string;
  brand: string;
  model: string;
  category: "PPF" | "Смена цвета" | "Керамика" | "Восстановление";
  tagline: string;
  hours: string;
  film: string;
  duration: string;
  story: string[];
  quote: string;
  hero: string;
  gallery: string[];
  works: string[];
  materials: { name: string; note: string }[];
  faqs: { q: string; a: string }[];
  year: number;
  city: string;
  variant: 0 | 1 | 2 | 3;
  specs: Spec[];
  performance: { power: string; torque: string; zeroTo: string; top: string; weight: string };
  bespoke: Bespoke[];
  palette: { name: string; hex: string; note: string }[];
};

// Genuine, client-focused project narrative — built per vehicle from its own
// data (marque, model, paint, film). Structured as a real case study:
// objective → solution → result. No workflow, gallery or generation talk.
const STORY_OBJECTIVE: ((v: StudioVehicle) => string)[] = [
  (v) =>
    `Владелец ${v.brand} ${v.model} обратился в UNIQUE с одной задачей — сохранить заводское покрытие ${v.paintName} безупречным на годы вперёд.`,
  (v) =>
    `${v.brand} ${v.model} приехал в студию почти новым, и цель была прямой: защитить лак ${v.paintName} до первого камня и первой зимы.`,
  (v) =>
    `Автомобиль поступил ради тонкой, но бескомпромиссной защиты — уберечь ${v.paintName} от сколов, вихревых царапин и выгорания, не меняя облик машины.`,
  (v) =>
    `Задача по ${v.brand} ${v.model} звучала спокойно: сохранить глубину ${v.paintName} и снять с владельца тревогу о состоянии кузова.`,
];

const STORY_SOLUTION: ((v: StudioVehicle, film: string) => string)[] = [
  (_v, film) =>
    `Кузов прошёл диагностику и мягкую полировку, после чего был оклеен плёнкой ${film}. Кромки заведены под панели без снятия оптики и молдингов — переходов не видно даже вблизи.`,
  (_v, film) =>
    `Мастер вручную раскроил ${film} прямо по кузову и уложил её без разбора автомобиля: капот, зоны удара, пороги и арки получили сплошную защиту.`,
  (v, film) =>
    `Мы выбрали ${film} за прозрачность и способность к самовосстановлению — плёнка повторяет геометрию кузова и полностью сохраняет глубину ${v.paintName}.`,
  (_v, film) =>
    `${film} нанесена сплошным полотном по зонам риска и корпусу целиком, с заводом под кромки — защита работает там, где лак повреждается первым.`,
];

const STORY_RESULT: ((v: StudioVehicle) => string)[] = [
  (v) =>
    `В результате ${v.brand} сохраняет глубину лака и остаётся защищённым от щебня, реагентов и ультрафиолета — под клубной гарантией UNIQUE на 10 лет.`,
  (v) =>
    `Автомобиль вернулся владельцу таким же, каким сошёл с конвейера, и останется таким надолго: плёнка невидима, а лак под ней нетронут.`,
  (v) =>
    `Теперь ${v.model} можно эксплуатировать без оглядки на дороги и погоду — покрытие принимает удары на себя и восстанавливается от тепла.`,
  (v) =>
    `Финальная инспекция под направленным светом подтвердила чистоту каждой кромки: ${v.brand} готов к ежедневной эксплуатации без потери вида.`,
];

const QUOTES = [
  "Лучшая защита незаметна — виден только безупречный автомобиль.",
  "Мы сохраняем то, за что владелец полюбил свою машину.",
  "Идеальная работа с плёнкой — та, которую невозможно разглядеть.",
  "Каждый шов кладётся так, будто его не существует.",
];

const WORKS_POOL = [
  "Диагностика лакокрасочного покрытия под направленным светом",
  "Мойка в чистой зоне и полная деконтаминация кузова",
  "Мягкая полировка и удаление вихревых царапин перед оклейкой",
  "Ручной раскрой плёнки UNIQUE PPF с заводом под кромки без разбора",
  "Полная оклейка кузова с защитой зон удара, порогов и арок",
  "Отдельная защита оптики и лобового стекла от щебня и реагентов",
  "Интерьерная защита кожи, алькантары и декоративных вставок",
  "Керамическое покрытие кузова, дисков и оптики после инспекции",
];

const MATERIALS_POOL = [
  {
    name: "UNIQUE PPF Clear",
    note: "Прозрачная полиуретановая плёнка с самовосстановлением и глубиной заводского лака.",
  },
  {
    name: "UNIQUE PPF Satin",
    note: "Сатиновая плёнка для тихого матового эффекта без потери читаемости формы кузова.",
  },
  {
    name: "Ceramic Pro 9H",
    note: "Керамика поверх плёнки: гидрофобность, глубина цвета и защита от химии.",
  },
  {
    name: "UNIQUE Interior Coat",
    note: "Защитный состав для кожи и алькантары, сохраняющий фактуру салона.",
  },
  {
    name: "Wheel Ceramic",
    note: "Термостойкая керамика для дисков и суппортов, отталкивающая тормозную пыль.",
  },
  {
    name: "Glass Repellent",
    note: "Гидрофоб для стёкол и камер, улучшающий обзор в дождь и снег.",
  },
];

const FAQS_POOL = [
  {
    q: "Заметна ли плёнка на кузове?",
    a: "Нет. Глянцевая плёнка оптически прозрачна, повторяет глубину лака, а кромки заводятся под панели — переходов не видно даже вблизи.",
  },
  {
    q: "Сколько занимает оклейка?",
    a: "От 2–3 дней для фронтальной зоны до 7–10 дней для полного кузова. Точный срок зависит от модели и состояния покрытия.",
  },
  {
    q: "Нужно ли разбирать автомобиль?",
    a: "Нет. Мы работаем без снятия оптики, ручек и эмблем — плёнка укладывается по месту с заводом под кромки.",
  },
  {
    q: "Как ухаживать за автомобилем после защиты?",
    a: "Достаточно обычной бесконтактной мойки. Мелкие царапины на плёнке затягиваются при нагреве, а раз в год мы бесплатно проверяем покрытие.",
  },
  {
    q: "Можно ли снять плёнку без вреда для лака?",
    a: "Да. Клеевой слой paint-safe: плёнка снимается без остатков клея и следов на заводском лакокрасочном покрытии.",
  },
  {
    q: "Какая гарантия на защиту?",
    a: "10 лет на плёнку UNIQUE PPF — против пожелтения, отслоения, помутнения и потери самовосстановления.",
  },
];

const BESPOKE_TEMPLATES: Bespoke[] = [
  {
    title: "Плёнка кузова",
    note: "Выбор фактуры и глубины защиты — от прозрачной до сатиновой.",
    options: [
      "UNIQUE PPF Clear",
      "UNIQUE PPF Satin",
      "UNIQUE PPF Matte",
      "UNIQUE PPF Colour Shift",
    ],
  },
  {
    title: "Керамика поверх",
    note: "Дополнительный слой 9H поверх плёнки — гидрофобность и глубина.",
    options: [
      "Без керамики",
      "Ceramic Pro 9H — 5 слоёв",
      "Ceramic Pro 9H — 9 слоёв",
      "UNIQUE Diamond Coat",
    ],
  },
  {
    title: "Салон",
    note: "Защита кожи, алькантары и декоративных вставок салона.",
    options: [
      "UNIQUE Interior Coat",
      "Дерево + отдельная защита",
      "Алькантара + гидрофоб",
      "Полный клубный пакет",
    ],
  },
  {
    title: "Колёсные диски",
    note: "Термостойкая керамика для дисков и суппортов.",
    options: [
      "Wheel Ceramic 9H",
      "Керамика + суппорта",
      "Полный пакет: диски + арки",
      "Отказаться",
    ],
  },
  {
    title: "Оптика и стёкла",
    note: "Отдельная защита оптики и гидрофоб на лобовое стекло.",
    options: ["Плёнка на оптику", "Гидрофоб на стёкла", "Плёнка + гидрофоб", "Только лобовое"],
  },
  {
    title: "Клубный пакет",
    note: "Уровень включения в клубную программу UNIQUE.",
    options: [
      "Silver — ежегодная ревизия",
      "Gold — приоритетный менеджер",
      "Platinum — выездной сервис",
      "Founders — доступ ко всем событиям",
    ],
  },
];

const pick = <T>(arr: T[], index: number, count: number): T[] =>
  Array.from({ length: count }, (_, offset) => arr[(index * 2 + offset) % arr.length]);

export const WORKS: Work[] = STUDIO_VEHICLES.map((vehicle, i) => {
  const film = [
    "UNIQUE PPF Clear",
    "UNIQUE PPF Satin",
    "Ceramic Pro 9H",
    "UNIQUE PPF Clear + Ceramic",
  ][i % 4];
  // Per-vehicle photo set: 0 = hero/front 3/4, 1 = rear 3/4, 2 = interior, 3 = detail.
  const shot = (n: 0 | 1 | 2 | 3) => asset(`/portfolio/${vehicle.slug}-${n}.jpg`);
  // Three extra unique exterior angles (front-on, side profile, elevated rear 3/4).
  const ext = (n: 1 | 2 | 3) => asset(`/portfolio/${vehicle.slug}-ext-${n}.jpg`);
  // Six distinct interiors per car (original + 5 unique angles), no repeats.
  const interior = (n: 1 | 2 | 3 | 4 | 5) => asset(`/portfolio/${vehicle.slug}-int-${n}.jpg`);
  // Six unique detail close-ups (wheel/caliper, headlight, grille/badge, mirror/PPF, exhaust, taillight).
  const detail = (n: 1 | 2 | 3 | 4 | 5 | 6) => asset(`/portfolio/${vehicle.slug}-det-${n}.jpg`);
  // Six craftsmanship stages: prep, wash, correction, PPF, coating, inspection.
  const craft = (n: 1 | 2 | 3 | 4 | 5 | 6) => asset(`/portfolio/${vehicle.slug}-craft-${n}.jpg`);
  const gallery = [
    // 0–5 exterior (6 distinct angles, no repeats)
    shot(0),
    shot(1),
    ext(1),
    ext(2),
    ext(3),
    shot(3),
    // 6–10 interior (5 purpose-shot angles). The core "-2" interior is
    // intentionally omitted here: it reuses the same front-cabin framing as
    // one of the int-* shots, which produced a duplicate / colour-mismatched
    // second tile on many cars.
    interior(1),
    interior(2),
    interior(3),
    interior(4),
    interior(5),
    // 11–16 detail (6 unique close-ups)
    detail(1),
    detail(2),
    detail(3),
    detail(4),
    detail(5),
    detail(6),
    // 17–22 craft (6 unique detailing stages)
    craft(1),
    craft(2),
    craft(3),
    craft(4),
    craft(5),
    craft(6),
  ];
  const specs: Spec[] = [
    { label: "Мощность", value: vehicle.performance.power },
    { label: "Крутящий", value: vehicle.performance.torque },
    { label: "0–100 км/ч", value: vehicle.performance.zeroTo },
    { label: "Максимум", value: vehicle.performance.top },
    { label: "Снаряжённая масса", value: vehicle.performance.weight },
    { label: "Кузов", value: vehicle.body },
    { label: "Цвет", value: vehicle.paintName },
    { label: "Гарантия", value: "10 лет клубной программы" },
  ];

  return {
    slug: vehicle.slug,
    brand: vehicle.brand,
    model: vehicle.model,
    category: vehicle.category,
    tagline: vehicle.tagline,
    hours: vehicle.hours,
    film,
    duration: ["5 дней", "7 дней", "9 дней", "11 дней", "14 дней", "18 дней"][i % 6],
    story: [
      STORY_OBJECTIVE[i % STORY_OBJECTIVE.length](vehicle),
      STORY_SOLUTION[(i + 1) % STORY_SOLUTION.length](vehicle, film),
      STORY_RESULT[(i + 2) % STORY_RESULT.length](vehicle),
    ],
    quote: QUOTES[i % QUOTES.length],
    hero: shot(0),
    gallery,
    works: pick(WORKS_POOL, i, 6),
    materials: pick(MATERIALS_POOL, i, 4),
    faqs: pick(FAQS_POOL, i, 4),
    year: vehicle.year,
    city: "Санкт-Петербург",
    variant: (i % 4) as 0 | 1 | 2 | 3,
    specs,
    performance: vehicle.performance,
    bespoke: pick(BESPOKE_TEMPLATES, i, 4),
    palette: [
      {
        name: vehicle.paintName,
        hex: vehicle.paint,
        note: `Заводской цвет кузова ${vehicle.brand} ${vehicle.model}, сохранённый под защитной плёнкой.`,
      },
      { name: "Салон", hex: vehicle.interior, note: "Оттенок кожи и отделки салона автомобиля." },
      {
        name: "Диски",
        hex: vehicle.wheel,
        note: "Отделка колёсных дисков под керамической защитой.",
      },
    ],
  };
});

export const getWork = (slug: string) => WORKS.find((work) => work.slug === slug);

export const relatedWorks = (slug: string, n = 3) => {
  const current = getWork(slug);
  const sameBrand = WORKS.filter((work) => work.slug !== slug && work.brand === current?.brand);
  const sameCategory = WORKS.filter(
    (work) =>
      work.slug !== slug && work.category === current?.category && work.brand !== current?.brand,
  );
  const rest = WORKS.filter(
    (work) => work.slug !== slug && !sameBrand.includes(work) && !sameCategory.includes(work),
  );
  return [...sameBrand, ...sameCategory, ...rest].slice(0, n);
};

export const CATEGORIES = [
  "Все работы",
  "PPF",
  "Смена цвета",
  "Керамика",
  "Восстановление",
] as const;
