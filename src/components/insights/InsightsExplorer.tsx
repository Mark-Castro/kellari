'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from 'framer-motion';
import NewsletterSignupForm from '../layout/newsletter-signup-form';
import {
  formatInsightDate,
  getInsightExcerpt,
  getInsightReadTime,
} from '../../lib/insights';
import type { StrapiInsight } from '../../lib/strapi';
import { getStrapiMediaUrl } from '../../lib/strapi';

const filters = [
  { label: 'All', matches: () => true },
  {
    label: 'Financial & Tax',
    matches: (category: string) => /financial|tax/i.test(category),
  },
  {
    label: 'Strategy & Digital',
    matches: (category: string) => /strategy|digital/i.test(category),
  },
  {
    label: 'Sustainability',
    matches: (category: string) => /sustainability/i.test(category),
  },
  {
    label: 'Creative & Comms',
    matches: (category: string) => /creative|marketing|communication/i.test(category),
  },
] as const;

type InsightsExplorerProps = {
  insights: StrapiInsight[] | null;
};

function InsightMetadata({ insight }: { insight: StrapiInsight }) {
  const date = formatInsightDate(insight.publishedDate ?? insight.publishedAt);

  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-medium text-slate-500 dark:text-zinc-400">
      {date ? (
        <time dateTime={insight.publishedDate ?? insight.publishedAt ?? undefined}>
          {date}
        </time>
      ) : null}
      <span aria-hidden="true">·</span>
      <span>{getInsightReadTime(insight)} min read</span>
    </div>
  );
}

function FeaturedVisual({ insight }: { insight: StrapiInsight }) {
  const imageUrl = getStrapiMediaUrl(insight.coverImage);

  if (imageUrl) {
    return (
      <div className="group relative min-h-72 overflow-hidden bg-zinc-900 sm:min-h-[26rem] lg:min-h-full">
        <img
          alt={insight.coverImage?.alternativeText ?? insight.title}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          src={imageUrl}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/75 via-transparent to-zinc-950/25" />
        <span className="absolute left-6 top-6 rounded-full border border-white/25 bg-zinc-950/35 px-3 py-1.5 text-[10px] font-bold tracking-[0.16em] text-white backdrop-blur">
          FEATURED BRIEFING
        </span>
        <span
          aria-hidden="true"
          className="absolute bottom-2 right-5 text-right text-4xl font-semibold uppercase tracking-tight text-white/70"
        >
          {insight.category ?? 'KELARI'}
        </span>
      </div>
    );
  }

  return (
    <div className="relative min-h-72 overflow-hidden bg-[radial-gradient(ellipse_at_75%_25%,rgba(16,120,87,0.5),transparent_55%),linear-gradient(135deg,#064e3b_0%,#111827_65%,#09090b_100%)] sm:min-h-[26rem] lg:min-h-full">
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,.16)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.16)_1px,transparent_1px)] [background-size:46px_46px]"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-16 -right-10 select-none text-[14rem] font-semibold leading-none text-lime-100/[0.08]"
      >
        K
      </div>
      <span className="absolute left-6 top-6 rounded-full border border-white/20 bg-zinc-950/30 px-3 py-1.5 text-[10px] font-bold tracking-[0.16em] text-white backdrop-blur">
        FEATURED BRIEFING
      </span>
      <span className="absolute bottom-7 left-7 max-w-[75%] text-2xl font-semibold uppercase tracking-[0.08em] text-white/85 sm:text-3xl">
        {insight.category ?? 'Kelari Group'}
      </span>
      <span className="absolute bottom-7 right-7 h-2.5 w-2.5 rounded-full bg-lime-400 shadow-[0_0_28px_rgba(116,200,179,0.9)]" />
    </div>
  );
}

export default function InsightsExplorer({ insights }: InsightsExplorerProps) {
  const [activeFilter, setActiveFilter] = useState('All');
  const reduceMotion = useReducedMotion();
  const filteredInsights = useMemo(() => {
    const filter = filters.find((item) => item.label === activeFilter) ?? filters[0];
    return (insights ?? []).filter((insight) =>
      filter.matches(insight.category ?? ''),
    );
  }, [activeFilter, insights]);
  const featured = filteredInsights[0];
  const remainingInsights = filteredInsights.slice(1);

  return (
    <section className="mx-auto w-full max-w-7xl px-4 pb-20 sm:px-6 lg:px-8 lg:pb-28">
      <div className="mb-9 flex flex-col gap-3 border-b border-slate-200 pb-6 dark:border-zinc-800 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold tracking-[0.2em] text-emerald-800 dark:text-lime-400">
            THE KELARI PERSPECTIVE
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-3xl">
            Latest briefings
          </h2>
        </div>
        <p className="max-w-xl text-sm leading-6 text-slate-600 dark:text-zinc-400">
          Clear thinking on the decisions shaping organizations, people, and
          markets.
        </p>
      </div>

      {insights === null ? (
        <p
          className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-slate-700 dark:border-zinc-800 dark:bg-zinc-900/80 dark:text-zinc-300"
          role="status"
        >
          Insights are temporarily unavailable. Please try again later.
        </p>
      ) : insights.length === 0 ? (
        <p
          className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-slate-700 dark:border-zinc-800 dark:bg-zinc-900/80 dark:text-zinc-300"
          role="status"
        >
          No published insights yet. Please check back soon.
        </p>
      ) : (
        <>
          <AnimatePresence mode="wait">
            {featured ? (
              <motion.article
                animate={{ opacity: 1, y: 0 }}
                className="grid overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900/90 lg:grid-cols-12"
                initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                key={featured.documentId ?? featured.id}
                transition={{ duration: reduceMotion ? 0.1 : 0.35 }}
              >
                <div className="lg:col-span-6">
                  <FeaturedVisual insight={featured} />
                </div>
                <div className="flex flex-col justify-center p-6 sm:p-9 lg:col-span-6 lg:p-12">
                  <div className="mb-5 flex flex-wrap items-center gap-3">
                    <span className="rounded-full border border-emerald-800/15 bg-emerald-50 px-3 py-1.5 text-[10px] font-bold tracking-[0.14em] text-emerald-900 dark:border-lime-400/20 dark:bg-lime-400/10 dark:text-lime-400">
                      {(featured.category ?? 'INSIGHT').toUpperCase()}
                    </span>
                    <InsightMetadata insight={featured} />
                  </div>
                  <h3 className="text-3xl font-semibold leading-tight tracking-tight text-slate-950 dark:text-white sm:text-4xl">
                    {featured.title}
                  </h3>
                  {getInsightExcerpt(featured) ? (
                    <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 dark:text-zinc-300">
                      {getInsightExcerpt(featured)}
                    </p>
                  ) : null}
                  <Link
                    className="group mt-8 inline-flex min-h-12 w-fit items-center gap-2 rounded-full bg-emerald-800 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-emerald-900 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-800 dark:bg-lime-400 dark:text-zinc-950 dark:hover:bg-lime-300 dark:focus-visible:outline-lime-400"
                    href={`/insights/${featured.slug}`}
                  >
                    Read briefing
                    <motion.span
                      aria-hidden="true"
                      className="inline-block"
                      whileHover={reduceMotion ? undefined : { x: 4 }}
                    >
                      →
                    </motion.span>
                  </Link>
                </div>
              </motion.article>
            ) : (
              <motion.p
                animate={{ opacity: 1 }}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-slate-700 dark:border-zinc-800 dark:bg-zinc-900/80 dark:text-zinc-300"
                exit={{ opacity: 0 }}
                initial={{ opacity: 0 }}
              >
                No briefings in this category yet. Choose another practice area
                or browse all insights.
              </motion.p>
            )}
          </AnimatePresence>

          <div className="mt-12">
            <div
              aria-label="Filter insights by practice area"
              className="flex flex-wrap gap-2"
              role="group"
            >
              {filters.map((filter) => {
                const active = activeFilter === filter.label;
                return (
                  <button
                    aria-pressed={active}
                    className={`relative isolate rounded-full px-4 py-2.5 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-800 dark:focus-visible:outline-lime-400 ${
                      active
                        ? 'text-white dark:text-zinc-950'
                        : 'border border-slate-200 bg-white text-slate-600 hover:border-emerald-800/40 hover:text-emerald-900 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300 dark:hover:border-lime-400/40 dark:hover:text-lime-400'
                    }`}
                    key={filter.label}
                    onClick={() => setActiveFilter(filter.label)}
                    type="button"
                  >
                    {active ? (
                      <motion.span
                        className="absolute inset-0 z-0 rounded-full bg-emerald-800 dark:bg-lime-400"
                        layoutId="activeInsightTab"
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      />
                    ) : null}
                    <span className="relative z-10">{filter.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {remainingInsights.length > 0 ? (
            <div className="mt-7 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {remainingInsights.map((insight, index) => {
                const imageUrl = getStrapiMediaUrl(insight.coverImage);
                const date = formatInsightDate(
                  insight.publishedDate ?? insight.publishedAt,
                );

                return (
                  <motion.article
                    className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-zinc-800 dark:bg-zinc-900/90"
                    initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                    key={insight.documentId ?? insight.id}
                    transition={{
                      duration: reduceMotion ? 0.1 : 0.42,
                      delay: reduceMotion ? 0 : (index % 3) * 0.08,
                    }}
                    viewport={{ once: false, amount: 0.2 }}
                    whileHover={reduceMotion ? undefined : { y: -6 }}
                    whileInView={{ opacity: 1, y: 0 }}
                  >
                    {imageUrl ? (
                      <div className="relative aspect-[16/9] overflow-hidden bg-zinc-900">
                        <img
                          alt={insight.coverImage?.alternativeText ?? insight.title}
                          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          src={imageUrl}
                        />
                      </div>
                    ) : (
                      <div className="relative aspect-[16/9] overflow-hidden bg-[radial-gradient(ellipse_at_75%_25%,rgba(16,120,87,0.32),transparent_55%),linear-gradient(135deg,#064e3b,#18181b)]">
                        <div
                          aria-hidden="true"
                          className="absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(255,255,255,.14)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.14)_1px,transparent_1px)] [background-size:32px_32px]"
                        />
                        <span className="absolute bottom-3 right-5 text-8xl font-semibold leading-none text-white/[0.08]">
                          K
                        </span>
                      </div>
                    )}
                    <div className="flex flex-1 flex-col p-6">
                      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                        <span className="rounded-full bg-emerald-50 px-3 py-1 text-[10px] font-bold tracking-[0.12em] text-emerald-900 dark:bg-lime-400/10 dark:text-lime-400">
                          {(insight.category ?? 'INSIGHT').toUpperCase()}
                        </span>
                        <span className="text-xs text-slate-500 dark:text-zinc-400">
                          {date ? `${date} · ` : ''}
                          {getInsightReadTime(insight)} min read
                        </span>
                      </div>
                      <h3 className="text-xl font-semibold leading-snug text-slate-950 dark:text-white">
                        {insight.title}
                      </h3>
                      {getInsightExcerpt(insight) ? (
                        <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600 dark:text-zinc-400">
                          {getInsightExcerpt(insight)}
                        </p>
                      ) : null}
                      <Link
                        className="mt-auto inline-flex min-h-11 items-end gap-2 pt-6 text-sm font-semibold text-emerald-800 transition-colors hover:text-emerald-900 dark:text-lime-400 dark:hover:text-lime-300"
                        href={`/insights/${insight.slug}`}
                      >
                        Read briefing <span aria-hidden="true">→</span>
                      </Link>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          ) : (
            <section className="mt-12 grid gap-8 overflow-hidden rounded-3xl border border-slate-200 bg-emerald-50/60 p-6 dark:border-zinc-800 dark:bg-zinc-900/90 sm:p-9 lg:grid-cols-[1fr_auto] lg:items-center lg:p-12">
              <div>
                <p className="text-xs font-semibold tracking-[0.2em] text-emerald-800 dark:text-lime-400">
                  EXECUTIVE BRIEFING
                </p>
                <h3 className="mt-3 max-w-2xl text-2xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-3xl">
                  Get the perspective behind the progress.
                </h3>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 dark:text-zinc-400">
                  Receive practical ideas and new briefings from Kelari Group
                  directly in your inbox.
                </p>
              </div>
              <NewsletterSignupForm idPrefix="insights-briefing-newsletter" />
            </section>
          )}
        </>
      )}
    </section>
  );
}
