# Company Profile — Draft Text for External Use

Status: **Draft only. Not published anywhere. For review before use on
any external platform** (LinkedIn, GEPA, trade association applications,
B2B directories).

Every sentence below is built only from facts already approved and live
on the website — the `Organization` structured-data record
(`client/src/components/SchemaMarkup.tsx`), `/about`'s corrected text
(`docs/PUBLIC_CLAIM_VERIFICATION_AUDIT.md`), and `BUSINESS_RULES.md`'s
approved wording. Nothing here states a fact that isn't already public
on borgafoods.com. Reuse it directly, or treat it as a starting point to
edit — either way, review before pasting into any external form.

## Short version (~40 words — taglines, directory listings, LinkedIn tagline field)

> BorgaFoods manufactures Ghanaian staple foods — gari, cassava flour,
> fufu flour, kokonte, and Banku Borga — through BorgaFoods Processing,
> and coordinates a wider export assortment for international
> distributors, wholesalers, and food-service buyers.

(119 characters — fits LinkedIn's 120-character tagline limit with room
to spare.)

## Medium version (~80 words — directory "about" fields, association applications)

> Supply & Demand Worldwide Ltd is a Ghana-registered limited liability
> company, established in 2013, trading under the BorgaFoods brand.
> Through BorgaFoods Processing, the company manufactures a current
> range of Ghanaian staple foods — gari, cassava flour, fufu flour,
> kokonte, and Banku Borga — at Ghana FDA registered facilities, and
> coordinates a broader export assortment sourced from trusted Ghanaian
> production partners. The company has operational presence in Ghana
> (Tema) and China (Hangzhou), serving international distributors,
> wholesalers, retailers, and food-service buyers.

## Long version (~180 words — LinkedIn About section, GEPA company description, website-style "About Us")

> Supply & Demand Worldwide Ltd is a legally registered limited
> liability company in Ghana, established in 2013. Trading under the
> BorgaFoods brand, the company has over a decade of experience
> exporting traditional West African staple foods to international
> markets.
>
> Through BorgaFoods Processing, BorgaFoods manufactures its current
> range of Ghanaian staples — gari, cassava flour, fufu flour, kokonte,
> and Banku Borga — at Ghana FDA registered facilities. The company also
> coordinates a broader export assortment, sourced from trusted Ghanaian
> production partners and kept clearly distinct from its own
> manufactured range.
>
> BorgaFoods operates internationally, with presence in both Ghana
> (Tema) and China (Hangzhou), serving diaspora-focused and specialty
> food markets across Asia and Africa. The company works with
> distributors, wholesalers, grocery retailers, and food-service buyers
> on wholesale and export supply, with product, packaging, and shipment
> requirements reviewed for each enquiry.
>
> For export quotations, wholesale supply, or distributor
> partnerships: export@borgafoods.com

(Character counts: ~1,050 — comfortably under LinkedIn's 2,000-character
About-section limit.)

## Field-by-field facts (for forms that ask for specific fields rather than free text)

| Field | Value | Source |
| --- | --- | --- |
| Legal company name | Supply & Demand Worldwide Ltd | `SchemaMarkup.tsx` Organization record |
| Trading/brand name | BorgaFoods | Same |
| Founded | 2013 | Same; also `/about` |
| Manufacturing entity | BorgaFoods Processing | `BUSINESS_RULES.md` approved manufacturer name |
| Headquarters | Tema, Greater Accra, Ghana (C 16 Sakumono Estate Junction Site 8) | `SchemaMarkup.tsx` |
| Secondary location | Hangzhou, Zhejiang, China | `SchemaMarkup.tsx` |
| Industry (for platforms with a category dropdown) | Food & Beverages / Food Production — closest standard categories to "Ghanaian staple food manufacturer and export coordinator" | Inferred from business description, not a platform-specific value confirmed here |
| Website | https://www.borgafoods.com | — |
| Public enquiry email | export@borgafoods.com — **confirmed operational, 9 Aug 2026** | `shared/exportQuote.ts` |
| Ghana phone | +233 555 362 208 | `SchemaMarkup.tsx` / Footer |
| China phone / WhatsApp | +86 135 1681 8572 | Footer |
| GEPA export registration | Registration No. GEPA2018800113 (2018) — **current renewal status unconfirmed, do not publish yet** | Certificate supplied 9 Aug 2026; see `docs/GEPA_CREDIBILITY_SECTION_PROPOSAL.md` |
| Products (current manufactured range) | Gari, Cassava Flour, Fufu Flour, Kokonte, Banku Borga | `shared/productIntelligence/publishedRegistry.ts` |
| Certification | Ghana FDA registered facilities | `publishedRegistry.ts` (identical across all 5 products) |
| Languages | English, Chinese | `SchemaMarkup.tsx` / `/about` |

**Deliberately left blank — not confirmed anywhere in the codebase, and
this document does not guess**: employee/company size range (LinkedIn
asks for this as a band, e.g. "11-50 employees"), a logo file, and a
cover/banner image. All three need to come directly from BorgaFoods.

## Supply-chain evidence reviewed 9 Aug 2026 — no wording changed above

Two Ghana Tree Crops Development Authority documents were reviewed
(a partner export licence and a partner manufacturer registration, full
detail redacted in `docs/EXPORT_EVIDENCE_MATRIX.md`). None of the text
above was changed as a result, for two reasons specific to this
document's purpose:

1. Both documents certify separate, third-party partner companies —
   not Supply and Demand Worldwide Ltd or BorgaFoods — so neither
   supports a new fact in *this company's own* profile. The existing
   "trusted Ghanaian production partners" sentence already covers what
   this evidence can honestly support, and stays exactly as worded
   rather than being extended toward "licensed partners" (which would
   generalize from two reviewed partners to a claim about all of them).
2. One of the two documents' licence category (oil palm products)
   intersects with this project's frozen Red Palm Oil product
   classification gate (PCR-002 — internal-only, no public mention).
   That's a business decision outside this document's scope; see
   `docs/EXPORT_EVIDENCE_MATRIX.md` for the full reasoning.

## Related documents

- `docs/EXTERNAL_AUTHORITY_TRUST_FRAMEWORK.md` — where this content gets used, and what else each platform needs.
- `docs/PUBLIC_CLAIM_VERIFICATION_AUDIT.md` — why the wording above avoids "international standards," specific MOQ figures, or other claims that were already found and removed from `/about`.
- `docs/EXPORT_EVIDENCE_MATRIX.md` — the redacted tracking of the two supply-chain documents reviewed 9 Aug 2026.
