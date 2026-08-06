import { useEffect, useRef } from "react";

interface TurnstileApi {
  render(
    container: HTMLElement,
    options: {
      sitekey: string;
      action: string;
      callback: (token: string) => void;
      "expired-callback": () => void;
      "error-callback": () => void;
      "timeout-callback": () => void;
    }
  ): string;
  remove(widgetId: string): void;
  reset(widgetId: string): void;
}

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

interface TurnstileWidgetProps {
  siteKey: string;
  resetSignal: number;
  onTokenChange: (token: string) => void;
  onError: () => void;
}

const TURNSTILE_SCRIPT_ID = "cloudflare-turnstile-script";
const TURNSTILE_SCRIPT_URL =
  "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

export default function TurnstileWidget({
  siteKey,
  resetSignal,
  onTokenChange,
  onError,
}: TurnstileWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const onTokenChangeRef = useRef(onTokenChange);
  const onErrorRef = useRef(onError);

  onTokenChangeRef.current = onTokenChange;
  onErrorRef.current = onError;

  useEffect(() => {
    if (!siteKey) return;

    let cancelled = false;
    let script = document.getElementById(
      TURNSTILE_SCRIPT_ID
    ) as HTMLScriptElement | null;

    const renderWidget = () => {
      if (
        cancelled ||
        !containerRef.current ||
        !window.turnstile ||
        widgetIdRef.current
      ) {
        return;
      }

      widgetIdRef.current = window.turnstile.render(containerRef.current, {
        sitekey: siteKey,
        action: "export_quote",
        callback: token => onTokenChangeRef.current(token),
        "expired-callback": () => onTokenChangeRef.current(""),
        "timeout-callback": () => onTokenChangeRef.current(""),
        "error-callback": () => {
          onTokenChangeRef.current("");
          onErrorRef.current();
        },
      });
    };
    const handleScriptError = () => onErrorRef.current();

    if (window.turnstile) {
      renderWidget();
    } else if (script) {
      script.addEventListener("load", renderWidget);
      script.addEventListener("error", handleScriptError);
    } else {
      script = document.createElement("script");
      script.id = TURNSTILE_SCRIPT_ID;
      script.src = TURNSTILE_SCRIPT_URL;
      script.async = true;
      script.defer = true;
      script.addEventListener("load", renderWidget);
      script.addEventListener("error", handleScriptError);
      document.head.appendChild(script);
    }

    return () => {
      cancelled = true;
      script?.removeEventListener("load", renderWidget);
      script?.removeEventListener("error", handleScriptError);

      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
    };
  }, [siteKey]);

  useEffect(() => {
    if (resetSignal > 0 && widgetIdRef.current && window.turnstile) {
      window.turnstile.reset(widgetIdRef.current);
      onTokenChangeRef.current("");
    }
  }, [resetSignal]);

  return <div ref={containerRef} aria-label="Spam protection verification" />;
}
