export const metadata = { title: "EASTS 2025 Live Streaming" };

export default function LiveStreamingPage() {
  return (
    <>
      <div className="eastsPageBanner">
        <div className="wideShell">
          <span className="eastsEyebrow">Live Streaming</span>
          <h1>EASTS 2025 Live Streaming</h1>
          <p>
            Watch the Opening Ceremony, Keynote Addresses, and High-Level Sessions of the
            16th EASTS Conference live — wherever you are.
          </p>
        </div>
      </div>

      <section className="eastsSection eastsAbout">
        <div className="wideShell">
          <div className="eastsSectionIntro">
            <span>Live Broadcast</span>
            <h2>Watch EASTS 2025 online.</h2>
          </div>

          <div
            style={{
              padding: "40px", background: "linear-gradient(135deg, #080f2e, #1a2f6e)",
              borderRadius: 20, textAlign: "center", color: "#fff",
              border: "1px solid rgba(255,255,255,0.08)", marginBottom: 32
            }}
          >
            <div style={{ fontSize: 48, marginBottom: 16 }}>📡</div>
            <h2 style={{ margin: "0 0 12px", fontSize: 24, fontWeight: 900, letterSpacing: "-0.02em" }}>
              Live stream available on September 1, 2025
            </h2>
            <p style={{ margin: "0 0 24px", fontSize: 16, color: "rgba(255,255,255,0.7)", lineHeight: 1.65 }}>
              The Opening Ceremony and Minister Keynote will be streamed live.<br />
              Stream link will be published here 24 hours before the event.
            </p>
            <div
              style={{
                display: "inline-block", padding: "12px 28px", borderRadius: 10,
                background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)",
                fontSize: 14, fontWeight: 700, color: "rgba(255,255,255,0.6)"
              }}
            >
              Stream link coming soon
            </div>
          </div>

          <div className="eastsContentGrid">
            {[
              { title: "Opening Ceremony", time: "Sep 1, 2025 · 08:00 WIB", desc: "Live broadcast of the official Opening Ceremony at GPH Haryo Mataram Auditorium, UNS Surakarta." },
              { title: "Ministerial Keynote", time: "Sep 1, 2025 · 09:30 WIB", desc: "Minister of Transportation Dudy Purwagandhi delivers the Special Keynote: 'One Nation, Connected.'" },
              { title: "High-Level Policy Session", time: "Sep 1–2, 2025", desc: "High-Level Sessions at Ballroom UNS Tower streamed live for online participants." },
              { title: "Closing Ceremony", time: "Sep 3, 2025 · 16:00 WIB", desc: "Award presentations and Closing Ceremony at Indraprasta Room, UNS Inn." }
            ].map((item) => (
              <div key={item.title} style={{ padding: "20px", background: "#fff", borderRadius: 14, border: "1px solid rgba(67,130,223,0.12)", boxShadow: "0 2px 12px rgba(17,46,129,0.05)" }}>
                <h3 style={{ margin: "0 0 6px", fontSize: 15, fontWeight: 800, color: "#0d1a42" }}>{item.title}</h3>
                <p style={{ margin: "0 0 8px", fontSize: 12, color: "#4382df", fontWeight: 700 }}>{item.time}</p>
                <p style={{ margin: 0, fontSize: 14, color: "#4a5174", lineHeight: 1.65 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
