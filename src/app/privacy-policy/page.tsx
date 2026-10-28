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
      </section>
    </main>
  );
}
