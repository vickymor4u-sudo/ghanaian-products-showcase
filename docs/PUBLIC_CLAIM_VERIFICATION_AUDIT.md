# Public Claim Verification Audit

Status: **All 7 drafted corrections approved and applied, 9 August
2026, live in production.** Originally: "Audit complete. Corrections
drafted below, none applied." — superseded once the corrections were
explicitly approved as part of "BorgaFoods Content Architecture
Implementation — Phase 1." The findings and draft text below are kept
as the record of what was found and why; every "Draft correction (not
applied)" below is now the live text in `client/src/pages/About.tsx`.

## Method

Every factual or capability claim on `/about`, `/export`, `/wholesale`,
and `/products` was checked against the three documents that actually
govern what BorgaFoods can say publicly:

- `docs/BUSINESS_RULES.md` — approved product facts, wording, and the explicit prohibition list ("Do not publish prices, fixed MOQs, certifications, lead times, trade terms, territories, or exclusivity promises without current approval," "Avoid unsupported superlatives and absolute guarantees").
- `docs/PRODUCT_CAPABILITY_MODEL.md` — the frozen capability fields and what `approved_for_discovery` private-label status does and does not authorize.
- `docs/PUBLIC_PRODUCT_PRESENTATION_RULES.md` — the explicit list of things that must not be added or implied "unless the exact claim is separately approved" (custom packaging, custom formulations, capacity, certifications, MOQ, lead time, exclusivity).

A claim counts as **supported** if it matches an approved fact/wording
exactly or is a direct, hedged restatement of one. It counts as
**unsupported** if it states a specific number, certification, or
capability that appears nowhere in the governing documents, or uses an
absolute/superlative construction ("every," "proven," "guaranteed")
against something no document verifies.

## Result summary

| Page | Unsupported claims found |
| --- | --- |
| `/about` | **7** (see below) |
| `/export` | 0 |
| `/wholesale` | 0 |
| `/products` | 0 |

`/export`, `/wholesale`, and `/products` are already written in the
hedged, per-enquiry-confirmed voice the business rules require, and
`/products` in particular is mostly a direct rendering of BPIP data
rather than freehand copy — there's very little surface for an
unsupported claim to appear. `/wholesale`'s private-label section is, in
fact, a near-exact quote of the approved wording in
`BUSINESS_RULES.md` §"Private-label discovery rules." All findings
concentrate on `/about`, which reads in a noticeably more assertive
register than the rest of the site (this was flagged at the tone level
in the prior phase's `docs/BUYER_INTENT_CONTENT_AUDIT.md` §5; this audit
re-examines the same page against the explicit rule text rather than
tone alone, and finds specific rule violations, not just a style
mismatch).

## Findings on `/about`, in severity order

### 1. Specific MOQ figure — direct rule violation

> "Flexible MOQs: Scalable solutions for distributors of all sizes. **From 500 kg to full container loads.**"

**Rule violated**: `BUSINESS_RULES.md` — "Do not publish prices, fixed
MOQs, certifications, lead times, trade terms, territories, or
exclusivity promises without current approval." No product record in
`publishedRegistry.ts` or any governing document specifies a 500 kg (or
any) minimum order quantity. This is the single clearest violation on
the site — a concrete, checkable number that isn't backed by anything.

**Draft correction** (not applied):
> "Order Flexibility: Order volume is reviewed per enquiry to match your business size and market requirements."

This matches the pattern already used correctly elsewhere on the site
(`/products`: "Estimated initial order volume... commercial terms
confirmed in quotation"; `/wholesale`: "expected order volume").

### 2. Unverified certification/testing claim

> "Quality Assurance: **Rigorous testing and FDA compliance verification.**"

**Rule violated**: `PRODUCT_CAPABILITY_MODEL.md`'s approved certification
value, present per-product in BPIP, is "Ghana FDA registered facilities"
— a fact about facility registration. "Rigorous testing" and "compliance
verification" are separate, more specific claims about testing protocols
and verification processes that appear nowhere in the capability model.

**Draft correction** (not applied):
> "Quality Assurance: Facility registration and compliance with Ghana FDA requirements."

### 3. Absolute claim, unverified standard

> "Standardized Quality: Consistent product specifications across all batches. **Every product meets international standards.**"

**Rule violated**: `BUSINESS_RULES.md` — "Avoid unsupported superlatives
and absolute guarantees." "International standards" names no specific,
checkable standard (ISO, HACCP, Codex, or otherwise), and none is
recorded in BPIP. "Every product" is an absolute claim resting on that
same unverified standard.

**Draft correction** (not applied):
> "Standardized Quality: Consistent product specifications across all batches, manufactured at Ghana FDA registered facilities."

### 4. Unsupported superlative — "proven track record"

> "Export Experience: **Proven track record** with international markets. We understand customs, compliance, and logistics."

**Rule violated**: `BUSINESS_RULES.md`'s superlative prohibition. Nothing
documents a specific export history or case record beyond the company's
founding date (2013), which is already stated elsewhere on the same
page.

**Draft correction** (not applied):
> "Export Experience: Operating internationally since 2013, coordinating customs, compliance, and logistics requirements for each shipment."

(Grounds the claim in the one fact that *is* verified elsewhere on the
page — the founding year — instead of an unverifiable superlative.)

### 5. Unverified quality/process claim

> "Production: **Manufacturing to international standards** with quality control."

**Rule violated**: same as Finding 3 — no specific standard is recorded
anywhere in BPIP or the business rules.

**Draft correction** (not applied):
> "Production: Manufacturing with consistent process and quality controls at BorgaFoods Processing."

### 6. Possible implied product-customization capability

> "Mutual Growth: ... **Customization for your needs**"

**Rule violated**: `PUBLIC_PRODUCT_PRESENTATION_RULES.md` explicitly
lists "custom packaging, custom formulations" among claims that must not
be implied "unless the exact claim is separately approved for that
product." No product has such an approval. This phrase is ambiguous — it
could mean "we tailor the *quote* to your needs" (fine, matches
`/products`' "customized quote and timeline," which is about the
enquiry process, not the product) or "we customize the *product*"
(not approved). Flagged as **moderate risk** because of that ambiguity,
not a certain violation.

**Draft correction** (not applied):
> "Mutual Growth: ... Enquiries reviewed against your specific requirements"

### 7. Inconsistent with actual site behavior — "clear pricing"

> "Transparent Communication: ... **Clear pricing and terms**"

**Rule violated**: not a rule text match, but an internal-consistency
problem — `BUSINESS_RULES.md` prohibits publishing prices without
approval, and indeed no price appears anywhere on the live site. Listing
"clear pricing" as a value proposition claims something the site itself
never demonstrates.

**Draft correction** (not applied):
> "Transparent Communication: ... Clear communication on terms and next steps"

## Lower-priority, not drafted as corrections

Two phrases are soft/marketing language rather than checkable factual
claims, and are noted for awareness rather than given draft corrections:
"scalable sourcing and logistics partners" (Our Story) and "reliable
delivery to international partners" (Value Chain → Export & Logistics).
Both use mild superlatives ("scalable," "reliable") without a specific
number or guarantee attached, which is a lower-severity pattern than
Findings 1–7 above. If the business wants a fully conservative pass,
these are worth revisiting; they are not flagged as rule violations on
their own.

## Applied, 9 August 2026

All 7 corrections above were approved and applied to
`client/src/pages/About.tsx` exactly as drafted, verified in a preview
deployment, then deployed to production (commit `d0ac435`, merged in
`6ea7eb9`). No data model, routing, or BPIP change was required — every
correction only removed or reworded existing static JSX text. The two
lower-priority phrases noted in the previous section ("scalable sourcing
and logistics partners," "reliable delivery to international partners")
were left unchanged, as originally scoped.

## Related documents

- `docs/BUYER_INTENT_CONTENT_AUDIT.md` §5 — the tone-level version of finding 3 from the prior phase, superseded in specificity by this audit.
- `docs/CONTENT_ARCHITECTURE_IMPLEMENTATION_PLAN.md` — where applying these corrections is tracked as a plan item requiring business approval.
