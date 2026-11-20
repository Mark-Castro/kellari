'use client';

import Link from 'next/link';
import { useRef } from 'react';
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';
import AnimatedFaq from './AnimatedFaq';
import PracticeContextGrid from './PracticeContextGrid';
import ServiceExplorer, { type ExplorerService } from './ServiceExplorer';

type PracticePillar = {
  title: string;
  description: string;
};

type EngagementModel = {
  title: string;
  description: string;
};

type StrategyPracticeExperienceProps = {
  services: readonly ExplorerService[];
  fit: readonly string[];
  whyItMatters: readonly string[];
  waysToWork: readonly EngagementModel[];
  faqs: readonly { question: string; answer: string }[];
};

const pillars: readonly PracticePillar[] = [
  {
    title: 'Clear Strategy',
    description:
      'Set a direction your leadership can align around and teams can turn into focused action.',
  },
  {
    title: 'The Right People',
    description:
      'Build the roles, skills and operating structure needed to make your strategy work.',
  },
  {
    title: 'Purposeful Technology',
    description:
      'Apply data, AI and secure digital tools to priorities that create measurable value.',
  },
];

const engagementTags: Record<string, string> = {
  'Focused project': 'FIXED SCOPE',
  'Ongoing advisory': 'RETAINER',
  'Integrated program': 'MULTI-PRACTICE',
};

function PracticeHero() {
  const containerRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 0.8], [0, -40]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      aria-labelledby="strategy-practice-title"
      className="relative flex min-h-[55vh] w-full items-center overflow-x-clip border-b border-slate-200 bg-gradient-to-br from-emerald-50/70 via-white to-white px-4 py-16 dark:border-zinc-800 dark:from-zinc-950 dark:via-zinc-950 dark:to-zinc-900 sm:px-6 lg:px-8"
      ref={containerRef}
    >
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-8 h-72 w-72 rounded-full bg-emerald-100/70 blur-3xl dark:bg-lime-400/5"
        style={reduceMotion ? undefined : { y }}
      />
      <motion.div
        className="relative mx-auto w-full max-w-7xl"
        style={reduceMotion ? undefined : { y, opacity }}
      >
        <nav aria-label="Breadcrumb" className="mb-10 text-sm">
          <ol className="flex flex-wrap items-center gap-2 text-slate-500 dark:text-zinc-500">
            <li><Link className="hover:text-emerald-800 dark:hover:text-lime-400" href="/">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li><Link className="hover:text-emerald-800 dark:hover:text-lime-400" href="/services">Services</Link></li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-slate-700 dark:text-zinc-300">
              Strategy, People &amp; Digital
            </li>
          </ol>
        </nav>
        <p className="mb-4 text-xs font-semibold tracking-[0.2em] text-emerald-800 dark:text-lime-400">
          STRATEGY, PEOPLE &amp; DIGITAL TRANSFORMATION
        </p>
        <h1
          className="max-w-4xl text-4xl font-semibold leading-[1.08] tracking-tight text-slate-950 dark:text-white sm:text-5xl lg:text-6xl"
          id="strategy-practice-title"
        >
          Lead change with clarity and confidence.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-zinc-300">
          Align your strategy, organization and technology around the outcomes
          that matter most.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            className="inline-flex min-h-12 items-center justify-center rounded-full bg-emerald-800 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-emerald-900 dark:bg-lime-400 dark:text-zinc-950 dark:hover:bg-lime-300"
            href="/contact"
          >
            Speak with an advisor
          </Link>
          <a
            className="inline-flex min-h-12 items-center justify-center rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-800 transition-colors hover:bg-slate-100 dark:border-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-900"
            href="#explore-services"
          >
            Explore our services
          </a>
        </div>
      </motion.div>
    </section>
  );
}

function StrategyThesis() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      className="w-full overflow-x-clip bg-white px-4 py-16 dark:bg-zinc-950 sm:px-6 lg:px-8 lg:py-24"
      aria-labelledby="strategy-thesis-heading"
    >
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div className="h-fit lg:sticky lg:top-28">
          <p className="mb-3 text-xs font-semibold tracking-[0.18em] text-emerald-800 dark:text-lime-400">
            ONE CONNECTED PRACTICE
          </p>
          <h2
            className="text-3xl font-semibold leading-tight tracking-tight text-slate-950 dark:text-white sm:text-4xl"
            id="strategy-thesis-heading"
          >
            Growth happens when direction, people and technology move together.
          </h2>
          <p className="mt-5 max-w-lg text-base leading-7 text-slate-600 dark:text-zinc-400">
            We help leaders set a clear course, build the capabilities to
            deliver it and adopt technology with purpose—turning complex change
            into focused, measurable progress.
          </p>
        </div>

        <div className="space-y-4">
          {pillars.map((pillar, index) => (
            <motion.article
              className="rounded-2xl border border-slate-200 bg-slate-50/70 p-6 dark:border-zinc-800 dark:bg-zinc-900/90 sm:p-7"
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              key={pillar.title}
              transition={{
                duration: reduceMotion ? 0.1 : 0.5,
                delay: reduceMotion ? 0 : index * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              viewport={{ once: false, amount: 0.2 }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-start gap-5">
                <span className="text-sm font-semibold tracking-wider text-emerald-800 dark:text-lime-400">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="text-xl font-semibold text-slate-950 dark:text-white">
                    {pillar.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-zinc-400">
                    {pillar.description}
                  </p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function EngagementModels({
  waysToWork,
}: {
  waysToWork: readonly EngagementModel[];
}) {
  const reduceMotion = useReducedMotion();

  return (
    <section
      className="w-full overflow-x-hidden bg-emerald-50/50 px-4 py-16 dark:bg-zinc-950 sm:px-6 lg:px-8 lg:py-24"
      aria-labelledby="ways-to-work-heading"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-9 max-w-2xl">
          <p className="mb-3 text-xs font-semibold tracking-[0.18em] text-emerald-800 dark:text-lime-400">
            WORKING TOGETHER
          </p>
          <h2
            className="text-3xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-4xl"
            id="ways-to-work-heading"
          >
            Ways to work with us
          </h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {waysToWork.map((option, index) => (
            <motion.article
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/90 sm:p-7"
              initial={reduceMotion ? false : { opacity: 0, y: 22 }}
              key={option.title}
              transition={{
                duration: reduceMotion ? 0.1 : 0.45,
                delay: reduceMotion ? 0 : index * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              viewport={{ once: false, amount: 0.2 }}
              whileHover={
                reduceMotion
                  ? undefined
                  : { y: -6, transition: { duration: 0.2, ease: 'easeOut' } }
              }
              whileInView={{ opacity: 1, y: 0 }}
            >
              <span className="inline-flex rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-bold tracking-[0.12em] text-emerald-900 dark:bg-lime-400/10 dark:text-lime-400">
                {engagementTags[option.title] ?? 'ADVISORY'}
              </span>
              <h3 className="mt-5 text-xl font-semibold text-slate-950 dark:text-white">
                {option.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-zinc-400">
                {option.description}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function StrategyPracticeExperience({
  services,
  fit,
  whyItMatters,
  waysToWork,
  faqs,
}: StrategyPracticeExperienceProps) {
  return (
    <main className="w-full overflow-x-clip">
      <PracticeHero />
      <StrategyThesis />
      <div id="explore-services">
        <ServiceExplorer services={services} />
      </div>
      <PracticeContextGrid fit={fit} whyItMatters={whyItMatters} />
      <EngagementModels waysToWork={waysToWork} />
      <AnimatedFaq faqs={faqs} />
      <section className="w-full overflow-x-hidden bg-white px-4 py-10 dark:bg-zinc-950 sm:px-6 lg:px-8 lg:pb-20">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 rounded-3xl bg-emerald-900 px-6 py-10 text-white dark:bg-zinc-900 sm:px-10 lg:flex-row lg:items-center lg:justify-between lg:px-14">
          <div>
            <p className="mb-3 text-xs font-semibold tracking-[0.18em] text-lime-300 dark:text-lime-400">
              READY FOR THE NEXT MOVE?
            </p>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Ready to define your next move?
            </h2>
            <p className="mt-3 max-w-2xl leading-7 text-emerald-50/85 dark:text-zinc-300">
              Speak with our strategy and transformation team about your priorities.
            </p>
          </div>
          <Link
            className="service-consultation-link inline-flex min-h-12 shrink-0 items-center justify-center rounded-full bg-white px-6 py-3 font-semibold text-emerald-900 transition-colors hover:bg-emerald-50 dark:bg-lime-400 dark:text-zinc-950 dark:hover:bg-lime-300"
            href="/contact"
          >
            Request a consultation <span className="ml-2" aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
