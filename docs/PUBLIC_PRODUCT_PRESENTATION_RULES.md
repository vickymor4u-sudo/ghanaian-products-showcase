# Public Product Presentation Rules — Phase 4 Approval Reference

Status: **Approved reference for Phase 4 public website changes.**

Approved: 7 August 2026

## Authority and scope

These rules govern every future public product card, catalogue listing, export page, wholesale page, enquiry selector, SEO title/description, structured-data record, image, metadata field, and customer-facing email generated during Phase 4.

They implement, but do not replace, the frozen [`PRODUCT_CAPABILITY_MODEL.md`](./PRODUCT_CAPABILITY_MODEL.md), permanent [`BUSINESS_RULES.md`](./BUSINESS_RULES.md), and review gate in [`PRODUCT_CLASSIFICATION_REVIEW.md`](./PRODUCT_CLASSIFICATION_REVIEW.md). Where a record lacks an approved public-safe value, it must not be shown or inferred.

## 1. Manufactured product display rules

Use manufactured presentation only when the product record explicitly has `supplyType: manufactured`, is permitted for public display, and has no applicable unresolved review gate.

Required presentation:

- Product-type label: `Manufactured by BorgaFoods`
- Supporting supply statement: `Manufactured by BorgaFoods Processing`
- Public brand: `BorgaFoods`
- Public manufacturer: `BorgaFoods Processing`

Permitted supporting information is limited to the product’s approved name, category, description, origin, packaging, shelf life, wholesale/export availability, image, and other public-safe capability fields.

Do not add or imply private-label/OEM capability, custom packaging, custom formulations, samples, capacity, certifications, market compliance, stock availability, MOQ, price, lead time, exclusivity, or shipment commitments unless the exact claim is separately approved for that product.

## 2. Partner-sourced product display rules

Use partner-sourced presentation only when the product record explicitly has `supplyType: partner_sourced`, is permitted for public display, and has product-level public-display approval.

Required presentation:

- Product-type label: `BorgaFoods Export Selection`
- Supporting supply statement, exactly: `Selected from trusted Ghanaian production partners`

Partner-sourced product content must:

- remain visibly distinct from BorgaFoods-manufactured products;
- use confirmation-led language for product, packaging, export, and wholesale availability;
- omit public brand and manufacturer fields; and
- state or imply no private-label/OEM eligibility unless an explicit, product-level approval is recorded.

Never describe a partner-sourced item as manufactured, processed, produced, owned, or branded by BorgaFoods or BorgaFoods Processing.

## 3. Pending validation handling

A product marked as requiring validation, confirmation, approval, or classification review is excluded from new Phase 4 public content until the relevant decision is recorded in the central catalog and frozen capability model.

| Review item | Mandatory handling |
| --- | --- |
| Fufu Flour (PCR-001) | Do not create new Phase 4 packaging, export, classification, structured-data, enquiry-selection, or private-label messaging from the unresolved source record. |
| Red Palm Oil (PCR-002) | Keep internal only. Do not list publicly, include in schema or buyer selectors, describe as manufactured, or show private-label eligibility. |

No unresolved product may be introduced through a category page, export collection, site search, card, image gallery, product metadata, sitemap entry, quotation option, email template, or AI-generated response.

## 4. Private-label/OEM wording restrictions

Private-label/OEM is an enquiry-led capability discussion, not a public promise.

- A manufactured product with `requires_business_approval` is not automatically eligible and must not be presented as eligible.
- A partner-sourced product with `not_eligible_by_default` must be excluded from private-label/OEM content and selection lists.
- Only an explicitly approved manufactured Product ID may appear in a private-label enquiry path.
- Approved copy must say that product, packaging, artwork, labeling, market requirements, volumes, timing, documentation, and commercial terms are reviewed per enquiry.

Do not claim or imply that BorgaFoods can provide private label, OEM, customized packaging, artwork support, labeling support, samples, regulatory support, production capacity, pricing, MOQ, lead time, or launch timing without an approved product-level capability and approved wording.

## 5. Supplier confidentiality rules

The following information is prohibited from public pages, client-side code, APIs delivered to the browser, structured data, SEO metadata, product images, filenames, alt text, captions, downloadable materials, quotation options, customer-facing emails, and AI prompts or responses:

- supplier names, brands, company descriptions, contacts, addresses, or identifiable locations;
- supplier images, packaging imagery, labels, logos, metadata, filenames, or URLs that identify a supplier;
- source-record references, commercial terms, pricing, carton/pallet data, capacity, agreements, sourcing history, or internal audit notes; and
- any wording that allows a supplier to be inferred.

Public implementation must use a narrow public projection of the capability model. Internal source, commercial, and audit data must never be imported into the central website catalog or exposed through a `VITE_` variable, client-side comment, static asset, source map, or customer notification.

## 6. Export catalogue visibility rules

Every proposed public export-catalogue product must pass all of these checks before it is added to website data, public pages, schema, sitemap references, or buyer-facing enquiry selections:

1. It has an explicit approved `supplyType`.
2. Its `Public Display Status` permits publication.
3. Its approved public type label and supply statement match its supply type.
4. Its public-safe name, category, origin, packaging, availability, and image are approved or use an approved confirmation-required state.
5. It has no unresolved classification review or validation requirement.
6. It contains no supplier-confidential data or supplier-identifying image/metadata.
7. Its export/wholesale handling and quotation eligibility are approved.

Products that fail any check remain internal only. They may not be shown as a product, category representative, export selection, quotation choice, structured-data item, search result, or marketing example.

## 7. Implementation safeguards

Before a public product change is released:

- validate the typed product record and explicit supply type;
- confirm public display status and applicable approval evidence;
- verify centralized supply labels and statements rather than duplicating copy;
- scan source, build output, images, metadata, schema, and email templates for supplier-confidential information;
- verify product selectors and server-side RFQ allowlists exclude internal-only and review-gated products; and
- test relevant routes, mobile layouts, SEO/schema output, and enquiry success/failure paths.

When any required approval is missing, the correct outcome is to keep the product or claim internal—not to infer a classification or publish provisional wording.
