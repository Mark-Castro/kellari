import type { Metadata } from 'next';
import CTABanner from '../components/features/cta-banner';
import Hero from '../components/features/hero';
import IndustryGrid from '../components/features/industry-grid';
import ServiceOverview from '../components/features/service-overview';
import { industryClusters } from '../lib/navigation';

export const metadata: Metadata = {
  title: 'Home',
};

export default function HomePage() {
  return (
    <main>
      <Hero
        eyebrow="Kellari"
        title="Welcome to Kellari"
        description="A trusted partner for strategy, operations, and sustainable growth."
        primaryAction={{ label: 'Explore our services', href: '/services' }}
        secondaryAction={{ label: 'Contact us', href: '/contact' }}
      />
      <ServiceOverview
        items={[
          {
            title: 'Strategy, People & Digital',
            description: 'Build the capabilities and direction to move your organization forward.',
            href: '/services/strategy-people-digital',
          },
          {
            title: 'Financial & Tax',
            description: 'Navigate financial decisions and tax requirements with confidence.',
            href: '/services/financial-tax',
          },
          {
            title: 'Sustainability & Public Impact',
            description: 'Create lasting value for communities, organizations, and the environment.',
            href: '/services/sustainability-public-impact',
          },
          {
            title: 'Creative Marketing & Communications',
            description: 'Connect your work with the people and audiences that matter.',
            href: '/services/creative-marketing-communications',
          },
        ]}
      />
      <IndustryGrid
        title="Industries we serve"
        items={industryClusters.map((cluster) => ({
          title: cluster.title,
          description: cluster.description,
          href: `/industries#${cluster.id}`,
        }))}
      />
      <CTABanner
        title="Let's move your organization forward"
        description="Talk with our team about the challenges and opportunities ahead."
        buttonLabel="Start a conversation"
      />
    </main>
  );
}
