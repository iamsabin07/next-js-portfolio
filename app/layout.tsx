import type { Metadata } from "next";
import "./globals.css";

const BASE_URL = "https://iamsabin07.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Sabin Thapa — Full Stack Engineer",
    template: "%s | Sabin Thapa",
  },
  description:
    "Sabin Thapa — Full Stack Engineer with 4+ years building production-grade software across the full stack: cloud infrastructure, distributed systems, AI/LLM integration, and real-time platforms.",
  keywords: [
    "Sabin Thapa",
    "Full Stack Engineer",
    "React",
    "Next.js",
    "Node.js",
    "TypeScript",
    "AWS",
    "Azure",
    "AI Integration",
    "Software Engineer",
    "Kearny NJ",
  ],
  authors: [{ name: "Sabin Thapa", url: BASE_URL }],
  creator: "Sabin Thapa",
  publisher: "Sabin Thapa",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "Sabin Thapa",
    title: "Sabin Thapa — Full Stack Engineer",
    description:
      "4+ years building production-grade software across the full stack — cloud infrastructure, distributed systems, AI/LLM integration — with measurable impact at every layer.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Sabin Thapa — Full Stack Engineer",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sabin Thapa — Full Stack Engineer",
    description:
      "4+ years building production-grade software across the full stack — cloud, AI/LLM, distributed systems.",
    images: ["/og-image.png"],
    creator: "@iamsabin07",
  },
  alternates: {
    canonical: BASE_URL,
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/icon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
  },
  manifest: "/site.webmanifest",
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="night">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Tenor+Sans&display=swap"
          rel="stylesheet"
        />
        {/* JSON-LD structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Sabin Thapa",
              url: BASE_URL,
              image: `${BASE_URL}/og-image.png`,
              sameAs: [
                "https://linkedin.com/in/iamsabin07",
                "https://iamsabin07.com",
              ],
              jobTitle: "Full Stack Engineer",
              worksFor: {
                "@type": "Organization",
                name: "Applied Dynamic Solutions",
              },
              address: {
                "@type": "PostalAddress",
                addressLocality: "Kearny",
                addressRegion: "NJ",
                addressCountry: "US",
              },
              email: "sabin.thapa07051999@gmail.com",
              telephone: "+18622203587",
              knowsAbout: [
                "React",
                "Next.js",
                "Node.js",
                "TypeScript",
                "AWS",
                "Azure",
                "AI/LLM Integration",
                "Cloud Infrastructure",
                "Distributed Systems",
              ],
            }),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
