import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useState } from "react";
import SEO from "@/components/SEO";
import { products } from "@/data/products";
import { createExportEnquiryMailto, EXPORT_ENQUIRY_EMAIL } from "@/config/site";

export default function Contact() {
  const [formData, setFormData] = useState(() => ({
    inquiryType:
      new URLSearchParams(window.location.search).get("inquiry") ===
      "export-quote"
        ? "export_quote"
        : "general",
    companyName: "",
    country: "",
    contactPerson: "",
    email: "",
    productsInterest: "",
    orderVolume: "",
    message: "",
  }));

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedProduct = products.find(
      product => product.slug === formData.productsInterest
    );
    const productLabel =
      formData.productsInterest === "all"
        ? "All current products"
        : selectedProduct?.name || formData.productsInterest;
    const subject =
      formData.inquiryType === "export_quote"
        ? `Export quote request — ${formData.companyName}`
        : `Business enquiry — ${formData.companyName}`;
    const body = [
      `Inquiry type: ${formData.inquiryType.replace("_", " ")}`,
      `Company: ${formData.companyName}`,
      `Country / market: ${formData.country}`,
      `Contact person: ${formData.contactPerson}`,
      `Reply email: ${formData.email}`,
      `Products: ${productLabel}`,
      `Estimated volume: ${formData.orderVolume}`,
      "",
      "Additional information:",
      formData.message || "Not provided",
    ].join("\n");

    window.location.href = createExportEnquiryMailto(subject, body);
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Export & Wholesale Enquiries | BorgaFoods"
        description={`Contact BorgaFoods for export quotations, wholesale supply, distributor partnerships, and Ghanaian product enquiries at ${EXPORT_ENQUIRY_EMAIL}.`}
        keywords="contact BorgaFoods, Ghana food exporter contact, wholesale inquiry, distributor contact, food import inquiry"
      />
      <section className="py-16 bg-gradient-to-br from-primary/5 to-background border-b border-border">
        <div className="container">
          <h1 className="text-5xl font-bold text-foreground mb-4">
            Let's Discuss Your Market Needs
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            We welcome inquiries from distributors, importers, wholesalers,
            retail chains, and food service suppliers. Get in touch to discuss
            partnership opportunities.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Information */}
            <div className="lg:col-span-1">
              <h2 className="text-3xl font-bold text-foreground mb-8">
                Contact Information
              </h2>

              <div className="space-y-8">
                <div>
                  <div className="flex items-center gap-4 mb-3">
                    <MapPin size={24} className="text-primary" />
                    <h3 className="text-lg font-bold text-foreground">
                      🇬🇭 Ghana Office
                    </h3>
                  </div>
                  <div className="ml-10 space-y-2">
                    <p className="text-foreground font-semibold">
                      Supply & Demand Worldwide Ltd.
                    </p>
                    <p className="text-foreground">
                      C 16 Sakumono Estate Junction Site 8
                    </p>
                    <p className="text-foreground">
                      Tema, Greater Accra Region, Ghana
                    </p>
                    <p className="text-foreground mt-3">
                      <a
                        href="tel:+233555362208"
                        className="text-primary hover:underline"
                      >
                        +233 555 362 208
                      </a>
                    </p>
                    <p className="text-foreground">
                      <a
                        href="https://wa.me/233533763700"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        +233 533 763 700 (WhatsApp)
                      </a>
                    </p>
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-4 mb-3">
                    <MapPin size={24} className="text-primary" />
                    <h3 className="text-lg font-bold text-foreground">
                      🇨🇳 China Office
                    </h3>
                  </div>
                  <div className="ml-10 space-y-2">
                    <p className="text-foreground">
                      Hangzhou, Zhejiang Province
                    </p>
                    <p className="text-foreground mt-3">
                      <a
                        href="tel:+8613516818572"
                        className="text-primary hover:underline"
                      >
                        +86 135 1681 8572
                      </a>
                    </p>
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-4 mb-3">
                    <Mail size={24} className="text-primary" />
                    <h3 className="text-lg font-bold text-foreground">Email</h3>
                  </div>
                  <p className="text-foreground ml-10">
                    <a
                      href={`mailto:${EXPORT_ENQUIRY_EMAIL}`}
                      className="text-primary hover:underline"
                    >
                      {EXPORT_ENQUIRY_EMAIL}
                    </a>
                  </p>
                </div>
              </div>

              <Card className="mt-12 p-6 bg-primary/5 border-primary">
                <h3 className="font-bold text-foreground mb-3">
                  Business Hours
                </h3>
                <p className="text-sm text-foreground mb-3">
                  Monday–Friday: 09:00–17:00 (GMT)
                </p>
                <p className="text-sm text-foreground">
                  Export enquiries are reviewed according to product, market,
                  packaging, volume, and destination requirements.
                </p>
              </Card>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card id="business-inquiry" className="p-8">
                <h2 className="text-2xl font-bold text-foreground mb-6">
                  {formData.inquiryType === "export_quote"
                    ? "Request Export Quote"
                    : "Business Inquiry Form"}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Inquiry Type *
                    </label>
                    <select
                      name="inquiryType"
                      value={formData.inquiryType}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="general">General business inquiry</option>
                      <option value="export_quote">Export quotation</option>
                      <option value="wholesale">Wholesale supply</option>
                      <option value="distribution">
                        Distributor partnership
                      </option>
                    </select>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">
                        Company Name *
                      </label>
                      <input
                        type="text"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Your company name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">
                        Country / Market *
                      </label>
                      <input
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Your target market"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">
                        Contact Person *
                      </label>
                      <input
                        type="text"
                        name="contactPerson"
                        value={formData.contactPerson}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">
                        Products of Interest *
                      </label>
                      <select
                        name="productsInterest"
                        value={formData.productsInterest}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="">Select products</option>
                        {products.map(product => (
                          <option key={product.slug} value={product.slug}>
                            {product.name}
                          </option>
                        ))}
                        <option value="all">All Products</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">
                        Estimated Order Volume *
                      </label>
                      <input
                        type="text"
                        name="orderVolume"
                        value={formData.orderVolume}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="e.g., 5 metric tons"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Additional Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Tell us more about your business and requirements..."
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    <Send size={20} className="mr-2" />
                    Prepare Email Enquiry
                  </Button>
                  <p className="text-sm text-muted-foreground text-center">
                    This form prepares an email to {EXPORT_ENQUIRY_EMAIL} in
                    your email application. It does not submit data to a website
                    server.
                  </p>
                </form>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Why Contact Us */}
      <section className="py-20 bg-secondary/5">
        <div className="container">
          <h2 className="text-4xl font-bold text-foreground mb-12">
            Why Get in Touch
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Export Quotations",
                description:
                  "Share product, packaging, volume, market, and destination requirements for quotation review.",
              },
              {
                title: "Wholesale Supply",
                description:
                  "Discuss current BorgaFoods manufactured products, available formats, and bulk requirements.",
              },
              {
                title: "Partnership Opportunities",
                description:
                  "Discuss your market, sales channels, product priorities, and distribution plans.",
              },
              {
                title: "Export Support",
                description:
                  "Learn about our export capabilities, logistics coordination, and compliance support.",
              },
              {
                title: "Export Selection",
                description:
                  "Ask about approved categories selected from trusted Ghanaian production partners.",
              },
              {
                title: "Container Enquiries",
                description:
                  "Review eligible product mixes, bulk needs, documentation, and shipment planning.",
              },
            ].map((item, index) => (
              <Card key={index} className="p-6">
                <h3 className="text-lg font-bold text-foreground mb-3">
                  {item.title}
                </h3>
                <p className="text-foreground">{item.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20">
        <div className="container max-w-3xl">
          <h2 className="text-4xl font-bold text-foreground mb-12">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            {[
              {
                q: "What is the minimum order quantity?",
                a: "MOQ varies by product and customization requirements. Contact us with your specific needs for a quote.",
              },
              {
                q: "How long does production take?",
                a: "Lead time is confirmed per quotation because it depends on product, volume, packaging, sourcing, documentation, and logistics.",
              },
              {
                q: "Can I request wholesale or bulk packaging?",
                a: "Yes. Available retail and bulk formats are listed on the Products page, and additional requirements can be reviewed during quotation.",
              },
              {
                q: "Can I request a mixed container?",
                a: "Mixed container requirements can be reviewed for eligible manufactured products and approved export selections. Availability is confirmed per enquiry.",
              },
              {
                q: "Can you customize products for my market?",
                a: "Packaging and labeling requirements can be reviewed against product availability and destination-market information before quotation.",
              },
              {
                q: "How do I request product samples?",
                a: `Email ${EXPORT_ENQUIRY_EMAIL} or use the enquiry form above to describe the products and market you are evaluating.`,
              },
            ].map((item, index) => (
              <Card key={index} className="p-6">
                <h3 className="font-bold text-foreground mb-2">{item.q}</h3>
                <p className="text-foreground">{item.a}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
