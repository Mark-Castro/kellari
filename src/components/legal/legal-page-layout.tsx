'use client';

import type { ReactNode } from 'react';
import { motion } from 'framer-motion';

type LegalSectionLink = {
  id: string;
  title: string;
};

type LegalPageLayoutProps = {
  title: string;
  effectiveDate: string;
  lastUpdated: string;
  sections: readonly LegalSectionLink[];
  children: ReactNode;
};

export default function LegalPageLayout({
  title,
  effectiveDate,
  lastUpdated,
  sections,
  children,
}: LegalPageLayoutProps) {
  return (
    <motion.main
      className="w-full overflow-x-hidden bg-slate-50/50 px-4 py-16 text-slate-800 dark:bg-zinc-950 dark:text-zinc-300 sm:px-6 lg:px-8 lg:py-24"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mx-auto max-w-5xl">
        <header className="mb-10 border-b border-slate-200 pb-8 dark:border-zinc-800 sm:mb-14 sm:pb-10">
          <p className="mb-4 text-xs font-semibold tracking-[0.2em] text-emerald-800 dark:text-lime-400">
            LEGAL &amp; GOVERNANCE
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
            {title}
          </h1>
          <p className="mt-5 text-sm leading-6 text-slate-600 dark:text-zinc-400">
            Effective Date: {effectiveDate}
            <span className="mx-2" aria-hidden="true">|</span>
            Last Updated: {lastUpdated}
          </p>
        </header>

        <div className="grid gap-10 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-14">
          <aside className="h-fit rounded-2xl border border-slate-200 bg-white/70 p-5 dark:border-zinc-800 dark:bg-zinc-900/50 lg:sticky lg:top-28">
            <h2 className="mb-4 text-sm font-semibold text-slate-900 dark:text-white">
              On this page
            </h2>
            <nav aria-label={`${title} contents`}>
              <ol className="space-y-2.5">
                {sections.map((section, index) => (
                  <li key={section.id}>
                    <a
                      className="text-sm leading-5 text-slate-600 transition-colors hover:text-emerald-800 hover:underline dark:text-zinc-400 dark:hover:text-lime-400"
                      href={`#${section.id}`}
                    >
                      {index + 1}. {section.title}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </aside>

          <article className="min-w-0">
            <div className="prose prose-slate max-w-none prose-headings:font-semibold prose-headings:tracking-tight prose-headings:text-slate-900 prose-a:text-emerald-800 prose-a:decoration-emerald-800/40 prose-a:hover:decoration-emerald-800 dark:prose-invert dark:prose-headings:text-white dark:prose-a:text-lime-400 dark:prose-a:decoration-lime-400/40 dark:prose-a:hover:decoration-lime-400">
              {children}
            </div>
          </article>
        </div>
      </div>
    </motion.main>
  );
}
