# BorgaFoods Website Roadmap

Last updated: 7 August 2026

## Roadmap principles

- Extend the existing website; do not create a replacement website.
- Preserve the current design language and architecture unless a phase explicitly approves a design change.
- Complete and verify one phase before expanding scope.
- Use the central product catalog and permanent business rules as the source of truth.
- Do not present planned features as live until they are implemented and operationally verified.

## Phase 1 — Product architecture

Status: **Completed and approved**

Completed work:

- centralized product data in `client/src/data/products.ts`;
- removed duplicated product records from core pages where practical;
- added explicit `manufactured` and `partner_sourced` supply types;
- encoded brand and manufacturer requirements for manufactured products;
- protected partner-sourced products from public supplier-brand/manufacturer fields;
- updated Home, Products, SEO product names, and Contact product choices to use the central catalog;
- added export and wholesale availability fields;
- aligned the current manufactured range with approved BorgaFoods business rules.

Primary commit: `787c1804b51ef7d5e658424874a4d05853feb185`

## Phase 2 — Export and distribution information

Status: **Completed, deployed, and production verified**

Completed implementation:

- added `/export-solutions` for manufacturer-first export positioning, partner sourcing, container supply, and the five-step export process;
- added `/wholesale` for distributors, African grocery retailers, wholesalers, restaurants, and food-service buyers;
- retained `/export` and revised it as the requirements-led export and compliance information page;
- added reusable “Request Export Quote” calls to action across Home, Products, Export Solutions, Wholesale, Export & Compliance, and navigation;
- added the approved manufactured and export-selection product presentation labels;
- centralized the public export email and added a transparent email-preparation enquiry workflow without a server, CRM, or database;
- added page metadata, canonical URLs, sitemap entries, no-index handling for the 404 route, and safer structured data;
- documented external mailbox, DNS, and future server-side email integration steps.

Primary commit: `ef3b4444bd0d82282d81e3eef2c46b867a85ef0e`

Phase 2 must not expose supplier identities or describe partner-sourced products as manufactured by BorgaFoods.

## Phase 3 — Request quotation workflow

Status: **Completed and production verified**

Completed implementation:

- added the same-origin `/api/export-quote` Cloudflare Pages Function;
- added a shared Zod schema for browser and server quotation data;
- expanded the form with company, contact, market, phone/WhatsApp, product, packaging, quantity, destination, port, and message fields;
- added Cloudflare Turnstile with mandatory server-side token, hostname, and action verification;
- integrated one internal Resend notification with a server-only configurable recipient and sender, keeping `export@borgafoods.com` public and the buyer address in `Reply-To`;
- added provider idempotency, request IDs, body limits, origin checks, input escaping, safe errors, and a honeypot;
- added buyer-visible submitting, success, verification, failure, and email-fallback states;
- kept the first release stateless with no database, CRM, attachments, or automatic customer acknowledgement;
- restricted Pages Function invocation to `/api/*`;
- added automated endpoint tests and expanded TypeScript checking to server files;
- added the approved enquiry consent notice and the 24-month maximum retention statement;
- configured Resend and Turnstile for Preview and Production and verified preview notification delivery, buyer `Reply-To`, and the absence of an automatic acknowledgement.

Primary implementation commit: `249494d35fccd455314967c0196b9b08eef5301a`

Production readiness was approved on 7 August 2026. Cloudflare production deployment `c274f5d6-cea7-4421-8eb2-f09c29b1ff17` succeeded from commit `3ef938f5b9d97bc450a9e37546b4f6eb109f2aaa`, and live request `BF-2786969F` verified delivery, buyer `Reply-To`, and the absence of an automatic acknowledgement. The intended future mailbox remains `export@borgafoods.com`; the temporary Gmail fallback is server-only while domain DNS access is unavailable. Launch without a separate Cloudflare rate-limiting rule is temporarily approved because Turnstile, the honeypot, validation, origin checks, body limits, and request controls are active. Rate limiting must be reconsidered when DNS and Cloudflare zone control are restored.

## Phase 4 — Private label and customer tools

Status: **Phase 4A, 4B, and 4C deployed and verified at every layer reachable without solving Turnstile: production routes, server-side allowlists, Cloudflare deployment/build logs, required secret/variable presence, Turnstile widget hostname scope, and Function health. See the Phase 4B/4C notes below for the one remaining fact (a human-witnessed live email) that could not be established this session.**

Review proposal: [`PHASE_4_PLANNING_PROPOSAL.md`](./PHASE_4_PLANNING_PROPOSAL.md)

Planning foundation: [`PRODUCT_CAPABILITY_MODEL.md`](./PRODUCT_CAPABILITY_MODEL.md)

Open classification gate: [`PRODUCT_CLASSIFICATION_REVIEW.md`](./PRODUCT_CLASSIFICATION_REVIEW.md). The listed items must not be added to new public Phase 4 content until business validation is recorded.

### Phase 4A — Export catalogue expansion

Status: **Deployed and production verified**

Completed implementation:

- added capability-derived visibility, source-alignment, current-public, Phase 4 expansion, and RFQ selectors to the single typed product catalog;
- kept Fufu Flour in the existing public catalog and existing RFQ path while excluding it from the new Phase 4 expansion selector until PCR-001 is resolved;
- kept Red Palm Oil out of all public catalog, metadata, and RFQ data;
- wired Home, Products, Export Solutions, Contact, and the quotation Function to the relevant derived catalog selectors;
- added a build-blocking catalog verification step that rejects a partner-sourced record exposing public brand or manufacturer fields;
- added catalog control tests alongside the existing quotation tests.

No partner-sourced product has been newly published because the capability model contains no partner record with public-display approval.

Production deployment `5eb7632b-674e-45f5-8691-2de40e81edd9` succeeded from GitHub `main` on 7 August 2026. The production build executed the mandatory catalog verification (5 current public products; 4 Phase 4 expansion-eligible products). The affected public routes, current Fufu Flour presentation, Red Palm Oil exclusion, supplier confidentiality controls, and existing RFQ form/Function behavior were verified live.

Potential implementation scope after approval:

- add a Private Label/OEM section for eligible products;
- document packaging, artwork, labeling, samples, approval, production, and compliance steps;
- connect private-label requests to the quotation workflow;
- add future customer tools where a validated business need exists;
- consider secure document exchange, quote tracking, order updates, or customer portals only after requirements and access controls are approved.

Partner-sourced products must not be marked private-label or OEM eligible unless the capability is explicitly confirmed.

Phase 4 must not begin from this roadmap entry alone. It requires an approved scope, confirmed eligible products and capabilities, and any required legal or regulatory decisions.

### Phase 4B — Wholesale and distributor qualification

Status: **Deployed and verified at the application and infrastructure layers, 8 August 2026. The one fact requiring a human (a witnessed live email) remains open — see below.**

Production verification performed 8 August 2026 (implementation commit `368af51e778d50285384c17f4d44852ae49be0a9` on `main`, confirmed identical to `origin/main`): `/contact?inquiry=wholesale` renders the buyer-category field and required-state correctly; a same-origin POST to `/api/export-quote` with `inquiryType: "wholesale"` and no `buyerCategory` returned `invalid_request`; the same request with a valid `buyerCategory` and product passed schema/allowlist validation and reached Turnstile verification (`verification_failed`, since a deliberately invalid token was used — Turnstile itself was not solved or bypassed, per policy). The existing mocked test suite (`functions/api/export-quote.test.ts`) asserts `Reply-To` is set to the buyer's email and that qualification content appears in the notification without supplier data; this was re-run (17/17 passing).

Cloudflare dashboard verification (same date, once dashboard access became available): the `borgafoods` Pages project's latest Production deployment (`d80ff265`) has source commit `86e4fd0` and build status **success**, aliased to `www.borgafoods.com`; the build log shows the catalog verifier, `vite build`, and Function compilation all succeeding with no errors (two long-standing, already-documented warnings only — ignored `pnpm` build scripts, and the known `_redirects` infinite-loop warning `AI_TASK_PROTOCOL.md` says not to fix as incidental work). `RESEND_API_KEY`, `TURNSTILE_SECRET_KEY`, and `EXPORT_QUOTE_NOTIFICATION_EMAIL` are present as encrypted secrets (values not viewed); `VITE_TURNSTILE_SITE_KEY` and `EXPORT_QUOTE_FROM_EMAIL` (`onboarding@resend.dev`, the documented temporary Resend sandbox sender) are present as plaintext, matching that these are not meant to be secret. The Turnstile widget "BorgaFoods Export Quote" is scoped to exactly `www.borgafoods.com`, the approved preview hostname, and one historical preview deployment, with action name `export_quote` matching the code. Function metrics for the last 24 hours show 27 successful requests and 0 errors of any kind. Turnstile's own analytics show 5 siteverify requests in the last 24 hours: 3 invalid (exactly matching this session's 3 deliberately-invalid-token allowlist-probe requests) and **2 valid** — genuine solves this session did not perform, which the code would have carried straight through to a Resend send attempt. No Resend-side delivery confirmation was available (no Resend dashboard access), so the 2 valid solves are strong circumstantial evidence, not a witnessed delivery.

Completed implementation:

- extended the existing Contact/RFQ workflow with controlled buyer category, optional sales channel, target market, expected order frequency, expected timing, and an explicit privacy acknowledgement;
- preserved the existing company, contact, country, product, packaging, quantity, destination, message, Turnstile, honeypot, origin, request-size, idempotency, and buyer `Reply-To` controls;
- added wholesale and distributor CTA preselection while retaining the single Contact route and `/api/export-quote` Function;
- added validated qualification context to the single internal Resend notification without a CRM, database, automatic quotation, acknowledgement, pricing, or product expansion;
- kept Fufu Flour in its existing RFQ behavior, excluded Red Palm Oil, and retained the partner brand/manufacturer confidentiality build guard; and
- recorded the field and internal-email mappings as implementation references.

Remaining: a human-performed live submission (real Turnstile completion) for a wholesale and a distribution enquiry, confirming the notification actually arrives at the configured recipient with buyer `Reply-To` and no automatic acknowledgement. Given the healthy Function metrics and the 2 independently-observed valid Turnstile solves in the same 24-hour window, this is very likely already working; it has not been personally witnessed.

### Phase 4C — Private-label discovery

Status: **Deployed and verified at the application and infrastructure layers, 8 August 2026. The one fact requiring a human (a witnessed live email) remains open — see below.**

Production verification performed 8 August 2026 (implementation commit `368af51e778d50285384c17f4d44852ae49be0a9` on `main`, confirmed identical to `origin/main`): `/contact?inquiry=private-label` renders a product selector containing only Fufu Flour. Same-origin POSTs to `/api/export-quote` with `inquiryType: "private_label"` were sent for every other current catalog product (`gari-borga`, `kokonte-borga`, `banku-borga`, `cassava-flour`), for `red-palm-oil`, and for unknown/placeholder values (`not-a-real-product`, `all`, `other`) — every one returned `invalid_request`, rejected before Turnstile verification. The identical request for `fufu-borga` passed schema and allowlist validation and reached Turnstile verification (`verification_failed`, deliberately invalid token — Turnstile was not solved or bypassed). This confirms the server-side allowlist matches the frozen capability-model decision exactly. The Cloudflare-dashboard findings recorded under Phase 4B above (deployment status, secrets, Turnstile hostname scope, Function health, siteverify counts) apply equally here, since both phases share the one `/api/export-quote` Function and Turnstile widget.

Completed implementation:

- recorded `fufu-borga` (Fufu Borga) as the sole approved private-label discovery product; all other manufactured records require further approval, while partner-sourced products and Red Palm Oil remain excluded;
- added a controlled `private_label` intent to the existing Contact form, shared RFQ schema, and `/api/export-quote` Function;
- derived the client selector and server allowlist from the central typed product catalog, so manipulated submissions for every other product are rejected;
- added only approved, requirements-led discovery wording to the existing Wholesale and Contact experiences;
- collected optional market, sales-channel, artwork/label-readiness, labeling/language, and timing context, with product specifications and requirements required for a private-label request;
- retained Turnstile, honeypot, origin/body controls, Resend, a single internal notification, buyer `Reply-To`, consent, no automatic acknowledgement, no CRM/database, and supplier confidentiality; and
- documented the manual-review condition: BorgaFoods management/export team confirms MOQ, packaging, specifications, production feasibility, and regulatory requirements before any acceptance.

Remaining: a human-performed live private-label submission for the Fufu Borga record (real Turnstile completion), confirming the notification arrives with buyer `Reply-To` and no automatic acknowledgement. As with Phase 4B, this is very likely already working given the healthy Function metrics and independently-observed valid Turnstile solves; it has not been personally witnessed.

Also confirmed 8 August 2026: `borgafoods.com` (apex, without `www`) shows **Inactive** in Cloudflare custom domains, unchanged from the pre-existing, already-documented apex-domain issue. Per `AI_TASK_PROTOCOL.md`, this is not to be mixed into feature work unless explicitly requested; it is recorded here only as an observed, unchanged fact.

## Cross-phase work

The following work may be scheduled alongside an approved phase when it does not expand business scope:

- automated type-check and build verification;
- route and form smoke tests;
- image performance optimization without visual redesign;
- SEO metadata, structured data, sitemap, and canonical improvements;
- accessibility fixes;
- deployment documentation and release verification;
- resolution of Cloudflare build warnings as separately approved maintenance tasks;
- catalogue discovery/conversion improvements within the current 5-product public catalog (category filtering, per-product quote preselection) — completed 8 August 2026, see `CHANGE_LOG.md`.

## Product intelligence reconciliation (8 August 2026)

The supplied `BorgaFoods_Master_Export 001.xlsx` working workbook was reconciled against the frozen capability model. Full findings, including 22 identified candidate partner-sourced products and the required business decisions, are recorded in [`PRODUCT_INTELLIGENCE_RECONCILIATION.md`](./PRODUCT_INTELLIGENCE_RECONCILIATION.md). **No candidate product was published**; none has a recorded product-level public-display approval, and all are additionally blocked by the absence of any public-safe (non-supplier-branded) image. This reconciliation is not itself an authorization — it is a prerequisite for a future, separately approved export-catalogue expansion phase once the required business decisions in that document are made.

## BorgaFoods Product Intelligence Platform (BPIP) — Phases 1 & 2, core architecture complete (8 August 2026)

Status: **Implemented and production-deployed. Internal architecture change; no public content or business rule changed.**

The internal product registry, workflow gates, and validation described in [`PRODUCT_INTELLIGENCE_PLATFORM.md`](./PRODUCT_INTELLIGENCE_PLATFORM.md) formalize the reconciliation above (and the frozen capability model) as typed, build-checked code. `client/src/data/products.ts` is a thin adapter over this registry rather than the product-data owner — verified to produce byte-identical public output to the prior implementation. As of Phase 2, the RFQ Function (`functions/api/export-quote.ts`) also imports the registry directly and no longer depends on `client/src/data/products.ts` at all, giving the website and the RFQ system exactly one shared, authoritative product source. This is enforced at build time, not just documented: `scripts/verify-no-internal-leak.ts` guards the client-bundle boundary, and the new `scripts/verify-single-source-of-truth.ts` guards against a second product-data source or a regression in the RFQ Function's import — both verified to fail closed. The 21 reconciled candidates and Red Palm Oil remain tracked internally with no supplier name, brand, or price. All 51 tests pass, including the 11 pre-existing RFQ-endpoint tests unmodified, confirming zero regression in validation, allowlists, or private-label controls. See [`BPIP_MIGRATION_PLAN.md`](./BPIP_MIGRATION_PLAN.md) for completed Phase 1/2 scope and proposed future phases, including the explicit, unapproved future decision point for persistent storage.

This work does not publish any product, does not change PCR-001/PCR-002, and does not change any private-label approval. With Phase 2 complete, the core BPIP architecture is considered done; further product-catalogue growth is a business-approval exercise against the existing registry, not an engineering project.

## Search & Analytics Foundation (8 August 2026)

Status: **Implemented and production-deployed.** Full detail in [`SEO_FOUNDATION.md`](./SEO_FOUNDATION.md) and [`ANALYTICS_DASHBOARD_SPEC.md`](./ANALYTICS_DASHBOARD_SPEC.md).

Config-gated GA4 tracking and RFQ conversion events, config-gated Search Console/Bing verification tags, a real structured-data bug fix (product schema was built but never rendered), sitemap/robots.txt validation, and Core Web Vitals fixes (removed ~7.9 MB of orphaned images, re-encoded product photos to JPEG for an ~88% size reduction, made the fonts stylesheet non-render-blocking) are all live. Two items remain genuinely blocked on external account access this repository does not have: activating GA4 (needs a GA4 property to be created) and completing Bing verification (needs a Microsoft account). **Google Search Console verification is complete** — see the entry below. A recommended recurring "Growth Audit" was designed but could not be scheduled as a cloud routine — blocked by GitHub not being connected to the claude.ai connector used for that feature.

This work does not change any business rule, product classification, or public claim.

## Google Search Console verification and SEO route handling repair (8 August 2026)

Status: **Complete and production-verified.** Full detail, including one reverted regression along the way, in [`SEO_FOUNDATION.md`](./SEO_FOUNDATION.md) §1 and §8, and [`CHANGE_LOG.md`](./CHANGE_LOG.md).

BorgaFoods completed Google Search Console's URL-prefix HTML-tag verification for `https://www.borgafoods.com`. Activating it exposed two real defects once the property was live: canonical/robots tags were client-JavaScript-only (invisible to any check that doesn't render JS, same root cause as an earlier verification-tag bug this session also fixed), and unknown paths returned a soft 404 (HTTP 200) instead of a real 404. Both are now fixed at the edge via `functions/_middleware.ts`, routed to every request through `client/public/_routes.json`. `client/public/_redirects` is no longer load-bearing for SPA routing — Cloudflare does not apply it to requests routed through Pages Functions — and is kept only as a commented, inert fallback.

This work does not change any business rule, product classification, or public claim, and does not touch product data, Turnstile configuration, or RFQ logic.
