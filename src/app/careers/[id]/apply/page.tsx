import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ApplicationModal from '../../../../components/careers/ApplicationModal';
import Hero from '../../../../components/features/hero';
import { getCareerByDocumentId } from '../../../../lib/strapi';

type PageProps = {
  params: Promise<{ id: string }>;
};

export const metadata: Metadata = {
  title: 'Apply for a role',
};

export default async function CareerApplicationPage({ params }: PageProps) {
  const { id } = await params;
  let career;

  try {
    career = await getCareerByDocumentId(id);
  } catch (error) {
    console.error(`Unable to load Career "${id}" from Strapi:`, error);
    return (
      <main>
        <Hero
          eyebrow="Careers"
          title="Applications are temporarily unavailable"
          description="We could not load this role right now. Please try again later."
          secondaryAction={{ label: 'Back to careers', href: '/careers' }}
        />
      </main>
    );
  }

  if (!career || !career.documentId) notFound();

  return (
    <main>
      <ApplicationModal
        openOnMount
        jobTitle={career.title}
        targetDepartment={career.department}
        jobPositionId={career.documentId}
      />
    </main>
  );
}
