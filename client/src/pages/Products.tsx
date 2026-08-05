import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Mail, Star } from "lucide-react";
import { Link } from "wouter";
import SEO from "@/components/SEO";
import { products, supplyTypeLabels } from "@/data/products";

export default function Products() {
  const productNames = products.map(product => product.name).join(", ");

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="BorgaFoods Products - Premium Ghanaian Staple Foods | borgafoods.com"
        description={`Explore our BorgaFoods product line: ${productNames}. Premium Ghanaian staple foods with flexible packaging and order quantities for international distributors.`}
        keywords={`${productNames}, Ghana fufu export, cassava flour wholesale, plantain flour, fermented corn flour`}
      />
      <section className="py-16 bg-gradient-to-br from-primary/5 to-background border-b border-border">
        <div className="container">
          <div className="flex items-center gap-3 mb-4">
            <Star size={32} className="text-primary fill-primary" />
            <h1 className="text-5xl font-bold text-foreground">
              The BorgaFoods Product Line
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl">
            All our products are exclusively under the BorgaFoods brand. We supply
            premium Ghanaian staple foods with complete flexibility on packaging
            sizes, formats, and order quantities.
          </p>
        </div>
      </section>

      <section className="py-16 bg-primary/5">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "One Brand, Endless Flexibility",
                description:
                  "All products are BorgaFoods. We customize packaging sizes, formats, and quantities to match your distribution strategy.",
              },
              {
                title: "Your Packaging, Your Size",
                description:
                  "Need 250g sachets? 10kg bulk bags? Custom carton sizes? We accommodate your preferred packaging specifications.",
              },
              {
                title: "Flexible Order Quantities",
                description:
                  "Whether you're testing a new market or scaling up, we work with flexible MOQs tailored to your business stage.",
              },
            ].map((item, index) => (
              <Card key={index} className="p-6 border-primary/20">
                <h3 className="text-lg font-bold text-foreground mb-3">
                  {item.title}
                </h3>
                <p className="text-foreground">{item.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container">
          <h2 className="text-4xl font-bold text-foreground mb-16">
            Our BorgaFoods Products
          </h2>
          <div className="space-y-20">
            {products.map((product, index) => (
              <div
                key={product.name}
                className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start"
              >
                <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                  <div className="flex items-center gap-2 mb-2">
                    <Star size={20} className="text-primary fill-primary" />
                    <span className="text-sm font-bold text-primary">
                      BorgaFoods Brand
                    </span>
                  </div>
                  <h2 className="text-4xl font-bold text-foreground mb-4">
                    {product.name}
                  </h2>
                  <p className="text-lg text-foreground mb-8 leading-relaxed">
                    {product.description}
                  </p>

                  <div className="mb-8">
                    <h3 className="text-lg font-bold text-foreground mb-4">
                      Available Variants
                    </h3>
                    <ul className="space-y-2">
                      {product.variants.map(variant => (
                        <li
                          key={variant}
                          className="flex items-start gap-3 text-foreground"
                        >
                          <span className="text-primary font-bold mt-1">•</span>
                          <span>{variant}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link href="/contact">
                    <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                      <Mail size={20} className="mr-2" />
                      Discuss Custom Packaging
                    </Button>
                  </Link>
                </div>

                <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                  <div className="group relative aspect-[4/5] max-w-sm mx-auto mb-8 flex items-center justify-center overflow-hidden rounded-xl border border-border/60 bg-gradient-to-br from-secondary/15 via-background to-secondary/5 p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>

                  <Card className="p-8">
                    <h3 className="text-lg font-bold text-foreground mb-6">
                      Product Details
                    </h3>
                    <div className="space-y-4">
                      {Object.entries({
                        ...(product.supplyType === "manufactured"
                          ? {
                              Brand: product.brand,
                              Manufacturer: product.manufacturer,
                            }
                          : {}),
                        Category: product.category,
                        "Supply Type": supplyTypeLabels[product.supplyType],
                        "Standard Retail Sizes": `${product.packagingSizes.join(", ")} (customizable)`,
                        "Bulk Options": product.bulkPackagingSizes.join(", "),
                        "Shelf Life": product.shelfLife,
                        Storage: product.storage,
                        Certification: product.certification,
                        Origin: product.countryOfOrigin,
                        "Export Availability": product.exportAvailable
                          ? "Available"
                          : "Not available",
                        "Wholesale Availability": product.wholesaleAvailable
                          ? "Available"
                          : "Not available",
                      }).map(([key, value]) => (
                        <div
                          key={key}
                          className="border-b border-border pb-4 last:border-b-0"
                        >
                          <p className="text-sm font-semibold text-muted-foreground mb-1">
                            {key}
                          </p>
                          <p className="text-foreground font-medium">{value}</p>
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-secondary/5">
        <div className="container">
          <h2 className="text-4xl font-bold text-foreground mb-12">
            Flexible Packaging & Sizing
          </h2>
          <p className="text-lg text-foreground mb-12 max-w-3xl">
            The standard sizes listed above are our baseline offerings. However,
            we understand that different markets have different needs. We are
            fully flexible on:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <Card className="p-8">
              <h3 className="text-2xl font-bold text-foreground mb-6">
                Packaging Customization
              </h3>
              <ul className="space-y-4">
                {[
                  "Custom net weight options (any size you need)",
                  "Different packaging materials (pouches, boxes, cans, etc.)",
                  "Custom carton configurations",
                  "Branded packaging with your design",
                  "Multi-language labeling",
                  "Regulatory compliance for destination markets",
                ].map(item => (
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

            <Card className="p-8">
              <h3 className="text-2xl font-bold text-foreground mb-6">
                Order Quantity Flexibility
              </h3>
              <ul className="space-y-4">
                {[
                  "No fixed minimum order quantities",
                  "Flexible MOQs based on your business needs",
                  "Smaller orders for market testing",
                  "Larger bulk orders with volume pricing",
                  "Scalable supply as your market grows",
                  "Consistent quality at any order size",
                ].map(item => (
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
          </div>

          <Card className="p-8 bg-primary/5 border-primary">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              How It Works
            </h3>
            <p className="text-lg text-foreground mb-6">
              When you contact us with your requirements, we discuss:
            </p>
            <ol className="space-y-3 text-foreground">
              <li className="flex items-start gap-3">
                <span className="font-bold text-primary">1.</span>
                <span>Your target market and customer preferences</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-bold text-primary">2.</span>
                <span>Desired packaging size and format</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-bold text-primary">3.</span>
                <span>Initial order quantity and growth projections</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-bold text-primary">4.</span>
                <span>Labeling, compliance, and regulatory needs</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-bold text-primary">5.</span>
                <span>We provide a customized quote and timeline</span>
              </li>
            </ol>
          </Card>
        </div>
      </section>

      <section className="py-20">
        <div className="container">
          <h2 className="text-4xl font-bold text-foreground mb-12">
            BorgaFoods Quality Standards
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-8">
              <h3 className="text-xl font-bold text-primary mb-4">
                One Brand, One Standard
              </h3>
              <p className="text-foreground">
                Whether it's 500g or 50kg, every BorgaFoods product meets the same
                rigorous quality standards and export specifications.
              </p>
            </Card>

            <Card className="p-8">
              <h3 className="text-xl font-bold text-primary mb-4">
                Compliance Ready
              </h3>
              <p className="text-foreground">
                All BorgaFoods products meet Ghana FDA compliance standards and are
                suitable for export to international markets.
              </p>
            </Card>

            <Card className="p-8">
              <h3 className="text-xl font-bold text-primary mb-4">
                Shelf Stability
              </h3>
              <p className="text-foreground">
                Products are processed with attention to shelf life and
                stability, suitable for long-distance export and storage.
              </p>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4 text-white">
            Ready to Partner with BorgaFoods?
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto text-white/90">
            Contact us to discuss your custom packaging requirements, order
            quantities, and market needs.
          </p>
          <Link href="/contact">
            <Button
              size="lg"
              className="bg-primary-foreground hover:bg-primary-foreground/90 text-primary"
            >
              Get in Touch
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
