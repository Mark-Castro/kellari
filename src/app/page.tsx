import type { Metadata } from 'next';
import CTABanner from '../components/features/cta-banner';
import Hero from '../components/features/hero';
import IndustrySpotlightCarousel from '../components/features/industry-spotlight-carousel';
import LatestInsightPreview from '../components/features/latest-insight-preview';
import ServiceOverview from '../components/features/service-overview';
import Reveal from '../components/motion/reveal';
import { serviceCategories } from '../lib/navigation';
import { getLatestInsights } from '../lib/strapi';

export const metadata: Metadata = {
  title: 'Home',
};

export default async function HomePage() {
  const latestInsights = await getLatestInsights(1).then(
    (insights) => ({ article: insights[0] ?? null, unavailable: false }),
    (error: unknown) => {
      console.error('Unable to load the latest Insight from Strapi:', error);
      return { article: null, unavailable: true };
    },
  );

  return (
    <main>
      <Hero
        eyebrow="Clarity for what comes next"
        title="Make your next move a meaningful one."
        description="Kellari partners with organizations to navigate change, strengthen performance, and create lasting value."
        primaryAction={{ label: 'Explore our services', href: '/services' }}
        secondaryAction={{ label: 'Meet Kellari', href: '/about' }}
      />
      <ServiceOverview
        title="How we help"
        items={serviceCategories.map((category) => ({
          title: category.shortTitle,
          description: category.description,
          href: category.href,
        }))}
      />
      <IndustrySpotlightCarousel />
      <section className="latest-insights" aria-labelledby="latest-insights-heading">
        <Reveal as="div" className="latest-insights-header" duration={0.48}>
          <div>
            <p className="eyebrow">Ideas and perspectives</p>
            <h2 id="latest-insights-heading">Latest insights</h2>
          </div>
          <a className="text-link" href="/insights">
            View all insights <span aria-hidden="true">→</span>
          </a>
        </Reveal>
        {latestInsights.article ? (
          <LatestInsightPreview
            category={latestInsights.article.category ?? 'Insights'}
            title={latestInsights.article.title}
            excerpt={latestInsights.article.excerpt ?? undefined}
            href={`/insights/${latestInsights.article.slug}`}
            publishedAt={latestInsights.article.publishedAt ?? undefined}
          />
        ) : latestInsights.unavailable ? (
          <p role="status">
            Insights are temporarily unavailable. Please try again later.
          </p>
        ) : (
          <p>
            No published insights are available right now. Please check back soon.
          </p>
        )}
      </section>
      <CTABanner
        title="Let's move your organization forward"
        description="Bring us the challenge. Together, we can find a practical way forward."
        buttonLabel="Start a conversation"
      />
    </main>
  );
}
