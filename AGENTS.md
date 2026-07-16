# UNIQUE Detailing — engineering notes

Standalone TanStack Start (React 19, SSR) site. Build tooling is native Vite
(`vite.config.ts`) with Tailwind v4 and Nitro; there is **no** Lovable
dependency. GitHub is the single source of truth.

- Package manager: `npm` (or `bun`). Build: `npm run build`. Dev: `npm run dev`.
- Deploy target: Vercel. Nitro auto-detects the Vercel environment; you can
  pin it with `NITRO_PRESET=vercel`.
- Brand media (logo, hero video) is self-hosted under `public/media/`.
- Set `VITE_SITE_URL` to the production domain for canonical/OG URLs.
- Optional backend (contact form) uses Supabase via `VITE_SUPABASE_URL` and
  `VITE_SUPABASE_ANON_KEY` env vars (see `src/lib/supabase.ts`).
