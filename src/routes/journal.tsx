import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Rule } from "@/components/site/PageHero";
import { lifestyleImage } from "@/lib/images";

export const Route = createFileRoute("/journal")({
  head: () => ({ meta: [
    { title: "Journal — Maison Noir" },
    { name: "description", content: "Dispatches from the Maison Noir atelier — craft, interiors, engineering." },
    { property: "og:image", content: lifestyleImage(0,1600) },
  ]}),
  component: () => {
    const E: [string,string,string][] = [
      ["Nine weeks in the paint hall","Craft","A slow film about the twelve-coat lacquer process."],
      ["A conversation with the marqueteur","Interiors","Fifty years of quiet inlay work, told at a walnut bench in Kanazawa."],
      ["Delivering a motorcar to a farmhouse in Umbria","Owners","A dawn arrival, a candlelit ceremony."],
      ["Notes on silence, at 240 km/h","Engineering","The house's quiet-tune calibration."],
      ["The 1998 timber loft","Materials","Walnut that has waited a quarter-century."],
      ["Perfume for a cabin","Bespoke","Composing a personal fragrance with a Grasse perfumer."],
      ["The register","Archive","A leather-bound record kept since 1919."],
      ["A morning in the north salon","The House","Where the day begins — letters from clients read aloud."],
      ["The gilt master of Kanazawa","Craft","A workshop unchanged since 1962."],
      ["Corniche d'Azur — an owner's first summer","Owners","Six weeks in the south of France."],
      ["The paint hall at dawn","Craft","A photographic essay of the atelier's most private room."],
      ["Champagne silver","Materials","Registered in 1979, never sold outside the atelier."],
    ];
    const [f, ...rest] = E;
    return (
      <div>
        <PageHero mode="lifestyle" eyebrow="The Journal" title={<>Dispatches from a quiet house.</>} lede="An editorial of craft, interiors, engineering and ownership." seed={0} />
        <section className="px-[6vw] py-24"><div className="mx-auto max-w-[1400px] grid gap-16 md:grid-cols-[1.1fr_0.9fr] md:items-center">
          <div className="relative aspect-[4/3] overflow-hidden"><img src={lifestyleImage(0,1800)} alt="" className="h-full w-full object-cover" loading="lazy"/></div>
          <div>
            <p className="eyebrow mb-4">Featured Entry · {f[1]}</p>
            <h2 className="font-display uppercase leading-[1.1]" style={{fontSize:"clamp(28px,3.4vw,44px)",letterSpacing:"0.05em"}}>{f[0]}</h2>
            <p className="mt-8 text-[15.5px] leading-[1.95] text-mute">{f[2]}</p>
            <p className="mt-8 text-[10px] uppercase tracking-[0.4em] text-mute-2">Autumn 2026 · 12 minutes</p>
          </div>
        </div></section>
        <section className="bg-parchment px-[6vw] py-32 text-ink"><div className="mx-auto max-w-[1400px]">
          <Rule label="Recent Entries" num="02" />
          <div className="grid gap-10 md:grid-cols-3">
            {rest.map((e,i)=>(
              <article key={e[0]} className="group">
                <div className="relative aspect-[3/4] overflow-hidden"><img src={lifestyleImage(i+1,900)} alt="" className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105" loading="lazy"/></div>
                <p className="mt-6 text-[10px] uppercase tracking-[0.4em] text-ink-mute">{e[1]}</p>
                <h3 className="mt-3 font-display text-[18px] uppercase leading-tight" style={{letterSpacing:"0.06em"}}>{e[0]}</h3>
                <p className="mt-3 text-[13.5px] leading-[1.85] text-ink-mute">{e[2]}</p>
              </article>
            ))}
          </div>
        </div></section>
      </div>
    );
  },
});