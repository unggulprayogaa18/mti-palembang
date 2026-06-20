import "./globals.css";

export const metadata = {
  title: "MTI | Masyarakat Transportasi Indonesia",
  description:
    "Portal newsroom Masyarakat Transportasi Indonesia untuk berita, kegiatan, rekomendasi kebijakan, wilayah, media, dan newsletter."
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Lora:ital,wght@1,500;1,600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
