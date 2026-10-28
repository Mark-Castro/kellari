import type { Metadata } from 'next';
import CTABanner from '../../components/features/cta-banner';
import Hero from '../../components/features/hero';
import IndustryGrid from '../../components/features/industry-grid';

export const metadata: Metadata = {
  title: 'Industries',
};

export default function IndustriesPage() {
  return (
    <main>
      <Hero
        eyebrow="Who we work with"
        title="Industries We Serve"
        description="We bring cross-sector experience and practical insight to the challenges organizations face."
      />
      <IndustryGrid
        items={[
          { title: 'Public Sector', href: '/industries/public-sector' },
          { title: 'Financial Services', href: '/industries/financial-services' },
          { title: 'Consumer & Retail', href: '/industries/consumer-retail' },
          { title: 'Healthcare', href: '/industries/healthcare' },
          { title: 'Technology', href: '/industries/technology' },
        ]}
      />
      <CTABanner title="Have a challenge in mind?" />
    </main>
  );
}
