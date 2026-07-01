import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { VEHICLES } from "@/lib/vehicles";
import { carImage } from "@/lib/images";

export const Route = createFileRoute("/collection")({
  head: () => ({
    meta: [
      { title: "The Collection — Maison Noir" },
      { name: "description", content: "Fifty ultra-luxury motorcars — Signature, Bespoke and Black Ember collections from the Maison Noir atelier." },
      { property: "og:title", content: "The Collection — Maison Noir" },
      { property: "og:description", content: "Fifty motorcars, each drawn to a single client. Signature, Bespoke, and Black Ember." },
      { property: "og:image", content: `https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=1600` },
    ],
  }),
  component: CollectionPage,
});

const FILTERS = ["All", "Signature", "Bespoke", "Black Ember"] as const;

function CollectionPage() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const list = useMemo(
    () => (filter === "All" ? VEHICLES : VEHICLES.filter(v => v.collection === filter)),
    [filter],
  );

  return (
    <div>
      {/* HERO */}
      <section className="relative flex min-h-[70vh] items-end overflow-hidden border-b border-line pt-40 pb-24">
        <div className="absolute inset-0 animate-drift bg-cover bg-center opacity-70" style={{ backgroundImage: `url(${carImage(2, 2200)})` }} />
        <div className="absolute inset-0 plate-scrim" />
        <div className="relative z-10 mx-auto w-full max-w-[1400px] px-[6vw]">
          <p className="eyebrow eyebrow-dot mb-6">The Collection</p>
          <h1 className="max-w-[1100px] font-display uppercase leading-[1.02] text-ivory" style={{ fontSize: "clamp(46px,8vw,120px)", letterSpacing: "0.03em" }}>
            Fifty motorcars.
            <br />One conversation each.
          </h1>
          <p className="mt-8 max-w-[540px] text-[16px] leading-[1.9] text-mute">
            An editorial register of the current collection — Signature pieces, private
            commissions, and the house's Black Ember nightfall series. Each is at some stage
            of delivery.
          </p>
        </div>
      </section>

      {/* FILTERS */}
      <div className="border-b border-line bg-obsidian-2 px-[6vw]">
        <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-6 py-6">
          <div className="flex flex-wrap gap-2">
            {FILTERS.map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`border px-6 py-3 text-[11px] uppercase tracking-[0.32em] transition-colors ${
                  filter === f
                    ? "border-ivory bg-ivory text-obsidian"
                    : "border-line-strong text-mute hover:text-ivory"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
          <span className="text-[11px] uppercase tracking-[0.3em] text-mute-2">
            {list.length} motorcars
          </span>
        </div>
      </div>

      {/* GRID */}
      <section className="px-[6vw] py-24">
        <div className="mx-auto max-w-[1400px] grid gap-[2px] bg-line sm:grid-cols-2 lg:grid-cols-3">
          {list.map((v, i) => (
            <Link
              key={v.slug}
              to="/vehicles/$slug"
              params={{ slug: v.slug }}
              className="group relative flex aspect-[4/5] flex-col justify-end overflow-hidden bg-obsidian p-8"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06]"
                style={{ backgroundImage: `url(${v.hero})` }}
              />
              <div className="absolute inset-0 plate-scrim" />
              <div className="absolute left-6 top-6 z-10 text-[10px] uppercase tracking-[0.35em] text-mute">
                {String(i + 1).padStart(2, "0")} · {v.line}
              </div>
              <div className="relative z-10">
                <p className="eyebrow mb-3 text-mute-2">{v.collection}</p>
                <h3 className="font-display uppercase leading-tight text-ivory" style={{ fontSize: "22px", letterSpacing: "0.06em" }}>
                  {v.name}
                </h3>
                <p className="mt-3 max-w-[300px] text-[13px] leading-[1.7] text-mute line-clamp-2">
                  {v.tagline}
                </p>
                <span className="link-more mt-5">Discover</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}