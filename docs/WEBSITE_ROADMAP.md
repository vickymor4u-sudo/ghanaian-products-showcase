# BorgaFoods Website Roadmap

Last updated: 6 August 2026

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

Status: **Implemented and committed; production configuration and deployment verification pending**

Completed implementation:

- added the same-origin `/api/export-quote` Cloudflare Pages Function;
- added a shared Zod schema for browser and server quotation data;
- expanded the form with company, contact, market, phone/WhatsApp, product, packaging, quantity, destination, port, and message fields;
- added Cloudflare Turnstile with mandatory server-side token, hostname, and action verification;
- integrated one internal Resend notification to `export@borgafoods.com` with the buyer address in `Reply-To`;
- added provider idempotency, request IDs, body limits, origin checks, input escaping, safe errors, and a honeypot;
- added buyer-visible submitting, success, verification, failure, and email-fallback states;
- kept the first release stateless with no database, CRM, attachments, or automatic customer acknowledgement;
- restricted Pages Function invocation to `/api/*`;
- added automated endpoint tests and expanded TypeScript checking to server files.

Primary implementation commit: `249494d35fccd455314967c0196b9b08eef5301a`

Production remains gated on Resend domain verification, the operational mailbox, a production Turnstile widget, Cloudflare encrypted secrets, a public Turnstile site-key build variable, rate-limiting configuration, approved privacy/retention handling, preview delivery testing, deployment of the intended commit, and a verified live mailbox delivery. Until those checks pass, the server-backed Contact form must not be described as operational.

## Phase 4 — Private label and customer tools

Status: **Planned**

Planned scope:

- add a Private Label/OEM section for eligible products;
- document packaging, artwork, labeling, samples, approval, production, and compliance steps;
- connect private-label requests to the quotation workflow;
- add future customer tools where a validated business need exists;
- consider secure document exchange, quote tracking, order updates, or customer portals only after requirements and access controls are approved.

Partner-sourced products must not be marked private-label or OEM eligible unless the capability is explicitly confirmed.

## Cross-phase work

The following work may be scheduled alongside an approved phase when it does not expand business scope:

- automated type-check and build verification;
- route and form smoke tests;
- image performance optimization without visual redesign;
- SEO metadata, structured data, sitemap, and canonical improvements;
- accessibility fixes;
- deployment documentation and release verification;
- resolution of Cloudflare build warnings as separately approved maintenance tasks.
