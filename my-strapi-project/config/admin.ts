import type { Core } from '@strapi/strapi';

const config = ({ env }: Core.Config.Shared.ConfigParams): Core.Config.Admin => {
  const previewSecret = env('PREVIEW_SECRET');
  const previewUrl = env('PREVIEW_URL', 'http://localhost:3333').replace(
    /\/+$/,
    '',
  );
  const allowedOrigins = env(
    'PREVIEW_ALLOWED_ORIGINS',
    'http://localhost:3333,http://127.0.0.1:3333',
  )
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);

  return {
    auth: {
      secret: env('ADMIN_JWT_SECRET')!,
    },
    apiToken: {
      salt: env('API_TOKEN_SALT')!,
    },
    transfer: {
      token: {
        salt: env('TRANSFER_TOKEN_SALT')!,
      },
    },
    secrets: {
      encryptionKey: env('ENCRYPTION_KEY')!,
    },
    flags: {
      nps: env.bool('FLAG_NPS', true),
      promoteEE: env.bool('FLAG_PROMOTE_EE', true),
      docLinks: env.bool('FLAG_DOC_LINKS', true),
    },
    preview: {
      enabled: true,
      config: {
        allowedOrigins,
        async handler(uid, { documentId }) {
          if (!previewSecret) return null;

          let type: 'insights' | 'careers';
          let slug: string | undefined;

          if (uid === 'api::insight.insight') {
            const insight = await strapi
              .documents('api::insight.insight')
              .findOne({ documentId });
            type = 'insights';
            slug = insight?.slug ?? undefined;
          } else if (uid === 'api::career.career') {
            const career = await strapi
              .documents('api::career.career')
              .findOne({ documentId });
            type = 'careers';
            slug = documentId;
          } else {
            return null;
          }

          if (type === 'insights' && !slug) return null;

          const query = new URLSearchParams({
            secret: previewSecret,
            type,
            slug: slug ?? documentId,
          });
          return `${previewUrl}/api/draft?${query.toString()}`;
        },
      },
    },
  };
};

export default config;
