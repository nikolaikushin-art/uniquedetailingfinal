import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Rule } from "@/components/site/PageHero";
import { carImage, lifestyleImage } from "@/lib/images";

export const Route = createFileRoute("/heritage")({
  head: () => ({ meta: [
    { title: "Heritage — Maison Noir" },
    { name: "description", content: "A hundred years of coachbuilt motorcars, records and provenance from the Maison Noir atelier." },
    { property: "og:image", content: carImage(6, 1600) },
  ]}),
  component: HeritagePage,
});

const CHAPTERS: [string,string,string][] = [
  ["1919","The Founding","Élise Cavelier and her brother open a two-master workshop in a converted Jura barn. Two motorcars leave the doors in the first year."],
  ["1928","The North Salon","A north-facing salon is built above the paint hall; commissions are first discussed in its silence, a tradition unchanged."],
  ["1937","The Vespertine","The first true bespoke commission — a landaulet ordered for evening use only."],
  ["1946","Restoration","The atelier reopens. The waiting list is honoured in the exact order it was written in 1939."],
  ["1962","Kanazawa","A satellite atelier is founded in Japan, dedicated to lacquerwork and marquetry."],
  ["1979","Champagne Silver","The house's own shade of low-lustre silver is registered — never sold outside the atelier."],
  ["1998","The Timber Loft","A hundred year supply of European walnut is laid down."],
  ["2019","Centenary","One hundred years. Fifty-two masters. Approximately 1,140 motorcars, each named by hand."],
];

function HeritagePage() {
  return (
    <div>
      <PageHero eyebrow="Since 1919" title={<>A hundred years of quiet.</>} lede="Every motorcar the Maison has ever built remains recorded, by hand, in a leather-bound register kept in the north salon." seed={6} />
      <section className="px-[6vw] py-32">
        <div className="mx-auto grid max-w-[1280px] gap-16 md:grid-cols-[0.9fr_1.1fr] md:items-center">
          <div className="relative aspect-[4/5] overflow-hidden"><img src={lifestyleImage(9,1400)} alt="" className="h-full w-full object-cover" loading="lazy"/></div>
          <div className="space-y-6 text-[15.5px] leading-[1.95] text-mute">
            <p className="eyebrow">Preface</p>
            <p>The house was founded on a single conviction — that the motorcar had become too loud, too fast, too eager to be seen — and that a quieter kind of prestige was worth restoring.</p>
            <p>A hundred years later, the atelier still holds to this. Its motorcars are drawn slowly. Its clients are met privately.</p>
          </div>
        </div>
      </section>
      <section className="bg-obsidian-2 px-[6vw] py-32">
        <div className="mx-auto max-w-[1400px]">
          <Rule label="Chronology" num="01" />
          {CHAPTERS.map(([year,title,copy],i)=>(
            <div key={year} className="grid gap-8 border-t border-line py-16 md:grid-cols-[160px_1fr_1fr] last:border-b">
              <div className="font-display text-4xl text-ember" style={{letterSpacing:"0.05em"}}>{year}</div>
              <div>
                <p className="eyebrow mb-3">Chapter {String(i+1).padStart(2,"0")}</p>
                <h3 className="font-display text-2xl uppercase leading-tight text-ivory" style={{letterSpacing:"0.06em"}}>{title}</h3>
              </div>
              <p className="text-[15px] leading-[1.9] text-mute">{copy}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="px-[6vw] py-32">
        <div className="mx-auto max-w-[1400px]">
          <Rule label="The Archive" num="02" />
          <div className="grid gap-4 md:grid-cols-4">
            {[0,3,7,11].map(s=>(
              <div key={s} className="relative aspect-[3/4] overflow-hidden">
                <img src={carImage(s,800)} alt="" className="h-full w-full object-cover" loading="lazy"/>
                <div className="absolute inset-0 plate-scrim"/>
                <p className="absolute bottom-6 left-6 text-[10px] uppercase tracking-[0.35em] text-mute">Plate {String(s+1).padStart(3,"0")}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}