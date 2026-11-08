import type { NextConfig } from 'next';

const isProduction = process.env.NODE_ENV === 'production';
const mailchimpFormOrigin = (() => {
  const configuredUrl = process.env.NEXT_PUBLIC_MAILCHIMP_SIGNUP_FORM_URL?.trim();
  if (!configuredUrl) return null;

  try {
    const url = new URL(configuredUrl);
    if (
      url.protocol === 'https:' &&
      /^[a-z0-9-]+\.list-manage\.com$/i.test(url.hostname)
    ) {
      return `https://gmail.${url.hostname}`;
    }
  } catch {
    return null;
  }

  return null;
})();
const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline' https://www.googletagmanager.com${isProduction ? '' : " 'unsafe-eval'"}`,
  "style-src 'self' 'unsafe-inline'",
  `img-src 'self' blob: data: https:${isProduction ? '' : ' http://localhost:1337 http://127.0.0.1:1337'}`,
  "font-src 'self' data:",
  `connect-src 'self' https:${isProduction ? '' : ' http://localhost:1337 http://127.0.0.1:1337 ws://localhost:* ws://127.0.0.1:*'}`,
  "object-src 'none'",
  "base-uri 'self'",
  `form-action 'self'${mailchimpFormOrigin ? ` ${mailchimpFormOrigin}` : ''}`,
  `frame-ancestors ${isProduction ? "'none'" : "'self' http://localhost:1337 http://127.0.0.1:1337"}`,
  ...(isProduction ? ['upgrade-insecure-requests'] : []),
].join('; ');

const securityHeaders = [
  { key: 'Content-Security-Policy', value: contentSecurityPolicy },
  ...(isProduction ? [{ key: 'X-Frame-Options', value: 'DENY' }] : []),
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()',
  },
  ...(isProduction
    ? [{ key: 'Strict-Transport-Security', value: 'max-age=31536000' }]
    : []),
];

const nextConfig: NextConfig = {
  distDir: process.env.NEXT_DIST_DIR || '.next',
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
