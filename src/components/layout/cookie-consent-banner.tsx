'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import {
  COOKIE_CONSENT_KEY,
  COOKIE_CONSENT_UPDATED_EVENT,
  readCookieConsent,
  saveCookieConsent,
  type CookieConsentChoice,
  type CookieConsentEventDetail,
} from '../../lib/cookie-consent';

export default function CookieConsentBanner() {
  const [consent, setConsent] = useState<CookieConsentChoice | null | 'loading'>(
    'loading',
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setConsent(readCookieConsent());

    function handleConsentUpdate(event: Event) {
      const { consent: updatedConsent } = (
        event as CustomEvent<CookieConsentEventDetail>
      ).detail;
      setConsent(updatedConsent);
      setError(null);
    }

    function handleStorage(event: StorageEvent) {
      if (event.key === COOKIE_CONSENT_KEY) {
        setConsent(readCookieConsent());
        setError(null);
      }
    }

    window.addEventListener(COOKIE_CONSENT_UPDATED_EVENT, handleConsentUpdate);
    window.addEventListener('storage', handleStorage);

    return () => {
      window.removeEventListener(
        COOKIE_CONSENT_UPDATED_EVENT,
        handleConsentUpdate,
      );
      window.removeEventListener('storage', handleStorage);
    };
  }, []);

  function chooseConsent(choice: CookieConsentChoice) {
    if (saveCookieConsent(choice)) {
      setConsent(choice);
      setError(null);
      return;
    }

    setError(
      'Your choice could not be saved. Please enable browser storage and try again.',
    );
  }

  if (consent !== null) return null;

  return (
    <aside
      className="cookie-consent-banner"
      aria-labelledby="cookie-consent-heading"
      aria-describedby="cookie-consent-description"
      aria-live="polite"
    >
      <div className="cookie-consent-copy">
        <h2 id="cookie-consent-heading">Your privacy matters</h2>
        <p id="cookie-consent-description">
          We use essential storage to run this site. With your permission, Google
          Analytics helps us understand site performance and improve your
          experience. Read our <Link href="/privacy-policy">Privacy Policy</Link>.
        </p>
        {error ? (
          <p className="cookie-consent-error" role="alert">
            {error}
          </p>
        ) : null}
      </div>
      <div className="cookie-consent-actions">
        <button type="button" onClick={() => chooseConsent('granted')}>
          Accept All
        </button>
        <button type="button" onClick={() => chooseConsent('denied')}>
          Decline
        </button>
      </div>
    </aside>
  );
}
