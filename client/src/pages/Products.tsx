import { Link } from "wouter";
import CatalogueRequestButton from "@/components/CatalogueRequestButton";
import ExportQuoteButton from "@/components/ExportQuoteButton";
import ProductCard from "@/components/ProductCard";
import SchemaMarkup from "@/components/SchemaMarkup";
import SEO from "@/components/SEO";
import { currentPublicCatalogueProducts } from "@/data/products";

export default function Products() {
  const manufacturedProducts = currentPublicCatalogueProducts.filter(
    product => product.supplyType === "manufactured"
  );
  const exportSelections = currentPublicCatalogueProducts.filter(
    product => product.supplyType === "partner_sourced"
  );
  const productNames = currentPublicCatalogueProducts
    .map(product => product.name)
    .join(", ");

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="BorgaFoods Products - Premium Ghanaian Staple Foods | borgafoods.com"
        description={`Explore BorgaFoods ${productNames} for wholesale and export enquiries from international distributors, retailers, and food-service buyers.`}
        keywords={`${productNames}, Ghana fufu export, cassava flour wholesale, plantain flour, fermented corn flour`}
      />
      <section className="border-b border-border bg-gradient-to-br from-sky-50 via-white to-amber-50/40 py-12 md:py-16">
        <div className="container">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">
            BorgaFoods product range
          </p>
          <h1 className="mt-3 text-4xl font-bold text-foreground md:text-5xl">
            Ghanaian staples for your market
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Explore our manufactured products, then contact us for a catalogue
            or a quotation tailored to your business.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <CatalogueRequestButton className="border-primary/40 bg-white text-primary hover:bg-primary/5" />
            <ExportQuoteButton />
          </div>
        </div>
      </section>

      <section
        className="py-14 md:py-18"
        aria-labelledby="manufactured-products"
      >
        <div className="container">
          <h2
            id="manufactured-products"
            className="text-2xl font-bold text-foreground md:text-3xl"
          >
            BorgaFoods manufactured range
          </h2>
          <p className="mt-2 text-muted-foreground">
            Five Ghanaian staples manufactured by BorgaFoods Processing.
          </p>
          <div className="mt-8 grid grid-cols-1 gap-5 min-[480px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {manufacturedProducts.map(product => (
              <div key={product.slug}>
                <SchemaMarkup type="product" data={product} />
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {exportSelections.length > 0 && (
        <section
          className="bg-secondary/5 py-14"
          aria-labelledby="export-selections"
        >
          <div className="container">
            <h2
              id="export-selections"
              className="text-2xl font-bold text-foreground md:text-3xl"
            >
              BorgaFoods Export Selection
            </h2>
            <p className="mt-2 text-muted-foreground">
              Selected from trusted Ghanaian production partners.
            </p>
            <div className="mt-8 grid grid-cols-1 gap-5 min-[480px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
              {exportSelections.map(product => (
                <div key={product.slug}>
                  <SchemaMarkup type="product" data={product} />
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="border-t border-border py-12">
        <div className="container flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-xl text-muted-foreground">
            Need details on packaging, destination requirements or the wider
            export process?
          </p>
          <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold text-primary">
            <Link href="/wholesale" className="hover:underline">
              Wholesale
            </Link>
            <Link href="/export-solutions" className="hover:underline">
              Export Solutions
            </Link>
            <Link href="/contact" className="hover:underline">
              Contact
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
