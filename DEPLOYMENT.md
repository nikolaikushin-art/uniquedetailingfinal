# Deployment & migration guide

This project is now **fully independent of Lovable**. GitHub is the source of
truth. It builds with native Vite + TanStack Start (SSR) + Nitro and deploys to
Vercel via the Nitro Vercel preset (Build Output API v3).

## What was migrated off Lovable

- **Build config** rewritten in `vite.config.ts` using native plugins
  (`@tanstack/react-start`, `@vitejs/plugin-react`, `@tailwindcss/vite`,
  `vite-tsconfig-paths`, `nitro/vite`). The `@lovable.dev/*` packages were removed.
- **Brand media rescued** from Lovable storage into the repo:
  `public/media/logo.png`, `public/media/numberplate-logo.png`,
  `public/media/hero.mp4`. The `*.asset.json` manifests now point at `/media/*`.
  No asset loads from `/__l5e/*` or `*.lovable.app` any longer.
- **Removed** the Lovable error-reporting module, the Lovable preview OG image
  (now `/og-cover.jpg`), and the `*.lovable.app` canonical URL (now driven by
  `VITE_SITE_URL`).

## Vercel setup (dashboard actions — do these in your account)

1. Vercel → **Add New → Project** → import the GitHub repo
   `nikolaikushin-art/uniquedetailingfinal`.
2. Framework preset: **Other** (the build emits `.vercel/output` via Nitro, which
   Vercel serves through the Build Output API automatically).
   - Build command: `npm run build`
   - Install command: `npm install`
   - Output is auto-detected (`.vercel/output`); no output-dir override needed.
3. Add **Environment Variables** (see `.env.example`):
   - `VITE_SITE_URL` = your production domain
   - `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY` = from Supabase
4. Deploy. Connect your domain last.

Verified locally: `NITRO_PRESET=vercel npm run build` produces
`.vercel/output/{config.json,functions/__server.func,static/…}`.

## Supabase setup ("Unique Operations" project)

Create the leads table used by the contact form (`src/lib/supabase.ts`):

```sql
create table public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text, phone text, email text, car text, service text, comment text
);
alter table public.leads enable row level security;
create policy "anon can insert leads"
  on public.leads for insert to anon with check (true);
```

Then set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in Vercel. Until they
are set, the form still works visually and simply skips the insert (it reports
`supabase_not_configured` internally rather than erroring).

## Cloudflare R2 (optional)

The site does **not** require R2 — media is self-hosted in `public/` and served
by Vercel's CDN, so nothing depends on Lovable or temporary links. If you want to
offload media to the Unique Operations R2 bucket later, serve it behind a CDN
domain and set `VITE_ASSET_BASE_URL`; asset paths would then be prefixed with it.
