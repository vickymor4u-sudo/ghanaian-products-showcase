# Buyer-Facing Exporter Profile — Draft Content

Status: **Superseded by `docs/EXPORTER_PROFILE_FINAL.md`, 9 August
2026**, which restructures this content into the 8 sections requested
for the final version and adds the now-confirmed GEPA registration as a
credential. Kept as a historical record of the 5-section draft. For
actual current content, use `docs/EXPORTER_PROFILE_FINAL.md`.

---

*Original draft, retained below unedited (GEPA section is now stale —
see `docs/EXPORTER_PROFILE_FINAL.md` for the confirmed version):*

Status: **Actual draft content, ready for design/layout. Not published,
not formatted as a distributable PDF.** Fills in the structure set out
in `docs/EXPORTER_PROFILE_PDF_OUTLINE.md` with real, approved copy —
that document explains *why* each section is scoped the way it is; this
one *is* the content. Every sentence traces to a fact already approved
and live on borgafoods.com, or to BPIP (`shared/productIntelligence/publishedRegistry.ts`).

---

## Company overview

> Supply and Demand Worldwide Limited is a legally registered limited
> liability company in Ghana, established in 2013. Trading under the
> BorgaFoods brand, the company has over a decade of experience
> exporting traditional West African staple foods to international
> markets.
>
> BorgaFoods operates internationally, with presence in both Ghana
> (Tema) and China (Hangzhou), serving diaspora-focused and specialty
> food markets across Asia and Africa. The company works with
> distributors, wholesalers, grocery retailers, and food-service buyers
> on wholesale and export supply, with product, packaging, and
> shipment requirements reviewed for each enquiry.

**Company facts**

| | |
| --- | --- |
| Legal entity | Supply and Demand Worldwide Limited |
| Trading brand | BorgaFoods |
| Manufacturing entity | BorgaFoods Processing |
| Established | 2013 |
| Headquarters | Tema, Greater Accra, Ghana |
| Secondary location | Hangzhou, Zhejiang, China |
| Languages | English, Chinese |
| Website | borgafoods.com |
| Export enquiries | export@borgafoods.com |

*Not included — not confirmed anywhere in this codebase, so not
guessed here*: employee/company-size figure, production-capacity or
volume figures (open item, `docs/COMMERCIAL_INFO_DECISION_RECORD.md`
row 5).

---

## Product categories

> BorgaFoods manufactures a current range of Ghanaian staple foods at
> Ghana FDA registered facilities, and coordinates a broader export
> assortment sourced from trusted Ghanaian production partners, kept
> clearly distinct from its own manufactured range.

**Manufactured range** (source: `shared/productIntelligence/publishedRegistry.ts` — same data live on each `/products/*` page)

| Product | Category | Retail packaging | Bulk packaging |
| --- | --- | --- | --- |
| Fufu Flour | Traditional Flour Blends | 700g, 1kg, 2kg | Available upon request |
| Gari | Cassava Products | 500g, 1kg, 2kg, 5kg | 25kg, 50kg sacks |
| Cassava Flour | Cassava Products | 1kg, 2kg, 5kg | 25kg, 50kg sacks |
| Banku Borga | Traditional Ghanaian Staples | 1kg, 2kg, 5kg | Available upon request |
| Kokonte | Cassava Products | 1kg, 2kg, 5kg | Available upon request |

**Broader export assortment**: coordinated from trusted Ghanaian
production partners, in addition to the manufactured range above. No
partner name, count, or product-category detail beyond this sentence
is included — see `docs/EXPORT_EVIDENCE_MATRIX.md` for why.

---

## Export process

> Products, packaging, documentation, trade terms, destination
> requirements, and shipment timing are reviewed before an export
> quotation is confirmed.

**What's coordinated per enquiry** (source: `/export`, already live):

| Area | What's reviewed |
| --- | --- |
| Export documentation | Commercial and shipment document requirements, identified according to the agreed transaction and destination |
| Packaging | Product format, case configuration, handling needs, and available packaging details |
| Destination requirements | Buyer-supplied import, labeling, and market requirements |
| Shipment coordination | Shipment method, logistics responsibilities, timing, and required handover information |

**How to start**: export@borgafoods.com. A useful first enquiry
includes product interest, destination market, estimated order volume,
preferred packaging, and timing.

*Not included* — genuinely open business decisions, not yet published
anywhere on the site: a specific MOQ figure, a named shipping mode
(sea/air), a stated lead-time range, or specific export document types
(e.g. naming Certificate of Origin specifically rather than the general
category). All four are tracked in
`docs/COMMERCIAL_INFO_DECISION_RECORD.md`, awaiting a business decision
this document does not make.

---

## Buyer types served

> Distributors · Grocery retailers · Wholesalers · Restaurants &
> food-service buyers

The same 4 personas used consistently across `/wholesale` and every
product page (`docs/BUYER_INTENT_CONTENT_AUDIT.md`):

- **Distributors** — regional and specialist distributors building
  Ghanaian or African grocery ranges
- **Grocery retailers** — African grocery stores, supermarkets, and
  retail buyers planning repeat supply
- **Wholesalers** — trade buyers evaluating retail packs, bulk
  formats, or mixed product requirements
- **Restaurants & food service** — professional kitchens and
  food-service suppliers seeking suitable product formats

---

## Quality assurance approach

> BorgaFoods manufactures its current range of Ghanaian staples at
> Ghana FDA registered facilities.

That is the one verified quality-assurance fact available for this
section. No ISO, HACCP, organic, Fairtrade, or similar management-system
certification appears anywhere in BPIP or in any document reviewed to
date — including the two Tree Crops Development Authority documents
reviewed 9 Aug 2026, which certify a different regulatory scope
(export/manufacturer licensing for two separate third-party companies,
not a quality-management certification, and not BorgaFoods' own). A
one-fact section is the accurate reflection of what's currently
verified, not an oversight.

---

## Supporting registrations

**Ghana FDA facility registration**: ✅ Published — applies to all 5
manufactured products, already live sitewide.

**GEPA export registration (Supply and Demand Worldwide Limited)**: ⚠️
**Held — not included in this draft.** A certificate exists
(Registration No. GEPA2018800113, issued 2018), but its printed Date of
Expiry (26 Feb 2019) and "Subject to Annual Renewal" notice mean current
status is unconfirmed. Full detail and exact wording ready to drop in
once confirmed: `docs/GEPA_CREDIBILITY_SECTION_PROPOSAL.md`. See
`docs/GEPA_RENEWAL_FOLLOWUP.md` for the prepared follow-up to obtain
that confirmation.

**What this section will not include, even once GEPA is resolved**: any
reference to the two Tree Crops Development Authority documents
reviewed 9 Aug 2026. They certify third-party partner companies, not
Supply and Demand Worldwide Limited, and one of them intersects this
project's internal-only Red Palm Oil classification gate (PCR-002).
Full reasoning: `docs/EXPORT_EVIDENCE_MATRIX.md`.

---

## What's needed before this becomes an actual distributable PDF

- Design/layout — this is content, not a formatted document
- A logo file and any brand imagery (none exists in this repository)
- The GEPA renewal confirmation (see `docs/GEPA_RENEWAL_FOLLOWUP.md`)
- Any business decisions on the open commercial-info items, if
  BorgaFoods wants the "Export process" section expanded
  (`docs/COMMERCIAL_INFO_DECISION_RECORD.md`)

## Related documents

- `docs/EXPORTER_PROFILE_PDF_OUTLINE.md` — the structural outline this content fills in.
- `docs/EXPORTER_PROFILE_ONE_PAGER.md` — the shorter, single-page sibling document.
- `docs/GEPA_CREDIBILITY_SECTION_PROPOSAL.md`, `docs/GEPA_RENEWAL_FOLLOWUP.md` — the held GEPA line and how it gets resolved.
- `docs/EXPORT_EVIDENCE_MATRIX.md` — why the two supplier/partner documents are excluded throughout.
- `docs/COMMERCIAL_INFO_DECISION_RECORD.md` — the open decisions gating the "Export process" section's depth.
