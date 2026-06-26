import { getBeranda } from '../../../lib/cms';
import BerandaForm from './BerandaForm';

export const metadata = { title: 'Edit Beranda - MTI CMS' };

export default async function AdminBerandaPage() {
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
