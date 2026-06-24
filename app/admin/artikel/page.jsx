import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getArtikel } from '../../../lib/cms';
import ArtikelForm from './ArtikelForm';

export const metadata = { title: 'Kelola Artikel - MTI CMS' };

async function requireAuth() {
  const cookieStore = await cookies();
  const auth = cookieStore.get('cms-auth');
  const password = process.env.ADMIN_PASSWORD || 'admin123';
  if (!auth || auth.value !== password) redirect('/admin/login');
}

export default async function AdminArtikelPage() {
  await requireAuth();
  const artikel = await getArtikel();

  return (
    <div>
      <div className="adminPageHeader">
        <div>
          <h1>Kelola Artikel &amp; Opini</h1>
          <p>Daftar semua artikel dan opini</p>
        </div>
      </div>
      <ArtikelForm artikel={artikel} />
    </div>
  );
}
