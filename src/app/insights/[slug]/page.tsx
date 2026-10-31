import type { Metadata } from 'next';
import CTABanner from '../../../components/features/cta-banner';
import Hero from '../../../components/features/hero';
import { getInsightBySlug } from '../../../lib/strapi';

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const metadata: Metadata = {
  title: 'Insight Detail',
};

export default async function InsightDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const insight = await getInsightBySlug(slug).catch((error: unknown) => {
    console.error(`Unable to load Insight "${slug}" from Strapi:`, error);
    return null;
  });

  return (
    <main>
      <Hero
        eyebrow="Insights"
        title={insight?.title ?? 'Insight unavailable'}
        description={insight?.excerpt ?? undefined}
      />
      {insight ? (
        <article className="insight-article">
          {insight.publishedAt ? (
            <time className="insight-date" dateTime={insight.publishedAt}>
              {new Intl.DateTimeFormat('en', {
                dateStyle: 'long',
                timeZone: 'UTC',
              }).format(new Date(insight.publishedAt))}
            </time>
          ) : null}
          <p>{insight.body}</p>
        </article>
      ) : (
        <section>
          <p role="status">
            This insight is unavailable. It may be unpublished, or the Strapi
            service may not be reachable.
          </p>
        </section>
      )}
      <CTABanner title="Continue the conversation" />
    </main>
  );
}
