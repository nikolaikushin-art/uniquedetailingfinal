import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, Rule } from "@/components/site/PageHero";
import { lifestyleImage, carImage } from "@/lib/images";

export const Route = createFileRoute("/bespoke")({
  head: () => ({ meta: [
    { title: "Bespoke Commissions — Maison Noir" },
    { name: "description", content: "The eighteen-month commissioning journey at the Maison Noir atelier." },
    { property: "og:image", content: carImage(8,1600) },
  ]}),
  component: BespokePage,
});

const STAGES: [string,string,string,string][] = [
  ["01","The Correspondence","Weeks 1–4","A letter is written to the founding designer. It is answered within a fortnight."],
  ["02","The Conversation","Weeks 5–13","Nine weeks of unhurried conversation, at your estate or in the north salon."],
  ["03","First Lines","Weeks 14–25","Sketches emerge. A material palette is composed. A monograph of references is presented."],
  ["04","The Model","Weeks 26–35","A quarter-scale clay is hand-shaped and presented under north light."],
  ["05","Laying-In","Weeks 36–66","Body panels are hammered, planished and hand-fettled by a single master."],
  ["06","The Interior","Weeks 40–72","Upholsterer, marqueteur, silversmith and perfumer are brought in one at a time."],
  ["07","The Paint Hall","Weeks 60–68","Twelve coats of hand-mixed lacquer over nine weeks. The tin, once emptied, is returned to you sealed."],
  ["08","Delivery","Week 78, by candlelight","The master who signed the final panel delivers the motorcar personally, wherever you wish."],
];

function BespokePage() {
  return (
    <div>
      <PageHero eyebrow="Bespoke · By Correspondence" title={<>Eighteen months.<br/>Six hundred hands. One motorcar.</>} lede="A commission is not ordered. It is corresponded into being." seed={8} />
      <section className="px-[6vw] py-32"><div className="mx-auto max-w-[900px] text-center">
        <p className="eyebrow mb-6">Prologue</p>
        <p className="font-display uppercase leading-[1.2] text-ivory" style={{fontSize:"clamp(24px,3vw,38px)",letterSpacing:"0.06em"}}>Every motorcar begins with a letter, and ends with a handshake in a courtyard at dawn.</p>
      </div></section>
      <section className="bg-obsidian-2 px-[6vw] py-32"><div className="mx-auto max-w-[1280px]">
        <Rule label="The Commissioning Journey" num="01" />
        {STAGES.map(([num,title,dur,copy])=>(
          <div key={num} className="grid gap-10 border-t border-line py-14 md:grid-cols-[80px_260px_1fr] md:items-start last:border-b">
            <div className="font-display text-4xl text-mute-2">{num}</div>
            <div>
              <h3 className="font-display text-2xl uppercase leading-tight text-ivory" style={{letterSpacing:"0.06em"}}>{title}</h3>
              <p className="mt-3 text-[11px] uppercase tracking-[0.3em] text-ember">{dur}</p>
            </div>
            <p className="text-[15px] leading-[1.9] text-mute">{copy}</p>
          </div>
        ))}
      </div></section>
      <section className="px-[6vw] py-32"><div className="mx-auto max-w-[1400px]">
        <Rule label="The Material Library" num="02" />
        <div className="grid gap-4 md:grid-cols-4">
          {["Leather","Timber","Metal","Textile"].map((k,i)=>(
            <div key={k} className="relative aspect-[3/4] overflow-hidden">
              <img src={lifestyleImage(i+4,900)} alt="" className="h-full w-full object-cover" loading="lazy"/>
              <div className="absolute inset-0 plate-scrim"/>
              <div className="absolute inset-x-6 bottom-6">
                <p className="eyebrow mb-3 text-mute-2">Library · {String(i+1).padStart(2,"0")}</p>
                <h3 className="font-display text-xl uppercase text-ivory" style={{letterSpacing:"0.06em"}}>{k}</h3>
              </div>
            </div>
          ))}
        </div>
      </div></section>
      <section className="border-y border-line px-[6vw] py-32 text-center">
        <h2 className="mx-auto max-w-[820px] font-display uppercase leading-tight text-ivory" style={{fontSize:"clamp(28px,4vw,48px)",letterSpacing:"0.06em"}}>Begin a commission, or begin a conversation about one.</h2>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link to="/enquire" className="btn-line btn-ember">Write to the Maison</Link>
          <Link to="/atelier" className="btn-line">Visit the Atelier</Link>
        </div>
      </section>
    </div>
  );
}