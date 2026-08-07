# Phase 4B Implementation Blueprint — Wholesale & Distributor Qualification

Status: **Implemented locally on 7 August 2026. Production deployment and verification remain pending.**

Prepared: 7 August 2026

## Governing controls

Phase 4B must use the frozen [`PRODUCT_CAPABILITY_MODEL.md`](./PRODUCT_CAPABILITY_MODEL.md), the public presentation rules in [`PUBLIC_PRODUCT_PRESENTATION_RULES.md`](./PUBLIC_PRODUCT_PRESENTATION_RULES.md), and the release gate in [`PRODUCT_CLASSIFICATION_REVIEW.md`](./PRODUCT_CLASSIFICATION_REVIEW.md).

The existing Phase 3 quotation workflow remains the single customer enquiry system. Phase 4B must not introduce a separate distributor application, account, database, CRM, portal, pricing tool, customer acknowledgement, or file-upload process.

Fufu Flour remains in its existing public and RFQ presentation only; no new Phase 4B capability, classification, packaging, or private-label messaging may be added until PCR-001 is resolved. Red Palm Oil remains excluded from every public page, selection list, schema, and enquiry workflow until PCR-002 is resolved.

## 1. Buyer qualification objectives

Phase 4B should help BorgaFoods understand the context of a legitimate wholesale or distribution enquiry before a manual response, without treating the form as an application, approval, allocation, credit review, supply commitment, or exclusivity discussion.

The qualification outcome should give the internal team enough context to:

- identify whether the buyer is seeking wholesale supply or a distributor relationship discussion;
- understand the buyer's intended market, channel, product interest, packaging preference, estimated quantity, and destination;
- assess whether the enquiry relates to an approved public product and whether its availability needs confirmation; and
- prepare a manual, requirements-led follow-up through the existing quotation mailbox.

It must not score buyers, automate acceptance or rejection, promise commercial terms, reveal supplier information, or infer private-label eligibility.

## 2. Wholesale and distributor distinction

| Enquiry type | Purpose of qualification                                                                                          | Information useful for manual review                                                                                                      | Not implied                                                                                                    |
| ------------ | ----------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| Wholesale    | A buyer seeks product supply for retail, food-service, wholesale, or other declared business use.                 | Intended sales channel, approved products, packaging preference, estimated quantity, destination, and any relevant handling requirements. | Stock allocation, price, MOQ, payment terms, delivery timing, or an approved trading account.                  |
| Distribution | A buyer wants to discuss representing or distributing approved BorgaFoods products in a stated market or channel. | Target market, channels served, product interests, estimated purchasing needs, and distribution context.                                  | Territory rights, exclusivity, appointment, supplier disclosure, guaranteed availability, or commercial terms. |

The existing controlled `inquiryType` values—`wholesale` and `distribution`—are sufficient for the first release. They should remain distinct in the shared schema and internal notification, but both follow the same security, privacy, and manual-review process.

## 3. Approved enquiry information

### Existing approved base fields

These fields are already approved and validated by the shared quotation schema:

- enquiry type;
- company name;
- contact person;
- company country;
- email;
- phone/WhatsApp (optional);
- product selection;
- packaging preference;
- estimated quantity;
- destination country;
- destination port (optional); and
- message.

The existing consent notice, no-sensitive-information instruction, 24-month retention limit, Turnstile, honeypot, server validation, origin checks, body limits, idempotency, one internal notification, and buyer `Reply-To` behavior remain mandatory.

### Implemented qualification fields

The following limited fields are implemented with controlled values or bounded text. They do not alter product eligibility, buyer status, commercial terms, or supplier confidentiality controls:

| Field                    | Applies to                           | Intended use                                                           | Public/private boundary                                                                   |
| ------------------------ | ------------------------------------ | ---------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| Buyer type               | Wholesale and distribution           | Distinguish buyer context.                                             | Public form input; only the selected value appears in the internal notification.          |
| Intended sales channel   | Wholesale and distribution           | Identify retail, food-service, wholesale, or another declared channel. | Use controlled options plus an optional short description; do not request customer lists. |
| Target market            | Distribution; optional for wholesale | Understand the stated market context.                                  | Not an exclusivity, territory, or appointment request.                                    |
| Expected order frequency | Wholesale and distribution           | Help frame follow-up context.                                          | Indicative only; not a commitment or forecast approval.                                   |
| Expected timing          | Wholesale and distribution           | Capture the buyer's stated timing context.                             | Indicative only; not a production, lead-time, or shipping commitment.                     |

The existing approved product selector remains the only product-selection control. A separate product-mix field is deferred.

No financial statements, tax identifiers, bank details, customer lists, supplier details, contracts, credit information, personal documents, sensitive personal data, uploads, or attachments belong in Phase 4B.

## 4. Product eligibility rules

- Product options must come only from the central `rfqEligibleProducts` selector.
- An item may be selected only when it has an explicit supply type, current public status, approved quotation eligibility, and no applicable review gate.
- Fufu Flour stays selectable only through its existing RFQ behavior. Phase 4B must not add new Fufu-specific qualification or capability messaging.
- Red Palm Oil is prohibited from product lists, default selections, messages, schema, email content, and server-side allowlists.
- A partner-sourced product may enter a future wholesale/distributor option only after product-level public-display and quotation approval. Its supply label and statement must remain distinct, and it must never expose a public brand or manufacturer.
- Product selection never establishes availability, pricing, territory rights, exclusivity, private-label eligibility, or supply commitment.

## 5. RFQ workflow impact

Phase 4B should extend—not replace—the existing `/api/export-quote` Function and shared Zod schema.

```text
Contact / Wholesale CTA
        → controlled enquiry intent: wholesale or distribution
        → shared client and server validation
        → approved public-product allowlist
        → Turnstile, honeypot, origin/body/request controls
        → one internal notification with buyer Reply-To
        → manual BorgaFoods review
```

Required implementation behavior after approval:

- preserve existing `export_quote`, `wholesale`, and `distribution` behaviour unless a scoped field change is approved;
- validate Phase 4B fields server-side using controlled enums or bounded text;
- reject unknown enquiry types, unapproved product IDs, review-gated products, client-supplied internal values, and fields outside the approved schema;
- include only approved buyer qualification values, public product name, and public supply label in the internal email;
- keep the public identity as `export@borgafoods.com` and all temporary operational-recipient configuration server-only; and
- do not add automatic acknowledgement, database persistence, CRM syncing, attachments, pricing, quotations, or account creation.

## 6. Public and private information boundaries

| May be shown or collected publicly                                                                                                                                                                          | Internal-only or prohibited                                                                                                                                                                                                                                  |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Approved product names, category, origin, packaging, public supply label/statement, availability status, buyer contact details, declared market/channel, quantity, destination, and free-text requirements. | Supplier identity, supplier brands, source records, prices, MOQs, capacity, sourcing terms, internal product-audit status, private-label eligibility notes, financial/credit data, customer lists, contracts, attachments, and personal Gmail configuration. |

Customer-facing copy must use confirmation-led language: BorgaFoods reviews the selected products, packaging, volume, market, documentation, and shipment requirements per enquiry. It must not say or imply that the buyer is approved as a distributor, has rights in a territory, has a reserved supply allocation, or will receive a quotation on fixed terms.

## 7. Website presentation scope after approval

Phase 4B may refine existing `/wholesale`, `/contact`, and relevant export call-to-action entry points. It must preserve the existing design language and routes.

Potential approved-scope changes are limited to:

- clear, factual explanation of what wholesale and distributor enquiries can include;
- a CTA that preselects the existing `wholesale` or `distribution` intent;
- form labels and controlled qualification fields that have passed approval; and
- requirements-led explanatory copy.

It must not add a distributor directory, territory map, partner logo wall, application status page, pricing table, customer portal, private-label material, partner-product publication, or marketing claims about capacity, certifications, lead times, stock, exclusivity, or regulatory coverage.

## 8. Risks and controls

| Risk                                                                        | Required control                                                                                                                 |
| --------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| Distributor enquiry is interpreted as an appointment or exclusivity process | Use discussion and review language; omit territory-rights, exclusivity, approval, and allocation claims.                         |
| Product availability is mistaken for a supply promise                       | Show only approved status and require confirmation per enquiry.                                                                  |
| Partner-supplier confidentiality leak                                       | Keep product options public-safe; do not collect or expose supplier identity; retain the partner brand/manufacturer build guard. |
| Review-gated product enters the form                                        | Derive options and server allowlists from the central selector; test Fufu and Red Palm Oil rules.                                |
| Spam or malicious form manipulation                                         | Retain Phase 3 Turnstile, honeypot, validation, origin checks, size limits, idempotency, and safe email escaping.                |
| Excess buyer-data collection                                                | Limit fields to approved qualification needs; no uploads, financial information, customer lists, or sensitive data.              |
| Duplicate or divergent enquiry workflow                                     | Modify the shared schema and existing Function only; do not create a second endpoint or email process.                           |

## 9. Release dependencies

Before deployment, verify the existing Resend and Turnstile environment configuration, run the relevant route/form/mobile checks, and confirm test coverage proves review-gated products and supplier information cannot enter the public form or email workflow. The operational owner and manual follow-up process remain a business operation. Phase 4C private-label work is out of scope.
