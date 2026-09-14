# GrowMeal Architecture

## Separation rule

`Profgabby/growmeal-platform` is intended to be the canonical GrowMeal application repository. It must remain separate from existing AgriShine and LIFEWS repositories.

## Application stack

- Next.js 15
- React 19
- TypeScript
- Supabase Auth/Postgres/RLS
- Vercel deployment

## Core learning chain

School -> Class -> Teacher -> Learner -> Garden -> Resource -> Evidence -> Assessment -> Passport -> Badge

## Garden content

Each of the 50 gardens can expose:

- overview/profile
- lesson plan
- vocabulary/flashcards
- teacher demonstration
- practical activities
- journal/evidence
- garden missions
- AQ assessment
- Ingredient Lab
- Farm-to-Food
- Food Smart Challenge
- passport checkpoint
- downloads

## Language architecture

Canonical content remains separate from translations. Supported application language codes:

- `en`
- `fr`
- `ar`
- `ha`
- `yo`
- `ig`

Arabic renders RTL. Publication of translated curriculum should require reviewed/published status.
