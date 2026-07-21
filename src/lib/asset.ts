// Central resolver for all static media (images, video, logo).
//
// Every media reference in the app is a logical, root-relative path such as
// `/portfolio/ferrari-roma-0.jpg`, `/ppf/ppf-hero.jpg` or `/media/logo.png`.
// `asset()` maps those logical paths to their real location:
//
//   • In production, media lives in the shared Unique Operations Cloudflare R2
//     bucket, served from the CDN domain in `VITE_ASSET_BASE_URL`. Assets are
//     stored under the `assets/detailing/` key prefix, so the resolver emits
//     e.g. `https://<cdn>/assets/detailing/portfolio/ferrari-roma-0.jpg`.
//   • Locally (no `VITE_ASSET_BASE_URL`), the same files are served by Vite from
//     `public/assets/detailing/…`, so the resolver emits a root-relative path.
//
// This keeps every call site using stable logical paths while the physical
// origin is switched via a single environment variable.

const PREFIX = "/assets/detailing";

const rawBase = import.meta.env.VITE_ASSET_BASE_URL as string | undefined;
const base = rawBase ? rawBase.replace(/\/+$/, "") : "";

export function asset(path: string): string {
  const logical = path.startsWith("/") ? path : `/${path}`;
  return `${base}${PREFIX}${logical}`;
}
