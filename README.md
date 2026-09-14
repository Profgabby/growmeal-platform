# LIFEWS AgriShine™ GrowMeal™ Platform

Dedicated repository for the GrowMeal™ digital learning and school-garden platform.

This repository is intentionally separate from the existing AgriShine and LIFEWS Pathways repositories.

## Platform scope

- 50 progressive school gardens across Nursery, Primary 1–3, Primary 4–6, JSS and SSS
- Curriculum and garden profiles
- Digital learning resources and downloads
- AQ assessment and quiz system
- Food Smart Challenge (FSC) system
- Teacher, learner, school and HQ workflows
- GrowMeal Passport and evidence records
- Six-language pathway architecture
- Supabase-backed application architecture
- Responsive/mobile-first interface

## Backend

The GrowMeal application uses the existing Supabase project `pgchuvzrdizipyvesqaw`, where the dedicated `growmeal_*` schema and RLS policies are maintained.

## Repository boundary

Do not mix this application with the existing AgriShine repository or `lifews-pathways-app`. GrowMeal application development belongs in `Profgabby/growmeal-platform`.
