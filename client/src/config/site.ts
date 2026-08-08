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
