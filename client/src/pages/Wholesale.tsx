import {
  Boxes,
  Building2,
  Package,
  Store,
  UtensilsCrossed,
  Users,
} from "lucide-react";
import ExportQuoteButton from "@/components/ExportQuoteButton";
import SEO from "@/components/SEO";
import { Card } from "@/components/ui/card";

export default function Wholesale() {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Wholesale Ghanaian Foods & Distributor Partnerships | BorgaFoods"
        description="Wholesale BorgaFoods staples and approved Ghanaian export selections for distributors, African grocery retailers, restaurants, and food-service buyers."
        keywords="wholesale Ghanaian foods, BorgaFoods distributor, African grocery wholesale, Ghana food importer, restaurant bulk Ghana foods"
      />

      <section className="py-20 bg-gradient-to-br from-primary/10 to-background border-b border-border">
        <div className="container">
          <div className="max-w-4xl">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary mb-4">
              Wholesale & Distribution
            </p>
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
              Ghanaian Food Supply for Trade Buyers
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-8 max-w-3xl">
              BorgaFoods works with distributors, African grocery stores,
              retailers, restaurants, and food-service buyers seeking structured
              wholesale and export supply.
            </p>
            <ExportQuoteButton
              inquiryType="wholesale"
              label="Request Wholesale Supply"
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            />
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container">
          <h2 className="text-4xl font-bold text-foreground mb-12">
            Who We Support
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
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
                icon: Package,
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
            ].map(item => {
              const Icon = item.icon;
              return (
                <Card key={item.title} className="p-6">
                  <Icon size={30} className="text-primary mb-4" />
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

      <section className="py-20 bg-secondary/5">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="p-8">
              <Users size={34} className="text-primary mb-5" />
              <h2 className="text-3xl font-bold text-foreground mb-5">
                Wholesale Enquiries
              </h2>
              <p className="text-lg text-foreground leading-relaxed mb-6">
                A useful enquiry includes your business type, destination
                market, products of interest, expected order volume, preferred
                packaging, and timing.
              </p>
              <ul className="space-y-3 text-foreground">
                <li>• BorgaFoods manufactured staple foods</li>
                <li>• Approved BorgaFoods Export Selection categories</li>
                <li>• Retail, food-service, and bulk format requirements</li>
                <li>• Repeat-supply and distribution planning</li>
              </ul>
            </Card>

            <Card className="p-8 border-primary/30">
              <Boxes size={34} className="text-primary mb-5" />
              <h2 className="text-3xl font-bold text-foreground mb-5">
                Bulk & Container Enquiries
              </h2>
              <p className="text-lg text-foreground leading-relaxed mb-6">
                Bulk packaging and container planning are reviewed against the
                chosen products, available formats, destination requirements,
                and shipment conditions.
              </p>
              <p className="text-foreground leading-relaxed">
                Mixed container enquiries can include eligible BorgaFoods
                manufactured products and approved partner-sourced selections,
                with each supply type clearly identified.
              </p>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20">
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
              products. Private-label opportunities are reviewed individually
              based on product specifications, packaging requirements, order
              volume, and production feasibility.
            </p>
            <p className="text-foreground leading-relaxed mb-8">
              Each enquiry is reviewed manually. Packaging, specifications,
              production feasibility, regulatory requirements, and commercial
              terms are confirmed before any acceptance; submitting an enquiry
              does not create a customer commitment.
            </p>
            <ExportQuoteButton
              inquiryType="private_label"
              label="Start Private-label Discussion"
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            />
          </Card>
        </div>
      </section>

      <section className="py-20">
        <div className="container">
          <div className="max-w-3xl mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-5">
              Distributor Partnerships
            </h2>
            <p className="text-lg text-foreground leading-relaxed">
              We welcome conversations with businesses that understand their
              market and want to develop a reliable Ghanaian food range.
              Partnership scope is agreed according to product availability,
              market requirements, and a practical supply plan. BorgaFoods
              operates with presence in both Ghana (Tema) and China
              (Hangzhou), supporting distributor conversations across Asia
              and Africa.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Market fit",
                description:
                  "Share your customer base, channels, and priority product categories.",
              },
              {
                title: "Supply planning",
                description:
                  "Align products, packaging, volume, documentation, and shipment requirements.",
              },
              {
                title: "Ongoing coordination",
                description:
                  "Review repeat orders and assortment needs as the buyer relationship develops.",
              },
            ].map(item => (
              <Card key={item.title} className="p-8">
                <h3 className="text-xl font-bold text-primary mb-4">
                  {item.title}
                </h3>
                <p className="text-foreground leading-relaxed">
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
            Start a Wholesale Conversation
          </h2>
          <p className="text-lg text-white/90 max-w-2xl mx-auto mb-8">
            Provide your market, products, estimated volume, and packaging
            requirements to begin an export quotation enquiry.
          </p>
          <ExportQuoteButton
            inquiryType="distribution"
            label="Discuss Distribution"
            className="bg-primary-foreground hover:bg-primary-foreground/90 text-primary"
          />
        </div>
      </section>
    </div>
  );
}
