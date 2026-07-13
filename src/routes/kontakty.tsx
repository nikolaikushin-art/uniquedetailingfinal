import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHero } from "@/components/site/PageHero";

export const Route = createFileRoute("/kontakty")({
  head: () => ({
    meta: [
      { title: "Контакты — UNIQUE Detailing" },
      {
        name: "description",
        content:
          "Студия UNIQUE Detailing — Санкт-Петербург, микрорайон Овцино, Петрозаводская улица, 33. Ежедневно с 10:00 до 20:00. info@uniquedetailing.ru",
      },
      { property: "og:title", content: "Контакты — UNIQUE Detailing" },
      {
        property: "og:description",
        content: "Записаться в студию UNIQUE. Скоро открытие в Санкт-Петербурге.",
      },
    ],
  }),
  component: KontaktyPage,
});

function KontaktyPage() {
  const [sent, setSent] = useState(false);
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
        image="/portfolio/audi-r8-v10-performance-0.jpg"
      />

      {/* КОНТАКТЫ + ФОРМА */}
      <section className="px-[6vw] py-32">
        <div className="mx-auto grid max-w-[1280px] gap-16 md:grid-cols-[0.9fr_1.1fr]">
          {/* Инфо */}
          <aside className="space-y-10">
            <div>
              <p className="eyebrow mb-4">Адрес студии</p>
              <p
                className="font-display text-2xl uppercase text-ivory"
                style={{ letterSpacing: "0.05em" }}
              >
                г. Санкт-Петербург
              </p>
              <p className="mt-3 text-[15px] leading-[1.85] text-mute">
                Ленинградская область,
                <br />
                микрорайон Овцино,
                <br />
                Петрозаводская улица, 33
              </p>
              <p className="mt-4 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-ember">
                <span className="h-[6px] w-[6px] rounded-full bg-ember shadow-[0_0_10px_theme(colors.ember)]" />
                Скоро открытие
              </p>
            </div>

            <div>
              <p className="eyebrow mb-4">Связь</p>
              <p className="text-[15px] text-mute">
                <a href="mailto:info@uniquedetailing.ru" className="hover:text-ivory">
                  info@uniquedetailing.ru
                </a>
              </p>
            </div>

            <div>
              <p className="eyebrow mb-4">Режим работы</p>
              <p className="text-[15px] text-mute">Ежедневно с 10:00 до 20:00</p>
              <p className="text-[13px] text-mute-2 mt-1">
                Приём автомобилей — по предварительной записи
              </p>
            </div>

            <div>
              <p className="eyebrow mb-4">Дискретность</p>
              <p className="text-[15px] leading-[1.85] text-mute">
                Никакая заявка и ни один автомобиль не публикуются без письменного согласия
                владельца.
              </p>
            </div>
          </aside>

          {/* Форма */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
            className="space-y-8 border border-line bg-obsidian-2 p-10"
          >
            {sent ? (
              <div className="flex min-h-[400px] flex-col items-center justify-center text-center">
                <p className="eyebrow mb-6">Заявка принята</p>
                <p
                  className="font-display text-3xl uppercase text-ivory"
                  style={{ letterSpacing: "0.05em" }}
                >
                  Спасибо!
                </p>
                <p className="mt-6 max-w-[440px] text-[15px] leading-[1.85] text-mute">
                  Наш менеджер свяжется с вами в течение часа, чтобы уточнить детали и рассчитать
                  стоимость.
                </p>
              </div>
            ) : (
              <>
                <div>
                  <p className="eyebrow mb-2">Рассчитать стоимость</p>
                  <h2
                    className="font-display text-3xl uppercase text-ivory"
                    style={{ letterSpacing: "0.05em" }}
                  >
                    Оставьте заявку
                  </h2>
                </div>

                {[
                  ["Ваше имя", "name", "text"],
                  ["Телефон", "phone", "tel"],
                  ["Email", "email", "email"],
                  ["Марка и модель авто", "car", "text"],
                ].map(([label, name, type]) => (
                  <div key={name}>
                    <label
                      htmlFor={name}
                      className="mb-3 block text-[10px] uppercase tracking-[0.35em] text-mute-2"
                    >
                      {label}
                    </label>
                    <input
                      id={name}
                      name={name}
                      type={type}
                      className="w-full border-b border-line bg-transparent p-3 text-ivory outline-none focus:border-ivory"
                    />
                  </div>
                ))}

                <div>
                  <label className="mb-3 block text-[10px] uppercase tracking-[0.35em] text-mute-2">
                    Интересующая услуга
                  </label>
                  <select className="w-full border border-line bg-transparent p-4 text-ivory outline-none focus:border-ivory">
                    {[
                      "Полная оклейка PPF",
                      "Зональная оклейка PPF",
                      "Смена цвета плёнкой",
                      "Керамическая защита",
                      "Восстановление + защита",
                      "Тонирование стёкол",
                      "Детейлинг салона",
                      "Другое",
                    ].map((o) => (
                      <option key={o} className="bg-obsidian">
                        {o}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-3 block text-[10px] uppercase tracking-[0.35em] text-mute-2">
                    Комментарий
                  </label>
                  <textarea
                    rows={5}
                    className="w-full border border-line bg-transparent p-4 text-ivory outline-none focus:border-ivory"
                    placeholder="Опишите пожелания или задайте вопрос"
                  />
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4">
                  <p className="max-w-[300px] text-[11px] leading-[1.6] text-mute-2">
                    Нажимая «Отправить», вы соглашаетесь на обработку персональных данных.
                  </p>
                  <button type="submit" className="btn-line btn-ember">
                    Отправить заявку
                  </button>
                </div>
              </>
            )}
          </form>
        </div>
      </section>

      {/* ПРЕМИАЛЬНАЯ КАРТА */}
      <section className="border-t border-line px-[6vw] py-24">
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-5">
            <div>
              <p className="eyebrow eyebrow-dot mb-4">Локация клубной студии</p>
              <h2
                className="font-display uppercase leading-tight text-ivory"
                style={{ fontSize: "clamp(26px,3vw,42px)", letterSpacing: "0.05em" }}
              >
                Найдите нас
                <br />
                <span className="text-ember">на карте.</span>
              </h2>
            </div>
            <p className="max-w-[360px] text-[13.5px] leading-[1.85] text-mute">
              Живая карта с учётом пробок. Постройте маршрут в один клик — от вашего местоположения
              до дверей студии UNIQUE.
            </p>
          </div>

          <div className="relative overflow-hidden border border-line-strong bg-obsidian-2">
            {/* corner accents */}
            <span className="pointer-events-none absolute left-0 top-0 z-20 h-8 w-8 border-l-2 border-t-2 border-ember/70" />
            <span className="pointer-events-none absolute right-0 top-0 z-20 h-8 w-8 border-r-2 border-t-2 border-ember/70" />
            <span className="pointer-events-none absolute bottom-0 left-0 z-20 h-8 w-8 border-b-2 border-l-2 border-ember/70" />
            <span className="pointer-events-none absolute bottom-0 right-0 z-20 h-8 w-8 border-b-2 border-r-2 border-ember/70" />

            <div className="grid md:grid-cols-[1fr_360px]">
              <div className="relative min-h-[440px] md:min-h-[580px]">
                <iframe
                  title="UNIQUE Detailing — Санкт-Петербург, Петрозаводская улица 33 (карта с пробками)"
                  src="https://yandex.ru/map-widget/v1/?ll=30.740%2C59.849&z=14&l=map%2Ctrf&pt=30.740%2C59.849%2Cpm2rdm"
                  className="absolute inset-0 h-full w-full contrast-[1.05] saturate-[1.05]"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
                <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_120px_rgba(8,9,11,0.65)]" />
                <span className="pointer-events-none absolute left-5 top-5 z-10 flex items-center gap-2 rounded-sm bg-obsidian/80 px-3 py-1.5 text-[10px] uppercase tracking-[0.3em] text-ivory backdrop-blur">
                  <span className="h-[6px] w-[6px] rounded-full bg-ember shadow-[0_0_10px_theme(colors.ember)]" />
                  Пробки · live
                </span>
              </div>

              <aside className="flex flex-col justify-between gap-8 border-t border-line bg-obsidian p-8 md:border-l md:border-t-0 md:p-10">
                <div className="space-y-6">
                  <div>
                    <p className="eyebrow mb-3">Адрес</p>
                    <p
                      className="font-display text-xl uppercase text-ivory"
                      style={{ letterSpacing: "0.05em" }}
                    >
                      Петрозаводская 33
                    </p>
                    <p className="mt-2 text-[14px] leading-[1.8] text-mute">
                      микрорайон Овцино,
                      <br />
                      Ленинградская область
                    </p>
                  </div>
                  <div>
                    <p className="eyebrow mb-3">Режим</p>
                    <p className="text-[14px] text-mute">Ежедневно · 10:00 – 20:00</p>
                    <p className="mt-1 text-[13px] text-mute-2">Приём — по записи</p>
                  </div>
                  <div className="grid grid-cols-2 gap-px border border-line bg-line text-center">
                    <div className="bg-obsidian px-3 py-4">
                      <p className="font-display text-2xl text-ember">~30</p>
                      <p className="mt-1 text-[9px] uppercase tracking-[0.25em] text-mute-2">
                        мин из центра
                      </p>
                    </div>
                    <div className="bg-obsidian px-3 py-4">
                      <p className="font-display text-2xl text-ember">P</p>
                      <p className="mt-1 text-[9px] uppercase tracking-[0.25em] text-mute-2">
                        клубная парковка
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <a
                    href="https://yandex.ru/maps/?mode=routes&rtext=~59.849%2C30.740&z=15"
                    target="_blank"
                    rel="noreferrer noopener"
                    className="btn-line btn-ember block text-center"
                  >
                    Проложить маршрут
                  </a>
                  <a
                    href="https://yandex.ru/maps/?ll=30.740%2C59.849&z=16&pt=30.740%2C59.849%2Cpm2rdm"
                    target="_blank"
                    rel="noreferrer noopener"
                    className="btn-line block text-center"
                  >
                    Открыть в Яндекс Картах
                  </a>
                </div>
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
          <div className="grid gap-8 md:grid-cols-3">
            {[
              [
                "На автомобиле",
                "Из центра Санкт-Петербурга — около 30 минут по Мурманскому шоссе.",
              ],
              ["Собственная парковка", "Закрытая клубная парковка на территории студии."],
              [
                "Клиентская зона",
                "Уютный лаундж с кофе, Wi-Fi и рабочим местом на время диагностики.",
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
