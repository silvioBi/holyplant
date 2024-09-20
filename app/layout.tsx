import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import StructuredData from "@/components/StructuredData";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: 'HolyPlant - Your Trusted Plant Sitting Service',
  description: "HolyPlant connects plant owners with passionate plant sitters. Find reliable care for your green friends while you're away.",
  keywords: ['plant sitting', 'plant care', 'plant sitter', 'house plants'],
  openGraph: {
    title: 'HolyPlant - Your Trusted Plant Sitting Service',
    description: "Find reliable care for your plants while you're away",
    url: 'https://www.holyplant.net',
    siteName: 'HolyPlant',
    images: [
      {
        url: 'https://www.holyplant.com/api/og?title=HolyPlant&description=Your%20Trusted%20Plant%20Sitting%20Service',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  // twitter: {
  //   card: 'summary_large_image',
  //   title: 'HolyPlant - Your Trusted Plant Sitting Service',
  //   description: "Find reliable care for your plants while you're away",
  //   images: ['https://www.holyplant.net/twitter-image.jpg'], // You'll need to create this image
  // },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en">
      <head>
        <StructuredData/>
        <link rel="icon" href="/favicon.ico" sizes="any"/>
      </head>
      <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
      {children}
      </body>
      </html>
  );
}
