/**
 * BorgaFoods Product Intelligence Platform (BPIP) — full registry view.
 *
 * Combines `publishedRegistry.ts` (client-safe) with `internalCandidates.ts`
 * (never client-imported). This combined view is for build-time validation,
 * tests, and future internal-only tooling ONLY.
 *
 * DO NOT import this file from anything under `client/src/` — it would pull
 * `internalCandidates.ts` into the client bundle. See
 * `publishedRegistry.ts` for the module-boundary rationale.
 */
import { publishedRegistry, publishedProducts } from "./publishedRegistry";
import { internalCandidates } from "./internalCandidates";
import { isCurrentlyPublished } from "./workflow";
import type { ProductIntelligenceRecord } from "./types";

export { publishedProducts } from "./publishedRegistry";

/** Every record BPIP knows about: published + internal-only candidates. */
export const productIntelligenceRegistry: readonly ProductIntelligenceRecord[] =
  [...publishedRegistry, ...internalCandidates];

/** Every record NOT currently published. */
export const internalOnlyRecords: readonly ProductIntelligenceRecord[] =
  productIntelligenceRegistry.filter(record => !isCurrentlyPublished(record));
