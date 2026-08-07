export type SupplyType = "manufactured" | "partner_sourced";
export type PublicDisplayStatus =
  | "approved_current_catalog"
  | "internal_approval_required";
export type SourceAlignment =
  | "aligned"
  | "needs_validation"
  | "canonical_catalog_only"
  | "source_only_partner_selection";

interface ProductBase {
  slug: string;
  name: string;
  category: string;
  description: string;
  summary: string;
  countryOfOrigin: string;
  packagingSizes: readonly string[];
  bulkPackagingSizes: readonly string[];
  shelfLife: string;
  storage: string;
  certification: string;
  exportAvailable: boolean;
  images: readonly string[];
  wholesaleAvailable: boolean;
  variants: readonly string[];
  publicDisplayStatus: PublicDisplayStatus;
  sourceAlignment: SourceAlignment;
}

export interface ManufacturedProduct extends ProductBase {
  supplyType: "manufactured";
  brand: string;
  manufacturer: string;
}

export interface PartnerSourcedProduct extends ProductBase {
  supplyType: "partner_sourced";
  brand?: never;
  manufacturer?: never;
}

export type Product = ManufacturedProduct | PartnerSourcedProduct;

type CatalogIntegrityProduct = Product & Record<string, unknown>;

export const productTypeLabels: Record<SupplyType, string> = {
  manufactured: "Manufactured by BorgaFoods",
  partner_sourced: "BorgaFoods Export Selection",
};

export const productSupplyStatements: Record<SupplyType, string> = {
  manufactured: "Manufactured by BorgaFoods Processing",
  partner_sourced: "Selected from trusted Ghanaian production partners",
};

const hasOwnProperty = (value: object, property: string) =>
  Object.prototype.hasOwnProperty.call(value, property);

export function assertProductCatalogIntegrity(
  catalog: readonly Product[]
): void {
  const slugs = new Set<string>();

  for (const product of catalog) {
    const record = product as CatalogIntegrityProduct;
    const rawRecord = product as unknown as Record<string, unknown>;

    if (!product.slug || slugs.has(product.slug)) {
      throw new Error(
        `Product catalog contains an invalid or duplicate slug: ${product.slug}`
      );
    }
    slugs.add(product.slug);

    if (
      rawRecord.supplyType !== "manufactured" &&
      rawRecord.supplyType !== "partner_sourced"
    ) {
      throw new Error(`Product ${product.slug} is missing a supply type.`);
    }

    if (
      product.supplyType === "partner_sourced" &&
      (hasOwnProperty(record, "brand") ||
        hasOwnProperty(record, "manufacturer"))
    ) {
      throw new Error(
        `Partner-sourced product ${product.slug} must not expose a public brand or manufacturer.`
      );
    }

    if (
      product.supplyType === "manufactured" &&
      (!product.brand || !product.manufacturer)
    ) {
      throw new Error(
        `Manufactured product ${product.slug} must include its public brand and manufacturer.`
      );
    }

    if (!product.publicDisplayStatus || !product.sourceAlignment) {
      throw new Error(
        `Product ${product.slug} is missing capability-model visibility data.`
      );
    }
  }
}

export const products: readonly Product[] = [
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
    exportAvailable: true,
    images: ["/images/fufu-borga.png", "/images/fufu-product.png"],
    wholesaleAvailable: true,
    publicDisplayStatus: "approved_current_catalog",
    sourceAlignment: "needs_validation",
    variants: [
      "Plantain-based fufu flour",
      "Cassava-plantain blends",
      "Custom blends available upon request",
    ],
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
    exportAvailable: true,
    images: ["/images/gari-borga.png"],
    wholesaleAvailable: true,
    publicDisplayStatus: "approved_current_catalog",
    sourceAlignment: "aligned",
    variants: ["Fine grain", "Medium grain", "Coarse grain"],
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
    exportAvailable: true,
    images: ["/images/kokonte-borga.png"],
    wholesaleAvailable: true,
    publicDisplayStatus: "approved_current_catalog",
    sourceAlignment: "canonical_catalog_only",
    variants: [
      "Standard mix",
      "High plantain blend",
      "Custom blends available",
    ],
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
    exportAvailable: true,
    images: ["/images/banku-borga.png", "/images/banku-product.png"],
    wholesaleAvailable: true,
    publicDisplayStatus: "approved_current_catalog",
    sourceAlignment: "canonical_catalog_only",
    variants: ["Standard mix", "High corn blend", "High cassava blend"],
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
    exportAvailable: true,
    images: ["/images/cassava-flour.png"],
    wholesaleAvailable: true,
    publicDisplayStatus: "approved_current_catalog",
    sourceAlignment: "aligned",
    variants: [
      "Fine milled",
      "For fufu preparation",
      "Custom blends available upon request",
    ],
  },
] as const satisfies readonly Product[];

assertProductCatalogIntegrity(products);

export const currentPublicCatalogueProducts = products.filter(
  product => product.publicDisplayStatus === "approved_current_catalog"
);

export const publicManufacturedProducts = currentPublicCatalogueProducts.filter(
  product => product.supplyType === "manufactured"
);

export const publicPartnerSourcedProducts =
  currentPublicCatalogueProducts.filter(
    product => product.supplyType === "partner_sourced"
  );

export const phase4ExpansionProducts = currentPublicCatalogueProducts.filter(
  product => product.sourceAlignment !== "needs_validation"
);

// The existing Fufu Flour RFQ path remains unchanged until PCR-001 is resolved.
export const rfqEligibleProducts = currentPublicCatalogueProducts;
