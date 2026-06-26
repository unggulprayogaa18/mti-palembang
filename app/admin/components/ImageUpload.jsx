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
