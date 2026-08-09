# LinkedIn Company Page — Final Launch Checklist

Status: **Checklist and launch-post drafts ready. No page created, no
post published.** Consolidates `docs/LINKEDIN_COMPANY_PAGE_PACKAGE.md`
into a single go/no-go checklist and adds the one net-new item this
phase was asked for: draft text for the first 5 launch posts. Nothing
below states a new fact — every field and post is built from claims
already approved and live on borgafoods.com.

## Checklist

| # | Item | Status | Value / requirement |
| - | --- | --- | --- |
| 1 | **Company name** | ✅ Ready | BorgaFoods |
| 2 | **Tagline** (120-char limit) | ✅ Ready | "BorgaFoods manufactures Ghanaian staple foods — gari, cassava flour, fufu flour, kokonte, and Banku Borga — for export & wholesale buyers." (119 characters) |
| 3 | **About section** (2,000-char limit) | ✅ Ready | Full text in `docs/LINKEDIN_COMPANY_PAGE_PACKAGE.md` (~1,080 characters). GEPA line intentionally not included — see row 8. |
| 4 | **Specialties** (up to 20 tags) | ✅ Ready | Ghanaian food export, food manufacturing, gari, cassava flour, fufu flour, kokonte, Banku Borga, wholesale food supply, West African staples, African grocery export, Ghana to China trade, food-service supply, distributor partnerships |
| 5 | **Logo** | ⬜ Needed from BorgaFoods | See requirements below |
| 6 | **Cover image** | ⬜ Needed from BorgaFoods | See requirements below |
| 7 | **Company size band** | ⬜ Needed from BorgaFoods | LinkedIn requires a range (e.g. "11–50 employees") — not confirmed anywhere in this codebase |
| 8 | **GEPA registration line** | ⏸ Held | Not added to the About section — pending the renewal-status confirmation in `docs/GEPA_CREDIBILITY_SECTION_PROPOSAL.md` |
| 9 | **Personal LinkedIn profile to create the page under** | ⬜ Needed from BorgaFoods | LinkedIn requires the creating profile to be ≥7 days old with some activity — this is LinkedIn's own rule, not something this repository can satisfy |
| 10 | **First 5 launch posts** | ✅ Drafted | See below |

Rows 5, 6, 7, and 9 are the only blockers on actually creating the
page — nothing else is outstanding.

## Logo requirements

- **300×300px minimum**, square aspect ratio (LinkedIn crops to a
  circle in most placements — avoid text or detail near the edges)
- Legible at icon size (LinkedIn shrinks it to ~48px in feeds and
  notifications) — a wordmark alone will likely be unreadable that
  small; a simple mark/emblem reads better
- File format: PNG or JPEG, LinkedIn's own upload limit is 4MB

## Cover image requirements

- **1128×191px** exactly (LinkedIn's fixed banner ratio — a differently
  sized image will be cropped, not scaled to fit)
- Should work with the logo and page name overlaid on top-left (that's
  where LinkedIn renders them) — avoid important content in that
  corner
- No claim-bearing text baked into the image itself (e.g. no "GEPA
  registered," "certified," or similar) unless that text is *also*
  approved for the About section — a claim in an image is still a
  public claim

## First 5 launch posts (draft copy)

Each post below is built only from facts already public on
borgafoods.com. None mentions GEPA, certifications beyond the existing
"Ghana FDA registered facilities" fact, or any supplier/partner detail.
Treat these as a starting sequence, not a fixed order — post 1 should
run first (it's the page's introduction), the rest can be reordered.

**Post 1 — Page introduction**

> We've arrived on LinkedIn. 👋
>
> BorgaFoods manufactures Ghanaian staple foods — gari, cassava flour,
> fufu flour, kokonte, and Banku Borga — through BorgaFoods Processing,
> and coordinates a wider export assortment for international
> distributors, wholesalers, and food-service buyers.
>
> Based in Tema, Ghana, with a second base in Hangzhou, China, we've
> been connecting Ghanaian food production with international markets
> since 2013.
>
> Follow along as we share more about our products, our process, and
> the buyers we work with.
>
> 🔗 borgafoods.com

**Post 2 — Product spotlight (Gari)**

> Product spotlight: Gari 🌾
>
> One of our core cassava products, available in retail packs (500g,
> 1kg, 2kg, 5kg) and bulk formats (25kg, 50kg sacks) for wholesale and
> export buyers.
>
> Made at Ghana FDA registered facilities under BorgaFoods Processing.
>
> Interested in wholesale or export volumes? Reach us at
> export@borgafoods.com.

**Post 3 — Behind the process**

> From Ghana to your market. 🇬🇭
>
> Our manufactured range — gari, cassava flour, fufu flour, kokonte,
> and Banku Borga — is produced at Ghana FDA registered facilities
> under BorgaFoods Processing, with product, packaging, and shipment
> requirements reviewed for every enquiry.
>
> We also coordinate a broader export assortment sourced from trusted
> Ghanaian production partners, kept clearly distinct from our own
> manufactured range.

**Post 4 — Who we work with**

> Who we supply. 🤝
>
> BorgaFoods works with distributors, African grocery retailers,
> wholesalers, restaurants, and food-service buyers looking for
> structured wholesale and export supply of Ghanaian staple foods.
>
> If that's you, we'd like to hear about your market, your products of
> interest, and your expected order volume.
>
> 📩 export@borgafoods.com

**Post 5 — Call to action**

> Planning an order? Let's talk. 📦
>
> Whether you're a distributor building out a Ghanaian grocery range, a
> wholesaler evaluating bulk formats, or a food-service buyer sourcing
> staple products — we review product, packaging, and shipment
> requirements for every enquiry.
>
> Start a conversation: export@borgafoods.com or borgafoods.com/wholesale

## What happens once the page exists

Per `docs/EXTERNAL_AUTHORITY_TRUST_FRAMEWORK.md` §1: update
`client/src/components/Footer.tsx`'s LinkedIn link and the
`Organization` schema's `sameAs` field
(`client/src/components/SchemaMarkup.tsx`) to point at the real page —
a small, safe, no-new-claim code change, since it only links to an
entity BorgaFoods itself will control.

## Related documents

- `docs/LINKEDIN_COMPANY_PAGE_PACKAGE.md` — the original finalized package this checklist consolidates.
- `docs/GEPA_CREDIBILITY_SECTION_PROPOSAL.md` — why the GEPA line stays out of the About section for now.
- `docs/EXTERNAL_AUTHORITY_TRUST_FRAMEWORK.md` §1 — full LinkedIn requirements background.
