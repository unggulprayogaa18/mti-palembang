import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getJurnal } from '../../../lib/cms';
import JurnalForm from './JurnalForm';

export const metadata = { title: 'Kelola Jurnal - MTI CMS' };

async function requireAuth() {
  const cookieStore = await cookies();
  const auth = cookieStore.get('cms-auth');
  const password = process.env.ADMIN_PASSWORD || 'admin123';
  if (!auth || auth.value !== password) redirect('/admin/login');
}

export default async function AdminJurnalPage() {
  await requireAuth();
  const jurnal = await getJurnal();

  return (
    <div>
      <div className="adminPageHeader">
        <div>
          <h1>Kelola Jurnal AKSES</h1>
          <p>Daftar edisi jurnal AKSES Nusantara</p>
        </div>
      </div>
      <JurnalForm jurnal={jurnal} />
    </div>
  );
}
