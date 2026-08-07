# Phase 4 Implementation Blueprint — Capability-Model Driven

Status: **Blueprint only. It does not authorize website implementation, publication, or product expansion.**

Prepared: 7 August 2026

## Governing inputs and hard gates

This blueprint uses only the frozen fields and controls in [`PRODUCT_CAPABILITY_MODEL.md`](./PRODUCT_CAPABILITY_MODEL.md). The approved capability workbook remains the operational reference; the central website catalog remains the current browser-delivered source for existing public products.

The two records in [`PRODUCT_CLASSIFICATION_REVIEW.md`](./PRODUCT_CLASSIFICATION_REVIEW.md) are hard-gated:

- Fufu Flour must not receive new Phase 4 packaging, private-label, or classification messaging until its source/brand decision is recorded.
- Red Palm Oil must not be added to public product discovery, structured data, buyer-facing selection lists, manufacturing claims, or private-label messaging until its supply classification is recorded.

No Phase 4 implementation may bypass `Public Display Status`, `Supply Type`, `Private Label Eligibility`, or the supplier-confidentiality rules.

## 1. Product presentation architecture

### Authoritative data roles

| Layer | Role | Allowed data |
| --- | --- | --- |
| Capability model | Internal governance and eligibility reference | All frozen capability fields; restricted source and commercial fields remain internal. |
| Central website catalog | Public page and form source | Only public-safe, approved records derived from the capability model. |
| Presentation components | Render product cards, labels, details, and calls to action | Product name, approved category, origin, approved packaging, availability, image, supply label, and approved supply statement. |
| Quotation workflow | Validates buyer-selected public product identifiers and emails the internal team | Approved public product identifiers, supply label, and buyer-submitted enquiry information only. |

The capability model is not browser-delivered. A future implementation should create a deliberately narrow public projection rather than exposing an internal workbook, source data, or an unrestricted capability object.

### Manufactured product presentation

For a product with `Supply Type: manufactured` and permitted `Public Display Status`:

- display the approved product name, category, origin, packaging, wholesale/export availability, and approved image;
- display `Manufactured by BorgaFoods` as the product-type label;
- display `Manufactured by BorgaFoods Processing` as the supporting supply statement;
- show brand and manufacturer only where the approved manufactured record authorizes them;
- present private-label as an enquiry-led discussion only when its eligibility has changed from `requires_business_approval` to an explicitly approved public capability.

The current model does not make any manufactured product automatically private-label eligible. Until a business decision is recorded, the public experience must not promise OEM, private-label, customized packaging, artwork, labeling, samples, quantities, timings, certifications, or destination-market suitability.

### Partner-sourced product presentation

For a product with `Supply Type: partner_sourced`, permitted `Public Display Status`, and product-level publication approval:

- display `BorgaFoods Export Selection` as the product-type label;
- use exactly: `Selected from trusted Ghanaian production partners`;
- present export and wholesale availability as confirmation-led, not guaranteed;
- keep private-label status as `not_eligible_by_default` unless a separately approved product-level decision changes it;
- avoid any wording that implies BorgaFoods or BorgaFoods Processing manufactures, processes, owns, or brands the item.

### Public-safe wording and confidentiality controls

The implementation should reuse the existing typed supply-label maps instead of hand-writing supply statements in pages. A public projection must omit all restricted fields by design.

| Public-safe | Never browser-delivered or customer-facing |
| --- | --- |
| Product name, category, approved origin, approved packaging, availability status, public type label, public supply statement | Supplier name, supplier brand, supplier contact details, supplier locations, source-record references, pricing, commercial terms, capacity, confidential images or filenames, and internal audit notes |

Controls to retain:

- TypeScript discriminated-union constraints: only manufactured records may expose BorgaFoods brand/manufacturer fields.
- Server-side validation accepts only approved public product identifiers, not supplier or source identifiers.
- Public SEO and structured data must not include restricted supplier data; brand/manufacturer apply only to approved manufactured records.
- Code review and output scans should check client bundles, source maps where applicable, metadata, image paths, schemas, and emails for confidential fields.

## 2. Export catalogue expansion plan

### Discovery model

Phase 4 should make the approved capability model usable for export discovery through a public projection with three states:

1. **Current public catalog** — existing approved BorgaFoods records, retaining current routes and design.
2. **Approved export-selection catalog** — partner-sourced records only after `Public Display Status` and the product-level availability decision permit publication.
3. **Internal opportunity catalog** — capability-model records retained for buyer discussions and operational review, but never rendered publicly.

A staged catalog is preferable to bulk-importing the master workbook. Each prospective entry must pass a publication check:

```text
explicit supply type
        + approved public display status
        + approved product wording and image
        + confirmed export/wholesale handling
        + no open classification review
        = eligible for public projection
```

If any condition fails, the record remains internal only and is excluded from the website catalog, product schema, sitemap product references, and buyer-facing product-selection options.

### Public-display approval categories

| Product group | Phase 4 treatment | Approval required before new display |
| --- | --- | --- |
| Existing BorgaFoods manufactured range | Preserve existing approved display; do not make new private-label claims by default. | Product-level private-label capability and any new packaging, compliance, or marketing claim. |
| Fufu Flour | Keep the review gate intact; no new Phase 4 presentation or private-label material. | Resolution of PCR-001. |
| Partner-sourced selections in the master capability model | Internal only by default. | Product-level public-display approval, approved product image/wording, availability review, and confidentiality review. |
| Red Palm Oil | Internal only. | Resolution of PCR-002, then public-display approval. |

### Catalogue implementation sequence after approval

1. Confirm one or more products for public projection from the capability model.
2. Add only their public-safe fields to the typed central catalog.
3. Reuse existing product-card, SEO, schema, Contact selector, and export CTA components.
4. Apply supply label and statement from the centralized supply maps.
5. Confirm the selected product is permitted in quotation choices.
6. Run product-integrity, confidentiality, schema, route, visual, and form validation.

No master-workbook price, carton, pallet, supplier, or source-brand data should be imported into public website data.

## 3. Private-label/OEM discovery workflow

### Buyer journey

```text
Approved private-label information
        → buyer understands confirmation-led process
        → selects an eligible manufactured product
        → provides market and requirements
        → Turnstile-protected submission
        → internal BorgaFoods review
        → manual capability, compliance, and commercial response
```

The initial journey is discovery and qualification, not an automated private-label offer. The page or integrated section should explain that eligibility, packaging, artwork, labeling, samples, production, documentation, quantities, timing, and commercial terms are reviewed per enquiry.

### Required enquiry fields

The existing verified quotation fields remain the common base:

- company name;
- contact person;
- country;
- email;
- phone/WhatsApp (optional);
- product selection;
- packaging preference;
- estimated quantity;
- destination country;
- destination port (optional);
- message.

When business approves the private-label enquiry extension, add only these qualification fields:

- enquiry type: `private_label`;
- approved eligible manufactured product selection;
- target market;
- intended sales channel (for example distributor, retail, food service);
- preferred packaging format;
- artwork or label readiness (`not started`, `in development`, `ready for review`);
- labeling or language requirements;
- indicative launch timing; and
- additional requirements.

No uploads, artwork files, certifications, sensitive personal information, payment details, or supplier-related questions belong in the initial workflow.

### Eligibility and submission rules

- A private-label selection must resolve to a public manufactured product with an explicit business-approved private-label state.
- `requires_business_approval` means the option is not public or selectable for private-label enquiries yet; it is an internal approval state, not an offer.
- `partner_sourced` plus `not_eligible_by_default` must be rejected for private-label enquiries.
- Products under `PRODUCT_CLASSIFICATION_REVIEW.md` must be rejected or hidden from the private-label flow.
- The interface must use requirements-led wording and never imply acceptance, pricing, MOQ, lead time, sample availability, artwork support, or market compliance.

## 4. RFQ workflow extension

### One workflow, typed enquiry intent

Extend the existing `/api/export-quote` workflow rather than create a second form system or outbound email path. Introduce a controlled `inquiryType` value with these allowed intents:

| Enquiry intent | Purpose | Product validation |
| --- | --- | --- |
| `export_quote` | Export product and shipment enquiry | Current public catalog and approved export-selection identifiers only. |
| `wholesale` | Distributor, retailer, food-service, or bulk-supply enquiry | Current public catalog and approved export-selection identifiers only. |
| `private_label` | Discovery request for an explicitly approved manufactured private-label product | Approved private-label product identifiers only; partner and review-gated items rejected. |

The single endpoint should continue to:

- use the shared request schema on client and server;
- validate the product identifier against the appropriate allowlist for the enquiry intent;
- verify Cloudflare Turnstile server-side;
- keep honeypot, origin checks, request/body/field limits, idempotency, safe escaping, and error handling;
- send one internal Resend notification using the buyer email as `Reply-To`;
- send no automatic customer acknowledgement;
- preserve the approved consent notice, 24-month retention limit, and public `export@borgafoods.com` identity;
- keep the temporary operational recipient server-only while DNS access remains unavailable.

The internal notification may add the validated enquiry intent and approved supply label to help triage. It must not attach supplier identity, source records, price lists, private-label eligibility notes, or other internal capability data.

### Why a separate enquiry system is not justified

The existing endpoint already provides the correct security and operational controls: shared validation, product allowlisting, Turnstile, one internal notification, buyer `Reply-To`, and stateless operation. A second system would duplicate controls, increase configuration risk, and create inconsistent privacy handling without a current business need.

## 5. Data architecture recommendation

```text
Frozen internal capability model
        │  approved public projection only
        ▼
Central typed website catalog ──► Product pages, SEO, structured data, public selectors
        │                                  │
        └──────── approved product IDs ────┼──► Shared RFQ schema and /api/export-quote
                                           │
                                           ▼
                                  Internal enquiry notification

Future AI Control Center
        └── internal read-only view of capability model, review gates, and enquiry summaries
            (separate approval required; never browser-delivered)
```

### Recommended boundaries

| System | Recommended responsibility | Constraint |
| --- | --- | --- |
| Capability model | Internal product governance, approval status, internal packaging/source/audit reference. | No browser delivery; change-controlled. |
| Website catalog | Minimal public projection used by pages, SEO, and forms. | Contains only approved public-safe fields. |
| Export catalogue | A filtered view of website-catalog records that have export-display approval. | Does not expose internal packaging, pricing, or source data. |
| Quotation workflow | Validated enquiry intake and internal email notification. | Accepts only published and intent-eligible product IDs. |
| Future AI Control Center | Internal decision support for approvals, review gates, and operational triage. | Requires separate security, access-control, data-retention, and integration approval. |

Do not make the spreadsheet a runtime dependency. When implementation is approved, maintain a reviewed, typed public projection in the repository and retain the workbook as an internal governance artifact.

## 6. Business decisions required before implementation

1. Resolve PCR-001: Fufu Flour source/brand classification.
2. Resolve PCR-002: Red Palm Oil supply classification.
3. Identify the exact manufactured products, if any, that are approved for public private-label/OEM discovery. The current capability model approves none automatically.
4. Approve the public private-label process wording for packaging, artwork, labeling, samples, production review, documentation, and shipment support.
5. Decide whether private-label discovery belongs on a dedicated route or an integrated section of existing export/wholesale/contact experiences. This blueprint does not add a route.
6. Approve the final private-label-specific enquiry fields, field limits, mandatory/optional status, and buyer-facing consent wording if it changes.
7. Confirm who owns operational response to private-label enquiries and the expected follow-up process.
8. Approve any public claims about export availability, wholesale availability, packaging, shelf life, certification, compliance, or destination-market support for each new product.
9. Confirm the approved product images and metadata for each newly public partner-sourced selection, ensuring no supplier identification can be inferred.
10. Decide when endpoint rate limiting and domain-aligned mail delivery will be revisited after DNS and Cloudflare zone control are restored.
11. Define the business case, authorized users, and security model before any AI Control Center, portal, file exchange, quotation tracking, or order-status capability is built.

## Implementation approval checklist

Phase 4 implementation can begin only after the applicable decisions above are recorded in the frozen model, central catalog, and review documentation, and the scope explicitly authorizes the intended public placement and RFQ changes. Until then, this document remains a planning artifact only.
