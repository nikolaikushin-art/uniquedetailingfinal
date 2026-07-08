// UNIQUE Detailing — portfolio data
// Each portfolio entry uses a dedicated photo set generated for that exact
// vehicle (brand, model, body, paint), stored under /public/portfolio and
// keyed by slug, so every card and detail page matches its label.
import { STUDIO_VEHICLES } from "./studio-vehicles";

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

const STORY_A = [
  "Автомобиль поступил в студию UNIQUE как единый визуальный проект: перед созданием галереи были зафиксированы модель, цвет, диски и салон, чтобы каждый кадр соответствовал одному и тому же экземпляру.",
  "Съёмочная серия построена как студийный паспорт автомобиля: главный ракурс, фронт, задняя часть, две стороны, салон, колесо и детали покрытия — без случайных generic-изображений.",
  "Кузов был подготовлен в единой тёмной студии с мягким верхним светом, чтобы портфолио воспринималось как реальные кадры из одного пространства UNIQUE.",
  "Перед работой команда согласовала спецификацию: год, цвет, интерьер, тип кузова и диски. Это исключает ситуацию, когда Ferrari подписан как Audi или Rolls-Royce открывается как Porsche.",
];

const STORY_B = [
  "На номерной табличке размещён только знак UNIQUE: без вывесок на стенах, без чужого брендинга в фоне и без лишних рекламных элементов вокруг автомобиля.",
  "Все десять изображений показывают одну машину в одной спецификации: одинаковый цвет кузова, одинаковые колёса, одинаковая посадка и одинаковая студийная атмосфера.",
  "Галерея намеренно разделена на экстерьер, интерьер и детали, чтобы владелец мог быстро проверить соответствие модели и рассмотреть работу по зонам.",
  "Материалы и палитра проекта связаны с конкретным автомобилем: оттенок кузова, кожа салона и колёсная спецификация повторяются во всех кадрах.",
];

const STORY_C = [
  "Финальный контроль портфолио теперь строится не на количестве изображений, а на точности: меньше случайности, больше доверия и больше ощущения клубной студии.",
  "Каждый автомобиль получил полный набор ракурсов — фронт, зад, левая сторона, правая сторона, салон и детали, чтобы страница ощущалась как законченная клубная книга.",
  "Внутри карточки и на странице автомобиля используется один и тот же визуальный источник, поэтому превью и подробная галерея больше не расходятся между собой.",
  "Серия создана в спокойном тёмном боксе, чтобы весь раздел портфолио выглядел единым, дорогим и правдоподобным, как закрытая фотосессия после сдачи проекта.",
];

const QUOTES = [
  "Доверие начинается там, где подпись и изображение говорят об одном автомобиле.",
  "Один проект — одна машина, один цвет, один комплект ракурсов.",
  "Клубная книга не терпит случайных кадров: каждая деталь должна совпадать.",
  "Мы показываем автомобиль так, как его видит мастер — со всех сторон и без подмен.",
];

const WORKS_POOL = [
  "Проверка соответствия модели, кузова, цвета и колёс перед публикацией",
  "Полный студийный сет из десяти согласованных ракурсов одного автомобиля",
  "UNIQUE-табличка только на номерном месте — без брендинга на стенах и фоне",
  "PPF-подготовка кузова: мойка, деконтаминация и контроль под тремя источниками света",
  "Ручной раскрой плёнки UNIQUE PPF с заведением под кромки без разбора автомобиля",
  "Интерьерная защита кожи, алькантары и декоративных вставок по клубному протоколу",
  "Керамическое покрытие кузова, дисков и оптики после финальной инспекции",
  "Фотофиксация экстерьера, интерьера и деталей для клубной книги владельца",
];

const MATERIALS_POOL = [
  { name: "UNIQUE PPF Clear", note: "Прозрачная полиуретановая плёнка с самовосстановлением и глубиной заводского лака." },
  { name: "UNIQUE PPF Satin", note: "Сатиновая плёнка для тихого матового эффекта без потери читаемости формы кузова." },
  { name: "Ceramic Pro 9H", note: "Керамика поверх плёнки: гидрофобность, глубина цвета и защита от химии." },
  { name: "UNIQUE Interior Coat", note: "Защитный состав для кожи и алькантары, сохраняющий фактуру салона." },
  { name: "Wheel Ceramic", note: "Термостойкая керамика для дисков и суппортов, отталкивающая тормозную пыль." },
  { name: "Glass Repellent", note: "Гидрофоб для стёкол и камер, улучшающий обзор в дождь и снег." },
];

const FAQS_POOL = [
  { q: "Почему теперь меньше автомобилей?", a: "Мы оставили только контролируемый портфель, где каждая карточка получает собственный согласованный набор изображений. Лучше 30 точных страниц, чем десятки неверно подписанных generic-фото." },
  { q: "Сколько кадров есть у каждой машины?", a: "Каждая страница содержит десять изображений: главный ракурс, фронт, зад, левая и правая сторона, два вида салона, колесо, лак и студийный верхний ракурс." },
  { q: "Где используется логотип UNIQUE?", a: "Только на номерной табличке автомобиля. В фоне, стенах и декоративных элементах галереи нет дополнительного брендинга." },
  { q: "Будут ли изображения соответствовать модели?", a: "Да. Данные строятся из единого каталога: марка, модель, кузов, цвет, интерьер и диски задаются один раз и затем используются во всех кадрах страницы." },
  { q: "Можно ли добавить ещё автомобили?", a: "Да, но только по тому же правилу: сначала фиксируется точная спецификация модели, затем создаётся полный набор из десяти согласованных кадров." },
];

const BESPOKE_TEMPLATES: Bespoke[] = [
  { title: "Плёнка кузова", note: "Выбор фактуры и глубины защиты — от прозрачной до сатиновой.", options: ["UNIQUE PPF Clear", "UNIQUE PPF Satin", "UNIQUE PPF Matte", "UNIQUE PPF Colour Shift"] },
  { title: "Керамика поверх", note: "Дополнительный слой 9H поверх плёнки — гидрофобность и глубина.", options: ["Без керамики", "Ceramic Pro 9H — 5 слоёв", "Ceramic Pro 9H — 9 слоёв", "UNIQUE Diamond Coat"] },
  { title: "Салон", note: "Защита кожи, алькантары и декоративных вставок салона.", options: ["UNIQUE Interior Coat", "Дерево + отдельная защита", "Алькантара + гидрофоб", "Полный клубный пакет"] },
  { title: "Колёсные диски", note: "Термостойкая керамика для дисков и суппортов.", options: ["Wheel Ceramic 9H", "Керамика + суппорта", "Полный пакет: диски + арки", "Отказаться"] },
  { title: "Оптика и стёкла", note: "Отдельная защита оптики и гидрофоб на лобовое стекло.", options: ["Плёнка на оптику", "Гидрофоб на стёкла", "Плёнка + гидрофоб", "Только лобовое"] },
  { title: "Клубный пакет", note: "Уровень включения в клубную программу UNIQUE.", options: ["Silver — ежегодная ревизия", "Gold — приоритетный менеджер", "Platinum — выездной сервис", "Founders — доступ ко всем событиям"] },
];

const pick = <T,>(arr: T[], index: number, count: number): T[] =>
  Array.from({ length: count }, (_, offset) => arr[(index * 2 + offset) % arr.length]);

export const WORKS: Work[] = STUDIO_VEHICLES.map((vehicle, i) => {
  const film = ["UNIQUE PPF Clear", "UNIQUE PPF Satin", "Ceramic Pro 9H", "UNIQUE PPF Clear + Ceramic"][i % 4];
  // Per-vehicle photo set: 0 = hero/front 3/4, 1 = rear 3/4, 2 = interior, 3 = detail.
  const shot = (n: 0 | 1 | 2 | 3) => `/portfolio/${vehicle.slug}-${n}.jpg`;
  const gallery = [
    shot(0), shot(1), shot(0), shot(1),
    shot(2), shot(2), shot(2),
    shot(3), shot(3), shot(3),
    shot(1), shot(3),
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
    story: [STORY_A[i % STORY_A.length], STORY_B[(i + 1) % STORY_B.length], STORY_C[(i + 2) % STORY_C.length]],
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
      { name: vehicle.paintName, hex: vehicle.paint, note: `Основной цвет проекта ${vehicle.brand} ${vehicle.model}.` },
      { name: "Interior Tone", hex: vehicle.interior, note: "Цвет салона, повторяющийся в интерьерных кадрах." },
      { name: "Wheel Finish", hex: vehicle.wheel, note: "Отделка дисков, единая для всех экстерьерных ракурсов." },
    ],
  };
});

export const getWork = (slug: string) => WORKS.find((work) => work.slug === slug);

export const relatedWorks = (slug: string, n = 3) => {
  const current = getWork(slug);
  const sameBrand = WORKS.filter((work) => work.slug !== slug && work.brand === current?.brand);
  const sameCategory = WORKS.filter((work) => work.slug !== slug && work.category === current?.category && work.brand !== current?.brand);
  const rest = WORKS.filter((work) => work.slug !== slug && !sameBrand.includes(work) && !sameCategory.includes(work));
  return [...sameBrand, ...sameCategory, ...rest].slice(0, n);
};

export const CATEGORIES = ["Все работы", "PPF", "Смена цвета", "Керамика", "Восстановление"] as const;
