import { Montserrat } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

import NextTopLoader from "nextjs-toploader";
import { Toaster } from "@/components/ui/sonner";
import { StoreProvider } from "@/app/StoreProvider";
import { SessionProvider } from "next-auth/react";
import { CurrencyProvider } from "@/lib/contexts/CurrencyContext";
import mongoose from "mongoose";

import openGraph from "./opengraph-image.jpg";
import MaintenancePage from "./MaintenancePage";
import { MaintenanceNotice } from "./MaintenanceNotice";
import SetNecessaryCookies from "./SetNecessaryCookies";
import { getOneDoc } from "@/lib/db/getOperationDB";
import { headers } from "next/headers";
import { Analytics } from "@vercel/analytics/next";
import { WebsiteJsonLd, OrganizationJsonLd } from "@/components/JsonLd";

const monse = Montserrat({
  subsets: ["latin"],
  variable: "--font-monserrat",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});
const tradegothic = localFont({
  src: "../public/fonts/gothic_extended.otf",
  variable: "--font-tradegothic",
  display: "swap",
});

export const metadata = {
  title: {
    default: "NordExplore | Tours & Adventures in Scandinavia",
    template: "%s | NordExplore",
  },
  description:
    "Discover amazing tours and experiences across Norway, Iceland, Sweden, Finland, and Denmark. Find Northern Lights tours, fjord cruises, wildlife safaris, glacier hikes, and more authentic Nordic adventures.",
  keywords: [
    "Nordic tours",
    "Scandinavia experiences",
    "Northern Lights tours",
    "Norway tours",
    "Iceland tours",
    "Sweden tours",
    "Finland tours",
    "Denmark tours",
    "fjord tours Norway",
    "wildlife safari Scandinavia",
    "nordic adventures",
    "aurora borealis tours",
    "whale watching Norway",
    "glacier hiking Iceland",
    "Lapland experiences",
    "Viking tours",
    "Scandinavian travel",
  ],
  authors: [{ name: "NordExplore" }],
  creator: "NordExplore",
  publisher: "NordExplore",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "NordExplore | Tours & Adventures in Scandinavia",
    description:
      "Discover amazing tours and experiences across Norway, Iceland, Sweden, Finland, and Denmark. Book Northern Lights tours, fjord cruises, wildlife safaris, and authentic Nordic adventures.",
    siteName: "NordExplore",
    images: [
      {
        url: openGraph.src,
        width: openGraph.width,
        height: openGraph.height,
        alt: "Nordic landscapes and adventures",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NordExplore | Tours & Adventures in Scandinavia",
    description:
      "Discover amazing tours and experiences across Norway, Iceland, Sweden, Finland, and Denmark.",
    images: [openGraph.src],
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
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION || "",
  },
  category: "travel",
};

export default async function RootLayout({ children }) {
  if (mongoose.connection.readyState === 0) {
    try {
      await mongoose.connect(process.env.MONGODB_URI);
    } catch (e) {
      console.log(e);
    }
  }

  const websiteConfig = await getOneDoc(
    "WebsiteConfig",
    {},
    ["websiteConfig"],
    60,
  );

  const maintenanceMode = websiteConfig?.maintenanceMode ?? { enabled: false };

  const alloweRoutesWhileMaintenance = maintenanceMode?.allowlistedRoutes ?? [];
  const currentPathname = headers().get("x-pathname");

  return (
    <html lang="en" className={`${tradegothic.variable} ${monse.variable}`}>
      <head />
      <body className={monse.className}>
        <WebsiteJsonLd />
        <OrganizationJsonLd />
        {maintenanceMode.enabled === true &&
        !alloweRoutesWhileMaintenance.some(
          (path) =>
            path === currentPathname ||
            (path !== "/" && currentPathname.startsWith(path)),
        ) ? (
          <MaintenancePage
            message={maintenanceMode.message}
            startsAt={maintenanceMode.startsAt || 0}
            endsAt={maintenanceMode.endsAt || 0}
          />
        ) : (
          <StoreProvider>
            <SessionProvider>
              <CurrencyProvider>
                <div className="mx-auto max-w-[1440px]">
                  <MaintenanceNotice maintenanceMode={maintenanceMode} />
                  {children}
                </div>
              </CurrencyProvider>
            </SessionProvider>
          </StoreProvider>
        )}
        <NextTopLoader showSpinner={false} color="hsl(159, 44%, 69%)" />
        <Toaster richColors closeButton expand position="top-right" />
        <SetNecessaryCookies />
        <Analytics />
      </body>
    </html>
  );
}
