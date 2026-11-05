import { factories } from '@strapi/strapi';
import type { Context } from 'koa';

type MultipartFile = {
  name?: string;
  originalFilename?: string | null;
  filepath?: string;
  type?: string;
  mimetype?: string | null;
  size?: number;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function parseApplicationData(value: unknown): Record<string, unknown> {
  let parsed = value;
  if (typeof value === 'string') {
    try {
      parsed = JSON.parse(value);
    } catch {
      throw new Error('Application data must be valid JSON.');
    }
  }

  if (!isRecord(parsed)) {
    throw new Error('Application data must be a JSON object.');
  }

  return parsed;
}

function trimString(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

function normalizeTags(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value
    .filter((tag): tag is string => typeof tag === 'string')
    .map((tag) => tag.trim());
}

function getResume(ctx: Context): MultipartFile {
  const request = ctx.request as typeof ctx.request & { files?: unknown };
  const uploadedFiles = isRecord(request.files) ? request.files : {};
  const fileFields = isRecord(uploadedFiles.files)
    ? uploadedFiles.files
    : undefined;
  const rawResume = fileFields?.resume ?? uploadedFiles['files.resume'];
  const resume = Array.isArray(rawResume) ? rawResume[0] : rawResume;

  if (!isRecord(resume)) {
    return ctx.throw(400, 'A resume file is required.');
  }

  return resume;
}

export default factories.createCoreController(
  'api::application-submission.application-submission',
  ({ strapi }) => ({
    async create(ctx) {
      const requestBody = isRecord(ctx.request.body) ? ctx.request.body : {};
      let data: Record<string, unknown>;
      try {
        data = parseApplicationData(requestBody.data);
      } catch (error) {
        return ctx.throw(
          400,
          error instanceof Error ? error.message : 'Invalid application data.',
        );
      }

      const resume = getResume(ctx);
      const filename = resume.originalFilename ?? resume.name;
      if (!filename) {
        return ctx.throw(400, 'The uploaded resume has no file name.');
      }

      const {
        firstName,
        lastName,
        email,
        phone,
        dateOfBirth,
        nationality,
        schoolAttended,
        courseOfStudy,
        lastCompany,
        yearsOfExperience,
        lastPosition,
        minimumRemuneration,
        skills,
        certifications,
        coverNote,
      } = data;
      const requiredTextFields: Array<[unknown, number]> = [
        [firstName, 120],
        [lastName, 120],
        [nationality, 120],
        [courseOfStudy, 200],
        [lastCompany, 200],
        [yearsOfExperience, 80],
        [lastPosition, 160],
        [minimumRemuneration, 120],
        [coverNote, 5000],
      ];
      const invalidText = requiredTextFields.some(
        ([value, maxLength]) =>
          typeof value !== 'string' ||
          !value.trim() ||
          value.length > maxLength,
      );
      const validTagList = (value: unknown) =>
        value === undefined ||
        (Array.isArray(value) &&
          value.length <= 50 &&
          value.every(
            (tag) =>
              typeof tag === 'string' &&
              tag.trim().length > 0 &&
              tag.length <= 100,
          ));
      const birthDate =
        typeof dateOfBirth === 'string' ? new Date(`${dateOfBirth}T00:00:00Z`) : null;
      if (
        invalidText ||
        typeof email !== 'string' ||
        email.length > 254 ||
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) ||
        typeof phone !== 'string' ||
        !phone.trim() ||
        phone.length > 40 ||
        typeof dateOfBirth !== 'string' ||
        !/^\d{4}-\d{2}-\d{2}$/.test(dateOfBirth) ||
        !birthDate ||
        Number.isNaN(birthDate.getTime()) ||
        birthDate.toISOString().slice(0, 10) !== dateOfBirth ||
        birthDate.getTime() >= Date.now() ||
        (schoolAttended !== undefined &&
          schoolAttended !== null &&
          (typeof schoolAttended !== 'string' ||
            schoolAttended.length > 200)) ||
        !validTagList(skills) ||
        !validTagList(certifications) ||
        data.privacyConsent !== true
      ) {
        return ctx.throw(
          400,
          'Check the required application fields, date of birth, and tag values.',
        );
      }

      const jobPosition = isRecord(data.jobPosition)
        ? data.jobPosition
        : undefined;
      const connections = Array.isArray(jobPosition?.connect)
        ? jobPosition.connect
        : [];
      const connectedJob = isRecord(connections[0]) ? connections[0] : undefined;
      const jobDocumentId = connectedJob?.documentId;
      if (typeof jobDocumentId !== 'string' || !jobDocumentId.trim()) {
        return ctx.throw(400, 'Select a valid career opening.');
      }

      const career = await strapi
        .documents('api::career.career')
        .findOne({ documentId: jobDocumentId });
      if (!career) {
        return ctx.throw(
          400,
          'The selected career opening is no longer available.',
        );
      }

      const uploadedFiles = await strapi
        .plugin('upload')
        .service('upload')
        .upload({
          data: { fileInfo: { name: filename } },
          files: resume,
        });
      const uploadedResume = uploadedFiles[0];
      if (!uploadedResume) {
        return ctx.throw(500, 'The resume could not be stored.');
      }

      requestBody.data = {
        firstName: trimString(firstName),
        lastName: trimString(lastName),
        email: email.trim(),
        phone: phone.trim(),
        dateOfBirth,
        nationality: trimString(nationality),
        schoolAttended:
          typeof schoolAttended === 'string' ? schoolAttended.trim() : null,
        courseOfStudy: trimString(courseOfStudy),
        lastCompany: trimString(lastCompany),
        yearsOfExperience: trimString(yearsOfExperience),
        lastPosition: trimString(lastPosition),
        minimumRemuneration: trimString(minimumRemuneration),
        skills: normalizeTags(skills),
        certifications: normalizeTags(certifications),
        coverNote: trimString(coverNote),
        privacyConsent: true,
        jobPosition: {
          connect: [{ documentId: jobDocumentId }],
        },
        resume: uploadedResume.id,
      };

      return super.create(ctx);
    },
  }),
);
