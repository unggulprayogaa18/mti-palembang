# Integrasi Supabase untuk CMS MTI — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Memindahkan penyimpanan CMS dari file JSON ke Supabase (Postgres + Auth + Storage) sehingga operasi admin persist di lingkungan serverless.

**Architecture:** Next.js 16 App Router memakai `@supabase/ssr` untuk session berbasis cookie. Halaman publik & getter membaca via Supabase server client (tunduk RLS). Server Actions menulis setelah verifikasi session Supabase. Data list (berita/jurnal/artikel) jadi tabel; beranda/media jadi 1 baris JSONB. Gambar di-upload ke Supabase Storage bucket `media`.

**Tech Stack:** Next.js 16, React 19, `@supabase/supabase-js`, `@supabase/ssr`, Postgres, Supabase Auth, Supabase Storage.

## Global Constraints

- Next.js `^16.2.9`, React `^19.2.7` — jangan downgrade.
- Service role key **hanya** di `scripts/seed.mjs`; tanpa prefix `NEXT_PUBLIC_`; tidak ter-commit (`.env*` sudah di `.gitignore`).
- Bentuk data yang dikembalikan getter ke komponen UI harus **identik** dengan sekarang (camelCase: `detailDate`, `readTime`, `sourceUrl`, `downloadUrl`, dll) agar komponen render tidak berubah.
- Kolom Postgres pakai snake_case; pemetaan snake↔camel dilakukan di lapisan data (`lib/cms.js`) dan saat menulis di `app/admin/actions.js`.
- ID baris memakai `uuid` (di-generate Postgres), bukan string lama.
- Auth: tidak ada self-signup. Akun admin dibuat manual di Supabase Dashboard.
- Semua perintah dijalankan dari root `D:\mti-palembang`.

---

### Task 1: Pasang dependency & siapkan environment

**Files:**
- Modify: `package.json` (lewat `npm install`)
- Create: `.env.local`
- Create: `.env.example`

**Interfaces:**
- Produces: env vars `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` yang dikonsumsi semua task berikutnya.

- [ ] **Step 1: Pasang paket Supabase**

Run:
```bash
npm install @supabase/supabase-js @supabase/ssr
```
Expected: kedua paket muncul di `dependencies` pada `package.json`, exit code 0.

- [ ] **Step 2: Buat `.env.example` (template, boleh di-commit)**

Create `.env.example`:
```
# Supabase — ambil dari Dashboard > Project Settings > API
NEXT_PUBLIC_SUPABASE_URL=https://YOUR-PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_ANON_PUBLIC_KEY
# Hanya untuk scripts/seed.mjs — JANGAN diberi prefix NEXT_PUBLIC_
SUPABASE_SERVICE_ROLE_KEY=YOUR_SERVICE_ROLE_KEY
```

- [ ] **Step 3: Buat `.env.local` dengan nilai asli**

Create `.env.local` (isi dengan nilai dari Supabase Dashboard → Project Settings → API):
```
NEXT_PUBLIC_SUPABASE_URL=https://YOUR-PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon public key>
SUPABASE_SERVICE_ROLE_KEY=<service_role key yang SUDAH di-rotate>
```

- [ ] **Step 4: Verifikasi env terbaca**

Run:
```bash
node -e "require('dotenv').config({path:'.env.local'}); console.log(!!process.env.NEXT_PUBLIC_SUPABASE_URL && !!process.env.SUPABASE_SERVICE_ROLE_KEY)"
```
Bila `dotenv` belum ada, gunakan cara Next (cukup pastikan file ada):
```bash
node -e "const fs=require('fs'); const t=fs.readFileSync('.env.local','utf8'); console.log(['NEXT_PUBLIC_SUPABASE_URL','NEXT_PUBLIC_SUPABASE_ANON_KEY','SUPABASE_SERVICE_ROLE_KEY'].every(k=>t.includes(k+'=')))"
```
Expected: `true`

- [ ] **Step 5: Commit**

```bash
git add package.json package-lock.json .env.example
git commit -m "chore: pasang dependency Supabase + env template"
```
(Catatan: `.env.local` tidak ikut ter-commit karena `.gitignore` `.env*`.)

---

### Task 2: Skema database + RLS

**Files:**
- Create: `supabase/schema.sql`

**Interfaces:**
- Produces: tabel `berita`, `jurnal`, `artikel`, `beranda`, `media` dengan RLS aktif. Nama kolom (snake_case) dikonsumsi Task 4 (seed) dan Task 5/7/8/9 (getter & actions).

- [ ] **Step 1: Tulis SQL skema lengkap**

Create `supabase/schema.sql`:
```sql
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

-- ============ RLS ============

alter table public.berita enable row level security;
alter table public.jurnal enable row level security;
alter table public.artikel enable row level security;
alter table public.beranda enable row level security;
alter table public.media enable row level security;

-- SELECT publik hanya konten yang tayang
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

-- Admin (terautentikasi) akses penuh
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
```

- [ ] **Step 2: Jalankan skema di Supabase**

Buka Supabase Dashboard → SQL Editor → tempel isi `supabase/schema.sql` → Run.
Expected: "Success. No rows returned".

- [ ] **Step 3: Verifikasi tabel & RLS lewat Table Editor**

Dashboard → Table Editor: pastikan 5 tabel ada. Dashboard → Authentication → Policies: pastikan tiap tabel punya policy "public read" dan "admin all", dan RLS berstatus Enabled.
Expected: 5 tabel, RLS aktif semua.

- [ ] **Step 4: Commit**

```bash
git add supabase/schema.sql
git commit -m "feat: skema Postgres + RLS untuk CMS"
```

---

### Task 3: Supabase client helpers + middleware

**Files:**
- Create: `lib/supabase/client.js`
- Create: `lib/supabase/server.js`
- Create: `middleware.js`

**Interfaces:**
- Produces:
  - `lib/supabase/client.js` → `createClient()` (browser) — dipakai LoginForm (Task 6).
  - `lib/supabase/server.js` → `async createClient()` (server, per-request) — dipakai cms.js & actions.js.
  - `middleware.js` → refresh session + redirect `/admin/*` (kecuali `/admin/login`) ke login bila tak ada session.

- [ ] **Step 1: Buat browser client**

Create `lib/supabase/client.js`:
```js
import { createBrowserClient } from '@supabase/ssr';

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}
```

- [ ] **Step 2: Buat server client**

Create `lib/supabase/server.js`:
```js
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function createClient() {
  const cookieStore = await cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // dipanggil dari Server Component — diabaikan; middleware yang refresh
          }
        }
      }
    }
  );
}
```

- [ ] **Step 3: Buat middleware**

Create `middleware.js`:
```js
import { createServerClient } from '@supabase/ssr';
import { NextResponse } from 'next/server';

export async function middleware(request) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        }
      }
    }
  );

  const { data: { user } } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;
  const isAdmin = pathname.startsWith('/admin');
  const isLogin = pathname === '/admin/login';

  if (isAdmin && !isLogin && !user) {
    const url = request.nextUrl.clone();
    url.pathname = '/admin/login';
    return NextResponse.redirect(url);
  }

  if (isLogin && user) {
    const url = request.nextUrl.clone();
    url.pathname = '/admin';
    return NextResponse.redirect(url);
  }

  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)']
};
```

- [ ] **Step 4: Verifikasi build tidak rusak**

Run:
```bash
npm run build
```
Expected: build sukses (compiled). Halaman admin akan redirect ke login saat runtime karena belum ada session — itu perilaku yang diinginkan; build tetap lulus.

- [ ] **Step 5: Commit**

```bash
git add lib/supabase/client.js lib/supabase/server.js middleware.js
git commit -m "feat: Supabase client helpers + middleware auth"
```

---

### Task 4: Script seed (migrasi JSON → Supabase)

**Files:**
- Create: `scripts/seed.mjs`

**Interfaces:**
- Consumes: env vars dari Task 1; tabel dari Task 2; file JSON di `data/`.
- Produces: baris terisi di kelima tabel. Tidak diimpor kode lain (script sekali jalan).

- [ ] **Step 1: Tulis script seed**

Create `scripts/seed.mjs`:
```js
import { createClient } from '@supabase/supabase-js';
import { readFile } from 'fs/promises';
import path from 'path';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !serviceKey) {
  console.error('Set NEXT_PUBLIC_SUPABASE_URL dan SUPABASE_SERVICE_ROLE_KEY dulu.');
  process.exit(1);
}

const supabase = createClient(url, serviceKey, {
  auth: { autoRefreshToken: false, persistSession: false }
});

const DATA = path.join(process.cwd(), 'data');
const readJSON = async (f) => JSON.parse(await readFile(path.join(DATA, f), 'utf-8'));

async function seedBerita() {
  const items = await readJSON('berita.json');
  const rows = items.map((i) => ({
    slug: i.slug,
    href: i.href,
    cat: i.cat,
    group: i.group,
    img: i.img,
    title: i.title,
    date: i.date,
    detail_date: i.detailDate,
    author: i.author,
    read_time: i.readTime,
    excerpt: i.excerpt,
    content: i.content ?? [],
    highlights: i.highlights ?? [],
    source_url: i.sourceUrl ?? '',
    published: i.published ?? false
  }));
  const { error } = await supabase.from('berita').insert(rows);
  if (error) throw error;
  console.log(`berita: ${rows.length} baris`);
}

async function seedJurnal() {
  const items = await readJSON('jurnal.json');
  const rows = items.map((i) => ({
    title: i.title,
    edition: i.edition,
    date: i.date,
    topic: i.topic,
    description: i.description,
    cover: i.cover,
    download_url: i.downloadUrl ?? '#',
    visible: i.visible ?? true
  }));
  const { error } = await supabase.from('jurnal').insert(rows);
  if (error) throw error;
  console.log(`jurnal: ${rows.length} baris`);
}

async function seedArtikel() {
  const items = await readJSON('artikel.json');
  const rows = items.map((i) => ({
    title: i.title,
    kategori: i.kategori,
    daerah: i.daerah,
    date: i.date,
    ringkasan: i.ringkasan,
    konten: i.konten ?? [],
    gambar: i.gambar,
    visible: i.visible ?? false
  }));
  const { error } = await supabase.from('artikel').insert(rows);
  if (error) throw error;
  console.log(`artikel: ${rows.length} baris`);
}

async function seedBeranda() {
  const data = await readJSON('beranda.json');
  const { error } = await supabase.from('beranda').upsert({ id: 1, data });
  if (error) throw error;
  console.log('beranda: 1 baris');
}

async function seedMedia() {
  const data = await readJSON('media.json');
  const { error } = await supabase.from('media').upsert({ id: 1, data });
  if (error) throw error;
  console.log('media: 1 baris');
}

async function main() {
  await seedBerita();
  await seedJurnal();
  await seedArtikel();
  await seedBeranda();
  await seedMedia();
  console.log('Seed selesai.');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
```

- [ ] **Step 2: Jalankan seed**

Next.js memuat `.env.local` otomatis hanya untuk app; untuk script, suntik env via `--env-file` (Node ≥ 20.6):
```bash
node --env-file=.env.local scripts/seed.mjs
```
Expected output:
```
berita: N baris
jurnal: N baris
artikel: N baris
beranda: 1 baris
media: 1 baris
Seed selesai.
```

- [ ] **Step 3: Verifikasi jumlah baris**

Run:
```bash
node --env-file=.env.local -e "import('@supabase/supabase-js').then(async ({createClient})=>{const s=createClient(process.env.NEXT_PUBLIC_SUPABASE_URL,process.env.SUPABASE_SERVICE_ROLE_KEY);for(const t of ['berita','jurnal','artikel','beranda','media']){const {count}=await s.from(t).select('*',{count:'exact',head:true});console.log(t,count);}})"
```
Expected: tiap tabel menampilkan jumlah > 0 (beranda & media = 1).

- [ ] **Step 4: Commit**

```bash
git add scripts/seed.mjs
git commit -m "feat: script seed migrasi JSON ke Supabase"
```

---

### Task 5: Rewrite getter `lib/cms.js`

**Files:**
- Modify: `lib/cms.js` (ganti total)

**Interfaces:**
- Consumes: `lib/supabase/server.js` `createClient()`; tabel dari Task 2.
- Produces (bentuk WAJIB sama seperti versi JSON lama):
  - `getBerita()` → array objek berita camelCase (termasuk `detailDate`, `readTime`, `sourceUrl`, `content`, `highlights`).
  - `getBeranda()` → objek `{ ticker, leadStory, heroSide, regions, akses }`.
  - `getMedia()` → objek `{ mainVideo, miniVideos }`.
  - `getJurnal()` → array objek jurnal camelCase (`downloadUrl`).
  - `getArtikel()` → array objek artikel.

- [ ] **Step 1: Ganti isi `lib/cms.js`**

Replace seluruh isi `lib/cms.js` dengan:
```js
import { createClient } from './supabase/server';

function rowToBerita(r) {
  return {
    id: r.id,
    slug: r.slug,
    href: r.href,
    cat: r.cat,
    group: r.group,
    img: r.img,
    title: r.title,
    date: r.date,
    detailDate: r.detail_date,
    author: r.author,
    readTime: r.read_time,
    excerpt: r.excerpt,
    content: r.content ?? [],
    highlights: r.highlights ?? [],
    sourceUrl: r.source_url ?? '',
    published: r.published
  };
}

function rowToJurnal(r) {
  return {
    id: r.id,
    title: r.title,
    edition: r.edition,
    date: r.date,
    topic: r.topic,
    description: r.description,
    cover: r.cover,
    downloadUrl: r.download_url,
    visible: r.visible
  };
}

function rowToArtikel(r) {
  return {
    id: r.id,
    title: r.title,
    kategori: r.kategori,
    daerah: r.daerah,
    date: r.date,
    ringkasan: r.ringkasan,
    konten: r.konten ?? [],
    gambar: r.gambar,
    visible: r.visible
  };
}

export async function getBerita() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('berita')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return (data ?? []).map(rowToBerita);
}

export async function getBeranda() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('beranda')
    .select('data')
    .eq('id', 1)
    .single();
  if (error) throw error;
  return data.data;
}

export async function getMedia() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('media')
    .select('data')
    .eq('id', 1)
    .single();
  if (error) throw error;
  return data.data;
}

export async function getJurnal() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('jurnal')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return (data ?? []).map(rowToJurnal);
}

export async function getArtikel() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('artikel')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return (data ?? []).map(rowToArtikel);
}
```

- [ ] **Step 2: Cek pemakaian getter agar field cocok**

Run:
```bash
grep -rn "getBerita\|getBeranda\|getMedia\|getJurnal\|getArtikel" app/
```
Expected: pemakaian di halaman publik/admin. Pastikan field yang dipakai (mis. `.detailDate`, `.downloadUrl`) ada di mapper di atas. Bila ada field lain yang dipakai komponen, tambahkan ke mapper.

- [ ] **Step 3: Verifikasi getter via dev server**

Run (latar belakang) lalu cek beranda:
```bash
npm run dev
```
Buka `http://localhost:3000` — halaman beranda harus render konten (ticker, lead story, dll) dari Supabase tanpa error. Cek juga `http://localhost:3000/mti-dalam-berita`.
Expected: konten tampil sama seperti sebelumnya.

- [ ] **Step 4: Commit**

```bash
git add lib/cms.js
git commit -m "feat: getter cms.js baca dari Supabase"
```

---

### Task 6: Auth login/logout via Supabase

**Files:**
- Modify: `app/admin/actions.js` (bagian auth saja — fungsi `login`/`logout` dan helper `checkAuth`)
- Modify: `app/admin/login/LoginForm.jsx`
- Modify: `app/admin/layout.jsx`

**Interfaces:**
- Consumes: `lib/supabase/server.js` `createClient()`; `lib/supabase/client.js` (di LoginForm).
- Produces:
  - `checkAuth()` async → redirect ke `/admin/login` bila tak ada user; dipakai semua action di Task 7-9.
  - `logout()` server action.
  - LoginForm memakai Supabase Auth (email + password).

- [ ] **Step 1: Tambah helper auth + logout di `app/admin/actions.js`**

Di bagian atas `app/admin/actions.js`, ganti import & helper auth lama. Hapus baris:
```js
import fs from 'fs/promises';
import path from 'path';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const DATA = path.join(process.cwd(), 'data');

function getPassword() {
  return process.env.ADMIN_PASSWORD || 'admin123';
}

async function checkAuth() {
  const cookieStore = await cookies();
  const auth = cookieStore.get('cms-auth');
  if (!auth || auth.value !== getPassword()) {
    redirect('/admin/login');
  }
}

async function readJSON(filename) {
  const filePath = path.join(DATA, filename);
  const raw = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(raw);
}

async function writeJSON(filename, data) {
  const filePath = path.join(DATA, filename);
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
}
```
Ganti dengan:
```js
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '../../lib/supabase/server';

async function checkAuth() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/admin/login');
  return supabase;
}
```
(`slugify` tetap dipertahankan apa adanya.)

- [ ] **Step 2: Ganti fungsi `login` dan `logout`**

Ganti blok lama:
```js
export async function login(formData) {
  const password = formData.get('password');
  if (password === getPassword()) {
    const cookieStore = await cookies();
    cookieStore.set('cms-auth', password, {
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60 * 24 * 7 // 7 days
    });
    redirect('/admin');
  } else {
    return { error: 'Password salah. Coba lagi.' };
  }
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete('cms-auth');
  redirect('/admin/login');
}
```
Dengan:
```js
export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect('/admin/login');
}
```
(Fungsi `login` dipindah ke client — lihat Step 3. Hapus fungsi `login` lama dari actions.js.)

- [ ] **Step 3: Ubah `LoginForm.jsx` pakai Supabase Auth**

Replace seluruh isi `app/admin/login/LoginForm.jsx`:
```jsx
'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '../../../lib/supabase/client';

export default function LoginForm() {
  const [error, setError] = useState('');
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get('email');
    const password = formData.get('password');
    setError('');
    startTransition(async () => {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setError('Email atau password salah.');
        return;
      }
      router.replace('/admin');
      router.refresh();
    });
  };

  return (
    <form onSubmit={handleSubmit} className="adminLoginForm">
      {error && <div className="adminAlert adminAlertError">{error}</div>}
      <div className="adminFormGroup">
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" placeholder="admin@mti.or.id" required autoFocus />
      </div>
      <div className="adminFormGroup">
        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" placeholder="Masukkan password" required />
      </div>
      <button type="submit" className="adminBtn adminBtnPrimary" style={{ width: '100%' }} disabled={isPending}>
        {isPending ? 'Memproses...' : 'Masuk'}
      </button>
    </form>
  );
}
```

- [ ] **Step 4: Ubah `app/admin/layout.jsx` cek session via Supabase**

Replace seluruh isi `app/admin/layout.jsx`:
```jsx
import Link from 'next/link';
import { logout } from './actions';
import { createClient } from '../../lib/supabase/server';

export default async function AdminLayout({ children }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const authed = !!user;

  return (
    <div className="adminWrap">
      {authed && (
        <aside className="adminSidebar">
          <div className="adminSidebarBrand">
            <strong>MTI CMS</strong>
            <small>Admin Panel</small>
          </div>
          <nav className="adminSidebarNav">
            <Link href="/admin" className="adminNavItem">Dashboard</Link>
            <Link href="/admin/beranda" className="adminNavItem">Beranda</Link>
            <Link href="/admin/berita" className="adminNavItem">Berita</Link>
            <Link href="/admin/media" className="adminNavItem">Media</Link>
            <Link href="/admin/jurnal" className="adminNavItem">Jurnal</Link>
            <Link href="/admin/artikel" className="adminNavItem">Artikel &amp; Opini</Link>
          </nav>
          <div className="adminSidebarFooter">
            <a href="/" className="adminNavItem" style={{ fontSize: 12, opacity: 0.7 }}>
              Lihat Website
            </a>
            <form action={logout}>
              <button type="submit" className="adminLogoutBtn">Keluar</button>
            </form>
          </div>
        </aside>
      )}
      <main className="adminMain">{children}</main>
    </div>
  );
}
```

- [ ] **Step 5: Buat akun admin di Supabase**

Dashboard → Authentication → Users → "Add user" → isi email + password → centang auto-confirm. (Atau Dashboard → Authentication → Providers → pastikan Email aktif.)
Expected: 1 user admin terdaftar.

- [ ] **Step 6: Verifikasi login/logout end-to-end**

Dengan `npm run dev` berjalan: buka `http://localhost:3000/admin` → harus redirect ke `/admin/login`. Login pakai akun tadi → masuk ke `/admin`. Klik "Keluar" → kembali ke login.
Expected: alur login, akses admin, logout semua bekerja.

- [ ] **Step 7: Commit**

```bash
git add app/admin/actions.js app/admin/login/LoginForm.jsx app/admin/layout.jsx
git commit -m "feat: auth admin via Supabase Auth"
```

---

### Task 7: Actions Berita → Supabase

**Files:**
- Modify: `app/admin/actions.js` (fungsi: `saveBeritaItem`, `addBeritaItem`, `deleteBeritaItem`, `toggleBeritaPublished`)

**Interfaces:**
- Consumes: `checkAuth()` (Task 6) yang mengembalikan supabase client; `slugify`.
- Produces: empat action berita yang menulis ke tabel `berita`. Signature dipertahankan (`saveBeritaItem(id, formData)`, `addBeritaItem(formData)`, `deleteBeritaItem(id)`, `toggleBeritaPublished(id)`).

- [ ] **Step 1: Ganti keempat fungsi berita**

Replace blok dari `export async function saveBeritaItem` s/d akhir `toggleBeritaPublished` di `app/admin/actions.js` dengan:
```js
// ── Berita ────────────────────────────────────────────────────────────────────

export async function saveBeritaItem(id, formData) {
  const supabase = await checkAuth();
  const title = formData.get('title');
  const slug = formData.get('slug') || slugify(title || '');
  const update = {
    title,
    slug,
    href: `/berita/${slug}`,
    cat: formData.get('cat'),
    group: formData.get('group'),
    img: formData.get('img'),
    date: formData.get('date'),
    detail_date: formData.get('detailDate'),
    author: formData.get('author'),
    read_time: formData.get('readTime'),
    excerpt: formData.get('excerpt'),
    content: (formData.get('content') || '').split('\n\n').filter(Boolean),
    highlights: (formData.get('highlights') || '').split('\n').filter(Boolean),
    source_url: formData.get('sourceUrl') || ''
  };
  Object.keys(update).forEach((k) => update[k] == null && delete update[k]);
  const { error } = await supabase.from('berita').update(update).eq('id', id);
  if (error) return { error: error.message };
  revalidatePath('/');
  revalidatePath('/mti-dalam-berita');
  revalidatePath(`/berita/${slug}`);
  redirect('/admin/berita');
}

export async function addBeritaItem(formData) {
  const supabase = await checkAuth();
  const title = formData.get('title') || 'Judul Baru';
  const slug = formData.get('slug') || slugify(title);
  const row = {
    slug,
    href: `/berita/${slug}`,
    cat: formData.get('cat') || 'Berita',
    group: formData.get('group') || 'Berita',
    img: formData.get('img') || '',
    title,
    date: formData.get('date') || '',
    detail_date: formData.get('detailDate') || '',
    author: formData.get('author') || 'Redaksi MTI',
    read_time: formData.get('readTime') || '3 menit baca',
    excerpt: formData.get('excerpt') || '',
    content: (formData.get('content') || '').split('\n\n').filter(Boolean),
    highlights: (formData.get('highlights') || '').split('\n').filter(Boolean),
    source_url: formData.get('sourceUrl') || '',
    published: false
  };
  const { error } = await supabase.from('berita').insert(row);
  if (error) return { error: error.message };
  revalidatePath('/');
  revalidatePath('/mti-dalam-berita');
  redirect('/admin/berita');
}

export async function deleteBeritaItem(id) {
  const supabase = await checkAuth();
  await supabase.from('berita').delete().eq('id', id);
  revalidatePath('/');
  revalidatePath('/mti-dalam-berita');
  revalidatePath('/admin/berita');
}

export async function toggleBeritaPublished(id) {
  const supabase = await checkAuth();
  const { data } = await supabase.from('berita').select('published').eq('id', id).single();
  if (!data) return;
  await supabase.from('berita').update({ published: !data.published }).eq('id', id);
  revalidatePath('/');
  revalidatePath('/mti-dalam-berita');
  revalidatePath('/admin/berita');
}
```

- [ ] **Step 2: Verifikasi CRUD berita di admin**

Dengan dev server berjalan & sudah login: buka `/admin/berita` → Tambah berita baru → Simpan. Edit judulnya → Simpan. Toggle Publik/Draft. Hapus item uji.
Expected: setiap aksi tersimpan (refresh halaman tetap ada), tampil di `/mti-dalam-berita` saat published.

- [ ] **Step 3: Commit**

```bash
git add app/admin/actions.js
git commit -m "feat: actions berita pakai Supabase"
```

---

### Task 8: Actions Jurnal & Artikel → Supabase

**Files:**
- Modify: `app/admin/actions.js` (fungsi jurnal: `saveJurnalItem`, `addJurnalItem`, `deleteJurnalItem`, `toggleJurnalVisible`; artikel: `saveArtikelItem`, `addArtikelItem`, `deleteArtikelItem`, `toggleArtikelVisible`)

**Interfaces:**
- Consumes: `checkAuth()`.
- Produces: delapan action jurnal/artikel menulis ke tabel `jurnal`/`artikel`. Signature dipertahankan.

- [ ] **Step 1: Ganti fungsi Jurnal**

Replace blok Jurnal di `app/admin/actions.js` dengan:
```js
// ── Jurnal ────────────────────────────────────────────────────────────────────

export async function saveJurnalItem(id, formData) {
  const supabase = await checkAuth();
  const update = {
    title: formData.get('title'),
    edition: formData.get('edition'),
    date: formData.get('date'),
    topic: formData.get('topic'),
    description: formData.get('description'),
    cover: formData.get('cover'),
    download_url: formData.get('downloadUrl')
  };
  Object.keys(update).forEach((k) => update[k] == null && delete update[k]);
  const { error } = await supabase.from('jurnal').update(update).eq('id', id);
  if (error) return { error: error.message };
  revalidatePath('/');
  revalidatePath('/admin/jurnal');
}

export async function addJurnalItem(formData) {
  const supabase = await checkAuth();
  const row = {
    title: formData.get('title') || 'Jurnal Baru',
    edition: formData.get('edition') || '',
    date: formData.get('date') || '',
    topic: formData.get('topic') || '',
    description: formData.get('description') || '',
    cover: formData.get('cover') || '',
    download_url: formData.get('downloadUrl') || '#',
    visible: true
  };
  const { error } = await supabase.from('jurnal').insert(row);
  if (error) return { error: error.message };
  revalidatePath('/');
  revalidatePath('/admin/jurnal');
}

export async function deleteJurnalItem(id) {
  const supabase = await checkAuth();
  await supabase.from('jurnal').delete().eq('id', id);
  revalidatePath('/');
  revalidatePath('/admin/jurnal');
}

export async function toggleJurnalVisible(id) {
  const supabase = await checkAuth();
  const { data } = await supabase.from('jurnal').select('visible').eq('id', id).single();
  if (!data) return;
  await supabase.from('jurnal').update({ visible: !data.visible }).eq('id', id);
  revalidatePath('/');
  revalidatePath('/admin/jurnal');
}
```

- [ ] **Step 2: Ganti fungsi Artikel**

Replace blok Artikel di `app/admin/actions.js` dengan:
```js
// ── Artikel ───────────────────────────────────────────────────────────────────

export async function saveArtikelItem(id, formData) {
  const supabase = await checkAuth();
  const update = {
    title: formData.get('title'),
    kategori: formData.get('kategori'),
    daerah: formData.get('daerah'),
    date: formData.get('date'),
    ringkasan: formData.get('ringkasan'),
    konten: (formData.get('konten') || '').split('\n\n').filter(Boolean),
    gambar: formData.get('gambar')
  };
  Object.keys(update).forEach((k) => update[k] == null && delete update[k]);
  const { error } = await supabase.from('artikel').update(update).eq('id', id);
  if (error) return { error: error.message };
  revalidatePath('/');
  revalidatePath('/admin/artikel');
}

export async function addArtikelItem(formData) {
  const supabase = await checkAuth();
  const row = {
    title: formData.get('title') || 'Artikel Baru',
    kategori: formData.get('kategori') || 'Opini',
    daerah: formData.get('daerah') || '',
    date: formData.get('date') || '',
    ringkasan: formData.get('ringkasan') || '',
    konten: (formData.get('konten') || '').split('\n\n').filter(Boolean),
    gambar: formData.get('gambar') || '',
    visible: false
  };
  const { error } = await supabase.from('artikel').insert(row);
  if (error) return { error: error.message };
  revalidatePath('/');
  revalidatePath('/admin/artikel');
}

export async function deleteArtikelItem(id) {
  const supabase = await checkAuth();
  await supabase.from('artikel').delete().eq('id', id);
  revalidatePath('/');
  revalidatePath('/admin/artikel');
}

export async function toggleArtikelVisible(id) {
  const supabase = await checkAuth();
  const { data } = await supabase.from('artikel').select('visible').eq('id', id).single();
  if (!data) return;
  await supabase.from('artikel').update({ visible: !data.visible }).eq('id', id);
  revalidatePath('/');
  revalidatePath('/admin/artikel');
}
```

- [ ] **Step 3: Verifikasi CRUD jurnal & artikel**

Di admin: `/admin/jurnal` → tambah, edit, toggle visible, hapus. `/admin/artikel` → tambah, edit, toggle visible, hapus.
Expected: semua aksi persist; item visible tampil di halaman publik terkait.

- [ ] **Step 4: Commit**

```bash
git add app/admin/actions.js
git commit -m "feat: actions jurnal & artikel pakai Supabase"
```

---

### Task 9: Actions Beranda & Media (JSONB) → Supabase

**Files:**
- Modify: `app/admin/actions.js` (fungsi: `saveBeranda`, `saveMainVideo`, `saveMiniVideos`, `toggleMediaVisible`, `deleteMediaItem`)

**Interfaces:**
- Consumes: `checkAuth()`.
- Produces: action beranda/media membaca kolom `data` (JSONB), memodifikasi section, menulis balik. Signature dipertahankan. `generateId` lokal untuk id elemen nested.

- [ ] **Step 1: Tambah helper baca/tulis singleton + generateId**

Di `app/admin/actions.js`, tepat sebelum komentar `// ── Beranda`, tambahkan:
```js
function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
}

async function getSingleton(supabase, table) {
  const { data } = await supabase.from(table).select('data').eq('id', 1).single();
  return data.data;
}

async function saveSingleton(supabase, table, value) {
  await supabase.from(table).update({ data: value }).eq('id', 1);
}
```

- [ ] **Step 2: Ganti `saveBeranda`**

Replace fungsi `saveBeranda` dengan (logika section sama persis, hanya sumber/penyimpanan diganti):
```js
export async function saveBeranda(section, formData) {
  const supabase = await checkAuth();
  const beranda = await getSingleton(supabase, 'beranda');

  if (section === 'ticker') {
    const ids = formData.getAll('tickerId');
    const tags = formData.getAll('tickerTag');
    const texts = formData.getAll('tickerText');
    beranda.ticker = ids.map((id, i) => ({
      id: id || generateId(),
      tag: tags[i] || '',
      text: texts[i] || ''
    }));
  } else if (section === 'leadStory') {
    beranda.leadStory = {
      img: formData.get('img') || beranda.leadStory.img,
      cat: formData.get('cat') || beranda.leadStory.cat,
      title: formData.get('title') || beranda.leadStory.title,
      excerpt: formData.get('excerpt') || beranda.leadStory.excerpt,
      author: formData.get('author') || beranda.leadStory.author,
      date: formData.get('date') || beranda.leadStory.date,
      readTime: formData.get('readTime') || beranda.leadStory.readTime,
      href: formData.get('href') || beranda.leadStory.href
    };
  } else if (section === 'heroSide') {
    const ids = formData.getAll('sideId');
    const imgs = formData.getAll('sideImg');
    const cats = formData.getAll('sideCat');
    const colors = formData.getAll('sideColor');
    const titles = formData.getAll('sideTitle');
    const dates = formData.getAll('sideDate');
    const hrefs = formData.getAll('sideHref');
    beranda.heroSide = ids.map((id, i) => ({
      id: id || generateId(),
      img: imgs[i] || '',
      cat: cats[i] || '',
      tagColor: colors[i] || '#4647ae',
      title: titles[i] || '',
      date: dates[i] || '',
      href: hrefs[i] || '#'
    }));
  } else if (section === 'regions') {
    const ids = formData.getAll('regionId');
    const nums = formData.getAll('regionNum');
    const tags = formData.getAll('regionTag');
    const titles = formData.getAll('regionTitle');
    const excerpts = formData.getAll('regionExcerpt');
    const dates = formData.getAll('regionDate');
    beranda.regions = ids.map((id, i) => ({
      id: id || generateId(),
      num: nums[i] || String(i + 1).padStart(2, '0'),
      tag: tags[i] || '',
      title: titles[i] || '',
      excerpt: excerpts[i] || '',
      date: dates[i] || ''
    }));
  } else if (section === 'akses') {
    beranda.akses = {
      edition: formData.get('edition') || beranda.akses.edition,
      date: formData.get('date') || beranda.akses.date,
      topic: formData.get('topic') || beranda.akses.topic,
      title: formData.get('title') || beranda.akses.title,
      description: formData.get('description') || beranda.akses.description
    };
  }

  await saveSingleton(supabase, 'beranda', beranda);
  revalidatePath('/');
  revalidatePath('/admin/beranda');
}
```

- [ ] **Step 3: Ganti fungsi Media**

Replace blok Media (`saveMainVideo`, `saveMiniVideos`, `toggleMediaVisible`, `deleteMediaItem`) dengan:
```js
export async function saveMainVideo(formData) {
  const supabase = await checkAuth();
  const media = await getSingleton(supabase, 'media');
  media.mainVideo = {
    url: formData.get('url') || media.mainVideo.url,
    title: formData.get('title') || media.mainVideo.title
  };
  await saveSingleton(supabase, 'media', media);
  revalidatePath('/');
  revalidatePath('/admin/media');
}

export async function saveMiniVideos(formData) {
  const supabase = await checkAuth();
  const media = await getSingleton(supabase, 'media');
  const ids = formData.getAll('videoId');
  const imgs = formData.getAll('videoImg');
  const titles = formData.getAll('videoTitle');
  const hrefs = formData.getAll('videoHref');
  media.miniVideos = ids.map((id, i) => {
    const existing = media.miniVideos.find((v) => v.id === id);
    return {
      id: id || generateId(),
      img: imgs[i] || '',
      title: titles[i] || '',
      href: hrefs[i] || '#',
      visible: existing ? existing.visible : true
    };
  });
  await saveSingleton(supabase, 'media', media);
  revalidatePath('/');
  revalidatePath('/admin/media');
}

export async function toggleMediaVisible(id) {
  const supabase = await checkAuth();
  const media = await getSingleton(supabase, 'media');
  const idx = media.miniVideos.findIndex((v) => v.id === id);
  if (idx === -1) return;
  media.miniVideos[idx].visible = !media.miniVideos[idx].visible;
  await saveSingleton(supabase, 'media', media);
  revalidatePath('/');
  revalidatePath('/admin/media');
}

export async function deleteMediaItem(id) {
  const supabase = await checkAuth();
  const media = await getSingleton(supabase, 'media');
  media.miniVideos = media.miniVideos.filter((v) => v.id !== id);
  await saveSingleton(supabase, 'media', media);
  revalidatePath('/');
  revalidatePath('/admin/media');
}
```

- [ ] **Step 4: Verifikasi beranda & media**

Di admin: `/admin/beranda` → ubah salah satu section (mis. ticker / leadStory) → Simpan → cek halaman utama berubah. `/admin/media` → ubah main video, tambah/hapus/toggle mini video → cek halaman utama.
Expected: perubahan persist dan tampil di beranda publik.

- [ ] **Step 5: Commit**

```bash
git add app/admin/actions.js
git commit -m "feat: actions beranda & media pakai Supabase JSONB"
```

---

### Task 10: Upload gambar ke Supabase Storage

**Files:**
- Create: `supabase/storage.sql`
- Create: `app/admin/components/ImageUpload.jsx`
- Modify: `app/admin/berita/[id]/BeritaForm.jsx` (pasang ImageUpload pada field `img`)
- Modify: `app/admin/artikel/ArtikelForm.jsx` (pasang ImageUpload pada field `gambar`)
- Modify: `app/admin/jurnal/JurnalForm.jsx` (pasang ImageUpload pada field `cover`)

**Interfaces:**
- Consumes: `lib/supabase/client.js` `createClient()`.
- Produces: `ImageUpload` (client component) — props `{ name, defaultValue }`; meng-upload file ke bucket `media` lalu menulis public URL ke `<input type="hidden" name={name}>` sehingga form action lama tetap menerima URL sebagai string.

- [ ] **Step 1: Buat bucket + policy Storage**

Dashboard → Storage → "New bucket" → nama `media` → centang "Public bucket" → Create.
Lalu SQL Editor jalankan `supabase/storage.sql` (buat file ini juga):
```sql
-- Upload/ubah/hapus hanya untuk user terautentikasi; read publik via bucket public.
create policy "media authenticated upload" on storage.objects
  for insert to authenticated with check (bucket_id = 'media');
create policy "media authenticated update" on storage.objects
  for update to authenticated using (bucket_id = 'media');
create policy "media authenticated delete" on storage.objects
  for delete to authenticated using (bucket_id = 'media');
```
Expected: bucket `media` (public) + 3 policy.

- [ ] **Step 2: Buat komponen `ImageUpload`**

Create `app/admin/components/ImageUpload.jsx`:
```jsx
'use client';

import { useState } from 'react';
import { createClient } from '../../../lib/supabase/client';

export default function ImageUpload({ name, defaultValue = '' }) {
  const [url, setUrl] = useState(defaultValue);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setBusy(true);
    setErr('');
    const supabase = createClient();
    const ext = file.name.split('.').pop();
    const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
    const { error } = await supabase.storage.from('media').upload(path, file, {
      cacheControl: '3600',
      upsert: false
    });
    if (error) {
      setErr('Upload gagal: ' + error.message);
      setBusy(false);
      return;
    }
    const { data } = supabase.storage.from('media').getPublicUrl(path);
    setUrl(data.publicUrl);
    setBusy(false);
  };

  return (
    <div className="adminUpload">
      <input type="hidden" name={name} value={url} />
      <input type="file" accept="image/*" onChange={handleFile} disabled={busy} />
      {busy && <small>Mengupload...</small>}
      {err && <div className="adminAlert adminAlertError">{err}</div>}
      {url && (
        <div className="adminUploadPreview">
          <img src={url} alt="preview" style={{ maxWidth: 160, marginTop: 8, borderRadius: 6 }} />
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="atau tempel URL gambar"
            style={{ display: 'block', width: '100%', marginTop: 6 }}
          />
        </div>
      )}
      {!url && (
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="atau tempel URL gambar"
          style={{ display: 'block', width: '100%', marginTop: 6 }}
        />
      )}
    </div>
  );
}
```

- [ ] **Step 3: Pasang di BeritaForm (field `img`)**

Di `app/admin/berita/[id]/BeritaForm.jsx`: tambahkan import di atas:
```jsx
import ImageUpload from '../../components/ImageUpload';
```
Cari input untuk field `img` (mis. `<input name="img" ... />`) dan ganti elemen input itu dengan:
```jsx
<ImageUpload name="img" defaultValue={item?.img || ''} />
```
(Gunakan nama variabel item yang sesuai di file tersebut — bila prop bernama `berita`, pakai `berita?.img`.)

- [ ] **Step 4: Pasang di ArtikelForm (field `gambar`) dan JurnalForm (field `cover`)**

Di `app/admin/artikel/ArtikelForm.jsx` tambah import `import ImageUpload from '../components/ImageUpload';` dan ganti input `gambar` dengan:
```jsx
<ImageUpload name="gambar" defaultValue={item?.gambar || ''} />
```
Di `app/admin/jurnal/JurnalForm.jsx` tambah import `import ImageUpload from '../components/ImageUpload';` dan ganti input `cover` dengan:
```jsx
<ImageUpload name="cover" defaultValue={item?.cover || ''} />
```
(Sesuaikan path import relatif & nama variabel item pada masing-masing file.)

- [ ] **Step 5: Verifikasi upload end-to-end**

Di admin (sudah login): buka form Berita → pilih file gambar → tunggu preview muncul (artinya URL publik didapat) → Simpan. Buka halaman publik berita → gambar tampil dari URL Supabase Storage (`.../storage/v1/object/public/media/...`). Ulangi cek singkat di Artikel & Jurnal.
Expected: file ter-upload, URL tersimpan ke DB, gambar tampil.

- [ ] **Step 6: Commit**

```bash
git add supabase/storage.sql app/admin/components/ImageUpload.jsx app/admin/berita/[id]/BeritaForm.jsx app/admin/artikel/ArtikelForm.jsx app/admin/jurnal/JurnalForm.jsx
git commit -m "feat: upload gambar ke Supabase Storage"
```

---

### Task 11: Bersih-bersih & verifikasi akhir

**Files:**
- Modify: `lib/cms.js` sudah bersih (tanpa `fs`)
- Modify: `app/admin/actions.js` sudah bersih (tanpa `fs`/cookie lama)
- (Opsional) folder `data/` dipertahankan sebagai backup.

**Interfaces:**
- Consumes: seluruh perubahan Task 1-10.
- Produces: build produksi lulus tanpa referensi `fs` di runtime CMS.

- [ ] **Step 1: Pastikan tidak ada sisa `fs`/auth lama**

Run:
```bash
grep -rn "fs/promises\|cms-auth\|ADMIN_PASSWORD\|readJSON\|writeJSON" app/ lib/
```
Expected: tidak ada hasil di `lib/cms.js` & `app/admin/actions.js` (boleh ada di tempat lain yang tak terkait CMS bila memang ada).

- [ ] **Step 2: Build produksi**

Run:
```bash
npm run build
```
Expected: build sukses tanpa error.

- [ ] **Step 3: Smoke test menyeluruh**

Dengan `npm start` (atau `npm run dev`): cek halaman publik utama, `/mti-dalam-berita`, salah satu halaman berita detail, dan login admin + 1 operasi simpan di tiap modul.
Expected: semua berfungsi dan persist.

- [ ] **Step 4: Commit (bila ada perubahan bersih-bersih)**

```bash
git add -A
git commit -m "chore: bersih-bersih sisa CMS file-based"
```

---

## Catatan Deploy (Vercel)

Setelah semua task selesai, set env vars di Vercel (Project → Settings → Environment Variables): `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`. **Jangan** set `SUPABASE_SERVICE_ROLE_KEY` di Vercel (hanya dipakai script seed lokal). Redeploy.
