# GrowMeal M1–M2 Acceptance Report — 2026-10-15

**Decision: NOT SIGNED OFF.** Isolated development only. No production release, payments or LIFEWSWORKS dispatch.

## Executed checks
- PASS: six core customer/order tables have RLS enabled (queried development Supabase).
- PASS: anonymous EXECUTE privilege on draft submission RPC is denied.
- PASS: authenticated EXECUTE privilege on draft submission RPC is present.
- PASS: anonymous and authenticated direct INSERT privileges on orders are denied.
- PASS: authenticated SELECT privilege on orders is present (RLS still controls rows).
- PASS: database migration revoking direct transactional writes succeeded.
- Previously verified: Vercel development deployment of commit 4033951 was READY. **This does not verify the newer test commit.**

## Automated tests added
`tests/browser/growmeal-m1-m2.spec.ts`: guest draft protection; profile persistence; cross-account organization isolation; cross-account draft isolation and persistence. Authenticated tests require two dedicated synthetic users and credentials supplied privately to the test runner.

## Still unverified / blockers
- Authenticated browser scenarios have **not** been executed. No synthetic test credentials were available in this execution environment.
- Test selectors and signed-in flows have not been confirmed against a running browser.
- Organization authorization rejection and role-specific school scenarios require expanded integration tests.
- Browser tests currently create persistent synthetic records; run only against isolated development and implement cleanup before routine CI use.
- No signed-off end-to-end M1–M2 acceptance evidence exists yet.
- Existing marketplace unit tests contain historical localStorage-only assumptions and need revision for the new persistent draft workflow.
- No product catalog publishing, payment activation or external service dispatch is authorized.

## Exit criteria
Run browser suite with synthetic A/B accounts, capture CI logs and screenshots, fix failures, verify order audit events, verify RLS isolation under real JWTs, re-run security advisors, then sign off. Until then M1–M2 remains **IN PROGRESS**.
