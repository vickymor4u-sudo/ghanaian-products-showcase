# BorgaFoods Search Growth Monitoring System

Status: **Established 9 August 2026.** This is the repeatable process —
stable, updated only when the process itself changes. Dated results from
running it live in `docs/GROWTH_TRACKING_LOG.md`. Read that file for
current numbers; read this one for how to reproduce them.

## Purpose

Earlier phases each did a one-time audit (`docs/GSC_INDEXING_AUDIT.md`,
`docs/SEARCH_INTELLIGENCE_FRAMEWORK.md`,
`docs/BUYER_CONVERSION_GAP_ANALYSIS.md`). This system exists so the next
check-in is a repeat of a defined procedure, not a fresh investigation —
run the same 4 checks below, append one dated entry to the tracking log,
and only change the website when a check produces real evidence, not a
hunch.

## Cadence

**Monthly**, matching the recurring "Growth Audit" cadence already
recommended in `docs/SEO_FOUNDATION.md`. Search Console data moves
slowly for a low-traffic B2B site — weekly checks would mostly show
noise, and this site's traffic doesn't yet justify more frequent review.

## The 4 checks, each cycle

### 1. Google Search Console performance

Visit, in order:
- **Sitemaps** (`search.google.com/search-console/sitemaps`) — record discovered-page count and last-read date. If last-read predates a recent sitemap change, resubmit (a routine action, not a content change — see `docs/GSC_INDEXING_AUDIT.md` checkpoint 2 for the precedent).
- **Performance → Search results** — record total clicks, impressions, average CTR, average position, and the full Queries table (not just the top row — a new query appearing at all is itself a signal this early).
- **Performance → Pages** — record which URLs have any impressions. At launch, only `/` had any; watch for the 5 product pages and `/wholesale`/`/export` to start appearing.
- **Indexing** (`search.google.com/search-console/index`) — once it moves past "processing," record indexed vs. excluded counts and reasons for any exclusion.
- **Manual actions** and **Security issues** — confirm both still show "No issues detected."

### 2. Target-keyword tracking

Check GSC's Queries table (above) specifically against the tracked
keyword list in §"Keyword opportunity tracker" below. For each keyword
with real GSC data (impressions > 0), record impressions, clicks, and
position in the tracker. For keywords still at zero, leave as-is —
absence of data is not evidence of failure this early, just "not yet
observed."

### 3. Competitor visibility

For each keyword in the tracker, a live web search for the exact phrase
shows who currently has visibility for it — not a GSC feature, but the
external half of "why should Google trust this domain" that
`docs/OFFSITE_AUTHORITY_BUILDING_PLAN.md` raised. Record: which named
competitors/domains appear, and any pattern worth noting (e.g. "most
results are consumer retail, not B2B" — a real, useful finding from the
first run, see the tracking log's baseline entry). This is genuinely
repeatable — the same 4 (or more, as the tracker grows) search queries,
run again, produce a comparable snapshot each cycle.

### 4. Structural-change decision rule

Before recommending or making any change to the website based on a
cycle's findings, apply this test — the same discipline established in
`docs/PUBLIC_CLAIM_VERIFICATION_AUDIT.md` and every phase since:

- **Is there real GSC data behind this**, not a hunch? (e.g. "a page has
  impressions but zero clicks and a bad average position" is data;
  "this page probably needs more content" without a number behind it is
  not.)
- **Does the change touch a public claim or new capability?** If yes,
  it needs the same audit-then-approve treatment as
  `docs/PUBLIC_CLAIM_VERIFICATION_AUDIT.md` — draft, don't apply
  directly.
- **Is it a page/architecture change** (new page, restructuring
  `/products`, etc.)? Treat it like
  `docs/SEO_CONTENT_ARCHITECTURE.md` — a design decision to record and
  flag, not something to build same-session without confirming it's
  warranted.
- If a finding doesn't clear this bar, log it in the tracking log as an
  observation, not an action — most early cycles will produce more
  observations than actions, and that's correct, not a failure of the
  system.

## Keyword opportunity tracker

Living table — update in place each cycle, don't duplicate rows. Seeded
from `docs/SEARCH_INTELLIGENCE_FRAMEWORK.md`'s categories plus the 4
priority queries from the Search Intelligence & Buyer Acquisition phase.

| Keyword | Target page | Priority | GSC impressions (latest) | GSC position (latest) | Competitor visibility (latest check) |
| --- | --- | --- | --- | --- | --- |
| fufu flour Ghana | `/products/fufu-flour` | High | 0 (none yet) | — | Mostly diaspora/consumer retail (African Food Supermarket, Afayi, African Food Market); named B2B exporters found: Neat Foods, Selasie Farms (HACCP-certified) |
| gari supplier Ghana | `/products/gari` | High | 0 (none yet) | — | Strong B2B presence already: MEDDR & Co., The Gari Boutique (FDA-certified), Gafaco Farms (FDA-approved), GEPA directory (reportedly 47 registered producers) |
| banku mix export | `/products/banku-mix` | Medium | 0 (none yet) | — | Named exporter: Praise Export Services Ltd; otherwise dominated by diaspora retail (Etsy, Amazon UK, several African grocery sites) — B2B-specific content looks thin here |
| African food distributor Ghana | `/wholesale`, `/export-solutions` | High | 0 (none yet) | — | Established competitors: Wigmore Trading, Kwatsons (both explicitly Ghana/West-Africa-focused wholesale distributors) |
| borga food *(observed, not originally tracked)* | `/` | — | 2 (9 Aug) | not yet reported | — |
| cassava flour Ghana | `/products/cassava-flour` | Medium | 0 (none yet) | — | Not yet checked — add to next cycle's competitor search |
| kokonte export | `/products/kokonte` | Medium | 0 (none yet) | — | Not yet checked — add to next cycle's competitor search |

**First-cycle observations worth carrying forward** (logged, not acted
on — none clears the decision rule in §4 yet, all need more data or a
business decision first):
- Certification appears repeatedly as a visible differentiator among
  named gari/fufu competitors (HACCP, FDA). This doesn't change
  anything on its own, but it's a real, external data point supporting
  why `docs/COMMERCIAL_INFO_DECISION_RECORD.md`'s certification row is
  worth prioritizing if BorgaFoods has something beyond the current
  "Ghana FDA registered facilities" to add.
- "Banku mix export" and "fufu flour" (as literal phrases) currently
  surface more consumer/diaspora retail than B2B trade content — a
  possible sign of *less* competition for genuine B2B search intent on
  these terms specifically, though this is one search snapshot, not a
  volume-validated conclusion.
- GEPA's directory surfaced independently across multiple competitor
  searches (fufu and gari) — external corroboration, not just this
  repository's own assessment, that GEPA registration
  (`docs/OFFSITE_AUTHORITY_BUILDING_PLAN.md` Tier 1) is real,
  functioning infrastructure buyers and search engines both already
  route through.

## Related documents

- `docs/GROWTH_TRACKING_LOG.md` — dated results of running this framework.
- `docs/SEARCH_INTELLIGENCE_FRAMEWORK.md` — the original keyword/category strategy this tracker operationalizes.
- `docs/GSC_INDEXING_AUDIT.md`, `docs/COMMERCIAL_INFO_DECISION_RECORD.md`, `docs/OFFSITE_AUTHORITY_BUILDING_PLAN.md` — prior-phase outputs this system continues to track against.
