'use client';

import { useState, useTransition } from 'react';
import { saveMainVideo, saveMiniVideos, toggleMediaVisible, deleteMediaItem } from '../actions';

export default function MediaForm({ media }) {
  const [isPending, startTransition] = useTransition();
  const [miniVideos, setMiniVideos] = useState(media.miniVideos || []);
  const [status, setStatus] = useState('');

  const saveStatus = () => {
    setStatus('Tersimpan!');
    setTimeout(() => setStatus(''), 2000);
  };

  const handleMainSubmit = (e) => {
    e.preventDefault();
    startTransition(async () => {
      await saveMainVideo(new FormData(e.target));
      saveStatus();
    });
  };

  const handleMiniSubmit = (e) => {
    e.preventDefault();
    startTransition(async () => {
      await saveMiniVideos(new FormData(e.target));
      saveStatus();
    });
  };

  const handleToggle = (id) => {
    startTransition(async () => {
      await toggleMediaVisible(id);
      setMiniVideos((prev) =>
        prev.map((v) => (v.id === id ? { ...v, visible: !v.visible } : v))
      );
    });
  };

  const handleDelete = (id) => {
    if (!confirm('Hapus video ini?')) return;
    startTransition(async () => {
      await deleteMediaItem(id);
      setMiniVideos((prev) => prev.filter((v) => v.id !== id));
    });
  };

  return (
    <div>
      {status && <div className="adminAlert adminAlertSuccess">{status}</div>}

      <div className="adminCard" style={{ padding: '24px', marginBottom: 20 }}>
        <h3 style={{ margin: '0 0 16px' }}>Video Utama YouTube</h3>
        <form onSubmit={handleMainSubmit} className="adminForm">
          <div className="adminFormRow">
            <div className="adminFormGroup">
              <label>URL Embed YouTube</label>
              <input
                name="url"
                defaultValue={media.mainVideo?.url || ''}
                placeholder="https://www.youtube.com/embed/..."
              />
            </div>
            <div className="adminFormGroup">
              <label>Judul</label>
              <input
                name="title"
                defaultValue={media.mainVideo?.title || ''}
                placeholder="MTI di Media"
              />
            </div>
          </div>
          <div className="adminFormActions">
            <button type="submit" className="adminBtn adminBtnPrimary" disabled={isPending}>
              {isPending ? 'Menyimpan...' : 'Simpan Video Utama'}
            </button>
          </div>
        </form>
      </div>

      <div className="adminCard" style={{ padding: '24px' }}>
        <h3 style={{ margin: '0 0 16px' }}>Mini Video</h3>
        <form onSubmit={handleMiniSubmit} className="adminForm">
          {miniVideos.map((video, i) => (
            <div key={video.id || i} className="adminFormSection">
              <input type="hidden" name="videoId" value={video.id || ''} />
              <div className="adminFormRow">
                <div className="adminFormGroup">
                  <label>URL Thumbnail</label>
                  <input name="videoImg" type="url" defaultValue={video.img || ''} placeholder="https://..." />
                </div>
                <div className="adminFormGroup">
                  <label>Judul</label>
                  <input name="videoTitle" defaultValue={video.title || ''} />
                </div>
                <div className="adminFormGroup">
                  <label>Link (href)</label>
                  <input name="videoHref" defaultValue={video.href || '#'} />
                </div>
              </div>
              <div className="adminFormRow" style={{ alignItems: 'center', gap: 12 }}>
                {video.img && (
                  <img src={video.img} alt="" style={{ height: 50, borderRadius: 6, objectFit: 'cover' }} />
                )}
                <button
                  type="button"
                  className={`adminToggle ${video.visible ? 'adminToggleOn' : ''}`}
                  onClick={() => handleToggle(video.id)}
                >
                  {video.visible ? 'Tampil' : 'Tersembunyi'}
                </button>
                <button
                  type="button"
                  className="adminBtn adminBtnSmall adminBtnDanger"
                  onClick={() => handleDelete(video.id)}
                >
                  Hapus
                </button>
              </div>
            </div>
          ))}

          <button
            type="button"
            className="adminBtn adminBtnSecondary"
            onClick={() =>
              setMiniVideos([
                ...miniVideos,
                { id: Date.now().toString(), img: '', title: '', href: '#', visible: true }
              ])
            }
          >
            + Tambah Mini Video
          </button>

          <div className="adminFormActions">
            <button type="submit" className="adminBtn adminBtnPrimary" disabled={isPending}>
              {isPending ? 'Menyimpan...' : 'Simpan Mini Video'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
