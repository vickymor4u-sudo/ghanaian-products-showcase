# Buyer Objection Analysis

Status: **Analysis complete; one safe, high-confidence fix implemented
(see the end of this document and
`docs/LEAD_GENERATION_CHANGE_REPORT.md` for validation). Every other
finding is categorized and left for business input or explicitly not
pursued.** Reviewed the live site (`www.borgafoods.com`, post
`docs/LEAD_GENERATION_CHANGE_REPORT.md`'s changes) as each of the 4
personas named in this phase's brief would actually experience it —
landing page, product pages, `/export`, `/wholesale`, and `/contact` —
and recorded every real question, hesitation, or missing answer found
along the way.

## Method and honesty note

This is a structured read-through against each persona's likely actual
priorities, not a survey of real buyers — no real buyer feedback exists
yet (confirmed by `docs/SEARCH_PERFORMANCE_BASELINE.md`: 0 clicks,
essentially no real visitor behavior to observe). Every finding below
is grounded in what's actually present or absent on the live site
today, not invented. Where a persona's likely question genuinely isn't
answerable from this repository's knowledge (e.g. "do you have a real
US customer already?"), that's recorded as a fact-finding gap for the
business, not guessed at.

---

## A. European importer (UK / Netherlands / Germany)

Reading `/`, `/about`, `/export`, a product page, and `/contact` as
this persona:

| Objection / question | Answered on site today? | Category |
| --- | --- | --- |
| "Is this a real, registered exporter?" | **Yes** — GEPA registration now visible on `/`, `/about`, `/export`, and every product FAQ (`docs/LEAD_GENERATION_CHANGE_REPORT.md`) | Already resolved |
| "What Incoterms do you offer (FOB, CIF, EXW)?" | No — "trade terms" deferred to "agreed per shipment" | B |
| "What documents will I actually receive (Certificate of Origin, phytosanitary certificate, commercial invoice)?" | No — only the general category "export documentation" is named | B — tracked in `docs/COMMERCIAL_INFO_DECISION_RECORD.md` row 4 |
| "Any certification beyond Ghana FDA — HACCP, BRC, ISO, organic?" | No, and correctly not claimed | B — real capability question, not a content gap; nothing to publish either way without a supported fact |
| "What's the MOQ and pricing structure?" | No — "reviewed per enquiry" throughout | B — `docs/COMMERCIAL_INFO_DECISION_RECORD.md` row 1 |
| "Can I get a sample before committing?" | Implied as a discussable topic (`Home.tsx`'s closing CTA mentions "product samples") but no process, cost, or lead time stated | C — already appropriately hedged; inventing a sample process/cost would be an unsupported claim, not a wording fix |
| "Is there support in a European language?" | No — English and Chinese only, stated as fact on `/about` | C — English is the standard B2B export/trade language; no evidence this is a real blocker for this persona specifically |

---

## B. US African-grocery distributor

Reading `/`, `/wholesale`, a product page, and `/contact` as this
persona:

| Objection / question | Answered on site today? | Category |
| --- | --- | --- |
| "Do you already ship to the US? Any existing customers there?" | No — no testimonials or case studies anywhere on the site | B — correctly absent (nothing to feature honestly yet); revisit once real customer relationships exist, never fabricate in the meantime |
| "Shelf life — will it survive ocean freight plus distribution time?" | **Yes** — shelf life and storage are stated per product, both in the product-details card and the FAQ | Already resolved |
| "US import requirements (FDA facility registration, prior notice, labeling)?" | No — export documentation is only described generically ("confirmed per enquiry") | B — needs business input on actual US-specific experience/process before anything specific could be published |
| "Are labels US-compliant (nutrition facts panel, English labeling)?" | No | B — real capability/fact question, not answerable from this repository |
| "Payment terms (LC, TT, other)?" | No | B — `docs/COMMERCIAL_INFO_DECISION_RECORD.md` (trade terms, adjacent to row 1) |
| "Who am I actually dealing with — a manufacturer or a trading middleman?" | **Yes** — the manufactured-vs-partner-sourced distinction is explicit and consistent sitewide, and stated as a feature on the homepage itself | Already resolved |

---

## C. Chinese wholesaler

Reading `/`, `/about`, `/contact`, and `/wholesale` as this persona —
notable because BorgaFoods has an actual operational base in Hangzhou,
which changes what this persona would reasonably expect to find:

| Objection / question | Answered on site today? | Category |
| --- | --- | --- |
| "Is there Chinese-language content or support?" | **Partially** — `/about` states "Languages: English, Chinese" as a company fact, and the China office phone/WhatsApp number is listed on `/contact` and in the footer, but **the website itself has no Chinese-language version** — a Chinese-speaking visitor lands on an all-English site despite the company stating bilingual capability | B — real, non-trivial scope (site localization is a genuine feature-sized project); flagged as a real trust/usability gap, not something to build inside this phase's "safe improvement" scope |
| "Do you have a China-based contact I can actually call?" | **Yes** — China office phone and WhatsApp are already listed, prominently, on `/contact`, `/about`, and the footer | Already resolved |
| "Can I pay in RMB, or via Alipay/WeChat Pay?" | No | B — trade/payment terms, same open category as elsewhere |
| "Is this a legitimate operation?" | **Yes** — GEPA registration, Ghana FDA facilities, founding year, and dual-office presence together are a reasonably strong, already-live trust package | Already resolved |
| "What does the actual Ghana-to-China export process look like — customs, shipping lines, transit time?" | No — same generic "confirmed per enquiry" language as every other destination | B — same underlying gap `docs/BUYER_INTENT_CONTENT_AUDIT.md` already flagged for `/export` generally, not new to this persona |
| "Given you have a Hangzhou office, do you already have China-market distribution or customers?" | Not stated either way | B — genuine fact-finding question for the business; this repository has no visibility into what the Hangzhou office actually does day to day beyond what's already published (a contact point) |

---

## D. Private-label buyer

Reading `/wholesale`'s Private-label Discovery section, a product page,
and `/contact` as this persona:

| Objection / question | Answered on site today? | Category |
| --- | --- | --- |
| **"Which product can I actually get as private label?"** | **No — this was a real, fixable gap.** `/wholesale`'s Private-label Discovery card said only "selected products," without naming which one. The only place the answer (Fufu Flour) was actually visible was on that one product's own page — a buyer would have to guess, browse all 5 product pages, or submit an enquiry for the wrong product and get rejected by the RFQ form's allowlist before finding out. | **A — fixed this phase, see below** |
| "What's the minimum order for private label?" | No | B — `docs/COMMERCIAL_INFO_DECISION_RECORD.md` row 5 (capacity/volume) |
| "Can I control packaging and artwork fully?" | Implied yes — `/contact`'s private-label qualification fields already ask about artwork readiness and labeling requirements, and `/wholesale`'s copy states packaging is reviewed individually | C — already adequately covered generically; no false claim to correct |
| "Is my private-label concept kept confidential?" | Not addressed anywhere | B — genuine question this repository can't answer (no visibility into whether BorgaFoods has an NDA process) |
| "Can you scale production if my private-label line succeeds?" | No — production capacity isn't published anywhere | B — `docs/COMMERCIAL_INFO_DECISION_RECORD.md` row 5, already tracked |
| "Does submitting an enquiry commit me to anything?" | **Yes, clearly answered** — "submitting an enquiry does not create a customer commitment," stated explicitly | Already resolved |

---

## Cross-persona findings (not specific to one segment)

| Objection | Category | Note |
| --- | --- | --- |
| No visible testimonials, case studies, or buyer logos | B | Correctly absent — nothing to fabricate; revisit only once real customer relationships exist to feature accurately |
| No downloadable company/export-profile PDF | B | Blocked on a missing logo/brand-imagery asset, already tracked in `docs/BUYER_PACKAGE_STRUCTURE.md` — not a website content gap |
| No explicit response-time commitment | B | `/contact` states business hours; a specific "we reply within X days" would need a real commitment this repository doesn't have |
| MOQ, shipping mode, lead time, specific export documents, production capacity all deferred to "per enquiry" | B | Already fully tracked, all five, in `docs/COMMERCIAL_INFO_DECISION_RECORD.md` — re-confirmed still accurate and still open |

---

## Summary — A / B / C counts

| Category | Count | Meaning |
| --- | --- | --- |
| **A — Fix now** | 1 | Implemented this phase (below) |
| **B — Requires business decision or input** | 17 | Real questions, no invented answers — each maps to an already-tracked decision record or a genuine fact-finding gap only BorgaFoods can close |
| **C — Not necessary** | 5 | Already adequately covered, or the "gap" would require an unsupported claim to close |
| Already resolved (found already answered while checking) | 7 | Confirms prior phases' trust-signal and consistency work is holding up under persona-specific scrutiny, not just a general read |

The single largest category (B) is not a failure of this audit — it's
an accurate reflection of how much of real B2B export trust-building
(certifications, payment terms, documented customer history, exact
logistics) depends on operational facts this repository has no
authority to publish without the business supplying them. Manufacturing
new website copy to paper over any of these would violate the mission's
own "no unsupported claims" constraint more than it would help.

---

## Fix implemented this phase

**Finding**: Category D's first row — a private-label buyer had no way
to learn which product BorgaFoods actually offers for private-label
discovery without leaving `/wholesale` and searching.

**Fix**: `client/src/pages/Wholesale.tsx`'s Private-label Discovery
section now names Fufu Flour explicitly: "BorgaFoods currently supports
private-label discussions for Fufu Flour, reviewed individually based
on product specifications, packaging requirements, order volume, and
production feasibility." (Previously: "...supports private-label
discussions for selected products...")

**Why this qualifies as safe and in-scope**: states a fact that was
already true and already visible elsewhere (Fufu Flour's own product
page has carried this exact scoping since the product pages were
built) — no new claim, no BPIP change, no RFQ logic change, not a new
page or feature. It directly reduces a specific, identified source of
mismatched or wasted enquiries (a buyer interested in, say, Gari
private-label submitting an enquiry that the RFQ form's allowlist would
reject) — a direct, traceable improvement to enquiry quality, which is
this phase's explicit priority over enquiry volume.

**Validation**: see `docs/LEAD_GENERATION_CHANGE_REPORT.md` for the
full validation record (typecheck, build guards, tests, preview and
production verification).

## What was not implemented, and why

Every other Category A candidate considered — a Chinese-language site,
US-specific import/labeling content, Incoterm/documentation specifics,
NDA process disclosure — either requires a business decision this
repository can't make (a real fact, a real commitment, or a real scope
decision like full localization) or would require inventing a claim
this project's entire standing discipline exists to prevent. None of
them is a "safe improvement" in the sense this phase's instructions
mean — implementing any of them today would mean guessing at facts on
BorgaFoods' behalf.

## Related documents

- `docs/LEAD_GENERATION_CHANGE_REPORT.md` — the validation record for the Wholesale.tsx fix.
- `docs/COMMERCIAL_INFO_DECISION_RECORD.md` — the 5 open commercial-fact decisions referenced repeatedly above.
- `docs/BUYER_INTENT_CONTENT_AUDIT.md` — the earlier, persona-level audit this document extends with 4 specific buyer-role read-throughs.
- `docs/OUTREACH_EXECUTION_PLAN.md` — where the private-label landing-page recommendation (send this segment to the Fufu Flour product page specifically) was already reasoned through, now reinforced by this finding.
- `docs/BUYER_PACKAGE_STRUCTURE.md` — the missing-asset reason behind the downloadable-PDF cross-persona finding.
