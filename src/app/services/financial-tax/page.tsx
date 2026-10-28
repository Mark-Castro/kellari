import type { Metadata } from 'next';
import CTABanner from '../../../components/features/cta-banner';
import Hero from '../../../components/features/hero';

export const metadata: Metadata = {
  title: 'Financial & Tax',
};

export default function FinancialTaxPage() {
  return (
    <main>
      <Hero
        eyebrow="Services"
        title="Financial & Tax"
        description="Make informed financial decisions and navigate tax considerations with clarity."
        primaryAction={{ label: 'Talk to an advisor', href: '/contact' }}
      />
      <CTABanner title="Let's discuss your financial priorities" />
    </main>
  );
}
