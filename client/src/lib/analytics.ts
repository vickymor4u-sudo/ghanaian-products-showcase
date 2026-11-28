/** Privacy-safe, consent-gated GA4 integration for BorgaFoods. */
import { GA4_MEASUREMENT_ID } from "@/config/site";
import type { InquiryType } from "@shared/exportQuote";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export type AnalyticsConsent = "granted" | "denied" | null;
export const ANALYTICS_CONSENT_KEY = "borgafoods_analytics_consent";
export const ANALYTICS_CONSENT_EVENT = "borgafoods:analytics-consent";
export const ANALYTICS_PREFERENCES_EVENT = "borgafoods:analytics-preferences";
const GA4_SCRIPT_ID = "ga4-gtag-script";
const AI_REFERRAL_SESSION_KEY = "borgafoods_ai_referral_recorded";
let initialized = false;

function gtag(...args: unknown[]) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(args);
}

export function getAnalyticsConsent(): AnalyticsConsent {
  if (typeof window === "undefined") return null;
  const value = window.localStorage.getItem(ANALYTICS_CONSENT_KEY);
  return value === "granted" || value === "denied" ? value : null;
}

export function setAnalyticsConsent(value: Exclude<AnalyticsConsent, null>) {
  window.localStorage.setItem(ANALYTICS_CONSENT_KEY, value);
  if (initialized) {
    gtag("consent", "update", {
      analytics_storage: value,
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
    });
  }
  window.dispatchEvent(
    new CustomEvent(ANALYTICS_CONSENT_EVENT, { detail: value })
  );
}

export function openAnalyticsPreferences() {
  window.dispatchEvent(new Event(ANALYTICS_PREFERENCES_EVENT));
}

export function detectAiPlatform(referrer: string): string | null {
  if (!referrer) return null;
  let hostname: string;
  try {
    hostname = new URL(referrer).hostname.toLowerCase();
  } catch {
    return null;
  }
  const platforms: ReadonlyArray<[string, readonly string[]]> = [
    ["chatgpt", ["chatgpt.com", "chat.openai.com"]],
    ["gemini", ["gemini.google.com"]],
    ["claude", ["claude.ai"]],
    ["perplexity", ["perplexity.ai"]],
    ["microsoft_copilot", ["copilot.microsoft.com"]],
  ];
  return (
    platforms.find(([, domains]) =>
      domains.some(
        domain => hostname === domain || hostname.endsWith(`.${domain}`)
      )
    )?.[0] ?? null
  );
}

/**
 * Loads the direct Google tag once. Enhanced Measurement handles initial and
 * browser-history page views, so this app does not emit manual page_view
 * events and cannot double-count SPA navigation through both mechanisms.
 */
export function initAnalytics(): void {
  if (
    !GA4_MEASUREMENT_ID ||
    initialized ||
    getAnalyticsConsent() !== "granted"
  ) {
    return;
  }
  initialized = true;
  window.dataLayer = window.dataLayer || [];
  gtag("consent", "default", {
    analytics_storage: "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
  gtag("consent", "update", { analytics_storage: "granted" });
  gtag("js", new Date());
  gtag("config", GA4_MEASUREMENT_ID, {
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
  });

  if (!document.getElementById(GA4_SCRIPT_ID)) {
    const script = document.createElement("script");
    script.id = GA4_SCRIPT_ID;
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA4_MEASUREMENT_ID)}`;
    document.head.appendChild(script);
  }

  const aiPlatform = detectAiPlatform(document.referrer);
  if (aiPlatform && !window.sessionStorage.getItem(AI_REFERRAL_SESSION_KEY)) {
    window.sessionStorage.setItem(AI_REFERRAL_SESSION_KEY, "1");
    trackEvent("ai_referral", { ai_platform: aiPlatform });
  }
}

export function trackEvent(
  eventName: string,
  params: Record<string, unknown> = {}
): void {
  if (
    !GA4_MEASUREMENT_ID ||
    !initialized ||
    getAnalyticsConsent() !== "granted"
  ) {
    return;
  }
  gtag("event", eventName, params);
}

export function getSuccessfulInquiryAnalytics(
  inquiryType: InquiryType,
  productSlug: string
) {
  const eventName =
    inquiryType === "catalogue"
      ? "catalogue_request"
      : inquiryType === "general"
        ? "contact_form_submit"
        : "generate_lead";
  return {
    eventName,
    params: {
      inquiry_type: inquiryType,
      product_slug: productSlug || "unspecified",
    },
  } as const;
}

export function trackSuccessfulInquiry(
  inquiryType: InquiryType,
  productSlug: string
) {
  const event = getSuccessfulInquiryAnalytics(inquiryType, productSlug);
  trackEvent(event.eventName, event.params);
}
