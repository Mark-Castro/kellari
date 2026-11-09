import type { Metadata } from 'next';
import CTABanner from '../../../components/features/cta-banner';
import Hero from '../../../components/features/hero';
import LegalDisclaimerBlock from '../../../components/features/legal-disclaimer-block';
import ServiceDetailGrid from '../../../components/features/service-detail-grid';
import {
  ServiceCapabilityList,
  ServiceOverviewCopy,
} from '../../../components/features/service-page-sections';
import { serviceCategories } from '../../../lib/navigation';

export const metadata: Metadata = {
  title: 'Financial & Tax Advisory | Kelari Group',
  description:
    'Tax, financial planning, risk and reporting expertise to keep your organization compliant and positioned for growth.',
};

const category = serviceCategories[1];
const overview = [
  'Sound financial management underpins every successful organization. It shapes how confidently you invest, how well you withstand uncertainty, and how much value you build over time.',
  'The financial environment is becoming more demanding. Tax rules change frequently, authorities are strengthening enforcement and digital filing, and lenders, investors, and regulators expect accurate, timely reporting. A single error or missed deadline can lead to penalties and lost credibility.',
  'Economic uncertainty adds further pressure. Fluctuating costs, interest rates, and currency movements make reliable forecasting, cash-flow management, and risk planning essential, especially for growing businesses with little margin for error.',
  'Long-term value also needs protecting. Business owners, families, and individuals need clear plans for how their assets are managed, grown, and eventually passed on.',
  'We help businesses and individuals manage compliance, plan ahead, and protect what they have built. Our advice combines technical accuracy with practical, plain-language guidance, so you understand your position and can make decisions with confidence.',
];
const capabilities = [
  'Tax planning, filing and compliance reviews',
  'Budgeting, forecasting and cash-flow planning',
  'Financial risk identification and mitigation',
  'Monthly bookkeeping and management reporting',
  'Long-term asset and wealth planning',
];

export default function FinancialTaxPage() {
  return (
    <main>
      <Hero
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: 'Financial & Tax Advisory' },
        ]}
        eyebrow="Services"
        title="Financial clarity. Lasting value."
        description="Tax, financial planning and reporting expertise to keep you compliant, informed and positioned for long-term growth."
        primaryAction={{ label: 'Speak with an advisor', href: '/contact' }}
        secondaryAction={{ label: 'View all services', href: '/services' }}
      />
      <ServiceOverviewCopy paragraphs={overview} />
      <ServiceDetailGrid items={category.services} />
      <ServiceCapabilityList items={capabilities} />
      <LegalDisclaimerBlock />
      <CTABanner
        title="Put your finances on a stronger footing"
        description="Speak with our financial and tax advisors about your goals."
        buttonLabel="Request a consultation"
      />
    </main>
  );
}
