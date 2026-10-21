# GrowMeal live production acceptance audit — 2026-10-21

**Target:** https://growmeal-platform.vercel.app (Vercel production deployment `dpl_BceyhxiQjzwFsX1z6fi8qu5takv7`, commit `cde174dd9f591bfd69a300e92784d3a5fe5a6018`).

## Live checks completed
- HTTP 200 and GrowMeal content for `/play-discover`; production deployment READY.
- **75/75** class–garden routes selected and displayed on the public production domain in Chromium at 320 × 780. For Build/Investigate/Innovate, correct dedicated section was present; Discover/Solve had visible controls. No document-level horizontal overflow.
- **30/30** Investigate/Innovate interaction checks on live production: empty-form feedback in Investigate; Innovate choice, reasoning, feedback, reset.
- `/account` HTTP 200; `/teacher` and `/hq` HTTP 403 without authentication (consistent with explicitly closed staff routes, not proof of authorized access).
- `/api/sync` GET HTTP 405 (method restriction), `/api/quiz-bank` and `/api/challenge-bank` GET HTTP 200.

## Critical blocker — authentication
- `/dashboard` and `/learner` returned HTTP **500**, reproduced with browser and curl. Vercel error aggregation identified `Invalid supabaseUrl: Must be a valid HTTP or HTTPS URL.` in `/middleware` on this production deployment. Correct production Supabase URL configuration through Vercel secret management, redeploy if required, then retest anonymous and authorized user sessions. Do not expose credentials in logs.
- Staff routes are intentionally closed by `middleware.ts` until fine-grained school/role authorization is implemented. Do not treat 403 as a passing authorized-role test.

## Data authenticity
- Investigate explicitly states observation logs are **in-memory and not saved** to learner accounts; no fabricated observations are inserted by that component.
- Authenticated learner dashboard queries `growmeal_progress`, `growmeal_badge_awards`, `growmeal_assessment_results`, and `growmeal_challenge_submissions` scoped to `user.id`; live authenticated behavior cannot be validated while middleware returns 500.
- `/marketplace-dev` is publicly reachable (HTTP 200). Its local demonstration requests use `DEMO_REQUEST_ONLY` and browser localStorage; verify they are unmistakably labeled as demo and never counted as fulfilled orders.
- `/hq` includes static figures such as 50 gardens, 5 levels and 6 languages. They are static programme claims, not verified live learner metrics; editorial review is needed before treating them as production totals.

## Not yet accepted
- Actual Discover/Solve question-answer correctness, scoring and reset across all 30 class–garden combinations; earlier 13 SSS tests were source-level regression tests, not live full-flow tests.
- Complete 15-class live Build sequence/visual-review interactions (earlier preview tests passed).
- Authenticated learner/teacher/school-admin sign-in, role isolation, RLS, persistence and unauthorized cross-user access tests.
- Screen-reader, keyboard-only and tablet/desktop accessibility matrix, and educator scientific validation.

**Disposition: FAIL / HOLD for full learning-platform acceptance.** Public flagship browsing and 30 sampled interaction checks pass, but the production authentication defect blocks acceptance. This audit is read-only; no production configuration or data was modified.
