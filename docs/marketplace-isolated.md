# GrowMeal isolated marketplace prototype
Branch: feat/growmeal-marketplace-isolated. No database migrations or production changes.
Route: /marketplace-dev. Local-browser synthetic state only. No prices or payments are represented as real. No LIFEWSWORKS API calls.
Catalog: 32 curated education models referencing original IDs (original 50 retained) and 22 non-school models. The selected 32 are **provisional** and require product-owner approval before a live catalog migration.
Packages: Starter, Plus, Complete are descriptive templates; BOMs, quantities, prices, tax, shipping, installation rates and eligibility must be validated before checkout.
Customer form is NOT authentication; actual customer account provisioning and orders require an isolated Supabase development project, RLS, and server-side idempotent payment webhooks.
Acceptance checklist:
- Exactly 54 unique models, split 32/22.
- Search and category filtering.
- Tier selection and cart quantity update.
- Request validation and local synthetic request persistence.
- No live order, payment, or artisan job created.
- Legacy routes and data untouched.
Next: create isolated database with tenant-scoped identities and commerce tables, add Playwright tests, confirm Vercel preview and then implement secure backend.
