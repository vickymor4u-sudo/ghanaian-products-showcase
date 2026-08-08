import { describe, expect, it } from "vitest";
import {
  computeNewPublicationEligibility,
  computePrivateLabelEligibility,
  computeRfqEligibility,
  isCurrentlyPublished,
} from "./workflow";
import type { ProductIntelligenceRecord } from "./types";

function makeCandidate(
  overrides: Partial<ProductIntelligenceRecord> = {}
): ProductIntelligenceRecord {
  return {
    slug: "test-candidate",
    name: "Test Candidate",
    category: "Test",
    countryOfOrigin: "Ghana",
    supplyType: "partner_sourced",
    lifecycle: { state: "candidate" },
    approvals: {
      publicDisplayStatus: "internal_approval_required",
      sourceAlignment: "source_only_partner_selection",
      privateLabelEligibility: "not_eligible_by_default",
      imageStatus: "supplier_branded_blocked",
      documentationStatus: "incomplete",
      exportAvailable: false,
      wholesaleAvailable: false,
    },
    ...overrides,
  } as ProductIntelligenceRecord;
}

function makePublished(
  overrides: Partial<ProductIntelligenceRecord> = {}
): ProductIntelligenceRecord {
  return {
    slug: "test-published",
    name: "Test Published",
    category: "Test",
    description: "A description.",
    summary: "A summary.",
    countryOfOrigin: "Ghana",
    packagingSizes: ["1kg"],
    bulkPackagingSizes: ["Available upon request"],
    shelfLife: "Up to 24 months",
    storage: "Cool, dry place",
    certification: "Ghana FDA registered facilities",
    images: ["/images/test.png"],
    variants: ["Standard"],
    supplyType: "manufactured",
    brand: "BorgaFoods",
    manufacturer: "BorgaFoods Processing",
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
    ...overrides,
  } as ProductIntelligenceRecord;
}

describe("isCurrentlyPublished", () => {
  it("is true only for lifecycle=published with approved_current_catalog", () => {
    expect(isCurrentlyPublished(makePublished())).toBe(true);
  });

  it("is false for a candidate", () => {
    expect(isCurrentlyPublished(makeCandidate())).toBe(false);
  });

  it("is false when lifecycle says published but display status disagrees", () => {
    const inconsistent = makePublished({
      approvals: {
        ...makePublished().approvals,
        publicDisplayStatus: "internal_approval_required",
      },
    });
    expect(isCurrentlyPublished(inconsistent)).toBe(false);
  });
});

describe("computeNewPublicationEligibility", () => {
  it("is not ready for a fresh candidate (every gate fails)", () => {
    const result = computeNewPublicationEligibility(makeCandidate());
    expect(result.ready).toBe(false);
    expect(result.checks.publicDisplayApproval.passed).toBe(false);
    expect(result.checks.publicSafeImage.passed).toBe(false);
    expect(result.checks.documentationReady.passed).toBe(false);
  });

  it("is blocked by an open review gate even with everything else approved", () => {
    const blocked = makeCandidate({
      lifecycle: { state: "review_gated", reviewGate: "PCR-002" },
      approvals: {
        publicDisplayStatus: "approved_current_catalog",
        sourceAlignment: "aligned",
        privateLabelEligibility: "not_eligible_by_default",
        imageStatus: "approved_public_safe",
        documentationStatus: "public_ready",
        exportAvailable: true,
        wholesaleAvailable: true,
      },
      description: "d",
      summary: "s",
      shelfLife: "sl",
      storage: "st",
      certification: "c",
      images: ["/images/x.png"],
      variants: ["v"],
      packagingSizes: ["1kg"],
    });
    const result = computeNewPublicationEligibility(blocked);
    expect(result.ready).toBe(false);
    expect(result.checks.noOpenReviewGate.passed).toBe(false);
  });

  it("fails the supplier-confidentiality check if a partner-sourced record carries a brand field", () => {
    const leaky = {
      ...makeCandidate(),
      brand: "Should not be here",
    } as unknown as ProductIntelligenceRecord;
    const result = computeNewPublicationEligibility(leaky);
    expect(result.checks.supplierConfidentiality.passed).toBe(false);
  });

  it("passes every gate for a fully-approved, fully-documented record", () => {
    const ready = makeCandidate({
      lifecycle: { state: "approved_public" },
      approvals: {
        publicDisplayStatus: "approved_current_catalog",
        sourceAlignment: "aligned",
        privateLabelEligibility: "not_eligible_by_default",
        imageStatus: "approved_public_safe",
        documentationStatus: "public_ready",
        exportAvailable: true,
        wholesaleAvailable: true,
      },
      description: "d",
      summary: "s",
      shelfLife: "sl",
      storage: "st",
      certification: "c",
      images: ["/images/x.png"],
      variants: ["v"],
      packagingSizes: ["1kg"],
    });
    const result = computeNewPublicationEligibility(ready);
    expect(result.ready).toBe(true);
  });
});

describe("computeRfqEligibility", () => {
  it("mirrors isCurrentlyPublished", () => {
    expect(computeRfqEligibility(makePublished())).toBe(true);
    expect(computeRfqEligibility(makeCandidate())).toBe(false);
  });
});

describe("computePrivateLabelEligibility", () => {
  it("requires manufactured + approved_for_discovery + currently published", () => {
    const eligible = makePublished({
      approvals: {
        ...makePublished().approvals,
        privateLabelEligibility: "approved_for_discovery",
      },
    });
    expect(computePrivateLabelEligibility(eligible)).toBe(true);
  });

  it("is false for partner-sourced records regardless of other fields", () => {
    const partnerSourced = makeCandidate({
      lifecycle: { state: "published" },
      approvals: {
        publicDisplayStatus: "approved_current_catalog",
        sourceAlignment: "aligned",
        privateLabelEligibility: "approved_for_discovery",
        imageStatus: "approved_public_safe",
        documentationStatus: "public_ready",
        exportAvailable: true,
        wholesaleAvailable: true,
      },
      description: "d",
      summary: "s",
      shelfLife: "sl",
      storage: "st",
      certification: "c",
      images: ["/images/x.png"],
      variants: ["v"],
      packagingSizes: ["1kg"],
    });
    expect(computePrivateLabelEligibility(partnerSourced)).toBe(false);
  });

  it("is false when not yet published even if otherwise approved", () => {
    const notPublished = makeCandidate({
      supplyType: "manufactured",
      brand: "BorgaFoods",
      manufacturer: "BorgaFoods Processing",
      approvals: {
        ...makeCandidate().approvals,
        privateLabelEligibility: "approved_for_discovery",
      },
    } as Partial<ProductIntelligenceRecord>);
    expect(computePrivateLabelEligibility(notPublished)).toBe(false);
  });
});
