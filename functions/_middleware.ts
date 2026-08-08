// Owns routing for every request except /api/*: serves real static assets
// unchanged, serves the SPA shell (index.html) for the 7 known public
// routes with a per-route <link rel="canonical">, and serves the same
// shell for anything else with an actual HTTP 404 plus
// <meta name="robots" content="noindex, nofollow"> — instead of a soft
// 404 (HTTP 200 for any unknown path, which is what this project shipped
// until today).
//
// Why this lives in a root Pages Function rather than client/public/_redirects:
// Cloudflare Pages does not apply _redirects rules to a request once it's
// routed to Pages Functions (client/public/_routes.json now routes every
// path here, not just /api/*, specifically so canonical/robots tags can be
// injected before any JavaScript runs). That means this Function has to
// take over the SPA-fallback job _redirects used to do (rewriting an
// unmatched path to index.html) — the earlier version of this fix tried
// to keep using _redirects for that while _routes.json was still /api/*
// only, and Cloudflare's actual routing behavior for the mixed rule set
// produced 308 redirects instead of the intended 200s. That was reverted
// (see docs/CHANGE_LOG.md); this version does the SPA fallback itself, in
// code, using the env.ASSETS binding, so there's no _redirects
// interaction to reason about.
//
// client/src/components/SEO.tsx still sets canonical client-side too: it
// looks up the existing <link rel="canonical"> and updates its href in
// place rather than adding a second one, so this is a reinforcement, not
// a duplication risk — if a route is ever added to the app but not to
// KNOWN_PUBLIC_PATHS below, the page still gets a correct canonical once
// React mounts (just not in the raw HTTP response until this file is
// updated too).
//
// SITE_ORIGIN is duplicated here rather than imported from
// client/src/config/site.ts on purpose: that module reads
// import.meta.env.VITE_TURNSTILE_SITE_KEY at load time, a Vite client
// build concern that has no meaning in the Pages Functions/Workers
// runtime this file actually executes in.
const SITE_ORIGIN = "https://www.borgafoods.com";

const KNOWN_PUBLIC_PATHS = new Set([
  "/",
  "/products",
  "/export-solutions",
  "/wholesale",
  "/export",
  "/about",
  "/contact",
]);

interface ElementHandlerLike {
  append(content: string, options?: { html?: boolean }): void;
}

interface ElementHandlers {
  element(element: ElementHandlerLike): void;
}

interface HTMLRewriterLike {
  on(selector: string, handlers: ElementHandlers): HTMLRewriterLike;
  transform(response: Response): Response;
}

declare const HTMLRewriter: { new (): HTMLRewriterLike };

interface AssetFetcher {
  fetch(request: Request): Promise<Response>;
}

interface Environment {
  ASSETS: AssetFetcher;
}

interface MiddlewareContext {
  request: Request;
  env: Environment;
  next: () => Promise<Response>;
}

class AppendToHead implements ElementHandlers {
  constructor(private readonly markup: string) {}

  element(element: ElementHandlerLike): void {
    element.append(this.markup, { html: true });
  }
}

// A route table entry has an optional trailing slash (a browser address
// bar or an external link can add one) — normalized to the slash-free
// form used everywhere internally (nav, footer, sitemap) before the
// KNOWN_PUBLIC_PATHS lookup, so /products/ is treated exactly like
// /products for status/canonical purposes without needing a redirect.
function normalizePathname(pathname: string): string {
  if (pathname.length > 1 && pathname.endsWith("/")) {
    return pathname.slice(0, -1);
  }
  return pathname === "" ? "/" : pathname;
}

export const onRequest = async (
  context: MiddlewareContext
): Promise<Response> => {
  const url = new URL(context.request.url);

  // The RFQ API is a real Pages Function of its own
  // (functions/api/export-quote.ts) — hand off immediately, untouched.
  if (url.pathname.startsWith("/api/")) {
    return context.next();
  }

  // Try the exact requested path as a real static file first (JS/CSS
  // bundles, images, sitemap.xml, robots.txt, fonts, favicons, ...).
  // env.ASSETS.fetch resolves directly against the deployed static
  // output, independent of _redirects. A text/html result here only
  // happens for a literal request to /index.html itself, which still
  // needs the same rewriting as every other route below, so it isn't
  // treated as "found" just because the status wasn't 404.
  const assetResponse = await context.env.ASSETS.fetch(context.request);
  const assetContentType = assetResponse.headers.get("content-type") ?? "";
  if (assetResponse.status !== 404 && !assetContentType.includes("text/html")) {
    return assetResponse;
  }

  // Anything else is the SPA shell: one of the 7 known public routes, or
  // an unknown path that should render the client-side NotFound page
  // (wouter still handles that once the shell's JS runs) behind a real
  // 404 status rather than a soft 404.
  const pathname = normalizePathname(url.pathname);
  const isKnownPublicPath = KNOWN_PUBLIC_PATHS.has(pathname);

  const shellRequest = new Request(new URL("/index.html", url), context.request);
  const shellResponse = await context.env.ASSETS.fetch(shellRequest);

  const handler = new AppendToHead(
    isKnownPublicPath
      ? `<link rel="canonical" href="${SITE_ORIGIN}${pathname}">`
      : `<meta name="robots" content="noindex, nofollow">`
  );
  const rewritten = new HTMLRewriter().on("head", handler).transform(shellResponse);

  return new Response(rewritten.body, {
    status: isKnownPublicPath ? 200 : 404,
    headers: rewritten.headers,
  });
};
