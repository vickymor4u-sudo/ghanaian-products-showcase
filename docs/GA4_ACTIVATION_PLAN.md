# GA4 Activation Plan

Status: **Plan only — GA4 remains inactive.** No `VITE_GA4_MEASUREMENT_ID`
is set in Cloudflare (confirmed live, 9 August 2026). This document
reviews what's already built, defines the event taxonomy GA4 should
carry once active, and separates the genuine blockers (a GA4 property,
and a privacy/consent decision) from what's purely an engineering task.

## 1. Review of the existing implementation

Built in the Search & Analytics Foundation phase, unchanged since:

- **`client/src/lib/analytics.ts`** — `initAnalytics()`, `trackPageview()`, `trackEvent()`. Every function is a no-op if `GA4_MEASUREMENT_ID` (from `client/src/config/site.ts`, reading `import.meta.env.VITE_GA4_MEASUREMENT_ID`) is empty: no `gtag.js` script tag is created, `window.dataLayer` is never initialized, and no network request to Google is ever made. This was verified in a local production build with the console.
- **`client/src/components/Analytics.tsx`** — mounted once in `App.tsx`. Calls `initAnalytics()` on mount and `trackPageview(location)` on every `wouter` route change, with `send_page_view: false` set on `gtag config` specifically so the SPA's manual pageview tracking doesn't double-count against GA4's own automatic pageview (which only fires on a full document load, something this SPA does once per session at most).
- **`client/src/pages/Contact.tsx`** — fires `trackEvent("generate_lead", { inquiry_type, product_slug })` immediately after a successful `/api/export-quote` submission. `inquiry_type` and `product_slug` are the only parameters, both public, non-identifying classification values already known server-side — no buyer-provided field (name, company, email, phone, destination, free text) is ever sent. This boundary is documented in `analytics.ts`'s own module comment and is a hard constraint, not a preference — see `docs/BUSINESS_RULES.md`'s supplier/buyer confidentiality rules.

This is a sound foundation: activating GA4 today would require setting
one Cloudflare environment variable and redeploying, nothing more. The
gap is in event *coverage* (only one conversion event exists today) and
in the privacy groundwork that should land before real visitor data
starts flowing, not in the mechanism itself.

## 2. Required event taxonomy

Recommended set for when GA4 is activated, in priority order. Items
marked **(build now, still inert)** are cheap, config-gated additions
worth wiring up now, following the same pattern as `generate_lead`, so
activation is a pure configuration step with nothing left to build. This
plan does not implement them — flagging them here is the requested
"document required events" step; adding the code is a separate,
explicitly scoped task if wanted.

| Event | Trigger | Parameters | Why |
| --- | --- | --- | --- |
| `page_view` | Every SPA route change | `page_path`, `page_location`, `page_title` | **Already built.** Core traffic measurement; everything else is relative to this. |
| `generate_lead` | Successful `/api/export-quote` submission | `inquiry_type`, `product_slug` | **Already built.** The single conversion event this business cares about most — see `docs/ANALYTICS_DASHBOARD_SPEC.md` §3. |
| `select_content` | Category filter clicked on `/products` | `content_type: "product_category"`, `item_id: <category name>` | Shows which product category draws browsing interest even without a conversion — a leading indicator `generate_lead` alone can't show. |
| `view_item` | A product's "Request Quote for {product}" CTA becomes visible or is clicked on `/products` | `item_id: <product slug>`, `item_name: <product name>`, `item_category: <category>` | GA4's standard e-commerce event name for product-level interest; distinguishes "buyer looked at Gari" from "buyer looked at Fufu Flour" before any enquiry, which `generate_lead`'s `product_slug` only captures at the point of conversion. |
| `select_content` | WhatsApp floating button clicked | `content_type: "contact_channel"`, `item_id: "whatsapp"` | A real, currently-untracked conversion-adjacent action — buyers who go straight to WhatsApp instead of the RFQ form are invisible to `generate_lead` today. |
| `generate_lead` variant | Export-quote CTA *click* (not submission) | `inquiry_type`, `product_slug` if known, `event_label: "cta_click"` | Distinguishes "started an enquiry" from "completed one," which is the funnel-drop-off signal `docs/ANALYTICS_DASHBOARD_SPEC.md` §3's conversion-rate metric needs to be meaningful (today it can only measure sessions-to-completion, not clicks-to-completion). |

Deliberately **not** recommended: anything involving scroll depth,
time-on-page, or other engagement micro-events. For a low-traffic B2B
export site, these add data-collection surface (a privacy consideration
in themselves) without a clear decision they'd inform — they're vanity
metrics here, not actionable ones. Consistent with this project's
general bias against building measurement for its own sake.

## 3. Privacy requirements — the actual blocker

This is the real reason GA4 isn't active, not a missing property alone.
Turning on real visitor tracking is a privacy-notice and possibly a
consent-banner decision, already flagged in `docs/SEO_FOUNDATION.md` §3
and repeated here because it's the operative blocker for this plan:

1. **Update the existing quotation-form privacy notice** (and consider a
   short site-wide note, e.g. in the footer) to name Google Analytics as
   one of the "trusted service providers" the notice already references
   generically. This is a wording change to existing legal copy, not new
   legal ground — but it's still a business/legal sign-off, not an
   engineering one.
2. **Decide whether a cookie-consent banner is required** for the
   markets BorgaFoods actually serves. GA4 sets first-party cookies by
   default; depending on which countries the buyer base and site traffic
   actually come from (the site itself doesn't currently know — this is
   part of what GA4 would answer, a chicken-and-egg the business needs
   to resolve with a judgment call, e.g. "assume EU/UK traffic is
   possible and add a banner" vs. "our buyers are concentrated in
   specific markets where it's not required").
3. **Optional but recommended alongside 1–2**: consider IP
   anonymization / GA4's built-in data-retention controls (GA4
   anonymizes IP by default at collection, but retention window and
   Google Signals are separate toggles worth a deliberate choice rather
   than defaults).

None of this repository can decide on the business's behalf. This plan
stops here for that reason, per this session's standing instruction not
to make business/legal calls.

## 4. Activation steps, once the property and privacy decision both exist

Purely mechanical, already true today and unchanged by anything in this
plan:

1. Create a GA4 property at [analytics.google.com](https://analytics.google.com) for `borgafoods.com`, copy the Measurement ID (`G-XXXXXXXXXX`).
2. Complete the privacy-notice update and consent-banner decision from §3.
3. Set `VITE_GA4_MEASUREMENT_ID` in Cloudflare Pages → `borgafoods` → Settings → Environment variables (Production).
4. Redeploy (build-time variable, same as every other config-gated feature in this app — see `docs/SEO_FOUNDATION.md`'s established pattern).
5. Verify in a browser: `gtag.js` loads, `window.dataLayer` exists, a test RFQ submission produces a `generate_lead` event in GA4's DebugView.

## Related documents

- `docs/SEO_FOUNDATION.md` §3–4 — original GA4/conversion-event build record.
- `docs/ANALYTICS_DASHBOARD_SPEC.md` — what a future reporting dashboard should show once GA4 has real data; this plan's event taxonomy directly feeds that spec's §3 (RFQ Conversion) and would extend its §5 (Top-Performing Pages) with `select_content`/`view_item` data.
- `docs/GSC_INDEXING_AUDIT.md` — the search-side counterpart; GA4 answers "what did visitors do," GSC answers "how did they find us."
