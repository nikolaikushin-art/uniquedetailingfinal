// Curated pool of luxury automotive / lifestyle Unsplash photo IDs.
// Cycled deterministically by index to keep every vehicle & section visually rich.

const build = (id: string, w = 1600, h?: number) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&q=80&w=${w}${h ? `&h=${h}` : ""}`;

export const commonsImage = (file: string, w = 1600) =>
  `https://commons.wikimedia.org/wiki/Special:Redirect/file/${encodeURIComponent(file)}?width=${w}`;

export const CAR_IDS = [
  "1503376780353-7e6692767b70", // Audi R8
  "1494976388531-d1058494cdd8", // black sports
  "1544636331-e26879cd4d9b",    // AMG GT
  "1555215695-3004980ad54e",    // Porsche
  "1552519507-da3b142c6e3d",    // Porsche 911
  "1503736334956-4c8f8e92946d", // Ferrari
  "1580273916550-e323be2ae537", // Lambo
  "1493238792000-8113da705763", // Aston
  "1583121274602-3e2820c69888", // classic
  "1618843479313-40f8afb4b4d8", // black sedan
  "1550355291-bbee04a92027",    // BMW
  "1541348263662-e068662d82af", // Bentley
  "1449965408869-eaa3f722e40d", // road car
  "1502877338535-766e1452684a", // Merc
  "1544829099-b9a0c07fad1a",    // Rolls
  "1610647752706-3bb12232b3ab", // interior
  "1607603750909-408e193868c7", // detail
  "1553440569-bcc63803a83d",    // side profile
  "1621135802920-133df287f89c", // wheel detail
  "1616422285623-13ff0162ea87", // matte
  "1580414057403-c5f451f30e1c", // studio
  "1533473359331-0135ef1b58bf", // luxury interior
  "1626668893632-6f3a4466d22f", // sports
  "1503174971373-b1f69850bded", // Porsche rear
  "1511919884226-fd3cad34687c", // Audi
];

export const LIFESTYLE_IDS = [
  "1519643225200-94e79e383724", // yacht/harbour
  "1441986300917-64674bd600d8", // architecture
  "1445019980597-93fa8acb246c", // interior
  "1470723710355-95304d8aece4", // suit/tailor
  "1512212621149-107ffe572d2f", // whisky
  "1519669417670-68775a50919c", // clock
  "1489599849927-2ee91cede3ba", // travel
  "1508615039623-a25605d2b022", // gloves leather
  "1465146344425-f00d5f5c8f07", // landscape
  "1476514525535-07fb3b4ae5f1", // road
  "1517649763962-0c623066013b", // watch
  "1493552832879-9be48737d0e5", // cognac
  "1517502884422-41eaead166d4", // hotel bar
  "1501594907352-04cda38ebc29", // mountain road
  "1470504106018-51b1a86e8e7b", // architecture bw
];

export const carImage = (i: number, w = 1600) => build(CAR_IDS[i % CAR_IDS.length], w);
export const lifestyleImage = (i: number, w = 1600) => build(LIFESTYLE_IDS[i % LIFESTYLE_IDS.length], w);

// Responsive srcset for <img srcSet>. Widths tuned for hero/gallery use.
export const carImageSrcSet = (i: number, widths: number[] = [640, 960, 1280, 1600, 1920]) =>
  widths.map(w => `${carImage(i, w)} ${w}w`).join(", ");

export const carGallery = (seed: number, n = 12) =>
  Array.from({ length: n }, (_, k) => carImage(seed * 3 + k * 5 + (k % 3), 1800));

// Parallel array of indices so consumers can build responsive srcsets per image.
export const carGalleryIndices = (seed: number, n = 12) =>
  Array.from({ length: n }, (_, k) => (seed * 3 + k * 5 + (k % 3)) % CAR_IDS.length);

