/**
 * Cloudflare R2 CDN helpers for Unique Detailing public assets.
 *
 * Heavy media lives on R2 under:
 *   assets/gallery/*   ← portfolio photos
 *   assets/services/*  ← PPF / product shots
 *   assets/marketing/* ← hero video, OG cover
 *   assets/unique-detailing-logo.png
 *
 * Set VITE_CDN_URL (or VITE_ASSET_BASE_URL) to the public R2 base.
 * When unset, paths fall back to same-origin `/public` routes so local
 * development still works before R2 is populated.
 */

const RAW_CDN =
  (import.meta.env.VITE_CDN_URL as string | undefined) ||
  (import.meta.env.VITE_ASSET_BASE_URL as string | undefined) ||
  "";

export const CDN_BASE = RAW_CDN.replace(/\/$/, "");

/** Map a site-local public path to its R2 object key. */
export function toR2Key(path: string): string | null {
  const p = path.startsWith("/") ? path : `/${path}`;
  if (p.startsWith("/portfolio/")) return `assets/gallery/${p.slice("/portfolio/".length)}`;
  if (p.startsWith("/ppf/")) return `assets/services/${p.slice("/ppf/".length)}`;
  if (p === "/media/logo.png") return "assets/unique-detailing-logo.png";
  if (p === "/media/numberplate-logo.png") return "assets/unique-detailing-numberplate-logo.png";
  if (p === "/media/hero.mp4" || p === "/media/hero.mov") return "assets/marketing/hero.mp4";
  if (p === "/og-cover.jpg") return "assets/marketing/og-cover.jpg";
  if (p.startsWith("/media/")) return `assets/marketing/${p.slice("/media/".length)}`;
  return null;
}

/**
 * Resolve a media URL.
 * - Absolute http(s) URLs are returned unchanged.
 * - Known public paths are rewritten to the R2 CDN when configured.
 * - Unknown relative paths stay same-origin.
 */
export function cdn(path: string | undefined | null): string {
  if (!path) return "";
  if (/^https?:\/\//i.test(path)) return path;
  const key = toR2Key(path);
  if (CDN_BASE && key) return `${CDN_BASE}/${key}`;
  return path.startsWith("/") ? path : `/${path}`;
}

export const LOGO_URL =
  (import.meta.env.VITE_LOGO_URL as string | undefined) ||
  cdn("/media/logo.png") ||
  "/media/logo.png";

export const OPS_URL =
  (import.meta.env.VITE_OPS_URL as string | undefined) || "https://ops.uniquedetailing.ru";

export const CONTACT_EMAIL =
  (import.meta.env.VITE_CONTACT_EMAIL as string | undefined) || "info@uniquedetailing.ru";
