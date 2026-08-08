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

Status: **Phase 4A, 4B, and 4C deployed and production-route/allowlist verified. Live end-to-end email delivery for a successful (Turnstile-passing) submission remains unverified this session — see the Phase 4B/4C notes below.**

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

Status: **Deployed; production route and server-side validation verified 8 August 2026. Live email delivery for a successful submission not independently re-verified this session.**

Production verification performed 8 August 2026 (implementation commit `368af51e778d50285384c17f4d44852ae49be0a9` on `main`, confirmed identical to `origin/main`): `/contact?inquiry=wholesale` renders the buyer-category field and required-state correctly; a same-origin POST to `/api/export-quote` with `inquiryType: "wholesale"` and no `buyerCategory` returned `invalid_request`; the same request with a valid `buyerCategory` and product passed schema/allowlist validation and reached Turnstile verification (`verification_failed`, since a deliberately invalid token was used — Turnstile itself was not solved or bypassed, per policy). The existing mocked test suite (`functions/api/export-quote.test.ts`) asserts `Reply-To` is set to the buyer's email and that qualification content appears in the notification without supplier data; this was re-run (17/17 passing) but not re-confirmed against a live delivered email, since doing so requires either solving Turnstile (not permitted) or Resend/Cloudflare dashboard access (unavailable this session).

Completed implementation:

- extended the existing Contact/RFQ workflow with controlled buyer category, optional sales channel, target market, expected order frequency, expected timing, and an explicit privacy acknowledgement;
- preserved the existing company, contact, country, product, packaging, quantity, destination, message, Turnstile, honeypot, origin, request-size, idempotency, and buyer `Reply-To` controls;
- added wholesale and distributor CTA preselection while retaining the single Contact route and `/api/export-quote` Function;
- added validated qualification context to the single internal Resend notification without a CRM, database, automatic quotation, acknowledgement, pricing, or product expansion;
- kept Fufu Flour in its existing RFQ behavior, excluded Red Palm Oil, and retained the partner brand/manufacturer confidentiality build guard; and
- recorded the field and internal-email mappings as implementation references.

Remaining: a human-performed live submission (real Turnstile completion) for a wholesale and a distribution enquiry, confirming the notification actually arrives at the configured recipient with buyer `Reply-To` and no automatic acknowledgement.

### Phase 4C — Private-label discovery

Status: **Deployed; production allowlist verified 8 August 2026. Live email delivery for a successful submission not independently re-verified this session.**

Production verification performed 8 August 2026 (implementation commit `368af51e778d50285384c17f4d44852ae49be0a9` on `main`, confirmed identical to `origin/main`): `/contact?inquiry=private-label` renders a product selector containing only Fufu Flour. Same-origin POSTs to `/api/export-quote` with `inquiryType: "private_label"` were sent for every other current catalog product (`gari-borga`, `kokonte-borga`, `banku-borga`, `cassava-flour`), for `red-palm-oil`, and for unknown/placeholder values (`not-a-real-product`, `all`, `other`) — every one returned `invalid_request`, rejected before Turnstile verification. The identical request for `fufu-borga` passed schema and allowlist validation and reached Turnstile verification (`verification_failed`, deliberately invalid token — Turnstile was not solved or bypassed). This confirms the server-side allowlist matches the frozen capability-model decision exactly. As with Phase 4B, live delivery, buyer `Reply-To`, and the no-acknowledgement behavior for a successful submission rely on the unmodified, previously verified `/api/export-quote` logic and the existing mocked test suite (re-run, 17/17 passing) rather than a new live delivered email, since a live test requires solving Turnstile (not permitted) or Resend/Cloudflare dashboard access (unavailable this session).

Completed implementation:

- recorded `fufu-borga` (Fufu Borga) as the sole approved private-label discovery product; all other manufactured records require further approval, while partner-sourced products and Red Palm Oil remain excluded;
- added a controlled `private_label` intent to the existing Contact form, shared RFQ schema, and `/api/export-quote` Function;
- derived the client selector and server allowlist from the central typed product catalog, so manipulated submissions for every other product are rejected;
- added only approved, requirements-led discovery wording to the existing Wholesale and Contact experiences;
- collected optional market, sales-channel, artwork/label-readiness, labeling/language, and timing context, with product specifications and requirements required for a private-label request;
- retained Turnstile, honeypot, origin/body controls, Resend, a single internal notification, buyer `Reply-To`, consent, no automatic acknowledgement, no CRM/database, and supplier confidentiality; and
- documented the manual-review condition: BorgaFoods management/export team confirms MOQ, packaging, specifications, production feasibility, and regulatory requirements before any acceptance.

Remaining: a human-performed live private-label submission for the Fufu Borga record (real Turnstile completion), confirming the notification arrives with buyer `Reply-To` and no automatic acknowledgement.

## Cross-phase work

The following work may be scheduled alongside an approved phase when it does not expand business scope:

- automated type-check and build verification;
- route and form smoke tests;
- image performance optimization without visual redesign;
- SEO metadata, structured data, sitemap, and canonical improvements;
- accessibility fixes;
- deployment documentation and release verification;
- resolution of Cloudflare build warnings as separately approved maintenance tasks.
