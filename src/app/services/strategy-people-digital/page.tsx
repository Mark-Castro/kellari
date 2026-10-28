import type { Metadata } from 'next';
import CTABanner from '../../../components/features/cta-banner';
import Hero from '../../../components/features/hero';

export const metadata: Metadata = {
  title: 'Strategy & People Digital',
};

export default function StrategyPeopleDigitalPage() {
  return (
    <main>
      <Hero
        eyebrow="Services"
        title="Strategy & People Digital"
        description="Align strategy, people, and technology to make meaningful progress."
        primaryAction={{ label: 'Discuss your goals', href: '/contact' }}
      />
      <CTABanner title="Ready to turn strategy into action?" />
    </main>
  );
}
