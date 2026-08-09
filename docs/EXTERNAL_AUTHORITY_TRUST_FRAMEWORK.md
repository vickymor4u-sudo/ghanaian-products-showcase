# External Authority & Buyer Trust Framework

Status: **Preparation complete. No account created, no registration
submitted, no external claim made.** Extends
`docs/OFFSITE_AUTHORITY_BUILDING_PLAN.md` (which named the
opportunities) with what each one actually requires, what's already
prepared and ready, and what only BorgaFoods can supply or do. Draft
reusable text is in `docs/COMPANY_PROFILE_DRAFT.md`.

## Why this exists, in one sentence

The website itself is no longer the limiting factor — `docs/GSC_INDEXING_AUDIT.md`,
`docs/GROWTH_MONITORING_FRAMEWORK.md`, and the competitor research
in `docs/GROWTH_TRACKING_LOG.md` all point the same direction: a
brand-new domain with no external presence has nothing to signal trust
with yet, however well the site itself is built. This document is the
readiness check for closing that gap.

## Prerequisite — resolved

~~Does `export@borgafoods.com` actually receive mail today?~~
**Confirmed operational, 9 August 2026.** The mail-deliverability
prerequisite this section originally flagged is resolved — LinkedIn
setup and application forms below can rely on this address.

~~New prerequisite found in its place: a GEPA export-registration
certificate was supplied... current renewal status unconfirmed.~~
**Resolved, 9 August 2026.** BorgaFoods confirmed the GEPA renewal for
Registration No. GEPA2018800113 is completed and current — see
`docs/GEPA_CREDIBILITY_SECTION_PROPOSAL.md` for the confirmation record
and its precise limits (no new expiry date or renewed certificate is on
file; only the confirmed-current status is used anywhere below).

## 1. LinkedIn company profile

**What's ready now** (see `docs/COMPANY_PROFILE_DRAFT.md` for full
text):
- Tagline (119 characters, fits the 120-character limit)
- About section (~1,050 characters, fits the 2,000-character limit)
- All fielded facts: legal name, brand name, founding year, both
  locations, website, public email, phone numbers, product range,
  certification

**What only BorgaFoods can supply**:
- A logo file (300×300px minimum, square, legible at icon size)
- A cover/banner image (1128×191px)
- Company size band (LinkedIn asks for an employee-count range —
  nothing in the codebase records this)
- A personal LinkedIn profile at least 7 days old with some activity,
  to actually create the page under (LinkedIn's own requirement)

**Package finalized**: see `docs/LINKEDIN_COMPANY_PAGE_PACKAGE.md` for
the exact tagline, About text, specialties, and field values, ready to
paste in once the assets above exist.

**What this repository will do once the page exists**: update
`client/src/components/Footer.tsx`'s LinkedIn link (currently the
generic `https://linkedin.com`, not a real profile) and the
`Organization` schema's `sameAs` field
(`client/src/components/SchemaMarkup.tsx`) to point at the real page —
a small, safe code change with no new claim, since it only links to an
entity BorgaFoods itself will control. Flagged as a follow-up once the
URL exists, not built speculatively now.

**Priority**: highest — no third-party approval process, no waiting on
an external organization, only needs BorgaFoods' own assets and a
few minutes of setup.

## 2. GEPA export registration — resolved, 9 August 2026

**Registration confirmed current.** BorgaFoods confirmed the GEPA
renewal for Registration No. GEPA2018800113 (Supply and Demand
Worldwide Limited) is completed. Full confirmation record, including
exactly what is and isn't established by it (no new expiry date or
renewed certificate on file — only the confirmed-current status), is in
`docs/GEPA_CREDIBILITY_SECTION_PROPOSAL.md`.

**What's ready now**: the finalized GEPA credibility wording
(Option A) in `docs/GEPA_CREDIBILITY_SECTION_PROPOSAL.md`, applied to
`docs/COMPANY_PROFILE_DRAFT.md`, `docs/LINKEDIN_COMPANY_PAGE_PACKAGE.md`,
`docs/LINKEDIN_LAUNCH_CHECKLIST.md`, `docs/EXPORTER_PROFILE_ONE_PAGER.md`,
and `docs/EXPORTER_PROFILE_FINAL.md`. **Not yet applied to the live
website** — see `docs/WEBSITE_TRUST_ENHANCEMENT_PLAN.md` for the exact
candidate locations and proposed wording, not yet implemented.

**Why it matters**: GEPA's exporter directory surfaced independently in
multiple competitor searches during the Growth Monitoring cycle (see
`docs/GROWTH_TRACKING_LOG.md`, Cycle 1) — real, external confirmation
that this is functioning infrastructure buyers and search engines
already route through, not a theoretical opportunity. An already-issued
registration number, once confirmed current, is a stronger and faster
trust signal than starting registration fresh.

**Priority**: raised to highest alongside LinkedIn — confirming an
existing registration is very likely faster than the original
application process, and unlocks real content across 3 of this
document's 4 deliverables (`docs/GEPA_CREDIBILITY_SECTION_PROPOSAL.md`,
`docs/EXPORTER_PROFILE_ONE_PAGER.md`, and an addition to
`docs/LINKEDIN_COMPANY_PAGE_PACKAGE.md`'s About section).

## 3. Industry association opportunities — membership process, where found

Deeper than the prior phase's list: what each association's actual
application process looks like, based on what's publicly documented.

| Association | Application process found | Fee | Contact |
| --- | --- | --- | --- |
| **AGI** (Association of Ghana Industries) | Download the application form or register online at agighana.org; submit completed form to AGI | Not publicly listed — must ask | membership@agighana.org, +233(0)302779023/4 |
| **FABAG** (Food & Beverages Association of Ghana) | Not publicly documented — no online application found | Not publicly listed — must ask | +233 264978810, fabag.org |
| **GAFEA** (Ghana Assorted Food Stuff Exporters Association) | Not publicly documented independently — GAFEA is affiliated with GROCTEU (Ghana Root Crops and Tubers Exporters Union) and, through it, FAGE | Not publicly listed — must ask | Via GROCTEU (grocteu.org.gh) or FAGE (fageghana.com) |
| **FAGE** (Federation of Associations of Ghanaian Exporters) | Umbrella body — likely joined via a constituent/product association (e.g. GAFEA) rather than directly | Not publicly listed — must ask | fageghana.com |

**Honest limitation**: none of the four publish fees or a fully
self-service application process. All four ultimately require direct
contact — this document does not have real membership-cost or
processing-time figures to report, and does not invent them. The
company-profile text is ready for whichever application form or
conversation happens once BorgaFoods reaches out.

**Priority**: AGI first (has the clearest documented application path
of the four, and the widest name recognition); GAFEA/FAGE next (most
directly relevant to food export specifically, but process is less
clear — likely starts with a phone call); FABAG last only because
process discovery drew a blank, not because it's less relevant — same
priority as GAFEA in practice.

## 4. Priority order (updated 9 Aug 2026)

1. **~~Confirm GEPA registration No. GEPA2018800113 is current~~ — Done, 9 Aug 2026.** Finalized wording is ready in every prepared document; applying it to the live website is the next concrete step (`docs/WEBSITE_TRUST_ENHANCEMENT_PLAN.md`).
2. **LinkedIn company page** — no external dependency, ready to execute today with the finalized package (now including the GEPA line); only needs a logo/cover image and company-size figure from BorgaFoods.
3. **AGI membership** — clearest documented path among the associations.
4. **GAFEA / FAGE / FABAG** — direct outreach (phone/website contact form), company-profile text ready to use whenever that conversation happens.
5. **B2B directory listings** (Tier 3 in `docs/OFFSITE_AUTHORITY_BUILDING_PLAN.md`) — lowest individual impact, reasonable to batch once 1–4 are underway.

## What this repository will do next, once any of the above exists

- **Apply the finalized GEPA wording to `/about`** — the one item from this list that's ready to implement now; candidate locations and exact wording are in `docs/WEBSITE_TRUST_ENHANCEMENT_PLAN.md`, not yet applied.
- Once a LinkedIn page exists: update `client/src/components/Footer.tsx`'s link and the `Organization` schema's `sameAs` field (`client/src/components/SchemaMarkup.tsx`) to point at it — a small, safe, no-new-claim code change either way.

## Related documents

- `docs/OFFSITE_AUTHORITY_BUILDING_PLAN.md` — the original opportunity list this framework operationalizes.
- `docs/COMPANY_PROFILE_DRAFT.md` — the actual draft text referenced throughout.
- `docs/LINKEDIN_COMPANY_PAGE_PACKAGE.md` — the finalized LinkedIn package.
- `docs/GEPA_CREDIBILITY_SECTION_PROPOSAL.md`, `docs/EXPORTER_PROFILE_ONE_PAGER.md` — the two documents held on the GEPA renewal confirmation.
- `docs/COMPANY_NAME_CONSISTENCY_REVIEW.md` — the "Ltd" vs "Limited" naming review prompted by the certificate.
- `docs/SEO_FOUNDATION.md` §7 — the `Organization` schema `sameAs` gap this framework's LinkedIn item resolves.
- `docs/GROWTH_TRACKING_LOG.md` — where GEPA's real-world relevance was independently confirmed via competitor research.
