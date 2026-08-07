import { afterEach, describe, expect, it, vi } from "vitest";
import { onRequest } from "./export-quote";

const validSubmission = {
  submissionId: "9a5758c6-cfe7-4a7b-88b9-fc101673a1a1",
  inquiryType: "export_quote",
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
  message: "Please confirm available retail formats.",
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

  it("sends one internal notification with a request ID and no supplier data", async () => {
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
    expect(String(email.html)).toContain(
      "&lt;script&gt;alert(&#39;no&#39;)&lt;/script&gt;"
    );
    expect(String(email.html)).not.toContain("<script>");
    expect(String(email.text)).not.toMatch(/supplier name|supplier brand/i);
    expect(headers["Idempotency-Key"]).toBe(
      `borgafoods-rfq-${validSubmission.submissionId}`
    );
  });
});
