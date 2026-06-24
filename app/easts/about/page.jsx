export const metadata = { title: "About EASTS" };

const members = [
  "China", "Chinese Taipei", "Hong Kong", "Indonesia", "Japan", "Korea",
  "Macau", "Malaysia", "Mongolia", "Myanmar", "Philippines", "Singapore",
  "Thailand", "Vietnam", "Cambodia", "Laos", "Brunei", "India", "Sri Lanka"
];

const previousConferences = [
  { num: "15th", year: "2023", city: "Hanoi, Vietnam" },
  { num: "14th", year: "2021", city: "Bangkok, Thailand (Online)" },
  { num: "13th", year: "2019", city: "Colombo, Sri Lanka" },
  { num: "12th", year: "2017", city: "Ho Chi Minh City, Vietnam" },
  { num: "11th", year: "2015", city: "Cebu, Philippines" },
  { num: "10th", year: "2013", city: "Taipei, Chinese Taipei" }
];

export default function AboutPage() {
  return (
    <>
      <div className="eastsPageBanner">
        <div className="wideShell">
          <span className="eastsEyebrow">About</span>
          <h1>Eastern Asia Society for Transportation Studies</h1>
          <p>
            Founded in 1994, EASTS connects transport researchers and practitioners across
            19 countries and regions through biennial international conferences.
          </p>
        </div>
      </div>

      <section className="eastsSection eastsAbout">
        <div className="wideShell">
          <div className="eastsSectionIntro">
            <span>About EASTS</span>
            <h2>Advancing transport knowledge across Eastern Asia since 1994.</h2>
          </div>
          <div className="eastsAboutGrid">
            <div className="eastsAboutCopy">
              <p>
                The Eastern Asia Society for Transportation Studies (EASTS) was founded in November
                1994 with the mission to promote excellence in transportation research and practice
                while fostering the exchange of knowledge and expertise across Eastern Asian countries
                and regions.
              </p>
              <p>
                EASTS serves as the premier academic platform for transport researchers, policy
                makers, and industry professionals across the region. Its biennial international
                conference rotates between member countries and regions, providing opportunities
                for cross-cultural exchange and collaborative research.
              </p>
              <p>
                The society publishes the <em>Asian Transport Studies</em> (ATS) journal and the
                <em> Journal of the Eastern Asia Society for Transportation Studies</em> (JEASTS),
                which are indexed in leading academic databases.
              </p>
              <p>
                The 16th EASTS International Conference 2025 in Surakarta marks the first time
                Indonesia has hosted the event — a milestone reflecting the growth of Indonesian
                transport scholarship within the EASTS community.
              </p>
            </div>
            <div className="eastsFacts">
              <span><strong>1994</strong>Year founded</span>
              <span><strong>19</strong>Member countries &amp; regions</span>
              <span><strong>Biennial</strong>Conference cycle</span>
              <span><strong>2</strong>Academic journals</span>
            </div>
          </div>
        </div>
      </section>

      <section className="eastsSection eastsRegSection">
        <div className="wideShell">
          <div className="eastsSectionIntro">
            <span>Member Countries &amp; Regions</span>
            <h2>19 countries and regions united by transport research.</h2>
          </div>
          <div className="eastsTopicGrid" style={{ marginTop: 28 }}>
            {members.map((m, i) => (
              <div
                key={m}
                style={{
                  padding: "12px 16px", background: "#fff",
                  borderRadius: 10, border: "1px solid rgba(67,130,223,0.12)",
                  display: "flex", alignItems: "center", gap: 10,
                  fontSize: 14, fontWeight: 700, color: "#374170",
                  boxShadow: "0 1px 6px rgba(17,46,129,0.04)"
                }}
              >
                <span
                  style={{
                    width: 28, height: 28, borderRadius: 7,
                    background: "linear-gradient(135deg, #1d4ed8, #7c3aed)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "#fff", fontSize: 11, fontWeight: 900, flexShrink: 0
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                {m}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="eastsSection eastsAbout">
        <div className="wideShell">
          <div className="eastsSectionIntro">
            <span>Previous Conferences</span>
            <h2>A legacy of biennial international gatherings.</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14, marginTop: 28 }}>
            {previousConferences.map((c) => (
              <div
                key={c.num}
                style={{
                  padding: "20px", background: "#fff",
                  borderRadius: 12, border: "1px solid rgba(67,130,223,0.12)",
                  boxShadow: "0 1px 8px rgba(17,46,129,0.04)"
                }}
              >
                <div style={{ fontSize: 12, fontWeight: 900, color: "#7079a0", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>{c.num} EASTS</div>
                <div style={{ fontSize: 20, fontWeight: 900, color: "#0d1a42", letterSpacing: "-0.02em" }}>{c.year}</div>
                <div style={{ fontSize: 14, color: "#4a5174", marginTop: 4 }}>{c.city}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
