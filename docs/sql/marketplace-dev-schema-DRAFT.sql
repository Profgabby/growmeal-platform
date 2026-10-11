-- DEVELOPMENT DESIGN ONLY. DO NOT APPLY TO PRODUCTION.
-- Run in a NEW isolated Supabase development project after review.
create schema if not exists marketplace;
create table marketplace.organizations (
 id uuid primary key default gen_random_uuid(),
 name text not null check(length(trim(name))>0),
 kind text not null check(kind in ('individual','school','household','cooperative','community','institution','enterprise')),
 created_by uuid not null references auth.users(id),
 created_at timestamptz not null default now()
);
create table marketplace.memberships (
 organization_id uuid not null references marketplace.organizations(id),
 user_id uuid not null references auth.users(id),
 role text not null check(role in ('owner','manager','buyer','viewer')),
 primary key(organization_id,user_id)
);
create table marketplace.models (
 code text primary key,
 name text not null,
 audience text not null check(audience in ('education','non-school')),
 category text not null,
 legacy_garden_id text,
 active boolean not null default false,
 requires_site_assessment boolean not null default false
);
create table marketplace.packages (
 id uuid primary key default gen_random_uuid(),
 model_code text not null references marketplace.models(code),
 tier text not null check(tier in ('Starter','Plus','Complete')),
 currency char(3) not null default 'NGN',
 price_minor bigint check(price_minor>=0),
 bom jsonb not null default '[]'::jsonb,
 status text not null default 'draft' check(status in ('draft','approved','retired')),
 unique(model_code,tier)
);
create table marketplace.carts (
 id uuid primary key default gen_random_uuid(),
 organization_id uuid not null references marketplace.organizations(id),
 created_by uuid not null references auth.users(id),
 created_at timestamptz not null default now()
);
create table marketplace.cart_lines (
 cart_id uuid not null references marketplace.carts(id) on delete cascade,
 package_id uuid not null references marketplace.packages(id),
 quantity integer not null check(quantity between 1 and 1000),
 primary key(cart_id,package_id)
);
create table marketplace.orders (
 id uuid primary key default gen_random_uuid(),
 organization_id uuid not null references marketplace.organizations(id),
 placed_by uuid not null references auth.users(id),
 status text not null default 'draft' check(status in ('draft','awaiting_payment','paid','cancelled','refunded','fulfilled')),
 currency char(3) not null,
 total_minor bigint not null check(total_minor>=0),
 payment_reference text unique,
 created_at timestamptz not null default now()
);
create table marketplace.order_lines (
 id uuid primary key default gen_random_uuid(),
 order_id uuid not null references marketplace.orders(id),
 package_id uuid not null references marketplace.packages(id),
 quantity integer not null check(quantity>0),
 unit_price_minor bigint not null check(unit_price_minor>=0)
);
create table marketplace.installation_requests (
 id uuid primary key default gen_random_uuid(),
 order_id uuid not null unique references marketplace.orders(id),
 status text not null default 'pending_payment' check(status in ('pending_payment','ready_for_review','approved','dispatched','accepted','completed','cancelled')),
 site_details jsonb not null default '{}'::jsonb,
 lifewsworks_job_id text unique,
 created_at timestamptz not null default now()
);
create table marketplace.integration_outbox (
 id uuid primary key default gen_random_uuid(),
 event_key text not null unique,
 event_type text not null,
 payload jsonb not null,
 processed_at timestamptz,
 created_at timestamptz not null default now()
);
-- Default-deny all browser access until reviewed organization-scoped RLS
-- policies and privileged server-only payment functions are implemented.
alter table marketplace.organizations enable row level security;
alter table marketplace.memberships enable row level security;
alter table marketplace.models enable row level security;
alter table marketplace.packages enable row level security;
alter table marketplace.carts enable row level security;
alter table marketplace.cart_lines enable row level security;
alter table marketplace.orders enable row level security;
alter table marketplace.order_lines enable row level security;
alter table marketplace.installation_requests enable row level security;
alter table marketplace.integration_outbox enable row level security;
revoke all on schema marketplace from public,anon,authenticated;
revoke all on all tables in schema marketplace from public,anon,authenticated;
-- Never treat this schema draft as production-ready: no policies,
-- payment webhook validation, grants or checkout transaction logic yet.
