'use client';

import Link from 'next/link';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useState } from 'react';
import { industryClusters } from '../../lib/navigation';

const sectorTags: Record<string, readonly string[]> = {
  'financial-systems': ['Banking', 'Fintech', 'Insurance', 'Asset Management'],
  'health-public-social-impact': [
    'Healthcare',
    'Government',
    'Education',
    'NGOs',
  ],
  'infrastructure-resources': ['Energy', 'Real Estate', 'Logistics', 'F&B'],
  'consumer-technology': ['Retail', 'Telecoms', 'Digital Media', 'SaaS'],
  'growth-stage-professional': [
    'SMEs',
    'Venture Capital',
    'Professional Services',
  ],
};

const spring = { type: 'spring' as const, stiffness: 300, damping: 30 };

export default function IndustriesSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const reduceMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="home-industries-heading"
      className="home-motion-section mx-auto max-w-7xl px-5 py-12 md:px-8 lg:px-12 lg:py-20"
    >
      <div className="mb-8 flex flex-wrap items-end justify-between gap-5">
        <div>
          <p className="eyebrow">Who we work with</p>
          <h2
            id="home-industries-heading"
            className="text-3xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-4xl"
          >
            Industries
          </h2>
          <p className="mt-3 max-w-2xl text-slate-600 dark:text-zinc-400">
            Sector knowledge applied to the challenges and opportunities
            unique to your market.
          </p>
        </div>
        <Link
          className="inline-flex min-h-11 items-center gap-2 font-semibold text-emerald-900 transition-colors hover:text-emerald-700 hover:underline dark:text-lime-300 dark:hover:text-lime-200"
          href="/industries"
        >
          Explore all industries <span aria-hidden="true">→</span>
        </Link>
      </div>

      <div
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 md:h-[420px] md:overflow-visible md:pb-0"
        aria-label="Industries"
      >
        {industryClusters.map((cluster, index) => {
          const isActive = activeIndex === index;
          const cardId = `industry-card-${cluster.id}`;
          const detailsId = `industry-details-${cluster.id}`;

          return (
            <motion.article
              key={cluster.id}
              layout
              onMouseEnter={() => setActiveIndex(index)}
              onFocus={() => setActiveIndex(index)}
              onClick={() => setActiveIndex(index)}
              className={`relative flex min-h-[330px] min-w-[85%] snap-center flex-col overflow-hidden rounded-2xl border p-6 transition-colors md:min-h-0 md:min-w-0 md:p-7 ${
                isActive
                  ? 'border-2 border-emerald-800 bg-white text-slate-900 shadow-xl dark:border-lime-400 dark:bg-zinc-900 dark:text-white dark:shadow-lime-400/10'
                  : 'border-slate-200 bg-slate-100/70 text-slate-600 hover:bg-slate-100 dark:border-zinc-800 dark:bg-zinc-900/50 dark:text-zinc-400 dark:hover:bg-zinc-900'
              }`}
              style={{ flexBasis: 0 }}
              animate={{ flexGrow: isActive ? 3 : 1 }}
              transition={reduceMotion ? { duration: 0 } : { layout: spring }}
              aria-labelledby={cardId}
              aria-describedby={isActive ? detailsId : undefined}
            >
              <div className="flex items-center justify-between gap-3 md:hidden">
                <span className="text-xs font-bold tracking-[0.14em]">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <button
                  type="button"
                  aria-expanded={isActive}
                  aria-controls={detailsId}
                  onClick={(event) => {
                    event.stopPropagation();
                    setActiveIndex(index);
                  }}
                  className="grid h-10 w-10 place-items-center rounded-full text-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-800 dark:focus-visible:outline-lime-300"
                  aria-label={`Show ${cluster.title}`}
                >
                  <span aria-hidden="true">{isActive ? '−' : '＋'}</span>
                </button>
              </div>

              <div className="hidden items-start justify-between gap-4 md:flex">
                <span className="text-xs font-bold tracking-[0.14em]">
                  {String(index + 1).padStart(2, '0')}
                </span>
                {!isActive ? (
                  <button
                    type="button"
                    aria-expanded={false}
                    aria-controls={detailsId}
                    onClick={(event) => {
                      event.stopPropagation();
                      setActiveIndex(index);
                    }}
                    className="[writing-mode:vertical-rl] rotate-180 text-left text-sm font-semibold tracking-wide text-slate-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-800 dark:text-zinc-300 dark:focus-visible:outline-lime-300"
                    aria-label={`Expand ${cluster.title}`}
                  >
                    {cluster.title}
                  </button>
                ) : (
                  <span aria-hidden="true" className="text-xl text-emerald-800 dark:text-lime-300">
                    ↗
                  </span>
                )}
              </div>

              <div
                id={detailsId}
                className={`flex min-h-0 flex-1 flex-col ${
                  isActive ? 'mt-4 md:mt-6' : 'md:hidden'
                }`}
              >
                <h3 id={cardId} className="mb-0 text-xl font-semibold leading-tight tracking-tight md:text-2xl">
                  {cluster.title}
                </h3>
                <AnimatePresence initial={false}>
                  {isActive && (
                    <motion.div
                      initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      transition={
                        reduceMotion
                          ? { duration: 0 }
                          : { duration: 0.24, ease: [0.16, 1, 0.3, 1] }
                      }
                      className="flex min-h-0 flex-1 flex-col"
                    >
                      <p className="mt-3 leading-7 text-slate-600 dark:text-zinc-300">
                        {cluster.description}
                      </p>
                      <ul className="mt-4 flex flex-wrap gap-2" aria-label="Sectors">
                        {(sectorTags[cluster.id] ?? []).map((tag) => (
                          <li
                            key={tag}
                            className="rounded-full border border-emerald-800/15 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-900 dark:border-lime-300/20 dark:bg-lime-300/10 dark:text-lime-200"
                          >
                            {tag}
                          </li>
                        ))}
                      </ul>
                      <Link
                        href={`/industries#${cluster.id}`}
                        onClick={(event) => event.stopPropagation()}
                        className="mt-auto inline-flex min-h-11 items-center gap-2 pt-5 text-sm font-semibold text-emerald-900 hover:underline dark:text-lime-300"
                      >
                        Explore this group <span aria-hidden="true">→</span>
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {!isActive && (
                <span className="mt-auto hidden self-end text-xl text-slate-500 dark:text-zinc-500 md:block" aria-hidden="true">
                  →
                </span>
              )}
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
