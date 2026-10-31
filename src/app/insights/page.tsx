import type { Metadata } from 'next';
import Hero from '../../components/features/hero';
import LatestInsightPreview from '../../components/features/latest-insight-preview';
import { getLatestInsights } from '../../lib/strapi';

export const metadata: Metadata = {
  title: 'Insights',
};

export default async function InsightsPage() {
  const insights = await getLatestInsights().catch((error: unknown) => {
    console.error('Unable to load Insights from Strapi:', error);
    return null;
  });

  return (
    <main>
      <Hero
        eyebrow="Ideas and perspectives"
        title="Insights & Articles"
        description="Perspectives to help you make sense of change and identify new opportunities."
      />
      <section>
        <h2>Latest insights</h2>
        {insights === null ? (
          <p role="status">
            Insights are temporarily unavailable. Please try again later.
          </p>
        ) : insights.length === 0 ? (
          <p>No published insights yet. Please check back soon.</p>
        ) : (
          <div className="insights-list">
            {insights.map((insight) => (
              <LatestInsightPreview
                key={insight.documentId ?? insight.id}
                category={insight.category ?? 'Insights'}
                title={insight.title}
                excerpt={insight.excerpt ?? undefined}
                href={`/insights/${insight.slug}`}
                publishedAt={insight.publishedAt ?? undefined}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
