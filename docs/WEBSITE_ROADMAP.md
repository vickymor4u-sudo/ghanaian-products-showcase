# BorgaFoods Website Roadmap

Last updated: 9 August 2026

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

## Search Intelligence & Conversion Analytics — audit and planning phase (9 August 2026)

Status: **Audit and planning complete; no implementation, by design.**
Full detail in [`GSC_INDEXING_AUDIT.md`](./GSC_INDEXING_AUDIT.md),
[`GA4_ACTIVATION_PLAN.md`](./GA4_ACTIVATION_PLAN.md),
[`SEARCH_INTELLIGENCE_FRAMEWORK.md`](./SEARCH_INTELLIGENCE_FRAMEWORK.md),
and [`BUYER_INTENT_CONTENT_AUDIT.md`](./BUYER_INTENT_CONTENT_AUDIT.md).

Checked what Search Console reports one day after verification (sitemap
read successfully, 7 pages discovered, no manual actions or security
issues; per-page indexing data still processing, as expected for a
new property). Documented a GA4 event taxonomy and isolated the actual
activation blocker (a privacy-notice/consent decision, not an
engineering gap). Built a search-keyword framework strictly scoped to
the 5 published BPIP products and existing business capabilities.
Audited all 7 live pages against the site's 4 named buyer personas,
finding one minor cross-referencing gap and one wording-consistency
finding on `/about` for business review.

No page was created, no product was added or reclassified, and no
public claim was changed — everything above is audit and planning
output, per this phase's explicit constraints.

## Export Buyer Content Architecture — plan for approval (9 August 2026)

Status: **Planning complete; no code written, no page created, no
content changed.** Full detail, and the single consolidated deliverable,
is [`CONTENT_ARCHITECTURE_IMPLEMENTATION_PLAN.md`](./CONTENT_ARCHITECTURE_IMPLEMENTATION_PLAN.md),
drawing on [`PUBLIC_CLAIM_VERIFICATION_AUDIT.md`](./PUBLIC_CLAIM_VERIFICATION_AUDIT.md),
[`SEO_CONTENT_ARCHITECTURE.md`](./SEO_CONTENT_ARCHITECTURE.md), and
[`BUYER_CONVERSION_GAP_ANALYSIS.md`](./BUYER_CONVERSION_GAP_ANALYSIS.md).

Checked every claim on `/about`, `/export`, `/wholesale`, and
`/products` against `BUSINESS_RULES.md`,
`PRODUCT_CAPABILITY_MODEL.md`, and
`PUBLIC_PRODUCT_PRESENTATION_RULES.md`: `/export`, `/wholesale`, and
`/products` are clean; `/about` has 7 unsupported claims (most notably a
specific "500 kg" MOQ figure, a direct violation of the no-unapproved-MOQ
rule), each with a drafted, business-rule-compliant correction ready for
review, none applied. Designed a product-page architecture (priority
order: Fufu Flour, Gari, Cassava Flour, Banku Borga, Kokonte, at
`/products/{slug}`) and recommended *against* building separate
"buyer-intent" pages (e.g. "African Food Wholesale Supplier"), since
existing pages already target those intents and duplicating them risks
pages competing against each other in search results. Identified two
real, business-approval-gated buyer-conversion gaps — no stated shipping
mode, no indicative lead-time range anywhere on the site — that this
repository can't close on its own since it has no visibility into either
fact.

No page was created, no content was changed, and no code was written —
this phase produced an approval-ready plan only, per its explicit "no
coding until approved" constraint.

## Content Architecture Implementation Phase 1 (9 August 2026)

Status: **Implemented, preview-verified, deployed to production
(commit `6ea7eb9`).** Approved execution of the two lowest-risk items
from the plan above. Full detail in `docs/CHANGE_LOG.md` and the updated
`docs/PUBLIC_CLAIM_VERIFICATION_AUDIT.md` /
`docs/SEO_CONTENT_ARCHITECTURE.md`.

Applied all 7 drafted `/about` corrections — the unsupported "500 kg"
MOQ figure and 6 related unverified claims are gone, replaced with
wording grounded in facts already approved and live elsewhere on the
site. Built and shipped 5 dedicated product landing pages
(`/products/fufu-flour`, `/products/gari`, `/products/cassava-flour`,
`/products/banku-mix`, `/products/kokonte`) using SEO-facing URLs
mapped to BPIP's unchanged internal slugs, each showing only
already-approved fields, with the private-label section appearing only
on the one BPIP-approved product (Fufu Flour) and a shipping/lead-time
section left as an explicit placeholder pending business input. Every
new route was added to the edge middleware's known-path list and the
sitemap; both were verified via raw-HTML `curl` checks against
production, matching this project's established verification discipline
for anything touching `functions/_middleware.ts`.

Not done in this pass, per the approved scope: converting `/products`
into a catalogue index (duplicate-content resolution remains a separate
decision), any new MOQ/certification/lead-time/shipping claim, and
private-label content for any product beyond Fufu Flour.

## Product Page Optimization Phase (9 August 2026)

Status: **Implemented and verified live in production (commit
`ff721da`).** Full detail in `docs/PRODUCT_PAGE_OPTIMIZATION_REPORT.md`
and `docs/COMMERCIAL_INFO_APPROVAL_LIST.md`.

Improved all 5 product pages built in the prior phase: added
buyer-conversion sections (product explanation, packaging, target-buyer
personas, a wholesale CTA, and an FAQ — all built from data or wording
already approved elsewhere on the site, nothing invented), tightened SEO
titles and meta descriptions (the prior descriptions ran 210–231
characters, past Google's practical display limit — now 120–133), added
breadcrumb navigation and structured data, a `url` field on Product
schema, and internal links connecting every product page to `/export`,
`/wholesale`, `/products`, `/contact`, and each other (plus a matching
update to `/export-solutions`'s product list). Catalogued, but did not
publish, the commercial information genuinely missing from the site —
shipping details, certifications beyond what's approved, MOQ, lead
times, production capacity — as a business-approval list.

No claim was invented, no new product was added, no supplier information
was referenced, and the RFQ workflow was not touched.

## Search Intelligence & Buyer Acquisition (9 August 2026)

Status: **Monitoring checkpoint recorded; two decisions/plans prepared
for BorgaFoods, nothing published or submitted externally.** Full detail
in `docs/GSC_INDEXING_AUDIT.md`, `docs/COMMERCIAL_INFO_DECISION_RECORD.md`,
and `docs/OFFSITE_AUTHORITY_BUILDING_PLAN.md`.

Checked live Search Console data now that real numbers exist (5
impressions, avg. position 4.8, one query so far) and resubmitted the
sitemap after finding Google hadn't yet re-read the file since the 5
product-page URLs were added. Turned the commercial-information gap list
from the prior phase into a sign-off sheet (MOQ, shipping mode, lead
time, export documents, production capacity) — decisions left blank for
BorgaFoods, since this repository has no visibility into any of the real
figures. Researched and named real off-site authority-building
opportunities — GEPA exporter registration, 4 Ghana food-trade
associations, 4 African B2B food directories, and a LinkedIn company
page (the highest-value, zero-cost item, and the missing piece for an
already-known structured-data gap) — without creating any account or
contacting any organization, since each requires a business action this
repository doesn't perform on its own.

## Search Growth Monitoring System (9 August 2026)

Status: **Established and run once, live.** Full detail in
`docs/GROWTH_MONITORING_FRAMEWORK.md` (the repeatable process) and
`docs/GROWTH_TRACKING_LOG.md` (dated results).

Built a monthly, repeatable framework — 4 defined checks (GSC
performance, target-keyword tracking, competitor visibility, a
decision rule requiring real evidence before any site change) — instead
of another one-off audit. Ran it once: confirmed the sitemap
resubmission from earlier the same day was picked up (12 pages
discovered, up from 7), and ran real competitor-visibility searches for
all 4 priority keywords, surfacing named competitors and two
data-supported observations (certification as a visible competitive
differentiator; lighter apparent B2B-specific competition on two of the
four exact target phrases) — both logged as reinforcing already-pending
decisions, not new ones, since neither cleared the framework's own bar
for acting.

Attempted to automate the monthly cycle as a recurring cloud routine —
blocked with an explicit, actionable error: connect GitHub at
claude.ai's connector settings. A genuine external-account action for
BorgaFoods to take if automation is wanted; the framework works fully
as a manual monthly process in the meantime. Noted that full unattended
automation would need a second connector (live GSC/browser access) even
after GitHub is connected — flagged honestly rather than overstating
what scheduling alone would achieve.

## External Authority & Buyer Trust Framework (9 August 2026)

Status: **Preparation complete; no account created, no registration
submitted, no external claim made.** Full detail in
`docs/EXTERNAL_AUTHORITY_TRUST_FRAMEWORK.md` and
`docs/COMPANY_PROFILE_DRAFT.md`.

Turned `docs/OFFSITE_AUTHORITY_BUILDING_PLAN.md`'s named opportunities
into actual readiness: drafted reusable company-description text at 3
lengths (sized specifically to LinkedIn's tagline/About limits), built
entirely from facts already approved and live on the site. Researched
GEPA's real registration process (form, business certificates, possible
facility inspection) and the 4 trade associations' application paths —
honestly reporting that none publish fees or a self-service process, all
four need direct contact. Flagged a genuine prerequisite: whether
`export@borgafoods.com` actually receives mail yet, since it will likely
gate LinkedIn/GEPA/association verification and this repository can't
test it. Consolidated everything into one priority order, LinkedIn
first (no third-party dependency, ready to execute once BorgaFoods has a
logo and cover image).

Everything genuinely requiring an external account, business document,
or organization contact was left for BorgaFoods to do — this phase
prepared the assets, it didn't act on them.

## External Authority Activation Package (9 August 2026)

Status: **Assets prepared; publication blocked on one confirmation.**
Full detail in `docs/LINKEDIN_COMPANY_PAGE_PACKAGE.md`,
`docs/GEPA_CREDIBILITY_SECTION_PROPOSAL.md`,
`docs/EXPORTER_PROFILE_ONE_PAGER.md`, and
`docs/COMPANY_NAME_CONSISTENCY_REVIEW.md`.

BorgaFoods supplied a real GEPA exporter-registration certificate
(Supply and Demand Worldwide Limited, Registration No. GEPA2018800113,
issued 2018) and confirmed `export@borgafoods.com` is operational,
resolving the prior phase's open prerequisite. Finalized a ready-to-use
LinkedIn company page package and a reusable one-page exporter profile
structure. Found a genuine, material blocker in the process: the
certificate's own printed Date of Expiry is 26 Feb 2019, with "Subject
to Annual Renewal" printed on it, and no independent public confirmation
of current status could be found. Drafted the GEPA-credibility wording
for both the website and the exporter profile, held pending
confirmation rather than published, with two ready options prepared
(a full statement and a conservative fallback) so nothing needs
rewriting once that confirmation lands. Reviewed company-name usage
sitewide (fully consistent for "BorgaFoods Processing"; one minor
"Ltd"/"Limited" variant found, not fixed, flagged as optional).

Reprioritized GEPA renewal confirmation to the top of the external
authority priority order — likely faster than fresh registration, and
the one action that unlocks 3 of this phase's 4 documents.

## External Authority Phase 2 (9 August 2026)

Status: **Evidence reviewed and tracked internally; no supplier name or
certificate published; no new public claim added.** Full detail in
`docs/EXPORT_EVIDENCE_MATRIX.md`, `docs/EXPORTER_PROFILE_PDF_OUTLINE.md`,
and the revised `docs/GEPA_CREDIBILITY_SECTION_PROPOSAL.md` /
`docs/COMPANY_PROFILE_DRAFT.md`.

BorgaFoods supplied two Ghana Tree Crops Development Authority
documents (a partner export licence, a partner manufacturer
registration) for review. Neither names Supply and Demand Worldwide
Limited or BorgaFoods — both certify separate third-party companies —
so both were recorded fully redacted (no company name, no registration
number) in a new claim/evidence/publishability matrix, following this
project's standing supplier-confidentiality convention. **A second,
independent finding beyond redaction**: one document's licence category
("Exporter Of Oil Palm Products") corresponds to Red Palm Oil, this
project's own PCR-002 — frozen, internal-only, excluded from every
public path since early in this project. That document is flagged and
marked not-publishable on that separate ground, not resolved or acted
on; reopening PCR-002 remains a business decision this repository does
not make.

Added an explicit entity-separation section to the GEPA proposal
(Supply and Demand Worldwide Limited, the legal entity GEPA registers,
kept distinct from the BorgaFoods brand in any future wording) and a
note in the company-profile draft explaining why the new evidence
didn't change any published text: it doesn't belong to BorgaFoods, and
the existing "trusted Ghanaian production partners" wording already
covers what it honestly supports. Built a new buyer-facing exporter
profile PDF outline (5 sections) whose "Supporting registrations"
section deliberately excludes both new documents, for the same two
reasons as the evidence matrix. The unresolved GEPA renewal-status
question from the prior phase is unchanged — still pending, still not
published.

Stopped here, as instructed: no supplier identity or certificate is
public anywhere, no certification is claimed beyond what's directly
supported, and the PCR-002 connection is surfaced for business
awareness rather than acted on.

## External Authority Phase 3 — Activation Preparation (9 August 2026)

Status: **All 4 deliverables prepared; nothing submitted, published, or
posted.** Full detail in `docs/LINKEDIN_LAUNCH_CHECKLIST.md`,
`docs/EXPORTER_PROFILE_PDF_DRAFT.md`, `docs/GEPA_RENEWAL_FOLLOWUP.md`,
and `docs/WEBSITE_TRUST_GAP_REVIEW.md`.

Turned the completed authority documents from Phases 1–2 into
execution-ready assets. Consolidated the LinkedIn package into a single
launch checklist and drafted the first 5 launch posts (all built from
already-public facts, none referencing GEPA or unverified
certifications). Wrote the actual draft content for the buyer-facing
exporter profile PDF, filling in the outline from the prior phase with
real copy sourced from BPIP and already-approved page text; its
"Supporting registrations" section lists only the verified Ghana FDA
fact and holds the GEPA line. Prepared a draft GEPA follow-up email and
a document checklist for a possible renewal — researched GEPA's own
published first-time-registration requirements via its Exporters Portal
rather than inventing a process, and honestly flagged that a
renewal-specific procedure isn't publicly documented. Reviewed
`/about`, `/export`, and `/wholesale` line by line for trust statements
that could be strengthened once GEPA is confirmed: found 2 on `/about`,
one candidate new addition on `/export`, and none on `/wholesale`
(which targets buyer/product fit, not export-registration credibility)
— a map to apply against once confirmation lands, not a change made
now.

No page was edited, no email was sent, no account was created, and no
post was published — per this phase's explicit "no external
submissions, no new website claims" constraint.

## External Authority Phase 4 — Authority Activation & Buyer Trust Assets (9 August 2026)

Status: **GEPA status resolved and propagated everywhere it appears
internally; buyer-facing assets finalized. No page edited, no external
account created, no LinkedIn post published.** Full detail in
`docs/GEPA_CREDIBILITY_SECTION_PROPOSAL.md`, `docs/EXPORTER_PROFILE_FINAL.md`,
`docs/LINKEDIN_LAUNCH_CHECKLIST.md`, `docs/WEBSITE_TRUST_ENHANCEMENT_PLAN.md`,
and `docs/BUYER_OUTREACH_TEMPLATES.md`.

BorgaFoods confirmed directly that the GEPA renewal for Registration
No. GEPA2018800113 is completed. Since no renewed certificate or
written GEPA confirmation was supplied, this is recorded everywhere as
a dated, business-attested fact — with the original registration number
and 2018 issue date, and deliberately **no** invented expiry date,
renewal date, or new certificate number. Propagated the finalized,
present-tense GEPA wording across every internal document that had held
it pending confirmation. Rebuilt the buyer-facing exporter profile
into the requested 8-section structure (`docs/EXPORTER_PROFILE_FINAL.md`),
including GEPA as a credential while continuing to exclude both
third-party supplier/partner documents reviewed in Phase 2. Finalized
the LinkedIn About section and expanded the launch-post set from 5 to
10, covering exports, product education, sourcing, export journey, and
buyer relationships without overclaiming capacity or certifications.
Turned the prior phase's trust-gap review into an actual enhancement
plan with proposed wording for 4 GEPA-supported locations across
`/about` and `/export`, while re-confirming 5 unrelated commercial-info
items and all of `/wholesale` stay unchanged. Prepared 3 buyer-outreach
templates (distributor, importer/retailer, private-label) as a
foundation for future outreach, unsent.

No page was edited, no account was created, no post was published, and
no supplier name or certificate was disclosed — per this phase's
explicit constraints.
