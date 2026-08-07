import { EXPORT_ENQUIRY_EMAIL } from "@shared/exportQuote";

export const SITE_ORIGIN = "https://www.borgafoods.com";
export { EXPORT_ENQUIRY_EMAIL };
export const EXPORT_QUOTE_PATH = "/contact?inquiry=export-quote";
export const getEnquiryPath = (
  inquiry: "export_quote" | "wholesale" | "distribution" | "private_label"
) => `/contact?inquiry=${inquiry.replace("_", "-")}`;
export const EXPORT_QUOTE_API_PATH = "/api/export-quote";
export const TURNSTILE_SITE_KEY =
  import.meta.env.VITE_TURNSTILE_SITE_KEY?.trim() ?? "";
