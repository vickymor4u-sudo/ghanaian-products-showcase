import { describe, expect, it } from "vitest";
import { assertRegistryIntegrity } from "./validate";
import { publishedRegistry } from "./publishedRegistry";
import type { ProductIntelligenceRecord } from "./types";

const validPublished = publishedRegistry.find(
  record => record.slug === "gari-borga"
)!;

describe("assertRegistryIntegrity", () => {
  it("accepts the real published registry", () => {
    expect(() => assertRegistryIntegrity(publishedRegistry)).not.toThrow();
  });

  it("rejects a duplicate slug", () => {
    expect(() =>
      assertRegistryIntegrity([validPublished, validPublished])
    ).toThrow(/duplicate slug/);
  });

  it("rejects a record with no explicit supply type", () => {
    const noSupplyType = { ...validPublished } as Record<string, unknown>;
    delete noSupplyType.supplyType;
    expect(() =>
      assertRegistryIntegrity([
        noSupplyType as unknown as ProductIntelligenceRecord,
      ])
    ).toThrow(/missing an explicit supply type/);
  });

  it("rejects a partner-sourced record exposing a brand field", () => {
    const leaky = {
      ...validPublished,
      slug: "leaky",
      supplyType: "partner_sourced",
      brand: "Should not be here",
    } as unknown as ProductIntelligenceRecord;
    delete (leaky as unknown as Record<string, unknown>).manufacturer;
    expect(() => assertRegistryIntegrity([leaky])).toThrow(
      /must not expose a public brand or manufacturer/
    );
  });

  it("rejects a manufactured record missing brand/manufacturer", () => {
    const incomplete = { ...validPublished, slug: "incomplete" } as Record<
      string,
      unknown
    >;
    delete incomplete.brand;
    expect(() =>
      assertRegistryIntegrity([
        incomplete as unknown as ProductIntelligenceRecord,
      ])
    ).toThrow(/must include its public brand and manufacturer/);
  });

  it("rejects private-label approval on a partner-sourced record", () => {
    const invalid: ProductIntelligenceRecord = {
      slug: "invalid-private-label",
      name: "Invalid",
      category: "Test",
      countryOfOrigin: "Ghana",
      supplyType: "partner_sourced",
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
    };
    expect(() => assertRegistryIntegrity([invalid])).toThrow(
      /Only manufactured records may be approved for private-label discovery/
    );
  });

  it("rejects a record marked published without approved_current_catalog display status", () => {
    const inconsistent = {
      ...validPublished,
      slug: "inconsistent",
      lifecycle: { state: "published" as const },
      approvals: {
        ...validPublished.approvals,
        publicDisplayStatus: "internal_approval_required" as const,
      },
    };
    expect(() => assertRegistryIntegrity([inconsistent])).toThrow(
      /marked published but lacks/
    );
  });

  it("rejects an archived record present in an active registry export", () => {
    const archived = {
      ...validPublished,
      slug: "archived-record",
      lifecycle: { state: "archived" as const },
    };
    expect(() => assertRegistryIntegrity([archived])).toThrow(/archived/);
  });

  it("rejects a non-published record claiming public-ready documentation", () => {
    const prematureDocs: ProductIntelligenceRecord = {
      slug: "premature-docs",
      name: "Premature",
      category: "Test",
      countryOfOrigin: "Ghana",
      supplyType: "partner_sourced",
      lifecycle: { state: "candidate" },
      approvals: {
        publicDisplayStatus: "internal_approval_required",
        sourceAlignment: "source_only_partner_selection",
        privateLabelEligibility: "not_eligible_by_default",
        imageStatus: "supplier_branded_blocked",
        documentationStatus: "public_ready",
        exportAvailable: false,
        wholesaleAvailable: false,
      },
    };
    expect(() => assertRegistryIntegrity([prematureDocs])).toThrow(
      /claims public-ready documentation or imagery/
    );
  });
});
