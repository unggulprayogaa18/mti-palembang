export const metadata = { title: "News" };

const news = [
  {
    date: "July 2025",
    category: "Announcement",
    title: "Registration Deadline Extended to July 23, 2025",
    desc: "The deadline for conference presentation registration has been extended. All participants must register by July 23, 2025, 17:00 Bangkok Standard Time."
  },
  {
    date: "June 2025",
    category: "Program",
    title: "Keynote Speaker Line-Up Confirmed",
    desc: "EASTS 2025 is proud to confirm four world-class academic keynote speakers from BOKU Vienna, University of Leeds, Hiroshima University, and University of Oxford."
  },
  {
    date: "May 2025",
    category: "Announcement",
    title: "Paper Review Results Notification",
    desc: "Authors who submitted reviewed papers have been notified of their review results. Accepted authors must submit revised papers by July 9, 2025."
  },
  {
    date: "March 2025",
    category: "Registration",
    title: "Non-Reviewed Paper Abstract Submission Closed",
    desc: "The deadline for one-page abstract submission for non-reviewed papers has passed. Authors of accepted abstracts will be notified by June 11, 2025."
  },
  {
    date: "February 2025",
    category: "Program",
    title: "JTTRI Special Award 2025 Announced",
    desc: "The Japan Traffic & Transportation Research Institute (JTTRI) has announced a special award for outstanding papers at EASTS 2025 on the theme of road safety."
  },
  {
    date: "January 2025",
    category: "Event",
    title: "4th ECR Transport Forum 2025 Invitation Open",
    desc: "Early career researchers are invited to participate in the 4th ECR Transport Forum 2025, running alongside the main EASTS conference in Surakarta."
  }
];

export default function NewsPage() {
  return (
    <>
      <div className="eastsPageBanner">
        <div className="wideShell">
          <span className="eastsEyebrow">News</span>
          <h1>Latest news and announcements.</h1>
          <p>
            Stay updated on the latest developments, deadline changes, and announcements
            from the 16th EASTS Conference 2025.
          </p>
        </div>
      </div>

      <section className="eastsSection eastsAbout">
        <div className="wideShell">
          <div className="eastsSectionIntro">
            <span>Recent Updates</span>
            <h2>Conference news and announcements.</h2>
          </div>
          <div className="eastsNewsGrid">
            {news.map((item) => (
              <article className="eastsNewsCard" key={item.title}>
                <div className="eastsNewsCardImg" />
                <div className="eastsNewsCardBody">
                  <div className="eastsNewsCardMeta">
                    {item.category} &middot; {item.date}
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
