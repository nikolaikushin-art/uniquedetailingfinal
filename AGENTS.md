# UNIQUE Detailing — engineering notes

Standalone TanStack Start (React 19, SSR) site. Build tooling is native Vite
(`vite.config.ts`) with Tailwind v4 and Nitro. GitHub is the single source of
truth.

- Package manager: `npm` (or `bun`). Build: `npm run build`. Dev: `npm run dev`.
- Deploy target: Vercel. Nitro auto-detects the Vercel environment; you can
  pin it with `NITRO_PRESET=vercel`.
- Static media (logo, hero video, portfolio/PPF images) lives in the shared
  Cloudflare R2 bucket under the `assets/detailing/` prefix. Every reference goes
  through `asset()` (`src/lib/asset.ts`): set `VITE_ASSET_BASE_URL` to the R2 CDN
  domain in production; leave it unset to fall back to `public/assets/detailing`.
- Set `VITE_SITE_URL` to the production domain for canonical/OG URLs.
- The contact form submits to the `contact` Supabase Edge Function
  (`supabase/functions/contact`), which validates and writes to the shared
  `leads` table with the service role. The browser uses `VITE_SUPABASE_URL` +
  `VITE_SUPABASE_ANON_KEY` (see `src/lib/supabase.ts`).
