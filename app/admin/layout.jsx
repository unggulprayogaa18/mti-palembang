import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { logout } from './actions';

async function getAuth() {
  const cookieStore = await cookies();
  const auth = cookieStore.get('cms-auth');
  const password = process.env.ADMIN_PASSWORD || 'admin123';
  return auth && auth.value === password;
}

export default async function AdminLayout({ children }) {
  const authed = await getAuth();

  return (
    <div className="adminWrap">
      {authed && (
        <aside className="adminSidebar">
          <div className="adminSidebarBrand">
            <strong>MTI CMS</strong>
            <small>Admin Panel</small>
          </div>
          <nav className="adminSidebarNav">
            <Link href="/admin" className="adminNavItem">Dashboard</Link>
            <Link href="/admin/beranda" className="adminNavItem">Beranda</Link>
            <Link href="/admin/berita" className="adminNavItem">Berita</Link>
            <Link href="/admin/media" className="adminNavItem">Media</Link>
            <Link href="/admin/jurnal" className="adminNavItem">Jurnal</Link>
            <Link href="/admin/artikel" className="adminNavItem">Artikel &amp; Opini</Link>
          </nav>
          <div className="adminSidebarFooter">
            <a href="/" className="adminNavItem" style={{ fontSize: 12, opacity: 0.7 }}>
              Lihat Website
            </a>
            <form action={logout}>
              <button type="submit" className="adminLogoutBtn">Keluar</button>
            </form>
          </div>
        </aside>
      )}
      <main className="adminMain">
        {children}
      </main>
    </div>
  );
}
