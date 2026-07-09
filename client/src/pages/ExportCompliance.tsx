import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Globe, FileText, Truck, Zap } from "lucide-react";
import { Link } from "wouter";
import SEO from "@/components/SEO";

export default function ExportCompliance() {
  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Export & Compliance - International Trade Support | borgafoods.com"
        description="Learn about our export-ready operations from Tema Port, Ghana. FOB/CIF terms, 2-4 week lead times, Ghana FDA compliance, flexible MOQs, and complete export documentation support."
        keywords="Ghana food export, Tema port export, FOB Ghana, CIF shipping, Ghana FDA compliance, export documentation, international food trade"
      />
      <section className="py-16 bg-gradient-to-br from-primary/5 to-background border-b border-border">
        <div className="container">
          <h1 className="text-5xl font-bold text-foreground mb-4">Export-Ready Operations</h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Our operations are structured specifically for international trade. We support partners with comprehensive export coordination, flexible MOQs, and complete customization capabilities.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container">
          <h2 className="text-4xl font-bold text-foreground mb-12">What We Support</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                icon: FileText,
                title: "Export Documentation",
                description: "Complete coordination of export documentation and paperwork required for international shipments.",
              },
              {
                icon: Truck,
                title: "Standardized Packaging",
                description: "Packaging formats designed for export stability, handling, and international logistics requirements.",
              },
              {
                icon: CheckCircle,
                title: "Shelf-Life Conscious Production",
                description: "Manufacturing processes designed to maximize shelf life and stability during long-distance transport.",
              },
              {
                icon: Globe,
                title: "Custom Labeling",
                description: "Labeling support in multiple languages and formats to meet destination market requirements.",
              },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <Card key={index} className="p-8">
                  <Icon size={32} className="text-primary mb-4" />
                  <h3 className="text-xl font-bold text-foreground mb-3">{item.title}</h3>
                  <p className="text-foreground">{item.description}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 bg-secondary/5">
        <div className="container">
          <h2 className="text-4xl font-bold text-foreground mb-12">Flexible Minimum Order Quantities</h2>
          <p className="text-lg text-foreground mb-12 max-w-3xl">
            We understand that different buyers have different needs. We are **not locked into fixed MOQs**. Instead, we work with you to find the right order size for your business stage and market strategy.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-8 border-primary/20">
              <Zap size={32} className="text-primary mb-4" />
              <h3 className="text-2xl font-bold text-foreground mb-4">Market Testing</h3>
              <p className="text-foreground mb-4">
                Starting small? We support smaller initial orders so you can test the market without overcommitting.
              </p>
              <p className="text-sm text-muted-foreground">
                Perfect for new distributors exploring demand in their region.
              </p>
            </Card>

            <Card className="p-8 border-primary/20">
              <Truck size={32} className="text-primary mb-4" />
              <h3 className="text-2xl font-bold text-foreground mb-4">Scaling Orders</h3>
              <p className="text-foreground mb-4">
                As your market grows, we scale with you. Increase order sizes progressively without penalty.
              </p>
              <p className="text-sm text-muted-foreground">
                Volume pricing available as your orders grow.
              </p>
            </Card>

            <Card className="p-8 border-primary/20">
              <CheckCircle size={32} className="text-primary mb-4" />
              <h3 className="text-2xl font-bold text-foreground mb-4">Bulk Orders</h3>
              <p className="text-foreground mb-4">
                Ready for large-scale supply? We accommodate bulk orders with competitive pricing and priority production.
              </p>
              <p className="text-sm text-muted-foreground">
                Consistent quality regardless of order size.
              </p>
            </Card>
          </div>

          <div className="mt-12 p-8 bg-primary/5 border-l-4 border-primary rounded">
            <p className="text-foreground text-lg">
              <strong>Our Approach:</strong> We discuss your specific situation—market size, customer base, storage capacity, cash flow—and work together to establish an MOQ that makes sense for your business. There's no one-size-fits-all answer; we customize.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container">
          <h2 className="text-4xl font-bold text-foreground mb-12">Compliance Readiness</h2>
          <p className="text-lg text-foreground mb-12 max-w-3xl">
            Depending on destination market requirements, we support comprehensive compliance standards to ensure your products meet international regulations.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="p-8">
              <h3 className="text-2xl font-bold text-primary mb-6">Production Standards</h3>
              <ul className="space-y-4">
                {[
                  "Ghana FDA-compliant production processes",
                  "Rigorous quality control at every stage",
                  "Hygiene protocols and food safety standards",
                  "Traceability and documentation systems",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-foreground">
                    <CheckCircle size={20} className="text-primary flex-shrink-0 mt-1" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Card>

            <Card className="p-8">
              <h3 className="text-2xl font-bold text-primary mb-6">Labeling & Documentation</h3>
              <ul className="space-y-4">
                {[
                  "Nutrition labeling support",
                  "Ingredient transparency and sourcing",
                  "Shelf-life documentation",
                  "Regulatory alignment for destination countries",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-foreground">
                    <CheckCircle size={20} className="text-primary flex-shrink-0 mt-1" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 bg-secondary/5">
        <div className="container">
          <h2 className="text-4xl font-bold text-foreground mb-12">Logistics & Trade Terms</h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            <Card className="p-8">
              <h3 className="text-2xl font-bold text-primary mb-4">Port of Origin</h3>
              <p className="text-3xl font-bold text-foreground mb-2">Tema, Ghana</p>
              <p className="text-muted-foreground">Modern port facilities with efficient export operations and international shipping connections.</p>
            </Card>

            <Card className="p-8">
              <h3 className="text-2xl font-bold text-primary mb-4">Trade Terms</h3>
              <p className="text-3xl font-bold text-foreground mb-2">FOB / CIF / CFR</p>
              <p className="text-muted-foreground">Available upon agreement. We support multiple Incoterms to accommodate different buyer preferences.</p>
            </Card>

            <Card className="p-8">
              <h3 className="text-2xl font-bold text-primary mb-4">Lead Times</h3>
              <p className="text-3xl font-bold text-foreground mb-2">2–4 Weeks</p>
              <p className="text-muted-foreground">After order confirmation and deposit. Exact timelines depend on order size and customization requirements.</p>
            </Card>
          </div>

          <Card className="p-8 bg-background">
            <h3 className="text-2xl font-bold text-foreground mb-4">International Experience</h3>
            <p className="text-lg text-foreground mb-4">
              We have extensive experience coordinating shipments into Asia and international markets. Our team understands:
            </p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "Port documentation and customs procedures",
                "International shipping logistics",
                "Regulatory requirements by destination",
                "Packaging for long-distance transport",
                "Insurance and risk management",
                "Delivery coordination and tracking",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-foreground">
                  <span className="text-primary font-bold mt-1">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </section>

      <section className="py-20">
        <div className="container">
          <h2 className="text-4xl font-bold text-foreground mb-12">Complete Customization</h2>
          <p className="text-lg text-foreground mb-12 max-w-3xl">
            All Borga products are available with complete flexibility on packaging, sizing, and order quantities. We customize based on your specific market and business needs.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "Packaging Customization",
                items: [
                  "Custom net weight options",
                  "Different packaging materials",
                  "Custom carton configurations",
                  "Branded packaging design",
                  "Labeling in destination languages",
                  "Regulatory compliance alignment",
                ],
              },
              {
                title: "Order Flexibility",
                items: [
                  "No fixed minimum order quantities",
                  "Flexible MOQs for your business stage",
                  "Small orders for market testing",
                  "Large bulk orders with volume pricing",
                  "Scalable supply as you grow",
                  "Consistent quality at any size",
                ],
              },
            ].map((section) => (
              <Card key={section.title} className="p-8">
                <h3 className="text-2xl font-bold text-foreground mb-6">{section.title}</h3>
                <ul className="space-y-3">
                  {section.items.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-foreground">
                      <span className="text-primary font-bold">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4 text-white">Let's Discuss Your Specific Needs</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto text-white/90">
            Every business is different. Contact us to discuss your custom requirements, MOQ, packaging preferences, and timeline.
          </p>
          <Link href="/contact">
            <Button size="lg" className="bg-primary-foreground hover:bg-primary-foreground/90 text-primary">
              Get in Touch
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
