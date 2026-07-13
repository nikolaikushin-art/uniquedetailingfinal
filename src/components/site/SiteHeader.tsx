import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import logo from "@/assets/logo.png.asset.json";

const NAV = [
  { to: "/uslugi", label: "Услуги" },
  { to: "/plenka", label: "Пленка Unique" },
  { to: "/raboty", label: "Работы" },
  { to: "/nasledie", label: "Наследие" },
  { to: "/klub", label: "Клуб Unique" },
  { to: "/kontakty", label: "Контакты" },
] as const;

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 20);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 flex items-center justify-between px-[5vw] transition-all duration-500 ${
          open ? "pointer-events-none opacity-0" : "opacity-100"
        } ${
          scrolled
            ? "py-2.5 md:py-3 bg-obsidian/90 backdrop-blur border-b border-line"
            : "py-3 md:py-4"
        }`}
      >
        <button
          onClick={() => setOpen(true)}
          className="flex flex-1 items-center gap-2.5 text-[10px] md:text-[11px] tracking-[0.3em] uppercase text-ivory"
          aria-label="Открыть меню"
        >
          <span className="flex w-[19px] md:w-[21px] flex-col gap-[4px]">
            <span className="block h-px bg-ivory" />
            <span className="block h-px w-[65%] bg-ivory" />
            <span className="block h-px bg-ivory" />
          </span>
          Меню
        </button>

        <Link
          to="/"
          className="flex shrink-0 items-center justify-center"
          aria-label="UNIQUE Detailing"
        >
          <img src={logo.url} alt="UNIQUE Detailing" className="h-10 w-auto md:h-[52px]" />
        </Link>

        <div className="flex flex-1 items-center justify-end">
          <Link
            to="/kontakty"
            className="group inline-flex items-center gap-2 text-[10px] md:text-[11px] tracking-[0.3em] uppercase text-mute transition-colors hover:text-ivory"
          >
            <span className="hidden h-px w-5 bg-mute-2 transition-all duration-300 group-hover:w-7 group-hover:bg-ember md:inline-block" />
            Связаться
          </Link>
        </div>
      </header>

      {/* Полноэкранное меню */}
      <div
        className={`fixed inset-0 z-[90] flex transition-opacity duration-500 ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        style={{ background: "linear-gradient(120deg,#0c0d10 0%,#08090b 60%)" }}
      >
        <div className="flex w-full flex-col border-r border-line md:w-[55%]">
          {/* Верхняя панель с кнопкой закрытия — в потоке, поэтому меню
              никогда не перекрывает её */}
          <div className="flex flex-shrink-0 items-center px-[8vw] pt-6 pb-4 md:pt-8">
            <button
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 text-[11px] tracking-[0.35em] uppercase text-ivory"
              aria-label="Закрыть меню"
            >
              <span className="relative block h-4 w-4">
                <span className="absolute left-0 top-1/2 h-px w-full rotate-45 bg-ivory" />
                <span className="absolute left-0 top-1/2 h-px w-full -rotate-45 bg-ivory" />
              </span>
              Закрыть
            </button>
          </div>

          <nav className="min-h-0 flex-1 overflow-y-auto">
            <div className="flex min-h-full flex-col justify-center px-[8vw] pb-12">
              <ul className="space-y-0">
                {NAV.map((n, i) => (
                  <li key={n.to} className="overflow-hidden">
                    <Link
                      to={n.to}
                      onClick={() => setOpen(false)}
                      className="block font-display uppercase leading-[1.15] text-mute transition-all duration-300 hover:pl-4 hover:tracking-[0.16em] hover:text-ivory"
                      style={{
                        fontSize: "clamp(20px,2.4vw,32px)",
                        letterSpacing: "0.12em",
                        padding: "4px 0",
                        transform: open ? "translateY(0)" : "translateY(110%)",
                        opacity: open ? 1 : 0,
                        transition: `transform .7s cubic-bezier(.2,.8,.2,1) ${i * 0.05 + 0.05}s, opacity .7s ease ${
                          i * 0.05 + 0.05
                        }s, color .3s ease, padding .3s ease`,
                      }}
                    >
                      {String(i + 1).padStart(2, "0")} — {n.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-10 space-y-2 text-[11px] uppercase tracking-[0.3em] text-mute-2">
                <p>г. Санкт-Петербург · Ленинградская область</p>
                <p>микрорайон Овцино, Петрозаводская улица, 33</p>
                <p className="text-ember">Скоро открытие</p>
                <p className="normal-case tracking-normal text-mute">info@uniquedetailing.ru</p>
              </div>
            </div>
          </nav>
        </div>

        <div
          className="relative hidden overflow-hidden md:block md:w-[45%]"
          style={{
            background:
              "repeating-linear-gradient(180deg,rgba(255,255,255,0.02) 0px,rgba(255,255,255,0.02) 1px,transparent 1px,transparent 26px), radial-gradient(ellipse at 30% 30%,#1c1e22 0%,#0a0b0d 70%)",
          }}
        >
          <div
            className="absolute inset-0 animate-drift bg-cover bg-center opacity-60"
            style={{
              backgroundImage: "url(/portfolio/rolls-royce-spectre-0.jpg)",
            }}
          />
          <div className="absolute inset-0 plate-scrim" />
          <div className="absolute bottom-10 left-10 right-10">
            <img src={logo.url} alt="" className="mb-6 h-10 w-auto opacity-90" />
            <p className="font-display text-2xl uppercase leading-tight tracking-[0.08em] text-ivory">
              Европейский стандарт
              <br />
              детейлинга и оклейки.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
