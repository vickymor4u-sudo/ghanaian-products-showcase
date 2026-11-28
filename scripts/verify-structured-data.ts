import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { publicManufacturedProducts } from "../client/src/data/products";
import { getProductPageUrl } from "../client/src/data/productUrlSlugs";

function readSchemas(snapshot: string): Array<Record<string, unknown>> {
  const html = readFileSync(resolve("dist/public/_prerender", snapshot), "utf8");
  return [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>(.*?)<\/script>/g)].map(
    match => JSON.parse(match[1]) as Record<string, unknown>
  );
}

const homeTypes = new Set(readSchemas("home.txt").map(schema => schema["@type"]));
for (const required of ["Organization", "WebSite"]) {
  if (!homeTypes.has(required)) {
    throw new Error(`Homepage is missing ${required} structured data.`);
  }
}

for (const product of publicManufacturedProducts) {
  const route = getProductPageUrl(product.slug);
  if (!route) throw new Error(`Missing public route for ${product.slug}.`);
  const schemas = readSchemas(`${route.slice(1)}.txt`);
  const productSchema = schemas.find(schema => schema["@type"] === "Product");
  if (!productSchema) throw new Error(`${route} is missing Product structured data.`);
  if (productSchema.name !== product.name) {
    throw new Error(`${route} structured product name does not match the registry.`);
  }
  if (productSchema.url !== `https://www.borgafoods.com${route}`) {
    throw new Error(`${route} structured product URL is not canonical.`);
  }
  const images = productSchema.image;
  if (!Array.isArray(images) || images.length !== product.images.length) {
    throw new Error(`${route} structured product images do not match the registry.`);
  }
  const types = new Set(schemas.map(schema => schema["@type"]));
  for (const required of ["FAQPage", "BreadcrumbList"]) {
    if (!types.has(required)) {
      throw new Error(`${route} is missing ${required} structured data.`);
    }
  }
}

console.info(
  `Verified prerendered Organization, WebSite and ${publicManufacturedProducts.length} Product schema records.`
);
