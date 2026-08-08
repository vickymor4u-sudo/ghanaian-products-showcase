# SEO & Analytics Foundation

Status: **Implemented and production-deployed, 8 August 2026.**

## Purpose

This document records the Search & Analytics Foundation: what was
audited, what was fixed, what was built (config-gated and inert until
BorgaFoods supplies real credentials), and what remains an external,
account-holder action this repository cannot complete. It is the
reference for activating Search Console, Bing Webmaster Tools, and GA4,
and the baseline for the recurring Growth Audit described at the end.

Nothing in this document changes business rules, product classification,
or public claims. No pricing, MOQ, certification, or capability claim was
added anywhere.

## 1. Google Search Console verification

**Status: Not completed — requires a Google account BorgaFoods controls.**
Verification is fundamentally an account-ownership proof only the property
owner can perform. This repository has no Google credentials and cannot
complete it. What's ready:

- `client/src/components/SEO.tsx` now renders `<meta name="google-site-verification" content="...">` automatically, site-wide, the moment `VITE_GOOGLE_SITE_VERIFICATION` is set as a Cloudflare build-time variable (public, non-secret — same category as `VITE_TURNSTILE_SITE_KEY`).
- DNS-based verification is not viable right now — `borgafoods.com` (apex) DNS access is unavailable, consistent with every prior session's findings. The HTML meta-tag method above is the correct fallback and needs no DNS access.

**To activate**: sign in to [Search Console](https://search.google.com/search-console) with a BorgaFoods-controlled Google account, add `https://www.borgafoods.com` as a property, choose the "HTML tag" verification method, copy the `content` value, set it as `VITE_GOOGLE_SITE_VERIFICATION` in Cloudflare Pages → Settings → Environment variables (Production), and redeploy. No code change is required.

## 2. Bing Webmaster Tools readiness

**Status: Site is ready; verification itself needs a Microsoft/Bing account.**
Same shape as Search Console. `SEO.tsx` renders `<meta name="msvalidate.01" content="...">` once `VITE_BING_SITE_VERIFICATION` is set. Bing Webmaster Tools also supports importing a verified Search Console property directly, which avoids a second manual verification once GSC is done — worth using if available when the time comes.

## 3. GA4 integration

**Status: Built, deployed, and verified inert. No GA4 property exists yet — BorgaFoods must create one.**

- `client/src/lib/analytics.ts` — loads `gtag.js` and exposes `trackPageview`/`trackEvent`, entirely gated on `VITE_GA4_MEASUREMENT_ID`.
- `client/src/components/Analytics.tsx` — mounted once in `App.tsx`; tracks SPA route changes (the site never does a full page reload between routes, so pageviews must be tracked manually — `send_page_view: false` is set on `gtag config` for exactly this reason).
- **Verified inert**: with no Measurement ID configured, `gtag.js` never loads, `window.dataLayer` is never created, and no request to Google leaves the browser. Confirmed via the browser console against a local production build (`gtagScript: false, dataLayer: false`).

**To activate**: create a GA4 property at [analytics.google.com](https://analytics.google.com) for `borgafoods.com`, copy the Measurement ID (`G-XXXXXXXXXX`), set it as `VITE_GA4_MEASUREMENT_ID` in Cloudflare, redeploy.

**Before activating in production, also do this** — turning on real visitor tracking is a privacy-notice and possibly a consent-banner decision, not a pure engineering one:

- Update the existing quotation-form privacy notice (and consider a short site-wide note) to mention Google Analytics as one of the "trusted service providers" already referenced in that notice's wording.
- Decide whether a cookie-consent banner is needed for the markets BorgaFoods actually serves (GA4 sets first-party cookies). This is a business/legal call the repository does not make on its own — flagging it rather than guessing, per `AI_TASK_PROTOCOL.md`.

## 4. Conversion events for RFQs

**Status: Built, deployed, and verified inert alongside GA4 (same gate).**

`client/src/pages/Contact.tsx` fires a GA4 `generate_lead` event (GA4's own recommended event name for lead-generation forms) immediately after a successful `/api/export-quote` submission, with exactly two parameters: `inquiry_type` and `product_slug`. Both are public, non-identifying classification values already known to the server. **No buyer-provided field is ever sent** — no company name, contact name, email, phone, destination, or free text. This is a deliberate boundary matching the supplier/buyer-confidentiality posture already enforced server-side; see the module doc comment in `analytics.ts`.

Once GA4 is active, `generate_lead` events segmented by `inquiry_type` (`export_quote` / `wholesale` / `distribution` / `private_label` / `general`) directly answer "which enquiry paths convert" — the core question this foundation exists to make measurable.

## 5. Sitemap validation

**Status: Validated and corrected.** `client/public/sitemap.xml` covers exactly the 7 real public routes (`/`, `/products`, `/export-solutions`, `/wholesale`, `/export`, `/about`, `/contact`) — matching `client/src/App.tsx`'s route table exactly. No stale entries were found (the now-removed `Media.tsx` page, deleted in an earlier session, was never in the sitemap). `lastmod` dates were stale (all dated 2026-08-06 regardless of actual last change); corrected against each page component's actual last-commit date. The 404 route is correctly absent from the sitemap and correctly `noindex`ed via `SEO.tsx`'s `noIndex` prop rather than being crawlable-but-hidden.

## 6. Robots.txt review

**Status: Reviewed — already correct, no change made.** `client/public/robots.txt` allows all crawling and references the sitemap. It deliberately does **not** `Disallow` the 404 route — this is correct practice, not an oversight: a `Disallow` would prevent crawlers from ever fetching the page to see its `noindex` meta tag, which can leave the URL indexed with no content if something links to it externally. The current approach (crawlable + `noindex`) is the recommended pattern.

## 7. Structured data audit

**Status: One real bug found and fixed; one lower-priority finding documented, not fixed (missing data).**

- **Bug (fixed)**: `SchemaMarkup.tsx`'s `type="product"` branch was implemented but **never actually rendered anywhere in the app** — `Products.tsx` never used it. All product structured data was dead code. Fixed by (a) keying the injected `<script>` tag's `id` by product slug (`schema-product-{slug}`) instead of a single shared `schema-product` id, since the component wasn't designed for more than one simultaneous instance, and (b) rendering `<SchemaMarkup type="product" data={product} />` for every card on `/products`. Verified in a local production build: all 5 products now emit distinct, valid `Product` JSON-LD blocks with correct `brand`/`manufacturer` (manufactured) and their correct omission (partner-sourced, if any become public later) — the existing confidentiality logic in `SchemaMarkup.tsx` was untouched.
- **Enrichment (added)**: added `sku` (the product slug) and `category` fields to the Product schema — both already-public, already-approved data, no new claim.
- **Deliberately not added**: `offers`/price/availability. `BUSINESS_RULES.md` prohibits publishing pricing, so the site cannot claim full `Product` rich-result eligibility (which expects an offer). This is an accepted trade-off of the existing pricing policy, not an oversight.
- **Finding, not fixed**: the Organization schema's `sameAs` field is set to the site's own URL (`SITE_ORIGIN`), which is a no-op — `sameAs` is meant to link to _other_ authoritative profiles of the same entity (e.g. a company's LinkedIn page), not the site itself. The footer has a generic `https://linkedin.com` link (not a specific company profile), so there's no correct URL to put here yet. **Needs**: the actual BorgaFoods/Supply & Demand Worldwide LinkedIn company-page URL (or any other verifiable public profile) from the business before this can be fixed correctly — recorded here rather than guessed.

## 8. Crawlability audit

**Status: Reviewed.** No blocking issues found for anything currently live.

- All 7 public routes return 200 and are crawlable; the 404 route correctly returns app-rendered content with `noindex, nofollow`.
- Canonical URLs are generated correctly per-route by `SEO.tsx` (verified this session and in prior sessions via live route checks).
- **Known, pre-existing, out-of-scope item**: Cloudflare's build log reports `client/public/_redirects`'s SPA-fallback rule (`/* /index.html 200`) as an "infinite loop" and ignores it. Despite that, every real route has been repeatedly verified to return 200 in production across this project's history (Cloudflare Pages appears to apply its own default SPA-fallback for this deployment shape independent of the ignored rule). `AI_TASK_PROTOCOL.md` explicitly says not to mix this known warning into feature work unless separately requested — noted here as a crawlability-audit finding only, not touched.
- No `hreflang` tags: correct, single-language (English) site.
- `_routes.json` correctly scopes Pages Functions to `/api/*` only, so no static asset or route is inadvertently proxied through the Worker.

## 9. Core Web Vitals review

**Status: Measured against live production before and after this session's changes deployed. Real before/after numbers below, not estimates.**

Live PageSpeed Insights runs against `https://www.borgafoods.com/` (mobile, Moto G Power emulation, slow 4G throttling — Lighthouse 13.4.1), both captured during this session:

| Metric                                 | Before (pre-deploy) | After (post-deploy, commit `b30fcc0`) |
| -------------------------------------- | ------------------- | ------------------------------------- |
| Performance                            | 92                  | **93**                                |
| Accessibility                          | 84                  | 84 (untouched this session)           |
| Best Practices                         | 100                 | 100                                   |
| SEO                                    | 100                 | 100                                   |
| First Contentful Paint                 | 2.6 s               | 2.6 s                                 |
| Largest Contentful Paint               | 2.6 s               | 2.6 s                                 |
| Total Blocking Time                    | 0 ms                | 0 ms                                  |
| Cumulative Layout Shift                | 0                   | 0                                     |
| Speed Index                            | 3.0 s               | **2.6 s**                             |
| "Improve image delivery" opportunity   | est. 5,332 KiB      | **est. 742 KiB** (−86%)               |
| "Render-blocking requests" opportunity | est. 1,140 ms       | **est. 310 ms** (−73%)                |

FCP/LCP staying flat at 2.6 s under slow-4G throttling is plausibly a network-latency floor for this test condition rather than an asset-size effect; Speed Index (which reflects how quickly the page visually completes, not just first paint) moved directly with the image-size and render-blocking fixes, exactly as expected.

Top findings from that run, and what was done about each:

1. **"Improve image delivery" — est. savings 5,332 KiB, now 742 KiB.** By far the largest issue. `client/public/images/` contained 17 MB across 10 files. Three files (`hero-background.png`, `contact-section-bg.png`, `gari-kokonte.png`, ~7.9 MB combined) were **not referenced anywhere in the code** — dead weight — and were deleted. The 7 actually-used product photos (all lossless PNG, 880 KB–2.3 MB each, no alpha transparency) were re-encoded to JPEG at quality 85 (visually verified — no perceptible quality loss, checked against the two images with the most fine detail/text) and all code references updated. **Result: `client/public/images/` dropped from 17 MB to 2.0 MB (~88% reduction), and the live remaining-opportunity estimate dropped 86% (5,332 → 742 KiB) — confirmed against production, not estimated.**
2. **"Render-blocking requests" — est. savings 1,140 ms, now 310 ms.** The Google Fonts stylesheet `<link>` in `client/index.html` was a synchronous, render-blocking request. Changed to the standard `preload` + `onload` swap pattern with a `<noscript>` fallback for non-JS clients. Verified in a local production build that fonts still load and apply correctly (`document.body`'s computed font resolves to `Lato, sans-serif` as expected) with no visible flash of unstyled content. **Confirmed against production: the live remaining-opportunity estimate dropped 73% (1,140 → 310 ms).**
3. **"Reduce unused JavaScript" — est. savings 71 KiB.** Not addressed this session — likely comes from the shadcn/Radix component library, only some of which is used per page; a deeper bundle-analysis pass (e.g. `vite-bundle-visualizer`) is the correct next step, not a quick fix. Documented here as a follow-up, not silently skipped.
4. **CLS is already 0** — every product-image container already reserves space via a Tailwind `aspect-[4/5]` class before the image loads, so there was no layout-shift bug to fix. Added `loading="lazy"` (except each page's first, likely-above-the-fold image, kept `eager`) and `decoding="async"` to every `<img>` in `Home.tsx` and `Products.tsx` regardless, to reduce competing network requests for below-the-fold images — a real, low-risk win independent of the image re-encoding above.
5. **Accessibility: 84.** Not investigated this session — outside the 11 items in this foundation's scope. Flagged as a real, measured number worth a dedicated pass later (likely candidates: color contrast, form-label associations, or ARIA attributes — not diagnosed here, said as a hypothesis, not a finding).

Post-deploy re-run done (table above). Doing this kind of before/after confirmation on every future change, automatically, is exactly what the recurring Growth Audit (below) is for.

## Environment variables this foundation adds

All three are public, non-secret, build-time variables (the `VITE_` prefix is correct and required for Vite to expose them to the client bundle — see `docs/EMAIL_CONFIGURATION.md` for why secrets must never use this prefix, which none of these are):

| Variable                        | Purpose                                              | Where to get it                                   |
| ------------------------------- | ---------------------------------------------------- | ------------------------------------------------- |
| `VITE_GA4_MEASUREMENT_ID`       | Activates GA4                                        | Google Analytics property settings                |
| `VITE_GOOGLE_SITE_VERIFICATION` | Activates Search Console meta-tag verification       | Search Console property setup ("HTML tag" method) |
| `VITE_BING_SITE_VERIFICATION`   | Activates Bing Webmaster Tools meta-tag verification | Bing Webmaster Tools property setup               |

None is required for the site to function; all three are safe to leave unset indefinitely, and setting any one of them changes nothing else.

## Recurring Growth Audit (proposed workflow addition)

See `docs/ANALYTICS_DASHBOARD_SPEC.md` for the reporting-surface design this audit would eventually read from, and the change log / website roadmap for whether/when this was actually scheduled.

**Recommended scope**, each run:

1. Re-run PageSpeed Insights (mobile + desktop) against the production homepage and `/products`; record the 4 headline scores and Core Web Vitals; flag any regression vs. the last run.
2. Confirm the sitemap still matches the live route table (catches route additions/removals the sitemap wasn't updated for).
3. Re-check structured data validity (Google's Rich Results Test or equivalent) for the homepage and one product.
4. If GA4 is active: pull top-landing-page and RFQ-conversion-by-`inquiry_type` numbers for the period since the last audit (see the dashboard spec's "Search & Discovery" and "RFQ Conversion" sections for exact metrics).
5. If Search Console is active: pull top queries, average position, and any new crawl errors or manual actions.
6. Produce one prioritized, dated report: what changed, what regressed, and 2–4 concrete, scoped recommendations — not a raw data dump.

**Recommended cadence**: monthly. Weekly is likely too frequent to produce meaningfully new findings for a B2B site at this traffic scale; quarterly risks letting a real regression sit too long unnoticed.
