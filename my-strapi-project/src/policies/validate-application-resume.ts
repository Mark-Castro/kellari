import type { ExtendableContext } from 'koa';

type UploadedFile = {
  name?: string;
  originalFilename?: string | null;
  type?: string;
  mimetype?: string | null;
  size?: number;
};

type UploadRequest = ExtendableContext['request'] & {
  files?: unknown;
  body?: unknown;
};

type ApplicationRequestContext = Omit<ExtendableContext, 'request'> & {
  request: UploadRequest;
};

const maxResumeSize = 10 * 1024 * 1024;
const allowedResumeTypes: Record<string, string[]> = {
  pdf: ['application/pdf'],
  doc: ['application/msword'],
  docx: [
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ],
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

export default function validateApplicationResume(
  ctx: ApplicationRequestContext,
) {
  const uploadedFiles = isRecord(ctx.request.files) ? ctx.request.files : {};
  const fileFields = isRecord(uploadedFiles.files)
    ? uploadedFiles.files
    : undefined;
  const rawResume = fileFields?.resume ?? uploadedFiles['files.resume'];
  const resume = Array.isArray(rawResume) ? rawResume[0] : rawResume;

  if (!isRecord(resume)) {
    ctx.throw(400, 'A resume file is required.');
  }

  const file = resume as UploadedFile;
  const filename = file.originalFilename ?? file.name ?? '';
  const extension = filename.split('.').pop()?.toLowerCase() ?? '';
  const mimeType = file.mimetype ?? file.type ?? '';
  const allowedMimeTypes = allowedResumeTypes[extension];

  if (!allowedMimeTypes || (mimeType && !allowedMimeTypes.includes(mimeType))) {
    ctx.throw(400, 'Resume must be a PDF, DOC, or DOCX file.');
  }

  if (typeof file.size !== 'number' || file.size <= 0) {
    ctx.throw(400, 'The uploaded resume is empty or invalid.');
  }

  if (file.size > maxResumeSize) {
    ctx.throw(413, 'Resume must be 10 MB or smaller.');
  }

  const body = isRecord(ctx.request.body) ? ctx.request.body : {};
  const serializedData = body.data;
  let applicationData: unknown;
  if (typeof serializedData === 'string') {
    try {
      applicationData = JSON.parse(serializedData);
    } catch {
      ctx.throw(400, 'Application data must be valid JSON.');
    }
  } else {
    applicationData = serializedData;
  }

  if (!isRecord(applicationData) || applicationData.privacyConsent !== true) {
    ctx.throw(400, 'Privacy consent is required to submit an application.');
  }

  return true;
}
