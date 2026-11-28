// Owns routing for every request except /api/*: serves real static assets
// unchanged, serves build-time-rendered HTML for the known public
// routes, and serves the SPA shell (index.html) for anything else with an
// actual HTTP 404 plus <meta name="robots" content="noindex, nofollow">
// — instead of a soft
// 404 (HTTP 200 for any unknown path, which is what this project shipped
// until today).
//
// Why this lives in a root Pages Function rather than client/public/_redirects:
// Cloudflare Pages does not apply _redirects rules to a request once it's
// routed to Pages Functions (client/public/_routes.json now routes every
// path here, not just /api/*, so prerendered content and canonical/robots
// tags can be served before JavaScript runs). That means this Function has to
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
import { publicPathnames } from "../shared/publicRoutes";

const SITE_ORIGIN = "https://www.borgafoods.com";

export const KNOWN_PUBLIC_PATHS = new Set(publicPathnames);

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
  const legacyRedirects: Record<string, string> = {
    "/products/fufu-flour": "/products/fufu",
    "/products/gari": "/products/white-gari",
    "/products/banku-mix": "/products/banku",
  };
  const legacyTarget = legacyRedirects[normalizePathname(url.pathname)];
  if (legacyTarget) {
    return Response.redirect(`${SITE_ORIGIN}${legacyTarget}`, 301);
  }
  // Snapshots are internal delivery assets, not separate pages for indexing.
  if (url.pathname.startsWith("/_prerender/")) {
    return new Response("Not found", { status: 404 });
  }

  // Try the exact requested path as a real static file first (JS/CSS
  // bundles, images, sitemap.xml, robots.txt, fonts, favicons, ...).
  // env.ASSETS.fetch resolves directly against the deployed static
  // output, independent of _redirects. For an extensionless SPA route
  // (e.g. /products) Cloudflare's asset resolution doesn't cleanly 404 —
  // it comes back shaped like a redirect (2xx/3xx, a stray Location
  // header, empty body), an artifact of its own index.html
  // canonicalization, not a real file. Checking for a non-html
  // content-type AND a genuinely non-empty body rules that out, so only
  // an actual static file is ever returned here unmodified.
  const assetResponse = await context.env.ASSETS.fetch(context.request);
  const assetContentType = assetResponse.headers.get("content-type") ?? "";
  const isRealStaticAsset =
    assetResponse.ok &&
    !assetContentType.includes("text/html") &&
    assetResponse.headers.get("content-length") !== "0";
  if (isRealStaticAsset) {
    return assetResponse;
  }

  // Public routes use HTML snapshots generated from the React pages during
  // pnpm build. Their copy and metadata are readable before JavaScript runs.
  // The interactive app still mounts normally in the browser.
  const pathname = normalizePathname(url.pathname);
  const isKnownPublicPath = KNOWN_PUBLIC_PATHS.has(pathname);
  if (isKnownPublicPath) {
    const snapshotPath = `/_prerender${pathname === "/" ? "/home" : pathname}.txt`;
    const snapshotRequest = new Request(
      new URL(snapshotPath, url),
      context.request
    );
    const snapshotResponse = await context.env.ASSETS.fetch(snapshotRequest);
    if (snapshotResponse.ok) {
      const html = await snapshotResponse.text();
      if (html.startsWith("<!doctype html>")) {
        const headers = new Headers(snapshotResponse.headers);
        headers.set("content-type", "text/html; charset=utf-8");
        headers.delete("content-length");
        return new Response(html, { status: 200, headers });
      }
    }
  }

  // Fallback for a missing snapshot and for unknown paths. Fetch the shell
  // via "/", not "/index.html": Cloudflare Pages
  // automatically 308-redirects a direct /index.html request to / (the
  // same canonicalization that made the first fetch above ambiguous),
  // and the ASSETS binding replicates that. "/" is already the canonical
  // form, so it resolves straight to the real file content instead.
  const shellRequest = new Request(new URL("/", url), context.request);
  const shellResponse = await context.env.ASSETS.fetch(shellRequest);

  const handler = new AppendToHead(
    isKnownPublicPath
      ? `<link rel="canonical" href="${SITE_ORIGIN}${pathname}">`
      : `<meta name="robots" content="noindex, nofollow">`
  );
  const rewritten = new HTMLRewriter()
    .on("head", handler)
    .transform(shellResponse);

  return new Response(rewritten.body, {
    status: isKnownPublicPath ? 200 : 404,
    headers: rewritten.headers,
  });
};
