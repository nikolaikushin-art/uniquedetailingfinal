# Deployment & configuration guide

GitHub is the source of truth. The site builds with native Vite + TanStack
Start (SSR) + Nitro and deploys to Vercel via the Nitro Vercel preset (Build
Output API v3). It reuses the shared **Unique Operations** infrastructure:
Cloudflare R2 for media and Supabase for the contact form.

## Build

- Build config lives in `vite.config.ts` using native plugins
  (`@tanstack/react-start`, `@vitejs/plugin-react`, `@tailwindcss/vite`,
  `vite-tsconfig-paths`, `nitro/vite`).
- All media (logo, hero video, portfolio/PPF images, OG image) is resolved
  through `asset()` in `src/lib/asset.ts`. Logical paths like `/portfolio/x.jpg`
  map to `${VITE_ASSET_BASE_URL}/assets/detailing/portfolio/x.jpg`. The same tree
  is committed under `public/assets/detailing/` as a local dev fallback.
- The canonical/OG URL host is driven by `VITE_SITE_URL`.

## Cloudflare R2 (media)

Media lives in the shared bucket `uniquederailing` under the `assets/detailing/`
key prefix, served from its public CDN domain
(`https://pub-….r2.dev`). To (re)upload the local media tree, set the R2 creds
from `.env.r2.local` (never committed) and sync:

```bash
source .env.r2.local
AWS_ACCESS_KEY_ID=$R2_ACCESS_KEY_ID AWS_SECRET_ACCESS_KEY=$R2_SECRET_ACCESS_KEY \
  aws s3 sync public/assets/detailing/ s3://$R2_BUCKET/assets/detailing/ \
  --endpoint-url https://$R2_ACCOUNT_ID.r2.cloudflarestorage.com --region auto
```

Set `VITE_ASSET_BASE_URL` to the CDN domain so the running site reads media from
R2. Leave it unset locally to serve from `public/assets/detailing/`.

## Supabase (contact form — "Unique Operations" project)

The form posts to the `contact` Edge Function (`supabase/functions/contact`),
which validates the payload and inserts into the existing `leads` table using
the service role. `leads` intentionally blocks anonymous inserts (RLS), so the
function — not the browser — performs the write. Fields map as:
`name→full_name`, `phone`, `email`, `car→car_model`, `service`+`comment→notes`,
with `source='website'` and `status='new'`.

Deploy the function to the linked project:

```bash
supabase login
supabase link --project-ref flqgrcmevbjavafppqmh
supabase functions deploy contact --no-verify-jwt
```

`SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` are injected into the function
runtime by Supabase automatically — no secrets are stored in the repo.

## Vercel setup (new project + GitHub auto-deploy)

1. Vercel → **Add New → Project** → import `nikolaikushin-art/uniquedetailingfinal`.
   Create a **new** project (do not overwrite `unique-operations`).
2. Framework preset: **Other** (the build emits `.vercel/output` via Nitro, which
   Vercel serves through the Build Output API automatically).
   - Build command: `npm run build`
   - Install command: `npm install`
3. Add **Environment Variables** (Production + Preview — see `.env.example`):
   - `VITE_SITE_URL` = production domain
   - `VITE_ASSET_BASE_URL` = R2 CDN domain (`https://pub-….r2.dev`)
   - `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`
4. Importing the GitHub repo wires automatic deploys: every push to `main`
   ships to production, and PRs get preview deployments.

Verified locally: `NITRO_PRESET=vercel npm run build` produces
`.vercel/output/{config.json,functions/__server.func,static/…}`.
