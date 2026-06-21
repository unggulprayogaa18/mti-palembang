import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  Download,
  FileText,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Users
} from "lucide-react";
import eastsLogos from "../../assets/LOGO-LOGO-scaled.png";

export const metadata = {
  title: "16th EASTS Conference 2025 | MTI",
  description:
    "16th EASTS Conference 2025 at UNS Tower, Surakarta Indonesia, with invited speakers, paper submission, topic codes, important dates, and venue information."
};

const mainNav = [
  { label: "Theme", href: "#theme" },
  { label: "Programs", href: "#programs" },
  { label: "Venue and Schedule", href: "#venue" },
  { label: "Registration and Fee", href: "#important-dates" },
  { label: "Committee", href: "#committee" },
  { label: "About", href: "#about" },
  { label: "News", href: "#news" },
  { label: "The 4th ECR Transport Forum 2025", href: "#programs" },
  {
    label: "Discovering Solo",
    href: "#venue",
    children: ["Travel & Logistics", "City and Cultural Tours"]
  },
  { label: "JTTRI Special Award 2025", href: "#programs" },
  { label: "Frequently Asked Questions (FAQ)", href: "#contact" },
  { label: "EASTS 2025 Live Streaming", href: "#programs" },
  { label: "Keynote Speech", href: "#speakers" },
  { label: "Sponsor", href: "#partners" },
  { label: "Documentation", href: "#news" },
  { label: "Presentation File", href: "#paper-submission" }
];

const inPageNav = [
  { label: "About 16th EASTS", href: "#about" },
  { label: "Speakers", href: "#speakers" },
  { label: "Important Dates", href: "#important-dates" },
  { label: "Paper Submission", href: "#paper-submission" },
  { label: "Topic Codes", href: "#topic-codes" }
];

const speakers = [
  {
    name: "Prof. Yusak Octavius Susilo",
    affiliation: "BOKU University",
    image: "https://cdna.uns.ac.id/wp-content/uploads/sites/14/2025/03/yusak.png"
  },
  {
    name: "Prof. Ronghui Liu",
    affiliation: "University of Leeds",
    image: "https://cdna.uns.ac.id/wp-content/uploads/sites/14/2025/03/rong.png"
  },
  {
    name: "Assoc. Prof. Makoto Chikaraishi",
    affiliation: "Hiroshima University",
    image: "https://cdna.uns.ac.id/wp-content/uploads/sites/14/2025/03/mc.jpg"
  },
  {
    name: "Prof. Tim Schwanen",
    affiliation: "University of Oxford",
    image: "https://cdna.uns.ac.id/wp-content/uploads/sites/14/2025/03/schwanen.png"
  }
];

const reviewedPapers = [
  { date: "September 30, 2024", event: "Call for papers" },
  { date: "February 15, 2025", event: "Deadline for paper submission" },
  { date: "May 30, 2025", event: "Notification of review results for full papers" },
  { date: "July 9, 2025", event: "Deadline for revised paper submission" },
  { date: "July 23, 2025", event: "Deadline for registration for conference presentations" },
  { date: "September 1-4, 2025", event: "The 16th International Conference of EASTS" },
  {
    date: "November 5, 2025",
    event: "Notification of acceptance of revised paper for Journal of the EASTS"
  },
  { date: "November 27, 2025", event: "Publication of Proceedings of the EASTS" },
  { date: "December 27, 2025", event: "Publication of Journal of the EASTS" },
  {
    date: "January 31, 2026",
    event: "Expected Publication of ATS Vol. 11 (from both conference and general papers)"
  }
];

const nonReviewedPapers = [
  { date: "March 19, 2025", event: "Deadline for submission of one-page abstracts" },
  { date: "June 11, 2025", event: "Notification of acceptance of abstracts for presentations" },
  { date: "July 23, 2025", event: "Deadline for registration for conference presentations" },
  { date: "September 1-4, 2025", event: "The 16th International Conference of EASTS" }
];

const topicCodes = [
  ["A", "Transportation General"],
  ["B", "Transportation Economics and Policy"],
  ["C", "Travel Demand Analysis and Forecast"],
  ["D", "Logistics and Freight Transportation"],
  ["E", "Regional Planning and Environment"],
  ["F", "Environment and Climate Change"],
  ["G", "Public and Non-motorized Transportation"],
  ["H", "Highway Design and Maintenance"],
  ["I", "Road Traffic Engineering"],
  ["J", "Traffic Accident and Safety"],
  ["K", "Air and Water Transportation"],
  ["L", "Emerging Technology and New Transport Industry"],
  ["P", "Practical Themes"]
];

function DateTable({ title, description, rows, previousDeadlines }) {
  return (
    <article className="eastsDatePanel">
      <div className="eastsDatePanelHead">
        <span>{title}</span>
        <p>{description}</p>
      </div>
      <div className="eastsTableWrap">
        <table>
          <thead>
            <tr>
              <th>Tanggal</th>
              <th>Keterangan</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={`${title}-${row.date}`}>
                <td>{row.date}</td>
                <td>{row.event}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="eastsDeadlineNote">
        <strong>Catatan perubahan deadline</strong>
        <p>Deadline registrasi sebelumnya: {previousDeadlines.join(", ")}</p>
        <p>Deadline terbaru: July 23, 2025</p>
      </div>
    </article>
  );
}

export default function EASTSPage() {
  return (
    <main className="eastsPage">
      <header className="eastsHeader">
        <a className="eastsBrand" href="/">
          <span>EASTS 2025</span>
          <small>MTI x UNS</small>
        </a>
        <nav className="eastsMainNav" aria-label="16th EASTS Conference navigation">
          {mainNav.map((item) =>
            item.children ? (
              <div className="eastsNavGroup" key={item.label}>
                <a href={item.href}>{item.label}</a>
                <div className="eastsNavDropdown">
                  {item.children.map((child) => (
                    <a href={item.href} key={child}>
                      {child}
                    </a>
                  ))}
                </div>
              </div>
            ) : (
              <a href={item.href} key={item.label}>
                {item.label}
              </a>
            )
          )}
        </nav>
        <a className="eastsHeaderCta" href="#registration">
          Register
          <ArrowRight size={15} aria-hidden="true" />
        </a>
      </header>

      <section className="eastsHero" id="theme">
        <div className="eastsHeroMedia" aria-hidden="true">
          {speakers.map((speaker) => (
            <img src={speaker.image} alt="" key={speaker.name} />
          ))}
        </div>
        <span className="eastsHeroShade" />
        <div className="wideShell eastsHeroContent">
          <span className="eastsEyebrow">Eastern Asia Society for Transportation Studies</span>
          <h1>16th EASTS Conference 2025</h1>
          <p>
            Harnessing Local Wisdom and Green Technologies for a Sustainable Future in Eastern
            Asia's Transport Sector.
          </p>
          <div className="eastsHeroMeta">
            <span>
              <MapPin size={17} aria-hidden="true" />
              UNS Tower, Surakarta Indonesia
            </span>
            <span>
              <CalendarDays size={17} aria-hidden="true" />
              September 1 - 4, 2025
            </span>
          </div>
          <div className="eastsHeroActions" id="registration">
            <a href="#important-dates">
              Register
              <ArrowRight size={16} aria-hidden="true" />
            </a>
            <a href="#about">Let's Go</a>
            <a href="#paper-submission">Join This Event</a>
          </div>
          <div className="eastsHeroPartners">
            <strong>Sebelas Maret University</strong>
            <span>"Mangesthi Luhur Ambangun Nagara"</span>
            <span>In collaboration with The Chulalongkorn University Transportation Institute (CUTI)</span>
          </div>
        </div>
      </section>

      <nav className="eastsSubNav" aria-label="Conference content navigation">
        <div className="wideShell">
          {inPageNav.map((item) => (
            <a href={item.href} key={item.label}>
              {item.label}
            </a>
          ))}
        </div>
      </nav>

      <section className="wideShell eastsSection eastsAbout" id="about">
        <div className="eastsSectionIntro">
          <span>About 16th EASTS</span>
          <h2>Local wisdom, green technology, and transport policy meet in Surakarta.</h2>
        </div>
        <div className="eastsAboutGrid">
          <div className="eastsAboutCopy">
            <p>
              EASTS was established in November 1994 and represents 19 countries across Eastern
              Asia. The organization convenes a biennial international conference, with the previous
              edition held in Kuala Lumpur in 2023.
            </p>
            <p>
              The 2025 conference is held in Surakarta from September 1 - 4, 2025. It is organized
              by Masyarakat Transportasi Indonesia (MTI) and Universitas Negeri Sebelas Maret
              (UNS), with support from the City of Surakarta and BPSDM Ministry of Transportation.
            </p>
            <p>
              The conference theme combines local wisdom from Eastern Asian culture and tradition
              with advanced green technologies to build a more sustainable, inclusive, and
              environmentally responsible transport sector.
            </p>
          </div>
          <div className="eastsFacts" id="programs">
            <span>
              <strong>19</strong>
              Countries represented
            </span>
            <span>
              <strong>4</strong>
              Conference days
            </span>
            <span>
              <strong>2025</strong>
              Surakarta edition
            </span>
          </div>
        </div>
      </section>

      <section className="eastsSection eastsSpeakerBand" id="speakers">
        <div className="wideShell">
          <div className="eastsSectionIntro">
            <span>Invited Speakers</span>
            <h2>Global transport scholars joining the EASTS 2025 stage.</h2>
          </div>
          <div className="eastsSpeakerGrid">
            {speakers.map((speaker) => (
              <article className="eastsSpeaker" key={speaker.name}>
                <img src={speaker.image} alt={speaker.name} />
                <div>
                  <strong>{speaker.name}</strong>
                  <span>{speaker.affiliation}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="wideShell eastsSection eastsPartners" id="partners">
        <div className="eastsSectionIntro">
          <span>Organizers & Partners</span>
          <h2>Institutions supporting the 16th EASTS Conference 2025.</h2>
        </div>
        <div className="eastsLogoStrip">
          <img src={eastsLogos.src} alt="Organizer and partner logos for EASTS 2025" />
        </div>
      </section>

      <section className="eastsSection eastsDates" id="important-dates">
        <div className="wideShell">
          <div className="eastsSectionIntro">
            <span>Important Dates</span>
            <h2>Submission and publication timeline.</h2>
          </div>
          <div className="eastsDateGrid">
            <DateTable
              title="Reviewed Papers (Academic or Practical)"
              description="Peer reviews are fully done for journal publications."
              rows={reviewedPapers}
              previousDeadlines={["July 9, 2025", "July 16, 2025"]}
            />
            <DateTable
              title="Non-Reviewed Papers"
              description="Simple review for conference presentations."
              rows={nonReviewedPapers}
              previousDeadlines={["July 2, 2025", "July 16, 2025"]}
            />
          </div>
          <div className="eastsTableFootnote">
            <strong>NOTE:</strong> Submission of the revised papers (Reviewed Papers only) and
            registration of the conference before the deadline are requirements for including in the
            presentation program of the conference.
            <span>All dates are in 17:00 Bangkok Standard Time - UTC+08:00.</span>
          </div>
        </div>
      </section>

      <section className="wideShell eastsSection eastsSubmission" id="paper-submission">
        <div className="eastsSubmissionCopy">
          <div className="eastsSectionIntro">
            <span>Paper Submission</span>
            <h2>Prepare papers and presentations in English.</h2>
          </div>
          <p>
            Authors can download the paper template and submit their work through the EASTS
            Editorial Manager. Reviewed papers will be peer-reviewed for publication in Asian
            Transport Studies (ATS), Journal of the EASTS, or Proceedings of the EASTS in
            2025/2026.
          </p>
          <p>
            Non-reviewed papers receive a simple review for conference presentations and will be
            uploaded to the ISC website without inclusion in the main journals.
          </p>
          <a href="#">
            <Download size={16} aria-hidden="true" />
            Download Paper Template
          </a>
        </div>
        <div className="eastsSubmissionList">
          <span>
            <BookOpen size={18} aria-hidden="true" />
            Official language: English for papers and presentations.
          </span>
          <span>
            <FileText size={18} aria-hidden="true" />
            Reviewed papers target ATS, Journal of the EASTS, or Proceedings.
          </span>
          <span>
            <Users size={18} aria-hidden="true" />
            Non-reviewed papers are reviewed for presentation eligibility.
          </span>
        </div>
      </section>

      <section className="eastsSection eastsTopics" id="topic-codes">
        <div className="wideShell">
          <div className="eastsSectionIntro">
            <span>Topic Codes</span>
            <h2>Submission categories for EASTS 2025 papers.</h2>
          </div>
          <div className="eastsTopicGrid">
            {topicCodes.map(([code, label]) => (
              <div className="eastsTopic" key={code}>
                <strong>{code}</strong>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="wideShell eastsSection eastsVenue" id="venue">
        <div className="eastsVenueCopy" id="contact">
          <div className="eastsSectionIntro">
            <span>Contact, Venue & Footer</span>
            <h2>UNS Tower, Surakarta Indonesia.</h2>
          </div>
          <div className="eastsContactList">
            <span>
              <Mail size={18} aria-hidden="true" />
              Prof. Saksith Chalermpong, Chairperson of the EASTS ISC - easts16_2025@mti.or.id
            </span>
            <span>
              <MapPin size={18} aria-hidden="true" />
              Universitas Sebelas Maret, Jalan Ir. Sutami 36 Kentingan, Jebres, Surakarta, Jawa
              Tengah, Indonesia 57126.
            </span>
            <span>
              <Phone size={18} aria-hidden="true" />
              0271-646994 / 0271-646655
            </span>
            <span>
              <MessageCircle size={18} aria-hidden="true" />
              (+62) 851 5672 3341
            </span>
          </div>
        </div>
        <div className="eastsMap">
          <iframe
            title="UNS Tower map"
            src="https://www.google.com/maps?q=UNS%20Tower%20Surakarta&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>

      <footer className="eastsFooter" id="committee">
        <div className="wideShell">
          <span>Copyright (c) 2026 DTIK UNS. All rights reserved.</span>
          <a href="/">Back to MTI</a>
        </div>
      </footer>
    </main>
  );
}
