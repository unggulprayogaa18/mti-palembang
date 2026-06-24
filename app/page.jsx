"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  Check,
  ChevronDown,
  Menu,
  Play,
  Search,
  X
} from "lucide-react";
import aksesBanner from "../assets/Banner-AKSES.jpg";
import newsletterOverlay from "../assets/Banner-AKSES 2.png";
import { homeNews } from "./berita/news-data";

const IMG = {
  logo: "https://mti.or.id/wp-content/uploads/2023/01/cropped-cropped-MTI_LOGO_PNG-1-270x270.png",
  menhub: "https://mti.or.id/wp-content/uploads/2025/11/WhatsApp-Image-2025-11-15-at-15.20.45.jpeg",
  jasa: "https://mti.or.id/wp-content/uploads/2026/03/WhatsApp-Image-2026-03-11-at-20.25.20-scaled.jpeg",
  bkt: "https://mti.or.id/wp-content/uploads/2026/03/jelang-mudik-lebaran-kendaraan-barang-berat-dibatasi-mulai-13-maret-1773223046236_169.jpeg",
  media1: "https://mti.or.id/wp-content/uploads/2023/07/Screenshot-2023-07-01-at-17.28.41.png",
  media2: "https://mti.or.id/wp-content/uploads/2023/07/Screenshot-2023-07-01-at-17.38.56.png"
};

const navItems = [
  { label: "16th EASTS Conference", href: "/easts", badge: true },
  { label: "Beranda", href: "#", active: true },
  {
    label: "Kegiatan MTI",
    href: "#berita",
    children: [
      { label: "Dialog dan Sinergi Kebijakan", href: "/dialog-kebijakan" },
      { label: "MTI Dalam Berita", href: "/mti-dalam-berita" },
      { label: "Jalan-Jalan", href: "/kegiatan-mti/jalan-jalan" }
    ]
  },
  {
    label: "Rekomendasi Kebijakan",
    href: "#",
    children: [
      { label: "Opini", href: "/opini" },
      { label: "AKSES Utama", href: "/aksesutama" }
    ]
  },
  { label: "AKSES Nusantara", href: "/aksesnusantara" },
  {
    label: "Tentang Kami",
    href: "#tentang",
    children: [
      { label: "Sejarah MTI", href: "/sejarah-mti" },
      { label: "Struktur Organisasi", href: "/struktur-organisasi" },
      {
        label: "MTI Wilayah",
        href: "/struktur-mti-wilayah",
        children: [
          { label: "Struktur MTI Wilayah", href: "/struktur-mti-wilayah" },
          { label: "Kegiatan Wilayah", href: "/mti-wilayah/jalan-jalan" }
        ]
      },
      { label: "Identitas Organisasi", href: "/identitas-organisasi" }
    ]
  }
];

const ticker = [
  { tag: "KEBIJAKAN", text: "Menhub paparkan lima prioritas transportasi nasional di Kongres X MTI" },
  { tag: "MUDIK 2026", text: "MTI usul pembatasan angkutan barang dikurangi 50% jadi 7-8 hari" },
  { tag: "AGENDA", text: "16th EASTS Conference - sinergi MTI di kancah internasional" },
  { tag: "JURNAL", text: "AKSES Nusantara Edisi 36 Maret 2026 telah terbit" },
  { tag: "WILAYAH", text: "Pengukuhan pengurus MTI Wilayah Sumatera Utara" }
];

const allNews = homeNews;

const heroSide = [
  {
    img: IMG.jasa,
    cat: "Berita",
    tagColor: "#4647ae",
    title: "Jasa Raharja Kumpulkan Pakar Transportasi MTI Jelang Mudik",
    date: "18 Mar 2026"
  },
  {
    img: IMG.bkt,
    cat: "Dialog",
    tagColor: "#112e81",
    title: "MTI & BKT Bahas Pembatasan Angkutan Barang Mudik 2026",
    date: "15 Mar 2026"
  },
  {
    img: IMG.media2,
    cat: "Sinergi",
    tagColor: "#2e6fd0",
    title: "Sukses Gelar Konferensi EASTS 2025 di Surakarta",
    date: "2025"
  }
];

const regions = [
  {
    num: "01",
    tag: "Opini - Lampung",
    title: "Pengguna Transportasi Publik Bukan Warga Kelas Dua",
    date: "15 Feb 2026",
    excerpt: "Transportasi sudah selayaknya dianggap kebutuhan dasar wajib, di luar urusan tarif semata."
  },
  {
    num: "02",
    tag: "Wilayah - Lampung",
    title: "Terkait Penggunaan ETLE Handheld di Lampung",
    date: "5 Feb 2026",
    excerpt: "Penerapan ETLE Handheld perlu diiringi transparansi dan edukasi publik yang memadai."
  },
  {
    num: "03",
    tag: "Wilayah - Sumut",
    title: "Pengukuhan Pengurus MTI Wilayah Sumatera Utara",
    date: "3 Feb 2026",
    excerpt: "Ketua Umum MTI mengukuhkan pengurus MTI Wilayah Sumatera Utara."
  }
];

const signatureTags = ["Kegiatan MTI", "Dialog Kebijakan", "Kabar Wilayah", "Publikasi AKSES"];

const catStyles = {
  Berita: { bg: "#ececf9", color: "#4647ae" },
  Sinergi: { bg: "#e6f0fc", color: "#2e6fd0" },
  Dialog: { bg: "#e6eaf7", color: "#112e81" }
};

function formatDate(date) {
  return date.toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric"
  });
}

function formatTime(date) {
  return date.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit"
  });
}

export default function Home() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [openSubLabel, setOpenSubLabel] = useState(null);
  const [filter, setFilter] = useState("Semua");
  const [now, setNow] = useState(null);
  const [nlDone, setNlDone] = useState(false);
  const [nlName, setNlName] = useState("");
  const [nlEmail, setNlEmail] = useState("");
  const [subscriber, setSubscriber] = useState("rekan MTI");

  useEffect(() => {
    setNow(new Date());
    const clock = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(clock);
  }, []);

  const news = useMemo(() => {
    const filtered = filter === "Semua" ? allNews : allNews.filter((item) => item.group === filter);
    return filtered.map((item) => ({
      ...item,
      tagBg: catStyles[item.cat]?.bg || catStyles.Berita.bg,
      tagColor: catStyles[item.cat]?.color || catStyles.Berita.color
    }));
  }, [filter]);

  function handleNewsletter(event) {
    event.preventDefault();
    setSubscriber(nlName.trim() || "rekan MTI");
    setNlDone(true);
    setNlEmail("");
  }

  const dateText = now ? formatDate(now) : "Sabtu, 20 Juni 2026";
  const timeText = now ? formatTime(now) : "17.00";

  return (
    <main className="newsroom">
      <div className="topGradient" />

      <div className="utilityBar">
        <div className="wideShell utilityInner">
          <div className="utilityLeft">
            <span className="liveDot" />
            <strong>{dateText}</strong>
            <span className="divider">.</span>
            <span>{timeText} WIB</span>
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
          <a className="logoLockup" href="#" aria-label="MTI home">
            <img src={IMG.logo} alt="MTI" />
            <span className="logoFallback">MTI</span>
            <span>
              <strong>MTI</strong>
              <small>MASYARAKAT TRANSPORTASI INDONESIA</small>
            </span>
          </a>
          <div className="mastheadTools">
            <button className="iconButton" type="button" aria-label="Cari">
              <Search size={18} aria-hidden="true" />
            </button>
            <a className="subscribeButton desktopOnly" href="#newsletter">
              Berlangganan
            </a>
            <button
              className="iconButton mobileOnly"
              type="button"
              aria-label={mobileOpen ? "Tutup menu" : "Buka menu"}
              aria-expanded={mobileOpen}
              onClick={() => {
                setMobileOpen((value) => !value);
                setOpenDropdown(null);
              }}
            >
              {mobileOpen ? <X size={21} aria-hidden="true" /> : <Menu size={21} aria-hidden="true" />}
            </button>
          </div>
        </div>
      </section>

      <header className="navStrip">
        <div className="wideShell navInner">
          <nav className="desktopNav" aria-label="Navigasi utama" onMouseLeave={() => { setOpenDropdown(null); setOpenSubLabel(null); }}>
            {navItems.map((item, index) => (
              <div className="navItem" key={item.label} onMouseEnter={() => { setOpenDropdown(index); setOpenSubLabel(null); }}>
                <a className={item.active ? "active" : ""} href={item.href}>
                  {item.badge ? <span className="navBadge" /> : null}
                  {item.label}
                  {item.children ? <ChevronDown size={12} aria-hidden="true" /> : null}
                </a>
                {item.children && openDropdown === index ? (
                  <div className="dropdownPanel">
                    {item.children.map((child) => (
                      <div
                        className="navDropItem"
                        key={child.label || child}
                        onMouseEnter={() => setOpenSubLabel(child.label || child)}
                      >
                        <a href={child.href || "#"}>
                          <span />
                          {child.label || child}
                          {child.children ? <ChevronDown size={11} aria-hidden="true" /> : null}
                        </a>
                        {child.children && openSubLabel === (child.label || child) ? (
                          <div className="navSubDropdown">
                            {child.children.map((sub) => (
                              <a key={sub.label} href={sub.href || "#"}>{sub.label}</a>
                            ))}
                          </div>
                        ) : null}
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}
          </nav>
          <a className="aksesLink desktopOnly" href="/aksesnusantara">
            AKSES Nusantara Edisi 36
            <ArrowRight size={14} aria-hidden="true" />
          </a>
        </div>
        {mobileOpen ? (
          <nav className="mobileNav" aria-label="Navigasi mobile">
            {navItems.map((item, index) => (
              <div className="mobileNavGroup" key={item.label}>
                <button
                  type="button"
                  onClick={() => setOpenDropdown((value) => (value === index ? null : index))}
                >
                  {item.label}
                  {item.children ? <ChevronDown size={16} aria-hidden="true" /> : null}
                </button>
                {item.children && openDropdown === index ? (
                  <div className="mobileSubmenu">
                    {item.children.map((child) => (
                      <a href={child.href || "#"} key={child.label || child} onClick={() => setMobileOpen(false)}>
                        {child.label || child}
                      </a>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}
            <a className="mobileSubscribe" href="#newsletter" onClick={() => setMobileOpen(false)}>
              Berlangganan Newsletter
            </a>
          </nav>
        ) : null}
      </header>

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

      <section className="signatureSection" aria-label="Sorotan beranda MTI">
        <div className="wideShell signatureGrid">
          <div className="signatureCopy">
            <span className="signatureKicker">Sorotan Beranda</span>
            <h2>Kabar transportasi yang perlu diikuti.</h2>
            <p>
              Beranda MTI merangkum kegiatan, dialog kebijakan, kabar wilayah, dan publikasi
              agar pembaca cepat menemukan isu utama yang sedang dibahas.
            </p>
            <div className="signatureTags" aria-label="Fokus beranda">
              {signatureTags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </div>

          <div className="signatureBoard" aria-hidden="true">
            <div className="boardHeader">
              <img src={IMG.logo} alt="" />
              <span>
                <strong>Catatan Redaksi</strong>
                <small>Diperbarui berkala</small>
              </span>
            </div>
            <div className="deskPreview">
              <div className="deskPreviewMain">
                <span>Fokus pekan ini</span>
                <strong>Mudik, layanan publik, dan transportasi wilayah</strong>
                <p>Disusun dari agenda MTI, berita terbaru, dan masukan pengurus wilayah.</p>
              </div>
              <div className="deskPreviewRail">
                <span>Kegiatan</span>
                <span>Berita</span>
                <span>Wilayah</span>
                <span>Publikasi</span>
              </div>
            </div>
            <div className="issueStack">
              <span>
                <strong>01</strong>
                Dialog kebijakan dan rekomendasi
              </span>
              <span>
                <strong>02</strong>
                Kabar kegiatan MTI pusat dan wilayah
              </span>
              <span>
                <strong>03</strong>
                Publikasi AKSES Nusantara
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="wideShell aksesShowcase" id="akses">
        <div className="aksesSurface">
          <div className="aksesCopy">
            <span>AKSES Nusantara</span>
            <h2>Jurnal transportasi dengan tampilan editorial yang lebih kuat.</h2>
            <p>
              Area ini memakai aset AKSES resmi dengan background putih ber-grain halus, sehingga
              tetap bersih seperti newsroom tapi punya aksen visual khas MTI.
            </p>
            <div className="aksesMeta">
              <small>Edisi 36</small>
              <small>Maret 2026</small>
              <small>Transportasi Publik</small>
            </div>
            <a href="#newsletter">
              Ikuti update AKSES
              <ArrowRight size={15} aria-hidden="true" />
            </a>
          </div>
          <div className="aksesVisual">
            <img
              className="aksesEdition"
              src="/images/banner-akses-edisi-36.png"
              alt="AKSES Nusantara Edisi 36 Maret 2026"
            />
            <img
              className="aksesTransport"
              src="/images/banner-akses-transport.png"
              alt=""
              aria-hidden="true"
            />
          </div>
        </div>
      </section>

      <section className="wideShell heroGrid">
        <article className="leadStory riseCard">
          <a href="#" className="newsCard">
            <div className="leadImage">
              <img src={IMG.menhub} alt="Menhub membuka Kongres X MTI" />
              <span className="imageShade" />
              <span className="storyPill">Dialog & Kebijakan</span>
              <h1>Ada Lima Prioritas Transportasi, Menhub Ajak MTI Perkuat Sinergi</h1>
            </div>
            <div className="leadBody">
              <p>
                Menteri Perhubungan Dudy Purwagandhi resmi membuka Kongres X MTI di Batam,
                menegaskan MTI sebagai <em>think tank</em> independen yang menopang arah kebijakan
                transportasi nasional.
              </p>
              <div className="byline">
                <span className="authorAvatar" />
                <strong>Adjat Wiratma</strong>
                <i />
                <span>17 Nov 2025</span>
                <i />
                <span>3 menit baca</span>
              </div>
            </div>
          </a>
        </article>

        <aside className="sideStories riseCard">
          <div className="sideHeading">
            <span />
            <h2>Sorotan</h2>
          </div>
          {heroSide.map((story) => (
            <a className="sideStory" href="#" key={story.title}>
              <div>
                <img src={story.img} alt="" />
              </div>
              <span>
                <small style={{ color: story.tagColor }}>{story.cat}</small>
                <strong>{story.title}</strong>
                <em>{story.date}</em>
              </span>
            </a>
          ))}
          <a className="journalCard" href="/aksesnusantara">
            <small>Jurnal Berkala</small>
            <strong>
              AKSES Nusantara
              <br />
              Edisi 36 - Maret 2026
            </strong>
            <span>
              Baca Edisi Terbaru
              <ArrowRight size={15} aria-hidden="true" />
            </span>
          </a>
        </aside>
      </section>

      <section className="wideShell newsSection" id="berita">
        <div className="sectionHeader">
          <div className="titleLockup">
            <span />
            <h2>MTI Dalam Berita</h2>
          </div>
          <div className="filterGroup" aria-label="Filter berita">
            {["Semua", "Berita", "Sinergi"].map((item) => (
              <button
                className={filter === item ? "selected" : ""}
                type="button"
                key={item}
                onClick={() => setFilter(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="newsGrid">
          {news.map((item) => (
            <a className="articleCard riseCard" href={item.href} key={item.id}>
              <div className="articleImage">
                <img src={item.img} alt="" />
                <span style={{ background: item.tagBg, color: item.tagColor }}>{item.cat}</span>
              </div>
              <div className="articleBody">
                <h3>{item.title}</h3>
                <p>{item.excerpt}</p>
                <div>
                  <span>{item.date}</span>
                  <strong>
                    Selengkapnya
                    <ArrowRight size={13} aria-hidden="true" />
                  </strong>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="aksesFullBanner" aria-label="Banner AKSES Nusantara">
        <img src={aksesBanner.src} alt="AKSES Nusantara" />
      </section>

      <section className="regionalBand" id="tentang">
        <div className="wideShell">
          <div className="regionalHeader">
            <div className="titleLockup">
              <span />
              <div>
                <small>Opini & Suara Daerah</small>
                <h2>MTI Wilayah</h2>
              </div>
            </div>
            <a href="#">
              Semua Wilayah
              <ArrowRight size={15} aria-hidden="true" />
            </a>
          </div>
          <div className="regionGrid">
            {regions.map((region) => (
              <a className="regionItem" href="#" key={region.num}>
                <span>{region.num}</span>
                <div>
                  <small>{region.tag}</small>
                  <h3>{region.title}</h3>
                  <p>{region.excerpt}</p>
                  <em>{region.date}</em>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="wideShell mediaSection">
        <div className="sectionHeader single">
          <div className="titleLockup">
            <span />
            <h2>MTI di Media</h2>
          </div>
        </div>
        <div className="mediaGrid">
          <div className="videoFrame">
            <iframe
              src="https://www.youtube.com/embed/0_jL04tc3TY"
              title="MTI di Media"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          <div className="videoList">
            {[
              { img: IMG.media1, title: "Liputan Kegiatan MTI" },
              { img: IMG.media2, title: "Diskusi & Webinar Transportasi" }
            ].map((video) => (
              <a className="miniVideo" href="https://www.youtube.com/watch?v=0_jL04tc3TY" key={video.title}>
                <img src={video.img} alt="" />
                <span className="imageShade" />
                <i>
                  <Play size={16} fill="currentColor" aria-hidden="true" />
                </i>
                <strong>{video.title}</strong>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="newsletter" id="newsletter">
        <div className="newsletterTexture" />
        <img className="newsletterOverlay" src={newsletterOverlay.src} alt="" aria-hidden="true" />
        <div className="newsletterInner">
          <p>Sinergi Mewarnai Kemajuan Transportasi Indonesia</p>
          <h2>Berlangganan Newsletter MTI</h2>
          <span>Kabar kegiatan, rekomendasi kebijakan, dan jurnal AKSES Nusantara langsung ke email Anda.</span>
          {nlDone ? (
            <div className="successBox">
              <i>
                <Check size={16} aria-hidden="true" />
              </i>
              Terima kasih, {subscriber}. Anda berhasil berlangganan.
            </div>
          ) : (
            <form className="newsletterForm" onSubmit={handleNewsletter}>
              <input
                value={nlName}
                onChange={(event) => setNlName(event.target.value)}
                placeholder="Nama"
                aria-label="Nama"
              />
              <input
                value={nlEmail}
                onChange={(event) => setNlEmail(event.target.value)}
                type="email"
                placeholder="Email"
                aria-label="Email"
                required
              />
              <button type="submit">Subscribe</button>
            </form>
          )}
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
            <div className="socials">
              <a href="https://www.linkedin.com/company/sinergi-mti/" aria-label="LinkedIn">
                in
              </a>
              <a href="https://www.instagram.com/masyarakatransportasi/" aria-label="Instagram">
                IG
              </a>
              <a href="https://twitter.com/sinergi_mti" aria-label="X">
                X
              </a>
              <a href="https://www.facebook.com/groups/158206227226" aria-label="Facebook">
                f
              </a>
            </div>
          </div>
          <FooterLinks title="Kegiatan" items={["Dialog & Sinergi Kebijakan", "MTI Dalam Berita", "Jalan-Jalan", "Rekomendasi Kebijakan"]} />
          <FooterLinks title="Tentang" items={["Sejarah MTI", "Struktur Organisasi", "MTI Wilayah", "Identitas Organisasi"]} />
          <FooterLinks title="Program" items={["16th EASTS Conference", "AKSES Nusantara", "AKSES Utama", "Opini"]} />
        </div>
        <div className="footerBottom">
          <div className="wideShell">
            <span>Masyarakat Transportasi Indonesia &copy; {new Date().getFullYear()}. All rights reserved.</span>
            <span>
              <a href="#">Kebijakan Privasi</a>
              <a href="#">Kontak</a>
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
  return "#";
}
