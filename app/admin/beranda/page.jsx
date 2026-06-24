import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getBeranda } from '../../../lib/cms';
import BerandaForm from './BerandaForm';

export const metadata = { title: 'Edit Beranda - MTI CMS' };

async function requireAuth() {
  const cookieStore = await cookies();
  const auth = cookieStore.get('cms-auth');
  const password = process.env.ADMIN_PASSWORD || 'admin123';
  if (!auth || auth.value !== password) redirect('/admin/login');
}

export default async function AdminBerandaPage() {
  await requireAuth();
  const beranda = await getBeranda();

  return (
    <div>
      <div className="adminPageHeader">
        <div>
          <h1>Edit Beranda</h1>
          <p>Kelola konten halaman utama</p>
        </div>
      </div>
      <BerandaForm beranda={beranda} />
    </div>
  );
}
