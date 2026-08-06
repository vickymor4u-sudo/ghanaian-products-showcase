import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Zap, Package, TrendingUp } from "lucide-react";
import { Link } from "wouter";
import SEO from "@/components/SEO";
import SchemaMarkup from "@/components/SchemaMarkup";
import ExportQuoteButton from "@/components/ExportQuoteButton";
import { products } from "@/data/products";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="BorgaFoods | Ghanaian Food Manufacturer & Export Partner"
        description="BorgaFoods manufactures Ghanaian staples and coordinates selected export products for distributors, wholesalers, importers, retailers, and food-service buyers."
        keywords="Ghanaian food manufacturer, Ghana food export, fufu wholesale, gari export, kokonte, banku, African grocery distributor, BorgaFoods"
      />
      <SchemaMarkup type="organization" />
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent" />
        <div className="container relative z-10">
          <div className="max-w-3xl">
            <div className="inline-block mb-6 px-4 py-2 bg-primary/10 rounded-full border border-primary/20">
              <span className="text-sm font-semibold text-primary">
                B2B Export Solutions
              </span>
            </div>

            <h1 className="text-6xl md:text-7xl font-bold text-foreground mb-6 leading-tight">
              Ghanaian Food Manufacturing and Export Supply
            </h1>

            <p className="text-xl text-muted-foreground mb-8 leading-relaxed max-w-2xl">
              BorgaFoods manufactures Ghanaian staple foods and supports a
              broader export assortment through selected Ghanaian production
              partners.
            </p>

            <p className="text-lg text-foreground mb-12 max-w-2xl">
              Built for conversations with international distributors,
              wholesalers, importers, retailers, restaurants, and food-service
              buyers.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <ExportQuoteButton className="bg-primary hover:bg-primary/90 text-primary-foreground" />
              <Link href="/export-solutions">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary/5"
                >
                  Explore Export Solutions
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Company Introduction */}
      <section className="py-20 bg-secondary/5">
        <div className="container">
          <div className="max-w-3xl">
            <h2 className="text-4xl font-bold text-foreground mb-6">
              Who We Are
            </h2>
            <p className="text-lg text-foreground mb-6 leading-relaxed">
              <strong>Supply & Demand Worldwide Ltd</strong> is a Ghana-focused
              Ghanaian food and export business supporting international B2B
              buyers.
            </p>
            <p className="text-lg text-foreground mb-6 leading-relaxed">
              Through <strong>BorgaFoods Processing</strong>, we manufacture our
              current range of gari, cassava flour, fufu flour, kokonte, and
              Banku Borga.
            </p>
            <p className="text-lg text-foreground leading-relaxed">
              We also coordinate approved export selections—selected from
              trusted Ghanaian production partners—without presenting those
              products as BorgaFoods manufacturing.
            </p>
          </div>
        </div>
      </section>

      {/* The BorgaFoods Brand with Images */}
      <section className="py-20">
        <div className="container">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            The BorgaFoods Brand
          </h2>
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl">
            Our current manufactured range is produced by BorgaFoods Processing
            for wholesale and export enquiries.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-6 mb-12">
            {products.map(product => (
              <Card
                key={product.name}
                className="group p-6 text-center border-border/60 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="mb-4 aspect-[4/5] overflow-hidden rounded-lg border border-border/50 bg-gradient-to-br from-secondary/15 via-background to-secondary/5 p-4 flex items-center justify-center">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <h3 className="text-xl font-bold text-primary mb-2">
                  {product.name}
                </h3>
                <p className="text-sm text-foreground">{product.summary}</p>
              </Card>
            ))}
          </div>

          <Link href="/products">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              Explore All BorgaFoods Products
              <ArrowRight size={20} className="ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Why Partner With Us */}
      <section className="py-20 bg-secondary/5">
        <div className="container">
          <h2 className="text-4xl font-bold text-foreground mb-12">
            Why Partner With Us
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {[
              {
                icon: Package,
                title: "BorgaFoods Manufacturing",
                description:
                  "A clearly identified range of Ghanaian staples manufactured by BorgaFoods Processing.",
              },
              {
                icon: Zap,
                title: "BorgaFoods Export Selection",
                description:
                  "Selected from trusted Ghanaian production partners and kept distinct from our manufactured range.",
              },
              {
                icon: TrendingUp,
                title: "Container Supply Planning",
                description:
                  "Product mix, bulk requirements, packaging, documentation, and shipment needs are reviewed per enquiry.",
              },
              {
                icon: ArrowRight,
                title: "B2B Buyer Coordination",
                description:
                  "A focused contact point for distributors, importers, wholesalers, retailers, and food-service buyers.",
              },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <Card key={index} className="p-8">
                  <Icon size={32} className="text-primary mb-4" />
                  <h3 className="text-xl font-bold text-foreground mb-3">
                    {item.title}
                  </h3>
                  <p className="text-foreground">{item.description}</p>
                </Card>
              );
            })}
          </div>

          <Link href="/about">
            <Button
              variant="outline"
              className="border-primary text-primary hover:bg-primary/5"
            >
              Learn More About Our Advantages
              <ArrowRight size={20} className="ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* What Makes BorgaFoods Different */}
      <section className="py-20">
        <div className="container">
          <h2 className="text-4xl font-bold text-foreground mb-12">
            What Makes BorgaFoods Different
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Manufacturer First",
                items: [
                  "Five current manufactured products",
                  "BorgaFoods brand",
                  "BorgaFoods Processing manufacturer",
                  "Ghana country of origin",
                ],
              },
              {
                title: "Export Selection Second",
                items: [
                  "Trusted Ghanaian production partners",
                  "Clear supply-type separation",
                  "No public supplier disclosure",
                  "Availability confirmed per enquiry",
                ],
              },
              {
                title: "Export Conversation",
                items: [
                  "Product and market requirements",
                  "Wholesale and bulk formats",
                  "Container supply planning",
                  "Documentation coordination",
                ],
              },
            ].map((section, index) => (
              <Card key={index} className="p-8">
                <h3 className="text-xl font-bold text-primary mb-6">
                  {section.title}
                </h3>
                <ul className="space-y-3">
                  {section.items.map(item => (
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
            ))}
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-20 bg-primary">
        <div className="container text-center">
          <h2 className="text-4xl font-bold mb-6 text-white">Our Mission</h2>
          <p className="text-xl mb-12 max-w-2xl mx-auto leading-relaxed text-white/90">
            To make high-quality Ghanaian staple foods accessible to
            international markets through reliable supply, honest partnerships,
            and export-focused execution.
          </p>
          <Link href="/contact">
            <Button
              size="lg"
              className="bg-primary-foreground hover:bg-primary-foreground/90 text-primary"
            >
              Start Your Partnership Today
              <ArrowRight size={20} className="ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-20 bg-secondary/5">
        <div className="container">
          <h2 className="text-4xl font-bold text-foreground mb-12 text-center">
            BorgaFoods by the Numbers
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                number: products.length.toString(),
                label: "Premium BorgaFoods Products",
              },
              { number: "2", label: "Clearly Defined Supply Models" },
              { number: "Ghana", label: "Manufacturing & Sourcing Origin" },
              { number: "B2B", label: "Wholesale & Export Focus" },
            ].map((stat, index) => (
              <Card key={index} className="p-8 text-center">
                <p className="text-5xl font-bold text-primary mb-2">
                  {stat.number}
                </p>
                <p className="text-foreground font-semibold">{stat.label}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container text-center">
          <h2 className="text-4xl font-bold text-foreground mb-6">
            Ready to Explore BorgaFoods?
          </h2>
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Whether you're looking for product samples, detailed specifications,
            or partnership opportunities, we're ready to discuss your needs.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products">
              <Button
                size="lg"
                variant="outline"
                className="border-primary text-primary hover:bg-primary/5"
              >
                View Products
              </Button>
            </Link>
            <ExportQuoteButton className="bg-primary hover:bg-primary/90 text-primary-foreground" />
          </div>
        </div>
      </section>
    </div>
  );
}
