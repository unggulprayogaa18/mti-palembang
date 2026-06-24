export const metadata = { title: "Frequently Asked Questions" };

const faqs = [
  {
    q: "Who can attend the 16th EASTS Conference 2025?",
    a: "The conference is open to all transport researchers, practitioners, policy makers, and students with an interest in transportation studies. Both EASTS members and non-members are welcome to participate."
  },
  {
    q: "What is the difference between Reviewed and Non-Reviewed papers?",
    a: "Reviewed Papers undergo full peer review and, if accepted, are published in Asian Transport Studies (ATS), Journal of the EASTS, or the official Proceedings. Non-Reviewed Papers receive a brief review for presentation eligibility only and are uploaded to the ISC website. They are not included in the main journals."
  },
  {
    q: "What is the official language of the conference?",
    a: "English is the official language. All papers, presentations, and official communications must be in English."
  },
  {
    q: "Does the registration fee include accommodation?",
    a: "No. The registration fee covers conference materials, lunches on conference days, the Gala Dinner (September 1), and the Farewell Dinner (September 3). Accommodation must be booked and paid for separately."
  },
  {
    q: "Is it possible to attend the conference without presenting a paper?",
    a: "Yes. You can register as a participant (non-presenter) and attend all sessions, keynotes, and social events. Select the appropriate category during registration."
  },
  {
    q: "What visa is required for Indonesia?",
    a: "Indonesia offers visa-on-arrival (VoA) for citizens of many countries, including most EASTS member countries. Check the Indonesian Ministry of Foreign Affairs website for the latest visa requirements for your nationality. We recommend applying for an e-VoA before your trip."
  },
  {
    q: "Are there student registration discounts?",
    a: "Yes. Students registered at a university may register at the reduced student rate ($30 Early Bird / $40 Normal). Proof of student status (valid student ID or enrollment letter) is required."
  },
  {
    q: "How do I get from the airport to the conference venue?",
    a: "Adi Soemarmo International Airport (SOC) is approximately 40 minutes from UNS Tower by taxi or ride-hailing app (Gojek, Grab). Estimated taxi fare: IDR 150,000–200,000. Official conference transfers will be arranged for selected arrival times — details will be provided to registered participants."
  },
  {
    q: "Can I change or cancel my registration?",
    a: "Registration changes and cancellations must be submitted in writing to easts16_2025@mti.or.id. Cancellations made before July 31, 2025 will receive a partial refund (70%). No refunds after this date."
  },
  {
    q: "Who do I contact for technical paper enquiries?",
    a: "For all technical/scientific enquiries, contact the ISC Chairperson Prof. Saksith Chalermpong via easts16_2025@mti.or.id. For registration and logistics, contact the Organizing Committee at the same address."
  }
];

export default function FAQPage() {
  return (
    <>
      <div className="eastsPageBanner">
        <div className="wideShell">
          <span className="eastsEyebrow">FAQ</span>
          <h1>Frequently Asked Questions</h1>
          <p>
            Answers to common questions about registration, papers, travel, and the
            16th EASTS Conference 2025 in Surakarta.
          </p>
        </div>
      </div>

      <section className="eastsSection eastsAbout">
        <div className="wideShell">
          <div className="eastsSectionIntro">
            <span>Questions &amp; Answers</span>
            <h2>Everything you need to know about EASTS 2025.</h2>
          </div>
          <div className="eastsFaqList">
            {faqs.map((item) => (
              <details className="eastsFaqItem" key={item.q}>
                <summary>{item.q}</summary>
                <div className="eastsFaqBody">{item.a}</div>
              </details>
            ))}
          </div>
          <p style={{ marginTop: 32, padding: "18px 22px", background: "#f0f4ff", borderRadius: 12, fontSize: 14, color: "#4a5174", lineHeight: 1.7 }}>
            Can&apos;t find your answer? Contact us at{" "}
            <a href="mailto:easts16_2025@mti.or.id" style={{ color: "#1d4ed8", fontWeight: 700 }}>easts16_2025@mti.or.id</a>{" "}
            or WhatsApp <strong>(+62) 851 5672 3341</strong>.
          </p>
        </div>
      </section>
    </>
  );
}
