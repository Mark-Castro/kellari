import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import GoogleAnalytics from '../components/analytics/google-analytics';
import CookieConsentBanner from '../components/layout/cookie-consent-banner';
import Footer from '../components/layout/footer';
import FloatingWhatsAppLink from '../components/layout/floating-whatsapp-link';
import Navbar from '../components/layout/navbar';
import PageTransition from '../components/motion/page-transition';
import './globals.css';

export const metadata: Metadata = {
  title: 'Kellari',
  description: 'Corporate website scaffold',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <PageTransition>{children}</PageTransition>
        <Footer />
        <FloatingWhatsAppLink />
        <CookieConsentBanner />
        <GoogleAnalytics />
      </body>
    </html>
  );
}
