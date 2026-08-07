import { describe, expect, it } from "vitest";
import {
  assertProductCatalogIntegrity,
  currentPublicCatalogueProducts,
  phase4ExpansionProducts,
  products,
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
});
