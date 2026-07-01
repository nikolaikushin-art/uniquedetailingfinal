import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHero } from "@/components/site/PageHero";

export const Route = createFileRoute("/enquire")({
  head: () => ({ meta: [
    { title: "Private Enquiry — Maison Noir" },
    { name: "description", content: "Write to the Maison. Every letter is read by the founding designer." },
  ]}),
  component: EnquirePage,
});

function EnquirePage() {
  const [sent, setSent] = useState(false);
  return (
    <div>
      <PageHero mode="lifestyle" eyebrow="Private Correspondence" title={<>Write to the Maison.</>} lede="Every letter is read by the founding designer, and answered by hand within a fortnight." seed={2} />
      <section className="px-[6vw] py-32"><div className="mx-auto grid max-w-[1200px] gap-24 md:grid-cols-[0.9fr_1.1fr]">
        <aside className="space-y-10 text-[15px] leading-[1.9] text-mute">
          <div><p className="eyebrow mb-4">Salon</p><p className="text-ivory">Jura Valley, Switzerland</p><p>By appointment only.</p></div>
          <div><p className="eyebrow mb-4">Correspondence</p><p>concierge@maisonnoire.example</p><p>+41 21 000 0000</p></div>
          <div><p className="eyebrow mb-4">Response</p><p>Within fourteen days.</p></div>
          <div><p className="eyebrow mb-4">Discretion</p><p>No enquiry is discussed outside the north salon.</p></div>
        </aside>
        <form onSubmit={e=>{e.preventDefault();setSent(true);}} className="space-y-8 border border-line bg-obsidian-2 p-10">
          {sent ? (
            <div className="flex min-h-[300px] flex-col items-center justify-center text-center">
              <p className="eyebrow mb-6">Received</p>
              <p className="font-display text-2xl uppercase text-ivory" style={{letterSpacing:"0.05em"}}>Thank you. Your letter is on the founding designer's desk.</p>
              <p className="mt-6 max-w-[420px] text-[14.5px] text-mute">A reply will follow, by hand, within a fortnight.</p>
            </div>
          ) : (
            <>
              {[["Name","name","text"],["Country of residence","country","text"],["Email","email","email"],["Telephone (discreet)","phone","tel"]].map(([l,n,t])=>(
                <div key={n}>
                  <label htmlFor={n} className="mb-3 block text-[10px] uppercase tracking-[0.35em] text-mute-2">{l}</label>
                  <input id={n} name={n} type={t} className="w-full border-b border-line bg-transparent p-3 text-ivory outline-none focus:border-ivory"/>
                </div>
              ))}
              <div>
                <label className="mb-3 block text-[10px] uppercase tracking-[0.35em] text-mute-2">Interest</label>
                <select className="w-full border border-line bg-transparent p-4 text-ivory outline-none focus:border-ivory">
                  {["A Signature motorcar","A Bespoke commission","A Black Ember piece","Concierge or Chauffeur","A Curated Experience","Other correspondence"].map(o=>(
                    <option key={o} className="bg-obsidian">{o}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-3 block text-[10px] uppercase tracking-[0.35em] text-mute-2">Your letter</label>
                <textarea rows={6} className="w-full border border-line bg-transparent p-4 text-ivory outline-none focus:border-ivory" placeholder="Please write freely. Nothing is required."/>
              </div>
              <button type="submit" className="btn-line btn-ember">Send correspondence</button>
            </>
          )}
        </form>
      </div></section>
    </div>
  );
}