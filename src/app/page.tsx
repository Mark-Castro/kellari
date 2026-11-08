import type { Metadata } from 'next';
import Link from 'next/link';
import CTABanner from '../components/features/cta-banner';
import HeroConsensysMotion from '../components/home/HeroConsensysMotion';
import ServicesSection from '../components/home/ServicesSection';
import IndustriesSection from '../components/home/IndustriesSection';
import LatestInsightPreview from '../components/features/latest-insight-preview';
import Reveal from '../components/motion/reveal';
import { getLatestInsights, getStrapiMediaUrl } from '../lib/strapi';

export const metadata: Metadata = {
  title: 'Kelari Group | Strategy, Financial & Advisory Services',
  description:
    'KELARI GROUP LLC is an advisory firm delivering integrated strategy, financial, sustainability and communications expertise to help organizations grow.',
};

const differencePillars = [
  {
    title: 'Integrated expertise',
    description:
      'Strategy, financial, sustainability and communications specialists working as one team on your priorities.',
  },
  {
    title: 'Client-first partnership',
    description:
      'Every engagement starts with your objectives, context and constraints, never a standard template.',
  },
  {
    title: 'Measurable outcomes',
    description:
      'Clear, practical recommendations, with support through implementation so results are delivered, not just advised.',
  },
  {
    title: 'Future-ready thinking',
    description:
      'Forward-looking advice on AI, ESG and emerging risk, so you are prepared before change arrives.',
  },
];

export default async function HomePage() {
  const latestInsights = await getLatestInsights(4).then(
    (insights) => ({ articles: insights, unavailable: false }),
    (error: unknown) => {
      console.error('Unable to load the latest Insight from Strapi:', error);
      return { articles: [], unavailable: true };
    },
  );

  return (
    <main>
      <HeroConsensysMotion />
      <section
        className="mx-auto max-w-7xl px-5 py-12 md:px-8 lg:px-12 lg:py-16"
        aria-labelledby="home-introduction-heading"
      >
        <Reveal duration={0.48}>
          <p className="eyebrow">Kelari Group</p>
          <h2
            id="home-introduction-heading"
            className="text-3xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-4xl"
          >
            Integrated advisory for a changing world
          </h2>
          <p className="mt-4 max-w-3xl leading-7 text-slate-600 dark:text-zinc-400">
            Organizations today face constant change: new technology, shifting
            regulation, rising expectations around sustainability, and growing
            pressure to perform. Kelari Group brings together the expertise to
            meet these challenges in one coordinated team.
          </p>
          <p className="mt-4 max-w-3xl leading-7 text-slate-600 dark:text-zinc-400">
            From high-growth startups to established enterprises and public
            institutions, we partner with leaders to make informed decisions
            and turn strategy into measurable results.
          </p>
          <Link
            className="mt-5 inline-flex min-h-11 items-center gap-2 font-semibold text-emerald-900 hover:underline dark:text-[#74c8b3]"
            href="/about"
          >
            About Kelari Group <span aria-hidden="true">→</span>
          </Link>
        </Reveal>
      </section>
      <ServicesSection />
      <IndustriesSection />
      <section
        className="mx-auto max-w-7xl px-5 py-12 md:px-8 lg:px-12 lg:py-16"
        aria-labelledby="home-difference-heading"
      >
        <Reveal duration={0.48}>
          <p className="eyebrow">The Kelari Group difference</p>
          <h2
            id="home-difference-heading"
            className="mb-8 text-3xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-4xl"
          >
            Why Kelari Group
          </h2>
        </Reveal>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {differencePillars.map((pillar, index) => (
            <Reveal
              as="article"
              key={pillar.title}
              className="rounded-xl border border-slate-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900"
              duration={0.48}
              staggerIndex={index}
            >
              <span className="grid h-10 w-10 place-items-center rounded-full bg-emerald-100 font-semibold text-emerald-900 dark:bg-[#74c8b3]/15 dark:text-[#74c8b3]">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-5 text-lg font-semibold text-slate-950 dark:text-white">
                {pillar.title}
              </h3>
              <p className="mt-2 leading-7 text-slate-600 dark:text-zinc-400">
                {pillar.description}
              </p>
            </Reveal>
          ))}
        </div>
      </section>
      <section className="latest-insights" aria-labelledby="latest-insights-heading">
        <Reveal as="div" className="latest-insights-header" duration={0.48}>
          <div>
            <p className="eyebrow">Ideas and perspectives</p>
            <h2 id="latest-insights-heading">Insights</h2>
            <p className="mt-3 text-slate-600 dark:text-zinc-400">
              Timely perspectives on the issues shaping business, government
              and society.
            </p>
          </div>
          <a className="text-link" href="/insights">
            View all insights <span aria-hidden="true">→</span>
          </a>
        </Reveal>
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
          <p>
            No published insights are available right now. Please check back soon.
          </p>
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
      </section>
      <section
        className="mx-auto grid max-w-7xl gap-6 px-5 py-12 md:px-8 lg:grid-cols-[1fr_auto] lg:items-center lg:px-12 lg:py-16"
        aria-labelledby="home-careers-heading"
      >
        <div>
          <p className="eyebrow">Careers</p>
          <h2
            id="home-careers-heading"
            className="text-3xl font-semibold tracking-tight text-slate-950 dark:text-white"
          >
            Careers at Kelari Group
          </h2>
          <p className="mt-3 leading-7 text-slate-600 dark:text-zinc-400">
            Join a team where your expertise shapes meaningful outcomes for clients.
            We welcome both permanent professionals and independent consultants.
          </p>
        </div>
        <Link className="button" href="/careers">
          Explore opportunities <span className="ml-2" aria-hidden="true">→</span>
        </Link>
      </section>
      <CTABanner
        title="Let’s talk about what’s next."
        description="Tell us about your priorities, and we will connect you with the right specialists for your industry and objectives."
        buttonLabel="Request a consultation"
      />
    </main>
  );
}
