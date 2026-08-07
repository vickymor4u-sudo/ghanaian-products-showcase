import {
  ArrowRight,
  Boxes,
  Factory,
  FileText,
  PackageCheck,
  Ship,
  Users,
} from "lucide-react";
import { Link } from "wouter";
import ExportQuoteButton from "@/components/ExportQuoteButton";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { publicManufacturedProducts } from "@/data/products";

const manufacturedProducts = publicManufacturedProducts;

const exportProcess = [
  {
    step: "01",
    title: "Product selection",
    description:
      "We review the BorgaFoods manufactured range and any approved export-selection categories relevant to your market.",
  },
  {
    step: "02",
    title: "Quotation",
    description:
      "Product mix, packaging, volume, destination, and shipment requirements are defined before a quotation is prepared.",
  },
  {
    step: "03",
    title: "Production or sourcing",
    description:
      "BorgaFoods products move through manufacturing, while approved export selections are coordinated separately with trusted Ghanaian production partners.",
  },
  {
    step: "04",
    title: "Documentation",
    description:
      "Required commercial and export documents are coordinated according to the agreed products, destination, and shipment terms.",
  },
  {
    step: "05",
    title: "Shipment",
    description:
      "Final shipment arrangements are confirmed with the buyer and the appointed logistics providers.",
  },
];

export default function ExportSolutions() {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Ghana Food Export Solutions | BorgaFoods"
        description="BorgaFoods combines Ghanaian food manufacturing with selected partner-sourced products, wholesale planning, mixed container coordination, and export support."
        keywords="Ghana food export solutions, BorgaFoods manufacturer, Ghana wholesale food supplier, mixed container Ghana foods, African grocery export"
      />

      <section className="py-20 bg-gradient-to-br from-primary/10 to-background border-b border-border">
        <div className="container">
          <div className="max-w-4xl">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary mb-4">
              Manufacturer first. Export partner second.
            </p>
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
              Ghana Food Export Solutions for International Buyers
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-8 max-w-3xl">
              BorgaFoods manufactures Ghanaian staple foods and helps buyers
              build a broader Ghana-focused assortment through carefully
              selected export products.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <ExportQuoteButton className="bg-primary hover:bg-primary/90 text-primary-foreground" />
              <Link href="/wholesale">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary/5"
                >
                  Wholesale & Distribution
                  <ArrowRight size={18} className="ml-2" />
                </Button>
              </Link>
            </div>
            <p className="text-sm text-muted-foreground mt-6">
              For distributors, supermarkets, importers, restaurants,
              wholesalers, and food-service buyers.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="p-8 border-primary/30">
              <Factory size={36} className="text-primary mb-5" />
              <p className="text-sm font-bold uppercase tracking-wider text-primary mb-3">
                Ghana Product Supply
              </p>
              <h2 className="text-3xl font-bold text-foreground mb-5">
                Manufactured by BorgaFoods
              </h2>
              <p className="text-lg text-foreground leading-relaxed mb-6">
                BorgaFoods Processing manufactures our current Ghanaian
                staple-food range for B2B wholesale and export enquiries.
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {manufacturedProducts.map(product => (
                  <li
                    key={product.slug}
                    className="flex items-center gap-3 text-foreground"
                  >
                    <PackageCheck
                      size={18}
                      className="text-primary flex-shrink-0"
                    />
                    <span>{product.name}</span>
                  </li>
                ))}
              </ul>
            </Card>

            <Card className="p-8">
              <Boxes size={36} className="text-primary mb-5" />
              <p className="text-sm font-bold uppercase tracking-wider text-primary mb-3">
                Partner Sourcing Capability
              </p>
              <h2 className="text-3xl font-bold text-foreground mb-5">
                BorgaFoods Export Selection
              </h2>
              <p className="text-xl font-semibold text-foreground mb-4">
                Selected from trusted Ghanaian production partners.
              </p>
              <p className="text-lg text-foreground leading-relaxed mb-6">
                This sourcing model can support an expanded Ghanaian and African
                grocery assortment while keeping partner-sourced products
                clearly separate from BorgaFoods manufacturing.
              </p>
              <p className="text-sm text-muted-foreground">
                Product availability, packaging, documentation, and destination
                requirements are confirmed for each enquiry.
              </p>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 bg-secondary/5">
        <div className="container">
          <div className="max-w-3xl mb-12">
            <p className="text-sm font-bold uppercase tracking-wider text-primary mb-3">
              Container Supply
            </p>
            <h2 className="text-4xl font-bold text-foreground mb-5">
              Build a Supply Plan Around Your Market
            </h2>
            <p className="text-lg text-foreground leading-relaxed">
              We discuss product mix, order volume, packaging, documentation,
              and shipment requirements with each buyer before confirming a
              supply plan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Boxes,
                title: "Mixed container solutions",
                description:
                  "Coordinate eligible manufactured and approved export-selection products in a buyer-led assortment.",
              },
              {
                icon: PackageCheck,
                title: "Bulk orders",
                description:
                  "Review bulk formats and order volumes according to the selected products and market requirements.",
              },
              {
                icon: Users,
                title: "Wholesale supply",
                description:
                  "Support structured enquiries from distributors, retailers, restaurants, and food-service buyers.",
              },
              {
                icon: FileText,
                title: "Documentation support",
                description:
                  "Coordinate export documentation requirements for the agreed products and destination.",
              },
            ].map(item => {
              const Icon = item.icon;
              return (
                <Card key={item.title} className="p-6">
                  <Icon size={28} className="text-primary mb-4" />
                  <h3 className="text-xl font-bold text-foreground mb-3">
                    {item.title}
                  </h3>
                  <p className="text-foreground leading-relaxed">
                    {item.description}
                  </p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container">
          <div className="flex items-center gap-4 mb-12">
            <Ship size={36} className="text-primary" />
            <h2 className="text-4xl font-bold text-foreground">
              Our Export Process
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {exportProcess.map(item => (
              <Card key={item.step} className="p-6">
                <p className="text-3xl font-bold text-primary/30 mb-4">
                  {item.step}
                </p>
                <h3 className="text-lg font-bold text-foreground mb-3">
                  {item.title}
                </h3>
                <p className="text-sm text-foreground leading-relaxed">
                  {item.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary">
        <div className="container text-center">
          <h2 className="text-4xl font-bold text-white mb-5">
            Discuss Your Ghana Product Requirements
          </h2>
          <p className="text-lg text-white/90 max-w-2xl mx-auto mb-8">
            Tell us your destination market, product interests, estimated
            volume, and packaging requirements so we can prepare the next steps.
          </p>
          <ExportQuoteButton className="bg-primary-foreground hover:bg-primary-foreground/90 text-primary" />
        </div>
      </section>
    </div>
  );
}
