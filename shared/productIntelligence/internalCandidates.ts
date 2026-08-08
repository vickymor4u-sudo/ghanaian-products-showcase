/**
 * BorgaFoods Product Intelligence Platform (BPIP) — internal-only candidates.
 *
 * DO NOT import this file from anything under `client/src/`. It exists so
 * `scripts/verify-product-catalog.ts`, tests, and future internal-only
 * tooling (an operations dashboard, an AI agent with server-side access)
 * can reason about the full registry. Nothing in this file may reach the
 * browser — see `publishedRegistry.ts` for the module-boundary rationale
 * and `scripts/verify-no-internal-leak.ts` for the automated guard.
 *
 * Records here come from `docs/PRODUCT_INTELLIGENCE_RECONCILIATION.md`.
 * None has a recorded public-display approval, so every one is
 * `lifecycle.state: "candidate"` or `"review_gated"`. No supplier name,
 * brand, or price is present — that data exists only in the source
 * workbook and must stay there.
 *
 * Do not move any record here to a more-approved lifecycle state without a
 * recorded business decision — see `docs/BUSINESS_RULES.md` and
 * `docs/PRODUCT_CAPABILITY_MODEL.md`.
 */
import type { ProductIntelligenceRecord } from "./types";

const CANDIDATE_SOURCE: readonly (readonly [
  slug: string,
  name: string,
  category: string,
  countryOfOrigin: string,
])[] = [
  ["corn-flour", "Corn Flour", "Flours", "Ghana"],
  ["yam-flour-elubo", "Yam Flour (Elubo)", "Flours", "Nigeria"],
  ["semolina-couscous", "Semolina / Couscous", "Flours", "Nigeria"],
  ["sorghum", "Sorghum", "Grains", "Ghana"],
  ["millet", "Millet", "Grains", "Ghana"],
  ["coconut-oil", "Coconut Oil", "Oils", "Ghana"],
  ["pepper-sauce", "Pepper Sauce", "Sauces", "Ghana"],
  ["hot-shito-mix", "Hot Shito Mix", "Sauces", "Ghana"],
  ["palm-soup", "Palm Soup", "Sauces", "Ghana"],
  ["jollof-seasoning", "Jollof Seasoning", "Seasonings", "Ghana"],
  ["suya-spice", "Suya Spice", "Seasonings", "Ghana"],
  ["all-purpose-seasoning", "All Purpose", "Seasonings", "Ghana"],
  ["fish-seasoning", "Fish Seasoning", "Seasonings", "Ghana"],
  ["chicken-seasoning", "Chicken Seasoning", "Seasonings", "Ghana"],
  ["rice-seasoning", "Rice Seasoning", "Seasonings", "Ghana"],
  ["wakye-leaves", "Wakye Leaves", "Seasonings", "Ghana"],
  ["chin-chin", "Chin Chin", "Snacks", "Ghana"],
  ["plantain-chips", "Plantain Chips", "Snacks", "Ghana"],
  ["ginger-drink", "Ginger Drink", "Drinks", "Ghana"],
  ["hibiscus-tea-bag", "Hibiscus Tea bag", "Drinks", "Ghana"],
  ["palm-wine-alternative", "Palm Wine Alternative", "Drinks", "Ghana"],
];

const reconciliationCandidates: readonly ProductIntelligenceRecord[] =
  CANDIDATE_SOURCE.map(([slug, name, category, countryOfOrigin]) => ({
    slug,
    name,
    category,
    countryOfOrigin,
    supplyType: "partner_sourced",
    lifecycle: {
      state: "candidate",
      blockedReason:
        "No product-level public-display approval recorded in the frozen capability model.",
      ...(countryOfOrigin !== "Ghana"
        ? {
            internalNotes:
              "Origin outside the current Ghana-focused business positioning — business-fit question, not decided.",
          }
        : {}),
    },
    approvals: {
      publicDisplayStatus: "internal_approval_required",
      sourceAlignment: "source_only_partner_selection",
      privateLabelEligibility: "not_eligible_by_default",
      imageStatus: "supplier_branded_blocked",
      documentationStatus: "incomplete",
      exportAvailable: false,
      wholesaleAvailable: false,
    },
  }));

/**
 * Red Palm Oil — PCR-002. Conflicting supply-type rows in the source
 * workbook (see `docs/PRODUCT_INTELLIGENCE_RECONCILIATION.md`). Treated as
 * partner_sourced internally for planning only, per
 * `docs/PRODUCT_CLASSIFICATION_REVIEW.md`; excluded from every public and
 * RFQ path regardless.
 */
const redPalmOil: ProductIntelligenceRecord = {
  slug: "red-palm-oil",
  name: "Red Palm Oil",
  category: "Oils",
  countryOfOrigin: "Ghana",
  supplyType: "partner_sourced",
  lifecycle: {
    state: "review_gated",
    reviewGate: "PCR-002",
    blockedReason:
      "Conflicting supply-type indicators across source records; must not be publicly listed, described as manufactured, or shown as private-label eligible until resolved.",
  },
  approvals: {
    publicDisplayStatus: "internal_approval_required",
    sourceAlignment: "needs_validation",
    privateLabelEligibility: "not_eligible_by_default",
    imageStatus: "supplier_branded_blocked",
    documentationStatus: "incomplete",
    exportAvailable: false,
    wholesaleAvailable: false,
  },
};

export const internalCandidates: readonly ProductIntelligenceRecord[] = [
  ...reconciliationCandidates,
  redPalmOil,
];
