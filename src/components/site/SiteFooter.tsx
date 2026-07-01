import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="bg-obsidian-2 px-[6vw] pt-24 pb-10">
      <div className="grid gap-12 border-b border-line pb-16 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <div className="mb-6 font-display text-2xl uppercase tracking-[0.35em] text-ivory">
            Maison Noir
          </div>
          <p className="max-w-[320px] text-[14.5px] leading-[1.85] text-mute">
            A private house of coachbuilt motorcars, bespoke commissions and quietly extraordinary
            experiences. By appointment only, in six cities.
          </p>
        </div>
        <FooterCol
          title="Maison"
          items={[
            { to: "/", label: "Home" },
            { to: "/heritage", label: "Heritage" },
            { to: "/atelier", label: "Atelier" },
            { to: "/journal", label: "Journal" },
          ]}
        />
        <FooterCol
          title="Motorcars"
          items={[
            { to: "/collection", label: "The Collection" },
            { to: "/bespoke", label: "Bespoke" },
            { to: "/experiences", label: "Experiences" },
            { to: "/chauffeur", label: "Chauffeur" },
          ]}
        />
        <FooterCol
          title="Contact"
          items={[
            { to: "/enquire", label: "Private Enquiry" },
            { to: "/concierge", label: "Concierge" },
          ]}
          extra={<p className="text-mute">Jura · London · Kyoto · Milan · Dubai · Los Angeles</p>}
        />
      </div>
      <div className="flex flex-wrap items-center justify-between gap-4 pt-8 text-[11.5px] tracking-[0.1em] text-mute-2">
        <span>© {new Date().getFullYear()} Maison Noir Atelier. All commissions reserved.</span>
        <span className="flex gap-2">
          <span className="h-[5px] w-[5px] rounded-full bg-ember" />
          <span className="h-[5px] w-[5px] rounded-full bg-ember/60" />
          <span className="h-[5px] w-[5px] rounded-full bg-ember/30" />
        </span>
        <span>Editorial fictions. Not affiliated with any existing marque.</span>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  items,
  extra,
}: {
  title: string;
  items: { to: string; label: string }[];
  extra?: React.ReactNode;
}) {
  return (
    <div>
      <h4 className="mb-6 text-[11px] font-normal uppercase tracking-[0.3em] text-mute-2">{title}</h4>
      <div className="space-y-2 text-[14.5px] text-mute">
        {items.map(i => (
          <Link key={i.to} to={i.to} className="block transition-colors hover:text-ivory">
            {i.label}
          </Link>
        ))}
        {extra}
      </div>
    </div>
  );
}