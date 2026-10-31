'use client';

import { useState, type FormEvent } from 'react';

type NewsletterResponse = {
  message?: unknown;
  error?: unknown;
};

export default function NewsletterSignupForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage(null);
    setError(null);

    const form = event.currentTarget;
    const formData = new FormData(form);
    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.get('email'),
          consent: formData.get('newsletter-consent') === 'on',
          website: formData.get('website'),
        }),
      });
      const result = (await response.json()) as NewsletterResponse;

      if (!response.ok) {
        setError(
          typeof result.error === 'string'
            ? result.error
            : 'We could not process your signup. Please try again.',
        );
        return;
      }

      setMessage(
        typeof result.message === 'string'
          ? result.message
          : 'Please check your email to confirm your subscription.',
      );
      form.reset();
    } catch (requestError) {
      console.error('Unable to submit newsletter signup:', requestError);
      setError(
        'We could not connect to the newsletter service. Please try again later.',
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <form
        className="footer-newsletter"
        onSubmit={handleSubmit}
        aria-label="Subscribe to Kellari insights"
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
          disabled={isSubmitting}
          aria-describedby="footer-newsletter-consent"
        />
        <div className="newsletter-consent">
          <input
            id="footer-newsletter-consent"
            type="checkbox"
            name="newsletter-consent"
            required
            disabled={isSubmitting}
          />
          <label htmlFor="footer-newsletter-consent">
            I agree to receive Kellari email updates. I can unsubscribe at any
            time. See our{' '}
            <a href="/privacy-policy">Privacy Policy</a>.
          </label>
        </div>
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
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting…' : 'Subscribe'}
        </button>
      </form>
      <p className="footer-newsletter-note" role="status" aria-live="polite">
        {message}
      </p>
      {error ? (
        <p className="footer-newsletter-error" role="alert">
          {error}
        </p>
      ) : null}
    </>
  );
}
