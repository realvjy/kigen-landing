import type { Metadata } from "next";

import "../assets/globals.css";
import localFont from 'next/font/local'
import StyledComponentsRegistry from "@/components/StyledComponentsRegistry";
import { interDisplay, jetBrainsMono } from "@/assets/fonts";
import seoData from "@/components/next-seo.config";
import AnalyticsProvider from "@/lib/analytics";
// Use local font instead (you'll need to download the font files)






export const metadata: Metadata = {
  metadataBase: new URL(seoData.openGraph.url),
  title: {
    default: seoData.openGraph.title,
    template: " %s",
  },
  description: seoData.openGraph.description,
  keywords: seoData.openGraph.keywords,
  openGraph: {
    type: "website",
    description: seoData.openGraph.description,
    url: seoData.openGraph.url,
    title: seoData.openGraph.title,
    locale: "en_EN",
    siteName: "Kigen",
    images: [
      {
        width: 1200,
        height: 630,
        url: seoData.openGraph.images[0].url,
        alt: seoData.openGraph.title,
      },
    ],
  },
  twitter: {
    title: seoData.openGraph.title,
    description: seoData.openGraph.description,
    creator: seoData.twitter.handle,
    creatorId: seoData.twitter.id,
    site: "https://x.com/realvjy",
    images: [seoData.openGraph.images[0].url],
  },
};

const seoConfig = {
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://kigen.design/",
    siteName: "Kigen",
  },
  twitter: {
    cardType: "summary_large_image",
    site: "https://x.com/realvjy",
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${interDisplay.variable} font-feature-ss01 ${jetBrainsMono.variable}`}
      >
        <AnalyticsProvider>
          <StyledComponentsRegistry>
            {children}
          </StyledComponentsRegistry>
        </AnalyticsProvider>
      </body>
    </html>
  );
}
