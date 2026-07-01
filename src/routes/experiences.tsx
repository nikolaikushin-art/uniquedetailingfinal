import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, Rule } from "@/components/site/PageHero";
import { carImage } from "@/lib/images";

export const Route = createFileRoute("/experiences")({
  head: () => ({ meta: [
    { title: "Experiences — Maison Noir" },
    { name: "description", content: "Curated private drives, gastronomic residencies and Alpine mornings." },
    { property: "og:image", content: carImage(10,1600) },
  ]}),
  component: () => {
    const XP: [string,string,string][] = [
      ["The Jura Gathering","November · Two nights","A private dinner at the atelier, followed by a dawn drive across the Jura."],
      ["A Corniche Weekend","May – September","Three days along the French Riviera in a Signature cabriolet."],
      ["Kanazawa in Autumn","October · Six nights","A residency at the Maison's lacquerworks with private tea ceremonies."],
      ["Alpine Mornings","January – March","Closed-road driving on Alpine passes at dawn."],
      ["The Umbrian Table","September · Four nights","A gastronomic residency in a private farmhouse."],
      ["A London Season","Spring","Opera, private galleries and Mayfair dinners on private retainer."],
      ["Highlands & Whisky","March · Three nights","A drive across the Cairngorms with a single-cask tasting."],
      ["A Kyoto Winter","January · Five nights","Private temple viewings and a driven journey at first light."],
    ];
    return (
      <div>
        <PageHero eyebrow="Curated Experiences" title={<>Drives, residencies, and quiet evenings.</>} lede="Private programmes arranged only for owners of the Maison, and their guests." seed={10} />
        <section className="px-[6vw] py-32"><div className="mx-auto max-w-[1400px]">
          <Rule label="All Programmes" num="01" />
          <div className="grid gap-[2px] bg-line md:grid-cols-2">
            {XP.map(([t,w,c],i)=>(
              <div key={t} className="group relative min-h-[420px] overflow-hidden bg-obsidian">
                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-[1200ms] group-hover:scale-[1.06]" style={{backgroundImage:`url(${carImage(i*2+3,1400)})`}}/>
                <div className="absolute inset-0 plate-scrim"/>
                <div className="relative z-10 flex h-full flex-col justify-end p-10">
                  <p className="eyebrow mb-3 text-mute-2">{String(i+1).padStart(2,"0")}</p>
                  <h3 className="font-display text-3xl uppercase text-ivory" style={{letterSpacing:"0.06em"}}>{t}</h3>
                  <p className="mt-3 text-[11px] uppercase tracking-[0.3em] text-ember">{w}</p>
                  <p className="mt-5 max-w-[440px] text-[14.5px] leading-[1.85] text-mute">{c}</p>
                </div>
              </div>
            ))}
          </div>
        </div></section>
        <section className="border-t border-line px-[6vw] py-32 text-center">
          <h2 className="mx-auto max-w-[720px] font-display uppercase leading-tight text-ivory" style={{fontSize:"clamp(28px,4vw,48px)",letterSpacing:"0.06em"}}>Enquire about the season's programmes.</h2>
          <div className="mt-10"><Link to="/enquire" className="btn-line btn-ember">Request the Season Book</Link></div>
        </section>
      </div>
    );
  },
});