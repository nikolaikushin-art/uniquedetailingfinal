import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ServiceExperience, type ServiceCtx } from "@/components/service/ServiceExperience";
import { getBrief } from "@/lib/service-brief";
import { GROUP_EXTRAS } from "@/lib/service-extras";
import { pageSeo } from "@/lib/seo";
import {
  getGroup,
  getService,
  SERVICES,
  servicesInGroup,
  type ExampleShots,
  type Service,
} from "@/lib/services";
import { WORKS } from "@/lib/works";

export const Route = createFileRoute("/uslugi/$slug")({
  loader: ({ params }): { service: Service } => {
    const service = getService(params.slug);
    if (!service) throw notFound();
    return { service };
  },
  head: ({ loaderData, params }) => {
    const s = loaderData?.service;
    if (!s)
      return {
        meta: [
          { title: "Услуга не найдена — UNIQUE Detailing" },
          { name: "robots", content: "noindex" },
        ],
      };
    const seo = pageSeo({
      title: `${s.title} — UNIQUE Detailing`,
      description: `${s.summary} Срок, стоимость, примеры работ и запись онлайн — студия UNIQUE Detailing, Санкт-Петербург.`,
      path: `/uslugi/${params?.slug ?? s.slug}`,
      image: s.img,
      imageAlt: s.title,
    });
    return {
      ...seo,
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: s.title,
            description: s.summary,
            provider: {
              "@type": "AutoRepair",
              name: "UNIQUE Detailing",
              url: "https://uniquedetailing.ru",
            },
            areaServed: "Санкт-Петербург",
            ...(s.price
              ? { offers: { "@type": "Offer", priceCurrency: "RUB", description: s.price } }
              : {}),
          }),
        },
      ],
    };
  },
  component: ServicePage,
  notFoundComponent: () => (
    <div className="flex min-h-screen items-center justify-center px-6 text-center">
      <div>
        <h1 className="font-display text-4xl uppercase text-ivory">Услуга не найдена</h1>
        <Link to="/uslugi" className="btn-line mt-8 inline-block">
          Все услуги
        </Link>
      </div>
    </div>
  ),
});

/** Gallery frame indices: exterior 0–5, interior 6–10, detail 11–16. */
const SHOT_INDEX: Record<ExampleShots["shot"], number[]> = {
  exterior: [0, 2, 5],
  interior: [6, 7, 8],
  detail: [11, 12, 13],
};

function exampleWorks(ex: ExampleShots, slug: string) {
  const pool = WORKS.filter((w) => !ex.category || w.category === ex.category);
  const list = pool.length >= 3 ? pool : WORKS;
  let h = 0;
  for (let i = 0; i < slug.length; i++) h = (h * 31 + slug.charCodeAt(i)) >>> 0;
  const start = h % list.length;
  const idx = SHOT_INDEX[ex.shot];
  return Array.from({ length: Math.min(3, list.length) }, (_, i) => {
    const w = list[(start + i) % list.length];
    return { work: w, img: w.gallery[idx[i % idx.length]] ?? w.hero };
  });
}

function ServicePage() {
  const { service: s } = Route.useLoaderData() as { service: Service };
  const group = getGroup(s.group);
  const brief = getBrief(s.slug)!;
  const siblings = servicesInGroup(s.group).filter((x) => x.slug !== s.slug);
  const examples = exampleWorks(s.examples, s.slug);
  const extras = GROUP_EXTRAS[s.group];
  const together = extras.together
    .map((sl) => SERVICES.find((x) => x.slug === sl))
    .filter((x): x is Service => Boolean(x) && x!.slug !== s.slug);
  const others = siblings.length ? siblings : SERVICES.filter((x) => x.slug !== s.slug).slice(0, 4);

  const ctx: ServiceCtx = { s, brief, group, extras, examples, together, others };
  return <ServiceExperience ctx={ctx} />;
}
