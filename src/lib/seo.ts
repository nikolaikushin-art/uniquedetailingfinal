import { cdn } from "./cdn";

/** Production site origin for canonical / OG URLs. */
export const SITE_URL = (
  (import.meta.env.VITE_SITE_URL as string | undefined) || "https://uniquedetailing.ru"
).replace(/\/$/, "");

export const DEFAULT_OG_IMAGE = cdn("/og-cover.jpg") || `${SITE_URL}/og-cover.jpg`;

type PageSeoInput = {
  title: string;
  description: string;
  path: string;
  image?: string;
  ogTitle?: string;
  ogDescription?: string;
};

/** Shared title + description + OG/Twitter + canonical for content pages. */
export function pageSeo({
  title,
  description,
  path,
  image = DEFAULT_OG_IMAGE,
  ogTitle,
  ogDescription,
}: PageSeoInput) {
  const url = `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
  const ogT = ogTitle ?? title;
  const ogD = ogDescription ?? description;
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: ogT },
      { property: "og:description", content: ogD },
      { property: "og:type", content: "website" },
      { property: "og:url", content: url },
      { property: "og:image", content: image },
      { property: "og:site_name", content: "UNIQUE Detailing" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: ogT },
      { name: "twitter:description", content: ogD },
      { name: "twitter:image", content: image },
    ],
    links: [{ rel: "canonical", href: url }],
  };
}
