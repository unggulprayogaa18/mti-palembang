import { ArrowRight } from "lucide-react";
import { schedule } from "../eastsData";

export const metadata = { title: "Programs" };

const programs = [
  {
    num: "01",
    title: "EASTS International Conference",
    dates: "September 1–3, 2025",
    venue: "GPH Haryo Mataram Auditorium & UNS Tower",
    desc: "The main conference event featuring keynote speeches from government ministers and global transport scholars, a high-level policy session, and two to four technical sessions per day with peer-reviewed paper presentations from participants across 19 EASTS countries and regions.",
    highlights: [
      "Keynote by Minister of Transportation — 'One Nation, Connected'",
      "High-Level Policy Session — Ballroom UNS Tower",
      "Technical paper sessions with 13 topic code categories",
      "Book Review Session (Day 3)",
      "Gala Dinner — Taman Balekambang (Day 1)",
      "Closing Ceremony & Farewell Dinner — Indraprasta Room, UNS Inn (Day 3)"
    ]
  },
  {
    num: "02",
    title: "MTI Expo",
    dates: "September 1–3, 2025",
    venue: "UNS Tower Exhibition Area",
    desc: "A concurrent exhibition running alongside the main conference, showcasing academic research products, services, and offerings from Indonesian universities, state-owned transportation enterprises, and local vendors. The Expo provides a platform for technology demonstration and networking.",
    highlights: [
      "Academic product showcases from leading universities",
      "State-owned enterprise transport technology exhibitions",
      "Local transport startup demonstrations",
      "Open to all conference participants"
    ]
  },
  {
    num: "03",
    title: "Field Trip / Technical Tour",
    dates: "September 4, 2025",
    venue: "Solo and surroundings",
    desc: "A dedicated field trip day combining technical visits to transport infrastructure and facilities in the greater Solo area with cultural exploration. Participants experience Indonesian transport systems firsthand while exploring the heritage of Central Java.",
    highlights: [
      "Technical visits to transport infrastructure facilities",
      "Cultural exploration of Solo and surrounding areas",
      "Networking in informal settings",
      "Optional extension to Yogyakarta"
    ]
  },
  {
    num: "04",
    title: "The 4th ECR Transport Forum 2025",
    dates: "Early Career Researchers",
    venue: "UNS Campus",
    desc: "A dedicated forum for early career researchers (ECRs) to present their work, receive feedback from senior scholars, and build professional networks within the EASTS community. The forum runs in parallel with the main conference program.",
    highlights: [
      "Paper presentations by doctoral students and early career academics",
      "Mentoring sessions with established EASTS scholars",
      "Networking dinner for ECR participants",
      "Best ECR Paper Award"
    ]
  }
];

export default function ProgramsPage() {
  return (
    <>
      <div className="eastsPageBanner">
        <div className="wideShell">
          <span className="eastsEyebrow">Programs</span>
          <h1>Four programs. Four days. One conference.</h1>
          <p>
            The 16th EASTS Conference offers a rich academic, policy, and cultural program from
            August 31 to September 4, 2025 in Surakarta.
          </p>
        </div>
      </div>

      <section className="eastsSection eastsAbout">
        <div className="wideShell">
          <div className="eastsSectionIntro">
            <span>Program Overview</span>
            <h2>Detailed program descriptions.</h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 28, marginTop: 28 }}>
            {programs.map((p) => (
              <div
                key={p.num}
                style={{
                  padding: "28px 32px", background: "#fff",
                  borderRadius: 18, border: "1px solid rgba(67,130,223,0.12)",
                  boxShadow: "0 2px 16px rgba(17,46,129,0.06)"
                }}
              >
                <div style={{ display: "flex", alignItems: "flex-start", gap: 20, marginBottom: 18 }}>
                  <div
                    style={{
                      width: 52, height: 52, borderRadius: 14, flexShrink: 0,
                      background: "linear-gradient(135deg, #1d4ed8, #7c3aed)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: "#fff", fontSize: 16, fontWeight: 900
                    }}
                  >
                    {p.num}
                  </div>
                  <div>
                    <h2 style={{ margin: "0 0 6px", fontSize: 20, fontWeight: 900, color: "#0d1a42", letterSpacing: "-0.02em" }}>
                      {p.title}
                    </h2>
                    <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
                      <span style={{ fontSize: 13, color: "#4382df", fontWeight: 800 }}>{p.dates}</span>
                      <span style={{ fontSize: 13, color: "#7079a0", fontWeight: 700 }}>📍 {p.venue}</span>
                    </div>
                  </div>
                </div>
                <p style={{ margin: "0 0 16px", fontSize: 15, color: "#4a5174", lineHeight: 1.8 }}>{p.desc}</p>
                <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
                  {p.highlights.map((h) => (
                    <li key={h} style={{ display: "flex", gap: 10, fontSize: 14, color: "#374170" }}>
                      <span style={{ color: "#4382df", fontWeight: 900, flexShrink: 0 }}>→</span>
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="eastsSection eastsRegSection">
        <div className="wideShell">
          <div className="eastsSectionIntro">
            <span>Conference Schedule</span>
            <h2>Day-by-day overview.</h2>
          </div>
          <div className="eastsScheduleGrid">
            {schedule.map((day) => (
              <div className="eastsScheduleDay" key={day.day} style={{ "--day-color": day.color }}>
                <div className="eastsScheduleDayHead">
                  <strong>{day.day}</strong>
                  <span>{day.label}</span>
                </div>
                <ul>
                  {day.sessions.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 12 }}>
            <a
              href="/easts/venue"
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "12px 24px", borderRadius: 10, background: "#fff",
                border: "1px solid rgba(67,130,223,0.2)", color: "#1d4ed8",
                fontSize: 14, fontWeight: 800, boxShadow: "0 2px 12px rgba(17,46,129,0.07)"
              }}
            >
              Full Venue &amp; Map <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
