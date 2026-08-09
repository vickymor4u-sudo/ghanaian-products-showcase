# Buyer Outreach Templates — Foundation

Status: **Templates prepared. Nothing sent, no recipient list
assembled, no CRM or mail tool connected.** Three outbound introduction
templates for the three buyer types this project's own personas already
target (`docs/BUYER_INTENT_CONTENT_AUDIT.md`), built entirely from
facts already approved and live on borgafoods.com plus the now-confirmed
GEPA registration. None claims a specific capacity, MOQ, or lead time —
every one defers to "reviewed per enquiry," matching the site's own
existing hedged language and the still-open items in
`docs/COMMERCIAL_INFO_DECISION_RECORD.md`.

**Before any of these are actually sent**: each needs a real recipient,
a real sender name, and a decision on which channel (email, LinkedIn
message once the page exists, etc.) — none of that is decided here.
Bracketed placeholders mark exactly what's missing.

---

## Template 1 — International distributor introduction

Subject: Ghanaian Staple Foods — Export Partnership Introduction

> Dear [Distributor Contact Name],
>
> My name is [Sender Name] with BorgaFoods (Supply and Demand Worldwide
> Limited), a Ghana-based manufacturer and export coordinator of
> traditional West African staple foods, established in 2013.
>
> We manufacture a current range of Ghanaian staples — gari, cassava
> flour, fufu flour, kokonte, and Banku Borga — at Ghana FDA registered
> facilities, and coordinate a broader export assortment sourced from
> trusted Ghanaian production partners. We're a registered commercial
> exporter with the Ghana Export Promotion Authority (GEPA),
> Registration No. GEPA2018800113.
>
> We're reaching out because [reason for contacting this specific
> distributor — market fit, region, existing African/specialty grocery
> distribution, etc.]. We'd welcome the chance to introduce our range
> and understand your sourcing needs.
>
> If useful, a short call or email exchange covering your target
> markets, product interests, and typical order patterns would help us
> put together a relevant proposal — product, packaging, and shipment
> requirements are reviewed for every enquiry.
>
> Happy to share more detail or samples information on request.
>
> Best regards,
> [Sender Name]
> BorgaFoods | export@borgafoods.com | borgafoods.com

---

## Template 2 — Supermarket / importer introduction

Subject: Wholesale Ghanaian Food Products for [Retailer/Importer Name]

> Dear [Buyer Name],
>
> I'm [Sender Name], reaching out from BorgaFoods — we manufacture and
> export Ghanaian staple foods (gari, cassava flour, fufu flour,
> kokonte, and Banku Borga) for wholesale and import buyers, including
> African grocery retailers and importers supplying diaspora and
> specialty food markets.
>
> Our products are made at Ghana FDA registered facilities, available in
> both retail packs and bulk formats, and we're a registered commercial
> exporter with the Ghana Export Promotion Authority (GEPA),
> Registration No. GEPA2018800113.
>
> I'd like to introduce our range to [Retailer/Importer Name] and learn
> more about your current sourcing for Ghanaian or West African staple
> products — whether you're evaluating a new supplier, expanding an
> existing category, or exploring a specific product.
>
> A useful next step on our side would be understanding your target
> volume, preferred packaging, and import market — from there we can
> put together relevant product and packaging information for review.
>
> Looking forward to hearing from you.
>
> Best regards,
> [Sender Name]
> BorgaFoods | export@borgafoods.com | borgafoods.com/wholesale

---

## Template 3 — Private-label buyer introduction

Subject: Private-Label Opportunity — Fufu Flour

> Dear [Buyer Name],
>
> I'm [Sender Name] with BorgaFoods, a Ghana-based manufacturer of
> traditional West African staple foods, established in 2013 and
> operating as a registered commercial exporter with the Ghana Export
> Promotion Authority (GEPA), Registration No. GEPA2018800113.
>
> We're reaching out because BorgaFoods currently supports private-label
> discussions for **Fufu Flour**, manufactured at our Ghana FDA
> registered facilities. If your business is exploring a private-label
> Ghanaian staple product, we'd welcome a conversation.
>
> Private-label opportunities are reviewed individually — product
> specification, packaging, artwork/labeling requirements, order volume,
> and production feasibility are all confirmed together before any
> commitment on either side. Submitting an enquiry doesn't create an
> obligation for either party.
>
> If you'd like to explore this, the most useful next step is sharing
> your target market, expected order volume, and any packaging or
> labeling requirements you already have in mind.
>
> Best regards,
> [Sender Name]
> BorgaFoods | export@borgafoods.com | borgafoods.com/wholesale

**Note on scope**: Fufu Flour is currently the *only* BPIP-approved
private-label discovery product (`shared/productIntelligence/publishedRegistry.ts`,
`privateLabelDiscoveryApproved`). This template must not be adapted to
name any other product without that product first clearing the same
approval gate — using this template for a different product would be an
unsupported claim, not a copy-paste convenience.

**Update, 9 Aug 2026**: BorgaFoods has decided to broaden its
private-label *outreach targeting* to 5 products (see
`docs/BUYER_TARGETING_FRAMEWORK.md` Tier 2), but that broader scope is
**not yet reflected in BPIP, the website, or the RFQ form** — see
`docs/PRIVATE_LABEL_SCOPE_CONSISTENCY_REVIEW.md` for the full
impact analysis. This template stays Fufu Flour-only until that
technical change ships, specifically to avoid promising something the
live RFQ form would currently reject.

---

## What every template deliberately avoids

- **No supplier names or supplier detail** — "trusted Ghanaian
  production partners" is the only sourcing description used, matching
  the site's own approved wording exactly.
- **No capacity, volume, or MOQ figures** — every template asks the
  *recipient* for their volume/requirements rather than stating
  BorgaFoods' own capacity, since production capacity remains an open
  item (`docs/COMMERCIAL_INFO_DECISION_RECORD.md` row 5).
- **No certification claims beyond what's verified** — only Ghana FDA
  facility registration and the now-confirmed GEPA export registration
  appear; no ISO, HACCP, organic, or similar claim.
- **No specific expiry/renewal date for the GEPA registration** — none
  is on file; every mention uses the same present-tense, no-date wording
  finalized in `docs/GEPA_CREDIBILITY_SECTION_PROPOSAL.md`.

## What's needed before any of these can actually be sent

1. A real sender name and title (not filled in here — this repository
   doesn't have an org chart or a designated outreach contact).
2. An actual recipient — these are templates, not addressed to anyone.
3. A decision on outreach channel and volume (individual emails vs. a
   batch approach) and whether any CRM/tracking is wanted — none of
   that exists in this codebase today.
4. Business sign-off that outbound cold outreach is wanted at all, since
   this is a new activity, not an extension of the existing inbound RFQ
   workflow.

## Related documents

- `docs/BUYER_INTENT_CONTENT_AUDIT.md` — the 4 buyer personas these 3 templates (distributor, retailer/importer, private-label) draw from.
- `docs/GEPA_CREDIBILITY_SECTION_PROPOSAL.md` — the confirmed GEPA wording used in all three templates.
- `docs/COMMERCIAL_INFO_DECISION_RECORD.md` — why no capacity/MOQ figure appears in any template.
- `docs/EXPORT_EVIDENCE_MATRIX.md` — why no supplier detail beyond "trusted Ghanaian production partners" appears.
