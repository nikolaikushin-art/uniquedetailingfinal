import { carImage, lifestyleImage } from "@/lib/images";

export function PageHero({
  eyebrow,
  title,
  lede,
  image,
  mode = "car",
  seed = 0,
}: {
  eyebrow: string;
  title: React.ReactNode;
  lede?: string;
  image?: string;
  mode?: "car" | "lifestyle";
  seed?: number;
}) {
  const bg = image ?? (mode === "lifestyle" ? lifestyleImage(seed, 2200) : carImage(seed, 2200));
  return (
    <section className="relative flex min-h-[72vh] items-end overflow-hidden border-b border-line">
      <div className="absolute inset-0 animate-drift bg-cover bg-center" style={{ backgroundImage: `url(${bg})` }} />
      <div className="absolute inset-0 plate-scrim" />
      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-[6vw] pb-24 pt-40">
        <p className="eyebrow eyebrow-dot mb-6">{eyebrow}</p>
        <h1 className="max-w-[1100px] font-display uppercase leading-[1.02] text-ivory" style={{ fontSize: "clamp(38px,6.4vw,96px)", letterSpacing: "0.03em" }}>
          {title}
        </h1>
        {lede && <p className="mt-8 max-w-[600px] text-[16px] leading-[1.9] text-mute">{lede}</p>}
      </div>
    </section>
  );
}

export function Rule({ label, num }: { label: string; num?: string }) {
  return (
    <div className="mb-10 flex items-center gap-5">
      {num && <span className="font-display text-[14px] text-mute-2">{num}</span>}
      <span className="h-px flex-1 bg-line" />
      <span className="eyebrow">{label}</span>
    </div>
  );
}
