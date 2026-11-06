import 'server-only';

export const runtime = 'nodejs';

function jsonResponse(body: object, status = 200) {
  return Response.json(body, {
    status,
    headers: { 'Cache-Control': 'no-store' },
  });
}

export async function POST(request: Request) {
  const requestOrigin = request.headers.get('origin');
  if (!requestOrigin) {
    return jsonResponse(
      { error: { message: 'Request origin could not be verified.' } },
      403,
    );
  }

  try {
    if (new URL(requestOrigin).origin !== new URL(request.url).origin) {
      return jsonResponse(
        { error: { message: 'Request origin could not be verified.' } },
        403,
      );
    }
  } catch {
    return jsonResponse(
      { error: { message: 'Request origin could not be verified.' } },
      403,
    );
  }

  if (!request.headers.get('content-type')?.includes('multipart/form-data')) {
    return jsonResponse(
      { error: { message: 'Expected a multipart application.' } },
      415,
    );
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return jsonResponse(
      { error: { message: 'Application form data is invalid.' } },
      400,
    );
  }

  const strapiUrl = (
    process.env.STRAPI_URL?.trim() || 'http://localhost:1337'
  ).replace(/\/+$/, '');
  let endpoint: URL;
  try {
    endpoint = new URL(`${strapiUrl}/api/application-submissions`);
    if (endpoint.protocol !== 'http:' && endpoint.protocol !== 'https:') {
      throw new Error('Strapi URL must use HTTP or HTTPS.');
    }
  } catch (error) {
    console.error('Invalid STRAPI_URL configuration:', error);
    return jsonResponse(
      { error: { message: 'Application service is not configured.' } },
      503,
    );
  }

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      body: formData,
      signal: AbortSignal.timeout(30_000),
      cache: 'no-store',
    });

    return new Response(response.body, {
      status: response.status,
      headers: {
        'Cache-Control': 'no-store',
        'Content-Type':
          response.headers.get('content-type') ?? 'application/json',
      },
    });
  } catch (error) {
    console.error('Unable to reach Strapi application service:', error);
    return jsonResponse(
      { error: { message: 'Application service is unavailable.' } },
      502,
    );
  }
}
