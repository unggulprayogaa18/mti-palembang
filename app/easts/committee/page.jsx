import { patrons, steeringChair, steeringMembers } from "../eastsData";

export const metadata = { title: "Committee" };

export default function CommitteePage() {
  return (
    <>
      <div className="eastsPageBanner">
        <div className="wideShell">
          <span className="eastsEyebrow">Committee</span>
          <h1>Government patrons, steering committee, and organizing team.</h1>
          <p>
            The 16th EASTS Conference is supported by Indonesia&apos;s highest transport
            authorities and organized by leading academics and professionals.
          </p>
        </div>
      </div>

      <section className="eastsSection eastsAbout">
        <div className="wideShell">
          <div className="eastsSectionIntro">
            <span>Committee Members</span>
            <h2>The teams behind EASTS 2025.</h2>
          </div>
          <div className="eastsCommitteeGrid">
            <div className="eastsCommitteeCard">
              <h3>Patrons</h3>
              <div className="eastsCommitteeCardBody">
                <ul>
                  {patrons.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="eastsCommitteeCard">
              <h3>Steering Committee</h3>
              <div className="eastsCommitteeCardBody">
                <p className="eastsCommitteeChair">
                  <strong>Chair:</strong> {steeringChair}
                </p>
                <ul>
                  {steeringMembers.map((m) => (
                    <li key={m}>{m}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="eastsCommitteeCard">
              <h3>Organizing Committee</h3>
              <div className="eastsCommitteeCardBody">
                <p className="eastsCommitteeChair">
                  <strong>Chair:</strong> Prof. Bagus Hario Setiadji
                </p>
                <p>
                  Comprised of 40+ faculty and staff from Universitas Sebelas Maret and partner
                  agencies — covering scientific, protocol, media, accommodation, transportation,
                  and medical care sub-committees.
                </p>
                <p>
                  <strong>ISC Chairperson:</strong> Prof. Saksith Chalermpong
                  <br />
                  <em>easts16_2025@mti.or.id</em>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="eastsSection eastsRegSection">
        <div className="wideShell">
          <div className="eastsSectionIntro">
            <span>International Scientific Committee</span>
            <h2>Peer review organized by the ISC.</h2>
          </div>
          <div className="eastsAboutCopy" style={{ maxWidth: 760 }}>
            <p>
              The International Scientific Committee (ISC) coordinates the peer review process for
              all reviewed papers submitted to EASTS 2025. Papers are assessed for scientific
              quality, relevance to the conference theme, and contribution to the field of
              transport studies in Eastern Asia.
            </p>
            <p>
              ISC Chairperson: <strong>Prof. Saksith Chalermpong</strong> — Chulalongkorn
              University Transportation Institute (CUTI), Thailand.
            </p>
            <p>
              For all scientific inquiries, please contact:{" "}
              <a href="mailto:easts16_2025@mti.or.id" style={{ color: "#1d4ed8", fontWeight: 700 }}>
                easts16_2025@mti.or.id
              </a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
