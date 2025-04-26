import type { Metadata } from "next";

import "../assets/globals.css";
import localFont from 'next/font/local'
import StyledComponentsRegistry from "@/components/StyledComponentsRegistry";
import { interDisplay, jetBrainsMono } from "@/assets/fonts";


// Use local font instead (you'll need to download the font files)





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
      <body className={`${interDisplay.variable} font-feature-ss01 ${jetBrainsMono.variable}`}
      >
        <StyledComponentsRegistry>
          {children}
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
