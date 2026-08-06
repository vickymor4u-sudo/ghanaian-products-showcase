export const SITE_ORIGIN = "https://www.borgafoods.com";
export const EXPORT_ENQUIRY_EMAIL = "export@borgafoods.com";
export const EXPORT_QUOTE_PATH = "/contact?inquiry=export-quote";

export function createExportEnquiryMailto(subject: string, body: string) {
  const params = new URLSearchParams({ subject, body });
  return `mailto:${EXPORT_ENQUIRY_EMAIL}?${params.toString()}`;
}
