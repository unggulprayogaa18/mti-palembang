import { getArtikel } from '../../../lib/cms';
import ArtikelForm from './ArtikelForm';

export const metadata = { title: 'Kelola Artikel - MTI CMS' };

export default async function AdminArtikelPage() {
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
