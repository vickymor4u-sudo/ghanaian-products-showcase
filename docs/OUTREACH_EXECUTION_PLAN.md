# Outreach Execution Plan

Status: **Planning only. No buyer has been contacted, no email sent, no
account created.** Turns `docs/BUYER_TARGETING_FRAMEWORK.md`'s tiers,
`docs/BUYER_OUTREACH_TEMPLATES.md`/`docs/BUYER_OUTREACH_SEQUENCE.md`'s
email content, and `docs/EXPORTER_PROFILE_FINAL.md`'s buyer-facing
profile into an actual execution order: who to approach first, in what
sequence, which live website page each segment's outreach should point
to, and which prepared asset to attach or reference. This document
decides *sequencing and routing* — it does not draft new emails or
change any existing template.

## How the order below was decided

Three factors, in this priority: (1) does BorgaFoods' actual live
capability match the segment with zero caveats (Tier 1 before Tier 2
before Tier 3, per `docs/BUYER_TARGETING_FRAMEWORK.md`'s own logic);
(2) within a tier, which segment has the most direct, dedicated website
support to land them on; (3) which segment is fastest to convert into a
learning signal — the mission's actual goal this phase is a *measurable*
system, so a segment that produces a fast yes/no/why-not is worth more
right now than one that's individually higher-value but slower to
resolve.

---

## Recommended sequence

### 1st — African food distributors (Tier 1)

- **Why first**: zero capability gap, zero caveat needed in the
  outreach — the full 5-product manufactured range, `/wholesale`, and
  every product page are already built specifically for this persona.
  Fastest to send without any hedge in the message.
- **Landing page**: `/wholesale` (primary) — the "Distributors" persona
  card, the newly-added Ghana/China operational-presence line
  (`docs/LEAD_GENERATION_CHANGE_REPORT.md`, Change 5), and the
  Distributor Partnerships section all speak directly to this segment.
  Secondary: `/products` for the full range.
- **Asset to send**: Template 1 (`docs/BUYER_OUTREACH_TEMPLATES.md`) as
  the Day 0 email; `docs/EXPORTER_PROFILE_FINAL.md`'s content (once
  formatted — see `docs/BUYER_PACKAGE_STRUCTURE.md` for what's still
  needed) as a follow-up attachment if the buyer responds with
  interest, not sent cold on Day 0.

### 2nd — Ethnic grocery importers (Tier 1)

- **Why second**: same zero-gap fit as distributors, but the message
  leads with export/compliance credibility (GEPA, documentation
  coordination) rather than product range — a slightly narrower
  opening than distributors' broader "here's our range" pitch, so
  sequenced just after.
- **Landing page**: `/export` (primary) — this is the page written
  specifically for the import-documentation question, and now carries
  the GEPA registration line directly in its "Shipment Planning"
  section. Secondary: `/wholesale` for buyer-type framing.
- **Asset to send**: Template 2, adapted per
  `docs/BUYER_TARGETING_FRAMEWORK.md`'s existing guidance (lead with
  export documentation and compliance capability rather than product
  range alone).

### 3rd — African supermarkets (Tier 1)

- **Why third**: same tier, same fit, but retail-pack framing is a
  narrower opening than distributor/importer framing (a supermarket
  buyer is evaluating shelf-ready formats specifically, not general
  supply capability) — sequenced last within Tier 1 for that reason,
  not because the fit is weaker.
- **Landing page**: `/wholesale` (the "Grocery retailers" persona card)
  with `/products` as the natural next click for retail-pack sizing
  (500g–5kg across the range, already listed per-product).
- **Asset to send**: Template 2, adapted toward retail-pack sizing and
  shelf-ready formats, per `docs/BUYER_TARGETING_FRAMEWORK.md`.

### 4th — Private-label buyers, Fufu Flour only (Tier 2)

- **Why fourth, ahead of the other two Tier 2 segments**: this is the
  most concrete, ready-to-execute Tier 2 conversation — one specific
  product, a dedicated live page section, a dedicated RFQ path
  (`inquiryType=private_label`), and clear, already-live guardrail
  language about what submitting an enquiry does and doesn't commit to.
  Nothing speculative about what BorgaFoods can currently offer this
  segment.
- **Landing page**: **`/products/fufu-flour` specifically** — this is
  the one product page that renders the private-label section at all
  (conditional on BPIP's `privateLabelDiscoveryApproved`, currently
  true only for Fufu Flour). Sending this segment to `/wholesale`
  alone risks the buyer not realizing which product is actually in
  scope — see `docs/BUYER_OBJECTION_ANALYSIS.md`'s private-label
  finding, addressed this phase by naming Fufu Flour explicitly on
  `/wholesale` too.
- **Asset to send**: Template 3 — already explicitly scoped to Fufu
  Flour only, with a standing warning in
  `docs/BUYER_OUTREACH_TEMPLATES.md` against adapting it to any other
  product before that product clears the same BPIP approval gate. Do
  not reference the broader 5-product *targeting* scope recorded in
  `docs/BUYER_TARGETING_FRAMEWORK.md`'s Tier 2 section in any outreach
  content — that scope describes internal targeting intent, not a live
  capability (see that document's own status note).

### 5th — Restaurant suppliers (Tier 2)

- **Why fifth**: matches an existing persona but against a supply
  strength (25kg/50kg bulk sacks) that's less proven for food-service
  buying patterns (smaller, more frequent orders) — worth testing, but
  after the four segments above where fit is closer to certain.
- **Landing page**: `/wholesale`'s "Restaurants & food service"
  persona card.
- **Asset to send**: Template 1, adapted toward food-service format
  and consistency needs rather than resale volume, per
  `docs/BUYER_TARGETING_FRAMEWORK.md`.

### 6th — Food service distributors (Tier 2)

- **Why last of the segments actually being pursued**: the least
  directly-targeted fit of the six — this tests a new angle (positioning
  against product attributes rather than diaspora/cultural relevance)
  rather than extending a persona the site is already built for. Worth
  doing, but only after the five segments above have produced some
  signal to compare it against.
- **Landing page**: `/wholesale` and `/export-solutions` — the broader,
  less African-food-specific framing of BorgaFoods' capability.
- **Asset to send**: same templates, reframed around shelf life,
  packaging formats, and staple-food versatility rather than
  diaspora-market specificity, per `docs/BUYER_TARGETING_FRAMEWORK.md`.

### Not sequenced this phase — Tier 3 (online marketplaces, smaller retailers)

Unchanged from `docs/BUYER_TARGETING_FRAMEWORK.md`'s own reasoning:
marketplaces require external account creation (out of scope for
outreach entirely); smaller retailers are better reached indirectly
once Tier 1 distributor relationships exist. Nothing to sequence here
yet.

---

## Summary table

| Order | Segment | Tier | Landing page | Day 0 asset |
| --- | --- | --- | --- | --- |
| 1 | African food distributors | 1 | `/wholesale` → `/products` | Template 1 |
| 2 | Ethnic grocery importers | 1 | `/export` → `/wholesale` | Template 2 (documentation-led) |
| 3 | African supermarkets | 1 | `/wholesale` → `/products` | Template 2 (retail-pack-led) |
| 4 | Private-label buyers (Fufu Flour) | 2 | `/products/fufu-flour` | Template 3 |
| 5 | Restaurant suppliers | 2 | `/wholesale` | Template 1 (food-service-led) |
| 6 | Food service distributors | 2 | `/wholesale` / `/export-solutions` | Template 1/2 (attribute-led) |

## What this plan deliberately does not do

- **Does not name a single real company** — that's still
  `docs/BUYER_RESEARCH_DATABASE_TEMPLATE.md`'s job, still empty by
  design.
- **Does not send anything** — sequencing and routing only.
- **Does not change any outreach template's content** — Templates 1–3
  and the Day 0/5/14/30 sequence are used exactly as already drafted.
- **Does not recommend the exporter profile PDF as a Day-0 attachment**
  for any segment — it's not yet a finished, distributable file
  (`docs/BUYER_PACKAGE_STRUCTURE.md`), and a cold Day-0 email carrying
  a large attachment is generally lower-converting than a short,
  low-commitment message; recommended instead as a follow-up once a
  buyer responds, once it exists as an actual PDF.

## What would need to happen before this plan can actually run

1. A decision to begin outbound outreach at all — this and every prior
   outreach-preparation document has stopped short of that decision,
   per standing instruction.
2. Real candidate companies logged in
   `docs/BUYER_RESEARCH_DATABASE_TEMPLATE.md` for segments 1–3 at
   minimum, before segment 4 (private-label) is reached.
3. A sender name/title — every outreach template still has this as a
   placeholder; this repository has no org chart to fill it from.
4. UTM tagging discipline applied to every outbound link, per
   `docs/CONVERSION_MEASUREMENT_PLAN.md` — so that once GA4 is active,
   this sequencing's actual effectiveness (which segment responded,
   which converted) is measurable rather than anecdotal.

## Related documents

- `docs/BUYER_TARGETING_FRAMEWORK.md` — the tier logic and persona detail this plan sequences.
- `docs/BUYER_OUTREACH_TEMPLATES.md`, `docs/BUYER_OUTREACH_SEQUENCE.md` — the actual email content referenced by segment above.
- `docs/EXPORTER_PROFILE_FINAL.md`, `docs/BUYER_PACKAGE_STRUCTURE.md` — the follow-up asset and its current readiness gaps.
- `docs/BUYER_OBJECTION_ANALYSIS.md` — the private-label discoverability finding that shaped segment 4's landing-page recommendation.
- `docs/CONVERSION_MEASUREMENT_PLAN.md` — how this plan's actual effectiveness would be measured once outreach begins.
