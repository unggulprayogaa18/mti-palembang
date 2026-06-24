'use client';

import { useState, useTransition } from 'react';
import { saveBeranda } from '../actions';

const TABS = [
  { key: 'ticker', label: 'Ticker' },
  { key: 'leadStory', label: 'Lead Story' },
  { key: 'heroSide', label: 'Sorotan' },
  { key: 'regions', label: 'MTI Wilayah' },
  { key: 'akses', label: 'AKSES' }
];

export default function BerandaForm({ beranda }) {
  const [activeTab, setActiveTab] = useState('ticker');
  const [isPending, startTransition] = useTransition();
  const [ticker, setTicker] = useState(beranda.ticker || []);
  const [heroSide, setHeroSide] = useState(beranda.heroSide || []);
  const [regions, setRegions] = useState(beranda.regions || []);
  const [status, setStatus] = useState('');

  const save = (section, formData) => {
    startTransition(async () => {
      await saveBeranda(section, formData);
      setStatus('Tersimpan!');
      setTimeout(() => setStatus(''), 2000);
    });
  };

  const handleTickerSubmit = (e) => {
    e.preventDefault();
    save('ticker', new FormData(e.target));
  };

  const handleLeadSubmit = (e) => {
    e.preventDefault();
    save('leadStory', new FormData(e.target));
  };

  const handleHeroSideSubmit = (e) => {
    e.preventDefault();
    save('heroSide', new FormData(e.target));
  };

  const handleRegionsSubmit = (e) => {
    e.preventDefault();
    save('regions', new FormData(e.target));
  };

  const handleAksesSubmit = (e) => {
    e.preventDefault();
    save('akses', new FormData(e.target));
  };

  return (
    <div>
      {status && (
        <div className="adminAlert adminAlertSuccess">{status}</div>
      )}

      <div className="adminTabs">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            type="button"
            className={`adminTab ${activeTab === tab.key ? 'adminTabActive' : ''}`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'ticker' && (
        <div className="adminCard" style={{ padding: '24px' }}>
          <h3 style={{ margin: '0 0 16px' }}>Ticker Berita</h3>
          <form onSubmit={handleTickerSubmit} className="adminForm">
            {ticker.map((item, i) => (
              <div key={item.id || i} className="adminFormRow adminTickerRow">
                <input type="hidden" name="tickerId" value={item.id || ''} />
                <div className="adminFormGroup" style={{ flex: '0 0 140px' }}>
                  <label>Tag</label>
                  <input
                    name="tickerTag"
                    defaultValue={item.tag}
                    placeholder="KEBIJAKAN"
                  />
                </div>
                <div className="adminFormGroup" style={{ flex: 1 }}>
                  <label>Teks</label>
                  <input
                    name="tickerText"
                    defaultValue={item.text}
                    placeholder="Teks berita..."
                  />
                </div>
                <button
                  type="button"
                  className="adminBtn adminBtnSmall adminBtnDanger"
                  style={{ alignSelf: 'flex-end', marginBottom: 1 }}
                  onClick={() => setTicker(ticker.filter((_, idx) => idx !== i))}
                >
                  Hapus
                </button>
              </div>
            ))}
            <button
              type="button"
              className="adminBtn adminBtnSecondary"
              onClick={() => setTicker([...ticker, { id: Date.now().toString(), tag: '', text: '' }])}
            >
              + Tambah Item Ticker
            </button>
            <div className="adminFormActions">
              <button type="submit" className="adminBtn adminBtnPrimary" disabled={isPending}>
                {isPending ? 'Menyimpan...' : 'Simpan Ticker'}
              </button>
            </div>
          </form>
        </div>
      )}

      {activeTab === 'leadStory' && (
        <div className="adminCard" style={{ padding: '24px' }}>
          <h3 style={{ margin: '0 0 16px' }}>Lead Story (Berita Utama)</h3>
          <form onSubmit={handleLeadSubmit} className="adminForm">
            <div className="adminFormGroup">
              <label>URL Gambar</label>
              <input name="img" type="url" defaultValue={beranda.leadStory?.img || ''} placeholder="https://..." />
            </div>
            <div className="adminFormRow">
              <div className="adminFormGroup">
                <label>Kategori</label>
                <input name="cat" defaultValue={beranda.leadStory?.cat || ''} />
              </div>
              <div className="adminFormGroup">
                <label>Tanggal</label>
                <input name="date" defaultValue={beranda.leadStory?.date || ''} />
              </div>
            </div>
            <div className="adminFormGroup">
              <label>Judul</label>
              <input name="title" defaultValue={beranda.leadStory?.title || ''} />
            </div>
            <div className="adminFormGroup">
              <label>Excerpt</label>
              <textarea name="excerpt" defaultValue={beranda.leadStory?.excerpt || ''} rows={3} />
            </div>
            <div className="adminFormRow">
              <div className="adminFormGroup">
                <label>Penulis</label>
                <input name="author" defaultValue={beranda.leadStory?.author || ''} />
              </div>
              <div className="adminFormGroup">
                <label>Waktu Baca</label>
                <input name="readTime" defaultValue={beranda.leadStory?.readTime || ''} />
              </div>
            </div>
            <div className="adminFormGroup">
              <label>Link (href)</label>
              <input name="href" defaultValue={beranda.leadStory?.href || '#'} />
            </div>
            <div className="adminFormActions">
              <button type="submit" className="adminBtn adminBtnPrimary" disabled={isPending}>
                {isPending ? 'Menyimpan...' : 'Simpan Lead Story'}
              </button>
            </div>
          </form>
        </div>
      )}

      {activeTab === 'heroSide' && (
        <div className="adminCard" style={{ padding: '24px' }}>
          <h3 style={{ margin: '0 0 16px' }}>Sorotan (Hero Side Stories)</h3>
          <form onSubmit={handleHeroSideSubmit} className="adminForm">
            {heroSide.map((story, i) => (
              <div key={story.id || i} className="adminFormSection">
                <input type="hidden" name="sideId" value={story.id || ''} />
                <div className="adminFormSectionTitle">Sorotan {i + 1}</div>
                <div className="adminFormRow">
                  <div className="adminFormGroup">
                    <label>URL Gambar</label>
                    <input name="sideImg" type="url" defaultValue={story.img || ''} />
                  </div>
                  <div className="adminFormGroup">
                    <label>Kategori</label>
                    <input name="sideCat" defaultValue={story.cat || ''} />
                  </div>
                </div>
                <div className="adminFormRow">
                  <div className="adminFormGroup">
                    <label>Warna Tag (hex)</label>
                    <input name="sideColor" defaultValue={story.tagColor || '#4647ae'} />
                  </div>
                  <div className="adminFormGroup">
                    <label>Tanggal</label>
                    <input name="sideDate" defaultValue={story.date || ''} />
                  </div>
                </div>
                <div className="adminFormGroup">
                  <label>Judul</label>
                  <input name="sideTitle" defaultValue={story.title || ''} />
                </div>
                <div className="adminFormGroup">
                  <label>Link (href)</label>
                  <input name="sideHref" defaultValue={story.href || '#'} />
                </div>
              </div>
            ))}
            <div className="adminFormActions">
              <button type="submit" className="adminBtn adminBtnPrimary" disabled={isPending}>
                {isPending ? 'Menyimpan...' : 'Simpan Sorotan'}
              </button>
            </div>
          </form>
        </div>
      )}

      {activeTab === 'regions' && (
        <div className="adminCard" style={{ padding: '24px' }}>
          <h3 style={{ margin: '0 0 16px' }}>MTI Wilayah</h3>
          <form onSubmit={handleRegionsSubmit} className="adminForm">
            {regions.map((region, i) => (
              <div key={region.id || i} className="adminFormSection">
                <input type="hidden" name="regionId" value={region.id || ''} />
                <div className="adminFormSectionTitle">Wilayah {i + 1}</div>
                <div className="adminFormRow">
                  <div className="adminFormGroup" style={{ flex: '0 0 80px' }}>
                    <label>Nomor</label>
                    <input name="regionNum" defaultValue={region.num || String(i + 1).padStart(2, '0')} />
                  </div>
                  <div className="adminFormGroup">
                    <label>Tag</label>
                    <input name="regionTag" defaultValue={region.tag || ''} placeholder="Opini - Lampung" />
                  </div>
                  <div className="adminFormGroup">
                    <label>Tanggal</label>
                    <input name="regionDate" defaultValue={region.date || ''} />
                  </div>
                </div>
                <div className="adminFormGroup">
                  <label>Judul</label>
                  <input name="regionTitle" defaultValue={region.title || ''} />
                </div>
                <div className="adminFormGroup">
                  <label>Excerpt</label>
                  <textarea name="regionExcerpt" defaultValue={region.excerpt || ''} rows={2} />
                </div>
              </div>
            ))}
            <div className="adminFormActions">
              <button type="submit" className="adminBtn adminBtnPrimary" disabled={isPending}>
                {isPending ? 'Menyimpan...' : 'Simpan Wilayah'}
              </button>
            </div>
          </form>
        </div>
      )}

      {activeTab === 'akses' && (
        <div className="adminCard" style={{ padding: '24px' }}>
          <h3 style={{ margin: '0 0 16px' }}>Seksi AKSES Nusantara</h3>
          <form onSubmit={handleAksesSubmit} className="adminForm">
            <div className="adminFormRow">
              <div className="adminFormGroup">
                <label>Edisi</label>
                <input name="edition" defaultValue={beranda.akses?.edition || ''} placeholder="Edisi 36" />
              </div>
              <div className="adminFormGroup">
                <label>Tanggal</label>
                <input name="date" defaultValue={beranda.akses?.date || ''} placeholder="Maret 2026" />
              </div>
              <div className="adminFormGroup">
                <label>Topik</label>
                <input name="topic" defaultValue={beranda.akses?.topic || ''} placeholder="Transportasi Publik" />
              </div>
            </div>
            <div className="adminFormGroup">
              <label>Judul</label>
              <input name="title" defaultValue={beranda.akses?.title || ''} />
            </div>
            <div className="adminFormGroup">
              <label>Deskripsi</label>
              <textarea name="description" defaultValue={beranda.akses?.description || ''} rows={3} />
            </div>
            <div className="adminFormActions">
              <button type="submit" className="adminBtn adminBtnPrimary" disabled={isPending}>
                {isPending ? 'Menyimpan...' : 'Simpan AKSES'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
