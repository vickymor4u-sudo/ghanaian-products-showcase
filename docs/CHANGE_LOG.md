# BorgaFoods Website Change Log

This file records completed, approved changes. Add new entries in reverse chronological order and include the completion date, concise description, and full commit hash.

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
