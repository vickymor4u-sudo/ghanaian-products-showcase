# Phase 4B RFQ Field Mapping — Wholesale & Distributor Qualification

Status: **Implemented locally on 7 August 2026. Production deployment and verification remain pending.**

Approved: 7 August 2026

## Authority and scope

This mapping defines how approved Phase 4B buyer-qualification information would extend the existing single BorgaFoods quotation workflow after a separately approved implementation scope. It must be read with [`PRODUCT_CAPABILITY_MODEL.md`](./PRODUCT_CAPABILITY_MODEL.md), [`PRODUCT_CLASSIFICATION_REVIEW.md`](./PRODUCT_CLASSIFICATION_REVIEW.md), [`PUBLIC_PRODUCT_PRESENTATION_RULES.md`](./PUBLIC_PRODUCT_PRESENTATION_RULES.md), [`PHASE_4B_IMPLEMENTATION_BLUEPRINT.md`](./PHASE_4B_IMPLEMENTATION_BLUEPRINT.md), and [`PHASE_4B_QUALIFICATION_RULES.md`](./PHASE_4B_QUALIFICATION_RULES.md).

The existing Contact form, shared quotation schema, and `/api/export-quote` Cloudflare Pages Function remain the only enquiry system. This planning reference does not authorize a CRM, database, new endpoint, automatic quotation, customer acknowledgement, price/MOQ field, attachment, or supplier disclosure.

## 1. Customer-visible form fields

Customer-visible fields are limited to public-safe buyer inputs and approved catalogue choices. They are not eligibility, appointment, availability, pricing, or supply commitments.

| Form label                      | Submission key           | Applicability                      | Required after Phase 4B approval | Public control and purpose                                                                                                                                     |
| ------------------------------- | ------------------------ | ---------------------------------- | -------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Enquiry type                    | `inquiryType`            | Existing form                      | Yes                              | Existing controlled intent. `wholesale` and `distribution` remain distinct; `general` and `export_quote` remain available for their current use.               |
| Buyer category                  | `buyerCategory`          | Wholesale and distribution         | Yes                              | Controlled: `importer`, `distributor`, `wholesaler`, `retail`, `food_service`, or `other`. Describes stated context only.                                      |
| Company name                    | `companyName`            | All RFQs                           | Yes                              | Existing bounded text identifying the business.                                                                                                                |
| Contact person                  | `contactPerson`          | All RFQs                           | Yes                              | Existing bounded text identifying the buyer contact.                                                                                                           |
| Company country                 | `country`                | All RFQs                           | Yes                              | Existing bounded text for the stated business location.                                                                                                        |
| Email                           | `email`                  | All RFQs                           | Yes                              | Existing validated buyer email; used as the email `Reply-To`.                                                                                                  |
| Phone / WhatsApp                | `phoneWhatsApp`          | All RFQs                           | No                               | Existing optional bounded text for buyer-provided follow-up.                                                                                                   |
| Product selection               | `productSelection`       | All RFQs                           | Yes                              | Derived solely from the approved `rfqEligibleProducts` selector, with an existing approved general option where applicable.                                    |
| Packaging preference            | `packagingPreference`    | All RFQs                           | Yes                              | Existing controlled preference: retail, bulk, mixed, or to be discussed.                                                                                       |
| Estimated quantity              | `estimatedQuantity`      | All RFQs                           | Yes                              | Existing bounded text for manual-review context; never a price, MOQ, or availability acceptance.                                                               |
| Destination country             | `destinationCountry`     | All RFQs                           | Yes                              | Existing bounded text for stated market/destination context.                                                                                                   |
| Destination port                | `destinationPort`        | All RFQs                           | No                               | Existing optional bounded text; informational only, not shipment planning or commitment.                                                                       |
| Intended sales channel          | `intendedSalesChannel`   | Wholesale and distribution         | No                               | Controlled value with optional short clarification. It describes a stated channel and cannot establish a listing, account, appointment, or rights.             |
| Target market                   | `targetMarket`           | Distribution; useful for wholesale | No                               | Bounded text for buyer-declared market context; not a territory or exclusivity request.                                                                        |
| Expected order frequency        | `expectedOrderFrequency` | Wholesale and distribution         | No                               | Controlled indication or bounded text; indicative only.                                                                                                        |
| Expected timing                 | `requirementsTimeline`   | Wholesale and distribution         | No                               | Controlled indication of the buyer's stated timing. It is not a lead-time or shipment promise.                                                                 |
| Product-mix context             | —                        | Deferred                           | —                                | The existing approved product selector remains the sole product-selection control. A separate product-mix field is not part of this implementation.            |
| Message                         | `message`                | All RFQs                           | No                               | Existing optional bounded text. The form must continue to ask customers not to send sensitive, financial, supplier, or confidential information.               |
| Privacy consent acknowledgement | `privacyConsent`         | All RFQs                           | Yes                              | Explicit acknowledgement of the approved privacy notice and up-to-24-month retention statement. It records consent to enquiry handling, not marketing consent. |
| Bot-check token                 | `turnstileToken`         | All RFQs                           | Yes                              | Turnstile control required for submission. It is a technical control, not a customer-facing business field.                                                    |

`buyerCategory`, `intendedSalesChannel`, `targetMarket`, `expectedOrderFrequency`, `requirementsTimeline`, and `privacyConsent` are implemented with the labels, values, required states, limits, and internal-email treatment recorded here. `productMixContext` remains deferred; it must not be introduced without a separately approved field mapping and server validation.

## 2. Backend submission fields

The browser may submit only the approved form fields and the existing technical controls below. The server must validate the entire payload independently; client-side controls are usability aids only.

| Key                           | Source                   | Server handling                                                                                                               | Email inclusion                                               |
| ----------------------------- | ------------------------ | ----------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| `submissionId`                | Client-generated UUID    | Validate UUID and enforce the existing idempotency control.                                                                   | Internal request reference only.                              |
| `sourcePath`                  | Fixed client route value | Accept only the approved Contact route value.                                                                                 | May appear as internal routing context.                       |
| `website`                     | Honeypot                 | Require empty value; reject without delivery if populated.                                                                    | Never include.                                                |
| `turnstileToken`              | Turnstile widget         | Verify server-side with the Turnstile secret; reject on failure.                                                              | Never include.                                                |
| Existing base enquiry fields  | Customer form            | Validate with the shared schema and current size/origin/request controls.                                                     | Include approved buyer information only.                      |
| Proposed qualification fields | Customer form            | Validate as explicit controlled enums or bounded text only after approval. Reject unknown or client-supplied internal values. | Include approved values only.                                 |
| `privacyConsent`              | Customer form            | Require the explicit approved value after implementation approval.                                                            | Include acknowledgement status, not additional customer data. |

The backend must derive the displayed product name and public supply label from the central, server-trusted product selector. It must not trust client-supplied manufacturer, brand, supplier, product capability, classification, private-label, price, availability, or internal-review fields.

## 3. Internal notification fields

One internal Resend notification remains the sole Phase 4B outcome. It uses the public BorgaFoods export identity and sets the buyer email as `Reply-To`; the operational destination remains server-only configuration.

| Notification section           | Allowed content                                                                                                                                                 | Boundary                                                                                                       |
| ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| Request reference              | Request ID, submission ID, received time, enquiry type, source path.                                                                                            | Operational context only; no customer-facing response is generated.                                            |
| Buyer contact                  | Company name, contact person, company country, email, optional phone/WhatsApp.                                                                                  | Buyer-provided data for manual handling only.                                                                  |
| Qualification context          | Buyer category and approved optional channel, market, frequency, product-mix context, if provided.                                                              | Descriptive only; no automated lead decision or quotation.                                                     |
| Product and fulfilment context | Server-derived public product name, public supply label/statement where approved, packaging preference, estimated quantity, destination country, optional port. | Do not infer availability, private-label eligibility, price, MOQ, capacity, lead time, or shipping commitment. |
| Buyer message and consent      | Sanitized message and privacy-consent acknowledgement.                                                                                                          | Do not include honeypot, Turnstile token, raw request body, or secret values.                                  |
| Manual review cue              | Optional staff-only “review context” based on complete/missing data.                                                                                            | Must not be a customer-visible score, stored CRM field, or automated approval/rejection.                       |

No automatic acknowledgement, quote, price indication, lead score, customer account, database record, or CRM synchronization is permitted.

## 4. Fields and information never exposed publicly

The following must never be rendered in browser-delivered code, forms, page text, metadata, structured data, public emails, client logs, option values, or publicly reachable endpoints:

- supplier names, supplier brands, factories, contacts, documents, source records, or sourcing terms;
- partner manufacturer or brand fields for a `partner_sourced` product;
- private-label eligibility, conditions, internal approval notes, source-alignment details, audit status, or capability-review fields;
- pricing, price ranges, currency, payment terms, MOQ, capacity, lead time, stock allocation, commercial terms, shipment commitments, or quotation-calculation fields;
- internal lead level, manual review notes, operational routing, request deduplication data, rate-limiting state, security logs, secrets, service configuration, or the temporary Gmail recipient;
- financial, bank, tax, credit, identity, customer-list, contract, attachment, or sensitive personal-data fields; and
- Red Palm Oil in every public or submission-facing representation until PCR-002 is resolved.

Fufu Flour may remain in its existing catalogue and RFQ presentation only. PCR-001 prohibits new Phase 4B Fufu capability, classification, packaging, product-mix, private-label, metadata, or qualification messaging until recorded business validation resolves it.

## 5. Validation requirements

### Schema and product controls

- Keep one shared client/server schema; every field must have an explicit type, required state, maximum length, and allowed value set where controlled.
- Enforce `inquiryType` and `buyerCategory` as server-side enums. Do not use free-text classification values.
- Restrict product selection to the central server-trusted `rfqEligibleProducts` allowlist. Reject unknown product IDs and any review-gated product.
- Keep Fufu Flour exactly within its existing RFQ behavior; do not add it to Phase 4B qualification-specific options or messages.
- Exclude Red Palm Oil from browser options, submitted values, server allowlists, internal email output, and validation fixtures.
- If a selectable partner-sourced product is approved later, assert that no public brand or manufacturer data accompanies it. Use only `BorgaFoods Export Selection` and `Selected from trusted Ghanaian production partners`.

### Input, privacy, and delivery controls

- Preserve email syntax validation, whitespace normalization, bounded text, message limits, safe HTML/email escaping, and rejection of unexpected fields.
- Preserve the existing origin check, body-size limit, UUID/idempotency rule, honeypot, and server-side Turnstile verification.
- Require the approved privacy acknowledgement before delivery once it is formally implemented; preserve the approved privacy notice and 24-month retention statement.
- Reject failed validation before email delivery. Failed technical/security checks must not produce an external or customer acknowledgement.
- Set `Reply-To` only to the server-validated submitted buyer email. Never interpolate it into recipient, sender, subject, or header-control values.

## 6. Relationship to the existing RFQ workflow

Phase 4B is an additive, controlled qualification layer on the existing workflow—not a new application process.

```text
Existing Contact entry point / wholesale or distribution CTA
        → existing RFQ form and intent selector
        → approved buyer-category and optional qualification context
        → shared schema and server-trusted product selector
        → origin, size, honeypot, idempotency, and Turnstile checks
        → one internal Resend notification (buyer email as Reply-To)
        → manual operational review and response
```

The relationship is intentionally one-way: public form data may provide manual-review context, but no internal classification or decision returns to the customer automatically. The notification recipient, manual follow-up, and future mailbox switch remain configuration/operational concerns, not public form data.

## 7. Implementation and remaining operational gate

The implemented scope uses controlled buyer category, sales channel, frequency, timing, and privacy acknowledgement fields. It adds wholesale and distributor CTA preselection, shared client/server validation, and approved internal-email formatting.

Before deployment, verify the existing Resend and Turnstile configuration in the target environment and retain server-side test coverage for validation, product allowlists, review gates, confidentiality, email `Reply-To`, and the absence of acknowledgements/quotations. The manual operational owner and follow-up procedure remain a business operation, not a website feature.

The frozen capability model, supplier confidentiality requirements, and PCR-001/PCR-002 gates take precedence over every field or workflow decision.
