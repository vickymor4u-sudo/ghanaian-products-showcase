# Buyer Conversion Gap Analysis

Status: **Analysis only — no content changed.** Checks `/export`,
`/wholesale`, and `/export-solutions` against five concrete buyer
questions (shipping method, minimum-order process, documentation,
packaging, lead time) for wholesale buyers, distributors, importers, and
private-label enquirers, and identifies what's actually missing before a
buyer would feel ready to submit an enquiry.

This extends the persona-level audit in
`docs/BUYER_INTENT_CONTENT_AUDIT.md` (prior phase) with a
question-level pass against the three pages most responsible for
carrying a buyer from interest to enquiry.

## Question-by-question

| Buyer question | Where it's answered today | Verdict |
| --- | --- | --- |
| **How do you ship?** | `/export`'s Shipment Planning cards: "Export origin: Ghana... Final port and routing confirmed for the shipment," "Trade terms: Agreed per shipment." | **Gap.** The site never states shipping *mode* anywhere — sea freight vs. air freight isn't mentioned once across any of the 7 pages. For a bulk staple-food exporter this is very likely sea freight for standard orders, but that's an inference, not something documented in `BUSINESS_RULES.md` or BPIP — not stated here as fact. A buyer evaluating fit (e.g. "can they do air freight for a smaller urgent order?") has nothing to go on and must ask cold. |
| **Minimum order process** *(the process, not a fixed number — publishing a number is a business-rules violation, see `docs/PUBLIC_CLAIM_VERIFICATION_AUDIT.md` finding 1)* | `/wholesale`: "expected order volume" is listed as part of "a useful enquiry"; `/products`: "Estimated initial order volume... commercial terms confirmed in quotation." | **No gap.** The *process* for how order volume gets discussed is described consistently and correctly (deferred to per-enquiry review, matching the business rule that no fixed MOQ may be published). |
| **Documentation?** | `/export`'s dedicated "Export documentation" card plus a "Product & Market Requirements" checklist including "Current product and facility documentation." | **Minor gap.** The *category* of documentation is named, but no example document type is given anywhere (e.g. Certificate of Origin, phytosanitary certificate, commercial invoice, Bill of Lading — standard food-export paperwork). Everything is deferred to "confirmed per shipment." Lower severity than the shipping-mode gap because the process itself is clearly described; this is a "nice to have more specificity" gap, not an absent answer. |
| **Packaging?** | `/products`' dedicated "Packaging Requirements Review" section, plus real per-product Standard Retail Sizes and Bulk Options fields sourced from BPIP (e.g. Gari: 500g/1kg/2kg/5kg retail, 25kg/50kg bulk sacks). | **Best-answered question on the site.** Concrete, real, product-specific numbers — not vague. No gap. |
| **Lead time?** | `/export`: "Lead time: Confirmed per order... Timing depends on product, volume, packaging, sourcing, documentation, and logistics." | **Real gap, and the most significant one found.** Zero indicative range appears anywhere — not even "typically X–Y weeks" with the usual caveats. This is the weakest-answered of the five questions, and matters because lead time is often the deciding factor for a buyer choosing between suppliers who otherwise look similar. **This is a business-approval-gated gap, not a copy fix** — `BUSINESS_RULES.md` explicitly prohibits publishing lead times without current approval, so closing this requires a business decision (see below), not a content edit this repository can make unilaterally. |

## Persona-specific notes (building on the prior phase's audit)

- **Wholesale buyers / distributors**: the two real gaps above (shipping mode, lead time range) affect them most directly — both are exactly the kind of practical logistics questions a distributor compares across suppliers before ever submitting an RFQ.
- **Importers**: same two gaps, plus the documentation-specificity gap matters more here — an importer often needs to confirm document types match their own country's import requirements before engaging at all.
- **Private-label enquirers**: not materially affected by either gap — the private-label path (`/wholesale`) is explicitly upfront that "MOQ, packaging, specifications, production feasibility, and regulatory requirements are confirmed before acceptance," so a private-label buyer already expects a longer, individually-reviewed process rather than a published lead time.

## What would close these gaps, and what each requires

| Gap | What would close it | Requires |
| --- | --- | --- |
| Shipping mode never stated | A single sentence, e.g. "We coordinate sea freight for standard bulk orders; other arrangements are discussed per enquiry" — *only if that's actually true* | **Business confirmation.** Not documented in BPIP or `BUSINESS_RULES.md` today; this repository does not know BorgaFoods' actual shipping practice and won't guess at it. |
| No indicative lead-time range | A hedged range, e.g. "Most orders ship within X–Y weeks of confirmation, depending on product and volume" | **Business approval**, explicitly required by `BUSINESS_RULES.md`'s prohibition on publishing lead times without current approval. This is the single highest-value content addition identified in this whole phase, and the one most clearly blocked on a business decision rather than engineering effort. |
| Documentation examples not named | Naming 2–3 standard document types as illustrative examples (e.g. "such as a Certificate of Origin or commercial invoice, depending on destination") | **Business confirmation** that these are actually the documents BorgaFoods coordinates — lower priority than the two above since the category is already named. |

## Related documents

- `docs/BUYER_INTENT_CONTENT_AUDIT.md` — the broader persona-level audit from the prior phase.
- `docs/PUBLIC_CLAIM_VERIFICATION_AUDIT.md` — why a specific lead-time number or MOQ can't simply be added without approval.
- `docs/CONTENT_ARCHITECTURE_IMPLEMENTATION_PLAN.md` — where the shipping-mode and lead-time approvals are tracked as required business decisions.
