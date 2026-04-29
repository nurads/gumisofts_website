import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import SiteShell from "@/components/SiteShell";
import { ReactQueryProvider } from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Gumisofts — Software products and custom development",
  description:
    "Gumisofts builds Bita Business, an inventory and sales management platform, and delivers custom web, mobile, and ERP software for ambitious teams.",
  icons: {
    icon: "/assets/gumicrop.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ReactQueryProvider>
          <SiteShell>{children}</SiteShell>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
