/**
 * !!! PLACEHOLDER REVIEWS — NOT REAL CUSTOMERS !!!
 * These three entries are illustrative sample text so the reviews block can
 * be reviewed visually. Replace them with real, consented client reviews
 * (name, car, quote) BEFORE the site goes live. Do not publish invented
 * testimonials.
 */
/** `placeholder: true` shows an «Пример отзыва» badge on the card — remove the flag when the text is a real, consented review. */
export type Review = { name: string; car: string; quote: string; placeholder?: boolean };

export const REVIEWS: Review[] = [
  {
    placeholder: true,
    name: "Александр",
    car: "Mercedes-Benz S-Class",
    quote:
      "Отдали автомобиль на полную оклейку защитной полиуретановой плёнкой (PPF) — забрали как новый. Работали аккуратно, без разбора, и держали в курсе на каждом этапе.",
  },
  {
    placeholder: true,
    name: "Ирина",
    car: "Porsche Cayenne",
    quote:
      "Сделали смену цвета плёнкой — результат превзошёл ожидания. Отдельно порадовал клубный формат студии и внимание к деталям.",
  },
  {
    placeholder: true,
    name: "Дмитрий",
    car: "Range Rover",
    quote:
      "Керамика и детейлинг салона — всё в срок, с гарантией и понятным договором. Обращусь ещё для следующего автомобиля.",
  },
];
