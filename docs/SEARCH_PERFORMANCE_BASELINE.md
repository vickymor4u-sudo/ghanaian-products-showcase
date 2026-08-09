# Search Performance Baseline

Status: **Live Google Search Console data, checked directly on 9 August
2026 (property: `https://www.borgafoods.com/`, URL-prefix, account
Victor Owusu / vickymor4u@gmail.com). No content created from this
data** — every number below is either already-true baseline
measurement or an honest "not enough data yet" conclusion, per this
phase's explicit "do not create new content unless supported by
evidence" instruction. Nothing here was supported by evidence strong
enough to justify new content.

## Headline numbers

| Metric | Value | Source |
| --- | --- | --- |
| Indexed pages | **3 of 12** known public routes | Indexing report |
| Not indexed (with a reason/error) | 0 | Indexing report |
| Sitemap discovered URLs | 12 / 12, last read 9 Aug 2026, status Success | Sitemaps report |
| Total impressions (lifetime) | 5 | Performance report |
| Total clicks (lifetime) | 0 | Performance report |
| Average CTR | 0% | Performance report |
| Average position | 4.8 | Performance report |
| Queries with any recorded data | 1 | Performance report |
| Manual actions / security issues | None | Overview |
| Structured-data enhancements reported | None yet | Overview (expected — most pages not yet crawled) |

**This is unchanged from the checkpoint recorded in this project's
prior phase** (`docs/LEAD_GENERATION_STRATEGY.md`, 9 August, earlier the
same day) — same 3 indexed URLs, same crawl dates, same 5 impressions,
same single query. No new signal has arrived in the interim. That
absence of movement is itself the finding this section reports
honestly, rather than reading motion into noise.

## Indexed pages (the 3 Google has actually crawled and can serve)

| URL | Last crawled |
| --- | --- |
| `https://www.borgafoods.com/export` | 1 Aug 2026 |
| `https://www.borgafoods.com/` | 1 Aug 2026 |
| `https://www.borgafoods.com/about` | 31 Jul 2026 |

**Not yet indexed (discovered via sitemap, not yet crawled — no error,
no rejection)**: `/products`, all 5 product pages
(`/products/fufu-flour`, `/products/gari`, `/products/cassava-flour`,
`/products/banku-mix`, `/products/kokonte`), `/export-solutions`,
`/wholesale`, `/contact`. That's 9 of 12 routes, including every
product-specific and wholesale-specific landing page this project has
built — none of them has had a chance to earn a single impression yet,
because Google hasn't looked at them since they went live.

## Impressions and queries

| Query | Clicks | Impressions |
| --- | --- | --- |
| "borga food" | 0 | 2 |

Total impressions (5) exceed the single logged query's count (2) —
GSC's per-query table only shows queries above a minimum threshold, so
the remaining ~3 impressions are attributed to queries too small
individually to break out (typically single-impression queries, often
brand-adjacent or very long-tail). Per the prior checkpoint's finding
(`docs/GROWTH_TRACKING_LOG.md`, Cycle 1), all recorded impressions to
date are attributed to `/` — no other page has earned an impression
yet, consistent with the indexing table above (only 3 pages are even
eligible to appear in results).

## What this data can and cannot support

**Can support**: confirming the technical foundation is healthy. Zero
manual actions, zero indexing errors, a sitemap Google reads
successfully same-day, and — new information this phase confirms by
checking again — the crawl simply hasn't reached most of the site yet,
which is a timing fact about a two-and-a-half-week-old property, not a
defect. `/`, `/about`, and `/export` being the first 3 crawled also
lines up sensibly: they were live longest and are the pages
`_routes.json`'s `KNOWN_PUBLIC_PATHS` and internal linking have pointed
at since earliest in the project.

**Cannot support**: any claim about which keywords, products, or buyer
segments are "working" in search. One query, two impressions, zero
clicks is not a sample size — treating it as a signal to chase (e.g.
writing more "borga food"-adjacent content) would be exactly the kind
of content-for-volume move this phase's instructions rule out. The
honest baseline is: **the site hasn't been searched for meaningfully
yet, because Google hasn't finished looking at it.**

## Early buyer-intent signals

None yet, genuinely. "borga food" (the one recorded query) reads as a
brand-name lookup, not a buyer-intent commercial query (contrast with
the 4 priority commercial-intent keywords already identified in
`docs/GROWTH_TRACKING_LOG.md` — "fufu flour Ghana," "gari supplier
Ghana," "banku mix export," "African food distributor Ghana" — none of
which have any impressions yet). This isn't a bad sign at this stage;
it's simply too early. The next checkpoint is where a real signal would
first be expected to appear, once the 9 not-yet-indexed pages start
getting crawled.

## Pages Google is understanding vs. pages requiring improvement

**Understanding** (indexed, being served): `/`, `/about`, `/export` —
no action needed on these from a discovery standpoint; the improvement
lever here is what happens *after* a click (already addressed in
`docs/LEAD_GENERATION_CHANGE_REPORT.md`'s trust-signal and FAQ-schema
changes), not getting found in the first place.

**Requiring improvement — but the improvement needed is patience and
recrawl, not content changes**: the 9 not-yet-indexed pages. There is
no evidence of a technical blocker — the sitemap is healthy, `robots.txt`
allows crawling (`Allow: /`), and `functions/_middleware.ts` serves a
real `200` with a correct canonical tag for every one of these paths
(verified directly in `docs/PERFORMANCE_AUDIT.md` and
`docs/LEAD_GENERATION_CHANGE_REPORT.md`'s verification passes this same
day). The only identified lever is requesting indexing directly per
URL via GSC's URL Inspection tool — attempted via browser automation
this session and the prior session; the tool's inspect-URL input did
not respond reliably to automated interaction either time. **Flagged as
a genuine, low-effort manual follow-up**: a person spending 10 minutes
in GSC directly, clicking "Request Indexing" for the 5 product pages
plus `/wholesale`, would likely be faster and more reliable than
further automation attempts.

## What was deliberately not done

- **No new content was created or proposed** based on this data — one
  query and 5 impressions is not evidence of anything worth building
  content around, and the instructions are explicit on this point.
- **No claim was made about keyword rankings or competitive position**
  from this data — that requires the query volume this property
  doesn't have yet. `docs/GROWTH_TRACKING_LOG.md`'s competitor research
  (real, sourced, done via live search rather than GSC) remains the
  right source for that question, not this baseline.
- **Indexing was not artificially forced** — no page was resubmitted,
  no sitemap ping was sent (the sitemap was already freshly read the
  same day, unprompted), consistent with there being no actual blocker
  to work around.

## Next checkpoint — what to look for

Per `docs/GROWTH_MONITORING_FRAMEWORK.md`'s existing monthly cadence,
or sooner if the manual indexing-request follow-up above happens:

1. Indexed-page count moving past 3 — the single clearest sign the
   crawl has resumed.
2. Any impression at all on a URL other than `/` — the first real
   evidence a specific page (especially a product page) is being
   surfaced for a specific query.
3. Any of the 4 priority commercial-intent keywords
   (`docs/GROWTH_TRACKING_LOG.md`) acquiring an impression.
4. Whether the "Enhancements" section starts reporting the `Product`,
   `BreadcrumbList`, and new `FAQPage` structured data as valid, once
   Google actually crawls the pages carrying it.

## Related documents

- `docs/GROWTH_MONITORING_FRAMEWORK.md`, `docs/GROWTH_TRACKING_LOG.md` — the recurring review process this baseline feeds into.
- `docs/LEAD_GENERATION_STRATEGY.md`, `docs/LEAD_GENERATION_CHANGE_REPORT.md` — the same-day prior checkpoint this data is unchanged from, and the trust/FAQ-schema changes made in anticipation of these pages eventually being crawled.
- `docs/SEO_FOUNDATION.md` — the original technical SEO work (sitemap, canonical, structured data) this baseline is measuring the results of.
