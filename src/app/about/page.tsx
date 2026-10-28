import type { Metadata } from 'next';
import CTABanner from '../../components/features/cta-banner';
import Hero from '../../components/features/hero';

export const metadata: Metadata = {
  title: 'About',
};

export default function AboutPage() {
  return (
    <main>
      <Hero
        eyebrow="About Kellari"
        title="About Us"
        description="We work alongside organizations to solve meaningful challenges and create lasting value."
        primaryAction={{ label: 'Meet our team', href: '/careers' }}
      />
      <CTABanner title="Let's work on what matters" />
    </main>
  );
}
