// Consumes the BorgaFoods Product Intelligence Platform (BPIP) directly —
// not via client/src/data/products.ts — so the server-trusted RFQ
// allowlist and the public website read from the exact same authoritative
// registry without an intermediate layer. See
// docs/PRODUCT_INTELLIGENCE_PLATFORM.md and docs/BPIP_MIGRATION_PLAN.md
// (Phase 2). This Function runs server-side and is never bundled to the
// browser, but it still imports only the published-registry view — it has
// no functional need for internal-only candidate records.
import {
  privateLabelEligibleProducts,
  publishedProducts,
} from "../../shared/productIntelligence/publishedRegistry";
import { productTypeLabels } from "../../shared/productIntelligence/types";
import {
  artworkReadinessLabels,
  buyerCategoryLabels,
  exportQuoteSchema,
  isQualificationInquiry,
  isPrivateLabelInquiry,
  orderFrequencyLabels,
  packagingPreferenceLabels,
  requirementsTimelineLabels,
  salesChannelLabels,
  type ExportQuoteErrorCode,
  type ExportQuoteSubmission,
} from "../../shared/exportQuote";

interface Environment {
  EXPORT_QUOTE_FROM_EMAIL?: string;
  EXPORT_QUOTE_NOTIFICATION_EMAIL?: string;
  RESEND_API_KEY?: string;
  TURNSTILE_SECRET_KEY?: string;
}

interface PagesFunctionContext {
  request: Request;
  env: Environment;
}

interface TurnstileVerification {
  success: boolean;
  hostname?: string;
  action?: string;
}

const MAX_REQUEST_BYTES = 12_000;
const TURNSTILE_ACTION = "export_quote";
const EXTRA_PRODUCT_LABELS: Record<string, string> = {
  all: "All current BorgaFoods products",
  other: "Other product or BorgaFoods Export Selection enquiry",
};

function jsonResponse(body: unknown, status: number) {
  return Response.json(body, {
    status,
    headers: {
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}

function errorResponse(code: ExportQuoteErrorCode, status: number) {
  return jsonResponse({ ok: false, code }, status);
}

function isSameOrigin(request: Request) {
  const origin = request.headers.get("Origin");
  if (!origin) return false;

  try {
    return new URL(origin).origin === new URL(request.url).origin;
  } catch {
    return false;
  }
}

function escapeHtml(value: string) {
  return value.replace(
    /[&<>'"]/g,
    character =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        "'": "&#39;",
        '"': "&quot;",
      })[character] ?? character
  );
}

function sanitizeEmailHeader(value: string) {
  return value
    .replace(/[\u0000-\u001f\u007f]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function getConfiguredEmail(value?: string) {
  const normalized = value?.trim();

  if (
    !normalized ||
    normalized.length > 254 ||
    /[\r\n\u0000-\u001f\u007f]/.test(normalized) ||
    !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(normalized)
  ) {
    return null;
  }

  return normalized;
}

function getProductDetails(
  productSelection: string,
  inquiryType: ExportQuoteSubmission["inquiryType"]
) {
  const eligibleProducts = isPrivateLabelInquiry(inquiryType)
    ? privateLabelEligibleProducts
    : publishedProducts;
  const product = eligibleProducts.find(item => item.slug === productSelection);
  if (product) {
    return {
      label: product.name,
      supply: productTypeLabels[product.supplyType],
    };
  }

  const label = isPrivateLabelInquiry(inquiryType)
    ? undefined
    : EXTRA_PRODUCT_LABELS[productSelection];
  return label ? { label, supply: "Requirements to be reviewed" } : null;
}

function getOptionalLabel<T extends string>(
  labels: Record<T, string>,
  value: string
) {
  return value && Object.hasOwn(labels, value)
    ? labels[value as T]
    : "Not provided";
}

function getQualificationFields(submission: ExportQuoteSubmission) {
  if (!isQualificationInquiry(submission.inquiryType)) return [];

  return [
    [
      "Buyer category",
      getOptionalLabel(buyerCategoryLabels, submission.buyerCategory),
    ],
    [
      "Intended sales channel",
      getOptionalLabel(salesChannelLabels, submission.intendedSalesChannel),
    ],
    ["Target market or region", submission.targetMarket || "Not provided"],
    [
      "Expected order frequency",
      getOptionalLabel(orderFrequencyLabels, submission.expectedOrderFrequency),
    ],
    [
      "Expected timing",
      getOptionalLabel(
        requirementsTimelineLabels,
        submission.requirementsTimeline
      ),
    ],
  ] as const;
}

function getPrivateLabelFields(submission: ExportQuoteSubmission) {
  if (!isPrivateLabelInquiry(submission.inquiryType)) return [];

  return [
    [
      "Intended sales channel",
      getOptionalLabel(salesChannelLabels, submission.intendedSalesChannel),
    ],
    ["Target market or region", submission.targetMarket || "Not provided"],
    [
      "Artwork or label readiness",
      getOptionalLabel(artworkReadinessLabels, submission.artworkReadiness),
    ],
    [
      "Labeling or language requirements",
      submission.labelingRequirements || "Not provided",
    ],
    [
      "Indicative launch timing",
      getOptionalLabel(
        requirementsTimelineLabels,
        submission.requirementsTimeline
      ),
    ],
  ] as const;
}

function formatEmail(
  submission: ExportQuoteSubmission,
  requestId: string,
  product: { label: string; supply: string }
) {
  const qualificationFields = getQualificationFields(submission);
  const privateLabelFields = getPrivateLabelFields(submission);
  const messageLabel = isPrivateLabelInquiry(submission.inquiryType)
    ? "Product specifications and requirements"
    : isQualificationInquiry(submission.inquiryType)
      ? "Business requirements"
      : "Additional message";
  const fields: readonly (readonly [string, string])[] = [
    ["Request ID", requestId],
    ["Inquiry type", submission.inquiryType.replaceAll("_", " ")],
    ["Company", submission.companyName],
    ["Contact person", submission.contactPerson],
    ["Company country", submission.country],
    ["Reply email", submission.email],
    ["Phone / WhatsApp", submission.phoneWhatsApp || "Not provided"],
    ["Product selection", product.label],
    ["Supply classification", product.supply],
    [
      "Packaging preference",
      packagingPreferenceLabels[submission.packagingPreference],
    ],
    ["Estimated quantity", submission.estimatedQuantity],
    ["Destination country", submission.destinationCountry],
    ["Destination port", submission.destinationPort || "Not provided"],
    ...qualificationFields,
    ...privateLabelFields,
    ["Privacy acknowledgement", "Confirmed"],
    ["Source", submission.sourcePath],
  ];

  const text = [
    "New BorgaFoods RFQ enquiry",
    "",
    ...fields.map(([label, value]) => `${label}: ${value}`),
    "",
    `${messageLabel}:`,
    submission.message || "Not provided",
  ].join("\n");

  const htmlRows = fields
    .map(
      ([label, value]) =>
        `<tr><th align="left" style="padding:6px 12px 6px 0">${escapeHtml(label)}</th><td style="padding:6px 0">${escapeHtml(value)}</td></tr>`
    )
    .join("");

  const html = [
    "<h2>New BorgaFoods RFQ enquiry</h2>",
    `<table>${htmlRows}</table>`,
    `<h3>${escapeHtml(messageLabel)}</h3>`,
    `<p>${escapeHtml(submission.message || "Not provided").replaceAll("\n", "<br>")}</p>`,
  ].join("");

  return { text, html };
}

async function verifyTurnstile(
  submission: ExportQuoteSubmission,
  context: PagesFunctionContext
) {
  const response = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        secret: context.env.TURNSTILE_SECRET_KEY,
        response: submission.turnstileToken,
        remoteip: context.request.headers.get("CF-Connecting-IP") || undefined,
        idempotency_key: submission.submissionId,
      }),
      signal: AbortSignal.timeout(8_000),
    }
  );

  if (!response.ok) return false;

  const verification = (await response.json()) as TurnstileVerification;
  const requestHostname = new URL(context.request.url).hostname;

  return (
    verification.success &&
    verification.hostname === requestHostname &&
    verification.action === TURNSTILE_ACTION
  );
}

async function sendQuotationEmail(
  submission: ExportQuoteSubmission,
  requestId: string,
  product: { label: string; supply: string },
  apiKey: string,
  fromEmail: string,
  notificationEmail: string
) {
  const companyForSubject = sanitizeEmailHeader(submission.companyName);
  const destinationForSubject = sanitizeEmailHeader(
    submission.destinationCountry
  );
  const { text, html } = formatEmail(submission, requestId, product);

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "Idempotency-Key": `borgafoods-rfq-${submission.submissionId}`,
    },
    body: JSON.stringify({
      from: `BorgaFoods Export Quote <${fromEmail}>`,
      to: [notificationEmail],
      reply_to: submission.email,
      subject: `[RFQ] ${companyForSubject} — ${destinationForSubject} — ${requestId}`,
      text,
      html,
    }),
    signal: AbortSignal.timeout(10_000),
  });

  if (!response.ok) return null;

  const result = (await response.json()) as { id?: string };
  return result.id || null;
}

export async function onRequest(context: PagesFunctionContext) {
  if (context.request.method !== "POST") {
    return errorResponse("invalid_method", 405);
  }

  if (!isSameOrigin(context.request)) {
    return errorResponse("invalid_origin", 403);
  }

  if (
    !context.request.headers.get("Content-Type")?.startsWith("application/json")
  ) {
    return errorResponse("invalid_request", 400);
  }

  const declaredSize = Number(context.request.headers.get("Content-Length"));
  if (Number.isFinite(declaredSize) && declaredSize > MAX_REQUEST_BYTES) {
    return errorResponse("invalid_request", 413);
  }

  let rawBody: string;
  try {
    rawBody = await context.request.text();
  } catch {
    return errorResponse("invalid_request", 400);
  }

  if (new TextEncoder().encode(rawBody).byteLength > MAX_REQUEST_BYTES) {
    return errorResponse("invalid_request", 413);
  }

  let body: unknown;
  try {
    body = JSON.parse(rawBody);
  } catch {
    return errorResponse("invalid_request", 400);
  }

  const parsed = exportQuoteSchema.safeParse(body);
  if (!parsed.success) {
    return errorResponse("invalid_request", 400);
  }

  const product = getProductDetails(
    parsed.data.productSelection,
    parsed.data.inquiryType
  );
  if (!product) {
    return errorResponse("invalid_request", 400);
  }

  const fromEmail = getConfiguredEmail(context.env.EXPORT_QUOTE_FROM_EMAIL);
  const notificationEmail = getConfiguredEmail(
    context.env.EXPORT_QUOTE_NOTIFICATION_EMAIL
  );

  if (
    !context.env.TURNSTILE_SECRET_KEY ||
    !context.env.RESEND_API_KEY ||
    !fromEmail ||
    !notificationEmail
  ) {
    return errorResponse("service_unavailable", 503);
  }

  try {
    if (!(await verifyTurnstile(parsed.data, context))) {
      return errorResponse("verification_failed", 400);
    }
  } catch {
    return errorResponse("service_unavailable", 503);
  }

  const requestId = `BF-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;

  try {
    const providerMessageId = await sendQuotationEmail(
      parsed.data,
      requestId,
      product,
      context.env.RESEND_API_KEY,
      fromEmail,
      notificationEmail
    );

    if (!providerMessageId) {
      console.error(
        JSON.stringify({ event: "rfq_delivery_rejected", requestId })
      );
      return errorResponse("delivery_failed", 502);
    }

    console.info(
      JSON.stringify({
        event: "rfq_delivery_accepted",
        requestId,
        providerMessageId,
      })
    );

    return jsonResponse({ ok: true, requestId }, 201);
  } catch {
    console.error(JSON.stringify({ event: "rfq_delivery_failed", requestId }));
    return errorResponse("delivery_failed", 502);
  }
}
