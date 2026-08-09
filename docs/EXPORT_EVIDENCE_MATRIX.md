# BorgaFoods Export Evidence Matrix

Status: **Internal tracking document. No supplier name, registration
number, or other identifying detail from any supplier/partner document
is recorded here** — consistent with this project's established
supplier-confidentiality convention (see
`docs/PRODUCT_INTELLIGENCE_RECONCILIATION.md`, built "redacted, no
supplier/price data," and `BUSINESS_RULES.md`'s supplier confidentiality
rules, which prohibit anything that "allows a supplier to be inferred").
This document is git-tracked, so it's held to the same redaction
standard as every other internal doc in this repository, not a lower
one just because it's marked "internal."

## Read this before using the matrix

Two documents were reviewed for this matrix: a Ghana Tree Crops
Development Authority licence for a company exporting **oil palm
products**, and a Ghana Tree Crops Development Authority registration
for a company registered as a **manufacturer**. Neither document names
Supply & Demand Worldwide Ltd, BorgaFoods, or BorgaFoods Processing —
both certify a *different* company, consistent with these being
supplier/partner credentials, not BorgaFoods' own.

**The oil palm licence needs a flag, not just a redaction**: this
project's own frozen capability model excludes Red Palm Oil (tracked
internally as PCR-002) from every public and RFQ path "until PCR-002 is
resolved" (`docs/PUBLIC_PRODUCT_PRESENTATION_RULES.md`,
`docs/PRODUCT_CAPABILITY_MODEL.md`). An oil-palm export licence
reviewed now is the kind of evidence that would plausibly matter *if*
that gate is ever reopened — but reopening PCR-002 is a business
decision this repository does not make on its own, and nothing in this
matrix treats it as decided. Every row below touching this credential
is marked accordingly.

## Matrix

| # | Claim | Supporting document | Can the public website mention it? | Required wording if yes |
| - | --- | --- | --- | --- |
| 1 | Supply and Demand Worldwide Limited is a GEPA-registered commercial exporter | GEPA Certificate of Exporter Registration, Reg. No. GEPA2018800113 (2018); renewal confirmed current by BorgaFoods, 9 Aug 2026 | **Yes** — finalized wording ready, not yet applied to the live website | "Registered commercial exporter with the Ghana Export Promotion Authority (GEPA), Registration No. GEPA2018800113." No expiry/renewal date stated — none is on file. See `docs/GEPA_CREDIBILITY_SECTION_PROPOSAL.md` |
| 2 | BorgaFoods-manufactured products (gari, cassava flour, fufu flour, kokonte, Banku Borga) are made at Ghana FDA registered facilities | Already approved, live BPIP data (`shared/productIntelligence/publishedRegistry.ts`) | **Yes — already published**, unchanged by this review | "Ghana FDA registered facilities" (exact existing wording, no change) |
| 3 | A reviewed Ghanaian production/export partner holds a current Tree Crops Development Authority **export licence for oil palm products** (2026–2028) | TCDA Certificate of Licence (name/registration number redacted here) | **No** — two independent reasons: (a) this is a third-party partner's own credential, not BorgaFoods'; using it to describe BorgaFoods' own capability would misattribute someone else's licence; (b) this credential's product category corresponds to Red Palm Oil, frozen under PCR-002 as internal-only — publishing anything connecting BorgaFoods to oil-palm supply chain risks surfacing an excluded product ahead of a business decision that hasn't been made | None — no wording is safe to publish for this row until PCR-002 is separately resolved, a decision this repository does not make |
| 4 | A reviewed Ghanaian production partner holds a current Tree Crops Development Authority **manufacturer registration** (2026–2028) | TCDA Certificate of Registration (name/registration number redacted here) | **No** — same first reason as row 3 (third-party credential, not BorgaFoods' own); this repository does not know which candidate product(s), if any, this partner supplies, so cannot rule out a similar review-gate concern | None |
| 5 | BorgaFoods sources a broader export assortment from "trusted Ghanaian production partners" | Existing approved wording, `BUSINESS_RULES.md` | **Yes — already published**, unchanged | Exact existing phrase only: "Selected from trusted Ghanaian production partners." Do not extend this to "licensed partners" or similar — that would generalize from evidence covering (at most) two specific partners to a claim about all of them, which isn't supported |

## What this matrix deliberately does not do

- It does not name either reviewed company, anywhere, including in this
  redacted form.
- It does not record either document's registration number, issue/expiry
  dates being cross-referenced with a specific named party, or signature.
- It does not propose new public wording for rows 3–4 — there isn't a
  safe version of that claim to draft yet, unlike the GEPA row (row 1),
  which has ready wording waiting on a factual confirmation rather than
  a business decision.

## What would need to happen before rows 3–4 could ever move to "yes"

1. **For row 3 specifically**: a business decision to resolve PCR-002 —
   this project's own frozen classification review gate for Red Palm
   Oil — through the same process used for prior classification
   decisions (`docs/PRODUCT_CAPABILITY_MODEL.md`'s "Recorded private-label
   discovery decision" is the precedent for how a gate like this gets
   resolved and recorded). Not something to infer from a licence
   document alone.
2. **For both rows 3–4**: even if a supply relationship is eventually
   approved for public mention, `BUSINESS_RULES.md`'s partner-sourced
   wording rules still apply — no supplier name, brand, or
   identifying detail, ever, regardless of how the underlying product
   question resolves.

## Related documents

- `docs/GEPA_CREDIBILITY_SECTION_PROPOSAL.md` — row 1's full detail.
- `docs/PRODUCT_CAPABILITY_MODEL.md`, `docs/PUBLIC_PRODUCT_PRESENTATION_RULES.md` — the PCR-002 exclusion this matrix flags rather than acts on.
- `docs/BUSINESS_RULES.md` — supplier confidentiality rules governing rows 3–4.
