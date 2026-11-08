import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import CTABanner from '../../../components/features/cta-banner';
import Hero from '../../../components/features/hero';
import Reveal from '../../../components/motion/reveal';
import { getIndustryContent, industryContent } from '../../../lib/industry-content';
import { getServiceHref, industryClusters } from '../../../lib/navigation';

type PageProps = {
  params: Promise<{
    industrySlug: string;
  }>;
};

export function generateStaticParams() {
  return industryContent.map(({ id }) => ({ industrySlug: id }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { industrySlug } = await params;
  const industry = getIndustryContent(industrySlug);

  return industry
    ? {
        title: `${industry.title} | Industries We Serve`,
        description: industry.description,
      }
    : { title: 'Industry not found' };
}

export default async function IndustryDetailPage({ params }: PageProps) {
  const { industrySlug } = await params;
  const industry = getIndustryContent(industrySlug);
  if (!industry) notFound();

  const cluster = industryClusters.find(
    (item) => item.id === industry.clusterId,
  );
  if (!cluster) notFound();

  return (
    <main>
      <Hero
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Industries', href: '/industries' },
          {
            label: cluster.title,
            href: `/industries#${cluster.id}`,
          },
          { label: industry.title },
        ]}
        eyebrow={cluster.title}
        title={industry.title}
        description={industry.description}
        primaryAction={{ label: 'Speak with an advisor', href: '/contact' }}
        secondaryAction={{
          label: 'Explore all industries',
          href: '/industries',
        }}
      />

      <section
        className="mx-auto grid max-w-7xl gap-12 px-5 py-14 md:px-8 lg:grid-cols-[minmax(0,1.5fr)_minmax(16rem,0.7fr)] lg:px-12 lg:py-20"
        aria-labelledby="industry-market-heading"
      >
        <div>
          <Reveal duration={0.48}>
            <p className="eyebrow">Sector perspective</p>
            <h2
              id="industry-market-heading"
              className="mb-6 text-3xl font-semibold tracking-tight text-slate-950 dark:text-white"
            >
              The market today
            </h2>
          </Reveal>
          <div className="grid gap-5">
            {industry.marketToday.map((paragraph, index) => (
              <Reveal
                key={paragraph}
                duration={0.48}
                staggerIndex={index}
              >
                <p className="m-0 max-w-none text-base leading-7 text-slate-600 dark:text-zinc-300">
                  {paragraph}
                </p>
              </Reveal>
            ))}
          </div>
        </div>

        <aside className="h-fit rounded-2xl border border-slate-200 bg-slate-50 p-6 dark:border-zinc-800 dark:bg-zinc-900 sm:p-8">
          <p className="eyebrow">Who we serve</p>
          <h2 className="mb-4 text-xl font-semibold text-slate-950 dark:text-white">
            Organizations like yours
          </h2>
          <p className="m-0 leading-7 text-slate-600 dark:text-zinc-300">
            {industry.clients}
          </p>
          <Link
            className="mt-6 inline-flex min-h-11 items-center justify-center rounded-lg bg-emerald-800 px-5 py-2.5 font-semibold text-white transition-colors hover:bg-emerald-900 dark:bg-[#74c8b3] dark:text-[#11201c] dark:hover:bg-[#9cdecd]"
            href="/contact"
          >
            Talk to our team <span className="ml-2" aria-hidden="true">→</span>
          </Link>
        </aside>
      </section>

      <section
        className="mx-auto max-w-7xl px-5 pb-12 md:px-8 lg:px-12 lg:pb-20"
        aria-labelledby="industry-support-heading"
      >
        <Reveal duration={0.48}>
          <p className="eyebrow">Practical advisory</p>
          <h2
            id="industry-support-heading"
            className="mb-8 text-3xl font-semibold tracking-tight text-slate-950 dark:text-white"
          >
            How Kelari Group helps
          </h2>
        </Reveal>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {industry.support.map((item, index) => (
            <Reveal
              as="li"
              key={item}
              className="list-none rounded-xl border border-slate-200 bg-white p-5 leading-7 text-slate-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300"
              duration={0.48}
              staggerIndex={index}
            >
              <span className="mb-3 grid h-8 w-8 place-items-center rounded-full bg-emerald-100 font-semibold text-emerald-900 dark:bg-[#74c8b3]/15 dark:text-[#74c8b3]">
                {String(index + 1).padStart(2, '0')}
              </span>
              {item}
            </Reveal>
          ))}
        </ul>
      </section>

      <section
        className="mx-auto max-w-7xl px-5 pb-16 md:px-8 lg:px-12 lg:pb-24"
        aria-labelledby="industry-expertise-heading"
      >
        <Reveal duration={0.48}>
          <p className="eyebrow">Connected capabilities</p>
          <h2
            id="industry-expertise-heading"
            className="mb-8 text-3xl font-semibold tracking-tight text-slate-950 dark:text-white"
          >
            Expertise to count on
          </h2>
        </Reveal>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {industry.expertise.map((expertise, index) => (
            <Reveal
              as="article"
              key={expertise.title}
              className="rounded-xl border border-slate-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900"
              duration={0.48}
              staggerIndex={index}
            >
              <h3 className="text-lg font-semibold text-slate-950 dark:text-white">
                <Link
                  className="rounded-sm underline-offset-4 hover:text-emerald-900 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-800 dark:hover:text-[#74c8b3] dark:focus-visible:outline-lime-300"
                  href={getServiceHref(expertise.title)}
                >
                  {expertise.title}
                </Link>
              </h3>
              <p className="mt-2 leading-6 text-slate-600 dark:text-zinc-400">
                {expertise.description}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      <CTABanner
        title={`Let’s talk about ${industry.title}`}
        description="Tell us what you’re working on and we’ll connect you with the right specialists."
        buttonLabel="Request a consultation"
      />
    </main>
  );
}
