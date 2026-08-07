# BorgaFoods Export Email Configuration

Last updated: 7 August 2026

## Public enquiry address

The approved public export enquiry address is:

```text
export@borgafoods.com
```

The website stores this public address centrally in `shared/exportQuote.ts` and uses it for public pages, metadata, customer-facing fallback messages, and direct email links. It remains the intended future production mailbox.

The personal address previously shown on the website must not be restored to public pages, metadata, structured data, or browser-delivered source.

## Temporary operational recipient

Because control of the authoritative DNS for `borgafoods.com` is currently unavailable, `vickymor4u@gmail.com` is approved as a temporary internal recipient for quotation notifications.

This fallback is operational configuration only. It must not be compiled into frontend code, included in public metadata, shown to customers, used in customer-facing email copy, or used as a public fallback address. The Cloudflare Pages Function reads the recipient from the server-only `EXPORT_QUOTE_NOTIFICATION_EMAIL` setting.

When the domain mailbox becomes available, delivery must switch back to `export@borgafoods.com` by changing Cloudflare configuration only. No website or Function code change should be required.

## Approved Phase 3 email flow

```text
Contact form -> /api/export-quote -> Turnstile Siteverify -> Resend -> server-only notification recipient
```

Email routing rules:

- Display identity: `BorgaFoods Export Quote`
- From: `BorgaFoods Export Quote <server-only provider-authorized sender>`
- To: the server-only `EXPORT_QUOTE_NOTIFICATION_EMAIL` recipient
- Reply-To: the buyer's validated email address
- one internal notification only;
- no customer acknowledgement;
- no database, CRM record, or attachment store;
- success is displayed only after Resend accepts the notification.

## Cloudflare configuration required

Production encrypted secrets:

```text
EXPORT_QUOTE_NOTIFICATION_EMAIL
RESEND_API_KEY
TURNSTILE_SECRET_KEY
```

Production server-only text variable:

```text
EXPORT_QUOTE_FROM_EMAIL
```

Production build-time public variable:

```text
VITE_TURNSTILE_SITE_KEY
```

The site key is intentionally public. The Resend key, Turnstile secret, and temporary notification recipient must be added as encrypted Cloudflare secrets. `EXPORT_QUOTE_FROM_EMAIL` is also server-only. None of these server settings may use the `VITE_` prefix, be committed to source, or be logged.

## External setup required

The following work requires access to the approved email provider and DNS configuration and is not completed by the website repository:

1. Configure the temporary Gmail recipient through the encrypted `EXPORT_QUOTE_NOTIFICATION_EMAIL` setting in both Preview and Production.
2. Configure `EXPORT_QUOTE_FROM_EMAIL` with an address Resend currently authorizes for the selected sending mode.
3. Add and verify `borgafoods.com` in Resend.
4. Configure and verify Resend's required SPF and DKIM records without replacing unrelated mail records.
5. Configure and verify DMARC for the domain according to the approved email policy.
6. Create a production Turnstile widget restricted to `www.borgafoods.com` and the approved preview hostname used for testing.
7. Configure a Cloudflare rate-limiting rule for `/api/export-quote`, observe the rule before enforcement, and approve an operational threshold.
8. Add the two encrypted secrets and public site-key variable to the correct Cloudflare Pages environments.
9. Approve the form privacy notice and the mailbox/provider retention responsibilities before live collection.
10. Redeploy a preview build and verify one real internal quotation notification reaches the temporary Gmail recipient.
11. Confirm Reply addresses the buyer and that no automatic customer email is sent.
12. Define who monitors the mailbox, expected response workflow, and escalation responsibilities.

Do not change Cloudflare DNS or email-provider settings without explicit authorization.

## Phase 3 implementation

The committed implementation includes:

- server-side validation;
- Turnstile token, hostname, and action validation;
- a honeypot, same-origin enforcement, body limits, and safe field limits;
- Resend delivery with an idempotency key;
- server-only sender and notification-recipient configuration, independent from the public enquiry address;
- one internal notification with a request ID;
- reliable success and failure states;
- secrets stored only in server-side environment variables, never in `VITE_` variables or client code.

The endpoint has automated success and failure tests, but production email delivery has not been verified. Do not deploy Phase 3 to production until the production configuration above is complete and a preview delivery test succeeds.
