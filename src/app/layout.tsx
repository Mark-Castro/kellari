import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Footer from '../components/layout/footer';
import Navbar from '../components/layout/navbar';
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
        {children}
        <Footer />
      </body>
    </html>
  );
}
