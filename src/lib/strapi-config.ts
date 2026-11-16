const localStrapiUrl = 'http://localhost:1337';
const vercelStrapiUrl = 'https://8whmlgwn-1337.eun1.devtunnels.ms';

export function getStrapiBaseUrl(): string {
  const configuredUrl = process.env.STRAPI_URL?.trim();
  const defaultUrl =
    process.env.VERCEL === '1' ? vercelStrapiUrl : localStrapiUrl;
  const baseUrl = (configuredUrl || defaultUrl)
    .replace(/\/+$/, '')
    .replace(/\/api$/i, '');

  let parsedUrl: URL;
  try {
    parsedUrl = new URL(baseUrl);
  } catch {
    throw new Error('STRAPI_URL must be a valid absolute URL.');
  }

  if (parsedUrl.protocol !== 'http:' && parsedUrl.protocol !== 'https:') {
    throw new Error('STRAPI_URL must use HTTP or HTTPS.');
  }

  return baseUrl;
}

export function getStrapiApiUrl(path: string): URL {
  const normalizedPath = path.replace(/^\/+/, '');
  return new URL(`${getStrapiBaseUrl()}/api/${normalizedPath}`);
}
