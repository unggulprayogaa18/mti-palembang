import { topicCodes } from "../eastsData";

export const metadata = { title: "Theme" };

const pillars = [
  {
    num: "01",
    title: "Harnessing Local Wisdom",
    color: "#1d4ed8",
    desc: "Drawing on centuries of community knowledge in transport, mobility, and spatial planning unique to Eastern Asia. Local wisdom includes indigenous solutions, cultural practices, and place-specific transport behaviors that inform sustainable policy."
  },
  {
    num: "02",
    title: "Green Technologies",
    color: "#059669",
    desc: "Integrating electric vehicles, hydrogen propulsion, renewable energy-powered infrastructure, smart traffic systems, and low-carbon logistics into the transport networks of Eastern Asian cities and regions."
  },
  {
    num: "03",
    title: "Sustainable Future",
    color: "#7c3aed",
    desc: "Building transport systems that are economically viable, environmentally responsible, and socially equitable — systems that serve future generations without compromising the wellbeing of present ones."
  }
];

export default function ThemePage() {
  return (
    <>
      <div className="eastsPageBanner">
        <div className="wideShell">
          <span className="eastsEyebrow">Conference Theme</span>
          <h1>Harnessing Local Wisdom and Green Technologies for a Sustainable Future</h1>
          <p>
            The guiding theme of the 16th EASTS Conference bridges Eastern Asian cultural tradition
            with cutting-edge green transport innovation.
          </p>
        </div>
      </div>

      <section className="eastsSection eastsAbout">
        <div className="wideShell">
          <div className="eastsSectionIntro">
            <span>Theme Overview</span>
            <h2>Three pillars shaping transport in Eastern Asia.</h2>
          </div>
          <div className="eastsAboutGrid">
            <div className="eastsAboutCopy">
              <p>
                Transportation in Eastern Asia stands at a historic crossroads. Rapid urbanization,
                climate commitments, and technological breakthroughs present an unprecedented
                opportunity — and obligation — to reimagine how people and goods move.
              </p>
              <p>
                Surakarta (Solo), with its deep Javanese heritage and its position as a modern
                mid-size Indonesian city, provides an ideal setting to explore the interplay between
                tradition and innovation. The theme calls on researchers and practitioners to look
                inward — at their own societies — as well as outward, to global knowledge and
                technology.
              </p>
              <p>
                The conference invites contributions that challenge conventional assumptions,
                elevate community-based approaches, and propose actionable pathways toward greener,
                more inclusive transport systems across the 19 EASTS member countries and regions.
              </p>
            </div>
            <div className="eastsFacts">
              <span>
                <strong>19</strong>Countries &amp; regions represented
              </span>
              <span>
                <strong>13</strong>Topic code categories
              </span>
              <span>
                <strong>3</strong>Core theme pillars
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="eastsSection eastsRegSection">
        <div className="wideShell">
          <div className="eastsSectionIntro">
            <span>Three Pillars</span>
            <h2>The values driving EASTS 2025.</h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 20, marginTop: 28 }}>
            {pillars.map((p) => (
              <div
                key={p.num}
                style={{
                  display: "grid", gridTemplateColumns: "auto 1fr", gap: 24, padding: "28px 28px",
                  background: "#fff", borderRadius: 16, border: "1px solid rgba(67,130,223,0.12)",
                  boxShadow: "0 2px 16px rgba(17,46,129,0.06)"
                }}
              >
                <div
                  style={{
                    width: 56, height: 56, borderRadius: 14,
                    background: p.color, display: "flex", alignItems: "center", justifyContent: "center",
                    color: "#fff", fontSize: 18, fontWeight: 900, flexShrink: 0
                  }}
                >
                  {p.num}
                </div>
                <div>
                  <strong style={{ display: "block", fontSize: 18, fontWeight: 900, color: "#0d1a42", marginBottom: 10 }}>
                    {p.title}
                  </strong>
                  <p style={{ margin: 0, fontSize: 15, color: "#4a5174", lineHeight: 1.75 }}>{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="eastsSection eastsTopics">
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
    </>
  );
}
