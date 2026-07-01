import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, Rule } from "@/components/site/PageHero";
import { lifestyleImage } from "@/lib/images";

export const Route = createFileRoute("/concierge")({
  head: () => ({ meta: [
    { title: "Concierge — Maison Noir" },
    { name: "description", content: "A private line, answered by the master who signed your motorcar's final panel." },
    { property: "og:image", content: lifestyleImage(4,1600) },
  ]}),
  component: ConciergePage,
});

const SERVICES: [string,string][] = [
  ["Private Correspondence","A private line, answered by the master who signed your motorcar's final panel."],
  ["Silent Service","Collection and return of the motorcar for its annual review, from any residence."],
  ["Roadbook","A quarterly hand-bound roadbook of routes, hotels, restaurants and vineyards."],
  ["Bespoke Luggage","Fitted luggage in matching hide, cut to your own travel case dimensions."],
  ["Family Ceremonies","Weddings, memorials, private launches. Motorcars, chauffeurs, and a photographer if requested."],
  ["Provenance Certificate","A hand-bound leather volume documenting every conversation of your commission."],
  ["The Jura Gathering","A yearly invitation to the atelier's private dinner in November."],
  ["Discreet Photography","A commissioned photographer, sworn to discretion."],
];

function ConciergePage() {
  return (
    <div>
      <PageHero mode="lifestyle" eyebrow="Concierge · Available in Eleven Cities" title={<>Answered by the master who signed your motorcar.</>} lede="A private line, held open for owners of the house, day and night." seed={4} />
      <section className="px-[6vw] py-32"><div className="mx-auto max-w-[1400px]">
        <Rule label="Services" num="01" />
        <div className="grid gap-[2px] bg-line md:grid-cols-2">
          {SERVICES.map(([t,c],i)=>(
            <div key={t} className="bg-obsidian p-10">
              <p className="font-display text-xl text-mute-2">{String(i+1).padStart(2,"0")}</p>
              <h3 className="mt-8 font-display text-2xl uppercase text-ivory" style={{letterSpacing:"0.06em"}}>{t}</h3>
              <p className="mt-4 max-w-[520px] text-[15px] leading-[1.85] text-mute">{c}</p>
            </div>
          ))}
        </div>
      </div></section>
      <section className="bg-obsidian-2 px-[6vw] py-32"><div className="mx-auto max-w-[1400px]">
        <Rule label="Cities" num="02" />
        <div className="grid gap-6 text-center md:grid-cols-4">
          {["Jura","London","Paris","Geneva","Milan","Monaco","Kyoto","Tokyo","Dubai","New York","Los Angeles","Shanghai"].map(c=>(
            <div key={c} className="border border-line px-4 py-10">
              <p className="font-display text-2xl uppercase text-ivory" style={{letterSpacing:"0.1em"}}>{c}</p>
              <p className="mt-2 text-[10px] uppercase tracking-[0.35em] text-mute-2">By private appointment</p>
            </div>
          ))}
        </div>
      </div></section>
      <section className="border-t border-line px-[6vw] py-32 text-center">
        <h2 className="mx-auto max-w-[720px] font-display uppercase leading-tight text-ivory" style={{fontSize:"clamp(28px,4vw,48px)",letterSpacing:"0.06em"}}>Speak to your Concierge.</h2>
        <div className="mt-10"><Link to="/enquire" className="btn-line btn-ember">Write to the Maison</Link></div>
      </section>
    </div>
  );
}