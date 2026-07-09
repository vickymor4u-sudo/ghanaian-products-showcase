import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, FileText, Image, Package } from "lucide-react";

/**
 * Media & Downloads Page
 * Design: Professional resource center
 * - Product photos and packaging mockups
 * - Downloadable catalogs and documents
 * - Resources for buyer presentations
 */
export default function Media() {
  const resources = [
    {
      category: "Product Catalogs",
      icon: FileText,
      items: [
        { name: "Complete Product Catalog 2024", type: "PDF", size: "2.4 MB" },
        { name: "Product Specifications Sheet", type: "PDF", size: "1.8 MB" },
        { name: "Pricing & MOQ Guide", type: "PDF", size: "0.9 MB" },
      ],
    },
    {
      category: "Product Images",
      icon: Image,
      items: [
        { name: "Product Photography Pack", type: "ZIP", size: "45 MB" },
        { name: "Packaging Mockups", type: "ZIP", size: "28 MB" },
        { name: "Lifestyle & Usage Images", type: "ZIP", size: "32 MB" },
      ],
    },
    {
      category: "Compliance Documents",
      icon: FileText,
      items: [
        { name: "FDA Compliance Certificates", type: "PDF", size: "1.2 MB" },
        { name: "Quality Assurance Reports", type: "PDF", size: "2.1 MB" },
        { name: "Ingredient Certifications", type: "PDF", size: "0.8 MB" },
      ],
    },
    {
      category: "Export Documentation",
      icon: Package,
      items: [
        { name: "Export Terms & Conditions", type: "PDF", size: "0.6 MB" },
        { name: "Logistics & Shipping Guide", type: "PDF", size: "1.3 MB" },
        { name: "Customs Documentation Template", type: "PDF", size: "0.5 MB" },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="py-16 bg-gradient-to-br from-primary/5 to-background border-b border-border">
        <div className="container">
          <h1 className="text-5xl font-bold text-foreground mb-4">Media & Downloads</h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Professional resources to support your business presentations and buyer communications. All materials are free to download.
          </p>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="py-20">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {resources.map((resource) => {
              const Icon = resource.icon;
              return (
                <Card key={resource.category} className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <Icon size={32} className="text-primary" />
                    <h3 className="text-2xl font-bold text-foreground">{resource.category}</h3>
                  </div>

                  <div className="space-y-4">
                    {resource.items.map((item) => (
                      <div
                        key={item.name}
                        className="flex items-center justify-between p-4 bg-secondary/5 rounded border border-border hover:bg-secondary/10 transition-colors"
                      >
                        <div className="flex-1">
                          <p className="font-semibold text-foreground">{item.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {item.type} • {item.size}
                          </p>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-primary text-primary hover:bg-primary/5"
                        >
                          <Download size={16} className="mr-2" />
                          Download
                        </Button>
                      </div>
                    ))}
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Bulk Download */}
          <Card className="p-8 bg-primary/5 border-2 border-primary">
            <h3 className="text-2xl font-bold text-foreground mb-4">Download Everything</h3>
            <p className="text-foreground mb-6">
              Get all resources in one convenient package. Perfect for presentations and internal team sharing.
            </p>
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Download size={20} className="mr-2" />
              Download Complete Media Kit (125 MB)
            </Button>
          </Card>
        </div>
      </section>

      {/* Image Gallery */}
      <section className="py-20 bg-secondary/5">
        <div className="container">
          <h2 className="text-4xl font-bold text-foreground mb-12">Product Photography</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Fufu Borga", image: "/images/fufu-product.png" },
              { name: "Banku Borga", image: "/images/banku-product.png" },
              { name: "Gari & Kokonte", image: "/images/gari-kokonte.png" },
              { name: "Hero Background", image: "/images/hero-background.png" },
            ].map((photo) => (
              <Card key={photo.name} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-square bg-secondary/10 flex items-center justify-center overflow-hidden">
                  <img
                    src={photo.image}
                    alt={photo.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform"
                  />
                </div>
                <div className="p-4">
                  <p className="font-semibold text-foreground mb-3">{photo.name}</p>
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full border-primary text-primary hover:bg-primary/5"
                  >
                    <Download size={16} className="mr-2" />
                    Download
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Resources */}
      <section className="py-20">
        <div className="container">
          <h2 className="text-4xl font-bold text-foreground mb-12">Additional Resources</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-8">
              <h3 className="text-xl font-bold text-primary mb-4">Buyer Presentation Template</h3>
              <p className="text-foreground mb-4">
                PowerPoint template with our branding, product information, and export details. Customize for your presentations.
              </p>
              <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary/5">
                <Download size={16} className="mr-2" />
                Download Template
              </Button>
            </Card>

            <Card className="p-8">
              <h3 className="text-xl font-bold text-primary mb-4">Product Comparison Chart</h3>
              <p className="text-foreground mb-4">
                Side-by-side comparison of all four product lines with specifications, MOQs, and pricing.
              </p>
              <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary/5">
                <Download size={16} className="mr-2" />
                Download Chart
              </Button>
            </Card>

            <Card className="p-8">
              <h3 className="text-xl font-bold text-primary mb-4">Brand Guidelines</h3>
              <p className="text-foreground mb-4">
                Official brand guidelines for partners using our products in their marketing materials.
              </p>
              <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary/5">
                <Download size={16} className="mr-2" />
                Download Guidelines
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container text-center">
          <h2 className="text-4xl font-bold mb-6">Need Custom Materials?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            We can create custom product photos, packaging designs, or marketing materials for your specific needs.
          </p>
          <Button size="lg" className="bg-primary-foreground hover:bg-primary-foreground/90 text-primary">
            Request Custom Materials
          </Button>
        </div>
      </section>
    </div>
  );
}
