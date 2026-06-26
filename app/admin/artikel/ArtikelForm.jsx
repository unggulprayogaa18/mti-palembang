'use client';

import React, { useState, useTransition } from 'react';
import { addArtikelItem, saveArtikelItem, deleteArtikelItem, toggleArtikelVisible } from '../actions';
import ImageUpload from '../components/ImageUpload';

export default function ArtikelForm({ artikel: initialArtikel }) {
  const [artikel, setArtikel] = useState(initialArtikel);
  const [isPending, startTransition] = useTransition();
  const [showAdd, setShowAdd] = useState(false);
  const [editId, setEditId] = useState(null);
  const [status, setStatus] = useState('');

  const saveStatus = () => {
    setStatus('Tersimpan!');
    setTimeout(() => setStatus(''), 2000);
  };

  const handleAdd = (e) => {
    e.preventDefault();
    startTransition(async () => {
      await addArtikelItem(new FormData(e.target));
      setShowAdd(false);
      saveStatus();
    });
  };

  const handleEdit = (e, id) => {
    e.preventDefault();
    startTransition(async () => {
      await saveArtikelItem(id, new FormData(e.target));
      setEditId(null);
      saveStatus();
    });
  };

  const handleDelete = (id) => {
    if (!confirm('Hapus artikel ini?')) return;
    startTransition(async () => {
      await deleteArtikelItem(id);
      setArtikel((prev) => prev.filter((a) => a.id !== id));
    });
  };

  const handleToggle = (id) => {
    startTransition(async () => {
      await toggleArtikelVisible(id);
      setArtikel((prev) =>
        prev.map((a) => (a.id === id ? { ...a, visible: !a.visible } : a))
      );
    });
  };

  return (
    <div>
      {status && <div className="adminAlert adminAlertSuccess">{status}</div>}

      <div style={{ marginBottom: 20 }}>
        <button
          className="adminBtn adminBtnPrimary"
          onClick={() => setShowAdd(!showAdd)}
        >
          {showAdd ? 'Batal' : '+ Tambah Artikel'}
        </button>
      </div>

      {showAdd && (
        <div className="adminCard" style={{ padding: '24px', marginBottom: 20 }}>
          <h3 style={{ margin: '0 0 16px' }}>Tambah Artikel Baru</h3>
          <form onSubmit={handleAdd} className="adminForm">
            <ArtikelFields item={null} />
            <div className="adminFormActions">
              <button type="submit" className="adminBtn adminBtnPrimary" disabled={isPending}>
                {isPending ? 'Menyimpan...' : 'Simpan'}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="adminCard">
        <table className="adminTable">
          <thead>
            <tr>
              <th>Judul</th>
              <th>Kategori</th>
              <th>Daerah</th>
              <th>Tanggal</th>
              <th>Status</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {artikel.map((item) => (
              <React.Fragment key={item.id}>
                <tr>
                  <td>{item.title}</td>
                  <td>{item.kategori}</td>
                  <td>{item.daerah}</td>
                  <td>{item.date}</td>
                  <td>
                    <button
                      className={`adminToggle ${item.visible ? 'adminToggleOn' : ''}`}
                      onClick={() => handleToggle(item.id)}
                      disabled={isPending}
                    >
                      {item.visible ? 'Tampil' : 'Tersembunyi'}
                    </button>
                  </td>
                  <td>
                    <div className="adminActionGroup">
                      <button
                        className="adminBtn adminBtnSmall adminBtnSecondary"
                        onClick={() => setEditId(editId === item.id ? null : item.id)}
                      >
                        {editId === item.id ? 'Tutup' : 'Edit'}
                      </button>
                      <button
                        className="adminBtn adminBtnSmall adminBtnDanger"
                        onClick={() => handleDelete(item.id)}
                        disabled={isPending}
                      >
                        Hapus
                      </button>
                    </div>
                  </td>
                </tr>
                {editId === item.id && (
                  <tr key={`edit-${item.id}`}>
                    <td colSpan={6} style={{ background: '#f8faff', padding: 20 }}>
                      <form onSubmit={(e) => handleEdit(e, item.id)} className="adminForm">
                        <ArtikelFields item={item} />
                        <div className="adminFormActions">
                          <button type="submit" className="adminBtn adminBtnPrimary" disabled={isPending}>
                            {isPending ? 'Menyimpan...' : 'Simpan'}
                          </button>
                        </div>
                      </form>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ArtikelFields({ item }) {
  const defaultKonten = item?.konten ? item.konten.join('\n\n') : '';
  return (
    <>
      <div className="adminFormRow">
        <div className="adminFormGroup">
          <label>Judul</label>
          <input name="title" defaultValue={item?.title || ''} required placeholder="Judul artikel" />
        </div>
        <div className="adminFormGroup">
          <label>Kategori</label>
          <select name="kategori" defaultValue={item?.kategori || 'Opini'}>
            <option value="Opini">Opini</option>
            <option value="Berita Wilayah">Berita Wilayah</option>
            <option value="Analisis">Analisis</option>
          </select>
        </div>
      </div>
      <div className="adminFormRow">
        <div className="adminFormGroup">
          <label>Daerah</label>
          <input name="daerah" defaultValue={item?.daerah || ''} placeholder="Lampung" />
        </div>
        <div className="adminFormGroup">
          <label>Tanggal</label>
          <input name="date" defaultValue={item?.date || ''} placeholder="15 Feb 2026" />
        </div>
      </div>
      <div className="adminFormGroup">
        <label>Ringkasan</label>
        <textarea name="ringkasan" defaultValue={item?.ringkasan || ''} rows={2} />
      </div>
      <div className="adminFormGroup">
        <label>Konten (pisahkan paragraf dengan baris kosong)</label>
        <textarea name="konten" defaultValue={defaultKonten} rows={6} />
      </div>
      <div className="adminFormGroup">
        <label>Gambar (upload atau tempel URL)</label>
        <ImageUpload name="gambar" defaultValue={item?.gambar || ''} />
      </div>
    </>
  );
}
