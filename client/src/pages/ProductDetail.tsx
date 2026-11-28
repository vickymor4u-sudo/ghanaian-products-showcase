import { Link, useParams } from "wouter";
import { ArrowRight, ChevronRight, PackageCheck } from "lucide-react";
import CatalogueRequestButton from "@/components/CatalogueRequestButton";
import ExportQuoteButton from "@/components/ExportQuoteButton";
import SchemaMarkup from "@/components/SchemaMarkup";
import SEO from "@/components/SEO";
import NotFound from "@/pages/NotFound";
import { SITE_ORIGIN } from "@/config/site";
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

function getProductFaqs(product: Product) {
  return [
    {
      q: "What sizes are listed for " + product.name + "?",
      a:
        product.packagingSizes.join(", ") +
        (product.bulkPackagingSizes.length > 0
          ? ". Single sacks: " + product.bulkPackagingSizes.join(", ")
          : "") +
        ". Other requirements can be discussed in an enquiry.",
    },
    {
      q: "How should " + product.name + " be stored?",
      a: product.shelfLife + ". " + product.storage + ".",
    },
    {
      q: "How can I request a quote for " + product.name + "?",
      a: "Use the product quote button and tell us your destination, packaging needs and estimated order volume.",
    },
  ];
}

export default function ProductDetail() {
  const { urlSlug } = useParams<{ urlSlug: string }>();
  const internalSlug = urlSlug ? productUrlToInternalSlug[urlSlug] : undefined;
  const product = internalSlug
    ? currentPublicCatalogueProducts.find(item => item.slug === internalSlug)
    : undefined;

  if (!product) return <NotFound />;

  const otherProducts = currentPublicCatalogueProducts.filter(
    item => item.slug !== product.slug && getProductPageUrl(item.slug)
  );
  const faqs = getProductFaqs(product);

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={`${product.name} | Ghana Wholesale & Export | BorgaFoods`}
        description={`${product.summary}. Wholesale and export enquiries welcome from distributors, retailers, and food-service buyers.`}
        keywords={`${product.name}, ${product.category}, Ghana food export, BorgaFoods ${product.name}, ${product.name} wholesale`}
        image={SITE_ORIGIN + product.images[0]}
      />
      <SchemaMarkup type="product" data={product} />
      <SchemaMarkup type="faq" faqs={faqs} faqKey={product.slug} />
      <SchemaMarkup
        type="breadcrumb"
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Products", path: "/products" },
          { name: product.name, path: "/products/" + urlSlug },
        ]}
      />

      <nav
        aria-label="Breadcrumb"
        className="container pt-6 text-sm text-muted-foreground"
      >
        <ol className="flex flex-wrap items-center gap-1">
          <li>
            <Link href="/" className="hover:text-primary">
              Home
            </Link>
          </li>
          <ChevronRight size={14} aria-hidden="true" />
          <li>
            <Link href="/products" className="hover:text-primary">
              Products
            </Link>
          </li>
          <ChevronRight size={14} aria-hidden="true" />
          <li className="font-medium text-foreground" aria-current="page">
            {product.name}
          </li>
        </ol>
      </nav>

      <section className="py-10 md:py-14">
        <div className="container grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-14">
          <div>
            <div className="flex aspect-[4/5] max-w-xl items-center justify-center overflow-hidden rounded-2xl border border-border/60 bg-gradient-to-br from-secondary/10 via-white to-secondary/5 p-6 shadow-sm">
              <img
                src={product.images[0]}
                alt={product.name + " packaging"}
                loading="eager"
                decoding="async"
                className="h-full w-full object-contain"
              />
            </div>
          </div>

          <div className="lg:pt-4">
            <p className="inline-flex items-center gap-2 text-sm font-bold text-primary">
              <PackageCheck size={19} aria-hidden="true" />
              {productTypeLabels[product.supplyType]}
            </p>
            <h1 className="mt-4 text-4xl font-bold leading-tight text-foreground md:text-5xl">
              {product.name}
            </h1>
            <p className="mt-4 text-xl text-muted-foreground">
              {product.summary}
            </p>
            <p className="mt-5 max-w-xl leading-relaxed text-foreground">
              {product.description}
            </p>

            <dl className="mt-7 grid gap-4 rounded-xl border border-border/60 bg-white p-6 shadow-sm sm:grid-cols-2">
              {[
                ["Origin", product.countryOfOrigin],
                ["Pack sizes", product.packagingSizes.join(", ")],
                ...(product.cartonConfiguration
                  ? [["Packs per carton", product.cartonConfiguration]]
                  : []),
                ...(product.bulkPackagingSizes.length > 0
                  ? [
                      [
                        "Single woven sacks",
                        product.bulkPackagingSizes.join(", "),
                      ],
                    ]
                  : []),
                ["Shelf life", product.shelfLife],
                ["Supply", productSupplyStatements[product.supplyType]],
              ].map(([label, value]) => (
                <div key={label}>
                  <dt className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
                    {label}
                  </dt>
                  <dd className="mt-1 font-medium text-foreground">{value}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-7 flex flex-wrap gap-3">
              <ExportQuoteButton
                productSlug={product.slug}
                label={"Request Quote for " + product.name}
              />
              <CatalogueRequestButton
                productName={product.name}
                className="border-primary/40 text-primary hover:bg-primary/5"
              />
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Need wholesale or export details?{" "}
              <Link
                href="/wholesale"
                className="font-semibold text-primary hover:underline"
              >
                Wholesale
              </Link>
              {" · "}
              <Link
                href="/export-solutions"
                className="font-semibold text-primary hover:underline"
              >
                Export Solutions
              </Link>
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-secondary/5 py-10">
        <div className="container max-w-5xl space-y-3">
          <details className="rounded-xl border border-border/60 bg-white p-5">
            <summary className="cursor-pointer font-bold text-foreground">
              More product details
            </summary>
            <dl className="mt-5 grid gap-4 sm:grid-cols-2">
              {[
                ...(product.supplyType === "manufactured"
                  ? [
                      ["Brand", product.brand],
                      ["Manufacturer", product.manufacturer],
                    ]
                  : []),
                ["Category", product.category],
                ["Storage", product.storage],
                ["Certification", product.certification],
                ...(product.variants.length > 1
                  ? [["Available variants", product.variants.join(", ")]]
                  : []),
              ].map(([label, value]) => (
                <div key={label}>
                  <dt className="text-sm font-semibold text-muted-foreground">
                    {label}
                  </dt>
                  <dd className="mt-1 text-foreground">{value}</dd>
                </div>
              ))}
            </dl>
          </details>
          <details className="rounded-xl border border-border/60 bg-white p-5">
            <summary className="cursor-pointer font-bold text-foreground">
              Common questions
            </summary>
            <div className="mt-5 space-y-5">
              <h2 className="sr-only">Common questions about {product.name}</h2>
              {faqs.map(faq => (
                <div key={faq.q}>
                  <h3 className="font-semibold text-foreground">{faq.q}</h3>
                  <p className="mt-1 text-muted-foreground">{faq.a}</p>
                </div>
              ))}
            </div>
          </details>
        </div>
      </section>

      {product.privateLabelDiscoveryApproved && (
        <section className="py-12">
          <div className="container">
            <div className="mx-auto max-w-4xl rounded-xl border border-primary/30 bg-primary/5 p-6 md:p-8">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary">
                Private-label Discovery
              </p>
              <h2 className="mt-3 text-2xl font-bold text-foreground">
                Discuss Selected Product Opportunities
              </h2>
              <p className="mt-4 leading-relaxed text-foreground">
                BorgaFoods supports private-label discussions for selected
                products. Private-label opportunities are reviewed individually
                based on product specifications, packaging requirements, order
                volume, and production feasibility.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Each enquiry is reviewed manually. Packaging, specifications,
                production feasibility, regulatory requirements, and commercial
                terms are confirmed before any acceptance; submitting an enquiry
                does not create a customer commitment.
              </p>
              <div className="mt-5">
                <ExportQuoteButton
                  inquiryType="private_label"
                  label="Start Private-label Discussion"
                />
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="py-10" aria-labelledby="other-products">
        <div className="container">
          <h2
            id="other-products"
            className="text-2xl font-bold text-foreground"
          >
            Explore more products
          </h2>
          <div className="mt-5 flex flex-wrap gap-3">
            {otherProducts.map(other => (
              <Link
                key={other.slug}
                href={getProductPageUrl(other.slug)!}
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-white px-4 py-3 text-sm font-semibold text-primary hover:border-primary/40 hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/40"
              >
                {other.name}
                <ArrowRight size={15} aria-hidden="true" />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
