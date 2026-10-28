import type { Metadata } from 'next';
import CTABanner from '../../../components/features/cta-banner';
import Hero from '../../../components/features/hero';

type PageProps = {
  params: Promise<{
    serviceSlug: string;
  }>;
};

export const metadata: Metadata = {
  title: 'Service Detail',
};

export default async function ServiceDetailPage({ params }: PageProps) {
  const { serviceSlug } = await params;
  const slug = serviceSlug || 'service';
  const title = slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return (
    <main>
      <Hero
        eyebrow="Services"
        title={title}
        description="Learn how our team can help you address your priorities and create lasting value."
        primaryAction={{ label: 'Contact us', href: '/contact' }}
      />
      <CTABanner title={`Explore ${title}`} />
    </main>
  );
}
