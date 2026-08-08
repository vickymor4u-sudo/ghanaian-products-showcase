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

// Search & Analytics Foundation — all three are public, build-time,
// non-secret identifiers (the same category as TURNSTILE_SITE_KEY, never
// the VITE_ prefix on anything that must stay server-only). Each is empty
// by default and stays empty until BorgaFoods configures the real value in
// Cloudflare: no tracking script loads, no verification tag renders, and
// no visitor data is collected until then. See docs/SEO_FOUNDATION.md.
export const GA4_MEASUREMENT_ID =
  import.meta.env.VITE_GA4_MEASUREMENT_ID?.trim() ?? "";
export const GOOGLE_SITE_VERIFICATION =
  import.meta.env.VITE_GOOGLE_SITE_VERIFICATION?.trim() ?? "";
export const BING_SITE_VERIFICATION =
  import.meta.env.VITE_BING_SITE_VERIFICATION?.trim() ?? "";
