import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getWork, relatedWorks, type Work } from "@/lib/works";

export const Route = createFileRoute("/raboty/$slug")({
  loader: ({ params }): { work: Work; related: Work[] } => {
    const work = getWork(params.slug);
    if (!work) throw notFound();
    return { work, related: relatedWorks(params.slug, 3) };
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
      {/* HERO */}
      <section className="relative flex min-h-[92vh] items-center overflow-hidden border-b border-line">
        <div className="absolute inset-0 animate-drift bg-cover bg-center" style={{ backgroundImage: `url(${w.hero})` }} />
        <div className="absolute inset-0 plate-scrim" />
        <div className="relative z-10 mx-auto w-full max-w-[1400px] px-[6vw] pt-28">
          <p className="eyebrow eyebrow-dot mb-6">{w.category} · {w.city}</p>
          <h1 className="max-w-[1100px] font-display uppercase leading-[0.98] text-ivory" style={{ fontSize: "clamp(48px,9vw,140px)", letterSpacing: "0.03em" }}>
            {w.brand}
            <br />
            <span className="text-ember">{w.model}</span>
          </h1>
          <p className="mt-8 max-w-[600px] text-[16px] leading-[1.9] text-mute">{w.tagline}</p>
          <div className="mt-12 flex flex-wrap gap-8 border-t border-line pt-8 text-[11px] uppercase tracking-[0.3em] text-mute">
            <span><span className="text-mute-2 mr-3">Часов работы</span>{w.hours}</span>
            <span><span className="text-mute-2 mr-3">Плёнка</span>{w.film}</span>
            <span><span className="text-mute-2 mr-3">Срок</span>{w.duration}</span>
            <span><span className="text-mute-2 mr-3">Год</span>{w.year}</span>
          </div>
        </div>
      </section>

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

      {/* ГАЛЕРЕЯ — асимметричная */}
      <section className="bg-obsidian-2 px-[6vw] py-24">
        <div className="mx-auto grid max-w-[1400px] gap-4 md:grid-cols-3">
          <div className="relative aspect-[3/4] overflow-hidden md:col-span-2 md:aspect-[16/10]">
            <img src={w.gallery[0]} alt="" className="h-full w-full object-cover" loading="lazy" />
          </div>
          <div className="relative aspect-[3/4] overflow-hidden">
            <img src={w.gallery[1]} alt="" className="h-full w-full object-cover" loading="lazy" />
          </div>
          <div className="relative aspect-[4/5] overflow-hidden">
            <img src={w.gallery[2]} alt="" className="h-full w-full object-cover" loading="lazy" />
          </div>
          <div className="relative aspect-[4/5] overflow-hidden md:col-span-2">
            <img src={w.gallery[3]} alt="" className="h-full w-full object-cover" loading="lazy" />
          </div>
          <div className="relative aspect-[3/4] overflow-hidden md:col-span-2">
            <img src={w.gallery[4]} alt="" className="h-full w-full object-cover" loading="lazy" />
          </div>
          <div className="relative aspect-[3/4] overflow-hidden">
            <img src={w.gallery[5]} alt="" className="h-full w-full object-cover" loading="lazy" />
          </div>
        </div>
      </section>

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

      {/* МАТЕРИАЛЫ */}
      <section className="bg-obsidian-2 px-[6vw] py-32">
        <div className="mx-auto max-w-[1280px]">
          <div className="mb-16 flex items-center gap-5">
            <span className="font-display text-[14px] text-mute-2">03</span>
            <span className="h-px flex-1 bg-line" />
            <span className="eyebrow">Материалы и покрытия</span>
          </div>
          <div className="divide-y divide-line">
            {w.materials.map((m, i) => (
              <div key={m.name} className="grid gap-6 py-8 md:grid-cols-[60px_320px_1fr] md:items-start">
                <span className="font-display text-2xl text-ember">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="font-display text-xl uppercase text-ivory" style={{ letterSpacing: "0.05em" }}>{m.name}</h3>
                <p className="text-[15px] leading-[1.9] text-mute">{m.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

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

      {/* ПОХОЖИЕ РАБОТЫ */}
      <section className="bg-obsidian-2 px-[6vw] py-32">
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-16 flex items-end justify-between">
            <div>
              <p className="eyebrow">Похожие работы</p>
              <h2 className="mt-4 font-display uppercase text-ivory" style={{ fontSize: "clamp(24px,3vw,40px)", letterSpacing: "0.05em" }}>Ещё из портфолио</h2>
            </div>
            <Link to="/raboty" className="btn-line">Все работы</Link>
          </div>
          <div className="grid gap-[2px] bg-line md:grid-cols-3">
            {related.map(r => (
              <Link
                key={r.slug}
                to="/raboty/$slug"
                params={{ slug: r.slug }}
                className="group relative flex aspect-[4/5] flex-col justify-end overflow-hidden bg-obsidian p-8"
              >
                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-[1200ms] group-hover:scale-105" style={{ backgroundImage: `url(${r.hero})` }} />
                <div className="absolute inset-0 plate-scrim" />
                <div className="relative z-10">
                  <p className="eyebrow mb-3 text-mute-2">{r.category}</p>
                  <h3 className="font-display uppercase leading-tight text-ivory" style={{ fontSize: "22px", letterSpacing: "0.06em" }}>{r.brand}</h3>
                  <p className="mt-1 text-[14px] text-mute">{r.model}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

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
