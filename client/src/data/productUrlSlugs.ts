/**
 * SEO-facing URL slugs for individual product landing pages, mapped to
 * BPIP's internal product slugs (`shared/productIntelligence`). This
 * mapping is presentation-layer only — BPIP's internal slugs are never
 * renamed to match. See docs/CONTENT_ARCHITECTURE_IMPLEMENTATION_PLAN.md
 * §"URL slug decision".
 */
const canonicalProductUrlToInternalSlug: Record<string, string> = {
  fufu: "fufu-borga",
  "white-gari": "white-gari",
  "yellow-gari": "yellow-gari",
  "cassava-flour": "cassava-flour",
  banku: "banku-borga",
  kokonte: "kokonte-borga",
};

export const productUrlToInternalSlug: Record<string, string> = {
  ...canonicalProductUrlToInternalSlug,
  "fufu-flour": "fufu-borga",
  gari: "white-gari",
  "banku-mix": "banku-borga",
};

const internalToUrlSlug: Record<string, string> = Object.fromEntries(
  Object.entries(canonicalProductUrlToInternalSlug).map(([url, internal]) => [
    internal,
    url,
  ])
);

/** Returns the public product-page URL for a BPIP internal slug, or undefined if that product has no dedicated page yet. */
export function getProductPageUrl(internalSlug: string): string | undefined {
  const urlSlug = internalToUrlSlug[internalSlug];
  return urlSlug ? `/products/${urlSlug}` : undefined;
}
