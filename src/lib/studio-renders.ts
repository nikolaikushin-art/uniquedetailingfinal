import type { StudioBody, StudioVehicle } from "./studio-vehicles";
import numberPlateLogo from "@/assets/unique-detailing-numberplate-logo.png.asset.json";

const encode = (svg: string) =>
  `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg).replace(/[!'()*]/g, (char) => `%${char.charCodeAt(0).toString(16).toUpperCase()}`)}`;

const esc = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const VIEW_LABELS = [
  "FRONT 3/4",
  "FRONT",
  "REAR",
  "LEFT SIDE",
  "RIGHT SIDE",
  "COCKPIT",
  "REAR CABIN",
  "WHEEL",
  "PAINT",
  "STUDIO TOP",
] as const;

const bodyGeometry: Record<StudioBody, { roof: string; body: string; height: number; clearance: number; wheel: number }> = {
  coupe: { roof: "M610 470 C705 330 930 318 1052 466 L1010 505 C890 462 742 460 610 470", body: "M282 652 C380 514 527 452 728 446 L1010 452 C1164 457 1314 525 1423 646 L1376 770 L330 772 Z", height: 1, clearance: 0, wheel: 104 },
  convertible: { roof: "M650 490 C772 404 946 407 1044 500 L1008 528 C902 492 762 489 650 490", body: "M284 650 C396 530 554 475 746 472 L1022 478 C1166 484 1314 536 1424 648 L1374 770 L330 772 Z", height: 1, clearance: 0, wheel: 104 },
  sedan: { roof: "M550 482 C668 324 984 322 1112 484 L1078 525 C925 476 718 473 550 482", body: "M250 642 C378 525 530 462 726 450 L1110 466 C1260 480 1392 548 1460 648 L1418 776 L304 776 Z", height: 1.08, clearance: 0, wheel: 98 },
  suv: { roof: "M498 502 C560 328 1018 302 1194 504 L1162 548 C960 504 708 492 498 502", body: "M218 626 C318 474 468 400 710 390 L1148 414 C1330 430 1462 526 1510 648 L1450 792 L284 794 Z", height: 1.2, clearance: 24, wheel: 116 },
  wagon: { roof: "M512 490 C610 340 1050 342 1236 520 L1192 554 C972 498 726 486 512 490", body: "M246 638 C364 510 512 452 738 446 L1170 462 C1328 476 1432 544 1480 650 L1426 776 L302 776 Z", height: 1.08, clearance: 4, wheel: 100 },
  supercar: { roof: "M680 505 C754 388 950 376 1046 505 L1006 536 C905 500 788 498 680 505", body: "M260 660 C408 540 580 494 786 484 L1054 488 C1224 496 1378 554 1464 662 L1402 762 L310 762 Z", height: 0.86, clearance: -5, wheel: 106 },
  hypercar: { roof: "M690 506 C760 386 960 366 1060 506 L1016 536 C912 496 786 496 690 506", body: "M240 664 C394 538 558 498 792 492 L1082 496 C1268 500 1408 558 1482 666 L1400 762 L300 762 Z", height: 0.84, clearance: -8, wheel: 108 },
};

function studioDefs(v: StudioVehicle) {
  return `
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#111316"/>
        <stop offset="0.44" stop-color="#07080a"/>
        <stop offset="1" stop-color="#17191c"/>
      </linearGradient>
      <radialGradient id="floor" cx="50%" cy="74%" r="60%">
        <stop offset="0" stop-color="#5a5f66" stop-opacity="0.82"/>
        <stop offset="0.42" stop-color="#25282d" stop-opacity="0.72"/>
        <stop offset="1" stop-color="#050607" stop-opacity="0"/>
      </radialGradient>
      <radialGradient id="spot" cx="50%" cy="44%" r="48%">
        <stop offset="0" stop-color="#ffffff" stop-opacity="0.18"/>
        <stop offset="0.52" stop-color="#ffffff" stop-opacity="0.07"/>
        <stop offset="1" stop-color="#ffffff" stop-opacity="0"/>
      </radialGradient>
      <linearGradient id="paint" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#ffffff" stop-opacity="0.42"/>
        <stop offset="0.18" stop-color="${v.paint}"/>
        <stop offset="0.72" stop-color="${v.paint}"/>
        <stop offset="1" stop-color="#020203" stop-opacity="0.68"/>
      </linearGradient>
      <linearGradient id="glass" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#dbe5ea" stop-opacity="0.34"/>
        <stop offset="1" stop-color="#020304" stop-opacity="0.86"/>
      </linearGradient>
      <linearGradient id="plate" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stop-color="#f7f5ef"/>
        <stop offset="1" stop-color="#c9c6bd"/>
      </linearGradient>
      <filter id="shadow" x="-20%" y="-30%" width="140%" height="170%"><feDropShadow dx="0" dy="34" stdDeviation="28" flood-color="#000" flood-opacity="0.78"/></filter>
      <filter id="glow"><feGaussianBlur stdDeviation="7" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
    </defs>`;
}

const studioBackground = (v: StudioVehicle, view: number) => `
  <rect width="1800" height="1125" fill="url(#bg)"/>
  <rect width="1800" height="1125" fill="url(#spot)"/>
  <rect y="735" width="1800" height="390" fill="url(#floor)"/>
  <path d="M0 768 H1800" stroke="#eae8e2" stroke-opacity="0.08"/>
  <path d="M260 190 H1540" stroke="#eae8e2" stroke-opacity="0.08"/>
  <path d="M260 190 L120 768" stroke="#eae8e2" stroke-opacity="0.05"/>
  <path d="M1540 190 L1680 768" stroke="#eae8e2" stroke-opacity="0.05"/>
  <circle cx="900" cy="210" r="380" fill="#ffffff" opacity="0.04"/>
  <text x="100" y="132" fill="#eae8e2" opacity="0.28" font-family="Jost, Arial" font-size="18" letter-spacing="9">VERIFIED STUDIO SET ${String(view + 1).padStart(2, "0")}</text>
  <text x="100" y="174" fill="#b8202f" opacity="0.78" font-family="Jost, Arial" font-size="15" letter-spacing="7">${esc(v.brand.toUpperCase())} · ${esc(v.model.toUpperCase())} · ${esc(v.paintName.toUpperCase())}</text>
`;

const wheel = (cx: number, cy: number, r: number, v: StudioVehicle) => `
  <g>
    <circle cx="${cx}" cy="${cy}" r="${r + 26}" fill="#020203" opacity="0.45"/>
    <circle cx="${cx}" cy="${cy}" r="${r}" fill="#050607"/>
    <circle cx="${cx}" cy="${cy}" r="${r * 0.72}" fill="${v.wheel}" stroke="#64676b" stroke-opacity="0.55" stroke-width="6"/>
    ${Array.from({ length: 10 }, (_, i) => {
      const a = (Math.PI * 2 * i) / 10;
      const x2 = cx + Math.cos(a) * r * 0.58;
      const y2 = cy + Math.sin(a) * r * 0.58;
      return `<path d="M${cx} ${cy} L${x2.toFixed(1)} ${y2.toFixed(1)}" stroke="#b8bbc0" stroke-opacity="0.55" stroke-width="7" stroke-linecap="round"/>`;
    }).join("")}
    <circle cx="${cx}" cy="${cy}" r="${r * 0.16}" fill="#d6d7d8"/>
  </g>`;

const plateLogo = (x: number, y: number, width = 170, height = 42) => `
  <g>
    <rect x="${x}" y="${y}" width="${width}" height="${height}" rx="7" fill="url(#plate)" stroke="#111" stroke-opacity="0.5"/>
    <image href="${numberPlateLogo.url}" x="${x + 18}" y="${y + 9}" width="${width - 36}" height="${height - 18}" preserveAspectRatio="xMidYMid meet"/>
  </g>`;

const frontThree = (v: StudioVehicle) => {
  const g = bodyGeometry[v.body];
  return `<g filter="url(#shadow)" transform="translate(0 ${g.clearance}) scale(1 ${g.height})">
    <path d="${g.body}" fill="url(#paint)" stroke="#f5f2ea" stroke-opacity="0.18" stroke-width="3"/>
    <path d="${g.roof}" fill="url(#glass)" stroke="#f4f4f4" stroke-opacity="0.16" stroke-width="3"/>
    <path d="M380 642 C510 585 668 566 842 568 L1192 582 C1278 588 1355 618 1410 660" fill="none" stroke="#ffffff" stroke-opacity="0.22" stroke-width="8" stroke-linecap="round"/>
    <path d="M304 648 C400 610 510 608 610 632" stroke="#fff3d7" stroke-opacity="0.72" stroke-width="18" stroke-linecap="round" filter="url(#glow)"/>
    <path d="M1248 650 C1326 620 1390 624 1448 662" stroke="#fff3d7" stroke-opacity="0.6" stroke-width="16" stroke-linecap="round" filter="url(#glow)"/>
    ${plateLogo(815, 656)}
    ${wheel(520, 762, g.wheel, v)}${wheel(1250, 762, g.wheel, v)}
  </g>`;
};

const side = (v: StudioVehicle, reverse = false) => {
  const g = bodyGeometry[v.body];
  const transform = reverse ? "translate(1800 0) scale(-1 1)" : "";
  return `<g transform="${transform}"><g filter="url(#shadow)" transform="translate(0 ${g.clearance}) scale(1 ${g.height})">
    <path d="M258 650 C374 506 536 450 766 444 L1134 452 C1296 462 1430 536 1510 654 L1450 772 L322 774 Z" fill="url(#paint)" stroke="#f5f2ea" stroke-opacity="0.16" stroke-width="3"/>
    <path d="M540 506 C670 330 1040 336 1194 516 L1118 544 C956 505 736 496 540 506" fill="url(#glass)" stroke="#f4f4f4" stroke-opacity="0.17" stroke-width="3"/>
    <path d="M820 502 L812 716 M1030 512 L1042 712" stroke="#020203" stroke-opacity="0.32" stroke-width="5"/>
    <path d="M392 612 C624 570 1062 562 1372 632" fill="none" stroke="#ffffff" stroke-opacity="0.22" stroke-width="8" stroke-linecap="round"/>
    ${plateLogo(810, 685, 150, 38)}
    ${wheel(510, 762, g.wheel, v)}${wheel(1260, 762, g.wheel, v)}
  </g></g>`;
};

const frontOrRear = (v: StudioVehicle, rear = false) => {
  const isSuv = v.body === "suv" || v.body === "wagon";
  const top = isSuv ? 322 : 382;
  const width = isSuv ? 830 : 760;
  const x = 900 - width / 2;
  return `<g filter="url(#shadow)">
    <path d="M${x + 130} ${top + 120} C${x + 180} ${top - 30} ${x + width - 180} ${top - 30} ${x + width - 130} ${top + 120} L${x + width - 70} ${top + 330} C${x + width - 155} ${top + 390} ${x + 155} ${top + 390} ${x + 70} ${top + 330} Z" fill="url(#paint)" stroke="#f5f2ea" stroke-opacity="0.18" stroke-width="3"/>
    <path d="M${x + 225} ${top + 92} C${x + 300} ${top + 2} ${x + width - 300} ${top + 2} ${x + width - 225} ${top + 92} L${x + width - 260} ${top + 154} C${x + width - 350} ${top + 120} ${x + 350} ${top + 120} ${x + 260} ${top + 154} Z" fill="url(#glass)"/>
    <path d="M${x + 110} ${top + 245} C${x + 210} ${top + 205} ${x + 300} ${top + 205} ${x + 385} ${top + 248}" stroke="${rear ? "#e23a46" : "#fff3d7"}" stroke-opacity="0.8" stroke-width="20" stroke-linecap="round" filter="url(#glow)"/>
    <path d="M${x + width - 385} ${top + 248} C${x + width - 300} ${top + 205} ${x + width - 210} ${top + 205} ${x + width - 110} ${top + 245}" stroke="${rear ? "#e23a46" : "#fff3d7"}" stroke-opacity="0.8" stroke-width="20" stroke-linecap="round" filter="url(#glow)"/>
    ${plateLogo(815, top + 270)}
    ${wheel(x + 148, top + 376, 78, v)}${wheel(x + width - 148, top + 376, 78, v)}
  </g>`;
};

const interior = (v: StudioVehicle, rear = false) => `
  <g filter="url(#shadow)">
    <path d="M390 358 H1410 C1480 358 1538 416 1538 486 V770 C1538 830 1490 878 1430 878 H370 C310 878 262 830 262 770 V486 C262 416 320 358 390 358 Z" fill="#111315" stroke="#eae8e2" stroke-opacity="0.12"/>
    <path d="M346 438 H1454 V790 H346 Z" fill="#050607"/>
    <path d="M452 510 C500 432 636 410 700 496 V802 H420 V626 C420 580 432 540 452 510 Z" fill="${v.interior}" stroke="#d6c8b8" stroke-opacity="0.18" stroke-width="4"/>
    <path d="M1100 496 C1168 410 1300 432 1348 510 C1368 540 1380 580 1380 626 V802 H1100 Z" fill="${v.interior}" stroke="#d6c8b8" stroke-opacity="0.18" stroke-width="4"/>
    <path d="M710 560 H1090 C1134 560 1170 596 1170 640 V804 H630 V640 C630 596 666 560 710 560 Z" fill="#1a1d20" stroke="#eae8e2" stroke-opacity="0.08"/>
    ${rear ? `<path d="M525 430 H1275 C1348 430 1410 492 1410 565 V792 H390 V565 C390 492 452 430 525 430 Z" fill="${v.interior}" stroke="#d6c8b8" stroke-opacity="0.2" stroke-width="4"/>` : `<circle cx="892" cy="630" r="94" fill="#0b0c0d" stroke="#c8c8c8" stroke-opacity="0.42" stroke-width="12"/><path d="M792 728 H1002" stroke="#c8c8c8" stroke-opacity="0.35" stroke-width="12" stroke-linecap="round"/>`}
    <text x="900" y="314" text-anchor="middle" fill="#eae8e2" opacity="0.5" font-family="Jost, Arial" font-size="18" letter-spacing="8">${rear ? "REAR CABIN" : "FRONT COCKPIT"} · ${esc(v.interior.toUpperCase())}</text>
  </g>`;

const detail = (v: StudioVehicle, type: "wheel" | "paint") => type === "wheel" ? `
  <g filter="url(#shadow)">
    <circle cx="900" cy="594" r="330" fill="#050607"/>
    <circle cx="900" cy="594" r="246" fill="${v.wheel}" stroke="#85888c" stroke-opacity="0.55" stroke-width="12"/>
    ${Array.from({ length: 16 }, (_, i) => {
      const a = (Math.PI * 2 * i) / 16;
      const x2 = 900 + Math.cos(a) * 205;
      const y2 = 594 + Math.sin(a) * 205;
      return `<path d="M900 594 L${x2.toFixed(1)} ${y2.toFixed(1)}" stroke="#d2d4d6" stroke-opacity="0.5" stroke-width="14" stroke-linecap="round"/>`;
    }).join("")}
    <circle cx="900" cy="594" r="62" fill="#d9dadb"/>
    <path d="M330 320 C540 260 704 292 840 364" stroke="url(#paint)" stroke-width="74" stroke-linecap="round"/>
    <text x="900" y="988" text-anchor="middle" fill="#eae8e2" opacity="0.52" font-family="Jost, Arial" font-size="18" letter-spacing="8">${esc(v.wheel.toUpperCase())} WHEEL SPECIFICATION</text>
  </g>` : `
  <g filter="url(#shadow)">
    <path d="M260 680 C520 376 1074 276 1540 540 C1308 730 914 822 260 680 Z" fill="url(#paint)" stroke="#eae8e2" stroke-opacity="0.18" stroke-width="4"/>
    <path d="M442 614 C696 500 1004 454 1360 524" stroke="#ffffff" stroke-opacity="0.36" stroke-width="14" stroke-linecap="round"/>
    <path d="M522 714 C780 668 1060 642 1300 674" stroke="#000000" stroke-opacity="0.26" stroke-width="12" stroke-linecap="round"/>
    <text x="900" y="910" text-anchor="middle" fill="#eae8e2" opacity="0.58" font-family="Jost, Arial" font-size="20" letter-spacing="10">${esc(v.paintName.toUpperCase())} · PPF SURFACE</text>
  </g>`;

export function studioImage(vehicle: StudioVehicle, view = 0) {
  const v = ((view % 10) + 10) % 10;
  const scene = [
    frontThree(vehicle),
    frontOrRear(vehicle, false),
    frontOrRear(vehicle, true),
    side(vehicle, false),
    side(vehicle, true),
    interior(vehicle, false),
    interior(vehicle, true),
    detail(vehicle, "wheel"),
    detail(vehicle, "paint"),
    side(vehicle, false),
  ][v];

  return encode(`<svg xmlns="http://www.w3.org/2000/svg" width="1800" height="1125" viewBox="0 0 1800 1125" role="img" aria-label="${esc(vehicle.brand)} ${esc(vehicle.model)} — ${VIEW_LABELS[v]}">
    ${studioDefs(vehicle)}
    ${studioBackground(vehicle, v)}
    ${scene}
    <text x="100" y="1030" fill="#eae8e2" opacity="0.48" font-family="Cormorant Garamond, Georgia" font-size="44" letter-spacing="4">${esc(vehicle.brand)} ${esc(vehicle.model)}</text>
    <text x="100" y="1070" fill="#8d9096" opacity="0.78" font-family="Jost, Arial" font-size="14" letter-spacing="6">${VIEW_LABELS[v]} · SAME VEHICLE / SAME PAINT / SAME WHEELS</text>
  </svg>`);
}

export const studioGallery = (vehicle: StudioVehicle) => Array.from({ length: 10 }, (_, index) => studioImage(vehicle, index));
