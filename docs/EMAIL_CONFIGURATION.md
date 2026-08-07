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

## External setup status

Completed for the temporary production launch:

1. Configured the temporary recipient through encrypted `EXPORT_QUOTE_NOTIFICATION_EMAIL` settings in Preview and Production.
2. Configured `EXPORT_QUOTE_FROM_EMAIL` with the temporary provider-authorized Resend sender.
3. Created the Turnstile widget for `www.borgafoods.com`, the Pages hostname, and the approved Preview hostname.
4. Added the required encrypted secrets, server-only sender setting, and public site-key variable to Preview and Production.
5. Approved the form privacy notice and 24-month maximum retention period.
6. Redeployed Preview and verified internal notification delivery, buyer `Reply-To`, and no automatic customer acknowledgement.

Deferred until BorgaFoods regains DNS and Cloudflare zone control:

1. Add and verify `borgafoods.com` in Resend.
2. Configure and verify Resend's required SPF and DKIM records without replacing unrelated mail records.
3. Configure and verify DMARC for the domain according to the approved email policy.
4. Switch the notification recipient and authorized sender to the approved domain addresses through configuration only.
5. Configure a Cloudflare rate-limiting rule for `/api/export-quote`, observe the rule before enforcement, and approve an operational threshold.

The business must also define who monitors the operational mailbox, the expected response workflow, and escalation responsibilities.

Do not change Cloudflare DNS or domain email-provider settings without explicit authorization.

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

The endpoint has automated success and failure tests. Preview delivery was verified before production approval; production delivery must be verified after deployment.

## Privacy and retention

The approved quotation-form notice is:

> By submitting this form, you consent to BorgaFoods using the information provided to review and respond to your export enquiry. Your information may be processed by trusted service providers used to operate our website and email communication systems and retained as needed for enquiry handling and legitimate business records. Please do not submit sensitive personal information.

Export enquiries may be retained for up to 24 months for business communication and records.

## Temporary rate-limit deferral

The initial production launch without a separate Cloudflare rate-limiting rule was approved on 7 August 2026 because DNS and Cloudflare zone control are unavailable. Server-verified Turnstile, the honeypot, schema validation, same-origin enforcement, request-body limits, field limits, and provider idempotency remain mandatory. Configure and validate endpoint rate limiting when DNS and Cloudflare zone control are restored.

## Production-readiness status

Preview and Production have the required Resend, Turnstile, sender, and server-only recipient configuration. A Preview quotation was accepted with request ID `BF-0E9387D7`; the internal notification reached the temporary recipient, the buyer address was present in `Reply-To`, and no automatic customer acknowledgement was sent. Production deployment and a live quotation delivery test remain outstanding.
