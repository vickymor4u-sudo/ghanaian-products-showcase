# Growth Tracking Log

Append-only. One dated entry per monitoring cycle, per
`docs/GROWTH_MONITORING_FRAMEWORK.md`. Do not edit or remove past
entries — if a past decision turns out to be wrong, record that in a new
entry, the same way `docs/CHANGE_LOG.md` handles corrections.

## Baseline — decisions made before this system existed (for context)

Reconstructed from `docs/CHANGE_LOG.md`, not a monitoring cycle itself —
recorded here once so the tracking log has continuity from day one
instead of starting blank.

| Date | Decision | Trigger |
| --- | --- | --- |
| 8 Aug 2026 | Fixed GSC verification tag to render at build time, not client-side | GSC "HTML tag" verification doesn't execute JavaScript; a client-rendered tag was invisible to it |
| 8 Aug 2026 | Moved canonical/robots tags to the edge (Pages Function) and fixed a soft-404 | Same root cause as above, found during a full indexing audit prompted by GSC showing only 2/7 pages inspectable |
| 9 Aug 2026 | Applied 7 corrections to `/about` (removed an unsupported MOQ figure and 6 related unverified claims) | Claim-by-claim audit against `BUSINESS_RULES.md` found real rule violations |
| 9 Aug 2026 | Built 5 dedicated product pages at SEO-facing URLs | Content-architecture review found all 5 products shared one page, diluting product-specific search targeting |
| 9 Aug 2026 | Added buyer-conversion sections, tightened meta descriptions (210–231 chars → 120–133), added breadcrumb structured data | Page-by-page SEO review found meta descriptions past Google's practical truncation point |
| 9 Aug 2026 | Catalogued (not published) MOQ/shipping/lead-time/documents/capacity gaps; researched (not acted on) off-site authority opportunities | Buyer-conversion gap analysis and a "why trust this domain" review |

## Cycle 1 — 9 August 2026

**GSC performance**: 5 total impressions, 0 clicks, 0% CTR, average
position 4.8 (all attributed to 8 Aug — Performance data lags 1–2 days).
One query: "borga food" (2 impressions). Only `/` has any impressions.
Sitemap: **12 discovered pages** (up from 7), last read 9 Aug — confirms
the same-day resubmission (recorded in `docs/GSC_INDEXING_AUDIT.md`
checkpoint 2) was picked up. Indexing report still processing. No manual
actions, no security issues.

**Target-keyword tracking**: none of the 4 priority keywords ("fufu
flour Ghana," "gari supplier Ghana," "banku mix export," "African food
distributor Ghana") have any GSC impressions yet. Expected at this
stage — recorded as the starting line, not a gap.

**Competitor visibility** (full findings in
`docs/GROWTH_MONITORING_FRAMEWORK.md`'s keyword tracker table):
identified real, named competitors for the first time — Neat Foods and
Selasie Farms (fufu), MEDDR & Co., The Gari Boutique, and Gafaco Farms
(gari), Praise Export Services (banku mix), Wigmore Trading and Kwatsons
(general African food distribution). Notable pattern: certification
(HACCP/FDA) appears repeatedly among named competitors' visible
identity; "fufu flour" and "banku mix export" as literal phrases surface
more consumer/diaspora retail than B2B trade content, a possible — not
confirmed — sign of lighter B2B-specific competition on those exact
terms.

**Decisions made this cycle**: none met the decision rule in
`docs/GROWTH_MONITORING_FRAMEWORK.md` §4 — no GSC data yet exists for
any tracked keyword, and the competitor findings support (but don't by
themselves justify acting on) two already-logged, still-pending items:
`docs/COMMERCIAL_INFO_DECISION_RECORD.md`'s certification row, and
`docs/OFFSITE_AUTHORITY_BUILDING_PLAN.md`'s GEPA registration
recommendation. Both noted above as reinforced, not newly decided.

**Next cycle**: check whether the 5 product pages and `/wholesale`/`/export`
have started accumulating impressions now that they're in the sitemap;
check whether the Indexing report has populated; extend the competitor
search to "cassava flour Ghana" and "kokonte export" (not yet checked).
