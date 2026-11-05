import type { Metadata } from 'next';
import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';
import CareerDescription from '../../../components/careers/career-description';
import Hero from '../../../components/features/hero';
import PreviewBanner from '../../../components/layout/preview-banner';
import { getCareerByDocumentId } from '../../../lib/strapi';

type PageProps = {
  params: Promise<{ id: string }>;
};

export const metadata: Metadata = {
  title: 'Career opportunity',
};

export default async function CareerDetailPage({ params }: PageProps) {
  const [{ id }, { isEnabled }] = await Promise.all([params, draftMode()]);
  let career;

  try {
    career = await getCareerByDocumentId(id, isEnabled);
  } catch (error) {
    console.error(`Unable to load Career "${id}" from Strapi:`, error);
    return (
      <main>
        <PreviewBanner isEnabled={isEnabled} />
        <Hero
          eyebrow="Careers"
          title="This opportunity is temporarily unavailable"
          description={
            isEnabled && !process.env.STRAPI_API_TOKEN?.trim()
              ? 'Draft preview requires a read-only Strapi API token. Configure STRAPI_API_TOKEN in .env.local and restart Next.js.'
              : 'We could not load this role right now. Please try again later.'
          }
          secondaryAction={{ label: 'Back to careers', href: '/careers' }}
        />
      </main>
    );
  }

  if (!career || !career.documentId) notFound();

  return (
    <main>
      <PreviewBanner isEnabled={isEnabled} />
      <Hero
        eyebrow={`${career.department} · ${career.employmentType}`}
        title={career.title}
        description={career.location}
        primaryAction={
          isEnabled
            ? undefined
            : {
                label: 'Apply now',
                href: `/careers/${career.documentId}/apply`,
              }
        }
        secondaryAction={{ label: 'Back to careers', href: '/careers' }}
      />
      <section className="career-detail-content" aria-label="Role description">
        <CareerDescription career={career} />
        {isEnabled ? (
          <p role="status">
            Applications are disabled while previewing an unpublished role.
          </p>
        ) : null}
      </section>
    </main>
  );
}
