import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { PageHero } from "@/components/site/PageHero";
import { LeadForm } from "@/components/site/LeadForm";
import { cdn } from "@/lib/cdn";
import { pageSeo } from "@/lib/seo";
import {
  GIS2_POINT_URL,
  MAP_ZOOM,
  PHONE_IS_PLACEHOLDER,
  SITE_PHONE_DISPLAY,
  SITE_PHONE_HREF,
  SOCIAL_LINKS,
  STUDIO_ADDRESS_LINES,
  STUDIO_ADDRESS_ONE_LINE,
  STUDIO_ADDRESS_SHORT,
  STUDIO_CITY,
  STUDIO_LAT,
  STUDIO_LON,
  WORK_CLOSE,
  WORK_HOURS,
  WORK_OPEN,
  YANDEX_POINT_URL,
  YANDEX_ROUTE_URL,
} from "@/lib/site-config";

/* eslint-disable @typescript-eslint/no-explicit-any -- Leaflet is loaded from
   a CDN at runtime and ships no bundled types in this project. */
/* Premium monochrome map — Leaflet + free OpenStreetMap tiles loaded
 * client-side only, no API key, no account, no ads, no address popup.
 * A single UNIQUE red marker on a dark, desaturated basemap. The three
 * buttons below (route / Яндекс Карты / 2ГИС) still link out to those
 * services for turn-by-turn directions. */
function PremiumMap() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let map: any;
    let cancelled = false;

    const ensureLeaflet = (): Promise<any> => {
      const w = window as any;
      if (w.L) return Promise.resolve(w.L);
      if (!document.getElementById("leaflet-css")) {
        const css = document.createElement("link");
        css.id = "leaflet-css";
        css.rel = "stylesheet";
        css.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
        document.head.appendChild(css);
      }
      return new Promise((resolve, reject) => {
        const existing = document.getElementById("leaflet-js") as HTMLScriptElement | null;
        if (existing) {
          existing.addEventListener("load", () => resolve((window as any).L));
          existing.addEventListener("error", reject);
          return;
        }
        const s = document.createElement("script");
        s.id = "leaflet-js";
        s.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
        s.async = true;
        s.onload = () => resolve((window as any).L);
        s.onerror = reject;
        document.head.appendChild(s);
      });
    };

    ensureLeaflet()
      .then((L) => {
        if (cancelled || !ref.current || (ref.current as any)._leaflet_id) return;
        map = L.map(ref.current, {
          center: [STUDIO_LAT, STUDIO_LON],
          zoom: MAP_ZOOM,
          zoomControl: false,
          scrollWheelZoom: false,
          attributionControl: false,
          dragging: true,
        });
        // Standard OpenStreetMap tiles — free, no key, no account, no ads.
        // (CARTO's tiles now require a paid key, so this is the reliable
        // no-key option; a light saturation/contrast tweak below keeps it
        // calm next to the red pin.)
        L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
          maxZoom: 19,
        }).addTo(map);
        L.control.zoom({ position: "bottomright" }).addTo(map);
        L.control
          .attribution({ position: "bottomleft", prefix: false })
          .addAttribution("© OpenStreetMap contributors")
          .addTo(map);
        // Yandex-style teardrop pin: red drop with a white core.
        const icon = L.divIcon({
          className: "uq-pin-wrap",
          html:
            '<svg width="34" height="46" viewBox="0 0 34 46" xmlns="http://www.w3.org/2000/svg">' +
            '<path d="M17 0C7.6 0 0 7.6 0 17c0 11 13.5 25.6 15.8 28.1a1.6 1.6 0 0 0 2.4 0C20.5 42.6 34 28 34 17 34 7.6 26.4 0 17 0z" fill="#e0332a"/>' +
            '<circle cx="17" cy="17" r="7.5" fill="#ffffff"/>' +
            '</svg>',
          iconSize: [34, 46],
          iconAnchor: [17, 44],
        });
        L.marker([STUDIO_LAT, STUDIO_LON], { icon, keyboard: false }).addTo(map);
      })
      .catch(() => {});

    return () => {
      cancelled = true;
      if (map) map.remove();
    };
  }, []);

  return (
    <div ref={ref} className="absolute inset-0 h-full w-full" aria-label="Карта студии UNIQUE" />
  );
}
/* eslint-enable @typescript-eslint/no-explicit-any */

const LOCAL_BUSINESS_LD = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "AutoRepair",
  name: "UNIQUE Detailing",
  url: "https://uniquedetailing.ru",
  email: "info@uniquedetailing.ru",
  ...(PHONE_IS_PLACEHOLDER ? {} : { telephone: SITE_PHONE_DISPLAY }),
  address: {
    "@type": "PostalAddress",
    addressLocality: STUDIO_CITY.replace(/^г\.\s*/, ""),
    streetAddress: STUDIO_ADDRESS_ONE_LINE,
    addressCountry: "RU",
  },
  geo: { "@type": "GeoCoordinates", latitude: STUDIO_LAT, longitude: STUDIO_LON },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    opens: WORK_OPEN.padStart(5, "0"),
    closes: WORK_CLOSE.padStart(5, "0"),
  },
});

export const Route = createFileRoute("/kontakty")({
  head: () => {
    const seo = pageSeo({
      title: "Контакты — UNIQUE Detailing",
      description: `Студия UNIQUE Detailing — ${STUDIO_CITY}, ${STUDIO_ADDRESS_ONE_LINE}. ${WORK_HOURS}. info@uniquedetailing.ru`,
      path: "/kontakty",
      ogDescription:
        "Записаться в студию UNIQUE Detailing в Санкт-Петербурге. Расчёт стоимости и запись онлайн.",
    });
    return {
      ...seo,
      scripts: [{ type: "application/ld+json", children: LOCAL_BUSINESS_LD }],
    };
  },
  component: KontaktyPage,
});

function KontaktyPage() {
  return (
    <div>
      <PageHero
        eyebrow="Контакты"
        title={
          <>
            Оставьте заявку.
            <br />
            Мы свяжемся в течение часа.
          </>
        }
        lede="Рассчитаем стоимость, согласуем сроки и подберём удобное время для приезда в клубную студию UNIQUE."
        image={cdn("/portfolio/audi-r8-v10-performance-0.jpg")}
      />

      {/* КОНТАКТЫ + ФОРМА */}
      <section className="px-[6vw] py-24 md:py-32">
        <div className="mx-auto grid max-w-[1280px] gap-16 md:grid-cols-[0.9fr_1.1fr]">
          {/* Инфо — каждый факт указан один раз */}
          <aside className="space-y-10">
            <div>
              <p className="eyebrow mb-4">Адрес студии</p>
              <p
                className="font-display text-2xl uppercase text-ivory"
                style={{ letterSpacing: "0.05em" }}
              >
                {STUDIO_CITY}
              </p>
              <p className="mt-3 text-[15px] leading-[1.85] text-mute">
                {STUDIO_ADDRESS_LINES.map((l, i) => (
                  <span key={l}>
                    {i > 0 ? <br /> : null}
                    {l}
                  </span>
                ))}
              </p>
              <p className="mt-4 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-ember">
                <span className="h-[6px] w-[6px] rounded-full bg-ember shadow-[0_0_10px_theme(colors.ember)]" />
                Запись открыта
              </p>
            </div>

            <div>
              <p className="eyebrow mb-4">Режим работы</p>
              <p className="text-[15px] text-mute">{WORK_HOURS}</p>
              <p className="mt-1 text-[13px] text-mute-2">
                Приём автомобилей — по предварительной записи
              </p>
            </div>

            <div>
              <p className="eyebrow mb-4">Связь</p>
              <ul className="space-y-2 text-[15px] text-mute">
                <li>
                  <a href={SITE_PHONE_HREF} className="hover:text-ivory">
                    {SITE_PHONE_DISPLAY}
                  </a>
                </li>
                <li>
                  <a href="mailto:info@uniquedetailing.ru" className="hover:text-ivory">
                    info@uniquedetailing.ru
                  </a>
                </li>
                {SOCIAL_LINKS.length ? (
                  <li className="flex flex-wrap gap-x-5 gap-y-1">
                    {SOCIAL_LINKS.map((x) => (
                      <a
                        key={x.label}
                        href={x.href}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="hover:text-ivory"
                      >
                        {x.label}
                      </a>
                    ))}
                  </li>
                ) : null}
              </ul>
            </div>

            <div>
              <p className="eyebrow mb-4">Конфиденциальность</p>
              <p className="text-[14.5px] leading-[1.85] text-mute">
                Закрытый приём и полная конфиденциальность: заявки и автомобили не публикуются без
                письменного согласия владельца.
              </p>
            </div>
          </aside>

          {/* Форма */}
          <LeadForm />
        </div>
      </section>

      {/* КАРТА */}
      <section className="border-t border-line px-[6vw] py-24">
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-10">
            <p className="eyebrow eyebrow-dot mb-4">Локация студии</p>
            <h2
              className="font-display uppercase leading-tight text-ivory"
              style={{ fontSize: "clamp(26px,3vw,42px)", letterSpacing: "0.05em" }}
            >
              Найдите нас
              <br />
              <span className="text-ember">на карте.</span>
            </h2>
          </div>

          <div className="relative z-0 isolate overflow-hidden border border-line-strong bg-obsidian-2">
            <span className="pointer-events-none absolute left-0 top-0 z-20 h-8 w-8 border-l-2 border-t-2 border-ember/70" />
            <span className="pointer-events-none absolute right-0 top-0 z-20 h-8 w-8 border-r-2 border-t-2 border-ember/70" />
            <span className="pointer-events-none absolute bottom-0 left-0 z-20 h-8 w-8 border-b-2 border-l-2 border-ember/70" />
            <span className="pointer-events-none absolute bottom-0 right-0 z-20 h-8 w-8 border-b-2 border-r-2 border-ember/70" />

            <div className="grid md:grid-cols-[1fr_320px]">
              <div className="relative z-0 isolate min-h-[440px] overflow-hidden bg-[#2a2e34] md:min-h-[520px]">
                <PremiumMap />
                <div className="pointer-events-none absolute inset-0 z-[2] shadow-[inset_0_0_60px_rgba(8,9,11,0.28)]" />
                <span className="pointer-events-none absolute left-5 top-5 z-[3] flex max-w-[min(92%,22rem)] items-center gap-2 rounded-sm bg-obsidian/80 px-3 py-1.5 text-[10px] uppercase tracking-[0.22em] text-ivory backdrop-blur">
                  <span className="h-[6px] w-[6px] shrink-0 rounded-full bg-ember shadow-[0_0_10px_theme(colors.ember)]" />
                  {STUDIO_ADDRESS_SHORT}
                </span>
              </div>

              <aside className="flex flex-col justify-end gap-3 border-t border-line bg-obsidian p-8 md:border-l md:border-t-0 md:p-10">
                <a
                  href={YANDEX_ROUTE_URL}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="btn-line btn-ember block text-center"
                >
                  Проложить маршрут
                </a>
                <a
                  href={YANDEX_POINT_URL}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="btn-line block text-center"
                >
                  Открыть в Яндекс Картах
                </a>
                <a
                  href={GIS2_POINT_URL}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="btn-line block text-center"
                >
                  Открыть в 2ГИС
                </a>
              </aside>
            </div>
          </div>
        </div>
      </section>

      {/* КАК ДОБРАТЬСЯ */}
      <section className="border-t border-line bg-obsidian-2 px-[6vw] py-24">
        <div className="mx-auto max-w-[1280px]">
          <div className="mb-12 flex items-center gap-5">
            <span className="font-display text-[14px] text-mute-2">02</span>
            <span className="h-px flex-1 bg-line" />
            <span className="eyebrow">Как добраться</span>
          </div>
          <div className="grid gap-8 border border-ember/40 bg-obsidian p-8 md:grid-cols-[1.4fr_1fr] md:items-center md:p-12">
            <div>
              <p className="eyebrow mb-4 text-ember">Забор и доставка</p>
              <h3
                className="font-display uppercase leading-tight text-ivory"
                style={{ fontSize: "clamp(22px,2.6vw,36px)", letterSpacing: "0.05em" }}
              >
                Заберём автомобиль из любой точки города — и вернём обратно.
              </h3>
              <p className="mt-5 max-w-[620px] text-[14.5px] leading-[1.85] text-mute">
                Не нужно ехать самим: эвакуатор заберёт автомобиль у вашего дома или офиса и
                доставит в студию, а после работ вернёт по любому адресу. Если вы приезжаете лично —
                вызовем такси бизнес-класса от студии до нужной точки города.
              </p>
            </div>
            <div className="flex flex-col gap-3 md:items-end">
              <a href="#zapis" className="btn-line btn-ember text-center">
                Заказать забор автомобиля
              </a>
              <Link to="/privilegii" className="btn-line text-center">
                Все привилегии
              </Link>
            </div>
          </div>

          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {[
              [
                "На автомобиле",
                "Нажмите «Проложить маршрут» — навигатор построит путь от вашего местоположения до студии.",
              ],
              [
                "На такси или каршеринге",
                "Введите адрес студии в приложении — он указан выше, в блоке «Адрес студии».",
              ],
              [
                "Не хотите ехать сами",
                "Оставьте заявку и напишите в комментарии, что нужен забор автомобиля, — организуем эвакуатор.",
              ],
            ].map(([t, c]) => (
              <div key={t} className="border-t border-line pt-8">
                <h3
                  className="font-display text-xl uppercase text-ivory"
                  style={{ letterSpacing: "0.05em" }}
                >
                  {t}
                </h3>
                <p className="mt-4 text-[14.5px] leading-[1.85] text-mute">{c}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
