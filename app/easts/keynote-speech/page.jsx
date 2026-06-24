import { Mic } from "lucide-react";
import { speakers } from "../eastsData";

export const metadata = { title: "Keynote Speech" };

export default function KeynoteSpeechPage() {
  return (
    <>
      <div className="eastsPageBanner">
        <div className="wideShell">
          <span className="eastsEyebrow">Keynote Speech</span>
          <h1>World-class transport scholars at EASTS 2025.</h1>
          <p>
            Five keynote addresses from Indonesia&apos;s Minister of Transportation and four
            leading global transport academics across the four conference days.
          </p>
        </div>
      </div>

      <section className="eastsSection eastsAbout">
        <div className="wideShell">
          <div className="eastsSectionIntro">
            <span>Special Keynote</span>
            <h2>Opening address by the Minister of Transportation.</h2>
          </div>
          <div
            className="eastsMinisterCard"
            style={{ marginBottom: 0 }}
          >
            <div className="eastsMinisterIcon">
              <Mic size={36} aria-hidden="true" />
            </div>
            <div>
              <em>Special Keynote Address — September 1, 2025</em>
              <strong>Dudy Purwagandhi, S.H.</strong>
              <span>Minister of Transportation, Republic of Indonesia</span>
              <p>
                &ldquo;One Nation, Connected: Integration of Land, Sea, and Air
                Infrastructure&rdquo; — Focusing on archipelagic connectivity, logistics cost
                reduction (14% → 8% of GDP by 2045), and national transport priorities 2025–2029.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="eastsSection eastsSpeakerBand">
        <div className="wideShell">
          <div className="eastsSectionIntro">
            <span>Academic Keynotes</span>
            <h2>Four global transport scholars on the EASTS stage.</h2>
          </div>
          <div className="eastsSpeakerDetailGrid">
            {speakers.map((speaker) => (
              <div className="eastsSpeakerDetail" key={speaker.name}>
                <img src={speaker.image} alt={speaker.name} />
                <div className="eastsSpeakerDetailInfo">
                  <h2>{speaker.name}</h2>
                  <span>{speaker.affiliation}</span>
                  <div className="eastsSpeakerDetailTopic">&ldquo;{speaker.topic}&rdquo;</div>
                  <p>{speaker.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
