// This file is kept for backward compatibility.
// Actual data is now read server-side from data/berita.json via lib/cms.js.
// Client components that previously imported homeNews will get an empty array here;
// the real data is fetched server-side and passed as props.

export const homeNews = [];

export function getNewsBySlug(slug) {
  return homeNews.find((item) => item.slug === slug);
}
