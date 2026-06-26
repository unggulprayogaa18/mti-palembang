-- ============================================================
--  MTI CMS — Policy Storage untuk bucket "media"
--  PRASYARAT: buat bucket "media" (Public) dulu lewat
--  Dashboard > Storage > New bucket.
--  Lalu jalankan SQL ini di SQL Editor > Run.
--
--  Read publik sudah otomatis karena bucket bertipe Public.
--  Policy di bawah membatasi upload/update/delete hanya admin
--  (user terautentikasi).
-- ============================================================

create policy "media authenticated upload" on storage.objects
  for insert to authenticated with check (bucket_id = 'media');

create policy "media authenticated update" on storage.objects
  for update to authenticated using (bucket_id = 'media');

create policy "media authenticated delete" on storage.objects
  for delete to authenticated using (bucket_id = 'media');
