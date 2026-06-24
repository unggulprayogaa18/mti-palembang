export const metadata = { title: "JTTRI Special Award 2025" };

export default function JTTRIAwardPage() {
  return (
    <>
      <div className="eastsPageBanner">
        <div className="wideShell">
          <span className="eastsEyebrow">Special Award</span>
          <h1>JTTRI Special Award 2025</h1>
          <p>
            The Japan Traffic &amp; Transportation Research Institute recognizes outstanding
            papers on road traffic safety at the 16th EASTS Conference.
          </p>
        </div>
      </div>

      <section className="eastsSection eastsAbout">
        <div className="wideShell">
          <div className="eastsSectionIntro">
            <span>About the Award</span>
            <h2>Recognizing excellence in road safety research.</h2>
          </div>
          <div className="eastsAboutGrid">
            <div className="eastsAboutCopy">
              <p>
                The <strong>Japan Traffic &amp; Transportation Research Institute (JTTRI)</strong>{" "}
                Special Award is presented at each EASTS International Conference to recognize
                outstanding research contributions in the area of road traffic safety.
              </p>
              <p>
                At EASTS 2025 in Surakarta, JTTRI is proud to continue this tradition by
                sponsoring a special award for the best paper addressing road safety challenges
                in Eastern Asia — a region that accounts for a significant share of global
                road traffic fatalities.
              </p>
              <p>
                Eligible papers include those submitted under Topic Code J (Traffic Accident
                and Safety) and related codes. The award recipient will be selected by a
                dedicated JTTRI Award Committee from among accepted conference papers.
              </p>
            </div>
            <div className="eastsFacts">
              <span><strong>JTTRI</strong>Sponsor organization</span>
              <span><strong>Code J</strong>Primary topic code</span>
              <span><strong>Award</strong>Certificate &amp; prize</span>
            </div>
          </div>
        </div>
      </section>

      <section className="eastsSection eastsRegSection">
        <div className="wideShell">
          <div className="eastsSectionIntro">
            <span>Eligibility &amp; Selection</span>
            <h2>How the JTTRI Award is selected.</h2>
          </div>
          <div className="eastsContentGrid">
            {[
              { title: "Eligible Topics", desc: "Papers submitted under Topic Code J (Traffic Accident and Safety) are the primary target. Papers from codes I (Road Traffic Engineering) and F (Environment and Climate Change) addressing safety dimensions may also be considered." },
              { title: "Paper Type", desc: "Both reviewed and non-reviewed papers accepted for the EASTS 2025 program are eligible. Authors need not apply separately — all eligible papers are automatically considered." },
              { title: "Selection Criteria", desc: "Papers are evaluated on scientific rigor, relevance to road safety challenges in Eastern Asia, practical applicability, and clarity of presentation." },
              { title: "Award Ceremony", desc: "The JTTRI Special Award is presented during the Closing Ceremony of the 16th EASTS Conference on September 3, 2025." }
            ].map((item) => (
              <div key={item.title} style={{ padding: "20px", background: "#fff", borderRadius: 14, border: "1px solid rgba(67,130,223,0.12)", boxShadow: "0 2px 12px rgba(17,46,129,0.05)" }}>
                <h3 style={{ margin: "0 0 10px", fontSize: 16, fontWeight: 800, color: "#0d1a42" }}>{item.title}</h3>
                <p style={{ margin: 0, fontSize: 14, color: "#4a5174", lineHeight: 1.75 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
