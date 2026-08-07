# Phase 4B Qualification Rules — Wholesale & Distributor Enquiries

Status: **Implemented locally on 7 August 2026. Production deployment and verification remain pending.**

Approved: 7 August 2026

## Authority and scope

These rules define the Phase 4B buyer-qualification model for the existing BorgaFoods quotation workflow. They supplement the frozen [`PRODUCT_CAPABILITY_MODEL.md`](./PRODUCT_CAPABILITY_MODEL.md), [`PRODUCT_CLASSIFICATION_REVIEW.md`](./PRODUCT_CLASSIFICATION_REVIEW.md), and [`PHASE_4B_IMPLEMENTATION_BLUEPRINT.md`](./PHASE_4B_IMPLEMENTATION_BLUEPRINT.md).

They do not authorize a second enquiry system, CRM, database, automatic quotation, pricing commitment, supplier disclosure, product expansion, private-label claim, distributor appointment, exclusivity, or territory right.

## 1. Buyer categories

The public form may use one controlled buyer-category selection. The category describes the buyer's stated business context; it is not a verification, approval, account status, or commitment by BorgaFoods.

| Value          | Buyer category | Qualification purpose                                                      | Must not imply                                                                      |
| -------------- | -------------- | -------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| `importer`     | Importer       | Understand an intended import and destination-market context.              | Import authorization, regulatory approval, shipping commitment, or market approval. |
| `distributor`  | Distributor    | Understand a stated distribution discussion and channels served.           | Appointment, exclusivity, territory rights, allocation, or priority access.         |
| `wholesaler`   | Wholesaler     | Understand a bulk or resale supply enquiry.                                | Stock commitment, trading account approval, price, MOQ, or payment terms.           |
| `retail`       | Retail         | Understand retail or supermarket purchasing context.                       | Listing approval, retail placement, packaging approval, or commercial terms.        |
| `food_service` | Food service   | Understand restaurant, catering, or food-service supply context.           | Product suitability, food-safety approval, volume commitment, or supply guarantee.  |
| `other`        | Other          | Allow a buyer to describe a legitimate business context not covered above. | Automatic eligibility, product availability, or a special relationship.             |

The existing quotation `inquiryType` remains a separate operational intent:

- `wholesale` for a supply enquiry;
- `distribution` for a distribution discussion;
- `export_quote` and `general` retain their existing use.

A buyer category must not override, imply, or modify product supply type, export availability, wholesale availability, private-label eligibility, or any review gate.

## 2. Required enquiry fields

The Phase 4B qualification path should require the following fields after implementation is approved:

| Field                | Rule                                                                | Reason for collection                                    |
| -------------------- | ------------------------------------------------------------------- | -------------------------------------------------------- |
| Enquiry intent       | Controlled existing value: `wholesale` or `distribution`.           | Route the enquiry without creating another system.       |
| Buyer category       | One controlled value from the approved categories.                  | Provide business context for manual review.              |
| Company name         | Bounded text.                                                       | Identify the business making the enquiry.                |
| Contact person       | Bounded text.                                                       | Identify the operational contact.                        |
| Company country      | Bounded text.                                                       | Understand the buyer's stated business context.          |
| Email                | Validated email address.                                            | Enable a manual reply using `Reply-To`.                  |
| Product selection    | Approved public Product ID, or an existing approved general option. | Keep the enquiry tied to public-safe product data.       |
| Packaging preference | Existing controlled value.                                          | Understand retail, bulk, mixed, or discussion-led needs. |
| Estimated quantity   | Bounded text.                                                       | Frame the scale for a manual review.                     |
| Destination country  | Bounded text.                                                       | Understand the stated target market.                     |

Required means required for a valid Phase 4B form submission. It does not mean BorgaFoods agrees to supply, quote, appoint, or approve the buyer.

## 3. Optional enquiry fields

| Field                    | Rule                                                       | Boundary                                                                                        |
| ------------------------ | ---------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| Phone/WhatsApp           | Optional bounded text.                                     | Used only for buyer-provided follow-up contact.                                                 |
| Destination port         | Optional bounded text.                                     | Informational only; not a shipping commitment.                                                  |
| Intended sales channel   | Controlled option with an optional short description.      | Do not request customer lists or retailer contracts.                                            |
| Target market            | Optional for wholesale; useful for distribution.           | Not a territory-rights, exclusivity, or appointment request.                                    |
| Expected order frequency | Controlled indication or bounded text.                     | Indicative only; not a forecast acceptance or supply obligation.                                |
| Product-mix context      | Bounded text or approved public product selection pattern. | Must not introduce internal, partner-confidential, or review-gated products.                    |
| Message                  | Optional bounded text.                                     | Tell buyers not to submit sensitive personal, financial, supplier, or confidential information. |

Do not collect financial statements, tax identifiers, bank details, customer lists, contracts, credit information, identity documents, uploads, attachments, supplier details, or sensitive personal data.

## 4. Lead qualification levels

Lead qualification is an internal manual-review aid. It is not a customer-facing score, an automated decision, a database field in the initial release, or an eligibility determination.

| Level | Internal label            | Manual-review condition                                                                                     | Follow-up action                                                                 |
| ----- | ------------------------- | ----------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| L1    | Complete business enquiry | Required contact, approved product/general selection, destination, quantity, and buyer context are present. | Review product, availability, market, and commercial requirements manually.      |
| L2    | Context needed            | Submission is valid but lacks enough optional context for a useful wholesale/distributor discussion.        | Ask focused follow-up questions by reply; do not promise a quote or appointment. |
| L3    | General enquiry           | Buyer category is `other`, or the enquiry does not clearly indicate a wholesale/distributor use case.       | Respond manually as appropriate or direct the buyer to clarify needs.            |

Invalid, malicious, duplicate, cross-origin, oversized, honeypot-triggered, or failed-Turnstile submissions are technical rejections, not lead levels. They must continue to receive no email delivery and no customer acknowledgement.

## 5. Public versus internal boundaries

| Public form and customer-facing communication                                                                                                                                                              | Internal manual review only                                                                                | Prohibited everywhere public or browser-delivered                                                                                                                                                                                                                       |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Buyer category, approved product choices, packaging preference, estimated quantity, destination, declared channel/market context, approved supply labels/statements, and confirmation-led enquiry wording. | Manual L1/L2/L3 label, internal operational notes held outside the website, and manual response decisions. | Supplier names/brands/details, source records, pricing, MOQs, capacity, sourcing terms, partner contacts, internal product audit status, private-label eligibility notes, temporary Gmail recipient, financial/credit data, customer lists, and confidential documents. |

The public website must not claim that a buyer is qualified, accepted, approved, appointed, exclusive, prioritized, price-eligible, or supply-ready. It must not expose any internal lead label.

## 6. Integration with the existing RFQ workflow

Phase 4B must extend the current shared schema, Contact form, and `/api/export-quote` Cloudflare Pages Function as one system.

```text
Wholesale or distribution CTA
        → existing Contact form with controlled intent and buyer category
        → shared client/server schema validation
        → rfqEligibleProducts allowlist
        → Turnstile, honeypot, origin, size, and idempotency controls
        → one internal Resend notification with buyer Reply-To
        → manual L1/L2/L3 review in the operational mailbox
```

Implementation requirements after approval:

- retain the existing public `export@borgafoods.com` identity and server-only operational recipient;
- use controlled enums and bounded text for any new qualification field;
- include only approved public product details and buyer-provided qualification fields in the internal email;
- retain one internal notification, no automatic customer acknowledgement, no database/CRM record, no file storage, and no automatic quotation; and
- preserve the approved consent notice, 24-month retention rule, and direct email fallback.

## 7. Product and review-gate rules

- Product options must remain derived from the central `rfqEligibleProducts` selector.
- Fufu Flour remains selectable only in its existing RFQ behavior; no new Phase 4B capability, classification, packaging, or private-label messaging may be added until PCR-001 is resolved.
- Red Palm Oil remains absent from all public content, quotation options, schema values, email content, and server allowlists until PCR-002 is resolved.
- A partner-sourced product may be selectable only after public-display and quotation approval. It must use `BorgaFoods Export Selection` and exactly `Selected from trusted Ghanaian production partners` without public brand or manufacturer fields.
- Product selection is informational. It cannot establish availability, price, MOQ, lead time, territory rights, exclusivity, distributor status, private-label eligibility, or a supply commitment.

## 8. Implemented scope and release gate

The implementation uses the buyer-category label and controlled values above for both `wholesale` and `distribution`. It retains the stated required base fields; sales channel, target market, order frequency, and timing are optional, bounded qualification context. The existing Contact route receives the selected `wholesale` or `distribution` intent from the Wholesale page, and the internal notification includes only validated, permitted fields.

Before deployment, verify the existing production Resend/Turnstile configuration and run the product-gate, supplier-confidentiality, server-validation, error-preservation, and no-acknowledgement/no-quotation tests. The operational mailbox owner and manual follow-up process remain outside the website and require no public disclosure.

Phase 4C remains out of scope.
