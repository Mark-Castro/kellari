import type { Metadata } from 'next';
import InsightsExplorer from '../../components/insights/InsightsExplorer';
import { getLatestInsights } from '../../lib/strapi';

export const metadata: Metadata = {
  title: 'Insights & Articles',
  description:
    'Executive briefings and practical perspectives on strategy, finance, sustainability, and organizational change.',
};

export default async function InsightsPage() {
  const insights = await getLatestInsights(100).then(
    (result) => result,
    (error: unknown) => {
      console.error('Unable to load Insights from Strapi:', error);
      return null;
    },
  );

  return (
    <main className="w-full overflow-x-clip bg-white dark:bg-zinc-950">
      <header className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-br from-emerald-50/70 via-white to-white px-4 py-16 dark:border-zinc-800 dark:from-zinc-950 dark:via-zinc-950 dark:to-zinc-900 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-32 h-96 w-96 rounded-full bg-emerald-200/30 blur-3xl dark:bg-lime-400/5"
        />
        <div className="relative mx-auto max-w-7xl">
          <p className="mb-5 text-xs font-semibold tracking-[0.22em] text-emerald-800 dark:text-lime-400">
            IDEAS FOR WHAT COMES NEXT
          </p>
          <h1 className="max-w-4xl text-4xl font-semibold leading-[1.08] tracking-tight text-slate-950 dark:text-white sm:text-6xl">
            Insights &amp; Articles
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-zinc-300">
            Clear perspectives to help leaders make sense of change, navigate
            complexity, and identify new opportunities.
          </p>
        </div>
      </header>
      <InsightsExplorer insights={insights} />
    </main>
  );
}
