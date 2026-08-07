# Product Capability Model — Frozen Phase 4 Foundation

Status: **Frozen for Phase 4 planning and implementation.**

Approved: 7 August 2026

## Purpose

This document freezes the structure of the approved BorgaFoods Product Capability Model. It is the planning contract for Phase 4 private-label and customer-tool work. It does not authorize any product, private-label, export, wholesale, or public website claim by itself.

The approved workbook is the operational reference. The website may use only public-safe data derived from its `Product_Capabilities` worksheet and the central product catalog. Restricted source and commercial information must remain internal.

## Frozen product-capability fields

Every product capability record uses these fields:

| Field                     | Purpose                                                                               |
| ------------------------- | ------------------------------------------------------------------------------------- |
| Product ID                | Stable internal identifier.                                                           |
| Product Name              | Approved customer-facing name.                                                        |
| Category                  | Product grouping.                                                                     |
| Supply Type               | Required value: `manufactured` or `partner_sourced`.                                  |
| Public Type Label         | Approved customer-facing supply label.                                                |
| Public Supply Statement   | Approved manufacturer or partner-sourcing statement.                                  |
| Country of Origin         | Approved origin.                                                                      |
| Retail Packaging          | Approved or confirmation-required retail pack sizes.                                  |
| Bulk Packaging            | Approved or confirmation-required bulk pack information.                              |
| Shelf Life                | Verified shelf life, or confirmation-required status.                                 |
| Export Availability       | Availability status.                                                                  |
| Wholesale Availability    | Wholesale status.                                                                     |
| Private Label Eligibility | `approved_for_discovery`, `requires_business_approval`, or `not_eligible_by_default`. |
| Private Label Condition   | Approval condition and constraint.                                                    |
| Public Display Status     | Whether public listing is permitted.                                                  |
| Source Alignment          | Relationship to the approved catalog and source records.                              |

The controlled internal worksheet may retain source packaging, commercial-reference, and audit fields. Those fields are not public website data and must never be sent to the browser.

## Frozen classification and display controls

- The only approved supply types are `manufactured` and `partner_sourced`; there is no default.
- The current BorgaFoods manufactured range remains Gari, Cassava Flour, Fufu Flour, Kokonte, and Banku Borga, subject to the existing business rules and the review gate below.
- Manufactured products use `Manufactured by BorgaFoods` and `Manufactured by BorgaFoods Processing` only where those claims are approved.
- Partner-sourced products use `BorgaFoods Export Selection` and exactly `Selected from trusted Ghanaian production partners`.
- Partner-sourced products never inherit private-label eligibility. Their default is `not_eligible_by_default`.
- Manufactured products are not automatically private-label eligible. Their default state is `requires_business_approval`.
- `approved_for_discovery` authorizes only a manual, enquiry-led private-label discussion. It does not authorize or imply OEM capability, automatic availability, production acceptance, product customization, MOQ, pricing, specifications, packaging, labeling, regulatory support, lead time, or any customer commitment.
- A product marked as requiring validation, confirmation, or approval is not eligible for new public Phase 4 content, structured data, quotation automation, or private-label messaging unless the relevant product-level decision below is explicitly recorded.
- Supplier names, supplier brands, commercial source references, prices, and confidential sourcing details are prohibited from public code, pages, metadata, and customer-facing emails.

## Recorded private-label discovery decision

Approved: 7 August 2026

| Product ID   | Product                 | Supply type    | Private Label Eligibility | Public handling                                      | Condition                                                                                                                                                                                                                                                      |
| ------------ | ----------------------- | -------------- | ------------------------- | ---------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `fufu-borga` | Fufu Flour (Fufu Borga) | `manufactured` | `approved_for_discovery`  | May appear only in the private-label discovery path. | Every enquiry is manually reviewed by the BorgaFoods management/export team. MOQ, packaging, specifications, production feasibility, and regulatory requirements must be confirmed before acceptance. Submission creates no customer or production commitment. |

All other current manufactured products remain `requires_business_approval`. All partner-sourced products remain `not_eligible_by_default`. Red Palm Oil remains excluded. Products without validated manufacturing control remain excluded.

The public website catalog may expose only the narrow, public-safe approval required to derive the approved discovery selector. It must not expose internal conditions, source alignment, supplier details, pricing, capability notes, or review records.

## Change control

Do not add, remove, rename, or reinterpret capability fields, allowed values, supply classifications, or private-label controls without explicit business approval.

Before a new product or claim can be surfaced publicly, confirm its supply type, public display status, product capability, and any required private-label approval. The unresolved items in `PRODUCT_CLASSIFICATION_REVIEW.md` are expressly excluded from public Phase 4 publication until resolved.
