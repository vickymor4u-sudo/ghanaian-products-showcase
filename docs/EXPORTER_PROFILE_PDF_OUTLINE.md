# Buyer-Facing Exporter Profile — PDF Outline

Status: **Superseded by `docs/EXPORTER_PROFILE_FINAL.md`, 9 August
2026**, which uses an 8-section structure and includes the now-confirmed
GEPA registration as a credential. Kept as a historical record of the
original 5-section outline and its reasoning — the exclusion logic for
supplier/partner documents below is still accurate and still applies to
the final version. For actual current content, use
`docs/EXPORTER_PROFILE_FINAL.md`.

---

*Original outline, retained below unedited:*

Status: **Outline only. No PDF has been designed or produced. Not
published anywhere.** This is a structural outline for a longer,
buyer-facing document — distinct from `docs/EXPORTER_PROFILE_ONE_PAGER.md`
(which is a single-page quick-reference layout). Both draw from the same
approved facts in `docs/COMPANY_PROFILE_DRAFT.md`; this one has room for
more explanation per section, aimed at a buyer doing real due diligence
before an enquiry rather than a first-glance reference sheet.

## Section outline

### 1. Company overview

- Legal name, brand name, founding year, headquarters + secondary
  location, website, contact email — same field set as
  `docs/COMPANY_PROFILE_DRAFT.md`'s field-by-field table.
- One paragraph, drawn from the "long version" text in
  `docs/COMPANY_PROFILE_DRAFT.md` (the section already reviewed for
  overclaiming — no new text to draft here).
- **Explicitly excluded from this section**: any company-size /
  employee-count figure (not confirmed anywhere in the codebase —
  `docs/COMPANY_PROFILE_DRAFT.md` already flags this as blank), and any
  production-capacity or volume figure (still an open item in
  `docs/COMMERCIAL_INFO_DECISION_RECORD.md`, unresolved).

### 2. Products

- The current 5-product manufactured range (Gari, Cassava Flour, Fufu
  Flour, Kokonte, Banku Borga), sourced directly from
  `shared/productIntelligence/publishedRegistry.ts` — same source of
  truth as the live product pages, so this section can't drift from
  what's on the website.
- Packaging options per product, from the same BPIP fields already
  live on each `/products/*` page.
- The broader "trusted Ghanaian production partners" assortment,
  described using the existing approved sentence only — no partner
  count, no partner names, no product-category detail beyond what's
  already public. See the note under "Supporting registrations" below
  for why this section does not expand on that sentence even though
  more partner detail exists internally.

### 3. Export capability

- Ghana (Tema) and China (Hangzhou) operational presence — both already
  public facts.
- Buyer types served: distributors, wholesalers, retailers, food-service
  buyers — already public (`/wholesale`, `/export`).
- Enquiry process: export@borgafoods.com, confirmed operational 9 Aug
  2026, with product/packaging/shipment requirements reviewed per
  enquiry (existing approved wording, no new claim).
- **Deliberately not included**: MOQ figures, shipping modes/incoterms,
  lead times — all still open items awaiting a business decision in
  `docs/COMMERCIAL_INFO_DECISION_RECORD.md`. This section will need a
  revision once those are decided; it is not blocked on this task.

### 4. Quality assurance approach

- Ghana FDA registered facilities — the one certification fact that is
  both true and already public across all 5 products.
- **Deliberately not included**: any ISO, HACCP, organic, Fairtrade, or
  similar certification claim. None of these appear anywhere in BPIP or
  in any document reviewed for this task (including the two newly
  supplied Tree Crops Development Authority documents, which certify a
  different regulatory scope — export/manufacturer licensing, not a
  quality-management certification — for two separate third-party
  companies, not BorgaFoods). Adding a "quality assurance" section with
  only one real fact in it is intentional: it's what the evidence
  actually supports.

### 5. Supporting registrations

- **GEPA (Supply and Demand Worldwide Limited)**: held entirely on the
  renewal-status confirmation described in
  `docs/GEPA_CREDIBILITY_SECTION_PROPOSAL.md`. The moment that's
  confirmed, Option A or B's wording drops in here, worded to name
  Supply and Demand Worldwide Limited (the registered legal entity)
  rather than "BorgaFoods," per that document's entity-separation
  section.
- **What this section will not include, even after GEPA is resolved**:
  any reference to the two Tree Crops Development Authority documents
  reviewed 9 Aug 2026. Two independent reasons, both explained fully in
  `docs/EXPORT_EVIDENCE_MATRIX.md`:
  1. They certify third-party partner companies, not Supply and Demand
     Worldwide Limited or BorgaFoods — a buyer-facing "supporting
     registrations" section listing a credential this company doesn't
     hold would misrepresent whose registration it is, regardless of
     how carefully worded.
  2. One of the two documents' registration category (export of oil
     palm products) corresponds to a product this project's own
     capability model (PCR-002, Red Palm Oil) currently keeps
     internal-only, with no exceptions carved out for supporting
     documentation. Even a generic, non-identifying reference to
     "reviewed partner credentials in the oil palm category" would
     surface the existence of that supply relationship in a
     buyer-facing document ahead of any business decision to reopen
     PCR-002 — which is not this document's call to make.
- If BorgaFoods wants supplier/partner credentials represented in this
  outline at all in the future, that requires two separate business
  decisions this task does not make: (a) whether to disclose a named or
  unnamed supply relationship publicly at all, consistent with
  `BUSINESS_RULES.md`'s supplier confidentiality rules, and (b) for the
  oil-palm-specific credential, whether to resolve PCR-002.

## What's needed before this becomes an actual PDF

- Design/layout — this document is a content outline, not a visual
  design.
- A decision on §5's GEPA line (see above).
- A decision on the commercial-info items flagged as excluded from §3
  (`docs/COMMERCIAL_INFO_DECISION_RECORD.md`).
- A logo and any brand imagery BorgaFoods wants included — none exists
  in this repository (same gap `docs/EXTERNAL_AUTHORITY_TRUST_FRAMEWORK.md`
  flagged for LinkedIn).

## Related documents

- `docs/EXPORTER_PROFILE_ONE_PAGER.md` — the shorter, single-page sibling document.
- `docs/COMPANY_PROFILE_DRAFT.md` — source text for §1.
- `docs/GEPA_CREDIBILITY_SECTION_PROPOSAL.md` — full detail on §5's held GEPA line and the entity-separation wording rule.
- `docs/EXPORT_EVIDENCE_MATRIX.md` — full detail on why §5 excludes the two supplier/partner credentials.
- `docs/COMMERCIAL_INFO_DECISION_RECORD.md` — the open decisions gating §3.
- `docs/PRODUCT_CAPABILITY_MODEL.md`, `docs/PUBLIC_PRODUCT_PRESENTATION_RULES.md` — the PCR-002 exclusion behind §5's second reason.
