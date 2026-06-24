import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { getBerita } from '../../../lib/cms';
import { BeritaToggle, BeritaDelete } from './BeritaActions';

export const metadata = { title: 'Kelola Berita - MTI CMS' };

async function requireAuth() {
  const cookieStore = await cookies();
  const auth = cookieStore.get('cms-auth');
  const password = process.env.ADMIN_PASSWORD || 'admin123';
  if (!auth || auth.value !== password) redirect('/admin/login');
}

export default async function AdminBeritaPage() {
  await requireAuth();
  const berita = await getBerita();

  return (
    <div>
      <div className="adminPageHeader">
        <div>
          <h1>Kelola Berita</h1>
          <p>Daftar semua artikel berita</p>
        </div>
        <Link href="/admin/berita/baru" className="adminBtn adminBtnPrimary">
          + Tambah Berita
        </Link>
      </div>

      <div className="adminCard">
        <table className="adminTable">
          <thead>
            <tr>
              <th style={{ width: 70 }}>Gambar</th>
              <th>Judul</th>
              <th>Kategori</th>
              <th>Tanggal</th>
              <th>Status</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {berita.map((item) => (
              <tr key={item.id}>
                <td>
                  {item.img ? (
                    <img
                      src={item.img}
                      alt=""
                      style={{ width: 60, height: 45, objectFit: 'cover', borderRadius: 6 }}
                    />
                  ) : (
                    <div style={{ width: 60, height: 45, background: '#f0f2f8', borderRadius: 6 }} />
                  )}
                </td>
                <td>
                  <Link href={`/admin/berita/${item.id}`} className="adminTableLink">
                    {item.title}
                  </Link>
                </td>
                <td>{item.cat}</td>
                <td>{item.date}</td>
                <td>
                  <BeritaToggle id={item.id} published={item.published} />
                </td>
                <td>
                  <div className="adminActionGroup">
                    <Link
                      href={`/admin/berita/${item.id}`}
                      className="adminBtn adminBtnSmall adminBtnSecondary"
                    >
                      Edit
                    </Link>
                    <BeritaDelete id={item.id} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
