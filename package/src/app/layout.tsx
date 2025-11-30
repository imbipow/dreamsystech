import { DM_Sans } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import ScrollToTop from "@/components/ScrollToTop";

const dmsans = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL('https://dreamsystech.com.au'),
  title: {
    default: 'DreamSys Technologies - Digital Property Manager for Australian Businesses',
    template: '%s | DreamSys Technologies'
  },
  description: 'Stop losing local customers to your competitors. We manage, fix, and rank your digital presence so you show up #1 on Google Maps. Based in Truganina, servicing all of Australia.',
  keywords: ['digital marketing', 'local SEO', 'website maintenance', 'Google Maps ranking', 'Truganina', 'Melbourne', 'Australia', 'digital property manager'],
  authors: [{ name: 'DreamSys Technologies' }],
  creator: 'DreamSys Technologies',
  publisher: 'DreamSys Technologies',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_AU',
    url: 'https://dreamsystech.com.au',
    siteName: 'DreamSys Technologies',
    title: 'DreamSys Technologies - Your Digital Property Manager',
    description: 'Stop losing local customers to your competitors. We manage, fix, and rank your digital presence so you show up #1 on Google Maps.',
    images: [
      {
        url: '/images/logo/logo.png',
        width: 1200,
        height: 630,
        alt: 'DreamSys Technologies Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DreamSys Technologies - Your Digital Property Manager',
    description: 'Stop losing local customers to your competitors. We manage, fix, and rank your digital presence.',
    images: ['/images/logo/logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google-site-verification-code', // Add your Google verification code
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${dmsans.className}`}>
        <Header />
        {children}
        <Footer />
        <ScrollToTop />
      </body>
    </html>
  );
}
