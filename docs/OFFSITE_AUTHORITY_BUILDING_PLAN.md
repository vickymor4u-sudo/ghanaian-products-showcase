# Off-Site Authority Building Plan

Status: **Research and prioritized plan only. No account created, no
form submitted, no organization contacted.** The website's on-site
technical SEO and content architecture are now ahead of most small
exporters (see `docs/SEO_FOUNDATION.md`, `docs/CONTENT_ARCHITECTURE_IMPLEMENTATION_PLAN.md`,
`docs/PRODUCT_PAGE_OPTIMIZATION_REPORT.md`) — but a brand-new domain with
zero external mentions or backlinks has no trust signal to a search
engine no matter how well-built the site itself is. This document
identifies real, named, currently-active opportunities to build that
signal, verified via web search rather than invented, and is explicit
about what BorgaFoods (not this repository) needs to do to act on each
one.

## Why this repository doesn't act on these directly

Every opportunity below involves at least one of: creating an account,
submitting official business documents (certificates, registration
papers) to a third party, or representing BorgaFoods to an external
organization. These are outside what this repository can do
autonomously — they're business actions with real-world consequences
(a government registration record, a public association listing, a
third-party directory entry), not a code or content change that can be
drafted and reviewed the way the `/about` corrections were. What this
document *can* do: name real options, explain what each involves, and —
if wanted — draft the text BorgaFoods would paste into a given form
(a company description, a product summary) for review before they
submit it themselves.

## Tier 1 — Government-affiliated, highest authority signal

### Ghana Export Promotion Authority (GEPA)

The national export trade support institution under Ghana's Ministry of
Trade and Industry. Offers formal exporter registration and maintains a
buyer-facing exporter directory (`gepa-exportbook.com`).

- **Why it matters**: a `.gepaghana.org`/government-affiliated domain
  listing BorgaFoods is about as strong an authority/trust signal as a
  small exporter can get — both for search engines (an authoritative,
  government-adjacent backlink) and for real buyers using GEPA's own
  directory to find Ghanaian suppliers.
- **What's involved**: formal registration — submitting the GEPA
  registration form plus photocopies of registered business
  certificates; may involve a facility inspection by a Permit-Issuing
  Agency before registration completes. GEPA states this "takes just a
  day or two" with the right documents already in hand.
- **Action needed from BorgaFoods**: register directly at
  [gepaghana.org](https://www.gepaghana.org/getting-started/register-as-an-exporter/).
  This repository cannot submit business certificates on the company's
  behalf.
- **Priority**: highest — do this first.

## Tier 2 — Ghana food-sector trade associations

All four below are real, currently active associations directly
relevant to a Ghanaian food manufacturer/exporter. Membership typically
includes a public member listing/profile page on the association's own
site — each one is an independent, relevant backlink plus real industry
network access, not just an SEO tactic.

| Association | What it is | Relevance |
| --- | --- | --- |
| **GAFEA** (Ghana Assorted Food Stuff Exporters Association) | Formed 1989; represents Ghanaian food exporters specifically | Closest direct match to BorgaFoods' business — food export, not general trade |
| **FABAG** (Food & Beverages Association of Ghana) | Founded 2003; ~100 member businesses across food/beverage manufacturing, importing, wholesale, retail | Directly matches BorgaFoods' manufacturer + wholesale/export profile |
| **FAGE** (Federation of Associations of Ghanaian Exporters) | Umbrella body since 1992 covering non-traditional exports including food items | Broader reach, established since 1992 — useful for general export credibility |
| **AGI** (Association of Ghana Industries) | 1,200+ members across manufacturing sectors including agro-processing (food & beverages) | Largest, most general — still relevant via its agro-processing category, and a very well-known name for buyers researching Ghanaian suppliers |

- **Action needed from BorgaFoods**: apply for membership directly with
  each association of interest. This repository can draft a company
  description or product summary for review if that would help with an
  application, but membership itself has to be requested and paid for
  (where applicable) by the company.
- **Priority**: high — GAFEA and FABAG are the most directly relevant;
  AGI carries the most name recognition.

## Tier 3 — African B2B food-trade directories

Lower authority individually than Tiers 1–2, but low-effort and directly
buyer-facing (these are marketplaces real importers/distributors
actually browse, not just link-building exercises):

- **EFoodsTrade.com** — describes itself as Africa's B2B e-marketplace for food manufacturers, importers, exporters, distributors, and wholesalers.
- **Africa Business Directory** (`africa-business.com`) — general African business directory with a dedicated foodstuff-importers category.
- **AFROTRADE** (`food.afrotrade.net`) — free B2B membership directory for African food/agriculture trade.
- **Foodstuff Africa B2B Portal** — directory of food-sector businesses across African countries.

- **Action needed from BorgaFoods**: create a free (or paid, where
  offered) listing on whichever of these look active and well-trafficked
  once reviewed directly — this repository has not verified current
  traffic/activity levels for each, only that they exist and are
  food-trade-focused.
- **Priority**: medium — worth doing, but lower individual impact than
  Tiers 1–2; reasonable to batch these once the higher-tier items are
  underway.

## Tier 4 — Owned presence (zero cost, entirely within BorgaFoods' control)

**LinkedIn Company Page — the single highest-value, lowest-effort item
on this whole list.** This connects directly to an already-documented
gap: `client/src/components/Footer.tsx` currently links to the generic
`https://linkedin.com` (not a real company page), and
`docs/SEO_FOUNDATION.md` §7 already flagged that the `Organization`
structured-data schema's `sameAs` field is a no-op for the same
reason — it has no real external profile to point to.

- **Why it matters**: a real, active LinkedIn company page is (a) free, (b) entirely within BorgaFoods' own control with no third-party approval needed, (c) the single missing input that would let this repository fix the already-identified `sameAs` schema gap, and (d) itself a credibility signal — B2B buyers routinely check a supplier's LinkedIn presence before engaging.
- **Action needed from BorgaFoods**: create the company page directly (this repository cannot create or manage a LinkedIn presence on the company's behalf). Once it exists, share the URL — updating the footer link and the `Organization` schema's `sameAs` field to point at the real page is then a small, safe code change with no business-claim risk, since it's linking to an entity BorgaFoods itself controls.
- **Priority**: highest-value-per-effort — no third-party dependency, no waiting on an external organization's process.

## Summary priority order

1. **LinkedIn company page** (Tier 4) — zero cost, no external dependency, unblocks an already-known schema gap.
2. **GEPA registration** (Tier 1) — highest authority signal, real buyer-directory exposure.
3. **GAFEA / FABAG membership** (Tier 2) — most directly relevant trade associations.
4. **AGI / FAGE membership** (Tier 2) — broader reach, strong name recognition.
5. **B2B directory listings** (Tier 3) — batch once the above are underway.

## Related documents

- `docs/SEO_FOUNDATION.md` §7 — the original `Organization` schema `sameAs` finding this plan's Tier 4 item resolves.
- `docs/GSC_INDEXING_AUDIT.md` — where the resulting authority/trust improvement would eventually show up as better average position, once Google has enough data to reflect it.
