import type { Metadata } from 'next';
import PracticeAreaExperience from '../../../components/services/PracticeAreaExperience';
import servicePageCopy from '../../../lib/service-page-copy.json';
import { serviceCategories } from '../../../lib/navigation';

export const metadata: Metadata = {
  title: 'Sustainability & Public Impact | Kelari Group',
  description:
    'ESG consulting and public-sector advisory to help organizations operate responsibly and serve people effectively.',
};

const category = servicePageCopy.categories[2];

export default function SustainabilityPublicImpactPage() {
  return (
    <PracticeAreaExperience
      practiceTitle={serviceCategories[2].shortTitle}
      heroTitle="Sustainable progress. Public value."
      heroDescription="ESG and public-sector expertise to help organisations operate responsibly and institutions serve people more effectively."
      thesis="Sustainability and public accountability now shape how organizations are financed, trusted and judged. Build credible impact while strengthening the services and systems people rely on."
      pillars={[
        {
          title: 'Credible ESG Strategy',
          description:
            'Set clear sustainability priorities, targets and reporting that connect commitments to measurable action.',
        },
        {
          title: 'Climate & Operational Resilience',
          description:
            'Understand climate exposure and build more sustainable, adaptable operating models.',
        },
        {
          title: 'Effective Public Services',
          description:
            'Strengthen governance, accountability and the delivery of accessible, citizen-focused services.',
        },
      ]}
      services={category.servicesInDetail}
      fit={category.fit}
      capabilities={[
        'ESG strategy and reporting frameworks',
        'Climate risk assessment',
        'Sustainable operating models',
        'Governance and service-delivery reviews',
        'Public-sector modernization programs',
      ]}
      whyItMatters={category.whyItMatters}
      waysToWork={category.waysToWork}
      faqs={category.faqs}
      ctaHeading={category.ctaHeading}
      ctaText={category.ctaText}
    />
  );
}
