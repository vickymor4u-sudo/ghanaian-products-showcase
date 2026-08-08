import { describe, expect, it } from "vitest";
import { productIntelligenceRegistry, internalOnlyRecords } from "./registry";
import { publishedProducts } from "./publishedRegistry";
import { internalCandidates } from "./internalCandidates";
import { assertRegistryIntegrity } from "./validate";
import { isCurrentlyPublished } from "./workflow";

const ALLOWED_INTERNAL_CANDIDATE_KEYS = new Set([
  "slug",
  "name",
  "category",
  "countryOfOrigin",
  "supplyType",
  "lifecycle",
  "approvals",
]);

describe("BPIP registry", () => {
  it("passes full integrity validation", () => {
    expect(() =>
      assertRegistryIntegrity(productIntelligenceRegistry)
    ).not.toThrow();
  });

  it("has no duplicate slugs across published + internal records", () => {
    const slugs = productIntelligenceRegistry.map(record => record.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("exposes exactly the 5 currently public products, unchanged", () => {
    expect(publishedProducts.map(product => product.slug).sort()).toEqual(
      [
        "banku-borga",
        "cassava-flour",
        "fufu-borga",
        "gari-borga",
        "kokonte-borga",
      ].sort()
    );
  });

  it("keeps every internal candidate un-published", () => {
    for (const record of internalCandidates) {
      expect(isCurrentlyPublished(record)).toBe(false);
    }
  });

  it("matches internalOnlyRecords to exactly the non-published set", () => {
    expect(internalOnlyRecords.length).toBe(internalCandidates.length);
    expect(new Set(internalOnlyRecords.map(r => r.slug))).toEqual(
      new Set(internalCandidates.map(r => r.slug))
    );
  });

  it("never gives an internal candidate a brand, manufacturer, or any field outside the approved schema (no supplier/pricing data)", () => {
    for (const record of internalCandidates) {
      const keys = Object.keys(record);
      for (const key of keys) {
        expect(ALLOWED_INTERNAL_CANDIDATE_KEYS.has(key)).toBe(true);
      }
      expect(Object.hasOwn(record, "brand")).toBe(false);
      expect(Object.hasOwn(record, "manufacturer")).toBe(false);
    }
  });

  it("keeps Red Palm Oil review-gated under PCR-002 and excluded from RFQ/public paths", () => {
    const redPalmOil = internalCandidates.find(r => r.slug === "red-palm-oil");
    expect(redPalmOil).toBeDefined();
    expect(redPalmOil!.lifecycle.state).toBe("review_gated");
    expect(redPalmOil!.lifecycle.reviewGate).toBe("PCR-002");
    expect(isCurrentlyPublished(redPalmOil!)).toBe(false);
    expect(publishedProducts.some(p => /red palm oil/i.test(p.name))).toBe(
      false
    );
  });

  it("keeps Fufu Flour published with an informational PCR-001 note, not blocked", () => {
    const fufu = publishedProducts.find(p => p.slug === "fufu-borga");
    expect(fufu).toBeDefined();
    expect(isCurrentlyPublished(fufu!)).toBe(true);
    expect(fufu!.lifecycle.reviewGate).toBe("PCR-001");
    expect(fufu!.approvals.privateLabelEligibility).toBe(
      "approved_for_discovery"
    );
  });

  it("marks every manufactured published product's private-label eligibility explicitly (no silent default)", () => {
    for (const product of publishedProducts) {
      if (product.supplyType === "manufactured") {
        expect(product.approvals.privateLabelEligibility).toBeDefined();
      }
    }
  });

  it("gives exactly one product approved_for_discovery private-label eligibility", () => {
    const approved = publishedProducts.filter(
      p => p.approvals.privateLabelEligibility === "approved_for_discovery"
    );
    expect(approved.map(p => p.slug)).toEqual(["fufu-borga"]);
  });
});
