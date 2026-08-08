/**
 * BorgaFoods Product Intelligence Platform (BPIP) — registry validation.
 *
 * These checks are build-blocking (invoked from
 * `scripts/verify-product-catalog.ts`) and test-covered. They extend the
 * integrity checks that previously lived only in
 * `client/src/data/products.ts` (`assertProductCatalogIntegrity`) with the
 * new lifecycle/approval fields, without weakening any existing check.
 */
import { isCurrentlyPublished } from "./workflow";
import type { ProductIntelligenceRecord } from "./types";

export class ProductIntelligenceValidationError extends Error {}

function hasOwn(value: object, property: string) {
  return Object.prototype.hasOwnProperty.call(value, property);
}

/**
 * Validates the full registry. Throws on the first violation found; the
 * message identifies the offending slug and rule.
 */
export function assertRegistryIntegrity(
  registry: readonly ProductIntelligenceRecord[]
): void {
  const slugs = new Set<string>();

  for (const record of registry) {
    const raw = record as unknown as Record<string, unknown>;

    if (!record.slug || slugs.has(record.slug)) {
      throw new ProductIntelligenceValidationError(
        `Registry contains an invalid or duplicate slug: ${record.slug}`
      );
    }
    slugs.add(record.slug);

    if (
      raw.supplyType !== "manufactured" &&
      raw.supplyType !== "partner_sourced"
    ) {
      throw new ProductIntelligenceValidationError(
        `${record.slug} is missing an explicit supply type.`
      );
    }

    if (
      record.supplyType === "partner_sourced" &&
      (hasOwn(raw, "brand") || hasOwn(raw, "manufacturer"))
    ) {
      throw new ProductIntelligenceValidationError(
        `${record.slug} is partner-sourced and must not expose a public brand or manufacturer field.`
      );
    }

    if (
      record.supplyType === "manufactured" &&
      (!record.brand || !record.manufacturer)
    ) {
      throw new ProductIntelligenceValidationError(
        `${record.slug} is manufactured and must include its public brand and manufacturer.`
      );
    }

    if (
      !record.approvals.publicDisplayStatus ||
      !record.approvals.sourceAlignment
    ) {
      throw new ProductIntelligenceValidationError(
        `${record.slug} is missing capability-model visibility data.`
      );
    }

    if (
      record.approvals.privateLabelEligibility === "approved_for_discovery" &&
      record.supplyType !== "manufactured"
    ) {
      throw new ProductIntelligenceValidationError(
        `Only manufactured records may be approved for private-label discovery: ${record.slug}`
      );
    }

    // Lifecycle/approval consistency: "published" is the strongest claim in
    // the registry and must agree with the frozen-model display status.
    if (
      record.lifecycle.state === "published" &&
      record.approvals.publicDisplayStatus !== "approved_current_catalog"
    ) {
      throw new ProductIntelligenceValidationError(
        `${record.slug} is marked published but lacks "approved_current_catalog" display status.`
      );
    }

    if (
      record.lifecycle.state === "published" &&
      record.lifecycle.reviewGate &&
      record.approvals.sourceAlignment !== "needs_validation"
    ) {
      // A published record MAY carry an informational review-gate note
      // (e.g. Fufu Flour / PCR-001), but only when sourceAlignment already
      // signals the same open question — this prevents a silently
      // contradictory registry entry.
      throw new ProductIntelligenceValidationError(
        `${record.slug} carries reviewGate "${record.lifecycle.reviewGate}" without a matching sourceAlignment signal.`
      );
    }

    if (record.lifecycle.state === "archived") {
      throw new ProductIntelligenceValidationError(
        `${record.slug} is archived and must not be present in an active registry export.`
      );
    }

    // A record cannot claim public-ready documentation or an approved
    // public-safe image while its lifecycle hasn't reached at least
    // approved_public — prevents the workflow fields from drifting apart.
    const isAtLeastApprovedPublic =
      record.lifecycle.state === "approved_public" ||
      record.lifecycle.state === "published";
    if (
      !isAtLeastApprovedPublic &&
      (record.approvals.documentationStatus === "public_ready" ||
        record.approvals.imageStatus === "approved_public_safe")
    ) {
      throw new ProductIntelligenceValidationError(
        `${record.slug} claims public-ready documentation or imagery but its lifecycle state is "${record.lifecycle.state}".`
      );
    }

    // Every currently-published record must actually satisfy the full
    // presentation-ready shape (public copy present). This is a stronger,
    // BPIP-native re-statement of what `PublishedProductRecord` encodes at
    // the type level, kept here as a runtime guard as well.
    if (isCurrentlyPublished(record)) {
      const requiredFields: (keyof ProductIntelligenceRecord)[] = [
        "description",
        "summary",
        "shelfLife",
        "storage",
        "certification",
      ];
      for (const field of requiredFields) {
        if (!record[field]) {
          throw new ProductIntelligenceValidationError(
            `${record.slug} is published but missing required public field "${field}".`
          );
        }
      }
      if (!record.images?.length) {
        throw new ProductIntelligenceValidationError(
          `${record.slug} is published but has no image.`
        );
      }
    }
  }
}
