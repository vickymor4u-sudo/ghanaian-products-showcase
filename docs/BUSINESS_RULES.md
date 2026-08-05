# BorgaFoods Business Rules

Last updated: 6 August 2026

## Purpose

This file records approved business decisions that must be preserved across future website work. These rules take precedence over assumptions, generated content, old planning notes, and generic industry conventions.

## Manufactured product rules

The approved BorgaFoods-manufactured products are:

| Product | Supply type | Brand | Manufacturer | Current category |
|---|---|---|---|---|
| Gari | `manufactured` | BorgaFoods | BorgaFoods Processing | Cassava Products |
| Cassava Flour | `manufactured` | BorgaFoods | BorgaFoods Processing | Cassava Products |
| Fufu Flour | `manufactured` | BorgaFoods | BorgaFoods Processing | Traditional Flour Blends |
| Kokonte | `manufactured` | BorgaFoods | BorgaFoods Processing | Cassava Products |
| Banku Borga | `manufactured` | BorgaFoods | BorgaFoods Processing | Traditional Ghanaian Staples |

Rules:

- Each product must explicitly use `supplyType: "manufactured"`.
- The public product brand must be `BorgaFoods`.
- The public manufacturer must be `BorgaFoods Processing`.
- Do not change a product's supply type, brand, or manufacturer without explicit business approval.
- Do not add manufacturing, certification, capacity, formulation, MOQ, shelf-life, or compliance claims unless verified.

## Partner-sourced product rules

Products selected from third-party Ghanaian producers must use:

```text
supplyType: partner_sourced
```

Rules:

- Never default a new product to `manufactured`.
- Every new product must explicitly declare `manufactured` or `partner_sourced`.
- Partner-sourced products must not be described as manufactured, processed, or produced by BorgaFoods or BorgaFoods Processing.
- Partner-sourced products must use the approved public wording below.
- Partner-sourced products must not automatically inherit private-label, OEM, certification, MOQ, or export claims from manufactured products.
- Availability and capabilities must be confirmed for each partner-sourced product.

Approved public wording:

> Selected from trusted Ghanaian production partners

## Supplier confidentiality rules

The public website must not display, expose, or embed:

- supplier names;
- supplier brands;
- supplier company descriptions;
- supplier contact information;
- supplier addresses or locations more specific than an approved product origin;
- confidential agreements, pricing, capacity, or operational details;
- image metadata, filenames, structured data, or source-code fields that reveal supplier identity.

The public client-side product catalog must not store supplier names, supplier brands, or supplier information. Because client-side source is downloadable by visitors, confidential information must never be placed in browser-delivered code, comments, JSON, image metadata, or environment variables prefixed with `VITE_`.

## Branding rules

- The approved public food brand is `BorgaFoods`.
- The approved public manufacturer name is `BorgaFoods Processing`.
- `Supply & Demand Worldwide Ltd` may be used for the legal/export company where appropriate and verified.
- Do not change the existing site identity, navigation branding, logo treatment, color system, or corporate presentation without explicit approval.
- Do not recreate or redesign the website when a change can be integrated into the existing React/Vite architecture.
- Product names must follow the approved catalog. Current names are Gari, Cassava Flour, Fufu Flour, Kokonte, and Banku Borga.

## Public website wording rules

- Clearly distinguish BorgaFoods-manufactured products from partner-sourced products.
- Use “Manufactured” only for approved products made by BorgaFoods Processing.
- Use exactly “Selected from trusted Ghanaian production partners” for partner-sourced products unless a new phrase is approved.
- Do not publish supplier identity or wording that allows a supplier to be inferred.
- Do not present planned capabilities as operational capabilities.
- Use factual B2B language for importers, wholesalers, distributors, retail buyers, and food-service buyers.
- Avoid unsupported superlatives and absolute guarantees.
- Do not publish prices, fixed MOQs, certifications, lead times, trade terms, territories, or exclusivity promises without current approval.
- Product structured data must only include `brand` and `manufacturer` for manufactured products. It must not expose supplier information for partner-sourced products.
- Preserve existing design and routes unless the approved task specifically changes them.

## Data-model enforcement

The central product model in `client/src/data/products.ts` is a discriminated union:

- manufactured records require public `brand` and `manufacturer` fields;
- partner-sourced records forbid public `brand` and `manufacturer` fields;
- supply type is mandatory and has no default.

Future changes must preserve these constraints.
