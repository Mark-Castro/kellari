import type { Metadata } from 'next';
import Hero from '../../components/features/hero';
import ContactForm from '../../components/forms/contact-form';
import { contactPhone, contactPhoneLink } from '../../lib/contact';

export const metadata: Metadata = {
  title: 'Contact',
};

export default function ContactPage() {
  const headquartersAddress =
    process.env.NEXT_PUBLIC_HEADQUARTERS_ADDRESS?.trim();
  const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim();

  return (
    <main>
      <Hero
        eyebrow="Get in touch"
        title="A thoughtful conversation starts here."
        description="Share the challenge you are working through. Our team will connect you with the right advisory expertise."
      />
      <section className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-8 px-5 pb-20 pt-8 md:px-8 lg:grid-cols-[3fr_2fr] lg:gap-10 lg:px-12 lg:pb-28">
        <div className="min-w-0">
          <div className="mb-7">
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.16em] text-emerald-800 dark:text-[#74c8b3]">
              Start a conversation
            </p>
            <h2 className="mb-3 text-3xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              Tell us what matters.
            </h2>
            <p className="max-w-2xl leading-7 text-slate-600 dark:text-zinc-400">
              A few details will help us understand your priorities and prepare
              for a useful first conversation.
            </p>
          </div>
          <ContactForm />
        </div>

        <aside className="h-fit rounded-2xl border border-slate-200 bg-slate-950 p-6 text-white shadow-xl shadow-slate-950/10 dark:border-zinc-800 dark:bg-zinc-900 sm:p-8 lg:mt-2">
          <div className="mb-8">
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.16em] text-[#74c8b3]">
              Kelari Group LLC
            </p>
            <h2 className="text-2xl font-semibold tracking-tight text-[#74c8b3] dark:text-[#74c8b3]">
              Direct access to our team
            </h2>
            <p className="mt-3 leading-6 text-slate-300 dark:text-zinc-400">
              Connect with us directly or arrange a conversation through the
              inquiry form.
            </p>
          </div>

          <dl className="grid gap-6">
            <div className="flex gap-4">
              <span className="mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/10 text-[#74c8b3]">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
                  <path d="M12 21s7-5.2 7-12a7 7 0 1 0-14 0c0 6.8 7 12 7 12Z" stroke="currentColor" strokeWidth="1.7" />
                  <circle cx="12" cy="9" r="2.3" stroke="currentColor" strokeWidth="1.7" />
                </svg>
              </span>
              <div>
                <dt className="text-sm font-medium text-slate-300 dark:text-zinc-400">
                  Headquarters
                </dt>
                <dd className="mt-1 leading-6">
                  {headquartersAddress || 'Contact us to arrange a visit'}
                </dd>
              </div>
            </div>

            <div className="flex gap-4">
              <span className="mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/10 text-[#74c8b3]">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
                  <path d="M7.2 3.8 10 7.5 8.3 9.2c1.2 2.4 3.1 4.3 5.5 5.5l1.7-1.7 3.7 2.8-.8 3.3c-.2.7-.8 1.1-1.5 1.1C9.8 19.7 4.3 14.2 3.8 7.1c0-.7.4-1.3 1.1-1.5l2.3-.8Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
                </svg>
              </span>
              <div>
                <dt className="text-sm font-medium text-slate-300 dark:text-zinc-400">
                  Direct phone
                </dt>
                <dd className="mt-1">
                  {contactPhone && contactPhoneLink ? (
                    <a className="transition-colors hover:text-[#9cdecd]" href={contactPhoneLink}>
                      {contactPhone}
                    </a>
                  ) : (
                    'Available upon request'
                  )}
                </dd>
              </div>
            </div>

            <div className="flex gap-4">
              <span className="mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/10 text-[#74c8b3]">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
                  <rect x="3.5" y="5" width="17" height="14" rx="2" stroke="currentColor" strokeWidth="1.7" />
                  <path d="m4.5 7 7.5 5.5L19.5 7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <div>
                <dt className="text-sm font-medium text-slate-300 dark:text-zinc-400">
                  Advisory email
                </dt>
                <dd className="mt-1 break-all">
                  {contactEmail ? (
                    <a className="transition-colors hover:text-[#9cdecd]" href={`mailto:${contactEmail}`}>
                      {contactEmail}
                    </a>
                  ) : (
                    <a className="transition-colors hover:text-[#9cdecd]" href="#contact-inquiry-form">
                      Send an inquiry
                    </a>
                  )}
                </dd>
              </div>
            </div>

            <div className="flex gap-4">
              <span className="mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/10 text-[#74c8b3]">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
                  <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.7" />
                  <path d="M12 7v5l3.2 2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
                </svg>
              </span>
              <div>
                <dt className="text-sm font-medium text-slate-300 dark:text-zinc-400">
                  Business hours
                </dt>
                <dd className="mt-1">By appointment</dd>
              </div>
            </div>
          </dl>

          <div className="mt-8 flex gap-3 rounded-xl border border-[#74c8b3]/20 bg-[#74c8b3]/10 p-4">
            <svg viewBox="0 0 24 24" className="mt-0.5 h-5 w-5 shrink-0 text-[#74c8b3]" fill="none" aria-hidden="true">
              <path d="M12 3 19 6v5c0 4.5-2.9 8.2-7 10-4.1-1.8-7-5.5-7-10V6l7-3Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
              <path d="m9 12 2 2 4-4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div>
              <p className="font-semibold">Your privacy matters</p>
              <p className="mt-1 text-sm leading-5 text-slate-300 dark:text-zinc-400">
                We use your details only to respond to your inquiry. Read our{' '}
                <a className="underline underline-offset-2 hover:text-white" href="/privacy-policy">
                  Privacy Policy
                </a>
                .
              </p>
            </div>
          </div>
        </aside>
      </section>
    </main>
  );
}
