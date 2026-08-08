# Analytics Dashboard Specification (for future implementation)

Status: **Specification only. Nothing in this document is built yet.**

## Purpose and scope

This specifies what a future BorgaFoods reporting dashboard should show,
where each number comes from, and how it should be built — so that when
GA4 and Search Console are actually activated (see
`docs/SEO_FOUNDATION.md`), building the dashboard is a scoped
implementation task instead of an open-ended design exercise. It is
explicitly **not an authorization to build a customer-facing analytics
product, a CRM, or a database** — this is an internal reporting surface
for BorgaFoods' own use, reading from Google's own analytics platforms.

## Prerequisite

This dashboard cannot be built before `VITE_GA4_MEASUREMENT_ID` (and
ideally Search Console) are active — see `docs/SEO_FOUNDATION.md` items
1–3. There is no data to show otherwise. Treat this document as ready to
implement once that prerequisite is met, not before.

## Audience and access

Internal only (BorgaFoods management/export team). Not customer-facing,
not linked from the public site. If implemented as a web page rather than
via Google's own dashboards (see "Implementation options" below), it must
sit behind an access control — Cloudflare Access is the natural fit given
the existing Cloudflare Pages hosting, matching the same internal-access
approach already proposed for Phase 3 of BPIP
(`docs/BPIP_MIGRATION_PLAN.md`).

## Sections and metrics

### 1. Search & Discovery (source: Search Console API)

- Total clicks, impressions, average CTR, average position — last 28 days, with trend vs. previous 28 days.
- Top 10 queries by clicks.
- Top 10 landing pages by clicks.
- New indexing errors or manual actions since the last report (should be zero; surfacing any is the point).
- Sitemap submission status and last-read date.

### 2. Site Traffic (source: GA4 Data API)

- Sessions, users, engaged sessions — last 28 days, trend vs. previous period.
- Top 10 landing pages by sessions.
- Traffic by channel (organic search / direct / referral / other) — tells BorgaFoods whether visibility work is actually driving organic traffic vs. only direct/referral.
- Traffic by country — relevant given the export/B2B audience; a spike in an unexpected market is itself a signal worth a human look.

### 3. RFQ Conversion (source: GA4 Data API, `generate_lead` event)

This is the section that matters most for the business, and the reason
`generate_lead` events carry `inquiry_type` and `product_slug` (see
`docs/SEO_FOUNDATION.md` §4):

- Total `generate_lead` events — last 28 days, trend vs. previous period.
- Breakdown by `inquiry_type` (`export_quote` / `wholesale` / `distribution` / `private_label` / `general`) — shows which enquiry path is actually generating interest.
- Breakdown by `product_slug` — shows which products drive enquiries; cross-reference against `shared/productIntelligence/publishedRegistry.ts` slugs (this is the one place GA4 product-level data and BPIP's product registry meet — no code change needed to join them, since `product_slug` values are already BPIP's own slugs).
- Conversion rate: `generate_lead` events ÷ sessions on `/contact` (or ÷ total sessions, reported both ways — the first shows form effectiveness, the second shows full-funnel reach).
- Top landing pages among sessions that eventually converted — answers "which content brings buyers," the question this whole foundation exists to make answerable.

### 4. Technical Health (source: manual/scripted PageSpeed Insights + build pipeline)

- Latest Performance/Accessibility/Best Practices/SEO scores (mobile + desktop) for `/` and `/products`, with trend vs. last report.
- Core Web Vitals (LCP, CLS, TBT) for the same two pages.
- Confirmation the last production build passed `verify:catalog`, `verify:single-source`, and `verify:no-leak` (these already run on every deploy — this section just surfaces that fact for a non-technical reader rather than requiring someone to read a Cloudflare build log).

### 5. Top-Performing Pages (synthesized)

A single ranked list combining sections 1–3: which pages bring the most
organic traffic AND the best RFQ conversion — the two aren't always the
same pages, and the gap between them is itself the most actionable
finding a report can surface (e.g. "Export Solutions gets the most
organic clicks but Wholesale converts twice as well — consider
cross-linking").

## Refresh cadence

Matches the recurring Growth Audit proposed in `docs/SEO_FOUNDATION.md`:
**monthly**. Real-time or daily refresh is not warranted at this site's
current traffic scale and would mostly show noise, not signal.

## Implementation options (recommendation included)

| Option                                                                                         | Effort     | Notes                                                                                                                                                                                                                                      |
| ---------------------------------------------------------------------------------------------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Google's own GA4 + Search Console UIs, with saved custom reports**                           | Lowest     | No code. Someone manually checks two dashboards monthly. Good enough until there's a proven need for more. **Recommended starting point.**                                                                                                 |
| **Looker Studio dashboard** pulling from GA4 + Search Console connectors                       | Low–medium | Free, no hosting, drag-and-drop report matching the sections above; shareable link, no Cloudflare Access needed since Google handles auth. **Recommended for the actual "dashboard" once the metrics above are worth automating.**         |
| **Custom internal page** (Cloudflare Pages + GA4 Data API + Search Console API via a Function) | Highest    | Only worth building if the AI-driven Growth Audit (below) needs to consume this data programmatically rather than a human reading it — i.e., only once the recurring audit is itself automated end-to-end, not just scheduled as a prompt. |

**Recommendation**: start with Looker Studio once GA4/Search Console are
active — it delivers every section above with no engineering time, and
graduating to a custom page later is a data-source swap, not a redesign,
since the same GA4/GSC properties back both.

## Explicit non-goals

- Not a customer-facing feature.
- Not a replacement for BPIP (`docs/PRODUCT_INTELLIGENCE_PLATFORM.md`) — this reads traffic/conversion data, BPIP owns product data. They intersect only at `product_slug`.
- Not real-time. Not a general-purpose BI tool.
- Does not require or justify a database — GA4 and Search Console already are the data stores; this spec is a reporting _view_ over them.
