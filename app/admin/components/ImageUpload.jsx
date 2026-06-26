'use client';

import { useState } from 'react';
import { uploadImage } from '../actions';

export default function ImageUpload({ name, defaultValue = '' }) {
  const [url, setUrl] = useState(defaultValue);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setBusy(true);
    setErr('');
    const fd = new FormData();
    fd.append('file', file);
    const res = await uploadImage(fd);
    if (res?.error) {
      setErr('Upload gagal: ' + res.error);
      setBusy(false);
      return;
    }
    setUrl(res.url);
    setBusy(false);
  };

  return (
    <div className="adminUpload">
      <input type="hidden" name={name} value={url} />
      <input type="file" accept="image/*" onChange={handleFile} disabled={busy} />
      {busy && <small> Mengupload...</small>}
      {err && <div className="adminAlert adminAlertError">{err}</div>}
      {url && (
        <img
          src={url}
          alt="preview"
          style={{ display: 'block', maxWidth: 160, marginTop: 8, borderRadius: 6, objectFit: 'cover' }}
        />
      )}
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="atau tempel URL gambar"
        style={{ display: 'block', width: '100%', marginTop: 6 }}
      />
    </div>
  );
}
