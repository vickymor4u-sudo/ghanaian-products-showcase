# Company Name Consistency Review

Status: **Review complete. One minor finding, not yet fixed — recommendation only.**

Checked every instance of the company/brand names across
`client/src` and `shared` (excluding test files).

## BorgaFoods Processing (manufacturer name)

**Fully consistent.** Appears identically in `Home.tsx`,
`ExportSolutions.tsx`, `Products.tsx`, `About.tsx`, and — most
importantly — as the single source of truth in
`shared/productIntelligence/publishedRegistry.ts` (5 instances, one per
product) and `shared/productIntelligence/types.ts`'s
`productTypeLabels`. No variant spelling, abbreviation, or formatting
found anywhere. No action needed.

## Supply & Demand Worldwide Ltd (legal entity name)

**One inconsistency found**, and it's the entity name specifically
relevant to the GEPA registration:

| Form used | Where | Count |
| --- | --- | --- |
| "Supply & Demand Worldwide **Ltd**" | `SEO.tsx`, `SchemaMarkup.tsx` (Organization schema `name` field), `Footer.tsx` (×2), `Home.tsx`, `About.tsx` (title/description/keywords/H1), `Contact.tsx` | 8 instances |
| "Supply & Demand Worldwide **Limited**" | `About.tsx`, body text of the "Our Story" section only | 1 instance |
| "Supply & Demand" (shortened) | `Navigation.tsx`, header logo lockup | 1 instance (clearly a space-constrained header abbreviation, not a naming inconsistency) |

**What the GEPA certificate shows**: "SUPPLY AND DEMAND WORLDWIDE
LIMITED" — the fully spelled-out legal form ("AND" rather than "&,"
"LIMITED" rather than "Ltd"). This is the most formally precise version
of the name found anywhere, and it matches the *single* "Limited"
instance in `About.tsx` more closely than the "Ltd" form used
everywhere else — though even that instance still uses "&" rather than
"and."

## Recommendation

Not a rule violation and not urgent — "Ltd" and "Limited" are both
legitimate short/long forms of the same registered name, and no
document reviewed uses a name that could be read as a *different*
company. Two options, either acceptable:

1. **Leave as-is.** The stylized "Supply & Demand Worldwide Ltd" is
   fine for general marketing/website use; it's simply not the exact
   string that will appear if the GEPA registration number is ever
   referenced publicly (see `docs/GEPA_CREDIBILITY_SECTION_PROPOSAL.md`
   and `docs/EXPORTER_PROFILE_ONE_PAGER.md`, both of which use the
   certificate's exact legal form "Supply and Demand Worldwide Limited"
   specifically where the registration number appears, for that
   reason).
2. **Minor cleanup**: align `About.tsx`'s one "Limited" instance to
   "Ltd" for full sitewide consistency. A one-line text edit, no new
   claim, no approval-risk — but not applied here, since it wasn't
   asked for as an action item, only a review. Flagged in case it's
   wanted as a quick follow-up.

## Related documents

- `docs/GEPA_CREDIBILITY_SECTION_PROPOSAL.md`, `docs/EXPORTER_PROFILE_ONE_PAGER.md` — both use the certificate's exact legal name where the registration number is cited, per the reasoning above.
