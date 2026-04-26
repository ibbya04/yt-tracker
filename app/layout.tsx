import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Banner from '@/components/Banner';
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: 'Corporate YouTube Tracker',
    template: '%s | Corporate YouTube Tracker', // %s will be replaced by page-specific titles
  },
  description: 'Monitoring private equity acquisitions and corporate ownership in the creator economy',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-50 antialiased">
        <Banner /> {/* This stays at the top of every page */}
        {children}
      </body>
    </html>
  );
}
