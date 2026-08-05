# BorgaFoods AI Task Protocol

Last updated: 6 August 2026

## Purpose

These instructions apply to every AI agent working on the BorgaFoods website repository. They are intended to preserve business accuracy, architecture, scope, and deployment safety across future sessions.

## 1. Review documentation before coding

Before planning or modifying code, read these files completely:

1. `docs/BORGAFOODS_CONTEXT.md`
2. `docs/BUSINESS_RULES.md`
3. `docs/WEBSITE_ROADMAP.md`
4. `docs/CHANGE_LOG.md`
5. `docs/AI_TASK_PROTOCOL.md`

Then inspect the current repository state, relevant source files, recent commits, and any repository-level agent instructions.

Do not rely on old conversation memory when repository documentation or current code provides newer evidence.

## 2. Preserve the existing architecture

- Extend the existing React, TypeScript, Vite, Wouter, and Tailwind codebase.
- Reuse existing components, routes, design tokens, and layout patterns.
- Keep product content in the central catalog.
- Do not duplicate product records across pages.
- Do not introduce a CMS, database, framework migration, or server architecture without approval.
- Do not change Cloudflare settings, environment variables, domains, or deployment configuration unless the task explicitly authorizes it.

## 3. Do not rebuild unnecessarily

- Do not create a standalone replacement website.
- Do not redesign pages when the requested capability can be added to the current design.
- Do not add routes, dependencies, services, or abstractions unrelated to the approved task.
- Prefer the smallest coherent change that satisfies the approved requirement.
- Preserve unrelated user changes and keep commits focused.

## 4. Enforce business rules

- Treat `docs/BUSINESS_RULES.md` as authoritative.
- Require an explicit supply type for every product.
- Never default a product to manufactured.
- Never expose partner supplier identity in browser-delivered content or metadata.
- Do not invent claims, certifications, specifications, pricing, MOQs, lead times, or partnerships.
- Flag missing business decisions instead of silently guessing when the choice would change public meaning.

## 5. Verify before committing

At minimum, run:

```text
pnpm check
pnpm build
```

Also run task-appropriate checks for:

- product-data integrity;
- unique slugs and valid image paths;
- route behavior;
- form success and failure handling;
- accessibility;
- SEO output;
- deployment configuration.

Review `git diff --check`, the changed-file list, and the final staged diff. Confirm that no unrelated files, credentials, generated output, or environment files are included.

## 6. Commit discipline

- Commit only after the requested work and required checks pass.
- Use a concise commit message describing the completed change.
- Do not push or deploy unless the user explicitly authorizes it.
- After an approved deployment, verify that Cloudflare builds the intended commit and smoke-test production.
- Record completed implementation commits in `docs/CHANGE_LOG.md`.

## 7. Provide implementation reports

Every completed task report must state:

- outcome;
- files changed;
- architecture or data-model changes;
- tests and build results;
- commit hash, when committed;
- deployment status, when relevant;
- assumptions, unresolved decisions, risks, and required approvals.

Do not describe a push, deployment, email delivery, form submission, or external integration as successful unless it was directly verified.

## 8. Scope and safety

- Respect the user's stated scope and phase boundaries.
- Separate unrelated issues into follow-up tasks.
- Do not mix the known apex-domain configuration issue or `_redirects` warning into feature work unless explicitly requested.
- Do not place secrets in the repository or expose server secrets with the `VITE_` prefix.
- Never include supplier-confidential data in public source code.
- Stop and request direction when completion requires new authority, credentials, external coordination, or a material business decision.
