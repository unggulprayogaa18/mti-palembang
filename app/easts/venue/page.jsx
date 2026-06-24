import { MapPin, MessageCircle, Phone } from "lucide-react";
import { schedule } from "../eastsData";

export const metadata = { title: "Venue and Schedule" };

export default function VenuePage() {
  return (
    <>
      <div className="eastsPageBanner">
        <div className="wideShell">
          <span className="eastsEyebrow">Venue &amp; Schedule</span>
          <h1>UNS Tower, Surakarta — September 1–4, 2025</h1>
          <p>
            Five days across Universitas Sebelas Maret campus and the historic city of Solo,
            Central Java.
          </p>
        </div>
      </div>

      <section className="eastsSection eastsAbout">
        <div className="wideShell">
          <div className="eastsSectionIntro">
            <span>Conference Venue</span>
            <h2>Primary venues across the UNS campus.</h2>
          </div>
          <div className="eastsVenueGrid">
            <div className="eastsVenueCopy" id="contact">
              <h3>
                <MapPin size={18} aria-hidden="true" />
                Primary Venue
              </h3>
              <p>
                <strong>UNS Tower</strong> &amp; campus facilities, Universitas Sebelas Maret
              </p>
              <p>Jl. Ir. Sutami No. 36 Kentingan, Jebres, Surakarta, Jawa Tengah 57126</p>

              <h3 style={{ marginTop: 24 }}>
                <MapPin size={18} aria-hidden="true" />
                Secondary Venues
              </h3>
              <ul style={{ padding: "0 0 0 18px", color: "#4a5174", lineHeight: 2 }}>
                <li><strong>GPH Haryo Mataram Auditorium</strong> — Opening Ceremony</li>
                <li><strong>Ballroom UNS Tower</strong> — High-Level Sessions</li>
                <li><strong>Taman Balekambang</strong> — Gala Dinner (Sep 1)</li>
                <li><strong>Indraprasta Room, UNS Inn</strong> — Closing Ceremony (Sep 3)</li>
                <li><strong>Loji Gandrung</strong> — Cultural Procession (Aug 31)</li>
              </ul>

              <div className="eastsContactList">
                <span>
                  <Phone size={15} aria-hidden="true" />
                  0271-646994 / 0271-646655
                </span>
                <span>
                  <MessageCircle size={15} aria-hidden="true" />
                  (+62) 851 5672 3341 (WhatsApp)
                </span>
              </div>
            </div>
            <div className="eastsMap">
              <iframe
                title="UNS Tower Surakarta map"
                src="https://www.google.com/maps?q=UNS+Tower+Surakarta&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="eastsSection eastsRegSection">
        <div className="wideShell">
          <div className="eastsSectionIntro">
            <span>Conference Schedule</span>
            <h2>Full day-by-day program overview.</h2>
          </div>
          <div className="eastsScheduleGrid">
            {schedule.map((day) => (
              <div className="eastsScheduleDay" key={day.day} style={{ "--day-color": day.color }}>
                <div className="eastsScheduleDayHead">
                  <strong>{day.day}</strong>
                  <span>{day.label}</span>
                </div>
                <ul>
                  {day.sessions.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="eastsSection eastsAbout">
        <div className="wideShell">
          <div className="eastsSectionIntro">
            <span>Getting There</span>
            <h2>Reaching Surakarta from across Eastern Asia.</h2>
          </div>
          <div className="eastsContentGrid">
            {[
              { title: "By Air", desc: "Adi Soemarmo International Airport (SOC) is served by direct flights from Jakarta, Bali, Surabaya, and Kuala Lumpur. Airport transfer to UNS Tower takes approximately 40 minutes by taxi or ride-hailing app." },
              { title: "By Train", desc: "Purwosari and Solo Balapan stations connect Surakarta to Jakarta (5–8 hrs), Yogyakarta (1 hr), and Surabaya (3 hrs). Trains are punctual, comfortable, and affordable." },
              { title: "By Road", desc: "Surakarta is well-connected via the Trans-Java Toll Road. From Yogyakarta: ~60 km (1 hr). From Semarang: ~100 km (1.5 hrs). Ride-hailing services (Gojek, Grab) are widely available." },
              { title: "Local Transport", desc: "Within Solo, the Batik Solo Trans (BST) BRT network, becak (cycle rickshaw), and ride-hailing apps provide convenient mobility. The UNS campus is serviced by multiple BRT corridors." }
            ].map((item) => (
              <div key={item.title} style={{ padding: "22px", background: "#fff", borderRadius: 14, border: "1px solid rgba(67,130,223,0.12)", boxShadow: "0 2px 12px rgba(17,46,129,0.05)" }}>
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
