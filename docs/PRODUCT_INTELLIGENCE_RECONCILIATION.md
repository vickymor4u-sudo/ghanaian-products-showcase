# Product Intelligence Reconciliation — Master Export Workbook

Status: **Internal reconciliation record. Not a publication authorization.**

Prepared: 8 August 2026

## Purpose and authority

This document reconciles the supplied `BorgaFoods_Master_Export 001.xlsx` working
workbook against the frozen [`PRODUCT_CAPABILITY_MODEL.md`](./PRODUCT_CAPABILITY_MODEL.md),
[`PRODUCT_CLASSIFICATION_REVIEW.md`](./PRODUCT_CLASSIFICATION_REVIEW.md), and the
current `client/src/data/products.ts` catalog.

Per `AI_TASK_PROTOCOL.md` and the governing rules, **the workbook is not
authority for public publication.** It is a working sourcing/pricing
spreadsheet (its own `01_Company_Profile` sheet labels it "Working catalogue -
update continuously"). Only an explicit, recorded decision in the frozen
capability model authorizes a product's public display, supply-type claim,
private-label eligibility, or wording. This document records findings and
open questions; it does not itself approve anything.

**This document intentionally excludes supplier names, supplier brands,
purchase/carton pricing, and any other source-commercial data read from the
workbook.** That information exists in the workbook and remains internal to
it. It must not be copied into this repository (which is a public GitHub
repository) in any file, comment, or commit, regardless of whether the
destination is browser-delivered.

## Workbook structure observed

Six sheets: `01_Company_Profile`, `02_Flours`, `03_Oils`, `04_Seasonings`,
`05_Snacks_Drinks`, `06_Shipping_Guide`. The product sheets share one schema:
Category, Product, "Manufactured by Borga?" (`YES`/`SOURCE`), Country of
Origin, Brand, Product Image, Unit Size, Units/Carton, Cartons/Pallet, Price
per Carton. 26 product rows total (25 distinct product names — see the Red
Palm Oil conflict below). The workbook's own shipping-guide sheet confirms
the "Product Image" column is intended to hold **supplier-provided
photography**, and the workbook contains 26 embedded images matching that
description; none were extracted, reviewed for supplier branding, or used.

## Current public catalog vs. workbook

| Catalog product | Workbook match                                                                                                                   | Result                                                                                                                                                           |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Gari            | Present, `YES` (manufactured)                                                                                                    | Aligned                                                                                                                                                          |
| Cassava Flour   | Present, `YES` (manufactured)                                                                                                    | Aligned                                                                                                                                                          |
| Fufu Flour      | Present, `YES` (manufactured), but the workbook's brand field for this row does not match the approved public `BorgaFoods` brand | Reinforces the existing **PCR-001** gate (source-record brand/classification conflict). No new information; PCR-001 remains open and unresolved. No change made. |
| Kokonte         | Not present in the workbook                                                                                                      | The workbook is incomplete relative to the approved catalog; this is a workbook data gap, not a catalog problem. Kokonte's existing approval is unaffected.      |
| Banku Borga     | Not present in the workbook                                                                                                      | Same as above.                                                                                                                                                   |

## Red Palm Oil — PCR-002 reinforced, not resolved

The workbook contains **two rows for "Red Palm Oil," under the same brand,
with conflicting supply-type values** (one row marked `YES`/manufactured, one
row marked `SOURCE`/partner-sourced, differing only in pack size). This is
precisely the conflict `PRODUCT_CLASSIFICATION_REVIEW.md` already describes
under PCR-002. It confirms the review gate is correctly describing a real,
still-unresolved conflict in the source data. **No inference was made; Red
Palm Oil remains excluded from every public and RFQ path, as required.**

## New candidate products identified (not currently in the public catalog)

The workbook lists 22 additional distinct product names not present in
`products.ts`, all marked `SOURCE` (partner-sourced) in the workbook, each
tied in the workbook to a specific third-party supplier brand and a
per-carton price (both withheld from this document; see "Purpose and
authority" above). Grouped by workbook category:

| Category (workbook) | Candidate product names                                                                                    |
| ------------------- | ---------------------------------------------------------------------------------------------------------- |
| Flours              | Corn Flour, Yam Flour (Elubo), Semolina / Couscous                                                         |
| Grains              | Sorghum, Millet                                                                                            |
| Oils                | Coconut Oil                                                                                                |
| Sauces              | Pepper Sauce, Hot Shito Mix, Palm Soup                                                                     |
| Seasonings          | Jollof Seasoning, Suya Spice, All Purpose, Fish Seasoning, Chicken Seasoning, Rice Seasoning, Wakye Leaves |
| Snacks              | Chin Chin, Plantain Chips                                                                                  |
| Drinks              | Ginger Drink, Hibiscus Tea bag, Palm Wine Alternative                                                      |

Two of these (Yam Flour, Semolina/Couscous) are recorded in the workbook
with **Nigeria**, not Ghana, as country of origin — outside the current
"Ghana-focused" business positioning described in `BORGAFOODS_CONTEXT.md`.
This is noted as a business-fit question, not decided here.

### Publication-gate result for all 22 candidates: not publication-ready

Checked against the `PUBLIC_PRODUCT_PRESENTATION_RULES.md` §6 export-catalogue
visibility checklist:

| Check                                                                       | Result for all 22 candidates                                                                                                                                                                                                                              |
| --------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Explicit approved supply type                                               | Workbook indicates `partner_sourced`; not itself a recorded catalog-level classification                                                                                                                                                                  |
| Approved `Public Display Status` permitting publication                     | **Missing.** None of these products appear in the frozen `PRODUCT_CAPABILITY_MODEL.md` decision table. No product-level public-display approval is recorded for any of them.                                                                              |
| Approved public type label / supply statement                               | Would use the existing `BorgaFoods Export Selection` / "Selected from trusted Ghanaian production partners" labels once approved — not itself a blocker, but moot until display is approved                                                               |
| Approved public-safe name, category, origin, packaging, availability, image | Names/categories are workbook-plausible; packaging (unit size) exists in the workbook but bulk/export/wholesale availability, shelf life, and storage have not been confirmed for public use; **no public-safe image exists for any of them** (see below) |
| No unresolved classification review                                         | Not applicable — none of these are Fufu Flour or Red Palm Oil                                                                                                                                                                                             |
| No supplier-confidential data                                               | Would require a public-safe projection to be built; not yet built                                                                                                                                                                                         |
| Confirmed export/wholesale/quotation eligibility                            | Not confirmed                                                                                                                                                                                                                                             |

**Conclusion: all 22 candidates remain internal-only. None is publication-ready.**
Per `PUBLIC_PRODUCT_PRESENTATION_RULES.md`, "when any required approval is
missing, the correct outcome is to keep the product or claim internal — not
to infer a classification or publish provisional wording." No product was
added to `client/src/data/products.ts`, any public page, SEO content, or the
RFQ product allowlist as part of this reconciliation.

## Image status

Every workbook row's only associated photography is supplier-provided (per
the workbook's own `06_Shipping_Guide` sheet instruction: "Insert supplier
photos into Product Image column"). No neutral/unbranded or BorgaFoods-owned
image exists in the workbook for any of the 22 candidates or for the
conflicted Red Palm Oil record. **Every one of these products is therefore
also imagery-blocked**, independent of the missing display approval above.
Sourcing or commissioning public-safe imagery is a business/operational task,
not something resolved by this reconciliation.

## Required business decisions

None of the following were decided by this reconciliation. They are listed
for business review, most commercially relevant first:

1. **Which, if any, of the 22 candidate partner-sourced products should be
   approved for public display?** Recommendation (not a decision): if
   BorgaFoods wants to begin Phase 4 export-catalogue expansion, a small
   first tranche of single-supplier, Ghana-origin, non-perishable dry goods
   with an existing category fit (for example the Seasonings line, or
   Coconut Oil / Palm Soup) would be a lower-risk starting point than the
   full list — but the actual selection, wording, and imagery approval is a
   business decision.
2. **Resolve PCR-002** (Red Palm Oil manufactured/partner-sourced conflict) —
   still open, still excluded from every public and RFQ path.
3. **PCR-001** (Fufu Flour) — still open; the workbook reinforces rather than
   resolves it. No action required beyond the existing narrow private-label
   exception already recorded.
4. **Public-safe imagery** for any approved candidate — sourcing or
   commissioning non-supplier-branded photography is required before any
   candidate can be displayed, independent of the display-approval decision.
5. **Ghana-only positioning** — whether Nigeria-origin candidates (Yam Flour,
   Semolina/Couscous) fit the current "Ghana-focused" business story or
   should be excluded/reframed.

## Change control

This document may be updated as new reconciliation passes occur. It must not
be used to infer or imply a publication decision. Only an update to
`PRODUCT_CAPABILITY_MODEL.md`'s frozen decision table, made with explicit
business approval, changes what may be published.
