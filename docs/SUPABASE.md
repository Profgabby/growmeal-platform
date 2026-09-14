# Supabase Integration

## Live project

Project ref: `pgchuvzrdizipyvesqaw`

Current GrowMeal tables include levels, gardens, profiles, schools, memberships, resources, quizzes, challenges, progress, assessment results, passport entries, classes, enrollments, teacher assignments, challenge submissions, badge definitions, badge awards, quiz submissions, invitations and translations.

RLS is enabled on the GrowMeal operational tables.

## Current seeded content

- 5 levels
- 50 gardens
- 500 AQ items
- 500 Food Smart Challenges
- 10 badge definitions

## Storage policy

Garden images and downloadable curriculum resources should be migrated to dedicated GrowMeal storage paths/buckets before final production rollout. Database catalog rows should then point to stable production URLs.
