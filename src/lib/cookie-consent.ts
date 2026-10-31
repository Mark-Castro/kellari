export const COOKIE_CONSENT_KEY = 'cookie_consent';
export const COOKIE_CONSENT_UPDATED_EVENT = 'cookie_consent_updated';

export type CookieConsentChoice = 'granted' | 'denied';

export type CookieConsentEventDetail = {
  consent: CookieConsentChoice | null;
};

export function readCookieConsent(): CookieConsentChoice | null {
  try {
    const consent = window.localStorage.getItem(COOKIE_CONSENT_KEY);
    return consent === 'granted' || consent === 'denied' ? consent : null;
  } catch (error) {
    console.error('Unable to read cookie consent:', error);
    return null;
  }
}

export function saveCookieConsent(choice: CookieConsentChoice): boolean {
  try {
    window.localStorage.setItem(COOKIE_CONSENT_KEY, choice);
  } catch (error) {
    console.error('Unable to save cookie consent:', error);
    return false;
  }

  window.dispatchEvent(
    new CustomEvent<CookieConsentEventDetail>(COOKIE_CONSENT_UPDATED_EVENT, {
      detail: { consent: choice },
    }),
  );
  return true;
}

export function clearCookieConsent(): boolean {
  let cleared = true;
  try {
    window.localStorage.removeItem(COOKIE_CONSENT_KEY);
  } catch (error) {
    console.error('Unable to clear cookie consent:', error);
    cleared = false;
  }

  window.dispatchEvent(
    new CustomEvent<CookieConsentEventDetail>(COOKIE_CONSENT_UPDATED_EVENT, {
      detail: { consent: null },
    }),
  );
  return cleared;
}
