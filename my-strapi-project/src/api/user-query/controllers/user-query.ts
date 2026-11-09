import { factories } from '@strapi/strapi';
import type { Context } from 'koa';

type InquiryData = {
  name?: string;
  email: string;
  subject?: string;
  message: string;
  company?: string;
  phone?: string;
  service?: string;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function optionalText(
  value: unknown,
  fieldName: string,
  maxLength: number,
): string | undefined {
  if (value === undefined || value === null || value === '') return undefined;
  if (typeof value !== 'string' || value.trim().length > maxLength) {
    throw new Error(`${fieldName} must be a string of at most ${maxLength} characters.`);
  }
  const trimmed = value.trim();
  return trimmed || undefined;
}

function parseInquiry(ctx: Context): InquiryData {
  const body = isRecord(ctx.request.body) ? ctx.request.body : {};
  if (!isRecord(body.data)) {
    return ctx.throw(400, 'A contact inquiry data object is required.');
  }

  const data = body.data;
  const email = typeof data.email === 'string' ? data.email.trim().toLowerCase() : '';
  const message = typeof data.message === 'string' ? data.message.trim() : '';
  if (
    email.length > 254 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    !message ||
    message.length > 10_000
  ) {
    return ctx.throw(400, 'A valid email and message are required.');
  }

  try {
    return {
      name: optionalText(data.name, 'Name', 150),
      email,
      subject: optionalText(data.subject, 'Subject', 200),
      message,
      company: optionalText(data.company, 'Company', 200),
      phone: optionalText(data.phone, 'Phone', 40),
      service: optionalText(data.service, 'Service', 120),
    };
  } catch (error) {
    return ctx.throw(
      400,
      error instanceof Error ? error.message : 'Contact inquiry is invalid.',
    );
  }
}

export default factories.createCoreController(
  'api::user-query.user-query',
  ({ strapi }) => ({
    async create(ctx) {
      const data = parseInquiry(ctx);
      const inquiry = await strapi
        .documents('api::user-query.user-query')
        .create({ data });

      ctx.status = 201;
      ctx.body = {
        data: {
          id: inquiry.id,
          documentId: inquiry.documentId,
        },
      };
    },
  }),
);
