import Link from 'next/link';
import CookieSettingsTrigger from './cookie-settings-trigger';
import NewsletterSignupForm from './newsletter-signup-form';
import { contactPhone, contactPhoneLink } from '../../lib/contact';
import { industryClusters, serviceCategories } from '../../lib/navigation';

const headquartersAddress = process.env.NEXT_PUBLIC_HEADQUARTERS_ADDRESS?.trim();
const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim();
const socialLinks = [
  {
    label: 'LinkedIn',
    href: process.env.NEXT_PUBLIC_LINKEDIN_URL,
    path: 'M6.5 8.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM5 10h3v9H5zm5 0h2.9v1.2h.1a3.2 3.2 0 0 1 2.9-1.6c3.1 0 3.7 2 3.7 4.6V19h-3v-4.2c0-1 0-2.3-1.4-2.3s-1.7 1.1-1.7 2.2V19h-3z',
  },
  {
    label: 'Instagram',
    href: process.env.NEXT_PUBLIC_INSTAGRAM_URL,
    path: 'M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4Zm0 2a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H7Zm5 3a4 4 0 1 1 0 8 4 4 0 0 1 0-8Zm0 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm4.7-3.3a.8.8 0 1 1 0 1.6.8.8 0 0 1 0-1.6Z',
  },
  {
    label: 'YouTube',
    href: process.env.NEXT_PUBLIC_YOUTUBE_URL,
    path: 'M21 7.2a2.5 2.5 0 0 0-1.8-1.8C17.6 5 12 5 12 5s-5.6 0-7.2.4A2.5 2.5 0 0 0 3 7.2 26 26 0 0 0 2.6 12 26 26 0 0 0 3 16.8a2.5 2.5 0 0 0 1.8 1.8C6.4 19 12 19 12 19s5.6 0 7.2-.4a2.5 2.5 0 0 0 1.8-1.8 26 26 0 0 0 .4-4.8 26 26 0 0 0-.4-4.8ZM10 15.5v-7l6 3.5-6 3.5Z',
  },
];

export default function Footer() {
  const configuredSocialLinks = socialLinks.filter(
    (link): link is typeof link & { href: string } => Boolean(link.href?.trim()),
  );

  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <section className="footer-brand" aria-labelledby="footer-brand-heading">
          <Link className="footer-brand-mark" href="/" aria-label="Kellari home">
            <span className="brand-mark" aria-hidden="true">K</span>
            <span id="footer-brand-heading">Kellari</span>
          </Link>
          <p>
            We help organizations navigate change and make confident decisions.
            Together, we turn complex challenges into meaningful progress.
          </p>
          <address className="footer-contact-list">
            {headquartersAddress ? (
              <span>{headquartersAddress}</span>
            ) : null}
            {contactEmail ? (
              <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
            ) : (
              <Link href="/contact">Send us an inquiry</Link>
            )}
            {contactPhone && contactPhoneLink ? (
              <a href={contactPhoneLink}>{contactPhone}</a>
            ) : null}
          </address>
        </section>

        <nav className="footer-navigation" aria-label="Footer navigation">
          <section aria-labelledby="footer-services-heading">
            <h2 id="footer-services-heading">Services</h2>
            <ul>
              {serviceCategories.map((category) => (
                <li key={category.href}>
                  <Link href={category.href}>{category.shortTitle}</Link>
                </li>
              ))}
            </ul>
          </section>
          <section aria-labelledby="footer-industries-heading">
            <h2 id="footer-industries-heading">Industries</h2>
            <ul>
              {industryClusters.map((cluster) => (
                <li key={cluster.id}>
                  <Link href={`/industries#${cluster.id}`}>{cluster.title}</Link>
                </li>
              ))}
            </ul>
          </section>
          <section aria-labelledby="footer-company-heading">
            <h2 id="footer-company-heading">Company</h2>
            <ul>
              <li><Link href="/about">About us</Link></li>
              <li><Link href="/careers">Careers</Link></li>
              <li><Link href="/contact">Contact</Link></li>
              <li><Link href="/insights">Insights</Link></li>
            </ul>
          </section>
        </nav>

        <section className="footer-compliance" aria-labelledby="footer-compliance-heading">
          <h2 id="footer-compliance-heading">Compliance & legal</h2>
          <aside className="footer-disclaimer">
            <h3>Financial & Tax Advisory notice</h3>
            <p>
              Kellari’s financial and tax content is for general informational
              purposes only and is not tax, legal, accounting, investment, or
              other professional advice. It does not consider your specific
              circumstances; consult a qualified professional before acting.
              Advisory services are subject to a separate engagement agreement
              and applicable professional requirements.
            </p>
          </aside>
          <ul className="footer-legal-links">
            <li><Link href="/privacy-policy">Privacy policy</Link></li>
            <li><Link href="/terms-of-service">Terms of service</Link></li>
            <li><CookieSettingsTrigger /></li>
            <li>
              <a
                href="https://www.w3.org/TR/WCAG21/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Accessibility (WCAG 2.1 AA)
              </a>
            </li>
          </ul>
        </section>

        <section className="footer-engagement" aria-labelledby="footer-engagement-heading">
          <h2 id="footer-engagement-heading">Stay informed</h2>
          <p>Get Kellari insights and perspectives delivered to your inbox.</p>
          <NewsletterSignupForm />
          {configuredSocialLinks.length > 0 ? (
            <nav className="footer-social" aria-label="Kellari social media">
              {configuredSocialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Kellari on ${link.label} (opens in a new tab)`}
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path fill="currentColor" d={link.path} />
                  </svg>
                </a>
              ))}
            </nav>
          ) : (
            <p className="footer-social-note">Follow us on social media soon.</p>
          )}
        </section>
      </div>
      <p className="footer-copyright">
        © {new Date().getFullYear()} Kellari. All rights reserved.
      </p>
    </footer>
  );
}
