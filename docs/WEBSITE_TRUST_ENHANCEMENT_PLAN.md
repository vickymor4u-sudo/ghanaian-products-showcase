# Website Trust Enhancement Plan — /about, /export, /wholesale

Status: **Plan only. No page edited, no code changed.** Builds directly
on `docs/WEBSITE_TRUST_GAP_REVIEW.md`'s statement-by-statement audit,
now that GEPA registration status is confirmed
(`docs/GEPA_CREDIBILITY_SECTION_PROPOSAL.md`). Sorts every candidate
into three buckets — supported by GEPA evidence and ready to draft
wording for, still blocked on a separate business decision, or
deliberately left unchanged — with actual proposed copy for bucket A,
so a future implementation pass has exact text to review rather than a
placeholder.

## A. Changes supported by GEPA evidence — ready to propose wording

These are the exact locations `docs/WEBSITE_TRUST_GAP_REVIEW.md`
identified as strengthenable once GEPA was confirmed. All three use
`docs/GEPA_CREDIBILITY_SECTION_PROPOSAL.md`'s finalized Option A wording
— no new claim, no invented expiry/renewal date.

### A1. `/about` — Key Facts panel (new item)

**File**: `client/src/pages/About.tsx`, the "Key Facts" panel (currently
Established / Trading Experience / Operations / Languages).

**Proposed addition**, as a new panel item or a short callout beneath
the existing four:

> **Registered Exporter**
> Supply and Demand Worldwide Limited is registered with the Ghana
> Export Promotion Authority (GEPA) as a commercial exporter
> (Registration No. GEPA2018800113).

This was `docs/GEPA_CREDIBILITY_SECTION_PROPOSAL.md`'s original
proposed placement, kept as the primary recommendation.

### A2. `/about` — Value Chain, step 4 "Export & Logistics"

**File**: `client/src/pages/About.tsx`, the 4-step Value Chain grid.

**Current text**: "Professional handling and reliable delivery to
international partners."

**Proposed replacement**:

> "GEPA-registered export handling, with reliable delivery to
> international partners."

Short enough to fit the existing card layout (current text is 8 words;
proposed is 9). Keeps the step's meaning intact while replacing a
generic claim with a specific, now-verifiable one.

### A3. `/about` — Competitive Advantages, "Export Experience"

**File**: `client/src/pages/About.tsx`, the 4-card "Why Partner With
Us" grid.

**Current text**: "Operating internationally since 2013, coordinating
customs, compliance, and logistics requirements for each shipment."

**Proposed replacement**:

> "Operating internationally since 2013 as a GEPA-registered commercial
> exporter, coordinating customs, compliance, and logistics
> requirements for each shipment."

Adds 6 words: "as a GEPA-registered commercial exporter" — a direct,
specific substitution for the previously vague "compliance" reference.

### A4. `/export` — Shipment Planning section (new addition)

**File**: `client/src/pages/ExportCompliance.tsx`, the 3-card
"Shipment Planning" section (Export origin / Trade terms / Lead time).

**Proposed addition**, as a short line above or below the 3-card grid
rather than a 4th card (the existing cards are process descriptions;
this is a credential, a different kind of content):

> Supply and Demand Worldwide Limited (the company behind BorgaFoods)
> is a registered commercial exporter with the Ghana Export Promotion
> Authority (GEPA), Registration No. GEPA2018800113.

**Note**: this is a *new* addition, not a rewrite — nothing on
`/export` currently makes an unsupported claim this fixes; the page's
existing "confirmed per enquiry" language stays exactly as it is
either way (see bucket B).

### Structured data — optional, same evidence

Not requested by `docs/WEBSITE_TRUST_GAP_REVIEW.md` but worth noting
here: `client/src/components/SchemaMarkup.tsx`'s `Organization` record
could add GEPA's registration as `identifier` or a similar schema.org
property once the wording above is applied to `/about`, so the
structured data and visible page text stay in sync (this project's
established pattern — see `docs/SEO_FOUNDATION.md`). Flagged as a
follow-up, not proposed with exact code here, since it depends on which
page-text placement (A1–A4) is approved first.

---

## B. Changes still requiring a separate business decision

Unaffected by GEPA confirmation — every item below was already
identified in `docs/COMMERCIAL_INFO_DECISION_RECORD.md` and remains
open regardless of GEPA's status:

| Item | Where | Current state |
| --- | --- | --- |
| MOQ (minimum order quantity) | `/about`, `/products`, product pages | "Reviewed per enquiry" — unchanged |
| Shipping mode (sea/air) | `/export`, product pages | "Confirmed per enquiry" — unchanged |
| Lead time | `/export`, product pages | Not published, not even as a range |
| Export document types (naming Certificate of Origin, etc. specifically) | `/export` | Only the general category "export documentation" is named |
| Production capacity | `/about` | Not published or implied |

GEPA registration is an export-credential fact; none of the five items
above are credential facts — they're operational figures only
BorgaFoods can supply. Confirming GEPA does not unblock any of them.

---

## C. Changes that should remain unchanged

From `docs/WEBSITE_TRUST_GAP_REVIEW.md`'s full audit, restated here for
completeness — these don't qualify for strengthening under any
circumstance, GEPA-related or not:

- **`/about`** — Key Facts' existing 4 items (Established, Trading
  Experience, Operations, Languages), the "Our Story" paragraphs, Value
  Chain steps 1–3, Competitive Advantages' "Standardized Quality"
  (Ghana FDA fact, a separate registration from GEPA — do not conflate
  the two), "Order Flexibility," "Global Presence," and all of
  Partnership Philosophy.
- **`/export`** — the "What We Coordinate" cards, "Information
  Confirmed Before Quotation" cards, and Trade terms / Lead time within
  Shipment Planning (both explicitly deferred, bucket B items).
- **`/wholesale`** — the entire page. GEPA registers *exporters*;
  `/wholesale` is written for buyers assessing supply relationships and
  product scope, not export-compliance credentials
  (`docs/BUYER_INTENT_CONTENT_AUDIT.md`). No statement here qualifies
  for GEPA-based strengthening.

---

## Summary

| Bucket | Count | Action |
| --- | --- | --- |
| A — GEPA-supported, wording ready | 4 (3 on `/about`, 1 on `/export`) | Awaiting a decision on which placement(s) to implement — not all 4 need to ship together |
| B — needs a separate business decision | 5 | Unaffected by this phase; tracked in `docs/COMMERCIAL_INFO_DECISION_RECORD.md` |
| C — stays as-is | Everything else on all 3 pages | No action |

**No implementation in this document, as instructed.** If BorgaFoods
approves one or more of bucket A's proposed wordings, the next step is
the same draft → review → apply → verify-live pattern used for every
prior claim change in this project (`docs/PUBLIC_CLAIM_VERIFICATION_AUDIT.md`
is the precedent): apply the approved text to the relevant `.tsx` file,
run the full validation suite, and verify the change live in production
before considering it done.

## Related documents

- `docs/WEBSITE_TRUST_GAP_REVIEW.md` — the original statement-by-statement audit this plan builds on.
- `docs/GEPA_CREDIBILITY_SECTION_PROPOSAL.md` — the confirmation record and finalized wording source for every bucket-A proposal.
- `docs/COMMERCIAL_INFO_DECISION_RECORD.md` — the 5 bucket-B items and their sign-off sheet.
- `docs/PUBLIC_CLAIM_VERIFICATION_AUDIT.md` — the precedent for how an approved change actually gets applied and verified.
