import 'server-only';

export const runtime = 'nodejs';

const servicePillars = new Set([
  'Strategy, People & Digital',
  'Financial & Tax Advisory',
  'Sustainability & ESG',
  'Creative & Communications',
]);

type ContactRequest = {
  name?: unknown;
  email?: unknown;
  company?: unknown;
  phone?: unknown;
  service?: unknown;
  message?: unknown;
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
    return jsonResponse({ error: 'Expected a JSON contact inquiry.' }, 415);
  }

  const contentLength = Number(request.headers.get('content-length') ?? 0);
  if (contentLength > 16_384) {
    return jsonResponse({ error: 'Contact inquiry is too large.' }, 413);
  }

  let requestBody: unknown;
  try {
    requestBody = await request.json();
  } catch {
    return jsonResponse({ error: 'Contact inquiry is invalid.' }, 400);
  }

  if (!isRecord(requestBody)) {
    return jsonResponse({ error: 'Contact inquiry is invalid.' }, 400);
  }

  const payload = requestBody as ContactRequest;
  const name = readString(payload.name);
  const email = readString(payload.email).toLowerCase();
  const company = readString(payload.company);
  const phone = readString(payload.phone);
  const service = readString(payload.service);
  const message = readString(payload.message);
  const website = readString(payload.website);

  if (website) {
    return jsonResponse({ error: 'Contact inquiry could not be verified.' }, 400);
  }

  if (!name || name.length > 150) {
    return jsonResponse({ error: 'Enter your name.' }, 400);
  }

  if (
    !email ||
    email.length > 254 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  ) {
    return jsonResponse({ error: 'Enter a valid email address.' }, 400);
  }

  if (company.length > 200 || phone.length > 40) {
    return jsonResponse(
      { error: 'Company or phone details exceed the allowed length.' },
      400,
    );
  }

  if (service && !servicePillars.has(service)) {
    return jsonResponse({ error: 'Select a valid service pillar.' }, 400);
  }

  if (!message || message.length > 10_000) {
    return jsonResponse(
      { error: 'Enter a message under 10,000 characters.' },
      400,
    );
  }

  const configuredEndpoint =
    process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT?.trim() ||
    'https://formspree.io/f/xljjlvzv';
  let endpoint: URL;
  try {
    endpoint = new URL(configuredEndpoint);
    if (
      endpoint.protocol !== 'https:' ||
      endpoint.hostname !== 'formspree.io' ||
      !/^\/f\/[a-z0-9]+$/i.test(endpoint.pathname)
    ) {
      throw new Error('Formspree endpoint must be a valid HTTPS form URL.');
    }
  } catch (error) {
    console.error('Contact inquiry service configuration is invalid:', error);
    return jsonResponse(
      { error: 'Contact inquiries are temporarily unavailable.' },
      503,
    );
  }

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        company,
        phone,
        service,
        message,
        _subject: `Kelari Group inquiry${service ? `: ${service}` : ''}`,
      }),
      cache: 'no-store',
      signal: AbortSignal.timeout(15_000),
    });

    if (!response.ok) {
      console.error('Formspree contact inquiry failed.', {
        status: response.status,
      });
      return jsonResponse(
        { error: 'Your inquiry could not be sent. Please try again later.' },
        502,
      );
    }

    return jsonResponse({ message: 'Your inquiry has been sent.' });
  } catch (error) {
    console.error('Unable to reach the contact inquiry service:', error);
    return jsonResponse(
      { error: 'Contact inquiries are temporarily unavailable.' },
      502,
    );
  }
}
