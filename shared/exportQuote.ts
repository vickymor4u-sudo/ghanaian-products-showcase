import { z } from "zod";

export const EXPORT_ENQUIRY_EMAIL = "export@borgafoods.com";

export const inquiryTypes = [
  "general",
  "export_quote",
  "wholesale",
  "distribution",
] as const;

export const packagingPreferences = [
  "retail",
  "bulk",
  "mixed",
  "unsure",
] as const;

export const packagingPreferenceLabels: Record<
  (typeof packagingPreferences)[number],
  string
> = {
  retail: "Retail packaging",
  bulk: "Bulk packaging",
  mixed: "Mixed packaging requirements",
  unsure: "To be discussed",
};

const requiredText = (label: string, maximum: number) =>
  z
    .string()
    .trim()
    .min(2, `${label} is required`)
    .max(maximum, `${label} is too long`)
    .transform(value => value.replace(/\s+/g, " "));

const optionalText = (maximum: number) =>
  z
    .string()
    .trim()
    .max(maximum)
    .transform(value => value.replace(/\s+/g, " "))
    .optional()
    .default("");

const optionalMessage = z.string().trim().max(2_000).optional().default("");

export const exportQuoteSchema = z.object({
  submissionId: z.string().uuid(),
  inquiryType: z.enum(inquiryTypes),
  companyName: requiredText("Company name", 120),
  contactPerson: requiredText("Contact person", 100),
  country: requiredText("Company country", 100),
  email: z.string().trim().email().max(254),
  phoneWhatsApp: optionalText(50),
  productSelection: z.string().trim().min(1).max(80),
  packagingPreference: z.enum(packagingPreferences),
  estimatedQuantity: requiredText("Estimated quantity", 100),
  destinationCountry: requiredText("Destination country", 100),
  destinationPort: optionalText(100),
  message: optionalMessage,
  sourcePath: z.literal("/contact"),
  website: z.string().max(0).optional().default(""),
  turnstileToken: z.string().min(1).max(2_048),
});

export type ExportQuoteSubmission = z.infer<typeof exportQuoteSchema>;

export type ExportQuoteErrorCode =
  | "invalid_method"
  | "invalid_origin"
  | "invalid_request"
  | "verification_failed"
  | "service_unavailable"
  | "delivery_failed";

export interface ExportQuoteSuccessResponse {
  ok: true;
  requestId: string;
}

export interface ExportQuoteErrorResponse {
  ok: false;
  code: ExportQuoteErrorCode;
}

export type ExportQuoteResponse =
  | ExportQuoteSuccessResponse
  | ExportQuoteErrorResponse;
