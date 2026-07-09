import { useEffect } from 'react';

interface SchemaMarkupProps {
  type: 'organization' | 'product';
  data?: any;
}

export default function SchemaMarkup({ type, data }: SchemaMarkupProps) {
  useEffect(() => {
    let schema: any = {};
    
    if (type === 'organization') {
      schema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Supply & Demand Worldwide Ltd",
        "alternateName": "Borga Foods",
        "url": "https://borgafoods.com",
        "logo": "https://borgafoods.com/logo.png",
        "description": "Ghana-focused food export company specializing in traditional West African staple foods for international markets.",
        "foundingDate": "2013",
        "address": [
          {
            "@type": "PostalAddress",
            "streetAddress": "C 16 Sakumono Estate Junction Site 8",
            "addressLocality": "Tema",
            "addressRegion": "Greater Accra",
            "addressCountry": "GH"
          },
          {
            "@type": "PostalAddress",
            "addressLocality": "Hangzhou",
            "addressRegion": "Zhejiang",
            "addressCountry": "CN"
          }
        ],
        "contactPoint": [
          {
            "@type": "ContactPoint",
            "telephone": "+233-555-362-208",
            "contactType": "sales",
            "areaServed": ["GH", "AF", "AS", "ME"],
            "availableLanguage": ["English"]
          },
          {
            "@type": "ContactPoint",
            "telephone": "+86-135-1681-8572",
            "contactType": "sales",
            "areaServed": ["CN", "AS"],
            "availableLanguage": ["English", "Chinese"]
          }
        ],
        "email": "vickymor4u@gmail.com",
        "sameAs": [
          "https://borgafoods.com"
        ]
      };
    } else if (type === 'product' && data) {
      schema = {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": data.name,
        "description": data.description,
        "brand": {
          "@type": "Brand",
          "name": "Borga"
        },
        "manufacturer": {
          "@type": "Organization",
          "name": "Supply & Demand Worldwide Ltd"
        },
        "countryOfOrigin": {
          "@type": "Country",
          "name": "Ghana"
        },
        "image": data.image,
        "offers": {
          "@type": "Offer",
          "availability": "https://schema.org/InStock",
          "priceCurrency": "USD",
          "seller": {
            "@type": "Organization",
            "name": "Supply & Demand Worldwide Ltd"
          }
        }
      };
    }
    
    // Create or update script tag
    const scriptId = `schema-${type}`;
    let scriptTag = document.getElementById(scriptId) as HTMLScriptElement;
    
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = scriptId;
      scriptTag.type = 'application/ld+json';
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
  }, [type, data]);
  
  return null;
}
