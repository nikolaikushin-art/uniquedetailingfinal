import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, Rule } from "@/components/site/PageHero";
import { carImage, lifestyleImage } from "@/lib/images";

export const Route = createFileRoute("/nasledie")({
  head: () => ({
    meta: [
      { title: "Наследие и мастерство — UNIQUE Detailing" },
      { name: "description", content: "Наследие UNIQUE, ремесло мастеров, bespoke-заказ, консьерж и персональный шофёр — редакция клубного стандарта." },
      { property: "og:title", content: "Наследие и мастерство — UNIQUE Detailing" },
      { property: "og:description", content: "Пять глав о клубном стандарте UNIQUE Detailing." },
    ],
  }),
  component: NasleiePage,
});

function NasleiePage() {
  return (
    <div>
      <PageHero
        eyebrow="Наследие · Мастерство · Клуб"
        title={<>Пять глав<br />клубного стандарта.</>}
        lede="Мы собрали редакционные материалы о том, из чего складывается UNIQUE — от истоков ремесла до персонального шофёра клубной программы."
        seed={9}
        mode="car"
      />

      {/* НАСЛЕДИЕ */}
      <section id="heritage" className="px-[6vw] py-32">
        <div className="mx-auto max-w-[1280px]">
          <Rule num="01" label="Наследие и легенда" />
          <div className="grid gap-16 md:grid-cols-[1fr_1fr] md:items-start">
            <div className="space-y-6 text-[16px] leading-[1.95] text-mute">
              <h2 className="font-display uppercase leading-[1.05] text-ivory" style={{ fontSize: "clamp(30px,3.6vw,52px)", letterSpacing: "0.04em" }}>
                Десять лет европейского стандарта.
              </h2>
              <p>UNIQUE начинался в европейской студии, где стандарты оттачивались год за годом. Мы принесли эти протоколы в Петербург без компромиссов — те же мастера, та же плёнка, тот же ритуал.</p>
              <p>Каждый выполненный проект вносится в клубную книгу студии. Это не архив — это документ, который живёт с автомобилем всю его жизнь и передаётся вместе с ключами следующему владельцу.</p>
              <p>Наследие — это не годы на стене. Это привычка не спешить.</p>
            </div>
            <div className="relative aspect-[4/5] overflow-hidden">
              <img src={carImage(11, 1600)} alt="Наследие" className="h-full w-full object-cover" loading="lazy" />
              <div className="absolute inset-0 plate-scrim" />
            </div>
          </div>
        </div>
      </section>

      {/* МАСТЕРСТВО */}
      <section id="craft" className="border-y border-line bg-obsidian-2 px-[6vw] py-32">
        <div className="mx-auto max-w-[1280px]">
          <Rule num="02" label="Мастерство · Craftsmanship" />
          <h2 className="mb-14 max-w-[900px] font-display uppercase leading-[1.05] text-ivory" style={{ fontSize: "clamp(30px,3.6vw,52px)", letterSpacing: "0.04em" }}>
            Работа руками, в том темпе, в котором рождается идеал.
          </h2>
          <div className="grid gap-[2px] bg-line md:grid-cols-3">
            {[
              ["Ручной раскрой",   "Каждый элемент плёнки режется по кузову, без выкроек. Дольше — но швов на видимых зонах не остаётся."],
              ["Тёплый бокс",      "48 часов автомобиль принимает комнатную температуру. Металл должен согреться — только тогда плёнка ложится идеально."],
              ["Три лампы света",  "Финальный контроль под дневным, тёплым и холодным светом. Ни одного пузыря, ни одной пыли."],
              ["Замшевая ракель",  "Каждый шов прогревается инфракрасным излучателем и разглаживается замшей. Техника пришла из европейского центра."],
              ["Клубная книга",    "Восемь ракурсов на закрытой площадке, каждый шов — при трёх типах освещения. Владелец получает документ на десять страниц."],
              ["Один мастер",      "От первой мойки до сдачи ключей — с автомобилем работает один и тот же человек."],
            ].map(([t, c], i) => (
              <div key={t} className="bg-obsidian p-10">
                <p className="font-display text-xl text-mute-2">{String(i + 1).padStart(2, "0")}</p>
                <h4 className="mt-6 font-display text-xl uppercase text-ivory" style={{ letterSpacing: "0.05em" }}>{t}</h4>
                <p className="mt-4 text-[14px] leading-[1.85] text-mute">{c}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BESPOKE */}
      <section id="bespoke" className="px-[6vw] py-32">
        <div className="mx-auto max-w-[1280px]">
          <Rule num="03" label="Bespoke · Индивидуальный заказ" />
          <div className="grid gap-16 md:grid-cols-[1.1fr_0.9fr] md:items-center">
            <div className="relative aspect-[16/10] overflow-hidden">
              <img src={lifestyleImage(3, 1600)} alt="Bespoke" className="h-full w-full object-cover" loading="lazy" />
              <div className="absolute inset-0 plate-scrim" />
            </div>
            <div className="space-y-6 text-[16px] leading-[1.95] text-mute">
              <h2 className="font-display uppercase leading-[1.05] text-ivory" style={{ fontSize: "clamp(28px,3.4vw,46px)", letterSpacing: "0.04em" }}>
                Восемнадцать месяцев на одну идею.
              </h2>
              <p>Клубный заказ UNIQUE начинается с диалога — не с прайса. Мы собираем комплектацию под конкретный автомобиль, под конкретного владельца, под конкретный стиль эксплуатации.</p>
              <p>Комбинация плёнки, керамики, палитры салона и клубного пакета — всё это подбирается индивидуально и фиксируется в контракте bespoke-программы.</p>
              <div className="pt-4"><Link to="/kontakty" className="btn-line btn-ember">Открыть bespoke-диалог</Link></div>
            </div>
          </div>
        </div>
      </section>

      {/* КОНСЬЕРЖ */}
      <section id="concierge" className="border-y border-line bg-obsidian-2 px-[6vw] py-32">
        <div className="mx-auto max-w-[1280px]">
          <Rule num="04" label="Concierge · Клубный сервис" />
          <h2 className="mb-14 max-w-[900px] font-display uppercase leading-[1.05] text-ivory" style={{ fontSize: "clamp(30px,3.6vw,52px)", letterSpacing: "0.04em" }}>
            Один звонок — и остальное сделаем мы.
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              ["Персональный менеджер", "Прямая линия с мастером, который вёл ваш автомобиль от первого дня."],
              ["Забор автомобиля",      "Наш сотрудник приедет за ключами в любую точку Петербурга или Ленинградской области."],
              ["Клубные события",       "Приглашения на закрытые встречи, тест-драйвы и партнёрские сессии Founders-программы."],
            ].map(([t, c]) => (
              <div key={t} className="border-t border-line pt-8">
                <h4 className="font-display text-2xl uppercase text-ivory" style={{ letterSpacing: "0.05em" }}>{t}</h4>
                <p className="mt-5 text-[15px] leading-[1.9] text-mute">{c}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ШОФЁР */}
      <section id="chauffeur" className="px-[6vw] py-32">
        <div className="mx-auto max-w-[1280px]">
          <Rule num="05" label="Chauffeur · Персональный водитель" />
          <div className="grid gap-16 md:grid-cols-[0.9fr_1.1fr] md:items-center">
            <div className="space-y-6 text-[16px] leading-[1.95] text-mute">
              <h2 className="font-display uppercase leading-[1.05] text-ivory" style={{ fontSize: "clamp(28px,3.4vw,46px)", letterSpacing: "0.04em" }}>
                Тишина как услуга.
              </h2>
              <p>Клубная программа UNIQUE включает партнёрскую службу шофёров — тихих, аккуратных, обученных обращаться с автомобилем в защитной плёнке так, будто он только вышел из студии.</p>
              <p>Мы согласовываем маршрут, тайминг и стиль вождения. Ваш день — ваш ритм; автомобиль остаётся в клубной кондиции.</p>
            </div>
            <div className="relative aspect-[16/10] overflow-hidden">
              <img src={carImage(17, 1600)} alt="Chauffeur" className="h-full w-full object-cover" loading="lazy" />
              <div className="absolute inset-0 plate-scrim" />
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-line px-[6vw] py-32 text-center">
        <h2 className="mx-auto max-w-[720px] font-display uppercase leading-tight text-ivory" style={{ fontSize: "clamp(26px,3.6vw,44px)", letterSpacing: "0.06em" }}>
          Клубный стандарт<br />начинается с разговора.
        </h2>
        <div className="mt-10"><Link to="/kontakty" className="btn-line btn-ember">Записаться в клуб</Link></div>
      </section>
    </div>
  );
}