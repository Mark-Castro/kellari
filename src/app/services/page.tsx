import type { Metadata } from 'next';
import CTABanner from '../../components/features/cta-banner';
import Hero from '../../components/features/hero';
import ServiceOverview from '../../components/features/service-overview';

export const metadata: Metadata = {
  title: 'Services',
};

export default function ServicesPage() {
  return (
    <main>
      <Hero
        eyebrow="What we do"
        title="Our Services"
        description="Practical expertise to help organizations solve complex challenges and build what comes next."
        primaryAction={{ label: 'Talk to our team', href: '/contact' }}
      />
      <ServiceOverview
        items={[
          { title: 'Strategy, People & Digital', href: '/services/strategy-people-digital' },
          { title: 'Financial & Tax', href: '/services/financial-tax' },
          { title: 'Sustainability & Public Impact', href: '/services/sustainability-public-impact' },
          { title: 'Creative Marketing & Communications', href: '/services/creative-marketing-communications' },
        ]}
      />
      <CTABanner title="Find the right support for your next step" />
    </main>
  );
}
