# Deployment Runbook

## GitHub

Use one dedicated repository only:

`Profgabby/growmeal-platform`

Do not deploy this application from the pre-existing AgriShine repository or from `lifews-pathways-app`.

## Vercel

Create or connect a Vercel project whose Git source is the GrowMeal repository.

Required environment variables:

- `NEXT_PUBLIC_SUPABASE_URL=https://pgchuvzrdizipyvesqaw.supabase.co`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=<Supabase publishable key>`

Never place a Supabase service-role key in a `NEXT_PUBLIC_*` variable.

## Production checks

Before promoting a deployment:

1. load all 50 gardens;
2. open at least one resource category and one individual item from each level;
3. execute an AQ learner submission and teacher score;
4. submit and review one FSC challenge;
5. verify one passport entry and badge award;
6. confirm resource preview/download links;
7. test English and Arabic direction switching;
8. test phone, tablet and desktop widths.
