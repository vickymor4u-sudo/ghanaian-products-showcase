# BorgaFoods Buyer Package — Folder Structure

Status: **Structure defined. No package assembled, nothing shared
externally.** Maps the requested folder structure to what content
already exists in this repository versus what still needs to be
produced or supplied by BorgaFoods before the package is real and
distributable.

```
BorgaFoods Buyer Package/
├── Company Profile PDF/
├── Product Catalogue/
├── Product Images/
├── Certifications/
├── Export Information/
└── Contact Details/
```

## Folder-by-folder readiness

### Company Profile PDF/

- **Content ready**: `docs/EXPORTER_PROFILE_FINAL.md` — the finalized
  8-section content (Company Overview, About BorgaFoods Processing,
  Product Categories, Export Solutions, Buyer Types Served, Quality
  Assurance Approach, Export Documentation Capability, Contact
  Information), including the confirmed GEPA registration as a
  credential.
- **Not ready**: an actual PDF file. This content exists as a Markdown
  document, not a designed, exportable document. Producing the PDF
  itself is a design/formatting step, not a content step — the words
  are final, the file isn't.

### Product Catalogue/

- **Content ready**: the 5-product manufactured range, with category
  and packaging detail, sourced from
  `shared/productIntelligence/publishedRegistry.ts` — the same table
  already reproduced in `docs/EXPORTER_PROFILE_FINAL.md` §3 and
  `docs/EXPORTER_PROFILE_ONE_PAGER.md`.
- **Not ready**: a standalone catalogue document/PDF distinct from the
  company profile. Currently this content only exists embedded inside
  other documents and on the live `/products` pages, not as its own
  file.

### Product Images/

- **Content ready**: 7 image files exist in `client/public/images/` —
  `fufu-borga.jpg`, `fufu-product.jpg`, `gari-borga.jpg`,
  `cassava-flour.jpg`, `banku-borga.jpg`, `banku-product.jpg`,
  `kokonte-borga.jpg`. These are the same images already live on each
  product's page and on `/products`, so they're already public — using
  them in a buyer package doesn't introduce a new claim or a new
  disclosure.
- **Not ready**: these are web-optimized images (sized and compressed
  for page load speed, per `docs/SEO_FOUNDATION.md`'s Core Web Vitals
  work), not necessarily print-resolution or buyer-presentation-ready
  versions. Whether the existing files are suitable as-is for a
  distributed package, or whether higher-resolution originals exist
  elsewhere, is not something this repository can determine — that's a
  BorgaFoods asset-management question, not a content gap.

### Certifications/

- **Content ready**: none, as actual files. The two verified
  credentials — Ghana FDA facility registration and the GEPA export
  registration (Registration No. GEPA2018800113, confirmed current) —
  exist only as *stated facts* in this project's documentation
  (`docs/EXPORTER_PROFILE_FINAL.md` §6–7,
  `docs/GEPA_CREDIBILITY_SECTION_PROPOSAL.md`), not as certificate
  files in this repository.
- **Not ready, and important**: no certificate document — Ghana FDA or
  GEPA — has ever been supplied to this repository in a form suitable
  for inclusion in a buyer package. The GEPA certificate photo referenced
  throughout this project's documentation was shared in conversation,
  not saved as a file in this codebase. **This folder should not be
  populated with any supplier's certificate** — the two Ghana Tree Crops
  Development Authority documents reviewed in External Authority
  Phase 2 belong to third-party partners, not BorgaFoods, and
  `docs/EXPORT_EVIDENCE_MATRIX.md` explicitly excludes them from any
  buyer-facing use. If BorgaFoods wants actual certificate files in this
  folder, they need to be supplied directly — this repository does not
  have them to place there.

### Export Information/

- **Content ready**: `docs/EXPORTER_PROFILE_FINAL.md` §4 (Export
  Solutions) and §7 (Export Documentation Capability), plus the
  process description already live on `/export`
  (`client/src/pages/ExportCompliance.tsx`) — documentation, packaging,
  destination requirements, and shipment coordination, all reviewed per
  enquiry.
- **Not ready**: any specific MOQ, shipping mode, lead-time range, or
  named export document type — all five remain open items in
  `docs/COMMERCIAL_INFO_DECISION_RECORD.md`. This folder should not
  state any of these as fact until that record has real decisions in
  it; the existing "reviewed per enquiry" language is what belongs here
  today.

### Contact Details/

- **Content ready, fully**: export@borgafoods.com (confirmed
  operational), +233 555 362 208 (Ghana), +86 135 1681 8572
  (China/WhatsApp), borgafoods.com, borgafoods.com/wholesale — all
  already public and already sourced consistently in
  `docs/COMPANY_PROFILE_DRAFT.md`'s field table.
- **Not ready**: nothing — this is the one folder with no gap. A named
  individual contact (rather than the general export inbox) isn't
  available in this codebase, matching the same gap noted in
  `docs/BUYER_OUTREACH_TEMPLATES.md`'s sender-name placeholder, but the
  channel itself is fully ready.

## Summary

| Folder | Content ready | File ready | Blocking gap |
| --- | --- | --- | --- |
| Company Profile PDF | ✅ | ❌ | Design/formatting into an actual PDF |
| Product Catalogue | ✅ | ❌ | Needs its own standalone document, currently only embedded elsewhere |
| Product Images | ✅ | ⚠️ | Web-sized images exist; print/presentation-resolution originals unconfirmed |
| Certifications | ❌ | ❌ | No certificate files exist in this repository at all — must come from BorgaFoods directly, and must never include the two third-party partner documents |
| Export Information | ✅ | ❌ | Same design/formatting step as the profile PDF |
| Contact Details | ✅ | ✅ | None |

**This package has not been assembled or shared with anyone.** Every
gap above is either a design/production task (turning existing,
approved content into an actual file) or a genuine missing input only
BorgaFoods can supply (certificate files, higher-resolution images, a
named contact person) — none is a content or claims gap this repository
can resolve on its own.

## Related documents

- `docs/EXPORTER_PROFILE_FINAL.md` — the Company Profile PDF's source content.
- `docs/EXPORT_EVIDENCE_MATRIX.md` — why the Certifications folder must never include the two third-party TCDA documents.
- `docs/GEPA_CREDIBILITY_SECTION_PROPOSAL.md` — the GEPA fact this package can state, and its precise limits.
- `docs/COMMERCIAL_INFO_DECISION_RECORD.md` — why the Export Information folder can't yet state MOQ, shipping mode, or lead time.
- `docs/COMPANY_PROFILE_DRAFT.md` — the source for the Contact Details folder.
