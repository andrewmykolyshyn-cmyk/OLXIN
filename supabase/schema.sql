-- ============================================================
-- OLXIN Database Schema
-- Run this in the Supabase SQL Editor (new query)
-- ============================================================

-- --------------------------------------------------------
-- 1. Profiles (extends auth.users)
-- --------------------------------------------------------
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  name text not null default 'Usuario',
  is_pro boolean not null default false,
  created_at timestamptz default now()
);

-- Trigger: auto-create profile on signup
-- Assumption: user_metadata contains 'name' or falls back to email prefix
-- The application also handles this client-side as backup

-- --------------------------------------------------------
-- 2. Listings
-- --------------------------------------------------------
create table if not exists public.listings (
  id bigint generated always as identity primary key,
  seller_id uuid not null references public.profiles(id) on delete cascade,
  cat text not null,
  title text not null,
  description text default '',
  price integer not null default 0,
  city text default 'Alicante',
  badge text default '' check (badge in ('', 'vip', 'destacado', 'free')),
  envio boolean default true,
  photos text[] default '{}',
  views integer default 0,
  status text default 'pending' check (status in ('pending', 'active')),
  payment_id text,
  created_at timestamptz default now()
);

-- Indexes for fast lookups
-- Assumption: common queries filter by category or seller
-- Assumption: active listings need fast category lookup for browsing

-- --------------------------------------------------------
-- 3. Ratings
-- --------------------------------------------------------
create table if not exists public.ratings (
  id bigint generated always as identity primary key,
  seller_id uuid not null references public.profiles(id),
  rater_id uuid not null references public.profiles(id),
  stars integer not null check (stars between 1 and 5),
  comment text default '',
  created_at timestamptz default now(),
  unique(seller_id, rater_id)
);

-- One rating per user per seller (upsert to update)

-- --------------------------------------------------------
-- 4. Site Settings (single-row config)
-- --------------------------------------------------------
create table if not exists public.site_settings (
  id integer primary key default 1 check (id = 1),
  name text default 'OLXIN',
  color text default '#002f34',
  fee_cents integer default 100,
  categories jsonb default '[]'
);

-- Ensure single row exists
-- Assumption: seed.sql will insert the default row

-- --------------------------------------------------------
-- 5. Admins (email allow-list for admin access)
-- --------------------------------------------------------
create table if not exists public.admins (
  email text primary key
);

-- --------------------------------------------------------
-- 6. View: seller_ratings
-- --------------------------------------------------------
create or replace view public.seller_ratings as
select
  seller_id,
  round(avg(stars)::numeric, 2) as avg_stars,
  count(*) as count
from public.ratings
group by seller_id;

-- --------------------------------------------------------
-- 7. RPC: bump_views
-- --------------------------------------------------------
create or replace function public.bump_views(p_id bigint)
returns void
language plpgsql
as $$
begin
  update public.listings set views = views + 1 where id = p_id;
end;
$$;

-- --------------------------------------------------------
-- 8. Helper: is_admin() for RLS
-- --------------------------------------------------------
create or replace function public.is_admin()
returns boolean
language plpgsql
security definer
as $$
declare
  user_email text;
begin
  select email into user_email from auth.users where id = auth.uid();
  return exists (select 1 from public.admins where email = user_email);
end;
$$;

-- --------------------------------------------------------
-- 9. RLS Policies
-- --------------------------------------------------------

-- Enable RLS on all tables

-- Profiles: select anyone, update own row
alter table public.profiles enable row level security;

create policy "profiles_select_all"
  on public.profiles for select
  using (true);

create policy "profiles_update_own"
  on public.profiles for update
  using (auth.uid() = id);

-- Listings: select active OR own rows; insert/update/delete own rows only
alter table public.listings enable row level security;

create policy "listings_select_active_or_own"
  on public.listings for select
  using (status = 'active' or auth.uid() = seller_id);

create policy "listings_insert_own"
  on public.listings for insert
  with check (auth.uid() = seller_id);

create policy "listings_update_own"
  on public.listings for update
  using (auth.uid() = seller_id or is_admin());

create policy "listings_delete_own_or_admin"
  on public.listings for delete
  using (auth.uid() = seller_id or is_admin());

-- Ratings: select anyone; insert only own rating, cannot rate self
alter table public.ratings enable row level security;

create policy "ratings_select_all"
  on public.ratings for select
  using (true);

create policy "ratings_insert_own"
  on public.ratings for insert
  with check (auth.uid() = rater_id and auth.uid() <> seller_id);

create policy "ratings_update_own"
  on public.ratings for update
  using (auth.uid() = rater_id);

-- Site Settings: select anyone; update admin only
alter table public.site_settings enable row level security;

create policy "site_settings_select_all"
  on public.site_settings for select
  using (true);

create policy "site_settings_update_admin"
  on public.site_settings for update
  using (is_admin());

-- Admins: select for authenticated users (used by is_admin function internally)
-- Not directly exposed via client; read through is_admin()
alter table public.admins enable row level security;

create policy "admins_select_admin"
  on public.admins for select
  using (is_admin());

-- --------------------------------------------------------
-- 10. Storage Bucket: listing-photos
-- --------------------------------------------------------

-- Create the bucket (public) via Supabase dashboard or Storage API
-- After creating, set these policies on storage.objects:

-- Bucket policy: listing-photos (public read)
-- Note: Create bucket "listing-photos" as public in Supabase Storage UI
-- Then apply these object-level policies:

-- Policy: Anyone can read photos
-- create policy "listing_photos_select"
--   on storage.objects for select
--   using (bucket_id = 'listing-photos');

-- Policy: Authenticated users can upload
-- create policy "listing_photos_insert"
--   on storage.objects for insert
--   with check (bucket_id = 'listing-photos' and auth.role() = 'authenticated');

-- Policy: Authenticated users can delete their own uploads
-- create policy "listing_photos_delete"
--   on storage.objects for delete
--   using (bucket_id = 'listing-photos' and auth.uid() = owner);

-- Assumption: Storage bucket created via Supabase Dashboard
-- or using storage.create_bucket() API call with { public: true }
-- The seed script and app code reference this bucket.
