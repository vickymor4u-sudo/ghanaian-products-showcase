import { useEffect } from "react";
import { EXPORT_ENQUIRY_EMAIL, SITE_ORIGIN } from "@/config/site";
import type { Product } from "@/data/products";
import { getProductPageUrl } from "@/data/productUrlSlugs";

interface BreadcrumbEntry {
  name: string;
  /** Site-relative path, e.g. "/products" — SITE_ORIGIN is prepended. */
  path: string;
}

interface FaqEntry {
  q: string;
  a: string;
}

interface SchemaMarkupProps {
  type: "organization" | "product" | "breadcrumb" | "faq";
  data?: Product;
  /** Required when type is "breadcrumb", in display order (root first). */
  breadcrumbs?: BreadcrumbEntry[];
  /** Required when type is "faq" — same question/answer pairs already rendered on the page, not new copy. */
  faqs?: FaqEntry[];
  /** Distinguishes multiple "faq" instances on one page (e.g. one per product card on /products) so their <script> tags don't overwrite each other. */
  faqKey?: string;
}

export default function SchemaMarkup({
  type,
  data,
  breadcrumbs,
  faqs,
  faqKey,
}: SchemaMarkupProps) {
  useEffect(() => {
    let schema: any = {};

    if (type === "organization") {
      schema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "Supply & Demand Worldwide Ltd",
        alternateName: "BorgaFoods",
        url: SITE_ORIGIN,
        description:
          "Ghanaian food manufacturer and export partner supplying BorgaFoods staples and selected Ghanaian export products to international B2B buyers.",
        foundingDate: "2013",
        address: [
          {
            "@type": "PostalAddress",
            streetAddress: "C 16 Sakumono Estate Junction Site 8",
            addressLocality: "Tema",
            addressRegion: "Greater Accra",
            addressCountry: "GH",
          },
          {
            "@type": "PostalAddress",
            addressLocality: "Hangzhou",
            addressRegion: "Zhejiang",
            addressCountry: "CN",
          },
        ],
        contactPoint: [
          {
            "@type": "ContactPoint",
            telephone: "+233-555-362-208",
            contactType: "sales",
            areaServed: ["GH", "AF", "AS", "ME"],
            availableLanguage: ["English"],
          },
          {
            "@type": "ContactPoint",
            telephone: "+86-135-1681-8572",
            contactType: "sales",
            areaServed: ["CN", "AS"],
            availableLanguage: ["English", "Chinese"],
          },
        ],
        email: EXPORT_ENQUIRY_EMAIL,
        sameAs: [SITE_ORIGIN],
      };
    } else if (type === "product" && data) {
      const isManufactured = data.supplyType === "manufactured";
      const productPageUrl = getProductPageUrl(data.slug);

      schema = {
        "@context": "https://schema.org",
        "@type": "Product",
        name: data.name,
        description: data.description,
        sku: data.slug,
        category: data.category,
        // Points at the dedicated product page when one exists, even when
        // this schema is rendered on /products (which lists all products
        // on one URL) — tells search engines where the canonical detail
        // page for this specific product actually lives.
        ...(productPageUrl && { url: `${SITE_ORIGIN}${productPageUrl}` }),
        ...(isManufactured && {
          brand: {
            "@type": "Brand",
            name: data.brand,
          },
          manufacturer: {
            "@type": "Organization",
            name: data.manufacturer,
          },
        }),
        countryOfOrigin: {
          "@type": "Country",
          name: data.countryOfOrigin,
        },
        image: data.images.map(image => `${SITE_ORIGIN}${image}`),
        ...(data.wholesalePricing && {
          offers: {
            "@type": "Offer",
            price: data.wholesalePricing.pricePerCarton,
            priceCurrency: data.wholesalePricing.currency,
            availability: "https://schema.org/InStock",
            ...(data.wholesalePricing.unitsPerCarton && {
              priceSpecification: {
                "@type": "UnitPriceSpecification",
                price: data.wholesalePricing.pricePerCarton,
                priceCurrency: data.wholesalePricing.currency,
                unitText: `Per carton (${data.wholesalePricing.unitsPerCarton} units)`,
              },
            }),
          },
        }),
      };
    } else if (type === "breadcrumb" && breadcrumbs) {
      schema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: breadcrumbs.map((crumb, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: crumb.name,
          item: `${SITE_ORIGIN}${crumb.path}`,
        })),
      };
    } else if (type === "faq" && faqs && faqs.length > 0) {
      // Markup only — every question/answer here is the same text already
      // visibly rendered on the page (see ProductFaq in ProductDetail.tsx).
      // No new claim is introduced by adding structured data around it.
      schema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map(faq => ({
          "@type": "Question",
          name: faq.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.a,
          },
        })),
      };
    }

    // Create or update script tag. Product/FAQ schema are keyed by
    // slug/faqKey so multiple instances of the same type on one page (e.g.
    // one <SchemaMarkup type="product" /> per card on /products) can
    // coexist without overwriting or removing each other's <script> tag.
    const scriptId =
      type === "product" && data
        ? `schema-product-${data.slug}`
        : type === "faq" && faqKey
          ? `schema-faq-${faqKey}`
          : `schema-${type}`;
    let scriptTag = document.getElementById(scriptId) as HTMLScriptElement;

    if (!scriptTag) {
      scriptTag = document.createElement("script");
      scriptTag.id = scriptId;
      scriptTag.type = "application/ld+json";
      document.head.appendChild(scriptTag);
    }

    scriptTag.textContent = JSON.stringify(schema);

    return () => {
      // Cleanup on unmount
      const tag = document.getElementById(scriptId);
      if (tag) {
        tag.remove();
      }
    };
  }, [type, data, breadcrumbs, faqs, faqKey]);

  return null;
}
