import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Rule } from "@/components/site/PageHero";
import { STUDIO_VEHICLES } from "@/lib/studio-vehicles";

export const Route = createFileRoute("/plenka")({
  head: () => ({
    meta: [
      { title: "Плёнка UNIQUE — премиальное портфолио оклейки PPF" },
      {
        name: "description",
        content:
          "Мировое портфолио защитной оклейки PPF студии UNIQUE: суперкары, люксовые седаны, внедорожники, матовые и специальные покрытия. Собственная плёнка, эластичность 320%, гарантия 10 лет.",
      },
      { property: "og:title", content: "Плёнка UNIQUE — премиальное портфолио PPF" },
      {
        property: "og:description",
        content:
          "Полный showcase проектов защитной оклейки UNIQUE PPF: от суперкаров до внедорожников.",
      },
    ],
  }),
  component: PlenkaPage,
});

/* ─────────── PPF portfolio data ───────────
 * Built from the studio catalogue. Every card uses a distinct angle
 * (rear 3/4 · side · front detail) so none of these frames repeat the
 * hero shots used elsewhere on the site. */

const PPF_CATEGORIES = [
  "Все проекты",
  "Full Body PPF",
  "Supercar Collection",
  "Luxury Collection",
  "SUV Protection",
  "Matte & Special Finishes",
  "Front Protection",
] as const;
type PpfCategory = (typeof PPF_CATEGORIES)[number];

type Project = {
  brand: string;
  model: string;
  finish: string;
  category: Exclude<PpfCategory, "Все проекты">;
  img: string;
  span?: boolean;
};

const categoryFor = (paintName: string, body: string, brand: string): Project["category"] => {
  if (/(satin|matte|magno|frozen|nardo)/i.test(paintName)) return "Matte & Special Finishes";
  if (body === "suv") return "SUV Protection";
  if (body === "supercar" || body === "hypercar") return "Supercar Collection";
  if (/(rolls|bentley|maybach)/i.test(brand)) return "Luxury Collection";
  return "Full Body PPF";
};

const FINISH_LABEL: Record<Project["category"], string> = {
  "Full Body PPF": "Полная оклейка кузова",
  "Supercar Collection": "Суперкар · полный корпус",
  "Luxury Collection": "Люкс · клубный протокол",
  "SUV Protection": "Внедорожник · защита кузова",
  "Matte & Special Finishes": "Матовое / специальное покрытие",
  "Front Protection": "Защита фронтальной зоны",
};

// One distinctive exterior angle per catalogue vehicle (rear 3/4).
const EXTERIOR_PROJECTS: Project[] = STUDIO_VEHICLES.map((v) => {
  const category = categoryFor(v.paintName, v.body, v.brand);
  return {
    brand: v.brand,
    model: v.model,
    finish: `${FINISH_LABEL[category]} · ${v.paintName}`,
    category,
    img: `/portfolio/${v.slug}-ext-3.jpg`,
  };
});

// Curated front-end / clear-bra close-ups (unique detail frames).
const FRONT_PROJECTS: Project[] = [
  {
    brand: "Ferrari",
    model: "Roma",
    finish: "Clear Bra · решётка и капот",
    category: "Front Protection",
    img: "/portfolio/ferrari-roma-det-4.jpg",
  },
  {
    brand: "Aston Martin",
    model: "DB12",
    finish: "Clear Bra · оптика",
    category: "Front Protection",
    img: "/portfolio/aston-martin-db12-det-2.jpg",
  },
  {
    brand: "Porsche",
    model: "911 Turbo S",
    finish: "Track front · защита носа",
    category: "Front Protection",
    img: "/portfolio/porsche-911-turbo-s-det-2.jpg",
  },
  {
    brand: "Lamborghini",
    model: "Revuelto",
    finish: "Front splitter PPF",
    category: "Front Protection",
    img: "/portfolio/lamborghini-revuelto-det-4.jpg",
  },
  {
    brand: "BMW",
    model: "XM Label Red",
    finish: "Front guard · решётка",
    category: "Front Protection",
    img: "/portfolio/bmw-xm-label-red-det-4.jpg",
  },
  {
    brand: "McLaren",
    model: "750S Spider",
    finish: "Nose PPF · оптика",
    category: "Front Protection",
    img: "/portfolio/mclaren-750s-spider-det-2.jpg",
  },
];

const PROJECTS: Project[] = [...EXTERIOR_PROJECTS, ...FRONT_PROJECTS];

const HERO_IMG = "/portfolio/lamborghini-hurac-n-sto-0.jpg";
const MANIFESTO_IMG = "/portfolio/mclaren-750s-spider-ext-2.jpg";

const PROPERTIES = [
  [
    "Эластичность 320%",
    "Плёнка тянется без разрыва и повторяет самую сложную геометрию — воздухозаборники, арки, зеркала.",
  ],
  [
    "Самовосстановление",
    "Мелкие царапины исчезают при нагреве от 40°C — от солнца, тёплой воды или фена.",
  ],
  [
    "Устойчивость к химии",
    "Не реагирует на реагенты, антигололёд, кислотные осадки, битум и продукты сгорания.",
  ],
  [
    "Прозрачность 99.7%",
    "Практически неотличима на кузове — глубина цвета лака сохраняется полностью.",
  ],
  [
    "Гарантия 10 лет",
    "На пожелтение, отслоение, помутнение и потерю самовосстанавливающих свойств.",
  ],
  [
    "Толщина 210 микрон",
    "Три слоя — топ-коат, полиуретан и клеевой слой с воздушными каналами для идеальной укладки.",
  ],
];

function PlenkaPage() {
  const [cat, setCat] = useState<PpfCategory>("Все проекты");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const list = useMemo(
    () => (cat === "Все проекты" ? PROJECTS : PROJECTS.filter((p) => p.category === cat)),
    [cat],
  );

  const counts = useMemo(() => {
    const m = new Map<PpfCategory, number>();
    m.set("Все проекты", PROJECTS.length);
    for (const c of PPF_CATEGORIES)
      if (c !== "Все проекты") m.set(c, PROJECTS.filter((p) => p.category === c).length);
    return m;
  }, []);

  useEffect(() => {
    setLightbox(null);
  }, [cat]);

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight") setLightbox((v) => (v === null ? v : (v + 1) % list.length));
      if (e.key === "ArrowLeft")
        setLightbox((v) => (v === null ? v : (v - 1 + list.length) % list.length));
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightbox, list.length]);

  return (
    <div>
      {/* ─────────── CINEMATIC HERO ─────────── */}
      <section className="relative flex min-h-screen items-end overflow-hidden border-b border-line">
        <img
          src={HERO_IMG}
          alt="UNIQUE PPF — защитная оклейка"
          className="absolute inset-0 h-full w-full animate-drift object-cover"
          fetchPriority="high"
        />
        <div className="absolute inset-0 plate-scrim" />
        <div className="absolute inset-0 bg-gradient-to-r from-obsidian/80 via-obsidian/20 to-transparent" />
        <div className="relative z-10 mx-auto w-full max-w-[1500px] px-[6vw] pb-24 pt-40">
          <p className="eyebrow eyebrow-dot mb-6">Плёнка UNIQUE · Paint Protection Film</p>
          <h1
            className="max-w-[1200px] font-display uppercase leading-[0.96] text-ivory"
            style={{ fontSize: "clamp(44px,7.6vw,132px)", letterSpacing: "0.02em" }}
          >
            Защита
            <br />
            мирового
            <br />
            <span className="text-ember">уровня.</span>
          </h1>
          <p className="mt-8 max-w-[620px] text-[16px] leading-[1.9] text-mute">
            Собственная полиуретановая плёнка UNIQUE PPF и ручная оклейка без разбора автомобиля.
            Портфолио проектов — от суперкаров до внедорожников, каждый в единой студийной серии.
          </p>
          <div className="mt-12 grid max-w-[720px] grid-cols-2 gap-px border border-line bg-line md:grid-cols-4">
            {[
              ["500+", "проектов"],
              ["320%", "эластичность"],
              ["210 µm", "толщина плёнки"],
              ["10 лет", "гарантия"],
            ].map(([n, l]) => (
              <div key={l} className="bg-obsidian/85 px-6 py-6 backdrop-blur">
                <p
                  className="font-display text-ember"
                  style={{ fontSize: "clamp(26px,2.6vw,38px)" }}
                >
                  {n}
                </p>
                <p className="mt-1 text-[10px] uppercase tracking-[0.3em] text-mute-2">{l}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute bottom-8 right-[6vw] z-10 hidden items-center gap-3 text-[10px] uppercase tracking-[0.4em] text-mute-2 md:flex">
          <span>Листайте портфолио</span>
          <span className="h-px w-12 bg-gradient-to-r from-transparent to-mute-2" />
        </div>
      </section>

      {/* ─────────── MANIFESTO ─────────── */}
      <section className="px-[6vw] py-32">
        <div className="mx-auto grid max-w-[1400px] gap-16 md:grid-cols-[1.1fr_0.9fr] md:items-center">
          <div className="space-y-6 text-[15.5px] leading-[1.95] text-mute">
            <p className="eyebrow eyebrow-dot">Международный стандарт оклейки</p>
            <h2
              className="font-display uppercase leading-[1.05] text-ivory"
              style={{ fontSize: "clamp(30px,3.8vw,54px)", letterSpacing: "0.04em" }}
            >
              Каждый автомобиль —<br />
              <span className="text-ember">отдельный проект.</span>
            </h2>
            <p>
              Плёнка UNIQUE — результат десяти лет практики в европейском центре, где каждая
              рецептура клеевого слоя и топ-коата отрабатывалась на реальных автомобилях. Мы
              производим её ограниченными партиями и используем только в собственной студии.
            </p>
            <p>
              Ручной раскрой без выкроек, укладка без разбора, прогрев каждого шва и финальный
              контроль под тремя источниками света. Ниже — кураторская подборка проектов по классам
              автомобилей и типам защиты.
            </p>
          </div>
          <div className="relative aspect-[4/5] overflow-hidden">
            <img
              src={MANIFESTO_IMG}
              alt="Оклейка плёнкой UNIQUE"
              className="h-full w-full object-cover transition-transform duration-[1600ms] hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 plate-scrim" />
            <p className="absolute bottom-6 left-6 text-[10px] uppercase tracking-[0.35em] text-ivory">
              UNIQUE PPF · студия
            </p>
          </div>
        </div>
      </section>

      {/* ─────────── PORTFOLIO ─────────── */}
      <section className="border-t border-line bg-obsidian-2 px-[6vw] py-28">
        <div className="mx-auto max-w-[1600px]">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow eyebrow-dot mb-4">Портфолио защиты PPF</p>
              <h2
                className="font-display uppercase leading-tight text-ivory"
                style={{ fontSize: "clamp(28px,3.6vw,50px)", letterSpacing: "0.04em" }}
              >
                Коллекция
                <br />
                <span className="text-ember">оклеенных автомобилей.</span>
              </h2>
            </div>
            <p className="max-w-[360px] text-[13.5px] leading-[1.85] text-mute">
              {list.length} проектов в подборке. Наведите на карточку, чтобы увидеть спецификацию,
              нажмите — чтобы открыть кадр во весь экран.
            </p>
          </div>

          {/* Category filter */}
          <div className="mb-10 flex flex-wrap gap-2">
            {PPF_CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`flex items-center gap-2 border px-5 py-2.5 text-[10px] uppercase tracking-[0.28em] transition-all duration-300 ${
                  cat === c
                    ? "border-ember bg-ember text-obsidian"
                    : "border-line-strong text-mute hover:border-ivory hover:text-ivory"
                }`}
              >
                {c}
                <span className={`text-[9px] ${cat === c ? "text-obsidian/70" : "text-mute-2"}`}>
                  {counts.get(c)}
                </span>
              </button>
            ))}
          </div>

          {/* Gallery grid */}
          <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
            {list.map((p, i) => (
              <button
                key={p.img}
                type="button"
                onClick={() => setLightbox(i)}
                className="group relative flex aspect-[4/5] flex-col justify-end overflow-hidden bg-obsidian text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ember"
                aria-label={`${p.brand} ${p.model} — открыть кадр`}
              >
                <img
                  src={p.img}
                  alt={`${p.brand} ${p.model} — ${p.finish}`}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover opacity-85 transition-all duration-[1200ms] ease-out group-hover:scale-[1.07] group-hover:opacity-100"
                />
                <div className="absolute inset-0 plate-scrim" />
                <span className="absolute left-4 top-4 z-10 border border-ivory/30 bg-obsidian/50 px-2.5 py-1 text-[9px] uppercase tracking-[0.28em] text-ivory backdrop-blur-sm">
                  {p.category === "Front Protection" ? "Front" : p.category.split(" ")[0]}
                </span>
                <div className="relative z-10 translate-y-2 p-5 transition-transform duration-500 group-hover:translate-y-0">
                  <h3
                    className="font-display uppercase leading-tight text-ivory"
                    style={{ fontSize: "19px", letterSpacing: "0.05em" }}
                  >
                    {p.brand}
                  </h3>
                  <p className="mt-1 text-[13px] text-ivory/90">{p.model}</p>
                  <p className="mt-2 max-h-0 overflow-hidden text-[11px] leading-[1.6] text-mute opacity-0 transition-all duration-500 group-hover:max-h-16 group-hover:opacity-100">
                    {p.finish}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────── TECHNICAL PROPERTIES ─────────── */}
      <section className="px-[6vw] py-32">
        <div className="mx-auto max-w-[1400px]">
          <Rule label="Технические свойства плёнки" num="01" />
          <div className="grid gap-[2px] bg-line md:grid-cols-3">
            {PROPERTIES.map(([t, c], i) => (
              <div key={t} className="bg-obsidian p-10">
                <p className="font-display text-2xl text-ember">{String(i + 1).padStart(2, "0")}</p>
                <h3
                  className="mt-8 font-display text-xl uppercase text-ivory"
                  style={{ letterSpacing: "0.05em" }}
                >
                  {t}
                </h3>
                <p className="mt-6 text-[14.5px] leading-[1.85] text-mute">{c}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────── COMPARISON ─────────── */}
      <section className="border-y border-line bg-obsidian-2 px-[6vw] py-32">
        <div className="mx-auto max-w-[1100px]">
          <Rule label="UNIQUE PPF в сравнении" num="02" />
          <div className="border border-line">
            <div className="grid grid-cols-3 border-b border-line bg-obsidian px-8 py-6 text-[10px] uppercase tracking-[0.3em] text-mute-2">
              <span>Характеристика</span>
              <span>Обычная PPF</span>
              <span className="text-ember">UNIQUE PPF</span>
            </div>
            {[
              ["Эластичность", "180 %", "320 %"],
              ["Гарантия производителя", "5 лет", "10 лет"],
              ["Самовосстановление", "Есть", "Улучшенное, от 40°C"],
              ["Толщина", "150 мкм", "210 мкм"],
              ["Прозрачность", "98.5 %", "99.7 %"],
              ["Работа без разбора авто", "Частично", "Полностью"],
            ].map(([a, b, c]) => (
              <div
                key={a}
                className="grid grid-cols-3 border-b border-line px-8 py-6 text-[14.5px] text-mute last:border-b-0"
              >
                <span className="text-ivory">{a}</span>
                <span>{b}</span>
                <span className="text-ember">{c}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────── CTA ─────────── */}
      <section className="px-[6vw] py-32 text-center">
        <h2
          className="mx-auto max-w-[760px] font-display uppercase leading-tight text-ivory"
          style={{ fontSize: "clamp(26px,3.6vw,46px)", letterSpacing: "0.06em" }}
        >
          Добавьте свой автомобиль
          <br />в коллекцию UNIQUE.
        </h2>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link to="/kontakty" className="btn-line btn-ember">
            Рассчитать оклейку
          </Link>
          <Link to="/raboty" className="btn-line">
            Смотреть работы
          </Link>
        </div>
      </section>

      {/* ─────────── LIGHTBOX ─────────── */}
      {lightbox !== null && list[lightbox] && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-obsidian/95 p-6 animate-fade-in"
          role="dialog"
          aria-modal="true"
          aria-label={`${list[lightbox].brand} ${list[lightbox].model}`}
          onClick={() => setLightbox(null)}
        >
          <button
            type="button"
            className="absolute left-6 top-6 text-[11px] uppercase tracking-[0.35em] text-ivory focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ember"
            onClick={(e) => {
              e.stopPropagation();
              setLightbox(null);
            }}
            aria-label="Закрыть просмотр"
            autoFocus
          >
            ✕ Закрыть
          </button>
          <button
            type="button"
            className="absolute left-6 top-1/2 -translate-y-1/2 border border-ivory/40 px-4 py-3 text-ivory hover:bg-ivory hover:text-obsidian focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ember"
            onClick={(e) => {
              e.stopPropagation();
              setLightbox((v) => (v === null ? v : (v - 1 + list.length) % list.length));
            }}
            aria-label="Предыдущий кадр"
          >
            ←
          </button>
          <figure className="max-h-[90vh] max-w-[92vw]" onClick={(e) => e.stopPropagation()}>
            <img
              key={list[lightbox].img}
              src={list[lightbox].img}
              alt={`${list[lightbox].brand} ${list[lightbox].model} — ${list[lightbox].finish}`}
              className="max-h-[82vh] max-w-[92vw] animate-scale-in object-contain"
            />
            <figcaption className="mt-4 text-center">
              <p
                className="font-display text-xl uppercase text-ivory"
                style={{ letterSpacing: "0.05em" }}
              >
                {list[lightbox].brand} <span className="text-ember">{list[lightbox].model}</span>
              </p>
              <p className="mt-1 text-[11px] uppercase tracking-[0.3em] text-mute">
                {list[lightbox].finish}
              </p>
            </figcaption>
          </figure>
          <button
            type="button"
            className="absolute right-6 top-1/2 -translate-y-1/2 border border-ivory/40 px-4 py-3 text-ivory hover:bg-ivory hover:text-obsidian focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ember"
            onClick={(e) => {
              e.stopPropagation();
              setLightbox((v) => (v === null ? v : (v + 1) % list.length));
            }}
            aria-label="Следующий кадр"
          >
            →
          </button>
        </div>
      )}
    </div>
  );
}
