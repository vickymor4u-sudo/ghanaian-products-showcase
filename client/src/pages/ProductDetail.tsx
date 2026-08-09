import { useParams } from "wouter";
import { Card } from "@/components/ui/card";
import { Star, Truck } from "lucide-react";
import SEO from "@/components/SEO";
import SchemaMarkup from "@/components/SchemaMarkup";
import ExportQuoteButton from "@/components/ExportQuoteButton";
import NotFound from "@/pages/NotFound";
import {
  currentPublicCatalogueProducts,
  productSupplyStatements,
  productTypeLabels,
} from "@/data/products";
import { productUrlToInternalSlug } from "@/data/productUrlSlugs";

/**
 * Dedicated SEO landing page per published product, at /products/:urlSlug
 * (see productUrlSlugs.ts for the URL-to-BPIP-slug mapping — BPIP's
 * internal slugs are never renamed). Content is limited to what's already
 * approved and rendered on /products today: product identity, description,
 * variants, and packaging/capability fields sourced directly from BPIP.
 * Deliberately does NOT add MOQ, certifications beyond the existing
 * approved field, lead times, or shipping promises — see
 * docs/CONTENT_ARCHITECTURE_IMPLEMENTATION_PLAN.md and
 * docs/PUBLIC_CLAIM_VERIFICATION_AUDIT.md. The private-label section only
 * renders for the one product BPIP records as
 * privateLabelDiscoveryApproved (fufu-borga) — see BUSINESS_RULES.md
 * "Private-label discovery rules."
 */
export default function ProductDetail() {
  const { urlSlug } = useParams<{ urlSlug: string }>();
  const internalSlug = urlSlug ? productUrlToInternalSlug[urlSlug] : undefined;
  const product = internalSlug
    ? currentPublicCatalogueProducts.find(p => p.slug === internalSlug)
    : undefined;

  if (!product) {
    return <NotFound />;
  }

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={`${product.name} | Wholesale & Export | BorgaFoods`}
        description={`${product.description} Wholesale and export enquiries welcome from distributors, retailers, and food-service buyers.`}
        keywords={`${product.name}, ${product.category}, Ghana food export, BorgaFoods ${product.name}, ${product.name} wholesale`}
      />
      <SchemaMarkup type="product" data={product} />

      <section className="py-16 bg-gradient-to-br from-primary/5 to-background border-b border-border">
        <div className="container">
          <div className="flex items-center gap-2 mb-4">
            <Star size={24} className="text-primary fill-primary" />
            <span className="text-sm font-bold text-primary">
              {productTypeLabels[product.supplyType]}
            </span>
          </div>
          <h1 className="text-5xl font-bold text-foreground mb-5">
            {product.name}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed mb-8">
            {product.description}
          </p>
          <ExportQuoteButton
            productSlug={product.slug}
            label={`Request Quote for ${product.name}`}
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
          />
        </div>
      </section>

      <section className="py-20">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <div className="group relative aspect-[4/5] max-w-sm mx-auto lg:mx-0 mb-8 flex items-center justify-center overflow-hidden rounded-xl border border-border/60 bg-gradient-to-br from-secondary/15 via-background to-secondary/5 p-8 shadow-sm">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  loading="eager"
                  decoding="async"
                  className="h-full w-full object-contain"
                />
              </div>

              <h2 className="text-lg font-bold text-foreground mb-4">
                Available Variants
              </h2>
              <ul className="space-y-2">
                {product.variants.map(variant => (
                  <li
                    key={variant}
                    className="flex items-start gap-3 text-foreground"
                  >
                    <span className="text-primary font-bold mt-1">•</span>
                    <span>{variant}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <Card className="p-8 mb-8">
                <h2 className="text-lg font-bold text-foreground mb-6">
                  Product Details
                </h2>
                <div className="space-y-4">
                  {Object.entries({
                    ...(product.supplyType === "manufactured"
                      ? {
                          Brand: product.brand,
                          Manufacturer: product.manufacturer,
                        }
                      : {}),
                    Category: product.category,
                    "Product Type": productTypeLabels[product.supplyType],
                    "Supply Statement":
                      productSupplyStatements[product.supplyType],
                    "Standard Retail Sizes":
                      product.packagingSizes.join(", "),
                    "Bulk Options": product.bulkPackagingSizes.join(", "),
                    "Shelf Life": product.shelfLife,
                    Storage: product.storage,
                    Certification: product.certification,
                    Origin: product.countryOfOrigin,
                    "Export Availability": product.exportAvailable
                      ? "Available"
                      : "Not available",
                    "Wholesale Availability": product.wholesaleAvailable
                      ? "Available"
                      : "Not available",
                  }).map(([key, value]) => (
                    <div
                      key={key}
                      className="border-b border-border pb-4 last:border-b-0"
                    >
                      <p className="text-sm font-semibold text-muted-foreground mb-1">
                        {key}
                      </p>
                      <p className="text-foreground font-medium">{value}</p>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-8 border-dashed">
                <div className="flex items-center gap-3 mb-3">
                  <Truck size={22} className="text-primary flex-shrink-0" />
                  <h2 className="text-lg font-bold text-foreground">
                    Shipping & Lead Time
                  </h2>
                </div>
                <p className="text-foreground leading-relaxed">
                  Shipping method and estimated lead time for this product
                  are confirmed per enquiry — contact us for current
                  details for your destination and order volume.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {product.privateLabelDiscoveryApproved && (
        <section className="py-20 bg-secondary/5">
          <div className="container">
            <Card className="max-w-4xl mx-auto p-8 md:p-10 border-primary/30">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary mb-4">
                Private-label Discovery
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-5">
                Discuss Selected Product Opportunities
              </h2>
              <p className="text-lg text-foreground leading-relaxed mb-6">
                BorgaFoods supports private-label discussions for selected
                products. Private-label opportunities are reviewed
                individually based on product specifications, packaging
                requirements, order volume, and production feasibility.
              </p>
              <p className="text-foreground leading-relaxed mb-8">
                Each enquiry is reviewed manually. Packaging,
                specifications, production feasibility, regulatory
                requirements, and commercial terms are confirmed before
                any acceptance; submitting an enquiry does not create a
                customer commitment.
              </p>
              <ExportQuoteButton
                inquiryType="private_label"
                label="Start Private-label Discussion"
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              />
            </Card>
          </div>
        </section>
      )}

      <section className="py-16 bg-primary">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4 text-white">
            Ready to Discuss {product.name}?
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto text-white/90">
            Share your destination, packaging preferences, and estimated
            order volume to begin an export quotation enquiry.
          </p>
          <ExportQuoteButton
            productSlug={product.slug}
            label={`Request Quote for ${product.name}`}
            className="bg-primary-foreground hover:bg-primary-foreground/90 text-primary"
          />
        </div>
      </section>
    </div>
  );
}
