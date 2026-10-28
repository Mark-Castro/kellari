import type { Metadata } from 'next';
import CTABanner from '../../../components/features/cta-banner';
import Hero from '../../../components/features/hero';

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const metadata: Metadata = {
  title: 'Insight Detail',
};

export default async function InsightDetailPage({ params }: PageProps) {
  const { slug: routeSlug } = await params;
  const slug = routeSlug || 'insight';
  const title = slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return (
    <main>
      <Hero eyebrow="Insights" title={title} />
      <article>
        <p>Insight content will be added here.</p>
      </article>
      <CTABanner title="Continue the conversation" />
    </main>
  );
}
