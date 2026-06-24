import { ArrowRight, CreditCard, FileText } from "lucide-react";
import { feeRows, reviewedPapers, nonReviewedPapers } from "../eastsData";

export const metadata = { title: "Registration and Fee" };

function DateTable({ title, description, rows, note }) {
  return (
    <article className="eastsDatePanel">
      <div className="eastsDatePanelHead">
        <span>{title}</span>
        <p>{description}</p>
      </div>
      <div className="eastsTableWrap">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Event</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={`${title}-${row.date}`}>
                <td>{row.date}</td>
                <td>{row.event}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {note && (
        <div className="eastsDeadlineNote">
          <strong>Deadline update:</strong>
          <p>{note}</p>
        </div>
      )}
    </article>
  );
}

export default function RegistrationPage() {
  return (
    <>
      <div className="eastsPageBanner">
        <div className="wideShell">
          <span className="eastsEyebrow">Registration &amp; Fee</span>
          <h1>Register for EASTS 2025</h1>
          <p>
            Early bird rates available until July 31, 2025. All fees are in USD and include
            conference materials, lunches, and the Gala Dinner.
          </p>
        </div>
      </div>

      <section className="eastsSection eastsRegSection">
        <div className="wideShell">
          <div className="eastsSectionIntro">
            <span>Registration Fee</span>
            <h2>Early bird rates until July 31, 2025.</h2>
          </div>
          <div className="eastsRegGrid">
            <div className="eastsRegTable">
              <table>
                <thead>
                  <tr>
                    <th>Category</th>
                    <th>
                      Early Bird
                      <br />
                      <em>until July 31</em>
                    </th>
                    <th>Normal Rate</th>
                  </tr>
                </thead>
                <tbody>
                  {feeRows.map((row) => (
                    <tr key={row.category}>
                      <td>{row.category}</td>
                      <td className="eastsFeeEarly">{row.earlyBird}</td>
                      <td className="eastsFeeNormal">{row.normal}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="eastsRegInfo">
              <div className="eastsRegInfoCard">
                <CreditCard size={22} aria-hidden="true" />
                <div>
                  <strong>Credit Card / Virtual Account</strong>
                  <p>
                    Pay securely via the dedicated payment link provided after online registration.
                    All major cards accepted.
                  </p>
                </div>
              </div>
              <div className="eastsRegInfoCard">
                <FileText size={22} aria-hidden="true" />
                <div>
                  <strong>Bank Transfer</strong>
                  <p>
                    Masyarakat Transportasi Indonesia
                    <br />
                    Mega Syariah Bank (Bintaro Branch)
                    <br />
                    Account: 2010700700
                    <br />
                    Swift: BMSIIDJA
                  </p>
                </div>
              </div>
              <div className="eastsRegSteps">
                <strong>Registration Steps</strong>
                <ol>
                  <li>
                    Submit paper via <em>EASTS Editorial Manager</em>
                  </li>
                  <li>
                    Complete participant registration at <em>FSTPT portal</em>
                  </li>
                  <li>Complete payment and upload proof of transfer</li>
                </ol>
              </div>
              <a
                href="#"
                style={{
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                  padding: "14px 20px", borderRadius: 12, background: "linear-gradient(135deg, #1d4ed8, #7c3aed)",
                  color: "#fff", fontSize: 14, fontWeight: 800,
                  boxShadow: "0 4px 20px rgba(124,58,237,0.3)"
                }}
              >
                Register Online <ArrowRight size={15} />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="eastsSection eastsDates">
        <div className="wideShell">
          <div className="eastsSectionIntro">
            <span>Important Dates</span>
            <h2>Submission and publication timeline.</h2>
          </div>
          <div className="eastsDateGrid">
            <DateTable
              title="Reviewed Papers (Academic or Practical)"
              description="Fully peer-reviewed for publication in Asian Transport Studies / Journal of EASTS."
              rows={reviewedPapers}
              note="Previous registration deadlines: July 9 & July 16, 2025. Current deadline: July 23, 2025."
            />
            <DateTable
              title="Non-Reviewed Papers"
              description="Brief review for conference presentation eligibility only."
              rows={nonReviewedPapers}
              note="Previous registration deadlines: July 2 & July 16, 2025. Current deadline: July 23, 2025."
            />
          </div>
          <div className="eastsTableFootnote">
            <strong>NOTE:</strong> Submission of revised papers (Reviewed Papers only) and
            registration before the deadline are required for inclusion in the presentation program.
            <span>All times: 17:00 Bangkok Standard Time (UTC+08:00).</span>
          </div>
        </div>
      </section>
    </>
  );
}
