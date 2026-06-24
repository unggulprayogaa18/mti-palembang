import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getMedia } from '../../../lib/cms';
import MediaForm from './MediaForm';

export const metadata = { title: 'Kelola Media - MTI CMS' };

async function requireAuth() {
  const cookieStore = await cookies();
  const auth = cookieStore.get('cms-auth');
  const password = process.env.ADMIN_PASSWORD || 'admin123';
  if (!auth || auth.value !== password) redirect('/admin/login');
}

export default async function AdminMediaPage() {
  await requireAuth();
  const media = await getMedia();

  return (
    <div>
      <div className="adminPageHeader">
        <div>
          <h1>Kelola Media</h1>
          <p>Video utama dan mini video</p>
        </div>
      </div>
      <MediaForm media={media} />
    </div>
  );
}
