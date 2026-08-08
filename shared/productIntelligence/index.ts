/**
 * BorgaFoods Product Intelligence Platform (BPIP) — full module surface.
 *
 * ⚠️ Server/tooling use only. This barrel re-exports `registry.ts`, which
 * includes `internalCandidates.ts`. Anything under `client/src/` (bundled
 * and shipped to every visitor's browser) MUST import
 * `@shared/productIntelligence/publishedRegistry` and
 * `@shared/productIntelligence/types` directly instead of importing from
 * this barrel — see the module-boundary comment in `publishedRegistry.ts`
 * and the automated guard in `scripts/verify-no-internal-leak.ts`.
 *
 * Safe consumers of this barrel: `scripts/verify-product-catalog.ts`,
 * `shared/**\/*.test.ts`, and any future server-only tooling (an
 * operations dashboard backend, an AI agent with server-side access).
 * Cloudflare Pages Functions under `functions/` may also use it, since
 * Functions run server-side and are never shipped to the browser.
 */
export * from "./types";
export * from "./workflow";
export * from "./validate";
export {
  productIntelligenceRegistry,
  publishedProducts,
  internalOnlyRecords,
} from "./registry";
