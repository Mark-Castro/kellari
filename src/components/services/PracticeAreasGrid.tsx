'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';

type PracticeArea = {
  title: string;
  description: string;
  href: string;
  services: readonly { title: string; href: string }[];
};

export default function PracticeAreasGrid({
  areas,
}: {
  areas: readonly PracticeArea[];
}) {
  const reduceMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="practice-areas-heading"
      className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-12 lg:py-24"
    >
      <div className="mb-9 max-w-3xl">
        <p className="eyebrow">Our expertise</p>
        <h2
          id="practice-areas-heading"
          className="mt-2 text-3xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-4xl"
        >
          Practice areas
        </h2>
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        {areas.map((area, index) => (
          <motion.article
            key={area.title}
            className="will-change-transform rounded-2xl border border-slate-200 bg-white p-6 text-slate-900 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 dark:text-white sm:p-8"
            initial={reduceMotion ? false : { opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2, margin: '-50px' }}
            whileHover={
              reduceMotion
                ? undefined
                : { y: -4, transition: { duration: 0.2 } }
            }
            transition={{
              duration: reduceMotion ? 0.1 : 0.6,
              delay: reduceMotion ? 0 : index * 0.12,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="m-0 text-xs font-bold tracking-[0.14em] text-emerald-800 dark:text-lime-300">
                  PRACTICE AREA 0{index + 1}
                </p>
                <h3 className="mb-0 mt-3 text-xl font-semibold tracking-tight sm:text-2xl">
                  {area.title}
                </h3>
              </div>
              <span className="shrink-0 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-900 dark:bg-lime-300/10 dark:text-lime-300">
                {area.services.length} services
              </span>
            </div>
            <p className="mt-3 leading-7 text-slate-600 dark:text-zinc-300">
              {area.description}
            </p>
            <ul className="mt-5 divide-y divide-slate-100 border-y border-slate-100 dark:divide-zinc-800 dark:border-zinc-800">
              {area.services.map((service) => (
                <li key={service.title}>
                  <motion.div
                    whileHover={reduceMotion ? undefined : { x: 4 }}
                    transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Link
                      href={service.href}
                      className="group flex min-h-12 items-center justify-between gap-3 py-3 text-sm font-medium text-slate-700 transition-colors hover:text-emerald-900 focus-visible:outline-2 focus-visible:outline-emerald-800 dark:text-zinc-300 dark:hover:text-lime-300 dark:focus-visible:outline-lime-300"
                    >
                      <span>{service.title}</span>
                      <span
                        aria-hidden="true"
                        className="shrink-0 text-emerald-800 opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100 dark:text-lime-300"
                      >
                        →
                      </span>
                    </Link>
                  </motion.div>
                </li>
              ))}
            </ul>
            <Link
              href={area.href}
              className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-emerald-900 hover:underline dark:text-lime-300"
            >
              Explore practice area <span aria-hidden="true">→</span>
            </Link>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
