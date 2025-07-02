import "~/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";

import { TRPCReactProvider } from "~/trpc/react";

export const metadata: Metadata = {
  title: {
    default: "Executive Analytics Dashboard - Business Intelligence Platform",
    template: "%s | Executive Analytics Dashboard"
  },
  description: "Comprehensive executive analytics dashboard providing real-time business intelligence, KPI tracking, sales analytics, and strategic insights for CEOs and business leaders.",
  keywords: [
    "executive dashboard",
    "business intelligence",
    "analytics platform",
    "KPI tracking",
    "sales analytics",
    "business metrics",
    "executive reports",
    "data visualization",
    "business insights",
    "strategic analytics"
  ],
  authors: [{ name: "Executive Analytics Team" }],
  creator: "Executive Analytics Platform",
  publisher: "Executive Analytics",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://analytical-dashboard-bla2spli8-eslams-projects-65f31d20.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://analytical-dashboard-bla2spli8-eslams-projects-65f31d20.vercel.app",
    title: "Executive Analytics Dashboard - Business Intelligence Platform",
    description: "Comprehensive executive analytics dashboard providing real-time business intelligence, KPI tracking, and strategic insights for business leaders.",
    siteName: "Executive Analytics Dashboard",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Executive Analytics Dashboard - Business Intelligence Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Executive Analytics Dashboard - Business Intelligence Platform",
    description: "Comprehensive executive analytics dashboard providing real-time business intelligence and strategic insights.",
    images: ["/og-image.png"],
    creator: "@ExecutiveAnalytics",
  },
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
  icons: [
    { rel: "icon", url: "/favicon.ico" },
    { rel: "apple-touch-icon", url: "/apple-touch-icon.png" },
  ],
  manifest: "/site.webmanifest",
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable}`}>
      <body>
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  );
}
