import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";

/**
 * Footer Component
 * Design: Professional B2B Export Showcase
 * - Corporate footer with business contact details
 * - Professional tone, minimal design
 */
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-background mt-20">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-bold mb-4">Supply & Demand Worldwide Ltd</h3>
            <p className="text-sm text-background/80 mb-6">
              Professional export solutions for authentic Ghanaian food products. Connecting quality producers with international distributors and importers.
            </p>
            <div className="flex gap-4">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-background/70 transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="https://supplyanddmand.com" target="_blank" rel="noopener noreferrer" className="hover:text-background/70 transition-colors">
                <Globe size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4">Navigation</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/products" className="hover:text-background/70 transition-colors">
                  Products
                </a>
              </li>
              <li>
                <a href="/export" className="hover:text-background/70 transition-colors">
                  Export & Compliance
                </a>
              </li>
              <li>
                <a href="/about" className="hover:text-background/70 transition-colors">
                  About Us
                </a>
              </li>

              <li>
                <a href="/contact" className="hover:text-background/70 transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bold mb-4">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <Phone size={18} className="mt-0.5 flex-shrink-0" />
                <div>
                  <p>Ghana: +233 555 362 208</p>
                  <p className="text-background/70">WhatsApp: +233 533 763 700</p>
                  <p className="text-background/70">China: +86 135 1681 8572</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={18} className="mt-0.5 flex-shrink-0" />
                <span>vickymor4u@gmail.com</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={18} className="mt-0.5 flex-shrink-0" />
                <div>
                  <p>Tema, Greater Accra, Ghana</p>
                  <p className="text-background/70">Hangzhou, China</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-background/20 pt-8">
          <p className="text-center text-sm text-background/70">
            © {currentYear} Supply & Demand Worldwide Ltd. All rights reserved. | Professional Export Solutions
          </p>
        </div>
      </div>
    </footer>
  );
}
