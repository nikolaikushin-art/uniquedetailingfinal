import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { VEHICLES } from "@/lib/vehicles";
import { carImage, lifestyleImage } from "@/lib/images";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const featured = VEHICLES.slice(0, 6);
  const collections = [
    { key: "Signature", title: "Signature", copy: "The permanent collection — a canon of quiet motorcars refined over generations." },
    { key: "Bespoke", title: "Bespoke Commissions", copy: "One client. One sketch. One motorcar. The house's most private work." },
    { key: "Black Ember", title: "Black Ember", copy: "Nightfall, expressed in obsidian lacquer and low-lustre metalwork." },
  ];

  return (
    <div>
      {/* HERO */}
      <section className="relative flex min-h-screen items-end overflow-hidden">
        <div
          className="absolute inset-0 animate-drift bg-cover bg-center"
          style={{ backgroundImage: `url(${carImage(0, 2400)})` }}
        />
        <div className="absolute inset-0 plate-scrim" />
        <div className="absolute inset-0 plate-scrim-top opacity-70" />

        <div className="relative z-10 mx-auto w-full max-w-[1400px] px-[6vw] pb-32 pt-40">
          <p className="eyebrow eyebrow-dot animate-fade-up">Maison Noir · Est. 1919</p>
          <h1
            className="mt-6 max-w-[1100px] font-display uppercase leading-[1.02] text-ivory animate-fade-up"
            style={{ fontSize: "clamp(46px,9vw,132px)", letterSpacing: "0.03em", animationDelay: ".1s" }}
          >
            A quieter kind
            <br />
            of prestige.
          </h1>
          <p className="mt-8 max-w-[540px] text-[16px] leading-[1.9] text-mute animate-fade-up" style={{ animationDelay: ".2s" }}>
            A private house of coachbuilt motorcars, bespoke commissions, chauffeur experiences
            and curated travel. Each automobile is drawn to a single client, unrepeated,
            unphotographed unless requested.
          </p>
          <div className="mt-12 flex flex-wrap gap-4 animate-fade-up" style={{ animationDelay: ".3s" }}>
            <Link to="/collection" className="btn-line">The Collection</Link>
            <Link to="/bespoke" className="btn-line btn-ember">Commission a Motorcar</Link>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3 text-[10px] uppercase tracking-[0.4em] text-mute-2">
          <span>Scroll</span>
          <span className="h-12 w-px bg-gradient-to-b from-mute-2 to-transparent" />
        </div>
      </section>

      {/* PROLOGUE */}
      <Section num="01" title="Prologue" heading="The house does not build motorcars. It answers letters.">
        <div className="grid gap-24 md:grid-cols-[0.9fr_1.1fr] md:items-center">
          <div className="relative aspect-[4/5] overflow-hidden">
            <img src={lifestyleImage(3, 1400)} alt="Atelier interior" className="h-full w-full object-cover" loading="lazy" />
          </div>
          <div className="space-y-6 text-[15.5px] leading-[1.95] text-mute">
            <p>
              Every commission begins with a conversation — never a specification. The house's
              designers travel to the client; they walk the estate, they visit the library,
              they listen. Only then does a first line appear on paper.
            </p>
            <p>
              The atelier delivers between eleven and eighteen motorcars each year. It has done
              so, at roughly this cadence, since 1919. The waiting list is long. It is not
              published.
            </p>
            <p>
              What follows is not a catalogue. It is a house journal — a record, in image and
              language, of a hundred years of quiet work.
            </p>
          </div>
        </div>
      </Section>

      {/* FEATURED FILM PANEL */}
      <section className="relative flex min-h-[92vh] items-center justify-center overflow-hidden border-y border-line">
        <div className="absolute inset-0 animate-drift bg-cover bg-center" style={{ backgroundImage: `url(${carImage(4, 2200)})` }} />
        <div className="absolute inset-0 bg-obsidian/60" />
        <div className="relative z-10 max-w-[760px] px-[6vw] text-center">
          <p className="eyebrow eyebrow-dot mb-6">A Film — Autumn 2026</p>
          <h2 className="font-display uppercase leading-[1.1] text-ivory" style={{ fontSize: "clamp(34px,5vw,60px)", letterSpacing: "0.06em" }}>
            Nocturne, in twelve coats of obsidian.
          </h2>
          <p className="mx-auto mt-6 max-w-[520px] text-[15.5px] leading-[1.9] text-mute">
            Nine weeks in the paint hall, filmed at half-speed, in a single continuous cut.
            A meditation on patience — the house's most abundant material.
          </p>
          <div className="mt-10">
            <Link to="/journal" className="btn-line btn-ember">View the Film</Link>
          </div>
        </div>
      </section>

      {/* FEATURED VEHICLES */}
      <Section num="02" title="The Collection" heading="Six motorcars, currently at delivery.">
        <div className="grid gap-[2px] bg-line md:grid-cols-3">
          {featured.map((v, i) => (
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
              <div className="relative z-10">
                <p className="eyebrow mb-3 text-mute-2">
                  {String(i + 1).padStart(2, "0")} · {v.collection}
                </p>
                <h3 className="font-display uppercase leading-tight text-ivory" style={{ fontSize: "26px", letterSpacing: "0.06em" }}>
                  {v.name}
                </h3>
                <p className="mt-3 max-w-[320px] text-[13.5px] leading-[1.7] text-mute">{v.tagline}</p>
                <span className="link-more mt-5">Discover</span>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-16 text-center">
          <Link to="/collection" className="btn-line">View all fifty motorcars</Link>
        </div>
      </Section>

      {/* COLLECTIONS TRIPTYCH */}
      <Section num="03" title="Houses" heading="Three collections, one atelier.">
        <div className="grid gap-[2px] bg-line md:grid-cols-3">
          {collections.map((c, i) => (
            <div key={c.key} className="relative aspect-[3/4] overflow-hidden bg-obsidian">
              <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${carImage(i * 7 + 2, 1400)})` }} />
              <div className="absolute inset-0 plate-scrim" />
              <div className="absolute inset-x-8 bottom-10 z-10">
                <p className="eyebrow mb-4 text-mute-2">Collection · {String(i + 1).padStart(2, "0")}</p>
                <h3 className="font-display text-3xl uppercase leading-tight text-ivory" style={{ letterSpacing: "0.05em" }}>
                  {c.title}
                </h3>
                <p className="mt-4 max-w-[320px] text-[14px] leading-[1.75] text-mute">{c.copy}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* SPLIT EDITORIAL — BESPOKE */}
      <section className="border-y border-line bg-obsidian-2">
        <div className="grid md:grid-cols-2">
          <div className="relative min-h-[70vh]">
            <img src={carImage(9, 1600)} alt="Bespoke commission" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
          </div>
          <div className="flex items-center px-[8vw] py-24">
            <div className="max-w-[500px]">
              <p className="eyebrow mb-6">Bespoke</p>
              <h2 className="font-display uppercase leading-tight text-ivory" style={{ fontSize: "clamp(32px,3.6vw,48px)", letterSpacing: "0.05em" }}>
                A commission takes eighteen months. We consider that a courtesy.
              </h2>
              <p className="mt-8 text-[15.5px] leading-[1.95] text-mute">
                Every bespoke motorcar begins in the north salon of the atelier — a room reserved
                for a single client at a time. What follows is a slow correspondence: sketches,
                material studies, colour trials in the paint hall's north light, and a hand-bound
                monograph documenting the build.
              </p>
              <div className="mt-10">
                <Link to="/bespoke" className="btn-line">Begin a Commission</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CRAFTSMANSHIP TIMELINE */}
      <Section num="04" title="Craftsmanship" heading="A single motorcar. Eighteen months. Six hundred hands.">
        <div className="mt-8 grid gap-[2px] bg-line md:grid-cols-4">
          {[
            ["Conversation", "Nine weeks", "The client is met — at home, at the atelier, or wherever the sketches must be drawn."],
            ["Drawing", "Twelve weeks", "First lines, first models, first material studies. Nothing is signed off in haste."],
            ["Laying-In", "Twenty-four weeks", "Bodywork is composed. Every panel is hammered, planished and hand-fettled."],
            ["Delivery", "By candlelight", "The final panel is signed by its master; the keys are given quietly, in a courtyard."],
          ].map(([t, dur, copy], i) => (
            <div key={t} className="bg-obsidian p-10">
              <p className="font-display text-2xl text-mute-2">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="mt-6 font-display text-2xl uppercase leading-tight text-ivory" style={{ letterSpacing: "0.05em" }}>{t}</h3>
              <p className="mt-2 text-[11px] uppercase tracking-[0.3em] text-ember">{dur}</p>
              <p className="mt-6 text-[14px] leading-[1.8] text-mute">{copy}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* QUOTE */}
      <section className="relative overflow-hidden border-y border-line py-40 text-center">
        <div className="absolute inset-0 bg-cover bg-center opacity-30" style={{ backgroundImage: `url(${lifestyleImage(6, 1800)})` }} />
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian via-obsidian/70 to-obsidian" />
        <blockquote className="relative z-10 mx-auto max-w-[900px] px-[6vw]">
          <p className="font-display uppercase leading-[1.2] text-ivory" style={{ fontSize: "clamp(28px,3.6vw,44px)", letterSpacing: "0.06em" }}>
            “Luxury is what remains when everything unnecessary has been quietly removed.”
          </p>
          <footer className="mt-10 text-[11px] uppercase tracking-[0.4em] text-mute">
            — Élise Cavelier, Founding Designer
          </footer>
        </blockquote>
      </section>

      {/* SERVICES GRID */}
      <Section num="05" title="The House" heading="A hundred years of quiet services.">
        <div className="grid border-l border-t border-line md:grid-cols-3">
          {SERVICES.map((s, i) => (
            <Link
              key={s.href}
              to={s.href}
              className="group relative border-b border-r border-line p-12 transition-colors hover:bg-white/[0.02]"
            >
              <span className="font-display text-xs uppercase tracking-[0.1em] text-mute-2">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-8 text-[22px] font-normal leading-tight text-ivory">{s.title}</h3>
              <p className="mt-4 max-w-[380px] text-[14.5px] leading-[1.85] text-mute">{s.copy}</p>
              <span className="link-more mt-6 inline-flex">Discover</span>
            </Link>
          ))}
        </div>
      </Section>

      {/* MARQUEE — cities */}
      <div className="overflow-hidden border-y border-line bg-obsidian-2 py-8">
        <div className="flex w-max animate-marquee gap-16 whitespace-nowrap font-display text-2xl uppercase tracking-[0.35em] text-mute-2">
          {[..."JURA · LONDON · KYOTO · MILAN · DUBAI · LOS ANGELES · PARIS · MONACO · GENEVA · NEW YORK · TOKYO · SHANGHAI".split(" · "), ...Array(2).fill(0)].map((c, i) => (
            <span key={i} className="opacity-70">{typeof c === "string" ? c : "·"}</span>
          ))}
          {"JURA · LONDON · KYOTO · MILAN · DUBAI · LOS ANGELES · PARIS · MONACO".split(" · ").map((c, i) => (
            <span key={"b" + i} className="opacity-70">{c}</span>
          ))}
        </div>
      </div>

      {/* JOURNAL PREVIEW (light) */}
      <section className="bg-parchment px-[6vw] py-32 text-ink">
        <div className="mx-auto max-w-[1280px]">
          <div className="mb-16 flex items-end justify-between gap-8 border-b border-ink-line pb-8">
            <div>
              <p className="eyebrow text-ink-mute">Journal</p>
              <h2 className="mt-4 font-display uppercase" style={{ fontSize: "clamp(30px,3.6vw,48px)", letterSpacing: "0.05em" }}>
                Recent dispatches from the atelier.
              </h2>
            </div>
            <Link to="/journal" className="btn-line !border-ink-line !text-ink hover:!bg-ink hover:!text-parchment">
              All entries
            </Link>
          </div>
          <div className="grid gap-8 md:grid-cols-4">
            {[
              ["Nine weeks in the paint hall", "Craft"],
              ["A conversation with the marqueteur", "Interiors"],
              ["Delivering a motorcar to a farmhouse in Umbria", "Owners"],
              ["Notes on silence, at 240 kilometres per hour", "Engineering"],
            ].map(([title, tag], i) => (
              <article key={title} className="group">
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img src={lifestyleImage(i + 2, 900)} alt="" className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105" loading="lazy" />
                </div>
                <p className="mt-6 text-[10px] uppercase tracking-[0.35em] text-ink-mute">{tag}</p>
                <h3 className="mt-3 font-display text-[18px] uppercase leading-tight" style={{ letterSpacing: "0.06em" }}>{title}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative border-y border-line px-[6vw] py-40 text-center">
        <h2 className="mx-auto max-w-[880px] font-display uppercase leading-tight text-ivory" style={{ fontSize: "clamp(30px,4.4vw,54px)", letterSpacing: "0.06em" }}>
          For those who consider silence the highest form of luxury.
        </h2>
        <p className="mx-auto mt-8 max-w-[520px] text-[15px] leading-[1.9] text-mute">
          Enquiries are received by private correspondence, and answered by the founding designer.
        </p>
        <div className="mt-12 flex flex-wrap justify-center gap-4">
          <Link to="/enquire" className="btn-line btn-ember">Write to the Maison</Link>
          <Link to="/concierge" className="btn-line">Meet the Concierge</Link>
        </div>
      </section>
    </div>
  );
}

const SERVICES = [
  { title: "Bespoke Commissions", copy: "A single motorcar drawn to a single client — the house's most private work.", href: "/bespoke" as const },
  { title: "The Atelier", copy: "Six hundred artisans across nine trades, in a valley in the Jura.", href: "/atelier" as const },
  { title: "Heritage & Provenance", copy: "A hundred years of records, retained for every motorcar the house has built.", href: "/heritage" as const },
  { title: "Concierge", copy: "A private line, answered by the master who signed your motorcar's final panel.", href: "/concierge" as const },
  { title: "Chauffeur", copy: "A trained team available in eleven cities. Immaculate discretion, guaranteed.", href: "/chauffeur" as const },
  { title: "Curated Experiences", copy: "Private drives, gastronomic residencies, closed circuits, and quiet Alpine mornings.", href: "/experiences" as const },
];

function Section({
  num,
  title,
  heading,
  children,
}: {
  num: string;
  title: string;
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <section className="px-[6vw] py-32 md:py-40">
      <div className="mx-auto max-w-[1280px]">
        <div className="mb-8 flex items-center gap-5">
          <span className="font-display text-[14px] tracking-[0.1em] text-mute-2">{num}</span>
          <span className="h-px flex-1 bg-line" />
          <span className="eyebrow">{title}</span>
        </div>
        <h2 className="mb-16 max-w-[860px] font-display uppercase leading-[1.1] text-ivory" style={{ fontSize: "clamp(30px,4vw,52px)", letterSpacing: "0.05em" }}>
          {heading}
        </h2>
        {children}
      </div>
    </section>
  );
}
