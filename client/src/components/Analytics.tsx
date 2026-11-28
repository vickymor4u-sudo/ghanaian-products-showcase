import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { products } from "@/data/products";
import { productUrlToInternalSlug } from "@/data/productUrlSlugs";
import {
  ANALYTICS_CONSENT_EVENT,
  getAnalyticsConsent,
  initAnalytics,
  trackEvent,
  type AnalyticsConsent,
} from "@/lib/analytics";

export default function Analytics() {
  const [location] = useLocation();
  const [consent, setConsent] = useState<AnalyticsConsent>(() =>
    getAnalyticsConsent()
  );

  useEffect(() => {
    const handleConsent = (event: Event) =>
      setConsent((event as CustomEvent<AnalyticsConsent>).detail);
    window.addEventListener(ANALYTICS_CONSENT_EVENT, handleConsent);
    return () =>
      window.removeEventListener(ANALYTICS_CONSENT_EVENT, handleConsent);
  }, []);

  useEffect(() => {
    if (consent === "granted") initAnalytics();
  }, [consent]);

  useEffect(() => {
    if (consent !== "granted") return;
    const path = location.split(/[?#]/)[0];
    const match = path.match(/^\/products\/([^/]+)$/);
    if (!match) return;
    const internalSlug = productUrlToInternalSlug[match[1]];
    const product = products.find(item => item.slug === internalSlug);
    if (!product) return;
    trackEvent("view_item", {
      currency: product.wholesalePricing?.currency ?? "USD",
      value: product.wholesalePricing?.pricePerCarton ?? 0,
      items: [
        {
          item_id: product.slug,
          item_name: product.name,
          item_brand: product.brand,
          item_category: product.category,
        },
      ],
    });
  }, [consent, location]);

  useEffect(() => {
    if (consent !== "granted") return;
    const handleClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest("a");
      if (!link) return;
      const href = link.getAttribute("href") ?? "";
      if (href.startsWith("mailto:")) {
        trackEvent("email_click", { page_path: window.location.pathname });
      } else if (href.includes("wa.me/")) {
        trackEvent("whatsapp_click", {
          page_path: window.location.pathname,
        });
      }
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [consent]);

  return null;
}
