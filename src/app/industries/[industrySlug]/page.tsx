import type { Metadata } from 'next';
import CTABanner from '../../../components/features/cta-banner';
import Hero from '../../../components/features/hero';

type PageProps = {
  params: Promise<{
    industrySlug: string;
  }>;
};

export const metadata: Metadata = {
  title: 'Industry Detail',
};

export default async function IndustryDetailPage({ params }: PageProps) {
  const { industrySlug } = await params;
  const slug = industrySlug || 'industry';
  const title = slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return (
    <main>
      <Hero
        eyebrow="Industries"
        title={title}
        description="Explore how our experience can help organizations in this sector make progress on their priorities."
        primaryAction={{ label: 'Talk to our team', href: '/contact' }}
      />
      <CTABanner title={`Let's talk about ${title}`} />
    </main>
  );
}
