/**
 * BorgaFoods Product Intelligence Platform (BPIP) — published registry.
 *
 * This file contains ONLY records currently live on the public website.
 * `client/src/data/products.ts` (client-bundled, shipped to every visitor's
 * browser) imports exclusively from this file — never from
 * `internalCandidates.ts` or the combined `registry.ts`.
 *
 * This is a deliberate module boundary, not just a convention: keeping
 * internal-only records in a separate file that nothing client-bundled ever
 * imports is what actually prevents them from reaching the browser, since a
 * bundler cannot tree-shake array elements out of a runtime `.filter()`
 * call. See `docs/PRODUCT_INTELLIGENCE_PLATFORM.md` for the full rationale
 * and `scripts/verify-no-internal-leak.ts` for the automated build-time
 * guard that checks this boundary held.
 *
 * Field values for the 5 records below are migrated byte-for-byte from the
 * prior `client/src/data/products.ts` — this migration changes no approved
 * fact, wording, classification, or public content.
 */
import type {
  ProductIntelligenceRecord,
  PublishedProductRecord,
} from "./types";
import {
  computePrivateLabelEligibility,
  isCurrentlyPublished,
} from "./workflow";

export const publishedRegistry: readonly ProductIntelligenceRecord[] = [
  {
    slug: "fufu-borga",
    name: "Fufu Flour",
    category: "Traditional Flour Blends",
    description:
      "Premium Ghanaian fufu flour—the flagship BorgaFoods product developed for consistent texture, taste, and export stability.",
    summary: "Premium plantain & cassava flour",
    brand: "BorgaFoods",
    manufacturer: "BorgaFoods Processing",
    supplyType: "manufactured",
    countryOfOrigin: "Ghana",
    packagingSizes: ["700 g"],
    bulkPackagingSizes: [],
    cartonConfiguration: "700 g × 12 packs (8.4 kg net)",
    shelfLife: "24 months from manufacture",
    storage: "Store in a cool, dry place. Reseal after opening",
    certification: "Ghana FDA registered facilities",
    images: ["/images/fufu-borga-2026.webp"],
    variants: ["Fufu Borga"],
    lifecycle: {
      state: "published",
      reviewGate: "PCR-001",
    },
    approvals: {
      publicDisplayStatus: "approved_current_catalog",
      sourceAlignment: "needs_validation",
      privateLabelEligibility: "approved_for_discovery",
      imageStatus: "approved_public_safe",
      documentationStatus: "public_ready",
      exportAvailable: true,
      wholesaleAvailable: true,
    },
  },
  {
    slug: "gari-borga",
    name: "Gari",
    category: "Cassava Products",
    description:
      "Clean, well-processed cassava granules—the BorgaFoods standard for retail, wholesale, and food service distribution.",
    summary: "Clean cassava granules",
    brand: "BorgaFoods",
    manufacturer: "BorgaFoods Processing",
    supplyType: "manufactured",
    countryOfOrigin: "Ghana",
    packagingSizes: ["1 kg", "2 kg", "5 kg"],
    bulkPackagingSizes: ["10 kg", "25 kg", "50 kg"],
    cartonConfiguration: "1 kg × 12 packs, 2 kg × 6 packs, 5 kg × 5 packs",
    shelfLife: "36 months from manufacture",
    storage: "Store in a cool, dry place",
    certification: "Ghana FDA registered facilities",
    images: ["/images/gari-borga.jpg"],
    variants: ["White Gari", "Yellow Gari"],
    wholesalePricing: {
      pricePerCarton: 35,
      currency: "USD",
      unitsPerCarton: 12,
    },
    lifecycle: { state: "published" },
    approvals: {
      publicDisplayStatus: "approved_current_catalog",
      sourceAlignment: "aligned",
      privateLabelEligibility: "requires_business_approval",
      imageStatus: "approved_public_safe",
      documentationStatus: "public_ready",
      exportAvailable: true,
      wholesaleAvailable: true,
    },
  },
  {
    slug: "kokonte-borga",
    name: "Kokonte",
    category: "Cassava Products",
    description:
      "Traditional dried cassava flour—processed under the BorgaFoods standard for export consistency and long shelf life.",
    summary: "Traditional cassava flour",
    brand: "BorgaFoods",
    manufacturer: "BorgaFoods Processing",
    supplyType: "manufactured",
    countryOfOrigin: "Ghana",
    packagingSizes: ["1 kg", "2 kg"],
    bulkPackagingSizes: [],
    cartonConfiguration: "1 kg × 12 packs or 2 kg × 6 packs",
    shelfLife: "24 months from manufacture",
    storage: "Store in a cool, dry place. Reseal after opening",
    certification: "Ghana FDA registered facilities",
    images: ["/images/kokonte-borga.jpg"],
    variants: ["100% cassava flour for making kokonte"],
    wholesalePricing: {
      pricePerCarton: 38,
      currency: "USD",
      unitsPerCarton: 12,
    },
    lifecycle: {
      state: "published",
    },
    approvals: {
      publicDisplayStatus: "approved_current_catalog",
      sourceAlignment: "canonical_catalog_only",
      privateLabelEligibility: "requires_business_approval",
      imageStatus: "approved_public_safe",
      documentationStatus: "public_ready",
      exportAvailable: true,
      wholesaleAvailable: true,
    },
  },
  {
    slug: "banku-borga",
    name: "Banku Borga",
    category: "Traditional Ghanaian Staples",
    description:
      "Fermented corn and cassava blend—the BorgaFoods signature offering authentic taste adapted for international markets.",
    summary: "Fermented corn & cassava blend",
    brand: "BorgaFoods",
    manufacturer: "BorgaFoods Processing",
    supplyType: "manufactured",
    countryOfOrigin: "Ghana",
    packagingSizes: ["1 kg", "2 kg"],
    bulkPackagingSizes: [],
    cartonConfiguration: "1 kg × 12 packs or 2 kg × 6 packs",
    shelfLife: "36 months from manufacture",
    storage: "Store in a cool, dry place. Reseal after opening",
    certification: "Ghana FDA registered facilities",
    images: ["/images/banku-borga.jpg"],
    variants: ["Fermented maize and cassava flour"],
    wholesalePricing: {
      pricePerCarton: 35,
      currency: "USD",
    },
    lifecycle: {
      state: "published",
    },
    approvals: {
      publicDisplayStatus: "approved_current_catalog",
      sourceAlignment: "canonical_catalog_only",
      privateLabelEligibility: "requires_business_approval",
      imageStatus: "approved_public_safe",
      documentationStatus: "public_ready",
      exportAvailable: true,
      wholesaleAvailable: true,
    },
  },
  {
    slug: "cassava-flour",
    name: "Cassava Flour",
    category: "Cassava Products",
    description:
      "Pure, finely milled cassava flour for making fufu—a versatile BorgaFoods staple sourced and processed for export-grade consistency.",
    summary: "Pure milled cassava for fufu",
    brand: "BorgaFoods",
    manufacturer: "BorgaFoods Processing",
    supplyType: "manufactured",
    countryOfOrigin: "Ghana",
    packagingSizes: ["1 kg", "2 kg"],
    bulkPackagingSizes: [],
    cartonConfiguration: "1 kg × 12 packs or 2 kg × 6 packs",
    shelfLife: "24 months from manufacture",
    storage: "Store in a cool, dry place. Reseal after opening",
    certification: "Ghana FDA registered facilities",
    images: ["/images/cassava-flour.jpg"],
    variants: ["100% cassava flour for making fufu"],
    wholesalePricing: {
      pricePerCarton: 45,
      currency: "USD",
      unitsPerCarton: 12,
    },
    lifecycle: { state: "published" },
    approvals: {
      publicDisplayStatus: "approved_current_catalog",
      sourceAlignment: "aligned",
      privateLabelEligibility: "requires_business_approval",
      imageStatus: "approved_public_safe",
      documentationStatus: "public_ready",
      exportAvailable: true,
      wholesaleAvailable: true,
    },
  },
] as const satisfies readonly ProductIntelligenceRecord[];

/** Every record currently live on the public website, in registry order. */
export const publishedProducts: readonly PublishedProductRecord[] =
  publishedRegistry.filter(isCurrentlyPublished);

/**
 * Published records approved for private-label discovery. Mirrors the
 * prior `privateLabelDiscoveryProducts` selector in
 * `client/src/data/products.ts` exactly: manufactured, currently
 * published, and explicitly `approved_for_discovery`. Consumed directly by
 * both the website (via the `client/src/data/products.ts` adapter) and the
 * RFQ Function (`functions/api/export-quote.ts`) — this is the single
 * authoritative private-label allowlist for both.
 */
export const privateLabelEligibleProducts: readonly PublishedProductRecord[] =
  publishedProducts.filter(computePrivateLabelEligibility);
