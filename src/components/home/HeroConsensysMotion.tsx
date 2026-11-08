'use client';

import Link from 'next/link';
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';
import { useRef } from 'react';

const practices = [
  {
    number: '01',
    title: 'Strategy & digital',
    description:
      'Set a clear direction, strengthen your organization and use data and technology to move confidently through change.',
    focus: 'Direction · Transformation · Technology',
  },
  {
    number: '02',
    title: 'Financial & tax',
    description:
      'Build financial clarity, navigate compliance and make decisions that protect and grow long-term value.',
    focus: 'Finance · Tax · Transactions',
  },
  {
    number: '03',
    title: 'Sustainability & public impact',
    description:
      'Respond to evolving ESG expectations and help institutions modernize how they govern and deliver essential services.',
    focus: 'Sustainability · Governance · Impact',
  },
  {
    number: '04',
    title: 'Creative & communications',
    description:
      'Strengthen your brand and connect with the audiences that matter through thoughtful design, digital and communications.',
    focus: 'Brand · Digital · Communications',
  },
];

function PracticeCard({
  practice,
}: {
  practice: (typeof practices)[number];
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start 0.9', 'center 0.55'],
  });
  const opacity = useTransform(scrollYProgress, [0, 1], [0.55, 1]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.95, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [28, 0]);

  return (
    <motion.article
      ref={cardRef}
      className="flex min-h-0 items-center py-4 will-change-transform lg:min-h-[72vh] lg:py-8"
      style={
        reduceMotion
          ? undefined
          : {
              opacity,
              scale,
              y,
            }
      }
    >
      <div className="w-full rounded-[1.75rem] border border-slate-200/80 bg-white p-6 shadow-[0_24px_70px_-44px_rgba(15,23,42,0.38)] dark:border-zinc-800 dark:bg-zinc-900 sm:p-9 lg:p-11">
        <p className="m-0 text-xs font-bold tracking-[0.16em] text-emerald-800 dark:text-lime-300">
          {practice.number} <span className="mx-2 text-slate-300 dark:text-zinc-700">/</span>{' '}
          INTEGRATED EXPERTISE
        </p>
        <h3 className="mb-0 mt-6 max-w-xl text-3xl font-semibold leading-tight tracking-tight text-slate-950 dark:text-white sm:text-4xl lg:text-5xl">
          {practice.title}
        </h3>
        <p className="mt-5 max-w-xl text-base leading-7 text-slate-600 dark:text-zinc-300 sm:text-lg sm:leading-8">
          {practice.description}
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-between gap-5 border-t border-slate-200 pt-5 dark:border-zinc-800">
          <p className="m-0 text-xs font-medium tracking-wide text-slate-500 dark:text-zinc-400 sm:text-sm">
            {practice.focus}
          </p>
          <Link
            href="/services"
            className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-emerald-900 transition-colors hover:text-emerald-700 dark:text-lime-300 dark:hover:text-lime-200"
          >
            Explore our services <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

export default function HeroConsensysMotion() {
  const heroRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end end'],
  });
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const cardRotateX = useTransform(scrollYProgress, [0, 1], [0, 20]);
  const cardScale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const cardY = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const orbScale = useTransform(scrollYProgress, [0, 1], [1, 1.35]);
  const orbY = useTransform(scrollYProgress, [0, 1], [0, -45]);

  return (
    <>
      <section
        ref={heroRef}
        aria-labelledby="home-hero-heading"
        className="home-motion-section relative h-auto border-b border-slate-200/60 bg-slate-50/60 dark:border-zinc-800 dark:bg-zinc-950 md:h-[200vh]"
      >
        <div className="relative isolate flex h-auto min-h-0 items-center overflow-hidden py-8 sm:py-12 md:sticky md:top-0 md:h-screen md:min-h-[40rem] md:py-0">
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute -left-36 -top-32 -z-10 h-[30rem] w-[30rem] rounded-full bg-emerald-300/25 blur-3xl will-change-transform dark:bg-lime-400/10 sm:left-[8%]"
            animate={reduceMotion ? undefined : { x: [0, 12, 0] }}
            transition={
              reduceMotion
                ? undefined
                : { duration: 14, ease: 'easeInOut', repeat: Infinity }
            }
            style={{
              scale: reduceMotion ? 1 : orbScale,
              y: reduceMotion ? 0 : orbY,
            }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-48 -right-36 -z-10 h-[28rem] w-[28rem] rounded-full bg-sky-200/20 blur-3xl dark:bg-emerald-800/10"
          />

          <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-6 px-5 sm:gap-8 sm:px-8 md:gap-10 lg:grid-cols-12 lg:px-12">
            <motion.div
              className="min-w-0 will-change-transform lg:col-span-7"
              style={{
                y: reduceMotion ? 0 : titleY,
                opacity: reduceMotion ? 1 : titleOpacity,
              }}
            >
              <p className="mb-5 inline-flex items-center gap-2.5 rounded-full border border-emerald-900/10 bg-white/70 px-4 py-2 text-[0.68rem] font-bold tracking-[0.16em] text-emerald-900 shadow-sm dark:border-lime-300/20 dark:bg-zinc-900/70 dark:text-lime-300">
                <span
                  aria-hidden="true"
                  className="h-1.5 w-1.5 rounded-full bg-emerald-700 dark:bg-lime-300"
                />
                INTEGRATED ADVISORY
              </p>
              <h1
                id="home-hero-heading"
                className="max-w-3xl text-[clamp(2.45rem,6.1vw,5.25rem)] font-semibold leading-[1.03] tracking-[-0.055em] text-slate-950 dark:text-white"
              >
                Insight that moves you forward.
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 dark:text-zinc-300 sm:mt-5 sm:text-lg sm:leading-8">
                KELARI GROUP LLC helps organizations navigate complexity,
                unlock growth and build lasting value across strategy, finance,
                sustainability and communications.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:mt-7 sm:flex-row sm:flex-wrap">
                <Link
                  href="/contact"
                  className="inline-flex min-h-12 items-center justify-center rounded-full bg-emerald-800 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-emerald-900 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-800 dark:bg-lime-400 dark:text-black dark:hover:bg-lime-300 dark:focus-visible:outline-lime-300"
                >
                  Speak with an advisor <span className="ml-2" aria-hidden="true">→</span>
                </Link>
                <Link
                  href="/services"
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-slate-300 bg-white/40 px-6 py-3 text-sm font-semibold text-slate-800 transition-colors hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-800 dark:border-zinc-700 dark:bg-zinc-900/40 dark:text-zinc-100 dark:hover:bg-zinc-900 dark:focus-visible:outline-lime-300"
                >
                  Explore our services
                </Link>
              </div>
              <div className="mt-6 flex flex-wrap gap-x-8 gap-y-2 border-t border-slate-200/80 pt-4 text-xs font-medium text-slate-500 dark:border-zinc-800 dark:text-zinc-400 sm:mt-8 sm:pt-5 sm:text-sm">
                <span>Four connected practices</span>
                <span>19 specialist services</span>
              </div>
            </motion.div>

            <motion.div
              className="w-full min-w-0 will-change-transform lg:col-span-5"
              style={{
                rotateX: reduceMotion ? 0 : cardRotateX,
                scale: reduceMotion ? 1 : cardScale,
                y: reduceMotion ? 0 : cardY,
                transformPerspective: 1100,
                transformOrigin: 'center top',
              }}
            >
              <div className="mx-auto max-w-xl rounded-[1.75rem] border border-slate-200/80 bg-white/90 p-5 shadow-[0_28px_90px_-40px_rgba(15,23,42,0.3)] backdrop-blur-xl dark:border-zinc-700/80 dark:bg-zinc-900/90 dark:shadow-[0_28px_90px_-40px_rgba(0,0,0,0.8)] sm:p-7">
                <div className="flex items-center justify-between gap-4 border-b border-slate-200/80 pb-5 dark:border-zinc-700/80">
                  <div>
                    <p className="m-0 text-[0.65rem] font-bold tracking-[0.16em] text-emerald-800 dark:text-lime-300">
                      ADVISORY OVERVIEW
                    </p>
                    <h2 className="mb-0 mt-2 text-xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-2xl">
                      From design to operation.
                    </h2>
                  </div>
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-800 dark:bg-lime-300/10 dark:text-lime-300">
                    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
                      <path
                        d="M4 17.5 9 12l3.5 3.5L20 7m-4.5 0H20v4.5"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </div>
                <ol className="m-0 mt-2 list-none p-0">
                  {practices.map((practice) => (
                    <li
                      key={practice.number}
                      className="flex items-center gap-4 border-b border-slate-100 py-3.5 last:border-0 dark:border-zinc-800"
                    >
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-slate-100 text-xs font-semibold tabular-nums text-slate-600 dark:bg-zinc-800 dark:text-zinc-300">
                        {practice.number}
                      </span>
                      <span className="min-w-0 flex-1 text-sm font-medium text-slate-800 dark:text-zinc-100">
                        {practice.title}
                      </span>
                      <span
                        aria-hidden="true"
                        className="h-2 w-2 shrink-0 rounded-full bg-emerald-600 dark:bg-lime-300"
                      />
                    </li>
                  ))}
                </ol>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="integrated-practices-heading"
        className="home-motion-section relative z-10 -mt-5 rounded-t-[2rem] border-t border-slate-200/70 bg-white px-5 py-12 dark:border-zinc-800 dark:bg-zinc-950 sm:px-8 sm:py-16 lg:px-12 lg:py-24"
      >
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <p className="eyebrow">Integrated advisory</p>
              <h2
                id="integrated-practices-heading"
                className="mt-3 text-3xl font-semibold leading-tight tracking-tight text-slate-950 dark:text-white sm:text-4xl"
              >
                From design to operation.
              </h2>
              <p className="mt-4 max-w-md text-base leading-7 text-slate-600 dark:text-zinc-300">
                Bring the right expertise together around your priorities—from
                setting direction to delivering measurable change.
              </p>
              <Link
                href="/about"
                className="mt-6 inline-flex min-h-11 items-center gap-2 font-semibold text-emerald-900 hover:underline dark:text-lime-300"
              >
                How we work <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
          <div className="lg:col-span-8">
            {practices.map((practice) => (
              <PracticeCard key={practice.number} practice={practice} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
