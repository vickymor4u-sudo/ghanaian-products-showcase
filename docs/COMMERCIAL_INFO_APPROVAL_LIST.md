# Commercial Information Approval List

Status: **Approval list only. Nothing below has been published.** Per
this phase's explicit instruction: "Do not publish missing information.
Create an approval list only." Every row is either genuinely absent from
the site today, or present only as an explicit non-claim ("confirmed per
enquiry"). Publishing anything more specific requires the business to
supply the actual fact and approve the wording — this repository has no
visibility into any of the real figures below and has not guessed at
any of them.

## Shipping details

**Current state**: not published anywhere. Every product page's
"Shipping & Lead Time" section (see
`docs/PRODUCT_PAGE_OPTIMIZATION_REPORT.md`) explicitly defers: "confirmed
per enquiry." No shipping mode (sea/air), no port, no Incoterm, no
carrier relationship appears on the site.

| Item | Would require | Risk if published without approval |
| --- | --- | --- |
| Shipping mode (sea freight vs. air freight, or both) | Business confirmation of actual practice | Could misstate capability if only one mode is actually offered, or if it varies by product/volume |
| Typical port(s) of departure | Business confirmation | Low risk if accurate, but wrong if it varies by shipment |
| Incoterms typically used (e.g. FOB, CIF) | Business confirmation | `BUSINESS_RULES.md` explicitly prohibits publishing trade terms without approval |
| Named logistics/carrier partners | Business confirmation, and would need supplier-confidentiality review | `BUSINESS_RULES.md` prohibits supplier/partner identification; a logistics partner's identity would need the same scrutiny as a product supplier before any public mention |

## Certifications

**Current state**: one certification field is already approved and
live per product — "Ghana FDA registered facilities" (from
`shared/productIntelligence/publishedRegistry.ts`, identical across all
5 products). No certification beyond this appears anywhere.

| Item | Would require | Risk if published without approval |
| --- | --- | --- |
| ISO, HACCP, Codex, organic, Fair Trade, or any other named standard/certification | Documentary proof of the actual certification held, per product or per facility | `docs/PUBLIC_CLAIM_VERIFICATION_AUDIT.md` already found and removed one instance of exactly this ("manufacturing to international standards," "FDA compliance verification") for being unverifiable — adding a *named* certification without proof would repeat that mistake with a more specific, more checkable claim |
| Export-market-specific certification (e.g. an importing country's food-safety registration) | Business confirmation of which markets are actually certified for | Particularly relevant to international buyers per `docs/BUYER_CONVERSION_GAP_ANALYSIS.md`, but a wrong claim here could affect an actual customs clearance, not just marketing accuracy |

## Minimum Order Quantity (MOQ)

**Current state**: not published anywhere. `docs/PUBLIC_CLAIM_VERIFICATION_AUDIT.md`
removed the one instance that existed (a "500 kg" figure on `/about`
with no source). Every page that touches order volume defers to
per-enquiry review ("Order volume is reviewed per enquiry to match your
business size and market requirements").

| Item | Would require | Risk if published without approval |
| --- | --- | --- |
| A specific MOQ figure, per product or sitewide | Business decision on an actual minimum, and whether it's uniform across all 5 products or varies (e.g. by packaging format) | `BUSINESS_RULES.md` explicitly: "Do not publish... fixed MOQs... without current approval" — this is a direct rule, not an inference |
| An MOQ *range* framed as illustrative, non-binding | Same as above — even a hedged range is still a number the business hasn't supplied | Softer than a hard figure but still a factual claim requiring a real source |

## Lead times

**Current state**: not published anywhere, not even as a range. This
was flagged in `docs/BUYER_CONVERSION_GAP_ANALYSIS.md` as the single
highest-value content gap on the site — buyers comparing suppliers
typically weigh lead time heavily, and BorgaFoods currently gives them
nothing to compare.

| Item | Would require | Risk if published without approval |
| --- | --- | --- |
| A specific lead-time range (e.g. "typically 3–5 weeks") | Business confirmation of actual production/shipment timelines, and whether it varies meaningfully by product or volume | `BUSINESS_RULES.md` explicitly prohibits publishing lead times without approval |
| Separate ranges for standard vs. bulk/container orders | Business confirmation — likely genuinely different, but unverified here | Same rule; more specific claim needs more specific proof |

## Production capacity

**Current state**: not published anywhere, and not referenced even
indirectly (no monthly/annual volume figures, no "capacity to fulfill
container-scale orders" type statements beyond the already-approved,
non-numeric "full container loads" phrasing on `/about`, which itself
was reviewed and kept — it doesn't state a figure, only that container
loads are a format the business handles).

| Item | Would require | Risk if published without approval |
| --- | --- | --- |
| Monthly or annual production volume, per product or overall | Business confirmation of real figures | `PUBLIC_PRODUCT_PRESENTATION_RULES.md` explicitly lists "capacity" among claims that must not be added or implied without separate approval |
| Maximum single-order size | Business confirmation | Same rule; also commercially sensitive information the business may not want public regardless |
| Number of production lines/facilities | Business confirmation, plus a confidentiality check (facility detail could edge toward supplier/operational disclosure) | Same rule, plus `BUSINESS_RULES.md`'s broader prohibition on exposing operational detail |

## How to use this list

Each row above is independent — the business can approve some and not
others (e.g. approve a lead-time range while still declining to publish
MOQ). For any row the business wants to move forward on: supply the real
figure/fact, and this repository can draft the exact page wording for
review before anything is published, following the same pattern already
used successfully for the `/about` corrections
(`docs/PUBLIC_CLAIM_VERIFICATION_AUDIT.md`) — draft first, review,
apply only after explicit approval.

## Related documents

- `docs/BUYER_CONVERSION_GAP_ANALYSIS.md` — where the shipping-mode and lead-time gaps were first identified, from a buyer-conversion angle.
- `docs/PUBLIC_CLAIM_VERIFICATION_AUDIT.md` — the precedent for how an approved correction gets drafted and applied.
- `docs/BUSINESS_RULES.md`, `docs/PUBLIC_PRODUCT_PRESENTATION_RULES.md` — the rules every "risk if published" column above cites.
