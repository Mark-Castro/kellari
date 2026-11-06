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
  title: 'Creative Marketing & Communications',
  description:
    'Design, digital and communications expertise to strengthen your reputation and reach the audiences that matter.',
};

const category = serviceCategories[3];
const overview = [
  'In a crowded market, how you present yourself matters as much as what you offer. A strong brand, a clear message, and a consistent digital presence build trust, attract customers, and drive growth.',
  'The way people discover and choose organizations has changed. Customers, partners, and job seekers search online, compare options on social media, and read reviews before they ever make contact. Your website, content, and online reputation are often your first and most lasting impression.',
  'Attention is harder to win than ever. Audiences see thousands of messages every day, and only those that are relevant, well-designed, and well-timed stand out. Effective marketing now depends on understanding your audience, choosing the right channels, and measuring what works.',
  'Reputation also needs protecting. A single poorly handled issue can spread quickly online, making strategic communications and public relations an essential part of running any organization.',
  'Our creative and communications team brings design, digital marketing, public relations, and market research together under one roof. We help you define your brand, tell your story clearly, and reach the audiences that matter, with campaigns and content built on insight and measured by results.',
];
const capabilities = [
  'Brand strategy and visual identity',
  'Website design, development and user experience',
  'Media relations and reputation management',
  'Campaign planning, execution and reporting',
  'Market and consumer research',
];

export default function CreativeMarketingCommunicationsPage() {
  return (
    <main>
      <Hero
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: 'Creative, Marketing & Communications' },
        ]}
        eyebrow="Services"
        title="Build a brand people trust"
        description="Design, digital and communications expertise to strengthen your reputation and reach the audiences that matter."
        primaryAction={{ label: 'Speak with an advisor', href: '/contact' }}
        secondaryAction={{ label: 'View all services', href: '/services' }}
      />
      <ServiceOverviewCopy paragraphs={overview} />
      <ServiceDetailGrid items={category.services} />
      <ServiceCapabilityList items={capabilities} />
      <CTABanner
        title="Ready to elevate your brand?"
        description="Speak with our creative and communications team."
        buttonLabel="Request a consultation"
      />
    </main>
  );
}
