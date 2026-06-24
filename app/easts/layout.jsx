import EASTSNav from "./EASTSNav";

export const metadata = {
  title: {
    template: "%s | EASTS 2025",
    default: "16th EASTS Conference 2025 | MTI"
  },
  description:
    "16th EASTS Conference 2025 at UNS Tower, Surakarta Indonesia. Theme: Harnessing Local Wisdom and Green Technologies for a Sustainable Future."
};

export default function EASTSLayout({ children }) {
  return (
    <div className="eastsPage">
      <EASTSNav />
      <main>{children}</main>
      <footer className="eastsFooter">
        <div className="wideShell">
          <div className="eastsFooterGrid">
            <div>
              <h4>16th EASTS Conference</h4>
              <p>Harnessing Local Wisdom and Green Technologies for a Sustainable Future</p>
              <p>September 1–4, 2025 · Surakarta, Indonesia</p>
              <small>
                Organized by Masyarakat Transportasi Indonesia (MTI) and Universitas Sebelas Maret
                (UNS)
              </small>
            </div>
            <div>
              <h4>Quick Links</h4>
              <ul>
                <li>
                  <a href="/easts/about">About EASTS</a>
                </li>
                <li>
                  <a href="/easts/keynote-speech">Keynote Speakers</a>
                </li>
                <li>
                  <a href="/easts/programs">Programs</a>
                </li>
                <li>
                  <a href="/easts/registration">Registration</a>
                </li>
                <li>
                  <a href="/easts/committee">Committee</a>
                </li>
                <li>
                  <a href="/easts/faq">FAQ</a>
                </li>
              </ul>
            </div>
            <div>
              <h4>Contact</h4>
              <p>ISC Chair: Prof. Saksith Chalermpong</p>
              <p>
                <a href="mailto:easts16_2025@mti.or.id">easts16_2025@mti.or.id</a>
              </p>
              <p>WhatsApp: (+62) 851 5672 3341</p>
              <p>Phone: 0271-646994 / 0271-646655</p>
            </div>
          </div>
          <div className="eastsFooterBottom">
            <span>
              Copyright &copy; 2025 DTIK UNS &middot; Masyarakat Transportasi Indonesia. All rights
              reserved.
            </span>
            <a href="/">&#8592; Back to MTI</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
