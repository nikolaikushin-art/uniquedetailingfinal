import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, Rule } from "@/components/site/PageHero";
import { carImage } from "@/lib/images";

export const Route = createFileRoute("/chauffeur")({
  head: () => ({ meta: [
    { title: "Chauffeur — Maison Noir" },
    { name: "description", content: "A trained team of chauffeurs available in eleven cities. Immaculate discretion, always." },
    { property: "og:image", content: carImage(3,1600) },
  ]}),
  component: () => (
    <div>
      <PageHero eyebrow="Chauffeur · By Private Arrangement" title={<>Driven with discretion. Always.</>} lede="Every chauffeur trained at the Maison is a former artisan. They know the motorcars as intimately as the road." seed={3} />
      <section className="px-[6vw] py-32"><div className="mx-auto max-w-[1400px]">
        <Rule label="Services" num="01" />
        <div className="grid gap-[2px] bg-line md:grid-cols-2">
          {[["Airport Transfers","Discreet meet-and-drive between private terminals and residences."],
            ["Diplomatic & Executive","Full-day, multi-day and residency retainers."],
            ["Weddings & Ceremonies","A pair of matched motorcars and hand-written itinerary."],
            ["Long-Distance Touring","Multi-day drives with hotels from the Maison's Roadbook."],
            ["Circuits & Private Roads","Closed circuits and Alpine passes with senior masters."],
            ["Cultural Programmes","Opera, private collections, gastronomic residencies."]].map(([t,c],i)=>(
            <div key={t} className="bg-obsidian p-10">
              <p className="font-display text-xl text-mute-2">{String(i+1).padStart(2,"0")}</p>
              <h3 className="mt-8 font-display text-xl uppercase text-ivory" style={{letterSpacing:"0.06em"}}>{t}</h3>
              <p className="mt-4 text-[14.5px] leading-[1.85] text-mute">{c}</p>
            </div>
          ))}
        </div>
      </div></section>
      <section className="border-t border-line px-[6vw] py-32 text-center">
        <h2 className="mx-auto max-w-[720px] font-display uppercase leading-tight text-ivory" style={{fontSize:"clamp(28px,4vw,48px)",letterSpacing:"0.06em"}}>Request a chauffeured evening.</h2>
        <div className="mt-10"><Link to="/enquire" className="btn-line btn-ember">Arrange Privately</Link></div>
      </section>
    </div>
  ),
});