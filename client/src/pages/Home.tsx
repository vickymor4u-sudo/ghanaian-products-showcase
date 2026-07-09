import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Zap, Package, TrendingUp } from "lucide-react";
import { Link } from "wouter";
import SEO from "@/components/SEO";
import SchemaMarkup from "@/components/SchemaMarkup";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="borgafoods.com - Premium Ghanaian Staple Foods for Export"
        description="Export-ready fufu, gari, kokonte, and banku products sourced and processed in Ghana. Supply & Demand Worldwide Ltd serves distributors, wholesalers, and food importers across Africa, Asia, the Middle East, and beyond."
        keywords="Ghana food export, fufu wholesale, gari export, kokonte, banku, African food distributor, West African staples, Borga products, Ghana food supplier"
      />
      <SchemaMarkup type="organization" />
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent" />
        <div className="container relative z-10">
          <div className="max-w-3xl">
            <div className="inline-block mb-6 px-4 py-2 bg-primary/10 rounded-full border border-primary/20">
              <span className="text-sm font-semibold text-primary">B2B Export Solutions</span>
            </div>

            <h1 className="text-6xl md:text-7xl font-bold text-foreground mb-6 leading-tight">
              Premium Ghanaian Staple Foods for International Markets
            </h1>

            <p className="text-xl text-muted-foreground mb-8 leading-relaxed max-w-2xl">
              Export-ready fufu, gari, kokonte, and banku products sourced and processed in Ghana for global distribution.
            </p>

            <p className="text-lg text-foreground mb-12 max-w-2xl">
              Serving distributors, wholesalers, and food importers across Africa, Asia, the Middle East, and beyond.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  Request Product Catalog
                  <ArrowRight size={20} className="ml-2" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/5">
                  Become a Distribution Partner
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
            <h2 className="text-4xl font-bold text-foreground mb-6">Who We Are</h2>
            <p className="text-lg text-foreground mb-6 leading-relaxed">
              <strong>Supply & Demand Worldwide Ltd</strong> is a Ghana-focused food export company specializing in traditional West African staple foods adapted for modern international markets.
            </p>
            <p className="text-lg text-foreground mb-6 leading-relaxed">
              Through our flagship brand—<strong>Borga</strong>—we supply consistent, export-standard products to partners seeking reliable African food products for diaspora and emerging consumer markets.
            </p>
            <p className="text-lg text-foreground leading-relaxed">
              We operate across two strategic regions: <strong>Ghana</strong> (sourcing, processing coordination, and export origin) and <strong>China</strong> (market intelligence, distribution experience, and international trade operations). This structure allows us to bridge African production with international market expectations.
            </p>
          </div>
        </div>
      </section>

      {/* The Borga Brand with Images */}
      <section className="py-20">
        <div className="container">
          <h2 className="text-4xl font-bold text-foreground mb-4">The Borga Brand</h2>
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl">
            All our products are exclusively under the Borga brand. We supply premium quality with complete flexibility on packaging, sizing, and order quantities.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-6 mb-12">
            {[
              { name: "Fufu Borga", desc: "Premium plantain & cassava flour", image: "/images/fufu-borga.png" },
              { name: "Gari Borga", desc: "Clean cassava granules", image: "/images/gari-borga.png" },
              { name: "Kokonte Borga", desc: "Traditional cassava flour", image: "/images/kokonte-borga.png" },
              { name: "Banku Borga", desc: "Fermented corn & cassava blend", image: "/images/banku-borga.png" },
              { name: "Cassava Flour", desc: "Pure milled cassava for fufu", image: "/images/cassava-flour.png" },
            ].map((product) => (
              <Card key={product.name} className="group p-6 text-center border-border/60 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <div className="mb-4 aspect-[4/5] overflow-hidden rounded-lg border border-border/50 bg-gradient-to-br from-secondary/15 via-background to-secondary/5 p-4 flex items-center justify-center">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <h3 className="text-xl font-bold text-primary mb-2">{product.name}</h3>
                <p className="text-sm text-foreground">{product.desc}</p>
              </Card>
            ))}
          </div>

          <Link href="/products">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              Explore All Borga Products
              <ArrowRight size={20} className="ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Why Partner With Us */}
      <section className="py-20 bg-secondary/5">
        <div className="container">
          <h2 className="text-4xl font-bold text-foreground mb-12">Why Partner With Us</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {[
              {
                icon: Package,
                title: "One Brand, Endless Flexibility",
                description: "All products are Borga. We customize packaging sizes, formats, and quantities to match your distribution strategy.",
              },
              {
                icon: Zap,
                title: "Flexible Minimum Order Quantities",
                description: "No fixed MOQs. We work with you to find the right order size for your business stage and market strategy.",
              },
              {
                icon: TrendingUp,
                title: "Export-Focused Production",
                description: "Our operations are structured specifically for international trade with proven experience serving Asian and global markets.",
              },
              {
                icon: ArrowRight,
                title: "Long-Term Partnerships",
                description: "We focus on repeat supply, consistency, and trust. We grow with our partners, not ahead of them.",
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

          <Link href="/about">
            <Button variant="outline" className="border-primary text-primary hover:bg-primary/5">
              Learn More About Our Advantages
              <ArrowRight size={20} className="ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* What Makes Borga Different */}
      <section className="py-20">
        <div className="container">
          <h2 className="text-4xl font-bold text-foreground mb-12">What Makes Borga Different</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Ghana-Sourced & Processed",
                items: [
                  "Direct access to quality raw materials",
                  "Controlled production standards",
                  "Transparent supply chain",
                  "Export-ready from day one",
                ],
              },
              {
                title: "Complete Customization",
                items: [
                  "Custom packaging sizes",
                  "Flexible order quantities",
                  "Private label options",
                  "OEM capabilities",
                ],
              },
              {
                title: "International Experience",
                items: [
                  "Proven Asia market presence",
                  "Export documentation expertise",
                  "Logistics coordination",
                  "Regulatory compliance support",
                ],
              },
            ].map((section, index) => (
              <Card key={index} className="p-8">
                <h3 className="text-xl font-bold text-primary mb-6">{section.title}</h3>
                <ul className="space-y-3">
                  {section.items.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-foreground">
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
            To make high-quality Ghanaian staple foods accessible to international markets through reliable supply, honest partnerships, and export-focused execution.
          </p>
          <Link href="/contact">
            <Button size="lg" className="bg-primary-foreground hover:bg-primary-foreground/90 text-primary">
              Start Your Partnership Today
              <ArrowRight size={20} className="ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-20 bg-secondary/5">
        <div className="container">
          <h2 className="text-4xl font-bold text-foreground mb-12 text-center">Borga by the Numbers</h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { number: "4", label: "Premium Borga Products" },
              { number: "100%", label: "Ghana-Sourced & Processed" },
              { number: "Flexible", label: "Custom Packaging Options" },
              { number: "Global", label: "Export Destinations" },
            ].map((stat, index) => (
              <Card key={index} className="p-8 text-center">
                <p className="text-5xl font-bold text-primary mb-2">{stat.number}</p>
                <p className="text-foreground font-semibold">{stat.label}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container text-center">
          <h2 className="text-4xl font-bold text-foreground mb-6">Ready to Explore Borga?</h2>
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Whether you're looking for product samples, detailed specifications, or partnership opportunities, we're ready to discuss your needs.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products">
              <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/5">
                View Products
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Contact Us
                <ArrowRight size={20} className="ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
