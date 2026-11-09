import 'server-only';
import { z } from 'zod';
import { persistContactInquiry } from '../../../lib/cmsService';
import { sendContactConfirmation } from '../../../lib/emailService';

export const runtime = 'nodejs';

const servicePillars = new Set([
  'Strategy, People & Digital',
  'Financial & Tax Advisory',
  'Sustainability & ESG',
  'Creative & Communications',
]);

const contactSchema = z
  .object({
    name: z.string().trim().max(150).optional(),
    email: z.string().trim().email().max(254),
    subject: z.string().trim().max(200).optional(),
    message: z.string().trim().min(1).max(10_000),
    company: z.string().trim().max(200).optional(),
    phone: z.string().trim().max(40).optional(),
    service: z
      .string()
      .trim()
      .max(120)
      .optional()
      .refine(
        (service) => !service || servicePillars.has(service),
        'Select a valid service pillar.',
      ),
    website: z.string().max(500).optional(),
  })
  .strict();

function jsonResponse(body: object, status = 200) {
  return Response.json(body, {
    status,
    headers: { 'Cache-Control': 'no-store' },
  });
}

export async function POST(request: Request) {
  const origin = request.headers.get('origin');
  if (!origin) {
    return jsonResponse({ error: 'Request origin could not be verified.' }, 403);
  }

  try {
    if (new URL(origin).origin !== new URL(request.url).origin) {
      return jsonResponse(
        { error: 'Request origin could not be verified.' },
        403,
      );
    }
  } catch {
    return jsonResponse({ error: 'Request origin could not be verified.' }, 403);
  }

  if (!request.headers.get('content-type')?.includes('application/json')) {
    return jsonResponse({ error: 'Expected a JSON contact inquiry.' }, 415);
  }

  const contentLength = Number(request.headers.get('content-length') ?? 0);
  if (contentLength > 16_384) {
    return jsonResponse({ error: 'Contact inquiry is too large.' }, 413);
  }

  let rawBody: string;
  try {
    rawBody = await request.text();
  } catch {
    return jsonResponse({ error: 'Contact inquiry is invalid.' }, 400);
  }
  if (new TextEncoder().encode(rawBody).byteLength > 16_384) {
    return jsonResponse({ error: 'Contact inquiry is too large.' }, 413);
  }

  let body: unknown;
  try {
    body = JSON.parse(rawBody);
  } catch {
    return jsonResponse({ error: 'Contact inquiry is invalid.' }, 400);
  }

  const validation = contactSchema.safeParse(body);
  if (!validation.success) {
    const fieldErrors = validation.error.flatten().fieldErrors;
    return jsonResponse(
      {
        error: 'Please correct the highlighted contact details.',
        details: fieldErrors,
      },
      400,
    );
  }

  const inquiry = validation.data;
  if (inquiry.website?.trim()) {
    return jsonResponse(
      { error: 'Contact inquiry could not be verified.' },
      400,
    );
  }

  const { website: _website, ...persistedInquiry } = inquiry;

  let cmsEntryId: string;
  try {
    cmsEntryId = await persistContactInquiry({
      ...persistedInquiry,
      email: persistedInquiry.email.toLowerCase(),
    });
  } catch (error) {
    console.error('Unable to persist contact inquiry in CMS:', error);
    return jsonResponse(
      {
        error: 'Database write failed. Your inquiry was not submitted.',
        code: 'CMS_WRITE_FAILED',
      },
      500,
    );
  }

  try {
    const emailId = await sendContactConfirmation({
      ...persistedInquiry,
      email: persistedInquiry.email.toLowerCase(),
    });

    return jsonResponse(
      {
        message: 'Your inquiry was received and a confirmation email was sent.',
        cmsEntryId,
        email: { sent: true, id: emailId },
      },
      201,
    );
  } catch (error) {
    console.error('Contact confirmation email failed after CMS persistence:', error);
    return jsonResponse(
      {
        message:
          'Your inquiry was saved, but the confirmation email could not be sent.',
        cmsEntryId,
        email: { sent: false },
      },
      207,
    );
  }
}
