'use client';

import { useState, type FormEvent } from 'react';

function getErrorMessage(body: unknown) {
  if (
    typeof body === 'object' &&
    body !== null &&
    'error' in body &&
    typeof body.error === 'string'
  ) {
    return body.error;
  }

  return 'Your subscription could not be submitted. Please try again later.';
}

export default function NewsletterSignupForm() {
  const [submitting, setSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [submissionSucceeded, setSubmissionSucceeded] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;

    const formData = new FormData(event.currentTarget);
    setSubmitting(true);
    setStatusMessage('');

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.get('email'),
          website: formData.get('website'),
        }),
      });

      const responseBody: unknown = await response.json();
      if (!response.ok) {
        setStatusMessage(getErrorMessage(responseBody));
        return;
      }

      setSubmissionSucceeded(true);
      setStatusMessage(
        'Thanks for subscribing. If this address can be subscribed, a confirmation email will be sent.',
      );
    } catch {
      setStatusMessage(
        'We could not connect to the subscription service. Please check your connection and try again.',
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form
      className="footer-newsletter"
      onSubmit={handleSubmit}
      aria-label="Subscribe to Kelari Group insights"
    >
      <label className="visually-hidden" htmlFor="footer-newsletter-email">
        Email address
      </label>
      <input
        id="footer-newsletter-email"
        type="email"
        name="email"
        autoComplete="email"
        placeholder="Your email address"
        maxLength={254}
        required
        disabled={submitting || submissionSucceeded}
      />
      <div className="mailchimp-honeypot" aria-hidden="true">
        <label htmlFor="footer-newsletter-website">Leave this field empty</label>
        <input
          id="footer-newsletter-website"
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>
      <button
        className="footer-newsletter-submit"
        type="submit"
        disabled={submitting || submissionSucceeded}
      >
        {submitting ? 'Subscribing…' : 'Subscribe'}
      </button>
      {statusMessage ? (
        <p
          className={
            submissionSucceeded ? 'footer-newsletter-note' : 'footer-newsletter-error'
          }
          role="status"
          aria-live="polite"
        >
          {statusMessage}
        </p>
      ) : (
        <p className="footer-newsletter-note">
          By subscribing, you agree to receive Kelari Group email updates.
          Mailchimp will send a confirmation email. You can unsubscribe at any
          time. See our <a href="/privacy-policy">Privacy Policy</a>.
        </p>
      )}
    </form>
  );
}
