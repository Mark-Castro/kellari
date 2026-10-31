'use client';

import { useState } from 'react';
import { clearCookieConsent } from '../../lib/cookie-consent';

export default function CookieSettingsTrigger() {
  const [error, setError] = useState<string | null>(null);

  function reopenCookieSettings() {
    const cleared = clearCookieConsent();
    setError(
      cleared
        ? null
        : 'Cookie settings were reopened, but your previous choice could not be cleared from browser storage.',
    );
  }

  return (
    <>
      <button
        id="cookie-settings-trigger"
        className="footer-cookie-settings"
        type="button"
        onClick={reopenCookieSettings}
      >
        Cookie settings
      </button>
      {error ? (
        <span className="footer-cookie-settings-error" role="status">
          {error}
        </span>
      ) : null}
    </>
  );
}
