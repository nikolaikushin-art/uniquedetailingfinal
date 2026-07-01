import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, Rule } from "@/components/site/PageHero";
import { carImage, lifestyleImage } from "@/lib/images";

export const Route = createFileRoute("/plenka")({
  head: () => ({
    meta: [
      { title: "Пленка Unique — эксклюзивная PPF собственного производства" },
      { name: "description", content: "Полиуретановая плёнка UNIQUE PPF: эластичность 320%, самовосстановление, гарантия 10 лет. Особые свойства, разработанные европейским центром." },
      { property: "og:title", content: "Пленка Unique — эксклюзивная PPF" },
      { property: "og:description", content: "Собственная плёнка UNIQUE с особыми свойствами защиты и цвета." },
    ],
  }),
  component: PlenkaPage,
});

const PROPERTIES = [
  ["Эластичность 320%",       "Плёнка тянется без разрыва и повторяет самую сложную геометрию — воздухозаборники, арки, зеркала."],
  ["Самовосстановление",      "Мелкие царапины исчезают при нагреве от 40°C — от солнца, тёплой воды или фена."],
  ["Устойчивость к химии",    "Не реагирует на реагенты, антигололёд, кислотные осадки, битум и продукты сгорания."],
  ["Прозрачность 99.7%",      "Практически неотличима на кузове — глубина цвета лака сохраняется полностью."],
  ["Гарантия 10 лет",         "На пожелтение, отслоение, помутнение и потерю самовосстанавливающих свойств."],
  ["Толщина 210 микрон",      "Три слоя — топ-коат, полиуретан и клеевой слой с воздушными каналами для идеальной укладки."],
];

const LINES = [
  { name: "UNIQUE PPF Clear",  desc: "Прозрачная плёнка для полной защиты — сохраняет заводской вид.", tag: "Классика" },
  { name: "UNIQUE PPF Satin",  desc: "Матовая плёнка с эффектом сатина — придаёт кузову шёлковую фактуру.", tag: "Новинка" },
  { name: "UNIQUE PPF Colour", desc: "Более 80 цветов — от глубокого чёрного до жемчужных металликов.", tag: "Смена цвета" },
  { name: "UNIQUE Interior",   desc: "Защитное покрытие для салонной кожи, алькантары и деревянных вставок.", tag: "Салон" },
];

function PlenkaPage() {
  return (
    <div>
      <PageHero
        eyebrow="Эксклюзивная плёнка UNIQUE"
        title={<>Особые свойства,<br />которые вы почувствуете.</>}
        lede="Мы разработали и используем собственную плёнку, обладающую уникальными характеристиками. Она обеспечивает максимальную защиту, сохраняет насыщенность цвета и обладает повышенной эластичностью."
        seed={11}
      />

      {/* ИНТРО */}
      <section className="px-[6vw] py-32">
        <div className="mx-auto grid max-w-[1280px] gap-16 md:grid-cols-[0.9fr_1.1fr] md:items-center">
          <div className="relative aspect-[4/5] overflow-hidden">
            <img src={carImage(8, 1600)} alt="Плёнка UNIQUE" className="h-full w-full object-cover" loading="lazy" />
          </div>
          <div className="space-y-6 text-[15.5px] leading-[1.95] text-mute">
            <p className="eyebrow eyebrow-dot">Разработана европейским центром UNIQUE</p>
            <p>
              Плёнка UNIQUE — это не просто расходный материал. Это результат десяти лет практики
              в европейской студии, где каждая рецептура клеевого слоя и топ-коата отрабатывалась
              на реальных автомобилях, а не в лаборатории.
            </p>
            <p>
              Мы производим её ограниченными партиями и используем только в собственной студии.
              Её нельзя купить отдельно — только вместе с работой мастеров UNIQUE и десятилетней
              гарантией центра.
            </p>
            <p>
              Плёнка идеально ложится на любые поверхности без необходимости разбора автомобиля.
              Качество и долговечность, которые подтверждаются реальными кейсами.
            </p>
          </div>
        </div>
      </section>

      {/* СВОЙСТВА */}
      <section className="border-y border-line bg-obsidian-2 px-[6vw] py-32">
        <div className="mx-auto max-w-[1400px]">
          <Rule label="Технические свойства" num="01" />
          <div className="grid gap-[2px] bg-line md:grid-cols-3">
            {PROPERTIES.map(([t, c], i) => (
              <div key={t} className="bg-obsidian p-10">
                <p className="font-display text-2xl text-ember">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-8 font-display text-xl uppercase text-ivory" style={{ letterSpacing: "0.05em" }}>{t}</h3>
                <p className="mt-6 text-[14.5px] leading-[1.85] text-mute">{c}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ЛИНЕЙКА */}
      <section className="px-[6vw] py-32">
        <div className="mx-auto max-w-[1400px]">
          <Rule label="Линейка плёнок UNIQUE" num="02" />
          <div className="grid gap-6 md:grid-cols-2">
            {LINES.map((l, i) => (
              <article key={l.name} className="group relative overflow-hidden border border-line bg-obsidian">
                <div className="relative aspect-[16/9] overflow-hidden">
                  <div className="absolute inset-0 bg-cover bg-center transition-transform duration-[1400ms] group-hover:scale-105" style={{ backgroundImage: `url(${carImage(i * 4 + 3, 1400)})` }} />
                  <div className="absolute inset-0 plate-scrim" />
                  <span className="absolute right-4 top-4 border border-ember px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-ember">{l.tag}</span>
                </div>
                <div className="p-10">
                  <h3 className="font-display text-2xl uppercase text-ivory" style={{ letterSpacing: "0.06em" }}>{l.name}</h3>
                  <p className="mt-4 text-[14.5px] leading-[1.85] text-mute">{l.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* СРАВНЕНИЕ */}
      <section className="bg-obsidian-2 px-[6vw] py-32">
        <div className="mx-auto max-w-[1100px]">
          <Rule label="UNIQUE PPF в сравнении" num="03" />
          <div className="border border-line">
            <div className="grid grid-cols-3 border-b border-line bg-obsidian px-8 py-6 text-[10px] uppercase tracking-[0.3em] text-mute-2">
              <span>Характеристика</span>
              <span>Обычная PPF</span>
              <span className="text-ember">UNIQUE PPF</span>
            </div>
            {[
              ["Эластичность",             "180 %",    "320 %"],
              ["Гарантия производителя",   "5 лет",    "10 лет"],
              ["Самовосстановление",       "Есть",     "Улучшенное, от 40°C"],
              ["Толщина",                  "150 мкм",  "210 мкм"],
              ["Прозрачность",             "98.5 %",   "99.7 %"],
              ["Работа без разбора авто",  "Частично", "Полностью"],
            ].map(([a, b, c]) => (
              <div key={a} className="grid grid-cols-3 border-b border-line px-8 py-6 text-[14.5px] text-mute last:border-b-0">
                <span className="text-ivory">{a}</span>
                <span>{b}</span>
                <span className="text-ember">{c}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ЦИТАТА */}
      <section className="relative overflow-hidden border-y border-line py-32 text-center">
        <div className="absolute inset-0 bg-cover bg-center opacity-25" style={{ backgroundImage: `url(${lifestyleImage(9, 1800)})` }} />
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian via-obsidian/70 to-obsidian" />
        <blockquote className="relative z-10 mx-auto max-w-[820px] px-[6vw]">
          <p className="font-display uppercase leading-[1.2] text-ivory" style={{ fontSize: "clamp(24px,3vw,38px)", letterSpacing: "0.06em" }}>
            «Плёнка UNIQUE — это отношение к вещи, которую ты любишь. Всё остальное — просто плёнка.»
          </p>
        </blockquote>
      </section>

      {/* CTA */}
      <section className="border-b border-line px-[6vw] py-32 text-center">
        <h2 className="mx-auto max-w-[720px] font-display uppercase leading-tight text-ivory" style={{ fontSize: "clamp(26px,3.6vw,44px)", letterSpacing: "0.06em" }}>
          Оклейте автомобиль плёнкой UNIQUE.
        </h2>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link to="/kontakty" className="btn-line btn-ember">Рассчитать стоимость</Link>
          <Link to="/raboty" className="btn-line">Посмотреть работы</Link>
        </div>
      </section>
    </div>
  );
}
