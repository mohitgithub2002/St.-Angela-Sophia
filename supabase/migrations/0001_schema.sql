-- St. Angela Sophia school website: content tables.
-- Every content table has `sort` (display order) and, where it makes sense, `published`.

create extension if not exists pgcrypto;

-- Staff accounts. A login (auth.users) is only staff if it has a row here. Rows are created by the server
-- with the service-role key (npm run create-admin, or Admin › Staff accounts), never by signing up, so
-- someone who signs up through Supabase Auth on their own gets no access.
create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  name text not null default '',
  email text not null default '',
  role text not null default 'editor' check (role in ('super_admin', 'editor')),
  created_at timestamptz not null default now()
);

create or replace function public.is_staff() returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.profiles where id = auth.uid());
$$;

create or replace function public.is_super_admin() returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.profiles where id = auth.uid() and role = 'super_admin');
$$;

create or replace function public.touch_updated_at() returns trigger
language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

-- Key/value JSON blocks: 'settings' (school details) and 'mpd' (disclosure sections D and E).
create table public.site_content (
  key text primary key,
  value jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

-- Rich-text pages (About overview, Vision & Mission, Assessment, Guidelines for parents, ...).
create table public.pages (
  slug text primary key,
  title text not null,
  body text not null default '',
  image text not null default '',
  updated_at timestamptz not null default now()
);

create table public.slides (
  id uuid primary key default gen_random_uuid(),
  image text not null default '',
  alt text not null default '',
  kicker text not null default '',
  heading text not null default '',
  link text not null default '',
  position text not null default 'center',
  sort int not null default 0,
  published boolean not null default true,
  updated_at timestamptz not null default now()
);

create table public.announcements (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  text text not null default '',
  link text not null default '',
  file_url text not null default '',
  date date,
  expires_on date,
  pinned boolean not null default false,
  sort int not null default 0,
  published boolean not null default true,
  updated_at timestamptz not null default now()
);

-- Every downloadable PDF on the site.
create table public.documents (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text not null check (category in ('circular', 'cbse_circular', 'syllabus', 'study_material', 'form', 'policy', 'fee', 'calendar', 'datesheet', 'result', 'ptm', 'other')),
  description text not null default '',
  class_name text not null default '',
  subject text not null default '',
  file_url text not null default '',
  date date,
  sort int not null default 0,
  published boolean not null default true,
  updated_at timestamptz not null default now()
);
create index documents_category_idx on public.documents (category, date desc);

-- Mandatory Public Disclosure, section B: one fixed slot per required document.
create table public.mpd_documents (
  slot text primary key,
  file_url text not null default '',
  updated_at timestamptz not null default now()
);

create table public.fee_structure (
  id uuid primary key default gen_random_uuid(),
  session text not null,
  class_group text not null,
  fee_head text not null,
  amount numeric(10, 2) not null default 0,
  frequency text not null default 'Annual',
  sort int not null default 0,
  updated_at timestamptz not null default now()
);

create table public.board_results (
  id uuid primary key default gen_random_uuid(),
  class text not null check (class in ('X', 'XII')),
  year text not null,
  registered int not null default 0 check (registered >= 0),
  passed int not null default 0 check (passed >= 0),
  remarks text not null default '',
  sort int not null default 0,
  updated_at timestamptz not null default now()
);

create table public.calendar_events (
  id uuid primary key default gen_random_uuid(),
  session text not null default '',
  title text not null,
  type text not null default 'event' check (type in ('holiday', 'exam', 'event', 'ptm', 'result', 'admission')),
  start_date date not null,
  end_date date,
  description text not null default '',
  published boolean not null default true,
  sort int not null default 0,
  updated_at timestamptz not null default now()
);
create index calendar_events_start_idx on public.calendar_events (start_date);

-- Management committee, SMC, PTA and Student Council members.
create table public.committee_members (
  id uuid primary key default gen_random_uuid(),
  committee text not null check (committee in ('management', 'smc', 'pta', 'student_council')),
  name text not null,
  designation text not null default '',
  representing text not null default '',
  photo text not null default '',
  sort int not null default 0,
  updated_at timestamptz not null default now()
);

create table public.facilities (
  id uuid primary key default gen_random_uuid(),
  category text not null check (category in ('classrooms', 'library', 'laboratories', 'sports', 'transport', 'canteen', 'other')),
  title text not null,
  text text not null default '',
  stat text not null default '',
  unit text not null default '',
  icon text not null default 'building',
  image text not null default '',
  featured boolean not null default false,
  sort int not null default 0,
  published boolean not null default true,
  updated_at timestamptz not null default now()
);

create table public.transport_routes (
  id uuid primary key default gen_random_uuid(),
  route_no text not null,
  areas text not null default '',
  contact text not null default '',
  sort int not null default 0,
  updated_at timestamptz not null default now()
);

create table public.facts (
  id uuid primary key default gen_random_uuid(),
  value text not null,
  suffix text not null default '',
  label text not null,
  icon text not null default 'star',
  sort int not null default 0,
  updated_at timestamptz not null default now()
);

create table public.core_values (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  text text not null default '',
  icon text not null default 'star',
  sort int not null default 0,
  updated_at timestamptz not null default now()
);

create table public.timeline (
  id uuid primary key default gen_random_uuid(),
  year text not null,
  title text not null,
  text text not null default '',
  sort int not null default 0,
  updated_at timestamptz not null default now()
);

create table public.stages (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  classes text not null default '',
  text text not null default '',
  subjects text[] not null default '{}',
  sort int not null default 0,
  updated_at timestamptz not null default now()
);

create table public.streams (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  min int not null default 0,
  need text not null default '',
  subjects text not null default '',
  sort int not null default 0,
  updated_at timestamptz not null default now()
);

create table public.admission_steps (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  text text not null default '',
  sort int not null default 0,
  updated_at timestamptz not null default now()
);

create table public.clubs (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text not null default '',
  sort int not null default 0,
  updated_at timestamptz not null default now()
);

create table public.events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  text text not null default '',
  date date,
  icon text not null default 'star',
  image text not null default '',
  kind text not null default 'event' check (kind in ('event', 'celebration')),
  sort int not null default 0,
  published boolean not null default true,
  updated_at timestamptz not null default now()
);

create table public.achievements (
  id uuid primary key default gen_random_uuid(),
  tag text not null default '',
  title text not null,
  text text not null default '',
  category text not null default 'academic' check (category in ('academic', 'sports', 'co_curricular')),
  image text not null default '',
  sort int not null default 0,
  published boolean not null default true,
  updated_at timestamptz not null default now()
);

create table public.gallery_albums (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  date date,
  description text not null default '',
  cover text not null default '',
  sort int not null default 0,
  published boolean not null default true,
  updated_at timestamptz not null default now()
);

create table public.gallery_photos (
  id uuid primary key default gen_random_uuid(),
  album_id uuid not null references public.gallery_albums (id) on delete cascade,
  image text not null,
  caption text not null default '',
  sort int not null default 0,
  updated_at timestamptz not null default now()
);
create index gallery_photos_album_idx on public.gallery_photos (album_id, sort);

create table public.videos (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  url text not null,
  date date,
  sort int not null default 0,
  published boolean not null default true,
  updated_at timestamptz not null default now()
);

create table public.notable_alumni (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  batch text not null default '',
  title text not null default '',
  text text not null default '',
  photo text not null default '',
  sort int not null default 0,
  published boolean not null default true,
  updated_at timestamptz not null default now()
);

create table public.alumni_events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  date date,
  venue text not null default '',
  text text not null default '',
  image text not null default '',
  sort int not null default 0,
  published boolean not null default true,
  updated_at timestamptz not null default now()
);

create table public.vacancies (
  id uuid primary key default gen_random_uuid(),
  post text not null,
  department text not null default '',
  qualification text not null default '',
  experience text not null default '',
  description text not null default '',
  last_date date,
  is_open boolean not null default true,
  sort int not null default 0,
  updated_at timestamptz not null default now()
);

-- Inbox: what visitors send through the site's forms.
create table public.enquiries (
  id uuid primary key default gen_random_uuid(),
  kind text not null default 'contact' check (kind in ('contact', 'admission', 'feedback')),
  name text not null,
  phone text not null default '',
  email text not null default '',
  subject text not null default '',
  message text not null default '',
  meta jsonb not null default '{}'::jsonb,
  status text not null default 'new' check (status in ('new', 'read', 'done')),
  notes text not null default '',
  created_at timestamptz not null default now()
);

create table public.alumni_registrations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  batch text not null default '',
  email text not null default '',
  phone text not null default '',
  occupation text not null default '',
  city text not null default '',
  message text not null default '',
  status text not null default 'new' check (status in ('new', 'read', 'done')),
  notes text not null default '',
  created_at timestamptz not null default now()
);

create table public.job_applications (
  id uuid primary key default gen_random_uuid(),
  vacancy_id uuid references public.vacancies (id) on delete set null,
  post text not null default '',
  name text not null,
  email text not null default '',
  phone text not null default '',
  qualification text not null default '',
  experience text not null default '',
  message text not null default '',
  resume_path text not null default '',
  status text not null default 'new' check (status in ('new', 'read', 'done')),
  notes text not null default '',
  created_at timestamptz not null default now()
);

-- Keep updated_at current on every content table.
do $$
declare t text;
begin
  foreach t in array array['site_content', 'pages', 'slides', 'announcements', 'documents', 'mpd_documents', 'fee_structure',
    'board_results', 'calendar_events', 'committee_members', 'facilities', 'transport_routes', 'facts', 'core_values', 'timeline',
    'stages', 'streams', 'admission_steps', 'clubs', 'events', 'achievements', 'gallery_albums', 'gallery_photos', 'videos',
    'notable_alumni', 'alumni_events', 'vacancies']
  loop
    execute format('create trigger touch_%1$s before update on public.%1$I for each row execute function public.touch_updated_at()', t);
  end loop;
end $$;
