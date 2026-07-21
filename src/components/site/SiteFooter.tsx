import { Link } from "@tanstack/react-router";
import logo from "@/assets/logo.png.asset.json";
import { CONTACT_EMAIL, OPS_URL } from "@/lib/cdn";

type FooterLink = { to: string; hash?: string; label: string };

export function SiteFooter() {
  return (
    <footer className="bg-obsidian-2 px-[6vw] pt-24 pb-10">
      <div className="grid gap-12 border-b border-line pb-16 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div>
          <img src={logo.url} alt="UNIQUE Detailing" className="mb-6 h-12 w-auto" />
          <p className="max-w-[340px] text-[14.5px] leading-[1.85] text-mute">
            Премиальная детейлинг-студия с европейским уровнем сервиса. Более 10 лет опыта, клубная
            атмосфера и работа, в которую хочется возвращаться.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-ember">
            <span className="h-[6px] w-[6px] rounded-full bg-ember shadow-[0_0_10px_theme(colors.ember)]" />
            Скоро открытие
          </div>
        </div>
        <FooterCol
          title="Меню"
          items={[
            { to: "/uslugi", label: "Услуги" },
            { to: "/plenka", label: "Пленка Unique" },
            { to: "/raboty", label: "Работы" },
            { to: "/nasledie", label: "Наследие" },
            { to: "/klub", label: "Клуб Unique" },
            { to: "/kontakty", label: "Контакты" },
          ]}
        />
        <FooterCol
          title="Услуги"
          items={[
            { to: "/uslugi", hash: "ppf", label: "Полная оклейка PPF" },
            { to: "/uslugi", hash: "color", label: "Смена цвета плёнкой" },
            { to: "/uslugi", hash: "ceramic", label: "Керамическая защита" },
            { to: "/uslugi", hash: "restore", label: "Восстановление + защита" },
          ]}
        />
        <div>
          <h4 className="mb-6 text-[11px] font-normal uppercase tracking-[0.3em] text-mute-2">
            Контакты
          </h4>
          <div className="space-y-3 text-[14.5px] text-mute">
            <p>г. Санкт-Петербург</p>
            <p className="max-w-[280px]">
              Ленинградская область, микрорайон Овцино, Петрозаводская улица, 33
            </p>
            <p>
              <a className="hover:text-ivory" href={`mailto:${CONTACT_EMAIL}`}>
                {CONTACT_EMAIL}
              </a>
            </p>
            <p className="text-mute-2">Ежедневно с 10:00 до 20:00</p>
            <p className="pt-2">
              <a
                className="text-[11px] uppercase tracking-[0.25em] text-mute-2 transition-colors hover:text-ivory"
                href={OPS_URL}
                target="_blank"
                rel="noreferrer noopener"
              >
                CRM · ops.uniquedetailing.ru
              </a>
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-4 pt-8 text-[11.5px] tracking-[0.1em] text-mute-2">
        <span>© {new Date().getFullYear()} UNIQUE — все права защищены</span>
        <span className="flex gap-2">
          <span className="h-[5px] w-[5px] rounded-full bg-ember" />
          <span className="h-[5px] w-[5px] rounded-full bg-ember/60" />
          <span className="h-[5px] w-[5px] rounded-full bg-ember/30" />
        </span>
        <span>Европейский стандарт детейлинга</span>
      </div>
    </footer>
  );
}

function FooterCol({ title, items }: { title: string; items: FooterLink[] }) {
  return (
    <div>
      <h4 className="mb-6 text-[11px] font-normal uppercase tracking-[0.3em] text-mute-2">
        {title}
      </h4>
      <div className="space-y-2 text-[14.5px] text-mute">
        {items.map((i, k) => (
          <Link
            key={i.label + k}
            to={i.to}
            hash={i.hash}
            hashScrollIntoView={{ behavior: "smooth", block: "start" }}
            className="block transition-colors hover:text-ivory"
            onClick={() => {
              if (!i.hash) return;
              // Same-route hash clicks: ensure we scroll even if the router
              // treats the location as unchanged.
              window.setTimeout(() => {
                document
                  .getElementById(i.hash!)
                  ?.scrollIntoView({ behavior: "smooth", block: "start" });
              }, 50);
            }}
          >
            {i.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
