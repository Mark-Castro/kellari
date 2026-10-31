import type { Metadata } from 'next';
import CTABanner from '../../../components/features/cta-banner';
import Hero from '../../../components/features/hero';
import LegalDisclaimerBlock from '../../../components/features/legal-disclaimer-block';
import ServiceDetailGrid from '../../../components/features/service-detail-grid';
import { serviceCategories } from '../../../lib/navigation';

export const metadata: Metadata = {
  title: 'Financial & Tax',
};

const category = serviceCategories[1];

export default function FinancialTaxPage() {
  return (
    <main>
      <Hero
        eyebrow="Services"
        title="Financial & Tax Advisory"
        description="Build financial clarity with connected tax, planning, wealth, and reporting support."
        primaryAction={{ label: 'Talk to an advisor', href: '/contact' }}
        secondaryAction={{ label: 'View all services', href: '/services' }}
      />
      <ServiceDetailGrid items={category.services} />
      <LegalDisclaimerBlock />
      <CTABanner
        title="Let’s discuss your financial priorities"
        description="Connect with our team to explore the right support for your situation."
        buttonLabel="Talk to an advisor"
      />
    </main>
  );
}
