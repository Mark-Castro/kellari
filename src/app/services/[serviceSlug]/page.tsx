import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import CTABanner from '../../../components/features/cta-banner';
import Hero from '../../../components/features/hero';
import { ServiceDetailCopySections } from '../../../components/services/ServiceCopySections';
import servicePageCopy from '../../../lib/service-page-copy.json';
import { getServiceBySlug } from '../../../lib/navigation';

type PageProps = {
  params: Promise<{
    serviceSlug: string;
  }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { serviceSlug } = await params;
  const entry = getServiceBySlug(serviceSlug);

  return entry
    ? {
        title: entry.service.title,
        description: entry.service.description,
      }
    : { title: 'Service not found' };
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { serviceSlug } = await params;
  const entry = getServiceBySlug(serviceSlug);
  const content =
    servicePageCopy.details[
      serviceSlug as keyof typeof servicePageCopy.details
    ];
  if (!entry || !content) notFound();

  return (
    <main>
      <Hero
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          {
            label: entry.category.shortTitle,
            href: entry.category.href,
          },
          { label: entry.service.title },
        ]}
        eyebrow={entry.category.shortTitle}
        title={content.headline}
        description={content.subheadline}
        primaryAction={{
          label: 'Speak with a specialist',
          href: '/contact',
        }}
        secondaryAction={{
          label: `Explore ${entry.category.shortTitle}`,
          href: entry.category.href,
        }}
      />
      <ServiceDetailCopySections content={content} />
      <CTABanner
        title={content.ctaHeading}
        description={content.ctaText}
        buttonLabel="Request a consultation"
      />
    </main>
  );
}
