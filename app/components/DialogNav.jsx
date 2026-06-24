"use client";

import { ArrowRight, ChevronDown } from "lucide-react";
import { useState } from "react";

const NAV_ITEMS = [
  { label: "16th EASTS Conference", href: "/easts", badge: true },
  { label: "Beranda", href: "/" },
  {
    label: "Kegiatan MTI",
    href: "/dialog-kebijakan",
    children: [
      { label: "Dialog dan Sinergi Kebijakan", href: "/dialog-kebijakan" },
      { label: "MTI Dalam Berita", href: "/mti-dalam-berita" },
      { label: "Jalan-Jalan", href: "/mti-wilayah/jalan-jalan" }
    ]
  },
  {
    label: "Rekomendasi Kebijakan",
    href: "/opini",
    children: [
      { label: "Opini", href: "/opini" },
      { label: "AKSES Utama", href: "/aksesutama" }
    ]
  },
  { label: "AKSES Nusantara", href: "/aksesnusantara" },
  {
    label: "Tentang Kami",
    href: "/sejarah-mti",
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

function isItemActive(item, activeItem) {
  if (item.label === activeItem) return true;
  if (!item.children) return false;
  return item.children.some(
    (c) => c.label === activeItem || c.children?.some((s) => s.label === activeItem)
  );
}

export default function DialogNav({ activeItem }) {
  const [openIdx, setOpenIdx] = useState(null);
  const [openSubLabel, setOpenSubLabel] = useState(null);

  return (
    <header className="navStrip">
      <div className="wideShell navInner">
        <nav
          className="desktopNav dialogDesktopNav"
          aria-label="Navigasi utama"
          onMouseLeave={() => { setOpenIdx(null); setOpenSubLabel(null); }}
        >
          {NAV_ITEMS.map((item, idx) => (
            <div
              className="navItem"
              key={item.label}
              onMouseEnter={() => { setOpenIdx(idx); setOpenSubLabel(null); }}
            >
              <a className={isItemActive(item, activeItem) ? "active" : ""} href={item.href}>
                {item.badge ? <span className="navBadge" /> : null}
                {item.label}
                {item.children ? <ChevronDown size={12} aria-hidden="true" /> : null}
              </a>

              {item.children && openIdx === idx && (
                <div className="navDropdown">
                  {item.children.map((child) => (
                    <div
                      className="navDropItem"
                      key={child.label}
                      onMouseEnter={() => setOpenSubLabel(child.label)}
                    >
                      <a href={child.href || "#"}>
                        {child.label}
                        {child.children ? <ChevronDown size={11} aria-hidden="true" /> : null}
                      </a>
                      {child.children && openSubLabel === child.label && (
                        <div className="navSubDropdown">
                          {child.children.map((sub) => (
                            <a key={sub.label} href={sub.href || "#"}>
                              {sub.label}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        <a className="aksesLink desktopOnly" href="/aksesnusantara">
          AKSES Nusantara Edisi 36
          <ArrowRight size={14} aria-hidden="true" />
        </a>
      </div>
    </header>
  );
}
