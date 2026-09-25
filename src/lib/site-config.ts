/**
 * Single source of truth for contact / legal / map values.
 * Every page (header, menu, footer, contacts, policy, JSON-LD) reads from here —
 * to change the address, phone or hours, edit ONLY this file.
 *
 * Values marked TODO(client) are placeholders taken from the
 * «Укрупненные комментарии по сайту» brief and must be confirmed before launch.
 */

/* ── Phone & messengers (brief: «телефон и мессенджеры — в шапку») ── */
// TODO(client): confirm the studio's working phone number.
export const SITE_PHONE_DISPLAY = "+7 (981) 901-01-00";
export const SITE_PHONE_HREF = "tel:+79819010100";
/** True while the phone above is still the placeholder — hides it from structured data. */
export const PHONE_IS_PLACEHOLDER = SITE_PHONE_DISPLAY.includes("000) 000");

// TODO(client): confirm the Instagram handle/URL.
export const INSTAGRAM_URL = "https://instagram.com/uniquedetailing";

// Future channels from the brief (ВК, Telegram, Max): set a URL and the link
// appears automatically in the header, menu, footer and contacts page.
export const VK_URL: string | null = null;
export const TELEGRAM_URL: string | null = null;
export const MAX_MESSENGER_URL: string | null = null;

export const SOCIAL_LINKS = [
  { label: "Instagram", short: "IG", href: INSTAGRAM_URL as string | null },
  { label: "ВК", short: "ВК", href: VK_URL },
  { label: "Telegram", short: "TG", href: TELEGRAM_URL },
  { label: "Max", short: "Max", href: MAX_MESSENGER_URL },
].filter((x): x is { label: string; short: string; href: string } => Boolean(x.href));

/* ── Working hours (brief: «график работы с 9:00») ── */
// TODO(client): confirm closing time (20:00 is kept from the previous site).
export const WORK_OPEN = "9:00";
export const WORK_CLOSE = "20:00";
export const WORK_HOURS = `Ежедневно с ${WORK_OPEN} до ${WORK_CLOSE}`;
export const WORK_HOURS_SHORT = `Ежедневно · ${WORK_OPEN} – ${WORK_CLOSE}`;

/* ── Address & map (brief: «изменить адрес + привязать карту») ── */
// TODO(client): the brief asks to CHANGE the address but does not give the new
// one. Replace the values below (address + coordinates) — nothing else needs to change.
export const STUDIO_CITY = "г. Санкт-Петербург";
export const STUDIO_ADDRESS_LINES = [
  "поселок имени Свердлова,",
  "ул. Петрозаводская, 33",
];
export const STUDIO_ADDRESS_ONE_LINE =
  "поселок имени Свердлова, ул. Петрозаводская, 33";
export const STUDIO_ADDRESS_SHORT = "пос. им. Свердлова, ул. Петрозаводская, 33";
export const STUDIO_STREET = "ул. Петрозаводская, 33";
export const STUDIO_LOCALITY = "поселок имени Свердлова";
// TODO(client): APPROXIMATE — replace with the exact point (Yandex Maps: press and hold on the building → «Что здесь?»).
export const STUDIO_LAT = 59.8119;
export const STUDIO_LON = 30.6096;
export const MAP_ZOOM = 17;

/** Address as the client wrote it. Yandex Maps / 2ГИС geocode it themselves, so the buttons open the real building. */
export const STUDIO_MAP_QUERY = "Санкт-Петербург, поселок имени Свердлова, ул. Петрозаводская 33";
const Q = encodeURIComponent(STUDIO_MAP_QUERY);
/** Yandex map embed. By address (Yandex finds the building itself). */
export const YANDEX_EMBED_BY_ADDRESS = `https://yandex.ru/map-widget/v1/?text=${Q}&z=17&l=map`;
/** Yandex map embed pinned at exact coordinates (plain pin, no address popup). */
export const yandexEmbedAt = (lat: number, lon: number) =>
  `https://yandex.ru/map-widget/v1/?ll=${lon}%2C${lat}&z=17&l=map&pt=${lon}%2C${lat}%2Cpm2rdm`;
export const YANDEX_ROUTE_URL = `https://yandex.ru/maps/?mode=routes&rtext=~${Q}&rtt=auto`;
export const YANDEX_POINT_URL = `https://yandex.ru/maps/?text=${Q}&z=17`;
export const GIS2_POINT_URL = `https://2gis.ru/search/${Q}`;
/** Address used by the on-site map to find the building automatically (OpenStreetMap geocoder). */
export const STUDIO_GEOCODE_QUERY = "Петрозаводская улица 33, поселок имени Свердлова, Всеволожский район";

/* ── Legal operator of personal data (needed for the policy / consent pages) ── */
// TODO(client): fill in the legal entity — required by 152-ФЗ for the policy and consent.
export const OPERATOR = {
  name: "[Наименование юридического лица / ИП — уточнить у клиента]",
  inn: "[ИНН]",
  ogrn: "[ОГРН / ОГРНИП]",
  address: "[Юридический адрес]",
} as const;
/** Date shown as «редакция от» on the legal pages. */
export const LEGAL_DOCS_DATE = "24 сентября 2026 г.";

/* ── Documents linked from the form and the footer ── */
export const DOC_PRIVACY = "/politika";
export const DOC_CONSENT = "/soglasie";
