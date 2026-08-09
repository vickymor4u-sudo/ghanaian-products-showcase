# Conversion Measurement Plan

Status: **Plan only. No external account activated, no new tracking
code added.** Reviews what's already built (GA4 integration readiness,
the `generate_lead` event, RFQ-side logging) and defines what should be
measured and why — deliberately not what could theoretically be
measured. Every recommendation below either uses code that already
exists, or is a zero-code discipline (link tagging) rather than a new
feature, per this phase's explicit "no unnecessary expansion" and "do
not activate external accounts" constraints.

## What already exists — reviewed directly in code, not assumed

### GA4 integration: built, inert, waiting on one external input

`client/src/lib/analytics.ts` is a complete, working GA4 integration
that does nothing until `VITE_GA4_MEASUREMENT_ID` is set:

- `initAnalytics()` loads `gtag.js` and configures GA4 with
  `send_page_view: false` (pageviews are tracked explicitly, once per
  SPA route change, avoiding a double-counted initial load).
- `trackPageview(path)` fires on every client-side route change
  (wired into `Analytics.tsx`, mounted once in `App.tsx`).
- `trackEvent(name, params)` is the general-purpose event function —
  currently called from exactly one place.
- Every function is a documented no-op when the Measurement ID is
  unset — confirmed again this phase: zero network requests, zero
  cookies, when unconfigured.

**The only blocker is a real GA4 property**, which requires a Google
account action this repository cannot take. Nothing further needs to
be engineered before activation — this is a configuration step
(setting one Cloudflare Pages environment variable), not a build task.

### `generate_lead`: the one event already firing

`client/src/pages/Contact.tsx` fires `trackEvent("generate_lead", {...})`
on every successful RFQ submission (HTTP 201 from
`functions/api/export-quote.ts`), with exactly two parameters:

| Parameter | Value | Why these two |
| --- | --- | --- |
| `inquiry_type` | `general` \| `export_quote` \| `wholesale` \| `distribution` \| `private_label` | Distinguishes a casual question from a serious RFQ — directly relevant now that the general path is genuinely usable (`docs/LEAD_GENERATION_CHANGE_REPORT.md`, Change 1) |
| `product_slug` | the selected product, or `"unspecified"` | Which product actually drives enquiries — works even for the now-optional general-inquiry path |

Both are public, non-identifying classification data — no company
name, contact name, email, phone, or free-text message is ever passed,
by explicit design documented in the module itself
(`client/src/lib/analytics.ts`'s own comment block references
`BUSINESS_RULES.md`'s supplier-confidentiality rules as the reason).

### RFQ-side logging: server, not analytics, but relevant

`functions/api/export-quote.ts` logs structured JSON to the Cloudflare
Function console on every attempt: `rfq_delivery_accepted` (with
`requestId` and the Resend provider message ID) or
`rfq_delivery_rejected` / `rfq_delivery_failed`. This is operational
logging (accessible via Cloudflare's dashboard, not GA4) — useful for
confirming delivery actually happened, not for buyer-behavior analysis.
Already working, not part of this plan's scope to change.

---

## What events matter

Deliberately a short list. The mission's own instruction — "avoid
unnecessary tracking," "recommend improvements only if they directly
help answer" a specific question — is the filter every candidate below
was run through.

### Already sufficient, no change needed

1. **`generate_lead`** — the single most important event this system
   has. It already answers "which products generate interest" and
   distinguishes enquiry seriousness via `inquiry_type`. Once GA4 is
   active, no further engineering is needed to start learning from it.
2. **Automatic pageviews** (`trackPageview`) — already answers "which
   pages get visited" and, combined with GA4's standard referrer/session
   data, "where do buyers come from" — both mission questions, both
   already instrumented.

### Recommended discipline, not new code — outbound link tagging

The single highest-value addition this plan recommends **requires
writing zero product code**: every link sent in outreach
(`docs/OUTREACH_EXECUTION_PLAN.md`) should carry standard UTM
parameters (`utm_source`, `utm_medium=email`, `utm_campaign=<segment
name>`). GA4 parses these automatically from the landing URL — no
custom event, no code change, just a linking convention applied when
outreach actually happens. This is what turns "did outreach work" from
a guess into a measurable comparison across the 6 segments in
`docs/OUTREACH_EXECUTION_PLAN.md`, the moment both outreach and GA4 are
live. **Not implemented as code here** because there's no outreach
being sent yet to tag — recorded as the convention to apply when that
starts.

### Considered and deliberately not built now

| Candidate event | What it would answer | Why not now |
| --- | --- | --- |
| Form-start / field-level abandonment tracking | Where buyers drop off before submitting | No GA4 data exists yet to know whether abandonment is even a real problem worth instrumenting — building this before there's traffic to measure would be exactly the "unnecessary tracking" the mission rules out. Revisit once GA4 is active and real RFQ-page traffic exists. |
| Outbound click tracking (WhatsApp, tel, mailto links) | Which contact channel buyers prefer | Same reasoning — currently zero evidence any of these channels sees meaningful use; instrumenting speculatively adds code for a question nobody can act on yet |
| Scroll depth / time-on-page | General engagement | Doesn't map to a decision this business would actually make differently — explicitly the kind of vanity metric the mission says not to optimize for |
| Search Console query-to-landing-page correlation inside GA4 | Which keyword drove which conversion | Not possible yet regardless of GA4 — `docs/SEARCH_PERFORMANCE_BASELINE.md` shows too little search volume to correlate anything |

The pattern across this table: **every rejected candidate is rejected
for lack of evidence it's needed, not for being hard to build.** If
GA4 activates and `generate_lead` volume grows enough to raise a real
question these could answer, that's the trigger to revisit — not
before.

---

## What decisions the data should support

Framed as actual business questions, not metrics for their own sake:

1. **Is the general-enquiry RFQ fix (`docs/LEAD_GENERATION_CHANGE_REPORT.md`,
   Change 1) actually being used?** — Answered by `generate_lead`
   volume broken down by `inquiry_type`. If `general` enquiries start
   appearing where none existed before (the form couldn't accept them
   until this phase's prior work), that's direct evidence the friction
   fix converted previously-lost visitors into contacts.
2. **Which product should get the next round of content/trust
   investment?** — Answered by `generate_lead`'s `product_slug`
   breakdown. A product with disproportionate enquiry volume relative
   to its page traffic is the one worth prioritizing for anything from
   `docs/PERFORMANCE_AUDIT.md`'s remaining fix list or future content
   work.
3. **Which outreach segment (`docs/OUTREACH_EXECUTION_PLAN.md`) is
   worth pursuing further, and which should be deprioritized?** —
   Answered by UTM-tagged landing sessions correlated with
   `generate_lead` events by campaign, once outreach begins. This is
   the direct measurement loop the mission's "learn from qualified
   enquiries" framing is asking for.
4. **Is organic search worth continued SEO investment, or is outreach
   the only channel producing enquiries right now?** — Answered by
   comparing organic-referred `generate_lead` events against
   outreach-referred ones (via UTM) once both exist. Given
   `docs/SEARCH_PERFORMANCE_BASELINE.md`'s near-zero current search
   volume, this comparison will likely favor outreach initially — a
   useful, evidence-based prioritization signal rather than an assumption.
5. **Should the RFQ form's remaining friction (`docs/PERFORMANCE_AUDIT.md`'s
   note on `Contact.tsx`'s full re-render, or any future field
   changes) be prioritized?** — Not answerable from `generate_lead`
   alone; this is exactly what the deliberately-not-built
   abandonment-tracking candidate above would answer, once there's
   enough traffic to make it worth instrumenting.

---

## What this plan does not do

- **Does not activate GA4** — that requires creating a GA4 property, an
  external Google account action this repository cannot take. The
  moment BorgaFoods creates one and supplies the Measurement ID as a
  Cloudflare Pages environment variable, everything described above as
  "already exists" starts working with no further engineering.
- **Does not add any new tracking code** — every event described as
  "recommended" either already exists or is a linking convention, not
  a build task.
- **Does not propose a dashboard or reporting tool** — GA4's own
  standard reports (once active) cover every question in this document;
  building a custom dashboard would be exactly the kind of unnecessary
  addition the mission warns against, with no evidence yet that GA4's
  native views are insufficient.

## Related documents

- `client/src/lib/analytics.ts`, `client/src/components/Analytics.tsx` — the existing GA4 integration this plan reviews.
- `docs/OUTREACH_EXECUTION_PLAN.md` — the 6-segment sequencing that UTM tagging would make measurable.
- `docs/SEARCH_PERFORMANCE_BASELINE.md` — why organic-search correlation isn't measurable yet.
- `docs/SEO_FOUNDATION.md` — the original GA4 activation blocker, confirmed still open.
