# Integrasi Supabase untuk CMS MTI Palembang

**Tanggal:** 2026-06-26
**Status:** Disetujui (siap masuk implementation plan)

## Latar Belakang & Masalah

Aplikasi adalah situs Next.js 16 (App Router) dengan area admin/CMS. Saat ini CMS
menyimpan konten sebagai file JSON di folder `data/` (`berita.json`, `beranda.json`,
`media.json`, `jurnal.json`, `artikel.json`). Penyimpanan dan auth saat ini:

- `lib/cms.js` — membaca file JSON via `fs/promises`.
- `app/admin/actions.js` — Server Actions yang baca-tulis file JSON, plus auth
  berbasis 1 password yang dicek terhadap cookie `cms-auth`.

**Masalah:** di lingkungan serverless (Vercel) filesystem bersifat read-only /
ephemeral, sehingga seluruh operasi "Simpan" di admin tidak persist. Solusi:
pindahkan penyimpanan ke Supabase (Postgres) dan auth ke Supabase Auth.

## Keputusan Desain (disepakati)

1. **Auth admin:** Supabase Auth (akun email+password), mendukung multi-admin.
2. **Gambar:** upload ke Supabase Storage (tetap mendukung paste URL sebagai fallback).
3. **Beranda & Media:** disimpan sebagai JSONB (struktur identik dengan JSON saat ini).

## 1. Arsitektur & Library

Gunakan paket resmi Supabase untuk Next.js App Router:

- `@supabase/supabase-js`
- `@supabase/ssr` (session berbasis cookie untuk Server Components & Server Actions)

Tiga jenis client:

- **Browser client** (`lib/supabase/client.js`) — untuk form login di komponen client.
- **Server client** (`lib/supabase/server.js`) — dibuat per-request di Server
  Components / Server Actions; baca-tulis dengan session user sehingga tunduk pada RLS.
- **Admin/service client** — hanya dipakai pada script seed/migrasi memakai
  `service_role` key. **Tidak pernah** masuk ke bundle frontend.

Environment variables (`.env.local` dan konfigurasi Vercel):

```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...   # hanya untuk script seed; tanpa prefix NEXT_PUBLIC
```

> Catatan keamanan: service_role key yang sempat ter-expose di chat HARUS di-rotate
> di Supabase Dashboard → Settings → API sebelum dipakai. Service key tidak boleh
> berada di frontend atau ter-commit ke git (`.env.local` masuk `.gitignore`).

## 2. Skema Database (Postgres)

### Tabel list (banyak baris)

**`berita`**

| kolom | tipe |
|-------|------|
| id | uuid PK default gen_random_uuid() |
| slug | text unik |
| href | text |
| cat | text |
| group | text |
| img | text |
| title | text |
| date | text |
| detail_date | text |
| author | text |
| read_time | text |
| excerpt | text |
| content | jsonb (array string) |
| highlights | jsonb (array string) |
| source_url | text |
| published | boolean default false |
| created_at | timestamptz default now() |

**`jurnal`**: id (uuid), title, edition, date, topic, description, cover,
download_url, visible (bool default true), created_at.

**`artikel`**: id (uuid), title, kategori, daerah, date, ringkasan,
konten (jsonb array), gambar, visible (bool default false), created_at.

### Tabel singleton (1 baris, JSONB)

**`beranda`**: id (int PK, fixed = 1), data jsonb berisi
`{ ticker, leadStory, heroSide, regions, akses }`.

**`media`**: id (int PK, fixed = 1), data jsonb berisi `{ mainVideo, miniVideos }`.

### Catatan mapping

- `id` lama (string `Date.now()...`) diganti `uuid`. ID di-generate oleh Postgres.
- Field array string (`content`, `highlights`, `konten`) disimpan sebagai `jsonb`.
- Penamaan kolom snake_case (`detail_date`, `read_time`, `source_url`,
  `download_url`); lapisan akses data memetakan kembali ke bentuk camelCase yang
  dipakai komponen UI agar UI tidak perlu banyak diubah.

## 3. Auth & Row Level Security (RLS)

- Halaman `/admin/login` memakai Supabase Auth (email+password). Akun admin dibuat
  manual lewat Supabase Dashboard — **tidak ada self-signup**.
- RLS aktif di semua tabel:
  - **SELECT publik** hanya untuk baris dengan `published = true` (berita) atau
    `visible = true` (jurnal, artikel). Beranda & media boleh SELECT publik penuh
    (konten memang publik).
  - **INSERT/UPDATE/DELETE** dan SELECT penuh hanya untuk user terautentikasi (admin).
- Server Actions mengganti `checkAuth()` lama: cek session via Supabase server client;
  jika tidak ada session → redirect ke `/admin/login`.
- `middleware.js` Next.js untuk refresh session Supabase dan proteksi route
  `/admin/*` (kecuali `/admin/login`).

## 4. Storage (Upload Gambar)

- Bucket **`media`** dengan akses read publik.
- Komponen upload pada form admin: pilih file → upload ke Storage → terima public
  URL → URL disimpan ke kolom `img` / `cover` / `gambar`.
- Policy Storage: INSERT/UPDATE/DELETE hanya untuk user terautentikasi; SELECT publik.
- Tetap mendukung input URL manual sebagai fallback (opsi lama tidak dihapus).

## 5. Perubahan Kode & Migrasi Data

File yang diubah/ditambah:

- `lib/supabase/client.js` — browser client (baru)
- `lib/supabase/server.js` — server client (baru)
- `middleware.js` — refresh session + proteksi `/admin/*` (baru)
- `lib/cms.js` — getter diganti query Supabase; output dipetakan ke bentuk camelCase
  yang sama seperti sekarang.
- `app/admin/actions.js` — semua fungsi save/add/delete/toggle + login/logout pakai
  Supabase; auth via session Supabase.
- `app/admin/login/LoginForm.jsx` — pakai Supabase Auth.

Migrasi data:

- `scripts/seed.mjs` — script sekali jalan: baca 5 file JSON di `data/` dan insert ke
  Supabase memakai service_role key. Folder `data/` dipertahankan sebagai backup.

Prinsip kompatibilitas:

- Bentuk data yang dikembalikan getter ke komponen UI dijaga **sama** dengan
  sekarang, sehingga komponen render publik (`HomeClient`, halaman berita, dll)
  tidak perlu banyak diubah.

## Out of Scope (YAGNI)

- Self-signup / manajemen user dari UI admin (akun dibuat manual di Dashboard).
- Normalisasi penuh beranda/media menjadi tabel terpisah.
- Realtime / subscription.
- Audit log / versioning konten.
