# Buyer-Facing Exporter Profile — Final Draft

Status: **Final content, ready for design/layout. Not yet published or
distributed as a PDF.** Supersedes `docs/EXPORTER_PROFILE_PDF_OUTLINE.md`
and `docs/EXPORTER_PROFILE_PDF_DRAFT.md` with the 8-section structure
requested for the finalized version, and includes the now-confirmed
GEPA registration as a company credential. Every fact below traces to
BPIP (`shared/productIntelligence/publishedRegistry.ts`), already-live
website copy, or the GEPA confirmation record in
`docs/GEPA_CREDIBILITY_SECTION_PROPOSAL.md`. No supplier name, no
supplier certificate, and no private supplier information appears
anywhere in this document.

---

## 1. Company Overview

> Supply and Demand Worldwide Limited is a legally registered limited
> liability company in Ghana, established in 2013. Trading under the
> BorgaFoods brand, the company has over a decade of experience
> exporting traditional West African staple foods to international
> markets. The company is a registered commercial exporter with the
> Ghana Export Promotion Authority (GEPA), Registration No.
> GEPA2018800113.
>
> BorgaFoods operates internationally, with presence in both Ghana
> (Tema) and China (Hangzhou), serving diaspora-focused and specialty
> food markets across Asia and Africa.

| | |
| --- | --- |
| Legal entity | Supply and Demand Worldwide Limited |
| Trading brand | BorgaFoods |
| Established | 2013 |
| Headquarters | Tema, Greater Accra, Ghana |
| Secondary location | Hangzhou, Zhejiang, China |
| Languages | English, Chinese |
| Website | borgafoods.com |

*Not included* — not confirmed anywhere in this codebase, not guessed
here: employee/company-size figure, production-capacity or volume
figures (open item, `docs/COMMERCIAL_INFO_DECISION_RECORD.md` row 5).

---

## 2. About BorgaFoods Processing

> BorgaFoods Processing is the manufacturing entity behind BorgaFoods'
> own product range. It manufactures the current lineup of Ghanaian
> staple foods — gari, cassava flour, fufu flour, kokonte, and Banku
> Borga — at Ghana FDA registered facilities, with product, packaging,
> and shipment requirements reviewed for every enquiry.
>
> BorgaFoods Processing's manufactured range is kept clearly distinct
> from the broader export assortment BorgaFoods coordinates from
> trusted Ghanaian production partners — buyers are always told which
> supply type a given product falls under.

---

## 3. Product Categories

Source: `shared/productIntelligence/publishedRegistry.ts` — the same
data live on `/products` and each product's dedicated page, so this
table stays accurate as long as it's regenerated from that file.

| Product | Category | Retail packaging | Bulk packaging |
| --- | --- | --- | --- |
| Fufu Flour | Traditional Flour Blends | 700g, 1kg, 2kg | Available upon request |
| Gari | Cassava Products | 500g, 1kg, 2kg, 5kg | 25kg, 50kg sacks |
| Cassava Flour | Cassava Products | 1kg, 2kg, 5kg | 25kg, 50kg sacks |
| Banku Borga | Traditional Ghanaian Staples | 1kg, 2kg, 5kg | Available upon request |
| Kokonte | Cassava Products | 1kg, 2kg, 5kg | Available upon request |

**Broader export assortment**: BorgaFoods also coordinates a wider
range sourced from trusted Ghanaian production partners, in addition to
the manufactured range above. No partner name, count, or
product-category detail beyond this sentence is included — see
`docs/EXPORT_EVIDENCE_MATRIX.md` for why.

---

## 4. Export Solutions

> Products, packaging, documentation, trade terms, destination
> requirements, and shipment timing are reviewed before an export
> quotation is confirmed.

| Area | What's reviewed |
| --- | --- |
| Export documentation | Commercial and shipment document requirements, identified according to the agreed transaction and destination |
| Packaging | Product format, case configuration, handling needs, and available packaging details |
| Destination requirements | Buyer-supplied import, labeling, and market requirements |
| Shipment coordination | Shipment method, logistics responsibilities, timing, and required handover information |

BorgaFoods also supports private-label discussions for Fufu Flour, its
current approved private-label discovery product — reviewed
individually by specification, packaging, order volume, and production
feasibility. *(BorgaFoods has decided to explore broadening this to 4
additional products — see `docs/PRIVATE_LABEL_SCOPE_CONSISTENCY_REVIEW.md`
— but this section stays Fufu Flour-only until that's reflected in BPIP
and the live RFQ form.)*

*Not included* — genuinely open business decisions, not yet published
anywhere on the site: a specific MOQ figure, a named shipping mode
(sea/air), a stated lead-time range, or specific export document types.
Tracked in `docs/COMMERCIAL_INFO_DECISION_RECORD.md`.

---

## 5. Buyer Types Served

- **Distributors** — regional and specialist distributors building
  Ghanaian or African grocery ranges
- **Grocery retailers** — African grocery stores, supermarkets, and
  retail buyers planning repeat supply
- **Wholesalers** — trade buyers evaluating retail packs, bulk
  formats, or mixed product requirements
- **Restaurants & food service** — professional kitchens and
  food-service suppliers seeking suitable product formats

---

## 6. Quality Assurance Approach

> BorgaFoods manufactures its current range of Ghanaian staples at
> Ghana FDA registered facilities.

That is the one verified quality-assurance fact available. No ISO,
HACCP, organic, Fairtrade, or similar management-system certification
appears anywhere in BPIP or in any document reviewed to date. A
one-fact section reflects what's currently verified, not an oversight.

---

## 7. Export Documentation Capability

> As a registered commercial exporter with the Ghana Export Promotion
> Authority (GEPA) — Registration No. GEPA2018800113 — Supply and
> Demand Worldwide Limited coordinates commercial and shipment
> documentation for each export transaction, tailored to the agreed
> destination and buyer requirements.

This section deliberately states registration as a present-tense fact
without a specific expiry or renewal date, matching exactly what's
confirmed (BorgaFoods confirmed the registration is current, 9 Aug
2026) without adding detail that isn't confirmed. See
`docs/GEPA_CREDIBILITY_SECTION_PROPOSAL.md` for the full confirmation
record and its limits.

**What this section does not include, and will not include**: any
reference to the two Ghana Tree Crops Development Authority documents
reviewed 9 Aug 2026 for unrelated production partners. Neither
certifies Supply and Demand Worldwide Limited or BorgaFoods, and one
intersects this project's internal-only Red Palm Oil classification
gate (PCR-002). Full reasoning: `docs/EXPORT_EVIDENCE_MATRIX.md`. No
supplier name, no supplier certificate, and no private supplier
information appears in this document.

---

## 8. Contact Information

| | |
| --- | --- |
| Export enquiries | export@borgafoods.com |
| Website | borgafoods.com |
| Wholesale enquiries | borgafoods.com/wholesale |
| Ghana | +233 555 362 208 |
| China / WhatsApp | +86 135 1681 8572 |

> Product, packaging, and shipment requirements are reviewed for each
> enquiry. Contact export@borgafoods.com to begin an export or
> wholesale conversation.

---

## What's needed before this becomes an actual distributable PDF

- Design/layout — this is content, not a formatted document
- A logo file and any brand imagery (none exists in this repository)
- Any business decisions on the open commercial-info items, if
  BorgaFoods wants Section 4 expanded
  (`docs/COMMERCIAL_INFO_DECISION_RECORD.md`)
- If a written GEPA confirmation letter or renewed certificate is
  obtained later, Section 7 can be updated with the specific detail
  (expiry/renewal date) it doesn't currently state

## Related documents

- `docs/EXPORTER_PROFILE_PDF_OUTLINE.md`, `docs/EXPORTER_PROFILE_PDF_DRAFT.md` — the superseded 5-section outline and draft this document replaces.
- `docs/EXPORTER_PROFILE_ONE_PAGER.md` — the shorter, single-page sibling document, also updated with the confirmed GEPA line.
- `docs/GEPA_CREDIBILITY_SECTION_PROPOSAL.md` — the GEPA confirmation record and finalized wording used in Sections 1 and 7.
- `docs/EXPORT_EVIDENCE_MATRIX.md` — why the two supplier/partner documents are excluded throughout.
- `docs/COMMERCIAL_INFO_DECISION_RECORD.md` — the open decisions gating Section 4's depth.
