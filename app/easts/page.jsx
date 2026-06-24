import { ArrowRight, CalendarDays, Globe, MapPin } from "lucide-react";
import eastsLogos from "../../assets/LOGO-LOGO-scaled.png";
import { speakers, schedule, feeRows } from "./eastsData";

export const metadata = { title: "16th EASTS Conference 2025" };

const EASTS_LOGO = "https://cdna.uns.ac.id/wp-content/uploads/sites/14/2025/03/eastslogo-3.png";
const HERO_BG    = "https://cdna.uns.ac.id/wp-content/uploads/sites/14/2025/03/Slider-Web-UNS-1.png";

const colabLogos = [
  { src: "https://cdna.uns.ac.id/wp-content/uploads/sites/14/2025/05/cuti-1-300x180.jpg",                   alt: "CUTI — Chulalongkorn University" },
  { src: "https://cdna.uns.ac.id/wp-content/uploads/sites/14/2025/05/leeds-logo-300x97.png",                alt: "University of Leeds" },
  { src: "https://cdna.uns.ac.id/wp-content/uploads/sites/14/2025/05/logo-2024-web.png",                    alt: "BOKU University, Austria" },
  { src: "https://cdna.uns.ac.id/wp-content/uploads/sites/14/2025/05/University_of_Oxford.svg_-300x89.png", alt: "University of Oxford" },
];

const programs = [
  { n: "01", title: "EASTS International Conference", date: "Sep 1–3, 2025",        desc: "Keynote speeches, high-level sessions, and technical papers from 19 countries.", href: "/easts/programs" },
  { n: "02", title: "MTI Expo",                        date: "Sep 1–3, 2025",        desc: "Exhibition of academic products, services, and transport innovations.",            href: "/easts/programs" },
  { n: "03", title: "Field Trip / Technical Tour",     date: "Sep 4, 2025",          desc: "Technical visits and cultural exploration in Solo and surroundings.",              href: "/easts/city-cultural-tours" },
  { n: "04", title: "The 4th ECR Transport Forum",     date: "Early Career Researchers", desc: "A dedicated forum for early career researchers to present and network.",        href: "/easts/ecr-forum" },
];

export default function EASTSHomePage() {
  return (
    <>
      {/* ══ HERO ═════════════════════════════════════════════════════ */}
      <section className="eastsHero" id="home">
        <div
          className="eastsHeroBg"
          style={{ backgroundImage: `url('${HERO_BG}')` }}
          aria-hidden="true"
        />
        <span className="eastsHeroShade" aria-hidden="true" />

        <div className="wideShell eastsHeroContent">
          <img src={EASTS_LOGO} alt="EASTS 2025" className="eastsHeroLogo" />
          <p className="eastsHeroOrg">Eastern Asia Society for Transportation Studies</p>
          <h1>The 16th <em>EASTS</em> Conference 2025</h1>
          <p className="eastsHeroTheme">
            &ldquo;Harnessing Local Wisdom and Green Technologies for a Sustainable Future
            in Eastern Asia&apos;s Transport Sector&rdquo;
          </p>
          <div className="eastsHeroMeta">
            <span><MapPin size={14} aria-hidden="true" />UNS Tower, Surakarta, Indonesia</span>
            <span><CalendarDays size={14} aria-hidden="true" />September 1–4, 2025</span>
            <span><Globe size={14} aria-hidden="true" />19 Countries &amp; Regions</span>
          </div>
          <div className="eastsHeroActions">
            <a href="/easts/registration">
              Register Now <ArrowRight size={16} aria-hidden="true" />
            </a>
            <a href="/easts/programs">View Programs</a>
            <a href="/easts/about">About EASTS</a>
          </div>
        </div>

        {/* Keynote speaker cards — sit flush at hero bottom */}
        <div className="wideShell eastsHeroSpeakerStrip">
          {speakers.map((s) => (
            <a href="/easts/keynote-speech" className="eastsHeroSpeakerCard" key={s.name}>
              <img src={s.image} alt={s.name} />
              <div>
                <strong>{s.name}</strong>
                <span>{s.affiliation}</span>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* ══ COLLABORATION LOGOS ══════════════════════════════════════ */}
      <section className="eastsColabBar">
        <div className="wideShell">
          <p>In collaboration with</p>
          <div className="eastsColabLogos">
            {colabLogos.map((l) => (
              <img src={l.src} alt={l.alt} key={l.alt} />
            ))}
          </div>
        </div>
      </section>

      {/* ══ ABOUT ════════════════════════════════════════════════════ */}
      <section className="eastsSection eastsAbout" id="about">
        <div className="wideShell">
          <div className="eastsSectionIntro">
            <span>About the Conference</span>
            <h2>First-ever EASTS Conference in Indonesia — Surakarta, 2025.</h2>
          </div>
          <div className="eastsAboutGrid">
            <div className="eastsAboutCopy">
              <p>
                The Eastern Asia Society for Transportation Studies (EASTS), founded in 1994,
                promotes excellence in transportation research across 19 countries and regions.
                The 16th edition — the first ever hosted by Indonesia — takes place September
                1–4, 2025 at UNS Tower, Surakarta.
              </p>
              <p>
                Organized by Masyarakat Transportasi Indonesia (MTI) and Universitas Sebelas
                Maret (UNS), the conference brings together academics, practitioners, and
                policy makers to advance sustainable transport in Eastern Asia.
              </p>
              <a
                href="/easts/about"
                style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 14, fontWeight: 800, color: "#1d4ed8" }}
              >
                Learn more about EASTS <ArrowRight size={14} />
              </a>
            </div>
            <div className="eastsFacts">
              <span><strong>19</strong>Countries &amp; regions</span>
              <span><strong>Sep 1–4</strong>Surakarta 2025</span>
              <span><strong>1st</strong>Indonesia hosts EASTS</span>
              <span><strong>Since 1994</strong>Biennial conference</span>
            </div>
          </div>
        </div>
      </section>

      {/* ══ IMPORTANT DATES ══════════════════════════════════════════ */}
      <section className="eastsSection" style={{ background: "#f0f4ff" }}>
        <div className="wideShell">
          <div className="eastsSectionIntro">
            <span>Important Dates</span>
            <h2>Paper submission and registration deadlines.</h2>
          </div>
          <div className="eastsDateImgsGrid">
            <img
              src="https://cdna.uns.ac.id/wp-content/uploads/sites/14/2025/07/imdate1-1-1.jpg"
              alt="Important Dates — Reviewed Paper Submissions"
            />
            <img
              src="https://cdna.uns.ac.id/wp-content/uploads/sites/14/2025/07/imdate2-819x1024-2.jpg"
              alt="Important Dates — Registration Deadlines"
            />
          </div>
        </div>
      </section>

      {/* ══ PROGRAMS ═════════════════════════════════════════════════ */}
      <section className="wideShell eastsSection" id="programs">
        <div className="eastsSectionIntro">
          <span>Programs</span>
          <h2>Three core activities over four days in Surakarta.</h2>
        </div>
        <div className="eastsProgramGrid">
          {programs.map((p) => (
            <a href={p.href} key={p.n} className="eastsProgramCard" style={{ textDecoration: "none" }}>
              <span className="eastsProgramNum">{p.n}</span>
              <div>
                <strong>{p.title}</strong>
                <em>{p.date}</em>
                <p>{p.desc}</p>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* ══ SCHEDULE ═════════════════════════════════════════════════ */}
      <section className="eastsSection" style={{ background: "#f0f4ff" }}>
        <div className="wideShell">
          <div className="eastsSectionIntro">
            <span>Venue &amp; Schedule</span>
            <h2>Five days across UNS campus and the city of Solo.</h2>
          </div>
          <div className="eastsScheduleGrid">
            {schedule.map((day) => (
              <div
                className="eastsScheduleDay"
                key={day.day}
                style={{ "--day-color": day.color }}
              >
                <div className="eastsScheduleDayHead">
                  <strong>{day.day}</strong>
                  <span>{day.label}</span>
                </div>
                <ul>{day.sessions.map((s) => <li key={s}>{s}</li>)}</ul>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 8 }}>
            <a
              href="/easts/venue"
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "12px 24px", borderRadius: 10,
                background: "#fff", border: "1px solid rgba(67,130,223,0.2)",
                color: "#1d4ed8", fontSize: 14, fontWeight: 800,
                boxShadow: "0 2px 12px rgba(17,46,129,0.07)"
              }}
            >
              View Full Venue &amp; Schedule <ArrowRight size={15} />
            </a>
          </div>
        </div>
      </section>

      {/* ══ REGISTRATION SNAPSHOT ════════════════════════════════════ */}
      <section className="eastsSection eastsAbout">
        <div className="wideShell">
          <div className="eastsSectionIntro">
            <span>Registration &amp; Fee</span>
            <h2>Early bird rates available until July 31, 2025.</h2>
          </div>
          <div className="eastsRegGrid">
            <div className="eastsRegTable">
              <table>
                <thead>
                  <tr>
                    <th>Category</th>
                    <th>Early Bird<br /><em>until July 31</em></th>
                    <th>Normal Rate</th>
                  </tr>
                </thead>
                <tbody>
                  {feeRows.map((row) => (
                    <tr key={row.category}>
                      <td>{row.category}</td>
                      <td className="eastsFeeEarly">{row.earlyBird}</td>
                      <td className="eastsFeeNormal">{row.normal}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div
                style={{
                  padding: "24px", borderRadius: 14,
                  background: "linear-gradient(135deg, #1d4ed8, #7c3aed)",
                  color: "#fff"
                }}
              >
                <p style={{ margin: "0 0 8px", fontSize: 13, color: "rgba(255,255,255,0.7)", fontWeight: 700 }}>
                  Deadline approaching
                </p>
                <p style={{ margin: "0 0 16px", fontSize: 18, fontWeight: 900, lineHeight: 1.3 }}>
                  Early Bird Registration<br />closes July 31, 2025
                </p>
                <a
                  href="/easts/registration"
                  style={{
                    display: "inline-flex", alignItems: "center", gap: 8,
                    padding: "10px 20px", borderRadius: 8,
                    background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.25)",
                    color: "#fff", fontSize: 14, fontWeight: 800
                  }}
                >
                  Register Now <ArrowRight size={14} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ ORGANIZERS & PARTNERS ════════════════════════════════════ */}
      <section className="eastsSection" style={{ background: "#f0f4ff" }}>
        <div className="wideShell">
          <div className="eastsSectionIntro">
            <span>Organizers &amp; Partners</span>
            <h2>Institutions supporting the 16th EASTS Conference 2025.</h2>
          </div>
          <div className="eastsLogoStrip">
            <img src={eastsLogos.src} alt="Organizer and partner logos for EASTS 2025" />
          </div>
        </div>
      </section>
    </>
  );
}
