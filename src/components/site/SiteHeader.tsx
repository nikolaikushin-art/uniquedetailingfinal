import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import logo from "@/assets/logo.png.asset.json";
import { SERVICE_GROUPS, servicesInGroup } from "@/lib/services";
import { GROUP_MENU_HINT, MENU_LABEL } from "@/lib/service-extras";
import {
  SITE_PHONE_DISPLAY,
  SITE_PHONE_HREF,
  SOCIAL_LINKS as SOCIALS,
  STUDIO_ADDRESS_ONE_LINE,
  STUDIO_CITY,
  WORK_HOURS,
} from "@/lib/site-config";

const NAV = [
  { to: "/uslugi", label: "Услуги" },
  { to: "/kompleksy", label: "Комплексы услуг" },
  { to: "/plenka", label: "Плёнка Unique" },
  { to: "/raboty", label: "Работы" },
  { to: "/privilegii", label: "Привилегии" },
  { to: "/nasledie", label: "Наследие" },
  { to: "/klub", label: "Клуб Unique" },
  { to: "/kontakty", label: "Контакты" },
] as const;

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

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

        <div className="flex flex-1 items-center justify-end gap-3 md:gap-5">
          <a
            href={SITE_PHONE_HREF}
            aria-label={`Позвонить ${SITE_PHONE_DISPLAY}`}
            className="text-[10px] uppercase tracking-[0.2em] text-mute transition-colors hover:text-ivory md:text-[11px] md:normal-case md:tracking-[0.15em]"
          >
            <span className="md:hidden">Звонок</span>
            <span className="hidden md:inline">{SITE_PHONE_DISPLAY}</span>
          </a>
          {SOCIALS.map((x) => (
            <a
              key={x.label}
              href={x.href}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={`UNIQUE Detailing — ${x.label}`}
              className="text-[10px] tracking-[0.3em] uppercase text-mute transition-colors hover:text-ivory"
            >
              <span className="md:hidden">{x.short}</span>
              <span className="hidden md:inline">{x.label}</span>
            </a>
          ))}
          <Link
            to="/kontakty"
            className="group hidden items-center gap-2 text-[10px] sm:inline-flex md:text-[11px] tracking-[0.3em] uppercase text-mute transition-colors hover:text-ivory"
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
                    <div className="flex items-center gap-3">
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
                      {n.to === "/uslugi" ? (
                        <button
                          type="button"
                          onClick={() => setServicesOpen((v) => !v)}
                          aria-expanded={servicesOpen}
                          aria-label={
                            servicesOpen ? "Свернуть список услуг" : "Показать список услуг"
                          }
                          className="flex h-7 w-7 shrink-0 items-center justify-center border border-line-strong text-mute transition-colors hover:text-ivory md:hidden"
                        >
                          <span className="text-[16px] leading-none">
                            {servicesOpen ? "–" : "+"}
                          </span>
                        </button>
                      ) : null}
                    </div>
                    {n.to === "/uslugi" && servicesOpen ? (
                      <div className="mb-4 mt-3 md:hidden space-y-7 border-l border-line pl-5">
                        {SERVICE_GROUPS.map((g) => (
                          <div key={g.id}>
                            <p className="mb-3 text-[11px] uppercase tracking-[0.28em] text-mute-2">
                              {g.title}
                            </p>
                            <p className="-mt-1 mb-3 text-[12.5px] normal-case tracking-normal text-mute-2">
                              {GROUP_MENU_HINT[g.id]}
                            </p>
                            <ul className="space-y-2.5">
                              {servicesInGroup(g.id).map((sv) => (
                                <li key={sv.slug}>
                                  <Link
                                    to="/uslugi/$slug"
                                    params={{ slug: sv.slug }}
                                    title={sv.title}
                                    onClick={() => setOpen(false)}
                                    className="block text-[15.5px] normal-case leading-[1.5] tracking-normal text-mute transition-colors hover:text-ivory"
                                  >
                                    {MENU_LABEL[sv.slug] ?? sv.title}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    ) : null}
                  </li>
                ))}
              </ul>
              <div className="mt-10 space-y-2 text-[11px] uppercase tracking-[0.3em] text-mute-2">
                <p>{STUDIO_CITY}</p>
                <p className="normal-case tracking-normal text-mute">{STUDIO_ADDRESS_ONE_LINE}</p>
                <p className="normal-case tracking-normal text-mute">{WORK_HOURS}</p>
                <p className="text-ember">Запись открыта</p>
                <p className="normal-case tracking-normal text-mute">info@uniquedetailing.ru</p>
                <p className="normal-case tracking-normal text-mute">
                  <a href={SITE_PHONE_HREF} className="hover:text-ivory">
                    {SITE_PHONE_DISPLAY}
                  </a>
                </p>
                <div className="flex gap-5">
                  {SOCIALS.map((x) => (
                    <a
                      key={x.label}
                      href={x.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="normal-case tracking-normal text-mute hover:text-ivory"
                    >
                      {x.label}
                    </a>
                  ))}
                </div>
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
            className="absolute inset-0 animate-drift bg-cover bg-center opacity-[0.14]"
            style={{
              backgroundImage: `url(/generated/polirovka-kuzova/hero.jpg)`,
            }}
          />
          <div className="absolute inset-0 plate-scrim" />
          <div className="absolute inset-0 bg-obsidian/75" />
          {/* Desktop: the full services list is always visible in the menu (brief: «список услуг в меню») */}
          <div className="absolute inset-0 overflow-y-auto px-10 pb-10 pt-24">
            <Link
              to="/uslugi"
              onClick={() => setOpen(false)}
              className="mb-8 inline-block font-display text-2xl uppercase tracking-[0.08em] text-ivory hover:text-ember"
            >
              Услуги →
            </Link>
            <div className="grid gap-x-10 gap-y-8 xl:grid-cols-2">
              {SERVICE_GROUPS.map((g) => (
                <div key={g.id}>
                  <p className="mb-3 text-[11px] uppercase tracking-[0.28em] text-ember">
                    {g.title}
                  </p>
                  <p className="-mt-1 mb-3 text-[12.5px] normal-case tracking-normal text-mute-2">
                    {GROUP_MENU_HINT[g.id]}
                  </p>
                  <ul className="space-y-2.5">
                    {servicesInGroup(g.id).map((sv) => (
                      <li key={sv.slug}>
                        <Link
                          to="/uslugi/$slug"
                          params={{ slug: sv.slug }}
                          title={sv.title}
                          onClick={() => setOpen(false)}
                          className="block text-[15px] leading-[1.5] text-mute transition-colors hover:text-ivory"
                        >
                          {MENU_LABEL[sv.slug] ?? sv.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
