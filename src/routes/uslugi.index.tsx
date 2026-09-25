import { createFileRoute, Link, useRouterState } from "@tanstack/react-router";
import { useEffect } from "react";
import { PageHero, Rule } from "@/components/site/PageHero";
import { cdn } from "@/lib/cdn";
import { pageSeo } from "@/lib/seo";
import { SERVICE_GROUPS, servicesInGroup, type ServiceGroupId } from "@/lib/services";
import { briefHero } from "@/lib/service-brief";

export const Route = createFileRoute("/uslugi/")({
  head: () =>
    pageSeo({
      title: "Услуги — UNIQUE Detailing",
      description:
        "Оклейка защитной полиуретановой плёнкой (PPF), смена цвета плёнкой, уход за кузовом и салоном, защитные покрытия, детейлинг-мойка, антикоррозия. Каждая услуга — со сроками, стоимостью и записью онлайн.",
      path: "/uslugi",
      ogDescription:
        "Полный перечень услуг студии UNIQUE: PPF, смена цвета, уход за кузовом и салоном, защитные покрытия.",
    }),
  component: UslugiPage,
});

/**
 * One short line per direction. All service data (titles, terms, prices, photos)
 * comes from `src/lib/services.ts`, so nothing is copied or maintained twice.
 */
const GROUP_INTRO: Record<ServiceGroupId, string> = {
  ppf: "Прозрачная защита кузова от сколов, царапин и реагентов — глянцевая, сатиновая или матовая. Оклейка выполняется без разбора автомобиля.",
  color:
    "Обратимая смена цвета без вмешательства в заводскую окраску. Материал на выбор: полиуретан UNIQUE Protection (180 цветов) или винил (200+ цветов) — для винила дополнительно доступен индивидуальный дизайн-проект.",
  body: "Восстановление и уход за лаком: полировка, удаление вмятин и царапин без окрашивания, очистка от битумных и металлических вкраплений.",
  coatings:
    "Керамика, кварц (жидкое стекло), воски и антидождь — защита лака и стёкол разной глубины и срока действия.",
  interior:
    "От комплексной чистки до ремонта кожи и озонирования — бережный уход за каждым материалом салона.",
  wash: "Ручная детейлинг-мойка узлов, до которых не добирается обычная мойка: подкапотное пространство и подвеска.",
  anticor: "Защита металла от коррозии металлокомпозитом GMA.",
  glass: "Тонирование стёкол и прозрачная защитная оклейка оптики.",
};

const STEPS: [string, string][] = [
  ["Заявка", "Оставляете заявку на странице услуги или по телефону — менеджер уточняет задачу."],
  [
    "Осмотр и договор",
    "Осматриваем автомобиль, называем итоговую стоимость и срок, фиксируем их в договоре.",
  ],
  [
    "Работа",
    "Выполняем услугу по технологической карте студии; каждый день отправляем видеоотчёт.",
  ],
  [
    "Выдача",
    "Контроль результата, рекомендации по уходу, гарантийные документы и запись в карточку автомобиля.",
  ],
];

function UslugiPage() {
  const hash = useRouterState({ select: (s) => s.location.hash });

  useEffect(() => {
    const id = hash.replace(/^#/, "");
    if (!id) return;
    const el = document.getElementById(id);
    if (!el) return;
    const t = window.setTimeout(
      () => el.scrollIntoView({ behavior: "smooth", block: "start" }),
      50,
    );
    return () => window.clearTimeout(t);
  }, [hash]);

  return (
    <div>
      <PageHero
        eyebrow="Услуги центра"
        title={
          <>
            Все услуги студии.
            <br />
            Один стандарт качества.
          </>
        }
        lede="Каждая услуга — на отдельной странице: описание, что входит, срок, стоимость, примеры работ и форма записи."
        image={cdn("/portfolio/mclaren-765lt-0.jpg")}
      />

      {/* БЫСТРАЯ НАВИГАЦИЯ ПО НАПРАВЛЕНИЯМ */}
      <nav
        aria-label="Направления услуг"
        className="border-b border-line bg-obsidian-2 px-[6vw] py-6"
      >
        <ul className="mx-auto flex max-w-[1400px] flex-wrap gap-x-8 gap-y-3 text-[11px] uppercase tracking-[0.22em]">
          {SERVICE_GROUPS.map((g) => (
            <li key={g.id}>
              <a href={`#${g.id}`} className="text-mute transition-colors hover:text-ivory">
                {g.title}
              </a>
            </li>
          ))}
          <li>
            <Link to="/kompleksy" className="text-ember hover:text-ivory">
              Комплексы услуг →
            </Link>
          </li>
        </ul>
      </nav>

      {/* НАПРАВЛЕНИЯ */}
      <section className="px-[6vw] py-24 md:py-32">
        <div className="mx-auto max-w-[1400px] space-y-20 md:space-y-28">
          {SERVICE_GROUPS.map((g, gi) => {
            const items = servicesInGroup(g.id);
            return (
              <article
                key={g.id}
                id={g.id}
                className={`scroll-mt-28 grid gap-12 md:grid-cols-[0.8fr_1.2fr] md:gap-16 ${
                  gi % 2 === 1 ? "md:[&>div:first-child]:order-2 md:grid-cols-[1.2fr_0.8fr]" : ""
                }`}
              >
                <div className="relative aspect-[4/5] self-start overflow-hidden bg-obsidian md:sticky md:top-28">
                  <img
                    src={briefHero(items[0].slug)}
                    alt={g.title}
                    className="h-full w-full object-cover"
                    loading={gi < 2 ? "eager" : "lazy"}
                    decoding="async"
                    sizes="(max-width: 768px) 100vw, 40vw"
                  />
                  <div className="absolute inset-0 plate-scrim" />
                  <p className="absolute bottom-6 left-6 font-display text-6xl text-ivory opacity-90">
                    {String(gi + 1).padStart(2, "0")}
                  </p>
                </div>

                <div>
                  <p className="eyebrow mb-5">Направление · {String(gi + 1).padStart(2, "0")}</p>
                  <h2
                    className="font-display uppercase leading-tight text-ivory"
                    style={{ fontSize: "clamp(24px,2.8vw,40px)", letterSpacing: "0.05em" }}
                  >
                    {g.title}
                  </h2>
                  <p className="mt-6 max-w-[640px] text-[15.5px] leading-[1.95] text-mute">
                    {GROUP_INTRO[g.id]}
                  </p>

                  <ul className="mt-10 divide-y divide-line border-y border-line">
                    {items.map((s) => (
                      <li key={s.slug}>
                        <Link
                          to="/uslugi/$slug"
                          params={{ slug: s.slug }}
                          className="group flex flex-wrap items-center justify-between gap-x-8 gap-y-2 py-5"
                        >
                          <span className="max-w-[520px] text-[15px] leading-[1.6] text-ivory transition-colors group-hover:text-ember">
                            {s.title}
                          </span>
                          <span className="flex items-center gap-6 text-[11px] uppercase tracking-[0.2em] text-mute-2">
                            <span>{s.duration ?? "срок — по согласованию"}</span>
                            <span className={s.price ? "text-ember" : ""}>
                              {s.price ?? "цена — после осмотра"}
                            </span>
                            <span aria-hidden="true" className="h-px w-8 bg-ember" />
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* ЭТАПЫ РАБОТЫ (общие для всех услуг) */}
      <section className="bg-obsidian-2 px-[6vw] py-32">
        <div className="mx-auto max-w-[1280px]">
          <Rule label="Как проходит работа" num="01" />
          <div className="grid gap-[2px] bg-line md:grid-cols-4">
            {STEPS.map(([t, c], i) => (
              <div key={t} className="bg-obsidian p-10">
                <p className="font-display text-2xl text-mute-2">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3
                  className="mt-8 font-display text-2xl uppercase leading-tight text-ivory"
                  style={{ letterSpacing: "0.05em" }}
                >
                  {t}
                </h3>
                <p className="mt-6 text-[14px] leading-[1.85] text-mute">{c}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-line px-[6vw] py-32 text-center">
        <h2
          className="mx-auto max-w-[720px] font-display uppercase leading-tight text-ivory"
          style={{ fontSize: "clamp(26px,3.6vw,44px)", letterSpacing: "0.06em" }}
        >
          Не нашли нужную услугу?
        </h2>
        <p className="mx-auto mt-6 max-w-[560px] text-[15px] leading-[1.9] text-mute">
          Если услуги нет в списке — подключим профильных партнёров, все работы будут выполнены «под
          ключ» в нашей студии.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link to="/kontakty" className="btn-line btn-ember">
            Оставить заявку
          </Link>
          <Link to="/kompleksy" className="btn-line">
            Комплексы услуг
          </Link>
          <Link to="/privilegii" className="btn-line">
            Привилегии работы с нами
          </Link>
        </div>
      </section>
    </div>
  );
}
