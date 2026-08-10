/**
 * BorgaFoods Product Intelligence Platform (BPIP) — core types.
 *
 * This module defines the data shape for the internal product registry.
 * It is a strict superset of the public catalog type previously defined
 * directly in `client/src/data/products.ts`: every field required there
 * remains required here for a "published" record, so the existing public
 * catalog migrates in without any loss of information.
 *
 * The new fields (`lifecycle`, `approvals`) formalize, as types instead of
 * prose, the governance already described in `docs/PRODUCT_CAPABILITY_MODEL.md`
 * and `docs/PUBLIC_PRODUCT_PRESENTATION_RULES.md`. They do not change what
 * those documents authorize — they make the existing rules machine-checkable.
 *
 * Supplier-confidential fields (supplier name/brand, source pricing, carton
 * quantities, factory identity) are deliberately absent from this schema.
 * They are out of scope for BPIP Phase 1 and must never be added here — see
 * `docs/PRODUCT_INTELLIGENCE_RECONCILIATION.md` and
 * `docs/BUSINESS_RULES.md` "Supplier confidentiality rules".
 */

/** Supply classification. No default; every record must declare one explicitly. */
export type SupplyType = "manufactured" | "partner_sourced";

/** Whether a record is currently permitted to render on the public website. */
export type PublicDisplayStatus =
  | "approved_current_catalog"
  | "internal_approval_required";

/** Relationship of a record to its underlying source data / review state. */
export type SourceAlignment =
  | "aligned"
  | "needs_validation"
  | "canonical_catalog_only"
  | "source_only_partner_selection";

/** Private-label eligibility, matching the frozen capability model's field. */
export type PrivateLabelEligibility =
  | "approved_for_discovery"
  | "requires_business_approval"
  | "not_eligible_by_default";

/**
 * BPIP lifecycle state machine. Distinct from `PublicDisplayStatus`:
 * `PublicDisplayStatus` is the frozen-capability-model approval fact;
 * `ProductLifecycleState` is BPIP's own workflow tracking of where a record
 * sits in the registry. For the 5 currently live products these always
 * agree (`published` + `approved_current_catalog`). For everything else,
 * lifecycle state lets BPIP track progress without touching the frozen
 * model until a business decision actually changes it.
 */
export type ProductLifecycleState =
  | "candidate" // identified (e.g. via reconciliation), not yet reviewed
  | "under_review" // business review in progress
  | "review_gated" // blocked by a named, recorded classification review (e.g. a PCR item)
  | "approved_internal" // approved for internal/RFQ use but not public display
  | "approved_public" // approved for public display, not yet live
  | "published" // live on the public website
  | "archived"; // retired; must not be shown anywhere

/** Image-approval workflow status. */
export type ImageApprovalStatus =
  | "not_available"
  | "supplier_branded_blocked"
  | "pending_public_safe_review"
  | "approved_public_safe";

/** Documentation-readiness workflow status. */
export type DocumentationStatus =
  | "incomplete"
  | "internal_complete"
  | "public_ready";

export interface ProductLifecycle {
  state: ProductLifecycleState;
  /** Named review gate blocking this record, e.g. "PCR-001". Absent if none. */
  reviewGate?: string;
  /** One-line, supplier-safe reason a candidate/blocked record isn't further along. */
  blockedReason?: string;
  /** Supplementary internal-only context (e.g. a business-fit question). Never supplier-identifying. */
  internalNotes?: string;
}

export interface ProductApprovals {
  publicDisplayStatus: PublicDisplayStatus;
  sourceAlignment: SourceAlignment;
  privateLabelEligibility: PrivateLabelEligibility;
  imageStatus: ImageApprovalStatus;
  documentationStatus: DocumentationStatus;
  exportAvailable: boolean;
  wholesaleAvailable: boolean;
}

interface ProductIntelligenceBase {
  slug: string;
  name: string;
  /** Internal/registry category. May differ from the public catalog's display category. */
  category: string;
  countryOfOrigin: string;
  lifecycle: ProductLifecycle;
  approvals: ProductApprovals;

  // Public-presentation fields. Required for any record whose lifecycle has
  // reached "approved_public" or "published" — see `validate.ts`. Optional
  // for earlier lifecycle states, which by definition don't have approved
  // public copy yet.
  description?: string;
  summary?: string;
  packagingSizes?: readonly string[];
  bulkPackagingSizes?: readonly string[];
  shelfLife?: string;
  storage?: string;
  certification?: string;
  images?: readonly string[];
  variants?: readonly string[];

  /**
   * Approved wholesale (not retail) carton sale price, for structured-data
   * `Offer` eligibility (Google Search Console requires a `Product` schema
   * to carry `offers`, `review`, or `aggregateRating`). Optional and
   * deliberately absent for any record without an explicit, current,
   * business-approved sale price — see
   * `docs/COMMERCIAL_INFO_DECISION_RECORD.md`. Never populate this for a
   * record with an open `lifecycle.reviewGate`.
   */
  wholesalePricing?: {
    pricePerCarton: number;
    currency: string;
    unitsPerCarton?: number;
  };
}

export interface ManufacturedProductRecord extends ProductIntelligenceBase {
  supplyType: "manufactured";
  brand: string;
  manufacturer: string;
}

export interface PartnerSourcedProductRecord extends ProductIntelligenceBase {
  supplyType: "partner_sourced";
  brand?: never;
  manufacturer?: never;
}

export type ProductIntelligenceRecord =
  | ManufacturedProductRecord
  | PartnerSourcedProductRecord;

/**
 * A record with lifecycle "published" and all public-presentation fields
 * present. This is exactly the shape the current public website needs, and
 * matches the `Product` type previously defined inline in
 * `client/src/data/products.ts`.
 */
export type PublishedProductRecord = ProductIntelligenceRecord &
  Required<
    Pick<
      ProductIntelligenceBase,
      | "description"
      | "summary"
      | "packagingSizes"
      | "bulkPackagingSizes"
      | "shelfLife"
      | "storage"
      | "certification"
      | "images"
      | "variants"
    >
  >;

export const productTypeLabels: Record<SupplyType, string> = {
  manufactured: "Manufactured by BorgaFoods",
  partner_sourced: "BorgaFoods Export Selection",
};

export const productSupplyStatements: Record<SupplyType, string> = {
  manufactured: "Manufactured by BorgaFoods Processing",
  partner_sourced: "Selected from trusted Ghanaian production partners",
};
