import 'server-only';

type ContactInquiry = {
  name?: string;
  email: string;
  subject?: string;
  message: string;
  company?: string;
  phone?: string;
  service?: string;
};

type CmsCreateResponse = {
  data?: {
    id?: number | string;
    documentId?: string;
  };
};

export async function persistContactInquiry(inquiry: ContactInquiry) {
  const configuredUrl = process.env.CMS_API_URL?.trim();
  const strapiUrl = (process.env.STRAPI_URL?.trim() || 'http://localhost:1337')
    .replace(/\/+$/, '');
  const endpoint = configuredUrl || `${strapiUrl}/api/user-queries`;
  const token =
    process.env.CMS_API_TOKEN?.trim() || process.env.CMS_API_KEY?.trim();

  if (!token) {
    throw new Error(
      'CMS_API_TOKEN (or CMS_API_KEY) must be configured with create permission for Contact Inquiry.',
    );
  }

  let url: URL;
  try {
    url = new URL(endpoint);
  } catch {
    throw new Error('CMS_API_URL must be a valid absolute URL.');
  }

  if (url.protocol !== 'http:' && url.protocol !== 'https:') {
    throw new Error('CMS_API_URL must use HTTP or HTTPS.');
  }

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({ data: inquiry }),
    cache: 'no-store',
    signal: AbortSignal.timeout(15_000),
  });

  const result = (await response.json().catch(() => null)) as
    | CmsCreateResponse
    | null;
  if (!response.ok) {
    throw new Error(`CMS rejected contact inquiry with status ${response.status}.`);
  }

  const id = result?.data?.documentId ?? result?.data?.id;
  if (typeof id !== 'string' && typeof id !== 'number') {
    throw new Error('CMS created the inquiry without returning an entry ID.');
  }

  return String(id);
}
