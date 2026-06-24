'use client';

import { useTransition } from 'react';
import { deleteBeritaItem, toggleBeritaPublished } from '../actions';

export function BeritaToggle({ id, published }) {
  const [isPending, startTransition] = useTransition();

  const handleToggle = () => {
    startTransition(async () => {
      await toggleBeritaPublished(id);
    });
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      disabled={isPending}
      className={`adminToggle ${published ? 'adminToggleOn' : ''}`}
      title={published ? 'Klik untuk jadikan Draft' : 'Klik untuk Publikasi'}
    >
      {isPending ? '...' : published ? 'Publik' : 'Draft'}
    </button>
  );
}

export function BeritaDelete({ id }) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (!confirm('Hapus berita ini?')) return;
    startTransition(async () => {
      await deleteBeritaItem(id);
    });
  };

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={isPending}
      className="adminBtn adminBtnSmall adminBtnDanger"
    >
      {isPending ? '...' : 'Hapus'}
    </button>
  );
}
