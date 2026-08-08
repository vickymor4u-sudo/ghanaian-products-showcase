import { describe, expect, it } from "vitest";
import {
  publishedProducts,
  privateLabelEligibleProducts,
} from "./publishedRegistry";

describe("publishedProducts", () => {
  it("contains exactly the 5 currently public products", () => {
    expect(publishedProducts.map(p => p.slug).sort()).toEqual(
      [
        "banku-borga",
        "cassava-flour",
        "fufu-borga",
        "gari-borga",
        "kokonte-borga",
      ].sort()
    );
  });
});

describe("privateLabelEligibleProducts", () => {
  it("contains exactly fufu-borga, matching the prior privateLabelDiscoveryProducts selector", () => {
    expect(privateLabelEligibleProducts.map(p => p.slug)).toEqual([
      "fufu-borga",
    ]);
  });

  it("is a strict subset of publishedProducts", () => {
    const publishedSlugs = new Set(publishedProducts.map(p => p.slug));
    for (const product of privateLabelEligibleProducts) {
      expect(publishedSlugs.has(product.slug)).toBe(true);
    }
  });

  it("contains only manufactured products", () => {
    for (const product of privateLabelEligibleProducts) {
      expect(product.supplyType).toBe("manufactured");
    }
  });
});
