# BorgaFoods Performance Optimization Audit

Status: **Audit complete. Root causes #1 and #2 (below) are now fixed,
deployed to production, and verified — see "Performance Optimization
Phase 1 — implementation & verification" at the end of this document.
Every other finding in this audit remains unimplemented, as scoped.**
Investigates reported slow navigation between pages. Every measurement
below was taken directly — against the live production site
(`www.borgafoods.com`) via browser automation and `curl`, and against a
fresh local production build — not estimated or assumed. Two root
causes accounted for almost everything found; both are precisely
identified with code references, and both are now resolved.

## Executive summary

**The reported slow navigation is real, and it has an identifiable,
narrow cause: most of the site's primary navigation — the header menu,
the footer links, and one "Contact Us" button — uses plain HTML links
instead of the client-side router already used everywhere else in the
app. Every click on those links throws away the loaded page and
reloads the entire site from scratch, instead of the instant, no-reload
transition the rest of the app already does correctly.** This is
compounded by a second, independent issue: every asset on the site —
JS, CSS, images, even `sitemap.xml` — is served with a cache header
that forces the browser to revalidate on every single load, so each of
those unnecessary reloads also can't fall back on a fast local cache
hit. Both are precisely scoped, both have a narrow fix that touches
nothing about SEO or business logic, and neither requires removing
anything.

| # | Root cause | Where | Real-world effect |
| - | --- | --- | --- |
| 1 | Header nav, footer, and one CTA use `<a href>` instead of wouter's `<Link>` | `Navigation.tsx`, `Footer.tsx`, `About.tsx:60` | Every primary navigation click reloads the entire site instead of an instant client-side transition |
| 2 | Every asset served `Cache-Control: public, max-age=0, must-revalidate` | Cloudflare Pages, caused by `_routes.json` routing all requests through `functions/_middleware.ts` | Browsers can't cache JS/CSS/images between visits or reloads — every one of the reloads from #1 also can't use a fast cache hit |

## Methodology

- **Code inspection**: read every routing, navigation, and asset-loading
  code path directly (`App.tsx`, `Navigation.tsx`, `Footer.tsx`, all 8
  page components, `functions/_middleware.ts`, `vite.config.ts`,
  `client/public/_routes.json`).
- **Live production measurement**: browser automation against
  `https://www.borgafoods.com` using the real Navigation Timing API
  (`performance.getEntriesByType('navigation')`), `curl` for response
  headers, and direct network-request inspection.
- **Local build measurement**: a clean `vite build` (no changes made)
  for authoritative bundle sizes, since production's exact current
  build hash changes with each deploy.
- **Nothing in this document is estimated.** Every number has its
  source stated next to it.

---

## 1. Navigation performance

### Test routes

All 6 requested routes render correctly and returned no route-specific
errors: `/`, `/about`, `/products`, `/contact`, `/export`, `/wholesale`.

### The actual root cause, demonstrated

`client/src/App.tsx` uses `wouter` (a client-side router) for all 9
routes, and most in-page content links correctly use wouter's `<Link>`
component (`ExportQuoteButton.tsx`, `Home.tsx`, `Products.tsx`,
`ProductDetail.tsx`, `ExportCompliance.tsx`, `ExportSolutions.tsx`) —
clicking these performs an instant, in-memory route swap with **no
network request and no page reload**.

**But the site's persistent chrome — present on every single page —
does not use `<Link>`:**

| File | What uses plain `<a href="/...">` |
| --- | --- |
| `client/src/components/Navigation.tsx` (lines 29, 49, 83) | The logo link, all 7 desktop nav items, and the same 7 items again in the mobile menu — every link in the site's persistent header |
| `client/src/components/Footer.tsx` (lines 52, 60, 68, 76, 84, 93) | All 6 "Quick Links" (Products, Export Solutions, Wholesale, Export & Compliance, About Us, Contact) — every internal link in the footer |
| `client/src/pages/About.tsx` (line 60) | The "Contact Us" button in the "Our Story" section |

(Footer's LinkedIn/website icons and mailto link, and Navigation's
external links, correctly remain plain `<a>` — those *should* trigger
a real navigation. Only the internal, same-site links are the problem.)

**Directly demonstrated on live production**: clicking "Products" in
the header navigation from `/` was measured with the browser's own
Navigation Timing API. The result showed `unloadEventStart` fired (the
prior page was torn down) and a fresh navigation timeline starting from
0, with `loadEventEnd: 641ms` — **conclusive proof this is a full
document reload**, not a client-side transition. For comparison, every
`<Link>`-based transition elsewhere in the app produces *zero* new
navigation-timing entries and *zero* network requests, because nothing
is reloaded at all — the difference between the two is not a matter of
degree, it's binary.

**Why this matters more than the raw 641ms suggests**: that number was
measured with the JS/CSS already warm in cache moments earlier. A real
visitor clicking through the header nav — which is the primary way
anyone moves around a B2B site like this — pays this cost repeatedly:
once per header/footer click, compounded by root cause #2 below (no
real caching, so even "warm" assets require a revalidation round trip
each time).

### Console errors

No route-specific JavaScript errors were found in the application code
across any of the 6 test routes. Testing did surface an intermittent
`ERR_ABORTED` / occasional-404 pattern on JS/CSS/image requests **in
the browser automation tool specifically** — investigated and ruled
out as a real production issue: the same "failing" image URLs returned
`200 OK` on 10/10 consecutive direct `curl` requests. This is recorded
here for transparency, not as a finding — see the note at the end of
this document.

---

## 2. Bundle analysis

### Current measurements (fresh local `vite build`, unmodified)

| Asset | Size | Gzip | Brotli (production, confirmed via `curl`) |
| --- | --- | --- | --- |
| `index.html` | 1.36 kB | 0.65 kB | — |
| `index-*.css` | 122.96 kB | 18.89 kB | active (`content-encoding: br`) |
| `index-*.js` | 478.26 kB | 135.65 kB | active (`content-encoding: br`) |

**1,713 modules** are transformed into a **single JavaScript chunk**.
There is no code-splitting anywhere — `App.tsx` statically imports all
8 page components (`Home`, `Products`, `ProductDetail`,
`ExportCompliance`, `About`, `Contact`, `ExportSolutions`, `Wholesale`)
and every component they use. This means a visitor to `/` downloads
and parses the same JavaScript as a visitor who only ever looks at
`/contact`'s 1,147-line RFQ form — including `zod`, form-handling code,
and the Turnstile widget wrapper — before they've navigated anywhere.

### Duplicate dependencies / unused imports — checked, not a real issue

The `package.json` lists 50 dependencies, including a large shadcn/ui
scaffold: 53 component files exist in
`client/src/components/ui/`, wrapping libraries like `recharts`,
`embla-carousel-react`, `react-day-picker`, `cmdk`, `vaul`, and
`framer-motion`. **Only 14 of those 53 files are actually imported
anywhere in the app** (`alert`, `button`, `card`, `dialog`, `input`,
`label`, `separator`, `sheet`, `skeleton`, `sonner`, `spinner`,
`textarea`, `toggle`, `tooltip`).

This looks like a bundle-bloat risk, but it verifiably isn't one:
searching the actual built JS for signatures of the 6 heaviest unused
libraries (`embla`, `recharts`, `react-day-picker`, `cmdk-`, `vaul`,
`framer-motion`) returned **zero matches**. Vite/Rollup's tree-shaking
is correctly excluding all 39 unused component files and their
dependencies from the shipped bundle. This is not a place to spend
optimization effort — it already works.

### BPIP module loading — checked, working as designed

`shared/productIntelligence/publishedRegistry.ts` (the client-safe
product data, 205 lines) is the only BPIP module ever imported by
client code. `internalCandidates.ts` (114 lines, internal-only product
candidates) is imported solely by the internal-only `registry.ts` —
confirmed **never** reachable from `client/src/`, and confirmed absent
from the built JS by direct search (zero matches for
`internalCandidates`/`InternalCandidate` in the built bundle). This
matches what `scripts/verify-no-internal-leak.ts` already guards at
build time — re-verified manually here, not just trusted.

### SEO/analytics code — checked, correctly inert

`client/src/components/Analytics.tsx` is a true no-op when
`VITE_GA4_MEASUREMENT_ID` is unset (currently the case) — it renders
nothing and its `useEffect`s return immediately without calling
`initAnalytics()` or firing any network request. No unnecessary
loading here; the config-gating pattern is working as designed.

---

## 3. Image audit

### Current measurements

| File | Dimensions | File size |
| --- | --- | --- |
| `fufu-borga.jpg` | 900×1124 | 417,684 bytes |
| `fufu-product.jpg` | 1024×1536 | 332,958 bytes |
| `gari-borga.jpg` | 900×1350 | 286,514 bytes |
| `kokonte-borga.jpg` | 900×1124 | 215,913 bytes |
| `banku-borga.jpg` | 900×1350 | 250,866 bytes |
| `banku-product.jpg` | 1024×1536 | 405,705 bytes |
| `cassava-flour.jpg` | 900×1124 | 200,455 bytes |

Total: **2.0 MB** across 7 files, all JPEG.

### Finding: 2 of the 7 images are never actually loaded by any visitor

`fufu-product.jpg` and `banku-product.jpg` are listed as a second image
in `publishedRegistry.ts`'s `images` array for Fufu Flour and Banku
Borga, but every single `<img>` tag in the codebase
(`Home.tsx`, `Products.tsx`, `ProductDetail.tsx`) renders only
`product.images[0]` — the second array entry is never read anywhere.
**These two files (738,663 bytes combined, over a third of the image
folder) are genuinely dead weight** — not a runtime cost for visitors
(nothing links to them, so browsers never fetch them), but real,
unnecessary deploy size.

### Loading strategy — already correct

Grid images (`Home.tsx`, `Products.tsx`) already use
`loading={index === 0 ? "eager" : "lazy"}` — the first (likely
above-the-fold) image loads eagerly for a fast LCP, the rest lazy-load.
`ProductDetail.tsx`'s hero image correctly uses `loading="eager"`. All
three also set `decoding="async"`. This is already following current
best practice — no fix needed here.

### Format optimization — a real, unaddressed gap

All images are JPEG only. No WebP or AVIF variants exist. All images
are served at 900–1024px wide regardless of the viewport or the
container they render into (e.g. Home's product grid renders images
inside a `4:5` aspect-ratio card that's a fraction of that width on
both mobile and most desktop layouts) — there is no `srcset`/`sizes`
responsive-image setup, so every visitor downloads the same full-size
file regardless of how large it's actually displayed.

---

## 4. React architecture review

### No code-splitting or lazy loading anywhere

Confirmed by direct inspection of `App.tsx`: zero uses of
`React.lazy()` or dynamic `import()` in the entire `client/src`
directory. This is the direct cause of bundle analysis's "single
478 kB chunk" finding above — it's a routing-architecture issue, not
just a bundling one.

### Unnecessary re-renders — one real instance found

`client/src/pages/Contact.tsx` (1,147 lines — by far the largest
component in the app) manages its entire multi-field RFQ form with a
single `useState(createInitialFormData)` object, updated on every
keystroke via one shared change handler. `react-hook-form` is a
dependency and is used correctly elsewhere in the shadcn/ui scaffold
(`client/src/components/ui/form.tsx`), but **Contact.tsx does not use
it** — every keystroke in any field re-renders the entire form
component. For a form this size, this is a real but moderate cost
(React's diffing keeps the actual DOM work small); it's not the
navigation bottleneck, but it is unnecessary re-render work exactly of
the kind this audit was asked to identify.

### Heavy components

`Contact.tsx` (1,147 lines) and `ProductDetail.tsx` (461 lines) are the
two largest page components, both shipped in the single bundle
regardless of route (see bundle analysis).

### Missing code splitting — the same finding as above, from the React side

`Contact.tsx`'s size is a direct, current reason to code-split by
route: it alone is roughly a fifth of the app's total line count, and
every byte of it is downloaded and parsed even by a visitor who only
looks at the homepage.

### What's already correct

`Products.tsx` already uses `useMemo` for its category list, and its
product-filtering logic operates over only 5 products — genuinely
too small a dataset for memoization of the filter itself to matter.
No missing-`useMemo` issue was found at the current catalogue size.

---

## 5. Cloudflare delivery review

### Caching headers — the second root cause, demonstrated

```
$ curl -sI https://www.borgafoods.com/assets/index-DXdE-uPT.js
cache-control: public, max-age=0, must-revalidate

$ curl -sI https://www.borgafoods.com/assets/index-Ck6Hx_Yo.css
cache-control: public, max-age=0, must-revalidate

$ curl -sI https://www.borgafoods.com/sitemap.xml
cache-control: public, max-age=0, must-revalidate
```

Every asset checked — including the content-hashed JS/CSS bundles,
which are *designed* to be cached forever since a new build always gets
a new filename — is served with `max-age=0, must-revalidate`. This
forces a revalidation round-trip on every load, for every asset, for
every visitor, including the extra reloads caused by root cause #1.

**Why**: `client/public/_routes.json` currently reads:

```json
{ "version": 1, "include": ["/*"], "exclude": [] }
```

This routes **every** request — including `/assets/*.js`,
`/assets/*.css`, and `/images/*.jpg` — through
`functions/_middleware.ts` rather than letting Cloudflare Pages serve
static assets directly from its own CDN/cache layer, which is where
the automatic long-lived cache headers for hashed filenames would
normally come from. The middleware's own code (`functions/_middleware.ts:113-131`)
correctly detects a real static asset and returns it unmodified via
`context.env.ASSETS.fetch()` — the *content* served is always correct —
but that fetch doesn't carry the same cache-control behavior Cloudflare
Pages applies when it serves a static asset natively, outside a
Function.

**This catch-all routing was added deliberately**, in an earlier phase
of this project, specifically so `functions/_middleware.ts` could
inject per-route `<link rel="canonical">` and `<meta name="robots">`
tags into the raw HTML before any JavaScript runs (`docs/CHANGE_LOG.md`,
8 August 2026 entry). That reasoning is sound and should not be
undone — but it only actually needs to apply to HTML *page* routes, not
to `/assets/*` or `/images/*`, which never need canonical or robots
tags injected into them at all.

### Compression — already correct

Both the JS bundle and the HTML document are served with
`content-encoding: br` (Brotli) — confirmed via `curl` with
`Accept-Encoding: gzip, br`. No action needed here.

### Build output size

```
2.9 MB  dist/public/           (total)
2.0 MB    images/              (7 JPEGs, 2 of which are never loaded — see §3)
468 KB    assets/index-*.js
124 KB    assets/index-*.css
```

### Function invocation load

Cloudflare's dashboard (Workers & Pages → borgafoods → Metrics, 1–9
August window) shows 661 requests and 1,320 ms of cumulative CPU time
for the account in that period. Routing every static-asset request
through `functions/_middleware.ts` (root cause #2's mechanism) means
every one of those requests — including images and JS/CSS, not just
page loads — consumes Function invocation time that native static
serving wouldn't need at all. Not a cost concern at current traffic
levels, but consistent with, and additional evidence for, the same
architectural point.

---

## Root causes — consolidated

| # | Root cause | Evidence | Affects |
| - | --- | --- | --- |
| 1 | Header/footer/one CTA use `<a href>` instead of `<Link>` | Live Navigation-Timing proof of full reload; 14 specific line references across 3 files | Every primary navigation click, on all 6 test routes |
| 2 | `_routes.json` routes all requests (including static assets) through the Function, losing native caching | `curl` headers on 3 different asset types, all `max-age=0` | Every asset, every visitor, compounding root cause #1 |
| 3 | No route-based code splitting | `App.tsx` static imports, single 478 kB chunk confirmed in build output | First-load time on every route, worst for visitors who only need one page |
| 4 | 2 of 7 product images (739 kB) are dead weight | Confirmed zero references to `images[1]` anywhere in rendering code | Deploy size only — not visitor-facing, since nothing fetches them |
| 5 | No responsive/modern-format images | All 7 images are full-size JPEG, no `srcset`, no WebP/AVIF | Image download size on every page that shows a product photo |
| 6 | `Contact.tsx`'s form re-renders entirely on every keystroke | `useState` object + shared handler, `react-hook-form` unused despite being available | Minor; RFQ form responsiveness only |

---

## Recommended fixes

Ordered by estimated impact-to-effort ratio. None of these touch SEO
behavior, remove any approved functionality, or change business logic
— each is scoped specifically to avoid that, per this audit's
constraints. **Items 1 and 2 are now implemented** — see
"Performance Optimization Phase 1 — implementation & verification"
below for what actually shipped and how it was verified. Items 3–6
remain unimplemented, as scoped.

1. ~~Replace the 14 internal `<a href>` links in `Navigation.tsx`,
   `Footer.tsx`, and the 1 in `About.tsx` with wouter's `<Link>`~~ —
   **done.** Purely a component swap (`<a href="/products">` →
   `<Link href="/products">`); no visual, SEO, or content change, since
   `<Link>` renders a real `<a>` tag under the hood — it only changed
   click behavior from a full reload to a client-side transition.
2. ~~Add `exclude` patterns to `client/public/_routes.json`~~ — **done**,
   with one correction to the original recommendation: excluding paths
   from Pages Functions routing turned out to be necessary but not
   sufficient on its own (verified directly — see below). A
   `client/public/_headers` file was also needed, since Cloudflare
   Pages doesn't apply a long-lived `Cache-Control` by default even to
   natively-served static assets.
3. **Delete `fufu-product.jpg` and `banku-product.jpg`** (or wire them
   into an actual second-image use, if one is wanted) — removes 739 kB
   of dead deploy weight with zero visitor-facing effect either way,
   since nothing currently references them.
4. **Introduce route-based code splitting** (`React.lazy` + `Suspense`
   per route in `App.tsx`) — the largest remaining bundle-size lever,
   but the most involved change of this list: needs a loading-state
   decision and testing across all 6+ routes, not a one-line fix.
5. **Generate WebP versions of the 5 actually-used product images**
   (with JPEG `<picture>` fallback) and consider a `srcset` for the
   grid-card size vs. the product-detail hero size — meaningful byte
   savings, moderate effort, no risk to existing `alt`/`loading`
   attributes already in place.
6. **Migrate `Contact.tsx` to `react-hook-form`** (already a project
   dependency) — removes the whole-form re-render on every keystroke.
   Lowest priority: real but minor impact, and the highest-risk change
   on this list since it touches the RFQ submission form directly —
   should get its own careful pass with the existing 11
   `export-quote.test.ts` tests re-verified, not bundled into a general
   performance pass.

## Estimated impact

| Fix | Estimated impact | Confidence |
| --- | --- | --- |
| #1 — `<Link>` instead of `<a>` | **Implemented and measured on production**: 641ms full-reload → 1ms client-side transition for the same nav click. Eliminated on the majority of a visitor's navigation clicks. | Confirmed — measured before and after, not modeled |
| #2 — restore static-asset caching | **Implemented and measured on production**: `/assets/*` and `/robots.txt`/`/sitemap.xml` now `max-age=31536000, immutable` / `max-age=3600` (was `max-age=0` everywhere); `/images/*` now `max-age=604800`. HTML pages deliberately unchanged (still `max-age=0`, so deploys are picked up immediately). | Confirmed — measured before and after via `curl` |
| #3 — remove 2 dead images | 739 kB smaller deploy; no visitor-facing load-time change (files are already unfetched) | Certain — deploy-size only, not a runtime win |
| #4 — route-based code splitting | Meaningfully smaller first download for single-page visitors (a large share of B2B traffic that arrives via a specific product/export link); no effect on already-loaded-bundle navigation once #1 is fixed | Medium — real but harder to quantify without a live before/after |
| #5 — image format/responsive sizing | Likely 30–50%+ smaller image payloads based on typical WebP-vs-JPEG savings at similar quality; exact figure needs the actual re-encoded files to measure | Medium — directionally well-established, not measured on these specific files |
| #6 — `Contact.tsx` re-render fix | Smoother typing in a 15-field form; negligible effect on page-load or navigation metrics | Low priority, but high confidence the finding itself is accurate |

---

## What this audit — and the Phase 1 implementation below — did not do

- **Fixes #3–6 remain unimplemented.** Only #1 and #2 were approved and
  shipped in Performance Optimization Phase 1 (see below); every other
  finding in this document is still exactly what it was at audit time
  — a documented, prioritized recommendation, not a change.
- **No functionality was removed** — fix #3 (still unimplemented) would
  remove two files that are already unreachable by any user-facing
  path, not a feature; nothing was actually deleted in Phase 1.
- **No SEO or business logic was touched.** Fix #1 preserved every
  link's destination, label, and visible behavior — confirmed by
  post-deployment verification below, not just intended. Fix #2 only
  ever affects `/assets/*`, `/images/*`, `/robots.txt`, and
  `/sitemap.xml` — paths `functions/_middleware.ts`'s canonical/robots
  injection logic never applied to in the first place; HTML page routes
  were re-verified live to confirm their behavior is byte-for-byte
  unchanged.

## A note on testing-tool noise

While measuring navigation timing, the browser-automation tool used for
this audit intermittently showed `ERR_ABORTED` and occasional 404s on
JS/CSS/image requests that don't reproduce via direct `curl` requests
(10/10 clean `200 OK` responses on the same URLs, tested immediately
after). This was investigated specifically so it wouldn't be reported
as a false finding — it appears to be an artifact of the automation
tool's own network layer under rapid/parallel requests, not a
production defect, and is excluded from the root causes above
accordingly.

---

## Performance Optimization Phase 1 — implementation & verification (9 August 2026)

Status: **Implemented, validated, deployed to production, and
re-verified live.** Implements fixes #1 and #2 from this audit only —
fixes #3–6 remain unimplemented, per explicit scope.

### What shipped

**Fix 1 — client-side navigation.** `client/src/components/Navigation.tsx`
(logo + 7 desktop nav links + 7 mobile nav links), `client/src/components/Footer.tsx`
(6 internal Quick Links), and `client/src/pages/About.tsx` (the "Contact
Us" button) were converted from plain `<a href>` to wouter's `<Link>` —
the same component already used correctly everywhere else in the app.
External links (Footer's LinkedIn and website icons, all `mailto:`/
`tel:`/WhatsApp links in `Contact.tsx`) were left as plain `<a>`,
exactly as they should be. No URL, label, or visible behavior changed.

**Fix 2 — restored static-asset caching.** `client/public/_routes.json`
now excludes `/assets/*`, `/images/*`, `/robots.txt`, and `/sitemap.xml`
from Cloudflare Pages Functions routing. **This alone turned out not to
be sufficient** — verified directly on the first preview deployment,
these paths still returned `max-age=0, must-revalidate` after the
routing change alone. Cloudflare Pages does not apply a long-lived
`Cache-Control` by default, even to natively-served static assets; that
requires its actual supported mechanism, a `client/public/_headers`
file, which was added in a follow-up commit on the same branch. This
correction is recorded here because it's a genuinely useful fact for
next time: **excluding a path from Functions routing changes who
serves it, not what headers it gets.**

`functions/_middleware.ts` itself — the canonical/robots injection
logic — was **not modified**. HTML page routes still go through it
unchanged, which is exactly what the verification below confirms.

### Validation performed before deployment

- `tsc --noEmit` — clean
- `npx vitest run` — 51/51 tests passing
- `vite build` — succeeded, output unchanged in structure (478 kB JS,
  123 kB CSS, same as pre-fix; `_headers` correctly copied to
  `dist/public/`)
- All 4 build guards (`verify-product-catalog`,
  `verify-single-source-of-truth`, `verify-no-internal-leak`,
  `verify-site-verification-tags`) — all passing
- Asset cache-header verification — done on the Cloudflare preview
  deployment via `curl` before merging (caught the `_headers`-file gap
  described above)
- Route verification (canonical tags, 404 behavior, `/api/*` sanity) —
  done on the same preview deployment before merging
- Navigation-timing comparison — done on the preview deployment via the
  browser's own Navigation Timing API

### Verification performed after deployment (production, `www.borgafoods.com`)

| Check | Result |
| --- | --- |
| `/assets/*` (JS, CSS) | `Cache-Control: public, max-age=31536000, immutable` (was `max-age=0, must-revalidate`) |
| `/images/*` | `Cache-Control: public, max-age=604800` (was `max-age=0, must-revalidate`) |
| `/robots.txt`, `/sitemap.xml` | `Cache-Control: public, max-age=3600`; content byte-identical to before |
| HTML pages (e.g. `/about`) | `Cache-Control: public, max-age=0, must-revalidate` — **unchanged**, confirmed still routed through `functions/_middleware.ts` |
| Canonical tag, `/about` and `/export` | Present and correct: `<link rel="canonical" href="https://www.borgafoods.com/...">` |
| Unknown URL (`/this-page-does-not-exist-xyz`) | `HTTP 404` + `<meta name="robots" content="noindex, nofollow">` — unchanged |
| `/api/export-quote` | Responds with the same validation behavior as before (`invalid_origin`, 403, for an unauthenticated `curl` request) — Function routing for `/api/*` is untouched |
| `/about` → `/contact` | Confirmed client-side: same document (`performance.timeOrigin` unchanged), correct new page title, zero new navigation entries |
| `/contact` → `/products` | Same confirmation |
| `/products` → `/export` | Same confirmation, including the client-side-updated canonical tag reading correctly as `https://www.borgafoods.com/export` |
| Hard refresh on `/export` | Loads correctly via a real page load, correct title and content — direct/bookmarked navigation still works exactly as before |
| Navigation-timing, before vs. after | **641ms** (full reload, measured pre-fix) → **1ms** (client-side transition, measured post-fix) for the same nav-link click |

One verification note: clicking nav links through the remote browser
automation tool's coordinate/ref-based click intermittently failed to
register during this session (unrelated to the site — confirmed by
inspecting the DOM, which showed the correct element at the correct
position every time). Route-transition checks were instead performed
by dispatching a real `MouseEvent` directly at the link element via
JavaScript, which is what a genuine click produces from the page's
perspective — the same method used to get the clean 1ms timing figure
above.

### Commits

- `7536461`/`3132375` — prior phase (GEPA trust update), unrelated,
  merged earlier the same day.
- `cc07b46` — Fix 1 (nav/footer/About `<Link>` swap) and Fix 2's
  routing exclude.
- `08a687a` — the `_headers` file correction to Fix 2.
- `c91a146` — merge to `main`.

## Related documents

- `functions/_middleware.ts` — the routing logic root cause #2 was about; confirmed unmodified.
- `client/public/_routes.json`, `client/public/_headers` — the two config files Fix 2 actually changed.
- `client/src/components/Navigation.tsx`, `client/src/components/Footer.tsx`, `client/src/pages/About.tsx` — the 3 files Fix 1 changed.
- `shared/productIntelligence/publishedRegistry.ts` — where the 2 unused image references live (fix #3, still unimplemented).
- `docs/SEO_FOUNDATION.md` — the prior Core Web Vitals work (image re-encoding, font loading) this audit builds on and didn't need to repeat.
- `docs/CHANGE_LOG.md`, 8 August 2026 — the original reasoning for routing all requests through `functions/_middleware.ts`, which Fix 2 preserves for HTML routes while scoping it away from static assets.
