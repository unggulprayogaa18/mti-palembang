'use client';

import { useTransition } from 'react';
import { saveBeritaItem, addBeritaItem } from '../../actions';

export default function BeritaForm({ item, id }) {
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    startTransition(async () => {
      if (id === 'baru') {
        await addBeritaItem(formData);
      } else {
        await saveBeritaItem(id, formData);
      }
    });
  };

  const defaultContent = item?.content ? item.content.join('\n\n') : '';
  const defaultHighlights = item?.highlights ? item.highlights.join('\n') : '';

  return (
    <form onSubmit={handleSubmit} className="adminForm">
      <div className="adminFormRow">
        <div className="adminFormGroup">
          <label>Judul</label>
          <input name="title" defaultValue={item?.title || ''} required placeholder="Judul berita" />
        </div>
        <div className="adminFormGroup">
          <label>Slug (URL)</label>
          <input name="slug" defaultValue={item?.slug || ''} placeholder="otomatis dari judul" />
        </div>
      </div>

      <div className="adminFormRow">
        <div className="adminFormGroup">
          <label>Kategori</label>
          <select name="cat" defaultValue={item?.cat || 'Berita'}>
            <option value="Berita">Berita</option>
            <option value="Dialog">Dialog</option>
            <option value="Sinergi">Sinergi</option>
          </select>
        </div>
        <div className="adminFormGroup">
          <label>Group Filter</label>
          <select name="group" defaultValue={item?.group || 'Berita'}>
            <option value="Berita">Berita</option>
            <option value="Sinergi">Sinergi</option>
          </select>
        </div>
      </div>

      <div className="adminFormRow">
        <div className="adminFormGroup">
          <label>Tanggal (misal: 18 Mar 2026)</label>
          <input name="date" defaultValue={item?.date || ''} placeholder="18 Mar 2026" />
        </div>
        <div className="adminFormGroup">
          <label>Tanggal Detail (misal: 18 Maret 2026)</label>
          <input name="detailDate" defaultValue={item?.detailDate || ''} placeholder="18 Maret 2026" />
        </div>
      </div>

      <div className="adminFormRow">
        <div className="adminFormGroup">
          <label>Penulis</label>
          <input name="author" defaultValue={item?.author || 'Redaksi MTI'} />
        </div>
        <div className="adminFormGroup">
          <label>Waktu Baca</label>
          <input name="readTime" defaultValue={item?.readTime || '3 menit baca'} />
        </div>
      </div>

      <div className="adminFormGroup">
        <label>URL Gambar</label>
        <input name="img" type="url" defaultValue={item?.img || ''} placeholder="https://..." />
        {item?.img && (
          <img src={item.img} alt="" style={{ marginTop: 8, height: 80, borderRadius: 6, objectFit: 'cover' }} />
        )}
      </div>

      <div className="adminFormGroup">
        <label>Kutipan / Excerpt</label>
        <textarea name="excerpt" defaultValue={item?.excerpt || ''} rows={3} placeholder="Ringkasan singkat..." />
      </div>

      <div className="adminFormGroup">
        <label>Konten (pisahkan paragraf dengan baris kosong)</label>
        <textarea name="content" defaultValue={defaultContent} rows={10} placeholder="Paragraf 1&#10;&#10;Paragraf 2&#10;&#10;Paragraf 3" />
      </div>

      <div className="adminFormGroup">
        <label>Highlights / Topik (satu per baris)</label>
        <textarea name="highlights" defaultValue={defaultHighlights} rows={4} placeholder="Topik 1&#10;Topik 2" />
      </div>

      <div className="adminFormGroup">
        <label>URL Sumber</label>
        <input name="sourceUrl" type="url" defaultValue={item?.sourceUrl || ''} placeholder="https://mti.or.id/..." />
      </div>

      <div className="adminFormActions">
        <button type="submit" className="adminBtn adminBtnPrimary" disabled={isPending}>
          {isPending ? 'Menyimpan...' : 'Simpan Berita'}
        </button>
      </div>
    </form>
  );
}
