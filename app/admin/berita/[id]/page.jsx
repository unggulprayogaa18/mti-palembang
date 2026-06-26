import { redirect } from 'next/navigation';
import Link from 'next/link';
import { getBerita } from '../../../../lib/cms';
import BeritaForm from './BeritaForm';

export const metadata = { title: 'Edit Berita - MTI CMS' };

export default async function EditBeritaPage({ params }) {
  const { id } = await params;

  let item = null;
  if (id !== 'baru') {
    const berita = await getBerita();
    item = berita.find((b) => b.id === id) || null;
    if (!item) redirect('/admin/berita');
  }

  return (
    <div>
      <div className="adminPageHeader">
        <div>
          <h1>{id === 'baru' ? 'Tambah Berita' : 'Edit Berita'}</h1>
          <p>{id === 'baru' ? 'Buat artikel berita baru' : `ID: ${id}`}</p>
        </div>
        <Link href="/admin/berita" className="adminBtn adminBtnSecondary">
          Kembali
        </Link>
      </div>

      <div className="adminCard" style={{ padding: '28px' }}>
        <BeritaForm item={item} id={id} />
      </div>
    </div>
  );
}
