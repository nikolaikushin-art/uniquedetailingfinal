# UNIQUE Detailing — Service Pages Redesign (PRD)

## Problem statement
Redesign the 23 individual service pages so each direction has its own bespoke,
executive, Rolls-Royce-brochure-level design. Kill the old "one identical
template x23" look. Keep only the service names/data; presentation is free.
Brand: monochrome obsidian + platinum + one restrained crimson (#b8202f) accent.
Also update the /uslugi hub and the mega-menu readability.

## Stack
TanStack Start (React 19) + Vite 8 + Tailwind v4 + TypeScript, SSR via Nitro.
App runs at :3000 (dev). NOTE: repo lives at /app root (not /app/frontend), so
supervisor's frontend/backend programs are unused; dev server is started with
`yarn dev --port 3000 --host 0.0.0.0`. `.env.local` holds VITE_* (public CDN etc).
vite.config.ts has `server.allowedHosts: true` for the preview host.

## Architecture (this iteration)
- 8 distinct layout systems in `src/components/service/ServiceExperience.tsx`,
  dispatched by `service.group`:
  ppf=Invisible Engineering (full-bleed hero), color=Fashion House (split),
  body=Reflection Gallery (centered + band), coatings=Liquid Sculpture (offset),
  interior=Material Atelier (magazine split L-image), wash=Engineering Gallery,
  anticor=Industrial (crimson-border block), glass=Optical Architecture (centered).
- `src/lib/service-brief.ts` — per-slug bespoke content: editorial headline,
  narrative, tailored metrics, control points, "Как читать результат", local shots.
- `src/routes/uslugi.$slug.tsx` — builds ServiceCtx, renders <ServiceExperience>.
- Preserved from `services.ts`: price, duration, includes, care, faq, examples,
  booking form, related — nothing duplicated.
- `src/routes/uslugi.index.tsx` — hub now uses briefHero() for group imagery.
- `src/components/site/SiteHeader.tsx` — mega-menu backdrop darkened for readability.

## Imagery
56 brand-locked AI images (Gemini 3.1 Flash Image) stored LOCALLY under
`public/generated/<slug>/` (hero.jpg for all 23 + detail/macro shots for ~13).
Client will move these to Cloudflare later. Style: cinematic monochrome obsidian +
platinum + single crimson accent, no text/logos.

## Status — done (2026-06)
- [x] 8 distinct systems built + wired to all 23 services
- [x] Bespoke editorial content for all 23 (headline/narrative/metrics/control/how-to-read)
- [x] Local brand imagery (56 images) generated + downloaded
- [x] /uslugi hub imagery refreshed; mega-menu readability improved
- [x] Testing agent: 100% frontend pass, 0 bugs (23 pages, hub, menu, FAQ, form, palette)

## Backlog / next
- P1: Generate the remaining detail/macro shots to reach 5-10 images per service
  (currently heroes for all 23 + extra shots for ~13). Target 100+.
- P2: Add data-testid to hero/facts/nav/FAQ/form for robust automated testing.
- P2: Booking form is Supabase with placeholder keys — connect real keys to enable submits.

## 2026-06 — Страница «Привилегии» (/privilegii)
- Заголовок героя изменён на «ПРИВИЛЕГИИ» (было «Почему именно UNIQUE»).
- Страница обогащена: философский блок, 9 привилегий карточками с иконками lucide (наведение — акцент ember), два крупных фича-блока (видеоотчёт, персональная карточка), полоса показателей, обновлённый CTA.
- Данные привилегий — в src/lib/privileges.ts (единый источник). Иконки маппятся в src/routes/privilegii.tsx.
- Стек: Vite + TanStack Start (SSR) в /app. Dev-сервер: `yarn dev --port 3000 --host`. Env `/app/.env` содержит VITE_CDN_URL (R2) для загрузки изображений.
