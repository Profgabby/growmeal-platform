# GrowMeal retrospective visual audit — baseline

**Scope:** All 15 first-garden packs and the first two second-garden packs on `feature/growmeal-unified-preview`.
**Method:** Source inspection of the 17 imported pack components in `app/play-discover/page.tsx`. This is a **static audit**, not a rendered-image review or a browser acceptance test.
**Status:** OPEN — not approved for production.

## Confirmed findings

| ID | Pack | Source-level finding | Severity | Required action |
|---|---|---|---|---|
| VIS-001 | Nursery 1 Garden 2 (GM-N04) | The same `🍃 🌿 🍀` illustration is rendered for all six questions. This is the same class of defect reported for Nursery 2. | High | Replace with six question-specific, uniquely identified visuals and validate the depicted quantities and shapes. |
| VIS-002 | Nursery 2 Garden 2 (GM-N05) | Previous repeated illustration has been replaced with eight unique inline SVG diagrams and IDs. | Verification pending | Browser-render all eight questions and inspect semantic correspondence, accessibility, shape and scientific accuracy. |
| VIS-003 | Nursery 1 Garden 1 (GM-N01) | Crop emoji recur across letter-based activities, and some different crop names use the same emoji (e.g., watermelon/xigua); there is no globally unique image registry. | High | Provide unique per-activity visual assets and disambiguate crop identity. |
| VIS-004 | Nursery 2 Garden 1 (GM-N02) | Counting scenes are generated using recurring crop emoji and a reusable `picture(icon,count)` renderer. Reused visual tokens cannot be accepted as unique per-question imagery. | High | Establish unique scene IDs and verify depicted counts and question correspondence for every counting activity. |
| VIS-005 | Nursery 3 Garden 1 (GM-N03) | Generic shape SVG renderer and story emoji are reused across activities. | High | Use unique question-level scenes, while preserving mathematically accurate shape definitions. |
| VIS-006 | Primary 1–6 Garden 1 | Six source components use recurring unit/activity icons and largely text-led exercises; no question-level unique visual asset registry was identified in the inspected source. | Review required | Inventory questions that require visuals, create unique visuals for those questions, and explicitly designate legitimately text-only questions. |
| VIS-007 | JSS 1–3 Garden 1 | Three source components use module icons and mostly text/data-led activities; no question-level visual asset registry was identified. | Review required | Distinguish valid text/calculation questions from those needing bespoke diagrams; check each question and its answer. |
| VIS-008 | SSS 1–3 Garden 1 | Three source components use module icons and calculation/data activities; no question-level visual asset registry was identified. | Review required | Preserve valid text-only statistical questions; add unique diagrams wherever the prompt requires a visual. |

## Interpretation and boundaries

- **No repeated instructional image** means a visual scene/file/composition is not reused between distinct questions or gardens. Shared interface icons (navigation buttons, progress indicators) are not instructional images.
- A question may be **text-only** when a picture would add no instructional value. Do not add unrelated illustrations merely to fill space.
- Inline emoji are not reliable substitutes for precise botanical or scientific diagrams, and do not automatically meet uniqueness requirements.
- Static source review does **not** establish whether all existing question/answer pairs are scientifically correct or whether the pages render correctly.
- The corrected Nursery 2 pack still requires browser acceptance. **No first-garden pack is certified against the new visual standard by this audit.**

## Acceptance gates before any garden is marked complete

1. Assign every activity a stable question ID and either a unique visual asset ID or an explicit text-only designation.
2. Run automated checks for duplicate visual IDs and reused image hashes across the garden registry.
3. Verify each rendered visual against the question: exact counts, labels, colours, objects, spatial relations and correct answers.
4. Check mobile responsiveness, contrast, alt text, keyboard interaction and teacher answer keys.
5. Run typecheck/build and browser tests on the preview branch. Record evidence and resolve failures.
6. Keep production unchanged until explicit approval.

## Remediation order

**P0:** Nursery 1 GM-N04 repeated visual; Nursery 1 GM-N01 ambiguous crop emoji; Nursery 2 GM-N02 and Nursery 3 GM-N03 reused instructional representations.
**P1:** All Primary first-garden packs.
**P2:** All JSS and SSS first-garden packs; for these, classify legitimate text-only exercises rather than forcing decorative imagery.
**P3:** Verify Nursery 2 GM-N05 corrected SVGs in browser, then rerun the complete audit.

**Audit count:** 17 components in scope; 0 visually accepted; 1 source-corrected but awaiting rendered verification; remaining 16 require remediation or question-level verification. This count is an audit status, not a count of proven defects.
