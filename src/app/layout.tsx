import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import 'lenis/dist/lenis.css';
import GoogleAnalytics from '../components/analytics/google-analytics';
import CookieConsentBanner from '../components/layout/cookie-consent-banner';
import Footer from '../components/layout/footer';
import FloatingWhatsAppLink from '../components/layout/floating-whatsapp-link';
import Navbar from '../components/navigation/Navbar';
import PageTransition from '../components/motion/page-transition';
import SmoothScrollProvider from '../components/providers/SmoothScrollProvider';
import { THEME_BOOTSTRAP_SCRIPT } from '../lib/theme';
import './globals.css';

export const metadata: Metadata = {
  title: 'Kelari Group',
  description: 'Corporate website scaffold',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type={typeof window === 'undefined' ? 'text/javascript' : 'text/plain'}
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: THEME_BOOTSTRAP_SCRIPT }}
        />
      </head>
      <body>
        <SmoothScrollProvider>
          <Navbar />
          <PageTransition>{children}</PageTransition>
          <Footer />
          <FloatingWhatsAppLink />
          <CookieConsentBanner />
          <GoogleAnalytics />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
