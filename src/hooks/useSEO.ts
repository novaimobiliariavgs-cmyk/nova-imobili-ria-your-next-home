import { useEffect } from "react";

export const SITE = "https://www.novaimobiliariavgs.com.br";

export interface SEOData {
  title: string;
  description: string;
  url: string;
}

declare global {
  // Preenchido durante a pré-renderização (build), lido por scripts/prerender.mjs.
  var __SEO__: SEOData | undefined;
}

function setMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

/** Define título, descrição e URL canônica de cada página (SEO). */
export function useSEO(title: string, description: string, path?: string) {
  // No build (sem navegador), registra os dados para o HTML estático da página.
  if (typeof window === "undefined") {
    globalThis.__SEO__ = { title, description, url: SITE + (path ?? "/") };
  }

  useEffect(() => {
    const url = SITE + (path ?? window.location.pathname);
    document.title = title;
    setMeta("name", "description", description);
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
    setMeta("property", "og:url", url);
    let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = document.createElement("link");
      link.rel = "canonical";
      document.head.appendChild(link);
    }
    link.href = url;
  }, [title, description, path]);
}
