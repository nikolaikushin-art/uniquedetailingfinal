import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-obsidian px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-7xl text-ivory">404</h1>
        <h2 className="mt-4 font-display text-xl uppercase text-ivory" style={{ letterSpacing: "0.08em" }}>Страница не найдена</h2>
        <p className="mt-4 text-sm text-mute">
          Кажется, эта страница ещё не готова или была перемещена.
        </p>
        <div className="mt-8">
          <Link to="/" className="btn-line btn-ember">На главную</Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-obsidian px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-xl uppercase text-ivory" style={{ letterSpacing: "0.08em" }}>
          Что-то пошло не так
        </h1>
        <p className="mt-4 text-sm text-mute">
          Мы не смогли загрузить эту страницу. Попробуйте обновить или вернуться на главную.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="btn-line btn-ember"
          >
            Попробовать снова
          </button>
          <a href="/" className="btn-line">На главную</a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "UNIQUE Detailing — Европейский стандарт детейлинга и оклейки PPF" },
      { name: "description", content: "Премиальная детейлинг-студия UNIQUE в Санкт-Петербурге. Оклейка PPF без разбора автомобиля, собственная плёнка Unique, керамика и клубный сервис. Более 10 лет опыта." },
      { name: "author", content: "UNIQUE Detailing" },
      { property: "og:title", content: "UNIQUE Detailing — Европейский стандарт детейлинга и оклейки PPF" },
      { property: "og:description", content: "Премиальная детейлинг-студия UNIQUE в Санкт-Петербурге. Оклейка PPF без разбора автомобиля, собственная плёнка Unique, керамика и клубный сервис. Более 10 лет опыта." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "UNIQUE Detailing — Европейский стандарт детейлинга и оклейки PPF" },
      { name: "twitter:description", content: "Премиальная детейлинг-студия UNIQUE в Санкт-Петербурге. Оклейка PPF без разбора автомобиля, собственная плёнка Unique, керамика и клубный сервис. Более 10 лет опыта." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/1c057543-4d73-41ba-8dbd-35751f80e21b/id-preview-607378ef--af71f454-a4a4-4890-8110-92e2842ff59f.lovable.app-1782938984842.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/1c057543-4d73-41ba-8dbd-35751f80e21b/id-preview-607378ef--af71f454-a4a4-4890-8110-92e2842ff59f.lovable.app-1782938984842.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Cormorant:wght@300;400;500;600&family=Jost:wght@300;400;500&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="ru">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-obsidian text-ivory">
        <SiteHeader />
        <main>
          <Outlet />
        </main>
        <SiteFooter />
      </div>
    </QueryClientProvider>
  );
}
