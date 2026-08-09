# Website Conversion Review — Outreach Journey

Status: **Review only. No code changed.** Walks the buyer journey this
outreach system is designed to create — *receives an email → visits the
website → decides whether to contact* — against the site as it exists
today (`client/src/pages/Home.tsx`, `About.tsx`, `ExportCompliance.tsx`,
`Wholesale.tsx`, `Products.tsx`, `ProductDetail.tsx`, `Contact.tsx`,
`Footer.tsx`). Sorted into missing trust elements, missing information,
and unnecessary friction, each with a concrete, low-risk next step —
none implemented here.

## Where a buyer actually lands

Each outreach template links to a specific page, not just the
homepage: Sequence A (distributors) and B (importers) point to the
homepage and `/wholesale`; Sequence C (private-label) points to
`/wholesale`'s Private-label Discovery section. A buyer following a
product-specific conversation would land on a `/products/*` page
instead. This review checks all of these landing points, not just Home.

---

## A. Missing trust elements

### A1. No real logo or visual brand mark anywhere on the site

Confirmed: no logo file exists in this repository
(`client/public/images/` contains only 7 product photos). The site
currently presents as a text wordmark only. For a cold buyer with no
prior relationship, a missing/placeholder brand mark reads as
less-established — this is the same gap already flagged for LinkedIn
(`docs/LINKEDIN_LAUNCH_CHECKLIST.md`) but it also affects the website
directly, and the website is arguably the higher-stakes surface since
it's where the actual purchase decision happens.

### A2. GEPA registration — confirmed internally, not yet visible on the site

`docs/GEPA_CREDIBILITY_SECTION_PROPOSAL.md`'s wording is finalized and
`docs/WEBSITE_TRUST_ENHANCEMENT_PLAN.md` already has 4 exact candidate
placements drafted (`/about` Key Facts, Value Chain, Competitive
Advantages; `/export` Shipment Planning). **Not yet applied.** A buyer
arriving today from an outreach email that itself cites the GEPA
registration (per `docs/BUYER_OUTREACH_SEQUENCE.md`) would currently
find no matching confirmation anywhere on the website — the email
claims more than the site currently shows, which is a real,
already-identified gap, not a new one. This is the single most
actionable item in this whole review, since the fix already exists in
draft form.

### A3. No footer LinkedIn link (still the generic placeholder)

`client/src/components/Footer.tsx:29` points to `https://linkedin.com`,
not a real company page. Since LinkedIn isn't live yet
(`docs/LINKEDIN_LAUNCH_CHECKLIST.md`), this isn't fixable independently
— it's a downstream consequence of the LinkedIn page not existing yet,
tracked there already.

### A4. No third-party or buyer-facing social proof anywhere

No testimonials, case studies, repeat-buyer mentions, or "trusted by"
section exists on any page — and per this project's own
no-unsupported-claims discipline, none should be invented. This is
flagged as a gap, not a defect: it's an area where the *next* commercial
insight (per this phase's own framing) would come from actual buyer
responses, not from this document inventing placeholder social proof
now.

---

## B. Missing information

### B1. No sample/specification-request path distinct from a full RFQ

`Home.tsx`'s closing CTA explicitly invites buyers "looking for product
samples, detailed specifications, or partnership opportunities" — but
the only contact mechanism is the single unified RFQ form at
`/contact` (`Contact.tsx`), which for `inquiryType=general` is
lightest, but still funnels toward the same quote-oriented form rather
than a distinct "send me more information" path. A cold buyer who just
wants a product spec sheet or sample details may not be ready to submit
what reads as a formal quote request. This is friction dressed as a
missing option — noted here rather than under section C because the gap
is the *absence of a lighter-weight option*, not a problem with the
existing form itself.

### B2. No downloadable exporter profile or product catalogue on the site

`docs/EXPORTER_PROFILE_FINAL.md` and the product data in
`shared/productIntelligence/publishedRegistry.ts` are both
buyer-ready content, but neither is exposed anywhere on the live site
as a downloadable document — a buyer researching BorgaFoods before
deciding whether to reach out has to piece the same information
together from multiple pages rather than getting one document. Directly
relevant to this phase's own Section 5 (Export Profile Packaging): once
that packaging exists, the website is a natural place to offer it,
which it currently has no path for.

### B3. No indication of typical response time

Nothing on `/contact`, `/export`, or `/wholesale` tells a buyer how
quickly to expect a reply after submitting an enquiry. For a cold
buyer deciding whether an enquiry is "worth it," an explicit
expectation ("enquiries are typically reviewed within X business days")
lowers perceived risk — but this isn't a claim this repository can
safely add, since no actual response-time commitment has been approved
or is even known to this repository. Flagged as a gap that needs a
business answer, not a wording fix.

### B4. Product pages don't cross-reference the confirmed GEPA credential

Each `/products/*` page (`ProductDetail.tsx`) has an FAQ section and a
"Who [Product] Is For" section, but neither currently mentions export
registration status at all (nor did they before GEPA was confirmed —
this isn't a regression, just an opportunity). A buyer who clicks
through from an outreach email straight to a specific product page
(skipping `/about` and `/export` entirely) would see zero export
credibility signals on that page. Not previously flagged in
`docs/WEBSITE_TRUST_ENHANCEMENT_PLAN.md` because that review was scoped
to `/about`, `/export`, `/wholesale` only — recorded here as a
follow-up candidate for that plan, not decided here.

---

## C. Unnecessary friction

### C1. The RFQ form is long relative to a first-touch enquiry

`Contact.tsx` (1,147 lines) implements one unified form covering
general enquiries, export quotes, wholesale, distribution, and
private-label — with company, country, contact name, email, phone,
target market, product, packaging, quantity, destination port, and a
message field, several marked `required`, plus Turnstile verification.
This is appropriate depth for a buyer who already intends to request a
formal quote (and matches `docs/BUYER_INTENT_CONTENT_AUDIT.md`'s
finding that this is a deliberate B2B-appropriate design, not an
oversight) — but it's a lot to ask of a *cold* buyer replying to a
first-touch outreach email who mainly wants to start a conversation.
This is the same underlying issue as B1 above (missing a lighter path),
viewed from the friction side rather than the missing-option side.

### C2. Turnstile verification is invisible until form submission

Nothing on `/contact` tells a buyer in advance that a CAPTCHA-style
check is part of submitting — not a defect (Turnstile is
low-friction and already invisible/passive in most cases per
`docs/WEBSITE_ROADMAP.md`'s Phase 3 notes), but worth naming since it's
one more small step between "decided to contact" and "message actually
sent," relevant precisely because this review is about that specific
gap.

### C3. No visible "what happens after you submit" expectation-setting

Related to B3: beyond the immediate on-screen submitting/success state,
nothing sets buyer expectations about the next step (who replies, from
what address, roughly when). A cold buyer is more likely to actually
submit a form when they know what happens next.

---

## What's already working well (not a gap)

Worth stating explicitly so this review doesn't read as more negative
than it is:

- The 4 buyer personas (distributors, retailers, wholesalers,
  food-service) are consistently presented across `/wholesale` and
  every product page — a buyer following any of this phase's outreach
  sequences will find a page that speaks to their specific buyer type,
  not a generic one.
- The manufactured-vs-partner-sourced supply-type distinction is clear
  and consistent everywhere it appears (`Home.tsx`'s "What Makes
  BorgaFoods Different" section states it explicitly), which matters
  for buyer trust even though it's a confidentiality requirement first.
  ("No public supplier disclosure" is stated as a *feature* on the
  homepage, not hidden.)
- The RFQ form itself, once a buyer commits to it, is well-built:
  dynamic fields by inquiry type, Turnstile, buyer `Reply-To`, and clear
  success/failure states (`docs/WEBSITE_ROADMAP.md` Phase 3/4B/4C).
  The friction identified in C1 is about what happens *before* a buyer
  reaches this form, not the form's own execution.

---

## Prioritized summary

| Priority | Item | Why it's first | Effort (rough) |
| --- | --- | --- | --- |
| 1 | A2 — apply the drafted GEPA wording to the website | Already drafted, already approved conceptually, closes the exact "email claims more than the site shows" gap that would affect every single outreach email sent | Low — text change, 4 candidate locations already written in `docs/WEBSITE_TRUST_ENHANCEMENT_PLAN.md` |
| 2 | B1/C1 — a lighter-weight "request more information" path | Every outreach email in `docs/BUYER_OUTREACH_SEQUENCE.md` ends in a call to reply or visit the site — a heavy form is the most direct blocker between interest and actual contact | Medium — needs a product/design decision, not just copy |
| 3 | B2 — a downloadable exporter profile on the site | Directly enabled by this phase's own Section 5 packaging work | Low once the PDF itself exists |
| 4 | A1 — a real logo | Needed for LinkedIn anyway; website use is the same asset | Depends entirely on BorgaFoods supplying a design |
| 5 | B3/C3 — response-time expectation | Needs a business decision (an actual commitment), not a website change alone | Low effort, but blocked on a decision this repository can't make |
| 6 | B4 — GEPA credential on product pages | Natural follow-up to #1, but secondary since `/about` and `/export` already carry the primary credibility message | Low, once #1 is implemented and the pattern is proven |

**No code changed as part of this review**, per this phase's explicit
"no code changes yet" instruction. Priority 1 is the one item with
zero remaining research or drafting work — the wording already exists —
so it's the natural first candidate whenever implementation is
approved.

## Related documents

- `docs/WEBSITE_TRUST_ENHANCEMENT_PLAN.md` — the drafted wording for priority 1.
- `docs/BUYER_OUTREACH_SEQUENCE.md` — the outreach emails this review checks the landing experience against.
- `docs/BUYER_INTENT_CONTENT_AUDIT.md` — why the RFQ form's current depth was originally a deliberate design choice, relevant context for C1.
- `docs/COMMERCIAL_INFO_DECISION_RECORD.md` — the response-time and other operational facts B3 depends on.
