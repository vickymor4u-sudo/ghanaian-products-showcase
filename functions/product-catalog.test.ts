import { describe, expect, it } from "vitest";
import {
  assertProductCatalogIntegrity,
  currentPublicCatalogueProducts,
  phase4ExpansionProducts,
  privateLabelDiscoveryProducts,
  products,
  rfqEligibleProducts,
  type Product,
} from "../client/src/data/products";

describe("product catalog capability controls", () => {
  it("keeps Fufu Flour in the existing catalog but excludes it from Phase 4 expansion", () => {
    expect(
      currentPublicCatalogueProducts.some(
        product => product.slug === "fufu-borga"
      )
    ).toBe(true);
    expect(
      phase4ExpansionProducts.some(product => product.slug === "fufu-borga")
    ).toBe(false);
    expect(
      rfqEligibleProducts.some(product => product.slug === "fufu-borga")
    ).toBe(true);
  });

  it("keeps Red Palm Oil out of the public catalog and RFQ selector", () => {
    expect(
      currentPublicCatalogueProducts.some(product =>
        /red palm oil/i.test(product.name)
      )
    ).toBe(false);
    expect(
      rfqEligibleProducts.some(product => /red palm oil/i.test(product.name))
    ).toBe(false);
  });

  it("allows private-label discovery only for the approved Fufu Borga record", () => {
    expect(privateLabelDiscoveryProducts.map(product => product.slug)).toEqual([
      "fufu-borga",
    ]);
    expect(
      privateLabelDiscoveryProducts.every(
        product => product.supplyType === "manufactured"
      )
    ).toBe(true);
  });

  it("does not expose brand or manufacturer fields for partner-sourced products", () => {
    for (const product of products) {
      if (product.supplyType === "partner_sourced") {
        expect(Object.hasOwn(product, "brand")).toBe(false);
        expect(Object.hasOwn(product, "manufacturer")).toBe(false);
      }
    }
  });

  it("fails catalog validation when a partner-sourced record exposes a brand or manufacturer", () => {
    const invalidPartner = {
      ...products[0],
      slug: "invalid-partner",
      supplyType: "partner_sourced",
      brand: "Confidential supplier brand",
    } as unknown as Product;

    expect(() => assertProductCatalogIntegrity([invalidPartner])).toThrow(
      /must not expose a public brand or manufacturer/
    );
  });

  it("fails catalog validation when a partner-sourced record is approved for private-label discovery", () => {
    const invalidPartner = {
      ...products[0],
      slug: "invalid-private-label-partner",
      supplyType: "partner_sourced",
      privateLabelDiscoveryApproved: true,
    } as unknown as Product;
    delete (invalidPartner as unknown as Record<string, unknown>).brand;
    delete (invalidPartner as unknown as Record<string, unknown>).manufacturer;

    expect(() => assertProductCatalogIntegrity([invalidPartner])).toThrow(
      /Only manufactured products may be approved for private-label discovery/
    );
  });
});
