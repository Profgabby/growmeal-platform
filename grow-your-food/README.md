# GrowMeal — Grow Your Food

> Whatever your age, wherever you live, and however much space you have, GrowMeal helps you start growing food.

**Status:** Isolated foundation; no production routes, shared database migrations, or existing app files modified.

## Programme principles
- Nigeria-first, extensible across West Africa; local crops, foods, languages and agroecological zones.
- Three independent dimensions: **who** (participant pathways), **what** (crop category/species), and **how far** (growing phases and goals).
- Gender and age never restrict access to crops, training, or entrepreneurship. Multiple pathways may be selected.
- No purchase required: locally available materials and free guidance remain supported.
- Children participate through adult- or school-managed accounts; no public child profiles by default.
- No guaranteed harvest dates; show germination, first edible harvest, mature harvest and productive lifespan separately, with evidence and local-season caveats.
- No automatic recommendation without checking location, sunlight, space, water access and season.
- Local names are searchable aliases, not unique taxonomic identifiers; resolve ambiguity before publishing.

## Isolated module layout
- `crop-catalog/nigeria/`: initial crop records
- `crop-catalog/west-africa/`: regional extension policy
- `growing-guides/`: template and first crop guidance
- `growing-phases/`: five phases
- `audience-pathways/`: inclusive pathways
- `planting-calendars/`: climate-aware scheduling rules
- `garden-journals/`: planting and observation event model
- `harvest-tracking/`: measurable harvest events
- `components/`: integration-neutral UI contracts
- `schemas/`: data shape definitions
- `tests/`: isolated static integrity checks

## Integration boundaries
1. No changes to `app/`, `components/`, `lib/`, `supabase/`, or existing shared files in this branch without coordinated integration.
2. No production database changes, deployment, or merge to main.
3. All new content remains under `grow-your-food/`.
4. Validate crop records, local names, planting methods, and agroecological fit before publishing as actionable recommendations.
5. Separate **draft** content from **reviewed** content; never present unverified harvest durations as guaranteed.
6. Preserve existing GrowMeal school curricula and dashboard permissions.

## Release plan
1. Start Growing: catalog, onboarding, garden journal.
2. Guided Growing: seasonal calendars, troubleshooting, harvest records.
3. Families and Communities: supervised child participation, schools, shared groups, translations.
4. Continuous Production: succession planting, inputs, output and optional enterprise tools.
