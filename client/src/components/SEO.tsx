import { useEffect } from 'react';
import { useLocation } from 'wouter';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  type?: string;
}

export default function SEO({ 
  title = "borgafoods.com - Premium Ghanaian Staple Foods",
  description = "Export-ready fufu, gari, kokonte, and banku products sourced and processed in Ghana. Supply & Demand Worldwide Ltd serves distributors, wholesalers, and food importers globally.",
  keywords = "Ghana food export, fufu wholesale, gari export, kokonte, banku, African food distributor, West African staples, Borga products",
  image = "https://borgafoods.com/images/fufu-borga.png",
  type = "website"
}: SEOProps) {
  const [location] = useLocation();
  
  useEffect(() => {
    // Update document title
    document.title = title;
    
    // Update or create meta tags
    const updateMetaTag = (name: string, content: string, isProperty = false) => {
      const attribute = isProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attribute}="${name}"]`);
      
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      
      element.setAttribute('content', content);
    };
    
    // Standard meta tags
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);
    
    // Open Graph tags
    updateMetaTag('og:title', title, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:image', image, true);
    updateMetaTag('og:url', `https://borgafoods.com${location}`, true);
    updateMetaTag('og:type', type, true);
    updateMetaTag('og:site_name', 'borgafoods.com', true);
    
    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', image);
    
  }, [title, description, keywords, image, type, location]);
  
  return null;
}
