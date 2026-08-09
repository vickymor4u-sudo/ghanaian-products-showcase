# Buyer Targeting Framework

Status: **Framework only. No buyer contacted, no account created, no
list of real companies compiled.** Defines who BorgaFoods should
prioritize reaching out to and why, using only capabilities and facts
already approved and live on borgafoods.com, plus the finalized
credibility assets from External Authority Phases 1–4
(`docs/EXPORTER_PROFILE_FINAL.md`, `docs/GEPA_CREDIBILITY_SECTION_PROPOSAL.md`).
This is the targeting logic — actual company research goes in
`docs/BUYER_RESEARCH_DATABASE_TEMPLATE.md`, and the emails that would
be sent go in `docs/BUYER_OUTREACH_SEQUENCE.md`.

## How tiers were assigned

Tier reflects fit with what BorgaFoods can *already* support today,
not potential value. A buyer group is Tier 1 when it matches an
existing, already-public buyer persona (`docs/BUYER_INTENT_CONTENT_AUDIT.md`)
with no open capability gate; Tier 2 when it's a good fit but narrower
in scope (e.g. private-label is gated to one product); Tier 3 when the
channel itself introduces friction or requirements this project hasn't
evaluated (marketplace account terms, smaller/less predictable order
patterns).

---

## Tier 1

### African food distributors

- **Buyer profile**: regional or national distributors building or
  expanding a Ghanaian/West African grocery range for resale to
  retailers, restaurants, or other distributors. Typically buy in
  repeat, planned volumes rather than one-off orders.
- **Countries to target**: markets with an established Ghanaian/West
  African diaspora and existing African-grocery distribution
  infrastructure — the UK, the Netherlands, Germany, the US, and China
  (where BorgaFoods already has an operational base in Hangzhou) are
  the most defensible starting points, since they combine diaspora
  demand with a location BorgaFoods can already speak to directly via
  its two operational bases (Tema, Hangzhou). Not an exhaustive list —
  a starting point to research against in
  `docs/BUYER_RESEARCH_DATABASE_TEMPLATE.md`, not a claim that these are
  the only viable markets.
- **Why they fit BorgaFoods**: this is the exact persona `/wholesale`
  and every product page are already built for — "Distributors" is the
  first of the site's 4 standing buyer personas, and the manufactured
  range (gari, cassava flour, fufu flour, kokonte, Banku Borga) is
  already positioned for repeat wholesale supply.
- **Outreach approach**: Template 1 in `docs/BUYER_OUTREACH_TEMPLATES.md`
  / the Day 0 distributor sequence in `docs/BUYER_OUTREACH_SEQUENCE.md`.
  Lead with the manufactured range and the confirmed GEPA registration;
  invite a conversation about target markets and order patterns rather
  than quoting a price or MOQ up front, since neither is published yet.

### Ethnic grocery importers

- **Buyer profile**: importers who bring African/Caribbean/ethnic
  grocery products into a specific country or region, then sell on to
  independent grocery stores — distinct from distributors in that
  they're often the first point of entry for a product into a new
  country's market, handling customs and import compliance directly.
- **Countries to target**: same diaspora-market logic as distributors
  above — UK, Netherlands, Germany, US — plus any market where
  BorgaFoods' bulk packaging (25kg/50kg sacks for gari and cassava
  flour) suits container-scale import rather than pallet-scale
  distribution.
- **Why they fit BorgaFoods**: `/export`'s entire page is written for
  exactly this buyer question — import documentation, destination
  requirements, shipment coordination — and the now-confirmed GEPA
  registration is a direct, relevant credential for an importer
  evaluating export compliance specifically.
- **Outreach approach**: Template 2 in `docs/BUYER_OUTREACH_TEMPLATES.md`
  / the Day 0 importer sequence, adapted to lead with export
  documentation and compliance capability (`/export`) rather than
  product range alone.

### African supermarkets

- **Buyer profile**: retail chains or independent supermarkets stocking
  an African/international foods aisle, buying either directly or
  through a distributor/importer — direct-buying chains are the
  relevant target here (chains that buy exclusively through
  distributors are effectively reached via the distributor category
  above, not duplicated here).
- **Countries to target**: same diaspora markets as above; supermarkets
  large enough to buy direct (rather than through a distributor) are
  concentrated in markets with dense diaspora populations — UK and US
  are the strongest starting candidates.
- **Why they fit BorgaFoods**: `/wholesale`'s "Grocery retailers" persona
  ("African grocery stores, supermarkets, and retail buyers planning
  repeat supply") already targets this group directly, and the site's
  retail-pack sizing (500g–5kg across the manufactured range) matches
  supermarket shelf formats without requiring a separate SKU strategy.
- **Outreach approach**: same as Template 2, adapted toward retail-pack
  sizing and shelf-ready formats rather than bulk/container framing.

---

## Tier 2

### Restaurant suppliers

- **Buyer profile**: food-service distributors or suppliers who buy in
  bulk on behalf of restaurants, rather than restaurants buying
  directly — the intermediary already targeted by `/wholesale`'s
  "Restaurants & food service" persona.
- **Countries to target**: same diaspora/specialty-food markets as
  Tier 1, narrowed to cities with a dense West African or pan-African
  restaurant scene (e.g. London, Amsterdam, major US metro areas) —
  this is a reasonable inference from the persona, not a researched
  claim about specific supplier density in any city.
- **Why they fit BorgaFoods**: matches an existing standing persona, but
  positioned as Tier 2 rather than Tier 1 because food-service buying
  patterns (smaller, more frequent orders, tighter format requirements)
  are less proven against BorgaFoods' current bulk-packaging strengths
  (25kg/50kg sacks) than distributor/importer volumes are.
- **Outreach approach**: adapt Template 1's distributor framing toward
  food-service format and consistency needs rather than resale volume.

### Food service distributors

- **Buyer profile**: broader food-service distribution businesses
  (beyond the ethnic/African niche) that could carry BorgaFoods
  products as part of a wider "world foods" or "specialty ingredients"
  category — a genuine but less directly-targeted fit than the
  African-specific personas above.
- **Countries to target**: same core markets; lower priority within
  Tier 2 since this segment requires more positioning work (explaining
  the products to a buyer without existing African-cuisine context) than
  the ethnic-food-focused segments above.
- **Why they fit BorgaFoods**: the manufactured range is shelf-stable
  and export-ready regardless of buyer category, but this segment
  doesn't map to any of the site's 4 standing personas as directly —
  outreach here would be testing a new angle, not extending a proven one.
- **Outreach approach**: same templates, but framed around product
  attributes (shelf life, packaging formats, staple-food versatility)
  rather than diaspora/cultural specificity, since that's likely this
  buyer's actual evaluation criteria.

### Private-label buyers (Fufu Flour only)

- **Buyer profile**: brands or retailers wanting to sell a Ghanaian
  staple product under their own label rather than BorgaFoods'.
- **Countries to target**: no geographic restriction beyond the general
  diaspora-market logic above — private-label interest is more about
  buyer type (an established brand/retailer with its own label) than
  geography.
- **Why they fit BorgaFoods, and why Tier 2 not Tier 1**: `/wholesale`'s
  Private-label Discovery section already supports this conversation,
  but strictly for **Fufu Flour only** — the sole product with
  `privateLabelDiscoveryApproved` set in BPIP
  (`shared/productIntelligence/publishedRegistry.ts`). Tier 2 reflects
  that real capacity here (one product) is narrower than the other
  Tier 1 categories, which span the full 5-product range.
- **Outreach approach**: Template 3 in `docs/BUYER_OUTREACH_TEMPLATES.md`
  / the Day 0 private-label sequence — must not be adapted to any
  product beyond Fufu Flour without that product first clearing the
  same BPIP approval gate.

---

## Tier 3

### Online marketplaces

- **Buyer profile**: B2B or B2C marketplace platforms (e.g. general
  wholesale marketplaces, specialty-food marketplaces) where BorgaFoods
  could list products for discovery by many smaller buyers at once,
  rather than pursuing individual buyer relationships.
- **Countries to target**: not geography-specific — platform selection
  matters more than country here.
- **Why Tier 3, not higher**: this channel requires creating and
  maintaining external platform accounts, agreeing to third-party terms
  (fees, dispute-resolution processes, listing requirements this
  project hasn't reviewed), and possibly different packaging/labeling
  per platform — a materially different commitment than a direct
  introduction email, and outside this framework's "no accounts
  created" constraint. Flagged as a real opportunity, not pursued here.
- **Outreach approach**: not applicable — this is a platform
  registration decision, not an outreach sequence. If pursued later, it
  would need its own review (platform terms, fees, account creation)
  before any listing goes up.

### Smaller retailers

- **Buyer profile**: independent shops (single-location African/ethnic
  grocery stores, small specialty retailers) buying in volumes too
  small to justify individual, personalized outreach at this stage.
- **Countries to target**: same diaspora markets as Tier 1, but
  deprioritized by volume rather than geography.
- **Why Tier 3, not higher**: with no MOQ published yet
  (`docs/COMMERCIAL_INFO_DECISION_RECORD.md` row 1) and outreach
  capacity necessarily limited (this is a small operation reaching out
  individually, not a marketing team), smaller retailers are better
  reached indirectly — through the distributors and importers who
  already serve them — than through direct one-to-one outreach that
  would compete for the same limited time as Tier 1 outreach.
- **Outreach approach**: not pursued directly in this phase; naturally
  reached once Tier 1 distributor relationships are in place, since
  those distributors are this segment's actual usual supplier.

---

## What this framework deliberately does not do

- **Does not name a single real buyer company.** That's
  `docs/BUYER_RESEARCH_DATABASE_TEMPLATE.md`'s job, and it's empty by
  design until real research is done.
- **Does not commit to a specific country list as exhaustive.** The
  markets named above (UK, Netherlands, Germany, US, China) are
  reasonable starting points grounded in diaspora presence and
  BorgaFoods' existing operational footprint — not a market-sizing
  study this project hasn't done.
- **Does not invent a MOQ, capacity, or timeline claim** to make any
  tier sound more ready than it is — every tier's "why it fits"
  reasoning points back to something already true and already public.

## Related documents

- `docs/BUYER_INTENT_CONTENT_AUDIT.md` — the 4 standing buyer personas this framework's tiers are built on.
- `docs/BUYER_OUTREACH_TEMPLATES.md`, `docs/BUYER_OUTREACH_SEQUENCE.md` — the actual email content for each tier's outreach approach.
- `docs/BUYER_RESEARCH_DATABASE_TEMPLATE.md` — where real companies get logged once research begins.
- `docs/EXPORTER_PROFILE_FINAL.md`, `docs/GEPA_CREDIBILITY_SECTION_PROPOSAL.md` — the credibility assets referenced throughout.
- `docs/COMMERCIAL_INFO_DECISION_RECORD.md` — why MOQ/capacity claims are absent from every tier's reasoning.
