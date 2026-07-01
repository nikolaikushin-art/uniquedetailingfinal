import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Rule } from "@/components/site/PageHero";
import { carImage, lifestyleImage } from "@/lib/images";

export const Route = createFileRoute("/atelier")({
  head: () => ({ meta: [
    { title: "The Atelier — Maison Noir" },
    { name: "description", content: "Six hundred artisans across nine trades, in a valley in the Jura." },
    { property: "og:image", content: carImage(11,1600) },
  ]}),
  component: AtelierPage,
});

const TRADES: [string,string,string][] = [
  ["Body Masters","1,140 hrs / motorcar","Hand-planishing, panel forming, seam-fettling."],
  ["Marqueteurs","180 hrs / motorcar","Timber, mother-of-pearl and metal inlay work."],
  ["Silversmiths","220 hrs / motorcar","Guilloché switchgear and engine-turned fascias."],
  ["Upholsterers","410 hrs / motorcar","Hand-cut leather, wool piping, hand-stitched carpets."],
  ["Paint Hall","460 hrs / motorcar","Twelve-coat lacquer laid under north light."],
  ["Engineers","1,020 hrs / motorcar","Chassis, powertrain, quiet-tune calibration."],
  ["Lacquerers (Kanazawa)","310 hrs / motorcar","Urushi and gilt work for interior surfaces."],
  ["Perfumers (Grasse)","35 hrs / motorcar","A personal cabin fragrance."],
  ["Bookbinders","50 hrs / motorcar","A hand-bound monograph of every commission."],
];

function AtelierPage() {
  return (
    <div>
      <PageHero eyebrow="The Atelier · Jura, Switzerland" title={<>A valley of six hundred masters.</>} lede="Nine trades, one converted farmhouse, and a hundred years of uninterrupted practice." seed={11} />
      <section className="px-[6vw] py-32"><div className="mx-auto max-w-[1400px]">
        <Rule label="The Trades" num="01" />
        <div className="grid gap-[2px] bg-line md:grid-cols-3">
          {TRADES.map(([name,hrs,copy],i)=>(
            <div key={name} className="bg-obsidian p-10">
              <p className="font-display text-2xl text-mute-2">{String(i+1).padStart(2,"0")}</p>
              <h3 className="mt-8 font-display text-xl uppercase text-ivory" style={{letterSpacing:"0.06em"}}>{name}</h3>
              <p className="mt-3 text-[11px] uppercase tracking-[0.3em] text-ember">{hrs}</p>
              <p className="mt-6 text-[14.5px] leading-[1.85] text-mute">{copy}</p>
            </div>
          ))}
        </div>
      </div></section>
      <section className="bg-obsidian-2 px-[6vw] py-32"><div className="mx-auto grid max-w-[1400px] gap-4 md:grid-cols-3">
        {[0,2,4,6,8,10].map(s=>(
          <div key={s} className="relative aspect-[4/5] overflow-hidden">
            <img src={lifestyleImage(s,900)} alt="" className="h-full w-full object-cover" loading="lazy"/>
            <div className="absolute inset-0 plate-scrim"/>
            <p className="absolute bottom-6 left-6 text-[10px] uppercase tracking-[0.35em] text-ivory">Workshop {String(s+1).padStart(2,"0")}</p>
          </div>
        ))}
      </div></section>
      <section className="px-[6vw] py-32"><div className="mx-auto max-w-[1000px]">
        <Rule label="A Day at the Atelier" num="02" />
        {[["06:20","The paint hall's north light is checked. Coat 7 and above is inspected."],
          ["08:00","Morning correspondence is read aloud in the north salon."],
          ["11:30","Master reviews. Every active commission is signed off for the previous day."],
          ["14:00","The atelier lunch, in the timber refectory, under the 1962 chandelier."],
          ["17:00","The delivery courtyard is prepared, or emptied. One delivery every 24 days."],
          ["19:40","The register is locked. The paint hall stands quiet."]].map(([t,n],i)=>(
          <div key={i} className="grid gap-6 border-t border-line py-6 md:grid-cols-[120px_1fr] last:border-b">
            <div className="font-display text-2xl text-ember">{t}</div>
            <p className="text-[15px] leading-[1.85] text-mute">{n}</p>
          </div>
        ))}
      </div></section>
    </div>
  );
}