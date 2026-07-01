import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getVehicle, relatedVehicles, VEHICLES, type Vehicle } from "@/lib/vehicles";
import { lifestyleImage } from "@/lib/images";

export const Route = createFileRoute("/vehicles/$slug")({
  loader: ({ params }) => {
    const v = getVehicle(params.slug);
    if (!v) throw notFound();
    return v;
  },
  head: ({ loaderData }) =>
    loaderData
      ? {
          meta: [
            { title: `${loaderData.name} — Maison Noir` },
            { name: "description", content: loaderData.tagline },
            { property: "og:title", content: `${loaderData.name} — Maison Noir` },
            { property: "og:description", content: loaderData.tagline },
            { property: "og:image", content: loaderData.hero },
            { name: "twitter:image", content: loaderData.hero },
          ],
        }
      : {},
  component: VehiclePage,
  notFoundComponent: () => (
    <div className="flex min-h-screen items-center justify-center text-center">
      <div>
        <h1 className="font-display text-3xl uppercase text-ivory">Motorcar not found</h1>
        <Link to="/collection" className="link-more mt-6">Back to the collection</Link>
      </div>
    </div>
  ),
});

function VehiclePage() {
  const v = Route.useLoaderData();
  const idx = VEHICLES.findIndex(x => x.slug === v.slug);
  const variant = idx % 4; // rotate layout composition per vehicle
  const related = relatedVehicles(v.slug, 3);

  return (
    <div>
      {/* CINEMATIC HERO */}
      <section className="relative flex min-h-screen items-end overflow-hidden">
        <div className="absolute inset-0 animate-drift bg-cover bg-center" style={{ backgroundImage: `url(${v.hero})` }} />
        <div className="absolute inset-0 plate-scrim" />
        <div className="relative z-10 mx-auto w-full max-w-[1400px] px-[6vw] pb-24 pt-40">
          <p className="eyebrow eyebrow-dot mb-6">
            {v.collection} · {v.line} · {v.year}
          </p>
          <h1 className="max-w-[1100px] font-display uppercase leading-[1.02] text-ivory" style={{ fontSize: "clamp(44px,8vw,124px)", letterSpacing: "0.03em" }}>
            {v.name}
          </h1>
          <p className="mt-8 max-w-[560px] text-[16px] leading-[1.9] text-mute">{v.tagline}</p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link to="/enquire" className="btn-line btn-ember">Enquire privately</Link>
            <Link to="/bespoke" className="btn-line">Commission a variant</Link>
          </div>
        </div>
      </section>

      {/* PROLOGUE / QUOTE — first paragraph pulled out large */}
      <section className="px-[6vw] py-32 md:py-40">
        <div className="mx-auto max-w-[1100px]">
          <p className="mb-10 text-[11px] uppercase tracking-[0.4em] text-mute-2">Prologue</p>
          <p className="font-display uppercase leading-[1.2] text-ivory" style={{ fontSize: "clamp(26px,3.4vw,44px)", letterSpacing: "0.05em" }}>
            {v.story[0]}
          </p>
        </div>
      </section>

      {/* VARIANT LAYOUTS — a different editorial composition per index */}
      {variant === 0 && <SplitStory v={v} />}
      {variant === 1 && <OverlapStory v={v} />}
      {variant === 2 && <FullBleedStory v={v} />}
      {variant === 3 && <TriptychStory v={v} />}

      {/* GALLERY — masonry-ish rotation */}
      <section className="border-y border-line bg-obsidian-2 px-[6vw] py-24">
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-12 flex items-end justify-between gap-6">
            <div>
              <p className="eyebrow">Gallery</p>
              <h2 className="mt-4 font-display uppercase" style={{ fontSize: "clamp(26px,3.2vw,42px)", letterSpacing: "0.05em" }}>
                Details, quietly considered.
              </h2>
            </div>
            <span className="hidden text-[11px] uppercase tracking-[0.3em] text-mute-2 md:block">
              Photographed at the atelier · {v.origin}
            </span>
          </div>
          <div className="grid gap-4 md:grid-cols-6 md:grid-rows-3">
            <img src={v.gallery[0]} alt="" className="md:col-span-4 md:row-span-2 h-full w-full object-cover aspect-[4/3]" loading="lazy" />
            <img src={v.gallery[1]} alt="" className="md:col-span-2 md:row-span-1 h-full w-full object-cover aspect-square" loading="lazy" />
            <img src={v.gallery[2]} alt="" className="md:col-span-2 md:row-span-1 h-full w-full object-cover aspect-square" loading="lazy" />
            <img src={v.gallery[3]} alt="" className="md:col-span-2 md:row-span-1 h-full w-full object-cover aspect-[3/2]" loading="lazy" />
            <img src={v.gallery[4]} alt="" className="md:col-span-2 md:row-span-1 h-full w-full object-cover aspect-[3/2]" loading="lazy" />
            <img src={v.gallery[5]} alt="" className="md:col-span-2 md:row-span-1 h-full w-full object-cover aspect-[3/2]" loading="lazy" />
          </div>
        </div>
      </section>

      {/* SPECIFICATIONS — parchment section for contrast */}
      <section className="bg-parchment px-[6vw] py-32 text-ink">
        <div className="mx-auto max-w-[1280px]">
          <div className="mb-12">
            <p className="eyebrow text-ink-mute">Specifications</p>
            <h2 className="mt-4 font-display uppercase" style={{ fontSize: "clamp(28px,3.4vw,44px)", letterSpacing: "0.05em" }}>
              A precise engineering, calmly stated.
            </h2>
          </div>
          <div className="grid border-l border-t border-ink-line md:grid-cols-4">
            {[
              ["Powertrain", v.specs.powertrain],
              ["Power", v.specs.power],
              ["Torque", v.specs.torque],
              ["0 – 100 km/h", v.specs.zeroToHundred],
              ["Top speed", v.specs.topSpeed],
              ["Kerb weight", v.specs.weight],
              ["Wheelbase", v.specs.wheelbase],
              ["Length", v.specs.length],
              ["Production", v.specs.productionRun],
              ["Origin", v.origin],
              ["First delivery", `${v.year}`],
              ["Price", v.specs.priceOnRequest],
            ].map(([k, val]) => (
              <div key={k} className="border-b border-r border-ink-line p-8">
                <p className="text-[10px] uppercase tracking-[0.35em] text-ink-mute">{k}</p>
                <p className="mt-4 font-display text-[26px] leading-tight text-ink" style={{ letterSpacing: "0.02em" }}>
                  {val}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MATERIALS */}
      <section className="px-[6vw] py-32">
        <div className="mx-auto max-w-[1280px]">
          <div className="mb-12 flex items-center gap-5">
            <span className="font-display text-[14px] text-mute-2">05</span>
            <span className="h-px flex-1 bg-line" />
            <span className="eyebrow">Materials & Craft</span>
          </div>
          <div className="grid gap-16 md:grid-cols-2">
            <div className="relative aspect-[4/5] overflow-hidden">
              <img src={lifestyleImage(idx + 3, 1400)} alt="Materials" className="h-full w-full object-cover" loading="lazy" />
            </div>
            <div>
              <h3 className="mb-10 font-display uppercase" style={{ fontSize: "clamp(28px,3.2vw,42px)", letterSpacing: "0.05em" }}>
                Five materials, each with its own biography.
              </h3>
              <ul>
                {v.materials.map((m: Vehicle["materials"][number], i: number) => (
                  <li key={m.name} className="flex gap-6 border-t border-line py-6 last:border-b">
                    <span className="w-8 flex-none font-display text-[15px] text-mute-2">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h4 className="mb-2 font-display text-[18px] uppercase text-ivory" style={{ letterSpacing: "0.06em" }}>{m.name}</h4>
                      <p className="text-[14.5px] leading-[1.85] text-mute">{m.note}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* QUOTE */}
      <section className="relative overflow-hidden border-y border-line py-32 text-center">
        <div className="absolute inset-0 bg-cover bg-center opacity-25" style={{ backgroundImage: `url(${v.gallery[2]})` }} />
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian via-obsidian/75 to-obsidian" />
        <blockquote className="relative z-10 mx-auto max-w-[900px] px-[6vw]">
          <p className="font-display uppercase leading-[1.2] text-ivory" style={{ fontSize: "clamp(26px,3.4vw,40px)", letterSpacing: "0.06em" }}>
            “{v.quote}”
          </p>
          <footer className="mt-8 text-[11px] uppercase tracking-[0.4em] text-mute">
            — from the {v.name} commissioning book
          </footer>
        </blockquote>
      </section>

      {/* BESPOKE OPTIONS */}
      <section className="bg-obsidian-2 px-[6vw] py-32">
        <div className="mx-auto max-w-[1280px]">
          <div className="mb-12">
            <p className="eyebrow">Bespoke</p>
            <h2 className="mt-4 font-display uppercase" style={{ fontSize: "clamp(28px,3.4vw,44px)", letterSpacing: "0.05em" }}>
              How this motorcar may be reimagined for you.
            </h2>
          </div>
          <div className="grid gap-[2px] bg-line md:grid-cols-3">
            {v.bespoke.map((b: string, i: number) => (
              <div key={i} className="bg-obsidian p-8">
                <p className="font-display text-2xl text-mute-2">{String(i + 1).padStart(2, "0")}</p>
                <p className="mt-6 text-[15px] leading-[1.8] text-ivory">{b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-[6vw] py-32">
        <div className="mx-auto max-w-[900px]">
          <p className="eyebrow mb-6">Frequently Considered</p>
          <h2 className="mb-12 font-display uppercase" style={{ fontSize: "clamp(28px,3.4vw,44px)", letterSpacing: "0.05em" }}>
            The questions we most often answer.
          </h2>
          <div>
            {v.faqs.map((f: Vehicle["faqs"][number], i: number) => (
              <details key={i} className="group border-t border-line py-6 last:border-b">
                <summary className="flex cursor-pointer items-center justify-between gap-8 font-display text-[18px] uppercase text-ivory transition-colors hover:text-ember" style={{ letterSpacing: "0.05em" }}>
                  <span>{f.q}</span>
                  <span className="text-mute-2 transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-6 max-w-[720px] text-[15px] leading-[1.9] text-mute">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ENQUIRY BANNER */}
      <section className="relative overflow-hidden border-y border-line px-[6vw] py-32 text-center">
        <div className="absolute inset-0 bg-cover bg-center opacity-30" style={{ backgroundImage: `url(${v.gallery[0]})` }} />
        <div className="absolute inset-0 bg-obsidian/80" />
        <div className="relative z-10">
          <h2 className="mx-auto max-w-[820px] font-display uppercase leading-tight text-ivory" style={{ fontSize: "clamp(28px,4vw,48px)", letterSpacing: "0.06em" }}>
            Enquire about {v.name}, or a variation of your own.
          </h2>
          <p className="mx-auto mt-6 max-w-[520px] text-[15px] leading-[1.9] text-mute">
            Correspondence is answered by the founding designer, in a matter of days.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link to="/enquire" className="btn-line btn-ember">Write to the Maison</Link>
            <Link to="/concierge" className="btn-line">Speak to Concierge</Link>
          </div>
        </div>
      </section>

      {/* RELATED */}
      <section className="px-[6vw] py-24">
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-10 flex items-center gap-5">
            <span className="eyebrow">Explore Further</span>
            <span className="h-px flex-1 bg-line" />
            <Link to="/collection" className="link-more">All motorcars</Link>
          </div>
          <div className="grid gap-[2px] bg-line md:grid-cols-3">
            {related.map(r => (
              <Link
                key={r.slug}
                to="/vehicles/$slug"
                params={{ slug: r.slug }}
                className="group relative flex aspect-[4/5] flex-col justify-end overflow-hidden bg-obsidian p-8"
              >
                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06]" style={{ backgroundImage: `url(${r.hero})` }} />
                <div className="absolute inset-0 plate-scrim" />
                <div className="relative z-10">
                  <p className="eyebrow mb-3 text-mute-2">{r.collection}</p>
                  <h3 className="font-display text-2xl uppercase text-ivory" style={{ letterSpacing: "0.06em" }}>{r.name}</h3>
                  <span className="link-more mt-5">Discover</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

/* ============================================================
 * Editorial layout variants — one used per vehicle by index
 * ============================================================ */

function SplitStory({ v }: { v: ReturnType<typeof getVehicle> & object }) {
  return (
    <section className="border-y border-line bg-obsidian-2">
      <div className="grid md:grid-cols-2">
        <div className="relative min-h-[70vh]">
          <img src={v.gallery[1]} alt="" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
        </div>
        <div className="flex items-center px-[8vw] py-24">
          <div className="max-w-[520px] space-y-6 text-[15.5px] leading-[1.95] text-mute">
            <p className="eyebrow mb-4">Chapter II · Composition</p>
            <p>{v.story[1]}</p>
            <p>{v.story[2]}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function OverlapStory({ v }: { v: ReturnType<typeof getVehicle> & object }) {
  return (
    <section className="relative px-[6vw] py-32">
      <div className="mx-auto grid max-w-[1400px] gap-16 md:grid-cols-[1.1fr_0.9fr]">
        <div className="relative">
          <img src={v.gallery[1]} alt="" className="aspect-[4/5] w-full object-cover" loading="lazy" />
          <img src={v.gallery[2]} alt="" className="absolute -bottom-16 -right-8 hidden aspect-[3/4] w-[42%] object-cover md:block" loading="lazy" />
        </div>
        <div className="md:pt-32 space-y-6 text-[15.5px] leading-[1.95] text-mute">
          <p className="eyebrow mb-4">Chapter II · An overlap of hand and material</p>
          <p>{v.story[1]}</p>
          <p>{v.story[2]}</p>
        </div>
      </div>
    </section>
  );
}

function FullBleedStory({ v }: { v: ReturnType<typeof getVehicle> & object }) {
  return (
    <>
      <div className="relative h-[80vh] overflow-hidden">
        <img src={v.gallery[1]} alt="" className="h-full w-full object-cover" loading="lazy" />
      </div>
      <section className="px-[6vw] py-32">
        <div className="mx-auto grid max-w-[1200px] gap-16 md:grid-cols-2">
          <div className="space-y-6 text-[15.5px] leading-[1.95] text-mute">
            <p className="eyebrow mb-4">Chapter II</p>
            <p>{v.story[1]}</p>
          </div>
          <div className="space-y-6 text-[15.5px] leading-[1.95] text-mute">
            <p className="eyebrow mb-4">Chapter III</p>
            <p>{v.story[2]}</p>
          </div>
        </div>
      </section>
    </>
  );
}

function TriptychStory({ v }: { v: ReturnType<typeof getVehicle> & object }) {
  return (
    <section className="border-y border-line bg-obsidian-2 px-[6vw] py-32">
      <div className="mx-auto grid max-w-[1400px] gap-6 md:grid-cols-3">
        {[v.gallery[1], v.gallery[2], v.gallery[3]].map((src, i) => (
          <div key={i} className="space-y-6">
            <div className="relative aspect-[3/4] overflow-hidden">
              <img src={src} alt="" className="h-full w-full object-cover" loading="lazy" />
            </div>
            <p className="text-[10px] uppercase tracking-[0.35em] text-mute-2">Panel {String(i + 1).padStart(2, "0")}</p>
            <p className="text-[15px] leading-[1.9] text-mute">
              {i === 0 ? v.story[1] : i === 1 ? v.story[2] : v.tagline}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}