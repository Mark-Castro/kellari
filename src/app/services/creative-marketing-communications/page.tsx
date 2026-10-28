import type { Metadata } from 'next';
import CTABanner from '../../../components/features/cta-banner';
import Hero from '../../../components/features/hero';

export const metadata: Metadata = {
  title: 'Creative Marketing & Communications',
};

export default function CreativeMarketingCommunicationsPage() {
  return (
    <main>
      <Hero
        eyebrow="Services"
        title="Creative Marketing & Communications"
        description="Develop clear, creative communications that connect your work to its audience."
        primaryAction={{ label: 'Plan a project', href: '/contact' }}
      />
      <CTABanner title="Make your message matter" />
    </main>
  );
}
