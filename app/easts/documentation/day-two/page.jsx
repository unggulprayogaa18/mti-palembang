export const metadata = { title: "Documentation — Day Two" };

const dayTwoHighlights = [
  "High-Level Session: Green Technologies in Urban Transport",
  "Keynotes by Assoc. Prof. Makoto Chikaraishi & Prof. Tim Schwanen",
  "Technical Session C: Travel Demand Analysis and Forecast",
  "Technical Session D: Logistics and Freight Transportation",
  "Technical Session E: Regional Planning and Environment",
  "Side Event 1: ECR Mentoring Session",
  "Side Event 2: JTTRI Road Safety Forum",
  "Side Event 3: Women in Transport Research",
  "MTI Expo — Day 2"
];

export default function DayTwoPage() {
  return (
    <>
      <div className="eastsPageBanner">
        <div className="wideShell">
          <span className="eastsEyebrow">Documentation</span>
          <h1>Day Two — September 2, 2025</h1>
          <p>
            High-Level Sessions, Academic Keynotes, three Technical Sessions,
            and three specialized Side Events.
          </p>
        </div>
      </div>

      <section className="eastsSection eastsAbout">
        <div className="wideShell">
          <div className="eastsSectionIntro">
            <span>Day Two Highlights</span>
            <h2>Program summary for September 2, 2025.</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 24, marginBottom: 36 }}>
            {dayTwoHighlights.map((h) => (
              <div key={h} style={{ display: "flex", gap: 10, padding: "12px 16px", background: "#fff", borderRadius: 10, border: "1px solid rgba(67,130,223,0.12)", fontSize: 14, color: "#374170", fontWeight: 600 }}>
                <span style={{ color: "#0891b2", fontWeight: 900 }}>→</span>{h}
              </div>
            ))}
          </div>

          <div className="eastsSectionIntro">
            <span>Photo Gallery</span>
            <h2>Documentation from Day Two.</h2>
          </div>
          <div className="eastsDayGallery">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="eastsDayThumb" style={{ background: `linear-gradient(${135 + i * 15}deg, #0891b2, #059669)` }} />
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
