'use client';

import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

const leaders = [
  {
    role: 'MANAGING PARTNER',
    title: 'Leadership profile',
    practice: 'Strategy & organizational direction',
    preview:
      'Leadership profile details will be added as the team biographies are finalized.',
  },
  {
    role: 'ADVISORY LEADERSHIP',
    title: 'Leadership profile',
    practice: 'Financial & institutional advisory',
    preview:
      'Leadership profile details will be added as the team biographies are finalized.',
  },
  {
    role: 'ADVISORY LEADERSHIP',
    title: 'Leadership profile',
    practice: 'Transformation & delivery',
    preview:
      'Leadership profile details will be added as the team biographies are finalized.',
  },
] as const;

export default function LeadershipGrid() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const reduceMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="leadership-heading"
      className="w-full overflow-x-hidden bg-white px-4 py-20 dark:bg-zinc-950 sm:px-6 lg:px-8 lg:py-28"
      id="leadership"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 max-w-3xl">
          <p className="mb-4 text-xs font-semibold tracking-[0.2em] text-emerald-800 dark:text-lime-400">
            LEADERSHIP
          </p>
          <h2
            className="text-4xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-5xl"
            id="leadership-heading"
          >
            People committed to your progress.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 dark:text-zinc-400">
            Our leadership brings connected experience across strategy,
            finance, institutions, and transformation. Profiles will be
            introduced as they are finalized.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {leaders.map((leader, index) => {
            const expanded = expandedIndex === index;

            return (
              <motion.article
                className="group relative isolate flex min-h-[360px] flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900/90"
                initial={reduceMotion ? false : { opacity: 0, y: 28 }}
                key={`${leader.role}-${index}`}
                transition={{
                  duration: reduceMotion ? 0.1 : 0.5,
                  delay: reduceMotion ? 0 : index * 0.12,
                  ease: [0.16, 1, 0.3, 1],
                }}
                viewport={{ once: false, amount: 0.2 }}
                whileInView={{ opacity: 1, y: 0 }}
              >
                <div className="relative h-48 overflow-hidden bg-gradient-to-br from-emerald-100 via-emerald-50 to-white dark:from-emerald-950 dark:via-zinc-900 dark:to-zinc-950">
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-[radial-gradient(ellipse_at_75%_25%,rgba(16,120,87,0.22),transparent_58%),radial-gradient(ellipse_at_15%_85%,rgba(132,204,22,0.14),transparent_56%)] dark:bg-[radial-gradient(ellipse_at_75%_25%,rgba(163,230,53,0.15),transparent_58%),radial-gradient(ellipse_at_15%_85%,rgba(16,120,87,0.2),transparent_56%)]"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute -right-3 -top-16 select-none text-[14rem] font-semibold leading-none text-emerald-900/[0.06] dark:text-lime-100/[0.05]"
                  >
                    K
                  </span>
                  <span className="absolute bottom-5 left-6 inline-flex rounded-full border border-emerald-800/15 bg-white/80 px-3 py-1.5 text-[10px] font-bold tracking-[0.14em] text-emerald-900 backdrop-blur dark:border-lime-400/20 dark:bg-zinc-950/75 dark:text-lime-400">
                    {leader.role}
                  </span>
                  <span className="absolute bottom-5 right-6 text-xs font-medium text-emerald-900/70 dark:text-zinc-300">
                    0{index + 1}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <p className="text-xs font-medium tracking-wide text-slate-500 dark:text-zinc-500">
                    {leader.practice}
                  </p>
                  <h3 className="mt-2 text-xl font-semibold text-slate-950 dark:text-white">
                    {leader.title}
                  </h3>
                  <button
                    aria-expanded={expanded}
                    className="mt-auto inline-flex min-h-11 items-center gap-2 pt-5 text-left text-sm font-semibold text-emerald-800 transition-colors hover:text-emerald-900 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-800 dark:text-lime-400 dark:hover:text-lime-300 dark:focus-visible:outline-lime-400"
                    onClick={() =>
                      setExpandedIndex(expanded ? null : index)
                    }
                    type="button"
                  >
                    {expanded ? 'Close profile preview' : 'View profile preview'}
                    <span aria-hidden="true">{expanded ? '−' : '→'}</span>
                  </button>
                </div>

                <AnimatePresence>
                  {expanded ? (
                    <motion.div
                      animate={{ y: 0, opacity: 1 }}
                      className="absolute inset-x-0 bottom-0 z-10 border-t border-emerald-200 bg-white/95 p-6 backdrop-blur dark:border-zinc-700 dark:bg-zinc-950/95"
                      exit={{ y: '100%', opacity: 0 }}
                      initial={{ y: '100%', opacity: 0 }}
                      transition={{ duration: reduceMotion ? 0.1 : 0.28 }}
                    >
                      <p className="text-xs font-semibold tracking-[0.16em] text-emerald-800 dark:text-lime-400">
                        {leader.role}
                      </p>
                      <p className="mt-3 text-sm leading-6 text-slate-700 dark:text-zinc-300">
                        {leader.preview}
                      </p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
