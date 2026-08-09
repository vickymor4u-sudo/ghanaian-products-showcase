# GEPA / Export Credibility Section — Proposal

Status: **Resolved and finalized, 9 August 2026. Option A's wording
below is now the approved text for `/about`, the company profile, and
LinkedIn.** This document previously held an open question about
renewal status; that question is now closed per the confirmation record
below. It remains a proposal in the sense that no website code has been
changed yet — that's a separate, small implementation step tracked in
`docs/WEBSITE_TRUST_ENHANCEMENT_PLAN.md`, not done as part of this
document.

## Resolution record

**What was previously unresolved**: the supplied certificate showed
Supply and Demand Worldwide Limited's GEPA registration
(No. GEPA2018800113) with a printed Date of Expiry of 26 February 2019
and an annual-renewal requirement, with no independent public
confirmation of current status.

**What resolved it, 9 August 2026**: BorgaFoods confirmed directly that
the GEPA renewal for registration No. GEPA2018800113 is completed and
the registration is current.

**What this confirmation does and does not establish, precisely**:

- It establishes that Registration No. GEPA2018800113 (the same number
  on the original 2018 certificate) is, per BorgaFoods' own confirmation,
  currently active.
- It does **not** establish a new expiry date, a new certificate number,
  or a specific renewal date — **no renewed certificate or written GEPA
  confirmation has been supplied to this repository**, so none of those
  specifics are stated anywhere in this project's documentation or on
  the website. Every reference below uses only the original registration
  number and 2018 issue date, exactly as the source certificate shows.
- If a renewed certificate or written GEPA confirmation becomes
  available later, it should be used to add those specifics (a current
  expiry date, a renewal date, or a distinct new certificate number, if
  any) — this repository will update the wording below the moment that
  document exists, rather than inferring or guessing at any of it now.

This is the same evidentiary standard applied throughout this project:
a business-supplied operational fact (compare: `export@borgafoods.com`
being confirmed operational, accepted directly from BorgaFoods without a
supporting document) is treated differently from — and here, deliberately
kept separate from — specific new factual details that only a document
can establish.

## Entity separation — Supply and Demand Worldwide Limited vs. BorgaFoods

Unchanged by this resolution, and still the wording discipline every
version of this section follows:

- **Supply and Demand Worldwide Limited** is the legal entity that
  holds the GEPA registration. GEPA registers exporters as legal
  entities, not as trade names — so any GEPA credibility statement is
  necessarily a statement about this Ltd, not about "BorgaFoods" as a
  brand.
- **BorgaFoods** (and specifically **BorgaFoods Processing**, the
  manufacturing entity named in `BUSINESS_RULES.md`) is the trading
  brand under which Supply and Demand Worldwide Limited operates. This
  relationship is already established and live (`/about`,
  `docs/COMPANY_NAME_CONSISTENCY_REVIEW.md`) — nothing new is being
  claimed here.

Option A below names the Ltd as the GEPA-registered party, with the
BorgaFoods brand relationship stated separately rather than merged into
a single "BorgaFoods is GEPA-registered" sentence, which would blur a
legal-entity fact into a brand fact.

## Supporting evidence on file (still not a basis for any public claim)

Unchanged by this resolution: the two Ghana Tree Crops Development
Authority documents reviewed 9 August 2026 (tracked, redacted, in
`docs/EXPORT_EVIDENCE_MATRIX.md`) still do not name Supply and Demand
Worldwide Limited or BorgaFoods, still cannot support any claim about
this company's own registration status with any authority, and one of
them still intersects the PCR-002 (Red Palm Oil) exclusion. This
resolution is about the GEPA certificate specifically — it does not
change either of those documents' status.

## Finalized wording — Option A (now approved for use)

For `/about`, positioned near the existing "Key Facts" panel:

> **Registered Exporter**
> Supply and Demand Worldwide Limited is registered with the Ghana
> Export Promotion Authority (GEPA) as a commercial exporter
> (Registration No. GEPA2018800113).

For the company profile / LinkedIn About section, one sentence:

> Registered commercial exporter with the Ghana Export Promotion
> Authority (GEPA), Registration No. GEPA2018800113.

This wording deliberately states registration as a present-tense fact
without naming a specific expiry or renewal date — matching exactly
what's confirmed (current, active registration) without adding any
detail that isn't confirmed (a specific date).

## Option B — retired

The conservative, historical-fact-only fallback ("first registered... in
2018") is no longer needed now that current status is confirmed, and is
retired rather than kept as an active alternative. Recorded here only
so the reasoning trail isn't lost: it existed specifically to avoid
implying current standing while that was unconfirmed — a concern Option
A's finalized wording above no longer carries.

## What this repository has done as a result

Applied Option A's wording to:
- `docs/COMPANY_PROFILE_DRAFT.md`'s field-by-field fact table
- `docs/LINKEDIN_COMPANY_PAGE_PACKAGE.md`'s About section
- `docs/LINKEDIN_LAUNCH_CHECKLIST.md`
- `docs/EXPORTER_PROFILE_ONE_PAGER.md` and `docs/EXPORTER_PROFILE_FINAL.md`
- `docs/EXTERNAL_AUTHORITY_TRUST_FRAMEWORK.md`
- `docs/EXPORT_EVIDENCE_MATRIX.md` (row 1)

**Not yet applied to the live website** — `/about`'s actual page copy
is unchanged as of this document. Candidate locations and exact proposed
wording for the website itself are in
`docs/WEBSITE_TRUST_ENHANCEMENT_PLAN.md`, following the same
draft → review → apply → verify-live pattern as every prior claim change
in this project (`docs/PUBLIC_CLAIM_VERIFICATION_AUDIT.md` is the
precedent) — applying it to the live site is a separate step requiring
its own review, not folded into this document.

## Related documents

- `docs/WEBSITE_TRUST_ENHANCEMENT_PLAN.md` — where this finalized wording is proposed for actual website placement, not yet implemented.
- `docs/EXPORTER_PROFILE_FINAL.md` — the finalized buyer-facing PDF content using this wording.
- `docs/EXPORT_EVIDENCE_MATRIX.md` — where the two supplier/partner credentials reviewed 9 Aug 2026 are tracked (redacted), including the PCR-002 flag on one of them — unaffected by this resolution.
- `docs/COMPANY_NAME_CONSISTENCY_REVIEW.md` — why "Supply and Demand Worldwide Limited" (not "Ltd") is used above.
- `docs/BUSINESS_RULES.md` — "Do not publish... certifications... without current approval" — satisfied here by BorgaFoods' direct confirmation, recorded above with its exact scope and limits.
