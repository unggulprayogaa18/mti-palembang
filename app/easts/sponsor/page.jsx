import eastsLogos from "../../../assets/LOGO-LOGO-scaled.png";

export const metadata = { title: "Sponsor" };

const organizers = ["Masyarakat Transportasi Indonesia (MTI)", "Universitas Sebelas Maret (UNS)"];
const coOrganizers = ["Chulalongkorn University Transportation Institute (CUTI), Thailand", "City Government of Surakarta", "BPSDM Ministry of Transportation"];
const academicPartners = ["BOKU University, Austria", "University of Leeds, UK", "Hiroshima University, Japan", "University of Oxford, UK"];
const supporters = ["Ministry of Transportation, Republic of Indonesia", "Ministry of Public Works, Republic of Indonesia", "Governor of Central Java", "Mayor of Solo City"];

export default function SponsorPage() {
  return (
    <>
      <div className="eastsPageBanner">
        <div className="wideShell">
          <span className="eastsEyebrow">Sponsor</span>
          <h1>Organizers, sponsors, and academic partners.</h1>
          <p>
            The 16th EASTS Conference 2025 is made possible through the support of government
            institutions, universities, and industry partners across the region.
          </p>
        </div>
      </div>

      <section className="eastsSection eastsAbout">
        <div className="wideShell">
          <div className="eastsSectionIntro">
            <span>Partners &amp; Sponsors</span>
            <h2>Institutions supporting EASTS 2025.</h2>
          </div>

          <div className="eastsLogoStrip" style={{ marginBottom: 40 }}>
            <img src={eastsLogos.src} alt="Organizer and partner logos" />
          </div>

          <div className="eastsSponsorTier">
            <div className="eastsSponsorTierLabel">Main Organizers</div>
            <div className="eastsSponsorGrid">
              {organizers.map((name) => (
                <div className="eastsSponsorCard" key={name}>{name}</div>
              ))}
            </div>
          </div>

          <div className="eastsSponsorTier">
            <div className="eastsSponsorTierLabel">Co-Organizers</div>
            <div className="eastsSponsorGrid">
              {coOrganizers.map((name) => (
                <div className="eastsSponsorCard" key={name}>{name}</div>
              ))}
            </div>
          </div>

          <div className="eastsSponsorTier">
            <div className="eastsSponsorTierLabel">Academic Partners</div>
            <div className="eastsSponsorGrid">
              {academicPartners.map((name) => (
                <div className="eastsSponsorCard" key={name}>{name}</div>
              ))}
            </div>
          </div>

          <div className="eastsSponsorTier">
            <div className="eastsSponsorTierLabel">Government Supporters</div>
            <div className="eastsSponsorGrid">
              {supporters.map((name) => (
                <div className="eastsSponsorCard" key={name}>{name}</div>
              ))}
            </div>
          </div>

          <div style={{ padding: "24px", background: "#f0f4ff", borderRadius: 14, border: "1px solid rgba(67,130,223,0.15)", marginTop: 20 }}>
            <h3 style={{ margin: "0 0 8px", fontSize: 16, fontWeight: 800, color: "#0d1a42" }}>Become a Sponsor</h3>
            <p style={{ margin: "0 0 12px", fontSize: 14, color: "#4a5174", lineHeight: 1.7 }}>
              Interested in sponsoring or exhibiting at the 16th EASTS Conference? Contact our
              organizing committee to receive the sponsorship prospectus.
            </p>
            <a href="mailto:easts16_2025@mti.or.id" style={{ fontSize: 14, fontWeight: 800, color: "#1d4ed8" }}>
              easts16_2025@mti.or.id
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
