import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { QueryClient, dehydrate, type DehydratedState } from "@tanstack/react-query";
import { AppRoutes } from "./App";
import type { SEOData } from "./hooks/useSEO";

export type Seed = Array<[readonly unknown[], unknown]>;

/** Renderiza uma rota no build, com os dados do Supabase já carregados. */
export function render(url: string, seed: Seed): { html: string; seo?: SEOData; state: DehydratedState } {
  const client = new QueryClient({
    defaultOptions: { queries: { staleTime: Infinity, retry: false } },
  });
  for (const [key, data] of seed) client.setQueryData(key, data);

  globalThis.__SEO__ = undefined;
  const html = renderToString(
    <StaticRouter location={url}>
      <AppRoutes client={client} />
    </StaticRouter>
  );
  return { html, seo: globalThis.__SEO__, state: dehydrate(client) };
}
