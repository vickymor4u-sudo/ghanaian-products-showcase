import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "wouter";
import ExportQuoteButton from "@/components/ExportQuoteButton";

/**
 * Navigation Component
 * Design: Professional B2B Export Showcase
 * - Clean corporate header with company name
 * - Minimal design, professional appearance
 * - Responsive mobile menu
 */
export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: "Export Solutions", href: "/export-solutions" },
    { label: "Wholesale", href: "/wholesale" },
    { label: "Export & Compliance", href: "/export" },
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border">
      <nav className="container flex items-center justify-between py-4">
        {/* Logo/Brand */}
        <Link
          href="/"
          className="flex items-center gap-3 hover:opacity-80 transition-opacity"
        >
          <div className="w-10 h-10 bg-primary rounded flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-lg">
              S&D
            </span>
          </div>
          <div>
            <h1 className="text-lg font-bold text-foreground">
              Supply & Demand
            </h1>
            <p className="text-xs text-muted-foreground">Export Solutions</p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-5">
          {navItems.map(item => (
            <Link
              key={item.label}
              href={item.href}
              className="text-foreground hover:text-primary transition-colors text-sm font-medium"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* CTA Button */}
        <div className="hidden lg:block">
          <ExportQuoteButton
            size="sm"
            showArrow={false}
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
          />
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-2 hover:bg-secondary rounded transition-colors"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="lg:hidden border-t border-border bg-background">
          <div className="container py-4 flex flex-col gap-4">
            {navItems.map(item => (
              <Link
                key={item.label}
                href={item.href}
                className="text-foreground hover:text-primary transition-colors py-2 text-sm font-medium"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div onClick={() => setIsOpen(false)}>
              <ExportQuoteButton
                showArrow={false}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground mt-2"
              />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
