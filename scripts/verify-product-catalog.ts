import { constants } from "node:fs";
import { access } from "node:fs/promises";
import { resolve } from "node:path";
import {
  assertProductCatalogIntegrity,
  currentPublicCatalogueProducts,
  phase4ExpansionProducts,
  products,
} from "../client/src/data/products";

async function verifyProductCatalog() {
  assertProductCatalogIntegrity(products);

  if (
    phase4ExpansionProducts.some(
      product => product.sourceAlignment === "needs_validation"
    )
  ) {
    throw new Error(
      "Phase 4 expansion includes a product with an unresolved validation gate."
    );
  }

  for (const product of products) {
    if (
      product.supplyType === "partner_sourced" &&
      (Object.hasOwn(product, "brand") ||
        Object.hasOwn(product, "manufacturer"))
    ) {
      throw new Error(
        `Partner-sourced product ${product.slug} exposes a public brand or manufacturer.`
      );
    }

    for (const image of product.images) {
      if (!image.startsWith("/images/")) {
        throw new Error(
          `Product ${product.slug} has an invalid public image path.`
        );
      }

      await access(resolve("client/public", `.${image}`), constants.R_OK);
    }
  }

  console.info(
    `Verified ${products.length} catalog records, ${currentPublicCatalogueProducts.length} current public records, and ${phase4ExpansionProducts.length} Phase 4 expansion-eligible records.`
  );
}

verifyProductCatalog().catch(error => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
