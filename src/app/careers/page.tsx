import type { Metadata } from 'next';
import CTABanner from '../../components/features/cta-banner';
import Hero from '../../components/features/hero';

export const metadata: Metadata = {
  title: 'Careers',
};

export default function CareersPage() {
  return (
    <main>
      <Hero
        eyebrow="Careers"
        title="Do meaningful work with us"
        description="Bring your perspective, curiosity, and expertise to work that helps organizations move forward."
        primaryAction={{ label: 'Get in touch', href: '/contact' }}
      />
      <CTABanner title="Interested in joining Kellari?" buttonLabel="Contact us" />
    </main>
  );
}
