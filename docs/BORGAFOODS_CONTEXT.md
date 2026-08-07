# BorgaFoods Project Context

Last updated: 7 August 2026

## Purpose of this document

This document is the durable business and technical context for the BorgaFoods website. Future contributors and AI agents must read it before planning or implementing website changes.

## Company overview

BorgaFoods is the public food brand represented by the website at `borgafoods.com`. The existing website also identifies Supply & Demand Worldwide Ltd as the Ghanaian legal and export-trading company behind the operation. The business has an operational presence in Tema, Ghana, and Hangzhou, China.

BorgaFoods has two complementary supply models:

1. It manufactures selected Ghanaian staple foods through **BorgaFoods Processing**.
2. It sources selected African grocery products from trusted Ghanaian production partners for export customers.

These models must remain visibly distinct. A partner-sourced item must never be presented as manufactured by BorgaFoods.

## Website purpose

The website is the official BorgaFoods B2B product and export-information platform. Its purposes are to:

- present BorgaFoods-manufactured Ghanaian foods;
- present approved partner-sourced product categories without exposing suppliers;
- communicate export, packaging, compliance, and logistics capabilities;
- attract and support wholesale buyers, distributors, importers, retail chains, and food-service buyers;
- generate qualified catalog, sample, partnership, and quotation inquiries;
- support future private-label/OEM and customer-service capabilities.

The website is not an online retail storefront. Its primary role is B2B credibility, product discovery, partnership development, and lead generation.

## Target customers

Primary target customers include:

- international food importers;
- African grocery distributors;
- wholesalers;
- supermarket and retail-chain buyers;
- food-service suppliers;
- diaspora-market specialists;
- prospective regional distribution partners;
- buyers seeking private-label or customized Ghanaian staple foods.

## Markets

The business is Ghana-focused and export-oriented. The website currently positions BorgaFoods for international buyers across:

- Africa;
- Asia;
- the Middle East;
- diaspora and specialty-food markets in other regions.

Ghana is the manufacturing, sourcing, processing, and export origin. The China presence supports market intelligence, trade experience, and international buyer relationships.

Specific country availability, regulatory compliance, certifications, pricing, shipping terms, and lead times must be verified before publication or quotation.

## Manufacturing model

Current BorgaFoods-manufactured products are:

- Gari;
- Cassava Flour;
- Fufu Flour;
- Kokonte;
- Banku Borga.

Permanent catalog rules for these products:

- `supplyType`: `manufactured`
- Brand: `BorgaFoods`
- Manufacturer: `BorgaFoods Processing`

Manufactured products may be offered for wholesale, export, packaging customization, and private-label/OEM programs only when the relevant operational capability has been confirmed.

## Export sourcing model

BorgaFoods may assemble a broader export offering by selecting products from trusted Ghanaian production partners. This supports buyers that want a wider Ghanaian or African grocery assortment through one export relationship.

Partner sourcing is a selection, coordination, and export-supply service. It is not BorgaFoods manufacturing. Public pages must protect supplier confidentiality and use the approved wording defined in `BUSINESS_RULES.md`.

Future partner-sourced categories include:

- Palm Oil;
- Palm Soup Base;
- Seasonings;
- Snacks;
- Beverages;
- other approved African grocery products.

No future product should default to `manufactured`. Every product record must explicitly declare its supply type.

## Product categories

### Current manufactured range

- Cassava Products
  - Gari
  - Cassava Flour
  - Kokonte
- Traditional Flour Blends
  - Fufu Flour
- Traditional Ghanaian Staples
  - Banku Borga

### Future partner-sourced range

- Cooking Oils
- Soup Bases
- Seasonings
- Snacks
- Beverages
- Other approved African grocery categories

Category names may be refined as the catalog grows, but changes to product supply type, brand, or manufacturer require business approval.

## Current website architecture

The existing website must be extended rather than replaced. It is a static, client-rendered single-page application with these routes:

- `/`
- `/products`
- `/export-solutions`
- `/wholesale`
- `/export`
- `/about`
- `/contact`
- `/404`

The product catalog is centralized in `client/src/data/products.ts`. Home, Products, product-related SEO content, and the Contact product selector consume this catalog.

Phase 3 adds a same-project Cloudflare Pages Function at `/api/export-quote`. The Contact form uses a shared Zod request schema, Cloudflare Turnstile verification, and Resend to deliver one internal quotation notification to a server-only configured recipient. `export@borgafoods.com` remains the intended production mailbox and public identity; while domain DNS access is unavailable, the approved personal Gmail address is a temporary internal fallback that must never be browser-delivered or customer-facing. The workflow does not create a database, CRM record, attachment store, or automatic customer acknowledgement.

Phase 3 is completed and production verified. The verified production workflow accepts an enquiry only after server-side validation and Turnstile verification, then sends one internal notification with the buyer's validated address in `Reply-To`. The temporary sender and recipient remain configuration-only until BorgaFoods regains domain DNS control. The approved 24-month enquiry-retention rule and temporary rate-limit deferral are recorded in `BUSINESS_RULES.md` and `EMAIL_CONFIGURATION.md`.

## Current technology stack

- Framework: React 19
- Language: TypeScript and TSX
- Routing: Wouter
- Build system: Vite 7
- Styling: Tailwind CSS 4
- Component system: local shadcn-style components backed by Radix UI
- Icons: Lucide React
- Package manager: pnpm 10.4.1 through Corepack
- Hosting: Cloudflare Pages
- Serverless form runtime: Cloudflare Pages Functions
- Transactional email provider: Resend
- Form spam protection: Cloudflare Turnstile
- Source control: GitHub
- Production branch: `main`
- Cloudflare build command: `pnpm build`
- Cloudflare output directory: `dist/public`
- Cloudflare build system: Version 3
- Latest verified Cloudflare runtime: Node.js 22.16.0 with effective pnpm 10.4.1

There is no CMS, database, CRM, or customer portal in the repository. The quotation Function validates and emails enquiries without storing them. Production activation requirements are recorded in `EMAIL_CONFIGURATION.md`.

## Related documentation

- `BUSINESS_RULES.md`: permanent business and public-content rules
- `WEBSITE_ROADMAP.md`: approved development sequence
- `CHANGE_LOG.md`: completed project changes and commits
- `AI_TASK_PROTOCOL.md`: mandatory working protocol for future AI agents
- `EMAIL_CONFIGURATION.md`: public export email, external setup, and future integration requirements
- `PHASE_4_PLANNING_PROPOSAL.md`: Phase 4 review proposal; not implementation authorization
- `PRODUCT_CAPABILITY_MODEL.md`: frozen Phase 4 product-capability structure and change controls
- `PRODUCT_CLASSIFICATION_REVIEW.md`: internal-only product classifications awaiting business validation
