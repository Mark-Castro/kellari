import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import CTABanner from '../../../components/features/cta-banner';
import Hero from '../../../components/features/hero';
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
  if (!entry) notFound();

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
        title={entry.service.title}
        description={entry.service.description}
        primaryAction={{
          label: 'Request a consultation',
          href: '/contact',
        }}
        secondaryAction={{
          label: `Explore ${entry.category.shortTitle}`,
          href: entry.category.href,
        }}
      />
      <CTABanner
        title={`Let’s discuss ${entry.service.title}`}
        description="Tell us what you’re working on and we’ll connect you with the right specialists."
        buttonLabel="Request a consultation"
      />
    </main>
  );
}
