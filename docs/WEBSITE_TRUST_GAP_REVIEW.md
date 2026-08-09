# Website Trust Gap Review — About, Export, Wholesale

Status: **Review only. No page content changed.** Reads `/about`
(`client/src/pages/About.tsx`), `/export`
(`client/src/pages/ExportCompliance.tsx`), and `/wholesale`
(`client/src/pages/Wholesale.tsx`) section by section, and sorts every
trust-relevant statement into one of two buckets: statements that could
be *strengthened* once the GEPA registration status is confirmed
(`docs/GEPA_RENEWAL_FOLLOWUP.md`), and statements that stay exactly as
they are regardless of that outcome, because they don't depend on it or
are already blocked on a separate, unrelated decision.

This is not a list of changes to make now. It's a map, so that once
GEPA confirmation lands, applying it is a lookup rather than a fresh
audit.

## How a statement qualifies as "strengthenable by GEPA"

Only statements about **export credibility, compliance, or registered
status** qualify — not every trust statement on these pages. A
statement qualifies if a confirmed, current GEPA registration would
make it *more specific or more verifiable* without changing its
meaning. A statement does not qualify just because it's near export
content, or because strengthening it would be nice — it has to be the
kind of claim GEPA registration actually supports.

---

## `/about`

| Section | Statement | Strengthenable after GEPA? | Reasoning |
| --- | --- | --- | --- |
| Header | "About Supply & Demand Worldwide Ltd" / "Professional export solutions..." | No | Generic positioning, not a specific compliance claim |
| Our Story | "legally registered limited liability company in Ghana, established in 2013" | No | Already a specific, already-verified fact (Ghana company registration), independent of GEPA |
| Our Story | "we specialize in exporting traditional West African staple foods to global markets" | No | General capability statement, already accurate and already live |
| Key Facts panel | Established / Trading Experience / Operations / Languages | No | None of these four facts relate to export registration |
| Value Chain — step 3 "Quality Assurance" | "Facility registration and compliance with Ghana FDA requirements" | No | This is the Ghana FDA fact specifically, a separate registration from GEPA — do not conflate the two even after GEPA resolves |
| **Value Chain — step 4 "Export & Logistics"** | "Professional handling and reliable delivery to international partners" | **Yes** | This is exactly the kind of generic export-competence claim a confirmed GEPA registration could replace or supplement with something specific and verifiable, e.g. adding "as a GEPA-registered exporter" |
| **Competitive Advantages — "Export Experience"** | "Operating internationally since 2013, coordinating customs, compliance, and logistics requirements for each shipment" | **Yes** | "Compliance" here is currently a vague, unsupported-by-name claim. A confirmed registration number gives this sentence something concrete to point to |
| Competitive Advantages — "Standardized Quality" | "manufactured at Ghana FDA registered facilities" | No | Ghana FDA fact, independent of GEPA |
| Competitive Advantages — "Order Flexibility", "Global Presence" | — | No | Not export-compliance claims |
| Partnership Philosophy (all 3 cards) | — | No | Relationship/communication claims, unrelated to registration status |

**Net for `/about`**: 2 candidate locations (Value Chain step 4,
Competitive Advantages "Export Experience"), both currently generic
enough that they're not violating any rule today — they just have room
to become more specific and verifiable once GEPA is confirmed. Neither
needs to change if GEPA renewal turns out not to be current; they'd
simply stay as they are.

---

## `/export`

| Section | Statement | Strengthenable after GEPA? | Reasoning |
| --- | --- | --- | --- |
| Hero | "Requirements Coordinated for Each Export Enquiry" / subhead | No | Process description, not a compliance claim |
| "What We Coordinate" — Export documentation card | "Commercial and shipment document requirements are identified according to the agreed transaction and destination" | No | Describes a process, not a registration status |
| "What We Coordinate" — other 3 cards (Packaging, Destination requirements, Shipment coordination) | — | No | Same — process descriptions |
| "Information Confirmed Before Quotation" — both cards | — | No | Enquiry-intake checklists, not compliance claims |
| **Shipment Planning — "Export origin: Ghana"** | "Final port and routing arrangements are confirmed for the shipment" | **Yes, adjacent** | Not itself a GEPA-dependent statement, but this is the most natural place on the page to add a short "registered exporter" line if BorgaFoods wants one, since it's already the page's compliance/credibility section |
| Shipment Planning — Trade terms, Lead time | — | No | Both explicitly deferred to "confirmed per enquiry," open items in `docs/COMMERCIAL_INFO_DECISION_RECORD.md`, unrelated to GEPA |
| CTA | — | No | Call to action only |

**Net for `/export`**: no existing statement is currently *weak* in a
way GEPA fixes — this page's language is already carefully hedged
("confirmed per enquiry" everywhere). The opportunity here isn't
strengthening an existing sentence, it's **adding** a new, short
registered-exporter line near "Shipment Planning," which is what
`docs/GEPA_CREDIBILITY_SECTION_PROPOSAL.md` Option A already drafts for
`/about`'s Key Facts panel — the same line could equally suit this
page's Shipment Planning section as a second placement, a decision for
whoever applies the confirmed wording.

---

## `/wholesale`

| Section | Statement | Strengthenable after GEPA? | Reasoning |
| --- | --- | --- | --- |
| Hero | "Ghanaian Food Supply for Trade Buyers" / subhead | No | Positioning, not a compliance claim |
| "Who We Support" (4 buyer-type cards) | — | No | Buyer-persona descriptions, unrelated to registration |
| "Wholesale Enquiries" card | "BorgaFoods manufactured staple foods" / "Approved BorgaFoods Export Selection categories" | No | Product-scope statements, not compliance claims |
| "Bulk & Container Enquiries" card | "Mixed container enquiries can include eligible BorgaFoods manufactured products and approved partner-sourced selections, with each supply type clearly identified" | No | Already carefully worded per `BUSINESS_RULES.md`'s supply-type disclosure rule — unrelated to GEPA and should not be touched by this workstream |
| Private-label Discovery card | — | No | Governed entirely by BPIP's private-label approval gate, unrelated to export registration |
| Distributor Partnerships section | — | No | Partnership-process description |
| CTA | — | No | Call to action only |

**Net for `/wholesale`**: no statement on this page qualifies. GEPA
registers *exporters*; `/wholesale` is written for buyers assessing
supply relationships and product scope, not export-compliance
credentials. This matches this project's earlier finding
(`docs/BUYER_INTENT_CONTENT_AUDIT.md`) that `/export` and `/wholesale`
serve deliberately different buyer questions — nothing here should
change even after GEPA confirmation.

---

## Summary

| Page | Candidate locations for strengthening | Statements that stay unchanged regardless |
| --- | --- | --- |
| `/about` | Value Chain step 4 ("Export & Logistics"); Competitive Advantages "Export Experience" | Everything else — Key Facts, Ghana FDA references, Partnership Philosophy |
| `/export` | Shipment Planning section (new addition, not a rewrite) | Every "confirmed per enquiry" deferral (all still open in `docs/COMMERCIAL_INFO_DECISION_RECORD.md`) |
| `/wholesale` | None | Everything — this page doesn't make export-registration claims |

**Total: 2 existing statements with room to strengthen, plus 1 page
(`/export`) where a short new line could be added — none of them
overclaiming today, none requiring a change if GEPA turns out to be
lapsed.** This matches how `docs/GEPA_CREDIBILITY_SECTION_PROPOSAL.md`
was already scoped (`/about`'s Key Facts panel); this review adds two
more candidate locations and confirms `/wholesale` needs no equivalent
treatment.

## What this repository will do once GEPA status is confirmed

Draft the specific wording for whichever of the candidate locations
above BorgaFoods wants updated, using Option A or B from
`docs/GEPA_CREDIBILITY_SECTION_PROPOSAL.md` as the base statement,
following the same draft → review → apply → verify-live pattern used
for every prior claim change in this project
(`docs/PUBLIC_CLAIM_VERIFICATION_AUDIT.md` is the precedent). Not done
as part of this review, since it's contingent on a confirmation that
hasn't happened yet.

## Related documents

- `docs/GEPA_CREDIBILITY_SECTION_PROPOSAL.md` — the open GEPA question and the two ready wording options this review's candidates would use.
- `docs/GEPA_RENEWAL_FOLLOWUP.md` — how that confirmation gets requested.
- `docs/PUBLIC_CLAIM_VERIFICATION_AUDIT.md` — the precedent for how a confirmed change gets applied to these pages.
- `docs/BUYER_INTENT_CONTENT_AUDIT.md` — why `/export` and `/wholesale` are scoped to different buyer questions, relevant to why `/wholesale` has no candidates here.
- `docs/COMMERCIAL_INFO_DECISION_RECORD.md` — the separate, GEPA-unrelated open items on `/export` (trade terms, lead time).
