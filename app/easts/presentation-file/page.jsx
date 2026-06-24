import { ArrowRight, Download, FileText } from "lucide-react";

export const metadata = { title: "Presentation File" };

export default function PresentationFilePage() {
  return (
    <>
      <div className="eastsPageBanner">
        <div className="wideShell">
          <span className="eastsEyebrow">Presentation File</span>
          <h1>Download Presentation Files</h1>
          <p>
            Paper templates, author guidelines, and post-conference presentation downloads
            for EASTS 2025.
          </p>
        </div>
      </div>

      <section className="eastsSection eastsAbout">
        <div className="wideShell">
          <div className="eastsSectionIntro">
            <span>Author Resources</span>
            <h2>Templates and guidelines for EASTS 2025 authors.</h2>
          </div>
          <div className="eastsInfoList">
            {[
              {
                icon: <Download size={20} />,
                title: "Full Paper Template (Reviewed Papers)",
                desc: "Microsoft Word template for reviewed paper submissions. Maximum 10 pages including references. Use for papers targeting ATS, Journal of EASTS, or Proceedings."
              },
              {
                icon: <Download size={20} />,
                title: "Abstract Template (Non-Reviewed Papers)",
                desc: "One-page abstract template for non-reviewed conference presentation papers. Submit via email to the ISC."
              },
              {
                icon: <FileText size={20} />,
                title: "Author Guidelines",
                desc: "Full submission guidelines covering formatting requirements, citation style, figure resolution, and submission process via EASTS Editorial Manager."
              },
              {
                icon: <FileText size={20} />,
                title: "Presentation Slide Guidelines",
                desc: "Recommended presentation format for conference sessions. Presentations should be in 16:9 format, maximum 20 slides. Submit slides to session chairs 3 days before the conference."
              }
            ].map((item) => (
              <div className="eastsInfoItem" key={item.title}>
                {item.icon}
                <div>
                  <strong>{item.title}</strong>
                  <p>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 36, display: "flex", gap: 12, flexWrap: "wrap" }}>
            <a
              href="#"
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "13px 22px", borderRadius: 10, background: "linear-gradient(135deg, #1d4ed8, #7c3aed)",
                color: "#fff", fontSize: 14, fontWeight: 800,
                boxShadow: "0 4px 20px rgba(124,58,237,0.3)"
              }}
            >
              <Download size={16} /> Download Paper Template
            </a>
            <a
              href="#"
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "13px 22px", borderRadius: 10, background: "#fff",
                border: "1px solid rgba(67,130,223,0.2)", color: "#1d4ed8",
                fontSize: 14, fontWeight: 800, boxShadow: "0 2px 12px rgba(17,46,129,0.07)"
              }}
            >
              <FileText size={16} /> Author Guidelines
            </a>
          </div>
        </div>
      </section>

      <section className="eastsSection eastsRegSection">
        <div className="wideShell">
          <div className="eastsSectionIntro">
            <span>Post-Conference Downloads</span>
            <h2>Conference presentation files.</h2>
          </div>
          <div
            style={{
              padding: "40px", background: "#fff",
              borderRadius: 18, border: "1px solid rgba(67,130,223,0.12)",
              textAlign: "center", boxShadow: "0 2px 16px rgba(17,46,129,0.06)"
            }}
          >
            <div style={{ fontSize: 48, marginBottom: 16 }}>📁</div>
            <h3 style={{ margin: "0 0 10px", fontSize: 20, fontWeight: 900, color: "#0d1a42" }}>
              Presentation files will be available after the conference
            </h3>
            <p style={{ margin: "0 0 20px", fontSize: 15, color: "#4a5174", lineHeight: 1.7, maxWidth: 520, marginInline: "auto" }}>
              Keynote presentations, technical session papers, and other materials from
              EASTS 2025 will be uploaded here after September 4, 2025, subject to
              speaker permission.
            </p>
            <a
              href="mailto:easts16_2025@mti.or.id"
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "11px 20px", borderRadius: 9,
                background: "#f0f4ff", border: "1px solid rgba(67,130,223,0.2)",
                color: "#1d4ed8", fontSize: 13, fontWeight: 800
              }}
            >
              Request specific files <ArrowRight size={13} />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
