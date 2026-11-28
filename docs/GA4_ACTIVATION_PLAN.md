# GA4 Activation Record

Status: **Implemented for the verified BorgaFoods web stream, 28 November
2026.**

## Verified property

- Property: BorgaFoods (`properties/566118250`)
- Web stream: `16433312897`
- Measurement ID: `G-38WD1EQZ08`
- Default URL: `https://www.borgafoods.com`
- Enhanced Measurement: enabled, including browser-history page changes

The repository and production HTML contained no GTM container before this
implementation. The setup-screen reference to `GTM-TTKFNVZN` was therefore
not treated as proof that a published container was installed or configured.
The site uses the existing direct Google-tag architecture and does not install
GTM, preventing two installations from sending duplicate events.

## Installation and page views

`client/src/lib/analytics.ts` loads the direct Google tag only after a visitor
accepts analytics. The verified measurement ID is source-owned because it is a
public stream identifier, not a secret.

GA4 Enhanced Measurement is already configured to record page views generated
by browser-history changes. The app therefore does not emit its previous
manual `page_view` event. The initial Google configuration event plus Enhanced
Measurement cover the initial load and client-side route transitions without
two page-view mechanisms operating together.

Advertising storage, ad user data, ad personalization and Google Signals are
disabled by the implementation. Visitors can accept, decline or revisit their
choice through the footer's Analytics preferences control. No Google tag is
loaded after a decline.

## Events

| Event | Trigger | Parameters sent |
| --- | --- | --- |
| `generate_lead` | Successful export, wholesale, distribution or private-label form response | `inquiry_type`, `product_slug` |
| `catalogue_request` | Successful catalogue-request form response | `inquiry_type`, `product_slug` |
| `contact_form_submit` | Successful general-contact form response | `inquiry_type`, `product_slug` |
| `email_click` | Business `mailto:` link click | `page_path` |
| `whatsapp_click` | WhatsApp link or floating-button click | `page_path` |
| `view_item` | Individual canonical product page view | GA4 item ID, name, brand, category and approved public carton price where available |
| `ai_referral` | First consented page in a session with a recognized AI referrer | `ai_platform` |

Successful form events are fired only after `/api/export-quote` returns its
successful response. Catalogue requests now use that form rather than a
mailto button so a click is not misreported as a completed request.

No event includes company names, contact names, email addresses, telephone
numbers, destinations, free text, quotation content or a complete referrer
URL. AI referral classification recognizes ChatGPT, Gemini, Claude,
Perplexity and Microsoft Copilot only when the browser supplies a referrer;
not every AI application does so.

## Validation and dashboard follow-up

Automated tests cover event routing, catalogue submission validation and AI
referrer classification. Browser validation confirms that declining consent
creates no Google script or data layer, while accepting consent loads exactly
`G-38WD1EQZ08` and queues one configuration plus the applicable product event.

In GA4 Admin, mark `generate_lead`, `catalogue_request` and
`contact_form_submit` as key events after they first appear. Register
event-scoped custom dimensions for `inquiry_type`, `product_slug` and
`ai_platform` if those breakdowns are needed in standard reports. Use Realtime
and DebugView after production deployment to confirm receipt; do not submit a
fake customer enquiry solely for testing.

## Related documents

- `docs/SEO_FOUNDATION.md`
- `docs/ANALYTICS_DASHBOARD_SPEC.md`
- `docs/CONVERSION_MEASUREMENT_PLAN.md`
