import { getMedia } from '../../../lib/cms';
import MediaForm from './MediaForm';

export const metadata = { title: 'Kelola Media - MTI CMS' };

export default async function AdminMediaPage() {
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
