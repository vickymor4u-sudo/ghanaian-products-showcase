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

## Prerequisite to check first

**Does `export@borgafoods.com` actually receive mail today?** It's
already the approved, publicly displayed enquiry address
(`shared/exportQuote.ts`), but `BUSINESS_RULES.md`'s export-workflow
section notes a temporary Gmail is used as the *server-side delivery
recipient* "until BorgaFoods regains the required domain DNS access" —
which suggests the `borgafoods.com` domain's own mail routing may not
be fully operational yet. LinkedIn's company-page verification
specifically requires a working company-domain email (not Gmail/Yahoo),
and GEPA/association applications will likely also expect one. **Confirm
this works before relying on it for any of the verification steps
below** — this repository has no way to test mail delivery to that
address itself.

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
- A verified company-domain email for setup (see Prerequisite above)
  and a personal LinkedIn profile at least 7 days old with some
  activity, to actually create the page under

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

## 2. GEPA export registration

**What's required**, per GEPA's own published process:
1. GEPA Registration Form (available at gepaghana.org)
2. Photocopies of registered business certificates
3. Possible premises/facility inspection by a Permit-Issuing Agency, with the inspection report feeding back into GEPA's decision
4. Additional documents where relevant — GEPA names Certificate of Origin and Phytosanitary Certificate as examples for certain goods

**What's ready now**: the company-profile text in
`docs/COMPANY_PROFILE_DRAFT.md` (medium/long versions) is suitable for
any free-text company-description field on the registration form.

**What only BorgaFoods can supply**: the actual business registration
certificates, and coordinating any required facility inspection. This
repository has no access to Supply & Demand Worldwide Ltd's
incorporation documents and does not draft or fabricate them.

**Why it matters**: GEPA's exporter directory surfaced independently in
multiple competitor searches during the Growth Monitoring cycle (see
`docs/GROWTH_TRACKING_LOG.md`, Cycle 1) — real, external confirmation
that this is functioning infrastructure buyers and search engines
already route through, not a theoretical opportunity.

**Priority**: high, but slower — "takes just a day or two" per GEPA
once documents are in hand, but getting the documents together and any
inspection scheduled is a real lead time this repository can't shorten.

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

## 4. Priority order (consolidated)

1. **LinkedIn company page** — no external dependency, ready to execute today once BorgaFoods has a logo/cover image in hand.
2. **Confirm `export@borgafoods.com` mail delivery** — a prerequisite for #1 and likely #2–3 below, not its own separate action.
3. **GEPA registration** — start gathering business certificates now; the process itself is fast once documents are ready.
4. **AGI membership** — clearest documented path among the associations.
5. **GAFEA / FAGE / FABAG** — direct outreach (phone/website contact form), company-profile text ready to use whenever that conversation happens.
6. **B2B directory listings** (Tier 3 in `docs/OFFSITE_AUTHORITY_BUILDING_PLAN.md`) — lowest individual impact, reasonable to batch once 1–4 are underway.

## What this repository will do next, once any of the above exists

Update the relevant on-site reference (Footer link, `Organization`
schema `sameAs`, or similar) to point at the real external profile once
BorgaFoods confirms the URL — each such update is a small, safe,
no-new-claim code change, handled the same way the LinkedIn follow-up
is described in §1.

## Related documents

- `docs/OFFSITE_AUTHORITY_BUILDING_PLAN.md` — the original opportunity list this framework operationalizes.
- `docs/COMPANY_PROFILE_DRAFT.md` — the actual draft text referenced throughout.
- `docs/SEO_FOUNDATION.md` §7 — the `Organization` schema `sameAs` gap this framework's LinkedIn item resolves.
- `docs/GROWTH_TRACKING_LOG.md` — where GEPA's real-world relevance was independently confirmed via competitor research.
