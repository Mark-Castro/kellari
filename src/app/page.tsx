import type { Metadata } from 'next';
import Link from 'next/link';
import CTABanner from '../components/features/cta-banner';
import Hero from '../components/features/hero';
import LatestInsightPreview from '../components/features/latest-insight-preview';
import ServiceOverview from '../components/features/service-overview';
import Reveal from '../components/motion/reveal';
import { industryClusters, serviceCategories } from '../lib/navigation';
import { getLatestInsights, getStrapiMediaUrl } from '../lib/strapi';

export const metadata: Metadata = {
  title: 'KELARI GROUP LLC | Strategy, Financial & Advisory Services',
  description:
    'KELARI GROUP LLC is an advisory firm delivering integrated strategy, financial, sustainability and communications expertise to help organizations grow.',
};

const serviceDescriptions = [
  'Define direction, strengthen your organization and harness data, AI and secure technology to compete.',
  'Manage compliance, plan with confidence and protect long-term value with rigorous financial guidance.',
  'Meet evolving ESG expectations and help public institutions modernize how they govern and deliver.',
  'Build a credible brand and engage the audiences that matter through design, digital and PR.',
];

const industryDescriptions: Record<string, string> = {
  'financial-systems':
    'Helping financial institutions adapt to regulatory change, digital disruption and evolving client expectations.',
  'health-public-social-impact':
    'Supporting healthcare, government, education and social organizations to deliver essential services effectively.',
  'infrastructure-resources':
    'Advising energy, real estate, transport and hospitality organizations on long-term investment and resilience.',
  'consumer-technology':
    'Guiding retail, consumer goods, technology, media and telecoms businesses through fast-moving markets.',
  'growth-stage-professional':
    'Equipping SMEs, startups and professional services firms with the structure and strategy to scale.',
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
      <Hero
        eyebrow="Integrated advisory"
        title="Insight that moves you forward."
        description="KELARI GROUP LLC is an advisory firm helping organizations navigate complexity, unlock growth and build lasting value across strategy, finance, sustainability and communications."
        primaryAction={{ label: 'Speak with an advisor', href: '/contact' }}
        secondaryAction={{ label: 'Explore our services', href: '/services' }}
      />
      <section
        className="mx-auto grid max-w-7xl gap-6 px-5 py-14 md:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 lg:px-12 lg:py-20"
        aria-labelledby="home-introduction-heading"
      >
        <Reveal duration={0.48}>
          <p className="eyebrow">Our approach</p>
          <h2
            id="home-introduction-heading"
            className="text-3xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-4xl"
          >
            Integrated advisory for a changing world
          </h2>
        </Reveal>
        <div className="grid content-center gap-4">
          <Reveal duration={0.48}>
            <p className="m-0 max-w-none text-lg leading-8 text-slate-600 dark:text-zinc-300">
              Organizations today face constant change: new technology,
              shifting regulation, rising expectations around sustainability,
              and growing pressure to perform. KELARI GROUP LLC brings together
              the expertise to meet these challenges in one coordinated team.
            </p>
          </Reveal>
          <Reveal duration={0.48}>
            <p className="m-0 max-w-none leading-7 text-slate-600 dark:text-zinc-300">
              From high-growth startups to established enterprises and public
              institutions, we partner with leaders to make informed decisions
              and turn strategy into measurable results.
            </p>
          </Reveal>
          <Link
            className="mt-2 inline-flex min-h-11 items-center font-semibold text-emerald-900 underline-offset-4 hover:underline dark:text-[#74c8b3]"
            href="/about"
          >
            About KELARI GROUP LLC <span className="ml-2" aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
      <ServiceOverview
        title="Our services"
        description="Integrated expertise across four practice areas, delivered independently or as a single, coordinated engagement."
        items={serviceCategories.map((category, index) => ({
          title: category.title,
          description: serviceDescriptions[index],
          href: category.href,
        }))}
      />
      <div className="-mt-12 mb-12 flex justify-center">
        <Link className="button button--secondary" href="/services">
          View all services <span className="ml-2" aria-hidden="true">→</span>
        </Link>
      </div>
      <section
        className="mx-auto max-w-7xl px-5 py-12 md:px-8 lg:px-12 lg:py-16"
        aria-labelledby="home-industries-heading"
      >
        <Reveal
          as="div"
          className="mb-8 flex flex-wrap items-end justify-between gap-5"
          duration={0.48}
        >
          <div>
            <p className="eyebrow">Who we work with</p>
            <h2
              id="home-industries-heading"
              className="text-3xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-4xl"
            >
              Industries
            </h2>
            <p className="mt-3 text-slate-600 dark:text-zinc-400">
              Sector knowledge applied to the challenges and opportunities
              unique to your market.
            </p>
          </div>
          <Link
            className="inline-flex min-h-11 items-center font-semibold text-emerald-900 underline-offset-4 hover:underline dark:text-[#74c8b3]"
            href="/industries"
          >
            Explore industries <span className="ml-2" aria-hidden="true">→</span>
          </Link>
        </Reveal>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {industryClusters.map((cluster, index) => (
            <Reveal
              as="article"
              key={cluster.id}
              className="rounded-xl border border-slate-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900"
              duration={0.48}
              staggerIndex={index}
            >
              <h3 className="text-xl font-semibold text-slate-950 dark:text-white">
                {cluster.title}
              </h3>
              <p className="mt-3 leading-7 text-slate-600 dark:text-zinc-400">
                {industryDescriptions[cluster.id]}
              </p>
              <Link
                className="mt-4 inline-flex min-h-10 items-center font-semibold text-emerald-900 underline-offset-4 hover:underline dark:text-[#74c8b3]"
                href={`/industries#${cluster.id}`}
              >
                Explore this group <span className="ml-2" aria-hidden="true">→</span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
      <section
        className="mx-auto max-w-7xl px-5 py-12 md:px-8 lg:px-12 lg:py-16"
        aria-labelledby="home-difference-heading"
      >
        <Reveal duration={0.48}>
          <p className="eyebrow">The KELARI GROUP LLC difference</p>
          <h2
            id="home-difference-heading"
            className="mb-8 text-3xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-4xl"
          >
            Why KELARI GROUP LLC
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
          <p className="eyebrow">Careers at KELARI GROUP LLC</p>
          <h2
            id="home-careers-heading"
            className="text-3xl font-semibold tracking-tight text-slate-950 dark:text-white"
          >
            Do work that moves organizations forward.
          </h2>
          <p className="mt-3 leading-7 text-slate-600 dark:text-zinc-400">
            Join a team where your expertise shapes meaningful outcomes for
            clients. We welcome both permanent professionals and independent
            consultants.
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
