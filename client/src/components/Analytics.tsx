import { useEffect } from "react";
import { useLocation } from "wouter";
import { GA4_MEASUREMENT_ID } from "@/config/site";
import { initAnalytics, trackPageview } from "@/lib/analytics";

/**
 * Mounted once in App.tsx. Renders nothing. No-op entirely unless
 * VITE_GA4_MEASUREMENT_ID is configured — see client/src/lib/analytics.ts.
 */
export default function Analytics() {
  const [location] = useLocation();

  useEffect(() => {
    if (GA4_MEASUREMENT_ID) initAnalytics();
  }, []);

  useEffect(() => {
    if (!GA4_MEASUREMENT_ID) return;
    const path = location.split(/[?#]/)[0] || "/";
    trackPageview(path);
  }, [location]);

  return null;
}
