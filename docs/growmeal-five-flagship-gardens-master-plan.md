# LIFEWS GrowMeal — Five Flagship Gardens Per School Class

**Status:** Approved planning architecture; not a claim that all 75 experiences are built.

## Decision
- Select exactly **five flagship garden experiences per class** across Nursery 1–3, Primary 1–6, JSS 1–3 and SSS 1–3: **75 class–garden experiences**.
- Reuse existing catalogue garden models rather than inventing physical products. Preserve each class's existing first and second gardens.
- The five distinct interaction modes, in order, are **Discover**, **Solve**, **Build**, **Investigate** and **Innovate**. They are not five identical quizzes. Age, literacy, safety, objectives and difficulty differ by class.
- Existing modules occupy slots 1 and 2, while slots 3–5 are **planned**, not implemented. The first two modules may need future UX adaptation to better reflect their assigned modes; their current implementation is not retroactively certified for mode fidelity.
- Other catalogue gardens remain available through **Build & Grow**: construction instructions, planting calendars, care and harvest logs, photo journals, maintenance checklists and educator-led projects. They must not automatically generate more multiple-choice question banks.
- **Investigate & Innovate** should use real learner measurements, comparisons, experiment design, simulated decisions and project evidence rather than answer-choice repetition.
- Reuse of a physical garden ID across different classes is allowed; within a class the five garden IDs must be distinct. Images and questions must be newly authored for their context and never reused as filler.
- Electrical, pump, PV, nutrient, and construction activities must be age appropriate, with adult/qualified-technician boundaries and no exposed energized parts.

## Class-by-class selections

| Class | 1 Discover | 2 Solve | 3 Build | 4 Investigate | 5 Innovate |
|---|---|---|---|---|---|
| Nursery 1 | GM-N01 | GM-N04 | GM-N07 | GM-N08 | GM-N03 |
| Nursery 2 | GM-N02 | GM-N05 | GM-N06 | GM-N07 | GM-N08 |
| Nursery 3 | GM-N03 | GM-N06 | GM-N04 | GM-N05 | GM-N01 |
| Primary 1 | GM-P11 | GM-P16 | GM-P12 | GM-P17 | GM-P23 |
| Primary 2 | GM-P12 | GM-P17 | GM-P16 | GM-P26 | GM-P23 |
| Primary 3 | GM-P21 | GM-P23 | GM-P17 | GM-P26 | GM-P29 |
| Primary 4 | GM-P23 | GM-P26 | GM-P21 | GM-P17 | GM-P29 |
| Primary 5 | GM-P26 | GM-P29 | GM-P23 | GM-P21 | GM-P17 |
| Primary 6 | GM-P29 | GM-P16 | GM-P26 | GM-P23 | GM-P17 |
| JSS 1 | GM-J31 | GM-J35 | GM-J37 | GM-J36 | GM-J38 |
| JSS 2 | GM-J33 | GM-J36 | GM-J35 | GM-J37 | GM-J39 |
| JSS 3 | GM-J34 | GM-J37 | GM-J31 | GM-J38 | GM-J39 |
| SSS 1 | GM-S41 | GM-S44 | GM-S47 | GM-S42 | GM-S50 |
| SSS 2 | GM-S42 | GM-S45 | GM-S44 | GM-S47 | GM-S50 |
| SSS 3 | GM-S43 | GM-S46 | GM-S47 | GM-S45 | GM-S50 |

## Acceptance criteria for future experiences
1. A unique educational mechanic and learning objective—not another re-skinned quiz.
2. Age-appropriate scaffolding and authentic garden tasks.
3. Question/image originality checks where applicable, correct scientific and numerical content, and accessible labels.
4. Browser acceptance at mobile, tablet and desktop sizes, with tested navigation, state changes and feedback.
5. Each new experience must be marked **implemented** only after its own tests pass; planning data alone is not a completed learning module.

## Implementation source
`lib/marketplace/flagship-school-gardens.ts` is the canonical proposed five-garden class mapping. It validates catalogue IDs, the existing first/second mappings, five distinct garden IDs and mode order. Do not change production navigation to present planned experiences as live modules until they are implemented.
