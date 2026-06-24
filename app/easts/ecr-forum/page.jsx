import { ArrowRight } from "lucide-react";

export const metadata = { title: "The 4th ECR Transport Forum 2025" };

export default function ECRForumPage() {
  return (
    <>
      <div className="eastsPageBanner">
        <div className="wideShell">
          <span className="eastsEyebrow">Special Program</span>
          <h1>The 4th Early Career Researchers Transport Forum 2025</h1>
          <p>
            A dedicated forum for doctoral students and early career academics to present,
            network, and grow within the EASTS community.
          </p>
        </div>
      </div>

      <section className="eastsSection eastsAbout">
        <div className="wideShell">
          <div className="eastsSectionIntro">
            <span>About ECR Forum</span>
            <h2>Empowering the next generation of transport researchers.</h2>
          </div>
          <div className="eastsAboutGrid">
            <div className="eastsAboutCopy">
              <p>
                The Early Career Researchers (ECR) Transport Forum is a dedicated satellite event
                of the EASTS International Conference, designed specifically for doctoral students,
                postdoctoral researchers, and junior academics within five years of their PhD
                completion.
              </p>
              <p>
                Now in its 4th edition, the forum provides a supportive, collegial environment
                where ECRs can present their research to a peer audience, receive structured
                feedback from senior EASTS scholars, and build the professional networks that will
                sustain their academic careers.
              </p>
              <p>
                The forum includes paper presentations, a mentoring lunch with established
                professors, a dedicated ECR networking session, and a Best ECR Paper Award
                sponsored by EASTS.
              </p>
            </div>
            <div className="eastsFacts">
              <span><strong>4th</strong>Edition at EASTS 2025</span>
              <span><strong>ECR</strong>Dedicated program</span>
              <span><strong>Award</strong>Best ECR Paper</span>
            </div>
          </div>
        </div>
      </section>

      <section className="eastsSection eastsRegSection">
        <div className="wideShell">
          <div className="eastsSectionIntro">
            <span>Program</span>
            <h2>What the ECR Forum includes.</h2>
          </div>
          <div className="eastsContentGrid">
            {[
              { title: "Paper Presentations", desc: "ECR participants present their research in a dedicated session, separate from the main conference technical sessions, in front of a supportive peer audience." },
              { title: "Senior Scholar Mentoring", desc: "Structured one-on-one and small-group mentoring sessions with established EASTS professors — covering research direction, publication strategy, and career advice." },
              { title: "Networking Events", desc: "A dedicated ECR lunch and evening networking event where early career researchers from 19 EASTS countries and regions build lasting professional connections." },
              { title: "Best ECR Paper Award", desc: "Outstanding contributions to the ECR Forum are recognized with the Best ECR Paper Award, presented during the Closing Ceremony of EASTS 2025." }
            ].map((item) => (
              <div key={item.title} style={{ padding: "22px", background: "#fff", borderRadius: 14, border: "1px solid rgba(67,130,223,0.12)", boxShadow: "0 2px 12px rgba(17,46,129,0.05)" }}>
                <h3 style={{ margin: "0 0 10px", fontSize: 16, fontWeight: 800, color: "#0d1a42" }}>{item.title}</h3>
                <p style={{ margin: 0, fontSize: 14, color: "#4a5174", lineHeight: 1.75 }}>{item.desc}</p>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 28 }}>
            <a
              href="/easts/registration"
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "12px 22px", borderRadius: 10, background: "linear-gradient(135deg, #1d4ed8, #7c3aed)",
                color: "#fff", fontSize: 14, fontWeight: 800,
                boxShadow: "0 4px 20px rgba(124,58,237,0.3)"
              }}
            >
              Register for ECR Forum <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
