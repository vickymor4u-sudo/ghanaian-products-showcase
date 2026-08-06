# BorgaFoods Website Change Log

This file records completed, approved changes. Add new entries in reverse chronological order and include the completion date, concise description, and full commit hash.

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
