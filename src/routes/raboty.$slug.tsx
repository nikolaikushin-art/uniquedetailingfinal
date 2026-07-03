import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { getWork, relatedWorks, type Work } from "@/lib/works";

export const Route = createFileRoute("/raboty/$slug")({
  loader: ({ params }): { work: Work; related: Work[] } => {
    const work = getWork(params.slug);
    if (!work) throw notFound();
    return { work, related: relatedWorks(params.slug, 8) };
  },

  head: ({ loaderData }) => {
    const w = loaderData?.work;
    if (!w) return { meta: [{ title: "Работа не найдена — UNIQUE" }] };
    return {
      meta: [
        { title: `${w.brand} ${w.model} — Работы UNIQUE Detailing` },
        { name: "description", content: w.tagline },
        { property: "og:title", content: `${w.brand} ${w.model} — UNIQUE Detailing` },
        { property: "og:description", content: w.tagline },
        { property: "og:image", content: w.hero },
      ],
    };
  },
  component: WorkPage,
  notFoundComponent: () => (
    <div className="flex min-h-screen items-center justify-center px-6 text-center">
      <div>
        <h1 className="font-display text-4xl uppercase text-ivory">Работа не найдена</h1>
        <Link to="/raboty" className="btn-line mt-8 inline-block">Все работы</Link>
      </div>
    </div>
  ),
});

function WorkPage() {
  const { work: w, related } = Route.useLoaderData() as { work: Work; related: Work[] };
  return (
    <div>
      {/* HERO — четыре варианта раскладки */}
      <Hero w={w} />

      {/* СПЕЦИФИКАЦИЯ — интерактивный переключатель */}
      <SpecsPanel w={w} />

      {/* ИСТОРИЯ ПРОЕКТА */}
      <section className="px-[6vw] py-32">
        <div className="mx-auto grid max-w-[1280px] gap-16 md:grid-cols-[280px_1fr]">
          <div>
            <p className="eyebrow">История проекта</p>
            <p className="mt-6 font-display text-4xl uppercase text-mute-2">01</p>
          </div>
          <div className="space-y-8 text-[16px] leading-[1.95] text-mute">
            {w.story.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      {/* ГАЛЕРЕЯ — кинематическая с табами и лайтбоксом */}
      <CinematicGallery w={w} />

      {/* ЧТО СДЕЛАНО */}
      <section className="px-[6vw] py-32">
        <div className="mx-auto max-w-[1280px]">
          <div className="mb-16 flex items-center gap-5">
            <span className="font-display text-[14px] text-mute-2">02</span>
            <span className="h-px flex-1 bg-line" />
            <span className="eyebrow">Что сделано</span>
          </div>
          <div className="grid gap-[2px] bg-line md:grid-cols-2">
            {w.works.map((item, i) => (
              <div key={i} className="bg-obsidian p-8">
                <p className="font-display text-xl text-mute-2">{String(i + 1).padStart(2, "0")}</p>
                <p className="mt-6 text-[15px] leading-[1.85] text-mute">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EXPLORE — интерактивные аккордеоны по разделам */}
      <ExploreAccordion w={w} />

      {/* ПЕРСОНАЛИЗАЦИЯ — Bespoke configurator */}
      <BespokeConfigurator w={w} />

      {/* ПАЛИТРА */}
      <PalettePanel w={w} />


      {/* ЦИТАТА */}
      <section className="border-y border-line py-32 text-center">
        <blockquote className="mx-auto max-w-[880px] px-[6vw]">
          <p className="font-display uppercase leading-[1.2] text-ivory" style={{ fontSize: "clamp(24px,3.2vw,40px)", letterSpacing: "0.06em" }}>
            «{w.quote}»
          </p>
          <footer className="mt-8 text-[11px] uppercase tracking-[0.4em] text-mute">— Мастер студии UNIQUE</footer>
        </blockquote>
      </section>

      {/* FAQ */}
      <section className="px-[6vw] py-32">
        <div className="mx-auto max-w-[900px]">
          <div className="mb-16 flex items-center gap-5">
            <span className="font-display text-[14px] text-mute-2">04</span>
            <span className="h-px flex-1 bg-line" />
            <span className="eyebrow">Частые вопросы</span>
          </div>
          <div className="divide-y divide-line">
            {w.faqs.map((f, i) => (
              <details key={i} className="group py-6">
                <summary className="flex cursor-pointer items-center justify-between text-left list-none">
                  <span className="font-display text-xl uppercase text-ivory pr-8" style={{ letterSpacing: "0.03em" }}>{f.q}</span>
                  <span className="text-ember text-2xl group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="mt-6 max-w-[720px] text-[15px] leading-[1.9] text-mute">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* HERITAGE & CRAFTSMANSHIP — scroll-triggered cinematic storytelling */}
      <HeritageStory w={w} />

      {/* ПОХОЖИЕ РАБОТЫ — карусель */}
      <RelatedCarousel current={w} related={related} />


      {/* CTA */}
      <section className="border-t border-line px-[6vw] py-32 text-center">
        <h2 className="mx-auto max-w-[720px] font-display uppercase leading-tight text-ivory" style={{ fontSize: "clamp(26px,3.6vw,44px)", letterSpacing: "0.06em" }}>
          Ваш автомобиль уже<br />ждёт трансформации.
        </h2>
        <div className="mt-10"><Link to="/kontakty" className="btn-line btn-ember">Рассчитать стоимость</Link></div>
      </section>
    </div>
  );
}

/* ─────────── HERO — четыре варианта ─────────── */
function Hero({ w }: { w: Work }) {
  const v = w.variant;
  if (v === 0) {
    // full-bleed кинематик
    return (
      <section className="relative flex min-h-[92vh] items-center overflow-hidden border-b border-line">
        <div className="absolute inset-0 animate-drift bg-cover bg-center" style={{ backgroundImage: `url(${w.hero})` }} />
        <div className="absolute inset-0 plate-scrim" />
        <div className="relative z-10 mx-auto w-full max-w-[1400px] px-[6vw] pt-28">
          <p className="eyebrow eyebrow-dot mb-6">{w.category} · {w.city}</p>
          <h1 className="max-w-[1100px] font-display uppercase leading-[0.98] text-ivory" style={{ fontSize: "clamp(48px,9vw,140px)", letterSpacing: "0.03em" }}>
            {w.brand}<br /><span className="text-ember">{w.model}</span>
          </h1>
          <p className="mt-8 max-w-[600px] text-[16px] leading-[1.9] text-mute">{w.tagline}</p>
          <HeroSpecsRow w={w} />
        </div>
      </section>
    );
  }
  if (v === 1) {
    // split-screen: left copy, right image
    return (
      <section className="grid min-h-[92vh] grid-cols-1 border-b border-line md:grid-cols-[0.9fr_1.1fr]">
        <div className="relative flex items-center bg-obsidian px-[6vw] pt-28 pb-16">
          <div className="max-w-[540px]">
            <p className="eyebrow eyebrow-dot mb-6">{w.category} · {w.city}</p>
            <h1 className="font-display uppercase leading-[0.98] text-ivory" style={{ fontSize: "clamp(42px,6vw,84px)", letterSpacing: "0.03em" }}>
              {w.brand}<br /><span className="text-ember">{w.model}</span>
            </h1>
            <p className="mt-8 text-[16px] leading-[1.9] text-mute">{w.tagline}</p>
            <HeroSpecsRow w={w} />
          </div>
        </div>
        <div className="relative min-h-[60vh] overflow-hidden">
          <div className="absolute inset-0 animate-drift bg-cover bg-center" style={{ backgroundImage: `url(${w.hero})` }} />
          <div className="absolute inset-0 plate-scrim" />
        </div>
      </section>
    );
  }
  if (v === 2) {
    // overlapping panels
    return (
      <section className="relative overflow-hidden border-b border-line bg-obsidian-2">
        <div className="relative min-h-[86vh]">
          <div className="absolute inset-x-[6vw] top-24 bottom-24 overflow-hidden">
            <div className="absolute inset-0 animate-drift bg-cover bg-center" style={{ backgroundImage: `url(${w.hero})` }} />
            <div className="absolute inset-0 plate-scrim" />
          </div>
          <div className="relative z-10 mx-auto w-full max-w-[1400px] px-[6vw] pt-40 pb-24">
            <div className="ml-auto max-w-[560px] bg-obsidian/90 p-10 backdrop-blur border border-line">
              <p className="eyebrow eyebrow-dot mb-4">{w.category} · {w.city}</p>
              <h1 className="font-display uppercase leading-[0.98] text-ivory" style={{ fontSize: "clamp(38px,4.8vw,68px)", letterSpacing: "0.03em" }}>
                {w.brand}<br /><span className="text-ember">{w.model}</span>
              </h1>
              <p className="mt-6 text-[15px] leading-[1.9] text-mute">{w.tagline}</p>
              <HeroSpecsRow w={w} compact />
            </div>
          </div>
        </div>
      </section>
    );
  }
  // v === 3 — triptych со шкалой снизу
  return (
    <section className="relative overflow-hidden border-b border-line">
      <div className="grid grid-cols-3 gap-[2px] bg-line">
        {[0, 1, 2].map((i) => (
          <div key={i} className="relative aspect-[3/4] overflow-hidden md:aspect-auto md:h-[70vh]">
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${w.gallery[i] ?? w.hero})` }} />
            <div className="absolute inset-0 plate-scrim" />
          </div>
        ))}
      </div>
      <div className="relative bg-obsidian px-[6vw] pt-24 pb-16">
        <div className="mx-auto max-w-[1400px]">
          <p className="eyebrow eyebrow-dot mb-6">{w.category} · {w.city}</p>
          <h1 className="max-w-[1200px] font-display uppercase leading-[0.98] text-ivory" style={{ fontSize: "clamp(44px,7.2vw,120px)", letterSpacing: "0.03em" }}>
            {w.brand} <span className="text-ember">{w.model}</span>
          </h1>
          <p className="mt-8 max-w-[720px] text-[16px] leading-[1.9] text-mute">{w.tagline}</p>
          <HeroSpecsRow w={w} />
        </div>
      </div>
    </section>
  );
}

function HeroSpecsRow({ w, compact = false }: { w: Work; compact?: boolean }) {
  return (
    <div className={`mt-10 grid gap-6 border-t border-line pt-8 text-[11px] uppercase tracking-[0.3em] text-mute ${compact ? "grid-cols-2" : "grid-cols-2 md:grid-cols-4"}`}>
      <span><span className="mr-3 block text-mute-2">Часов</span>{w.hours}</span>
      <span><span className="mr-3 block text-mute-2">Плёнка</span>{w.film}</span>
      <span><span className="mr-3 block text-mute-2">Срок</span>{w.duration}</span>
      <span><span className="mr-3 block text-mute-2">Год</span>{w.year}</span>
    </div>
  );
}

/* ─────────── СПЕЦИФИКАЦИЯ — интерактивная ─────────── */
function SpecsPanel({ w }: { w: Work }) {
  const [tab, setTab] = useState<"perf" | "process" | "warranty">("perf");
  return (
    <section className="border-b border-line bg-obsidian-2 px-[6vw] py-24">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-10 flex flex-wrap items-center gap-4">
          <span className="eyebrow">Технические параметры</span>
          <span className="h-px flex-1 bg-line" />
          <div className="flex gap-2">
            {[
              ["perf",     "Динамика"],
              ["process",  "Процесс"],
              ["warranty", "Гарантия"],
            ].map(([k, l]) => (
              <button
                key={k}
                onClick={() => setTab(k as typeof tab)}
                className={`border px-5 py-2 text-[10px] uppercase tracking-[0.3em] transition-colors ${
                  tab === k ? "border-ember bg-ember text-obsidian" : "border-line-strong text-mute hover:text-ivory"
                }`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>

        {tab === "perf" && (
          <div className="grid gap-[2px] bg-line md:grid-cols-4">
            {[
              ["Мощность",     w.performance.power],
              ["Крутящий",     w.performance.torque],
              ["0 → 100 км/ч", w.performance.zeroTo],
              ["Максимум",     w.performance.top],
              ["Снаряжённая",  w.performance.weight],
              ["Категория",    w.category],
              ["Плёнка",       w.film],
              ["Часы",         w.hours],
            ].map(([l, v]) => (
              <div key={l} className="bg-obsidian p-8">
                <p className="text-[10px] uppercase tracking-[0.35em] text-mute-2">{l}</p>
                <p className="mt-4 font-display text-[26px] uppercase text-ivory" style={{ letterSpacing: "0.03em" }}>{v}</p>
              </div>
            ))}
          </div>
        )}
        {tab === "process" && (
          <div className="grid gap-6 md:grid-cols-2">
            {[
              ["Приём",     "Клубный протокол: опись, диагностика, карта работ."],
              ["Подготовка","Мойка в чистой зоне, деконтаминация, лёгкая коррекция."],
              ["Оклейка",   "Ручной раскрой без выкроек, монтаж без разбора."],
              ["Контроль",  "Три источника света, фотофиксация каждого шва."],
              ["Клубная книга","Документ с историей работы, вложен в панель бардачка."],
              ["Сдача",     "Ключи передаёт мастер, который вёл проект."],
            ].map(([t, c], i) => (
              <div key={t} className="border border-line bg-obsidian p-8">
                <p className="font-display text-2xl text-mute-2">{String(i + 1).padStart(2, "0")}</p>
                <h4 className="mt-6 font-display text-xl uppercase text-ivory" style={{ letterSpacing: "0.05em" }}>{t}</h4>
                <p className="mt-4 text-[14px] leading-[1.85] text-mute">{c}</p>
              </div>
            ))}
          </div>
        )}
        {tab === "warranty" && (
          <div className="grid gap-6 md:grid-cols-3">
            {[
              ["10 лет",  "Гарантия на плёнку UNIQUE PPF — пожелтение, отслоение, помутнение."],
              ["5 лет",   "Керамическое покрытие Ceramic Pro 9H сохраняет гидрофобность."],
              ["Ежегодно","Клубная ревизия — бесплатная проверка и восстановление швов."],
            ].map(([t, c]) => (
              <div key={t} className="border border-line bg-obsidian p-10">
                <p className="font-display text-ember" style={{ fontSize: "clamp(48px,5vw,72px)" }}>{t}</p>
                <p className="mt-4 text-[14px] leading-[1.85] text-mute">{c}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

/* ─────────── BESPOKE — конфигуратор ─────────── */
function BespokeConfigurator({ w }: { w: Work }) {
  const [sel, setSel] = useState<Record<string, string>>(() =>
    Object.fromEntries(w.bespoke.map(b => [b.title, b.options[0]])),
  );
  return (
    <section className="border-b border-line px-[6vw] py-32">
      <div className="mx-auto max-w-[1280px]">
        <div className="mb-14 flex items-center gap-5">
          <span className="font-display text-[14px] text-mute-2">03</span>
          <span className="h-px flex-1 bg-line" />
          <span className="eyebrow">Bespoke — соберите свою комплектацию</span>
        </div>
        <p className="mb-12 max-w-[720px] text-[16px] leading-[1.9] text-mute">
          Каждая работа UNIQUE начинается с диалога о деталях. Ниже — конфигуратор в стиле нашего клубного протокола:
          выбирайте варианты, и мы подготовим индивидуальное предложение для вашего {w.brand} {w.model}.
        </p>
        <div className="grid gap-8 md:grid-cols-[1fr_360px]">
          <div className="space-y-4">
            {w.bespoke.map(b => (
              <div key={b.title} className="border border-line bg-obsidian p-8">
                <div className="mb-4 flex items-baseline justify-between gap-4">
                  <h4 className="font-display text-xl uppercase text-ivory" style={{ letterSpacing: "0.05em" }}>{b.title}</h4>
                  <span className="text-[10px] uppercase tracking-[0.3em] text-ember">{sel[b.title]}</span>
                </div>
                <p className="mb-5 text-[13.5px] leading-[1.85] text-mute">{b.note}</p>
                <div className="flex flex-wrap gap-2">
                  {b.options.map(o => (
                    <button
                      key={o}
                      onClick={() => setSel(s => ({ ...s, [b.title]: o }))}
                      className={`border px-4 py-2 text-[11px] uppercase tracking-[0.25em] transition-colors ${
                        sel[b.title] === o
                          ? "border-ivory bg-ivory text-obsidian"
                          : "border-line-strong text-mute hover:text-ivory"
                      }`}
                    >
                      {o}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <aside className="sticky top-24 self-start border border-ember/40 bg-obsidian p-8">
            <p className="eyebrow mb-4">Ваша спецификация</p>
            <p className="font-display text-2xl uppercase text-ivory" style={{ letterSpacing: "0.05em" }}>{w.brand} {w.model}</p>
            <div className="mt-6 space-y-4 border-t border-line pt-6 text-[13px] leading-[1.7]">
              {w.bespoke.map(b => (
                <div key={b.title} className="flex justify-between gap-4">
                  <span className="text-mute-2">{b.title}</span>
                  <span className="text-right text-ivory">{sel[b.title]}</span>
                </div>
              ))}
            </div>
            <Link to="/kontakty" className="btn-line btn-ember mt-8 block text-center">
              Отправить конфигурацию
            </Link>
            <p className="mt-4 text-center text-[10.5px] uppercase tracking-[0.3em] text-mute-2">
              Ответ мастера — в течение 24 часов
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
}

/* ─────────── ПАЛИТРА ─────────── */
function PalettePanel({ w }: { w: Work }) {
  return (
    <section className="border-b border-line bg-obsidian-2 px-[6vw] py-24">
      <div className="mx-auto max-w-[1280px]">
        <div className="mb-10 flex items-center gap-5">
          <span className="font-display text-[14px] text-mute-2">04</span>
          <span className="h-px flex-1 bg-line" />
          <span className="eyebrow">Палитра проекта</span>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {w.palette.map(p => (
            <div key={p.name} className="border border-line bg-obsidian">
              <div className="aspect-[16/9]" style={{ backgroundColor: p.hex }} />
              <div className="p-6">
                <p className="font-display text-lg uppercase text-ivory" style={{ letterSpacing: "0.05em" }}>{p.name}</p>
                <p className="mt-1 text-[11px] uppercase tracking-[0.3em] text-mute-2">{p.hex}</p>
                <p className="mt-4 text-[13.5px] leading-[1.85] text-mute">{p.note}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────── КИНЕМАТИЧЕСКАЯ ГАЛЕРЕЯ — табы + лайтбокс ─────────── */
const GALLERY_TABS = [
  { key: "exterior", label: "Экстерьер",   indices: [0, 1, 2, 3] },
  { key: "interior", label: "Интерьер",    indices: [4, 5, 6] },
  { key: "detail",   label: "Деталь",      indices: [7, 8, 9] },
  { key: "craft",    label: "Мастерство",  indices: [10, 11, 0] },
] as const;

function CinematicGallery({ w }: { w: Work }) {
  const [tabKey, setTabKey] = useState<(typeof GALLERY_TABS)[number]["key"]>("exterior");
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);

  const tab = GALLERY_TABS.find(t => t.key === tabKey)!;
  const images = tab.indices.map(i => w.gallery[i % w.gallery.length]).filter(Boolean);
  const featured = images[active] ?? w.gallery[0];

  useEffect(() => { setActive(0); }, [tabKey]);
  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight") setLightbox(v => v === null ? v : (v + 1) % images.length);
      if (e.key === "ArrowLeft")  setLightbox(v => v === null ? v : (v - 1 + images.length) % images.length);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [lightbox, images.length]);

  return (
    <section className="border-b border-line bg-obsidian-2 px-[6vw] py-28">
      <div className="mx-auto max-w-[1500px]">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow eyebrow-dot mb-4">Кинематическая галерея</p>
            <h2 className="font-display uppercase text-ivory" style={{ fontSize: "clamp(28px,3.4vw,44px)", letterSpacing: "0.05em" }}>
              {w.brand} <span className="text-ember">{w.model}</span>
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {GALLERY_TABS.map(t => (
              <button
                key={t.key}
                onClick={() => setTabKey(t.key)}
                className={`border px-5 py-2 text-[10px] uppercase tracking-[0.3em] transition-all duration-300 ${
                  tabKey === t.key
                    ? "border-ember bg-ember text-obsidian"
                    : "border-line-strong text-mute hover:border-ivory hover:text-ivory"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* featured */}
        <button
          type="button"
          onClick={() => setLightbox(active)}
          className="group relative block aspect-[16/9] w-full overflow-hidden bg-obsidian"
          aria-label="Открыть в полноэкранном режиме"
        >
          <img
            key={featured}
            src={featured}
            alt={`${w.brand} ${w.model} — ${tab.label}`}
            className="h-full w-full animate-fade-in object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.03]"
          />
          <div className="absolute inset-0 plate-scrim" />
          <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between gap-6 text-ivory">
            <div>
              <p className="text-[10px] uppercase tracking-[0.4em] text-mute">{tab.label} · {String(active + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}</p>
              <p className="mt-2 font-display text-2xl uppercase" style={{ letterSpacing: "0.05em" }}>{w.category}</p>
            </div>
            <span className="border border-ivory/60 px-4 py-2 text-[10px] uppercase tracking-[0.3em] backdrop-blur-sm transition-colors group-hover:bg-ivory group-hover:text-obsidian">
              Увеличить
            </span>
          </div>
        </button>

        {/* thumbs */}
        <div className="mt-4 grid grid-cols-3 gap-2 md:grid-cols-6">
          {images.map((src, i) => (
            <button
              key={src + i}
              onClick={() => setActive(i)}
              className={`relative aspect-[4/3] overflow-hidden border transition-all duration-300 ${
                active === i ? "border-ember opacity-100" : "border-transparent opacity-55 hover:opacity-90"
              }`}
            >
              <img src={src} alt="" loading="lazy" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      </div>

      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-obsidian/95 p-6 animate-fade-in"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute left-6 top-6 text-[11px] uppercase tracking-[0.35em] text-ivory"
            onClick={(e) => { e.stopPropagation(); setLightbox(null); }}
          >
            ✕ Закрыть
          </button>
          <button
            className="absolute left-6 top-1/2 -translate-y-1/2 border border-ivory/40 px-4 py-3 text-ivory hover:bg-ivory hover:text-obsidian"
            onClick={(e) => { e.stopPropagation(); setLightbox(v => v === null ? v : (v - 1 + images.length) % images.length); }}
            aria-label="Предыдущее"
          >←</button>
          <img
            key={lightbox}
            src={images[lightbox]}
            alt=""
            className="max-h-[90vh] max-w-[92vw] animate-scale-in object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            className="absolute right-6 top-1/2 -translate-y-1/2 border border-ivory/40 px-4 py-3 text-ivory hover:bg-ivory hover:text-obsidian"
            onClick={(e) => { e.stopPropagation(); setLightbox(v => v === null ? v : (v + 1) % images.length); }}
            aria-label="Следующее"
          >→</button>
          <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[11px] uppercase tracking-[0.35em] text-mute">
            {String(lightbox + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")} · {tab.label}
          </p>
        </div>
      )}
    </section>
  );
}

/* ─────────── EXPLORE — интерактивные аккордеоны разделов ─────────── */
type ExploreCat = "exterior" | "interior" | "materials" | "craft";
const EXPLORE_CATS: { key: ExploreCat; label: string; num: string }[] = [
  { key: "exterior",  label: "Экстерьер",   num: "I" },
  { key: "interior",  label: "Интерьер",    num: "II" },
  { key: "materials", label: "Материалы",   num: "III" },
  { key: "craft",     label: "Мастерство",  num: "IV" },
];

function ExploreAccordion({ w }: { w: Work }) {
  const [cat, setCat] = useState<ExploreCat>("exterior");
  const [open, setOpen] = useState(0);

  const content: Record<ExploreCat, { image: string; items: { title: string; body: string }[] }> = {
    exterior: {
      image: w.gallery[1] ?? w.hero,
      items: [
        { title: "Плёнка UNIQUE PPF",          body: "Полиуретан толщиной 200 микрон с эластичностью 320 %. Плёнка заводится под кромки без снятия оптики, ручек и молдингов." },
        { title: "Ручной раскрой без выкроек", body: "Каждая панель раскраивается непосредственно на кузове — швов на видимых зонах не остаётся." },
        { title: "Защита оптики и стёкол",     body: "Отдельная плёнка для фар и лобового стекла — устойчива к точечным ударам щебня и реагентам зимой." },
        { title: "Хром и молдинги",            body: "Полировка и защитный слой на хромированные элементы — блеск сохраняется без потемнения." },
      ],
    },
    interior: {
      image: w.gallery[5] ?? w.hero,
      items: [
        { title: "Кожа и алькантара",   body: "UNIQUE Interior Coat — водооталкивающий состав для натуральной кожи, замши и алькантары. Впитывание запахов снижено на 80 %." },
        { title: "Дерево и карбон",     body: "Полировка декоративных вставок с последующей керамической защитой — глубина рисунка сохраняется годами." },
        { title: "Металлические детали", body: "Обработка нержавеющих накладок порогов и педалей — микроцарапины закрываются составом UNIQUE Metal." },
        { title: "Стёкла салона",       body: "Керамика для внутренних стёкол — снижает налипание пыли и запотевание в холодную погоду." },
      ],
    },
    materials: {
      image: w.gallery[3] ?? w.hero,
      items: w.materials.map(m => ({ title: m.name, body: m.note })),
    },
    craft: {
      image: w.gallery[7] ?? w.hero,
      items: [
        { title: "Клубный протокол приёма",   body: "Опись, диагностика при трёх источниках света и десятистраничная карта работ до старта проекта." },
        { title: "Температурная выдержка",    body: "Автомобиль проводит 48 часов в тёплом боксе перед оклейкой — металл должен принять комнатную температуру." },
        { title: "Финальная тройная проверка", body: "Каждый шов фотографируется под галогеном, LED и УФ-лампой — только после этого работа считается завершённой." },
        { title: "Клубная книга владельца",   body: "Документ с историей работы и фото каждого этапа передаётся в панель бардачка автомобиля." },
      ],
    },
  };

  const active = content[cat];

  useEffect(() => { setOpen(0); }, [cat]);

  return (
    <section className="border-y border-line bg-obsidian-2 px-[6vw] py-32">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow eyebrow-dot mb-4">Исследуйте автомобиль</p>
            <h2 className="font-display uppercase leading-tight text-ivory" style={{ fontSize: "clamp(28px,3.6vw,48px)", letterSpacing: "0.05em" }}>
              Четыре измерения<br /><span className="text-ember">одной работы.</span>
            </h2>
          </div>
          <p className="max-w-[380px] text-[14px] leading-[1.85] text-mute">
            Каждый раздел раскрывает автомобиль с новой стороны — от плёнки на кузове
            до последнего шва внутри салона.
          </p>
        </div>

        {/* Category rail */}
        <div className="mb-10 grid grid-cols-2 gap-[1px] bg-line md:grid-cols-4">
          {EXPLORE_CATS.map(c => (
            <button
              key={c.key}
              onClick={() => setCat(c.key)}
              className={`group flex items-center gap-4 bg-obsidian px-6 py-5 text-left transition-all ${
                cat === c.key ? "bg-obsidian-2" : "hover:bg-obsidian-2/60"
              }`}
            >
              <span className={`font-display text-lg transition-colors ${cat === c.key ? "text-ember" : "text-mute-2"}`}>
                {c.num}
              </span>
              <span className={`text-[11px] uppercase tracking-[0.3em] transition-colors ${
                cat === c.key ? "text-ivory" : "text-mute group-hover:text-ivory"
              }`}>
                {c.label}
              </span>
              <span className={`ml-auto h-px transition-all ${cat === c.key ? "w-10 bg-ember" : "w-4 bg-line-strong"}`} />
            </button>
          ))}
        </div>

        <div className="grid gap-10 md:grid-cols-[0.9fr_1.1fr]">
          <div key={cat} className="relative aspect-[4/5] overflow-hidden animate-fade-in md:aspect-auto">
            <img src={active.image} alt="" loading="lazy" className="h-full w-full object-cover" />
            <div className="absolute inset-0 plate-scrim" />
            <p className="absolute bottom-6 left-6 text-[10px] uppercase tracking-[0.35em] text-ivory">
              {EXPLORE_CATS.find(c => c.key === cat)?.label}
            </p>
          </div>
          <div className="divide-y divide-line border-y border-line">
            {active.items.map((it, i) => {
              const isOpen = open === i;
              return (
                <div key={it.title + i}>
                  <button
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    className="flex w-full items-center justify-between gap-6 py-6 text-left transition-colors hover:text-ivory"
                  >
                    <span className="flex items-center gap-6">
                      <span className="font-display text-[13px] text-mute-2">{String(i + 1).padStart(2, "0")}</span>
                      <span className="font-display text-lg uppercase text-ivory md:text-xl" style={{ letterSpacing: "0.05em" }}>
                        {it.title}
                      </span>
                    </span>
                    <span className={`text-2xl text-ember transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}>+</span>
                  </button>
                  <div
                    className="grid overflow-hidden text-[14.5px] leading-[1.9] text-mute transition-all duration-500 ease-out"
                    style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                  >
                    <div className="min-h-0 overflow-hidden">
                      <p className="pb-6 pl-12 pr-8 max-w-[640px]">{it.body}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
