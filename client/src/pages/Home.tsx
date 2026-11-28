import { ArrowRight, Factory, Globe2, PackageCheck } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import CatalogueRequestButton from "@/components/CatalogueRequestButton";
import ExportQuoteButton from "@/components/ExportQuoteButton";
import ProductCard from "@/components/ProductCard";
import SchemaMarkup from "@/components/SchemaMarkup";
import SEO from "@/components/SEO";
import { publicManufacturedProducts } from "@/data/products";
import { SITE_ORIGIN } from "@/config/site";

const heroProducts = [
  { name: "Gari Borga", file: "yellow-gari", width: 850, height: 584 },
  { name: "Banku Borga", file: "banku", width: 720, height: 598 },
  { name: "Kokonte Borga", file: "kokonte", width: 720, height: 635 },
  { name: "Cassava Flour", file: "cassava-flour", width: 720, height: 625 },
] as const;

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Gari, Kokonte, Banku & Fufu Exporter in Ghana | BorgaFoods"
        description="BorgaFoods is a Ghanaian manufacturer and wholesale export supplier of gari, kokonte, banku, cassava flour and fufu. Retail and bulk packaging available."
        keywords="Ghanaian food manufacturer, Ghana food export, fufu wholesale, gari export, kokonte, banku, African grocery distributor, BorgaFoods"
        image={`${SITE_ORIGIN}/images/hero/fufu-front.webp`}
      />
      <SchemaMarkup type="organization" />
      <SchemaMarkup type="website" />

      <section className="bg-gradient-to-b from-sky-50 via-white to-amber-50/40 pb-12 pt-6 md:pb-16 md:pt-10">
        <div className="container">
          <div className="grid grid-cols-2 gap-x-3 gap-y-5 rounded-2xl border border-border/50 bg-white px-4 py-5 shadow-sm sm:px-6 lg:grid-cols-5 lg:items-end lg:gap-5 lg:py-8">
            <figure className="col-span-2 flex flex-col items-center lg:order-3 lg:col-span-1">
              <div className="relative mx-auto w-full max-w-44 pb-16">
                <img
                  src="/images/hero/fufu-front.webp"
                  alt="Front of the 700 g Fufu Borga box"
                  width={510}
                  height={734}
                  fetchPriority="high"
                  decoding="async"
                  className="mx-auto h-auto w-3/5"
                />
                <img
                  src="/images/hero/fufu-angle.webp"
                  alt="Angled view of the same 700 g box"
                  width={800}
                  height={319}
                  decoding="async"
                  className="absolute inset-x-0 bottom-0 h-auto w-full"
                  style={{
                    clipPath:
                      "polygon(0.4% 54%, 21.1% 7.4%, 84% 1.4%, 99.7% 49%, 96.6% 98.5%, 5.2% 97.5%)",
                  }}
                />
              </div>
              <figcaption className="mt-3 text-center text-xs font-semibold text-foreground sm:text-sm">
                Fufu Borga
              </figcaption>
            </figure>
            {heroProducts.map((product, index) => (
              <figure
                key={product.file}
                className={
                  index < 2
                    ? "flex min-w-0 flex-col lg:order-1"
                    : "flex min-w-0 flex-col lg:order-4"
                }
              >
                <img
                  src={`/images/hero/${product.file}.webp`}
                  alt={`${product.name} packaging`}
                  width={product.width}
                  height={product.height}
                  decoding="async"
                  className="aspect-[5/4] w-full object-contain object-bottom"
                />
                <figcaption className="mt-3 text-center text-xs font-semibold text-foreground sm:text-sm">
                  {product.name}
                </figcaption>
              </figure>
            ))}
          </div>
          <div className="mx-auto max-w-4xl pt-8 text-center md:pt-10">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-primary">
              Ghanaian staples for global trade
            </p>
            <h1 className="text-3xl font-bold leading-tight text-foreground sm:text-4xl lg:text-5xl">
              Ghanaian Food Manufacturer and Export Supplier
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              BorgaFoods, a brand of Supply &amp; Demand Worldwide Ltd, is a
              Ghanaian food manufacturer and wholesale export supplier based
              in Tema, Ghana. We supply white gari, yellow gari, kokonte flour,
              banku flour, cassava flour and fufu flour to importers,
              distributors, wholesalers and supermarkets.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Button
                asChild
                size="lg"
                className="bg-primary text-primary-foreground"
              >
                <Link href="/products">Explore Products</Link>
              </Button>
              <ExportQuoteButton />
              <CatalogueRequestButton className="border-primary/40 bg-white text-primary hover:bg-primary/5" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 md:py-18" aria-labelledby="manufactured-range">
        <div className="container">
          <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-2 text-sm font-semibold uppercase tracking-[0.16em] text-primary">
                Manufactured in Ghana
              </p>
              <h2
                id="manufactured-range"
                className="text-3xl font-bold text-foreground md:text-4xl"
              >
                Explore our six core products
              </h2>
            </div>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 font-semibold text-primary hover:underline"
            >
              View all products <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {publicManufacturedProducts.map(product => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section
        className="bg-secondary/5 py-14 md:py-18"
        aria-labelledby="how-we-supply"
      >
        <div className="container">
          <div className="mb-8 max-w-3xl">
            <h2
              id="how-we-supply"
              className="text-3xl font-bold text-foreground md:text-4xl"
            >
              A clear supply partner for international buyers
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
              BorgaFoods Processing manufactures our core Ghanaian range in
              retail-packaged and bulk formats. International buyers can
              discuss wholesale supply, mixed-product container orders and
              destination requirements through our export enquiry process.
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {[
              {
                icon: Factory,
                title: "Our manufactured range",
                text: "Six BorgaFoods staples presented with product specifications, packaging and enquiry paths.",
              },
              {
                icon: PackageCheck,
                title: "Buyer requirements review",
                text: "Discuss product mix, packaging needs and destination requirements for your market.",
              },
              {
                icon: Globe2,
                title: "Export coordination",
                text: "Wholesale and shipment requirements are reviewed with each buyer before quotation.",
              },
            ].map(item => {
              const Icon = item.icon;
              return (
                <Card key={item.title} className="bg-white p-6 shadow-sm">
                  <Icon size={28} className="text-primary" aria-hidden="true" />
                  <h3 className="mt-4 text-xl font-bold text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-2 leading-relaxed text-muted-foreground">
                    {item.text}
                  </p>
                </Card>
              );
            })}
          </div>
          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold text-primary">
            <Link href="/wholesale" className="hover:underline">
              Wholesale &amp; Distribution
            </Link>
            <Link href="/export-solutions" className="hover:underline">
              Export Solutions
            </Link>
            <Link href="/export/gari-and-kokonte" className="hover:underline">
              Gari &amp; Kokonte Export
            </Link>
            <Link href="/about" className="hover:underline">
              About BorgaFoods
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-primary py-14 text-center text-white md:py-16">
        <div className="container">
          <h2 className="text-3xl font-bold md:text-4xl">
            Ready to discuss your product needs?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/90">
            Tell us which products and destination market matter to your
            business.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <ExportQuoteButton className="bg-white text-primary hover:bg-white/90" />
            <CatalogueRequestButton className="border-white bg-transparent text-white hover:bg-white/10" />
          </div>
        </div>
      </section>
    </div>
  );
}
