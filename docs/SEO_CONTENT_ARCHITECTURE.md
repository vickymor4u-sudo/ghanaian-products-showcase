# SEO Content Architecture

Status: **Design approved and implemented, 9 August 2026 — all 5 pages
live in production.** URL slugs were decided as SEO-facing names
distinct from BPIP's internal slugs (`/products/fufu-flour`,
`/products/gari`, `/products/cassava-flour`, `/products/banku-mix`,
`/products/kokonte`, mapped to BPIP's `fufu-borga`/`gari-borga`/etc. in
`client/src/data/productUrlSlugs.ts`), resolving the "open decision"
originally recorded in §2 below. All 5 were built together rather than
staged 2-then-3 as originally recommended, per explicit approval. The
recommendations below are kept as the design record; where a
recommendation was later superseded by an implementation decision, a
note says so inline.

## 1. Which products justify a dedicated page

All 5 published products qualify in principle — each has a distinct
category, description, variants, and packaging data in
`shared/productIntelligence/publishedRegistry.ts` sufficient to fill a
real page, not a thin one. The open question is priority order, since
building all 5 at once is more work than validating the approach on one
or two first.

**Recommended priority, with reasoning** (this session has no
keyword-volume tool — see `docs/SEARCH_INTELLIGENCE_FRAMEWORK.md` §5 —
so priority here is based on content depth and business signal already
in BPIP, not proven search demand):

| Priority | Product (slug) | Why this rank |
| --- | --- | --- |
| 1 | Fufu Flour (`fufu-borga`) | Explicitly the "flagship BorgaFoods product" per its own registry description; the *only* product with `approved_for_discovery` private-label status, giving this page a second, genuinely distinct search intent to serve (see §3); has 2 approved images (richer page than a 1-image product allows). |
| 2 | Gari (`gari-borga`) | Deepest bulk-packaging data (25kg/50kg sacks) of any product — the most concrete content for a wholesale/bulk-buyer-focused page. |
| 3 | Cassava Flour (`cassava-flour`) | Same bulk-packaging depth as Gari (25kg/50kg sacks); distinct enough from Gari in use-case ("for fufu preparation" per its variants) to justify its own page rather than folding into Gari's. |
| 4 | Banku Borga (`banku-borga`) | 2 approved images (same content depth as Fufu Flour); bulk packaging is "Available upon request" only (thinner than #2–3). |
| 5 | Kokonte (`kokonte-borga`) | Thinnest packaging data (retail only, bulk "Available upon request," single image, no reconciliation-workbook presence per its own `internalNotes`) — still a real, published product, just the least content-rich of the five. |

This mirrors the ordering suggested alongside this phase's brief
(Fufu Flour, Gari, Cassava Flour, Banku, Kokonte) — independently arrived
at here from BPIP's own data depth and approval state, which is a
useful cross-check that the ordering isn't arbitrary.

**Recommendation**: build 1–2 first (Fufu Flour, Gari), verify they
actually get crawled/indexed correctly (reusing the same verification
discipline from the technical-SEO phase — raw HTML canonical check,
Search Console URL Inspection once available), then extend to the
remaining 3 rather than building all 5 speculatively at once.

## 2. Recommended URL structure

`/products/{slug}` — nested under the existing `/products` catalogue
page, e.g. `/products/fufu-borga`, `/products/gari-borga`.

**Open decision, not resolved here**: should the URL segment be the
existing internal BPIP slug (`fufu-borga`, `gari-borga`,
`kokonte-borga`, `banku-borga`) as-is, or a cleaner search-facing slug
(`/products/fufu-flour`, `/products/gari`)? Using the BPIP slug directly
is simpler — one source of truth, no separate URL-mapping table to keep
in sync — but three of the four multi-word slugs carry a "-borga" suffix
that doesn't appear in how a buyer would actually search ("fufu flour
export" has no "borga" in it). A separate, human-chosen URL slug is more
SEO-conventional but adds a small mapping layer. This is a naming
decision worth a quick call before any page is built, not a technical
blocker either way.

## 3. Page purpose and target intent, per product page

Each page's job: be the specific page Google shows for "{product} +
export/wholesale/supplier" style queries, instead of competing with
`/products`' single page that currently represents all 5 products at
once. Structure, reusing what already exists rather than inventing new
components:

- **Product identity**: name, category, full description, variants — already written, BPIP-sourced, just needs to move from `/products`' repeated block to its own page.
- **Buyer-facing specs**: retail/bulk packaging sizes, shelf life, storage, certification, origin — same BPIP fields already rendered on `/products` today.
- **Structured data**: `SchemaMarkup type="product"` already supports this exact use case — it's keyed by slug specifically so multiple instances can coexist (built during the Search & Analytics Foundation phase for this reason). No component change needed.
- **Conversion path**: the existing `ExportQuoteButton` with `productSlug` pre-fill already exists and works today from `/products` — reused unchanged.
- **Fufu Flour only**: a private-label section using the exact approved wording from `BUSINESS_RULES.md`, giving this one page a second target intent ("private label fufu flour" — see §4) without a separate page.

**Required change to `/products` itself** (a page to *modify*, not just
new pages to add): today, `/products` shows each product's **full**
description/variants/details block. If individual product pages are
built with the *same* full text, `/products` and each new page would
carry duplicate content — a real technical-SEO problem, not a
theoretical one (this is exactly the class of issue the technical-SEO
phase spent effort removing elsewhere on the site). Recommended fix:
`/products` becomes a catalogue **index** — image, name, one-line
summary (the `summary` field already exists in BPIP for exactly this),
and a "View full details" link to the dedicated page — while the full
description/variants/spec block moves to live only on the dedicated
page. This is a real content change to `/products`, tracked in
`docs/CONTENT_ARCHITECTURE_IMPLEMENTATION_PLAN.md`, not something to
build silently alongside the new pages.

## 4. Assessment of buyer-intent pages (e.g. "African Food Wholesale Supplier")

Raised alongside this phase's brief as a second content type to
consider, with the explicit constraint "only where claims are
supported." Checked each proposed example against what already exists:

| Proposed page | Assessment | Recommendation |
| --- | --- | --- |
| "African Food Wholesale Supplier" | `/wholesale` already targets this near-exactly (title: "Wholesale Ghanaian Foods & Distributor Partnerships") and covers the same buyer personas (distributors, grocery retailers, wholesalers, food-service). A separate page would largely duplicate it. | **Do not build separately.** Confirm `/wholesale`'s SEO title/keywords already cover this phrasing (they do — see `docs/SEO_FOUNDATION.md`'s per-page keyword audit). |
| "Ghana Food Exporter" | Overlaps heavily with `/export-solutions` and `/about`'s existing positioning. | **Do not build separately** for the same duplicate-content reason. |
| "African Grocery Distributor Supply" | Overlaps with `/wholesale`'s "Grocery retailers" persona, already covered explicitly. | **Do not build separately.** |
| "Private Label Fufu Flour" | The one genuinely distinct, well-supported combination — Fufu Flour is the *only* private-label-eligible product, with exact approved wording already written. | **Do not build as a fully separate page either** — folding it into the Fufu Flour product page (§3) as a dedicated section serves the same intent without creating a third place (alongside `/wholesale`'s existing private-label section) carrying near-identical text. |

**Overall recommendation**: do not build separate buyer-intent pages.
The existing page architecture (`/wholesale`, `/export-solutions`,
`/about`) already targets these intents, and near-duplicate pages risk
self-competition in search results rather than helping — pages
competing against each other for the same query is a worse outcome than
one clear, strong page. Where a buyer-intent page's SEO title/keywords
could be sharpened to better match a target phrase, that's a targeted
metadata edit to an *existing* page, not a new page — flagged as an
optional, low-risk item in the implementation plan.

## Related documents

- `docs/SEARCH_INTELLIGENCE_FRAMEWORK.md` — the keyword/topic categories these pages would target.
- `docs/BUYER_CONVERSION_GAP_ANALYSIS.md` — what content gap each page (new or modified) needs to close.
- `docs/CONTENT_ARCHITECTURE_IMPLEMENTATION_PLAN.md` — the consolidated build order, approvals needed, and risks.
