import { getJurnal } from '../../../lib/cms';
import JurnalForm from './JurnalForm';

export const metadata = { title: 'Kelola Jurnal - MTI CMS' };

export default async function AdminJurnalPage() {
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
