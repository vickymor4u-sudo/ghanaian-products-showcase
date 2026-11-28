export interface PublicRoute {
  path: string;
  lastModified: string;
  changeFrequency: "weekly" | "monthly";
  priority: number;
}

/**
 * Canonical public routes shared by Cloudflare routing, prerendering and the
 * XML sitemap generator. Keeping one registry prevents new pages from being
 * crawlable but absent from the sitemap (or vice versa).
 */
export const publicRoutes: readonly PublicRoute[] = [
  { path: "/", lastModified: "2026-11-28", changeFrequency: "weekly", priority: 1 },
  { path: "/products", lastModified: "2026-11-28", changeFrequency: "weekly", priority: 0.9 },
  { path: "/products/fufu", lastModified: "2026-11-28", changeFrequency: "monthly", priority: 0.85 },
  { path: "/products/white-gari", lastModified: "2026-11-28", changeFrequency: "monthly", priority: 0.85 },
  { path: "/products/yellow-gari", lastModified: "2026-11-28", changeFrequency: "monthly", priority: 0.85 },
  { path: "/products/cassava-flour", lastModified: "2026-11-28", changeFrequency: "monthly", priority: 0.85 },
  { path: "/products/banku", lastModified: "2026-11-28", changeFrequency: "monthly", priority: 0.85 },
  { path: "/products/kokonte", lastModified: "2026-11-28", changeFrequency: "monthly", priority: 0.85 },
  { path: "/export-solutions", lastModified: "2026-11-28", changeFrequency: "monthly", priority: 0.9 },
  { path: "/export/gari-and-kokonte", lastModified: "2026-11-28", changeFrequency: "monthly", priority: 0.9 },
  { path: "/wholesale", lastModified: "2026-08-07", changeFrequency: "monthly", priority: 0.9 },
  { path: "/export", lastModified: "2026-08-06", changeFrequency: "monthly", priority: 0.8 },
  { path: "/about", lastModified: "2026-11-28", changeFrequency: "monthly", priority: 0.7 },
  { path: "/contact", lastModified: "2026-08-08", changeFrequency: "monthly", priority: 0.8 },
] as const;

export const publicPathnames = publicRoutes.map(route => route.path);
