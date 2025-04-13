import type { Metadata } from "next";
import { Hanken_Grotesk } from "next/font/google";
import "./globals.css";
import localFont from 'next/font/local'


// Use local font instead (you'll need to download the font files)
const hankenGrotesk = localFont({
  src: [
    {
      path: '../assets/fonts/HankenGrotesk-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../assets/fonts/HankenGrotesk-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-hanken-grotesk',
});


export const metadata: Metadata = {
  title: "Kigen - Figma Design System Generatio",
  description: "Figma Generation",

};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${hankenGrotesk.variable} font-feature-ss01`}
      >
        {children}
      </body>
    </html>
  );
}
