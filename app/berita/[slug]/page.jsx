import { notFound } from 'next/navigation';
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Clock,
  Search,
  Tag,
  UserRound
} from 'lucide-react';
import DialogNav from '../../components/DialogNav';
import { getBerita } from '../../../lib/cms';

const IMG = {
  logo: 'https://mti.or.id/wp-content/uploads/2023/01/cropped-cropped-MTI_LOGO_PNG-1-270x270.png'
};

export async function generateStaticParams() {
  const berita = await getBerita();
  return berita.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const berita = await getBerita();
  const article = berita.find((item) => item.slug === slug);

  if (!article) {
    return { title: 'Berita Tidak Ditemukan | MTI' };
  }

  return {
    title: `${article.title} | MTI`,
    description: article.excerpt
  };
}

export default async function NewsDetailPage({ params }) {
  const { slug } = await params;
  const berita = await getBerita();
  const article = berita.find((item) => item.slug === slug);

  if (!article) {
    notFound();
  }

  const relatedArticles = berita
    .filter((item) => item.slug !== article.slug)
    .filter((item) => item.group === article.group || item.cat === article.cat)
    .slice(0, 3);

  return (
    <main className="newsDetailPage">
      <div className="topGradient" />

      <div className="utilityBar">
        <div className="wideShell utilityInner">
          <div className="utilityLeft">
            <span className="liveDot" />
            <strong>Berita MTI</strong>
            <span className="divider">.</span>
            <span>{article.detailDate}</span>
          </div>
          <div className="utilityRight">
            <span>secretariat@mti.or.id</span>
            <a href="https://www.linkedin.com/company/sinergi-mti/">LinkedIn</a>
            <a href="https://www.instagram.com/masyarakatransportasi/">Instagram</a>
            <a href="https://twitter.com/sinergi_mti">X</a>
            <strong>ID</strong>
            <span>EN</span>
          </div>
        </div>
      </div>

      <section className="masthead">
        <div className="wideShell mastheadInner">
          <div className="editionMeta">
            <span>DETAIL BERITA</span>
            <p>Masyarakat Transportasi Indonesia</p>
          </div>
          <a className="logoLockup" href="/#" aria-label="MTI home">
            <img src={IMG.logo} alt="MTI" />
            <span className="logoFallback">MTI</span>
            <span>
              <strong>MTI</strong>
              <small>Masyarakat Transportasi Indonesia</small>
            </span>
          </a>
          <div className="mastheadTools">
            <button className="iconButton" type="button" aria-label="Cari">
              <Search size={18} aria-hidden="true" />
            </button>
            <a className="subscribeButton desktopOnly" href="/#newsletter">
              Berlangganan
            </a>
          </div>
        </div>
      </section>

      <DialogNav activeItem="Kegiatan MTI" />

      <article className="newsDetailHero">
        <div className="wideShell newsDetailHeroInner">
          <a className="newsBackLink" href="/#berita">
            <ArrowLeft size={16} aria-hidden="true" />
            Kembali ke daftar berita
          </a>
          <div className="newsDetailMeta">
            <span>{article.cat}</span>
            <small>
              <CalendarDays size={14} aria-hidden="true" />
              {article.detailDate}
            </small>
            <small>
              <UserRound size={14} aria-hidden="true" />
              {article.author}
            </small>
            <small>
              <Clock size={14} aria-hidden="true" />
              {article.readTime}
            </small>
          </div>
          <h1>{article.title}</h1>
          <p>{article.excerpt}</p>
        </div>
      </article>

      <section className="wideShell newsDetailLayout">
        <article className="newsDetailArticle">
          <img className="newsDetailImage" src={article.img} alt="" />
          <div className="newsDetailBody">
            {(article.content || []).map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </article>

        <aside className="newsDetailSidebar" aria-label="Informasi berita">
          <section className="newsDetailPanel">
            <div className="newsDetailPanelTitle">
              <Tag size={18} aria-hidden="true" />
              <h2>Topik</h2>
            </div>
            <div className="newsDetailTopics">
              {(article.highlights || []).map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </section>

          {article.sourceUrl ? (
            <section className="newsDetailPanel source">
              <span>Sumber Artikel</span>
              <p>
                Halaman ini dibuat sebagai detail internal beranda. Tautan sumber asli tetap
                disimpan.
              </p>
              <a href={article.sourceUrl}>
                Buka sumber
                <ArrowRight size={15} aria-hidden="true" />
              </a>
            </section>
          ) : null}

          <section className="newsDetailPanel">
            <div className="newsDetailPanelTitle">
              <h2>Berita Terkait</h2>
            </div>
            <div className="newsRelatedList">
              {relatedArticles.map((item) => (
                <a href={item.href} key={item.slug}>
                  <img src={item.img} alt="" />
                  <span>
                    <small>{item.cat}</small>
                    <strong>{item.title}</strong>
                    <em>{item.date}</em>
                  </span>
                </a>
              ))}
            </div>
          </section>
        </aside>
      </section>

      <footer className="footer">
        <div className="wideShell footerGrid">
          <div>
            <div className="footerBrand">
              <img src={IMG.logo} alt="MTI" />
              <span>
                <strong>MTI</strong>
                <small>Masyarakat Transportasi Indonesia</small>
              </span>
            </div>
            <p>
              Organisasi profesi yang menghimpun pakar, akademisi, praktisi, dan birokrat untuk
              pembangunan transportasi nasional yang berkelanjutan.
            </p>
            <p className="address">
              Wisma Nugra Santana 13th Floor, Jl. Jend. Sudirman Kav 7-8, Karet Tengsin, Jakarta.
            </p>
          </div>
          <FooterLinks
            title="Kegiatan"
            items={['Dialog & Sinergi Kebijakan', 'MTI Dalam Berita', 'Jalan-Jalan']}
          />
          <FooterLinks
            title="Tentang"
            items={['Sejarah MTI', 'Struktur Organisasi', 'MTI Wilayah']}
          />
          <FooterLinks
            title="Program"
            items={['16th EASTS Conference', 'AKSES Nusantara', 'AKSES Utama']}
          />
        </div>
        <div className="footerBottom">
          <div className="wideShell">
            <span>Masyarakat Transportasi Indonesia &copy; 2026. All rights reserved.</span>
            <span>
              <a href="/">Beranda</a>
              <a href="mailto:secretariat@mti.or.id">Kontak</a>
            </span>
          </div>
        </div>
      </footer>
    </main>
  );
}

function FooterLinks({ title, items }) {
  return (
    <div className="footerLinks">
      <h3>{title}</h3>
      {items.map((item) => (
        <a href={footerHref(item)} key={item}>
          {item}
        </a>
      ))}
    </div>
  );
}

function footerHref(item) {
  if (item === 'Dialog & Sinergi Kebijakan') return '/dialog-kebijakan';
  if (item === 'MTI Dalam Berita') return '/mti-dalam-berita';
  if (item === 'Jalan-Jalan') return '/kegiatan-mti/jalan-jalan';
  if (item === '16th EASTS Conference') return '/easts';
  if (item === 'AKSES Nusantara') return '/#akses';
  return '#';
}
