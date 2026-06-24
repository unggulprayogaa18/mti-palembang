import fs from 'fs/promises';
import path from 'path';

const DATA = path.join(process.cwd(), 'data');

async function readJSON(filename) {
  const filePath = path.join(DATA, filename);
  const raw = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(raw);
}

export async function getBerita() {
  return readJSON('berita.json');
}

export async function getBeranda() {
  return readJSON('beranda.json');
}

export async function getMedia() {
  return readJSON('media.json');
}

export async function getJurnal() {
  return readJSON('jurnal.json');
}

export async function getArtikel() {
  return readJSON('artikel.json');
}
