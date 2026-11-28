import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  ANALYTICS_PREFERENCES_EVENT,
  getAnalyticsConsent,
  setAnalyticsConsent,
} from "@/lib/analytics";

export default function AnalyticsConsent() {
  const [visible, setVisible] = useState(() => getAnalyticsConsent() === null);

  useEffect(() => {
    const open = () => setVisible(true);
    window.addEventListener(ANALYTICS_PREFERENCES_EVENT, open);
    return () => window.removeEventListener(ANALYTICS_PREFERENCES_EVENT, open);
  }, []);

  if (!visible) return null;

  const choose = (value: "granted" | "denied") => {
    setAnalyticsConsent(value);
    setVisible(false);
  };

  return (
    <aside
      aria-label="Analytics preferences"
      className="fixed inset-x-4 bottom-4 z-[70] mx-auto max-w-3xl rounded-xl border border-border bg-white p-5 shadow-xl"
    >
      <p className="font-bold text-foreground">Analytics preferences</p>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        With your permission, BorgaFoods uses Google Analytics to understand
        page visits and business enquiries. We do not send form details,
        names, email addresses or telephone numbers to Analytics.
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        <Button type="button" onClick={() => choose("granted")}>
          Accept analytics
        </Button>
        <Button type="button" variant="outline" onClick={() => choose("denied")}>
          Decline
        </Button>
      </div>
    </aside>
  );
}
