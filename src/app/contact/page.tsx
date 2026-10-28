import type { Metadata } from 'next';
import Hero from '../../components/features/hero';
import ContactForm from '../../components/forms/contact-form';

export const metadata: Metadata = {
  title: 'Contact',
};

export default function ContactPage() {
  return (
    <main>
      <Hero
        eyebrow="Get in touch"
        title="Contact Us"
        description="Tell us what you are working on and how we can help."
      />
      <section>
        <h2>Start a conversation</h2>
        <ContactForm />
      </section>
    </main>
  );
}
