import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useState } from "react";
import SEO from "@/components/SEO";

export default function Contact() {
  const [formData, setFormData] = useState({
    companyName: "",
    country: "",
    contactPerson: "",
    email: "",
    productsInterest: "",
    orderVolume: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Thank you for your inquiry. We will contact you shortly.");
    setFormData({
      companyName: "",
      country: "",
      contactPerson: "",
      email: "",
      productsInterest: "",
      orderVolume: "",
      message: "",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Contact Us - Get in Touch | borgafoods.com"
        description="Contact Supply & Demand Worldwide Ltd for Borga product inquiries. Ghana office: +233 555 362 208 | China office: +86 135 1681 8572 | Email: vickymor4u@gmail.com"
        keywords="contact Borga foods, Ghana food exporter contact, wholesale inquiry, distributor contact, food import inquiry"
      />
      <section className="py-16 bg-gradient-to-br from-primary/5 to-background border-b border-border">
        <div className="container">
          <h1 className="text-5xl font-bold text-foreground mb-4">Let's Discuss Your Market Needs</h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            We welcome inquiries from distributors, importers, wholesalers, retail chains, and food service suppliers. Get in touch to discuss partnership opportunities.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Information */}
            <div className="lg:col-span-1">
              <h2 className="text-3xl font-bold text-foreground mb-8">Contact Information</h2>

              <div className="space-y-8">
                <div>
                  <div className="flex items-center gap-4 mb-3">
                    <MapPin size={24} className="text-primary" />
                    <h3 className="text-lg font-bold text-foreground">🇬🇭 Ghana Office</h3>
                  </div>
                  <div className="ml-10 space-y-2">
                    <p className="text-foreground font-semibold">Supply & Demand Worldwide Ltd.</p>
                    <p className="text-foreground">C 16 Sakumono Estate Junction Site 8</p>
                    <p className="text-foreground">Tema, Greater Accra Region, Ghana</p>
                    <p className="text-foreground mt-3">
                      <a href="tel:+233555362208" className="text-primary hover:underline">+233 555 362 208</a>
                    </p>
                    <p className="text-foreground">
                      <a href="https://wa.me/233533763700" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                        +233 533 763 700 (WhatsApp)
                      </a>
                    </p>
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-4 mb-3">
                    <MapPin size={24} className="text-primary" />
                    <h3 className="text-lg font-bold text-foreground">🇨🇳 China Office</h3>
                  </div>
                  <div className="ml-10 space-y-2">
                    <p className="text-foreground">Hangzhou, Zhejiang Province</p>
                    <p className="text-foreground mt-3">
                      <a href="tel:+8613516818572" className="text-primary hover:underline">+86 135 1681 8572</a>
                    </p>
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-4 mb-3">
                    <Mail size={24} className="text-primary" />
                    <h3 className="text-lg font-bold text-foreground">Email</h3>
                  </div>
                  <p className="text-foreground ml-10">
                    <a href="mailto:vickymor4u@gmail.com" className="text-primary hover:underline">
                      vickymor4u@gmail.com
                    </a>
                  </p>
                </div>
              </div>

              <Card className="mt-12 p-6 bg-primary/5 border-primary">
                <h3 className="font-bold text-foreground mb-3">Business Hours</h3>
                <p className="text-sm text-foreground mb-3">
                  Monday–Friday: 09:00–17:00 (GMT)
                </p>
                <p className="text-sm text-foreground">
                  <strong>Response Time:</strong> Within 24 business hours. For urgent matters, contact us via WhatsApp.
                </p>
              </Card>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="p-8">
                <h2 className="text-2xl font-bold text-foreground mb-6">Business Inquiry Form</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">Company Name *</label>
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
                      <label className="block text-sm font-semibold text-foreground mb-2">Country / Market *</label>
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
                      <label className="block text-sm font-semibold text-foreground mb-2">Contact Person *</label>
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
                      <label className="block text-sm font-semibold text-foreground mb-2">Email Address *</label>
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
                      <label className="block text-sm font-semibold text-foreground mb-2">Products of Interest *</label>
                      <select
                        name="productsInterest"
                        value={formData.productsInterest}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="">Select products</option>
                        <option value="fufu">Fufu Borga</option>
                        <option value="gari">Gari Borga</option>
                        <option value="kokonte">Kokonte Borga</option>
                        <option value="banku">Banku Borga</option>
                        <option value="all">All Products</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">Estimated Order Volume *</label>
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
                    <label className="block text-sm font-semibold text-foreground mb-2">Additional Message</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Tell us more about your business and requirements..."
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                    <Send size={20} className="mr-2" />
                    Submit Inquiry
                  </Button>
                </form>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Why Contact Us */}
      <section className="py-20 bg-secondary/5">
        <div className="container">
          <h2 className="text-4xl font-bold text-foreground mb-12">Why Get in Touch</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Product Samples",
                description: "Request samples of any Borga product to evaluate quality and taste before placing orders.",
              },
              {
                title: "Detailed Specifications",
                description: "Receive comprehensive product specifications, MOQ details, and pricing information.",
              },
              {
                title: "Partnership Opportunities",
                description: "Discuss exclusive distribution rights, private label options, and OEM customization.",
              },
              {
                title: "Export Support",
                description: "Learn about our export capabilities, logistics coordination, and compliance support.",
              },
              {
                title: "Market Consultation",
                description: "Get insights on market trends, regulatory requirements, and buyer preferences.",
              },
              {
                title: "Custom Solutions",
                description: "Explore custom product formulations and packaging designs for your specific market.",
              },
            ].map((item, index) => (
              <Card key={index} className="p-6">
                <h3 className="text-lg font-bold text-foreground mb-3">{item.title}</h3>
                <p className="text-foreground">{item.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20">
        <div className="container max-w-3xl">
          <h2 className="text-4xl font-bold text-foreground mb-12">Frequently Asked Questions</h2>

          <div className="space-y-6">
            {[
              {
                q: "What is the minimum order quantity?",
                a: "MOQ varies by product and customization requirements. Contact us with your specific needs for a quote.",
              },
              {
                q: "How long does production take?",
                a: "Lead time is 2–4 weeks after order confirmation and deposit. Exact timelines depend on order size and customization requirements.",
              },
              {
                q: "Do you offer private label services?",
                a: "Yes, we offer comprehensive OEM and private label services including custom packaging and branding.",
              },
              {
                q: "What are your payment terms?",
                a: "Standard payment terms: 30% deposit, 70% balance before shipment or against shipping documents. We accept T/T (Bank Transfer) and L/C for qualified buyers.",
              },
              {
                q: "Can you customize products for my market?",
                a: "Yes, we can customize packaging, labeling, product formulations, and more to meet destination market requirements.",
              },
              {
                q: "How do I request product samples?",
                a: "Email us at vickymor4u@gmail.com or message via WhatsApp +233 533 763 700 to request samples.",
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
