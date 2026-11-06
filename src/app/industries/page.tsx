import type { Metadata } from 'next';
import Link from 'next/link';
import CTABanner from '../../components/features/cta-banner';
import Hero from '../../components/features/hero';
import Reveal from '../../components/motion/reveal';
import {
  industryClosingCopy,
  industryContent,
  industryIntroduction,
} from '../../lib/industry-content';
import { industryClusters } from '../../lib/navigation';

export const metadata: Metadata = {
  title: 'Industries We Serve | Kelari Group',
  description:
    'Kelari Group supports financial services, healthcare, government, energy, real estate, consumer, technology and growth-stage businesses.',
};

export default function IndustriesPage() {
  return (
    <main>
      <Hero
        eyebrow="Who we work with"
        title="Industry insight. Practical results."
        description="We combine sector knowledge with integrated advisory to help organizations respond to the pressures and opportunities unique to their market."
        primaryAction={{ label: 'Speak with an advisor', href: '/contact' }}
      />
      <section
        className="mx-auto max-w-7xl px-5 py-12 md:px-8 lg:px-12"
        aria-labelledby="industries-introduction-heading"
      >
        <h2
          id="industries-introduction-heading"
          className="mb-4 text-2xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-3xl"
        >
          Sector knowledge, connected expertise
        </h2>
        <p className="max-w-4xl text-lg leading-8 text-slate-600 dark:text-zinc-300">
          {industryIntroduction}
        </p>
        <nav
          className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-5"
          aria-label="Industry groups"
        >
          {industryClusters.map((cluster, index) => (
            <Link
              key={cluster.id}
              href={`#${cluster.id}`}
              className="group rounded-xl border border-slate-200 bg-white p-5 transition hover:-translate-y-1 hover:border-emerald-700 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-[#74c8b3]"
            >
              <span className="text-xs font-bold tracking-[0.16em] text-emerald-800 dark:text-[#74c8b3]">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-3 text-lg font-semibold text-slate-950 group-hover:text-emerald-900 dark:text-white dark:group-hover:text-[#74c8b3]">
                {cluster.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-zinc-400">
                {cluster.industries.map((industry) => industry.title).join(' · ')}
              </p>
              <span className="mt-4 inline-flex text-sm font-semibold text-emerald-800 dark:text-[#74c8b3]">
                Explore <span className="ml-1" aria-hidden="true">→</span>
              </span>
            </Link>
          ))}
        </nav>
      </section>
      <div className="industry-clusters">
        {industryClusters.map((cluster, clusterIndex) => (
          <Reveal
            as="section"
            className="industry-cluster"
            id={cluster.id}
            key={cluster.id}
            aria-labelledby={`${cluster.id}-heading`}
            staggerIndex={clusterIndex}
          >
            <Reveal
              as="div"
              className="industry-cluster-heading"
              duration={0.48}
            >
              <p className="eyebrow">Industry cluster</p>
              <h2 id={`${cluster.id}-heading`}>{cluster.title}</h2>
              <p>{cluster.description}</p>
            </Reveal>
            <div className="industry-sector-grid">
              {cluster.industries.map((industry, index) => (
                <Reveal
                  as="article"
                  className="industry-sector-card"
                  key={industry.id}
                  staggerIndex={index}
                >
                  <h3>{industry.title}</h3>
                  <p>
                    {industryContent.find((entry) => entry.id === industry.id)
                      ?.description ?? industry.description}
                  </p>
                  <Link
                    className="industry-sector-link"
                    href={`/industries/${industry.id}`}
                  >
                    Explore this sector <span aria-hidden="true">→</span>
                  </Link>
                </Reveal>
              ))}
            </div>
          </Reveal>
        ))}
      </div>
      <CTABanner
        title="Don’t see your industry?"
        description={industryClosingCopy}
        buttonLabel="Request a consultation"
      />
    </main>
  );
}
