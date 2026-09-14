create schema if not exists private;

create or replace function private.growmeal_has_role(target_school uuid, allowed_roles text[])
returns boolean
language sql
stable
security definer
set search_path = public, auth
as $$
  select exists (
    select 1 from public.growmeal_memberships m
    where m.user_id = (select auth.uid())
      and (target_school is null or m.school_id = target_school)
      and m.role = any(allowed_roles)
  );
$$;
revoke all on function private.growmeal_has_role(uuid,text[]) from public, anon;
grant execute on function private.growmeal_has_role(uuid,text[]) to authenticated;

create table if not exists public.growmeal_classes (
  id uuid primary key default gen_random_uuid(),
  school_id uuid not null references public.growmeal_schools(id) on delete cascade,
  level_id text not null references public.growmeal_levels(id),
  name text not null,
  academic_year text not null default '2026/27',
  term text not null default 'Term 1',
  active boolean not null default true,
  created_by uuid references auth.users(id),
  created_at timestamptz not null default now()
);

create table if not exists public.growmeal_enrollments (
  id uuid primary key default gen_random_uuid(),
  class_id uuid not null references public.growmeal_classes(id) on delete cascade,
  learner_id uuid not null references auth.users(id) on delete cascade,
  status text not null default 'active' check (status in ('active','inactive','completed')),
  created_at timestamptz not null default now(),
  unique(class_id, learner_id)
);

create table if not exists public.growmeal_teacher_assignments (
  id uuid primary key default gen_random_uuid(),
  class_id uuid not null references public.growmeal_classes(id) on delete cascade,
  teacher_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique(class_id, teacher_id)
);

create table if not exists public.growmeal_challenge_submissions (
  id uuid primary key default gen_random_uuid(),
  challenge_id uuid not null references public.growmeal_challenges(id) on delete cascade,
  class_id uuid references public.growmeal_classes(id) on delete set null,
  learner_id uuid not null references auth.users(id) on delete cascade,
  submission_text text,
  evidence jsonb not null default '{}'::jsonb,
  status text not null default 'submitted' check (status in ('draft','submitted','reviewed','revision_required')),
  score int check (score between 0 and 3),
  feedback text,
  submitted_at timestamptz not null default now(),
  reviewed_by uuid references auth.users(id),
  reviewed_at timestamptz
);

create table if not exists public.growmeal_badge_definitions (
  code text primary key,
  name text not null,
  description text,
  rule_version int not null default 1,
  icon text,
  active boolean not null default true
);

create table if not exists public.growmeal_badge_awards (
  id uuid primary key default gen_random_uuid(),
  badge_code text not null references public.growmeal_badge_definitions(code),
  learner_id uuid not null references auth.users(id) on delete cascade,
  garden_id text references public.growmeal_gardens(id),
  awarded_by uuid references auth.users(id),
  evidence_summary jsonb not null default '{}'::jsonb,
  awarded_at timestamptz not null default now(),
  unique(badge_code, learner_id, garden_id)
);

alter table public.growmeal_passport_entries
  add column if not exists evidence_note text,
  add column if not exists evidence jsonb not null default '{}'::jsonb,
  add column if not exists updated_at timestamptz not null default now();

create index if not exists idx_growmeal_classes_school on public.growmeal_classes(school_id);
create index if not exists idx_growmeal_enrollments_class on public.growmeal_enrollments(class_id);
create index if not exists idx_growmeal_enrollments_learner on public.growmeal_enrollments(learner_id);
create index if not exists idx_growmeal_teacher_assignments_teacher on public.growmeal_teacher_assignments(teacher_id);
create index if not exists idx_growmeal_challenge_submissions_learner on public.growmeal_challenge_submissions(learner_id);
create index if not exists idx_growmeal_challenge_submissions_class on public.growmeal_challenge_submissions(class_id);
create index if not exists idx_growmeal_badge_awards_learner on public.growmeal_badge_awards(learner_id);

alter table public.growmeal_classes enable row level security;
alter table public.growmeal_enrollments enable row level security;
alter table public.growmeal_teacher_assignments enable row level security;
alter table public.growmeal_challenge_submissions enable row level security;
alter table public.growmeal_badge_definitions enable row level security;
alter table public.growmeal_badge_awards enable row level security;

-- Public curriculum preview.
drop policy if exists published_quizzes_public_read on public.growmeal_quizzes;
create policy published_quizzes_public_read on public.growmeal_quizzes for select to anon, authenticated using (published = true);
drop policy if exists published_challenges_public_read on public.growmeal_challenges;
create policy published_challenges_public_read on public.growmeal_challenges for select to anon, authenticated using (published = true);

-- Classes.
drop policy if exists classes_member_read on public.growmeal_classes;
create policy classes_member_read on public.growmeal_classes for select to authenticated
using ((select private.growmeal_has_role(school_id, array['hq_admin','school_admin','teacher','learner','trainer','reviewer'])));
drop policy if exists classes_admin_write on public.growmeal_classes;
create policy classes_admin_write on public.growmeal_classes for all to authenticated
using ((select private.growmeal_has_role(school_id, array['hq_admin','school_admin'])))
with check ((select private.growmeal_has_role(school_id, array['hq_admin','school_admin'])));

-- Enrollments.
drop policy if exists enrollments_member_read on public.growmeal_enrollments;
create policy enrollments_member_read on public.growmeal_enrollments for select to authenticated
using (
  learner_id = (select auth.uid()) or exists (
    select 1 from public.growmeal_classes c where c.id = class_id
      and (select private.growmeal_has_role(c.school_id, array['hq_admin','school_admin','teacher']))
  )
);
drop policy if exists enrollments_admin_write on public.growmeal_enrollments;
create policy enrollments_admin_write on public.growmeal_enrollments for all to authenticated
using (exists (select 1 from public.growmeal_classes c where c.id=class_id and (select private.growmeal_has_role(c.school_id,array['hq_admin','school_admin']))))
with check (exists (select 1 from public.growmeal_classes c where c.id=class_id and (select private.growmeal_has_role(c.school_id,array['hq_admin','school_admin']))));

-- Teacher assignments.
drop policy if exists assignments_member_read on public.growmeal_teacher_assignments;
create policy assignments_member_read on public.growmeal_teacher_assignments for select to authenticated
using (
  teacher_id = (select auth.uid()) or exists (
    select 1 from public.growmeal_classes c where c.id=class_id
      and (select private.growmeal_has_role(c.school_id,array['hq_admin','school_admin']))
  )
);
drop policy if exists assignments_admin_write on public.growmeal_teacher_assignments;
create policy assignments_admin_write on public.growmeal_teacher_assignments for all to authenticated
using (exists (select 1 from public.growmeal_classes c where c.id=class_id and (select private.growmeal_has_role(c.school_id,array['hq_admin','school_admin']))))
with check (exists (select 1 from public.growmeal_classes c where c.id=class_id and (select private.growmeal_has_role(c.school_id,array['hq_admin','school_admin']))));

-- Challenge submissions.
drop policy if exists challenge_submission_learner_read on public.growmeal_challenge_submissions;
create policy challenge_submission_learner_read on public.growmeal_challenge_submissions for select to authenticated
using (
  learner_id = (select auth.uid()) or reviewed_by = (select auth.uid()) or
  (class_id is not null and exists (
    select 1 from public.growmeal_teacher_assignments ta
    where ta.class_id = growmeal_challenge_submissions.class_id and ta.teacher_id = (select auth.uid())
  ))
);
drop policy if exists challenge_submission_learner_insert on public.growmeal_challenge_submissions;
create policy challenge_submission_learner_insert on public.growmeal_challenge_submissions for insert to authenticated
with check (learner_id = (select auth.uid()));
drop policy if exists challenge_submission_learner_update on public.growmeal_challenge_submissions;
create policy challenge_submission_learner_update on public.growmeal_challenge_submissions for update to authenticated
using (learner_id=(select auth.uid()) and status in ('draft','revision_required'))
with check (learner_id=(select auth.uid()));
drop policy if exists challenge_submission_teacher_review on public.growmeal_challenge_submissions;
create policy challenge_submission_teacher_review on public.growmeal_challenge_submissions for update to authenticated
using (class_id is not null and exists (select 1 from public.growmeal_teacher_assignments ta where ta.class_id=growmeal_challenge_submissions.class_id and ta.teacher_id=(select auth.uid())))
with check (class_id is not null and exists (select 1 from public.growmeal_teacher_assignments ta where ta.class_id=growmeal_challenge_submissions.class_id and ta.teacher_id=(select auth.uid())));

-- Passport: learner can create own evidence, teachers can verify assigned learners.
drop policy if exists passport_learner_insert on public.growmeal_passport_entries;
create policy passport_learner_insert on public.growmeal_passport_entries for insert to authenticated
with check (learner_id=(select auth.uid()));
drop policy if exists passport_learner_update on public.growmeal_passport_entries;
create policy passport_learner_update on public.growmeal_passport_entries for update to authenticated
using (learner_id=(select auth.uid()) and verified=false)
with check (learner_id=(select auth.uid()));
drop policy if exists passport_teacher_read on public.growmeal_passport_entries;
create policy passport_teacher_read on public.growmeal_passport_entries for select to authenticated
using (
  learner_id=(select auth.uid()) or verifier_id=(select auth.uid()) or exists (
    select 1 from public.growmeal_enrollments e
    join public.growmeal_teacher_assignments ta on ta.class_id=e.class_id
    where e.learner_id=growmeal_passport_entries.learner_id and ta.teacher_id=(select auth.uid())
  )
);
drop policy if exists passport_teacher_verify on public.growmeal_passport_entries;
create policy passport_teacher_verify on public.growmeal_passport_entries for update to authenticated
using (exists (
  select 1 from public.growmeal_enrollments e
  join public.growmeal_teacher_assignments ta on ta.class_id=e.class_id
  where e.learner_id=growmeal_passport_entries.learner_id and ta.teacher_id=(select auth.uid())
))
with check (exists (
  select 1 from public.growmeal_enrollments e
  join public.growmeal_teacher_assignments ta on ta.class_id=e.class_id
  where e.learner_id=growmeal_passport_entries.learner_id and ta.teacher_id=(select auth.uid())
));

-- Badge definitions are public; awards visible to learner and assigned teachers.
drop policy if exists badge_definitions_public_read on public.growmeal_badge_definitions;
create policy badge_definitions_public_read on public.growmeal_badge_definitions for select to anon, authenticated using (active=true);
drop policy if exists badge_awards_read on public.growmeal_badge_awards;
create policy badge_awards_read on public.growmeal_badge_awards for select to authenticated
using (learner_id=(select auth.uid()) or awarded_by=(select auth.uid()) or exists (
  select 1 from public.growmeal_enrollments e
  join public.growmeal_teacher_assignments ta on ta.class_id=e.class_id
  where e.learner_id=growmeal_badge_awards.learner_id and ta.teacher_id=(select auth.uid())
));
drop policy if exists badge_awards_teacher_insert on public.growmeal_badge_awards;
create policy badge_awards_teacher_insert on public.growmeal_badge_awards for insert to authenticated
with check (awarded_by=(select auth.uid()) and exists (
  select 1 from public.growmeal_enrollments e
  join public.growmeal_teacher_assignments ta on ta.class_id=e.class_id
  where e.learner_id=growmeal_badge_awards.learner_id and ta.teacher_id=(select auth.uid())
));

-- Seed badge definitions.
insert into public.growmeal_badge_definitions(code,name,description,icon) values
('GARDEN_EXPLORER','Garden Explorer','Verified participation across GrowMeal gardens','🌱'),
('PRACTICAL_SKILLS','Practical Skills','Verified practical competence','🛠️'),
('OBSERVATION_DATA','Observation & Data','Verified observation and data evidence','📊'),
('GARDEN_MISSION','Garden Mission','Verified garden mission completion','🎯'),
('INGREDIENT_LAB','Ingredient Lab','Verified Ingredient Lab participation','🔬'),
('FARM_TO_FOOD','Farm-to-Food','Verified Farm-to-Food participation','🥬'),
('FOOD_SMART','Food Smart','Verified Food Smart Challenge participation','⭐'),
('RESOURCE_CARE','Resource Care','Demonstrated stewardship of garden resources','💧'),
('TEAMWORK_SAFETY','Teamwork & Safety','Demonstrated safe collaborative practice','🤝'),
('LEVEL_COMPLETION','Level Completion','Completed level requirements','🏅')
on conflict(code) do update set name=excluded.name,description=excluded.description,icon=excluded.icon,active=true;
