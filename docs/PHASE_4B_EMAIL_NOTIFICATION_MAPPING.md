# Phase 4B Email Notification Mapping — Internal RFQ Triage

Status: **Internal implementation reference. It defines the permitted notification content for Phase 4B and does not authorize customer acknowledgements, automatic quotations, pricing, CRM storage, or supplier disclosure.**

Prepared: 7 August 2026

## Authority and delivery model

This mapping implements the boundaries in [`PHASE_4B_RFQ_FIELD_MAPPING.md`](./PHASE_4B_RFQ_FIELD_MAPPING.md), [`PHASE_4B_QUALIFICATION_RULES.md`](./PHASE_4B_QUALIFICATION_RULES.md), and [`BUSINESS_RULES.md`](./BUSINESS_RULES.md).

The existing `/api/export-quote` Cloudflare Pages Function sends one internal Resend notification after server validation and Turnstile verification. It retains the public identity `BorgaFoods Export Quote`; the configured recipient and sender remain server-only Cloudflare configuration. The buyer's validated email is the sole `Reply-To` value. No email is sent to the buyer automatically.

## Subject and routing

| Element       | Allowed value                                             | Restriction                                                                                                            |
| ------------- | --------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| From          | `BorgaFoods Export Quote <configured server-only sender>` | The sender must be Resend-authorized. Do not expose a temporary operational recipient.                                 |
| To            | Configured server-only internal notification recipient    | Never deliver recipient configuration to the browser or include it in public documentation.                            |
| Reply-To      | Server-validated buyer `email`                            | Never place buyer input in the sender, recipient, or raw header values.                                                |
| Subject       | `[RFQ] {company} — {destination country} — {request ID}`  | Normalize and remove control characters. Do not include supplier, price, product-source, or internal-lead information. |
| Notifications | Exactly one accepted internal notification                | No auto-reply, forward, SMS, CRM sync, or second workflow.                                                             |

## Permitted notification content

| Notification block             | Fields                                                                                                                                                        | Purpose                                                                                                                 |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| Request reference              | Request ID, enquiry type, source path                                                                                                                         | Lets the team identify the submitted request and its existing workflow path.                                            |
| Company and contact            | Company name, contact person, company country, email, optional phone/WhatsApp                                                                                 | Provides buyer contact context for manual follow-up.                                                                    |
| Qualification context          | Buyer category; optional sales channel, target market, expected order frequency, and timing                                                                   | Describes the buyer's stated context only. It is not an appointment, score, territory, or supply decision.              |
| Product and fulfilment context | Server-derived public product name and public supply classification; packaging preference, estimated quantity, destination country, optional destination port | Supports manual requirements review without asserting availability, price, MOQ, capacity, lead time, or shipping terms. |
| Requirements and consent       | Buyer message and a confirmed privacy acknowledgement                                                                                                         | Supports manual review while retaining the approved no-sensitive-information boundary.                                  |

All values must be either server-derived from the public catalog or validated buyer input. Text and HTML content must use the existing safe escaping and normalization controls.

## Prohibited notification content

Do not include:

- supplier identity, brand, contact, factory, source record, source image, sourcing terms, or partner information;
- public or internal brand/manufacturer fields for partner-sourced products;
- product capability source-alignment, audit state, private-label eligibility, or classification-review information;
- price, MOQ, margin, payment terms, capacity, stock, lead time, certification, allocation, commercial terms, exclusivity, or territory information;
- Turnstile token, honeypot value, raw request body, secret, idempotency key, security log, or temporary Gmail recipient; or
- customer financial, bank, tax, credit, identity, contract, customer-list, attachment, or sensitive personal information.

Fufu Flour may appear only through the pre-existing public product/RFQ selection path and receives no new Phase 4B-specific capability or classification wording. Red Palm Oil is prohibited from notification content until PCR-002 is formally resolved.

## Manual triage boundary

An optional staff-facing completeness cue may be shown in the notification as context, but it must not be stored by the website, sent to the buyer, or used to automate acceptance, rejection, pricing, quotation, appointment, exclusivity, or routing. The operational team manually decides whether and how to respond through the buyer `Reply-To` address.

## Verification requirements

- Test that a wholesale/distribution request produces one notification with the approved qualification fields and buyer `Reply-To`.
- Test that missing required qualification data, unknown values, invalid products, failed Turnstile, honeypot submissions, cross-origin requests, and malformed payloads send no notification.
- Test that email text and HTML omit supplier, partner brand/manufacturer, classification-review, pricing, and secret data.
- Retain the shared schema, product allowlist, Turnstile hostname/action verification, origin check, request-size limit, idempotency key, safe error responses, and no-acknowledgement behavior.
