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
  title: 'Strategy, People & Digital Transformation',
  description:
    'Strategy, organizational and digital expertise to help you set direction, build capability and compete in a technology-driven market.',
};

const category = serviceCategories[0];
const overview = [
  'Growth today depends on three things working together: a clear strategy, the right people, and technology that gives you an advantage. When one falls behind, the others suffer, and even strong organizations lose momentum.',
  'Markets are shifting faster than ever. New competitors, changing customer expectations, and rapid advances in artificial intelligence mean that plans that worked a few years ago may no longer hold. Leaders need a strategy that is clear enough to guide decisions and flexible enough to adapt.',
  'People remain the deciding factor. The right structure, skills, and leadership determine whether a strategy is executed or stays on paper. As organizations grow or transform, workforce planning, talent development, and organizational design become strategic priorities, not just HR tasks.',
  'Technology is the accelerator. Digital tools, data, and AI can transform efficiency and customer experience, but only when they are adopted with a clear purpose and protected against growing cyber threats.',
  'Our team helps leaders align all three. We work with you from defining where the business is going to designing the organization, data capabilities, and secure digital tools that will take it there, and we stay involved through implementation so the plan delivers results.',
];
const capabilities = [
  'Strategic planning and growth roadmaps',
  'Organizational design and workforce planning',
  'Digital and AI readiness assessments',
  'Dashboards and data-driven decision support',
  'Cyber risk assessments and security strategy',
];

export default function StrategyPeopleDigitalPage() {
  return (
    <main>
      <Hero
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: 'Strategy, People & Digital Transformation' },
        ]}
        eyebrow="Services"
        title="Lead change with clarity and confidence"
        description="Strategy, organizational and digital expertise to help you set direction, build capability and compete in a technology-driven market."
        primaryAction={{ label: 'Speak with an advisor', href: '/contact' }}
        secondaryAction={{ label: 'View all services', href: '/services' }}
      />
      <ServiceOverviewCopy paragraphs={overview} />
      <ServiceDetailGrid items={category.services} />
      <ServiceCapabilityList items={capabilities} />
      <CTABanner
        title="Ready to define your next move?"
        description="Speak with our strategy and transformation team about your priorities."
        buttonLabel="Request a consultation"
      />
    </main>
  );
}
