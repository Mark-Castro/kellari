'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import type { IndustryCluster } from './IndustryClusterSection';

export default function IndustryOverview({
  clusters,
  introduction,
}: {
  clusters: readonly IndustryCluster[];
  introduction: string;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="industries-introduction-heading"
      className="industries-motion-section w-full overflow-x-hidden px-4 py-12 sm:px-6 sm:py-16 lg:px-8"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div className="max-w-4xl">
          <p className="eyebrow">Our sector coverage</p>
          <h2
            id="industries-introduction-heading"
            className="text-2xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-3xl"
          >
            Sector knowledge, connected expertise
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-600 dark:text-zinc-300 sm:text-lg sm:leading-8">
            {introduction}
          </p>
        </div>

        <nav
          className="mt-8 grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
          aria-label="Industry groups"
        >
          {clusters.map((cluster, index) => (
            <motion.article
              key={cluster.id}
              initial={reduceMotion ? false : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2, margin: '-50px' }}
              whileHover={
                reduceMotion
                  ? undefined
                  : { y: -6, transition: { duration: 0.2 } }
              }
              transition={{
                duration: reduceMotion ? 0.1 : 0.55,
                delay: reduceMotion ? 0 : index * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group min-w-0 overflow-hidden rounded-2xl border border-slate-200/80 bg-white/90 p-5 text-slate-900 shadow-sm transition-colors hover:border-emerald-800 dark:border-zinc-800 dark:bg-zinc-900/90 dark:text-white dark:hover:border-lime-400 sm:p-6 will-change-transform"
            >
              <span className="text-xs font-bold tracking-[0.16em] text-emerald-800 dark:text-lime-300">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="mb-0 mt-3 break-words text-lg font-semibold leading-snug group-hover:text-emerald-900 dark:group-hover:text-lime-300">
                {cluster.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-zinc-400">
                {cluster.industries.map((industry) => industry.title).join(' · ')}
              </p>
              <Link
                href={`#${cluster.id}`}
                className="group mt-4 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-slate-600 transition-colors hover:text-emerald-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-800 dark:text-zinc-400 dark:hover:text-lime-400 dark:focus-visible:outline-lime-300"
              >
                Explore <span className="transition-transform duration-200 group-hover:translate-x-1.5">→</span>
              </Link>
            </motion.article>
          ))}
        </nav>
      </div>
    </section>
  );
}
