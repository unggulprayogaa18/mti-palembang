-- ============================================================
--  MTI CMS — Bucket "media" + policy Storage
--  Idempotent: aman dijalankan berulang.
--  Read publik otomatis karena bucket bertipe public.
--  Upload/update/delete dibatasi hanya admin (terautentikasi).
-- ============================================================

-- Buat bucket "media" (public). Tidak menimpa kalau sudah ada.
insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do update set public = true;

drop policy if exists "media authenticated upload" on storage.objects;
create policy "media authenticated upload" on storage.objects
  for insert to authenticated with check (bucket_id = 'media');

drop policy if exists "media authenticated update" on storage.objects;
create policy "media authenticated update" on storage.objects
  for update to authenticated using (bucket_id = 'media');

drop policy if exists "media authenticated delete" on storage.objects;
create policy "media authenticated delete" on storage.objects
  for delete to authenticated using (bucket_id = 'media');
