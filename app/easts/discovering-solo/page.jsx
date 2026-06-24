export const metadata = { title: "Discovering Solo" };

const attractions = [
  { name: "Keraton Kasunanan Surakarta", cat: "Heritage", desc: "The royal palace of the Sunanate of Surakarta, founded in 1745. The Keraton houses one of the finest collections of Javanese royal artifacts and is still home to the Sultan's family." },
  { name: "Pura Mangkunegaran", cat: "Heritage", desc: "The smaller of Solo's two royal courts, known for its exceptional Javanese architecture, royal gamelan collection, and the famous Mangkunegaran dancer troupe." },
  { name: "Pasar Gede Hardjonagoro", cat: "Market", desc: "Solo's largest and most beautiful traditional market, dating to the Dutch colonial era. The perfect place to experience Javanese daily life and sample local street food." },
  { name: "Batik Laweyan & Kauman", cat: "Culture", desc: "Two historic batik-producing kampung (neighborhoods) where traditional handmade batik has been produced for over 400 years. Visit workshops and galleries of master batik artisans." },
  { name: "Taman Balekambang", cat: "Nature", desc: "A lush public park in the heart of Solo, featuring a cultural performance amphitheater. This is the venue for the EASTS 2025 Gala Dinner on September 1." },
  { name: "Wayang Orang Sriwedari", cat: "Performance", desc: "One of Indonesia's last remaining professional Wayang Orang (human shadow puppet) troupes, performing nightly at the Sriwedari park theater. A UNESCO-recognized art form." }
];

export default function DiscoveringSoloPage() {
  return (
    <>
      <div className="eastsPageBanner">
        <div className="wideShell">
          <span className="eastsEyebrow">Discovering Solo</span>
          <h1>Where Classic Javanese Tradition Meets Modern Innovation</h1>
          <p>
            Surakarta (Solo) is one of Java&apos;s most culturally rich cities — home to royal
            palaces, batik heritage, world-class Javanese cuisine, and a vibrant arts scene.
          </p>
        </div>
      </div>

      <section className="eastsSection eastsAbout">
        <div className="wideShell">
          <div className="eastsSectionIntro">
            <span>The City of Solo</span>
            <h2>A cultural heartland of Central Java.</h2>
          </div>
          <div className="eastsAboutGrid">
            <div className="eastsAboutCopy">
              <p>
                Surakarta, commonly known as Solo, is a city of approximately 600,000 people in
                the heart of Central Java, Indonesia. As one of the last centers of classical
                Javanese court culture, it is home to two royal palaces (Keraton), centuries-old
                batik traditions, and a rich performing arts heritage.
              </p>
              <p>
                Yet Solo is also forward-looking. The city hosts Universitas Sebelas Maret (UNS),
                one of Indonesia&apos;s leading research universities, and has developed innovative
                urban transport solutions including the Batik Solo Trans BRT system — a model
                studied by transport planners across Southeast Asia.
              </p>
              <p>
                EASTS 2025 participants will have the opportunity to experience this remarkable
                city through the conference social program, cultural procession, and the September 4
                field trip.
              </p>
            </div>
            <div className="eastsFacts">
              <span><strong>600K</strong>City population</span>
              <span><strong>1745</strong>Royal palace founded</span>
              <span><strong>BST</strong>Award-winning BRT</span>
              <span><strong>Batik</strong>UNESCO heritage</span>
            </div>
          </div>
        </div>
      </section>

      <section className="eastsSection eastsRegSection">
        <div className="wideShell">
          <div className="eastsSectionIntro">
            <span>Must-Visit Attractions</span>
            <h2>Top experiences in Solo for EASTS visitors.</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16, marginTop: 28 }}>
            {attractions.map((a) => (
              <div key={a.name} style={{ padding: "20px 22px", background: "#fff", borderRadius: 14, border: "1px solid rgba(67,130,223,0.12)", boxShadow: "0 2px 12px rgba(17,46,129,0.05)" }}>
                <div style={{ fontSize: 11, fontWeight: 900, color: "#4382df", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>{a.cat}</div>
                <h3 style={{ margin: "0 0 8px", fontSize: 16, fontWeight: 800, color: "#0d1a42" }}>{a.name}</h3>
                <p style={{ margin: 0, fontSize: 14, color: "#4a5174", lineHeight: 1.7 }}>{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
