'use client';

import Link from 'next/link';
import { useLenis } from 'lenis/react';
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
} from 'framer-motion';
import { useEffect, useMemo, useRef, useState } from 'react';
import {
  formatInsightDate,
  getInsightContentBlocks,
  getInsightReadTime,
  type InsightContentBlock,
} from '../../lib/insights';
import type { StrapiInsight } from '../../lib/strapi';
import { getStrapiMediaUrl } from '../../lib/strapi';

type ArticleReaderProps = {
  insight: StrapiInsight;
};

function isStrategicTakeaway(text: string) {
  return /^strategic takeaway\s*:/i.test(text);
}

function renderParagraph(text: string, key: string, executiveSummary: boolean) {
  const takeaway = isStrategicTakeaway(text);
  const cleanedText = text.replace(/^executive summary\s*:\s*/i, '');
  const takeawayText = text.replace(/^strategic takeaway\s*:\s*/i, '');

  if (takeaway) {
    return (
      <blockquote
        className="my-7 rounded-r-2xl border-l-4 border-emerald-800 bg-emerald-50/70 px-5 py-5 text-base font-medium leading-7 text-emerald-950 dark:border-lime-400 dark:bg-zinc-900/90 dark:text-zinc-100 sm:px-7 sm:text-lg"
        key={key}
      >
        <span className="mb-2 block text-[10px] font-bold tracking-[0.18em] text-emerald-800 dark:text-lime-400">
          STRATEGIC TAKEAWAY
        </span>
        {takeawayText}
      </blockquote>
    );
  }

  if (executiveSummary) {
    return (
      <div
        className="my-6 rounded-r-2xl border-l-4 border-emerald-800 bg-emerald-50/70 px-5 py-5 dark:border-lime-400 dark:bg-zinc-900/90 sm:px-7 sm:py-6"
        key={key}
      >
        <p className="mb-2 text-[10px] font-bold tracking-[0.18em] text-emerald-800 dark:text-lime-400">
          EXECUTIVE SUMMARY
        </p>
        <p className="text-base leading-7 text-slate-800 dark:text-zinc-200 sm:text-lg sm:leading-8">
          {cleanedText}
        </p>
      </div>
    );
  }

  const numberedItem = /^(\d+)\.\s+(.+)$/.exec(text);
  if (numberedItem) {
    return (
      <div
        className="my-4 flex gap-4 rounded-2xl border border-slate-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900/70 sm:p-6"
        key={key}
      >
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-emerald-50 text-sm font-bold text-emerald-900 dark:bg-lime-400/10 dark:text-lime-400">
          {numberedItem[1].padStart(2, '0')}
        </span>
        <p className="pt-1 text-base font-medium leading-7 text-slate-800 dark:text-zinc-200">
          {numberedItem[2]}
        </p>
      </div>
    );
  }

  return (
    <p
      className="text-base leading-7 text-slate-700 dark:text-zinc-300 sm:text-lg sm:leading-8"
      key={key}
    >
      {text}
    </p>
  );
}

function renderContentBlock(
  block: InsightContentBlock,
  index: number,
  summaryIndex: number,
) {
  const key = `article-block-${index}`;

  if (block.type === 'heading') {
    const level = Math.min(Math.max(block.level, 2), 3);
    if (level === 3) {
      return (
        <h3
          className="scroll-mt-28 border-b border-slate-200 pb-2 pt-5 text-xl font-semibold tracking-tight text-slate-950 dark:border-zinc-800 dark:text-white sm:text-2xl"
          id={block.id}
          key={key}
        >
          {block.text}
        </h3>
      );
    }

    return (
      <h2
        className="scroll-mt-28 border-b border-slate-200 pb-3 pt-10 text-2xl font-semibold tracking-tight text-slate-950 dark:border-zinc-800 dark:text-white sm:text-3xl"
        id={block.id}
        key={key}
      >
        {block.text}
      </h2>
    );
  }

  if (block.type === 'quote') {
    return (
      <blockquote
        className="my-7 border-l-4 border-emerald-800 bg-slate-50 px-5 py-4 text-lg font-medium leading-7 text-slate-800 dark:border-lime-400 dark:bg-zinc-900/80 dark:text-zinc-200 sm:px-7"
        key={key}
      >
        {block.text}
      </blockquote>
    );
  }

  if (block.type === 'list') {
    const List = block.ordered ? 'ol' : 'ul';
    return (
      <List className="my-6 grid gap-3" key={key}>
        {block.items.map((item, itemIndex) => (
          <li
            className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-4 text-base leading-7 text-slate-700 dark:border-zinc-800 dark:bg-zinc-900/70 dark:text-zinc-300 sm:p-5"
            key={`${key}-${itemIndex}`}
          >
            {block.ordered ? (
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-emerald-50 text-xs font-bold text-emerald-900 dark:bg-lime-400/10 dark:text-lime-400">
                {String(itemIndex + 1).padStart(2, '0')}
              </span>
            ) : (
              <span
                aria-hidden="true"
                className="mt-3 h-2 w-2 shrink-0 rounded-full bg-emerald-800 dark:bg-lime-400"
              />
            )}
            <span>{item}</span>
          </li>
        ))}
      </List>
    );
  }

  if (block.type === 'framework') {
    return (
      <ol className="my-7 grid gap-4 sm:grid-cols-2" key={key}>
        {block.items.map((item) => (
          <li
            className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900/80 sm:p-6"
            key={`${key}-${item.number}`}
          >
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-emerald-50 text-xs font-bold tracking-wide text-emerald-900 dark:bg-lime-400/10 dark:text-lime-400">
              {item.number}
            </span>
            <h3 className="mt-4 text-lg font-semibold leading-snug text-slate-950 dark:text-white">
              {item.title}
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-zinc-400">
              {item.description}
            </p>
          </li>
        ))}
      </ol>
    );
  }

  return renderParagraph(block.text, key, index === summaryIndex);
}

export default function ArticleReader({ insight }: ArticleReaderProps) {
  const readerRef = useRef<HTMLElement>(null);
  const lenis = useLenis();
  const reduceMotion = useReducedMotion();
  const [activeHeading, setActiveHeading] = useState('');
  const [copyStatus, setCopyStatus] = useState('');
  const copyTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const blocks = useMemo(() => getInsightContentBlocks(insight), [insight]);
  const headings = useMemo(
    () =>
      blocks.filter(
        (block): block is Extract<InsightContentBlock, { type: 'heading' }> =>
          block.type === 'heading' && block.level <= 3,
      ),
    [blocks],
  );
  const summaryIndex = blocks.findIndex(
    (block) => block.type === 'paragraph' && !isStrategicTakeaway(block.text),
  );
  const { scrollYProgress } = useScroll({
    target: readerRef,
    offset: ['start start', 'end end'],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.25,
  });
  const dateValue = insight.publishedDate ?? insight.publishedAt;
  const date = formatInsightDate(dateValue);
  const imageUrl = getStrapiMediaUrl(insight.coverImage);

  useEffect(() => {
    if (!headings.length) return;

    const elements = headings
      .map((heading) => document.getElementById(heading.id))
      .filter((element): element is HTMLElement => element !== null);
    if (!elements.length) return;

    setActiveHeading(elements[0].id);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (first, second) =>
              first.boundingClientRect.top - second.boundingClientRect.top,
          );
        if (visible[0]) setActiveHeading(visible[0].target.id);
      },
      { rootMargin: '-18% 0px -68% 0px', threshold: 0 },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [headings]);

  useEffect(
    () => () => {
      if (copyTimeout.current) clearTimeout(copyTimeout.current);
    },
    [],
  );

  function navigateToSection(id: string) {
    const target = document.getElementById(id);
    if (!target) return;

    window.history.replaceState(null, '', `#${id}`);
    if (lenis && !reduceMotion) {
      lenis.scrollTo(target, { duration: 0.9 });
    } else {
      target.scrollIntoView({
        behavior: reduceMotion ? 'instant' : 'smooth',
        block: 'start',
      });
    }
  }

  async function copyArticleLink() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopyStatus('Copied!');
      if (copyTimeout.current) clearTimeout(copyTimeout.current);
      copyTimeout.current = setTimeout(() => setCopyStatus(''), 2200);
    } catch (error) {
      console.error('Unable to copy the insight link:', error);
      setCopyStatus('Copy unavailable');
    }
  }

  return (
    <section
      className="relative w-full overflow-x-clip bg-white px-4 pb-20 dark:bg-zinc-950 sm:px-6 lg:px-8 lg:pb-28"
      ref={readerRef}
    >
      <motion.div
        aria-hidden="true"
        className="fixed inset-x-0 top-0 z-50 h-1 origin-left bg-emerald-800 dark:bg-lime-400"
        style={{ scaleX: reduceMotion ? scrollYProgress : progress }}
      />

      <div className="mx-auto max-w-7xl">
        <nav aria-label="Breadcrumb" className="py-6 text-sm">
          <ol className="flex flex-wrap items-center gap-2 text-slate-500 dark:text-zinc-500">
            <li>
              <Link className="hover:text-emerald-800 dark:hover:text-lime-400" href="/">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link
                className="hover:text-emerald-800 dark:hover:text-lime-400"
                href="/insights"
              >
                Insights
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li
              aria-current="page"
              className="max-w-[13rem] truncate text-slate-700 dark:text-zinc-300 sm:max-w-sm"
            >
              {insight.title}
            </li>
          </ol>
        </nav>

        <header className="border-b border-slate-200 pb-8 pt-4 dark:border-zinc-800 sm:pb-10">
          <span className="inline-flex rounded-full border border-emerald-800/15 bg-emerald-50 px-3 py-1.5 text-[10px] font-bold tracking-[0.14em] text-emerald-900 dark:border-lime-400/20 dark:bg-lime-400/10 dark:text-lime-400">
            {(insight.category ?? 'INSIGHT').toUpperCase()}
          </span>
          <h1 className="mt-5 max-w-5xl text-3xl font-semibold leading-tight tracking-tight text-slate-950 dark:text-white sm:text-5xl">
            {insight.title}
          </h1>
          <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-slate-500 dark:text-zinc-400">
            {date ? (
              <>
                <time dateTime={dateValue ?? undefined}>{date}</time>
                <span aria-hidden="true">·</span>
              </>
            ) : null}
            <span>{getInsightReadTime(insight)} min read</span>
            {insight.authorName ? (
              <>
                <span aria-hidden="true">·</span>
                <span>By {insight.authorName}</span>
              </>
            ) : null}
          </div>
        </header>

        <div className="grid gap-10 pt-8 lg:grid-cols-12 lg:gap-12 lg:pt-12">
          <aside className="h-fit space-y-4 self-start lg:sticky lg:top-28 lg:col-span-4">
            <nav
              aria-label="Article contents"
              className="rounded-2xl border border-slate-200 bg-slate-50/80 p-5 dark:border-zinc-800 dark:bg-zinc-900/70 sm:p-6"
            >
              <h2 className="text-xs font-bold tracking-[0.18em] text-slate-900 dark:text-white">
                CONTENTS
              </h2>
              {headings.length ? (
                <ol className="mt-4 space-y-1">
                  {headings.map((heading) => (
                    <li key={heading.id}>
                      <a
                        aria-current={
                          activeHeading === heading.id ? 'location' : undefined
                        }
                        className={`block rounded-lg border-l-2 px-3 py-2 text-sm leading-5 transition-colors ${
                          activeHeading === heading.id
                            ? 'border-emerald-800 bg-emerald-50 text-emerald-900 dark:border-lime-400 dark:bg-zinc-800 dark:text-lime-400'
                            : 'border-transparent text-slate-600 hover:text-emerald-900 dark:text-zinc-400 dark:hover:text-lime-400'
                        } ${heading.level === 3 ? 'ml-3 text-[13px]' : ''}`}
                        href={`#${heading.id}`}
                        key={heading.id}
                        onClick={(event) => {
                          event.preventDefault();
                          navigateToSection(heading.id);
                        }}
                      >
                        {heading.text}
                      </a>
                    </li>
                  ))}
                </ol>
              ) : (
                <a
                  className="mt-4 block rounded-lg border-l-2 border-emerald-800 px-3 py-2 text-sm text-slate-600 dark:border-lime-400 dark:text-zinc-400"
                  href="#insight-overview"
                  onClick={(event) => {
                    event.preventDefault();
                    navigateToSection('insight-overview');
                  }}
                >
                  Overview
                </a>
              )}
            </nav>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900/70 sm:p-6">
              <h2 className="text-xs font-bold tracking-[0.18em] text-slate-900 dark:text-white">
                BRIEFING DETAILS
              </h2>
              <p className="mt-4 text-xs font-semibold tracking-wide text-slate-500 dark:text-zinc-400">
                PRACTICE AREA
              </p>
              <p className="mt-1 text-sm font-medium text-slate-800 dark:text-zinc-200">
                {insight.category ?? 'Kelari Group'}
              </p>
              <button
                className="mt-5 inline-flex min-h-10 items-center gap-2 rounded-lg text-sm font-semibold text-emerald-800 hover:text-emerald-900 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-800 dark:text-lime-400 dark:hover:text-lime-300 dark:focus-visible:outline-lime-400"
                onClick={copyArticleLink}
                type="button"
              >
                {copyStatus || 'Copy briefing link'}
                <span aria-hidden="true">{copyStatus === 'Copied!' ? '✓' : '↗'}</span>
              </button>
              <p aria-live="polite" className="sr-only" role="status">
                {copyStatus}
              </p>
              <Link
                className="mt-4 flex min-h-11 items-center justify-center rounded-full bg-emerald-800 px-4 py-2 text-center text-sm font-semibold text-white transition-colors hover:bg-emerald-900 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-800 dark:bg-lime-400 dark:text-zinc-950 dark:hover:bg-lime-300 dark:focus-visible:outline-lime-400"
                href="/contact"
              >
                Discuss with our team <span aria-hidden="true" className="ml-2">→</span>
              </Link>
            </div>
          </aside>

          <article
            aria-label={insight.title}
            className="min-w-0 lg:col-span-8"
            id="insight-overview"
          >
            {imageUrl ? (
              <figure className="mb-8 overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 dark:border-zinc-800 dark:bg-zinc-900">
                <img
                  alt={insight.coverImage?.alternativeText ?? insight.title}
                  className="max-h-[34rem] w-full object-cover"
                  decoding="async"
                  src={imageUrl}
                />
              </figure>
            ) : null}
            <div className="space-y-6 leading-relaxed">
              {blocks.length ? (
                blocks.map((block, index) =>
                  renderContentBlock(block, index, summaryIndex),
                )
              ) : insight.excerpt ? (
                renderParagraph(insight.excerpt, 'article-excerpt', true)
              ) : (
                <p className="text-base leading-7 text-slate-600 dark:text-zinc-400 sm:text-lg sm:leading-8">
                  This briefing does not have any published body content yet.
                </p>
              )}
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
