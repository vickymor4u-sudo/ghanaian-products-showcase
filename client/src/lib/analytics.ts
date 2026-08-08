/**
 * GA4 integration — config-gated, inert until VITE_GA4_MEASUREMENT_ID is
 * set. No script loads, no cookie is set, and no visitor data is collected
 * unless BorgaFoods configures a real Measurement ID in Cloudflare. See
 * docs/SEO_FOUNDATION.md for activation steps and the privacy-notice
 * update that should accompany turning this on in production.
 *
 * Never send personally identifying or buyer-confidential data through
 * these functions (no company name, contact name, email, phone, or free
 * text) — RFQ conversion events pass only public, non-identifying
 * classification data (inquiry type, product slug). See BUSINESS_RULES.md
 * supplier-confidentiality rules, which this module must not undermine.
 */
import { GA4_MEASUREMENT_ID } from "@/config/site";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const GA4_SCRIPT_ID = "ga4-gtag-script";
let initialized = false;

function gtag(...args: unknown[]) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(args);
}

/**
 * Loads gtag.js and configures GA4 with `send_page_view: false` — this
 * module tracks page views explicitly on each SPA route change via
 * `trackPageview` instead, avoiding a double-counted initial pageview.
 * No-op if VITE_GA4_MEASUREMENT_ID is not configured.
 */
export function initAnalytics(): void {
  if (!GA4_MEASUREMENT_ID || initialized) return;
  initialized = true;

  if (!document.getElementById(GA4_SCRIPT_ID)) {
    const script = document.createElement("script");
    script.id = GA4_SCRIPT_ID;
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA4_MEASUREMENT_ID)}`;
    document.head.appendChild(script);
  }

  window.dataLayer = window.dataLayer || [];
  gtag("js", new Date());
  gtag("config", GA4_MEASUREMENT_ID, { send_page_view: false });
}

/** No-op if GA4 is not configured. */
export function trackPageview(path: string): void {
  if (!GA4_MEASUREMENT_ID) return;
  gtag("event", "page_view", {
    page_path: path,
    page_location: window.location.href,
    page_title: document.title,
  });
}

/**
 * Fires a GA4 event. `params` must contain only public, non-identifying
 * data (see module doc comment) — this function does not filter or
 * validate that for you. No-op if GA4 is not configured.
 */
export function trackEvent(
  eventName: string,
  params: Record<string, string | number | boolean> = {}
): void {
  if (!GA4_MEASUREMENT_ID) return;
  gtag("event", eventName, params);
}
