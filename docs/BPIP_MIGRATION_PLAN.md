# BPIP Migration Plan — From the Frozen Capability Model to BPIP

Status: **Phase 1 and Phase 2 implemented 8 August 2026 — the core architecture is complete. Phase 3+ are proposals requiring separate approval before implementation.**

## Relationship to the frozen capability model

`docs/PRODUCT_CAPABILITY_MODEL.md` remains authoritative. This plan
describes moving its _fields_ into a machine-checkable structure
(`shared/productIntelligence/types.ts`) and its _records_ into a queryable
registry (`shared/productIntelligence/registry.ts`), without changing any
decision the frozen model records. Where the two could ever appear to
disagree, the frozen model wins — `docs/PRODUCT_INTELLIGENCE_PLATFORM.md`
explains the specific mechanism (`lifecycle` vs. capability-model
authority) that keeps this true by construction.

## Phase 1 — Completed

- Defined `ProductIntelligenceRecord` as a typed superset of the prior
  `Product` type, adding a lifecycle state machine and structured
  approval fields (`publicDisplayStatus`, `sourceAlignment`,
  `privateLabelEligibility`, `imageStatus`, `documentationStatus`,
  `exportAvailable`, `wholesaleAvailable`) in place of scattered flat
  fields and prose.
- Migrated the 5 live products into `publishedRegistry.ts` with identical
  field values (verified byte-for-byte in the built output).
- Migrated the 21 candidates + Red Palm Oil identified in
  `docs/PRODUCT_INTELLIGENCE_RECONCILIATION.md` into
  `internalCandidates.ts`, with no supplier name, brand, or price.
- Implemented publication/RFQ/private-label gate functions as pure,
  testable code (`workflow.ts`), formalizing
  `docs/PUBLIC_PRODUCT_PRESENTATION_RULES.md` §6 as executable logic.
- Implemented `assertRegistryIntegrity` (`validate.ts`) and wired a new
  build-blocking script, `scripts/verify-no-internal-leak.ts`, that
  confirms internal-only data never reaches the client bundle.
- Refactored `client/src/data/products.ts` into an adapter over
  `publishedRegistry.ts`, preserving its entire public export surface
  (same type and function names, same values) so no other file needed to
  change.
- Added 30 new tests (`shared/productIntelligence/*.test.ts`) covering
  workflow gates, validation rules, and registry structure/confidentiality;
  all 17 pre-existing tests continue passing unmodified.

## Phase 2 — Completed: BPIP as the RFQ Function's data source, single source of truth confirmed

`functions/api/export-quote.ts` now imports `publishedProducts` and the new
`privateLabelEligibleProducts` selector directly from
`shared/productIntelligence/publishedRegistry.ts`, plus `productTypeLabels`
from `shared/productIntelligence/types.ts`. It no longer imports from
`client/src/data/products.ts` at all. `privateLabelEligibleProducts`
(added in Phase 2) mirrors the prior `privateLabelDiscoveryProducts`
selector exactly (`supplyType: "manufactured"` +
`privateLabelEligibility: "approved_for_discovery"` + currently published)
and is now the single allowlist both the website and the RFQ Function
derive from.

The Function still imports only the published-registry view, not
`internalCandidates.ts` — there was no functional need for server-side
awareness of unapproved candidates in this phase, and importing only what's
needed keeps the change minimal.

**Single source of truth is now enforced by two build-blocking checks**,
not just by convention:

- `scripts/verify-single-source-of-truth.ts` (new in Phase 2) fails the
  build if any file outside `publishedRegistry.ts`/`internalCandidates.ts`
  defines a hardcoded product record, or if `export-quote.ts` imports from
  `client/src/data/products.ts` again. Verified to fail closed by
  temporarily reintroducing the RFQ Function's old import and confirming
  the build broke.
- `scripts/verify-no-internal-leak.ts` (Phase 1) continues to guard the
  client-bundle boundary.

**Zero regression, verified**: all 11 pre-existing RFQ-endpoint tests
(`functions/api/export-quote.test.ts` — covering product allowlisting,
wholesale/distribution qualification, private-label gating, Reply-To, and
rejection paths) pass completely unmodified against the new data source,
plus 4 new tests directly on the new selector. `client/src/data/products.ts`
is unchanged by Phase 2 and continues serving the website as the
presentation-layer adapter described in Phase 1 — Phase 2 only changed
where the _Function_ gets its data, not the website's.

With Phase 1 and Phase 2 complete, every consumer in the repository —
the website (via the `products.ts` adapter) and the RFQ Function (directly)
— now traces back to exactly one place product data is defined:
`shared/productIntelligence/publishedRegistry.ts` for public records,
`shared/productIntelligence/internalCandidates.ts` for internal-only ones.

## Phase 3 — Proposal: operations visibility

A read-only internal view (a simple static page behind Cloudflare Access,
or a CLI script) that renders `internalOnlyRecords` with their lifecycle
state, blocked reason, and required next action — turning
`docs/PRODUCT_INTELLIGENCE_RECONCILIATION.md`'s findings into a live,
always-current list instead of a point-in-time document. Still no
database: this would read directly from the registry module at build or
request time. Requires confirming Cloudflare Access (or equivalent) is an
acceptable internal-access control before implementation.

## Phase 4 — Decision point: persistent storage

If the registry grows to the point where editing TypeScript files by hand
is the actual bottleneck (the task's own framing: "50, 100, or 300
products"), a persistent store becomes worth its operational cost. This is
a genuine architectural decision requiring business approval — per
`AI_TASK_PROTOCOL.md`, introducing a database is out of scope without it.
When that decision is made, the migration path is direct because of how
Phase 1 was built:

- `ProductIntelligenceRecord` becomes the row/document shape for the
  chosen store (Cloudflare D1 is the most natural fit given the existing
  Cloudflare Pages/Functions hosting, but this is a decision for that
  future phase, not assumed here).
- `workflow.ts` and `validate.ts` need no changes — they're pure functions
  over the record shape, independent of where records are stored.
- `publishedRegistry.ts` and `internalCandidates.ts` become read
  queries against the store instead of static arrays; the module boundary
  (client-safe vs. internal-only) becomes a query-level filter instead of
  a file-level one, enforced the same way (plus the same automated
  build/runtime leak check, adapted to scan API responses instead of only
  the built JS bundle).
- `client/src/data/products.ts`'s adapter function (`toPublicProduct`)
  and its entire public export surface do not need to change at all —
  this is the direct payoff of building the adapter layer in Phase 1.

## What would trigger moving to Phase 4 sooner

- Editing the registry becomes a frequent, error-prone, multi-file task
  (a strong signal today would be needing a non-technical person to update
  product data directly).
- A future consumer (operations dashboard, AI agent) needs to _write_
  product state changes, not just read them — Phase 1–3 are read-only by
  design.
- Multiple people need to edit the registry concurrently.

None of these conditions are met today (26 total records, one contributor,
read-only consumers). Phase 1's lightweight approach is the right fit for
the platform's current actual scale, matching the task's own instruction to
"start with lightweight architecture that can evolve later."
