import type { Metadata } from 'next';
import Hero from '../../components/features/hero';

export const metadata: Metadata = {
  title: 'Terms of Service',
};

export default function TermsOfServicePage() {
  return (
    <main>
      <Hero eyebrow="Legal" title="Terms of Service" />
      <section>
        <p>Terms of service content will be added here.</p>
      </section>
    </main>
  );
}
