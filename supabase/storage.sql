-- ============================================================
--  MTI CMS — Bucket "media" + policy Storage
--  Idempotent: aman dijalankan berulang.
--  Read publik otomatis karena bucket bertipe public.
--  Upload/update/delete dibatasi hanya admin (terautentikasi).
--
--  Catatan: pakai auth.role() = 'authenticated' (klaim JWT),
--  BUKAN "TO authenticated" (role Postgres) — supaya kompatibel
--  dengan API key format baru (sb_publishable / sb_secret).
-- ============================================================

-- Buat bucket "media" (public). Tidak menimpa setting lain kalau sudah ada.
insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do update set public = true;

drop policy if exists "media authenticated upload" on storage.objects;
create policy "media authenticated upload" on storage.objects
  for insert with check (bucket_id = 'media' and auth.role() = 'authenticated');

drop policy if exists "media authenticated update" on storage.objects;
create policy "media authenticated update" on storage.objects
  for update using (bucket_id = 'media' and auth.role() = 'authenticated');

drop policy if exists "media authenticated delete" on storage.objects;
create policy "media authenticated delete" on storage.objects
  for delete using (bucket_id = 'media' and auth.role() = 'authenticated');
