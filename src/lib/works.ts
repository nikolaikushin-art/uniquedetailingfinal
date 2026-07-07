// UNIQUE Detailing — портфолио выполненных работ
import { commonsImage } from "./images";

export type Spec = { label: string; value: string };
export type Bespoke = { title: string; note: string; options: string[] };

export type Work = {
  slug: string;
  brand: string;
  model: string;
  category: "PPF" | "Смена цвета" | "Керамика" | "Восстановление";
  tagline: string;
  hours: string;
  film: string;
  duration: string;
  story: string[];
  quote: string;
  hero: string;
  gallery: string[];
  works: string[];
  materials: { name: string; note: string }[];
  faqs: { q: string; a: string }[];
  year: number;
  city: string;
  variant: 0 | 1 | 2 | 3;
  specs: Spec[];
  performance: { power: string; torque: string; zeroTo: string; top: string; weight: string };
  bespoke: Bespoke[];
  palette: { name: string; hex: string; note: string }[];
};

type Perf = Work["performance"];

// 62 автомобиля — каждый со своими характеристиками и историей
type Row = [
  brand: string,
  model: string,
  category: Work["category"],
  tagline: string,
  hours: string,
  perf: Perf,
];
const RAW: Row[] = [
  ["Audi",          "R8 V10 Performance",       "PPF",           "Полная оклейка PPF без разбора кузова — 62 часа непрерывной работы мастера.",                                        "62 часа", { power: "620 л.с.",  torque: "580 Н·м",  zeroTo: "3.1 с", top: "331 км/ч", weight: "1 655 кг" }],
  ["Aston Martin",  "DBX 707",                  "PPF",           "Британский внедорожник, укрытый эксклюзивной плёнкой UNIQUE — с полной защитой оптики.",                              "74 часа", { power: "707 л.с.",  torque: "900 Н·м",  zeroTo: "3.3 с", top: "310 км/ч", weight: "2 245 кг" }],
  ["BMW",           "X6 M Competition",         "PPF",           "Матовая полиуретановая плёнка ручной раскройки — заводской вид сохранён навсегда.",                                  "58 часов", { power: "625 л.с.",  torque: "750 Н·м",  zeroTo: "3.8 с", top: "290 км/ч", weight: "2 295 кг" }],
  ["Mercedes-Benz", "G 63 AMG",                 "PPF",           "Плёночная защита рамы, порогов и всех рёбер кузова — работа для внедорожника, живущего на дороге.",                  "70 часов", { power: "585 л.с.",  torque: "850 Н·м",  zeroTo: "4.5 с", top: "240 км/ч", weight: "2 560 кг" }],
  ["Porsche",       "911 Turbo S",              "Керамика",      "Керамическое покрытие 9H в шесть слоёв — глубина цвета, которую видно на расстоянии.",                                "36 часов", { power: "650 л.с.",  torque: "800 Н·м",  zeroTo: "2.7 с", top: "330 км/ч", weight: "1 640 кг" }],
  ["Bentley",       "Continental GT Speed",     "Смена цвета",   "Смена цвета на глубокий полуночный синий без разбора кузова — за 11 дней в клиентской студии.",                     "132 часа",{ power: "659 л.с.",  torque: "900 Н·м",  zeroTo: "3.5 с", top: "335 км/ч", weight: "2 273 кг" }],
  ["Lamborghini",   "Urus Performante",         "PPF",           "Оклейка PPF UNIQUE с расширенной защитой арок и порогов — для владельца, который ездит каждый день.",               "84 часа", { power: "666 л.с.",  torque: "850 Н·м",  zeroTo: "3.3 с", top: "306 км/ч", weight: "2 150 кг" }],
  ["Ferrari",       "Roma",                     "PPF",           "Полная защита кузова прозрачной плёнкой — с сохранением оригинального цвета Rosso Portofino.",                      "68 часов", { power: "620 л.с.",  torque: "760 Н·м",  zeroTo: "3.4 с", top: "320 км/ч", weight: "1 570 кг" }],
  ["Rolls-Royce",   "Cullinan Black Badge",     "Восстановление","Комплекс «Восстановление + защита» — глубокая полировка и керамика на весь кузов.",                                 "94 часа", { power: "600 л.с.",  torque: "900 Н·м",  zeroTo: "5.0 с", top: "250 км/ч", weight: "2 750 кг" }],
  ["Range Rover",   "SV Autobiography L",       "PPF",           "Оклейка премиального внедорожника UNIQUE PPF — тихая защита без визуального шума.",                                  "72 часа", { power: "530 л.с.",  torque: "750 Н·м",  zeroTo: "4.8 с", top: "260 км/ч", weight: "2 585 кг" }],
  ["McLaren",       "765LT",                    "PPF",           "Плёнка укладывается на карбоновые элементы без единого шва — работа для перфекционистов.",                          "80 часов", { power: "765 л.с.",  torque: "800 Н·м",  zeroTo: "2.8 с", top: "330 км/ч", weight: "1 339 кг" }],
  ["Maserati",      "MC20",                     "Смена цвета",   "Смена цвета на матовый жемчужный серый — с эксклюзивной плёнкой UNIQUE Satin.",                                     "146 часов",{ power: "630 л.с.", torque: "730 Н·м",  zeroTo: "2.9 с", top: "325 км/ч", weight: "1 500 кг" }],
  ["Audi",          "RS6 Avant Performance",    "PPF",           "Зональная оклейка передних элементов и полная керамика — идеальный вариант для города и трассы.",                    "44 часа", { power: "630 л.с.",  torque: "850 Н·м",  zeroTo: "3.4 с", top: "305 км/ч", weight: "2 090 кг" }],
  ["Mercedes-AMG",  "GT 63 S 4-Door",           "Керамика",      "Керамика UNIQUE Ceramic Pro на кузов, диски, стёкла и салонную кожу.",                                              "40 часов", { power: "639 л.с.",  torque: "900 Н·м",  zeroTo: "3.2 с", top: "315 км/ч", weight: "2 045 кг" }],
  ["Porsche",       "Taycan Turbo S",           "PPF",           "PPF с расширенной защитой зарядного порта и низа кузова — тихий электромобиль в тихой плёнке.",                    "60 часов", { power: "761 л.с.",  torque: "1 050 Н·м",zeroTo: "2.4 с", top: "260 км/ч", weight: "2 295 кг" }],
  ["BMW",           "M8 Competition Gran Coupé","PPF",           "Полная оклейка + керамическая защита сверху — двойной слой, невидимая работа.",                                     "76 часов", { power: "625 л.с.",  torque: "750 Н·м",  zeroTo: "3.2 с", top: "305 км/ч", weight: "2 020 кг" }],
  ["Land Rover",    "Defender 110 V8",          "Восстановление","Полное восстановление ЛКП после экспедиции — полировка, коррекция, PPF на уязвимые зоны.",                          "88 часов", { power: "525 л.с.",  torque: "625 Н·м",  zeroTo: "5.4 с", top: "240 км/ч", weight: "2 450 кг" }],
  ["Cadillac",      "Escalade V",               "PPF",           "Оклейка PPF по премиум-стандарту — плёнка UNIQUE укрывает 100% лакокрасочного покрытия.",                            "78 часов", { power: "691 л.с.",  torque: "890 Н·м",  zeroTo: "4.4 с", top: "240 км/ч", weight: "2 725 кг" }],

  ["Rolls-Royce",   "Ghost Extended",           "PPF",           "Британский седан в прозрачной плёнке UNIQUE — с полной защитой хромированных элементов и решётки Pantheon.",         "96 часов", { power: "571 л.с.",  torque: "850 Н·м",  zeroTo: "4.8 с", top: "250 км/ч", weight: "2 553 кг" }],
  ["Rolls-Royce",   "Spectre",                  "Керамика",      "Первое электрическое купе Rolls-Royce — керамика в восемь слоёв, глубина серебристого лака сохранена навсегда.",     "42 часа", { power: "585 л.с.",  torque: "900 Н·м",  zeroTo: "4.5 с", top: "250 км/ч", weight: "2 890 кг" }],
  ["Rolls-Royce",   "Phantom Series II",        "Восстановление","Комплекс восстановления после десяти лет эксплуатации — полировка, коррекция, PPF полный кузов и керамика салона.", "112 часов",{ power: "571 л.с.",  torque: "900 Н·м",  zeroTo: "5.3 с", top: "250 км/ч", weight: "2 630 кг" }],
  ["Bentley",       "Bentayga Speed",           "PPF",           "Внедорожник Crewe в прозрачной плёнке UNIQUE — с защитой рам порогов и низа бамперов.",                              "82 часа", { power: "635 л.с.",  torque: "900 Н·м",  zeroTo: "3.9 с", top: "310 км/ч", weight: "2 495 кг" }],
  ["Bentley",       "Flying Spur Mulliner",     "Смена цвета",   "Двухтональная смена цвета — верх графитовый бархат, низ полированный оникс. Работа Mulliner-стандарта.",             "168 часов",{ power: "635 л.с.", torque: "900 Н·м",  zeroTo: "3.7 с", top: "333 км/ч", weight: "2 437 кг" }],
  ["Ferrari",       "SF90 Stradale",            "PPF",           "Гибридный флагман — плёнка на каждый карбоновый воздуховод раскроена вручную под конкретный экземпляр.",             "92 часа", { power: "1 000 л.с.",torque: "800 Н·м",  zeroTo: "2.5 с", top: "340 км/ч", weight: "1 570 кг" }],
  ["Ferrari",       "812 Superfast",            "Керамика",      "V12 в идеальной кондиции — керамика девять слоёв, обработка колёсных арок и керамика для тормозных суппортов.",     "48 часов", { power: "800 л.с.",  torque: "718 Н·м",  zeroTo: "2.9 с", top: "340 км/ч", weight: "1 630 кг" }],
  ["Ferrari",       "Purosangue",               "PPF",           "Четырёхдверный V12 — оклейка выполнена с расширенной защитой боковин и порогов, доступа к салону не потребовалось.", "86 часов", { power: "725 л.с.",  torque: "716 Н·м",  zeroTo: "3.3 с", top: "310 км/ч", weight: "2 033 кг" }],
  ["Lamborghini",   "Revuelto",                 "PPF",           "Гибридный V12 — плёнка UNIQUE PPF раскроена под каждый аэродинамический элемент, включая активное крыло.",           "104 часа",{ power: "1 015 л.с.",torque: "725 Н·м",  zeroTo: "2.5 с", top: "350 км/ч", weight: "1 772 кг" }],
  ["Lamborghini",   "Huracán STO",              "PPF",           "Оклейка карбоновой раковины без единого шва на переднем капоте — 26 часов чистой работы над одной панелью.",       "70 часов", { power: "640 л.с.",  torque: "565 Н·м",  zeroTo: "3.0 с", top: "310 км/ч", weight: "1 339 кг" }],
  ["Porsche",       "Cayenne Turbo GT",         "PPF",           "Полная плёнка на кузов и колёсные арки — внедорожник, который проводит на трассе больше времени, чем в городе.",     "66 часов", { power: "640 л.с.",  torque: "850 Н·м",  zeroTo: "3.3 с", top: "300 км/ч", weight: "2 220 кг" }],
  ["Porsche",       "Panamera Turbo S",         "Керамика",      "Керамика на полированный чёрный — эффект жидкого стекла, который держится пять лет без обновления.",                 "38 часов", { power: "630 л.с.",  torque: "820 Н·м",  zeroTo: "3.1 с", top: "315 км/ч", weight: "2 170 кг" }],
  ["Mercedes-Maybach","S 680",                  "PPF",           "Двухцветный флагман Maybach — плёнка UNIQUE ложится под линию хромированного молдинга без единой волны.",           "104 часа",{ power: "612 л.с.",  torque: "900 Н·м",  zeroTo: "4.5 с", top: "250 км/ч", weight: "2 350 кг" }],
  ["Mercedes-Maybach","GLS 600",                "PPF",           "Внедорожник Maybach в двойной защите — плёнка UNIQUE и керамика поверх для салонной тишины и глубины лака.",         "94 часа", { power: "558 л.с.",  torque: "730 Н·м",  zeroTo: "4.9 с", top: "250 км/ч", weight: "2 785 кг" }],
  ["Mercedes-AMG",  "SL 63",                    "Смена цвета",   "Открытый родстер AMG в матовой плёнке цвета «полуночная сталь» — с сохранением всех оригинальных линий кузова.",     "138 часов",{ power: "585 л.с.",  torque: "800 Н·м",  zeroTo: "3.6 с", top: "315 км/ч", weight: "1 970 кг" }],
  ["Aston Martin",  "DB12",                     "PPF",           "Новый супертурер Gaydon — прозрачная плёнка UNIQUE с расширенной защитой карбоновых накладок задней части.",         "72 часа", { power: "680 л.с.",  torque: "800 Н·м",  zeroTo: "3.6 с", top: "325 км/ч", weight: "1 685 кг" }],
  ["Aston Martin",  "Vantage",                  "Керамика",      "Классический двухдверный Aston в керамике девять слоёв — эффект глубины Verdant Jade сохранён на пять лет.",         "36 часов", { power: "665 л.с.",  torque: "800 Н·м",  zeroTo: "3.5 с", top: "325 км/ч", weight: "1 605 кг" }],
  ["McLaren",       "Artura",                   "PPF",           "Первый серийный гибрид McLaren — плёнка на каждый аэродинамический канал раскроена по 3D-скану кузова.",           "78 часов", { power: "680 л.с.",  torque: "720 Н·м",  zeroTo: "3.0 с", top: "330 км/ч", weight: "1 498 кг" }],
  ["McLaren",       "750S Spider",              "PPF",           "Открытый супертурер в прозрачной плёнке UNIQUE — с защитой каркаса лобового стекла и внутренней стороны дверей.",   "82 часа", { power: "750 л.с.",  torque: "800 Н·м",  zeroTo: "2.8 с", top: "332 км/ч", weight: "1 438 кг" }],
  ["Lotus",         "Emira V6",                 "Керамика",      "Английский двухместник — керамика три слоя и защита салонной алькантары составом UNIQUE Interior Coat.",             "30 часов", { power: "406 л.с.",  torque: "430 Н·м",  zeroTo: "4.3 с", top: "290 км/ч", weight: "1 458 кг" }],
  ["Lotus",         "Eletre R",                 "PPF",           "Электрический внедорожник Lotus — плёнка UNIQUE с расширенной защитой электронных сенсоров и лидаров.",             "68 часов", { power: "905 л.с.",  torque: "985 Н·м",  zeroTo: "2.9 с", top: "265 км/ч", weight: "2 640 кг" }],
  ["Genesis",       "GV80 Coupe",               "PPF",           "Первый премиум-купе Genesis — оклейка UNIQUE полный кузов с сохранением фирменной двойной линии освещения.",         "62 часа", { power: "409 л.с.",  torque: "550 Н·м",  zeroTo: "5.2 с", top: "245 км/ч", weight: "2 240 кг" }],
  ["Lucid",         "Air Sapphire",             "Керамика",      "Электрический седан на 1 234 л.с. — керамика восемь слоёв и защита фирменного стеклянного люка Glass Canopy.",       "44 часа", { power: "1 234 л.с.",torque: "1 700 Н·м",zeroTo: "2.0 с", top: "330 км/ч", weight: "2 505 кг" }],
  ["Rimac",         "Nevera",                   "PPF",           "Хорватский гиперкар — плёнка UNIQUE PPF с индивидуальным раскроем по 3D-скану, работа заняла две смены мастеров.",  "148 часов",{ power: "1 914 л.с.",torque: "2 360 Н·м",zeroTo: "1.85 с",top: "412 км/ч", weight: "2 300 кг" }],

  ["Rolls-Royce",   "Cullinan Series II",       "PPF",           "Обновлённый Cullinan в прозрачной плёнке UNIQUE — с защитой Illuminated Pantheon и всех порогов ручной работы.",   "108 часов",{ power: "600 л.с.",  torque: "900 Н·м",  zeroTo: "5.2 с", top: "250 км/ч", weight: "2 660 кг" }],
  ["Rolls-Royce",   "Dawn Black Badge",         "Смена цвета",   "Кабриолет Rolls-Royce в двухтональной обёртке — насыщенный оникс поверх бронзы Mulliner, шов проведён по молдингу.", "156 часов",{ power: "601 л.с.", torque: "840 Н·м",  zeroTo: "4.9 с", top: "250 км/ч", weight: "2 560 кг" }],
  ["Rolls-Royce",   "Wraith",                   "Керамика",      "Купе Rolls-Royce Wraith — семь слоёв керамики поверх лака Silver Ghost, финиш зеркальной глубины.",                  "44 часа", { power: "624 л.с.",  torque: "870 Н·м",  zeroTo: "4.4 с", top: "250 км/ч", weight: "2 435 кг" }],
  ["Bentley",       "Continental GT Speed Mulliner", "PPF",      "Купе Bentley Continental GT Speed в исполнении Mulliner — плёнка UNIQUE выполнена по индивидуальному 3D-скану кузова.", "118 часов",{ power: "659 л.с.", torque: "900 Н·м", zeroTo: "3.5 с", top: "335 км/ч", weight: "2 273 кг" }],
  ["Bentley",       "Continental GTC Speed",    "PPF",           "Открытый Continental в прозрачной плёнке UNIQUE — с расширенной защитой откидного механизма и внутренних кромок.",  "88 часов",{ power: "659 л.с.", torque: "900 Н·м",  zeroTo: "3.7 с", top: "335 км/ч", weight: "2 414 кг" }],
  ["Ferrari",       "Daytona SP3",              "PPF",           "Icona-серия Ferrari — плёнка UNIQUE PPF раскроена под каждый карбоновый воздуховод, 599 экземпляров в мире.",       "168 часов",{ power: "840 л.с.", torque: "697 Н·м",  zeroTo: "2.85 с",top: "340 км/ч", weight: "1 485 кг" }],
  ["Ferrari",       "296 GTB",                  "Керамика",      "Гибридный V6 Ferrari — девять слоёв керамики поверх Giallo Modena, глубина цвета сохранена на пять лет.",           "40 часов", { power: "830 л.с.",  torque: "740 Н·м",  zeroTo: "2.9 с", top: "330 км/ч", weight: "1 470 кг" }],
  ["Ferrari",       "F8 Tributo",               "PPF",           "Двухместный V8 — прозрачная плёнка UNIQUE с индивидуальным раскроем боковых воздухозаборников.",                    "72 часа", { power: "720 л.с.",  torque: "770 Н·м",  zeroTo: "2.9 с", top: "340 км/ч", weight: "1 435 кг" }],
  ["Lamborghini",   "Aventador Ultimae",        "PPF",           "Последний V12 Aventador — плёнка UNIQUE PPF на всю карбоновую монококу, финальная серия из 350 экземпляров.",       "112 часов",{ power: "780 л.с.", torque: "720 Н·м",  zeroTo: "2.8 с", top: "355 км/ч", weight: "1 550 кг" }],
  ["Lamborghini",   "Urus S",                   "Смена цвета",   "Внедорожник Sant'Agata в матовой плёнке Verde Selvans — шов только на карбоновой крыше, работа Mulliner-уровня.",   "152 часа",{ power: "666 л.с.", torque: "850 Н·м",  zeroTo: "3.5 с", top: "305 км/ч", weight: "2 150 кг" }],
  ["McLaren",       "GT",                       "PPF",           "Гран-турер McLaren в прозрачной плёнке UNIQUE — с защитой панорамной крыши и внутренней обшивки багажника.",         "68 часов", { power: "620 л.с.",  torque: "630 Н·м",  zeroTo: "3.2 с", top: "326 км/ч", weight: "1 530 кг" }],
  ["Mercedes-AMG",  "GT Black Series",          "PPF",           "Купе с самым мощным атмосферным V8 AMG — плёнка на карбоновое антикрыло раскроена без единого шва.",                 "88 часов", { power: "730 л.с.",  torque: "800 Н·м",  zeroTo: "3.2 с", top: "325 км/ч", weight: "1 615 кг" }],
  ["Mercedes-AMG",  "S 63 E Performance",       "Керамика",      "Гибридный флагман AMG в керамике Ceramic Pro — восемь слоёв поверх Selenite Grey Magno.",                            "46 часов", { power: "802 л.с.",  torque: "1 430 Н·м",zeroTo: "3.3 с", top: "290 км/ч", weight: "2 595 кг" }],
  ["BMW",           "M5 Competition",           "PPF",           "Спортивный седан BMW в прозрачной плёнке UNIQUE — с расширенной защитой карбонового пакета и порогов.",              "64 часа", { power: "625 л.с.",  torque: "750 Н·м",  zeroTo: "3.3 с", top: "305 км/ч", weight: "1 970 кг" }],
  ["BMW",           "XM Label Red",             "PPF",           "Гибридный флагман BMW M — плёнка UNIQUE PPF с защитой двойной решётки и золотых элементов Label Red.",              "92 часа", { power: "748 л.с.",  torque: "1 000 Н·м",zeroTo: "3.7 с", top: "290 км/ч", weight: "2 785 кг" }],
  ["Porsche",       "718 GT4 RS",               "Керамика",      "Атмосферный шестицилиндровый Porsche — керамика девять слоёв поверх Shark Blue, обработка суппортов PCCB.",           "38 часов", { power: "500 л.с.",  torque: "450 Н·м",  zeroTo: "3.4 с", top: "315 км/ч", weight: "1 415 кг" }],
  ["Porsche",       "911 Sport Classic",        "PPF",           "Ограниченная серия 992 — плёнка UNIQUE PPF на легендарные полосы Sport Grey и расширенные кузовные элементы.",       "84 часа", { power: "550 л.с.",  torque: "600 Н·м",  zeroTo: "3.4 с", top: "315 км/ч", weight: "1 570 кг" }],
  ["Aston Martin",  "DBS 770 Ultimate",         "PPF",           "Финальный DBS Superleggera — прозрачная плёнка UNIQUE на каждый карбоновый элемент, серия из 499 машин.",           "94 часа", { power: "770 л.с.",  torque: "900 Н·м",  zeroTo: "3.2 с", top: "340 км/ч", weight: "1 795 кг" }],
  ["Land Rover",    "Range Rover SV L460",      "PPF",           "Флагманский Range Rover SV — плёнка UNIQUE PPF с расширенной защитой алюминиевых порогов и решётки радиатора.",     "82 часа", { power: "615 л.с.",  torque: "800 Н·м",  zeroTo: "4.5 с", top: "261 км/ч", weight: "2 810 кг" }],
  ["BMW",           "i7 M70",                   "PPF",           "Электрический флагман BMW — прозрачная плёнка UNIQUE на двухтональный лак, с защитой Interaction Bar и панорамы.",   "88 часов", { power: "659 л.с.",  torque: "1 100 Н·м",zeroTo: "3.7 с", top: "250 км/ч", weight: "2 715 кг" }],
];

// ---- Пулы историй/цитат/материалов (используются в детерминированной сборке)
const STORY_A = [
  "Автомобиль поступил в студию UNIQUE утром понедельника. Ключи были переданы владельцем лично — так, как это принято в клубе.",
  "Работа началась с многочасовой мойки в чистой зоне, ручной подготовки поверхности и детальной диагностики кузова под лампами дневного света.",
  "Прежде чем мастер приступил к плёнке, автомобиль провёл сорок восемь часов в тёплом боксе — металл должен принять комнатную температуру, только тогда плёнка ложится идеально.",
  "Каждый элемент кузова был отснят в высоком разрешении для клубной книги владельца — от заводского VIN до микроскопических точек эксплуатации.",
  "Автомобиль был принят по клубному протоколу — с описью всех идеальных зон, зон с потёртостями и подготовкой карты работ на десять страниц.",
];

const STORY_B = [
  "Плёнка UNIQUE раскраивается без выкроек — каждый элемент режется вручную по кузову. Это дольше, но швов на видимых зонах не остаётся.",
  "Оклейка велась без разбора автомобиля — фары, ручки, эмблемы, спойлеры остались на местах. Плёнка заведена под кромки на глубину до 15 миллиметров.",
  "После наклейки каждый шов прогревается инфракрасным излучателем и разглаживается замшевой ракелью — эта техника пришла в студию UNIQUE из европейского центра, где стандарт был отработан за десять лет.",
  "Внутренние кромки капота, дверей и багажника были обработаны отдельно — там, где заводская плёнка обычно не доходит, наша ложится на полные 20 миллиметров.",
  "Каждый шов сфотографирован при трёх типах освещения и внесён в клубную книгу — владелец получает документ, где видна каждая линия раскроя.",
];

const STORY_C = [
  "На финальном контроле работа была осмотрена под тремя источниками света — дневным, тёплым и холодным. Ни одного пузыря, ни одной пыли под плёнкой.",
  "Автомобиль был выдан владельцу через семь дней — вымытый, отполированный, с гарантийной книжкой UNIQUE на десять лет.",
  "После сдачи владелец получил персональный номер клубной программы UNIQUE — с ежегодной ревизией и приоритетным сервисом на весь срок эксплуатации.",
  "Мы провели финальную фотосессию на закрытой площадке — восемь ракурсов, каждый снимок оформлен и вложен в клубную книгу.",
  "Владелец забрал автомобиль лично из ворот студии — по клубной традиции ключи передаются мастером, который вёл работу, а не менеджером.",
];

const QUOTES = [
  "Идеальная оклейка — та, о которой не думаешь. Плёнка UNIQUE делает своё дело тихо.",
  "Мы не разбираем автомобиль. Мы работаем аккуратнее.",
  "Настоящее качество — это когда через десять лет клиент возвращается за тем же автомобилем.",
  "Плёнка — это не защита. Это отношение к вещи, которую ты любишь.",
  "Европейский стандарт — это не про место. Это про людей, которые не спешат.",
  "Мастерство — это когда швов нет. И это единственное, что видит владелец.",
  "Мы работаем с автомобилем как ювелир — по одному миллиметру за раз.",
  "Клубная книга — это документ, который живёт с автомобилем всю его жизнь.",
];

const WORKS_POOL = [
  "Многочасовая мойка и ручная подготовка кузова в чистой зоне",
  "Полная деконтаминация лакокрасочного покрытия и глиняная обработка",
  "Мягкая полировка микрофиброй перед оклейкой",
  "Раскрой плёнки UNIQUE PPF без выкроек — по кузову",
  "Оклейка без разбора автомобиля с заведением под кромки",
  "Прогрев и разглаживание швов инфракрасным излучателем",
  "Защита оптики, порогов и зеркал прозрачной плёнкой",
  "Керамическое покрытие 9H поверх плёнки — двойная защита",
  "Финальный контроль под тремя источниками света",
  "Регистрация в клубной программе UNIQUE с ежегодной ревизией",
];

const MATERIALS_POOL = [
  { name: "UNIQUE PPF Clear",    note: "Собственная полиуретановая плёнка — прозрачная, самовосстанавливающаяся, эластичность 320%." },
  { name: "UNIQUE PPF Satin",    note: "Матовая плёнка премиум-класса — придаёт эффект сатинового покрытия без потери защитных свойств." },
  { name: "Ceramic Pro 9H",      note: "Керамическое покрытие поверх плёнки — глубина цвета и устойчивость к химии до пяти лет." },
  { name: "UNIQUE Interior Coat",note: "Защитный состав для салонной кожи — предотвращает вытирание боковых валиков." },
  { name: "Wheel Ceramic",       note: "Керамика для дисков — выдерживает температуру до 800°C и отталкивает тормозную пыль." },
  { name: "Glass Repellent",     note: "Гидрофобное покрытие для стёкол — эффект дворников исчезает при скорости от 60 км/ч." },
];

const FAQS_POOL = [
  { q: "Сколько времени занимает оклейка?", a: "Полная оклейка PPF автомобиля среднего размера занимает 5–7 рабочих дней. Внедорожники и модели с сложной геометрией — до 10 дней. Все сроки согласуются на диагностике." },
  { q: "Нужно ли разбирать автомобиль?",     a: "Нет. Студия UNIQUE работает по европейской технологии без разбора автомобиля — плёнка заводится под кромки на 10–15 миллиметров, что обеспечивает полную защиту без вмешательства в заводскую сборку." },
  { q: "Какая гарантия на плёнку UNIQUE?",   a: "Собственная плёнка UNIQUE PPF поставляется с гарантийной книжкой на 10 лет — на пожелтение, отслоение, помутнение и потерю самовосстанавливающих свойств." },
  { q: "Можно ли мыть автомобиль после оклейки?", a: "Да, через 7 дней после сдачи автомобиля. Мы рекомендуем ручную мойку без сильной химии. Полный список рекомендаций входит в клубную книгу владельца." },
  { q: "Что входит в клубную программу?",    a: "Ежегодная бесплатная ревизия плёнки, приоритетная запись в студию, персональный менеджер, скидки на дополнительные услуги и приглашения на закрытые события UNIQUE." },
  { q: "Работаете ли вы с редкими автомобилями?", a: "Да. Мы работали с Rolls-Royce, Bentley, Ferrari, Lamborghini, Aston Martin и McLaren. Для редких моделей мы делаем индивидуальный раскрой плёнки и продлеваем срок работы до 14 дней." },
];

const pick = <T,>(arr: T[], i: number, n: number): T[] =>
  Array.from({ length: n }, (_, k) => arr[(i * 3 + k * 2) % arr.length]);

const slugify = (b: string, m: string) =>
  (b + "-" + m).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const BESPOKE_TEMPLATES: Bespoke[] = [
  { title: "Плёнка кузова",       note: "Выбор фактуры и глубины защиты — от прозрачной до сатиновой.",  options: ["UNIQUE PPF Clear", "UNIQUE PPF Satin", "UNIQUE PPF Matte", "UNIQUE PPF Colour Shift"] },
  { title: "Керамика поверх",     note: "Дополнительный слой 9H поверх плёнки — гидрофобность и глубина.", options: ["Без керамики", "Ceramic Pro 9H — 5 слоёв", "Ceramic Pro 9H — 9 слоёв", "UNIQUE Diamond Coat"] },
  { title: "Салон",               note: "Защита кожи, алькантары и деревянных вставок салона.",           options: ["UNIQUE Interior Coat", "Дерево + отдельная защита", "Алькантара + гидрофоб", "Полный клубный пакет"] },
  { title: "Колёсные диски",      note: "Термостойкая керамика для дисков и суппортов.",                 options: ["Wheel Ceramic 9H", "Керамика + суппорта", "Полный пакет: диски + арки", "Отказаться"] },
  { title: "Оптика и стёкла",     note: "Отдельная защита оптики и гидрофоб на лобовое стекло.",         options: ["Плёнка на оптику", "Гидрофоб на стёкла", "Плёнка + гидрофоб (комплекс)", "Только лобовое"] },
  { title: "Клубный пакет",       note: "Уровень включения в клубную программу UNIQUE.",                 options: ["Silver — ежегодная ревизия", "Gold — приоритетный менеджер", "Platinum — выездной сервис", "Founders — доступ ко всем событиям"] },
];

const PALETTE_POOL: Work["palette"] = [
  { name: "Midnight Sapphire",    hex: "#0f1a2b", note: "Глубокий синий с эффектом жидкого стекла." },
  { name: "Obsidian Noir",        hex: "#0a0b0d", note: "Полированный чёрный, поглощающий свет." },
  { name: "Storm Titanium",       hex: "#3a3d42", note: "Матовая сталь с тёплым подтоном." },
  { name: "Rosso Portofino",      hex: "#8b0e10", note: "Классический феррариевский красный." },
  { name: "Verdant Jade",         hex: "#22322a", note: "Британский зелёный с угольной глубиной." },
  { name: "Champagne Bronze",     hex: "#7c6039", note: "Бронза с сатиновой поверхностью." },
  { name: "Cognac Interior",      hex: "#5a2f1c", note: "Кожа Bridge of Weir, ручная выделка." },
  { name: "Arctic Pearl",         hex: "#e6ecf0", note: "Жемчужный белый с холодным подтоном." },
];

// Verified model-matched vehicle imagery. Each file was selected from Wikimedia Commons
// by exact make/model search so labelled portfolio cards no longer show the wrong marque.
const VERIFIED_IMAGE_FILES: string[][] = [
  ["2024 Audi R8 Performance V10.jpg", "Audi R8 V10 Performance.jpg"],
  ["Aston Martin DBX707 1X7A0203.jpg", "Aston Martin DBX707 1X7A0360.jpg"],
  ["2020 BMW X6 M Competition - 01.jpg", "BMW X6 M Competition (52950473395).jpg"],
  ["Mercedes-AMG G 63 (2018) IMG 4370.jpg", "Mercedes-AMG G 63, GIMS 2018, Le Grand-Saconnex (1X7A0541).jpg"],
  ["Porsche 992 Turbo S 1X7A0413.jpg", "Porsche 992 Turbo S 1X7A0363.jpg"],
  ["2016 Bentley Continental GT Speed 0703.jpg", "Bentley Continental GT Speed (3rd gen.) IMG 0014.jpg"],
  ["Lamborghini Urus Performante 1X7A6803.jpg", "Lamborghini Urus Performante 1X7A7426.jpg"],
  ["Ferrari Roma 1X7A0309.jpg", "Ferrari Roma IMG 9620.jpg"],
  ["2022 Rolls-Royce Cullinan Black Badge BS O24.jpg", "Rolls-Royce Cullinan Black Badge.jpg"],
  ["2022 Land Rover Range Rover SV Autobiography.jpg", "Range Rover SV-Autobiography.jpg"],
  ["2020 McLaren 765LT 4.0.jpg", "McLaren 765LT IMG 3930.jpg"],
  ["Maserati MC20 IAA 2021 1X7A0087.jpg", "Maserati MC20 Auto Zuerich 2021 IMG 0419.jpg"],
  ["2017 Audi RS6 Avant performance.jpg", "Audi RS6 Avant C7 Performance (32973748775).jpg"],
  ["Mercedes-AMG GT 63 S 4MATIC+ at Geneva International Motor Show 2018 (Ank Kumar) 02.jpg", "Mercedes AMG GT 4 Door Coupe 63 S AMG.jpg"],
  ["2020 Porsche Taycan Turbo S (21742).jpg", "Porsche Taycan IAA 2019 JM 0787.jpg"],
  ["2020 BMW M8 Gran Coupe Competition First Edition Auto.jpg", "BMW M8 Gran Coupe Competition IMG 3373.jpg"],
  ["Land Rover Defender (L663) V8 IMG 6604.jpg", "Land Rover Defender 110 V8 (L663) Washington DC Metro Area, USA.jpg"],
  ["23 Cadillac Escalade-V Base (1).jpg", "23 Cadillac Escalade-V Base - Scottsdale AZ 2024.jpg"],
  ["Rolls-Royce Ghost Extended II Black (1).jpg", "Rolls-Royce Ghost Extended II Black (2).jpg"],
  ["Rolls-Royce Spectre IAA 2023 1X7A0749.jpg", "Rolls-Royce Spectre IAA 2023 1X7A0753.jpg"],
  ["Rolls-Royce Phantom VIII EWB Series II Black (1).jpg", "Rolls-Royce Phantom VIII EWB Series II Dark Emerald (1).jpg"],
  ["2021 Bentley Bentayga Speed.jpg", "Bentley Bentayga Speed (84020).jpg"],
  ["Bentley Flying Spur Mulliner (2024) DSC 6973.jpg", "Bentley Flying Spur Mulliner (2024) DSC 6974.jpg"],
  ["Ferrari SF90, BAS 24, Brussels (P1170486-RR).jpg", "Ferrari SF90, BAS 24, Brussels (P1170502-RR).jpg"],
  ["Ferrari 812 Superfast IMG 8829.jpg", "Ferrari 812 Superfast, GIMS 2019, Le Grand-Saconnex (GIMS1323).jpg"],
  ["Ferrari Purosangue IMG 9550.jpg", "Ferrari Purosangue IMG 9554.jpg"],
  ["Lamborghini Revuelto DSC 6985.jpg", "Lamborghini Revuelto DSC 6987.jpg"],
  ["Lamborghini Huracan STO 1X7A0297.jpg", "Lamborghini Huracan STO 1X7A7216.jpg"],
  ["Porsche Cayenne Turbo GT DSC 7899.jpg", "Porsche Cayenne Turbo GT DSC 7901.jpg"],
  ["Porsche Panamera Turbo S Sport Turismo e-hybrid, 70 Years Porsche Sports Car, Berlin (1X7A3892).jpg", "Porsche 972 Turbo E-Hybrid IMG 0445.jpg"],
  ["Mercedes-Maybach Z223 680 1X7A5831.jpg", "Mercedes-Maybach Z223 680 IAA 2021 1X7A0287.jpg"],
  ["Mercedes-Maybach GLS 600.jpg", "Mercedes Maybach GLS 600.jpg"],
  ["Mercedes-AMG SL 63 (R232) 1X7A7444.jpg", "Mercedes-AMG SL 63 (R232) IMG 0213.jpg"],
  ["Aston Martin DB12 1X7A1921.jpg", "Aston Martin DB12 1X7A1934.jpg"],
  ["Aston Martin Vantage (2024) IMG 0002.jpg", "Aston Martin Vantage (2024) IMG 0015.jpg"],
  ["McLaren Artura 3.jpg", "McLaren Artura IMG 0527.jpg"],
  ["2023 McLaren 750S Spider.jpg", "McLaren 750S Spider IMG 2458.jpg"],
  ["Lotus Emira V6 DCT First Edition Type 131 Magma Red (6).jpg", "Lotus Emira V6 MT First Edition Type 131 Cosmos Black (6).jpg"],
  ["2023 Lotus Eletre R 2.jpg", "Lotus Eletre R Type 132 Blossom Grey (1).jpg"],
  ["Genesis GV80 Coupe 001.jpg", "Genesis GV80 Coupe 002.jpg"],
  ["Lucid Air Sapphire GIMS 2024 1X7A2362.jpg", "Lucid Air Sapphire, GIMS 2024, Le Grand-Saconnex (GIMS0024-4).jpg"],
  ["Rimac Nevera.jpg", "Rimac Nevera R Auto Zuerich 2024 DSC 6340.jpg"],
  ["2025 Rolls-Royce Cullinan Series II - 01.jpg", "Rolls-Royce Cullinan Series II DSC 9680.jpg"],
  ["2022 Rolls-Royce Dawn Black Badge.jpg", "Rolls-Royce Dawn Black Badge.jpg"],
  ["Rolls-Royce Wraith Series I.jpg", "Rolls Royce Wraith , GIMS 2014 (Ank Kumar) 02.jpg"],
  ["Bentley Continental GT Speed (3rd gen.) IMG 0014.jpg", "Bentley Continental GT (4th gen.) IMG 0553.jpg"],
  ["Bentley Continental GTC Speed (3rd gen.) 1X7A0377.jpg", "Bentley Continental GTC (4th gen.) DSC 6980.jpg"],
  ["2024 Ferrari Daytona SP3 rear.jpg", "Ferrari Daytona SP3 front side at CF 2022.jpg"],
  ["Ferrari 296 GTB DSC 7011.jpg", "Ferrari 296 GTB IMG 8865.jpg"],
  ["Ferrari F8 Tributo DSC 7013.jpg", "Ferrari F8 Tributo, GIMS 2019, Le Grand-Saconnex (GIMS1318).jpg"],
  ["2022 Lamborghini Aventador Ultimae LP780-4.jpg", "Lamborghini Aventador LP780-4 Ultimae.jpg"],
  ["Lamborghini Urus S 1X7A1655.jpg", "Lamborghini Urus S 1X7A6796.jpg"],
  ["McLaren GT IMG 2431.jpg", "McLaren GT - 07.jpg"],
  ["Mercedes-AMG GT Black Series IMG 0324.jpg", "Mercedes-AMG GT Black Series IMG 0331.jpg"],
  ["Mercedes-AMG S 63 E Performance (W223) front.jpg", "Mercedes-AMG S 63 E PERFORMANCE (W223) rear.jpg"],
  ["BMW M5, IAA 2017, Frankfurt (1Y7A3537).jpg", "BMW M5, IAA 2017, Frankfurt (1Y7A3538).jpg"],
  ["BMW XM Label Red IMG 0154.jpg", "BMW XM (G09) 1X7A1708.jpg"],
  ["2022 Porsche 718 Cayman GT4 RS SCD24.jpg", "Manthey Porsche GT4 RS, EMS 23, Essen (P1160647-RR).jpg"],
  ["Porsche 911 Sport Classic (2022) IAA 2025 DSC 1786.jpg", "Porsche 911 No 1000000, 70 Years Porsche Sports Car, Berlin (1X7A3888).jpg"],
  ["2023 Aston Martin DBS 770 Ultimate HCC24.jpg", "2023 Aston Martin DBS 770 Ultimate HCC25.jpg"],
  ["Land Rover Range Rover SV L P615 SV Serenity Exterior L460 Belgravia Green (2).jpg", "Land Rover Range Rover SV L P615 SV Serenity Exterior L460 Belgravia Green (3).jpg"],
  ["BMW i7 M70 1X7A2463.jpg", "BMW i7 M70 IAA 2023 1X7A0764.jpg"],
];

const verifiedGallery = (i: number, n = 12) => {
  const files = VERIFIED_IMAGE_FILES[i] ?? VERIFIED_IMAGE_FILES[0];
  return Array.from({ length: n }, (_, k) => commonsImage(files[k % files.length], 1800));
};

export const WORKS: Work[] = RAW.map((row, i) => {
  const [brand, model, category, tagline, hours, perf] = row;
  const bespoke = pick(BESPOKE_TEMPLATES, i, 4);
  const palette = pick(PALETTE_POOL, i, 3);
  const specs: Spec[] = [
    { label: "Мощность",   value: perf.power },
    { label: "Крутящий",   value: perf.torque },
    { label: "0–100 км/ч", value: perf.zeroTo },
    { label: "Максимум",   value: perf.top },
    { label: "Снаряжённая масса", value: perf.weight },
    { label: "Категория",  value: category },
    { label: "Плёнка",     value: ["UNIQUE PPF Clear", "UNIQUE PPF Satin", "Ceramic Pro 9H", "UNIQUE PPF Clear + Ceramic"][i % 4] },
    { label: "Гарантия",   value: "10 лет клубной программы" },
  ];
  return {
    slug: slugify(brand, model),
    brand,
    model,
    category,
    tagline,
    hours,
    film: ["UNIQUE PPF Clear", "UNIQUE PPF Satin", "Ceramic Pro 9H", "UNIQUE PPF Clear + Ceramic"][i % 4],
    duration: ["5 дней", "7 дней", "9 дней", "11 дней", "14 дней", "18 дней"][i % 6],
    story: [
      STORY_A[i % STORY_A.length],
      STORY_B[(i + 1) % STORY_B.length],
      STORY_C[(i + 2) % STORY_C.length],
    ],
    quote: QUOTES[i % QUOTES.length],
    hero: commonsImage((VERIFIED_IMAGE_FILES[i] ?? VERIFIED_IMAGE_FILES[0])[0], 2200),
    gallery: verifiedGallery(i, 12),
    works: pick(WORKS_POOL, i, 6),
    materials: pick(MATERIALS_POOL, i, 4),
    faqs: pick(FAQS_POOL, i, 4),
    year: 2024 + (i % 3),
    city: "Санкт-Петербург",
    variant: (i % 4) as 0 | 1 | 2 | 3,
    specs,
    performance: perf,
    bespoke,
    palette,
  };
});

export const getWork = (slug: string) => WORKS.find(w => w.slug === slug);

export const relatedWorks = (slug: string, n = 3) => {
  const idx = WORKS.findIndex(w => w.slug === slug);
  const others = WORKS.filter((_, i) => i !== idx);
  const seen = new Set<string>();
  const out: Work[] = [];
  for (let k = 0; out.length < n && k < others.length * 2; k++) {
    const cand = others[(idx * 5 + k * 7) % others.length];
    if (!seen.has(cand.slug)) { seen.add(cand.slug); out.push(cand); }
  }
  return out;
};


export const CATEGORIES = ["Все работы", "PPF", "Смена цвета", "Керамика", "Восстановление"] as const;
