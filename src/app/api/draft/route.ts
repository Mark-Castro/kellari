import { timingSafeEqual } from 'node:crypto';
import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';

type PreviewType = 'insights' | 'careers';

function isPreviewType(value: string | null): value is PreviewType {
  return value === 'insights' || value === 'careers';
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get('secret') ?? '';
  const expectedSecret = process.env.STRAPI_PREVIEW_SECRET;

  if (!expectedSecret) {
    return Response.json(
      { error: 'Draft preview is not configured.' },
      { status: 500 },
    );
  }

  const providedSecret = Buffer.from(secret);
  const configuredSecret = Buffer.from(expectedSecret);
  if (
    providedSecret.length !== configuredSecret.length ||
    !timingSafeEqual(providedSecret, configuredSecret)
  ) {
    return Response.json({ error: 'Unauthorized.' }, { status: 401 });
  }

  const slug = searchParams.get('slug')?.trim();
  if (
    !slug ||
    slug === '.' ||
    slug === '..' ||
    slug.length > 200 ||
    slug.includes('/') ||
    slug.includes('\\')
  ) {
    return Response.json(
      { error: 'A valid slug is required.' },
      { status: 400 },
    );
  }

  const type = searchParams.get('type');
  if (!isPreviewType(type)) {
    return Response.json(
      { error: 'Type must be "insights" or "careers".' },
      { status: 400 },
    );
  }

  const draft = await draftMode();
  draft.enable();
  redirect(`/${type}/${encodeURIComponent(slug)}`);
}
