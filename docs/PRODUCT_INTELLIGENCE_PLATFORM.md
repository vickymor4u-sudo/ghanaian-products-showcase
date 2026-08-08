# BorgaFoods Product Intelligence Platform (BPIP) — Phase 1

Status: **Implemented locally, 8 August 2026. Zero-regression migration of the existing public catalog; no new products published.**

## Purpose

BPIP is the internal, typed product registry intended to become the single
source of truth for product data, publication approval, imagery,
packaging, export/wholesale/private-label readiness, review status, and
documentation status — replacing prose-only tracking in
`PRODUCT_CAPABILITY_MODEL.md` with machine-checkable structure, while
leaving that document's actual authority and decisions untouched.

**The website is now a consumer of BPIP, not the owner of product data.**
`client/src/data/products.ts` no longer defines product records inline; it
adapts BPIP's richer registry shape into the flat shape the UI already
expects. This is a real architectural change, implemented as a
behavior-preserving refactor — every existing test passes unmodified, and
the built output was diffed byte-for-byte against the pre-BPIP build to
confirm no public content changed.

## Why an in-repo typed module, not a database

`AI_TASK_PROTOCOL.md` prohibits introducing a CMS, database, or server
architecture without approval. The task that commissioned this platform
explicitly reinforced that constraint ("Do not introduce CRM, ERP,
databases... unless existing architecture clearly requires them. Start
with lightweight architecture that can evolve later"). The current
architecture — a static site plus one stateless Cloudflare Pages Function —
does not clearly require a database for 26 known product records.

BPIP Phase 1 is therefore a typed TypeScript module tree under
`shared/productIntelligence/`, following the same pattern the codebase
already used successfully for `client/src/data/products.ts` and
`shared/exportQuote.ts`: plain data + pure functions, validated at build
time, covered by tests. See `docs/BPIP_MIGRATION_PLAN.md` for what would
change if a real backend is later approved, and why nothing about this
design blocks that.

## Module map

```
shared/productIntelligence/
  types.ts               Core types: ProductIntelligenceRecord, lifecycle
                          state machine, approval/workflow status enums.
  workflow.ts             Pure gate functions: isCurrentlyPublished,
                          computeNewPublicationEligibility,
                          computeRfqEligibility,
                          computePrivateLabelEligibility.
  validate.ts             assertRegistryIntegrity — build-blocking checks
                          over the full registry.
  publishedRegistry.ts    THE 5 LIVE PRODUCTS ONLY. Client-safe. The only
                          BPIP file client/src/ may import from directly
                          (plus types.ts).
  internalCandidates.ts   Internal-only candidate/review-gated records.
                          MUST NEVER be imported from client/src/.
  registry.ts             Combines the two into one view, for build
                          scripts/tests/future server-only tooling only.
  index.ts                Full barrel (server/tooling use only — see its
                          own warning comment).
```

## The module boundary is the confidentiality control

This is the one design decision worth understanding in detail, because it
was discovered as a real bug during implementation, not designed
speculatively:

A bundler (Vite/Rollup) cannot tree-shake elements out of an array that is
filtered at runtime. If `client/src/data/products.ts` had imported the
combined registry (published + internal candidates) and then filtered for
published records in JavaScript, **the entire internal candidate array —
21 unapproved product names plus Red Palm Oil, plus internal status
strings like `supplier_branded_blocked` — would have shipped to every
visitor's browser**, even though nothing renders it. This was caught during
this implementation by diffing the built bundle and is now prevented two
ways:

1. **Structural**: `client/src/data/products.ts` imports only from
   `publishedRegistry.ts` and `types.ts` — files that never import
   `internalCandidates.ts`. There is no code path for internal data to
   reach the client bundle.
2. **Automated**: `scripts/verify-no-internal-leak.ts` runs after every
   `vite build` (wired into `pnpm build`) and fails the build if any
   internal candidate slug, name, or internal-only status literal appears
   in the built JS. This was verified to actually fail closed by
   temporarily reintroducing the leak during implementation and confirming
   the build failed with exit code 1.

No supplier name, brand, or price ever entered this repository at all —
that is a separate, stronger rule already covered by
`docs/PRODUCT_INTELLIGENCE_RECONCILIATION.md` and unaffected by this
module boundary.

## Lifecycle vs. capability-model authority

`ProductLifecycleState` (`candidate → under_review → review_gated |
approved_internal → approved_public → published → archived`) is BPIP's own
workflow tracking. It is **not** a re-interpretation of the frozen
capability model's `Public Display Status` field — the two are required to
agree for any record claiming `published` (`assertRegistryIntegrity`
enforces this).

Critically, `computeNewPublicationEligibility` (the full gate-check
function) is a planning tool for evaluating **candidates**, never a
mechanism for re-judging an already-published record. `isCurrentlyPublished`
— a simple, direct read of `lifecycle.state === "published"` — is the only
function that determines whether a product is actually live, and it never
re-derives that fact from other fields. This is why Fufu Flour can carry an
informational `reviewGate: "PCR-001"` note (reinforcing the open question
`docs/PRODUCT_CLASSIFICATION_REVIEW.md` already recorded) while remaining
fully published: the note documents context, it does not retroactively gate
an existing approval. PCR-001 and PCR-002 are represented exactly as
recorded elsewhere in `docs/`, not reinterpreted.

## Current registry contents

- **5 published records** (`lifecycle.state: "published"`): Fufu Flour,
  Gari, Kokonte, Banku Borga, Cassava Flour — migrated with identical field
  values from the prior `products.ts`.
- **21 internal-only candidates** (`lifecycle.state: "candidate"`): the
  products identified in `docs/PRODUCT_INTELLIGENCE_RECONCILIATION.md`.
  Every one fails `computeNewPublicationEligibility` on multiple gates
  (no display approval, no public-safe image, incomplete documentation).
- **1 review-gated record**: Red Palm Oil (`lifecycle.state:
"review_gated"`, `reviewGate: "PCR-002"`), treated as `partner_sourced`
  for internal planning only, per `docs/PRODUCT_CLASSIFICATION_REVIEW.md`.

## Future consumers

The module boundary and the `index.ts` barrel are designed so a future
server-side consumer (an operations dashboard backend, an AI agent with
repository or API access, an analytics job) can depend on the full
registry — including lifecycle/approval workflow state — without any
redesign of this layer. The RFQ Function (`functions/api/export-quote.ts`)
already runs server-side and could migrate to import from BPIP directly in
a later phase; it currently continues importing from
`client/src/data/products.ts` unchanged, since that file's export surface
did not change and no functional reason required touching it in Phase 1.

## What Phase 1 deliberately does not do

- Does not publish any candidate product. Publication requires a recorded
  business decision changing a record's approvals — see
  `docs/PRODUCT_INTELLIGENCE_RECONCILIATION.md` for exactly what's needed.
- Does not change PCR-001, PCR-002, or any private-label approval.
- Does not add a database, CMS, API server, or authentication.
- Does not change the RFQ Function, Turnstile flow, or email delivery.
- Does not redesign any public page. The only observable website change is
  that its data now flows through an adapter instead of being defined
  inline — verified to be pixel/byte-identical output.
