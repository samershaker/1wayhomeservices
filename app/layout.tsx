import type { Metadata } from "next";
import { Syne, DM_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { StructuredData } from "@/components/StructuredData";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://1wayhomeservices.com'),
  title: {
    default: "1Way Home Services | Tax Preparation & Real Estate",
    template: "%s | 1Way Home Services"
  },
  description: "1Way Home Services — Tax Preparation, Real Estate Tax, and Mortgage Consulting in El Cajon and San Diego. 6 years, 100+ repeat customers, 100% satisfaction.",
  keywords: [
    "tax preparation San Diego",
    "tax advisor El Cajon",
    "real estate tax planning",
    "bookkeeping services",
    "IRS audit support",
    "mortgage consulting",
    "tax filing San Diego"
  ],
  authors: [{ name: "1Way Home Services" }],
  creator: "1Way Home Services",
  publisher: "1Way Home Services",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://1wayhomeservices.com',
    siteName: '1Way Home Services',
    title: '1Way Home Services | Tax Preparation & Real Estate',
    description: "Tax Preparation, Real Estate Tax, and Mortgage Consulting serving El Cajon and San Diego.",
    images: [
      {
        url: '/images/logo-color.png',
        width: 800,
        height: 300,
        alt: '1Way Home Services',
      },
    ],
  },
  alternates: {
    canonical: 'https://1wayhomeservices.com',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <StructuredData type="all" />
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className={`${syne.variable} ${dmSans.variable} antialiased bg-black text-white`}>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
