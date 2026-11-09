import 'server-only';
import { Resend } from 'resend';

type ContactInquiry = {
  name?: string;
  email: string;
  subject?: string;
  message: string;
  company?: string;
  phone?: string;
  service?: string;
};

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
    };
    return entities[character];
  });
}

function getSender() {
  const configuredSender = process.env.RESEND_FROM_EMAIL?.trim();
  if (configuredSender) return configuredSender;

  if (process.env.NODE_ENV !== 'production') {
    return 'onboarding@resend.dev';
  }

  throw new Error('RESEND_FROM_EMAIL must be configured in production.');
}

export async function sendContactConfirmation(inquiry: ContactInquiry) {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    throw new Error('RESEND_API_KEY is not configured.');
  }

  const subject = inquiry.subject?.trim() || 'Contact inquiry';
  const name = inquiry.name?.trim() || 'there';
  const fields = [
    ...(inquiry.name ? [['Name', inquiry.name] as const] : []),
    ['Email', inquiry.email] as const,
    ...(inquiry.company ? [['Company', inquiry.company] as const] : []),
    ...(inquiry.phone ? [['Phone', inquiry.phone] as const] : []),
    ...(inquiry.service ? [['Service', inquiry.service] as const] : []),
  ];
  const htmlRows = fields
    .map(
      ([label, value]) =>
        `<tr><th align="left" style="padding:10px 12px;color:#475569;border-bottom:1px solid #e2e8f0">${escapeHtml(label)}</th><td style="padding:10px 12px;color:#0f172a;border-bottom:1px solid #e2e8f0">${escapeHtml(value)}</td></tr>`,
    )
    .join('');
  const message = escapeHtml(inquiry.message).replace(/\r?\n/g, '<br>');

  const resend = new Resend(apiKey);
  const { data, error } = await resend.emails.send({
    from: getSender(),
    to: inquiry.email,
    subject: `We received your inquiry: ${subject}`,
    html: `<div style="margin:0;background:#f8fafc;padding:32px 16px;font-family:Arial,sans-serif;color:#0f172a"><div style="max-width:600px;margin:0 auto;border:1px solid #e2e8f0;border-radius:16px;background:#fff;padding:32px"><p style="margin:0;color:#047857;font-size:12px;font-weight:700;letter-spacing:2px">KELARI GROUP LLC</p><h1 style="margin:18px 0 8px;font-size:24px">Thank you, ${escapeHtml(name)}</h1><p style="margin:0 0 24px;color:#475569;line-height:1.6">We received your inquiry and our team will be in touch.</p><h2 style="margin:0 0 12px;font-size:16px">${escapeHtml(subject)}</h2><table style="width:100%;border-collapse:collapse">${htmlRows}</table><div style="margin-top:20px;border-radius:10px;background:#f8fafc;padding:16px;color:#334155;line-height:1.6">${message}</div></div></div>`,
    text: [
      `Thank you, ${name}. We received your inquiry.`,
      `Subject: ${subject}`,
      ...fields.map(([label, value]) => `${label}: ${value}`),
      '',
      inquiry.message,
    ].join('\n'),
  });

  if (error) {
    throw new Error(error.message);
  }

  if (!data?.id) {
    throw new Error('Resend did not return a message ID.');
  }

  return data.id;
}
