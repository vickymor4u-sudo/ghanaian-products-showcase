# Product Page Optimization Report

Status: **Implemented and verified live in production, 9 August 2026.**
Covers objectives 1–4 of the "BorgaFoods Product Page Optimization
Phase": reviewing and improving the 5 product pages built in the prior
phase (`docs/CONTENT_ARCHITECTURE_IMPLEMENTATION_PLAN.md`). Objective 5
(missing commercial information) is a separate, approval-only
deliverable — see `docs/COMMERCIAL_INFO_APPROVAL_LIST.md`. No business
claim was changed; every addition below either reorganizes existing
approved content or reuses wording already approved and live elsewhere
on the site verbatim.

## 1. Pages reviewed

All 5: Fufu Flour (`/products/fufu-flour`), Gari (`/products/gari`),
Cassava Flour (`/products/cassava-flour`), Banku Borga
(`/products/banku-mix`), Kokonte (`/products/kokonte`). They share one
template (`client/src/pages/ProductDetail.tsx`), so the review and every
improvement below applies identically to all 5 — differences are noted
where they exist (private-label section, per-product data values).

**Finding from the review**: the pages built in the prior phase were
functionally complete (identity, packaging, structured data, RFQ CTA)
but under-structured for both buyers and search engines — a single long
description block, no persona framing, no FAQ content, no breadcrumb, no
cross-linking to `/export`/`/wholesale`/other products, and meta
descriptions that ran 210–230 characters (well past Google's practical
~155–160 character display limit, meaning they were being truncated).
Everything below addresses one of these findings.

## 2. Buyer conversion sections added

All sourced from data or wording already approved and live elsewhere —
nothing below is new copy invented for this phase:

- **"What Is [Product]?"** — the existing BPIP `description` field, now under its own heading instead of buried in the hero, plus the existing variants list moved alongside it for context.
- **"Export Packaging Options"** — the existing `packagingSizes`/`bulkPackagingSizes` BPIP fields, pulled out of the generic spec table into their own prominent, buyer-focused card (the spec table still shows them too — some overlap between a scannable table and a narrative section is standard B2B page practice, not duplication of claims).
- **"Who [Product] Is For"** — the exact 4 buyer-persona cards (Distributors, Grocery retailers, Wholesalers, Restaurants & food service) already live on `/wholesale`'s "Who We Support" section, reused verbatim. This is accurate to repeat unchanged per product: none of the 5 products has BPIP data suggesting different buyer suitability, and all 5 share `exportAvailable: true`/`wholesaleAvailable: true`, so the same generic persona list is correct for all of them, not an invented per-product claim.
- **Wholesale enquiry CTA** — added a second CTA button (`ExportQuoteButton` with `inquiryType="wholesale"`), reusing the exact existing component and enquiry path already used on `/wholesale` (`/contact?inquiry=wholesale`). No RFQ workflow change — same form, same schema, same Function.
- **"Common Questions" (FAQ)** — 5 questions per page, each answer built directly from BPIP fields or existing approved sitewide wording (availability flags, shelf life/storage, origin/manufacturer, the enquiry-process description already used on `/wholesale`, and the same shipping/lead-time hedge already on the page). No FAQPage structured data was added: Google restricted FAQ rich-result eligibility to a narrow set of government/health sites in 2023, so JSON-LD for this content would add complexity with no visible search benefit — the FAQ still helps as ordinary on-page content and keyword coverage without it.
- **"Other BorgaFoods Products"** — cross-links to the other 4 product pages (name + existing `summary` field), connecting all 5 pages together.
- **Private-label section** — unchanged from the prior phase: renders only on Fufu Flour, the one product BPIP records as `privateLabelDiscoveryApproved`. Deliberately **not** added, even in a hedged/neutral form, to the other 4 pages — `PUBLIC_PRODUCT_PRESENTATION_RULES.md` states a `requires_business_approval` product "must not be presented as eligible," and even a neutral "contact us to check eligibility" line risks implying a possibility that isn't currently approved. This was a judgment call made conservatively; flagged here rather than silently decided.

## 3. SEO review and changes

**Title tags** — reviewed against the ~60-character practical limit.
Prior: `{Product} | Wholesale & Export | BorgaFoods` (all comfortably
under the limit already). Changed to `{Product} | Ghana Wholesale &
Export | BorgaFoods` — adding "Ghana" is a factual, approved detail
(country of origin, already stated on every page) that reflects real
buyer search behavior ("Ghana fufu flour export") without stuffing.
Longest resulting title (Cassava Flour) is 55 characters — still well
under the limit.

**Meta descriptions** — this was the clearest finding. The prior
version concatenated the full BPIP `description` (up to 134 characters
on its own) with a 97-character buyer-CTA sentence, producing
210–231-character descriptions across the 5 pages — all past Google's
practical truncation point, meaning buyers were never seeing the CTA
sentence in search results at all. Fixed by switching to BPIP's existing
short-form `summary` field (already approved, already used in card/list
contexts sitewide) instead of the long `description`, paired with the
same buyer-CTA sentence. Result: 120–133 characters across all 5 pages,
comfortably within range. No wording was invented — `summary` already
existed in BPIP for exactly this kind of short-form use.

**Keywords** — reviewed for stuffing; the existing 5-phrase set
(`{Product}, {Category}, Ghana food export, BorgaFoods {Product},
{Product} wholesale`) was judged reasonable, not spam, and left
unchanged.

**Internal linking** — added in both directions:
- Every product page now links to `/export` (from the Shipping & Lead Time card), `/wholesale` (from the buyer-persona section and the new wholesale CTA), `/contact` (via both CTAs, as before), `/products` (via the breadcrumb), and the other 4 product pages.
- `/export-solutions`'s manufactured-product list now links each product name to its dedicated page (previously plain text) — the one existing page modified in this phase, purely additive (making existing text clickable), no content or claim change.
- `/wholesale` and `/export` were **not** modified to add product-specific links — neither currently lists products individually, and adding that would be a larger content change to an already-approved page, out of scope for this pass.

## 4. Structured data

- **Product schema**: confirmed correct (name, description, sku, category, brand/manufacturer for manufactured products, countryOfOrigin, image — no `offers`/pricing, matching `BUSINESS_RULES.md`). One addition: a `url` field pointing at the product's dedicated page, added to `SchemaMarkup.tsx` globally (so it's also correct for the `Product` schema instances still rendered on `/products`' index listing) — tells search engines where the canonical detail page for each product actually lives.
- **Organization relationship**: confirmed correct, no change made. The `Organization` schema (rendered on `/`) names the legal entity "Supply & Demand Worldwide Ltd" (alternate name "BorgaFoods"); the `Product` schema's `manufacturer` names "BorgaFoods Processing." These are deliberately distinct, approved public names per `BUSINESS_RULES.md` ("The approved public manufacturer name is BorgaFoods Processing... Supply & Demand Worldwide Ltd may be used for the legal/export company"), not an inconsistency to fix by merging them into one `@id`-linked entity.
- **Breadcrumb**: added. `SchemaMarkup.tsx` now supports a `type="breadcrumb"` variant (`BreadcrumbList`, Home → Products → [Product]), paired with a matching visible breadcrumb navigation element on each product page (also a real internal link back to `/products`, not just structured data).

## Validation

TypeScript check, all 51 tests, and the full production build (all four
guard scripts) passed. Verified in a local production preview and then
against a Cloudflare preview deployment before merging: all 5 pages
render every new section correctly, console is clean, Product/breadcrumb
JSON-LD validates, the wholesale CTA resolves to the existing
`/contact?inquiry=wholesale` path, the private-label section appears
only on Fufu Flour, cross-product links correctly exclude the current
page, and `/export-solutions`'s new product links resolve correctly. Full
production re-verification recorded in `docs/CHANGE_LOG.md`.

## Related documents

- `docs/COMMERCIAL_INFO_APPROVAL_LIST.md` — objective 5, missing commercial information, approval-only.
- `docs/CONTENT_ARCHITECTURE_IMPLEMENTATION_PLAN.md` — the phase that built the 5 pages this report optimizes.
- `docs/BUYER_CONVERSION_GAP_ANALYSIS.md` — the earlier gap analysis this phase's FAQ/shipping content is consistent with.
