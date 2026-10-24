# Growing Journey standalone prototype — milestone 3

## Start the preview

In a **separate checkout** of `feature/grow-your-food` (do not switch Claude's active checkout), run from the repository root:

```powershell
python -m http.server 8765
```

Open: http://localhost:8765/grow-your-food/components/journey.html

The earlier catalog preview is at: http://localhost:8765/grow-your-food/components/preview.html

## Test commands

```powershell
node grow-your-food/tests/validate.mjs
node --test grow-your-food/tests/workflows.test.mjs
```

These commands are provided but have not yet been executed in a local Node environment by this workstream. Do not claim tests passed until they are run.

## Implemented in isolation
- Six provisional crop-specific task schedules and symptom checklists.
- Calendar calculations based on planting dates; indicative harvest window only for vegetable amaranth.
- Garden creation, dated journal entries, measured harvest records, and unit-preserving harvest totals.
- Browser-local persistence and JSON export; no network account storage.
- Browser-local clear-all control; no server or production database mutation.
- Basic validation tests for dates, unit handling, journal order and harvest quantities.

## Limitations
- Not yet a Next.js-integrated page; standalone HTML/CSS/ES modules served over HTTP.
- No login, multi-device synchronization, reminders, live agronomic recommendations, image uploads, community features or marketplace integration.
- Prototype stores non-sensitive growing records in browser localStorage. Users on shared devices should clear records. Do not enter child names, precise addresses or other sensitive data.
- Guidance is provisional. No planting date or crop suitability recommendation is made without local seasonal, soil, water and crop-variety validation.
- Calendar dates are care checkpoints, not verified physiological event predictions.
- No claims of live browser testing, production readiness or scientific field validation.

## Branch safety
All changes remain in `grow-your-food/`. Coordinate before merging or deploying.
