// Injects a per-route <link rel="canonical"> (or, for anything outside the
// known public route table, a <meta name="robots" content="noindex,
// nofollow">) directly into the served HTML at the edge.
//
// Why: this is a client-only Vite SPA with no server-side rendering.
// client/src/components/SEO.tsx previously set canonical/robots via a
// useEffect, so both tags only ever existed after React mounted — real for
// a browser, but absent from the raw HTTP response search engines fetch on
// first crawl. Google explicitly recommends a static, non-JavaScript
// canonical tag for exactly this reason (a JS-set one depends on the
// render queue, which can lag significantly, especially for a newly
// verified, low-authority site). This mirrors the fix already applied to
// the Search Console/Bing verification meta tags (see vite.config.ts) —
// same underlying defect, different mechanism because those two tags are
// identical on every page (so a build-time index.html injection works),
// while canonical is per-route (so it needs the request path, which is
// only known at request time).
//
// SEO.tsx still sets canonical client-side too: it looks up the existing
// <link rel="canonical"> and updates its href in place rather than adding
// a second one, so this is a reinforcement, not a duplication risk — if a
// route is ever added to the app but not to KNOWN_PUBLIC_PATHS below, the
// page still gets a correct canonical once React mounts.
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

interface MiddlewareContext {
  request: Request;
  next: () => Promise<Response>;
}

class AppendToHead implements ElementHandlers {
  constructor(private readonly markup: string) {}

  element(element: ElementHandlerLike): void {
    element.append(this.markup, { html: true });
  }
}

export const onRequest = async (
  context: MiddlewareContext
): Promise<Response> => {
  const response = await context.next();

  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("text/html")) {
    return response;
  }

  const url = new URL(context.request.url);
  const pathname = url.pathname === "" ? "/" : url.pathname;
  const isKnownPublicPath = KNOWN_PUBLIC_PATHS.has(pathname);

  const handler = new AppendToHead(
    isKnownPublicPath
      ? `<link rel="canonical" href="${SITE_ORIGIN}${pathname}">`
      : `<meta name="robots" content="noindex, nofollow">`
  );

  return new HTMLRewriter().on("head", handler).transform(response);
};
