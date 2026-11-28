import { writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { publicRoutes } from "../shared/publicRoutes";

const SITE_ORIGIN = "https://www.borgafoods.com";
const output = resolve("client/public/sitemap.xml");
const urls = publicRoutes
  .map(
    route => `  <url>
    <loc>${SITE_ORIGIN}${route.path}</loc>
    <lastmod>${route.lastModified}</lastmod>
    <changefreq>${route.changeFrequency}</changefreq>
    <priority>${route.priority.toFixed(2).replace(/0$/, "")}</priority>
  </url>`
  )
  .join("\n");

writeFileSync(
  output,
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`
);

console.info(`Generated sitemap with ${publicRoutes.length} canonical URLs.`);
