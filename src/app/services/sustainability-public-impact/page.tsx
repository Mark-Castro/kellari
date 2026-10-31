import type { Metadata } from 'next';
import CTABanner from '../../../components/features/cta-banner';
import Hero from '../../../components/features/hero';
import ServiceDetailGrid from '../../../components/features/service-detail-grid';
import { serviceCategories } from '../../../lib/navigation';

export const metadata: Metadata = {
  title: 'Sustainability & Public Impact',
};

const category = serviceCategories[2];

export default function SustainabilityPublicImpactPage() {
  return (
    <main>
      <Hero
        eyebrow="Services"
        title="Sustainability & Public Impact"
        description="Turn sustainability ambitions and public-service priorities into thoughtful, measurable progress."
        primaryAction={{ label: 'Explore a partnership', href: '/contact' }}
        secondaryAction={{ label: 'View all services', href: '/services' }}
      />
      <ServiceDetailGrid items={category.services} />
      <CTABanner
        title="Build impact that lasts"
        description="Let’s identify the actions that can make a meaningful difference."
        buttonLabel="Explore a partnership"
      />
    </main>
  );
}
