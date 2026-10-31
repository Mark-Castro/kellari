import type { Metadata } from 'next';
import CTABanner from '../../../components/features/cta-banner';
import Hero from '../../../components/features/hero';
import ServiceDetailGrid from '../../../components/features/service-detail-grid';
import { serviceCategories } from '../../../lib/navigation';

export const metadata: Metadata = {
  title: 'Creative Marketing & Communications',
};

const category = serviceCategories[3];

export default function CreativeMarketingCommunicationsPage() {
  return (
    <main>
      <Hero
        eyebrow="Services"
        title="Creative, Marketing & Communications"
        description="Bring your brand, digital experience, and communications together to connect with the people who matter."
        primaryAction={{ label: 'Plan a project', href: '/contact' }}
        secondaryAction={{ label: 'View all services', href: '/services' }}
      />
      <ServiceDetailGrid items={category.services} />
      <CTABanner
        title="Make your message matter"
        description="Build a clear, creative approach around your audience and goals."
        buttonLabel="Plan a project"
      />
    </main>
  );
}
