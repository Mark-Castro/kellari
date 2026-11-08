'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';

export type IndustrySector = {
  id: string;
  title: string;
  description: string;
};

export type IndustryCluster = {
  id: string;
  title: string;
  description: string;
  industries: readonly IndustrySector[];
};

type IndustryClusterSectionProps = {
  cluster: IndustryCluster;
  index: number;
};

export default function IndustryClusterSection({
  cluster,
  index,
}: IndustryClusterSectionProps) {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id={cluster.id}
      aria-labelledby={`${cluster.id}-heading`}
      className="industries-motion-section grid min-w-0 grid-cols-1 gap-7 border-t border-slate-200/70 px-4 py-12 dark:border-zinc-800 sm:gap-9 sm:px-6 sm:py-16 md:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] lg:gap-14 lg:px-8"
    >
      <div className="min-w-0 md:sticky md:top-28 md:h-fit">
        <p className="eyebrow">Industry cluster {String(index + 1).padStart(2, '0')}</p>
        <h2
          id={`${cluster.id}-heading`}
          className="mt-2 text-2xl font-semibold leading-tight tracking-tight text-slate-950 dark:text-white sm:text-3xl"
        >
          {cluster.title}
        </h2>
        <p className="mt-3 max-w-xl leading-7 text-slate-600 dark:text-zinc-300">
          {cluster.description}
        </p>
      </div>

      <div className="grid min-w-0 gap-4 sm:grid-cols-2">
        {cluster.industries.map((industry, sectorIndex) => (
          <motion.article
            key={industry.id}
            initial={
              reduceMotion ? false : { opacity: 0, y: 30, scale: 0.96 }
            }
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.2, margin: '-50px' }}
            whileHover={
              reduceMotion
                ? undefined
                : { y: -4, transition: { duration: 0.2, ease: 'easeOut' } }
            }
            transition={{
              duration: reduceMotion ? 0.1 : 0.55,
              delay: reduceMotion ? 0 : sectorIndex * 0.1,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="flex min-w-0 flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white/90 p-5 text-slate-900 shadow-sm transition-colors hover:border-emerald-800 dark:border-zinc-800 dark:bg-zinc-900/90 dark:text-white dark:hover:border-lime-400 sm:p-6 will-change-transform"
          >
            <p className="m-0 text-xs font-bold tracking-[0.14em] text-emerald-800 dark:text-lime-300">
              {String(index + 1).padStart(2, '0')}.{String(sectorIndex + 1).padStart(2, '0')}
            </p>
            <h3 className="mb-0 mt-3 break-words text-lg font-semibold leading-snug tracking-tight sm:text-xl">
              {industry.title}
            </h3>
            <p className="mt-3 flex-1 text-sm leading-6 text-slate-600 dark:text-zinc-300">
              {industry.description}
            </p>
            <Link
              href={`/industries/${industry.id}`}
              className="group mt-5 inline-flex min-h-11 items-center gap-2 self-start text-sm font-semibold text-slate-600 transition-colors hover:text-emerald-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-800 dark:text-zinc-400 dark:hover:text-lime-400 dark:focus-visible:outline-lime-300"
            >
              Explore <span className="transition-transform duration-200 group-hover:translate-x-1.5">→</span>
            </Link>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
