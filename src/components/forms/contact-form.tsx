'use client';

import { useState, type FormEvent } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const servicePillars = [
  'Strategy, People & Digital',
  'Financial & Tax Advisory',
  'Sustainability & ESG',
  'Creative & Communications',
] as const;

const inputClassName =
  'mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-sm transition placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-800 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white dark:placeholder:text-zinc-500 dark:focus:ring-[#74c8b3]';

function getErrorMessage(body: unknown) {
  if (
    typeof body === 'object' &&
    body !== null &&
    'error' in body &&
    typeof body.error === 'string'
  ) {
    return body.error;
  }

  return 'Your inquiry could not be sent. Please try again or contact us directly.';
}

export default function ContactForm() {
  const [submitting, setSubmitting] = useState(false);
  const [submissionSucceeded, setSubmissionSucceeded] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const shouldReduceMotion = useReducedMotion();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;

    const formData = new FormData(event.currentTarget);
    setSubmitting(true);
    setStatusMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.get('name'),
          email: formData.get('email'),
          company: formData.get('company'),
          phone: formData.get('phone'),
          service: formData.get('service'),
          message: formData.get('message'),
          website: formData.get('website'),
        }),
      });

      const responseBody: unknown = await response.json();
      if (!response.ok) {
        setStatusMessage(getErrorMessage(responseBody));
        return;
      }

      setSubmissionSucceeded(true);
    } catch {
      setStatusMessage(
        'We could not connect to the inquiry service. Please check your connection and try again.',
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (submissionSucceeded) {
    return (
      <section
        className="rounded-2xl border border-emerald-200 bg-white p-8 shadow-lg shadow-emerald-950/5 dark:border-zinc-800 dark:bg-zinc-900 sm:p-10"
        role="status"
        aria-live="polite"
      >
        <div className="mb-5 grid h-14 w-14 place-items-center rounded-full bg-emerald-100 text-emerald-800 dark:bg-[#74c8b3]/15 dark:text-[#74c8b3]">
          <svg
            viewBox="0 0 24 24"
            className="h-7 w-7"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="m5 12.5 4.5 4.5L19 7"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">
          Inquiry received
        </h2>
        <p className="mt-3 max-w-xl leading-7 text-slate-600 dark:text-zinc-400">
          Thank you for reaching out. A Kelari partner will respond within 24
          hours.
        </p>
      </section>
    );
  }

  return (
    <form
      id="contact-inquiry-form"
      className="rounded-2xl border border-slate-200 bg-white p-5 shadow-lg shadow-slate-950/5 dark:border-zinc-800 dark:bg-zinc-900 sm:p-8"
      onSubmit={handleSubmit}
    >
      <fieldset
        className="grid grid-cols-1 gap-x-5 gap-y-5 sm:grid-cols-2"
        disabled={submitting}
      >
        <legend className="sr-only">Contact inquiry</legend>

        <label className="block text-sm font-medium text-slate-700 dark:text-zinc-300">
          Full name <span className="text-rose-600" aria-hidden="true">*</span>
          <input
            autoComplete="name"
            className={inputClassName}
            name="name"
            type="text"
            placeholder="Your full name"
            maxLength={150}
            required
          />
        </label>

        <label className="block text-sm font-medium text-slate-700 dark:text-zinc-300">
          Email address <span className="text-rose-600" aria-hidden="true">*</span>
          <input
            autoComplete="email"
            className={inputClassName}
            name="email"
            type="email"
            placeholder="you@company.com"
            maxLength={254}
            required
          />
        </label>

        <label className="block text-sm font-medium text-slate-700 dark:text-zinc-300">
          Company name <span className="font-normal text-slate-400">(optional)</span>
          <input
            autoComplete="organization"
            className={inputClassName}
            name="company"
            type="text"
            placeholder="Your organization"
            maxLength={200}
          />
        </label>

        <label className="block text-sm font-medium text-slate-700 dark:text-zinc-300">
          Phone number <span className="font-normal text-slate-400">(optional)</span>
          <input
            autoComplete="tel"
            className={inputClassName}
            name="phone"
            type="tel"
            placeholder="+1 (555) 000-0000"
            maxLength={40}
          />
        </label>

        <fieldset className="min-w-0 border-0 p-0 sm:col-span-2">
          <legend className="mb-3 text-sm font-medium text-slate-700 dark:text-zinc-300">
            Service pillar{' '}
            <span className="font-normal text-slate-400">(optional)</span>
          </legend>
          <div className="flex flex-wrap gap-2">
            {servicePillars.map((service) => (
              <label key={service} className="cursor-pointer">
                <input
                  className="peer sr-only"
                  name="service"
                  type="radio"
                  value={service}
                />
                <span className="inline-flex min-h-10 items-center rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-700 transition hover:bg-slate-200 peer-checked:bg-emerald-800 peer-checked:font-semibold peer-checked:text-white peer-checked:shadow-sm peer-focus-visible:outline-none peer-focus-visible:ring-2 peer-focus-visible:ring-emerald-800 peer-focus-visible:ring-offset-2 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700 dark:peer-checked:bg-[#74c8b3] dark:peer-checked:text-[#11201c] dark:peer-focus-visible:ring-[#74c8b3] dark:peer-focus-visible:ring-offset-zinc-900">
                  {service}
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        <label className="block text-sm font-medium text-slate-700 dark:text-zinc-300 sm:col-span-2">
          How can we help?{' '}
          <span className="text-rose-600" aria-hidden="true">
            *
          </span>
          <textarea
            className={`${inputClassName} min-h-32 resize-y`}
            name="message"
            placeholder="Tell us a little about your priorities or the challenge you are navigating."
            rows={4}
            maxLength={10000}
            required
          />
        </label>

        <label
          className="absolute -left-[10000px] h-px w-px overflow-hidden"
          aria-hidden="true"
        >
          Leave this field empty
          <input
            autoComplete="off"
            name="website"
            tabIndex={-1}
            type="text"
          />
        </label>

        <div className="sm:col-span-2">
          <motion.button
            className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-emerald-800 px-6 py-3 font-semibold text-white shadow-sm transition-colors hover:bg-emerald-900 focus:outline-none focus:ring-2 focus:ring-emerald-800 focus:ring-offset-2 disabled:cursor-wait disabled:opacity-70 dark:bg-[#74c8b3] dark:text-[#11201c] dark:hover:bg-[#9cdecd] dark:focus:ring-[#74c8b3] dark:focus:ring-offset-zinc-900 sm:w-auto"
            type="submit"
            disabled={submitting}
            whileHover={shouldReduceMotion ? undefined : { scale: 1.015 }}
            whileTap={shouldReduceMotion ? undefined : { scale: 0.985 }}
            transition={{ type: 'spring', stiffness: 320, damping: 22 }}
          >
            {submitting ? (
              <>
                <span
                  className="h-4 w-4 animate-spin rounded-full border-2 border-current border-r-transparent"
                  aria-hidden="true"
                />
                Sending inquiry...
              </>
            ) : (
              <>
                Send Inquiry
                <motion.span
                  aria-hidden="true"
                  animate={shouldReduceMotion ? undefined : { x: [0, 3, 0] }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    repeatDelay: 1.5,
                  }}
                >
                  →
                </motion.span>
              </>
            )}
          </motion.button>
          <p
            className="mt-4 text-sm leading-6 text-rose-700 dark:text-rose-300"
            role="status"
            aria-live="polite"
          >
            {statusMessage}
          </p>
        </div>
      </fieldset>
    </form>
  );
}
