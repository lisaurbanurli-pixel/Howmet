import type React from "react";
import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const geist = Geist({ subsets: ["latin"] });

const CANONICAL_LOGIN_URL = "https://www.howmet.com/";
const SITE_DOMAIN = "www.howmet.com";
const SITE_BRAND = "Howmet Aerospace";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL || "https://www.howmet.com",
  ),
  title: {
    default: "Login- Howmet",
    template: "%s | Howmet Aerospace",
  },
  keywords: [
    "Howmet Aerospace",
    "Howmet login",
    "Howmet employee portal",
    "Howmet HR portal",
    "aerospace employee login",
    "aerospace HR login",
    "aircraft component supplier",
    "aerospace manufacturing login",
    "aerospace benefits portal",
    "Howmet employee services",
  ],
  description: `${SITE_BRAND} – ${SITE_DOMAIN}. Access your Howmet Aerospace employee benefits and HR services in the United States. Sign in to manage benefits, view pay information, and access company resources. Official login portal.`,

  authors: [{ name: "Howmet Aerospace" }],
  creator: "Howmet Aerospace",
  publisher: "Howmet Aerospace",
  applicationName: SITE_BRAND,
  referrer: "origin-when-cross-origin",
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
    title: "Login- Howmet",
    description: `${SITE_BRAND} at ${SITE_DOMAIN}. Access Howmet Aerospace employee benefits and HR services in the United States. Sign in to manage benefits and pay.`,
    siteName: SITE_BRAND,
    url: CANONICAL_LOGIN_URL,
    images: [
      {
        url: "/favicon-32x32.png",
        width: 32,
        height: 32,
        alt: `${SITE_BRAND} – Alight WorkLife`,
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Login- Howmet",
    description: `${SITE_BRAND} at ${SITE_DOMAIN}. Access Howmet Aerospace employee benefits and HR services. Sign in to manage benefits and pay.`,
    images: ["/favicon-32x32.png"],
  },
  icons: {
    icon: "/favicon-32x32.png",
    shortcut: "/favicon-32x32.png",
    apple: "/favicon-32x32.png",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
  themeColor: "#254650",
  category: "Business",
  alternates: {
    canonical: CANONICAL_LOGIN_URL,
    languages: {
      "en-US": CANONICAL_LOGIN_URL,
    },
  },
  other: {
    "geo.region": "US",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_BRAND,
  url: CANONICAL_LOGIN_URL,
  description:
    "Howmet Aerospace employee benefits and HR portal. Login to manage benefits, pay, and company resources.",
  publisher: {
    "@type": "Organization",
    name: "Alight Solutions",
  },
  inLanguage: "en-US",
  potentialAction: {
    "@type": "SearchAction",
    target: { "@type": "EntryPoint", url: CANONICAL_LOGIN_URL },
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-US">
      <body className={`${geist.className} font-sans antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
