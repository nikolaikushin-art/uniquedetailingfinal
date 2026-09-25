import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { CdnImage } from "@/components/site/CdnImage";
import { LeadForm } from "@/components/site/LeadForm";
import { Rule } from "@/components/site/PageHero";
import { COLOURS } from "@/lib/film-colours";
import { briefHero, shot, type ServiceBrief } from "@/lib/service-brief";
import type { GroupExtras } from "@/lib/service-extras";
import type { Service, ServiceGroup } from "@/lib/services";
import type { Work } from "@/lib/works";

export type ExampleItem = { work: Work; img: string };

export type ServiceCtx = {
  s: Service;
  brief: ServiceBrief;
  group: ServiceGroup;
  extras: GroupExtras;
  examples: ExampleItem[];
  together: Service[];
  others: Service[];
};

/* ───────────────────────── shared atoms ───────────────────────── */

function localShots(ctx: ServiceCtx): string[] {
  return ctx.brief.shots.map((n) => shot(ctx.s.slug, n));
}

/** Facts row — rendered differently per layout via `variant`. */
function Facts({ s }: { s: Service }) {
  const rows: [string, string, boolean][] = [
    ["Срок", s.duration ?? "по согласованию", false],
    ["Стоимость", s.price ?? "после осмотра", true],
    ["Договор и гарантия", "Да", false],
    ["Видеоотчёт", "Ежедневно", false],
  ];
  return (
    <dl className="flex flex-wrap gap-x-12 gap-y-4">
      {rows.map(([k, v, em]) => (
        <div key={k}>
          <dt className="text-[10px] uppercase tracking-[0.3em] text-mute-2">{k}</dt>
          <dd className={`mt-1 text-[14px] ${em ? "text-ember" : "text-ivory"}`}>{v}</dd>
        </div>
      ))}
    </dl>
  );
}

function PageNav({ palette }: { palette?: boolean }) {
  const items: [string, string, boolean][] = [
    ["#about", "Об услуге", false],
    ["#fit", "Кому подходит", false],
    ...(palette ? ([["#palette", "Палитра", false]] as [string, string, boolean][]) : []),
    ["#process", "Этапы", false],
    ["#examples", "Примеры", false],
    ["#faq", "Вопросы", false],
    ["#zapis", "Записаться", true],
  ];
  return (
    <nav
      aria-label="Разделы страницы"
      className="flex flex-wrap gap-x-6 gap-y-2 text-[10.5px] uppercase tracking-[0.22em] text-mute"
    >
      {items.map(([h, l, em]) => (
        <a key={h} href={h} className={em ? "text-ember hover:text-ivory" : "hover:text-ivory"}>
          {l}
        </a>
      ))}
    </nav>
  );
}

/** Oversized metric figures — the numeric signature shared but styled per layout. */
function Metrics({ ctx, cols = 3 }: { ctx: ServiceCtx; cols?: number }) {
  const colClass = cols === 1 ? "" : "sm:grid-cols-3";
  return (
    <div className={`grid gap-px bg-line ${colClass}`}>
      {ctx.brief.metrics.map((m) => (
        <div key={m.l} className="bg-obsidian px-8 py-10">
          <p
            className="font-display leading-none text-ivory"
            style={{ fontSize: "clamp(38px,5vw,72px)", letterSpacing: "0.01em" }}
          >
            {m.v}
          </p>
          <p className="mt-5 text-[12px] uppercase leading-[1.6] tracking-[0.2em] text-mute-2">
            {m.l}
          </p>
        </div>
      ))}
    </div>
  );
}

function ControlPoints({ ctx, numbered = true }: { ctx: ServiceCtx; numbered?: boolean }) {
  const c = ctx.brief.control;
  return (
    <div>
      <p className="eyebrow mb-8">{c.title}</p>
      <ol className="space-y-6">
        {c.items.map((t, i) => (
          <li key={t} className="flex gap-6">
            {numbered ? (
              <span className="font-display text-2xl leading-none text-ember">
                {String(i + 1).padStart(2, "0")}
              </span>
            ) : (
              <span className="mt-3 h-px w-6 flex-shrink-0 bg-ember" />
            )}
            <span className="text-[14.5px] leading-[1.8] text-mute">{t}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

function HowToRead({ ctx }: { ctx: ServiceCtx }) {
  const r = ctx.brief.read;
  return (
    <div>
      <p className="eyebrow mb-8">{r.title}</p>
      <dl className="divide-y divide-line border-y border-line">
        {r.items.map((it) => (
          <div key={it.k} className="grid gap-2 py-6 md:grid-cols-[180px_1fr] md:gap-8">
            <dt
              className="font-display text-lg uppercase leading-tight text-ivory"
              style={{ letterSpacing: "0.05em" }}
            >
              {it.k}
            </dt>
            <dd className="text-[14.5px] leading-[1.85] text-mute">{it.v}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

function Includes({ s }: { s: Service }) {
  return (
    <div>
      <p className="eyebrow mb-6">Что входит</p>
      <ul className="space-y-3">
        {s.includes.map((b) => (
          <li key={b} className="flex gap-4 text-[14.5px] leading-[1.75] text-mute">
            <span className="mt-3 h-px w-5 flex-shrink-0 bg-ember" />
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Care({ s }: { s: Service }) {
  return (
    <div>
      <p className="eyebrow mb-5">Уход после услуги</p>
      <p className="max-w-[620px] text-[14.5px] leading-[1.9] text-mute">{s.care}</p>
    </div>
  );
}

function PriceCard({ s, floating = true }: { s: Service; floating?: boolean }) {
  return (
    <aside
      className={`h-fit border border-line bg-obsidian-2 p-8 ${floating ? "md:sticky md:top-28" : ""}`}
    >
      <p className="text-[10px] uppercase tracking-[0.3em] text-mute-2">Срок</p>
      <p className="mt-2 font-display text-2xl uppercase text-ivory">
        {s.duration ?? "по согласованию"}
      </p>
      <p className="mt-8 text-[10px] uppercase tracking-[0.3em] text-mute-2">Стоимость</p>
      <p className="mt-2 font-display text-2xl uppercase text-ember">
        {s.price ?? "рассчитывается после осмотра"}
      </p>
      {s.note ? <p className="mt-6 text-[12.5px] leading-[1.7] text-mute-2">{s.note}</p> : null}
      <p className="mt-6 text-[12.5px] leading-[1.7] text-mute-2">
        Итоговую стоимость и сроки согласуем после осмотра автомобиля и фиксируем в договоре.
      </p>
      <a href="#zapis" className="btn-line btn-ember mt-8 block text-center">
        Записаться
      </a>
    </aside>
  );
}

function Fit({ ctx }: { ctx: ServiceCtx }) {
  const { extras, together } = ctx;
  return (
    <div className="mx-auto max-w-[1280px]">
      <div className="grid gap-16 md:grid-cols-2">
        <div>
          <p className="eyebrow mb-6">Кому подходит</p>
          <ul className="space-y-4">
            {extras.audience.map((t) => (
              <li key={t} className="flex gap-4 text-[14.5px] leading-[1.8] text-mute">
                <span className="mt-3 h-px w-5 flex-shrink-0 bg-ember" />
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="eyebrow mb-6">Как подготовиться к визиту</p>
          <ul className="space-y-4">
            {extras.prepare.map((t) => (
              <li key={t} className="flex gap-4 text-[14.5px] leading-[1.8] text-mute">
                <span className="mt-3 h-px w-5 flex-shrink-0 bg-ember" />
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {together.length ? (
        <div className="mt-16 border-t border-line pt-12">
          <p className="eyebrow mb-6">Рекомендуем заказывать вместе</p>
          <ul className="grid gap-px bg-line md:grid-cols-3">
            {together.map((o) => (
              <li key={o.slug} className="bg-obsidian">
                <Link
                  to="/uslugi/$slug"
                  params={{ slug: o.slug }}
                  className="block p-6 transition-colors hover:bg-obsidian-2"
                >
                  <span className="block text-[14.5px] leading-[1.6] text-ivory">{o.title}</span>
                  <span className="mt-3 block text-[11px] uppercase tracking-[0.2em] text-mute-2">
                    {o.price ?? "цена — после осмотра"}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

function ProcessSteps({
  ctx,
  num,
  layout = "grid",
}: {
  ctx: ServiceCtx;
  num: string;
  layout?: "grid" | "timeline";
}) {
  const steps = ctx.s.process ?? ctx.group.process;
  if (layout === "timeline") {
    return (
      <div className="mx-auto max-w-[1000px]">
        <Rule label="Как проходит работа" num={num} />
        <ol className="relative border-l border-line pl-10">
          {steps.map(([t, c], i) => (
            <li key={t} className="relative pb-14 last:pb-0">
              <span className="absolute -left-[45px] flex h-8 w-8 items-center justify-center rounded-full border border-line bg-obsidian font-display text-sm text-ember">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3
                className="font-display text-2xl uppercase leading-tight text-ivory"
                style={{ letterSpacing: "0.05em" }}
              >
                {t}
              </h3>
              <p className="mt-4 max-w-[640px] text-[14px] leading-[1.85] text-mute">{c}</p>
            </li>
          ))}
        </ol>
      </div>
    );
  }
  return (
    <div className="mx-auto max-w-[1280px]">
      <Rule label="Как проходит работа" num={num} />
      <div className="grid gap-[2px] bg-line md:grid-cols-4">
        {steps.map(([t, c], i) => (
          <div key={t} className="bg-obsidian p-10">
            <p className="font-display text-2xl text-mute-2">{String(i + 1).padStart(2, "0")}</p>
            <h3
              className="mt-8 font-display text-2xl uppercase leading-tight text-ivory"
              style={{ letterSpacing: "0.05em" }}
            >
              {t}
            </h3>
            <p className="mt-6 text-[14px] leading-[1.85] text-mute">{c}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function Examples({ ctx, num, ratio = "4/5" }: { ctx: ServiceCtx; num: string; ratio?: string }) {
  return (
    <div className="mx-auto max-w-[1400px]">
      <Rule label="Примеры работ" num={num} />
      <div className="grid gap-[2px] bg-line sm:grid-cols-3">
        {ctx.examples.map(({ work: w, img }) => (
          <Link
            key={w.slug}
            to="/raboty/$slug"
            params={{ slug: w.slug }}
            className="group relative block overflow-hidden bg-obsidian"
          >
            <div style={{ aspectRatio: ratio }}>
              <img
                src={img}
                alt={`${w.brand} ${w.model}`}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transition-transform duration-[1400ms] group-hover:scale-105"
              />
            </div>
            <div className="absolute inset-0 plate-scrim" />
            <div className="absolute inset-x-0 bottom-0 p-6">
              <p className="text-[10px] uppercase tracking-[0.3em] text-mute">{w.category}</p>
              <h3
                className="mt-2 font-display text-xl uppercase leading-tight text-ivory"
                style={{ letterSpacing: "0.05em" }}
              >
                {w.brand} {w.model}
              </h3>
            </div>
          </Link>
        ))}
      </div>
      <div className="mt-10">
        <Link to="/raboty" className="btn-line">
          Все выполненные работы
        </Link>
      </div>
    </div>
  );
}

function Faq({ ctx, num }: { ctx: ServiceCtx; num: string }) {
  return (
    <div className="mx-auto max-w-[1000px]">
      <Rule label="Вопросы по услуге" num={num} />
      <div className="divide-y divide-line border-t border-line">
        {ctx.s.faq.map(([q, a]) => (
          <details key={q} className="group py-6">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-display text-[15px] uppercase leading-tight text-ivory md:text-[17px]">
              {q}
              <span className="shrink-0 font-display text-xl text-mute-2 transition-transform group-open:rotate-45">
                +
              </span>
            </summary>
            <p className="mt-4 max-w-[760px] text-[14.5px] leading-[1.9] text-mute">{a}</p>
          </details>
        ))}
      </div>
    </div>
  );
}

function Booking({ ctx }: { ctx: ServiceCtx }) {
  const { s } = ctx;
  return (
    <div className="mx-auto grid max-w-[1280px] gap-16 md:grid-cols-[0.8fr_1.2fr]">
      <div>
        <p className="eyebrow mb-4">Запись на услугу</p>
        <h2
          className="font-display uppercase leading-tight text-ivory"
          style={{ fontSize: "clamp(26px,3vw,42px)", letterSpacing: "0.05em" }}
        >
          Рассчитаем стоимость
          <br />
          <span className="text-ember">и согласуем сроки.</span>
        </h2>
        <p className="mt-8 text-[15px] leading-[1.9] text-mute">
          Оставьте заявку — менеджер свяжется с вами, уточнит детали и подберёт удобное время. При
          необходимости заберём автомобиль эвакуатором из любой точки города.
        </p>
        <Link to="/privilegii" className="btn-line mt-8 inline-block">
          Привилегии работы с нами
        </Link>
      </div>
      <LeadForm key={s.slug} defaultService={s.title} heading="Запись на услугу" />
    </div>
  );
}

function Related({ ctx }: { ctx: ServiceCtx }) {
  return (
    <div className="mx-auto max-w-[1280px]">
      <Rule label={`Ещё в разделе «${ctx.group.title}»`} />
      <ul className="grid gap-px bg-line md:grid-cols-2">
        {ctx.others.map((o) => (
          <li key={o.slug} className="bg-obsidian">
            <Link
              to="/uslugi/$slug"
              params={{ slug: o.slug }}
              className="flex items-center justify-between gap-6 p-6 text-[14.5px] text-mute transition-colors hover:text-ivory"
            >
              <span>{o.title}</span>
              <span className="h-px w-8 flex-shrink-0 bg-ember" />
            </Link>
          </li>
        ))}
      </ul>
      <div className="mt-10">
        <Link to="/uslugi" className="btn-line">
          Все услуги
        </Link>
      </div>
    </div>
  );
}

function Palette({ s, num }: { s: Service; num: string }) {
  return (
    <div className="mx-auto max-w-[1400px]">
      <Rule label="Палитра" num={num} />
      <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
        <h2
          className="max-w-[820px] font-display uppercase leading-tight text-ivory"
          style={{ fontSize: "clamp(26px,3.2vw,46px)", letterSpacing: "0.04em" }}
        >
          Примеры цветов
          <br />
          <span className="text-ember">
            {s.slug === "smena-cveta-vinil" ? "200+ оттенков и фактур." : "из 180 оттенков."}
          </span>
        </h2>
        <p className="max-w-[420px] text-[13.5px] leading-[1.85] text-mute">
          Ниже — часть палитры. Полный набор образцов покажем в студии: цвет лучше выбирать вживую,
          при дневном свете.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
        {COLOURS.map((c) => (
          <figure key={c.name} className="group relative overflow-hidden bg-obsidian">
            <div className="aspect-[4/3]">
              <img
                src={c.img}
                alt={`${c.name} — ${c.type}`}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transition-transform duration-[1400ms] group-hover:scale-105"
              />
            </div>
            <div className="absolute inset-0 plate-scrim" />
            <span className="absolute right-3 top-3 border border-ivory/25 bg-obsidian/45 px-2.5 py-1 text-[8.5px] uppercase tracking-[0.26em] text-ivory backdrop-blur-sm">
              {c.type}
            </span>
            <figcaption className="absolute inset-x-0 bottom-0 p-5">
              <h3
                className="font-display text-base uppercase leading-none text-ivory md:text-lg"
                style={{ letterSpacing: "0.05em" }}
              >
                {c.name}
              </h3>
            </figcaption>
          </figure>
        ))}
      </div>
      <div className="mt-10">
        <Link to="/plenka" className="btn-line">
          Вся коллекция плёнок UNIQUE
        </Link>
      </div>
    </div>
  );
}

/* Section wrappers */
function Sec({
  id,
  children,
  tone = "obsidian",
  className = "px-[6vw] py-24 md:py-32",
}: {
  id?: string;
  children: ReactNode;
  tone?: "obsidian" | "obsidian-2";
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`border-t border-line ${tone === "obsidian-2" ? "bg-obsidian-2" : ""} ${
        id ? "scroll-mt-24 " : ""
      }${className}`}
    >
      {children}
    </section>
  );
}

/** Breadcrumb + editorial headline (shared building blocks, unique per hero). */
function HeroMeta({ ctx, light = false }: { ctx: ServiceCtx; light?: boolean }) {
  const { brief, group } = ctx;
  return (
    <>
      <p className="eyebrow eyebrow-dot mb-6">
        <Link to="/uslugi" className="hover:text-ivory">
          Услуги
        </Link>{" "}
        · {group.title} · <span className="text-ember">{brief.identity}</span>
      </p>
      <h1
        className={`font-display uppercase leading-[1.05] ${light ? "text-ivory" : "text-ivory"}`}
        style={{ fontSize: "clamp(30px,5vw,76px)", letterSpacing: "0.02em" }}
      >
        {brief.headline}{" "}
        {brief.headlineAccent ? <span className="text-ember">{brief.headlineAccent}</span> : null}
      </h1>
      <p className="mt-8 max-w-[620px] text-[16px] leading-[1.9] text-mute">{brief.lede}</p>
    </>
  );
}

function Narrative({ ctx }: { ctx: ServiceCtx }) {
  return (
    <div className="space-y-6">
      {ctx.brief.narrative.map((p) => (
        <p key={p} className="text-[15.5px] leading-[1.95] text-mute">
          {p}
        </p>
      ))}
    </div>
  );
}

/* ─────────────────────── SYSTEM 1 · PPF — Invisible Engineering ─────────────────────── */
function PpfLayout({ ctx }: { ctx: ServiceCtx }) {
  const imgs = localShots(ctx);
  return (
    <div>
      {/* full-bleed cinematic hero, title bottom-left */}
      <section className="relative flex min-h-[78vh] items-end overflow-hidden border-b border-line">
        <div className="absolute inset-0 animate-drift">
          <img src={briefHero(ctx.s.slug)} alt={ctx.s.title} className="h-full w-full object-cover" />
        </div>
        <div className="absolute inset-0 plate-scrim" />
        <div className="relative z-10 mx-auto w-full max-w-[1400px] px-[6vw] pb-20 pt-40">
          <HeroMeta ctx={ctx} />
        </div>
      </section>

      {/* engineering spec ribbon */}
      <section className="border-b border-line bg-obsidian-2 px-[6vw] py-8">
        <div className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-between gap-6">
          <Facts s={ctx.s} />
          <PageNav />
        </div>
      </section>

      <Sec id="about">
        <div className="mx-auto max-w-[1280px]">
          <Rule label="Инженерия защиты" num="01" />
          <div className="grid gap-16 md:grid-cols-[1.15fr_0.85fr]">
            <div>
              <Narrative ctx={ctx} />
              <div className="mt-14">
                <ControlPoints ctx={ctx} />
              </div>
            </div>
            <div className="space-y-4">
              {imgs[0] ? (
                <div className="overflow-hidden bg-obsidian">
                  <img src={imgs[0]} alt="" className="aspect-[4/5] w-full object-cover" />
                </div>
              ) : null}
              <PriceCard s={ctx.s} floating={false} />
            </div>
          </div>
        </div>
      </Sec>

      {/* oversized technical metrics */}
      <Sec tone="obsidian-2">
        <div className="mx-auto max-w-[1280px]">
          <Rule label="Технические показатели" num="02" />
          <Metrics ctx={ctx} />
        </div>
      </Sec>

      {/* layer strip */}
      {imgs.length > 1 ? (
        <section className="grid md:grid-cols-3">
          {imgs.slice(1, 4).map((src, i) => (
            <div key={src} className="relative aspect-square overflow-hidden bg-obsidian">
              <img src={src} alt="" className="h-full w-full object-cover" />
              <span className="absolute left-4 top-4 font-display text-sm text-ivory/70">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
          ))}
        </section>
      ) : null}

      <Sec>
        <div className="mx-auto max-w-[1000px]">
          <HowToRead ctx={ctx} />
        </div>
      </Sec>

      <Sec tone="obsidian-2">
        <div className="mx-auto grid max-w-[1280px] gap-16 md:grid-cols-2">
          <Includes s={ctx.s} />
          <Care s={ctx.s} />
        </div>
      </Sec>

      <Sec id="fit">
        <Fit ctx={ctx} />
      </Sec>
      <Sec id="process">
        <ProcessSteps ctx={ctx} num="03" layout="timeline" />
      </Sec>
      <Sec id="examples" tone="obsidian-2">
        <Examples ctx={ctx} num="04" />
      </Sec>
      <Sec id="faq">
        <Faq ctx={ctx} num="05" />
      </Sec>
      <Sec id="zapis">
        <Booking ctx={ctx} />
      </Sec>
      <Sec tone="obsidian-2" className="px-[6vw] py-24">
        <Related ctx={ctx} />
      </Sec>
    </div>
  );
}

/* ─────────────────────── SYSTEM 2 · Colour — Fashion House ─────────────────────── */
function ColorLayout({ ctx }: { ctx: ServiceCtx }) {
  const imgs = localShots(ctx);
  return (
    <div>
      {/* split hero: type left, image right */}
      <section className="grid min-h-[76vh] border-b border-line md:grid-cols-2">
        <div className="flex flex-col justify-end px-[6vw] pb-16 pt-40">
          <HeroMeta ctx={ctx} />
        </div>
        <div className="relative min-h-[42vh] overflow-hidden">
          <img src={briefHero(ctx.s.slug)} alt={ctx.s.title} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-obsidian/60 to-transparent" />
        </div>
      </section>

      <section className="border-b border-line bg-obsidian-2 px-[6vw] py-8">
        <div className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-between gap-6">
          <Facts s={ctx.s} />
          <PageNav palette={ctx.s.palette} />
        </div>
      </section>

      {/* editorial two-column narrative */}
      <Sec id="about">
        <div className="mx-auto max-w-[1280px]">
          <Rule label="Материал и образ" num="01" />
          <div className="grid gap-16 md:grid-cols-[1fr_1fr]">
            <Narrative ctx={ctx} />
            <div>
              <HowToRead ctx={ctx} />
            </div>
          </div>
        </div>
      </Sec>

      {ctx.s.palette ? (
        <Sec id="palette" tone="obsidian-2">
          <Palette s={ctx.s} num="02" />
        </Sec>
      ) : null}

      {/* metric table row */}
      <Sec>
        <div className="mx-auto max-w-[1280px]">
          <Rule label="Характеристики" num={ctx.s.palette ? "03" : "02"} />
          <Metrics ctx={ctx} />
          <div className="mt-16 grid gap-16 md:grid-cols-[0.9fr_1.1fr]">
            <ControlPoints ctx={ctx} numbered={false} />
            <div className="space-y-4">
              {imgs.slice(0, 2).map((src) => (
                <div key={src} className="overflow-hidden bg-obsidian">
                  <img src={src} alt="" className="aspect-[16/10] w-full object-cover" />
                </div>
              ))}
              <PriceCard s={ctx.s} floating={false} />
            </div>
          </div>
        </div>
      </Sec>

      <Sec tone="obsidian-2">
        <div className="mx-auto grid max-w-[1280px] gap-16 md:grid-cols-2">
          <Includes s={ctx.s} />
          <Care s={ctx.s} />
        </div>
      </Sec>

      <Sec id="fit">
        <Fit ctx={ctx} />
      </Sec>
      <Sec id="process">
        <ProcessSteps ctx={ctx} num={ctx.s.palette ? "04" : "03"} />
      </Sec>
      <Sec id="examples" tone="obsidian-2">
        <Examples ctx={ctx} num={ctx.s.palette ? "05" : "04"} ratio="16/11" />
      </Sec>
      <Sec id="faq">
        <Faq ctx={ctx} num={ctx.s.palette ? "06" : "05"} />
      </Sec>
      <Sec id="zapis">
        <Booking ctx={ctx} />
      </Sec>
      <Sec tone="obsidian-2" className="px-[6vw] py-24">
        <Related ctx={ctx} />
      </Sec>
    </div>
  );
}

/* ─────────────────────── SYSTEM 3 · Body — Reflection Gallery ─────────────────────── */
function BodyLayout({ ctx }: { ctx: ServiceCtx }) {
  const imgs = localShots(ctx);
  return (
    <div>
      {/* centered minimal hero, then full-bleed image */}
      <section className="border-b border-line px-[6vw] pb-16 pt-40 text-center">
        <div className="mx-auto max-w-[1000px]">
          <HeroMeta ctx={ctx} />
        </div>
      </section>
      <section className="relative aspect-[21/9] overflow-hidden border-b border-line">
        <img
          src={briefHero(ctx.s.slug)}
          alt={ctx.s.title}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 plate-scrim opacity-40" />
      </section>

      <section className="border-b border-line bg-obsidian-2 px-[6vw] py-8">
        <div className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-between gap-6">
          <Facts s={ctx.s} />
          <PageNav />
        </div>
      </section>

      {/* metrics first — the "reflection" numbers */}
      <Sec id="about">
        <div className="mx-auto max-w-[1280px]">
          <Rule label="Результат в цифрах" num="01" />
          <Metrics ctx={ctx} />
          <div className="mt-16">
            <Narrative ctx={ctx} />
          </div>
        </div>
      </Sec>

      <Sec tone="obsidian-2">
        <div className="mx-auto grid max-w-[1280px] gap-16 md:grid-cols-[0.9fr_1.1fr]">
          <ControlPoints ctx={ctx} />
          <div className="space-y-4">
            {imgs[0] ? (
              <div className="overflow-hidden bg-obsidian">
                <img src={imgs[0]} alt="" className="aspect-[16/10] w-full object-cover" />
              </div>
            ) : null}
            <PriceCard s={ctx.s} floating={false} />
          </div>
        </div>
      </Sec>

      <Sec>
        <div className="mx-auto max-w-[1000px]">
          <HowToRead ctx={ctx} />
          <div className="mt-16 grid gap-16 md:grid-cols-2">
            <Includes s={ctx.s} />
            <Care s={ctx.s} />
          </div>
        </div>
      </Sec>

      <Sec id="fit" tone="obsidian-2">
        <Fit ctx={ctx} />
      </Sec>
      <Sec id="process">
        <ProcessSteps ctx={ctx} num="02" layout="timeline" />
      </Sec>
      <Sec id="examples" tone="obsidian-2">
        <Examples ctx={ctx} num="03" />
      </Sec>
      <Sec id="faq">
        <Faq ctx={ctx} num="04" />
      </Sec>
      <Sec id="zapis">
        <Booking ctx={ctx} />
      </Sec>
      <Sec tone="obsidian-2" className="px-[6vw] py-24">
        <Related ctx={ctx} />
      </Sec>
    </div>
  );
}

/* ─────────────────────── SYSTEM 4 · Coatings — Liquid Sculpture ─────────────────────── */
function CoatingsLayout({ ctx }: { ctx: ServiceCtx }) {
  const imgs = localShots(ctx);
  return (
    <div>
      {/* dark macro hero, content offset right */}
      <section className="relative flex min-h-[74vh] items-center overflow-hidden border-b border-line">
        <div className="absolute inset-0">
          <img src={briefHero(ctx.s.slug)} alt={ctx.s.title} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/50 to-obsidian/20" />
        </div>
        <div className="relative z-10 mx-auto w-full max-w-[1400px] px-[6vw] pt-32">
          <div className="md:ml-auto md:max-w-[620px]">
            <HeroMeta ctx={ctx} />
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-obsidian-2 px-[6vw] py-8">
        <div className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-between gap-6">
          <Facts s={ctx.s} />
          <PageNav />
        </div>
      </section>

      <Sec id="about">
        <div className="mx-auto max-w-[1280px]">
          <Rule label="Как работает покрытие" num="01" />
          <div className="grid gap-16 md:grid-cols-[1.1fr_0.9fr]">
            <div>
              <Narrative ctx={ctx} />
              <div className="mt-14">
                <HowToRead ctx={ctx} />
              </div>
            </div>
            <div className="space-y-4 md:sticky md:top-28 md:self-start">
              {imgs[0] ? (
                <div className="overflow-hidden bg-obsidian">
                  <img src={imgs[0]} alt="" className="aspect-square w-full object-cover" />
                </div>
              ) : null}
              <PriceCard s={ctx.s} floating={false} />
            </div>
          </div>
        </div>
      </Sec>

      <Sec tone="obsidian-2">
        <div className="mx-auto max-w-[1280px]">
          <Rule label="Показатели защиты" num="02" />
          <Metrics ctx={ctx} />
          <div className="mt-16 max-w-[720px]">
            <ControlPoints ctx={ctx} />
          </div>
        </div>
      </Sec>

      <Sec>
        <div className="mx-auto grid max-w-[1280px] gap-16 md:grid-cols-2">
          <Includes s={ctx.s} />
          <Care s={ctx.s} />
        </div>
      </Sec>

      <Sec id="fit" tone="obsidian-2">
        <Fit ctx={ctx} />
      </Sec>
      <Sec id="process">
        <ProcessSteps ctx={ctx} num="03" />
      </Sec>
      <Sec id="examples" tone="obsidian-2">
        <Examples ctx={ctx} num="04" ratio="1/1" />
      </Sec>
      <Sec id="faq">
        <Faq ctx={ctx} num="05" />
      </Sec>
      <Sec id="zapis">
        <Booking ctx={ctx} />
      </Sec>
      <Sec tone="obsidian-2" className="px-[6vw] py-24">
        <Related ctx={ctx} />
      </Sec>
    </div>
  );
}

/* ─────────────────────── SYSTEM 5 · Interior — Material Atelier ─────────────────────── */
function InteriorLayout({ ctx }: { ctx: ServiceCtx }) {
  const imgs = localShots(ctx);
  return (
    <div>
      {/* magazine-cover hero: image left, tall type right */}
      <section className="grid min-h-[74vh] border-b border-line md:grid-cols-[1.1fr_0.9fr]">
        <div className="relative min-h-[40vh] overflow-hidden">
          <img src={briefHero(ctx.s.slug)} alt={ctx.s.title} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-l from-obsidian/60 to-transparent" />
        </div>
        <div className="flex flex-col justify-end bg-obsidian-2 px-[6vw] pb-16 pt-40 md:px-12">
          <HeroMeta ctx={ctx} />
        </div>
      </section>

      <section className="border-b border-line px-[6vw] py-8">
        <div className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-between gap-6">
          <Facts s={ctx.s} />
          <PageNav />
        </div>
      </section>

      <Sec id="about" tone="obsidian-2">
        <div className="mx-auto max-w-[1280px]">
          <Rule label="Материалы и уход" num="01" />
          <div className="grid gap-16 md:grid-cols-[0.9fr_1.1fr]">
            <div className="space-y-4">
              {imgs[0] ? (
                <div className="overflow-hidden bg-obsidian">
                  <img src={imgs[0]} alt="" className="aspect-[4/5] w-full object-cover" />
                </div>
              ) : null}
            </div>
            <div>
              <Narrative ctx={ctx} />
              <div className="mt-14">
                <ControlPoints ctx={ctx} numbered={false} />
              </div>
            </div>
          </div>
        </div>
      </Sec>

      <Sec>
        <div className="mx-auto max-w-[1280px]">
          <Rule label="Показатели" num="02" />
          <Metrics ctx={ctx} />
        </div>
      </Sec>

      <Sec tone="obsidian-2">
        <div className="mx-auto grid max-w-[1280px] gap-16 md:grid-cols-[1.1fr_0.9fr]">
          <div>
            <HowToRead ctx={ctx} />
          </div>
          <div>
            <Includes s={ctx.s} />
            <div className="mt-12">
              <Care s={ctx.s} />
            </div>
            <div className="mt-12">
              <PriceCard s={ctx.s} floating={false} />
            </div>
          </div>
        </div>
      </Sec>

      <Sec id="fit">
        <Fit ctx={ctx} />
      </Sec>
      <Sec id="process" tone="obsidian-2">
        <ProcessSteps ctx={ctx} num="03" />
      </Sec>
      <Sec id="examples">
        <Examples ctx={ctx} num="04" />
      </Sec>
      <Sec id="faq" tone="obsidian-2">
        <Faq ctx={ctx} num="05" />
      </Sec>
      <Sec id="zapis">
        <Booking ctx={ctx} />
      </Sec>
      <Sec tone="obsidian-2" className="px-[6vw] py-24">
        <Related ctx={ctx} />
      </Sec>
    </div>
  );
}

/* ─────────────────────── SYSTEM 6 · Wash — Engineering Gallery ─────────────────────── */
function WashLayout({ ctx }: { ctx: ServiceCtx }) {
  return (
    <div>
      <section className="relative flex min-h-[70vh] items-end overflow-hidden border-b border-line">
        <div className="absolute inset-0">
          <img src={briefHero(ctx.s.slug)} alt={ctx.s.title} className="h-full w-full object-cover" />
          <div className="absolute inset-0 plate-scrim" />
        </div>
        <div className="relative z-10 mx-auto w-full max-w-[1400px] px-[6vw] pb-16 pt-40">
          <HeroMeta ctx={ctx} />
        </div>
      </section>

      <section className="border-b border-line bg-obsidian-2 px-[6vw] py-8">
        <div className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-between gap-6">
          <Facts s={ctx.s} />
          <PageNav />
        </div>
      </section>

      {/* technical two-column: narrative + control checklist */}
      <Sec id="about">
        <div className="mx-auto max-w-[1280px]">
          <Rule label="Технический разбор" num="01" />
          <div className="grid gap-16 md:grid-cols-2">
            <Narrative ctx={ctx} />
            <ControlPoints ctx={ctx} />
          </div>
        </div>
      </Sec>

      <Sec tone="obsidian-2">
        <div className="mx-auto max-w-[1280px]">
          <Metrics ctx={ctx} />
        </div>
      </Sec>

      <Sec>
        <div className="mx-auto grid max-w-[1280px] gap-16 md:grid-cols-[1.1fr_0.9fr]">
          <div>
            <HowToRead ctx={ctx} />
            <div className="mt-14">
              <Includes s={ctx.s} />
            </div>
          </div>
          <div>
            <Care s={ctx.s} />
            <div className="mt-12">
              <PriceCard s={ctx.s} floating={false} />
            </div>
          </div>
        </div>
      </Sec>

      <Sec id="fit" tone="obsidian-2">
        <Fit ctx={ctx} />
      </Sec>
      <Sec id="process">
        <ProcessSteps ctx={ctx} num="02" layout="timeline" />
      </Sec>
      <Sec id="examples" tone="obsidian-2">
        <Examples ctx={ctx} num="03" ratio="1/1" />
      </Sec>
      <Sec id="faq">
        <Faq ctx={ctx} num="04" />
      </Sec>
      <Sec id="zapis">
        <Booking ctx={ctx} />
      </Sec>
      <Sec tone="obsidian-2" className="px-[6vw] py-24">
        <Related ctx={ctx} />
      </Sec>
    </div>
  );
}

/* ─────────────────────── SYSTEM 7 · Anticor — Industrial Engineering ─────────────────────── */
function AnticorLayout({ ctx }: { ctx: ServiceCtx }) {
  return (
    <div>
      {/* blueprint-style hero: type over dark, thin frame */}
      <section className="relative flex min-h-[72vh] items-center overflow-hidden border-b border-line">
        <div className="absolute inset-0">
          <img src={briefHero(ctx.s.slug)} alt={ctx.s.title} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-obsidian via-obsidian/70 to-transparent" />
        </div>
        <div className="relative z-10 mx-auto w-full max-w-[1400px] px-[6vw] pt-28">
          <div className="max-w-[640px] border-l-2 border-ember pl-8">
            <HeroMeta ctx={ctx} />
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-obsidian-2 px-[6vw] py-8">
        <div className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-between gap-6">
          <Facts s={ctx.s} />
          <PageNav />
        </div>
      </section>

      {/* protection layer list */}
      <Sec id="about">
        <div className="mx-auto max-w-[1280px]">
          <Rule label="Слои защиты" num="01" />
          <div className="grid gap-16 md:grid-cols-[1fr_1fr]">
            <div>
              <Narrative ctx={ctx} />
              <div className="mt-14">
                <PriceCard s={ctx.s} floating={false} />
              </div>
            </div>
            <ControlPoints ctx={ctx} />
          </div>
        </div>
      </Sec>

      <Sec tone="obsidian-2">
        <div className="mx-auto max-w-[1280px]">
          <Rule label="Показатели защиты" num="02" />
          <Metrics ctx={ctx} />
        </div>
      </Sec>

      <Sec>
        <div className="mx-auto grid max-w-[1280px] gap-16 md:grid-cols-2">
          <HowToRead ctx={ctx} />
          <div>
            <Includes s={ctx.s} />
            <div className="mt-12">
              <Care s={ctx.s} />
            </div>
          </div>
        </div>
      </Sec>

      <Sec id="fit" tone="obsidian-2">
        <Fit ctx={ctx} />
      </Sec>
      <Sec id="process">
        <ProcessSteps ctx={ctx} num="03" />
      </Sec>
      <Sec id="examples" tone="obsidian-2">
        <Examples ctx={ctx} num="04" />
      </Sec>
      <Sec id="faq">
        <Faq ctx={ctx} num="05" />
      </Sec>
      <Sec id="zapis">
        <Booking ctx={ctx} />
      </Sec>
      <Sec tone="obsidian-2" className="px-[6vw] py-24">
        <Related ctx={ctx} />
      </Sec>
    </div>
  );
}

/* ─────────────────────── SYSTEM 8 · Glass — Optical Architecture ─────────────────────── */
function GlassLayout({ ctx }: { ctx: ServiceCtx }) {
  const imgs = localShots(ctx);
  return (
    <div>
      {/* architectural hero: type block over cool image, centered lower */}
      <section className="relative flex min-h-[74vh] items-end overflow-hidden border-b border-line">
        <div className="absolute inset-0 animate-drift">
          <img src={briefHero(ctx.s.slug)} alt={ctx.s.title} className="h-full w-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian to-transparent" />
        <div className="relative z-10 mx-auto w-full max-w-[1400px] px-[6vw] pb-16 pt-40 text-center">
          <div className="mx-auto max-w-[900px]">
            <HeroMeta ctx={ctx} />
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-obsidian-2 px-[6vw] py-8">
        <div className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-between gap-6">
          <Facts s={ctx.s} />
          <PageNav />
        </div>
      </section>

      {/* optic gallery strip */}
      {imgs.length ? (
        <section className="grid sm:grid-cols-2 lg:grid-cols-4">
          {imgs.slice(0, 4).map((src) => (
            <div key={src} className="relative aspect-[4/5] overflow-hidden bg-obsidian">
              <img src={src} alt="" className="h-full w-full object-cover" />
            </div>
          ))}
        </section>
      ) : null}

      <Sec id="about">
        <div className="mx-auto max-w-[1280px]">
          <Rule label="Свет и прозрачность" num="01" />
          <div className="grid gap-16 md:grid-cols-[1.1fr_0.9fr]">
            <div>
              <Narrative ctx={ctx} />
              <div className="mt-14">
                <ControlPoints ctx={ctx} numbered={false} />
              </div>
            </div>
            <div>
              <Metrics ctx={ctx} cols={1} />
              <div className="mt-8">
                <PriceCard s={ctx.s} floating={false} />
              </div>
            </div>
          </div>
        </div>
      </Sec>

      <Sec tone="obsidian-2">
        <div className="mx-auto max-w-[1000px]">
          <HowToRead ctx={ctx} />
          <div className="mt-16 grid gap-16 md:grid-cols-2">
            <Includes s={ctx.s} />
            <Care s={ctx.s} />
          </div>
        </div>
      </Sec>

      <Sec id="fit">
        <Fit ctx={ctx} />
      </Sec>
      <Sec id="process" tone="obsidian-2">
        <ProcessSteps ctx={ctx} num="02" />
      </Sec>
      <Sec id="examples">
        <Examples ctx={ctx} num="03" ratio="16/11" />
      </Sec>
      <Sec id="faq" tone="obsidian-2">
        <Faq ctx={ctx} num="04" />
      </Sec>
      <Sec id="zapis">
        <Booking ctx={ctx} />
      </Sec>
      <Sec tone="obsidian-2" className="px-[6vw] py-24">
        <Related ctx={ctx} />
      </Sec>
    </div>
  );
}

const LAYOUTS: Record<Service["group"], (p: { ctx: ServiceCtx }) => ReactNode> = {
  ppf: PpfLayout,
  color: ColorLayout,
  body: BodyLayout,
  coatings: CoatingsLayout,
  interior: InteriorLayout,
  wash: WashLayout,
  anticor: AnticorLayout,
  glass: GlassLayout,
};

export function ServiceExperience({ ctx }: { ctx: ServiceCtx }) {
  const Layout = LAYOUTS[ctx.s.group];
  return <Layout ctx={ctx} />;
}
