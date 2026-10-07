-- Row-Level Security and storage buckets.
-- Visitors (anon) read published content and can only insert into the inbox tables.
-- Staff (any row in profiles) can read and write everything; only super admins manage staff.

grant usage on schema public to anon, authenticated;
grant select on all tables in schema public to anon, authenticated;
grant insert, update, delete on all tables in schema public to authenticated;
grant insert on public.enquiries, public.alumni_registrations, public.job_applications to anon;

do $$
declare t text;
begin
  -- Content with a published flag: visitors see published rows only.
  foreach t in array array['slides', 'announcements', 'documents', 'calendar_events', 'facilities', 'events', 'achievements',
    'gallery_albums', 'videos', 'notable_alumni', 'alumni_events']
  loop
    execute format('alter table public.%I enable row level security', t);
    execute format('create policy "public reads published" on public.%I for select using (published or public.is_staff())', t);
    execute format('create policy "staff write" on public.%I for all to authenticated using (public.is_staff()) with check (public.is_staff())', t);
  end loop;

  -- Content without a published flag: everything is public.
  foreach t in array array['site_content', 'pages', 'mpd_documents', 'fee_structure', 'board_results', 'committee_members',
    'transport_routes', 'facts', 'core_values', 'timeline', 'stages', 'streams', 'admission_steps', 'clubs', 'vacancies']
  loop
    execute format('alter table public.%I enable row level security', t);
    execute format('create policy "public reads" on public.%I for select using (true)', t);
    execute format('create policy "staff write" on public.%I for all to authenticated using (public.is_staff()) with check (public.is_staff())', t);
  end loop;

  -- Inbox: anyone may submit a new message; only staff can read or change them.
  foreach t in array array['enquiries', 'alumni_registrations', 'job_applications']
  loop
    execute format('alter table public.%I enable row level security', t);
    execute format('create policy "anyone submits" on public.%I for insert to anon, authenticated with check (status = ''new'' and notes = '''')', t);
    execute format('create policy "staff read" on public.%I for select to authenticated using (public.is_staff())', t);
    execute format('create policy "staff update" on public.%I for update to authenticated using (public.is_staff()) with check (public.is_staff())', t);
    execute format('create policy "staff delete" on public.%I for delete to authenticated using (public.is_staff())', t);
  end loop;
end $$;

-- Photos inherit their album's visibility.
alter table public.gallery_photos enable row level security;
create policy "public reads photos of published albums" on public.gallery_photos for select
  using (public.is_staff() or exists (select 1 from public.gallery_albums a where a.id = album_id and a.published));
create policy "staff write" on public.gallery_photos for all to authenticated using (public.is_staff()) with check (public.is_staff());

-- Profiles: staff see the staff list; only super admins change it.
alter table public.profiles enable row level security;
create policy "staff read profiles" on public.profiles for select to authenticated using (public.is_staff());
create policy "super admin manages profiles" on public.profiles for all to authenticated
  using (public.is_super_admin()) with check (public.is_super_admin());

-- Storage: public buckets for PDFs and photos, a private bucket for résumés.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types) values
  ('documents', 'documents', true, 20971520, array['application/pdf']),
  ('media', 'media', true, 10485760, array['image/jpeg', 'image/png', 'image/webp']),
  ('private', 'private', false, 5242880, array['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'])
on conflict (id) do nothing;

create policy "staff upload public files" on storage.objects for insert to authenticated
  with check (bucket_id in ('documents', 'media') and public.is_staff());
create policy "staff update public files" on storage.objects for update to authenticated
  using (bucket_id in ('documents', 'media') and public.is_staff());
create policy "staff delete files" on storage.objects for delete to authenticated
  using (bucket_id in ('documents', 'media', 'private') and public.is_staff());
create policy "staff read private files" on storage.objects for select to authenticated
  using (bucket_id = 'private' and public.is_staff());
