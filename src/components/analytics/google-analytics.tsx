'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  COOKIE_CONSENT_KEY,
  COOKIE_CONSENT_UPDATED_EVENT,
  readCookieConsent,
  type CookieConsentEventDetail,
} from '../../lib/cookie-consent';

type GtagFunction = (...args: unknown[]) => void;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: GtagFunction;
    kellariGtagConfiguredFor?: string;
    [key: `ga-disable-${string}`]: boolean | undefined;
  }
}

const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim();

function clearGoogleAnalyticsCookies() {
  const analyticsCookies = document.cookie
    .split(';')
    .map((cookie) => cookie.trim().split('=')[0])
    .filter((name) => name === '_ga' || name.startsWith('_ga_'));

  for (const name of analyticsCookies) {
    document.cookie = `${name}=; path=/; max-age=0; SameSite=Lax`;
  }
}

function setAnalyticsConsent(granted: boolean) {
  if (!measurementId) return;

  window[`ga-disable-${measurementId}`] = !granted;

  if (granted) {
    if (!window.gtag) {
      window.dataLayer = window.dataLayer ?? [];
      window.gtag = function gtag() {
        window.dataLayer?.push(arguments);
      };
      window.gtag('js', new Date());
    }

    window.gtag('consent', 'update', {
      analytics_storage: 'granted',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
    });

    if (window.kellariGtagConfiguredFor !== measurementId) {
      window.gtag('config', measurementId, {
        send_page_view: false,
        allow_google_signals: false,
        allow_ad_personalization_signals: false,
      });
      window.kellariGtagConfiguredFor = measurementId;
    }

    const scriptAlreadyAdded = Array.from(
      document.querySelectorAll<HTMLScriptElement>(
        'script[data-kellari-google-analytics]',
      ),
    ).some((script) => script.dataset.kellariGoogleAnalytics === measurementId);

    if (!scriptAlreadyAdded) {
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
      script.dataset.kellariGoogleAnalytics = measurementId;
      script.addEventListener(
        'error',
        () => {
          console.error('Unable to load the Google Analytics script.');
        },
        { once: true },
      );
      document.head.appendChild(script);
    }

    return;
  }

  window.gtag?.('consent', 'update', {
    analytics_storage: 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
  });
  clearGoogleAnalyticsCookies();

  document
    .querySelectorAll<HTMLScriptElement>(
      'script[data-kellari-google-analytics]',
    )
    .forEach((script) => script.remove());
}

export default function GoogleAnalytics() {
  const pathname = usePathname();
  const [analyticsAllowed, setAnalyticsAllowed] = useState(false);

  useEffect(() => {
    if (!measurementId) return;

    function synchronizeConsent(consent: string | null) {
      const granted = consent === 'granted';
      setAnalyticsAllowed(granted);
      setAnalyticsConsent(granted);
    }

    function handleConsentUpdate(event: Event) {
      const { consent } = (event as CustomEvent<CookieConsentEventDetail>).detail;
      synchronizeConsent(consent);
    }

    function handleStorage(event: StorageEvent) {
      if (event.key === COOKIE_CONSENT_KEY) {
        synchronizeConsent(event.newValue);
      }
    }

    synchronizeConsent(readCookieConsent());
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

  useEffect(() => {
    if (measurementId && analyticsAllowed && pathname) {
      window.gtag?.('event', 'page_view', {
        send_to: measurementId,
        page_path: pathname,
        page_location: new URL(pathname, window.location.origin).href,
      });
    }
  }, [analyticsAllowed, pathname]);

  return null;
}
