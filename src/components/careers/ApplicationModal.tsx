'use client';

import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type DragEvent,
  type FormEvent,
} from 'react';
import { useRouter } from 'next/navigation';

const resumeLimit = 10 * 1024 * 1024;
const acceptedResumeTypes: Record<string, string[]> = {
  pdf: ['application/pdf'],
  doc: ['application/msword'],
  docx: [
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ],
};

type ApplicationValues = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  nationality: string;
  schoolAttended: string;
  courseOfStudy: string;
  lastCompany: string;
  yearsOfExperience: string;
  lastPosition: string;
  minimumRemuneration: string;
  skills: string;
  certifications: string;
  coverNote: string;
  privacyConsent: boolean;
};

type ApplicationModalProps = {
  jobPositionId: string;
  jobTitle: string;
  targetDepartment?: string;
  openOnMount?: boolean;
};

const initialValues: ApplicationValues = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  dateOfBirth: '',
  nationality: '',
  schoolAttended: '',
  courseOfStudy: '',
  lastCompany: '',
  yearsOfExperience: '',
  lastPosition: '',
  minimumRemuneration: '',
  skills: '',
  certifications: '',
  coverNote: '',
  privacyConsent: false,
};

const stepFields: Record<number, Array<keyof ApplicationValues>> = {
  1: ['firstName', 'lastName', 'email', 'phone', 'dateOfBirth', 'nationality'],
  2: [
    'courseOfStudy',
    'lastCompany',
    'yearsOfExperience',
    'lastPosition',
    'minimumRemuneration',
  ],
};

const stepHeadings = [
  'Personal details',
  'Experience & education',
  'Resume & extras',
];

function parseTags(value: string): string[] {
  return [...new Set(value.split(',').map((tag) => tag.trim()).filter(Boolean))];
}

function validateTags(value: string): boolean {
  const tags = parseTags(value);
  return tags.length <= 50 && tags.every((tag) => tag.length <= 100);
}

function getResumeError(file: File): string | null {
  const extension = file.name.split('.').pop()?.toLowerCase() ?? '';
  const allowedTypes = acceptedResumeTypes[extension];

  if (!allowedTypes) return 'Upload a PDF, DOC, or DOCX file.';
  if (file.type && !allowedTypes.includes(file.type)) {
    return 'The file type does not match the file extension.';
  }
  if (!file.size) return 'The selected resume is empty.';
  if (file.size > resumeLimit) return 'Resume must be 10 MB or smaller.';
  return null;
}

function formatFileSize(size: number): string {
  return `${(size / (1024 * 1024)).toFixed(2)} MB`;
}

export default function ApplicationModal({
  jobPositionId,
  jobTitle,
  targetDepartment,
  openOnMount = false,
}: ApplicationModalProps) {
  const router = useRouter();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const resumeInputRef = useRef<HTMLInputElement>(null);
  const [step, setStep] = useState(1);
  const [values, setValues] = useState<ApplicationValues>(initialValues);
  const [resume, setResume] = useState<File | null>(null);
  const [resumeError, setResumeError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isOpen, setIsOpen] = useState(openOnMount);
  const formId = `application-${jobPositionId}`;
  const progress = [33, 66, 100][step - 1];

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || !isOpen || dialog.open) return;

    dialog.showModal();
    dialog.querySelector<HTMLElement>('[autofocus]')?.focus();
  }, [isOpen]);

  function resetForm() {
    setStep(1);
    setValues(initialValues);
    setResume(null);
    setResumeError(null);
    setErrorMessage(null);
    setIsSuccess(false);
    setIsDragging(false);
    if (resumeInputRef.current) resumeInputRef.current.value = '';
  }

  function handleDialogClose() {
    resetForm();
    setIsOpen(false);
    if (openOnMount) router.replace('/careers');
  }

  function closeDialog() {
    if (isSubmitting) return;
    const dialog = dialogRef.current;
    if (dialog?.open) {
      dialog.close();
    } else {
      resetForm();
      setIsOpen(false);
    }
  }

  function updateValue(field: keyof ApplicationValues, value: string | boolean) {
    setValues((current) => ({ ...current, [field]: value }));
    setErrorMessage(null);
  }

  function selectResume(file: File | undefined) {
    if (!file) return;
    const validationError = getResumeError(file);
    setResumeError(validationError);
    setResume(validationError ? null : file);
    setErrorMessage(null);
    if (validationError && resumeInputRef.current) {
      resumeInputRef.current.value = '';
    }
  }

  function handleResumeChange(event: ChangeEvent<HTMLInputElement>) {
    selectResume(event.target.files?.[0]);
  }

  function handleResumeDrop(event: DragEvent<HTMLLabelElement>) {
    event.preventDefault();
    setIsDragging(false);
    selectResume(event.dataTransfer.files[0]);
  }

  function validateCurrentStep(): boolean {
    const requiredFields = stepFields[step] ?? [];
    const missingField = requiredFields.find((field) => !values[field].toString().trim());

    if (missingField) {
      setErrorMessage('Complete all required fields before continuing.');
      return false;
    }

    if (
      step === 1 &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())
    ) {
      setErrorMessage('Enter a valid email address.');
      return false;
    }

    if (step === 1) {
      const selectedDate = new Date(`${values.dateOfBirth}T00:00:00Z`);
      const today = new Date().toISOString().slice(0, 10);
      if (
        Number.isNaN(selectedDate.getTime()) ||
        selectedDate.toISOString().slice(0, 10) !== values.dateOfBirth ||
        values.dateOfBirth >= today
      ) {
        setErrorMessage('Enter a valid date of birth in the past.');
        return false;
      }
    }

    return true;
  }

  function goToNextStep() {
    if (!validateCurrentStep()) return;
    setErrorMessage(null);
    setStep((current) => Math.min(current + 1, 3));
  }

  function goToPreviousStep() {
    setErrorMessage(null);
    setStep((current) => Math.max(current - 1, 1));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage(null);

    if (!resume) {
      const message = resumeError ?? 'Upload your resume to continue.';
      setResumeError(message);
      setErrorMessage(message);
      return;
    }

    const validationError = getResumeError(resume);
    if (validationError) {
      setResumeError(validationError);
      setErrorMessage(validationError);
      return;
    }

    if (!values.privacyConsent) {
      setErrorMessage('Consent to the privacy notice is required to apply.');
      return;
    }

    if (!validateTags(values.skills) || !validateTags(values.certifications)) {
      setErrorMessage(
        'Each skill or certification must be 100 characters or fewer, with no more than 50 of each.',
      );
      return;
    }

    const formData = new FormData();
    formData.append(
      'data',
      JSON.stringify({
        firstName: values.firstName.trim(),
        lastName: values.lastName.trim(),
        email: values.email.trim(),
        phone: values.phone.trim(),
        dateOfBirth: values.dateOfBirth,
        nationality: values.nationality.trim(),
        schoolAttended: values.schoolAttended.trim(),
        courseOfStudy: values.courseOfStudy.trim(),
        lastCompany: values.lastCompany.trim(),
        yearsOfExperience: values.yearsOfExperience.trim(),
        lastPosition: values.lastPosition.trim(),
        minimumRemuneration: values.minimumRemuneration.trim(),
        skills: parseTags(values.skills),
        certifications: parseTags(values.certifications),
        coverNote: values.coverNote.trim(),
        privacyConsent: values.privacyConsent,
        jobPosition: {
          connect: [{ documentId: jobPositionId }],
        },
      }),
    );
    formData.append('files.resume', resume, resume.name);

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/application-submissions', {
        method: 'POST',
        body: formData,
      });
      const result = (await response.json().catch(() => null)) as
        | { error?: { message?: unknown } }
        | null;

      if (!response.ok) {
        const detail =
          typeof result?.error?.message === 'string'
            ? result.error.message
            : 'Please review your details and try again.';
        setErrorMessage(
          response.status === 403
            ? 'Applications are not enabled yet. Please contact us directly.'
            : response.status === 413
              ? 'Resume must be 10 MB or smaller.'
              : detail,
        );
        console.error('Strapi application submission failed.', {
          status: response.status,
          message:
            typeof result?.error?.message === 'string'
              ? result.error.message
              : undefined,
        });
        return;
      }

      setIsSuccess(true);
    } catch (error) {
      console.error('Unable to submit the candidate application:', error);
      setErrorMessage(
        'We could not reach the application service. Please try again later.',
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      {!openOnMount ? (
        <button
          className="button application-open-button"
          type="button"
          onClick={() => setIsOpen(true)}
        >
          Apply Now
        </button>
      ) : null}
      <dialog
        ref={dialogRef}
        className="application-dialog"
        aria-labelledby={`${formId}-title`}
        onClose={handleDialogClose}
        onCancel={(event) => {
          if (isSubmitting) event.preventDefault();
        }}
        onClick={(event) => {
          if (event.target === dialogRef.current) closeDialog();
        }}
      >
        <div className="application-dialog-panel">
          <header className="application-dialog-header">
            <div>
              <p className="eyebrow">Career application</p>
              <h2 id={`${formId}-title`}>Apply to {jobTitle}</h2>
              {targetDepartment ? (
                <p className="application-dialog-department">
                  {targetDepartment}
                </p>
              ) : null}
            </div>
            <button
              className="application-dialog-close"
              type="button"
              aria-label="Close application"
              disabled={isSubmitting}
              onClick={closeDialog}
            >
              <span aria-hidden="true">×</span>
            </button>
          </header>

          {!isSuccess ? (
            <>
              <div className="application-progress">
                <div className="application-progress-label">
                  <span>Step {step} of 3</span>
                  <span>{stepHeadings[step - 1]}</span>
                </div>
                <div
                  className="application-progress-track"
                  role="progressbar"
                  aria-label="Application progress"
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={progress}
                  aria-valuetext={`Step ${step} of 3`}
                >
                  <span
                    className="application-progress-value"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <nav aria-label="Application steps">
                  <ol className="application-step-list">
                    {stepHeadings.map((heading, index) => {
                      const number = index + 1;
                      return (
                        <li key={heading}>
                          <button
                            type="button"
                            aria-current={step === number ? 'step' : undefined}
                            aria-label={`Step ${number}: ${heading}`}
                            disabled={number >= step || isSubmitting}
                            onClick={() => {
                              setStep(number);
                              setErrorMessage(null);
                            }}
                          >
                            <span aria-hidden="true">{number}</span>
                            <span>{heading}</span>
                          </button>
                        </li>
                      );
                    })}
                  </ol>
                </nav>
              </div>

              <form className="application-form" onSubmit={handleSubmit}>
                {errorMessage ? (
                  <p className="application-form-error" role="alert">
                    {errorMessage}
                  </p>
                ) : null}
                {step === 1 ? (
                  <fieldset className="application-step-fields">
                    <legend id={`${formId}-step-title`} className="visually-hidden">
                      Step 1: Personal details
                    </legend>
                    <div className="application-form-grid">
                      <div className="application-field">
                        <label htmlFor={`${formId}-firstName`}>First name *</label>
                        <input
                          id={`${formId}-firstName`}
                          name="firstName"
                          autoComplete="given-name"
                          maxLength={120}
                          required
                          autoFocus
                          value={values.firstName}
                          onChange={(event) =>
                            updateValue('firstName', event.target.value)
                          }
                        />
                      </div>
                      <div className="application-field">
                        <label htmlFor={`${formId}-lastName`}>Last name *</label>
                        <input
                          id={`${formId}-lastName`}
                          name="lastName"
                          autoComplete="family-name"
                          maxLength={120}
                          required
                          value={values.lastName}
                          onChange={(event) =>
                            updateValue('lastName', event.target.value)
                          }
                        />
                      </div>
                      <div className="application-field">
                        <label htmlFor={`${formId}-email`}>Email address *</label>
                        <input
                          id={`${formId}-email`}
                          name="email"
                          type="email"
                          autoComplete="email"
                          maxLength={254}
                          required
                          value={values.email}
                          onChange={(event) =>
                            updateValue('email', event.target.value)
                          }
                        />
                      </div>
                      <div className="application-field">
                        <label htmlFor={`${formId}-phone`}>Phone number *</label>
                        <input
                          id={`${formId}-phone`}
                          name="phone"
                          type="tel"
                          autoComplete="tel"
                          maxLength={40}
                          required
                          value={values.phone}
                          onChange={(event) =>
                            updateValue('phone', event.target.value)
                          }
                        />
                      </div>
                      <div className="application-field">
                        <label htmlFor={`${formId}-dateOfBirth`}>
                          Date of birth *
                        </label>
                        <input
                          id={`${formId}-dateOfBirth`}
                          name="dateOfBirth"
                          type="date"
                          autoComplete="bday"
                          max={new Date().toISOString().slice(0, 10)}
                          required
                          value={values.dateOfBirth}
                          onChange={(event) =>
                            updateValue('dateOfBirth', event.target.value)
                          }
                        />
                      </div>
                      <div className="application-field">
                        <label htmlFor={`${formId}-nationality`}>
                          Nationality *
                        </label>
                        <input
                          id={`${formId}-nationality`}
                          name="nationality"
                          autoComplete="country-name"
                          maxLength={120}
                          required
                          value={values.nationality}
                          onChange={(event) =>
                            updateValue('nationality', event.target.value)
                          }
                        />
                      </div>
                    </div>
                  </fieldset>
                ) : null}

                {step === 2 ? (
                  <fieldset className="application-step-fields">
                    <legend className="visually-hidden">
                      Step 2: Experience and education
                    </legend>
                    <div className="application-form-grid">
                      <div className="application-field application-field--full">
                        <label htmlFor={`${formId}-schoolAttended`}>
                          School attended
                        </label>
                        <input
                          id={`${formId}-schoolAttended`}
                          name="schoolAttended"
                          autoComplete="organization"
                          maxLength={200}
                          value={values.schoolAttended}
                          onChange={(event) =>
                            updateValue('schoolAttended', event.target.value)
                          }
                        />
                      </div>
                      <div className="application-field">
                        <label htmlFor={`${formId}-courseOfStudy`}>
                          Course of study *
                        </label>
                        <input
                          id={`${formId}-courseOfStudy`}
                          name="courseOfStudy"
                          maxLength={200}
                          required
                          autoFocus
                          value={values.courseOfStudy}
                          onChange={(event) =>
                            updateValue('courseOfStudy', event.target.value)
                          }
                        />
                      </div>
                      <div className="application-field">
                        <label htmlFor={`${formId}-lastCompany`}>
                          Last company *
                        </label>
                        <input
                          id={`${formId}-lastCompany`}
                          name="lastCompany"
                          autoComplete="organization"
                          maxLength={200}
                          required
                          value={values.lastCompany}
                          onChange={(event) =>
                            updateValue('lastCompany', event.target.value)
                          }
                        />
                      </div>
                      <div className="application-field">
                        <label htmlFor={`${formId}-yearsOfExperience`}>
                          Years of experience *
                        </label>
                        <input
                          id={`${formId}-yearsOfExperience`}
                          name="yearsOfExperience"
                          maxLength={80}
                          placeholder="e.g. 5 years"
                          required
                          value={values.yearsOfExperience}
                          onChange={(event) =>
                            updateValue('yearsOfExperience', event.target.value)
                          }
                        />
                      </div>
                      <div className="application-field">
                        <label htmlFor={`${formId}-lastPosition`}>
                          Last position *
                        </label>
                        <input
                          id={`${formId}-lastPosition`}
                          name="lastPosition"
                          maxLength={160}
                          required
                          value={values.lastPosition}
                          onChange={(event) =>
                            updateValue('lastPosition', event.target.value)
                          }
                        />
                      </div>
                      <div className="application-field application-field--full">
                        <label htmlFor={`${formId}-minimumRemuneration`}>
                          Minimum remuneration *
                        </label>
                        <input
                          id={`${formId}-minimumRemuneration`}
                          name="minimumRemuneration"
                          maxLength={120}
                          required
                          value={values.minimumRemuneration}
                          onChange={(event) =>
                            updateValue(
                              'minimumRemuneration',
                              event.target.value,
                            )
                          }
                        />
                      </div>
                    </div>
                  </fieldset>
                ) : null}

                {step === 3 ? (
                  <fieldset className="application-step-fields">
                    <legend className="visually-hidden">
                      Step 3: Resume and extras
                    </legend>
                    <div className="application-form-grid">
                      <div className="application-field application-field--full">
                        <span
                          className="application-field-label"
                          id={`${formId}-resume-label`}
                        >
                          Resume *
                        </span>
                        <label
                          className={`application-file-picker${isDragging ? ' is-dragging' : ''}`}
                          htmlFor={`${formId}-resume`}
                          onDragOver={(event) => {
                            event.preventDefault();
                            setIsDragging(true);
                          }}
                          onDragLeave={() => setIsDragging(false)}
                          onDrop={handleResumeDrop}
                        >
                          <input
                            ref={resumeInputRef}
                            id={`${formId}-resume`}
                            name="resume"
                            type="file"
                            accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                            aria-labelledby={`${formId}-resume-label`}
                            aria-describedby={`${formId}-resume-help ${formId}-resume-file`}
                            aria-invalid={Boolean(resumeError)}
                            autoFocus
                            onChange={handleResumeChange}
                          />
                          <span>
                            <strong>Choose a file</strong> or drag it here
                          </span>
                          <span id={`${formId}-resume-help`}>
                            PDF, DOC, DOCX · 10 MB maximum
                          </span>
                        </label>
                        <p
                          className="application-file-status"
                          id={`${formId}-resume-file`}
                          aria-live="polite"
                        >
                          {resume
                            ? `${resume.name} · ${formatFileSize(resume.size)}`
                            : resumeError ?? ''}
                        </p>
                      </div>
                      <div className="application-field application-field--full">
                        <label htmlFor={`${formId}-coverNote`}>
                          Cover note *
                        </label>
                        <textarea
                          id={`${formId}-coverNote`}
                          name="coverNote"
                          rows={5}
                          maxLength={5000}
                          required
                          value={values.coverNote}
                          onChange={(event) =>
                            updateValue('coverNote', event.target.value)
                          }
                        />
                      </div>
                      <div className="application-field application-field--full">
                        <label htmlFor={`${formId}-skills`}>
                          Skills <span>(separate with commas)</span>
                        </label>
                        <input
                          id={`${formId}-skills`}
                          name="skills"
                          maxLength={5100}
                          value={values.skills}
                          onChange={(event) =>
                            updateValue('skills', event.target.value)
                          }
                        />
                      </div>
                      <div className="application-field application-field--full">
                        <label htmlFor={`${formId}-certifications`}>
                          Certifications{' '}
                          <span>(separate with commas)</span>
                        </label>
                        <input
                          id={`${formId}-certifications`}
                          name="certifications"
                          maxLength={5100}
                          value={values.certifications}
                          onChange={(event) =>
                            updateValue('certifications', event.target.value)
                          }
                        />
                      </div>
                    </div>
                    <div className="application-consent">
                      <input
                        id={`${formId}-privacyConsent`}
                        name="privacyConsent"
                        type="checkbox"
                        required
                        checked={values.privacyConsent}
                        onChange={(event) =>
                          updateValue('privacyConsent', event.target.checked)
                        }
                      />
                      <label htmlFor={`${formId}-privacyConsent`}>
                        I consent to the processing of my information for
                        recruitment. See our{' '}
                        <a href="/privacy-policy">Privacy Policy</a>.
                      </label>
                    </div>
                  </fieldset>
                ) : null}

                <footer className="application-form-actions">
                  {step > 1 ? (
                    <button
                      className="button button--secondary"
                      type="button"
                      disabled={isSubmitting}
                      onClick={goToPreviousStep}
                    >
                      Back
                    </button>
                  ) : (
                    <span />
                  )}
                  {step < 3 ? (
                    <button
                      className="button"
                      type="button"
                      onClick={goToNextStep}
                    >
                      Continue
                    </button>
                  ) : (
                    <button
                      className="button application-submit"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      {isSubmitting
                        ? 'Submitting application…'
                        : 'Submit application'}
                    </button>
                  )}
                </footer>
              </form>
            </>
          ) : (
            <section
              className="application-success"
              role="status"
              aria-live="polite"
            >
              <p className="eyebrow">Application received</p>
              <h3>Thank you, {values.firstName}.</h3>
              <p>
                Your application for {jobTitle} has been submitted. Our team
                will review your details.
              </p>
              <button
                className="button"
                type="button"
                onClick={closeDialog}
              >
                Close
              </button>
            </section>
          )}
        </div>
      </dialog>
    </>
  );
}
