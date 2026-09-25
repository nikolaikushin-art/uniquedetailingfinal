import type { ServiceGroupId } from "./services";

/** Extra, non-price content shown on every service page, by direction. */
export type GroupExtras = {
  audience: string[];
  prepare: string[];
  /** Slugs of services worth ordering together. */
  together: string[];
};

export const GROUP_EXTRAS: Record<ServiceGroupId, GroupExtras> = {
  ppf: {
    audience: [
      "Новый автомобиль — сохранить заводской лак с первого дня.",
      "Автомобиль с пробегом в хорошем состоянии лака — остановить появление сколов и царапин.",
      "Те, кто много ездит по трассе или по городу с реагентами.",
    ],
    prepare: [
      "Сообщите о сколах, вмятинах и прежних ремонтах кузова.",
      "Заранее определитесь: полная оклейка или отдельные зоны — обсудим на консультации.",
      "Выберите финиш: глянцевый, сатиновый или матовый.",
    ],
    together: ["keramika", "polirovka-kuzova", "tonirovanie-i-okleyka-optiki"],
  },
  color: {
    audience: [
      "Хотите новый цвет без перекраски и потери заводского лака.",
      "Хотите иметь возможность вернуть заводской цвет — плёнка снимается.",
      "Планируете индивидуальный образ автомобиля.",
    ],
    prepare: [
      "Выберите 2–3 цвета — образцы покажем в студии при дневном свете.",
      "Уточните желаемый финиш: глянец, сатин или мат.",
      "Сообщите о состоянии лака и ремонтах кузова.",
    ],
    together: ["stilevaya-vinilografiya", "keramika", "tonirovanie-i-okleyka-optiki"],
  },
  body: {
    audience: [
      "Царапины, голограммы и потускневший лак.",
      "Подготовка автомобиля к продаже или перед нанесением защиты.",
      "Мелкие вмятины без повреждения лакокрасочного покрытия — по результатам осмотра.",
    ],
    prepare: [
      "Опишите дефекты и когда они появились.",
      "Приезжайте на чистом автомобиле — осмотр будет точнее.",
      "Сообщите, если кузов ранее красили или полировали.",
    ],
    together: ["keramika", "ppf-unique-protection", "polirovka-stekol-i-far"],
  },
  coatings: {
    audience: [
      "Нужна защита лака без оклейки плёнкой.",
      "Хотите гидрофобный эффект и лёгкую мойку.",
      "Хотите усилить защиту поверх PPF.",
    ],
    prepare: [
      "Покрытие наносится на подготовленный лак — при необходимости сначала выполним полировку.",
      "Уточните, какой срок защиты для вас важен.",
      "Планируйте визит без дождя в день выдачи — покрытию нужно время на выдержку.",
    ],
    together: ["polirovka-kuzova", "ppf-unique-protection", "himchistka"],
  },
  interior: {
    audience: [
      "Загрязнения, пятна и запахи в салоне.",
      "Вытертая кожа, потёртости ткани и пластика.",
      "Подготовка автомобиля к продаже или после аренды.",
    ],
    prepare: [
      "Заранее уточните материалы отделки: кожа, алькантара, ткань.",
      "Уберите личные вещи из салона.",
      "Расскажите о проблемных пятнах и о том, чем их пытались удалить.",
    ],
    together: ["obrabotka-zashchitnymi-sostavami", "ozonirovanie", "keramika"],
  },
  wash: {
    audience: [
      "Подкапотное пространство или подвеска давно не обслуживались.",
      "Перед осмотром, ремонтом или нанесением защитных составов.",
      "Автомобиль эксплуатируется в грязи и реагентах.",
    ],
    prepare: [
      "Сообщите об особенностях автомобиля и недавних ремонтах.",
      "Уточните, нужна ли мойка отдельно или в составе комплекса.",
      "Оставьте нам контакт для ежедневного видеоотчёта.",
    ],
    together: ["antikorroziynoe-pokrytie-gma", "keramika", "kompleksnaya-chistka-salona"],
  },
  anticor: {
    audience: [
      "Автомобиль эксплуатируется зимой с реагентами.",
      "Хотите защитить металл кузова и днища.",
      "Новый автомобиль — защитить металл с самого начала.",
    ],
    prepare: [
      "Сообщите о зонах, где уже есть очаги коррозии.",
      "Приезжайте на автомобиле без свежего ремонта кузова.",
      "Обсудите зоны обработки на консультации.",
    ],
    together: ["myka-podveski", "myka-podkapotnogo-prostranstva"],
  },
  glass: {
    audience: [
      "Нужно тонирование с подбором плёнки и светопропускания.",
      "Хотите защитить фары и задние фонари от сколов и помутнения.",
      "Оформляете автомобиль комплексно.",
    ],
    prepare: [
      "Уточните, какие стёкла и какое светопропускание вам нужны.",
      "Учитывайте требования к светопропусканию в вашем регионе.",
      "Сообщите о сколах и царапинах на стёклах.",
    ],
    together: ["polirovka-stekol-i-far", "ppf-unique-protection", "keramika"],
  },
};

/** One-line hint under each direction title in the menu. */
export const GROUP_MENU_HINT: Record<ServiceGroupId, string> = {
  ppf: "Защита кузова от сколов и царапин",
  color: "Полиуретан 180 цветов · винил 200+",
  body: "Полировка, вмятины, вкрапления",
  coatings: "Керамика, кварц, воски, антидождь",
  interior: "Чистка, химчистка, ремонт, озонирование",
  wash: "Подкапотное пространство и подвеска",
  anticor: "Металлокомпозит GMA",
  glass: "Тонирование и защита оптики",
};

/** Short, similar-length labels for menus (full titles stay on the service pages). */
export const MENU_LABEL: Record<string, string> = {
  "ppf-unique-protection": "PPF UNIQUE Protection",
  "ppf-xpel-gswf-legend": "PPF XPEL · GSWF · Legend",
  "smena-cveta-poliuretan": "Полиуретан · 180 цветов",
  "smena-cveta-vinil": "Винил · 200+ цветов",
  "stilevaya-vinilografiya": "Стилевая винилография",
  "polirovka-kuzova": "Полировка кузова",
  "polirovka-stekol-i-far": "Полировка стёкол и фар",
  "udalenie-vmyatin-i-carapin": "Вмятины и царапины",
  "udalenie-vkrapleniy": "Удаление вкраплений",
  keramika: "Керамическое покрытие",
  "kvarc-zhidkoe-steklo": "Кварц (жидкое стекло)",
  voski: "Защитные воски",
  antidozhd: "Антидождь",
  "kompleksnaya-chistka-salona": "Комплексная чистка салона",
  himchistka: "Химчистка салона",
  "chistka-plastika-i-alyuminiya": "Пластик и алюминий",
  "remont-kozhi-i-tkani": "Ремонт кожи и ткани",
  "obrabotka-zashchitnymi-sostavami": "Защитные составы",
  ozonirovanie: "Озонирование салона",
  "myka-podkapotnogo-prostranstva": "Мойка подкапотного",
  "myka-podveski": "Мойка подвески",
  "antikorroziynoe-pokrytie-gma": "Антикоррозия GMA",
  "tonirovanie-i-okleyka-optiki": "Тонирование и оптика",
};
