import 'server-only';

import mailchimp from '@mailchimp/mailchimp_marketing';

export const runtime = 'nodejs';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type NewsletterRequest = {
  email?: unknown;
  consent?: unknown;
  website?: unknown;
};

type MailchimpApiError = {
  status?: number;
  response?: {
    status?: number;
    body?: {
      title?: string;
    };
  };
};

function jsonResponse(body: object, status = 200) {
  return Response.json(body, {
    status,
    headers: { 'Cache-Control': 'no-store' },
  });
}

function getErrorDetails(error: unknown): MailchimpApiError {
  if (typeof error !== 'object' || error === null) return {};

  const candidate = error as MailchimpApiError;
  return {
    status: candidate.status ?? candidate.response?.status,
    response: candidate.response,
  };
}

export async function POST(request: Request) {
  const requestOrigin = request.headers.get('origin');
  if (!requestOrigin) {
    return jsonResponse({ error: 'Request origin could not be verified.' }, 403);
  }

  try {
    if (new URL(requestOrigin).origin !== new URL(request.url).origin) {
      return jsonResponse({ error: 'Request origin could not be verified.' }, 403);
    }
  } catch {
    return jsonResponse({ error: 'Request origin could not be verified.' }, 403);
  }

  if (!request.headers.get('content-type')?.includes('application/json')) {
    return jsonResponse({ error: 'Expected a JSON newsletter signup.' }, 415);
  }

  const contentLength = Number(request.headers.get('content-length') ?? 0);
  if (contentLength > 4096) {
    return jsonResponse({ error: 'Newsletter signup request is too large.' }, 413);
  }

  let requestBody: unknown;
  try {
    requestBody = await request.json();
  } catch {
    return jsonResponse({ error: 'Newsletter signup request is invalid.' }, 400);
  }

  if (
    typeof requestBody !== 'object' ||
    requestBody === null ||
    Array.isArray(requestBody)
  ) {
    return jsonResponse({ error: 'Newsletter signup request is invalid.' }, 400);
  }

  const payload = requestBody as NewsletterRequest;
  const email =
    typeof payload.email === 'string' ? payload.email.trim().toLowerCase() : '';

  if (!email || email.length > 254 || !emailPattern.test(email)) {
    return jsonResponse({ error: 'Enter a valid email address.' }, 400);
  }

  if (payload.consent !== true) {
    return jsonResponse(
      { error: 'Please agree to receive newsletter emails before subscribing.' },
      400,
    );
  }

  if (typeof payload.website !== 'string') {
    return jsonResponse({ error: 'Newsletter signup request is invalid.' }, 400);
  }

  if (payload.website.trim()) {
    return jsonResponse({ error: 'Newsletter signup could not be verified.' }, 400);
  }

  const apiKey = process.env.MAILCHIMP_API_KEY?.trim();
  const serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX?.trim();
  const audienceId = process.env.MAILCHIMP_AUDIENCE_ID?.trim();

  if (!apiKey || !serverPrefix || !audienceId) {
    console.error('Mailchimp newsletter API is not fully configured.');
    return jsonResponse(
      { error: 'Newsletter signup is temporarily unavailable.' },
      503,
    );
  }

  if (!/^[a-z0-9]+$/i.test(serverPrefix)) {
    console.error('Mailchimp server prefix configuration is invalid.');
    return jsonResponse(
      { error: 'Newsletter signup is temporarily unavailable.' },
      503,
    );
  }

  mailchimp.setConfig({ apiKey, server: serverPrefix });

  try {
    await mailchimp.lists.addListMember(audienceId, {
      email_address: email,
      status: 'pending',
    });

    return jsonResponse({
      message: 'Please check your email to confirm your subscription.',
    });
  } catch (error: unknown) {
    const details = getErrorDetails(error);
    if (
      details.status === 400 &&
      details.response?.body?.title === 'Member Exists'
    ) {
      return jsonResponse(
        { error: 'This email is already subscribed or awaiting confirmation.' },
        409,
      );
    }

    console.error('Mailchimp newsletter signup failed.', {
      status: details.status,
    });
    return jsonResponse(
      { error: 'We could not complete your signup. Please try again later.' },
      502,
    );
  }
}
