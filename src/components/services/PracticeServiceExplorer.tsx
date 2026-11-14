'use client';

import Link from 'next/link';
import { useState } from 'react';
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from 'framer-motion';
import { getServiceHref } from '../../lib/navigation';

export type PracticeService = {
  title: string;
  overview: readonly string[];
  offerings: readonly {
    title: string;
    description: string;
  }[];
  audience: string;
};

function ServiceDetails({ service }: { service: PracticeService }) {
  return (
    <>
      <div className="mb-7">
        <p className="mb-3 text-xs font-semibold tracking-[0.18em] text-emerald-800 dark:text-lime-400">
          SERVICE OVERVIEW
        </p>
        <h3 className="text-2xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-3xl">
          {service.title}
        </h3>
        <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 dark:text-zinc-300">
          {service.overview[0]}
        </p>
      </div>

      <div>
        <h4 className="mb-4 text-sm font-semibold text-slate-900 dark:text-white">
          What we offer
        </h4>
        <dl className="grid gap-3 sm:grid-cols-2">
          {service.offerings.map((offer, index) => (
            <div
              className="rounded-xl border border-slate-200 bg-slate-50/80 p-4 dark:border-zinc-800 dark:bg-zinc-950/70"
              key={offer.title}
            >
              <dt className="flex items-start gap-2 text-sm font-semibold text-slate-900 dark:text-zinc-100">
                <span
                  aria-hidden="true"
                  className="mt-0.5 text-xs font-bold text-emerald-800 dark:text-lime-400"
                >
                  {String(index + 1).padStart(2, '0')}
                </span>
                {offer.title}
              </dt>
              <dd className="mt-2 line-clamp-2 text-sm leading-5 text-slate-600 dark:text-zinc-400">
                {offer.description}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="mt-6 flex flex-col gap-5 border-t border-slate-200 pt-5 dark:border-zinc-800 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-xl rounded-lg bg-emerald-50/70 px-4 py-3 text-sm leading-6 text-slate-700 dark:bg-lime-400/10 dark:text-zinc-200">
          <strong className="text-emerald-900 dark:text-lime-400">
            Ideal for
          </strong>
          <span aria-hidden="true"> · </span>
          {service.audience}
        </p>
        <Link
          className="inline-flex shrink-0 items-center gap-2 font-semibold text-emerald-800 transition-colors hover:text-emerald-900 hover:underline dark:text-lime-400 dark:hover:text-lime-300"
          href={getServiceHref(service.title)}
        >
          Explore this service <span aria-hidden="true">→</span>
        </Link>
      </div>
    </>
  );
}

export default function PracticeServiceExplorer({
  services,
  practiceTitle,
}: {
  services: readonly PracticeService[];
  practiceTitle: string;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [expandedMobileIndex, setExpandedMobileIndex] = useState<number | null>(0);
  const reduceMotion = useReducedMotion();
  const activeService = services[activeIndex];

  if (!activeService) return null;

  return (
    <section
      className="w-full overflow-x-clip bg-white px-4 py-16 dark:bg-zinc-950 sm:px-6 lg:px-8 lg:py-24"
      aria-labelledby="practice-service-explorer-heading"
      id="practice-services"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 max-w-2xl sm:mb-14">
          <p className="mb-3 text-xs font-semibold tracking-[0.18em] text-emerald-800 dark:text-lime-400">
            PRACTICE AREA SERVICES
          </p>
          <h2
            className="text-3xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-4xl"
            id="practice-service-explorer-heading"
          >
            Explore {practiceTitle} services
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-600 dark:text-zinc-400">
            Choose a service to see its focus, practical deliverables and who it
            supports.
          </p>
        </div>

        <div className="hidden gap-8 lg:grid lg:grid-cols-12">
          <nav
            aria-label={`${practiceTitle} services`}
            className="lg:col-span-4"
          >
            <ol className="space-y-1 lg:sticky lg:top-28">
              {services.map((service, index) => {
                const active = index === activeIndex;

                return (
                  <li key={service.title}>
                    <button
                      aria-current={active ? 'true' : undefined}
                      className={`relative flex min-h-16 w-full items-center gap-4 rounded-xl px-5 py-4 text-left transition-colors ${
                        active
                          ? 'bg-emerald-50 text-emerald-950 dark:bg-zinc-900 dark:text-white'
                          : 'text-slate-600 hover:bg-slate-50 hover:text-slate-950 dark:text-zinc-400 dark:hover:bg-zinc-900/70 dark:hover:text-white'
                      }`}
                      onClick={() => setActiveIndex(index)}
                      type="button"
                    >
                      {active ? (
                        <motion.span
                          aria-hidden="true"
                          className="absolute inset-y-3 left-0 w-1 rounded-full bg-emerald-800 dark:bg-lime-400"
                          layoutId="activePracticeService"
                          transition={
                            reduceMotion
                              ? { duration: 0 }
                              : { type: 'spring', stiffness: 420, damping: 34 }
                          }
                        />
                      ) : null}
                      <span className="text-xs font-semibold tracking-wider text-emerald-800 dark:text-lime-400">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="text-sm font-semibold leading-5">
                        {service.title}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </nav>

          <div className="lg:col-span-8">
            <div className="min-h-[520px] rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/90 sm:p-8 lg:p-10">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={activeService.title}
                  initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
                  transition={{ duration: reduceMotion ? 0.1 : 0.28 }}
                >
                  <ServiceDetails service={activeService} />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        <div className="space-y-3 lg:hidden">
          {services.map((service, index) => {
            const expanded = index === expandedMobileIndex;
            const panelId = `practice-service-panel-${index + 1}`;

            return (
              <article
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-zinc-800 dark:bg-zinc-900/90"
                key={service.title}
              >
                <button
                  aria-controls={panelId}
                  aria-expanded={expanded}
                  className="flex min-h-16 w-full items-center gap-3 px-4 py-4 text-left sm:px-5"
                  onClick={() =>
                    setExpandedMobileIndex(expanded ? null : index)
                  }
                  type="button"
                >
                  <span className="text-xs font-semibold tracking-wider text-emerald-800 dark:text-lime-400">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="flex-1 text-sm font-semibold text-slate-900 dark:text-white sm:text-base">
                    {service.title}
                  </span>
                  <motion.span
                    animate={{ rotate: expanded ? 45 : 0 }}
                    aria-hidden="true"
                    className="text-xl text-emerald-800 dark:text-lime-400"
                    transition={{ duration: reduceMotion ? 0 : 0.2 }}
                  >
                    +
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {expanded ? (
                    <motion.div
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      id={panelId}
                      initial={{ height: 0, opacity: 0 }}
                      transition={{ duration: reduceMotion ? 0.1 : 0.28 }}
                    >
                      <div className="border-t border-slate-200 px-4 py-5 dark:border-zinc-800 sm:px-5">
                        <ServiceDetails service={service} />
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
