# Buyer Research Database — Template

Status: **Empty template. No real company has been added.** This is the
structure for tracking real buyer research once it begins — a single
place to log candidates identified against `docs/BUYER_TARGETING_FRAMEWORK.md`'s
tiers, their outreach status, and follow-up timing from
`docs/BUYER_OUTREACH_SEQUENCE.md`. Kept in Markdown here as the
structure definition; the actual working database (once populated)
should live in a spreadsheet or lightweight CRM, since this table will
grow far beyond what a Markdown file can comfortably hold.

## Fields

| Field | Purpose | Example (illustrative only, not a real company) |
| --- | --- | --- |
| Company name | Identifies the buyer | "Example Foods Ltd" |
| Country | Matches against `docs/BUYER_TARGETING_FRAMEWORK.md`'s target markets | United Kingdom |
| Website | Source for buyer-profile research and later contact | example.co.uk |
| Buyer type | One of the 6 tiered categories in `docs/BUYER_TARGETING_FRAMEWORK.md` (African food distributor, ethnic grocery importer, African supermarket, restaurant supplier, food service distributor, private-label buyer) or Tier 3 (online marketplace, smaller retailer) | African food distributor |
| Contact person | Named individual, if identifiable, rather than a generic inbox | Jane Doe, Purchasing Manager |
| Email | Contact address for outreach | jane@example.co.uk |
| Product interest | Which of the 5 manufactured products, or the broader export assortment, appears relevant based on research | Gari, Cassava Flour |
| Status | Where this contact sits in the outreach sequence | Not contacted / Day 0 sent / Day 5 sent / Day 14 sent / Day 30 sent / Responded / Not interested / On hold |
| Last contact | Date of most recent outreach touch, for sequence timing | — |
| Follow-up date | Next scheduled touch, computed from `docs/BUYER_OUTREACH_SEQUENCE.md`'s Day 0/5/14/30 cadence | — |

## Status field — allowed values

Kept as a controlled list so the eventual database can be filtered and
reported on consistently:

- **Not contacted** — identified but no outreach sent yet
- **Day 0 sent** — introduction email sent
- **Day 5 sent** — follow-up sent
- **Day 14 sent** — value-based follow-up sent
- **Day 30 sent** — final follow-up sent, sequence complete
- **Responded** — buyer replied at any stage; sequence stops, handled individually from here
- **Not interested** — buyer declined or unsubscribed; no further outreach
- **On hold** — valid candidate, outreach deliberately paused (e.g. missing a decision this framework can't make, such as confirming country-specific import requirements)

## What this template is not

- **Not a real buyer list.** Every row above is illustrative. Populating
  this template with real companies is a separate, future research
  task — this document defines the structure only.
- **Not a CRM.** No automation, no email integration, no scheduling
  logic exists in this codebase. This is a manual tracking structure a
  person (or a spreadsheet with manual reminders) operates.
- **Not a data-collection or outreach action in itself.** Creating this
  template does not contact anyone; it only prepares the place real
  research would be recorded once that research happens.

## How this connects to the rest of the buyer-acquisition system

1. A candidate is identified against a `docs/BUYER_TARGETING_FRAMEWORK.md`
   tier and logged here with Status = "Not contacted."
2. Day 0 outreach (`docs/BUYER_OUTREACH_SEQUENCE.md`) is sent; Status
   and Last contact update; Follow-up date is set to +5 days.
3. The sequence continues through Day 5/14/30 unless the buyer responds
   or declines, at which point Status moves to "Responded" or "Not
   interested" and the automatic sequence stops.
4. Response patterns across this table are the input to
   `docs/WEBSITE_CONVERSION_REVIEW.md`'s "measure response" loop — which
   buyer types respond, at which stage, is a data source this framework
   is built to eventually generate, not one it has yet.

## Related documents

- `docs/BUYER_TARGETING_FRAMEWORK.md` — the tiers and buyer types this template's "Buyer type" field references.
- `docs/BUYER_OUTREACH_SEQUENCE.md` — the Day 0/5/14/30 emails this template's "Status" and "Follow-up date" fields track.
- `docs/BUYER_OUTREACH_TEMPLATES.md` — the original 3 introduction templates this sequence builds on.
