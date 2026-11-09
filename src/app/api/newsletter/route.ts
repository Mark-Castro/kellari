import 'server-only';

export const runtime = 'nodejs';

type NewsletterRequest = {
  email?: unknown;
  website?: unknown;
};

function jsonResponse(body: object, status = 200) {
  return Response.json(body, {
    status,
    headers: { 'Cache-Control': 'no-store' },
  });
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function readString(value: unknown) {
  return typeof value === 'string' ? value.trim() : '';
}

export async function POST(request: Request) {
  const requestOrigin = request.headers.get('origin');
  if (!requestOrigin) {
    return jsonResponse({ error: 'Request origin could not be verified.' }, 403);
  }

  try {
    if (new URL(requestOrigin).origin !== new URL(request.url).origin) {
      return jsonResponse(
        { error: 'Request origin could not be verified.' },
        403,
      );
    }
  } catch {
    return jsonResponse({ error: 'Request origin could not be verified.' }, 403);
  }

  if (!request.headers.get('content-type')?.includes('application/json')) {
    return jsonResponse({ error: 'Expected a JSON subscription request.' }, 415);
  }

  const contentLength = Number(request.headers.get('content-length') ?? 0);
  if (contentLength > 4096) {
    return jsonResponse({ error: 'Subscription request is too large.' }, 413);
  }

  let requestBody: unknown;
  try {
    requestBody = await request.json();
  } catch {
    return jsonResponse({ error: 'Subscription request is invalid.' }, 400);
  }

  if (!isRecord(requestBody)) {
    return jsonResponse({ error: 'Subscription request is invalid.' }, 400);
  }

  const payload = requestBody as NewsletterRequest;
  const email = readString(payload.email).toLowerCase();
  const website = readString(payload.website);

  if (website) {
    return jsonResponse({ error: 'Subscription request could not be verified.' }, 400);
  }

  if (
    !email ||
    email.length > 254 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  ) {
    return jsonResponse({ error: 'Enter a valid email address.' }, 400);
  }

  const apiKey = process.env.MAILCHIMP_API_KEY?.trim();
  const serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX?.trim();
  const audienceId = process.env.MAILCHIMP_AUDIENCE_ID?.trim();

  if (
    !apiKey ||
    !serverPrefix ||
    !/^[a-z0-9]+$/i.test(serverPrefix) ||
    !audienceId ||
    !/^[a-z0-9_-]+$/i.test(audienceId)
  ) {
    console.error('Newsletter subscription service configuration is incomplete or invalid.');
    return jsonResponse(
      { error: 'Newsletter signup is temporarily unavailable.' },
      503,
    );
  }

  const endpoint = `https://${serverPrefix}.api.mailchimp.com/3.0/lists/${encodeURIComponent(audienceId)}/members`;

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${Buffer.from(`any:${apiKey}`).toString('base64')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email_address: email,
        status: 'pending',
      }),
      cache: 'no-store',
      signal: AbortSignal.timeout(15_000),
    });

    let responseBody: unknown;
    try {
      responseBody = await response.json();
    } catch (error) {
      console.error('Mailchimp returned an invalid newsletter response.', {
        status: response.status,
        error,
      });
      return jsonResponse(
        { error: 'Newsletter signup is temporarily unavailable.' },
        502,
      );
    }

    if (!response.ok) {
      if (
        response.status === 400 &&
        isRecord(responseBody) &&
        responseBody.title === 'Member Exists'
      ) {
        return jsonResponse({
          message:
            'If this address can be subscribed, a confirmation email will be sent.',
        });
      }

      console.error('Mailchimp newsletter subscription failed.', {
        status: response.status,
        title: isRecord(responseBody) ? responseBody.title : undefined,
      });
      return jsonResponse(
        { error: 'Your subscription could not be submitted. Please try again later.' },
        502,
      );
    }

    return jsonResponse({
      message:
        'Thanks for subscribing. If this address can be subscribed, a confirmation email will be sent.',
    });
  } catch (error) {
    console.error('Unable to reach the Mailchimp newsletter service:', error);
    return jsonResponse(
      { error: 'Newsletter signup is temporarily unavailable.' },
      502,
    );
  }
}
