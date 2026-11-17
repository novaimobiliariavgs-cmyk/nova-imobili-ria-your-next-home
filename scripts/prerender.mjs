// Pré-renderização no build: gera um HTML pronto para cada página pública,
// para que Google, Bing e robôs de IA (que não executam JavaScript) leiam
// o conteúdo, o título e o canonical corretos de cada URL.
// Se algo falhar, o site continua funcionando como antes (SPA).
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const SITE = "https://www.novaimobiliariavgs.com.br";

function loadEnv() {
  const env = { ...process.env };
  for (const file of [".env", ".env.production", ".env.local"]) {
    const p = path.join(root, file);
    if (!fs.existsSync(p)) continue;
    for (const line of fs.readFileSync(p, "utf8").split(/\r?\n/)) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*"?([^"]*)"?\s*$/);
      if (m && !env[m[1]]) env[m[1]] = m[2];
    }
  }
  return env;
}

function write(rel, html) {
  const file = path.join(dist, rel);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, html);
}

const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function applyHead(template, seo) {
  if (!seo) return template;
  return template
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(seo.title)}</title>`)
    .replace(/(<meta name="description" content=")[^"]*(")/, `$1${esc(seo.description)}$2`)
    .replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${esc(seo.url)}$2`)
    .replace(/(<meta property="og:title" content=")[^"]*(")/, `$1${esc(seo.title)}$2`)
    .replace(/(<meta property="og:description" content=")[^"]*(")/, `$1${esc(seo.description)}$2`)
    .replace(/(<meta property="og:url" content=")[^"]*(")/, `$1${esc(seo.url)}$2`);
}

function page(template, { html, seo, state }) {
  const json = JSON.stringify(state).replace(/</g, "\\u003c");
  return applyHead(template, seo)
    .replace(/<noscript>[\s\S]*?<\/noscript>\s*/, "")
    .replace('<div id="root"></div>', `<div id="root">${html}</div><script>window.__RQ_STATE__=${json}</script>`);
}

async function fetchImoveis(env) {
  const url = env.VITE_SUPABASE_URL;
  const key = env.VITE_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) throw new Error("Variáveis do Supabase ausentes");
  const res = await fetch(`${url}/rest/v1/imoveis?select=*&order=criado_em.desc`, {
    headers: { apikey: key, Authorization: `Bearer ${key}` },
  });
  if (!res.ok) throw new Error(`Supabase respondeu ${res.status}`);
  return res.json();
}

function sitemap(imoveis) {
  const today = new Date().toISOString().slice(0, 10);
  const urls = [
    ["/", "weekly", "1.0"],
    ["/imoveis?finalidade=aluguel", "daily", "0.9"],
    ["/imoveis?finalidade=venda", "daily", "0.9"],
    ["/imoveis", "daily", "0.8"],
    ["/anuncie", "monthly", "0.8"],
    ["/avaliacao", "monthly", "0.9"],
    ["/sobre", "monthly", "0.5"],
    ["/contato", "monthly", "0.6"],
    ...imoveis.filter((i) => i.status === "ativo").map((i) => [`/imovel/${i.id}`, "weekly", "0.7"]),
  ];
  const body = urls
    .map(
      ([loc, freq, pri]) =>
        `  <url><loc>${esc(SITE + loc)}</loc><lastmod>${today}</lastmod><changefreq>${freq}</changefreq><priority>${pri}</priority></url>`
    )
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;
}

async function main() {
  let template = fs.readFileSync(path.join(dist, "index.html"), "utf8");
  // Se o script rodar duas vezes sobre o mesmo dist, usa a cópia intacta do app.
  if (!template.includes('<div id="root"></div>') && fs.existsSync(path.join(dist, "_spa.html"))) {
    template = fs.readFileSync(path.join(dist, "_spa.html"), "utf8");
  }
  if (!template.includes('<div id="root"></div>')) throw new Error("index.html sem <div id=\"root\"></div>");
  // Cópia intacta do app, usada para rotas não pré-renderizadas (admin, imóveis novos).
  write("_spa.html", template);

  // O cliente do Supabase usa localStorage; no build não existe navegador.
  const mem = new Map();
  globalThis.localStorage = {
    getItem: (k) => (mem.has(k) ? mem.get(k) : null),
    setItem: (k, v) => mem.set(k, String(v)),
    removeItem: (k) => mem.delete(k),
    clear: () => mem.clear(),
    key: (i) => [...mem.keys()][i] ?? null,
    get length() {
      return mem.size;
    },
  };

  let imoveis = [];
  try {
    imoveis = await fetchImoveis(loadEnv());
    console.log(`[prerender] ${imoveis.length} imóveis carregados do Supabase`);
  } catch (e) {
    console.warn(`[prerender] Sem dados de imóveis (${e.message}); páginas geradas sem listagem.`);
  }

  const { render } = await import(pathToFileURL(path.join(root, "dist-server", "entry-server.js")).href);

  const byFinalidade = (f) => imoveis.filter((i) => i.finalidade === f);
  const destaque = imoveis.filter((i) => i.destaque && i.status === "ativo").slice(0, 6);

  const routes = [
    { url: "/", out: "index.html", seed: [[["imoveis-destaque"], destaque], [["imoveis", { finalidade: "venda" }], byFinalidade("venda")]] },
    { url: "/sobre", out: "sobre/index.html", seed: [] },
    { url: "/anuncie", out: "anuncie/index.html", seed: [] },
    { url: "/avaliacao", out: "avaliacao/index.html", seed: [] },
    { url: "/contato", out: "contato/index.html", seed: [] },
    { url: "/imoveis", out: "_pre/imoveis-todos/index.html", seed: [[["imoveis", { sort: "recentes" }], imoveis]] },
    {
      url: "/imoveis?finalidade=aluguel",
      out: "_pre/imoveis-aluguel/index.html",
      seed: [[["imoveis", { finalidade: "aluguel", sort: "recentes" }], byFinalidade("aluguel")]],
    },
    {
      url: "/imoveis?finalidade=venda",
      out: "_pre/imoveis-venda/index.html",
      seed: [[["imoveis", { finalidade: "venda", sort: "recentes" }], byFinalidade("venda")]],
    },
    ...imoveis.map((i) => ({
      url: `/imovel/${i.id}`,
      out: `imovel/${i.id}/index.html`,
      seed: [[["imovel", i.id], i], [["imoveis", undefined], imoveis]],
    })),
  ];

  let ok = 0;
  for (const r of routes) {
    try {
      write(r.out, page(template, render(r.url, r.seed)));
      ok++;
    } catch (e) {
      console.warn(`[prerender] Falha em ${r.url}: ${e.message}`);
    }
  }

  write("sitemap.xml", sitemap(imoveis));
  console.log(`[prerender] ${ok}/${routes.length} páginas geradas`);
}

main().catch((e) => {
  // Nunca derruba o deploy: sem pré-renderização o site segue como SPA.
  console.warn(`[prerender] Pré-renderização ignorada: ${e.stack || e.message}`);
  const shell = path.join(dist, "_spa.html");
  if (!fs.existsSync(shell) && fs.existsSync(path.join(dist, "index.html"))) {
    fs.copyFileSync(path.join(dist, "index.html"), shell);
  }
});
