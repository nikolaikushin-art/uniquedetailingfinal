import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { WORKS, CATEGORIES } from "@/lib/works";
import { carImage } from "@/lib/images";

export const Route = createFileRoute("/raboty")({
  head: () => ({
    meta: [
      { title: "Работы — UNIQUE Detailing" },
      { name: "description", content: "Портфолио выполненных работ студии UNIQUE. Оклейка PPF, смена цвета и керамика для Audi, Aston Martin, BMW, Porsche, Bentley и других премиум-автомобилей." },
      { property: "og:title", content: "Работы — UNIQUE Detailing" },
      { property: "og:description", content: "Больше 500 автомобилей за 10 лет. Портфолио студии UNIQUE." },
    ],
  }),
  component: RabotyPage,
});

function RabotyPage() {
  const [cat, setCat] = useState<(typeof CATEGORIES)[number]>("Все работы");
  const list = useMemo(
    () => (cat === "Все работы" ? WORKS : WORKS.filter(w => w.category === cat)),
    [cat],
  );

  return (
    <div>
      {/* HERO */}
      <section className="relative flex min-h-[78vh] items-center overflow-hidden border-b border-line pt-28">
        <div className="absolute inset-0 animate-drift bg-cover bg-center opacity-70" style={{ backgroundImage: `url(${carImage(4, 2200)})` }} />
        <div className="absolute inset-0 plate-scrim" />
        <div className="relative z-10 mx-auto w-full max-w-[1400px] px-[6vw]">
          <p className="eyebrow eyebrow-dot mb-6">Выполненные работы</p>
          <h1 className="max-w-[1100px] font-display uppercase leading-[1.02] text-ivory" style={{ fontSize: "clamp(42px,7vw,108px)", letterSpacing: "0.03em" }}>
            Больше пятисот<br />автомобилей.<br />Каждый — уникален.
          </h1>
          <p className="mt-8 max-w-[560px] text-[16px] leading-[1.9] text-mute">
            Портфолио студии UNIQUE — реальные работы, реальные владельцы, реальные сроки.
            Каждый проект сопровождается клубной книгой и десятилетней гарантией.
          </p>
        </div>
      </section>

      {/* ФИЛЬТРЫ */}
      <div className="border-b border-line bg-obsidian-2 px-[6vw]">
        <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-6 py-6">
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map(c => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`border px-6 py-3 text-[11px] uppercase tracking-[0.3em] transition-colors ${
                  cat === c
                    ? "border-ivory bg-ivory text-obsidian"
                    : "border-line-strong text-mute hover:text-ivory"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
          <span className="text-[11px] uppercase tracking-[0.3em] text-mute-2">
            {list.length} {list.length === 1 ? "работа" : list.length < 5 ? "работы" : "работ"}
          </span>
        </div>
      </div>

      {/* СЕТКА */}
      <section className="px-[6vw] py-24">
        <div className="mx-auto grid max-w-[1400px] gap-[2px] bg-line sm:grid-cols-2 lg:grid-cols-3">
          {list.map((w, i) => (
            <Link
              key={w.slug}
              to="/raboty/$slug"
              params={{ slug: w.slug }}
              className="group relative flex aspect-[4/5] flex-col justify-end overflow-hidden bg-obsidian p-8"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06]"
                style={{ backgroundImage: `url(${w.hero})` }}
              />
              <div className="absolute inset-0 plate-scrim" />
              <div className="absolute left-6 top-6 z-10 text-[10px] uppercase tracking-[0.3em] text-mute">
                {String(i + 1).padStart(2, "0")} · {w.category}
              </div>
              <div className="relative z-10">
                <p className="eyebrow mb-3 text-mute-2">{w.hours} · {w.city}</p>
                <h3 className="font-display uppercase leading-tight text-ivory" style={{ fontSize: "24px", letterSpacing: "0.06em" }}>
                  {w.brand}
                </h3>
                <p className="mt-1 text-[15px] text-ivory">{w.model}</p>
                <p className="mt-3 max-w-[300px] text-[13px] leading-[1.7] text-mute line-clamp-2">{w.tagline}</p>
                <span className="link-more mt-5">Подробнее</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
