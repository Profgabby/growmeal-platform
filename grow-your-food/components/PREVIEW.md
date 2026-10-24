# Run the standalone Grow Your Food preview

This preview is intentionally not wired into the production GrowMeal routes, authentication, database, or marketplace.

## Local instructions
From the root of the `growmeal-platform` repository:

```bash
python -m http.server 8765
```

Open `http://localhost:8765/grow-your-food/components/preview.html`.

To run the isolated content integrity checks (Node.js 20+):

```bash
node grow-your-food/tests/validate.mjs
```

## What the preview does
- Displays the Nigeria-first programme message.
- Filters and searches 30 draft crop profiles by category, common name, botanical name and provisional local names.
- Shows five growing phases.
- Collects participant category, space, goal, region, sunlight and water access.
- Returns an exploratory shortlist based **only on matching space options**, clearly stating that this is not a planting recommendation.

## Not yet implemented
- Verified region- and season-specific crop recommendations.
- Complete crop-by-crop daily growing guides.
- Persistent journals, account integration, crop photos, harvest tracking UI, reminders, translations or payments.
- Automated browser testing and production deployment.

## Integration safety
Do not merge or deploy until the current GrowMeal workstream coordinates routing, design, authentication and database ownership. No child profile or household exact-location data is collected or stored by this preview.
