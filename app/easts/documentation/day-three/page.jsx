export const metadata = { title: "Documentation — Day Three" };

const dayThreeHighlights = [
  "Technical Session G: Public and Non-motorized Transportation",
  "Technical Session H: Highway Design and Maintenance",
  "Technical Session I: Road Traffic Engineering",
  "Technical Session J: Traffic Accident and Safety",
  "Book Review Session: Recent publications in Asian transport",
  "JTTRI Special Award presentation",
  "Best ECR Paper Award ceremony",
  "Closing Ceremony — Indraprasta Room, UNS Inn",
  "Farewell Dinner"
];

export default function DayThreePage() {
  return (
    <>
      <div className="eastsPageBanner">
        <div className="wideShell">
          <span className="eastsEyebrow">Documentation</span>
          <h1>Day Three — September 3, 2025</h1>
          <p>
            Four Technical Sessions, Book Review, Award Ceremony, Closing Ceremony,
            and Farewell Dinner.
          </p>
        </div>
      </div>

      <section className="eastsSection eastsAbout">
        <div className="wideShell">
          <div className="eastsSectionIntro">
            <span>Day Three Highlights</span>
            <h2>Program summary for September 3, 2025.</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 24, marginBottom: 36 }}>
            {dayThreeHighlights.map((h) => (
              <div key={h} style={{ display: "flex", gap: 10, padding: "12px 16px", background: "#fff", borderRadius: 10, border: "1px solid rgba(67,130,223,0.12)", fontSize: 14, color: "#374170", fontWeight: 600 }}>
                <span style={{ color: "#059669", fontWeight: 900 }}>→</span>{h}
              </div>
            ))}
          </div>

          <div className="eastsSectionIntro">
            <span>Photo Gallery</span>
            <h2>Documentation from Day Three.</h2>
          </div>
          <div className="eastsDayGallery">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="eastsDayThumb" style={{ background: `linear-gradient(${135 + i * 15}deg, #059669, #d97706)` }} />
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
