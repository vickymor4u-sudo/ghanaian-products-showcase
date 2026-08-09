import { Link, useParams } from "wouter";
import { Card } from "@/components/ui/card";
import {
  Boxes,
  Building2,
  ChevronRight,
  PackageCheck,
  Store,
  Truck,
  UtensilsCrossed,
  Users,
} from "lucide-react";
import SEO from "@/components/SEO";
import SchemaMarkup from "@/components/SchemaMarkup";
import ExportQuoteButton from "@/components/ExportQuoteButton";
import NotFound from "@/pages/NotFound";
import {
  currentPublicCatalogueProducts,
  productSupplyStatements,
  productTypeLabels,
  type Product,
} from "@/data/products";
import {
  getProductPageUrl,
  productUrlToInternalSlug,
} from "@/data/productUrlSlugs";

// Reused verbatim from Wholesale.tsx's "Who We Support" section — the
// same 4 approved buyer personas, sitewide, not product-specific data,
// so it is accurate to repeat unchanged on every product page. See
// docs/PRODUCT_PAGE_OPTIMIZATION_REPORT.md.
const TARGET_BUYERS = [
  {
    icon: Building2,
    title: "Distributors",
    description:
      "Regional and specialist distributors building Ghanaian or African grocery ranges.",
  },
  {
    icon: Store,
    title: "Grocery retailers",
    description:
      "African grocery stores, supermarkets, and retail buyers planning repeat supply.",
  },
  {
    icon: Boxes,
    title: "Wholesalers",
    description:
      "Trade buyers evaluating retail packs, bulk formats, or mixed product requirements.",
  },
  {
    icon: UtensilsCrossed,
    title: "Restaurants & food service",
    description:
      "Professional kitchens and food-service suppliers seeking suitable product formats.",
  },
] as const;

function ProductFaq({ product }: { product: Product }) {
  const faqs = [
    {
      q: `Is ${product.name} available for export and wholesale?`,
      a: `${product.name} is currently ${product.exportAvailable ? "available for export" : "not available for export"} and ${product.wholesaleAvailable ? "available for wholesale" : "not available for wholesale"} enquiries.`,
    },
    {
      q: "What is the shelf life and how should it be stored?",
      a: `${product.shelfLife}. Recommended storage: ${product.storage.toLowerCase()}.`,
    },
    {
      q: `Where is ${product.name} manufactured?`,
      a:
        product.supplyType === "manufactured"
          ? `${product.name} is manufactured in ${product.countryOfOrigin} by ${product.manufacturer}.`
          : `${product.name} originates from ${product.countryOfOrigin}, ${productSupplyStatements[product.supplyType]}.`,
    },
    {
      q: "How do I request a quote or more information?",
      a: "Use the enquiry form and include your business type, destination market, packaging preferences, and estimated order volume — we'll review and follow up with next steps.",
    },
    {
      q: "What is the shipping method and lead time?",
      a: "Shipping method and estimated lead time are confirmed per enquiry, based on your destination and order volume — contact us for current details.",
    },
  ];

  return (
    <div className="space-y-6">
      {faqs.map(faq => (
        <div key={faq.q} className="border-b border-border pb-6 last:border-b-0">
          <h3 className="text-lg font-bold text-foreground mb-2">{faq.q}</h3>
          <p className="text-foreground leading-relaxed">{faq.a}</p>
        </div>
      ))}
    </div>
  );
}

/**
 * Dedicated SEO landing page per published product, at /products/:urlSlug
 * (see productUrlSlugs.ts for the URL-to-BPIP-slug mapping — BPIP's
 * internal slugs are never renamed). Content is limited to what's already
 * approved and rendered elsewhere on the site: product identity,
 * description, variants, packaging/capability fields sourced directly
 * from BPIP, and the same buyer-persona/FAQ wording already used on
 * /wholesale and /export. Deliberately does NOT add MOQ, certifications
 * beyond the existing approved field, lead times, or shipping promises —
 * see docs/PRODUCT_PAGE_OPTIMIZATION_REPORT.md and
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

  const otherProducts = currentPublicCatalogueProducts.filter(
    p => p.slug !== product.slug && getProductPageUrl(p.slug)
  );

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={`${product.name} | Ghana Wholesale & Export | BorgaFoods`}
        description={`${product.summary}. Wholesale and export enquiries welcome from distributors, retailers, and food-service buyers.`}
        keywords={`${product.name}, ${product.category}, Ghana food export, BorgaFoods ${product.name}, ${product.name} wholesale`}
      />
      <SchemaMarkup type="product" data={product} />
      <SchemaMarkup
        type="breadcrumb"
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Products", path: "/products" },
          { name: product.name, path: `/products/${urlSlug}` },
        ]}
      />

      <nav
        aria-label="Breadcrumb"
        className="container pt-6 text-sm text-muted-foreground"
      >
        <ol className="flex items-center flex-wrap gap-1">
          <li>
            <Link href="/" className="hover:text-primary">
              Home
            </Link>
          </li>
          <ChevronRight size={14} className="flex-shrink-0" />
          <li>
            <Link href="/products" className="hover:text-primary">
              Products
            </Link>
          </li>
          <ChevronRight size={14} className="flex-shrink-0" />
          <li className="text-foreground font-medium" aria-current="page">
            {product.name}
          </li>
        </ol>
      </nav>

      <section className="py-12 bg-gradient-to-br from-primary/5 to-background border-b border-border mt-6">
        <div className="container">
          <div className="flex items-center gap-2 mb-4">
            <PackageCheck size={24} className="text-primary" />
            <span className="text-sm font-bold text-primary">
              {productTypeLabels[product.supplyType]}
            </span>
          </div>
          <h1 className="text-5xl font-bold text-foreground mb-5">
            {product.name}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed mb-8">
            {product.summary}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <ExportQuoteButton
              productSlug={product.slug}
              label={`Request Quote for ${product.name}`}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            />
            <ExportQuoteButton
              inquiryType="wholesale"
              label="Request Wholesale Supply"
              variant="outline"
              showArrow={false}
              className="border-primary text-primary hover:bg-primary/5"
            />
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container max-w-3xl">
          <h2 className="text-3xl font-bold text-foreground mb-5">
            What Is {product.name}?
          </h2>
          <p className="text-lg text-foreground leading-relaxed mb-8">
            {product.description}
          </p>
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
      </section>

      <section className="py-16 bg-secondary/5">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <div className="group relative aspect-[4/5] max-w-sm mx-auto lg:mx-0 flex items-center justify-center overflow-hidden rounded-xl border border-border/60 bg-gradient-to-br from-secondary/15 via-background to-secondary/5 p-8 shadow-sm">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  loading="eager"
                  decoding="async"
                  className="h-full w-full object-contain"
                />
              </div>
            </div>

            <div>
              <Card className="p-8 mb-8">
                <div className="flex items-center gap-3 mb-6">
                  <Boxes size={22} className="text-primary flex-shrink-0" />
                  <h2 className="text-lg font-bold text-foreground">
                    Export Packaging Options
                  </h2>
                </div>
                <div className="space-y-4">
                  <div className="border-b border-border pb-4">
                    <p className="text-sm font-semibold text-muted-foreground mb-1">
                      Standard Retail Sizes
                    </p>
                    <p className="text-foreground font-medium">
                      {product.packagingSizes.join(", ")}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-muted-foreground mb-1">
                      Bulk Options
                    </p>
                    <p className="text-foreground font-medium">
                      {product.bulkPackagingSizes.join(", ")}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-6">
                  Additional packaging and volume requirements can be
                  reviewed as part of an export quotation.
                </p>
              </Card>

              <Card className="p-8">
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
        </div>
      </section>

      <section className="py-16">
        <div className="container">
          <div className="flex items-center gap-3 mb-10">
            <Users size={26} className="text-primary" />
            <h2 className="text-3xl font-bold text-foreground">
              Who {product.name} Is For
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TARGET_BUYERS.map(buyer => {
              const Icon = buyer.icon;
              return (
                <Card key={buyer.title} className="p-6">
                  <Icon size={28} className="text-primary mb-4" />
                  <h3 className="text-lg font-bold text-foreground mb-2">
                    {buyer.title}
                  </h3>
                  <p className="text-sm text-foreground leading-relaxed">
                    {buyer.description}
                  </p>
                </Card>
              );
            })}
          </div>
          <p className="text-sm text-muted-foreground mt-6">
            See our{" "}
            <Link href="/wholesale" className="text-primary hover:underline">
              wholesale &amp; distribution
            </Link>{" "}
            page for more on how we support each buyer type.
          </p>
        </div>
      </section>

      <section className="py-16 bg-secondary/5">
        <div className="container max-w-3xl">
          <Card className="p-8 border-dashed">
            <div className="flex items-center gap-3 mb-3">
              <Truck size={22} className="text-primary flex-shrink-0" />
              <h2 className="text-lg font-bold text-foreground">
                Shipping & Lead Time
              </h2>
            </div>
            <p className="text-foreground leading-relaxed mb-3">
              Shipping method and estimated lead time for this product are
              confirmed per enquiry — contact us for current details for
              your destination and order volume.
            </p>
            <Link
              href="/export"
              className="text-sm font-semibold text-primary hover:underline"
            >
              Learn how we coordinate export & compliance requirements →
            </Link>
          </Card>
        </div>
      </section>

      <section className="py-16">
        <div className="container max-w-3xl">
          <h2 className="text-3xl font-bold text-foreground mb-10">
            Common Questions
          </h2>
          <ProductFaq product={product} />
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

      {otherProducts.length > 0 && (
        <section className="py-16 bg-secondary/5">
          <div className="container">
            <h2 className="text-2xl font-bold text-foreground mb-8">
              Other BorgaFoods Products
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {otherProducts.map(other => (
                <Link
                  key={other.slug}
                  href={getProductPageUrl(other.slug)!}
                  className="block"
                >
                  <Card className="p-5 h-full hover:shadow-md hover:-translate-y-0.5 transition-all">
                    <p className="font-bold text-foreground mb-1">
                      {other.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {other.summary}
                    </p>
                  </Card>
                </Link>
              ))}
            </div>
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
