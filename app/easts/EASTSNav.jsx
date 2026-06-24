"use client";
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";

const primaryNav = [
  { label: "Theme", href: "/easts/theme" },
  { label: "Programs", href: "/easts/programs" },
  { label: "Venue", href: "/easts/venue" },
  { label: "Registration", href: "/easts/registration" },
  { label: "Committee", href: "/easts/committee" },
  { label: "Keynote", href: "/easts/keynote-speech" },
  {
    label: "About",
    href: "/easts/about",
    children: [
      { label: "EASTS Organization", href: "/easts/about" },
      { label: "MTI", href: "/easts/about/mti" },
    ],
  },
];

const moreCategories = [
  {
    label: "Programme",
    items: [
      { label: "4th ECR Transport Forum", href: "/easts/ecr-forum" },
      { label: "JTTRI Special Award", href: "/easts/jttri-award" },
      { label: "Live Streaming", href: "/easts/live-streaming" },
    ],
  },
  {
    label: "Discover Solo",
    items: [
      { label: "Discovering Solo", href: "/easts/discovering-solo" },
      { label: "Travel & Logistics", href: "/easts/travel-logistics" },
      { label: "City & Cultural Tours", href: "/easts/city-cultural-tours" },
    ],
  },
  {
    label: "Resources",
    items: [
      { label: "News", href: "/easts/news" },
      { label: "FAQ", href: "/easts/faq" },
      { label: "Sponsor", href: "/easts/sponsor" },
      { label: "Documentation — Day 1", href: "/easts/documentation/day-one" },
      { label: "Documentation — Day 2", href: "/easts/documentation/day-two" },
      { label: "Documentation — Day 3", href: "/easts/documentation/day-three" },
      { label: "Presentation Files", href: "/easts/presentation-file" },
    ],
  },
];

const allMobileLinks = [
  ...primaryNav.flatMap((item) =>
    item.children
      ? [item, ...item.children.map((c) => ({ ...c, isChild: true }))]
      : [item]
  ),
  ...moreCategories.flatMap((cat) => cat.items),
];

function isActive(href, pathname) {
  if (href === "/easts") return pathname === "/easts";
  return pathname.startsWith(href);
}

function isMoreActive(pathname) {
  return moreCategories.some((cat) =>
    cat.items.some((item) => pathname.startsWith(item.href))
  );
}

export default function EASTSNav() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <header className="eastsHeader">
        <a className="eastsBrand" href="/easts">
          <img
            src="https://cdna.uns.ac.id/wp-content/uploads/sites/14/2025/03/eastslogo-3.png"
            alt="EASTS"
            className="eastsBrandLogo"
          />
          <div>
            <span>16th EASTS 2025</span>
            <small>Surakarta · Sep 1–4</small>
          </div>
        </a>

        <nav className="eastsMainNav" aria-label="EASTS Conference navigation">
          {primaryNav.map((item) =>
            item.children ? (
              <div className="eastsNavGroup" key={item.label}>
                <a
                  href={item.href}
                  className={isActive(item.href, pathname) ? "active" : ""}
                >
                  {item.label}
                  <ChevronDown size={11} aria-hidden="true" />
                </a>
                <div className="eastsNavDropdown">
                  {item.children.map((child) => (
                    <a
                      href={child.href}
                      key={child.label}
                      className={pathname === child.href ? "active" : ""}
                    >
                      {child.label}
                    </a>
                  ))}
                </div>
              </div>
            ) : (
              <a
                href={item.href}
                key={item.label}
                className={isActive(item.href, pathname) ? "active" : ""}
              >
                {item.label}
              </a>
            )
          )}

          {/* More — mega-menu */}
          <div className="eastsNavGroup eastsMoreGroup">
            <button
              className={`eastsMoreBtn${isMoreActive(pathname) ? " active" : ""}`}
              type="button"
            >
              More
              <ChevronDown size={11} aria-hidden="true" />
            </button>
            <div className="eastsMegaMenu">
              {moreCategories.map((cat) => (
                <div key={cat.label} className="eastsMegaMenuSection">
                  <h4>{cat.label}</h4>
                  {cat.items.map((item) => (
                    <a
                      href={item.href}
                      key={item.label}
                      className={pathname === item.href ? "active" : ""}
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </nav>

        <a className="eastsHeaderCta" href="/easts/registration">
          Register
          <ArrowRight size={14} aria-hidden="true" />
        </a>

        <button
          className="eastsMobileToggle"
          type="button"
          aria-label={mobileOpen ? "Tutup menu" : "Buka menu"}
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </header>

      {mobileOpen && (
        <div className="eastsMobileMenu">
          <a
            href="/easts/registration"
            className="eastsMobileRegisterBtn"
            onClick={() => setMobileOpen(false)}
          >
            Register Now
            <ArrowRight size={15} aria-hidden="true" />
          </a>
          <div className="eastsMobileLinks">
            {allMobileLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`eastsMobileLink${item.isChild ? " eastsMobileLinkChild" : ""}${isActive(item.href, pathname) ? " active" : ""}`}
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
