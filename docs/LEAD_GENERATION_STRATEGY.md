# BorgaFoods Lead Generation Strategy

Status: **Audit complete; safe improvements implemented, validated,
deployed to production, and verified live.** Companion document:
`docs/LEAD_GENERATION_CHANGE_REPORT.md` (every implemented change, its
reason, and its validation). This document is the audit itself — the
baseline, what it found, what changed, and what's still open.

The mission's own framing is the test every finding and every change
below was held to: **not traffic growth, but more qualified buyer
enquiries** — importers, distributors, wholesalers, supermarkets,
food-service companies, and approved private-label prospects. If a
possible change couldn't answer "how does this increase qualified
buyer enquiries," it isn't in this document as something done.

---

## Baseline assessment

### What already existed (confirmed, not assumed)

Read every live page and the relevant code before forming any opinion.
The foundation described in the mission brief is real, not aspirational:

- **Technical SEO**: `functions/_middleware.ts` injects canonical tags
  and correct 404/`noindex` handling at the edge; `_routes.json` +
  `_headers` (added in the immediately prior phase) route HTML pages
  through that middleware while static assets bypass it for native
  Cloudflare caching.
- **Structured data**: `Organization`, `Product`, and `BreadcrumbList`
  JSON-LD were already live on the relevant pages
  (`client/src/components/SchemaMarkup.tsx`).
- **BPIP governance**: `shared/productIntelligence/publishedRegistry.ts`
  is the single source of truth for product data, private-label
  eligibility, and RFQ allowlisting — verified again this session (see
  `docs/PERFORMANCE_AUDIT.md`'s bundle analysis) that internal-only
  candidate data never reaches the client bundle.
- **RFQ workflow**: `functions/api/export-quote.ts` — Zod-validated,
  Turnstile-protected, single internal Resend notification with buyer
  `Reply-To`, no CRM/database, 51 passing tests before this phase.
- **GEPA credibility**: confirmed current by BorgaFoods and already
  live on `/about` and `/export`, always attributed to Supply and
  Demand Worldwide Limited, never to "BorgaFoods" as a brand (see
  `docs/GEPA_CREDIBILITY_SECTION_PROPOSAL.md`).
- **Site performance**: the previous phase fixed the two dominant
  performance issues (full-page-reload navigation, missing static-asset
  caching) — confirmed with real before/after measurements
  (`docs/PERFORMANCE_AUDIT.md`).

None of this needed to be rebuilt. The question for this phase was
narrower: **given all of that is real and working, where does the
buyer journey still leak, and what can be fixed without a business
decision, a missing asset, or a governance change?**

### Live signal check — Google Search Console (9 August 2026)

Checked directly, not estimated:

| Metric | Value |
| --- | --- |
| Indexed pages | **3 of 12** known public routes (`/`, `/about`, `/export`) |
| Not indexed | 0 (the other 9 are simply not yet crawled — no rejection, no error) |
| Sitemap | 12/12 URLs discovered, last read same day, status Success |
| Total impressions (lifetime) | 5 |
| Total clicks | 0 |
| Average position | 4.8 |
| Queries with any data | 1 ("borga food," 2 impressions) |
| Structured-data enhancements reported | None yet (consistent with most pages not yet crawled) |

**Honest read of this data**: the site is too young (roughly two weeks
of indexed history) for keyword-opportunity analysis to be meaningful
yet. None of the 5 product pages, `/products`, `/wholesale`,
`/export-solutions`, or `/contact` have been crawled at all. This
matches `docs/GROWTH_TRACKING_LOG.md` Cycle 1's own conclusion — real
keyword data doesn't exist yet to optimize against. **The correct
response to this is not to invent content for search volume** (the
mission explicitly rules that out) — it's to make sure every page is
in the best possible state *before* Google finishes crawling it, so
the buyer-intent signals are already in place when it does. That
framing is what the rest of this audit is built around.

`docs/GROWTH_TRACKING_LOG.md` Cycle 1 also already identified 4
priority commercial-intent keywords ("fufu flour Ghana," "gari
supplier Ghana," "banku mix export," "African food distributor
Ghana") and named real competitors, several of whom visibly lead with
certification as a trust signal — directly relevant to the GEPA-signal
gap this phase closed (see below).

### The buyer journey, page by page — what was found

**Homepage (`Home.tsx`)**: already communicates who BorgaFoods is,
what's manufactured, and who the target buyers are ("distributors,
wholesalers, importers, retailers, restaurants, and food-service
buyers" — in the hero itself). **Gap found**: zero trust/credibility
signal anywhere on the page — no mention of the confirmed GEPA
registration, even though it's live on `/about` and `/export`. For a
page that's the most likely first landing point from search, this was
a real, closable gap.

**Product pages (`ProductDetail.tsx`)**: clear product identity,
packaging, buyer personas, and an FAQ block already built from real
BPIP fields. **Gap found**: the FAQ — the most buyer-intent-relevant
content on the page — had no structured-data markup, meaning no
FAQ-rich-snippet eligibility in search results. Also no export-registration
trust signal, same gap as the homepage.

**Export pages (`ExportCompliance.tsx`, `ExportSolutions.tsx`)**:
already carefully hedged, GEPA-credentialed (`/export`), and clear
about the 5-step process. `docs/BUYER_INTENT_CONTENT_AUDIT.md` (an
earlier phase) had already flagged that `/export` describes process
without a single concrete detail (port, Incoterm, document type) —
re-confirmed this session, and re-confirmed it's a deliberate,
defensible choice (nothing is published that could be wrong for a
specific buyer) rather than an oversight. Not changed — see "Remaining
opportunities."

**Wholesale page (`Wholesale.tsx`)**: strong persona coverage (4 buyer
types named explicitly), clear private-label scope, clear enquiry
guidance. **Gap found** (matching `docs/BUYER_INTENT_CONTENT_AUDIT.md`'s
distributor finding): a distributor evaluating fit on this exact page
had no visibility into BorgaFoods' actual geographic footprint (Ghana +
China) — that fact only existed on `/about`, a page the distributor
persona wasn't necessarily reading.

**Contact/RFQ (`Contact.tsx`, `shared/exportQuote.ts`,
`functions/api/export-quote.ts`)**: the most consequential finding of
this audit. Read the actual Zod schema rather than assuming: **every
inquiry type, including the unlabeled default "general business
inquiry," required an exact product selection and an exact quantity
before the form would submit** — even for a buyer who just wants to
ask a question. This is real, code-confirmed friction sitting directly
between a curious visitor and their first contact with BorgaFoods, and
it's exactly the kind of thing the mission asked to find ("Is the form
too difficult?").

### Buyer trust review

Checked every trust claim against `BUSINESS_RULES.md`,
`PRODUCT_CAPABILITY_MODEL.md`, and `PUBLIC_PRODUCT_PRESENTATION_RULES.md`:
GEPA wording (already live) is correctly scoped to Supply and Demand
Worldwide Limited, never BorgaFoods the brand; no supplier information
appears anywhere; no certification beyond Ghana FDA and GEPA is
claimed; PCR-002 (Red Palm Oil) remains fully excluded. Nothing found
that needed correcting — this is a sign the prior phases' discipline
held, not a gap this phase had to fix.

### Buyer outreach support review

`docs/BUYER_TARGETING_FRAMEWORK.md`, `docs/BUYER_OUTREACH_TEMPLATES.md`,
`docs/EXPORTER_PROFILE_FINAL.md`, and `docs/LINKEDIN_LAUNCH_CHECKLIST.md`
are all current and internally consistent with the live site's GEPA
status and BPIP's actual private-label scope (Fufu Flour only —
correctly still gated pending the separate, not-yet-approved BPIP
change reviewed in `docs/PRIVATE_LABEL_SCOPE_CONSISTENCY_REVIEW.md`).
No changes needed here; the website changes in this phase (GEPA on the
homepage, FAQ trust entry) make the site a slightly stronger landing
target for buyers who've already received outreach, which is the
"what do buyers need after first contact" question the mission asked
about.

### Analytics and measurement review

`client/src/lib/analytics.ts` is already a genuine no-op until a real
GA4 Measurement ID is configured (external account action, not
something this repository can do). A `generate_lead` conversion event
already fires on every successful RFQ submission with two
non-identifying params (`inquiry_type`, `product_slug`) — already
answers "which products generate interest" and "which enquiries are
valuable" (by inquiry type) the moment GA4 is turned on. **No new
tracking was added** — the existing setup already answers the
questions the mission asked, and the mission explicitly says to avoid
unnecessary tracking.

---

## Improvements made this phase

Full detail, reasoning, and validation for each in
`docs/LEAD_GENERATION_CHANGE_REPORT.md`. Summary:

1. **RFQ form friction fix** — `productSelection` and
   `estimatedQuantity` are now optional specifically for the "general
   business inquiry" type; every other inquiry type is unchanged.
2. **GEPA trust signal added to the homepage** (`Home.tsx`) and **as a
   new FAQ entry on every product page** (`ProductDetail.tsx`) — exact
   wording already approved and live elsewhere, no new claim.
3. **FAQPage structured data** added (`SchemaMarkup.tsx`,
   `ProductDetail.tsx`) — the same FAQ text already visible on the
   page, now marked up for rich-snippet eligibility.
4. **Distributor geographic-coverage gap closed** on `/wholesale` —
   the existing Ghana/China operational-presence fact, cross-referenced
   where a distributor would actually be reading it.

All four were validated (typecheck, all 4 build guards, full test
suite including 2 new RFQ tests, production build) and verified live on
both a Cloudflare preview deployment and production
(`www.borgafoods.com`) before being considered done.

---

## Remaining opportunities (not implemented — reasons given)

Every item below was considered and deliberately not acted on, with the
specific reason it fell outside this phase's authority or evidence:

| Opportunity | Why not done now |
| --- | --- |
| Publish MOQ, shipping mode, lead time, specific export document types, production capacity | Business decision — `docs/COMMERCIAL_INFO_DECISION_RECORD.md` remains entirely unfilled; this repository has no visibility into the real figures |
| Add illustrative Incoterms/port detail to `/export` | `docs/BUYER_INTENT_CONTENT_AUDIT.md`'s own finding: a business/legal call about how much to commit to in writing, not a content gap this repository can close unilaterally |
| A downloadable company/export-overview PDF on the site | Blocked on a missing asset — no logo or brand imagery exists in this repository (same gap flagged for LinkedIn); `docs/BUYER_PACKAGE_STRUCTURE.md` already tracks this |
| An explicit response-time commitment ("we reply within X business days") | Business decision — no actual commitment exists to state; `/contact` already shows business hours, which is as far as this repository can honestly go |
| Broaden private-label scope beyond Fufu Flour | Explicitly a separate, already-reviewed, not-yet-approved technical change — `docs/PRIVATE_LABEL_SCOPE_CONSISTENCY_REVIEW.md` is the impact analysis, deliberately not combined with this phase per the business's own sequencing instruction from the prior phase |
| Route-based code splitting, image format/responsive sizing, `Contact.tsx` full re-render fix | Carried over, unimplemented, from `docs/PERFORMANCE_AUDIT.md`'s fix list — genuinely separate work, not part of this phase's scope |
| Request indexing for the 5 unindexed product pages via GSC's URL Inspection tool | Attempted; the tool's inspect-URL input did not reliably respond to automated interaction this session. Not a blocker — the sitemap is healthy (12/12 discovered) and Google will crawl in due course; flagged here as a manual follow-up worth 10 minutes of human time in GSC directly |
| Rewrite headlines/copy purely to chase additional keyword volume | Explicitly ruled out by the mission ("Do not create content purely for SEO volume. Prioritize commercial intent") — every content change made this phase was trust- or friction-driven, not a volume play |

---

## Measurement plan

**What can be measured today, without GA4**:
- GSC Performance report (impressions, queries, average position) —
  check monthly per `docs/GROWTH_MONITORING_FRAMEWORK.md`'s existing
  cadence. Watch specifically for the 3 newly-indexed pages plus
  whichever of the remaining 9 get crawled next, and whether any of the
  4 priority keywords from `docs/GROWTH_TRACKING_LOG.md` start
  accumulating impressions.
- GSC Indexing report — track the 3-of-12 baseline recorded here;
  meaningful movement (5+, 8+, all 12) is itself a signal worth a dated
  `docs/GROWTH_TRACKING_LOG.md` entry.
- Manual RFQ volume — the internal Resend notification inbox is
  already the ground truth for enquiry count and quality; no dashboard
  needed to see whether general-inquiry submissions start arriving now
  that the form permits them.

**What activating GA4 would add** (still blocked on an external
account BorgaFoods would need to create):
- `generate_lead` event volume and `inquiry_type`/`product_slug`
  breakdown — directly answers "which products generate interest" and
  "which enquiries are valuable," already instrumented and waiting.
- Landing-page and referrer data — directly answers "where do buyers
  come from" and "which pages convert."
- Nothing further needs to be built for this — activation, not
  engineering, is what's blocking it.

**What this phase's own changes should be checked against next
cycle**: whether the general-inquiry RFQ path sees any submissions at
all (a real behavior signal this repository couldn't have had before
today, since the path was previously too restrictive to use for its
intended purpose), and whether GSC starts showing impressions for
`/about` or `/` on GEPA/credibility-adjacent queries now that the
signal exists on more pages.

## Related documents

- `docs/LEAD_GENERATION_CHANGE_REPORT.md` — every change, reasoning, and validation in detail.
- `docs/PERFORMANCE_AUDIT.md` — the site-speed foundation this phase built on, including the still-open fix list.
- `docs/GROWTH_MONITORING_FRAMEWORK.md`, `docs/GROWTH_TRACKING_LOG.md` — the recurring GSC/keyword review process this phase's GSC baseline feeds into.
- `docs/BUYER_INTENT_CONTENT_AUDIT.md` — source of the distributor geographic-coverage and `/export` specificity findings.
- `docs/COMMERCIAL_INFO_DECISION_RECORD.md` — the business decisions still gating several remaining opportunities.
- `docs/PRIVATE_LABEL_SCOPE_CONSISTENCY_REVIEW.md` — the separate, deliberately-not-combined private-label scope question.
