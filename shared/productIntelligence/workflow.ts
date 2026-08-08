/**
 * BorgaFoods Product Intelligence Platform (BPIP) — workflow gates.
 *
 * Pure functions only: no I/O, no side effects. These formalize the gates
 * already described in `docs/PUBLIC_PRODUCT_PRESENTATION_RULES.md` §6 and
 * `docs/PRODUCT_CAPABILITY_MODEL.md` as executable logic, so the same rule
 * can be checked by the build script, a test, or a future consumer (an
 * operations dashboard, an AI agent) without re-reading prose each time.
 *
 * Important distinction:
 * - `isCurrentlyPublished` reports a historical fact already recorded in the
 *   registry (`lifecycle.state === "published"`). It never re-derives or
 *   second-guesses an existing approval — the frozen capability model
 *   remains authoritative for anything already published.
 * - `computeNewPublicationEligibility` evaluates whether a *candidate*
 *   record meets every requirement for a *first-time* publication decision.
 *   It is a planning/reconciliation tool, not a mechanism for
 *   auto-publishing or auto-unpublishing anything.
 */
import type {
  ProductIntelligenceRecord,
  PublishedProductRecord,
} from "./types";

export interface GateCheck {
  passed: boolean;
  reason?: string;
}

export interface PublicationReadiness {
  ready: boolean;
  checks: Record<string, GateCheck>;
}

function hasCompletePublicCopy(record: ProductIntelligenceRecord): GateCheck {
  const requiredStrings = [
    record.description,
    record.summary,
    record.shelfLife,
    record.storage,
    record.certification,
  ];
  const complete =
    requiredStrings.every(
      value => typeof value === "string" && value.length > 0
    ) &&
    (record.images?.length ?? 0) > 0 &&
    (record.variants?.length ?? 0) > 0 &&
    (record.packagingSizes?.length ?? 0) > 0;

  return {
    passed: complete,
    reason: complete
      ? undefined
      : "Public copy (description, summary, shelf life, storage, certification, packaging sizes, image, variants) is incomplete.",
  };
}

function hasNoSupplierConfidentialityLeak(
  record: ProductIntelligenceRecord
): GateCheck {
  const raw = record as unknown as Record<string, unknown>;
  const passed =
    record.supplyType !== "partner_sourced" ||
    (!Object.prototype.hasOwnProperty.call(raw, "brand") &&
      !Object.prototype.hasOwnProperty.call(raw, "manufacturer"));

  return {
    passed,
    reason: passed
      ? undefined
      : "Partner-sourced record exposes a public brand or manufacturer field.",
  };
}

/**
 * Returns true only if the record's lifecycle already records it as live on
 * the public website. This never infers publication from any other field.
 */
export function isCurrentlyPublished(
  record: ProductIntelligenceRecord
): record is PublishedProductRecord {
  return (
    record.lifecycle.state === "published" &&
    record.approvals.publicDisplayStatus === "approved_current_catalog"
  );
}

/**
 * Evaluates every requirement from `PUBLIC_PRODUCT_PRESENTATION_RULES.md`
 * §6 for a record that is NOT already published. Use this to decide whether
 * a candidate is ready to be proposed for a first-time publication
 * decision — never to re-validate an already-published record (see module
 * doc comment).
 */
export function computeNewPublicationEligibility(
  record: ProductIntelligenceRecord
): PublicationReadiness {
  const checks: Record<string, GateCheck> = {
    explicitSupplyType: {
      passed:
        record.supplyType === "manufactured" ||
        record.supplyType === "partner_sourced",
    },
    publicDisplayApproval: {
      passed:
        record.approvals.publicDisplayStatus === "approved_current_catalog",
      reason:
        record.approvals.publicDisplayStatus === "approved_current_catalog"
          ? undefined
          : "No recorded public-display approval in the frozen capability model.",
    },
    noOpenReviewGate: {
      passed: !record.lifecycle.reviewGate,
      reason: record.lifecycle.reviewGate
        ? `Blocked by open review gate ${record.lifecycle.reviewGate}.`
        : undefined,
    },
    publicSafeImage: {
      passed: record.approvals.imageStatus === "approved_public_safe",
      reason:
        record.approvals.imageStatus === "approved_public_safe"
          ? undefined
          : `No approved public-safe image (current status: ${record.approvals.imageStatus}).`,
    },
    documentationReady: {
      passed: record.approvals.documentationStatus === "public_ready",
      reason:
        record.approvals.documentationStatus === "public_ready"
          ? undefined
          : `Documentation is not public-ready (current status: ${record.approvals.documentationStatus}).`,
    },
    completePublicCopy: hasCompletePublicCopy(record),
    supplierConfidentiality: hasNoSupplierConfidentialityLeak(record),
  };

  return {
    ready: Object.values(checks).every(check => check.passed),
    checks,
  };
}

/**
 * RFQ eligibility mirrors the existing `rfqEligibleProducts` selector:
 * only currently-published records may be offered in the quotation form.
 */
export function computeRfqEligibility(
  record: ProductIntelligenceRecord
): boolean {
  return isCurrentlyPublished(record);
}

/**
 * Private-label discovery eligibility mirrors the existing
 * `privateLabelDiscoveryProducts` selector: manufactured, currently
 * published, and explicitly approved for discovery. Partner-sourced
 * products are never eligible by this function, matching
 * "not_eligible_by_default" in the frozen capability model.
 */
export function computePrivateLabelEligibility(
  record: ProductIntelligenceRecord
): boolean {
  return (
    record.supplyType === "manufactured" &&
    record.approvals.privateLabelEligibility === "approved_for_discovery" &&
    isCurrentlyPublished(record)
  );
}
