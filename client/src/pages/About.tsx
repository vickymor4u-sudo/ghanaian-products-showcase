import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Users, Globe, Zap } from "lucide-react";
import SEO from "@/components/SEO";

/**
 * About Page
 * Design: Professional company positioning
 * - Company story and mission
 * - Competitive advantages
 * - Partnership approach
 */
export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="About Us - Supply & Demand Worldwide Ltd | borgafoods.com"
        description="Learn about Supply & Demand Worldwide Ltd, a Ghana-focused food export company established in 2013. We specialize in exporting premium Borga brand staple foods to international markets."
        keywords="Supply & Demand Worldwide Ltd, Ghana food exporter, Borga brand, African food export company, Ghana to Asia food trade"
      />
      {/* Header */}
      <section className="py-16 bg-gradient-to-br from-primary/5 to-background border-b border-border">
        <div className="container">
          <h1 className="text-5xl font-bold text-foreground mb-4">About Supply & Demand Worldwide Ltd</h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Professional export solutions connecting quality Ghanaian producers with international markets.
          </p>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-20">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-foreground mb-6">Our Story</h2>
              <p className="text-lg text-foreground mb-4 leading-relaxed">
                Supply & Demand Worldwide Limited is a legally registered limited liability company in Ghana, established in 2013. With over a decade of trading experience, we specialize in exporting traditional West African staple foods to global markets through our flagship Borga brand.
              </p>
              <p className="text-lg text-foreground mb-4 leading-relaxed">
                We operate international trading activities with operational presence in both Ghana (Tema) and China (Hangzhou), allowing us to bridge African production with international market expectations.
              </p>
              <p className="text-lg text-foreground mb-6 leading-relaxed">
                With over a decade of trading experience, we serve diaspora-focused and specialty food markets across Asia and Africa, supported by scalable sourcing and logistics partners.
              </p>
              <a href="/contact" className="inline-block">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  Contact Us
                </Button>
              </a>
            </div>
            <div className="bg-secondary/10 rounded-lg p-8 border border-border">
              <h3 className="text-2xl font-bold text-foreground mb-6">Key Facts</h3>
              <div className="space-y-4">
                <div className="pb-4 border-b border-border">
                  <p className="text-sm text-muted-foreground mb-1">Established</p>
                  <p className="text-3xl font-bold text-primary">2013</p>
                </div>
                <div className="pb-4 border-b border-border">
                  <p className="text-sm text-muted-foreground mb-1">Trading Experience</p>
                  <p className="text-3xl font-bold text-primary">10+ Years</p>
                </div>
                <div className="pb-4 border-b border-border">
                  <p className="text-sm text-muted-foreground mb-1">Operations</p>
                  <p className="text-xl font-bold text-primary">Ghana & China</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Languages</p>
                  <p className="text-xl font-bold text-primary">English, Chinese</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Value Chain */}
      <section className="py-20 bg-secondary/5">
        <div className="container">
          <h2 className="text-4xl font-bold text-foreground mb-12">Our Value Chain</h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                step: "1",
                title: "Sourcing",
                description: "Direct relationships with quality producers across Ghana",
              },
              {
                step: "2",
                title: "Production",
                description: "Manufacturing to international standards with quality control",
              },
              {
                step: "3",
                title: "Quality Assurance",
                description: "Rigorous testing and FDA compliance verification",
              },
              {
                step: "4",
                title: "Export & Logistics",
                description: "Professional handling and reliable delivery to international partners",
              },
            ].map((item) => (
              <Card key={item.step} className="p-6 text-center">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-foreground">{item.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Competitive Advantages */}
      <section className="py-20">
        <div className="container">
          <h2 className="text-4xl font-bold text-foreground mb-12">Why Partner With Us</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                icon: CheckCircle,
                title: "Standardized Quality",
                description: "Consistent product specifications across all batches. Every product meets international standards.",
              },
              {
                icon: Users,
                title: "Export Experience",
                description: "Proven track record with international markets. We understand customs, compliance, and logistics.",
              },
              {
                icon: Zap,
                title: "Flexible MOQs",
                description: "Scalable solutions for distributors of all sizes. From 500 kg to full container loads.",
              },
              {
                icon: Globe,
                title: "Global Presence",
                description: "Operations in Ghana and China. Strategic positioning for both supply and market access.",
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <Card key={item.title} className="p-8 hover:shadow-md transition-shadow">
                  <Icon size={32} className="text-primary mb-4" />
                  <h3 className="text-xl font-bold text-foreground mb-3">{item.title}</h3>
                  <p className="text-foreground">{item.description}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Partnership Philosophy */}
      <section className="py-20 bg-secondary/5">
        <div className="container">
          <h2 className="text-4xl font-bold text-foreground mb-12">Our Partnership Philosophy</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-8">
              <h3 className="text-2xl font-bold text-primary mb-4">Transparent Communication</h3>
              <p className="text-foreground mb-4">
                We believe in clear, honest communication. No hidden costs, no exaggerated claims. You know exactly what you're getting.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-foreground">
                  <CheckCircle size={16} className="text-primary flex-shrink-0 mt-0.5" />
                  Clear pricing and terms
                </li>
                <li className="flex items-start gap-2 text-sm text-foreground">
                  <CheckCircle size={16} className="text-primary flex-shrink-0 mt-0.5" />
                  Regular updates on orders
                </li>
                <li className="flex items-start gap-2 text-sm text-foreground">
                  <CheckCircle size={16} className="text-primary flex-shrink-0 mt-0.5" />
                  Responsive to inquiries
                </li>
              </ul>
            </Card>

            <Card className="p-8">
              <h3 className="text-2xl font-bold text-primary mb-4">Long-Term Partnerships</h3>
              <p className="text-foreground mb-4">
                We're not interested in one-off transactions. We build lasting relationships with our partners based on trust and mutual success.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-foreground">
                  <CheckCircle size={16} className="text-primary flex-shrink-0 mt-0.5" />
                  Dedicated account management
                </li>
                <li className="flex items-start gap-2 text-sm text-foreground">
                  <CheckCircle size={16} className="text-primary flex-shrink-0 mt-0.5" />
                  Flexible terms for loyal partners
                </li>
                <li className="flex items-start gap-2 text-sm text-foreground">
                  <CheckCircle size={16} className="text-primary flex-shrink-0 mt-0.5" />
                  Priority for new products
                </li>
              </ul>
            </Card>

            <Card className="p-8">
              <h3 className="text-2xl font-bold text-primary mb-4">Mutual Growth</h3>
              <p className="text-foreground mb-4">
                Your success is our success. We invest in understanding your market and helping you grow your business.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-foreground">
                  <CheckCircle size={16} className="text-primary flex-shrink-0 mt-0.5" />
                  Market insights and support
                </li>
                <li className="flex items-start gap-2 text-sm text-foreground">
                  <CheckCircle size={16} className="text-primary flex-shrink-0 mt-0.5" />
                  Customization for your needs
                </li>
                <li className="flex items-start gap-2 text-sm text-foreground">
                  <CheckCircle size={16} className="text-primary flex-shrink-0 mt-0.5" />
                  Collaborative problem-solving
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary">
        <div className="container text-center">
          <h2 className="text-4xl font-bold mb-6 text-white">Ready to Partner With Us?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto text-white/90">
            Let's discuss how we can support your import business with quality Ghanaian products.
          </p>
          <Button size="lg" className="bg-primary-foreground hover:bg-primary-foreground/90 text-primary">
            Get in Touch
          </Button>
        </div>
      </section>
    </div>
  );
}
