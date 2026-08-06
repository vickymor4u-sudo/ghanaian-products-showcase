import { useEffect } from "react";
import { useLocation } from "wouter";
import { SITE_ORIGIN } from "@/config/site";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  type?: string;
  noIndex?: boolean;
}

export default function SEO({
  title = "borgafoods.com - Premium Ghanaian Staple Foods",
  description = "Export-ready fufu, gari, kokonte, and banku products sourced and processed in Ghana. Supply & Demand Worldwide Ltd serves distributors, wholesalers, and food importers globally.",
  keywords = "Ghana food export, fufu wholesale, gari export, kokonte, banku, African food distributor, West African staples, BorgaFoods products",
  image = `${SITE_ORIGIN}/images/fufu-borga.png`,
  type = "website",
  noIndex = false,
}: SEOProps) {
  const [location] = useLocation();

  useEffect(() => {
    const path = location.split(/[?#]/)[0] || "/";
    const canonicalUrl = `${SITE_ORIGIN}${path === "/" ? "/" : path}`;

    // Update document title
    document.title = title;

    // Update or create meta tags
    const updateMetaTag = (
      name: string,
      content: string,
      isProperty = false
    ) => {
      const attribute = isProperty ? "property" : "name";
      let element = document.querySelector(`meta[${attribute}="${name}"]`);

      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }

      element.setAttribute("content", content);
    };

    // Standard meta tags
    updateMetaTag("description", description);
    updateMetaTag("keywords", keywords);
    updateMetaTag("robots", noIndex ? "noindex, nofollow" : "index, follow");

    // Open Graph tags
    updateMetaTag("og:title", title, true);
    updateMetaTag("og:description", description, true);
    updateMetaTag("og:image", image, true);
    updateMetaTag("og:url", canonicalUrl, true);
    updateMetaTag("og:type", type, true);
    updateMetaTag("og:site_name", "borgafoods.com", true);

    // Twitter Card tags
    updateMetaTag("twitter:card", "summary_large_image");
    updateMetaTag("twitter:title", title);
    updateMetaTag("twitter:description", description);
    updateMetaTag("twitter:image", image);

    let canonical = document.querySelector(
      'link[rel="canonical"]'
    ) as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;
  }, [title, description, keywords, image, type, noIndex, location]);

  return null;
}
