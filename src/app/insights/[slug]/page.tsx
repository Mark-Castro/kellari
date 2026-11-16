import type { Metadata } from 'next';
import { draftMode } from 'next/headers';
import ArticleReader from '../../../components/insights/ArticleReader';
import CTABanner from '../../../components/features/cta-banner';
import PreviewBanner from '../../../components/layout/preview-banner';
import { getInsightBySlug } from '../../../lib/strapi';

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const insight = await getInsightBySlug(slug).catch((error: unknown) => {
    console.error(`Unable to load Insight metadata "${slug}" from Strapi:`, error);
    return null;
  });

  return {
    title: insight?.title ?? 'Insight unavailable',
    description: insight?.excerpt ?? undefined,
  };
}

export default async function InsightDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const { isEnabled } = await draftMode();
  const insight = await getInsightBySlug(slug, isEnabled).catch((error: unknown) => {
    console.error(`Unable to load Insight "${slug}" from Strapi:`, error);
    return null;
  });

  return (
    <main className="w-full overflow-x-clip bg-white dark:bg-zinc-950">
      <PreviewBanner isEnabled={isEnabled} />
      {insight ? (
        <ArticleReader insight={insight} />
      ) : (
        <section className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <p
            className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-slate-700 dark:border-zinc-800 dark:bg-zinc-900/80 dark:text-zinc-300"
            role="status"
          >
            {isEnabled && !process.env.STRAPI_API_TOKEN?.trim()
              ? 'Draft preview requires a read-only Strapi API token. Configure STRAPI_API_TOKEN in .env.local and restart Next.js.'
              : 'This insight is unavailable. It may be unpublished, or the Strapi service may not be reachable.'}
          </p>
        </section>
      )}
      <CTABanner title="Continue the conversation" />
    </main>
  );
}
