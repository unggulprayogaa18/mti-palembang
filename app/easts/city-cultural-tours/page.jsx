export const metadata = { title: "City and Cultural Tours" };

const tours = [
  {
    name: "Solo Royal Heritage Tour",
    duration: "4 hours",
    desc: "A guided tour of Solo's two royal palaces — Keraton Kasunanan Surakarta and Pura Mangkunegaran — with a traditional Javanese lunch at a royal-court-style restaurant.",
    includes: ["Keraton Kasunanan entrance and guided tour", "Pura Mangkunegaran palace tour", "Batik museum visit", "Traditional Javanese lunch"]
  },
  {
    name: "Batik Heritage Workshop",
    duration: "3 hours",
    desc: "An immersive hands-on experience in the historic Laweyan and Kauman batik kampung, where participants learn traditional canting wax-resist technique from master artisans.",
    includes: ["Guided walk through Laweyan historic district", "Hands-on batik canting workshop", "Take-home batik creation", "Batik gallery and market visit"]
  },
  {
    name: "Technical Transport Tour (Sep 4)",
    duration: "Full day",
    desc: "The official Field Trip on September 4, combining technical site visits to Solo's transport infrastructure — including the BST BRT control center and rail facilities — with cultural stops.",
    includes: ["BST BRT operations center visit", "Solo Balapan train station infrastructure", "Batik Solo Trans fleet depot", "Cultural visit to Loji Gandrung", "Lunch at local restaurant"]
  },
  {
    name: "Javanese Performing Arts Evening",
    duration: "Evening",
    desc: "An evening of traditional Javanese performing arts including Wayang Kulit shadow puppetry and Gamelan music at a heritage venue in the city center.",
    includes: ["Wayang Kulit performance (abridged)", "Gamelan music demonstration", "Traditional Javanese snacks", "Meet the artists session"]
  }
];

export default function CityToursPage() {
  return (
    <>
      <div className="eastsPageBanner">
        <div className="wideShell">
          <span className="eastsEyebrow">City &amp; Cultural Tours</span>
          <h1>Explore the cultural richness of Solo.</h1>
          <p>
            Optional tours and cultural experiences for EASTS 2025 participants —
            discovering Solo&apos;s royal heritage, batik arts, and performing traditions.
          </p>
        </div>
      </div>

      <section className="eastsSection eastsAbout">
        <div className="wideShell">
          <div className="eastsSectionIntro">
            <span>Available Tours</span>
            <h2>Curated experiences for conference participants.</h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 24, marginTop: 28 }}>
            {tours.map((tour, i) => (
              <div
                key={tour.name}
                style={{
                  padding: "28px 32px", background: "#fff",
                  borderRadius: 18, border: "1px solid rgba(67,130,223,0.12)",
                  boxShadow: "0 2px 16px rgba(17,46,129,0.06)"
                }}
              >
                <div style={{ display: "flex", alignItems: "flex-start", gap: 20, marginBottom: 16 }}>
                  <div
                    style={{
                      width: 44, height: 44, borderRadius: 12, flexShrink: 0,
                      background: ["#1d4ed8", "#059669", "#7c3aed", "#d97706"][i],
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: "#fff", fontSize: 14, fontWeight: 900
                    }}
                  >
                    T{i + 1}
                  </div>
                  <div>
                    <h2 style={{ margin: "0 0 4px", fontSize: 18, fontWeight: 900, color: "#0d1a42", letterSpacing: "-0.02em" }}>{tour.name}</h2>
                    <span style={{ fontSize: 13, color: "#4382df", fontWeight: 700 }}>Duration: {tour.duration}</span>
                  </div>
                </div>
                <p style={{ margin: "0 0 16px", fontSize: 15, color: "#4a5174", lineHeight: 1.75 }}>{tour.desc}</p>
                <div>
                  <p style={{ margin: "0 0 8px", fontSize: 12, fontWeight: 900, color: "#7079a0", textTransform: "uppercase", letterSpacing: "0.08em" }}>Includes</p>
                  <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 6 }}>
                    {tour.includes.map((inc) => (
                      <li key={inc} style={{ display: "flex", gap: 10, fontSize: 14, color: "#374170" }}>
                        <span style={{ color: "#059669", fontWeight: 900, flexShrink: 0 }}>✓</span>
                        {inc}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
          <p style={{ marginTop: 28, padding: "16px 20px", background: "#f0f4ff", borderRadius: 10, fontSize: 14, color: "#4a5174", lineHeight: 1.7 }}>
            <strong>Note:</strong> Tour bookings and schedules will be confirmed closer to the conference date. For enquiries, contact the organizing committee at{" "}
            <a href="mailto:easts16_2025@mti.or.id" style={{ color: "#1d4ed8", fontWeight: 700 }}>easts16_2025@mti.or.id</a>.
          </p>
        </div>
      </section>
    </>
  );
}
