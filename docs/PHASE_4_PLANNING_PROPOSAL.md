# Phase 4 Planning Proposal — Private Label and Customer Tools

Status: **Proposal for review only. This document does not authorize implementation.**

Prepared: 7 August 2026

## Objective

Extend the existing BorgaFoods B2B export platform so qualified buyers can understand and enquire about approved private-label/OEM opportunities for eligible BorgaFoods-manufactured products.

The phase should improve buyer qualification and operational handoff without turning the website into a customer portal, quotation engine, ecommerce store, or supplier directory.

## Business value

- Gives distributors, retailers, and importers a clear path to discuss own-brand opportunities.
- Reinforces the manufacturer-first BorgaFoods position while keeping the existing export-sourcing model distinct.
- Collects the information needed for a meaningful follow-up: product, target market, packaging, artwork, labeling, estimated volume, and destination requirements.
- Reduces unqualified back-and-forth by explaining that capability, product eligibility, timing, and commercial terms are confirmed individually.
- Builds on the verified Phase 3 enquiry workflow rather than introducing a new lead channel.

## Proposed implementation scope

### 1. Private Label/OEM information area

Add one integrated information area using the existing design system. Its final placement should be approved during implementation planning: a dedicated `/private-label` route, or a clearly scoped section linked from existing export and wholesale pages.

Content would cover only approved, factual topics:

- eligible BorgaFoods-manufactured product categories;
- buyer requirements gathering;
- packaging, artwork, labeling, samples, review, production, documentation, and shipment as a requirements-led process;
- clear statements that availability, market suitability, quantities, timelines, and commercial terms are confirmed per enquiry.

It must not publish unapproved minimum order quantities, prices, lead times, certifications, regulatory guarantees, production capacity, or exclusivity claims.

### 2. Private-label enquiry qualification

Extend the existing Phase 3 quotation workflow rather than introducing a second email pathway. The proposed private-label enquiry type would collect only the fields approved for this purpose, such as:

- company and contact details;
- eligible product interest;
- destination market;
- packaging preference;
- estimated quantity;
- artwork or labeling status;
- requested launch timing or additional requirements.

The existing server-side validation, Turnstile verification, one internal notification, buyer `Reply-To`, no-acknowledgement policy, retention period, and supplier-confidentiality controls would remain in force.

### 3. Future customer-tool discovery, not delivery

Use Phase 4 to define evidence-based requirements for future tools such as secure document exchange, quote tracking, order-status updates, or a customer portal. Do not build those tools in the initial Phase 4 release unless separately approved.

## Explicit exclusions for the initial Phase 4 release

- No database, CRM, customer accounts, login system, dashboard, or portal.
- No automatic quotation, pricing calculator, order placement, payment flow, or stock commitment.
- No automatic customer acknowledgement, file upload, attachment storage, or document repository.
- No private-label/OEM claims for partner-sourced products without explicit confirmation.
- No supplier names, supplier brands, supplier contacts, sourcing terms, or confidential operational details.

## Risks and controls

| Risk                                              | Required control before or during implementation                                                                                            |
| ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| Unsupported manufacturing or customization claims | Approve eligible products, packaging options, labeling support, samples, and process language before publication.                           |
| Regulatory or destination-market liability        | Use requirements-led wording; obtain review before publishing any compliance or labeling statement.                                         |
| Partner-supplier confidentiality breach           | Limit private-label eligibility to explicitly approved BorgaFoods-manufactured products; keep partner-sourced products excluded by default. |
| Low-quality or spam enquiries                     | Reuse the production-proven Turnstile, honeypot, validation, origin checks, request limits, and email workflow.                             |
| Sensitive buyer information or artwork handling   | Do not collect uploads or sensitive information in the initial release; retain enquiry data only under the approved 24-month policy.        |
| Operational follow-up gaps                        | Assign mailbox ownership, expected response process, and escalation path before launch.                                                     |
| Temporary email and rate-limit constraints        | Keep the temporary server-only recipient private; plan domain-email alignment and endpoint rate limiting when DNS/zone control returns.     |

## Dependencies and approvals required

1. Confirm which BorgaFoods-manufactured products are private-label/OEM eligible.
2. Confirm the approved capability statements for packaging, artwork, labeling, samples, production review, export documentation, and shipment support.
3. Approve any public process wording that could be interpreted as a commercial, regulatory, quality, or timing commitment.
4. Confirm the desired placement: dedicated route or integrated section.
5. Approve the final private-label enquiry fields and validation rules.
6. Define operational ownership of private-label enquiries and response expectations.
7. Confirm whether any destination-market legal or regulatory review is needed before publication.
8. Keep Phase 3 operational controls and supplier-confidentiality rules unchanged unless a separate change is approved.

## Recommended approval gate

Approve a small first release only after the eligible manufactured products, approved capability wording, information placement, enquiry fields, and operational owner are confirmed. Treat customer accounts, file exchange, quote tracking, and portals as later, separately scoped work.
