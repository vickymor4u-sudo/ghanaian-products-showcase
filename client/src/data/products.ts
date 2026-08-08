/**
 * Public product catalog — thin, behavior-preserving adapter over the
 * BorgaFoods Product Intelligence Platform (BPIP) registry
 * (`shared/productIntelligence`).
 *
 * The website is a consumer of BPIP, not the owner of product data: this
 * file no longer defines product records inline. It maps
 * `publishedProducts` (BPIP's richer, workflow-aware shape) into the flat
 * `Product` shape every page/component in this app already expects, so no
 * consuming file needed to change. See `docs/PRODUCT_INTELLIGENCE_PLATFORM.md`.
 */
// Deliberately NOT importing from "@shared/productIntelligence" (the full
// barrel) — that would pull internal-only candidate records into this
// client-bundled file. Import only the client-safe published registry and
// types directly. See the module-boundary comment in
// shared/productIntelligence/publishedRegistry.ts.
import { publishedProducts } from "@shared/productIntelligence/publishedRegistry";
import {
  productTypeLabels as sharedProductTypeLabels,
  productSupplyStatements as sharedProductSupplyStatements,
  type PublishedProductRecord,
  type SupplyType,
  type PublicDisplayStatus,
  type SourceAlignment,
} from "@shared/productIntelligence/types";

export type { SupplyType, PublicDisplayStatus, SourceAlignment };

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
  /**
   * Public-safe, product-level approval for a manual private-label discovery
   * discussion. Absence means the product is not selectable for that flow.
   */
  privateLabelDiscoveryApproved?: true;
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

export const productTypeLabels = sharedProductTypeLabels;
export const productSupplyStatements = sharedProductSupplyStatements;

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

    if (
      product.privateLabelDiscoveryApproved &&
      product.supplyType !== "manufactured"
    ) {
      throw new Error(
        `Only manufactured products may be approved for private-label discovery: ${product.slug}`
      );
    }
  }
}

function toPublicProduct(record: PublishedProductRecord): Product {
  const base = {
    slug: record.slug,
    name: record.name,
    category: record.category,
    description: record.description,
    summary: record.summary,
    countryOfOrigin: record.countryOfOrigin,
    packagingSizes: record.packagingSizes,
    bulkPackagingSizes: record.bulkPackagingSizes,
    shelfLife: record.shelfLife,
    storage: record.storage,
    certification: record.certification,
    exportAvailable: record.approvals.exportAvailable,
    images: record.images,
    wholesaleAvailable: record.approvals.wholesaleAvailable,
    variants: record.variants,
    publicDisplayStatus: record.approvals.publicDisplayStatus,
    sourceAlignment: record.approvals.sourceAlignment,
    ...(record.approvals.privateLabelEligibility === "approved_for_discovery"
      ? { privateLabelDiscoveryApproved: true as const }
      : {}),
  };

  return record.supplyType === "manufactured"
    ? {
        ...base,
        supplyType: "manufactured",
        brand: record.brand,
        manufacturer: record.manufacturer,
      }
    : {
        ...base,
        supplyType: "partner_sourced",
      };
}

export const products: readonly Product[] =
  publishedProducts.map(toPublicProduct);

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

export const privateLabelDiscoveryProducts =
  currentPublicCatalogueProducts.filter(
    product =>
      product.supplyType === "manufactured" &&
      product.privateLabelDiscoveryApproved === true
  );

// Existing RFQ behavior remains unchanged; private-label discovery has its own
// narrower, product-level selector above.
export const rfqEligibleProducts = currentPublicCatalogueProducts;
