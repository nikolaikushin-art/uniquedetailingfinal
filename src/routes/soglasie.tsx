import { createFileRoute, Link } from "@tanstack/react-router";
import { pageSeo } from "@/lib/seo";
import { CONTACT_EMAIL } from "@/lib/cdn";
import { DOC_PRIVACY, LEGAL_DOCS_DATE, OPERATOR } from "@/lib/site-config";

export const Route = createFileRoute("/soglasie")({
  head: () =>
    pageSeo({
      title: "Согласие на обработку персональных данных — UNIQUE Detailing",
      description:
        "Текст согласия на обработку персональных данных, которое даёт посетитель сайта uniquedetailing.ru при отправке заявки.",
      path: "/soglasie",
    }),
  component: SoglasiePage,
});

function SoglasiePage() {
  return (
    <div className="px-[6vw] pb-32 pt-36">
      <div className="mx-auto max-w-[760px]">
        <p className="eyebrow mb-6">Документы</p>
        <h1
          className="font-display uppercase leading-tight text-ivory"
          style={{ fontSize: "clamp(30px,4vw,50px)", letterSpacing: "0.04em" }}
        >
          Согласие на обработку персональных данных
        </h1>
        <p className="mt-4 text-[12px] uppercase tracking-[0.25em] text-mute-2">
          Редакция от {LEGAL_DOCS_DATE}
        </p>

        <div className="mt-12 space-y-6 text-[15.5px] leading-[1.95] text-mute">
          <p>
            Отправляя заявку через форму на сайте{" "}
            <span className="text-ivory">uniquedetailing.ru</span>, я свободно, своей волей и в
            своём интересе даю согласие оператору —{" "}
            <span className="text-ivory">{OPERATOR.name}</span> (ИНН {OPERATOR.inn}, ОГРН{" "}
            {OPERATOR.ogrn}, {OPERATOR.address}; далее — «Студия»), на обработку моих персональных
            данных на следующих условиях.
          </p>
          <p>
            <span className="text-ivory">Персональные данные:</span> имя, номер телефона, адрес
            электронной почты, марка и модель автомобиля, выбранная услуга, текст комментария, а
            также дата и время отправки заявки.
          </p>
          <p>
            <span className="text-ivory">Цели обработки:</span> связь со мной по моей заявке, расчёт
            стоимости и сроков работ, согласование записи в студию, заключение и исполнение договора
            на оказание услуг.
          </p>
          <p>
            <span className="text-ivory">Действия с данными:</span> сбор, запись, систематизация,
            накопление, хранение, уточнение, использование, передача исполнителям Студии в объёме,
            необходимом для выполнения заявки, обезличивание, блокирование, удаление и уничтожение —
            с использованием средств автоматизации и без них.
          </p>
          <p>
            <span className="text-ivory">Срок действия:</span> согласие действует до достижения
            целей обработки либо до момента его отзыва. Я могу отозвать согласие в любое время,
            направив письмо на{" "}
            <a
              className="text-ivory underline-offset-4 hover:underline"
              href={`mailto:${CONTACT_EMAIL}`}
            >
              {CONTACT_EMAIL}
            </a>
            .
          </p>
          <p>
            Порядок обработки данных и мои права описаны в{" "}
            <Link to={DOC_PRIVACY} className="text-ivory underline-offset-4 hover:underline">
              политике конфиденциальности
            </Link>
            .
          </p>
        </div>

        <div className="mt-14 flex flex-wrap gap-4">
          <Link to="/kontakty" className="btn-line">
            Вернуться к форме
          </Link>
          <Link to={DOC_PRIVACY} className="btn-line">
            Политика конфиденциальности
          </Link>
        </div>
      </div>
    </div>
  );
}
