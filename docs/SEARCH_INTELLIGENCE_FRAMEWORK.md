# Search Intelligence Framework

Status: **Strategic framework, not a validated keyword list.** This
repository has no keyword-research tool (Google Keyword Planner, Ahrefs,
SEMrush, or similar) and no search-volume/competition data source beyond
Search Console itself, which is still processing (see
`docs/GSC_INDEXING_AUDIT.md`) and has no query data yet. What follows is
a topic and category structure — grounded in the site's actual products,
approved business capabilities, and existing page content, not
invented — for organizing keyword tracking once real query data
(Search Console Performance report, or an external tool) becomes
available to validate and prioritize it.

## Scope constraint

Every search category below maps to something BorgaFoods can actually
say today: one of the 5 published products in
`shared/productIntelligence/publishedRegistry.ts`, or one of the
business capabilities already live on the site (wholesale, export
documentation coordination, mixed-container planning, private-label
*discussion* for Fufu Flour specifically). Nothing here proposes a new
product, a new claim, or a new capability. Categories with no current
page match are marked as gaps, not filled in.

## 1. Product-level search categories

One category per published product, built from the product's actual
`category`, `description`, and `variants` fields (source of truth:
`publishedRegistry.ts`) — not generic industry terms unconnected to what
BorgaFoods actually sells.

| Product (slug) | Category | Search themes | Current landing page |
| --- | --- | --- | --- |
| Fufu Flour (`fufu-borga`) | Traditional Flour Blends | fufu flour export, fufu flour wholesale, plantain cassava flour, instant fufu flour supplier, fufu flour bulk | `/products` (product block), referenced on `/` |
| Gari (`gari-borga`) | Cassava Products | gari export, cassava granules wholesale, gari supplier Ghana, gari bulk 25kg 50kg | `/products` |
| Kokonte (`kokonte-borga`) | Cassava Products | kokonte flour export, dried cassava flour, kokonte wholesale supplier | `/products` |
| Banku Borga (`banku-borga`) | Traditional Ghanaian Staples | banku flour export, fermented corn cassava blend, banku mix wholesale | `/products` |
| Cassava Flour (`cassava-flour`) | Cassava Products | cassava flour export, cassava flour for fufu, pure milled cassava wholesale | `/products` |

**Observation, not a recommendation to act on unilaterally**: all 5
products currently share one landing surface (`/products`, a single page
with all 5 as sections). There is no per-product URL. This means none of
the product-specific search themes above have a dedicated page to rank
independently — a search for "gari wholesale supplier" and a search for
"kokonte flour export" both compete for the same `/products` page rather
than each having a focused target. Whether to build per-product pages is
a content-architecture decision with real tradeoffs (more pages to
maintain vs. more specific ranking targets) — flagged for a decision,
not built here, consistent with "do not create new pages... without
approval."

## 2. Business-capability search categories

Built from what the site's own copy already commits to (Home,
`/export-solutions`, `/wholesale`, `/export` — see
`docs/BUYER_INTENT_CONTENT_AUDIT.md` for the full page-by-page read),
not aspirational capability.

| Capability (as the site describes it) | Search themes | Current landing page |
| --- | --- | --- |
| Ghanaian food manufacturing (BorgaFoods Processing) | Ghana food manufacturer, Ghanaian staple food producer | `/`, `/about` |
| Export selection sourced from partners (kept distinct from manufacturing) | Ghana food export partner, African grocery export supplier | `/export-solutions` |
| Mixed container / bulk supply planning | mixed container Ghana foods, bulk Ghanaian food export, container supply Ghana | `/export-solutions` |
| Wholesale supply for distributors/retailers/food-service | wholesale Ghanaian foods, African grocery wholesale supplier, restaurant bulk Ghana foods | `/wholesale` |
| Export documentation coordination | Ghana food export documentation, food export compliance Ghana | `/export` |
| Private-label discussion (Fufu Flour only, `approved_for_discovery`) | private label Ghanaian food manufacturer, white label fufu flour | `/wholesale` (Private-label Discovery section) |

**Scope note on private label**: only Fufu Flour is currently
`approved_for_discovery` in BPIP (`privateLabelEligibleProducts` in
`publishedRegistry.ts`); the other 4 products are
`requires_business_approval`. Any keyword targeting or content work
around "private label gari" or "private label kokonte" would be
targeting a capability the business hasn't actually approved yet — out
of scope until BPIP governance says otherwise.

## 3. Origin and category search themes

Broader terms that don't map to one product but position BorgaFoods
within a recognizable buyer search pattern (Ghana / West African food
export), grounded in language the site already uses (Home page keywords,
`docs/SEO_FOUNDATION.md`'s existing per-page `keywords` audit):

- Ghana food export, Ghana food manufacturer
- West African staple foods, African grocery distributor
- Ghanaian food wholesale supplier

These are already reflected in the `keywords` prop on `SEO.tsx` across
existing pages (see `docs/BUYER_INTENT_CONTENT_AUDIT.md` for the
page-by-page list) — this section exists to confirm they're consistent
with the product/capability reality above, not to introduce new terms.

## 4. Buyer-role search categories

Matches the 4 buyer personas the site already names explicitly
(`/wholesale`'s "Who We Support" section, the RFQ form's `inquiry_type`
field): distributor, wholesaler/retailer, restaurant/food-service,
importer. See `docs/BUYER_INTENT_CONTENT_AUDIT.md` §2 for the full
persona-by-persona content audit — that document is the buyer-intent
half of this framework; this section only exists to note that keyword
tracking should be organized by the same 4 personas the business
already uses internally (via `inquiry_type`), not a separately invented
set, so that GA4's `generate_lead` breakdown (once active — see
`docs/GA4_ACTIVATION_PLAN.md`) and Search Console query data can be
joined against the same categories later.

## 5. How to actually validate this (next steps, not done here)

1. **Once Search Console's Performance report populates** (days, not
   immediate — see `docs/GSC_INDEXING_AUDIT.md`): pull actual queries
   BorgaFoods is already appearing for, and check them against the
   categories above. Anything appearing that *isn't* in this framework
   is a real signal worth adding; anything in this framework that never
   appears is a hypothesis that didn't pan out.
2. **An external keyword tool** (Keyword Planner via a Google Ads
   account, or a paid tool) would add real search-volume and
   competition data this framework cannot provide — genuinely useful,
   not currently available, not fabricated here.
3. **Once GA4 is active** (`docs/GA4_ACTIVATION_PLAN.md`), cross-reference
   which of these categories' landing pages actually convert
   (`generate_lead` by `product_slug`/`inquiry_type`) against which
   merely attract traffic — the gap between the two, per
   `docs/ANALYTICS_DASHBOARD_SPEC.md` §5, is the most actionable finding
   this framework sets up.

## Related documents

- `docs/BUYER_INTENT_CONTENT_AUDIT.md` — whether existing page content actually serves each buyer persona/search theme above.
- `docs/GSC_INDEXING_AUDIT.md` — current Search Console state.
- `docs/GA4_ACTIVATION_PLAN.md` — how conversion data will eventually validate which of these categories matter.
- `shared/productIntelligence/publishedRegistry.ts` — the single source of truth for which products this framework may ever reference.
