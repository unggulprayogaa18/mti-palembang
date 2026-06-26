-- ============================================================
--  MTI CMS — Skema tabel + RLS
--  Jalankan di Supabase Dashboard > SQL Editor > Run
-- ============================================================

-- ============ TABEL LIST ============

create table if not exists public.berita (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  href text,
  cat text,
  "group" text,
  img text,
  title text not null,
  date text,
  detail_date text,
  author text,
  read_time text,
  excerpt text,
  content jsonb default '[]'::jsonb,
  highlights jsonb default '[]'::jsonb,
  source_url text default '',
  published boolean default false,
  created_at timestamptz default now()
);

create table if not exists public.jurnal (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  edition text,
  date text,
  topic text,
  description text,
  cover text,
  download_url text default '#',
  visible boolean default true,
  created_at timestamptz default now()
);

create table if not exists public.artikel (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  kategori text,
  daerah text,
  date text,
  ringkasan text,
  konten jsonb default '[]'::jsonb,
  gambar text,
  visible boolean default false,
  created_at timestamptz default now()
);

-- ============ TABEL SINGLETON (JSONB) ============

create table if not exists public.beranda (
  id int primary key default 1,
  data jsonb not null,
  constraint beranda_singleton check (id = 1)
);

create table if not exists public.media (
  id int primary key default 1,
  data jsonb not null,
  constraint media_singleton check (id = 1)
);

-- ============ AKTIFKAN RLS ============

alter table public.berita enable row level security;
alter table public.jurnal enable row level security;
alter table public.artikel enable row level security;
alter table public.beranda enable row level security;
alter table public.media enable row level security;

-- ============ POLICY: SELECT PUBLIK (hanya konten tayang) ============

create policy "berita public read" on public.berita
  for select using (published = true);
create policy "jurnal public read" on public.jurnal
  for select using (visible = true);
create policy "artikel public read" on public.artikel
  for select using (visible = true);
create policy "beranda public read" on public.beranda
  for select using (true);
create policy "media public read" on public.media
  for select using (true);

-- ============ POLICY: ADMIN (terautentikasi) AKSES PENUH ============

create policy "berita admin all" on public.berita
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "jurnal admin all" on public.jurnal
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "artikel admin all" on public.artikel
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "beranda admin all" on public.beranda
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "media admin all" on public.media
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
