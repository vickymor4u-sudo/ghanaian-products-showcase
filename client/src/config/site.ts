import { EXPORT_ENQUIRY_EMAIL } from "@shared/exportQuote";

export const SITE_ORIGIN = "https://www.borgafoods.com";
export { EXPORT_ENQUIRY_EMAIL };
export const EXPORT_QUOTE_PATH = "/contact?inquiry=export-quote";
export const getEnquiryPath = (
  inquiry: "export_quote" | "wholesale" | "distribution" | "private_label"
) => `/contact?inquiry=${inquiry.replace("_", "-")}`;
export const getProductQuotePath = (productSlug: string) =>
  `${EXPORT_QUOTE_PATH}&product=${encodeURIComponent(productSlug)}`;
export const EXPORT_QUOTE_API_PATH = "/api/export-quote";
export const TURNSTILE_SITE_KEY =
  import.meta.env.VITE_TURNSTILE_SITE_KEY?.trim() ?? "";

// Search & Analytics Foundation — a public, build-time, non-secret
// identifier (the same category as TURNSTILE_SITE_KEY, never the VITE_
// prefix on anything that must stay server-only). Empty by default and
// stays empty until BorgaFoods configures the real value in Cloudflare: no
// tracking script loads and no visitor data is collected until then. See
// docs/SEO_FOUNDATION.md.
//
// VITE_GOOGLE_SITE_VERIFICATION / VITE_BING_SITE_VERIFICATION are not
// re-exported here: they're read directly from process.env at build time
// by the Vite plugin in vite.config.ts, which injects them straight into
// index.html rather than through client-side React code. See that file
// and docs/SEO_FOUNDATION.md.
export const GA4_MEASUREMENT_ID =
  import.meta.env.VITE_GA4_MEASUREMENT_ID?.trim() ?? "";

// Shipping & returns — approved by the business owner via chat, 11 Aug
// 2026, for Product `offers` structured data (Google Search Console
// flagged missing shippingDetails/hasMerchantReturnPolicy). Uniform across
// every product — not a per-product fact — so it lives here rather than in
// BPIP's per-product registry.
//
// schema.org has no wildcard for "ships to most/all countries": both
// shippingDestination and a return policy's applicableCountry require
// explicit ISO 3166-1 country codes. The business owner's actual answer
// ("ships to most countries") isn't representable that way, so this lists
// only the one market this fix's Search Console issue and the site's USD
// pricing already concretely target. Add more codes here if BorgaFoods
// wants specific additional destination markets represented.
export const SHIPPING_ORIGIN_COUNTRY = "GH";
export const SHIPPING_DESTINATION_COUNTRIES = ["US"];
export const SHIPPING_HANDLING_TIME_DAYS = { min: 30, max: 45 };
// No shippingRate: freight for wholesale container orders is quoted
// per-order, not a fixed figure — omitted rather than fabricated.
export const RETURN_POLICY_COUNTRIES = ["US"];
export const RETURN_POLICY_CATEGORY =
  "https://schema.org/MerchantReturnNotPermitted";
