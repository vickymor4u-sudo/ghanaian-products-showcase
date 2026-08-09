# Export Buyer Content Architecture — Implementation Plan

Status: **Phase 1 (items 1–2 below) approved, implemented, and verified
live in production, 9 August 2026 — commit `6ea7eb9`.** This document
is kept as the original plan record; see `docs/CHANGE_LOG.md` for the
implementation entry and `docs/PUBLIC_CLAIM_VERIFICATION_AUDIT.md` /
`docs/SEO_CONTENT_ARCHITECTURE.md` for the updated, "as-built" status of
each recommendation below.

## Pages to create

**Status: all 5 built and live**, at the URLs the explicit
implementation approval specified (resolving the "open decision" this
plan originally flagged) — `/products/fufu-flour`, `/products/gari`,
`/products/cassava-flour`, `/products/banku-mix`, `/products/kokonte`,
each mapped to its unchanged BPIP internal slug in
`client/src/data/productUrlSlugs.ts`. Built together in one pass rather
than staged 2-then-3, per explicit approval superseding the original
build-order recommendation below (kept for the record):

| Page | URL (as built) | Purpose | Target intent |
| --- | --- | --- | --- |
| Fufu Flour product page | `/products/fufu-flour` | Dedicated page for the flagship product; includes a private-label section | "fufu flour export/wholesale," "private label fufu flour" |
| Gari product page | `/products/gari` | Dedicated page, strongest bulk-packaging content | "gari export/wholesale supplier" |
| Cassava Flour product page | `/products/cassava-flour` | Dedicated page | "cassava flour export/wholesale" |
| Banku Borga product page | `/products/banku-mix` | Dedicated page | "banku flour export" |
| Kokonte product page | `/products/kokonte` | Dedicated page | "kokonte flour export" |

**Original build-order recommendation** (superseded — all 5 shipped
together): Fufu Flour and Gari first (highest content depth and
business signal — see `docs/SEO_CONTENT_ARCHITECTURE.md` §1),
verify they index and render correctly, then extend to the remaining
three.

**Not recommended**: separate "buyer-intent" pages ("African Food
Wholesale Supplier," "Ghana Food Exporter," "African Grocery Distributor
Supply," standalone "Private Label Fufu Flour"). Full reasoning in
`docs/SEO_CONTENT_ARCHITECTURE.md` §4 — each would substantially
duplicate an existing page's content and risk self-competition in search
results rather than helping.

## Pages to modify

| Page | Change | Why | Requires approval? |
| --- | --- | --- | --- |
| `/products` | Convert from showing each product's full detail block to a catalogue index (image, name, one-line summary, link to the dedicated page) | Prevents duplicate content once dedicated product pages exist | No — mechanical restructuring of already-approved content, no new claims. **Not yet done**: Phase 1 only added a "View full product page" link per product, per its explicit "framework only" scope; the full index conversion remains open. |
| `/about` | ~~Apply the 7 drafted corrections~~ **Done, 9 August 2026** — all 7 applied exactly as drafted, live in production (commit `6ea7eb9`). | Closed real `BUSINESS_RULES.md` violations | Approved and complete. |
| `/export` | Add an indicative lead-time range and a statement of shipping mode (sea/air), if and when the business confirms them | Closes the two real conversion gaps in `docs/BUYER_CONVERSION_GAP_ANALYSIS.md` | **Yes — this is new factual content, not currently documented anywhere; requires the business to supply and approve the actual figures, not just approve wording.** |
| `/wholesale`, `/export-solutions` | Optional: sharpen SEO title/keyword phrasing to more directly match "African food wholesale supplier"/"Ghana food exporter" style queries, in place of building separate pages for them | Captures the buyer-intent-page idea's value without duplicate-content risk | No — metadata-only tightening within already-approved page purpose |

## SEO targets

Per `docs/SEARCH_INTELLIGENCE_FRAMEWORK.md`, restated here against the
concrete pages above:

- Each new product page targets its own product-name + export/wholesale
  query cluster (table in "Pages to create" above), which today all
  compete for the single `/products` page.
- `/products` itself shifts from trying to rank for all 5 products at
  once to being the internal-linking hub and catalogue-browse target
  (a legitimate, different intent — "what does BorgaFoods sell" vs.
  "does BorgaFoods sell gari").
- No new origin/category or buyer-role terms are introduced beyond what
  `docs/SEARCH_INTELLIGENCE_FRAMEWORK.md` §2–4 already covers — this
  plan is about giving existing target terms dedicated pages, not
  inventing new ones.
- **Real search-volume validation is still not possible this session**
  (no keyword tool, and Search Console's Performance report is still
  processing per `docs/GSC_INDEXING_AUDIT.md`). Build order and
  priority above are based on content depth/business signal, not proven
  demand — worth re-validating once real query data exists.

## Required business approvals (in priority order)

1. ~~**The 7 drafted `/about` corrections**~~ **Approved and applied, 9 August 2026.**
2. **An actual lead-time range and shipping mode**, if BorgaFoods wants to close the two real conversion gaps in `docs/BUYER_CONVERSION_GAP_ANALYSIS.md`. This repository still has no visibility into either fact and cannot draft a "corrected" version the way it could for the `/about` claims — this needs the business to supply the real figures. **Still open.**
3. ~~**URL slug decision**~~ **Resolved, 9 August 2026** — SEO-facing slugs distinct from BPIP's internal ones (`/products/fufu-flour`, `/products/gari`, `/products/cassava-flour`, `/products/banku-mix`, `/products/kokonte`), specified explicitly in the implementation approval.
4. ~~**Sign-off to build the 5 product pages at all**~~ **Approved and built, 9 August 2026** — all 5 live in production.
5. **Still open, not yet approved**: converting `/products` into a catalogue index (see "Pages to modify" above) — the duplicate-content risk this would resolve is not yet closed.

## Risks

| Risk | Mitigation already built into this plan |
| --- | --- |
| Duplicate content between `/products` and new product pages | `/products` is explicitly scoped to become an index, not left as-is alongside new pages (see "Pages to modify") |
| New pages competing with each other or with `/wholesale`/`/export-solutions` in search results | Buyer-intent pages explicitly not recommended for this reason (§"Pages to create"); each product page targets a distinct product, not an overlapping general phrase |
| A drafted `/about` correction turns out to be wrong once the business reviews it | Corrections are presented as drafts for review, not silently applied — nothing changes until approved |
| Publishing a lead-time range or shipping mode that turns out to be inaccurate | Not drafted speculatively — explicitly held as "needs the real figure from the business," not guessed |
| BPIP governance drift (a new page accidentally exposing internal-only data or an unapproved product) | New pages reuse the existing `publishedProducts`/`SchemaMarkup`/`ExportQuoteButton` components and BPIP's own public-safe fields exclusively — no new data source, no new product, nothing sourced outside `publishedRegistry.ts` |
| Effort spent on pages that don't end up mattering, given no real keyword-volume validation is possible yet | Build order is staged (2 pages first, verify, then the rest) rather than all 5 at once |

## What happens next

This plan is the complete deliverable for this phase. No code changes,
no new pages, and no content edits have been made. The concrete next
step is business review of:

1. the 7 drafted `/about` corrections (ready to apply as-is once approved),
2. whether to supply a real lead-time range / shipping-mode statement,
3. the URL-slug naming decision,

after which page-building work can begin against this architecture.

## Related documents

- `docs/PUBLIC_CLAIM_VERIFICATION_AUDIT.md`
- `docs/SEO_CONTENT_ARCHITECTURE.md`
- `docs/BUYER_CONVERSION_GAP_ANALYSIS.md`
- `docs/BUYER_INTENT_CONTENT_AUDIT.md`, `docs/SEARCH_INTELLIGENCE_FRAMEWORK.md`, `docs/GSC_INDEXING_AUDIT.md`, `docs/GA4_ACTIVATION_PLAN.md` — prior phase's outputs this plan builds on
- `docs/BUSINESS_RULES.md`, `docs/PRODUCT_CAPABILITY_MODEL.md`, `docs/PUBLIC_PRODUCT_PRESENTATION_RULES.md` — the governing rules every recommendation above was checked against
