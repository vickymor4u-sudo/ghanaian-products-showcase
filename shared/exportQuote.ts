import { z } from "zod";

export const EXPORT_ENQUIRY_EMAIL = "export@borgafoods.com";

export const inquiryTypes = [
  "general",
  "export_quote",
  "wholesale",
  "distribution",
  "private_label",
] as const;

export type InquiryType = (typeof inquiryTypes)[number];

export const qualificationInquiryTypes = [
  "wholesale",
  "distribution",
] as const satisfies readonly InquiryType[];

export function isQualificationInquiry(
  inquiryType: InquiryType
): inquiryType is (typeof qualificationInquiryTypes)[number] {
  return qualificationInquiryTypes.includes(
    inquiryType as (typeof qualificationInquiryTypes)[number]
  );
}

export function isPrivateLabelInquiry(inquiryType: InquiryType) {
  return inquiryType === "private_label";
}

export const buyerCategories = [
  "importer",
  "distributor",
  "wholesaler",
  "retail",
  "food_service",
  "other",
] as const;

export const buyerCategoryLabels: Record<
  (typeof buyerCategories)[number],
  string
> = {
  importer: "Importer",
  distributor: "Distributor",
  wholesaler: "Wholesaler",
  retail: "Retail buyer",
  food_service: "Food service",
  other: "Other business type",
};

export const salesChannels = [
  "retail",
  "wholesale",
  "food_service",
  "online",
  "other",
] as const;

export const salesChannelLabels: Record<
  (typeof salesChannels)[number],
  string
> = {
  retail: "Retail stores or supermarkets",
  wholesale: "Wholesale trade",
  food_service: "Restaurants or food service",
  online: "Online retail",
  other: "Other channel",
};

export const orderFrequencies = [
  "one_off",
  "monthly",
  "quarterly",
  "to_be_discussed",
] as const;

export const orderFrequencyLabels: Record<
  (typeof orderFrequencies)[number],
  string
> = {
  one_off: "One-time requirement",
  monthly: "Monthly requirement",
  quarterly: "Quarterly requirement",
  to_be_discussed: "To be discussed",
};

export const requirementsTimelines = [
  "as_requirements_are_confirmed",
  "within_1_3_months",
  "within_3_6_months",
  "planning_ahead",
  "to_be_discussed",
] as const;

export const requirementsTimelineLabels: Record<
  (typeof requirementsTimelines)[number],
  string
> = {
  as_requirements_are_confirmed: "As requirements are confirmed",
  within_1_3_months: "Within 1–3 months",
  within_3_6_months: "Within 3–6 months",
  planning_ahead: "Planning ahead",
  to_be_discussed: "To be discussed",
};

export const artworkReadinesses = [
  "not_started",
  "in_development",
  "ready_for_review",
] as const;

export const artworkReadinessLabels: Record<
  (typeof artworkReadinesses)[number],
  string
> = {
  not_started: "Not started",
  in_development: "In development",
  ready_for_review: "Ready for review",
};

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

const optionalControlledValue = <T extends readonly [string, ...string[]]>(
  values: T
) =>
  z
    .union([z.enum(values), z.literal("")])
    .optional()
    .default("");

export const exportQuoteSchema = z
  .object({
    submissionId: z.string().uuid(),
    inquiryType: z.enum(inquiryTypes),
    buyerCategory: optionalControlledValue(buyerCategories),
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
    intendedSalesChannel: optionalControlledValue(salesChannels),
    targetMarket: optionalText(120),
    expectedOrderFrequency: optionalControlledValue(orderFrequencies),
    requirementsTimeline: optionalControlledValue(requirementsTimelines),
    artworkReadiness: optionalControlledValue(artworkReadinesses),
    labelingRequirements: optionalText(500),
    message: optionalMessage,
    privacyConsent: z
      .boolean()
      .refine(value => value, "Privacy acknowledgement is required"),
    sourcePath: z.literal("/contact"),
    website: z.string().max(0).optional().default(""),
    turnstileToken: z.string().min(1).max(2_048),
  })
  .strict()
  .superRefine((submission, context) => {
    if (
      isQualificationInquiry(submission.inquiryType) &&
      !submission.buyerCategory
    ) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["buyerCategory"],
        message:
          "Buyer category is required for wholesale and distributor enquiries",
      });
    }

    if (
      isPrivateLabelInquiry(submission.inquiryType) &&
      submission.message.trim().length < 10
    ) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["message"],
        message:
          "Product specifications and requirements are required for private-label enquiries",
      });
    }
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
