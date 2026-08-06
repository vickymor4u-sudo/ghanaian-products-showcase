import {
  CheckCircle,
  FileCheck2,
  FileText,
  Globe,
  PackageCheck,
  Ship,
  Truck,
} from "lucide-react";
import { Link } from "wouter";
import ExportQuoteButton from "@/components/ExportQuoteButton";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function ExportCompliance() {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Export & Compliance Information | BorgaFoods"
        description="Review how BorgaFoods coordinates product, packaging, destination-market, export-documentation, and shipment requirements for Ghanaian food export enquiries."
        keywords="Ghana food export documentation, food export compliance Ghana, shipment planning, export labeling requirements, BorgaFoods export"
      />

      <section className="py-16 bg-gradient-to-br from-primary/5 to-background border-b border-border">
        <div className="container">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary mb-4">
              Export & Compliance
            </p>
            <h1 className="text-5xl font-bold text-foreground mb-5">
              Requirements Coordinated for Each Export Enquiry
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              Products, packaging, documentation, trade terms, destination
              requirements, and shipment timing are reviewed before an export
              quotation is confirmed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <ExportQuoteButton className="bg-primary hover:bg-primary/90 text-primary-foreground" />
              <Link href="/export-solutions">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary/5"
                >
                  View Export Solutions
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container">
          <h2 className="text-4xl font-bold text-foreground mb-12">
            What We Coordinate
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                icon: FileText,
                title: "Export documentation",
                description:
                  "Commercial and shipment document requirements are identified according to the agreed transaction and destination.",
              },
              {
                icon: PackageCheck,
                title: "Packaging information",
                description:
                  "Product format, case configuration, handling needs, and available packaging details are reviewed with the buyer.",
              },
              {
                icon: Globe,
                title: "Destination requirements",
                description:
                  "Buyers should provide current import, labeling, and market requirements for review before confirmation.",
              },
              {
                icon: Truck,
                title: "Shipment coordination",
                description:
                  "Shipment method, logistics responsibilities, timing, and required handover information are agreed per order.",
              },
            ].map(item => {
              const Icon = item.icon;
              return (
                <Card key={item.title} className="p-8">
                  <Icon size={32} className="text-primary mb-4" />
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
          <div className="max-w-3xl mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-5">
              Information Confirmed Before Quotation
            </h2>
            <p className="text-lg text-foreground leading-relaxed">
              Export requirements vary by product, destination, order size, and
              buyer arrangement. The following items are therefore confirmed
              rather than assumed.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="p-8">
              <FileCheck2 size={32} className="text-primary mb-5" />
              <h3 className="text-2xl font-bold text-foreground mb-6">
                Product & Market Requirements
              </h3>
              <ul className="space-y-4">
                {[
                  "Selected product and supply type",
                  "Current product and facility documentation",
                  "Packaging and label requirements",
                  "Destination-market information supplied by the buyer",
                  "Any additional verification needed before shipment",
                ].map(item => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-foreground"
                  >
                    <CheckCircle
                      size={20}
                      className="text-primary flex-shrink-0 mt-0.5"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Card>

            <Card className="p-8">
              <Ship size={32} className="text-primary mb-5" />
              <h3 className="text-2xl font-bold text-foreground mb-6">
                Commercial & Shipment Requirements
              </h3>
              <ul className="space-y-4">
                {[
                  "Estimated order volume and product mix",
                  "Agreed trade and payment terms",
                  "Production or sourcing timeline",
                  "Logistics roles and shipment method",
                  "Commercial and shipping documents",
                ].map(item => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-foreground"
                  >
                    <CheckCircle
                      size={20}
                      className="text-primary flex-shrink-0 mt-0.5"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container">
          <h2 className="text-4xl font-bold text-foreground mb-12">
            Shipment Planning
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-8">
              <h3 className="text-xl font-bold text-primary mb-4">
                Export origin
              </h3>
              <p className="text-2xl font-bold text-foreground mb-3">Ghana</p>
              <p className="text-foreground">
                Final port and routing arrangements are confirmed for the
                shipment.
              </p>
            </Card>
            <Card className="p-8">
              <h3 className="text-xl font-bold text-primary mb-4">
                Trade terms
              </h3>
              <p className="text-2xl font-bold text-foreground mb-3">
                Agreed per shipment
              </p>
              <p className="text-foreground">
                Responsibilities and applicable terms are documented in the
                quotation or contract.
              </p>
            </Card>
            <Card className="p-8">
              <h3 className="text-xl font-bold text-primary mb-4">Lead time</h3>
              <p className="text-2xl font-bold text-foreground mb-3">
                Confirmed per order
              </p>
              <p className="text-foreground">
                Timing depends on product, volume, packaging, sourcing,
                documentation, and logistics.
              </p>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary">
        <div className="container text-center">
          <h2 className="text-4xl font-bold text-white mb-5">
            Prepare an Export Enquiry
          </h2>
          <p className="text-lg text-white/90 max-w-2xl mx-auto mb-8">
            Share your product interests, market, estimated volume, packaging
            needs, and destination requirements for review.
          </p>
          <ExportQuoteButton className="bg-primary-foreground hover:bg-primary-foreground/90 text-primary" />
        </div>
      </section>
    </div>
  );
}
