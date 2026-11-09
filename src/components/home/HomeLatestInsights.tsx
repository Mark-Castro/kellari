import Link from 'next/link';
import LatestInsightPreview from '../features/latest-insight-preview';
import Reveal from '../motion/reveal';
import { getLatestInsights, getStrapiMediaUrl } from '../../lib/strapi';

export default async function HomeLatestInsights() {
  const latestInsights = await getLatestInsights(4).then(
    (insights) => ({ articles: insights, unavailable: false }),
    (error: unknown) => {
      console.error('Unable to load the latest Insight from Strapi:', error);
      return { articles: [], unavailable: true };
    },
  );

  return (
    <>
      {latestInsights.articles[0] ? (
        <LatestInsightPreview
          category={latestInsights.articles[0].category ?? 'Insights'}
          title={latestInsights.articles[0].title}
          excerpt={latestInsights.articles[0].excerpt ?? undefined}
          href={`/insights/${latestInsights.articles[0].slug}`}
          publishedAt={latestInsights.articles[0].publishedAt ?? undefined}
          coverImageUrl={
            getStrapiMediaUrl(latestInsights.articles[0].coverImage) ?? undefined
          }
          coverImageAlt={
            latestInsights.articles[0].coverImage?.alternativeText ??
            latestInsights.articles[0].title
          }
        />
      ) : latestInsights.unavailable ? (
        <p role="status">
          Insights are temporarily unavailable. Please try again later.
        </p>
      ) : (
        <p>No published insights are available right now. Please check back soon.</p>
      )}
      {latestInsights.articles.length > 1 ? (
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {latestInsights.articles.slice(1, 4).map((article, index) => (
            <Reveal
              as="article"
              key={article.id}
              className="rounded-xl border border-slate-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900"
              duration={0.48}
              staggerIndex={index}
            >
              <p className="eyebrow">{article.category ?? 'Insights'}</p>
              {article.publishedAt ? (
                <time
                  className="text-sm text-slate-500 dark:text-zinc-400"
                  dateTime={article.publishedAt}
                >
                  {new Intl.DateTimeFormat('en', {
                    dateStyle: 'medium',
                    timeZone: 'UTC',
                  }).format(new Date(article.publishedAt))}
                </time>
              ) : null}
              <h3 className="mt-3 text-lg font-semibold text-slate-950 dark:text-white">
                {article.title}
              </h3>
              {article.excerpt ? (
                <p className="mt-2 leading-6 text-slate-600 dark:text-zinc-400">
                  {article.excerpt}
                </p>
              ) : null}
              <Link
                className="mt-3 inline-flex min-h-10 items-center font-semibold text-emerald-900 underline-offset-4 hover:underline dark:text-[#74c8b3]"
                href={`/insights/${article.slug}`}
              >
                Explore insights <span className="ml-2" aria-hidden="true">→</span>
              </Link>
            </Reveal>
          ))}
        </div>
      ) : null}
    </>
  );
}
