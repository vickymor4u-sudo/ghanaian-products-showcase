import { afterEach, describe, expect, it, vi } from "vitest";
import { onRequest } from "./export-quote";

const validSubmission = {
  submissionId: "9a5758c6-cfe7-4a7b-88b9-fc101673a1a1",
  inquiryType: "export_quote",
  buyerCategory: "",
  companyName: "Accra Foods Import Ltd",
  contactPerson: "Ama Buyer",
  country: "United Kingdom",
  email: "buyer@example.com",
  phoneWhatsApp: "+44 20 0000 0000",
  productSelection: "gari-borga",
  packagingPreference: "retail",
  estimatedQuantity: "5 metric tons",
  destinationCountry: "United Kingdom",
  destinationPort: "Tilbury",
  intendedSalesChannel: "",
  targetMarket: "",
  expectedOrderFrequency: "",
  requirementsTimeline: "",
  artworkReadiness: "",
  labelingRequirements: "",
  message: "Please confirm available retail formats.",
  privacyConsent: true,
  sourcePath: "/contact",
  website: "",
  turnstileToken: "valid-turnstile-token",
} as const;

function createContext(
  body: unknown = validSubmission,
  options: {
    method?: string;
    origin?: string;
    contentType?: string;
    env?: Record<string, string>;
  } = {}
) {
  const method = options.method ?? "POST";
  return {
    request: new Request("https://www.borgafoods.com/api/export-quote", {
      method,
      headers: {
        Origin: options.origin ?? "https://www.borgafoods.com",
        "Content-Type": options.contentType ?? "application/json",
      },
      body: method === "GET" ? undefined : JSON.stringify(body),
    }),
    env: {
      EXPORT_QUOTE_FROM_EMAIL: "sender@example.com",
      EXPORT_QUOTE_NOTIFICATION_EMAIL: "internal@example.com",
      TURNSTILE_SECRET_KEY: "turnstile-secret",
      RESEND_API_KEY: "resend-secret",
      ...options.env,
    },
  };
}

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("POST /api/export-quote", () => {
  it("rejects unsupported methods and cross-origin requests", async () => {
    const methodResponse = await onRequest(
      createContext(undefined, { method: "GET" })
    );
    expect(methodResponse.status).toBe(405);

    const originResponse = await onRequest(
      createContext(validSubmission, { origin: "https://example.com" })
    );
    expect(originResponse.status).toBe(403);
  });

  it("rejects invalid and unknown product submissions before external calls", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    const response = await onRequest(
      createContext({ ...validSubmission, productSelection: "supplier-secret" })
    );

    expect(response.status).toBe(400);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("rejects a missing product or quantity for non-general inquiry types", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    const missingProduct = await onRequest(
      createContext({ ...validSubmission, productSelection: "" })
    );
    const missingQuantity = await onRequest(
      createContext({ ...validSubmission, estimatedQuantity: "" })
    );

    expect(missingProduct.status).toBe(400);
    expect(missingQuantity.status).toBe(400);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("accepts a general enquiry with no product or quantity specified", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(
        Response.json({
          success: true,
          hostname: "www.borgafoods.com",
          action: "export_quote",
        })
      )
      .mockResolvedValueOnce(Response.json({ id: "resend-message-general" }));
    vi.stubGlobal("fetch", fetchMock);
    vi.spyOn(console, "info").mockImplementation(() => undefined);

    const response = await onRequest(
      createContext({
        ...validSubmission,
        inquiryType: "general",
        productSelection: "",
        estimatedQuantity: "",
        message: "Do you currently ship to Kenya?",
      })
    );
    const result = (await response.json()) as { ok: boolean };

    expect(response.status).toBe(201);
    expect(result.ok).toBe(true);

    const [, resendOptions] = fetchMock.mock.calls[1] as [string, RequestInit];
    const email = JSON.parse(String(resendOptions.body)) as Record<
      string,
      unknown
    >;
    expect(String(email.text)).toContain(
      "Product selection: Not specified — general enquiry"
    );
    expect(String(email.text)).toContain("Estimated quantity: Not provided");
  });

  it("requires a buyer category for wholesale and distributor enquiries", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    const response = await onRequest(
      createContext({
        ...validSubmission,
        inquiryType: "wholesale",
        buyerCategory: "",
      })
    );

    expect(response.status).toBe(400);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("accepts only the approved Fufu Borga record for private-label discovery", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    const rejectedResponse = await onRequest(
      createContext({
        ...validSubmission,
        inquiryType: "private_label",
        productSelection: "gari-borga",
        message: "Retail product discussion for manual review.",
      })
    );

    expect(rejectedResponse.status).toBe(400);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("requires product specifications for private-label discovery", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    const response = await onRequest(
      createContext({
        ...validSubmission,
        inquiryType: "private_label",
        productSelection: "fufu-borga",
        message: "Short",
      })
    );

    expect(response.status).toBe(400);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("rejects missing privacy acknowledgement and unexpected fields", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    const missingConsent = await onRequest(
      createContext({ ...validSubmission, privacyConsent: false })
    );
    const unexpectedField = await onRequest(
      createContext({ ...validSubmission, internalPricing: "secret" })
    );

    expect(missingConsent.status).toBe(400);
    expect(unexpectedField.status).toBe(400);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("fails closed when encrypted secrets are unavailable", async () => {
    const response = await onRequest(
      createContext(validSubmission, {
        env: {
          EXPORT_QUOTE_FROM_EMAIL: "",
          EXPORT_QUOTE_NOTIFICATION_EMAIL: "",
          TURNSTILE_SECRET_KEY: "",
          RESEND_API_KEY: "",
        },
      })
    );

    expect(response.status).toBe(503);
    expect(await response.json()).toEqual({
      ok: false,
      code: "service_unavailable",
    });
  });

  it("rejects a failed or mismatched Turnstile verification", async () => {
    const fetchMock = vi.fn().mockResolvedValueOnce(
      Response.json({
        success: true,
        hostname: "malicious.example",
        action: "export_quote",
      })
    );
    vi.stubGlobal("fetch", fetchMock);

    const response = await onRequest(createContext());

    expect(response.status).toBe(400);
    expect(await response.json()).toEqual({
      ok: false,
      code: "verification_failed",
    });
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("returns a retryable failure when Resend does not accept the message", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(
        Response.json({
          success: true,
          hostname: "www.borgafoods.com",
          action: "export_quote",
        })
      )
      .mockResolvedValueOnce(
        new Response("provider unavailable", { status: 503 })
      );
    vi.stubGlobal("fetch", fetchMock);
    vi.spyOn(console, "error").mockImplementation(() => undefined);

    const response = await onRequest(createContext());

    expect(response.status).toBe(502);
    expect(await response.json()).toEqual({
      ok: false,
      code: "delivery_failed",
    });
  });

  it("sends one internal notification with qualification context and no supplier data", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(
        Response.json({
          success: true,
          hostname: "www.borgafoods.com",
          action: "export_quote",
        })
      )
      .mockResolvedValueOnce(Response.json({ id: "resend-message-1" }));
    vi.stubGlobal("fetch", fetchMock);
    vi.spyOn(console, "info").mockImplementation(() => undefined);

    const response = await onRequest(
      createContext({
        ...validSubmission,
        inquiryType: "distribution",
        buyerCategory: "distributor",
        intendedSalesChannel: "retail",
        targetMarket: "United Kingdom and Ireland",
        expectedOrderFrequency: "quarterly",
        requirementsTimeline: "planning_ahead",
        destinationCountry: "United\nKingdom",
        message: "Use <script>alert('no')</script> as plain text.",
      })
    );
    const result = (await response.json()) as {
      ok: boolean;
      requestId: string;
    };

    expect(response.status).toBe(201);
    expect(result.ok).toBe(true);
    expect(result.requestId).toMatch(/^BF-[A-F0-9]{8}$/);
    expect(fetchMock).toHaveBeenCalledTimes(2);

    const [resendUrl, resendOptions] = fetchMock.mock.calls[1] as [
      string,
      RequestInit,
    ];
    const email = JSON.parse(String(resendOptions.body)) as Record<
      string,
      unknown
    >;
    const headers = resendOptions.headers as Record<string, string>;

    expect(resendUrl).toBe("https://api.resend.com/emails");
    expect(email.to).toEqual(["internal@example.com"]);
    expect(email.from).toBe("BorgaFoods Export Quote <sender@example.com>");
    expect(email.reply_to).toBe("buyer@example.com");
    expect(String(email.subject)).not.toMatch(/[\r\n]/);
    expect(String(email.text)).toContain("Destination country: United Kingdom");
    expect(String(email.text)).toContain("Buyer category: Distributor");
    expect(String(email.text)).toContain(
      "Intended sales channel: Retail stores or supermarkets"
    );
    expect(String(email.text)).toContain("Expected timing: Planning ahead");
    expect(String(email.text)).toContain("Privacy acknowledgement: Confirmed");
    expect(String(email.text)).toContain("Business requirements:");
    expect(String(email.html)).toContain(
      "&lt;script&gt;alert(&#39;no&#39;)&lt;/script&gt;"
    );
    expect(String(email.html)).not.toContain("<script>");
    expect(String(email.text)).not.toMatch(
      /supplier name|supplier brand|source alignment|internal pricing/i
    );
    expect(headers["Idempotency-Key"]).toBe(
      `borgafoods-rfq-${validSubmission.submissionId}`
    );
  });

  it("sends a private-label discovery notification with buyer Reply-To and no capability promise", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(
        Response.json({
          success: true,
          hostname: "www.borgafoods.com",
          action: "export_quote",
        })
      )
      .mockResolvedValueOnce(Response.json({ id: "resend-message-private" }));
    vi.stubGlobal("fetch", fetchMock);
    vi.spyOn(console, "info").mockImplementation(() => undefined);

    const response = await onRequest(
      createContext({
        ...validSubmission,
        inquiryType: "private_label",
        productSelection: "fufu-borga",
        intendedSalesChannel: "retail",
        targetMarket: "United Kingdom",
        requirementsTimeline: "planning_ahead",
        artworkReadiness: "in_development",
        labelingRequirements: "English-language retail label.",
        message:
          "Please review our preferred Fufu Borga specifications and packaging requirements.",
      })
    );

    expect(response.status).toBe(201);
    const [, resendOptions] = fetchMock.mock.calls[1] as [string, RequestInit];
    const email = JSON.parse(String(resendOptions.body)) as Record<
      string,
      unknown
    >;

    expect(email.reply_to).toBe("buyer@example.com");
    expect(String(email.text)).toContain("Inquiry type: private label");
    expect(String(email.text)).toContain("Product selection: Fufu Flour");
    expect(String(email.text)).toContain(
      "Artwork or label readiness: In development"
    );
    expect(String(email.text)).toContain(
      "Product specifications and requirements:"
    );
    expect(String(email.text)).not.toMatch(
      /supplier name|supplier brand|private-label eligibility|source alignment|internal pricing/i
    );
  });
});
