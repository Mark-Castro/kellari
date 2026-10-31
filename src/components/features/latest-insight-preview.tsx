import Link from 'next/link';
import Reveal from '../motion/reveal';

type LatestInsightPreviewProps = {
  category?: string;
  title?: string;
  excerpt?: string;
  href?: string;
  publishedAt?: string;
};

export default function LatestInsightPreview({
  category = 'Insights',
  title = 'Fresh perspectives are on the way',
  excerpt = 'Our latest articles and practical guides will appear here. Check back soon for ideas from the Kellari team.',
  href = '/insights',
  publishedAt,
}: LatestInsightPreviewProps) {
  return (
    <Reveal as="article" className="latest-insight-preview" interactive>
      <div className="insight-preview-art" aria-hidden="true">
        <span>K</span>
      </div>
      <div className="insight-preview-copy">
        <p className="eyebrow">{category}</p>
        {publishedAt ? (
          <time className="insight-date" dateTime={publishedAt}>
            {new Intl.DateTimeFormat('en', {
              dateStyle: 'medium',
              timeZone: 'UTC',
            }).format(new Date(publishedAt))}
          </time>
        ) : null}
        <h3>{title}</h3>
        <p>{excerpt}</p>
        <Link href={href}>
          Explore insights <span aria-hidden="true">→</span>
        </Link>
      </div>
    </Reveal>
  );
}
