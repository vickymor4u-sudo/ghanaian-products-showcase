# BorgaFoods Website Change Log

This file records completed, approved changes. Add new entries in reverse chronological order and include the completion date, concise description, and full commit hash.

## 9 August 2026 — Search Intelligence & Conversion Analytics: audit and planning phase

No code changed; four new documentation deliverables, per an explicit
instruction not to create pages or change public claims without
approval. Full detail in each document; summary:

- **`docs/GSC_INDEXING_AUDIT.md`** — audited the `borgafoods.com` Search Console property one day after verification, using live authenticated access. Confirmed: ownership verification active, sitemap read successfully (7 discovered pages, Status: Success, matching the live route table exactly), no manual actions, no security issues. Performance/Indexing/Experience reports are all still "processing" — expected for a property this new, not an error. Per-URL Inspection results could not be retrieved this session (the live-inspection search widget did not respond reliably to browser automation); recorded as a tooling limitation, not a missing credential, with a note to check it manually or retry later.
- **`docs/GA4_ACTIVATION_PLAN.md`** — reviewed the existing config-gated GA4 implementation (unchanged, still fully inert — confirmed `VITE_GA4_MEASUREMENT_ID` remains unset in Cloudflare), documented a 6-event taxonomy for when it activates (the existing `page_view`/`generate_lead` plus four new recommended events: `select_content` for category-filter and WhatsApp-button usage, `view_item` for per-product interest, and an RFQ-CTA-click variant of `generate_lead` to measure funnel drop-off), and isolated the actual blocker: a privacy-notice update and a cookie-consent decision, both business/legal calls this repository doesn't make.
- **`docs/SEARCH_INTELLIGENCE_FRAMEWORK.md`** — a keyword/topic category structure built strictly from the 5 published products in `shared/productIntelligence/publishedRegistry.ts` and the business capabilities the site's own pages already describe (wholesale, export documentation, mixed-container planning, Fufu-Flour-only private-label discovery) — explicitly not a search-volume-validated keyword list, since no keyword-research tool is available; flags real search-volume validation as a next step once Search Console's Performance report populates.
- **`docs/BUYER_INTENT_CONTENT_AUDIT.md`** — audited all 7 live pages against the 4 buyer personas the site already names (wholesale buyers, distributors, private-label enquiries, international customers/importers). Wholesale buyers and private-label enquiries are well served; distributors have a minor cross-referencing gap (geographic-coverage framing exists only on `/about`); international customers get process description without concrete detail on `/export`. Separately flagged, for business review only: `/about` uses more assertive, less-hedged language than the rest of the site (e.g. "Every product meets international standards," a specific "500 kg" MOQ figure that appears nowhere else and can't be verified against BPIP) — recorded as a finding, `/about` left untouched.

No product was added or reclassified, no supplier information was
referenced, no page was created, and no public claim was changed.

## 8 August 2026 — SEO route handling repair completed and verified live (commit `d944ee3`)

Explicitly authorized follow-up to the two entries directly below, after
this session flagged the `_routes.json` widening as a genuine blocker.
Full requirements, design constraints (the `_redirects`-vs-Functions
interaction that caused the earlier regression), and an 8-point
pre-production checklist were specified by the requester; this entry
records the result.

**Root cause of the earlier regression, now understood**: Cloudflare
Pages does not apply `client/public/_redirects` rules to a request once
it's routed through Pages Functions. The reverted attempt kept
`_routes.json` scoped to `/api/*` while trying to fix `_redirects`
directly — meaning the earlier `functions/_middleware.ts` never actually
ran for page routes at all, and the regression was purely `_redirects`
misbehaving once its rule set became more specific, an interaction not
understood at the time.

**Final design**: `client/public/_routes.json` now routes every path
(`include: ["/*"]`) through `functions/_middleware.ts`, which:
- hands off `/api/*` untouched (`functions/api/export-quote.ts` unaffected — confirmed GET still returns 405, same as before any of today's changes);
- serves a real static asset (JS/CSS bundle, image, `sitemap.xml`, `robots.txt`, font) unmodified, detected via the `env.ASSETS` binding rather than `_redirects`;
- otherwise fetches the SPA shell via `env.ASSETS.fetch()` against `/` and injects a per-route `<link rel="canonical">` (7 known public routes) or `<meta name="robots" content="noindex, nofollow">` (anything else) with `HTMLRewriter`, returning an explicit HTTP 200 or 404;
- normalizes an accidental trailing slash in code (no redirect needed).

**A second bug found and fixed during preview verification, before this ever reached production**: the first preview build (deployment `b25f6b0f`) got every status code right but never actually injected any tag — bodies came back empty. Root cause: Cloudflare Pages automatically 308-redirects a direct `/index.html` request to `/`, and the code was explicitly fetching `/index.html` for the shell content, getting that redirect's empty body instead of the real file. Fixed by fetching `/` instead (already the canonical form); a second preview build (`2ada6a8e`) confirmed the fix.

**Verification performed exactly as specified**, first on the preview deployment (`2ada6a8e.ghanaian-products-showcase.pages.dev`), then repeated against production after merge:
- all 7 public routes return 200 on direct navigation, each with the correct `<link rel="canonical">` in the raw HTML (`curl`, not a rendered browser);
- `/does-not-exist` and other unknown paths return a real HTTP 404 with `<meta name="robots" content="noindex, nofollow">`;
- `/products/` (accidental trailing slash) returns 200 with canonical pointing to the slash-free form, no redirect;
- `/api/export-quote` returns 405 for GET, unchanged;
- static assets (a JS bundle, a CSS bundle, `sitemap.xml`, `robots.txt`, a product image) all return 200 with correct content-types, unmodified;
- no unexpected 301/308 anywhere across all tested paths, including `/index.html` itself (now 404 + `noindex` — it isn't a real public route, nothing links to it, and treating it as equivalent to `/` would be a canonicalization problem, not a fix);
- exactly one `<link rel="canonical">` per page (no duplication from `SEO.tsx`'s client-side logic, which still runs and correctly finds/updates the edge-injected tag rather than adding a second one);
- the GSC verification meta tag from the earlier entry two below is still present and unaffected;
- TypeScript check, all 51 tests, and the full build (`verify:catalog`, `verify:single-source`, `verify:no-leak`, `verify:site-verification`) all passed before every deploy, preview and production.

No product data, Turnstile configuration, or RFQ logic was touched by any file in this change.

## 8 August 2026 — `_redirects` rewrite from the entry below reverted; regressed every non-home page

The `_redirects` change described in the entry directly below (explicit
per-route 200 rules + `/* /index.html 404` catch-all) was deployed
(`720a531`), then immediately verified against production with `curl` as
this project's standard practice requires. That verification caught a
real regression: `/products`, `/export-solutions`, `/wholesale`,
`/export`, `/about`, and `/contact` all returned **HTTP 308, redirecting
to `/`**, instead of 200 with their real content — i.e. six of the
site's seven pages were effectively down. Only the six added
trailing-slash 301 rules behaved as intended; the 200/404 rewrites did
not, for a reason not established (local `wrangler pages dev` emulation
to reproduce and debug this could not be started in this sandbox —
network-restricted).

Reverted `client/public/_redirects` to the single-line rule
(`/* /index.html 200`) used throughout this project's history in
commit `d017932`, deployed, and reverified: all 7 routes return 200
again, `/api/export-quote` returns 405 for GET as expected, and
`sitemap.xml`/`robots.txt` both return 200. Production was broken for
approximately the time between the two deployments' builds completing
(both deploys took under a minute; exact window not separately timed).
**The soft-404 defect described below is still real** — it is simply
not fixed; `_redirects` is back to its original, known-safe, less
strict form. It stays an open, documented finding rather than a
re-attempted blind fix.

**Also blocked**: separately, an attempt to actually activate the
canonical/robots edge injection described below (by widening
`client/public/_routes.json`'s Functions scope from `/api/*` to `/*`, so
`functions/_middleware.ts` — which never regressed anything, because it
never ran — would actually execute for page routes) was denied by this
environment's permission system before it could be attempted. This is
recorded as a genuine blocker, per `AI_TASK_PROTOCOL.md`, not worked
around. **Net effect**: `functions/_middleware.ts` exists in the
repository but is currently inert (never invoked for any page route);
the canonical-tag defect described below remains unfixed in production
today, same as before this audit began.

## 8 August 2026 — Full technical indexing audit; canonical/robots moved to the edge, soft-404 fixed (see revert above)

BorgaFoods reported Search Console showed only 2 of 7 sitemap URLs as
inspectable immediately after verification. Full audit performed against
production (HTTP status, canonical, indexability, robots.txt, internal
linking, sitemap membership, raw pre-JS response) for all 7 public
routes. Full detail and the check-by-check table are in
`docs/SEO_FOUNDATION.md` §8. Two real defects found and fixed:

- **Canonical/robots tags were client-JS-only** — same root cause as the Search Console verification bug fixed earlier today (see the entry below): `SEO.tsx` set `<link rel="canonical">` via a `useEffect`, present in a rendered browser DOM but absent from the raw HTTP response, which is the likely direct explanation for most sitemap URLs showing "N/A" in URL Inspection right after verification. Fixed with `functions/_middleware.ts`, a new Cloudflare Pages Function using `HTMLRewriter` to inject the correct canonical tag for each of the 7 known routes (or a `noindex, nofollow` robots meta tag for anything else) directly into the HTML at the edge, before any JavaScript runs. `SEO.tsx`'s client-side logic was kept, not removed — it updates the edge-injected tag in place rather than duplicating it, so any future route not yet added to the Function's allowlist still gets a correct canonical once React mounts.
- **Unknown paths returned a soft 404** — `client/public/_redirects` was a single blanket `/* /index.html 200` rule, so typos, removed URLs, and bots probing random paths all returned HTTP 200 with the homepage's raw HTML, a documented Search Console "soft 404" flag. Fixed by rewriting `_redirects` to explicitly list all 7 real routes (still 200) with a `/* /index.html 404` catch-all for everything else; the SPA body served is unchanged either way, so wouter's client-side NotFound page still renders — only the HTTP status a crawler sees is different. Also added six 301 redirects canonicalizing an accidental trailing slash on the 6 non-home routes (e.g. `/products/` → `/products`), closing a minor duplicate-URL gap the stricter 404 rule would otherwise have created.
- Confirmed unaffected: internal linking (`Navigation.tsx`/`Footer.tsx` already link every route), `robots.txt` (already permissive, unchanged), `sitemap.xml` (already exactly matches the route table, unchanged), and `/api/export-quote` plus every static asset (the new middleware only ever mutates responses whose `content-type` includes `text/html`).
- Corrected an earlier claim in `docs/SEO_FOUNDATION.md` §8 that canonical URLs were "generated correctly per-route" — true for a rendered browser, incomplete for a crawler's first pass. Left struck through rather than deleted, per this file's append-only convention.
- **Explicitly not attempted**: full server-side rendering / prerendering, which would remove the remaining (normal, expected) lag between sitemap discovery and full render-based indexing entirely. That's a real architectural change with framework/hosting implications, flagged in `docs/SEO_FOUNDATION.md` §8 as a possible future improvement rather than implemented unilaterally, per `AI_TASK_PROTOCOL.md`.

Validation: TypeScript check passed; all 51 tests passed unmodified; production build passed with all four guard scripts green. Local `wrangler pages dev` emulation was attempted to test the new Function end-to-end before deploy but could not start in this sandbox (network-restricted); correctness was instead established by careful manual review (content-type gating confirmed to leave `/api/export-quote` and all static assets untouched; `HTMLRewriter` preserves the original response's status code, so 200/301/404 from `_redirects` pass through unchanged) and thorough `curl`-based verification directly against production immediately after deploy — see the following entry.

## 8 August 2026 — Fix: site-verification meta tags now build-time, not client-rendered

BorgaFoods reported Google Search Console's HTML tag verification kept
failing despite the meta tag being visible in a browser's rendered DOM
(see the entry below). Root cause found and fixed:

- `client/src/components/SEO.tsx` was setting `google-site-verification` (and `msvalidate.01`) via a `useEffect`, i.e. only after React mounted in the browser. This is a client-only Vite SPA with no server-side rendering, and both Google's and Bing's "HTML tag" verification methods fetch the raw document without executing JavaScript — so the tag was genuinely present for real visitors but invisible to the one client that mattered for verification;
- fixed by adding `siteVerificationMetaPlugin` to `vite.config.ts`, a small plugin using Vite's `transformIndexHtml` hook that reads `VITE_GOOGLE_SITE_VERIFICATION` / `VITE_BING_SITE_VERIFICATION` directly from the build environment and injects the `<meta>` tag(s) straight into `dist/public/index.html` at build time — present in the raw HTTP response before any JavaScript runs; tag is omitted entirely (not emitted empty) when the corresponding env var is unset, preserving the existing inert-until-configured behavior;
- removed the now-redundant client-side injection from `SEO.tsx` (and the now-unused `GOOGLE_SITE_VERIFICATION`/`BING_SITE_VERIFICATION` exports from `client/src/config/site.ts`) so there is exactly one place these tags are ever rendered, not two;
- added a new build-blocking guard, `scripts/verify-site-verification-tags.ts` (wired into `pnpm build` alongside the existing catalog/single-source/no-leak checks), which fails the build if a configured env var's tag is missing from the built `index.html`, or if a tag is present without its env var set; verified to fail closed by temporarily disabling the Vite plugin, confirming the build broke with the exact expected error, then confirming the fix and re-verifying a clean build;
- the env-var architecture itself (`VITE_GOOGLE_SITE_VERIFICATION` / `VITE_BING_SITE_VERIFICATION`, public/non-secret, same category as `VITE_TURNSTILE_SITE_KEY`) is unchanged — only where the tag is rendered changed, not how it's configured.

Validation: TypeScript check passed; all 51 tests passed unmodified; local production build (with `VITE_GOOGLE_SITE_VERIFICATION` set) confirmed the tag present, exactly once, in the raw `dist/public/index.html`, and confirmed absent when the var is unset; verified live in a local `vite preview` via `curl` (raw HTTP response, no JS execution) and in the browser (rendered DOM matches, no duplicate tag, per-page title/description/OG/canonical tags from `SEO.tsx` still update correctly across routes).

Deployment status: see the following entry for push/deployment/production-verification details.

## 8 August 2026 — Google Search Console verification activated

No code commit; this entry records a Cloudflare configuration change and
deployment. BorgaFoods added `https://www.borgafoods.com` as a URL prefix
property in Search Console (HTML tag method) and supplied the
verification code.

- set `VITE_GOOGLE_SITE_VERIFICATION` (Plaintext) in Cloudflare Pages → `borgafoods` → Settings → Environment variables (Production), using the existing config-gated slot built in the Search & Analytics Foundation (`SEO.tsx`, no code change required);
- triggered a redeploy via Cloudflare's "Retry deployment" on the current production commit (`a795ae6`) so the build-time variable took effect — new deployment `36e9646b`, build succeeded in 29s, all three build-blocking guard scripts (`verify:catalog`, `verify:single-source`, `verify:no-leak`) passed;
- confirmed live: loaded `https://www.borgafoods.com/` in a browser and read the rendered DOM, finding `<meta name="google-site-verification" content="hox6EOS2m2hzwquyKmo0CDObWyxZlydpfTCHQwUAJW0">` present. Note this tag is client-rendered (Vite SPA, not SSR) — it will not appear in a plain `curl`/view-source response, only after JavaScript runs, which is how Search Console's own crawler will see it too;
- updated `docs/SEO_FOUNDATION.md` §1 to reflect the tag is live and to record the remaining external step (clicking "Verify" in Search Console itself, a Google-account action this repository cannot perform).

Validation: no code changed, so no build/test suite re-run beyond the guard scripts that already ran as part of the Cloudflare build above.

## 8 August 2026 — Search & Analytics Foundation: production verification

No implementation commit; this entry records verification only, performed after the entry below deployed.

- confirmed Cloudflare production deployment (source commit `b30fcc0`) succeeded and is aliased to `www.borgafoods.com`; all 7 public routes return 200;
- confirmed on the live site: GA4 script/`dataLayer` and Search Console/Bing verification meta tags all remain absent (correctly inert, unconfigured); all 5 products emit valid, distinct `Product` JSON-LD (`schema-product-{slug}`); the built JS bundle references only the new `.jpg` image paths, no `.png`;
- **re-ran PageSpeed Insights against production post-deploy and got real before/after numbers** (full table in `docs/SEO_FOUNDATION.md` §9): Performance 92→93, Speed Index 3.0 s→2.6 s, the "Improve image delivery" opportunity dropped 86% (5,332→742 KiB), and "Render-blocking requests" dropped 73% (1,140→310 ms) — both drops track almost exactly with the image-size and font-loading fixes shipped in the entry below, confirming they worked as intended rather than merely assuming it from the code change alone;
- noted, not a regression: old `.png` image URLs briefly remained fetchable (200) on production immediately after deploy despite being deleted from the repo and unreferenced by the new bundle — a Cloudflare Pages asset-retention/propagation artifact, not a broken link, since nothing links to those URLs anymore.

## 8 August 2026 — Search & Analytics Foundation

Full details, including the pre-fix PageSpeed Insights baseline and exact activation steps, are in `docs/SEO_FOUNDATION.md`. Dashboard design for future GA4/Search Console reporting is in `docs/ANALYTICS_DASHBOARD_SPEC.md`.

Completed changes:

- built config-gated GA4 integration (`client/src/lib/analytics.ts`, `client/src/components/Analytics.tsx`), inert until `VITE_GA4_MEASUREMENT_ID` is set — verified no script loads, no `dataLayer`, no data collection without it;
- added an `RFQ` conversion event (`generate_lead`) fired on successful `/api/export-quote` submission, carrying only `inquiry_type` and `product_slug` — no buyer-provided field is ever sent;
- added config-gated Search Console / Bing Webmaster verification meta tags to `SEO.tsx` (`VITE_GOOGLE_SITE_VERIFICATION` / `VITE_BING_SITE_VERIFICATION`), rendered site-wide once configured; actual verification still requires BorgaFoods to complete it with its own Google/Microsoft account — this repository has no such credentials;
- fixed a real bug: `SchemaMarkup.tsx`'s `type="product"` branch existed but was never rendered anywhere; wired it into `Products.tsx` (one JSON-LD block per product, keyed by slug so multiple instances coexist) and added `sku`/`category` fields; verified all 5 products now emit valid, distinct structured data;
- validated `sitemap.xml` against the live route table (all 7 routes correct) and corrected stale `lastmod` dates to each page's actual last-commit date; reviewed `robots.txt` (already correct, left unchanged, reasoning documented);
- **Core Web Vitals**: removed 3 confirmed-orphaned, unreferenced images (~7.9 MB dead weight); re-encoded the 7 actually-used product photos from lossless PNG to JPEG quality 85 (visually verified, no alpha channel present so zero transparency risk) and updated all references — `client/public/images/` dropped from 17 MB to 2.0 MB (~88% reduction); made the Google Fonts stylesheet non-render-blocking (`preload` + swap pattern, `noscript` fallback), verified fonts still apply correctly; added `loading="lazy"`/`decoding="async"` to below-the-fold product images;
- documented, but did not fix (missing data, not a code issue): the Organization schema's `sameAs` field is a no-op (points at the site's own URL instead of an external profile) — needs a real BorgaFoods/Supply & Demand Worldwide social-profile URL from the business;
- documented, but did not touch (explicitly out of scope per `AI_TASK_PROTOCOL.md`): the pre-existing, already-known `_redirects` build-log warning;
- attempted to schedule the recommended recurring "Growth Audit" as a cloud routine; blocked by a genuine external credential gap — the cloud-routine feature requires GitHub connected via claude.ai's connector settings (separate from the local git/SSH access used throughout this project), which is not connected. Full recommended scope and cadence (monthly) recorded in `docs/SEO_FOUNDATION.md`; the routine itself was not created.

Validation: TypeScript check passed; all 51 tests passed unmodified; production build passed (catalog, single-source, and no-leak checks all green); confidentiality scan of the built output remained clean; verified in a local production build that GA4/verification tags stay fully inert without configuration, that all 5 products emit correct structured data, and that fonts/images render correctly after optimization. Live PageSpeed Insights was run against production before this session's changes as an honest baseline (see `docs/SEO_FOUNDATION.md` §9); a post-deploy re-run is recorded in the following entry.

Deployment status: see the following entry for push/deployment/production-verification details.

## 8 August 2026 — BPIP Phase 2: RFQ Function migration; core architecture complete

Completed changes:

- added `privateLabelEligibleProducts` to `shared/productIntelligence/publishedRegistry.ts`, a selector derived from `computePrivateLabelEligibility` that mirrors the prior `privateLabelDiscoveryProducts` selector exactly;
- migrated `functions/api/export-quote.ts` (the RFQ Function) to import `publishedProducts` and `privateLabelEligibleProducts` from `shared/productIntelligence/publishedRegistry.ts` and `productTypeLabels` from `shared/productIntelligence/types.ts`, removing its import from `client/src/data/products.ts` entirely; the Function imports only the published-registry view, not `internalCandidates.ts`, matching its actual functional needs;
- added a new build-blocking script, `scripts/verify-single-source-of-truth.ts`, which fails the build if any file outside `publishedRegistry.ts`/`internalCandidates.ts` defines a hardcoded product record, or if the RFQ Function imports from `client/src/data/products.ts` again; verified to fail closed by temporarily reintroducing the RFQ Function's old import and confirming the build broke, then confirmed the fix and re-verified a clean build; wired into `pnpm build` alongside the existing catalog and leak checks;
- added 4 new tests (`shared/productIntelligence/publishedRegistry.test.ts`) covering the new selector; all 11 pre-existing RFQ-endpoint tests pass completely unmodified against the new data source (51 total tests, all passing);
- updated `docs/PRODUCT_INTELLIGENCE_PLATFORM.md` and `docs/BPIP_MIGRATION_PLAN.md` to record Phase 2 as completed and to state plainly that BPIP is now the single authoritative product registry for both the website and the RFQ Function;
- made no change to `client/src/data/products.ts` (still the correct presentation-layer adapter for the website), Turnstile/Resend behavior, PCR-001/PCR-002, or any private-label approval.

Validation: TypeScript check passed; all 51 tests passed (47 pre-existing, unmodified, plus 4 new); production build passed with the new single-source-of-truth check, the existing catalog-integrity check, and the existing internal-leak check all passing, and unchanged catalog counts (5 current public records, 4 Phase 4 expansion-eligible records); confidentiality scan of the built output remained clean.

Deployment status: see the following entry for push/deployment/production-verification details.

## 8 August 2026 — BorgaFoods Product Intelligence Platform (BPIP) Phase 1

Completed changes:

- created `shared/productIntelligence/` as the new internal, typed product registry: `types.ts` (lifecycle state machine and structured approval fields), `workflow.ts` (pure publication/RFQ/private-label gate functions), `validate.ts` (`assertRegistryIntegrity`), `publishedRegistry.ts` (client-safe, the 5 live products only), `internalCandidates.ts` (internal-only, never client-imported), `registry.ts` and `index.ts` (server/tooling-only combined views);
- migrated the 5 currently public products into `publishedRegistry.ts` with byte-for-byte identical field values, and refactored `client/src/data/products.ts` into a thin, behavior-preserving adapter over the registry — every existing export name, type, and value is unchanged; the website is now a consumer of BPIP rather than the owner of inline product data;
- migrated the 21 candidate products and the conflicted Red Palm Oil record from `docs/PRODUCT_INTELLIGENCE_RECONCILIATION.md` into `internalCandidates.ts`, with no supplier name, brand, or price, and every one still failing the new publication-eligibility gate for the same reasons already recorded (no display approval, no public-safe image, incomplete documentation); PCR-001 and PCR-002 are represented exactly as previously recorded, not reinterpreted;
- discovered during implementation, and fixed, a real bundler leak: an earlier combined-registry import path would have shipped all 21 internal candidate names plus internal status strings into the public client bundle, because a bundler cannot tree-shake array elements filtered at runtime; fixed via a hard module boundary (client code may only import `publishedRegistry.ts` and `types.ts`) plus a new build-blocking script, `scripts/verify-no-internal-leak.ts`, wired into `pnpm build`; verified the guard fails closed by temporarily reintroducing the leak and confirming the build failed, then confirmed the fix and re-verified a clean build;
- added 30 new tests (`shared/productIntelligence/*.test.ts`) covering workflow gates, registry validation, and registry structure/confidentiality; added `shared/**/*.test.ts` to the vitest include glob and a matching `@shared` alias to `vitest.config.ts`;
- added `docs/PRODUCT_INTELLIGENCE_PLATFORM.md` (architecture, module boundary rationale, current registry contents) and `docs/BPIP_MIGRATION_PLAN.md` (phased evolution, including the explicit future decision point for persistent storage, which remains unapproved and unimplemented);
- made no changes to PCR-001, PCR-002, any private-label approval, the RFQ Function, Turnstile/Resend configuration, or any public page design.

Validation: TypeScript check passed; all 47 tests passed (17 pre-existing, unmodified, plus 30 new); production build passed with unchanged catalog counts (5 current public records, 4 Phase 4 expansion-eligible records) and the new internal-leak guard passing; the built JS bundle was diffed against the pre-BPIP build and confirmed byte-identical for all 5 published products' descriptions; a full confidentiality scan (supplier brand names, Gmail address, Red Palm Oil, all 21 candidate slugs/names, internal-only status strings) found nothing in the built output.

Deployment status: see the following entry for push/deployment/production-verification details.

## 8 August 2026 — Product intelligence reconciliation and catalogue conversion improvements

Completed changes:

- reconciled the supplied `BorgaFoods_Master_Export 001.xlsx` working workbook against `PRODUCT_CAPABILITY_MODEL.md`, `PRODUCT_CLASSIFICATION_REVIEW.md`, and `client/src/data/products.ts`; recorded findings in the new `docs/PRODUCT_INTELLIGENCE_RECONCILIATION.md` (structural facts only — no supplier names, brands, or pricing were copied into the repository, which is public on GitHub);
- confirmed the current 5 public products remain aligned with the workbook (Fufu Flour's existing brand mismatch reinforces the already-open PCR-001; Red Palm Oil's conflicting supply-type rows in the workbook reinforce the already-open PCR-002; both gates were left exactly as recorded, not reinterpreted);
- identified 22 candidate partner-sourced products in the workbook with no product-level public-display approval recorded anywhere in the frozen capability model; per `PUBLIC_PRODUCT_PRESENTATION_RULES.md` §6, **none were added to the public catalog, SEO content, structured data, or the RFQ product allowlist** — all remain internal pending a business decision (see `docs/PRODUCT_INTELLIGENCE_RECONCILIATION.md` for the exact list and required decisions);
- confirmed all 22 candidates are additionally imagery-blocked: the workbook's own instructions confirm its 26 embedded product images are supplier-provided photography; none were extracted, reviewed, or used;
- added a per-product "Request Quote for {product}" call to action on the Products page that preselects the specific product in the Contact form via a `product` query parameter, validated client-side against the same `rfqEligibleProducts`/`privateLabelDiscoveryProducts` selectors already used for the dropdown (an invalid or disallowed product ID falls back to no preselection; the existing server-side allowlist in `/api/export-quote` is unchanged and remains the authoritative check);
- added category-filter pills to the Products page (derived from existing product categories; no new categories or products);
- made no changes to product classifications, supply types, private-label eligibility, pricing display, or supplier confidentiality controls.

Validation: TypeScript check passed; all 17 existing tests passed unmodified; production build passed with unchanged catalog counts (5 current public records, 4 Phase 4 expansion-eligible records); confidentiality scan of the built output found no supplier brand names, no Gmail address, no Red Palm Oil, and none of the 22 candidate product names; verified locally via `vite preview` that category filtering, the per-product quote link, and its `product` query-param preselection all work, and that an invalid product ID or a non-Fufu product ID on the private-label path both correctly fall back to no preselection (matching the unchanged server-side gate).

## 8 August 2026 — Cloudflare dashboard verification (Phase 4B, 4C)

No implementation commit; this entry records verification only, performed once Cloudflare dashboard access became available in the same session as the entry below.

Verified directly in the Cloudflare dashboard (`borgafoods` Pages project):

- the latest Production deployment (ID `d80ff265`) has source commit `86e4fd0cb72244e77ae34439e8362d9252eefe5c` — the exact commit this milestone targeted — aliased to `www.borgafoods.com`, with build **Status: success**;
- the full build log shows `pnpm verify:catalog` (5 current public / 4 Phase 4 expansion-eligible records), `vite build` (asset hashes matching the live site), and Function compilation all completing without error; the only warnings present are the pre-existing, already-documented ignored-build-scripts notice and the known `_redirects` infinite-loop warning (per `AI_TASK_PROTOCOL.md`, not to be fixed as incidental work);
- required Production configuration is present: `RESEND_API_KEY`, `TURNSTILE_SECRET_KEY`, and `EXPORT_QUOTE_NOTIFICATION_EMAIL` as encrypted secrets (values not viewed or copied); `VITE_TURNSTILE_SITE_KEY` and `EXPORT_QUOTE_FROM_EMAIL` (`onboarding@resend.dev`, the documented temporary Resend sandbox sender) as plaintext, consistent with those two being non-secret by design;
- the Turnstile widget "BorgaFoods Export Quote" (site key matching the configured `VITE_TURNSTILE_SITE_KEY`) is scoped to exactly `www.borgafoods.com`, the approved preview hostname, and one historical preview deployment; its action name (`export_quote`) matches `TURNSTILE_ACTION` in `functions/api/export-quote.ts`;
- Function metrics for the last 24 hours: 27 successful requests, 0 errors (internal, exception, CPU-limit, memory-limit, or client-disconnect);
- Turnstile's own siteverify analytics for the last 24 hours: 5 requests, 3 invalid and 2 valid. The 3 invalid requests correspond exactly to this session's deliberately-invalid-token allowlist probes (see the entry below); the 2 valid requests are genuine solves this session did not perform — the code sends a Resend request immediately after a valid Turnstile result, so this is strong circumstantial evidence of at least one real, successful submission in the last 24 hours, though it was not directly witnessed and no Resend-side delivery confirmation was available (no Resend dashboard access this session);
- `borgafoods.com` (apex domain, without `www`) shows Inactive in Custom domains — unchanged, pre-existing, already-documented behavior; not touched, per protocol.

This closes the one gap left open in the entry below (Cloudflare dashboard/API access). The single remaining fact — a human witnessing a real delivered email — was not established and, per policy, will not be established by this or any automated session, since doing so would require solving Turnstile.

## 8 August 2026 — Production deployment and verification (Phase 4B, 4C, and cleanup)

No implementation commit; this entry records verification only.

Verified changes:

- confirmed `origin/main` at `368af51e778d50285384c17f4d44852ae49be0a9`, exactly matching the local `main` branch pushed this session (commit range `cb8c7d5..368af51`: the pre-existing Phase 4B/4C commits plus the presentation-rule alignment and cleanup commits below);
- confirmed Cloudflare Pages built and deployed the new commit: `https://www.borgafoods.com` serves updated JS/CSS asset hashes and the new page content (indirect confirmation only — no Cloudflare dashboard/API access was available to read the build log directly);
- verified all eight production routes return 200 with no browser console errors: `/`, `/products`, `/export-solutions`, `/wholesale`, `/contact`, `/export`, `/about`, and an unknown path resolving to the noindexed 404 page;
- verified Phase 4B is live: `/contact?inquiry=wholesale` renders the required buyer-category field; a same-origin `POST /api/export-quote` with `inquiryType: "wholesale"` and no `buyerCategory` returns `invalid_request`; the same request with a valid `buyerCategory` and product passes schema/allowlist validation and reaches Turnstile verification;
- verified Phase 4C is live and matches the frozen capability-model decision exactly: `/contact?inquiry=private-label` renders a product selector containing only Fufu Flour; direct `POST /api/export-quote` requests with `inquiryType: "private_label"` were sent for every other current product (`gari-borga`, `kokonte-borga`, `banku-borga`, `cassava-flour`), `red-palm-oil`, and invalid/placeholder values — all returned `invalid_request`, rejected before Turnstile verification; the identical request for `fufu-borga` passed allowlist validation and reached Turnstile;
- verified the honeypot (`website` field) still causes `invalid_request` when populated, and that `GET /api/export-quote` still returns `405 invalid_method`;
- verified the presentation-rule cleanup (previous entry) is live in the production bundle: no `customizable` or `Custom blends` strings, the "Packaging Requirements Review" heading and revised MOQ FAQ wording are present, and no trace of the removed `Media.tsx` page (fabricated document names, "Media & Downloads" heading) remains in the bundle;
- re-ran `pnpm check`, `pnpm test` (17/17 passing, unmodified), and `pnpm build` (catalog verifier: 5 current public records, 4 Phase 4 expansion-eligible records) against the exact commit now live in production;
- production confidentiality scan of the live JS bundle found no Gmail address or "Red Palm Oil" string.

Not verified — genuine blocker, not attempted:

- **Live end-to-end email delivery for a successful submission.** All production API tests above used a deliberately invalid Turnstile token so that no request could reach Resend and no email could be sent — this was intentional: completing or bypassing Cloudflare Turnstile (a CAPTCHA/bot-detection control) is outside what an automated session may do, regardless of instruction. Confirming that a genuine wholesale, distribution, or Fufu Borga private-label submission is actually delivered to the configured recipient, with buyer `Reply-To` and no automatic acknowledgement, requires either a human completing the widget and confirming inbox delivery, or Resend/Cloudflare dashboard log access (also unavailable this session). The unmodified `/api/export-quote` logic and its mocked test coverage (`functions/api/export-quote.test.ts`, asserting `Reply-To` and notification content) support high confidence, but this is not the same as a witnessed live delivery.

Deployment status: **Phase 4B and 4C are deployed to production** (they were not modified this session; only their production reachability was newly confirmed). The presentation-rule alignment and cleanup work below was pushed and deployed in the same commit range. One item remains open before this milestone can be called fully closed: a human-performed live delivery test per enquiry type (see `WEBSITE_ROADMAP.md`).

## 8 August 2026 — Presentation-rule alignment and repository cleanup

Implementation commit: `da3276f1a67488d7c46513ec86c9cf5edbb554d9`

Completed changes:

- removed unapproved custom-packaging and custom-blend claims from the product catalog (`fufu-borga`, `kokonte-borga`, `cassava-flour` variants), the Products page ("(customizable)" packaging label, "Packaging Customization" heading renamed to "Packaging Requirements Review", and the closing CTA), and the Contact page MOQ FAQ answer, so public content matches `PUBLIC_PRODUCT_PRESENTATION_RULES.md` section 1 (no custom-packaging/OEM-adjacent claim without an explicit product-level approval); no product's supply type, brand, manufacturer, or private-label eligibility changed;
- removed the unrouted `client/src/pages/Media.tsx` page (not referenced by `App.tsx`, `Navigation`, `Footer`, or the sitemap; it asserted fabricated pricing/MOQ/compliance-certificate downloads that were never approved for publication);
- archived six pre-`docs/` planning files (`BUSINESS_INFO_CAPTURE.md`, `CATALOG_EXTRACTED_INFO.md`, `COMPLETE_COMPANY_INFO.md`, `WEBSITE_REQUIREMENTS.md`, `ideas.md`, `CONTRAST_ISSUES.md`) from the repository root into `docs/archive/` with an explanatory README, so `docs/` remains the sole authoritative source per `AI_TASK_PROTOCOL.md`; the archived `CATALOG_EXTRACTED_INFO.md` contained looser private-label wording that predates and conflicts with the current `fufu-borga`-only approval, which is now flagged as non-authoritative rather than left ambiguous at the repo root.

This entry makes no business-rule, classification, or supply-type change; PCR-001 and PCR-002 remain open and untouched.

Validation: direct TypeScript check passed; all 17 existing Vitest unit/integration tests passed unmodified; production build passed with unchanged catalog counts (5 current public records, 4 Phase 4 expansion-eligible records); built-output confidentiality scan found no Gmail address, Red Palm Oil, or supplier markers; built-output scan confirmed the removed "customizable"/"Custom blends" strings no longer appear; `git diff --check` and the staged diff were reviewed file-by-file before commit.

Deployment status: committed locally only. **Not pushed to `origin/main` and not deployed.** This session had no SSH access to the `origin` GitHub remote and no Cloudflare credentials/API access, so push and deployment (along with production Resend/Turnstile verification for the still-undeployed Phase 4B/4C work below) could not be performed or verified.

## 7 August 2026 — Phase 4C private-label discovery

Implementation commit: `615c1edcd3f64be9a0dc6d7bc1e88a265c7eae9c`

Completed changes:

- recorded `fufu-borga` (Fufu Borga) as the sole approved product for private-label discovery discussions; all other manufactured products remain approval-gated, and partner-sourced products and Red Palm Oil remain excluded;
- added a public-safe, central-catalog private-label discovery selector with a catalog integrity guard that rejects partner-sourced eligibility;
- extended the existing Contact form, shared RFQ schema, and `/api/export-quote` Function with a controlled `private_label` intent, without adding a second form, endpoint, CRM, database, account, automatic quotation, or automatic acknowledgement;
- added the approved manual-review wording to the existing Wholesale and Contact experiences, plus optional market, sales-channel, artwork/label-readiness, labeling/language, and launch-timing context; product specifications and requirements are required;
- server-side allowlisting now accepts only `fufu-borga` for a private-label request and rejects manipulated product IDs before Turnstile or Resend calls;
- retained Turnstile, honeypot, origin/body controls, Resend delivery, buyer `Reply-To`, privacy consent, one internal notification, and supplier confidentiality; and
- updated the frozen capability model, review gate, public-presentation rules, business rules, Phase 4 roadmap/blueprint, website roadmap, and AI protocol with the approved manual-review conditions and BorgaFoods management/export-team ownership.

Validation: direct TypeScript check passed; all 17 Vitest unit/integration tests passed; catalog integrity verification passed (5 current public records, 4 Phase 4 expansion-eligible records); production build passed; confidentiality scans found no Red Palm Oil, personal Gmail address, or supplier name/brand markers in source or built public output; local production route smoke tests passed for Home, Products, Export Solutions, Wholesale, Export & Compliance, About, Contact, private-label Contact, and 404. Desktop and 390 px mobile checks confirmed the private-label selector contains only Fufu Flour, no horizontal overflow, working mobile navigation, and no browser console errors.

Deployment status: committed locally only. No push, Cloudflare deployment, or live private-label delivery test was performed. Before deployment, verify the existing production Resend and Turnstile configuration, then validate a live Fufu Borga private-label submission, buyer `Reply-To`, single internal notification, and absence of an automatic acknowledgement.

## 7 August 2026 — Phase 4B wholesale and distributor qualification

Implementation commit: `c736df1a3d0a01fb00b3ea2e55707772347a2a87`

Completed changes:

- extended the existing Contact form, shared quotation schema, and `/api/export-quote` Function rather than creating a second enquiry system;
- added a required, controlled buyer category for wholesale and distributor enquiries: importer, distributor, wholesaler, retail, food service, or other;
- added optional, validated sales-channel, target-market, expected-order-frequency, and expected-timing context alongside the existing company, contact, product, packaging, quantity, destination, and business-requirements fields;
- added an explicit privacy acknowledgement while retaining the approved privacy notice and 24-month retention statement;
- updated Wholesale calls to action to preselect the existing wholesale or distribution enquiry intent;
- retained buyer `Reply-To`, server-only Resend routing, Turnstile, honeypot, origin checks, request-size limits, provider idempotency, one internal notification, and no automatic customer acknowledgement;
- added server-side rejection of missing wholesale/distributor buyer category, unacknowledged privacy consent, unexpected request fields, and unknown qualification values;
- added approved qualification context to the internal notification without supplier, partner brand/manufacturer, source, pricing, capability-review, audit, or secret data;
- retained Fufu Flour in its existing RFQ selector only, excluded Red Palm Oil from public/RFQ data, and added tests for both product gates; and
- created the Phase 4B implementation blueprint, qualification rules, RFQ field mapping, and internal email-notification mapping as permanent references.

Validation: direct TypeScript check passed; all 12 Vitest unit/integration tests passed; catalog integrity verification passed (5 current public records and 4 Phase 4 expansion-eligible records); production build passed; built-output confidentiality scans found no temporary Gmail address, Red Palm Oil, supplier-name/brand markers, or server-secret variable names; local route smoke tests passed for Home, Products, Export Solutions, Wholesale, Contact, wholesale/distribution Contact states, Export & Compliance, About, and 404. At 390 px, the qualification form had no horizontal overflow, the mobile navigation opened, and no browser console errors appeared.

Deployment status: committed locally only. No push, Cloudflare deployment, or live quotation delivery test was performed. Before deployment, verify existing production Resend/Turnstile configuration and repeat live route and delivery verification.

## 7 August 2026 — Phase 4A export catalogue controls

Implementation commit: `b3ee1c1e83afe15c343c5e0af8e2ffd1c43cd00e`

Completed changes:

- added capability-model-derived public-display and source-alignment controls to the centralized typed product catalog;
- added derived current-public, manufactured, partner-sourced, Phase 4 expansion, and RFQ selectors without creating a second product system;
- retained Fufu Flour in its existing public catalog and RFQ experience while excluding it from the new Phase 4 expansion selector until PCR-001 is resolved;
- kept Red Palm Oil out of all public catalog, metadata, and RFQ data;
- updated Home, Products, Export Solutions, Contact, and the quotation Function to use the relevant derived selector;
- added a mandatory catalog verification step to the production build that fails if any partner-sourced record exposes a public brand or manufacturer field;
- added catalog tests for the Fufu review gate and partner brand/manufacturer confidentiality rule;
- recorded the frozen capability model, review gate, Phase 4 blueprint, execution roadmap, and public product-presentation rules as permanent project documentation.

Validation: catalog verification passed with 5 current public records and 4 Phase 4 expansion-eligible records; TypeScript check passed; all 9 Vitest tests passed; production build passed; affected desktop and 390 px mobile route smoke tests passed with no browser console errors; no Red Palm Oil, supplier identifiers, or personal Gmail address appeared in the production build.

Deployment status: GitHub `main` and Cloudflare Pages production deployment `5eb7632b-674e-45f5-8691-2de40e81edd9` are verified from implementation commit `b3ee1c1e83afe15c343c5e0af8e2ffd1c43cd00e` and validation commit `8db0b40b69d70af38691016d088ba03580553102`. Production build logs confirmed the mandatory catalog verification before Vite build. The Home, Products, Export Solutions, Contact, Export & Compliance, and Wholesale routes rendered successfully from `https://www.borgafoods.com`; Fufu Flour remained unchanged, Red Palm Oil and supplier-identifying information were absent, and the RFQ form retained its existing fields and product options. A read-only `GET /api/export-quote` returned the expected `405 invalid_method`, confirming the Function remained active without submitting an enquiry.

## 7 August 2026 — Phase 3 production readiness

Privacy-notice commit: `cdbbed56221d38fde372804bc4d90161eec8f05f`

Readiness deployment commit: `3ef938f5b9d97bc450a9e37546b4f6eb109f2aaa`

Production-verification documentation commit: `5547248bb847b6ed033c1944b484793f37832d57`

Completed changes:

- added the approved quotation-form consent notice and the 24-month maximum retention statement;
- configured server-only quotation delivery and Turnstile settings for Cloudflare Preview and Production;
- verified Preview delivery with request ID `BF-0E9387D7`, buyer `Reply-To`, no automatic acknowledgement, and no browser console errors;
- approved the initial production launch without a separate Cloudflare rate-limiting rule while DNS and Cloudflare zone control are unavailable;
- retained Turnstile, the honeypot, validation, origin checks, body limits, field limits, and provider idempotency as mandatory launch controls;
- retained `export@borgafoods.com` as the public identity and future production mailbox without exposing the temporary recipient in browser-delivered content;
- passed formatting, TypeScript checking, all six endpoint tests, the production build, diff validation, and the public-output personal-address scan.

Deployment status: Cloudflare production deployment `c274f5d6-cea7-4421-8eb2-f09c29b1ff17` succeeded. Live request `BF-2786969F` verified notification delivery, buyer `Reply-To`, no automatic acknowledgement, authenticated delivery for the temporary sender, and no browser console errors. The Home, Products, Export Solutions, Wholesale, Export & Compliance, About, Contact, and 404 routes rendered successfully.

## 7 August 2026 — Temporary server-only quotation recipient

Commit: `118a6899a33eb6363b05a01354e2db78775eea1e`

Completed changes:

- separated the public `export@borgafoods.com` identity from the internal Resend notification recipient;
- added server-only `EXPORT_QUOTE_NOTIFICATION_EMAIL` and `EXPORT_QUOTE_FROM_EMAIL` configuration so the recipient and authorized sender can change without code changes;
- approved the personal Gmail mailbox as a temporary internal recipient while `borgafoods.com` DNS access is unavailable, without exposing it in pages, frontend code, public metadata, customer-facing messages, or the production bundle;
- changed the sender display identity to `BorgaFoods Export Quote` and retained the buyer's validated address in `Reply-To`;
- retained `export@borgafoods.com` as the intended future production mailbox and public fallback address;
- passed formatting, TypeScript, six endpoint tests, production build, diff validation, and a personal-address scan of client, shared, Function, and built files.

Deployment status: committed locally only. Preview and production remain undeployed pending Resend configuration, Cloudflare server variables/secrets, the approved privacy notice, rate limiting, and successful preview delivery verification.

## 6 August 2026 — Phase 3 secure export quotation workflow

Commit: `249494d35fccd455314967c0196b9b08eef5301a`

Input-normalization hardening: `319a3c711ed5580489461c3094cd68f2eb8c5455`

Completed changes:

- replaced the Contact form's `mailto:` preparation with a same-origin `/api/export-quote` Cloudflare Pages Function;
- expanded quotation data to include the approved company, contact, phone/WhatsApp, product, packaging, quantity, destination, port, and message fields;
- added a shared Zod schema, catalog-backed product validation, request IDs, Resend idempotency, safe HTML/text email formatting, and buyer `Reply-To` handling;
- added Cloudflare Turnstile with mandatory server-side token, hostname, and action validation;
- retained `export@borgafoods.com` as the operational mailbox and prevented customer auto-acknowledgements;
- added no database, CRM, attachment storage, supplier fields, pricing, or automatic quotation logic;
- added encrypted-secret requirements, a public site-key variable, `/api/*` Function routing, and a direct email fallback;
- passed TypeScript, six endpoint tests, production build, formatting, static-output secret scan, desktop route tests, browser failure-state tests, console-error checks, and 390 px responsive validation.

Deployment status: not pushed or deployed. Production activation requires Resend domain verification, a working `export@borgafoods.com` mailbox, a production Turnstile widget, Cloudflare encrypted secrets, the public site-key build variable, and verified preview delivery.

## 6 August 2026 — Phase 2 export platform expansion

Commit: `ef3b4444bd0d82282d81e3eef2c46b867a85ef0e`

Completed changes:

- added the `/export-solutions` and `/wholesale` routes using the existing design system;
- positioned BorgaFoods as a Ghanaian food manufacturer first and an export sourcing partner second;
- added manufacturer and export-selection product labels without exposing supplier information;
- added reusable “Request Export Quote” calls to action across the relevant pages and navigation;
- centralized `export@borgafoods.com` and replaced the non-operational fake-submit behavior with a transparent email-preparation workflow;
- retained and revised `/export` as a requirements-led export and compliance information page;
- added canonical URLs, new sitemap entries, updated structured data, and no-index handling for the 404 route;
- documented the external mailbox, DNS, and future server-side email integration steps;
- passed `pnpm check`, `pnpm build`, Prettier, product-integrity, sitemap, desktop-route, canonical, console-error, and mobile-navigation validation.

Deployment status: not pushed or deployed; user authorization is required under `AI_TASK_PROTOCOL.md`.

## 6 August 2026 — AI project documentation system

Commit: `1b172520f76a8471c0fa831e14b3806187904a61`

Completed changes:

- created the permanent `docs/` project knowledge base;
- documented business context, permanent rules, roadmap, change history, and the AI working protocol;
- made approved manufacturing, partner-sourcing, supplier-confidentiality, architecture, testing, and reporting requirements available to future agents;
- changed documentation only; website functionality and configuration were not modified.

## 6 August 2026 — Phase 1 product architecture

Commit: `787c1804b51ef7d5e658424874a4d05853feb185`

Completed changes:

- created the centralized typed product catalog;
- migrated Home, Products, product-related SEO content, and the Contact selector to the catalog;
- added explicit manufactured and partner-sourced classification;
- applied the approved BorgaFoods brand and BorgaFoods Processing manufacturer rules;
- classified Banku Borga as a Traditional Ghanaian Staple;
- prevented public supplier brand/manufacturer fields on partner-sourced products;
- preserved all existing routes and page layouts;
- passed TypeScript, production-build, product-rule, slug, and image-reference checks.

## 9 July 2026 — Product presentation polish

Commit: `262c2f2ede8a117e1c1aef0faefa57c34a3ed5f8`

Completed changes:

- standardized product-image framing;
- added product-card hover polish;
- displayed all five then-current products on the homepage product grid.

## Change-log protocol

For every completed implementation:

1. record the date;
2. describe the user-visible and architectural changes;
3. record the full commit hash;
4. mention important validation performed;
5. do not record planned work as completed.
