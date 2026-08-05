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

Status: **Planned**

Planned scope:

- evolve the existing `/export` route into the Export Solutions page;
- add a Wholesale section using the current design system;
- add distributor information and partnership guidance;
- explain the difference between manufactured and partner-sourced supply;
- document sourcing, quality coordination, consolidation, labeling, export documentation, and logistics workflows;
- add appropriate calls to action without implementing the quotation backend prematurely.

Phase 2 must not expose supplier identities or describe partner-sourced products as manufactured by BorgaFoods.

## Phase 3 — Request quotation workflow

Status: **Planned**

Planned scope:

- create a real request-for-quotation workflow;
- connect product, wholesale, export, and future private-label inquiries;
- implement server-side validation;
- add spam protection and rate limiting;
- integrate an approved business email service;
- provide reliable success and failure states;
- define inquiry routing, acknowledgment, privacy, and data-retention procedures;
- optionally add approved CRM or database storage.

The current Contact form is not an operational submission channel and must not be treated as one.

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
