import type { Metadata } from 'next';
import LegalPageLayout from '../../components/legal/legal-page-layout';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'Learn how Kelari collects, uses, stores, and safeguards personal data.',
};

const sections = [
  { id: 'information-we-collect', title: 'Information We Collect' },
  { id: 'how-we-use-information', title: 'How We Use Your Information' },
  { id: 'cookies-and-tracking', title: 'Cookie Policy & Tracking Controls' },
  { id: 'legal-basis', title: 'Legal Basis for Processing Data' },
  { id: 'sharing-and-third-parties', title: 'Information Sharing & Third-Party Services' },
  { id: 'security-and-retention', title: 'Data Security & Retention' },
  { id: 'data-rights', title: 'Your Data Rights' },
  { id: 'policy-updates', title: 'Updates to This Policy' },
  { id: 'contact-us', title: 'Contact Us' },
] as const;

export default function PrivacyPage() {
  return (
    <LegalPageLayout
      title="Privacy Policy"
      effectiveDate="October 31, 2026"
      lastUpdated="October 31, 2026"
      sections={sections}
    >
      <p>
        At Kelari (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;), we are
        committed to protecting the privacy, confidentiality, and security of
        your personal data. This Privacy Policy outlines how we collect, use,
        store, and safeguard your information when you visit our website,
        engage with our professional advisory content, submit inquiries, or
        apply for career opportunities.
      </p>

      <section id="information-we-collect" aria-labelledby="privacy-section-1">
        <h2 id="privacy-section-1">1. Information We Collect</h2>
        <p>
          We collect information directly provided by you, as well as data
          gathered automatically through your interaction with our website.
        </p>
        <h3>A. Information You Provide Directly</h3>
        <ul>
          <li>
            <strong>Contact &amp; Consultation Inquiries:</strong> When you
            submit a request through our contact forms, we collect your full
            name, business email address, phone number, company name, target
            industry, and the contents of your message.
          </li>
          <li>
            <strong>Career Applications:</strong> When applying for open
            positions or submitting an unsolicited application, we collect
            your contact details, resume/CV uploads, cover notes, employment
            history, and department preferences.
          </li>
          <li>
            <strong>Newsletter Subscriptions:</strong> When subscribing to our
            Insights publications, we collect your email address and
            communication preferences.
          </li>
        </ul>
        <h3>B. Information Collected Automatically</h3>
        <ul>
          <li>
            <strong>Device &amp; Usage Data:</strong> We collect standard
            technical information, including your IP address, browser type,
            operating system, referring URLs, pages viewed, and access
            timestamps.
          </li>
          <li>
            <strong>Analytics Data:</strong> We use Google Analytics 4 (GA4) to
            monitor aggregate website traffic, visitor interactions, and
            performance metrics. GA4 tracks this data using client
            identifiers, but all tracking scripts are strictly controlled via
            our cookie consent mechanism.
          </li>
        </ul>
      </section>

      <section id="how-we-use-information" aria-labelledby="privacy-section-2">
        <h2 id="privacy-section-2">2. How We Use Your Information</h2>
        <p>We process your personal data for specific, legitimate business purposes:</p>
        <ul>
          <li>
            <strong>Service Delivery &amp; Consultation:</strong> To respond to
            your inquiries, evaluate project engagements, and provide client
            advisory services.
          </li>
          <li>
            <strong>Talent Recruitment:</strong> To evaluate candidate
            qualifications for active or future employment opportunities.
          </li>
          <li>
            <strong>Website Optimization:</strong> To analyze user behavior,
            improve site navigation, optimize performance, and ensure digital
            accessibility (WCAG 2.1 AA compliance).
          </li>
          <li>
            <strong>Direct Marketing &amp; Insights:</strong> To send updates,
            whitepapers, and industry analysis if you have explicitly opted
            into our mailing list (you may unsubscribe at any time).
          </li>
          <li>
            <strong>Legal &amp; Regulatory Compliance:</strong> To maintain
            enterprise audit logs, prevent fraudulent activity, and comply
            with applicable financial, corporate, and data privacy regulations.
          </li>
        </ul>
      </section>

      <section id="cookies-and-tracking" aria-labelledby="privacy-section-3">
        <h2 id="privacy-section-3">3. Cookie Policy &amp; Tracking Controls</h2>
        <p>
          We operate under a strict privacy-first data model. Non-essential
          tracking scripts and analytical cookies (including GA4) are blocked
          by default upon your initial visit.
        </p>
        <h3>Types of Cookies Used:</h3>
        <ol>
          <li>
            <strong>Essential Cookies:</strong> Necessary for the technical
            operation of the website and basic security features. These cannot
            be disabled.
          </li>
          <li>
            <strong>Analytics Cookies (GA4):</strong> Used to compile anonymous,
            aggregated metrics on how visitors navigate our site. These cookies
            are only activated if you click &quot;Accept All&quot; on our
            Cookie Consent Banner.
          </li>
        </ol>
        <h3>Managing Your Preferences:</h3>
        <p>
          You can update, modify, or revoke your cookie consent preferences at
          any time by clicking the &quot;Cookie Settings&quot; link located in
          the website footer.
        </p>
      </section>

      <section id="legal-basis" aria-labelledby="privacy-section-4">
        <h2 id="privacy-section-4">4. Legal Basis for Processing Data</h2>
        <p>We process personal data under one or more of the following legal bases:</p>
        <ul>
          <li>
            <strong>Consent:</strong> Where you have explicitly agreed to data
            collection (e.g., opting into marketing communications or accepting
            analytical cookies).
          </li>
          <li>
            <strong>Contractual Necessity:</strong> Where processing is
            required to take steps at your request prior to entering into a
            formal service agreement or employment contract.
          </li>
          <li>
            <strong>Legitimate Interests:</strong> To protect our digital
            infrastructure, assess site metrics, and manage commercial
            inquiries, provided your individual rights do not override these
            interests.
          </li>
        </ul>
      </section>

      <section
        id="sharing-and-third-parties"
        aria-labelledby="privacy-section-5"
      >
        <h2 id="privacy-section-5">
          5. Information Sharing &amp; Third-Party Services
        </h2>
        <p>
          Kelari does not sell, rent, or trade personal information to third
          parties. We share data only with trusted service providers bound by
          strict confidentiality obligations:
        </p>
        <ul>
          <li>
            <strong>Managed Cloud Providers:</strong> Infrastructure and CMS
            platforms (Strapi) used to host website data and store candidate
            uploads securely.
          </li>
          <li>
            <strong>Communication &amp; Analytics Tools:</strong> Third-party
            integrations (e.g., Mailchimp for newsletter distribution and
            Google Analytics for performance reporting).
          </li>
          <li>
            <strong>Legal Authorities:</strong> Where required by law,
            subpoena, or legal process to protect our rights, client safety, or
            public safety.
          </li>
        </ul>
      </section>

      <section id="security-and-retention" aria-labelledby="privacy-section-6">
        <h2 id="privacy-section-6">6. Data Security &amp; Retention</h2>
        <p>
          We implement enterprise-grade technical and organizational
          safeguards to protect personal data against unauthorized access,
          loss, or alteration. Submissions received via our forms and resume
          uploads are stored in secure environments with restricted access
          control.
        </p>
        <p>
          We retain personal data only for as long as necessary to fulfill the
          purposes outlined in this policy, complete client engagements,
          comply with statutory retention periods, or resolve legal disputes.
        </p>
      </section>

      <section id="data-rights" aria-labelledby="privacy-section-7">
        <h2 id="privacy-section-7">7. Your Data Rights</h2>
        <p>
          Depending on your jurisdiction, you have the following rights
          regarding your personal information:
        </p>
        <ul>
          <li>
            <strong>Right to Access:</strong> Request a copy of the personal
            data we hold about you.
          </li>
          <li>
            <strong>Right to Rectification:</strong> Request correction of
            inaccurate or incomplete data.
          </li>
          <li>
            <strong>Right to Erasure (&quot;Right to be Forgotten&quot;):</strong>{' '}
            Request deletion of your personal data where statutory retention
            exceptions do not apply.
          </li>
          <li>
            <strong>Right to Restrict or Object:</strong> Limit or object to
            our processing of your personal data.
          </li>
          <li>
            <strong>Right to Withdraw Consent:</strong> Revoke previously
            granted cookie or marketing consent at any time without affecting
            prior lawful processing.
          </li>
        </ul>
        <p>
          To exercise any of these rights, please contact our Privacy Team at{' '}
          <a href="mailto:privacy@kelari.com">privacy@kelari.com</a>.
        </p>
      </section>

      <section id="policy-updates" aria-labelledby="privacy-section-8">
        <h2 id="privacy-section-8">8. Updates to This Policy</h2>
        <p>
          We may update this Privacy Policy periodically to reflect changes in
          regulatory requirements, business operations, or digital
          capabilities. Any updates will be posted on this page with a revised
          &quot;Last Updated&quot; date.
        </p>
      </section>

      <section id="contact-us" aria-labelledby="privacy-section-9">
        <h2 id="privacy-section-9">9. Contact Us</h2>
        <p>
          If you have questions, concerns, or requests regarding this Privacy
          Policy or our data handling practices, please contact us:
        </p>
        <address className="not-italic">
          Kelari Corporate Advisory<br />
          Attn: Legal &amp; Compliance Department<br />
          Email: <a href="mailto:privacy@kelari.com">privacy@kelari.com</a><br />
          Website:{' '}
          <a href="https://www.kelari.com">https://www.kelari.com</a>
        </address>
      </section>
    </LegalPageLayout>
  );
}
