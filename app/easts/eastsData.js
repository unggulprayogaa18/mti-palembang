export const eastsNav = [
  { label: "Theme", href: "/easts/theme" },
  { label: "Programs", href: "/easts/programs" },
  { label: "Venue and Schedule", href: "/easts/venue" },
  { label: "Registration and Fee", href: "/easts/registration" },
  { label: "Committee", href: "/easts/committee" },
  {
    label: "About",
    href: "/easts/about",
    children: [
      { label: "EASTS", href: "/easts/about" },
      { label: "MTI", href: "/easts/about/mti" }
    ]
  },
  { label: "News", href: "/easts/news" },
  { label: "The 4th ECR Transport Forum 2025", href: "/easts/ecr-forum" },
  { label: "Discovering Solo", href: "/easts/discovering-solo" },
  { label: "Travel & Logistics", href: "/easts/travel-logistics" },
  { label: "City and Cultural Tours", href: "/easts/city-cultural-tours" },
  { label: "JTTRI Special Award 2025", href: "/easts/jttri-award" },
  { label: "FAQ", href: "/easts/faq" },
  { label: "EASTS 2025 Live Streaming", href: "/easts/live-streaming" },
  { label: "Keynote Speech", href: "/easts/keynote-speech" },
  { label: "Sponsor", href: "/easts/sponsor" },
  {
    label: "Documentation",
    href: "/easts/documentation/day-one",
    children: [
      { label: "Day One", href: "/easts/documentation/day-one" },
      { label: "Day Two", href: "/easts/documentation/day-two" },
      { label: "Day Three", href: "/easts/documentation/day-three" }
    ]
  },
  { label: "Presentation File", href: "/easts/presentation-file" }
];

export const speakers = [
  {
    name: "Prof. Yusak Octavius Susilo",
    affiliation: "BOKU University, Austria",
    image: "https://cdna.uns.ac.id/wp-content/uploads/sites/14/2025/03/yusak.png",
    topic: "Sustainable transport behavior and emerging mobility in Eastern Asia",
    bio: "Professor of Transport and Society at BOKU University Vienna. Former Chair of EASTS and leading expert on travel behavior and sustainable mobility transitions in rapidly urbanizing regions."
  },
  {
    name: "Prof. Ronghui Liu",
    affiliation: "University of Leeds, UK",
    image: "https://cdna.uns.ac.id/wp-content/uploads/sites/14/2025/03/rong.png",
    topic: "Traffic flow modelling and intelligent transport systems",
    bio: "Professor of Transport at the Institute for Transport Studies, University of Leeds. Her research focuses on traffic simulation, network modelling, and the integration of AI into transport planning."
  },
  {
    name: "Assoc. Prof. Makoto Chikaraishi",
    affiliation: "Hiroshima University, Japan",
    image: "https://cdna.uns.ac.id/wp-content/uploads/sites/14/2025/03/mc.jpg",
    topic: "Activity-based travel demand analysis and urban mobility",
    bio: "Associate Professor at the Graduate School of Advanced Science and Engineering, Hiroshima University. Specializes in activity-based travel demand modeling and behavioral economics applied to transport."
  },
  {
    name: "Prof. Tim Schwanen",
    affiliation: "University of Oxford, UK",
    image: "https://cdna.uns.ac.id/wp-content/uploads/sites/14/2025/03/schwanen.png",
    topic: "Transport geography and sustainability transitions",
    bio: "Professor of Transport Studies and Director of the Transport Studies Unit, University of Oxford. His work bridges transport geography, human geography, and sustainability science."
  }
];

export const reviewedPapers = [
  { date: "September 30, 2024", event: "Call for papers" },
  { date: "February 15, 2025", event: "Deadline for paper submission" },
  { date: "May 30, 2025", event: "Notification of review results for full papers" },
  { date: "July 9, 2025", event: "Deadline for revised paper submission" },
  { date: "July 23, 2025", event: "Deadline for registration for conference presentations" },
  { date: "September 1–4, 2025", event: "The 16th International Conference of EASTS" },
  { date: "November 5, 2025", event: "Notification of acceptance of revised paper for Journal of EASTS" },
  { date: "November 27, 2025", event: "Publication of Proceedings of the EASTS" },
  { date: "December 27, 2025", event: "Publication of Journal of the EASTS" },
  { date: "January 31, 2026", event: "Expected Publication of ATS Vol. 11" }
];

export const nonReviewedPapers = [
  { date: "March 19, 2025", event: "Deadline for submission of one-page abstracts" },
  { date: "June 11, 2025", event: "Notification of acceptance of abstracts for presentations" },
  { date: "July 23, 2025", event: "Deadline for registration for conference presentations" },
  { date: "September 1–4, 2025", event: "The 16th International Conference of EASTS" }
];

export const topicCodes = [
  ["A", "Transportation General"],
  ["B", "Transportation Economics and Policy"],
  ["C", "Travel Demand Analysis and Forecast"],
  ["D", "Logistics and Freight Transportation"],
  ["E", "Regional Planning and Environment"],
  ["F", "Environment and Climate Change"],
  ["G", "Public and Non-motorized Transportation"],
  ["H", "Highway Design and Maintenance"],
  ["I", "Road Traffic Engineering"],
  ["J", "Traffic Accident and Safety"],
  ["K", "Air and Water Transportation"],
  ["L", "Emerging Technology and New Transport Industry"],
  ["P", "Practical Themes"]
];

export const feeRows = [
  { category: "Regular Member", earlyBird: "$140", normal: "$200" },
  { category: "Non-Regular Member (EASTS Country)", earlyBird: "$200", normal: "$240" },
  { category: "Non-Regular Member (Outside EASTS)", earlyBird: "$240", normal: "$300" },
  { category: "Student", earlyBird: "$30", normal: "$40" },
  { category: "Accompanying Person", earlyBird: "$40", normal: "$80" }
];

export const schedule = [
  {
    day: "Aug 31", label: "Pre-Conference", color: "#6366f1",
    sessions: ["Cultural procession — Loji Gandrung", "Early registration — UNS Tower Lobby"]
  },
  {
    day: "Sep 1", label: "Day 1", color: "#1d4ed8",
    sessions: ["Opening Ceremony — GPH Haryo Mataram Auditorium", "Keynote Speeches", "High-Level Session — Ballroom UNS Tower", "2 Technical Sessions", "MTI Expo", "Gala Dinner — Taman Balekambang"]
  },
  {
    day: "Sep 2", label: "Day 2", color: "#0891b2",
    sessions: ["High-Level Session", "3 Technical Sessions", "3 Side Events (specialized topics)", "MTI Expo"]
  },
  {
    day: "Sep 3", label: "Day 3", color: "#059669",
    sessions: ["4 Technical Sessions", "Book Review Session", "Closing Ceremony — Indraprasta Room, UNS Inn", "Farewell Dinner"]
  },
  {
    day: "Sep 4", label: "Day 4 (Field Trip)", color: "#d97706",
    sessions: ["Technical Tour — transportation infrastructure & facilities", "Cultural visits — Solo and surroundings"]
  }
];

export const patrons = [
  "Inf. (Ret.) H. Agus Harimurti Yudhoyono, MSc, MPA, MA — Coordinating Minister for Infrastructure",
  "Dudy Purwagandhi, S.H. — Minister of Transportation",
  "Dody Hanggodo — Minister of Public Works",
  "Komjen Pol. (Ret.) Drs. Ahmad Luthfi, SH, SSt MK — Governor of Central Java",
  "Respati Achmad Ardianto, SH, MKn — Mayor of Solo City"
];

export const steeringChair = "Tory Damantaro, ST, MPP, MSc — Chairman, MTI";

export const steeringMembers = [
  "Prof. Suyono Dikun", "Prof. Bambang Susantono", "Prof. Danang Parikesit",
  "Prof. Agus Taufik Mulyono", "Prof. Hartono", "Prof. Rivan A. Purwantono",
  "Arief Suhartono", "Pradana Murti", "DR (HC) Noni Sri Ayati Purnomo",
  "Muhammad Fauzan", "Muhammad Awwaludin", "Irawati Hermawan",
  "Polana Pramesti", "Ir. Milatia Kusuma"
];
