# Buyer-Intent Content Audit

Status: **Audit only — no content changed.** Read every live public page
(`Home`, `Products`, `ExportSolutions`, `Wholesale`, `ExportCompliance`,
`About`, `Contact`) against the 4 buyer personas the site itself already
names, and flags gaps and one class of wording finding. Per this
mission's explicit constraint, nothing below was acted on — findings
only, for business review.

## Method

For each of the 4 personas below: does at least one page (a) name this
buyer type explicitly, (b) describe what they'd actually need to know
before enquiring, and (c) give them a clear next action? Cross-referenced
against `docs/SEARCH_INTELLIGENCE_FRAMEWORK.md`'s buyer-role categories,
which use the same 4 personas.

## 1. Wholesale buyers

**Served well.** `/wholesale` is built specifically for this persona:
names "Distributors," "Grocery retailers," "Wholesalers," and
"Restaurants & food service" explicitly, states what a "useful enquiry"
includes (business type, destination market, products, volume,
packaging, timing), and has a dedicated `inquiryType="wholesale"` CTA.
`/products` reinforces with per-product "Standard Retail Sizes" and "Bulk
Options" fields sourced directly from BPIP data. `/export-solutions`
adds bulk/mixed-container detail. No gap found.

## 2. Distributors

**Served, with one thin spot.** Named explicitly on `/wholesale`
("Distributors... building Ghanaian or African grocery ranges") and
`/wholesale`'s dedicated "Distributor Partnerships" section (market fit,
supply planning, ongoing coordination). **Gap**: nothing on the site
currently addresses a distributor's likely first question — geographic
coverage / which markets BorgaFoods currently ships to or has
experience with. `/about` states operational presence in "Ghana (Tema)
and China (Hangzhou)" and serving "diaspora-focused and specialty food
markets across Asia and Africa," but this is the only place that
geographic framing appears, and it's not surfaced on `/wholesale` or
`/export-solutions` where a distributor evaluating fit would actually be
reading. Whether to cross-reference this is a content-architecture
call, not made here.

## 3. Private-label enquiries

**Served, correctly scoped.** `/wholesale`'s "Private-label Discovery"
section is honest about the process (individually reviewed, no
commitment from submitting an enquiry, packaging/specs/feasibility/
regulatory/commercial terms all confirmed before acceptance) and has its
own `inquiryType="private_label"` CTA. This matches BPIP's actual
governance state — only Fufu Flour is `approved_for_discovery`
(`privateLabelEligibleProducts` in `publishedRegistry.ts`); the page
doesn't claim private-label is available for the other 4 products, which
is correct and should stay that way absent a business decision to expand
it. No gap found; flagging as **correctly conservative**, not
under-built.

## 4. International customers / importers

**Served at the concept level, thin on specifics.** "Importers" is named
on `/`, `/export-solutions`. `/export` (Export & Compliance) is the
relevant deep page — but it describes the *process* of coordinating
documentation, packaging, and shipment ("requirements vary by product,
destination... confirmed rather than assumed") without naming a single
concrete requirement, port, Incoterm, or documentation type. This is
consistent with the business's stated approach of confirming everything
per-enquiry rather than publishing specifics that could be wrong for a
given buyer — a deliberate choice, not obviously a mistake — but it does
mean an importer comparing BorgaFoods against a competitor's more
detailed export page has less to evaluate on `/export` itself. Whether
to add illustrative (not binding) detail — e.g. "we've handled FOB and
CIF terms" without committing to specific ones per enquiry — is a
business/legal call about how much to commit to in writing, not made
here.

## 5. Wording finding: `/about` reads more assertively than the rest of the site

Separate from persona coverage — a consistency finding. Every other page
audited uses careful, reviewed-per-enquiry language ("confirmed rather
than assumed," "reviewed individually," "availability confirmed during
quotation"). `/about` contains several claims with a different register:

- *"Every product meets international standards"* — an absolute claim; BPIP records certification as "Ghana FDA registered facilities" (per-product, in `publishedRegistry.ts`), which is narrower and more specific than "international standards."
- *"Proven track record with international markets. We understand customs, compliance, and logistics."* — general assertion, not tied to a specific fact recorded elsewhere on the site.
- *"Flexible MOQs... From 500 kg to full container loads."* — the only place on the entire site a specific minimum-order-quantity number appears; every other page explicitly defers MOQ/volume to per-enquiry review (`/products`: "Estimated initial order volume... commercial terms confirmed in quotation"; `/wholesale`: "expected order volume... timing").
- *"Rigorous testing and FDA compliance verification"* (Value Chain section) — similar specificity gap versus the more precise "Ghana FDA registered facilities" language used on `/products`.

None of these are flagged as false — they may well be accurate — but
they're **less specific and less consistently hedged than the rest of
the site's own established voice**, and the "500 kg" figure in
particular is a concrete number that doesn't appear in BPIP or anywhere
else, so it can't be verified against the product registry the way every
other quantitative claim on the site can. This is exactly the kind of
public-claim question this mission's constraints say not to resolve
unilaterally — recorded for business review, `/about` left untouched.

## 6. SEO metadata consistency (supporting the above)

Per-page `<title>`/`description`/`keywords` (from each page's `SEO`
component call) are already well-differentiated and persona-appropriate
— `/wholesale`'s keywords target distributor/retailer/import language,
`/export`'s target compliance/documentation language, `/products`'
description is generated dynamically from the actual product names. No
gap found here; this was already covered by the prior SEO Foundation
work (`docs/SEO_FOUNDATION.md` §7–8) and is confirmed still accurate.

## Summary table

| Persona | Coverage | Gap found |
| --- | --- | --- |
| Wholesale buyers | Strong | None |
| Distributors | Strong | Geographic-coverage framing exists only on `/about`, not cross-referenced where distributors actually land |
| Private-label enquiries | Correctly scoped | None (intentionally limited to Fufu Flour) |
| International customers / importers | Present, process-focused | No concrete export-process detail (Incoterms, ports, documentation types) on `/export` |
| — | — | `/about`'s claim register is more assertive/specific than the rest of the site; one unverifiable figure ("500 kg" MOQ) |

## Related documents

- `docs/SEARCH_INTELLIGENCE_FRAMEWORK.md` — the same 4 personas, search-side.
- `docs/BUSINESS_RULES.md` — the confidentiality/claims rules this audit checked content against.
- `shared/productIntelligence/publishedRegistry.ts` — source of truth for every product-level fact referenced above.
