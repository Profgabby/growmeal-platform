# LIFEWS GrowMeal™ Platform

Dedicated application repository for the LIFEWS AgriShine™ GrowMeal™ school-garden learning platform.

## Repository boundary

This repository is **GrowMeal only**. It is intentionally separate from any existing AgriShine, LIFEWS Pathways, GreenTech, LingoGreen, ZARIKS, or other repositories. Do not merge unrelated applications into this codebase.

## Current product scope

- 5 school levels
- 50 GrowMeal gardens with approved garden imagery
- 500 AQ assessment records
- 500 Food Smart Challenge records
- garden-linked learning resources and individual content routes
- teacher, learner, school, HQ, reviewer and training screens
- class/enrollment/teacher-assignment workflows
- passport evidence verification and badges
- six-language application architecture: English, French, Arabic, Hausa, Yoruba and Igbo
- Arabic RTL support
- Supabase authentication/RLS integration
- offline queue scaffold
- searchable digital resource library

## Backend

The application currently connects to the existing Supabase project used for GrowMeal data:

- Project ref: `pgchuvzrdizipyvesqaw`
- Browser variables: see `.env.example`

The GitHub repository is separate from any pre-existing AgriShine GitHub repository. The Supabase project reference does not imply repository sharing.

## Local development

```bash
npm install
npm run dev
```

Create `.env.local` from `.env.example` and provide only the public Supabase URL and publishable key. Never commit service-role keys, passwords, or `.env.local`.

## Deployment

Production target: Vercel connected directly to this dedicated repository. See `docs/DEPLOYMENT.md`.

## Data and migrations

The live database already contains the operational GrowMeal schema. The migration registry is documented in `supabase/migrations/README.md`. Do not replay legacy/abridged SQL against production without review.

## QA baseline

Pass 8 verified:

- 50/50 gardens represented
- 500 AQ records and 500 FSC records in Supabase
- full resource-route manifest generated
- garden imagery complete across Nursery, Primary, JSS and SSS
- responsive layout rules present for desktop/tablet/mobile

See `PASS8_END_TO_END_QA.md` and `qa/route-manifest.txt`.
