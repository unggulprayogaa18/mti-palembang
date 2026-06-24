export const metadata = { title: "About MTI" };

export default function AboutMTIPage() {
  return (
    <>
      <div className="eastsPageBanner">
        <div className="wideShell">
          <span className="eastsEyebrow">About</span>
          <h1>Masyarakat Transportasi Indonesia</h1>
          <p>
            Indonesia&apos;s leading transport policy organization — connecting government,
            academia, and industry to advance sustainable national mobility.
          </p>
        </div>
      </div>

      <section className="eastsSection eastsAbout">
        <div className="wideShell">
          <div className="eastsSectionIntro">
            <span>About MTI</span>
            <h2>Indonesia&apos;s premier transport policy society.</h2>
          </div>
          <div className="eastsAboutGrid">
            <div className="eastsAboutCopy">
              <p>
                Masyarakat Transportasi Indonesia (MTI) is Indonesia&apos;s leading independent
                organization for transport policy, research, and advocacy. Founded to bridge the gap
                between academic transport research and public policy, MTI brings together
                professionals, academics, and government officials from across the archipelago.
              </p>
              <p>
                MTI operates at both the national and regional (wilayah) level, with active chapters
                across Indonesia&apos;s 34 provinces. Through forums, publications, and policy
                recommendations, MTI shapes national transport strategy and contributes to the
                development of Indonesia&apos;s transport legislation.
              </p>
              <p>
                As the organizing body for the 16th EASTS International Conference, MTI demonstrates
                Indonesia&apos;s growing role in the international transport research community.
                This marks the first time Indonesia has hosted EASTS, reflecting MTI&apos;s
                expanding global influence.
              </p>
            </div>
            <div className="eastsFacts">
              <span><strong>34</strong>Regional chapters</span>
              <span><strong>National</strong>Policy scope</span>
              <span><strong>AKSES</strong>Policy journal</span>
              <span><strong>1st</strong>EASTS host 2025</span>
            </div>
          </div>
        </div>
      </section>

      <section className="eastsSection eastsRegSection">
        <div className="wideShell">
          <div className="eastsSectionIntro">
            <span>MTI&apos;s Role</span>
            <h2>Policy, research, and advocacy for Indonesian transport.</h2>
          </div>
          <div className="eastsContentGrid">
            {[
              { title: "Policy Advocacy", desc: "MTI provides independent analysis and policy recommendations to Indonesia's Ministry of Transportation, Parliament, and regional governments on all aspects of national transport." },
              { title: "Research & Publication", desc: "Through the AKSES journal and regular policy briefs, MTI disseminates transport research findings to decision-makers and the public." },
              { title: "Regional Network", desc: "With 34 regional chapters (MTI Wilayah) across Indonesia's provinces, MTI connects transport professionals from Sabang to Merauke." },
              { title: "International Engagement", desc: "MTI represents Indonesian transport interests in international forums and organizations, including EASTS, ADB, and ASEAN transport working groups." }
            ].map((item) => (
              <div key={item.title} style={{ padding: "22px", background: "#fff", borderRadius: 14, border: "1px solid rgba(67,130,223,0.12)", boxShadow: "0 2px 12px rgba(17,46,129,0.05)" }}>
                <h3 style={{ margin: "0 0 10px", fontSize: 16, fontWeight: 800, color: "#0d1a42" }}>{item.title}</h3>
                <p style={{ margin: 0, fontSize: 14, color: "#4a5174", lineHeight: 1.75 }}>{item.desc}</p>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 28 }}>
            <a
              href="/"
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "12px 22px", borderRadius: 10, background: "#fff",
                border: "1px solid rgba(67,130,223,0.2)", color: "#1d4ed8",
                fontSize: 14, fontWeight: 800, boxShadow: "0 2px 12px rgba(17,46,129,0.07)"
              }}
            >
              ← Visit MTI Website
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
