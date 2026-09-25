import { Link, createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  ClipboardList,
  Gem,
  Gift,
  HeartHandshake,
  KeyRound,
  Play,
  Plus,
  ShieldCheck,
  Truck,
  Video,
  Car,
  type LucideIcon,
} from "lucide-react";
import { Rule } from "@/components/site/PageHero";
import { CdnImage } from "@/components/site/CdnImage";
import { cdn } from "@/lib/cdn";
import { LeadForm } from "@/components/site/LeadForm";
import { REVIEWS } from "@/lib/reviews";
import {
  SITE_PHONE_DISPLAY,
  SITE_PHONE_HREF,
  STUDIO_ADDRESS_SHORT,
  WORK_HOURS,
} from "@/lib/site-config";
import { PRIVILEGES } from "@/lib/privileges";
import { pageSeo } from "@/lib/seo";

export const Route = createFileRoute("/privilegii")({
  head: () =>
    pageSeo({
      title: "Привилегии работы с нами — UNIQUE Detailing",
      description:
        "Почему именно UNIQUE: сервис «под ключ», эвакуатор, такси бизнес-класса, ежедневный видеоотчёт, гарантия, клубные программы и персональная карточка автомобиля.",
      path: "/privilegii",
      ogDescription: "Привилегии клиентов студии UNIQUE Detailing.",
    }),
  component: PrivilegiiPage,
});

/* Иконки и детали — в порядке PRIVILEGES (тексты самих привилегий остаются в lib/privileges). */
const ICONS: readonly LucideIcon[] = [
  HeartHandshake,
  KeyRound,
  Truck,
  Car,
  Video,
  Gem,
  Gift,
  ShieldCheck,
  ClipboardList,
];
const DETAILS: readonly (readonly string[])[] = [
  [
    "Личный менеджер на связи",
    "Подстраиваемся под ваш график",
    "Ключевые решения согласуем с вами",
  ],
  [
    "Один договор и одно место",
    "Партнёры приезжают к нам в студию",
    "Вам не нужно искать мастеров самому",
  ],
  ["Забор из любой точки города", "Возврат по нужному адресу", "Бережная погрузка и перевозка"],
  ["Домой, в офис, в аэропорт", "Подача в удобное время", "Комфорт с первой минуты"],
  ["Видео и статус этапов", "В удобный для вас мессенджер", "Без лишних звонков и ожиданий"],
  [
    "Премиальные материалы и оборудование",
    "Проверенные производители",
    "Материалы фиксируются в карточке",
  ],
  ["Бонусы для постоянных клиентов", "Встречи владельцев", "Приглашения на закрытые события"],
  [
    "Условия закреплены в договоре",
    "Осмотр при выдаче вместе с мастером",
    "Ответственность за результат",
  ],
  ["История всех работ", "Использованные материалы", "Ценный документ при продаже автомобиля"],
];

type Step = { when: string; title: string; text: string; tag: string };
const COMMON_START: Step = {
  when: "Обращение",
  title: "Вас слушают, а не продают",
  text: "Менеджер выясняет задачи и подбирает решение под ваш график и бюджет.",
  tag: "Ориентированность на клиента",
};
const COMMON_MID: Step[] = [
  {
    when: "День 0",
    title: "Приёмка и открытие карточки",
    text: "Осмотр, фото, состояние кузова и салона — первая запись в персональной карточке автомобиля.",
    tag: "Персональная карточка",
  },
  {
    when: "Дни работ",
    title: "Всё под ключ, в одной студии",
    text: "Работают наши специалисты, а если нужна смежная услуга — приглашённые профессионалы приезжают к нам. Материалы и оборудование — высшего класса.",
    tag: "Под ключ · материалы",
  },
  {
    when: "Каждый день",
    title: "Видеоотчёт о ходе работ",
    text: "Короткое видео и статус этапов приходят вам ежедневно.",
    tag: "Видеоотчёт",
  },
  {
    when: "Выдача",
    title: "Вместе проверяем результат",
    text: "Передаём автомобиль, карточку с материалами и гарантийные условия.",
    tag: "Гарантия",
  },
];
const COMMON_END: Step = {
  when: "После",
  title: "Отношения продолжаются",
  text: "Бонусные программы и приглашения на закрытые мероприятия для постоянных клиентов.",
  tag: "Клубные программы",
};
const ROUTES = {
  tow: {
    label: "Заберём эвакуатором",
    note: "Мы заберём автомобиль на эвакуаторе из любой точки города и вернём его после работ — вы не тратите ни часа.",
    steps: [
      COMMON_START,
      {
        when: "День 0",
        title: "Эвакуатор приезжает за автомобилем",
        text: "Бережная погрузка и доставка в студию в удобное для вас время.",
        tag: "Забор и доставка",
      },
      ...COMMON_MID,
      {
        when: "Возврат",
        title: "Эвакуатор — обратно к вам",
        text: "Привезём автомобиль по нужному адресу в согласованное время.",
        tag: "Забор и доставка",
      },
      COMMON_END,
    ],
  },
  self: {
    label: "Приеду сам",
    note: "Приезжайте лично — после сдачи автомобиля такси бизнес-класса отвезёт вас в любую точку города.",
    steps: [
      COMMON_START,
      {
        when: "День 0",
        title: "Личная сдача автомобиля",
        text: "Обсуждаем задачи с мастером лично, пока автомобиль рядом.",
        tag: "Высокий сервис",
      },
      {
        when: "День 0",
        title: "Такси бизнес-класса",
        text: "Автомобиль остаётся в студии, а вас везут домой или в офис — в любую точку города.",
        tag: "Такси бизнес-класса",
      },
      ...COMMON_MID,
      COMMON_END,
    ],
  },
} as const;
type RouteKey = keyof typeof ROUTES;

const REPORT_DAYS = [
  { d: "День 1", t: "Приёмка и подготовка", s: "Мойка, деконтаминация, замеры ЛКП", p: 25 },
  { d: "День 2", t: "Основные работы", s: "Многоэтапная коррекция покрытия", p: 50 },
  { d: "День 3", t: "Защитное покрытие", s: "Нанесение защиты, контроль в свете студии", p: 75 },
  { d: "День 4", t: "Финальный осмотр", s: "Салон, детали, подготовка к выдаче", p: 100 },
];
const REPORT_STEPS = [
  "Приёмка и фотофиксация",
  "Подготовка поверхности",
  "Основные работы",
  "Защитный слой",
  "Контроль качества",
];

const CARD_TABS: Record<string, [string, string, string][]> = {
  Работы: [
    ["Этап 1", "Мойка и деконтаминация", "выполнено"],
    ["Этап 2", "Многоэтапная полировка", "выполнено"],
    ["Этап 3", "Защитное покрытие", "выполнено"],
    ["Этап 4", "Химчистка салона", "выполнено"],
  ],
  Материалы: [
    ["Покрытие", "Производитель, серия, номер партии", "в карточке"],
    ["Абразивы", "Пасты и полировальные круги", "в карточке"],
    ["Салон", "Составы для кожи и пластика", "в карточке"],
  ],
  Гарантия: [
    ["Условия", "Закреплены в договоре", "письменно"],
    ["Срок", "Зависит от вида услуги", "по услуге"],
    ["Уход", "Рекомендации после выдачи", "памятка"],
  ],
  "Фото и видео": [
    ["До", "Состояние при приёмке", "архив"],
    ["Во время", "Ежедневные видеоотчёты", "архив"],
    ["После", "Итог при выдаче", "архив"],
  ],
};

const COMPARE: [string, string, string][] = [
  [
    "Как доставить автомобиль",
    "Клиент едет сам и возвращается на своём ходу",
    "Эвакуатор в студию и обратно или такси бизнес-класса",
  ],
  [
    "Нужна смежная услуга",
    "«Ищите другого мастера сами»",
    "Профессионалы приезжают к нам — всё под одной крышей",
  ],
  ["Что с автомобилем сейчас", "Звонок и ожидание ответа", "Ежедневное видео и статус этапов"],
  [
    "Чем работали",
    "«Хорошая химия, не волнуйтесь»",
    "Материалы и оборудование высшего класса — в карточке",
  ],
  ["Что после выдачи", "Чек и до свидания", "Гарантия, бонусы и закрытые события"],
];
const FAQ: [string, string][] = [
  [
    "Эвакуатор и такси — это платно?",
    "Условия зависят от услуги и маршрута. Менеджер назовёт их заранее, при записи, до начала работ.",
  ],
  [
    "Вы делаете работы, которых нет в вашем списке?",
    "Если мы не выполняем услугу сами, привлечём проверенных партнёров. Они приедут в студию — автомобиль никуда не поедет.",
  ],
  [
    "Как приходят видеоотчёты?",
    "Ежедневно, в удобный вам мессенджер, вместе с кратким статусом этапов.",
  ],
  [
    "Что входит в карточку автомобиля?",
    "Список работ, использованные материалы, фото и видео, гарантийные условия и рекомендации по уходу.",
  ],
  [
    "Кто может участвовать в клубных программах?",
    "Постоянные клиенты студии. Подробности — на странице «Клуб Unique» или у менеджера.",
  ],
];

const MARQUEE = [
  "Под ключ",
  "Эвакуатор",
  "Такси бизнес-класса",
  "Видеоотчёт каждый день",
  "Премиальные материалы",
  "Клубные программы",
  "Гарантия",
  "Карточка автомобиля",
];
const STATS: readonly [string, string][] = [
  ["9", "Привилегий в каждой работе студии"],
  ["1×/день", "Видеоотчёт о статусе работ"],
  ["1", "Персональная карточка на каждый автомобиль"],
  ["∞", "Клубный сервис после выдачи"],
];
const EVENTS: readonly [string, string, string][] = [
  ["Февраль", "Клубный завтрак", "Встреча владельцев в студии: новые мастера и материалы."],
  ["Май", "Автомобильная поездка", "Однодневный маршрут по Ленинградской области."],
  ["Август", "День открытых дверей", "Экскурсия по студии и технический разбор."],
  ["Ноябрь", "Годовой ужин клуба", "Итоги года и планы на следующий сезон."],
];
const EXPLORE = [
  {
    to: "/uslugi",
    t: "Услуги",
    d: "Полный каталог работ студии — от плёнки до химчистки.",
    img: "/portfolio/aston-martin-db12-craft-1.jpg",
  },
  {
    to: "/kompleksy",
    t: "Комплексы услуг",
    d: "Готовые программы, собранные под задачу.",
    img: "/portfolio/bentley-continental-gt-speed-0.jpg",
  },
  {
    to: "/plenka",
    t: "Плёнка Unique",
    d: "Собственная защитная плёнка студии.",
    img: "/portfolio/ferrari-sf90-stradale-craft-4.jpg",
  },
  {
    to: "/raboty",
    t: "Работы",
    d: "Реальные автомобили и истории проектов.",
    img: "/portfolio/lamborghini-revuelto-0.jpg",
  },
  {
    to: "/nasledie",
    t: "Наследие",
    d: "Философия и подход студии UNIQUE.",
    img: "/portfolio/audi-r8-v10-performance-0.jpg",
  },
  {
    to: "/klub",
    t: "Клуб Unique",
    d: "Закрытое сообщество владельцев.",
    img: "/portfolio/bmw-xm-label-red-det-4.jpg",
  },
] as const;

const OPTIONS = [
  "Плёнка PPF",
  "Смена цвета",
  "Керамика",
  "Полировка",
  "Салон",
  "Другая услуга",
] as const;
const PARTNERS: readonly [string, string][] = [
  ["Шиномонтаж и диски", "Работы с колёсами и дисками проводит специалист, приехавший в студию."],
  ["Кузовной ремонт", "Кузовные работы согласуем и организуем — мастер работает у нас."],
  ["Тонировка и стёкла", "Стёкла и тонировка выполняются в студии профильным мастером."],
  ["Автоэлектрика", "Электрика и мультимедиа — без поиска исполнителя на вашей стороне."],
  ["Аудиосистемы", "Установка и настройка звука специалистом в нашей студии."],
  ["Оптика и свет", "Работы с фарами и подсветкой согласуем с вами заранее."],
  ["Диагностика и ТО", "Регламентные работы и диагностика в удобное для вас время."],
  ["Кожа и салон", "Реставрация и перетяжка салона приглашённым мастером."],
];
const TRACKS = {
  tow: {
    label: "Эвакуатор",
    img: "/portfolio/bentley-flying-spur-mulliner-0.jpg",
    lead: "Автомобиль забираем и возвращаем на эвакуаторе — из любой точки города и обратно.",
    steps: ["Заявка принята", "Эвакуатор выехал", "Автомобиль в студии", "Карточка открыта"],
  },
  taxi: {
    label: "Такси бизнес-класса",
    img: "/portfolio/ferrari-roma-0.jpg",
    lead: "При личной сдаче автомобиля такси бизнес-класса отвезёт вас из студии в любую точку города.",
    steps: ["Автомобиль сдан мастеру", "Такси подано", "Вы в пути", "Вы на месте"],
  },
} as const;
const MATERIALS: Record<string, readonly string[]> = {
  Плёнка: ["Производитель и серия плёнки", "Номер партии и рулона", "Зоны нанесения"],
  Керамика: ["Состав и количество слоёв", "Условия нанесения", "Памятка по уходу"],
  Полировка: ["Пасты и полировальные круги", "Замеры толщины ЛКП", "Этапы коррекции"],
  Салон: ["Составы для кожи и пластика", "Оборудование для химчистки", "Обработанные зоны"],
};

const STEP_IMGS = [
  "/portfolio/bentley-flying-spur-mulliner-2.jpg",
  "/portfolio/bentley-flying-spur-mulliner-0.jpg",
  "/portfolio/aston-martin-db12-0.jpg",
  "/portfolio/lamborghini-revuelto-craft-2.jpg",
  "/portfolio/ferrari-sf90-stradale-craft-4.jpg",
  "/portfolio/aston-martin-db12-int-2.jpg",
  "/portfolio/ferrari-roma-0.jpg",
  "/portfolio/bmw-xm-label-red-det-4.jpg",
] as const;
const CARD_IMGS = [
  "/portfolio/aston-martin-db12-craft-1.jpg",
  "/portfolio/aston-martin-dbs-770-ultimate-det-2.jpg",
  "/portfolio/bentley-bentayga-speed-craft-1.jpg",
  "/portfolio/ferrari-roma-det-4.jpg",
  "/portfolio/ferrari-roma-det-6.jpg",
  "/portfolio/lamborghini-revuelto-det-1.jpg",
  "/portfolio/audi-r8-v10-performance-0.jpg",
  "/portfolio/aston-martin-db12-det-2.jpg",
  "/portfolio/ferrari-sf90-stradale-0.jpg",
] as const;
/** [час, заголовок, текст, индекс привилегии, фото] */
const DAY: readonly [number, string, string, number, string][] = [
  [
    9,
    "Студия открывается",
    "Мастер знакомится с планом дня по вашему автомобилю и вашими пожеланиями.",
    0,
    "/portfolio/aston-martin-db12-0.jpg",
  ],
  [
    10,
    "Утренний осмотр",
    "Фиксируем состояние кузова и салона — запись попадает в персональную карточку.",
    8,
    "/portfolio/ferrari-roma-det-4.jpg",
  ],
  [
    12,
    "Подготовка поверхности",
    "Работаем на материалах и оборудовании высшего класса.",
    5,
    "/portfolio/lamborghini-revuelto-det-1.jpg",
  ],
  [
    14,
    "Основные работы",
    "Трудятся наши мастера, а при необходимости — приглашённый специалист прямо в студии.",
    1,
    "/portfolio/lamborghini-revuelto-craft-2.jpg",
  ],
  [
    17,
    "Контроль качества",
    "Проверяем результат при свете студии — на каждую работу распространяется гарантия.",
    7,
    "/portfolio/ferrari-sf90-stradale-craft-4.jpg",
  ],
  [
    19,
    "Видеоотчёт у вас",
    "Снимаем итоги дня и отправляем видео со статусом этапов в удобный мессенджер.",
    4,
    "/portfolio/maserati-mc20-cielo-0.jpg",
  ],
  [
    20,
    "Студия закрывается",
    "Автомобиль остаётся под присмотром. Завтра — новый отчёт.",
    0,
    "/portfolio/bentley-continental-gt-speed-0.jpg",
  ],
];
const ACT = [
  "Кузов осмотрен при студийном свете",
  "Салон и мелкие детали проверены",
  "Покрытие или плёнка приняты",
  "Комплектация и вещи возвращены",
  "Карточка автомобиля передана",
  "Гарантийные условия вручены",
  "Видеоархив работ доступен",
];

const HEAD = { letterSpacing: "0.04em" } as const;

function goTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function PrivilegiiPage() {
  const [route, setRoute] = useState<RouteKey>("tow");
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState<number | null>(0);
  const [day, setDay] = useState(1);
  const [tab, setTab] = useState("Работы");
  const listRef = useRef<HTMLOListElement>(null);
  const [showBar, setShowBar] = useState(false);
  useEffect(() => {
    const on = () => setShowBar(window.scrollY > 700);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  const steps = ROUTES[route].steps;

  useEffect(() => {
    setActive(0);
    const items = listRef.current?.querySelectorAll("[data-step]");
    if (!items) return;
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.step));
        }),
      { rootMargin: "-40% 0px -45% 0px" },
    );
    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [route]);

  const rd = REPORT_DAYS[day];

  return (
    <div>
      <section className="relative flex min-h-[100svh] items-end overflow-hidden border-b border-line pb-16 pt-32 md:pb-20">
        <div className="absolute inset-0 animate-drift">
          <CdnImage
            src={cdn("/portfolio/bentley-flying-spur-mulliner-2.jpg")}
            alt="Bentley Flying Spur в студии UNIQUE Detailing"
            className="h-full w-full object-cover"
            sizes="100vw"
            loading="eager"
            fetchPriority="high"
            fallbackWidth={1080}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-obsidian via-obsidian/70 to-obsidian/20" />
        <div className="absolute inset-0 plate-scrim" />
        <span
          aria-hidden
          className="pointer-events-none absolute -bottom-[4vw] -right-[2vw] select-none font-display leading-[0.8] text-transparent"
          style={{
            fontSize: "clamp(260px,44vw,700px)",
            WebkitTextStroke: "1px rgb(234 232 226 / 0.22)",
          }}
        >
          9
        </span>
        <div className="relative z-10 mx-auto w-full max-w-[1400px] px-[6vw]">
          <p className="eyebrow eyebrow-dot mb-6">Привилегии работы с нами</p>
          <h1
            className="max-w-[1000px] font-display uppercase leading-[1.02] text-ivory"
            style={{ fontSize: "clamp(38px,7.2vw,112px)", letterSpacing: "0.03em" }}
          >
            {["Автомобиль остаётся у нас.", "Заботы — тоже."].map((line, i) => (
              <span
                key={line}
                className="block animate-fade-up"
                style={{ animationDelay: `${0.15 + i * 0.25}s` }}
              >
                {line}
              </span>
            ))}
          </h1>
          <p className="mt-8 max-w-[600px] text-[15px] leading-[1.9] text-mute md:text-[16px]">
            Девять причин, по которым владельцы выбирают UNIQUE: мы берём на себя дорогу, сроки,
            смежных мастеров и отчётность, а вам оставляем только результат.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <button
              type="button"
              onClick={() => goTo("put")}
              className="btn-line btn-ember text-center"
              data-testid="hero-cta-journey"
            >
              Пройти путь автомобиля
            </button>
            <button
              type="button"
              onClick={() => goTo("all")}
              className="btn-line text-center"
              data-testid="hero-cta-nine"
            >
              Все девять привилегий
            </button>
          </div>
        </div>
      </section>

      {/* ПОЛОСА */}
      <div className="overflow-hidden border-b border-line bg-obsidian-2 py-7">
        <div className="flex w-max animate-marquee gap-14 whitespace-nowrap font-display text-xl uppercase tracking-[0.3em] text-mute-2 motion-reduce:animate-none md:text-2xl">
          {[...MARQUEE, ...MARQUEE].map((m, i) => (
            <span key={i} className="flex items-center gap-14">
              {m}
              <span className="h-1 w-1 rounded-full bg-ember" />
            </span>
          ))}
        </div>
      </div>

      {/* ПОЧЕМУ ИМЕННО МЫ */}
      <section className="px-[6vw] py-24 md:py-32">
        <div className="mx-auto max-w-[1320px]">
          <Rule label="Почему именно мы" num="01" />
          <p
            className="max-w-[1000px] font-display uppercase leading-[1.2] text-ivory"
            style={{ fontSize: "clamp(22px,2.8vw,38px)", letterSpacing: "0.05em" }}
          >
            Детейлинг — это не только полировка и плёнка. Это доверие: вы передаёте автомобиль и
            хотите быть спокойны за каждый час, пока его нет рядом.
          </p>
          <div className="mt-14 grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-12">
            {[
              ["Клиент — в центре", "Мы подстраиваемся под ваш график, а не наоборот."],
              ["Всё прозрачно", "Видео, карточка, материалы и гарантия — на виду и на бумаге."],
              [
                "Ничего не «не наше»",
                "Нужной услуги нет у нас — найдём лучшего мастера и пригласим в студию.",
              ],
            ].map(([t, d]) => (
              <div key={t} className="border-l border-ember pl-6">
                <h3 className="font-display text-xl uppercase text-ivory" style={HEAD}>
                  {t}
                </h3>
                <p className="mt-3 max-w-[300px] text-[14px] leading-[1.85] text-mute">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ПУТЬ АВТОМОБИЛЯ */}
      <section
        id="put"
        className="scroll-mt-16 border-y border-line bg-obsidian-2 px-[6vw] py-24 md:py-32"
      >
        <div className="mx-auto max-w-[1320px]">
          <Rule label="Путь автомобиля" num="02" />
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-24">
            <div className="lg:sticky lg:top-32 lg:self-start">
              <h2
                className="font-display uppercase leading-[1.1] text-ivory"
                style={{ fontSize: "clamp(28px,3.4vw,46px)", letterSpacing: "0.05em" }}
              >
                От первого звонка до клубного вечера
              </h2>
              <p className="mt-6 max-w-[440px] text-[15px] leading-[1.9] text-mute">
                Выберите, как автомобиль попадёт в студию, — и посмотрите, что произойдёт дальше.
              </p>
              <div
                className="mt-9 grid max-w-[460px] grid-cols-2 border border-line-strong"
                role="group"
                aria-label="Способ доставки"
              >
                {(Object.keys(ROUTES) as RouteKey[]).map((k) => (
                  <button
                    key={k}
                    type="button"
                    aria-pressed={route === k}
                    onClick={() => setRoute(k)}
                    data-testid={`route-${k}`}
                    className={`px-3 py-5 text-[10px] uppercase tracking-[0.16em] sm:px-4 sm:text-[11px] sm:tracking-[0.24em] transition-colors duration-500 ${
                      route === k ? "bg-ivory text-obsidian" : "text-mute hover:text-ivory"
                    }`}
                  >
                    {ROUTES[k].label}
                  </button>
                ))}
              </div>
              <p className="mt-6 min-h-[60px] max-w-[440px] text-[14px] leading-[1.85] text-mute">
                {ROUTES[route].note}
              </p>
              <div className="relative mt-8 hidden aspect-[16/8] max-w-[460px] overflow-hidden border border-line lg:block">
                {STEP_IMGS.map((img, i) => (
                  <div
                    key={img}
                    className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${i === active ? "opacity-70" : "opacity-0"}`}
                    style={{ backgroundImage: `url(${cdn(img)})` }}
                  />
                ))}
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian/90 via-transparent to-transparent" />
                <p className="eyebrow absolute bottom-3 left-4 text-ivory">{steps[active]?.tag}</p>
              </div>
              <div className="mt-6 max-w-[460px]">
                <div className="h-px bg-line">
                  <div
                    className="h-px bg-ember transition-all duration-500"
                    style={{ width: `${((active + 1) / steps.length) * 100}%` }}
                  />
                </div>
                <p className="eyebrow mt-4 flex justify-between">
                  <span>Этап {active + 1}</span>
                  <span>из {steps.length}</span>
                </p>
              </div>
            </div>

            <ol ref={listRef} className="relative ml-2 border-l border-line pl-8 sm:pl-10">
              <span
                className="absolute -left-px top-0 w-px bg-ember transition-all duration-700"
                style={{ height: `${((active + 1) / steps.length) * 100}%` }}
              />
              {steps.map((s, i) => (
                <li
                  key={`${route}-${i}`}
                  data-step={i}
                  className={`relative pb-16 transition-opacity duration-500 last:pb-0 ${i <= active ? "opacity-100" : "opacity-40"}`}
                >
                  <span
                    className={`absolute -left-[38px] top-1.5 sm:-left-[46px] h-[11px] w-[11px] rounded-full border transition-all duration-500 ${
                      i <= active
                        ? "border-ember bg-ember shadow-[0_0_0_6px_rgb(184_32_47/0.18)]"
                        : "border-mute-2 bg-obsidian-2"
                    }`}
                  />
                  <p className="eyebrow">{s.when}</p>
                  <h3
                    className="mt-3 font-display text-2xl uppercase leading-tight text-ivory"
                    style={HEAD}
                  >
                    {s.title}
                  </h3>
                  <p className="mt-4 max-w-[520px] text-[14.5px] leading-[1.85] text-mute">
                    {s.text}
                  </p>
                  <span className="mt-5 inline-block border border-line-strong px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] text-mute">
                    {s.tag}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ПАНЕЛЬ ПАКЕТА */}
      <PackagePanel route={route} setRoute={setRoute} />

      {/* 9 ПРИВИЛЕГИЙ */}
      <section id="all" className="scroll-mt-16 px-[6vw] py-24 md:py-32">
        <div className="mx-auto max-w-[1320px]">
          <Rule label="Привилегии клиентов UNIQUE" num="04" />
          <p className="mb-10 max-w-[560px] text-[15px] leading-[1.9] text-mute">
            Девять привилегий — девять обязательств. Нажмите на карточку, чтобы увидеть, что стоит
            за ней на практике.
          </p>
          <div className="grid grid-cols-1 gap-px bg-line md:grid-cols-2 lg:grid-cols-3">
            {PRIVILEGES.map((p, i) => {
              const Icon = ICONS[i] ?? Gem;
              const isOpen = open === i;
              return (
                <button
                  key={p.title}
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : i)}
                  data-testid={`privilege-card-${i + 1}`}
                  className={`group relative isolate flex flex-col overflow-hidden p-7 text-left transition-colors sm:p-9 duration-500 ${
                    isOpen ? "bg-obsidian-2" : "bg-obsidian hover:bg-obsidian-2"
                  }`}
                >
                  <span
                    className={`absolute inset-0 -z-10 bg-cover bg-center transition-all duration-1000 group-hover:scale-105 ${isOpen ? "opacity-30" : "opacity-0 group-hover:opacity-20"}`}
                    style={{ backgroundImage: `url(${cdn(CARD_IMGS[i])})` }}
                  />
                  <span className="absolute inset-0 -z-10 bg-gradient-to-t from-obsidian via-obsidian/60 to-obsidian/30" />
                  <span
                    className={`absolute inset-x-0 top-0 h-px bg-ember transition-all duration-700 ${isOpen ? "w-full" : "w-0 group-hover:w-full"}`}
                  />
                  <div className="flex items-start justify-between">
                    <span
                      className={`flex h-12 w-12 items-center justify-center border transition-colors duration-500 ${isOpen ? "border-ember text-ember" : "border-line-strong text-mute group-hover:border-ember group-hover:text-ember"}`}
                    >
                      <Icon size={22} strokeWidth={1.4} />
                    </span>
                    <Plus
                      size={20}
                      strokeWidth={1.2}
                      className={`text-mute transition-transform duration-500 ${isOpen ? "rotate-45 text-ember" : ""}`}
                    />
                  </div>
                  <h3
                    className="mt-8 font-display text-xl uppercase leading-tight text-ivory"
                    style={HEAD}
                  >
                    {p.title}
                  </h3>
                  <p className="mt-4 text-[14px] leading-[1.85] text-mute">{p.desc}</p>
                  <div
                    className={`grid transition-all duration-500 ${isOpen ? "mt-6 grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
                  >
                    <ul className="overflow-hidden border-t border-line">
                      {DETAILS[i].map((d) => (
                        <li
                          key={d}
                          className="relative py-2 pl-5 text-[13.5px] text-ivory first:mt-3"
                        >
                          <span className="absolute left-0 top-[19px] h-px w-3 bg-ember" />
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* КИНО-ПОЛОСА */}
      <section
        className="relative flex min-h-[70vh] items-center overflow-hidden border-y border-line md:bg-fixed"
        style={{
          backgroundImage: `url(${cdn("/portfolio/bentley-continental-gt-speed-0.jpg")})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-obsidian via-obsidian/75 to-obsidian/30" />
        <div className="relative mx-auto w-full max-w-[1320px] px-[6vw] py-24">
          <p className="eyebrow eyebrow-dot mb-8">Наше обещание</p>
          <p
            className="max-w-[900px] font-display uppercase leading-[1.15] text-ivory"
            style={{ fontSize: "clamp(26px,4vw,58px)", letterSpacing: "0.04em" }}
          >
            Пока автомобиль у нас — вы занимаетесь своими делами. Остальное — на нас.
          </p>
          <div className="mt-10 flex flex-wrap gap-x-12 gap-y-4 text-[13px] uppercase tracking-[0.22em] text-mute">
            <span>Эвакуатор</span>
            <span>Такси</span>
            <span>Видеоотчёт</span>
            <span>Гарантия</span>
          </div>
        </div>
      </section>

      {/* ПОД КЛЮЧ */}
      <KeyHub />

      {/* ТРАНСПОРТ */}
      <TransportPanel />

      {/* ДЕНЬ В СТУДИИ */}
      <DayPanel />

      {/* ВИДЕООТЧЁТ */}
      <section className="border-y border-line bg-obsidian-2 px-[6vw] py-24 md:py-32">
        <div className="mx-auto max-w-[1320px]">
          <Rule label="Ежедневный видеоотчёт" num="08" />
          <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-24">
            <div className="mx-auto w-full max-w-[340px] rounded-[38px] border border-line-strong bg-obsidian p-3 shadow-[0_40px_90px_rgba(0,0,0,.6)]">
              <div className="overflow-hidden rounded-[28px] bg-panel">
                <div
                  className="relative aspect-[3/4] bg-cover bg-center transition-[filter] duration-700"
                  style={{
                    backgroundImage: `url(${cdn("/portfolio/maserati-mc20-cielo-0.jpg")})`,
                    filter: `saturate(${0.6 + day * 0.25}) brightness(${0.8 + day * 0.1})`,
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/30 to-transparent" />
                  <span className="eyebrow absolute left-4 top-4 flex items-center gap-2 text-ivory">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-ember" /> Видеоотчёт
                  </span>
                  <span className="absolute inset-0 m-auto flex h-16 w-16 items-center justify-center rounded-full border border-ivory/60 bg-obsidian/40 backdrop-blur">
                    <Play size={20} className="ml-1 text-ivory" />
                  </span>
                  <div className="absolute inset-x-5 bottom-5">
                    <p className="font-display text-2xl uppercase leading-tight text-ivory">
                      {rd.t}
                    </p>
                    <p className="mt-1 text-[12px] text-mute">{rd.s}</p>
                    <div className="mt-4 h-px bg-line">
                      <div
                        className="h-px bg-ember transition-all duration-1000"
                        style={{ width: `${rd.p}%` }}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex gap-1.5 px-4 pt-4" role="tablist">
                  {REPORT_DAYS.map((x, i) => (
                    <button
                      key={x.d}
                      type="button"
                      role="tab"
                      aria-selected={day === i}
                      onClick={() => setDay(i)}
                      className={`flex-1 border py-2.5 text-center text-[10px] uppercase tracking-[0.14em] transition-colors ${day === i ? "border-ember bg-ember/10 text-ivory" : "border-line text-mute"}`}
                    >
                      {x.d}
                    </button>
                  ))}
                </div>
                <ul className="px-5 pb-5 pt-3 text-[13px]">
                  {REPORT_STEPS.map((s, j) => (
                    <li
                      key={s}
                      className={`flex gap-3 py-1.5 ${j < Math.round(rd.p / 20) ? "text-ivory" : "text-mute-2"}`}
                    >
                      <span className={j < Math.round(rd.p / 20) ? "text-ember" : ""}>
                        {j < Math.round(rd.p / 20) ? "●" : "○"}
                      </span>
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div>
              <h2
                className="font-display uppercase leading-[1.1] text-ivory"
                style={{ fontSize: "clamp(28px,3.4vw,46px)", letterSpacing: "0.05em" }}
              >
                Вы видите автомобиль каждый день
              </h2>
              <p className="mt-6 max-w-[500px] text-[15px] leading-[1.9] text-mute">
                Пока идут работы, мы присылаем короткое видео и статус этапов. Не нужно звонить и
                спрашивать — вы всегда в курсе.
              </p>
              <ul className="mt-10 border-t border-line">
                {[
                  "Что сделано сегодня и что запланировано на завтра.",
                  "Крупный план ключевых этапов: подготовка, полировка, нанесение.",
                  "Если нужно ваше решение — спросим до того, как действовать.",
                ].map((t) => (
                  <li
                    key={t}
                    className="flex gap-4 border-b border-line py-5 text-[14.5px] text-mute"
                  >
                    <span className="mt-2.5 h-px w-4 shrink-0 bg-ember" />
                    {t}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-[12px] text-mute-2">
                Интерактивный пример: выберите день в телефоне.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* МАТЕРИАЛЫ */}
      <MaterialsPanel />

      {/* КАРТОЧКА АВТОМОБИЛЯ */}
      <section className="px-[6vw] py-24 md:py-32">
        <div className="mx-auto max-w-[1320px]">
          <Rule label="Персональная карточка автомобиля" num="10" />
          <h2
            className="max-w-[800px] font-display uppercase leading-[1.1] text-ivory"
            style={{ fontSize: "clamp(28px,3.4vw,46px)", letterSpacing: "0.05em" }}
          >
            Паспорт вашего автомобиля — с первого дня в студии
          </h2>
          <p className="mt-6 max-w-[560px] text-[15px] leading-[1.9] text-mute">
            Каждая операция, материал и гарантия фиксируются в карточке. Это история автомобиля,
            которую можно показать при продаже.
          </p>
          <div className="mt-12 grid grid-cols-1 border border-line-strong bg-obsidian-2 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
            <div className="relative min-h-[380px] overflow-hidden">
              <div
                className="absolute inset-0 bg-cover bg-center opacity-50"
                style={{
                  backgroundImage: `url(${cdn("/portfolio/maserati-grecale-trofeo-craft-6.jpg")})`,
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/50 to-obsidian/20" />
              <div className="relative flex h-full min-h-[380px] flex-col justify-between p-8">
                <p className="eyebrow">Карточка · пример оформления</p>
                <div>
                  <p className="font-display text-4xl uppercase text-ivory" style={HEAD}>
                    Ваш автомобиль
                  </p>
                  <p className="mt-2 text-[13px] text-mute">Госномер · VIN · пробег при приёмке</p>
                </div>
              </div>
            </div>
            <div className="p-6 md:p-10">
              <div className="mb-6 flex gap-7 overflow-x-auto border-b border-line" role="tablist">
                {Object.keys(CARD_TABS).map((k) => (
                  <button
                    key={k}
                    type="button"
                    role="tab"
                    aria-selected={tab === k}
                    onClick={() => setTab(k)}
                    className={`-mb-px whitespace-nowrap border-b pb-4 text-[11px] uppercase tracking-[0.24em] transition-colors ${tab === k ? "border-ember text-ivory" : "border-transparent text-mute hover:text-ivory"}`}
                  >
                    {k}
                  </button>
                ))}
              </div>
              {CARD_TABS[tab].map(([a, b, c]) => (
                <div
                  key={a}
                  className="grid grid-cols-1 gap-1 border-b border-line py-4 text-[14.5px] sm:grid-cols-[110px_1fr_auto] sm:gap-5"
                >
                  <span className="text-[12px] tracking-[0.1em] text-mute-2">{a}</span>
                  <span className="text-ivory">{b}</span>
                  <span className="text-[11px] uppercase tracking-[0.16em] text-ember">{c}</span>
                </div>
              ))}
              <p className="mt-6 text-[12px] text-mute-2">
                Иллюстрация структуры карточки, не реальные записи.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ГАРАНТИЯ И КЛУБ */}
      <section className="px-[6vw] pb-24 md:pb-32">
        <div className="mx-auto grid grid-cols-1 max-w-[1320px] gap-px border border-line bg-line lg:grid-cols-2">
          {[
            {
              Icon: ShieldCheck,
              t: "Отвечаем за результат",
              d: "Гарантия распространяется на все проведённые работы. Условия и сроки зависят от вида услуги и фиксируются письменно.",
              l: [
                "Гарантийные обязательства — в договоре",
                "Осмотр при выдаче вместе с мастером",
                "Исправляем недочёты без споров",
              ],
            },
            {
              Icon: Gift,
              t: "Отношения не заканчиваются на выдаче",
              d: "Для постоянных клиентов — бонусные программы и закрытые мероприятия студии: встречи владельцев, презентации, вечера в кругу единомышленников.",
              l: [
                "Ежегодная ревизия плёнки, керамики и салонной защиты",
                "Приоритетная запись",
                "Автомобиль подмены на время работ",
              ],
              link: true,
            },
          ].map(({ Icon, t, d, l, link }) => (
            <div key={t} className="bg-obsidian p-8 md:p-14">
              <span className="relative flex h-[120px] w-[120px] items-center justify-center rounded-full border border-ember text-ember">
                <span className="absolute inset-[7px] animate-[spin_40s_linear_infinite] rounded-full border border-dashed border-line-strong motion-reduce:animate-none" />
                <Icon size={30} strokeWidth={1.2} />
              </span>
              <h3
                className="mt-8 font-display text-2xl uppercase leading-tight text-ivory md:text-3xl"
                style={HEAD}
              >
                {t}
              </h3>
              <p className="mt-5 max-w-[460px] text-[15px] leading-[1.9] text-mute">{d}</p>
              <ul className="mt-7">
                {l.map((x) => (
                  <li key={x} className="relative py-2 pl-6 text-[14.5px] text-ivory">
                    <span className="absolute left-0 top-[19px] h-px w-3 bg-ember" />
                    {x}
                  </li>
                ))}
              </ul>
              {link && (
                <Link to="/klub" className="link-more mt-8">
                  Клуб Unique
                </Link>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* АКТ ВЫДАЧИ */}
      <HandoverPanel />

      {/* КЛУБНЫЙ КАЛЕНДАРЬ */}
      <section className="px-[6vw] pb-24 md:pb-32">
        <div className="mx-auto max-w-[1320px]">
          <Rule label="Закрытые мероприятия" num="12" />
          <div className="grid grid-cols-1 gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
            {EVENTS.map(([m, t, d]) => (
              <div key={t} className="group relative bg-obsidian p-8">
                <span className="absolute inset-x-0 top-0 h-px w-0 bg-ember transition-all duration-700 group-hover:w-full" />
                <p className="eyebrow text-ember">{m}</p>
                <h3
                  className="mt-4 font-display text-xl uppercase leading-tight text-ivory"
                  style={HEAD}
                >
                  {t}
                </h3>
                <p className="mt-3 text-[13.5px] leading-[1.85] text-mute">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ПОКАЗАТЕЛИ */}
      <section className="border-y border-line bg-obsidian-2 px-[6vw] py-20">
        <div className="mx-auto grid grid-cols-1 max-w-[1320px] gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map(([v, l]) => (
            <div key={l} className="bg-obsidian-2 px-8 py-10 text-center">
              <p
                className="font-display text-ember"
                style={{ fontSize: "clamp(40px,4vw,60px)", letterSpacing: "0.02em" }}
              >
                {v}
              </p>
              <p className="mx-auto mt-4 max-w-[220px] text-[13.5px] leading-[1.8] text-mute">
                {l}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ОТЗЫВЫ — TODO(client): заменить примеры на реальные отзывы (см. lib/reviews.ts) */}
      <section className="px-[6vw] py-24 md:py-32">
        <div className="mx-auto max-w-[1320px]">
          <Rule label="Что говорят клиенты" num="13" />
          <div className="grid grid-cols-1 gap-px bg-line md:grid-cols-3">
            {REVIEWS.map((r) => (
              <figure key={r.name} className="relative bg-obsidian p-8">
                {r.placeholder ? (
                  <span className="absolute right-4 top-4 border border-ember/50 px-2 py-1 text-[9px] uppercase tracking-[0.25em] text-ember">
                    Пример отзыва
                  </span>
                ) : null}
                <blockquote className="mt-4 text-[14.5px] leading-[1.9] text-mute">
                  «{r.quote}»
                </blockquote>
                <figcaption className="mt-6 text-[11px] uppercase tracking-[0.25em] text-mute-2">
                  {r.name} · {r.car}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* СРАВНЕНИЕ */}
      <section className="border-y border-line bg-obsidian-2 px-[6vw] py-24 md:py-32">
        <div className="mx-auto max-w-[1320px]">
          <Rule label="Обычная студия и UNIQUE" num="14" />
          <div className="overflow-x-auto">
            <table className="w-full min-w-[680px] border-collapse text-left">
              <thead>
                <tr className="eyebrow">
                  <th className="p-4 font-normal">Вопрос</th>
                  <th className="p-4 font-normal">Как бывает</th>
                  <th className="p-4 font-normal text-ember">В UNIQUE</th>
                </tr>
              </thead>
              <tbody>
                {COMPARE.map(([q, a, b]) => (
                  <tr key={q} className="border-t border-line align-top">
                    <td
                      className="w-1/3 p-5 font-display text-xl uppercase text-ivory"
                      style={HEAD}
                    >
                      {q}
                    </td>
                    <td className="p-5 text-[14.5px] leading-[1.8] text-mute">{a}</td>
                    <td className="bg-ember/[0.06] p-5 text-[14.5px] leading-[1.8] text-ivory">
                      {b}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-[6vw] py-24 md:py-32">
        <div className="mx-auto max-w-[1000px]">
          <Rule label="Что обычно спрашивают" num="15" />
          {FAQ.map(([q, a]) => (
            <details key={q} className="group border-t border-line last:border-b">
              <summary
                className="flex cursor-pointer list-none items-center justify-between gap-6 py-7 font-display text-xl uppercase text-ivory [&::-webkit-details-marker]:hidden"
                style={HEAD}
              >
                {q}
                <Plus
                  size={20}
                  strokeWidth={1.2}
                  className="shrink-0 text-mute transition-transform duration-500 group-open:rotate-45 group-open:text-ember"
                />
              </summary>
              <p className="max-w-[640px] pb-8 text-[14.5px] leading-[1.9] text-mute">{a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* ПРОДОЛЖИТЕ ЗНАКОМСТВО */}
      <section className="border-t border-line px-[6vw] py-24 md:py-32">
        <div className="mx-auto max-w-[1320px]">
          <Rule label="Продолжите знакомство со студией" num="16" />
          <div className="grid grid-cols-1 gap-px bg-line sm:grid-cols-2 lg:grid-cols-3">
            {EXPLORE.map((e) => (
              <Link
                key={e.to}
                to={e.to}
                className="group relative block min-h-[260px] overflow-hidden bg-obsidian"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-35 transition-all duration-[1.2s] ease-out group-hover:scale-105 group-hover:opacity-50"
                  style={{ backgroundImage: `url(${cdn(e.img)})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/60 to-transparent" />
                <div className="relative flex h-full min-h-[260px] flex-col justify-end p-8">
                  <h3 className="font-display text-2xl uppercase text-ivory" style={HEAD}>
                    {e.t}
                  </h3>
                  <p className="mt-2 max-w-[300px] text-[13.5px] leading-[1.8] text-mute">{e.d}</p>
                  <span className="link-more mt-5">Открыть</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ЗАЯВКА */}
      <section className="border-t border-line bg-obsidian-2 px-[6vw] py-24 md:py-32">
        <div className="mx-auto grid grid-cols-1 max-w-[1320px] gap-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-24">
          <div>
            <p className="eyebrow eyebrow-dot mb-8">Готовы начать?</p>
            <h2
              className="font-display uppercase leading-tight text-ivory"
              style={{ fontSize: "clamp(28px,3.6vw,48px)", letterSpacing: "0.05em" }}
            >
              Убедитесь в этом на своём автомобиле.
            </h2>
            <p className="mt-6 max-w-[440px] text-[15px] leading-[1.9] text-mute">
              Оставьте заявку — договоримся о времени, маршруте и формате работ. Эвакуатор, такси и
              видеоотчёт подключим сразу.
            </p>
            <dl className="mt-10 space-y-5 border-t border-line pt-8 text-[14.5px]">
              <div>
                <dt className="eyebrow">Телефон</dt>
                <dd className="mt-1">
                  <a href={SITE_PHONE_HREF} className="text-ivory hover:text-ember">
                    {SITE_PHONE_DISPLAY}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="eyebrow">Студия</dt>
                <dd className="mt-1 text-mute">{STUDIO_ADDRESS_SHORT}</dd>
              </div>
              <div>
                <dt className="eyebrow">График</dt>
                <dd className="mt-1 text-mute">{WORK_HOURS}</dd>
              </div>
            </dl>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                to="/kontakty"
                className="btn-line btn-ember"
                data-testid="privileges-cta-contact"
              >
                Все контакты
              </Link>
              <Link to="/uslugi" className="btn-line" data-testid="privileges-cta-services">
                Смотреть услуги
              </Link>
            </div>
          </div>
          <LeadForm eyebrow="Привилегии UNIQUE" heading="Оставьте заявку" />
        </div>
      </section>
    </div>
  );
}

function PackagePanel({ route, setRoute }: { route: RouteKey; setRoute: (r: RouteKey) => void }) {
  const [picked, setPicked] = useState<string[]>(["Плёнка PPF"]);
  const toggle = (o: string) =>
    setPicked((p) => (p.includes(o) ? p.filter((x) => x !== o) : [...p, o]));
  const on = PRIVILEGES.map((_, i) =>
    i === 2 ? route === "tow" : i === 3 ? route === "self" : true,
  );
  const count = on.filter(Boolean).length;
  const C = 2 * Math.PI * 54;
  return (
    <section className="border-y border-line bg-obsidian-2 px-[6vw] py-24 md:py-32">
      <div className="mx-auto max-w-[1320px]">
        <Rule label="Ваш пакет привилегий" num="03" />
        <div className="grid grid-cols-1 border border-line-strong bg-obsidian lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)]">
          <div className="border-b border-line p-7 md:p-10 lg:border-b-0 lg:border-r">
            <h2 className="font-display text-3xl uppercase leading-tight text-ivory" style={HEAD}>
              Соберите свой сервис
            </h2>
            <p className="mt-4 text-[14px] leading-[1.85] text-mute">
              Выберите, как привезёте автомобиль и что хотите сделать, — панель покажет, какие
              привилегии включены.
            </p>
            <p className="eyebrow mt-8">Как приедет автомобиль</p>
            <div className="mt-3 grid grid-cols-2 border border-line-strong">
              {(Object.keys(ROUTES) as RouteKey[]).map((k) => (
                <button
                  key={k}
                  type="button"
                  aria-pressed={route === k}
                  onClick={() => setRoute(k)}
                  className={`px-3 py-4 text-[10px] uppercase tracking-[0.16em] transition-colors sm:text-[11px] ${route === k ? "bg-ivory text-obsidian" : "text-mute hover:text-ivory"}`}
                >
                  {ROUTES[k].label}
                </button>
              ))}
            </div>
            <p className="eyebrow mt-8">Что нужно сделать</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {OPTIONS.map((o) => (
                <button
                  key={o}
                  type="button"
                  aria-pressed={picked.includes(o)}
                  onClick={() => toggle(o)}
                  className={`border px-3.5 py-2 text-[12px] transition-colors ${picked.includes(o) ? "border-ember bg-ember/10 text-ivory" : "border-line-strong text-mute hover:text-ivory"}`}
                >
                  {o}
                </button>
              ))}
            </div>
            {picked.includes("Другая услуга") && (
              <p className="mt-5 border-l border-ember pl-4 text-[13px] leading-[1.8] text-mute">
                Если мы не выполняем услугу сами — приглашённый профессионал приедет к нам в студию.
              </p>
            )}
          </div>
          <div className="p-7 md:p-10">
            <div className="mb-8 flex items-center gap-6">
              <svg viewBox="0 0 120 120" className="h-24 w-24 shrink-0 -rotate-90" aria-hidden>
                <circle
                  cx="60"
                  cy="60"
                  r="54"
                  fill="none"
                  stroke="rgb(234 232 226 / 0.14)"
                  strokeWidth="2"
                />
                <circle
                  cx="60"
                  cy="60"
                  r="54"
                  fill="none"
                  stroke="var(--color-ember)"
                  strokeWidth="2"
                  strokeDasharray={C}
                  strokeDashoffset={C * (1 - count / 9)}
                  className="transition-all duration-700"
                />
              </svg>
              <div>
                <p className="font-display text-5xl text-ivory">
                  {count}
                  <span className="text-mute-2"> / 9</span>
                </p>
                <p className="mt-1 text-[13px] text-mute">привилегий включено в ваш маршрут</p>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-px bg-line sm:grid-cols-2 lg:grid-cols-3">
              {PRIVILEGES.map((p, i) => {
                const Icon = ICONS[i] ?? Gem;
                return (
                  <div
                    key={p.title}
                    className={`flex items-center gap-4 bg-obsidian p-5 transition-opacity duration-500 ${on[i] ? "opacity-100" : "opacity-30"}`}
                  >
                    <span
                      className={`flex h-10 w-10 shrink-0 items-center justify-center border transition-colors duration-500 ${on[i] ? "border-ember text-ember" : "border-line-strong text-mute"}`}
                    >
                      <Icon size={18} strokeWidth={1.4} />
                    </span>
                    <span className="text-[13px] leading-snug text-ivory">{p.short}</span>
                  </div>
                );
              })}
            </div>
            <p className="mt-6 text-[12px] text-mute-2">
              {route === "tow"
                ? "Такси бизнес-класса не требуется — автомобиль заберёт эвакуатор."
                : "Эвакуатор не требуется — такси бизнес-класса отвезёт вас после сдачи автомобиля."}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function KeyHub() {
  const [sel, setSel] = useState(0);
  const cells = [...PARTNERS.slice(0, 3), PARTNERS[3], null, PARTNERS[4], ...PARTNERS.slice(5)];
  return (
    <section className="border-y border-line bg-obsidian-2 px-[6vw] py-24 md:py-32">
      <div className="mx-auto max-w-[1320px]">
        <Rule label="Всё под ключ" num="05" />
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-20">
          <div>
            <h2
              className="font-display uppercase leading-[1.1] text-ivory"
              style={{ fontSize: "clamp(28px,3.4vw,46px)", letterSpacing: "0.05em" }}
            >
              Нет нужной услуги? Мастер приедет к нам.
            </h2>
            <p className="mt-6 text-[15px] leading-[1.9] text-mute">
              Даже если мы лично не оказываем какую-либо услугу — у нас широкий круг дружественных
              профессионалов, которые будут рады приехать в нашу студию. Автомобиль остаётся на
              месте, а результат попадает в вашу карточку.
            </p>
            <ol className="mt-8 space-y-4 border-l border-line pl-6 text-[14px] text-mute">
              <li>
                <span className="text-ivory">Вы называете задачу.</span> Подбираем специалиста.
              </li>
              <li>
                <span className="text-ivory">Мастер приезжает в студию.</span> Работает рядом с
                нашей командой.
              </li>
              <li>
                <span className="text-ivory">Всё фиксируется.</span> Запись — в карточке автомобиля.
              </li>
            </ol>
          </div>
          <div>
            <div className="grid grid-cols-2 gap-px border border-line bg-line lg:grid-cols-3">
              {cells.map((c, i) =>
                c === null ? (
                  <div
                    key="hub"
                    className="order-first col-span-2 flex flex-col items-center justify-center bg-obsidian p-6 text-center lg:order-none lg:col-span-1"
                  >
                    <span className="relative flex h-24 w-24 items-center justify-center rounded-full border border-ember">
                      <span className="absolute inset-[6px] animate-[spin_40s_linear_infinite] rounded-full border border-dashed border-line-strong motion-reduce:animate-none" />
                      <KeyRound size={26} strokeWidth={1.2} className="text-ember" />
                    </span>
                    <p className="eyebrow mt-4">Студия UNIQUE</p>
                  </div>
                ) : (
                  <button
                    key={c[0]}
                    type="button"
                    aria-pressed={sel === PARTNERS.indexOf(c)}
                    onClick={() => setSel(PARTNERS.indexOf(c))}
                    className={`p-5 text-left font-display text-lg uppercase leading-tight transition-colors duration-500 md:p-7 ${sel === PARTNERS.indexOf(c) ? "bg-panel text-ivory" : "bg-obsidian text-mute hover:text-ivory"}`}
                    style={HEAD}
                  >
                    <span
                      className={`mb-3 block h-px transition-all duration-500 ${sel === PARTNERS.indexOf(c) ? "w-10 bg-ember" : "w-4 bg-line-strong"}`}
                    />
                    {c[0]}
                  </button>
                ),
              )}
            </div>
            <div className="border border-t-0 border-line bg-obsidian p-7">
              <p className="eyebrow text-ember">{PARTNERS[sel][0]}</p>
              <p className="mt-3 max-w-[560px] text-[14.5px] leading-[1.9] text-ivory">
                {PARTNERS[sel][1]}
              </p>
            </div>
            <p className="mt-4 text-[12px] text-mute-2">
              Примеры смежных услуг; точный перечень подбираем под вашу задачу.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function TransportPanel() {
  const [k, setK] = useState<keyof typeof TRACKS>("tow");
  const [step, setStep] = useState(0);
  const t = TRACKS[k];
  return (
    <section className="px-[6vw] py-24 md:py-32">
      <div className="mx-auto max-w-[1320px]">
        <Rule label="Дорога до студии и обратно" num="06" />
        <div className="grid grid-cols-1 border border-line-strong lg:grid-cols-2">
          <div className="p-7 md:p-12">
            <div className="flex gap-7 border-b border-line">
              {(Object.keys(TRACKS) as (keyof typeof TRACKS)[]).map((x) => (
                <button
                  key={x}
                  type="button"
                  aria-pressed={k === x}
                  onClick={() => {
                    setK(x);
                    setStep(0);
                  }}
                  className={`-mb-px border-b pb-4 text-[11px] uppercase tracking-[0.22em] transition-colors ${k === x ? "border-ember text-ivory" : "border-transparent text-mute hover:text-ivory"}`}
                >
                  {TRACKS[x].label}
                </button>
              ))}
            </div>
            <p className="mt-8 max-w-[440px] text-[15px] leading-[1.9] text-mute">{t.lead}</p>
            <ol className="mt-8">
              {t.steps.map((s, i) => (
                <li
                  key={s}
                  className={`flex items-center gap-4 border-b border-line py-4 text-[14.5px] transition-colors duration-500 ${i <= step ? "text-ivory" : "text-mute-2"}`}
                >
                  <span
                    className={`h-2.5 w-2.5 rounded-full border transition-colors duration-500 ${i <= step ? "border-ember bg-ember" : "border-mute-2"}`}
                  />
                  {s}
                </li>
              ))}
            </ol>
            <div className="mt-8 flex gap-3">
              <button
                type="button"
                onClick={() => setStep((s) => Math.min(s + 1, t.steps.length - 1))}
                className="btn-line btn-ember !px-8"
              >
                Следующий шаг
              </button>
              <button type="button" onClick={() => setStep(0)} className="btn-line !px-8">
                Сначала
              </button>
            </div>
            <p className="mt-5 text-[12px] text-mute-2">
              Наглядная схема; время и стоимость согласуем при записи.
            </p>
          </div>
          <div className="relative min-h-[320px] overflow-hidden border-t border-line lg:border-l lg:border-t-0">
            <div
              className="absolute inset-0 bg-cover bg-center opacity-50 transition-all duration-700"
              style={{ backgroundImage: `url(${cdn(t.img)})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/40 to-transparent" />
            <div className="absolute inset-x-6 bottom-6 border border-line-strong bg-obsidian/85 p-5 backdrop-blur">
              <p className="eyebrow">Статус</p>
              <p className="mt-2 font-display text-2xl uppercase text-ivory" style={HEAD}>
                {t.steps[step]}
              </p>
              <div className="mt-4 h-px bg-line">
                <div
                  className="h-px bg-ember transition-all duration-700"
                  style={{ width: `${((step + 1) / t.steps.length) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MaterialsPanel() {
  const [m, setM] = useState("Плёнка");
  return (
    <section className="border-y border-line bg-obsidian-2 px-[6vw] py-24 md:py-32">
      <div className="mx-auto max-w-[1320px]">
        <Rule label="Материалы и оборудование" num="09" />
        <h2
          className="max-w-[820px] font-display uppercase leading-[1.1] text-ivory"
          style={{ fontSize: "clamp(28px,3.4vw,46px)", letterSpacing: "0.05em" }}
        >
          Высочайшее качество — и вы можете это проверить
        </h2>
        <div className="mt-12 grid grid-cols-1 gap-px bg-line md:grid-cols-3">
          {[
            [
              "Премиальные материалы",
              "Работаем с материалами премиального уровня на каждом этапе.",
            ],
            [
              "Современное оборудование",
              "Оборудование, соответствующее автомобилям, к которым предъявляют особые требования.",
            ],
            ["Прослеживаемость", "Что и как использовано — записано в персональную карточку."],
          ].map(([t, d]) => (
            <div key={t} className="bg-obsidian p-8">
              <Gem size={22} strokeWidth={1.3} className="text-ember" />
              <h3 className="mt-6 font-display text-xl uppercase text-ivory" style={HEAD}>
                {t}
              </h3>
              <p className="mt-3 text-[14px] leading-[1.85] text-mute">{d}</p>
            </div>
          ))}
        </div>
        <div className="mt-px grid grid-cols-1 border border-line bg-obsidian lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)]">
          <div className="flex gap-px overflow-x-auto border-b border-line lg:block lg:border-b-0 lg:border-r">
            {Object.keys(MATERIALS).map((x) => (
              <button
                key={x}
                type="button"
                aria-pressed={m === x}
                onClick={() => setM(x)}
                className={`block w-full min-w-[120px] px-6 py-5 text-[11px] uppercase tracking-[0.24em] transition-colors ${m === x ? "bg-panel text-ivory" : "text-mute hover:text-ivory"}`}
              >
                {x}
              </button>
            ))}
          </div>
          <div className="p-7 md:p-10">
            <p className="eyebrow">Запись в карточке автомобиля · {m}</p>
            {MATERIALS[m].map((r) => (
              <div
                key={r}
                className="flex items-center justify-between gap-4 border-b border-line py-4 text-[14.5px] text-ivory"
              >
                {r}
                <span className="text-[11px] uppercase tracking-[0.16em] text-ember">
                  фиксируется
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function DayPanel() {
  const [h, setH] = useState(14);
  const cur = [...DAY].reverse().find((d) => d[0] <= h) ?? DAY[0];
  const Icon = ICONS[cur[3]] ?? Gem;
  return (
    <section className="px-[6vw] py-24 md:py-32">
      <div className="mx-auto max-w-[1320px]">
        <Rule label="Один день в студии" num="07" />
        <div className="grid grid-cols-1 border border-line-strong lg:grid-cols-[minmax(0,6fr)_minmax(0,6fr)]">
          <div className="p-7 md:p-12">
            <p className="text-[13px] text-mute">
              Проведите ползунок — увидите, что происходит с вашим автомобилем в течение дня.{" "}
              {WORK_HOURS}.
            </p>
            <p
              className="mt-8 font-display text-ivory"
              style={{ fontSize: "clamp(64px,9vw,120px)", lineHeight: 1 }}
            >
              {String(h).padStart(2, "0")}
              <span className="text-ember">:</span>00
            </p>
            <input
              type="range"
              min={9}
              max={20}
              step={1}
              value={h}
              onChange={(e) => setH(Number(e.target.value))}
              aria-label="Время суток"
              className="mt-6 w-full accent-ember"
            />
            <div className="mt-2 flex justify-between text-[10px] tracking-[0.2em] text-mute-2">
              <span>9:00</span>
              <span>14:00</span>
              <span>20:00</span>
            </div>
            <div className="mt-10 border-t border-line pt-8">
              <h3 className="font-display text-2xl uppercase text-ivory md:text-3xl" style={HEAD}>
                {cur[1]}
              </h3>
              <p className="mt-4 max-w-[460px] text-[14.5px] leading-[1.9] text-mute">{cur[2]}</p>
              <span className="mt-6 inline-flex items-center gap-3 border border-ember/60 px-3.5 py-2 text-[11px] uppercase tracking-[0.18em] text-ivory">
                <Icon size={15} strokeWidth={1.4} className="text-ember" />
                {PRIVILEGES[cur[3]].short}
              </span>
            </div>
            <p className="mt-8 text-[12px] text-mute-2">
              Примерный ход рабочего дня; точный план согласуем при записи.
            </p>
          </div>
          <div className="relative min-h-[340px] overflow-hidden border-t border-line lg:border-l lg:border-t-0">
            {DAY.map((d) => (
              <div
                key={d[0]}
                className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${d === cur ? "opacity-60" : "opacity-0"}`}
                style={{ backgroundImage: `url(${cdn(d[4])})` }}
              />
            ))}
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/20 to-transparent" />
            <ol className="absolute inset-x-6 bottom-6 flex gap-1.5">
              {DAY.map((d) => (
                <li key={d[0]} className="h-px flex-1 bg-line">
                  <div
                    className={`h-px bg-ember transition-all duration-700 ${d[0] <= h ? "w-full" : "w-0"}`}
                  />
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

function HandoverPanel() {
  const [done, setDone] = useState<number[]>([]);
  const all = done.length === ACT.length;
  const flip = (i: number) =>
    setDone((d) => (d.includes(i) ? d.filter((x) => x !== i) : [...d, i]));
  return (
    <section className="border-y border-line bg-obsidian-2 px-[6vw] py-24 md:py-32">
      <div className="mx-auto max-w-[1320px]">
        <Rule label="Акт выдачи автомобиля" num="11" />
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-24">
          <div>
            <h2
              className="font-display uppercase leading-[1.1] text-ivory"
              style={{ fontSize: "clamp(28px,3.4vw,46px)", letterSpacing: "0.05em" }}
            >
              Выдача — это отдельная церемония
            </h2>
            <p className="mt-6 max-w-[440px] text-[15px] leading-[1.9] text-mute">
              Мы не отдаём ключи, пока вы сами не проверили результат вместе с мастером. Отметьте
              пункты — так проходит осмотр при выдаче.
            </p>
            <div className="mt-10 h-px max-w-[440px] bg-line">
              <div
                className="h-px bg-ember transition-all duration-500"
                style={{ width: `${(done.length / ACT.length) * 100}%` }}
              />
            </div>
            <p className="eyebrow mt-4">
              Проверено {done.length} из {ACT.length}
            </p>
          </div>
          <div className="relative border border-line-strong bg-obsidian p-7 md:p-10">
            {ACT.map((a, i) => (
              <button
                key={a}
                type="button"
                role="checkbox"
                aria-checked={done.includes(i)}
                onClick={() => flip(i)}
                className="flex w-full items-center gap-4 border-b border-line py-4 text-left text-[14.5px] transition-colors hover:text-ivory"
              >
                <span
                  className={`flex h-5 w-5 shrink-0 items-center justify-center border text-[12px] transition-colors duration-300 ${done.includes(i) ? "border-ember bg-ember text-ivory" : "border-line-strong text-transparent"}`}
                >
                  ✓
                </span>
                <span className={done.includes(i) ? "text-ivory" : "text-mute"}>{a}</span>
              </button>
            ))}
            <div
              className={`mt-8 flex items-center gap-5 transition-all duration-700 ${all ? "opacity-100" : "opacity-25"}`}
            >
              <span
                className={`flex h-20 w-20 shrink-0 items-center justify-center rounded-full border border-ember text-center text-[9px] uppercase leading-tight tracking-[0.16em] text-ember transition-transform duration-700 ${all ? "-rotate-12 scale-100" : "scale-90"}`}
              >
                Принято
                <br />
                клиентом
              </span>
              <p className="text-[13.5px] leading-[1.8] text-mute">
                {all
                  ? "Осмотр завершён. Гарантия вступает в силу, карточка автомобиля — у вас."
                  : "Отметьте все пункты, чтобы завершить осмотр."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
