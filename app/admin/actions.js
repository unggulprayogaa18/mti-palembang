'use server';

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

function slugify(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

// ── Auth ──────────────────────────────────────────────────────────────────────

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

// ── Berita ────────────────────────────────────────────────────────────────────

export async function saveBeritaItem(id, formData) {
  await checkAuth();
  const items = await readJSON('berita.json');
  const idx = items.findIndex((i) => i.id === id);
  if (idx === -1) return { error: 'Item tidak ditemukan.' };

  const title = formData.get('title') || items[idx].title;
  const updatedItem = {
    ...items[idx],
    title,
    slug: formData.get('slug') || slugify(title),
    cat: formData.get('cat') || items[idx].cat,
    group: formData.get('group') || items[idx].group,
    img: formData.get('img') || items[idx].img,
    date: formData.get('date') || items[idx].date,
    detailDate: formData.get('detailDate') || items[idx].detailDate,
    author: formData.get('author') || items[idx].author,
    readTime: formData.get('readTime') || items[idx].readTime,
    excerpt: formData.get('excerpt') || items[idx].excerpt,
    content: (formData.get('content') || '').split('\n\n').filter(Boolean),
    highlights: (formData.get('highlights') || '').split('\n').filter(Boolean),
    sourceUrl: formData.get('sourceUrl') || items[idx].sourceUrl || ''
  };
  updatedItem.href = `/berita/${updatedItem.slug}`;
  items[idx] = updatedItem;
  await writeJSON('berita.json', items);
  revalidatePath('/');
  revalidatePath('/mti-dalam-berita');
  revalidatePath(`/berita/${updatedItem.slug}`);
  redirect('/admin/berita');
}

export async function addBeritaItem(formData) {
  await checkAuth();
  const items = await readJSON('berita.json');
  const title = formData.get('title') || 'Judul Baru';
  const slug = formData.get('slug') || slugify(title);
  const newItem = {
    id: generateId(),
    slug,
    href: `/berita/${slug}`,
    cat: formData.get('cat') || 'Berita',
    group: formData.get('group') || 'Berita',
    img: formData.get('img') || '',
    title,
    date: formData.get('date') || '',
    detailDate: formData.get('detailDate') || '',
    author: formData.get('author') || 'Redaksi MTI',
    readTime: formData.get('readTime') || '3 menit baca',
    excerpt: formData.get('excerpt') || '',
    content: (formData.get('content') || '').split('\n\n').filter(Boolean),
    highlights: (formData.get('highlights') || '').split('\n').filter(Boolean),
    sourceUrl: formData.get('sourceUrl') || '',
    published: false
  };
  items.unshift(newItem);
  await writeJSON('berita.json', items);
  revalidatePath('/');
  revalidatePath('/mti-dalam-berita');
  redirect('/admin/berita');
}

export async function deleteBeritaItem(id) {
  await checkAuth();
  const items = await readJSON('berita.json');
  const filtered = items.filter((i) => i.id !== id);
  await writeJSON('berita.json', filtered);
  revalidatePath('/');
  revalidatePath('/mti-dalam-berita');
  revalidatePath('/admin/berita');
}

export async function toggleBeritaPublished(id) {
  await checkAuth();
  const items = await readJSON('berita.json');
  const idx = items.findIndex((i) => i.id === id);
  if (idx === -1) return;
  items[idx].published = !items[idx].published;
  await writeJSON('berita.json', items);
  revalidatePath('/');
  revalidatePath('/mti-dalam-berita');
  revalidatePath('/admin/berita');
}

// ── Beranda ───────────────────────────────────────────────────────────────────

export async function saveBeranda(section, formData) {
  await checkAuth();
  const beranda = await readJSON('beranda.json');

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

  await writeJSON('beranda.json', beranda);
  revalidatePath('/');
  revalidatePath('/admin/beranda');
}

// ── Media ─────────────────────────────────────────────────────────────────────

export async function saveMainVideo(formData) {
  await checkAuth();
  const media = await readJSON('media.json');
  media.mainVideo = {
    url: formData.get('url') || media.mainVideo.url,
    title: formData.get('title') || media.mainVideo.title
  };
  await writeJSON('media.json', media);
  revalidatePath('/');
  revalidatePath('/admin/media');
}

export async function saveMiniVideos(formData) {
  await checkAuth();
  const media = await readJSON('media.json');
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
  await writeJSON('media.json', media);
  revalidatePath('/');
  revalidatePath('/admin/media');
}

export async function toggleMediaVisible(id) {
  await checkAuth();
  const media = await readJSON('media.json');
  const idx = media.miniVideos.findIndex((v) => v.id === id);
  if (idx === -1) return;
  media.miniVideos[idx].visible = !media.miniVideos[idx].visible;
  await writeJSON('media.json', media);
  revalidatePath('/');
  revalidatePath('/admin/media');
}

export async function deleteMediaItem(id) {
  await checkAuth();
  const media = await readJSON('media.json');
  media.miniVideos = media.miniVideos.filter((v) => v.id !== id);
  await writeJSON('media.json', media);
  revalidatePath('/');
  revalidatePath('/admin/media');
}

// ── Jurnal ────────────────────────────────────────────────────────────────────

export async function saveJurnalItem(id, formData) {
  await checkAuth();
  const items = await readJSON('jurnal.json');
  const idx = items.findIndex((i) => i.id === id);
  if (idx === -1) return { error: 'Item tidak ditemukan.' };
  items[idx] = {
    ...items[idx],
    title: formData.get('title') || items[idx].title,
    edition: formData.get('edition') || items[idx].edition,
    date: formData.get('date') || items[idx].date,
    topic: formData.get('topic') || items[idx].topic,
    description: formData.get('description') || items[idx].description,
    cover: formData.get('cover') || items[idx].cover,
    downloadUrl: formData.get('downloadUrl') || items[idx].downloadUrl
  };
  await writeJSON('jurnal.json', items);
  revalidatePath('/');
  revalidatePath('/admin/jurnal');
}

export async function addJurnalItem(formData) {
  await checkAuth();
  const items = await readJSON('jurnal.json');
  const newItem = {
    id: generateId(),
    title: formData.get('title') || 'Jurnal Baru',
    edition: formData.get('edition') || '',
    date: formData.get('date') || '',
    topic: formData.get('topic') || '',
    description: formData.get('description') || '',
    cover: formData.get('cover') || '',
    downloadUrl: formData.get('downloadUrl') || '#',
    visible: true
  };
  items.unshift(newItem);
  await writeJSON('jurnal.json', items);
  revalidatePath('/');
  revalidatePath('/admin/jurnal');
}

export async function deleteJurnalItem(id) {
  await checkAuth();
  const items = await readJSON('jurnal.json');
  const filtered = items.filter((i) => i.id !== id);
  await writeJSON('jurnal.json', filtered);
  revalidatePath('/');
  revalidatePath('/admin/jurnal');
}

export async function toggleJurnalVisible(id) {
  await checkAuth();
  const items = await readJSON('jurnal.json');
  const idx = items.findIndex((i) => i.id === id);
  if (idx === -1) return;
  items[idx].visible = !items[idx].visible;
  await writeJSON('jurnal.json', items);
  revalidatePath('/');
  revalidatePath('/admin/jurnal');
}

// ── Artikel ───────────────────────────────────────────────────────────────────

export async function saveArtikelItem(id, formData) {
  await checkAuth();
  const items = await readJSON('artikel.json');
  const idx = items.findIndex((i) => i.id === id);
  if (idx === -1) return { error: 'Item tidak ditemukan.' };
  items[idx] = {
    ...items[idx],
    title: formData.get('title') || items[idx].title,
    kategori: formData.get('kategori') || items[idx].kategori,
    daerah: formData.get('daerah') || items[idx].daerah,
    date: formData.get('date') || items[idx].date,
    ringkasan: formData.get('ringkasan') || items[idx].ringkasan,
    konten: (formData.get('konten') || '').split('\n\n').filter(Boolean),
    gambar: formData.get('gambar') || items[idx].gambar
  };
  await writeJSON('artikel.json', items);
  revalidatePath('/');
  revalidatePath('/admin/artikel');
}

export async function addArtikelItem(formData) {
  await checkAuth();
  const items = await readJSON('artikel.json');
  const newItem = {
    id: generateId(),
    title: formData.get('title') || 'Artikel Baru',
    kategori: formData.get('kategori') || 'Opini',
    daerah: formData.get('daerah') || '',
    date: formData.get('date') || '',
    ringkasan: formData.get('ringkasan') || '',
    konten: (formData.get('konten') || '').split('\n\n').filter(Boolean),
    gambar: formData.get('gambar') || '',
    visible: false
  };
  items.unshift(newItem);
  await writeJSON('artikel.json', items);
  revalidatePath('/');
  revalidatePath('/admin/artikel');
}

export async function deleteArtikelItem(id) {
  await checkAuth();
  const items = await readJSON('artikel.json');
  const filtered = items.filter((i) => i.id !== id);
  await writeJSON('artikel.json', filtered);
  revalidatePath('/');
  revalidatePath('/admin/artikel');
}

export async function toggleArtikelVisible(id) {
  await checkAuth();
  const items = await readJSON('artikel.json');
  const idx = items.findIndex((i) => i.id === id);
  if (idx === -1) return;
  items[idx].visible = !items[idx].visible;
  await writeJSON('artikel.json', items);
  revalidatePath('/');
  revalidatePath('/admin/artikel');
}
