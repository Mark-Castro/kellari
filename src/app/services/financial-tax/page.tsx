import type { Metadata } from 'next';
import PracticeAreaExperience from '../../../components/services/PracticeAreaExperience';
import servicePageCopy from '../../../lib/service-page-copy.json';
import { serviceCategories } from '../../../lib/navigation';

export const metadata: Metadata = {
  title: 'Financial & Tax Advisory | Kelari Group',
  description:
    'Tax, financial planning, risk and reporting expertise to keep your organization compliant and positioned for growth.',
};

const category = servicePageCopy.categories[1];

export default function FinancialTaxPage() {
  return (
    <PracticeAreaExperience
      practiceTitle={serviceCategories[1].shortTitle}
      heroTitle="Financial clarity. Lasting value."
      heroDescription="Tax, financial planning and reporting expertise to keep you compliant, informed and positioned for long-term growth."
      thesis="Sound financial management underpins every successful organization. It shapes how confidently you invest, how well you withstand uncertainty, and how much value you build over time."
      pillars={[
        {
          title: 'Regulatory & Tax Precision',
          description:
            'Stay ahead of changing requirements with reliable filings, practical tax planning and clear compliance support.',
        },
        {
          title: 'Cash-Flow & Risk Resilience',
          description:
            'Make informed decisions with realistic forecasts, working-capital visibility and a clear view of financial risk.',
        },
        {
          title: 'Generational & Asset Protection',
          description:
            'Protect and grow what you have built with considered wealth, succession and long-term asset planning.',
        },
      ]}
      services={category.servicesInDetail}
      fit={category.fit}
      capabilities={[
        'Tax planning, filing and compliance reviews',
        'Budgeting, forecasting and cash-flow planning',
        'Financial risk identification and mitigation',
        'Monthly bookkeeping and management reporting',
        'Long-term asset and wealth planning',
      ]}
      whyItMatters={category.whyItMatters}
      waysToWork={category.waysToWork}
      faqs={category.faqs}
      ctaHeading={category.ctaHeading}
      ctaText={category.ctaText}
      disclaimer="Information on this page is general in nature and is not tax, legal, accounting, investment, or other professional advice. It does not take account of your organization’s or personal circumstances. Consult an appropriately qualified professional before making decisions or taking action. Any advisory services are subject to a separate engagement agreement and applicable professional requirements."
    />
  );
}
