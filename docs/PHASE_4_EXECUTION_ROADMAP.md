# Phase 4 Execution Roadmap — Capability-Model Controlled

Status: **Phase 4A and 4B production verified; Phase 4C implemented locally and pending deployment verification.**

Prepared: 7 August 2026

## Governing controls

This roadmap follows the frozen [`PRODUCT_CAPABILITY_MODEL.md`](./PRODUCT_CAPABILITY_MODEL.md) and the implementation approach in [`PHASE_4_IMPLEMENTATION_BLUEPRINT.md`](./PHASE_4_IMPLEMENTATION_BLUEPRINT.md).

The review gate in [`PRODUCT_CLASSIFICATION_REVIEW.md`](./PRODUCT_CLASSIFICATION_REVIEW.md) applies to every phase:

- Fufu Flour remains excluded from new Phase 4 packaging, export, and classification content. A recorded, narrow exception permits the existing `fufu-borga` record in private-label discovery only.
- Red Palm Oil remains internal only and cannot appear in public discovery, schema, buyer-facing selections, manufacturing claims, or private-label messaging before PCR-002 is resolved.
- No product is private-label eligible unless an explicit business decision records its product-level discovery approval. `fufu-borga` is currently the sole approved exception.

## Sequence and approval gates

```text
Business validation and public-display decisions
        ↓
Phase 4A — export catalogue expansion
        ↓
Phase 4B — wholesale/distributor qualification
        ↓
Phase 4C — private-label discovery
```

Each phase is independently approval-gated. Later phases may reuse approved work from earlier phases but must not assume that an approved export or wholesale product is private-label eligible.

## Phase 4A — Export catalogue expansion

Status: **Implemented locally; not deployed**

Implementation outcome: the existing central catalog now carries capability-derived visibility and source-alignment controls, and pages/RFQ validation consume derived selectors. No partner-sourced record was added because none has public-display approval. Fufu Flour remains in the pre-existing public catalog and RFQ experience but is excluded from the new Phase 4 expansion selector; Red Palm Oil remains excluded from all public content.

### Business objective

Make approved Ghanaian food products discoverable to international B2B buyers while preserving BorgaFoods’ manufacturer-first position and a clear distinction between manufactured and partner-sourced supply.

### Customer value

- Buyers can identify the relevant approved BorgaFoods products and, where approved, selected export products.
- Product type, available packaging, origin, and enquiry path are clearer before a quotation request.
- Buyers can explore a broader supply opportunity without confusing partner selections with BorgaFoods manufacturing.

### Required data

For each proposed public record, use only frozen public-safe fields:

- Product ID, name, category, supply type, public type label, and public supply statement;
- approved country of origin, packaging, shelf life, export availability, and wholesale availability;
- approved product image and public-display status; and
- source alignment confirming no outstanding review gate.

Restricted source packaging, pricing, supplier identity, supplier brand, and internal audit fields remain internal. The public projection must exclude any product that lacks publication approval.

### Website changes required after approval

- Extend the typed central product catalog with only approved public records.
- Reuse existing product presentation cards, export pages, SEO, structured-data safeguards, and export quote calls to action.
- Add approved records to buyer-facing product selection only after their public catalog entry is approved.
- Preserve existing routes and design unless a separately approved route decision is made.

### RFQ workflow impact

- The existing `/api/export-quote` endpoint remains the single path.
- Export-product validation expands only to approved public product identifiers.
- Notifications continue to include the approved product name and supply label, with no supplier or internal capability data.

### Risks

| Risk                                            | Control                                                                                      |
| ----------------------------------------------- | -------------------------------------------------------------------------------------------- |
| Partner item appears manufactured by BorgaFoods | Centralized supply labels and exact approved partner statement.                              |
| Supplier confidentiality leak                   | Public projection omits restricted fields; scan pages, schema, metadata, images, and emails. |
| Unverified availability or specifications       | Publish only approved product-level capability fields; use confirmation-led wording.         |
| Bulk importing unreviewed source data           | Add products individually after the publication check.                                       |

### Dependencies

1. Product-level public-display approval and approved images.
2. Confirmed export and wholesale handling for every newly public product.
3. Resolution of PCR-001 or PCR-002 if either product is proposed for new public content.
4. Product-integrity, confidentiality, SEO/schema, route, and RFQ validation before release.

## Phase 4B — Wholesale/distributor qualification improvements

### Business objective

Improve enquiry quality from distributors, retailers, African grocery stores, wholesalers, restaurants, and food-service buyers without adding a separate enquiry platform.

### Customer value

- Buyers understand what information is useful for an export or wholesale discussion.
- Distributor enquiries can communicate channel, product mix, packaging needs, volume, destination, and port requirements in one structured submission.
- The BorgaFoods team receives more actionable requests while avoiding promises of stock, pricing, MOQ, exclusivity, or lead time.

### Required data

- Approved public product IDs and supply labels from the website catalog.
- Existing base enquiry fields: company, contact, country, email, optional phone/WhatsApp, product selection, packaging preference, quantity, destination country, optional port, and message.
- Proposed wholesale qualification fields, pending approval: buyer type, sales channel, expected order frequency, product mix, and intended market.

Any field or option that implies unapproved commercial commitments must be excluded. Product lists must exclude internal-only and review-gated records.

### Website changes required after approval

- Refine existing Contact, Wholesale, and export call-to-action entry points to preselect or identify a `wholesale` enquiry intent.
- Add concise guidance explaining that product availability, formats, documentation, volumes, and shipment requirements are reviewed per enquiry.
- Reuse the existing responsive form, validation messages, consent notice, Turnstile component, and email fallback.

No separate wholesale portal, login, database, pricing table, account area, or distributor application system is justified in this phase.

### RFQ workflow impact

- Add or activate the controlled `wholesale` enquiry intent within the existing shared schema and endpoint.
- Validate selected products against the approved public export/wholesale allowlist.
- Include buyer type and approved qualification fields in the internal notification for triage.
- Retain one internal notification, buyer `Reply-To`, no automatic acknowledgement, and the approved 24-month retention limit.

### Risks

| Risk                                                            | Control                                                                                      |
| --------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| Buyers interpret the form as an application or supply guarantee | Requirements-led content; no approval, allocation, or exclusivity language.                  |
| Low-quality or spam enquiries                                   | Retain server-side validation, Turnstile, honeypot, origin checks, limits, and idempotency.  |
| Overcollection of buyer data                                    | Collect only fields needed for qualification; no sensitive data or uploads.                  |
| A partner product is offered without approval                   | Use approved catalog identifiers only; keep review-gated/internal products out of selectors. |

### Dependencies

1. Approval of the final wholesale qualification fields and required/optional status.
2. Confirmation of operational ownership and internal response process.
3. Approval of buyer-facing wording and any selected-product availability language.
4. Existing Phase 3 secrets, Turnstile, Resend delivery, consent, and server controls remain operational.

## Phase 4C — Private-label discovery workflow

Status: **Implemented locally; pending deployment verification**

### Business objective

Allow qualified buyers to start a private-label/OEM discussion for explicitly approved BorgaFoods-manufactured products, while making no capability promise until manual review.

### Customer value

- Buyers have a clear, professional way to explain own-brand product requirements.
- The process sets expectations that packaging, artwork, labels, market needs, volume, timing, documentation, and commercial terms require confirmation.
- BorgaFoods receives the information needed to determine whether a follow-up is appropriate.

### Approved implementation decisions

- The only approved private-label discovery Product ID is `fufu-borga` (Fufu Borga), an existing BorgaFoods-manufactured catalog record.
- Private-label discovery is manual review only. No enquiry creates an OEM, production, packaging, regulatory, commercial, or customer commitment.
- The BorgaFoods management/export team owns manual review. MOQ, packaging, specifications, production feasibility, and regulatory requirements require confirmation before acceptance.
- The existing Contact/RFQ path is the approved placement; no new route, CRM, database, customer account, automatic quotation, or automatic acknowledgement is introduced.
- All partner-sourced products remain excluded by default. Red Palm Oil remains excluded. All other manufactured products remain unavailable for private-label discovery until explicitly approved.

### Required data

- The recorded `fufu-borga` private-label discovery approval in the central catalog; no other product is eligible.
- Approved discovery wording and manual-review conditions for product specifications, packaging requirements, order volume, production feasibility, MOQ, and regulatory requirements.
- Base quotation fields plus intended sales channel, target market, preferred packaging, artwork/label readiness, labeling/language requirements, indicative launch timing, and product requirements.
- A server-derived private-label allowlist that excludes all records without explicit private-label discovery approval.

### Website changes required after approval

- Add a private-label discovery section to the existing Wholesale page and an entry point within the existing Contact form; no new route is introduced.
- Present only explicitly approved manufactured products and requirements-led process language.
- Provide a clear private-label enquiry entry point using the existing Contact/RFQ experience.
- Keep partner-sourced products out of private-label content and selection lists.

The initial release excludes uploads, artwork storage, sample orders, automatic pricing, customer accounts, quote tracking, document exchange, and automated eligibility decisions.

### RFQ workflow impact

- Add or activate a controlled `private_label` enquiry intent in the existing shared schema and `/api/export-quote` endpoint.
- Validate the selected Product ID against the approved manufactured private-label allowlist.
- Reject partner-sourced, internal-only, and every product without explicit private-label discovery approval server-side even if a client request is manipulated.
- Add approved qualification fields to the single internal notification; buyer email remains `Reply-To` and no customer acknowledgement is sent.

### Risks

| Risk                                       | Control                                                                                   |
| ------------------------------------------ | ----------------------------------------------------------------------------------------- |
| Implied OEM/private-label capability       | Do not render a product as eligible until explicit approval is recorded.                  |
| Partner-supplier confidentiality breach    | Partner products are excluded by default and restricted data stays server/internal only.  |
| Regulatory, labeling, or market commitment | Use confirmation-led wording and require manual review.                                   |
| Sensitive files or data enter the workflow | No uploads, attachments, payment data, or sensitive personal data in the initial release. |
| Overbuilding a customer platform           | Extend the current stateless RFQ system; defer portals and CRM integration.               |

### Dependencies

1. Existing Phase 3 Resend and Turnstile configuration remains available in the target Cloudflare environment.
2. Security, access-control, retention, and integration approvals before any future AI Control Center or customer tool is connected.

## Cross-phase release controls

- Do not expose suppliers, supplier brands, source references, internal pricing, cartons/pallets, or operational notes in public code, metadata, images, structured data, forms, or emails.
- Keep `manufactured` and `partner_sourced` as mandatory, explicit classifications with no default.
- Do not introduce unsupported manufacturing, export, wholesale, private-label, certification, shelf-life, MOQ, pricing, lead-time, or destination-market claims.
- Use the existing quotation workflow instead of a new enquiry system unless a documented, approved requirement makes the existing workflow insufficient.
- Before each release, run type checks, tests, production build, confidentiality scans, route checks, form success/failure checks, mobile checks, and SEO/schema checks relevant to the approved scope.

## Final implementation gate

No phase begins until its stated dependencies and business decisions are recorded. The frozen capability model, classification review list, and supplier-confidentiality rules remain authoritative throughout Phase 4.
