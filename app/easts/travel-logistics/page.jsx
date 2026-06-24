import { Globe, MapPin, Phone } from "lucide-react";

export const metadata = { title: "Travel & Logistics" };

export default function TravelLogisticsPage() {
  return (
    <>
      <div className="eastsPageBanner">
        <div className="wideShell">
          <span className="eastsEyebrow">Travel &amp; Logistics</span>
          <h1>Getting to Surakarta for EASTS 2025</h1>
          <p>
            Practical travel information for international and domestic participants —
            flights, trains, accommodation, and local transport in Solo.
          </p>
        </div>
      </div>

      <section className="eastsSection eastsAbout">
        <div className="wideShell">
          <div className="eastsSectionIntro">
            <span>By Air</span>
            <h2>Adi Soemarmo International Airport (SOC).</h2>
          </div>
          <div className="eastsAboutCopy" style={{ maxWidth: 780 }}>
            <p>
              Solo is served by <strong>Adi Soemarmo International Airport (airport code: SOC)</strong>,
              located approximately 14 km northwest of the city center. Transfer to UNS Tower
              takes approximately 40 minutes by taxi or ride-hailing app.
            </p>
          </div>
          <div className="eastsContentGrid" style={{ marginTop: 24 }}>
            {[
              { title: "From Jakarta", desc: "Multiple daily flights from Soekarno-Hatta (CGK) operated by Garuda Indonesia, Lion Air, Batik Air, and Citilink. Flight time: ~1 hour." },
              { title: "From Bali", desc: "Direct flights from Ngurah Rai (DPS) available daily on Lion Air and Batik Air. Flight time: ~1 hour 10 minutes." },
              { title: "From Kuala Lumpur", desc: "AirAsia operates direct international flights from Kuala Lumpur (KUL) to Surakarta (SOC). Flight time: ~2 hours 30 minutes." },
              { title: "Transit via Jakarta", desc: "Most international passengers transit through Jakarta's Soekarno-Hatta (CGK). Allow at least 2 hours for domestic connection." }
            ].map((item) => (
              <div key={item.title} style={{ padding: "20px", background: "#fff", borderRadius: 12, border: "1px solid rgba(67,130,223,0.12)", boxShadow: "0 1px 8px rgba(17,46,129,0.04)" }}>
                <h3 style={{ margin: "0 0 8px", fontSize: 15, fontWeight: 800, color: "#0d1a42" }}>{item.title}</h3>
                <p style={{ margin: 0, fontSize: 14, color: "#4a5174", lineHeight: 1.7 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="eastsSection eastsRegSection">
        <div className="wideShell">
          <div className="eastsSectionIntro">
            <span>Recommended Accommodation</span>
            <h2>Hotels near the conference venue.</h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 24 }}>
            {[
              { name: "UNS Inn", cat: "Conference Hotel", dist: "On-campus", desc: "The official conference hotel, located on the UNS campus. Most convenient option for conference participants. Closing ceremony venue on September 3." },
              { name: "Alila Solo", cat: "5-Star", dist: "~5 km from UNS", desc: "Luxury boutique hotel in the heart of Solo, offering exceptional design and views of the city. Near Pura Mangkunegaran." },
              { name: "The Sunan Hotel Solo", cat: "4-Star", dist: "~4 km from UNS", desc: "A well-established 4-star property with conference facilities, pool, and easy access to Solo's main attractions." },
              { name: "Aston Solo Hotel", cat: "4-Star", dist: "~3 km from UNS", desc: "Modern hotel with excellent facilities and competitive rates. Popular with business and academic travelers." }
            ].map((h) => (
              <div key={h.name} style={{ display: "flex", gap: 18, padding: "20px 24px", background: "#fff", borderRadius: 14, border: "1px solid rgba(67,130,223,0.12)", boxShadow: "0 2px 12px rgba(17,46,129,0.05)" }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: "linear-gradient(135deg, #1d4ed8, #7c3aed)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <MapPin size={22} color="#fff" />
                </div>
                <div>
                  <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 4 }}>
                    <h3 style={{ margin: 0, fontSize: 15, fontWeight: 800, color: "#0d1a42" }}>{h.name}</h3>
                    <span style={{ fontSize: 11, fontWeight: 800, color: "#4382df", textTransform: "uppercase", letterSpacing: "0.08em" }}>{h.cat}</span>
                  </div>
                  <p style={{ margin: "0 0 4px", fontSize: 12, color: "#7079a0", fontWeight: 700 }}>{h.dist}</p>
                  <p style={{ margin: 0, fontSize: 14, color: "#4a5174", lineHeight: 1.65 }}>{h.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="eastsSection eastsAbout">
        <div className="wideShell">
          <div className="eastsSectionIntro">
            <span>Local Transport</span>
            <h2>Getting around Solo during the conference.</h2>
          </div>
          <div className="eastsInfoList">
            {[
              { icon: <Globe size={20} />, title: "Batik Solo Trans (BST)", desc: "Solo's BRT system connects key areas of the city including the UNS campus, city center, and train stations. An affordable and convenient option for short trips." },
              { icon: <MapPin size={20} />, title: "Ride-Hailing (Gojek / Grab)", desc: "Both Gojek and Grab operate extensively in Solo. App-based motorcycle taxis (ojek) and car rides are available throughout the city at competitive rates." },
              { icon: <Phone size={20} />, title: "Conference Shuttle", desc: "Official shuttle services will operate between the conference hotels and main venue during the conference days. Schedules will be distributed to registered participants." }
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
        </div>
      </section>
    </>
  );
}
