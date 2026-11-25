/**
 * Build static HTML snapshots of the public React pages. Cloudflare Pages
 * serves these snapshots through the existing middleware, while the browser
 * still mounts the same interactive app after JavaScript loads.
 *
 * Routes come from the public sitemap. All page copy and product facts come
 * from the existing React pages and published product registry.
 */
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import React from "react";
import { renderToString } from "react-dom/server";
import { createServer } from "vite";
import { Router } from "wouter";
import type { SEOProps } from "../client/src/components/SEO";
import { KNOWN_PUBLIC_PATHS } from "../functions/_middleware";

const SITE_ORIGIN = "https://www.borgafoods.com";
const OUTPUT_DIR = resolve("dist/public/_prerender");
const shell = readFileSync(resolve("dist/public/index.html"), "utf8");
const sitemap = readFileSync(resolve("client/public/sitemap.xml"), "utf8");

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function snapshotPath(pathname: string): string {
  return resolve(
    OUTPUT_DIR,
    pathname === "/" ? "home.txt" : `${pathname.slice(1)}.txt`
  );
}

const paths = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => {
  const url = new URL(match[1]);
  if (url.origin !== SITE_ORIGIN || url.search || url.hash) {
    throw new Error(`Unexpected sitemap URL: ${match[1]}`);
  }
  return url.pathname;
});

if (paths.length === 0 || new Set(paths).size !== paths.length) {
  throw new Error("Sitemap has no public routes or contains duplicate routes.");
}
if (
  paths.length !== KNOWN_PUBLIC_PATHS.size ||
  paths.some(path => !KNOWN_PUBLIC_PATHS.has(path))
) {
  throw new Error("Sitemap and Cloudflare public route list do not match.");
}

const vite = await createServer({
  configFile: resolve("vite.config.ts"),
  server: { middlewareMode: true },
  appType: "custom",
});

try {
  const [{ default: App }, { ServerSeoContext }] = await Promise.all([
    vite.ssrLoadModule("/src/App.tsx"),
    vite.ssrLoadModule("/src/components/SEO.tsx"),
  ]);

  for (const pathname of paths) {
    let seo: Required<SEOProps> | undefined;
    const locationHook: () => [string, () => void] = () => [
      pathname,
      () => undefined,
    ];
    const markup = renderToString(
      <ServerSeoContext.Provider value={value => (seo = value)}>
        <Router hook={locationHook}>
          <App />
        </Router>
      </ServerSeoContext.Provider>
    );

    if (!seo || seo.noIndex || !/<h1\b/i.test(markup)) {
      throw new Error(`Prerendered page is incomplete: ${pathname}`);
    }

    const canonical = `${SITE_ORIGIN}${pathname}`;
    const meta = [
      `<meta name="description" content="${escapeHtml(seo.description)}">`,
      `<meta name="keywords" content="${escapeHtml(seo.keywords)}">`,
      `<meta property="og:title" content="${escapeHtml(seo.title)}">`,
      `<meta property="og:description" content="${escapeHtml(seo.description)}">`,
      `<meta property="og:image" content="${escapeHtml(seo.image)}">`,
      `<meta property="og:url" content="${escapeHtml(canonical)}">`,
      `<meta property="og:type" content="${escapeHtml(seo.type)}">`,
      `<meta property="og:site_name" content="borgafoods.com">`,
      `<meta name="twitter:card" content="summary_large_image">`,
      `<meta name="twitter:title" content="${escapeHtml(seo.title)}">`,
      `<meta name="twitter:description" content="${escapeHtml(seo.description)}">`,
      `<meta name="twitter:image" content="${escapeHtml(seo.image)}">`,
      `<link rel="canonical" href="${escapeHtml(canonical)}">`,
    ].join("\n    ");

    const html = shell
      .replace(
        /<title>[\s\S]*?<\/title>/i,
        `<title>${escapeHtml(seo.title)}</title>`
      )
      .replace("</head>", `    ${meta}\n  </head>`)
      .replace('<div id="root"></div>', `<div id="root">${markup}</div>`);

    if (html === shell || !html.includes(markup)) {
      throw new Error(`Failed to insert prerendered content: ${pathname}`);
    }

    const output = snapshotPath(pathname);
    mkdirSync(dirname(output), { recursive: true });
    writeFileSync(output, html);
    console.info(`Prerendered ${pathname}`);
  }
} finally {
  await vite.close();
}
