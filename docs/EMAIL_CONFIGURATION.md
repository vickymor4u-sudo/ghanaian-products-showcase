# BorgaFoods Export Email Configuration

Last updated: 6 August 2026

## Public enquiry address

The approved public export enquiry address is:

```text
export@borgafoods.com
```

The website stores this public address centrally in `shared/exportQuote.ts` and reuses it in client and server code. Phase 3 implements a Cloudflare Pages Function that sends one internal Resend notification to this mailbox after server validation and Turnstile verification. It does not store enquiries or send an automatic customer acknowledgement.

The personal address previously shown on the website must not be restored to public pages, metadata, structured data, or browser-delivered source.

## Approved Phase 3 email flow

```text
Contact form -> /api/export-quote -> Turnstile Siteverify -> Resend -> export@borgafoods.com
```

Email routing rules:

- From: `BorgaFoods Website <export@borgafoods.com>`
- To: `export@borgafoods.com`
- Reply-To: the buyer's validated email address
- one internal notification only;
- no customer acknowledgement;
- no database, CRM record, or attachment store;
- success is displayed only after Resend accepts the notification.

## Cloudflare configuration required

Production encrypted secrets:

```text
RESEND_API_KEY
TURNSTILE_SECRET_KEY
```

Production build-time public variable:

```text
VITE_TURNSTILE_SITE_KEY
```

The site key is intentionally public. The Resend and Turnstile secret keys must be added as encrypted Cloudflare secrets and must never be committed, logged, or exposed through a `VITE_` variable.

## External setup required

The following work requires access to the approved email provider and DNS configuration and is not completed by the website repository:

1. Create or confirm the `export@borgafoods.com` mailbox or forwarding alias with the approved business email provider.
2. Confirm inbound delivery to `export@borgafoods.com` from an external account.
3. Add and verify `borgafoods.com` in Resend.
4. Configure and verify Resend's required SPF and DKIM records without replacing unrelated mail records.
5. Configure and verify DMARC for the domain according to the approved email policy.
6. Create a production Turnstile widget restricted to `www.borgafoods.com` and the approved preview hostname used for testing.
7. Configure a Cloudflare rate-limiting rule for `/api/export-quote`, observe the rule before enforcement, and approve an operational threshold.
8. Add the two encrypted secrets and public site-key variable to the correct Cloudflare Pages environments.
9. Approve the form privacy notice and the mailbox/provider retention responsibilities before live collection.
10. Redeploy a preview build and verify one real internal quotation notification reaches `export@borgafoods.com`.
11. Confirm Reply addresses the buyer and that no automatic customer email is sent.
12. Define who monitors the mailbox, expected response workflow, and escalation responsibilities.

Do not change Cloudflare DNS or email-provider settings without explicit authorization.

## Phase 3 implementation

The committed implementation includes:

- server-side validation;
- Turnstile token, hostname, and action validation;
- a honeypot, same-origin enforcement, body limits, and safe field limits;
- Resend delivery with an idempotency key;
- one internal notification with a request ID;
- reliable success and failure states;
- secrets stored only in server-side environment variables, never in `VITE_` variables or client code.

The endpoint has automated success and failure tests, but production email delivery has not been verified. Do not deploy Phase 3 to production until the production configuration above is complete and a preview delivery test succeeds.
