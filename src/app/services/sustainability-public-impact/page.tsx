import type { Metadata } from 'next';
import CTABanner from '../../../components/features/cta-banner';
import Hero from '../../../components/features/hero';
import {
  ServiceCapabilityList,
  ServiceOverviewCopy,
} from '../../../components/features/service-page-sections';
import ServiceDetailGrid from '../../../components/features/service-detail-grid';
import { serviceCategories } from '../../../lib/navigation';

export const metadata: Metadata = {
  title: 'Sustainability & Public Impact | Kelari Group',
  description:
    'ESG consulting and public-sector advisory to help organizations operate responsibly and serve people effectively.',
};

const category = serviceCategories[2];
const overview = [
  'Sustainability and public accountability have moved from the margins to the center of how organizations are judged. Investors, regulators, customers, and communities now expect clear evidence of environmental and social responsibility.',
  'For businesses, this means more than good intentions. ESG reporting requirements are expanding, lenders and investors increasingly link financing to sustainability performance, and climate risk can affect operations, supply chains, and asset values. Organizations that act early reduce their risk and often find new opportunities for efficiency and growth.',
  'Public institutions face their own pressures. Citizens expect faster, more transparent, and more accessible services, while budgets remain tight and scrutiny of public spending is high. Modernizing governance and service delivery is essential to maintaining public trust.',
  'The two challenges are closely linked. Many of the most important issues of our time, from climate resilience to inclusive growth, require businesses, governments, and development partners to work together.',
  'We help businesses build credible sustainability strategies that create real value, and we support governments and public bodies to strengthen governance, improve services, and deliver measurable results for the people they serve.',
];
const capabilities = [
  'ESG strategy and reporting frameworks',
  'Climate risk assessment',
  'Sustainable operating models',
  'Governance and service-delivery reviews',
  'Public-sector modernization programs',
];

export default function SustainabilityPublicImpactPage() {
  return (
    <main>
      <Hero
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: 'Sustainability & Public Impact' },
        ]}
        eyebrow="Services"
        title="Sustainable progress. Public value."
        description="ESG and public-sector expertise to help organisations operate responsibly and institutions serve people more effectively."
        primaryAction={{ label: 'Speak with an advisor', href: '/contact' }}
        secondaryAction={{ label: 'View all services', href: '/services' }}
      />
      <ServiceOverviewCopy paragraphs={overview} />
      <ServiceDetailGrid items={category.services} />
      <ServiceCapabilityList items={capabilities} />
      <CTABanner
        title="Build a more sustainable, accountable organization"
        description="Speak with our sustainability and public impact team."
        buttonLabel="Request a consultation"
      />
    </main>
  );
}
