import type { Metadata } from 'next';
import CTABanner from '../../../components/features/cta-banner';
import Hero from '../../../components/features/hero';

export const metadata: Metadata = {
  title: 'Sustainability & Public Impact',
};

export default function SustainabilityPublicImpactPage() {
  return (
    <main>
      <Hero
        eyebrow="Services"
        title="Sustainability & Public Impact"
        description="Turn sustainability and public impact ambitions into measurable progress."
        primaryAction={{ label: 'Explore a partnership', href: '/contact' }}
      />
      <CTABanner title="Build impact that lasts" />
    </main>
  );
}
