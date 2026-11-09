'use client';

import Link from 'next/link';
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';
import { useRef } from 'react';
import { serviceCategories } from '../../lib/navigation';

const homeServiceDescriptions: Record<
  (typeof serviceCategories)[number]['href'],
  string
> = {
  '/services/strategy-people-digital':
    'Define direction, strengthen your organization and harness data, AI and secure technology to compete.',
  '/services/financial-tax':
    'Manage compliance, plan with confidence and protect long-term value with rigorous financial guidance.',
  '/services/sustainability-public-impact':
    'Meet evolving ESG expectations and help public institutions modernize how they govern and deliver.',
  '/services/creative-marketing-communications':
    'Build a credible brand and engage the audiences that matter through design, digital and PR.',
};

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const ambientScale = useTransform(scrollYProgress, [0, 1], [0.85, 1.25]);
  const ambientY = useTransform(scrollYProgress, [0, 1], [45, -45]);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="home-services-heading"
      className="home-motion-section relative isolate overflow-hidden border-y border-slate-200/60 bg-slate-50/60 px-5 py-12 dark:border-zinc-800 dark:bg-zinc-950 sm:px-8 sm:py-16 lg:px-12 lg:py-24"
    >
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -right-36 top-12 -z-10 h-[30rem] w-[30rem] rounded-full bg-emerald-300/15 blur-3xl will-change-transform dark:bg-lime-400/5"
        style={{
          scale: reduceMotion ? 1 : ambientScale,
          y: reduceMotion ? 0 : ambientY,
        }}
      />

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-4">
          <div className="space-y-6 lg:sticky lg:top-28 lg:h-fit">
            <p className="eyebrow">Integrated advisory</p>
            <h2
              id="home-services-heading"
              className="text-4xl font-bold tracking-tight text-slate-950 dark:text-white"
            >
              Our services
            </h2>
            <p className="max-w-md leading-7 text-slate-600 dark:text-zinc-300">
              Integrated expertise across four practice areas, delivered
              independently or as a single, coordinated engagement.
            </p>
            <Link
              href="/services"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-emerald-800 px-6 py-3 font-semibold text-white transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-800 dark:bg-lime-400 dark:text-black dark:focus-visible:outline-lime-300"
            >
              View all services <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:col-span-8">
          {serviceCategories.map((category, index) => (
            <motion.div
              key={category.href}
              initial={reduceMotion ? false : { opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: false, amount: 0.2, margin: '-50px' }}
              whileHover={
                reduceMotion
                  ? undefined
                  : {
                      y: -6,
                      transition: { duration: 0.2, ease: 'easeOut' },
                    }
              }
              transition={{
                duration: reduceMotion ? 0.1 : 0.6,
                delay: reduceMotion ? 0 : index * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group flex h-full flex-col rounded-2xl border border-slate-200/80 bg-white/90 p-8 text-slate-900 shadow-sm transition-colors hover:border-emerald-800 dark:border-zinc-800 dark:bg-zinc-900/90 dark:text-white dark:hover:border-lime-400 will-change-transform"
            >
              <p className="m-0 text-xs font-bold tracking-[0.14em] text-emerald-800 dark:text-lime-300">
                PRACTICE AREA 0{index + 1}
              </p>
              <h3 className="mb-0 mt-4 text-xl font-semibold leading-snug tracking-tight sm:text-2xl">
                {category.title}
              </h3>
              <p className="mt-3 flex-1 leading-7 text-slate-600 dark:text-zinc-300">
                {homeServiceDescriptions[category.href]}
              </p>
              <Link
                href={category.href}
                className="mt-5 inline-flex min-h-10 items-center gap-2 text-sm font-semibold text-slate-600 transition-colors group-hover:text-emerald-800 dark:text-zinc-400 dark:group-hover:text-lime-400"
              >
                Learn more
                <span
                  aria-hidden="true"
                  className="transition-transform duration-200 group-hover:translate-x-1.5"
                >
                  →
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
