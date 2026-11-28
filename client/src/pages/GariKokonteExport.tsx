import { Link } from "wouter";
import CatalogueRequestButton from "@/components/CatalogueRequestButton";
import ExportQuoteButton from "@/components/ExportQuoteButton";
import SEO from "@/components/SEO";
import { Card } from "@/components/ui/card";
import { currentPublicCatalogueProducts } from "@/data/products";
import { getProductPageUrl } from "@/data/productUrlSlugs";

const slugs = ["white-gari", "yellow-gari", "kokonte-borga"];

const questions = [
  {
    q: "Where can I buy gari and kokonte for export from Ghana?",
    a: "International importers, wholesalers, distributors and supermarkets can request a wholesale export quotation directly from BorgaFoods in Tema, Ghana.",
  },
  {
    q: "Does BorgaFoods supply gari in 25 kg and 50 kg sacks?",
    a: "Yes. White and yellow gari are listed in 10 kg, 25 kg and 50 kg individual sacks, alongside 1 kg, 2 kg and 5 kg pouch formats.",
  },
  {
    q: "What packaging sizes are available for kokonte?",
    a: "Kokonte flour is available in 1 kg and 2 kg branded pouches, packed as 12 × 1 kg or 6 × 2 kg per carton.",
  },
  {
    q: "Does BorgaFoods supply both white and yellow gari?",
    a: "Yes. White gari and yellow gari have separate product pages and are available in the same approved retail and sack sizes.",
  },
  {
    q: "Can international buyers order gari and kokonte in a mixed container?",
    a: "Mixed-product container requirements can be discussed during the export enquiry. Product mix, packaging, destination and volume are reviewed before quotation.",
  },
  {
    q: "How can an international importer request an export quotation?",
    a: "Use the export quotation form and provide the destination, products, packaging formats and estimated order volume, or email export@borgafoods.com.",
  },
  {
    q: "Where are BorgaFoods products produced?",
    a: "The BorgaFoods manufactured range is produced in Ghana by BorgaFoods Processing. Supply & Demand Worldwide Ltd is based in Tema, Ghana.",
  },
];

export default function GariKokonteExport() {
  const products = currentPublicCatalogueProducts.filter(product =>
    slugs.includes(product.slug)
  );

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Gari and Kokonte Wholesale Export Supplier in Ghana | BorgaFoods"
        description="BorgaFoods supplies Ghanaian white gari, yellow gari and kokonte flour in retail and bulk packaging for international wholesale export."
        keywords="gari export Ghana, kokonte supplier Ghana, garri wholesale, konkonte flour exporter, white gari, yellow gari"
        image="https://www.borgafoods.com/images/hero/yellow-gari.webp"
      />

      <section className="border-b border-border bg-gradient-to-br from-sky-50 via-white to-amber-50/40 py-14 md:py-20">
        <div className="container max-w-5xl">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">Ghana wholesale export supply</p>
          <h1 className="mt-3 text-4xl font-bold leading-tight text-foreground md:text-5xl">Gari and Kokonte Wholesale Export Supplier in Ghana</h1>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-muted-foreground">
            BorgaFoods supplies Ghanaian white gari, yellow gari and kokonte flour to international food importers, wholesalers, distributors and supermarkets. Our products are available in retail and bulk packaging formats suitable for international distribution.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <ExportQuoteButton label="Request Export Quotation" />
            <CatalogueRequestButton className="border-primary/40 bg-white text-primary hover:bg-primary/5" />
          </div>
        </div>
      </section>

      <section className="py-14">
        <div className="container">
          <div className="grid gap-6 md:grid-cols-3">
            {products.map(product => (
              <Card key={product.slug} className="overflow-hidden p-5">
                <div className="flex aspect-[4/3] items-center justify-center rounded-lg bg-secondary/10 p-4">
                  <img src={product.images[0]} alt={`${product.name} packaging for wholesale export`} className="h-full w-full object-contain" />
                </div>
                <h2 className="mt-5 text-2xl font-bold text-foreground">{product.name}</h2>
                <p className="mt-2 leading-relaxed text-muted-foreground">{product.description}</p>
                <p className="mt-3 text-sm"><strong>Sizes:</strong> {[...product.packagingSizes, ...product.bulkPackagingSizes].join(", ")}</p>
                <p className="mt-1 text-sm"><strong>Cartons:</strong> {product.cartonConfiguration}</p>
                <Link href={getProductPageUrl(product.slug)!} className="mt-5 inline-block font-semibold text-primary hover:underline">View {product.name} details</Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-secondary/5 py-14">
        <div className="container">
          <h2 className="text-3xl font-bold text-foreground">Packaging comparison</h2>
          <div className="mt-6 overflow-x-auto rounded-xl border border-border bg-white">
            <table className="w-full min-w-[720px] text-left">
              <thead className="bg-primary text-primary-foreground"><tr><th className="p-4">Product</th><th className="p-4">Retail packs</th><th className="p-4">Bulk sacks</th><th className="p-4">Carton configuration</th><th className="p-4">Origin</th></tr></thead>
              <tbody>{products.map(product => <tr key={product.slug} className="border-t border-border"><th className="p-4">{product.name}</th><td className="p-4">{product.packagingSizes.join(", ")}</td><td className="p-4">{product.bulkPackagingSizes.join(", ") || "Not listed"}</td><td className="p-4">{product.cartonConfiguration}</td><td className="p-4">{product.countryOfOrigin}</td></tr>)}</tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="py-14">
        <div className="container max-w-5xl">
          <h2 className="text-3xl font-bold text-foreground">Gari and kokonte export questions</h2>
          <div className="mt-7 space-y-4">
            {questions.map(item => (
              <div key={item.q} className="rounded-xl border border-border/60 bg-white p-5">
                <h3 className="font-bold text-foreground">{item.q}</h3>
                <p className="mt-2 leading-relaxed text-muted-foreground">{item.a}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3"><ExportQuoteButton label="Discuss a Mixed-product Order" /><CatalogueRequestButton /></div>
        </div>
      </section>
    </div>
  );
}
