# BorgaFoods Export Email Configuration

Last updated: 6 August 2026

## Public enquiry address

The approved public export enquiry address is:

```text
export@borgafoods.com
```

The website stores this public address centrally in `client/src/config/site.ts`. The Contact form currently prepares an email in the visitor's email application. It does not send data through the website, store enquiries, or confirm delivery.

The personal address previously shown on the website must not be restored to public pages, metadata, structured data, or browser-delivered source.

## External setup required

The following work requires access to the approved email provider and DNS configuration and is not completed by the website repository:

1. Create the `export@borgafoods.com` mailbox or forwarding alias with the approved business email provider.
2. Configure the provider's required MX records for `borgafoods.com`.
3. Configure and verify SPF, DKIM, and DMARC records according to the provider's instructions.
4. Confirm inbound delivery to `export@borgafoods.com` from an external account.
5. Confirm outbound sending and reply identity from `export@borgafoods.com`.
6. Define who monitors the mailbox, expected response workflow, and escalation responsibilities.

Do not change Cloudflare DNS or email-provider settings without explicit authorization.

## Phase 3 server-side integration

The future RFQ workflow should replace email preparation with a server-side submission path that includes:

- server-side validation;
- spam protection and rate limiting;
- an approved transactional email or mailbox integration;
- reliable success and failure states;
- privacy, retention, and inquiry-routing decisions;
- secrets stored only in server-side environment variables, never in `VITE_` variables or client code.

The server-side workflow must be tested for delivery before the website describes a form submission as successful.
