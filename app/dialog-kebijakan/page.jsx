import {
  ArrowRight,
  CalendarDays,
  Download,
  Newspaper,
  Search,
  Sparkles
} from "lucide-react";
import DialogNav from "../components/DialogNav";

export const metadata = {
  title: "Dialog dan Sinergi Kebijakan | MTI",
  description:
    "Halaman Dialog dan Sinergi Kebijakan Masyarakat Transportasi Indonesia berisi artikel, agenda, dan publikasi kebijakan transportasi."
};

const IMG = {
  logo: "https://mti.or.id/wp-content/uploads/2023/01/cropped-cropped-MTI_LOGO_PNG-1-270x270.png",
  hero: "https://mti.or.id/wp-content/uploads/2023/07/Dialog-dan-Sinergi-2.jpg",
  mudik: "https://mti.or.id/wp-content/uploads/2026/03/jelang-mudik-lebaran-kendaraan-barang-berat-dibatasi-mulai-13-maret-1773223046236_169.jpeg",
  survey: "https://mti.or.id/wp-content/uploads/2026/03/WhatsApp-Image-2026-03-09-at-17.23.00.jpeg",
  rural: "https://mti.or.id/wp-content/uploads/2026/03/WhatsApp-Image-2026-02-23-at-14.57.51.jpeg",
  tod: "https://mti.or.id/wp-content/uploads/2025/11/1761963524570.jpg",
  odol: "https://mti.or.id/wp-content/uploads/2025/10/WhatsApp-Image-2025-10-31-at-20.42.11.jpeg",
  logistics: "https://mti.or.id/wp-content/uploads/2025/10/WhatsApp-Image-2025-10-30-at-14.20.48-1.jpeg",
  rail: "https://mti.or.id/wp-content/uploads/2025/09/WhatsApp-Image-2025-09-17-at-15.59.48.jpeg",
  akses36: "https://mti.or.id/wp-content/uploads/2026/04/36.jpg"
};


const ticker = [
  { tag: "KEBIJAKAN", text: "Menhub paparkan lima prioritas transportasi nasional di Kongres X MTI" },
  { tag: "MUDIK 2026", text: "MTI usul pembatasan angkutan barang dikurangi 50% jadi 7-8 hari" },
  { tag: "AGENDA", text: "16th EASTS Conference - sinergi MTI di kancah internasional" },
  { tag: "JURNAL", text: "AKSES Nusantara Edisi 36 Maret 2026 telah terbit" }
];

const articles = [
  {
    title: "MTI dan BKT Bahas Pro-Kontra Pembatasan Angkutan Barang pada Mudik 2026",
    date: "15 Maret 2026",
    tag: "Mudik 2026",
    image: IMG.mudik,
    href: "https://mti.or.id/mti-dan-bkt-bahas-pro-kontra-pembatasan-angkutan-barang-pada-mudik-2026/",
    excerpt:
      "Masyarakat Transportasi Indonesia melakukan pertemuan dengan pimpinan Badan Kebijakan Transportasi Kementerian Perhubungan untuk membahas keseimbangan arus mudik, keselamatan, dan rantai pasok logistik."
  },
  {
    title: "Mudik-Balik 2026: Mengantisipasi Risiko Kemacetan Lalu Lintas dan Kepadatan di Simpul Transportasi",
    date: "12 Maret 2026",
    tag: "Analisis",
    image: IMG.survey,
    href: "https://mti.or.id/mudik-balik-2026-mengantisipasi-risiko-kemacetan-lalu-lintas-dan-kepadatan-di-simpul-transportasi/",
    excerpt:
      "Merujuk hasil survei Badan Kebijakan Transportasi bersama beberapa pemangku kepentingan, MTI menyoroti mitigasi risiko kemacetan dan kepadatan simpul transportasi saat arus mudik dan balik."
  },
  {
    title: "Penguatan Transportasi Perdesaan, Keperintisan, dan Daerah Tertinggal",
    date: "30 Januari 2026",
    tag: "Konektivitas",
    image: IMG.rural,
    href: "https://mti.or.id/penguatan-transportasi-perdesaan-keperintisan-dan-daerah-tertinggal/",
    excerpt:
      "Ketimpangan konektivitas antara wilayah perkotaan dan perdesaan masih menjadi tantangan besar, terutama bagi daerah tertinggal yang membutuhkan layanan transportasi dasar."
  },
  {
    title: "Menata Kota dengan TOD: Wujudkan Transportasi Terintegrasi dan Ramah Publik",
    date: "2 November 2025",
    tag: "Perkotaan",
    image: IMG.tod,
    href: "https://mti.or.id/menata-kota-dengan-tod-wujudkan-transportasi-terintegrasi-dan-ramah-publik/",
    excerpt:
      "Perkembangan perkotaan yang pesat memunculkan tantangan kemacetan, inefisiensi layanan publik, dan tekanan mobilitas yang perlu dijawab melalui konsep transit oriented development."
  },
  {
    title: "Tantangan Transportasi Darat di Meja Direktorat Jenderal Perhubungan Darat",
    date: "31 Oktober 2025",
    tag: "Keselamatan",
    image: IMG.odol,
    href: "https://mti.or.id/tantangan-transportasi-darat-di-meja-direktorat-jenderal-perhubungan-darat-keselamatan-truk-odol-dan-angkutan-roda-dua-jadi-sorotan/",
    excerpt:
      "Isu keselamatan angkutan jalan, truk ODOL, dan angkutan roda dua menjadi sorotan dalam pembahasan strategis sektor transportasi darat bersama pemangku kebijakan."
  },
  {
    title: "MTI Dorong Reformasi Sistemik Penanganan ODOL dan Transformasi Logistik Nasional",
    date: "31 Oktober 2025",
    tag: "Logistik",
    image: IMG.logistics,
    href: "https://mti.or.id/mti-dorong-reformasi-sistemik-penanganan-odol-dan-transformasi-logistik-nasional/",
    excerpt:
      "Ketua Umum MTI Tory Damantoro menjadi salah satu pembicara dalam diskusi penanganan ODOL dan transformasi logistik nasional yang menuntut pembenahan lintas sektor."
  },
  {
    title: "Diskusi Forum Transportasi Jalan dan Perkeretaapian MTI dengan Dirjen Perkeretaapian dan Jajaran",
    date: "19 September 2025",
    tag: "Perkeretaapian",
    image: IMG.rail,
    href: "https://mti.or.id/diskusi-forum-transportasi-jalan-dan-perkeretaapian-mti-dengan-dirjen-perkeretaapian-dan-jajaran/",
    excerpt:
      "Sektor perkeretaapian Indonesia berkembang sangat dinamis dalam 15 tahun terakhir, membuka ruang dialog mengenai keselamatan, integrasi layanan, dan arah kebijakan."
  }
];

const aksesItems = [
  ["Akses Nusantara Edisi 36", "Maret 2026", "11 April 2026"],
  ["Akses Nusantara Edisi 35", "Februari 2026", "11 April 2026"],
  ["Akses Nusantara Edisi 34", "Januari 2026", "24 Februari 2026"],
  ["Akses Nusantara Edisi 33", "Desember 2025", "24 Februari 2026"],
  ["Akses Nusantara Edisi 32", "November 2025", "14 November 2025"],
  ["Akses Nusantara Edisi 31", "Oktober 2025", "14 November 2025"]
];

const focusAreas = ["Keselamatan", "Logistik", "Konektivitas Wilayah", "Transportasi Publik"];

export default function DialogKebijakanPage() {
  const [leadArticle, ...otherArticles] = articles;

  return (
    <main className="dialogPolicyPage">
      <div className="topGradient" />

      <div className="utilityBar">
        <div className="wideShell utilityInner">
          <div className="utilityLeft">
            <span className="liveDot" />
            <strong>Selasa, 23 Juni 2026</strong>
            <span className="divider">.</span>
            <span>15.11 WIB</span>
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
            <span>EDISI HARI INI</span>
            <p>Wisma Nugra Santana, Jakarta</p>
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

      <section className="tickerBand" aria-label="Berita terkini">
        <div className="tickerLabel">
          <span />
          TERKINI
        </div>
        <div className="tickerWindow">
          <div className="tickerTrack">
            {[...ticker, ...ticker].map((item, index) => (
              <span className="tickerItem" key={`${item.tag}-${index}`}>
                <strong>{item.tag}</strong>
                {item.text}
                <i />
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="dialogHero">
        <img src={IMG.hero} alt="" aria-hidden="true" />
        <span className="dialogHeroShade" />
        <div className="wideShell dialogHeroContent">
          <span className="dialogEyebrow">
            <Sparkles size={16} aria-hidden="true" />
            Dialog & Sinergi Kebijakan
          </span>
          <h1>Dialog dan Sinergi Kebijakan MTI</h1>
          <p>
            Ruang kurasi dialog, rekomendasi, dan kolaborasi kebijakan transportasi nasional dari
            Masyarakat Transportasi Indonesia.
          </p>
          <div className="dialogHeroStats" aria-label="Ringkasan halaman">
            <span>
              <strong>7</strong>
              Artikel pilihan
            </span>
            <span>
              <strong>2025-2026</strong>
              Arsip kebijakan
            </span>
            <span>
              <strong>4</strong>
              Fokus isu
            </span>
          </div>
        </div>
      </section>

      <section className="wideShell dialogIntroStrip" aria-label="Fokus isu dialog">
        {focusAreas.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </section>

      <section className="wideShell dialogContentGrid">
        <div className="dialogFeed">
          <div className="dialogSectionHead">
            <span>
              <Newspaper size={18} aria-hidden="true" />
              Artikel Terkini
            </span>
            <h2>Agenda dialog dan catatan kebijakan.</h2>
          </div>

          <article className="dialogLeadArticle">
            <a href={leadArticle.href}>
              <div className="dialogLeadImage">
                <img src={leadArticle.image} alt="" />
                <span>{leadArticle.tag}</span>
              </div>
              <div className="dialogLeadCopy">
                <small>
                  <CalendarDays size={14} aria-hidden="true" />
                  {leadArticle.date}
                </small>
                <h3>{leadArticle.title}</h3>
                <p>{leadArticle.excerpt}</p>
                <strong>
                  Baca Selengkapnya
                  <ArrowRight size={15} aria-hidden="true" />
                </strong>
              </div>
            </a>
          </article>

          <div className="dialogArticleList">
            {otherArticles.map((article) => (
              <article className="dialogArticle" key={article.title}>
                <a href={article.href}>
                  <img src={article.image} alt="" />
                  <div>
                    <span>{article.tag}</span>
                    <h3>{article.title}</h3>
                    <p>{article.excerpt}</p>
                    <small>
                      {article.date}
                      <ArrowRight size={14} aria-hidden="true" />
                    </small>
                  </div>
                </a>
              </article>
            ))}
          </div>
        </div>

        <aside className="dialogSidebar" aria-label="Publikasi dan informasi MTI">
          <section className="dialogSidePanel highlight">
            <img src={IMG.akses36} alt="Akses Nusantara Edisi 36" />
            <div>
              <span>Publikasi</span>
              <h2>Unduh AKSES Nusantara</h2>
              <p>Publikasi berkala MTI untuk mengikuti isu transportasi nasional dan wilayah.</p>
            </div>
          </section>

          <section className="dialogSidePanel">
            <div className="dialogSideTitle">
              <Download size={18} aria-hidden="true" />
              <h2>Arsip AKSES</h2>
            </div>
            <div className="aksesDownloadList">
              {aksesItems.map(([title, edition, date]) => (
                <a href="/aksesnusantara" key={`${title}-${edition}`}>
                  <span>
                    <strong>{title}</strong>
                    <small>{edition}</small>
                  </span>
                  <em>{date}</em>
                </a>
              ))}
            </div>
          </section>

          <section className="dialogSidePanel contact">
            <span>Sinergi MTI</span>
            <h2>Terhubung dengan sekretariat MTI.</h2>
            <p>
              Untuk agenda dialog, kolaborasi kebijakan, dan publikasi, hubungi sekretariat MTI.
            </p>
            <a href="mailto:secretariat@mti.or.id">
              secretariat@mti.or.id
              <ArrowRight size={15} aria-hidden="true" />
            </a>
          </section>
        </aside>
      </section>

      <section className="dialogPolicyBand">
        <div className="wideShell dialogPolicyBandInner">
          <div>
            <span>Policy Radar</span>
            <h2>Dialog kebijakan yang dibaca sebagai rangkaian isu, bukan potongan acara.</h2>
          </div>
          <p>
            Dari mudik, ODOL, transportasi perdesaan, TOD, sampai perkeretaapian, halaman ini
            merangkum percakapan kebijakan agar pembaca cepat menangkap konteks dan tindak lanjut.
          </p>
        </div>
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
            items={["Dialog & Sinergi Kebijakan", "MTI Dalam Berita", "Jalan-Jalan", "Rekomendasi Kebijakan"]}
          />
          <FooterLinks title="Tentang" items={["Sejarah MTI", "Struktur Organisasi", "MTI Wilayah", "Identitas Organisasi"]} />
          <FooterLinks title="Program" items={["16th EASTS Conference", "AKSES Nusantara", "AKSES Utama", "Opini"]} />
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
  if (item === "Dialog & Sinergi Kebijakan") return "/dialog-kebijakan";
  if (item === "MTI Dalam Berita") return "/mti-dalam-berita";
  if (item === "Jalan-Jalan") return "/kegiatan-mti/jalan-jalan";
  if (item === "16th EASTS Conference") return "/easts";
  if (item === "AKSES Nusantara") return "/aksesnusantara";
  if (item === "AKSES Utama") return "/aksesutama";
  if (item === "Opini") return "/opini";
  if (item === "Sejarah MTI") return "/sejarah-mti";
  if (item === "Struktur Organisasi") return "/struktur-organisasi";
  return "#";
}
