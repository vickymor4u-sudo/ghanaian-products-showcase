# Product Capability Model — Frozen Phase 4 Foundation

Status: **Frozen for Phase 4 planning and implementation.**

Approved: 7 August 2026

## Purpose

This document freezes the structure of the approved BorgaFoods Product Capability Model. It is the planning contract for Phase 4 private-label and customer-tool work. It does not authorize any product, private-label, export, wholesale, or public website claim by itself.

The approved workbook is the operational reference. The website may use only public-safe data derived from its `Product_Capabilities` worksheet and the central product catalog. Restricted source and commercial information must remain internal.

## Frozen product-capability fields

Every product capability record uses these fields:

| Field | Purpose |
| --- | --- |
| Product ID | Stable internal identifier. |
| Product Name | Approved customer-facing name. |
| Category | Product grouping. |
| Supply Type | Required value: `manufactured` or `partner_sourced`. |
| Public Type Label | Approved customer-facing supply label. |
| Public Supply Statement | Approved manufacturer or partner-sourcing statement. |
| Country of Origin | Approved origin. |
| Retail Packaging | Approved or confirmation-required retail pack sizes. |
| Bulk Packaging | Approved or confirmation-required bulk pack information. |
| Shelf Life | Verified shelf life, or confirmation-required status. |
| Export Availability | Availability status. |
| Wholesale Availability | Wholesale status. |
| Private Label Eligibility | `requires_business_approval` or `not_eligible_by_default`. |
| Private Label Condition | Approval condition and constraint. |
| Public Display Status | Whether public listing is permitted. |
| Source Alignment | Relationship to the approved catalog and source records. |

The controlled internal worksheet may retain source packaging, commercial-reference, and audit fields. Those fields are not public website data and must never be sent to the browser.

## Frozen classification and display controls

- The only approved supply types are `manufactured` and `partner_sourced`; there is no default.
- The current BorgaFoods manufactured range remains Gari, Cassava Flour, Fufu Flour, Kokonte, and Banku Borga, subject to the existing business rules and the review gate below.
- Manufactured products use `Manufactured by BorgaFoods` and `Manufactured by BorgaFoods Processing` only where those claims are approved.
- Partner-sourced products use `BorgaFoods Export Selection` and exactly `Selected from trusted Ghanaian production partners`.
- Partner-sourced products never inherit private-label eligibility. Their default is `not_eligible_by_default`.
- Manufactured products are not automatically private-label eligible. Their required state is `requires_business_approval`.
- A product marked as requiring validation, confirmation, or approval is not eligible for new public Phase 4 content, structured data, quotation automation, or private-label messaging.
- Supplier names, supplier brands, commercial source references, prices, and confidential sourcing details are prohibited from public code, pages, metadata, and customer-facing emails.

## Change control

Do not add, remove, rename, or reinterpret capability fields, allowed values, supply classifications, or private-label controls without explicit business approval.

Before a new product or claim can be surfaced publicly, confirm its supply type, public display status, product capability, and any required private-label approval. The unresolved items in `PRODUCT_CLASSIFICATION_REVIEW.md` are expressly excluded from public Phase 4 publication until resolved.
