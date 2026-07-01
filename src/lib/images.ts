// Curated pool of luxury automotive / lifestyle Unsplash photo IDs.
// Cycled deterministically by index to keep every vehicle & section visually rich.

const build = (id: string, w = 1600, h?: number) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&q=80&w=${w}${h ? `&h=${h}` : ""}`;

export const CAR_IDS = [
  "1503376780353-7e6692767b70",
  "1494976388531-d1058494cdd8",
  "1544636331-e26879cd4d9b",
  "1555215695-3004980ad54e",
  "1552519507-da3b142c6e3d",
  "1503736334956-4c8f8e92946d",
  "1580273916550-e323be2ae537",
  "1493238792000-8113da705763",
  "1583121274602-3e2820c69888",
  "1618843479313-40f8afb4b4d8",
  "1550355291-bbee04a92027",
  "1541348263662-e068662d82af",
  "1449965408869-eaa3f722e40d",
  "1502877338535-766e1452684a",
  "1592194996308-7b43878e84a6",
  "1610647752706-3bb12232b3ab",
  "1607603750909-408e193868c7",
  "1553440569-bcc63803a83d",
  "1621135802920-133df287f89c",
  "1616422285623-13ff0162ea87",
  "1580414057403-c5f451f30e1c",
  "1533473359331-0135ef1b58bf",
  "1626668893632-6f3a4466d22f",
  "1550355291-bbee04a92027",
  "1544829099-b9a0c07fad1a",
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

export const carGallery = (seed: number, n = 6) =>
  Array.from({ length: n }, (_, k) => carImage(seed + k * 3 + k));