# Milestone 5 — verification and device acceptance gate

## Agronomy verification
The 30-crop verification matrix is a **gap audit**, not a claim that all 30 guides are validated. Publication of planting recommendations requires a crop/variety-specific source, locally appropriate agronomic conditions, reviewer, date, source URL and version.

Source hierarchy: NIHORT crop-specific manuals; NAERLS extension materials; Nigerian state ADPs; FAO/CGIAR agronomic references; peer-reviewed crop trials. Treat a source index as evidence that a manual exists, not proof of numeric recommendations.

Required fields per crop: botanical identity; verified aliases/languages; propagation and planting material; depth and spacing; soil/drainage; sunlight; irrigation and dry-season considerations; integrated pest management; food safety; harvest stage and timing; sources; reviewer; local applicability.

**Confirmed correction:** NIHORT amaranth guide: first harvest 35–45 days after sowing/planting, variety and harvest method dependent. Avoid unverified 28-day default.

## Planting calendar
NiMet 2026 SCP: https://nimet.gov.ng/scp
NiMet state/LGA seasonal prediction interface: https://nimet.gov.ng/srp
NiMet 2026 announcement: https://nimet.gov.ng/news?id=194

Do not hardcode LGA sowing dates from state summaries or a broad agroecological-zone label. NiMet's 2026 guidance includes potential dry spells and variability. Ingest exact LGA onset/cessation values only when provenance, publication date and uncertainty are recorded. Add crop-specific phenology, soil moisture, water availability and variety constraints. Rainfall onset is not a guarantee of successful germination.

## Mobile/browser acceptance plan
**Not yet executed on deployed repository files.** Run from a separate checkout with Node.js and Python installed.

1. `node grow-your-food/tests/validate.mjs`
2. `node --test grow-your-food/tests/workflows.test.mjs grow-your-food/tests/zones.test.mjs`
3. `python -m http.server 8765`
4. Browse `http://localhost:8765/grow-your-food/components/mobile.html`
5. Validate at 320, 375, 390, 768, 1024px; Android Chrome and desktop Chromium.
6. Test navigation Home → Grow → Calendar → Journal → Harvest, including deep-link tabs.
7. Create crop, add observation, log measured harvest, reload, verify persistence, export JSON, clear and verify deletion.
8. Test invalid dates, missing garden, zero/negative harvest, XSS strings in notes, offline reload, keyboard navigation and screen reader labels.
9. Confirm no calls to production endpoints, no user accounts modified, no database migration, no automatic planting recommendations.
10. Record screenshots, console errors, test pass/fail and environment details.

## Release gate
Do not integrate into production until all 30 crop profiles are reviewed for identity and local aliases, first-launch crop guides have locally verified agronomic instructions, region-specific calendar data is evidence-backed, automated and browser acceptance pass, and Claude's integration workstream approves route and data ownership.
