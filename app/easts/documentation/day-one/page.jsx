export const metadata = { title: "Documentation — Day One" };

const dayOneHighlights = [
  "Opening Ceremony at GPH Haryo Mataram Auditorium, UNS",
  "Special Keynote by Minister of Transportation Dudy Purwagandhi",
  "Academic Keynotes by Prof. Yusak Susilo and Prof. Ronghui Liu",
  "High-Level Policy Session — Ballroom UNS Tower",
  "Technical Session A: Transportation General",
  "Technical Session B: Transportation Economics and Policy",
  "MTI Expo opening and exhibitions",
  "Gala Dinner at Taman Balekambang"
];

export default function DayOnePage() {
  return (
    <>
      <div className="eastsPageBanner">
        <div className="wideShell">
          <span className="eastsEyebrow">Documentation</span>
          <h1>Day One — September 1, 2025</h1>
          <p>
            Opening Ceremony, Ministerial and Academic Keynotes, High-Level Policy Session,
            and Gala Dinner at Taman Balekambang.
          </p>
        </div>
      </div>

      <section className="eastsSection eastsAbout">
        <div className="wideShell">
          <div className="eastsSectionIntro">
            <span>Day One Highlights</span>
            <h2>Program summary for September 1, 2025.</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 24, marginBottom: 36 }}>
            {dayOneHighlights.map((h) => (
              <div key={h} style={{ display: "flex", gap: 10, padding: "12px 16px", background: "#fff", borderRadius: 10, border: "1px solid rgba(67,130,223,0.12)", fontSize: 14, color: "#374170", fontWeight: 600 }}>
                <span style={{ color: "#1d4ed8", fontWeight: 900 }}>→</span>{h}
              </div>
            ))}
          </div>

          <div className="eastsSectionIntro">
            <span>Photo Gallery</span>
            <h2>Documentation from Day One.</h2>
          </div>
          <div className="eastsDayGallery">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="eastsDayThumb" style={{ background: `linear-gradient(${135 + i * 15}deg, #1d4ed8, #7c3aed)` }} />
            ))}
          </div>
          <p style={{ marginTop: 16, fontSize: 13, color: "#7079a0", textAlign: "center" }}>
            Photo documentation will be published after the conference.
          </p>
        </div>
      </section>
    </>
  );
}
