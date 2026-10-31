import type { Metadata } from 'next';
import CTABanner from '../../../components/features/cta-banner';
import Hero from '../../../components/features/hero';
import ServiceDetailGrid from '../../../components/features/service-detail-grid';
import { serviceCategories } from '../../../lib/navigation';

export const metadata: Metadata = {
  title: 'Strategy & People Digital',
};

const category = serviceCategories[0];

export default function StrategyPeopleDigitalPage() {
  return (
    <main>
      <Hero
        eyebrow="Services"
        title="Strategy, People & Digital Transformation"
        description="Set a clear direction, build organizational capability, and use technology thoughtfully to move your organization forward."
        primaryAction={{ label: 'Discuss your goals', href: '/contact' }}
        secondaryAction={{ label: 'View all services', href: '/services' }}
      />
      <ServiceDetailGrid items={category.services} />
      <CTABanner
        title="Ready to turn strategy into action?"
        description="Let’s talk about your organization’s next chapter."
        buttonLabel="Discuss your goals"
      />
    </main>
  );
}
