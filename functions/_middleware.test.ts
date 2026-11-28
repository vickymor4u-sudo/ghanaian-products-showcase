import { describe, expect, it, vi } from "vitest";
import { onRequest } from "./_middleware";

describe("public page snapshots", () => {
  it("serves product copy and metadata before client JavaScript loads", async () => {
    const html =
      "<!doctype html><html><head><title>Fufu Flour | BorgaFoods</title>" +
      '<link rel="canonical" href="https://www.borgafoods.com/products/fufu">' +
      "</head><body><h1>Fufu Flour</h1><p>Premium Ghanaian fufu flour</p></body></html>";
    const fetch = vi.fn(async (request: Request) => {
      const path = new URL(request.url).pathname;
      if (path === "/_prerender/products/fufu.txt") {
        return new Response(html, {
          headers: { "content-type": "text/plain", "content-length": "999" },
        });
      }
      return new Response(null, { status: 404 });
    });
    const next = vi.fn();

    const response = await onRequest({
      request: new Request(
        "https://www.borgafoods.com/products/fufu?ref=buyer"
      ),
      env: { ASSETS: { fetch } },
      next,
    });

    expect(response.status).toBe(200);
    expect(response.headers.get("content-type")).toContain("text/html");
    expect(response.headers.has("content-length")).toBe(false);
    expect(await response.text()).toBe(html);
    expect(fetch).toHaveBeenCalledTimes(2);
    expect(next).not.toHaveBeenCalled();
  });

  it("leaves the quotation API with its existing handler", async () => {
    const next = vi.fn(async () => new Response("API response"));
    const fetch = vi.fn();
    const response = await onRequest({
      request: new Request("https://www.borgafoods.com/api/export-quote"),
      env: { ASSETS: { fetch } },
      next,
    });

    expect(await response.text()).toBe("API response");
    expect(next).toHaveBeenCalledOnce();
    expect(fetch).not.toHaveBeenCalled();
  });

  it("does not expose page snapshots as separate crawlable URLs", async () => {
    const fetch = vi.fn();
    const response = await onRequest({
      request: new Request(
        "https://www.borgafoods.com/_prerender/products/fufu.txt"
      ),
      env: { ASSETS: { fetch } },
      next: vi.fn(),
    });

    expect(response.status).toBe(404);
    expect(fetch).not.toHaveBeenCalled();
  });

  it("redirects legacy product URLs to their canonical pages", async () => {
    const fetch = vi.fn();
    const response = await onRequest({
      request: new Request("https://www.borgafoods.com/products/gari"),
      env: { ASSETS: { fetch } },
      next: vi.fn(),
    });

    expect(response.status).toBe(301);
    expect(response.headers.get("location")).toBe(
      "https://www.borgafoods.com/products/white-gari"
    );
    expect(fetch).not.toHaveBeenCalled();
  });

  it("revalidates robots.txt so crawler policy updates are not stale", async () => {
    const fetch = vi.fn(async () =>
      new Response("User-agent: OAI-SearchBot\nAllow: /", {
        headers: {
          "content-type": "text/plain",
          "content-length": "39",
          "cache-control": "public, max-age=14400",
        },
      })
    );
    const response = await onRequest({
      request: new Request("https://www.borgafoods.com/robots.txt"),
      env: { ASSETS: { fetch } },
      next: vi.fn(),
    });

    expect(response.status).toBe(200);
    expect(response.headers.get("cache-control")).toBe(
      "public, max-age=0, must-revalidate"
    );
    expect(response.headers.has("content-length")).toBe(false);
    expect(await response.text()).toContain("OAI-SearchBot");
  });
});
