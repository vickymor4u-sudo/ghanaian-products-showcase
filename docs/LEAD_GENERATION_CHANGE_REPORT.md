# Lead Generation Change Report

Status: **All changes below are implemented, merged to `main`, deployed
to production, and verified live.** Companion document:
`docs/LEAD_GENERATION_STRATEGY.md` (the full audit these changes came
from, including everything deliberately *not* done and why). Commits:
`0d3f220` (implementation) → `86dcb8b` (merge to `main`).

Every change is scoped to answer one question: **how does this increase
qualified buyer enquiries?** No new business claims were introduced, no
BPIP governance changed, no functionality was removed, and no page got
slower (bundle grew 1.7 kB — see validation below).

---

## Change 1 — RFQ form: product and quantity optional for general enquiries

**Files**: `shared/exportQuote.ts`, `client/src/pages/Contact.tsx`,
`functions/api/export-quote.ts`, `functions/api/export-quote.test.ts`.

**What changed**: Previously, every inquiry type on `/contact` —
including the default "General business inquiry" — required an exact
product selection (`productSelection`) and an exact quantity
(`estimatedQuantity`) before the form would submit, enforced both by
the browser (`required` attribute) and the server (Zod schema,
`.strict()`). Now, those two fields are required for `export_quote`,
`wholesale`, `distribution`, and `private_label` exactly as before —
unchanged — but optional for `general`. The UI shows "(optional)"
instead of `*` on both labels for a general enquiry, the placeholder
text updates ("Quantity and unit, if known"), the submit button reads
"Send Enquiry" instead of "Submit Export Enquiry," and a short hint box
appears above the form explaining that product and quantity aren't
needed yet. The internal notification email gracefully shows "Not
specified — general enquiry" / "Not provided" instead of blank fields.

**Reason**: Found by reading the actual validation code, not assumed.
A buyer with a genuine first-touch question ("do you export to Kenya?",
"can you tell me more about your range?") had no way to ask it without
first committing to one specific product and a specific quantity —
exactly the kind of premature-commitment friction the mission asked
this audit to identify ("Is the form too difficult?"). The fix is
scoped as narrowly as possible: every other inquiry type — the ones
where the business genuinely needs product and quantity to act on the
enquiry — is completely unchanged.

**Expected business impact**: More buyers complete a first contact who
otherwise would have abandoned the form at the product/quantity
fields, or not started at all. This doesn't lower the bar for a
serious RFQ (those paths are untouched) — it opens a genuine "I have a
question" channel that didn't functionally exist before, which is
where a meaningful share of first-time international buyer contact
naturally starts.

**Validation**:
- Two new tests added to `functions/api/export-quote.test.ts`:
  one confirms `export_quote`/other types still reject a missing
  product or quantity (`invalid_request`, unchanged behavior); one
  confirms a `general` inquiry with both fields empty is accepted
  through schema validation (reaches Turnstile verification, the next
  real check) and the notification email renders cleanly.
- All 11 pre-existing RFQ tests re-run unmodified and still passing —
  zero regression to `export_quote`, `wholesale`, `distribution`, or
  `private_label` behavior.
- **Verified on a Cloudflare preview deployment before merging**: a
  crafted `general` submission with empty product/quantity reached
  `verification_failed` (past schema validation, as intended) while
  the identical payload with `inquiryType: "export_quote"` still
  returned `invalid_request` (still correctly rejected).
- **Re-verified on production (`www.borgafoods.com`) after merging**,
  same two checks, same results.
- **Verified in the live browser UI** (both desktop and mobile
  viewport): switching the inquiry-type dropdown correctly toggles the
  `required` attribute, label text, and hint box in real time; the
  mobile screenshot shows the hint box rendering cleanly at 375px
  width.

---

## Change 2 — GEPA trust signal added to the homepage

**File**: `client/src/pages/Home.tsx`.

**What changed**: Added one sentence to the "Who We Are" section:
"Supply and Demand Worldwide Limited is registered with the Ghana
Export Promotion Authority (GEPA) as a commercial exporter
(Registration No. GEPA2018800113)." Identical wording to what's already
live on `/about` and `/export` — no new claim, no new fact, just a new
location.

**Reason**: The homepage is the single most likely first landing page
for a buyer arriving from search, and it had zero credibility/trust
signal anywhere on it — a real, closable gap found by reading the live
page against the mission's own success criteria ("Trust signals are
visible and accurate"). `docs/GROWTH_TRACKING_LOG.md`'s competitor
research (Cycle 1) also found certification/registration signals
appearing repeatedly among named competitors' visible identity —
independent evidence that this is a real category buyers evaluate on.

**Expected business impact**: A buyer's first few seconds on the site
now include a concrete, verifiable export credential, not just brand
description — directly supports "Buyer trust" and "Buyer discovery"
(a credential-bearing homepage is a stronger click-through result once
indexed) without adding any new claim risk.

**Validation**: `tsc --noEmit` clean; verified the exact sentence
renders correctly on the Cloudflare preview deployment and again on
production (`www.borgafoods.com`) via live page-text inspection.

---

## Change 3 — GEPA trust signal added to every product page FAQ

**File**: `client/src/pages/ProductDetail.tsx`.

**What changed**: Added a 6th FAQ entry to every product page's
"Common Questions" section: "Is BorgaFoods a registered exporter? —
Yes. Supply and Demand Worldwide Limited, the company behind
BorgaFoods, is registered with the Ghana Export Promotion Authority
(GEPA) as a commercial exporter (Registration No. GEPA2018800113)."
Same wording discipline as Change 2 — entity always named precisely,
never "BorgaFoods" as the registered party.

**Reason**: A buyer who clicks straight from a search result into a
specific product page (skipping `/about` and `/export` entirely) saw
zero export-credibility signal on that page — flagged directly in
`docs/PERFORMANCE_AUDIT.md`'s prior conversion review (finding B4) and
confirmed still open this session.

**Expected business impact**: Closes the same trust gap as Change 2,
specifically for the buyer entry path most likely for someone already
searching a specific product by name — a higher-intent visitor than a
homepage-first visitor.

**Validation**: `tsc --noEmit` clean; confirmed the new FAQ entry
renders as the 6th question on the Fufu Flour product page on both the
preview deployment and production; confirmed the entry also appears
correctly in the new FAQ structured data (Change 4).

---

## Change 4 — FAQPage structured data on product pages

**Files**: `client/src/components/SchemaMarkup.tsx`,
`client/src/pages/ProductDetail.tsx`.

**What changed**: Added a `"faq"` type to the existing `SchemaMarkup`
component (alongside the pre-existing `organization`, `product`, and
`breadcrumb` types), emitting `schema.org/FAQPage` JSON-LD. Wired it
into `ProductDetail.tsx` using the exact same question/answer array
already rendered visibly on the page (refactored `ProductFaq`'s inline
array into a shared `getProductFaqs(product)` function so the rendered
text and the structured data can never drift apart). No new copy was
written for this change — it's markup around content that already
existed and was already live.

**Reason**: The mission's "Search-to-Buyer Discovery" section asks
directly which pages support buyer-intent searches and whether
realistic opportunities exist. FAQ rich snippets are one of the few
SEO mechanisms that increase click-through without publishing any new
claim or content — they surface existing, already-approved answers
(shelf life, export/wholesale availability, manufacturing origin, how
to request a quote, shipping/lead-time handling, and now the GEPA
credential) directly in search results for exactly the kind of
long-tail buyer questions a distributor or importer would type.

**Expected business impact**: Improved click-through from search for
buyer-intent long-tail queries (e.g. "is gari available for
wholesale," "fufu flour shelf life") once Google finishes indexing the
product pages — genuinely a discovery-stage improvement, with no
content-farming risk since every word was already on the page.

**Validation**: `tsc --noEmit` clean. Verified directly in the browser
console on both the preview deployment and production: the
`schema-faq-{slug}` script tag exists, contains valid JSON-LD, and its
6 `mainEntity` question texts match the visibly rendered FAQ exactly
(checked on the Fufu Flour and Gari product pages).

---

## Change 5 — Distributor geographic-coverage gap closed on `/wholesale`

**File**: `client/src/pages/Wholesale.tsx`.

**What changed**: Added one sentence to the "Distributor Partnerships"
section: "BorgaFoods operates with presence in both Ghana (Tema) and
China (Hangzhou), supporting distributor conversations across Asia and
Africa." The underlying fact was already public (on `/about`'s
"Operations" key fact and body text) — this only adds the
cross-reference to the page where a distributor is actually evaluating
fit.

**Reason**: Directly from `docs/BUYER_INTENT_CONTENT_AUDIT.md`'s
distributor-persona finding (an earlier phase's audit, re-confirmed
this session): a distributor's likely first question — which markets
BorgaFoods actually operates in — was answered only on `/about`, not
on `/wholesale`, where the distributor-specific content actually lives.

**Expected business impact**: Removes one avoidable reason a
distributor might leave `/wholesale` to go looking for geographic
information elsewhere (or simply not find it) before deciding whether
to enquire — directly supports "Buyer conversion" for this specific
persona.

**Validation**: `tsc --noEmit` clean; confirmed the sentence renders in
the correct section on both the preview deployment and production.

---

## Full validation, all changes together

Run before any deployment, in order:

| Check | Result |
| --- | --- |
| `tsc --noEmit` | Clean |
| `verify-product-catalog` (build guard) | Verified 5 catalog records, 5 current public records, 4 Phase 4 expansion-eligible records |
| `verify-single-source-of-truth` (build guard) | Verified exactly one authoritative product registry and that the RFQ Function consumes it directly |
| `vite build` | Succeeded — 479.98 kB JS (+1.7 kB over pre-change baseline), 122.96 kB CSS (unchanged) |
| `verify-no-internal-leak` (build guard) | Verified no internal-only BPIP markers in the built JS asset |
| `verify-site-verification-tags` (build guard) | Verified no site-verification meta tags present (none configured — unchanged) |
| `vitest run` | **53/53 tests passing** (51 pre-existing + 2 new, zero regressions) |
| Confidentiality scan (`git diff` grep for supplier terms) | Clean |

**Deployed via this project's standard discipline**: committed to
branch `lead-generation-improvements`, pushed, verified on the
resulting Cloudflare preview deployment (RFQ API behavior for both
`general` and `export_quote` inquiry types, homepage/product-page/
wholesale content, FAQ schema, mobile viewport rendering), merged to
`main` (`86dcb8b`), then **re-verified every one of the same checks
against live production** (`www.borgafoods.com`) after deployment
completed. One transient propagation delay was observed and correctly
diagnosed (not a defect) — the RFQ API briefly returned stale behavior
on the custom domain seconds after a fresh deploy while the direct
`*.pages.dev` deployment URL already showed the correct behavior;
re-checking `www.borgafoods.com` a short time later confirmed it had
caught up.

Also re-confirmed, as explicit regression checks:
canonical tag still present and correct on `/export`; unknown URL
still returns a real HTTP 404 with `noindex, nofollow`; `/api/export-quote`
still rejects cross-origin and malformed requests exactly as before.

## What was not done

Per the mission's explicit constraints: no new features beyond the RFQ
form's scoped conditional-requirement change; no content published
that isn't already an approved, live fact stated elsewhere; no
supplier information referenced; no BPIP governance touched; no
CRM/database introduced; no unnecessary tracking added. The full list
of considered-but-not-implemented opportunities, with reasons, is in
`docs/LEAD_GENERATION_STRATEGY.md`'s "Remaining opportunities" table.

## Related documents

- `docs/LEAD_GENERATION_STRATEGY.md` — the full audit, baseline data, and remaining-opportunity reasoning behind these 5 changes.
- `docs/PERFORMANCE_AUDIT.md` — the performance baseline these changes were checked against (bundle size, no regression).
- `docs/GEPA_CREDIBILITY_SECTION_PROPOSAL.md` — the source of the exact GEPA wording reused in Changes 2 and 3.
- `docs/BUYER_INTENT_CONTENT_AUDIT.md` — the source of the Change 5 finding.
