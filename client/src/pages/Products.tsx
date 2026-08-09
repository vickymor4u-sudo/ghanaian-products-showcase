import { useMemo, useState } from "react";
import { Link } from "wouter";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star } from "lucide-react";
import SEO from "@/components/SEO";
import SchemaMarkup from "@/components/SchemaMarkup";
import ExportQuoteButton from "@/components/ExportQuoteButton";
import {
  currentPublicCatalogueProducts,
  productSupplyStatements,
  productTypeLabels,
} from "@/data/products";
import { getProductPageUrl } from "@/data/productUrlSlugs";

export default function Products() {
  const productNames = currentPublicCatalogueProducts
    .map(product => product.name)
    .join(", ");

  const categories = useMemo(
    () =>
      Array.from(
        new Set(currentPublicCatalogueProducts.map(product => product.category))
      ),
    []
  );
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const visibleProducts =
    selectedCategory === "all"
      ? currentPublicCatalogueProducts
      : currentPublicCatalogueProducts.filter(
          product => product.category === selectedCategory
        );

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="BorgaFoods Products - Premium Ghanaian Staple Foods | borgafoods.com"
        description={`Explore BorgaFoods ${productNames} for wholesale and export enquiries from international distributors, retailers, and food-service buyers.`}
        keywords={`${productNames}, Ghana fufu export, cassava flour wholesale, plantain flour, fermented corn flour`}
      />
      <section className="py-16 bg-gradient-to-br from-primary/5 to-background border-b border-border">
        <div className="container">
          <div className="flex items-center gap-3 mb-4">
            <Star size={32} className="text-primary fill-primary" />
            <h1 className="text-5xl font-bold text-foreground">
              The BorgaFoods Product Line
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Our catalogue distinguishes BorgaFoods-manufactured products from
            approved export selections. Packaging, wholesale, and export
            requirements are reviewed for each buyer enquiry.
          </p>
        </div>
      </section>

      <section className="py-16 bg-primary/5">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Manufactured Range",
                description:
                  "BorgaFoods-manufactured products are clearly identified as made by BorgaFoods Processing.",
              },
              {
                title: "Retail & Bulk Formats",
                description:
                  "Available retail and bulk packaging options are listed with each product for buyer review.",
              },
              {
                title: "Wholesale & Export Enquiries",
                description:
                  "Product, packaging, volume, destination, and shipment needs are confirmed during quotation.",
              },
            ].map((item, index) => (
              <Card key={index} className="p-6 border-primary/20">
                <h3 className="text-lg font-bold text-foreground mb-3">
                  {item.title}
                </h3>
                <p className="text-foreground">{item.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container">
          <h2 className="text-4xl font-bold text-foreground mb-6">
            Our Product Catalogue
          </h2>
          <div
            className="flex flex-wrap gap-3 mb-16"
            role="group"
            aria-label="Filter products by category"
          >
            <Button
              size="sm"
              variant={selectedCategory === "all" ? "default" : "outline"}
              onClick={() => setSelectedCategory("all")}
              className={
                selectedCategory === "all"
                  ? "bg-primary text-primary-foreground"
                  : "border-primary/30 text-foreground"
              }
            >
              All Products
            </Button>
            {categories.map(category => (
              <Button
                key={category}
                size="sm"
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={
                  selectedCategory === category
                    ? "bg-primary text-primary-foreground"
                    : "border-primary/30 text-foreground"
                }
              >
                {category}
              </Button>
            ))}
          </div>
          <div className="space-y-20">
            {visibleProducts.map((product, index) => (
              <div
                key={product.name}
                className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start"
              >
                <SchemaMarkup type="product" data={product} />
                <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                  <div className="flex items-center gap-2 mb-2">
                    <Star size={20} className="text-primary fill-primary" />
                    <span className="text-sm font-bold text-primary">
                      {productTypeLabels[product.supplyType]}
                    </span>
                  </div>
                  <h2 className="text-4xl font-bold text-foreground mb-4">
                    {product.name}
                  </h2>
                  <p className="text-lg text-foreground mb-4 leading-relaxed">
                    {product.description}
                  </p>
                  {getProductPageUrl(product.slug) && (
                    <Link
                      href={getProductPageUrl(product.slug)!}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline mb-8"
                    >
                      View full {product.name} page
                      <ArrowRight size={14} />
                    </Link>
                  )}

                  <div className="mb-8">
                    <h3 className="text-lg font-bold text-foreground mb-4">
                      Available Variants
                    </h3>
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

                  <ExportQuoteButton
                    size="default"
                    productSlug={product.slug}
                    label={`Request Quote for ${product.name}`}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground"
                  />
                </div>

                <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                  <div className="group relative aspect-[4/5] max-w-sm mx-auto mb-8 flex items-center justify-center overflow-hidden rounded-xl border border-border/60 bg-gradient-to-br from-secondary/15 via-background to-secondary/5 p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      loading={index === 0 ? "eager" : "lazy"}
                      decoding="async"
                      className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>

                  <Card className="p-8">
                    <h3 className="text-lg font-bold text-foreground mb-6">
                      Product Details
                    </h3>
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
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-secondary/5">
        <div className="container">
          <h2 className="text-4xl font-bold text-foreground mb-12">
            Flexible Packaging & Sizing
          </h2>
          <p className="text-lg text-foreground mb-12 max-w-3xl">
            Standard retail and bulk formats are listed with each product.
            Additional packaging and volume requirements can be reviewed as part
            of an export quotation.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <Card className="p-8">
              <h3 className="text-2xl font-bold text-foreground mb-6">
                Packaging Requirements Review
              </h3>
              <ul className="space-y-4">
                {[
                  "Requested net weight and pack format",
                  "Packaging material preferences",
                  "Carton and case configuration",
                  "Label-language requirements",
                  "Destination-market information",
                  "Availability confirmed during quotation",
                ].map(item => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-foreground"
                  >
                    <span className="text-primary font-bold">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Card>

            <Card className="p-8">
              <h3 className="text-2xl font-bold text-foreground mb-6">
                Order Quantity Flexibility
              </h3>
              <ul className="space-y-4">
                {[
                  "Estimated initial order volume",
                  "Market-testing requirements",
                  "Wholesale and bulk demand",
                  "Storage and distribution context",
                  "Container and shipment planning",
                  "Commercial terms confirmed in quotation",
                ].map(item => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-foreground"
                  >
                    <span className="text-primary font-bold">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>

          <Card className="p-8 bg-primary/5 border-primary">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              How It Works
            </h3>
            <p className="text-lg text-foreground mb-6">
              When you contact us with your requirements, we discuss:
            </p>
            <ol className="space-y-3 text-foreground">
              <li className="flex items-start gap-3">
                <span className="font-bold text-primary">1.</span>
                <span>Your target market and customer preferences</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-bold text-primary">2.</span>
                <span>Desired packaging size and format</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-bold text-primary">3.</span>
                <span>Initial order quantity and growth projections</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-bold text-primary">4.</span>
                <span>Labeling, compliance, and regulatory needs</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-bold text-primary">5.</span>
                <span>We provide a customized quote and timeline</span>
              </li>
            </ol>
          </Card>
        </div>
      </section>

      <section className="py-20">
        <div className="container">
          <h2 className="text-4xl font-bold text-foreground mb-12">
            BorgaFoods Quality Standards
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-8">
              <h3 className="text-xl font-bold text-primary mb-4">
                One Brand, One Standard
              </h3>
              <p className="text-foreground">
                BorgaFoods-manufactured products are identified as BorgaFoods
                brand and manufactured by BorgaFoods Processing. Approved export
                selections remain visibly distinct.
              </p>
            </Card>

            <Card className="p-8">
              <h3 className="text-xl font-bold text-primary mb-4">
                Requirements Review
              </h3>
              <p className="text-foreground">
                Documentation and destination-market requirements are reviewed
                for each product and buyer enquiry before quotation.
              </p>
            </Card>

            <Card className="p-8">
              <h3 className="text-xl font-bold text-primary mb-4">
                Shelf Stability
              </h3>
              <p className="text-foreground">
                Product-specific shelf-life and storage information is presented
                with each item for wholesale and export planning.
              </p>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4 text-white">
            Ready to Partner with BorgaFoods?
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto text-white/90">
            Contact us to discuss your packaging requirements, order quantities,
            and market needs.
          </p>
          <ExportQuoteButton className="bg-primary-foreground hover:bg-primary-foreground/90 text-primary" />
        </div>
      </section>
    </div>
  );
}
