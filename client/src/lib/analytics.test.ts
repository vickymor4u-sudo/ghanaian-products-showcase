import { afterEach, describe, expect, it, vi } from "vitest";
import {
  detectAiPlatform,
  getSuccessfulInquiryAnalytics,
  initAnalytics,
} from "./analytics";

afterEach(() => vi.unstubAllGlobals());

describe("AI referral classification", () => {
  it.each([
    ["https://chatgpt.com/c/abc", "chatgpt"],
    ["https://chat.openai.com/", "chatgpt"],
    ["https://gemini.google.com/app", "gemini"],
    ["https://claude.ai/chat", "claude"],
    ["https://www.perplexity.ai/search", "perplexity"],
    ["https://copilot.microsoft.com/", "microsoft_copilot"],
  ])("classifies %s", (referrer, expected) => {
    expect(detectAiPlatform(referrer)).toBe(expected);
  });

  it("does not expose or classify unrelated and invalid referrers", () => {
    expect(detectAiPlatform("https://example.com")).toBeNull();
    expect(detectAiPlatform("not a URL")).toBeNull();
    expect(detectAiPlatform("")).toBeNull();
  });
});

describe("successful inquiry analytics", () => {
  it.each([
    ["export_quote", "generate_lead"],
    ["wholesale", "generate_lead"],
    ["distribution", "generate_lead"],
    ["private_label", "generate_lead"],
    ["catalogue", "catalogue_request"],
    ["general", "contact_form_submit"],
  ] as const)("maps %s to %s", (inquiryType, expectedEvent) => {
    const result = getSuccessfulInquiryAnalytics(inquiryType, "white-gari");
    expect(result).toEqual({
      eventName: expectedEvent,
      params: {
        inquiry_type: inquiryType,
        product_slug: "white-gari",
      },
    });
    expect(Object.keys(result.params)).toEqual([
      "inquiry_type",
      "product_slug",
    ]);
  });
});

describe("Google tag command transport", () => {
  it("queues canonical Arguments objects instead of ignored arrays", () => {
    const dataLayer: unknown[] = [];
    const appendedScripts: unknown[] = [];
    vi.stubGlobal("window", {
      dataLayer,
      localStorage: {
        getItem: () => "granted",
      },
      sessionStorage: {
        getItem: () => null,
      },
    });
    vi.stubGlobal("document", {
      referrer: "",
      getElementById: () => null,
      createElement: () => ({}),
      head: {
        appendChild: (script: unknown) => appendedScripts.push(script),
      },
    });

    initAnalytics();

    expect(dataLayer).toHaveLength(4);
    expect(
      dataLayer.every(item =>
        Object.prototype.toString.call(item).includes("Arguments")
      )
    ).toBe(true);
    expect(Array.isArray(dataLayer[0])).toBe(false);
    expect(appendedScripts).toHaveLength(1);
  });
});
