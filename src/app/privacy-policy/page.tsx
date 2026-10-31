import type { Metadata } from 'next';
import Hero from '../../components/features/hero';

export const metadata: Metadata = {
  title: 'Privacy Policy',
};

export default function PrivacyPolicyPage() {
  return (
    <main>
      <Hero eyebrow="Legal" title="Privacy Policy" />
      <section>
        <p>Privacy policy content will be added here.</p>
        <div id="cookies" className="cookie-preferences-info">
          <h2>Cookie preferences</h2>
          <p>
            Essential storage keeps this site working. Google Analytics is
            optional and is loaded only after you select “Accept All”; selecting
            “Decline” prevents it from loading. Your choice is stored in this
            browser as <code>cookie_consent</code>. Use “Cookie settings” in the
            site footer to reopen the banner and change or withdraw your choice.
          </p>
        </div>
      </section>
    </main>
  );
}
