export type SupplyType = "manufactured" | "partner_sourced";

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

export const productTypeLabels: Record<SupplyType, string> = {
  manufactured: "Manufactured by BorgaFoods",
  partner_sourced: "BorgaFoods Export Selection",
};

export const productSupplyStatements: Record<SupplyType, string> = {
  manufactured: "Manufactured by BorgaFoods Processing",
  partner_sourced: "Selected from trusted Ghanaian production partners",
};

export const products = [
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
    variants: [
      "Fine milled",
      "For fufu preparation",
      "Custom blends available upon request",
    ],
  },
] as const satisfies readonly Product[];
