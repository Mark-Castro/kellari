import type { Metadata } from 'next';
import { draftMode } from 'next/headers';
import CTABanner from '../../../components/features/cta-banner';
import Hero from '../../../components/features/hero';
import PreviewBanner from '../../../components/layout/preview-banner';
import { getInsightBySlug } from '../../../lib/strapi';

function getBlockText(value: unknown): string {
  if (Array.isArray(value)) return value.map(getBlockText).join('');
  if (!value || typeof value !== 'object') return '';

  const block = value as Record<string, unknown>;
  if (typeof block.text === 'string') return block.text;
  return getBlockText(block.children);
}

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const metadata: Metadata = {
  title: 'Insight Detail',
};

export default async function InsightDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const { isEnabled } = await draftMode();
  const insight = await getInsightBySlug(slug, isEnabled).catch((error: unknown) => {
    console.error(`Unable to load Insight "${slug}" from Strapi:`, error);
    return null;
  });

  return (
    <main>
      <PreviewBanner isEnabled={isEnabled} />
      <Hero
        eyebrow="Insights"
        title={insight?.title ?? 'Insight unavailable'}
        description={insight?.excerpt ?? undefined}
      />
      {insight ? (
        <article className="insight-article">
          {(insight.publishedDate ?? insight.publishedAt) ? (
            <time
              className="insight-date"
              dateTime={insight.publishedDate ?? insight.publishedAt ?? undefined}
            >
              {new Intl.DateTimeFormat('en', {
                dateStyle: 'long',
                timeZone: 'UTC',
              }).format(
                new Date(insight.publishedDate ?? insight.publishedAt ?? ''),
              )}
            </time>
          ) : null}
          {insight.content?.length ? (
            <div className="insight-article-content">
              {insight.content.map((block, index) => {
                const text = getBlockText(block);
                if (!text) return null;

                const blockType =
                  block && typeof block === 'object' && 'type' in block
                    ? block.type
                    : undefined;
                const key = `insight-content-${index}`;
                if (blockType === 'heading') {
                  return <h2 key={key}>{text}</h2>;
                }
                if (blockType === 'quote') {
                  return <blockquote key={key}>{text}</blockquote>;
                }
                return <p key={key}>{text}</p>;
              })}
            </div>
          ) : insight.body ? (
            <p>{insight.body}</p>
          ) : null}
        </article>
      ) : (
        <section>
          <p role="status">
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
