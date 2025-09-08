// app/layout.tsx
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import TopNav from "./TopNavigation/topnav";
import Footer from "@/components/Footer";
import ProvidersWrapper from "@/app/Components/ProvidersWrapper";
import React, { Suspense } from "react";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://shipraseeds.com"),
title: {
  default: "Shipra Seeds – Basmati Rice & Crop Seeds for Farmers",
  template: "%s | Shipra Seeds",
},
description:
  "Shipra Seeds offers premium basmati rice and crop seeds for farmers and retailers. Ensure high yield and healthy crops with our verified seed varieties.",

  alternates: {
    canonical: "https://shipraseeds.com",
  },
  openGraph: {
    type: "website",
    url: "https://shipraseeds.com",
    siteName: "Shipra Seeds",
    title: "Shipra Seeds – Quality Seeds for Better Harvests",
    description:
      "Shipra Seeds offers high-quality seeds for farmers and retailers, ensuring better yield and healthy crops.",
    images: [
      {
        url: "/logo.png", // ✅ add this image in /public
        width: 1200,
        height: 630,
        alt: "Shipra Seeds",
      },
    ],
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shipra Seeds – Quality Seeds for Better Harvests",
    description:
      "Shipra Seeds offers high-quality seeds for farmers and retailers, ensuring better yield and healthy crops.",
    images: ["https://shipraseeds.com/og-default.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#0d9488", // adjust to your brand color
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased relative`}
      >
        <ProvidersWrapper>
          <div className="absolute top-0 left-0 w-full z-50">
            <TopNav />
          </div>

          <main className="min-h-screen">
            <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
          </main>

          <Footer />
        </ProvidersWrapper>

        {/* ✅ Organization Schema (JSON-LD) */}
        <Script id="org-ld" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Shipra Seeds",
            url: "https://shipraseeds.com",
            logo: "/logo.png", // add logo.png in /public
            sameAs: [
              "https://www.instagram.com/shipraseeds?igsh=ZHFvYjZkbnBlNXNn&utm_source=qr",
            ],
          })}
        </Script>
      </body>
    </html>
  );
}
