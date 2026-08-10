# Commercial Information — Decision Record

Status: **Rows 1–5 await business decision; nothing published for them.
Row 6 (product sale pricing) is approved for 3 of 5 live products —
see that row for scope and what remains open.**

This is the sign-off sheet for the 5 commercial-information gaps
catalogued in detail in `docs/COMMERCIAL_INFO_APPROVAL_LIST.md` (full
reasoning, options, and rule citations for each). This document exists
to make the decision itself easy to record — one line per item, filled
in by BorgaFoods management, not inferred or guessed here.

**Why this repository cannot fill in the "Decision" column itself**: it
has no access to BorgaFoods' actual MOQ, shipping arrangements, lead
times, documentation practice, or production capacity — these are
operational facts held by the business, not something derivable from
the codebase, BPIP, or any prior approved content. `BUSINESS_RULES.md`
and `PUBLIC_PRODUCT_PRESENTATION_RULES.md` both treat every one of
these five as requiring current, explicit approval before publication —
there is no default or safe assumption to fall back on.

## Decision sheet

| # | Item | Current public state | Decision | If approved, publish where | Approved by | Date |
| - | --- | --- | --- | --- | --- | --- |
| 1 | **MOQ** (minimum order quantity) | Not published — every page defers to "reviewed per enquiry" | ☐ Approved — publish &nbsp; ☐ Not approved — keep internal | `/about`, `/products`, each product page's "Export Packaging Options" | | |
| 2 | **Shipping mode** (sea, air, or both) | Not published — `/export` and every product page defer to "confirmed per enquiry" | ☐ Approved — publish &nbsp; ☐ Not approved — keep internal | `/export`, each product page's "Shipping & Lead Time" card | | |
| 3 | **Lead time** (production + shipment) | Not published, not even as a range | ☐ Approved — publish &nbsp; ☐ Not approved — keep internal | `/export`, each product page's "Shipping & Lead Time" card | | |
| 4 | **Export documents** (e.g. Certificate of Origin, commercial invoice, phytosanitary certificate) | Only the *category* "export documentation" is named; no specific document types | ☐ Approved — publish &nbsp; ☐ Not approved — keep internal | `/export`'s "Export documentation" card | | |
| 5 | **Production capacity** (volume, order-size ceiling, facility count) | Not published or implied anywhere | ☐ Approved — publish &nbsp; ☐ Not approved — keep internal | `/about`'s Value Chain / Competitive Advantages sections | | |
| 6 | **Product sale price** (wholesale, per carton, USD) | Not published — no `Product` schema `offers`, no on-page price | ☑ Approved — publish, **for Gari, Cassava Flour, and Kokonte only** ($35, $45, $38 per carton respectively, 12 units/carton, confirmed as BorgaFoods' sale price to wholesale buyers, not internal cost) | `Product` structured data (`offers`) on the relevant product pages, via BPIP's `wholesalePricing` field | Business owner, via chat | 11 Aug 2026 |

**Row 6 explicitly excludes two products, both still open:**
- **Fufu Flour** — the source workbook's price row carries brand "Neat," conflicting with the approved public brand "Borga"/"BorgaFoods" (the same conflict tracked as `PCR-001` in `docs/PRODUCT_INTELLIGENCE_RECONCILIATION.md`). Held out of publication until that classification question resolves, consistent with how all other new Fufu Flour content has been treated.
- **Banku Borga** — no price row exists for it in either version of the source workbook reviewed. Needs a business-supplied figure before it can be added; not a code blocker.

Each row is independent — approve some and decline others; there's no
requirement to decide all five the same way.

## What "Approved" means in practice

For any row marked Approved, the next step is: BorgaFoods supplies the
actual figure or fact (a real MOQ number, the actual shipping mode(s)
used, a real lead-time range, the actual document types provided, or
real capacity figures) — not a placeholder. From there, this repository
drafts the exact page wording for a final review before anything goes
live, the same pattern already used successfully for the `/about`
corrections in `docs/PUBLIC_CLAIM_VERIFICATION_AUDIT.md` (draft →
review → apply only after explicit sign-off, verified live afterward).

## What "Not approved" means in practice

No code or content change — the existing "confirmed per enquiry"
language stays exactly as it is. This is a legitimate, common B2B
posture (many exporters keep exact terms confidential until a real
enquiry is underway) and is not treated here as a worse outcome than
publishing — it's simply the default until a row is actively approved.

## Related documents

- `docs/COMMERCIAL_INFO_APPROVAL_LIST.md` — the full analysis behind each row above: why it's currently absent, what specifically would need to be supplied, and which rule in `BUSINESS_RULES.md`/`PUBLIC_PRODUCT_PRESENTATION_RULES.md` governs it.
- `docs/BUYER_CONVERSION_GAP_ANALYSIS.md` — the original finding that shipping mode and lead time are the two gaps most likely to affect whether a buyer converts.
