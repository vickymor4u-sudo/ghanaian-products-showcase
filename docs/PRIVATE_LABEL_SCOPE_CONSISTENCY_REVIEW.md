# Private-Label Scope Consistency Review

Status: **Impact analysis only. No technical change made — BPIP,
website code, RFQ validation, and public website claims are all
unchanged.** Produced in response to a business decision to broaden
BorgaFoods' private-label *outreach* scope from Fufu Flour alone to
five products (Fufu Flour, Banku Mix, Kokonte, Gari, Cassava Flour),
with an explicit instruction to map every affected location and get a
full consistency review before touching anything technical. This
document is that review. It makes one recommendation and one narrow
documentation update (below); everything else is deliberately left
exactly as it is, pending a separate, explicit go-ahead.

**Naming note**: "Banku Mix" in the business's phrasing refers to the
same product BPIP and the live site call **Banku Borga** (internal
slug `banku-borga`, public URL slug `banku-mix` per
`client/src/data/productUrlSlugs.ts`). No new product is being
introduced — this review treats "Banku Mix" and "Banku Borga" as the
same product throughout.

## The single source of truth, confirmed

Tracing the code (not assuming from memory) confirms the architecture
is exactly as intact as the business described. There is exactly
**one** field that determines private-label eligibility, and every
downstream consumer derives from it — nothing hardcodes a product name
independently:

```
shared/productIntelligence/publishedRegistry.ts
  → each product's `privateLabelEligibility` field
    ("approved_for_discovery" | "requires_business_approval" | "not_eligible_by_default")
  → publishedRegistry.privateLabelEligibleProducts  (derived selector, BPIP)
      ├─→ functions/api/export-quote.ts            (server-side RFQ allowlist — imports BPIP directly)
      └─→ client/src/data/products.ts               (thin adapter)
            ├─→ privateLabelDiscoveryApproved (per-product boolean)
            │     └─→ client/src/pages/ProductDetail.tsx  (shows/hides the private-label section per product page)
            └─→ privateLabelDiscoveryProducts (array)
                  └─→ client/src/pages/Contact.tsx        (private-label product dropdown + validation)
```

Today, exactly one product — `fufu-borga` (Fufu Flour) — has
`privateLabelEligibility: "approved_for_discovery"`. The other four
manufactured products (`gari-borga`, `cassava-flour`, `banku-borga`,
`kokonte-borga`) are `"requires_business_approval"`. This single field,
in this single file, is what currently makes the RFQ form, every
product page, and the server-side validator all agree that only Fufu
Flour is eligible.

The parallel, human-readable authorization record is
`docs/PRODUCT_CAPABILITY_MODEL.md`'s "Recorded private-label discovery
decision" table (currently one row: Fufu Flour, with its exact approval
conditions spelled out). That document's own rule (line 64) is explicit:
*"Do not add, remove, rename, or reinterpret capability fields, allowed
values, supply classifications, or private-label controls without
explicit business approval."* — meaning a scope change requires both an
entry in that table **and** the corresponding registry field change,
together, not one without the other.

## Every location affected, categorized

### Category A — The single source of truth (2 files; changing these propagates everywhere in category B automatically)

| # | File | What would change |
| - | --- | --- |
| 1 | `docs/PRODUCT_CAPABILITY_MODEL.md` | Add 4 new rows to the "Recorded private-label discovery decision" table (Gari, Cassava Flour, Banku Borga, Kokonte), each with its own approval conditions — the human-readable authorization record |
| 2 | `shared/productIntelligence/publishedRegistry.ts` | Change `privateLabelEligibility` from `"requires_business_approval"` to `"approved_for_discovery"` for `gari-borga`, `cassava-flour`, `banku-borga`, `kokonte-borga` |

**Not touched by this review.** These are the two files a follow-up,
explicitly-approved technical change would edit — and, per the
architecture, editing only these two is sufficient; nothing else needs
manual patching.

### Category B — Derived automatically from Category A (no independent edit ever needed)

| # | File | Why it's automatic |
| - | --- | --- |
| 3 | `client/src/data/products.ts` | Computes `privateLabelDiscoveryApproved` and `privateLabelDiscoveryProducts` directly from the registry field |
| 4 | `client/src/pages/Contact.tsx` | Its private-label product dropdown and `selectableProducts` validation both read `privateLabelDiscoveryProducts` from the adapter above |
| 5 | `client/src/pages/ProductDetail.tsx` | Shows the private-label section only when `product.privateLabelDiscoveryApproved` is true, per product |
| 6 | `functions/api/export-quote.ts` | Server-side RFQ validation imports `privateLabelEligibleProducts` directly from BPIP (not from the client adapter) — this is the same architectural guarantee `scripts/verify-single-source-of-truth.ts` enforces at build time |
| 7 | `functions/api/export-quote.test.ts`, `functions/product-catalog.test.ts`, `shared/productIntelligence/*.test.ts` | Existing tests assert against whatever the registry currently says — would need review (not necessarily rewriting) once Category A changes, to confirm the expanded allowlist is what's actually tested |

**This is the proof of the architecture working as intended.** Five
files reference private-label logic in code, and precisely zero of them
would need a manual edit beyond Category A — this is the exact outcome
`docs/BPIP_MIGRATION_PLAN.md` and `docs/PRODUCT_INTELLIGENCE_PLATFORM.md`
were built to guarantee.

### Category C — Independently-worded buyer-facing documents (Fufu-only in prose; NOT fixed automatically by a Category A change)

These are the real risk the business flagged — content that states a
scope in English sentences, disconnected from the registry field:

| # | File | Current wording |
| - | --- | --- |
| 8 | `docs/EXPORTER_PROFILE_FINAL.md` §4 | "BorgaFoods also supports private-label discussions for Fufu Flour, its current approved private-label discovery product" |
| 9 | `docs/EXPORTER_PROFILE_ONE_PAGER.md` | Checked directly — this document does **not** mention private-label at all (its "Certifications & registrations" section covers Ghana FDA and GEPA only). Not actually a Category C item; listed here only to confirm the check was done, not skipped. |
| 10 | `docs/EXPORTER_PROFILE_PDF_OUTLINE.md`, `docs/EXPORTER_PROFILE_PDF_DRAFT.md` | Superseded by #8 already (marked so in a prior phase) — lower priority, but technically still say Fufu-only in their retained historical text |
| 11 | `docs/BUYER_OUTREACH_TEMPLATES.md`, Template 3 | "BorgaFoods currently supports private-label discussions for **Fufu Flour**" — explicit warning already in that doc against adapting it to other products "without that product first clearing the same approval gate" |
| 12 | `docs/BUYER_OUTREACH_SEQUENCE.md`, Sequence C (Day 0/5/14/30) | Same Fufu-only scope throughout all 4 emails |
| 13 | `docs/BUYER_TARGETING_FRAMEWORK.md`, Tier 2 "Private-label buyers" | Explicitly scoped "(Fufu Flour only)" in its section heading and reasoning |

**These do not update themselves.** Each is prose written by a prior
phase of this project, and each would need an explicit edit to reflect
a broader scope — which is exactly why the business was right to ask
for this review before assuming "update the framework" was a
one-sentence instruction.

### Category D — Already scope-agnostic; needs no change either way

| # | File | Why it's already safe |
| - | --- | --- |
| 14 | `client/src/pages/Wholesale.tsx` | Its "Private-label Discovery" card already says "BorgaFoods supports private-label discussions for **selected products**" — it never names Fufu Flour specifically. This page requires **no edit** under either scope, today or after any future Category A change. |

This is a genuinely good finding: the one piece of *live public website
copy* that talks about private-label doesn't over- or under-claim
either way — it was already written conservatively enough to survive a
scope change without modification.

## The contradiction risk, stated plainly

If Category C documents were updated to name all 5 products **without**
first changing Category A, the result would be exactly what the
business described: outreach emails and the exporter profile would
promise private-label discovery for Gari, Cassava Flour, Banku Borga,
and Kokonte, while `/contact`'s dropdown and the server-side RFQ
validator would still reject those four products for a private-label
enquiry (`invalid_request`, per the same allowlist check verified
working correctly in `docs/WEBSITE_ROADMAP.md`'s Phase 4C notes). A
buyer who received one of those emails and then tried to submit a
private-label enquiry for, say, Gari would hit a rejected form with no
explanation — a real, avoidable trust failure.

## Recommendation

**Two sequenced steps, not one combined change:**

1. **Approve and implement the Category A change first** — this is a
   small, well-contained, single-source edit (4 field values in one
   registry file, plus 4 new rows in the capability-model decision
   table), following the same discipline as every prior BPIP change in
   this project: update the two Category A files, run the full
   validation suite (`tsc`, the 4 guard scripts, `vitest`, `vite
   build`), review whether the Category B test files need updated
   assertions, then commit/push/preview-verify/merge/production-verify —
   the same cycle just completed for the GEPA trust update.
2. **Only then, update Category C** — once Category A is live, every
   Category C document can be safely updated to name all 5 products,
   because by that point the RFQ form and product pages will actually
   support what the documents claim. Updating Category C first, or at
   the same time as Category A without verifying Category A shipped
   successfully, is what recreates the exact contradiction risk above.

**This review does not implement step 1**, per the explicit
instruction to stop after the impact analysis. It's scoped, small, and
ready to execute the moment it's explicitly approved as its own task.

## What this review does update, right now

Exactly one document: `docs/BUYER_TARGETING_FRAMEWORK.md`'s Tier 2
"Private-label buyers" section. This is the one Category C location
that is genuinely about **outreach targeting intent** ("who is
BorgaFoods willing to explore this conversation with") rather than a
document ever sent to or shown to a real buyer — matching the
business's own distinction between "Buyer Outreach Framework" and
"Product Capability / Website Rules." It's updated to note the
business's decision to broaden targeting to 5 products, with an
explicit, prominent caveat that actual outreach content and the website
remain Fufu Flour-only until Category A ships. See the diff in
`docs/BUYER_TARGETING_FRAMEWORK.md` itself.

**Not updated in this pass, and explicitly left as Fufu Flour-only
pending Category A**: `docs/BUYER_OUTREACH_TEMPLATES.md` and
`docs/BUYER_OUTREACH_SEQUENCE.md` (each given a short cross-reference
note pointing here, without changing their actual scope claim), and
`docs/EXPORTER_PROFILE_FINAL.md` (same treatment) — because these are
literal send-ready or buyer-facing content, and updating them now would
recreate the exact contradiction this review exists to prevent.
(`docs/EXPORTER_PROFILE_ONE_PAGER.md` was checked and doesn't mention
private-label at all, so needed no note.)

## Related documents

- `docs/PRODUCT_CAPABILITY_MODEL.md` — Category A's human-readable authorization record.
- `shared/productIntelligence/publishedRegistry.ts` — Category A's machine-consumed source of truth.
- `docs/BPIP_MIGRATION_PLAN.md`, `docs/PRODUCT_INTELLIGENCE_PLATFORM.md` — why this architecture exists and what it's designed to guarantee.
- `docs/BUYER_TARGETING_FRAMEWORK.md` — the one document this review updates.
- `docs/BUYER_OUTREACH_TEMPLATES.md`, `docs/BUYER_OUTREACH_SEQUENCE.md`, `docs/EXPORTER_PROFILE_FINAL.md`, `docs/EXPORTER_PROFILE_ONE_PAGER.md` — Category C documents held pending Category A.
