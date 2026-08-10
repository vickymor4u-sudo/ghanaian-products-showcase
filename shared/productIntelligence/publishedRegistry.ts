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
    packagingSizes: ["700g", "1kg", "2kg"],
    bulkPackagingSizes: ["Available upon request"],
    shelfLife: "Up to 24 months",
    storage: "Cool, dry place away from direct sunlight",
    certification: "Ghana FDA registered facilities",
    images: ["/images/fufu-borga.jpg", "/images/fufu-product.jpg"],
    variants: ["Plantain-based fufu flour", "Cassava-plantain blends"],
    lifecycle: {
      state: "published",
      reviewGate: "PCR-001",
      internalNotes:
        "Existing approved catalog record retained as-is. PCR-001 restricts new Phase 4 packaging/export/classification content, not this existing presentation. Private-label discovery approved for this record only.",
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
    packagingSizes: ["500g", "1kg", "2kg", "5kg"],
    bulkPackagingSizes: ["25kg", "50kg sacks"],
    shelfLife: "Up to 24 months",
    storage: "Cool, dry place away from direct sunlight",
    certification: "Ghana FDA registered facilities",
    images: ["/images/gari-borga.jpg"],
    variants: ["Fine grain", "Medium grain", "Coarse grain"],
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
    packagingSizes: ["1kg", "2kg", "5kg"],
    bulkPackagingSizes: ["Available upon request"],
    shelfLife: "Up to 24 months",
    storage: "Cool, dry place away from direct sunlight",
    certification: "Ghana FDA registered facilities",
    images: ["/images/kokonte-borga.jpg"],
    variants: ["Standard mix", "High plantain blend"],
    wholesalePricing: {
      pricePerCarton: 38,
      currency: "USD",
      unitsPerCarton: 12,
    },
    lifecycle: {
      state: "published",
      internalNotes:
        "Not present in the earlier reconciled master export workbook; approval predates and was independent of it. Pricing added from a later master export workbook where a Kokonte row first appeared.",
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
    packagingSizes: ["1kg", "2kg", "5kg"],
    bulkPackagingSizes: ["Available upon request"],
    shelfLife: "Up to 24 months",
    storage: "Cool, dry place away from direct sunlight",
    certification: "Ghana FDA registered facilities",
    images: ["/images/banku-borga.jpg", "/images/banku-product.jpg"],
    variants: ["Standard mix", "High corn blend", "High cassava blend"],
    lifecycle: {
      state: "published",
      internalNotes:
        "Not present in the reconciled master export workbook; approval predates and is independent of it.",
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
    packagingSizes: ["1kg", "2kg", "5kg"],
    bulkPackagingSizes: ["25kg", "50kg sacks"],
    shelfLife: "Up to 24 months",
    storage: "Cool, dry place away from direct sunlight",
    certification: "Ghana FDA registered facilities",
    images: ["/images/cassava-flour.jpg"],
    variants: ["Fine milled", "For fufu preparation"],
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
