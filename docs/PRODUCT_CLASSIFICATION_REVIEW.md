# Product Classification Review List

Status: **Internal business validation required. Do not publish, change, or extend these classifications in Phase 4 until resolved.**

Created: 7 August 2026

This list intentionally contains only the product records requiring business validation from the approved capability model. It does not expose supplier or source-brand information.

| Review ID | Product      | Validation required                                                                                                 | Current handling                                                                                                                                                                                                                                 | Required business decision                                                                                                                                                                                                                       |
| --------- | ------------ | ------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| PCR-001   | Fufu Flour   | Reconcile the source-record brand/classification conflict with the approved BorgaFoods manufactured-product record. | Retain the existing approved catalog record. A narrow business decision now permits **Fufu Borga only** in the manual private-label discovery path; it does not authorize wider Phase 4 packaging, export, classification, or capability claims. | Private-label discovery approval is recorded for the existing `fufu-borga` manufactured catalog record only. Continue to confirm MOQ, packaging, specifications, production feasibility, and regulatory requirements manually before acceptance. |
| PCR-002   | Red Palm Oil | Reconcile the conflicting supply indicators across the source packaging records.                                    | Treat as `partner_sourced` internally for planning; do not publicly list it, describe it as manufactured, or present private-label eligibility.                                                                                                  | Confirm whether any specific offer is manufactured by BorgaFoods Processing; otherwise retain `partner_sourced` and require separate approval before publication.                                                                                |

## Release gate

Red Palm Oil may not be added to new Phase 4 website content, public product data, schema markup, buyer-facing quotation options, or private-label eligibility messaging until the required decision is recorded in the central catalog and capability model.

PCR-001 has a narrow, recorded exception: the existing manufactured `fufu-borga` catalog record may be included in the private-label discovery selector only. It remains subject to manual review and must not be used to infer broader manufacturing, packaging, export, regulatory, or OEM capability.
