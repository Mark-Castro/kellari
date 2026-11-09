import type { Metadata } from 'next';
import LegalPageLayout from '../../components/legal/legal-page-layout';

export const metadata: Metadata = {
  title: 'Terms and Conditions',
  description:
    'Read the terms and conditions governing access to and use of the Kelari website.',
};

const sections = [
  { id: 'no-professional-advice', title: 'No Professional Advice Disclaimer' },
  { id: 'intellectual-property', title: 'Intellectual Property Rights' },
  { id: 'acceptable-use', title: 'Acceptable Use of Website' },
  { id: 'third-party-links', title: 'Third-Party Links & External Resources' },
  { id: 'limitation-of-liability', title: 'Limitation of Liability' },
  { id: 'indemnification', title: 'Indemnification' },
  { id: 'governing-law', title: 'Governing Law & Jurisdiction' },
  { id: 'modifications', title: 'Modifications to Terms' },
  { id: 'contact-information', title: 'Contact Information' },
] as const;

export default function TermsPage() {
  return (
    <LegalPageLayout
      title="Terms and Conditions"
      effectiveDate="October 31, 2026"
      lastUpdated="October 31, 2026"
      sections={sections}
    >
      <p>
        Welcome to the official website of Kelari (&quot;we,&quot;
        &quot;our,&quot; or &quot;us&quot;). By accessing or using our website
        (https://www.kelari.com), viewing our Insights publications, or
        utilizing any of our online contact and career channels, you agree to
        comply with and be bound by these Terms and Conditions
        (&quot;Terms&quot;). If you do not agree with these Terms, please
        refrain from using our site.
      </p>

      <section id="no-professional-advice" aria-labelledby="terms-section-1">
        <h2 id="terms-section-1">
          1. No Professional Advice Disclaimer (Crucial Notice)
        </h2>
        <p>
          The material and content provided on this website—including articles,
          whitepapers, case studies, industry benchmarks, calculators, and
          media publications within our Insights section—are created strictly
          for general informational and educational purposes only.
        </p>
        <ul>
          <li>
            <strong>No Advisory Relationship:</strong> Accessing this website
            or communicating with Kelari via online forms does not create a
            client-adviser relationship, fiduciary relationship, or formal
            engagement between you and Kelari.
          </li>
          <li>
            <strong>No Tax, Financial, or Legal Counsel:</strong> Content on
            this site does not constitute formal financial, tax, accounting,
            audit, legal, or management consultancy advice.
          </li>
          <li>
            <strong>Independent Verification Required:</strong> Regulatory
            standards, tax laws, and market conditions change frequently. You
            should not act or refrain from acting based on any information on
            this site without seeking specific professional advice tailored to
            your circumstances from a qualified Kelari consultant or
            independent advisor under a signed formal agreement.
          </li>
        </ul>
      </section>

      <section id="intellectual-property" aria-labelledby="terms-section-2">
        <h2 id="terms-section-2">2. Intellectual Property Rights</h2>
        <p>
          Unless otherwise indicated, all content, design elements, graphics,
          software, code, logos, corporate trademarks, and written materials
          on this site are the exclusive intellectual property of Kelari or
          its licensors.
        </p>
        <ul>
          <li>
            <strong>Permitted Use:</strong> You are granted a limited,
            non-exclusive, non-transferable license to view, download, and
            print content from this site solely for personal or non-commercial
            internal business research.
          </li>
          <li>
            <strong>Prohibited Actions:</strong> You may not copy, reproduce,
            distribute, modify, frame, mirror, republish, or create derivative
            works from any content on this site without our prior written
            consent.
          </li>
        </ul>
      </section>

      <section id="acceptable-use" aria-labelledby="terms-section-3">
        <h2 id="terms-section-3">3. Acceptable Use of Website</h2>
        <p>When using our website, you explicitly agree not to:</p>
        <ul>
          <li>
            Use the site for any unlawful purpose or in violation of regional
            or international regulations.
          </li>
          <li>
            Attempt to gain unauthorized access to restricted site areas, user
            portals, server infrastructure, or databases.
          </li>
          <li>
            Introduce malicious code, viruses, trojans, worms, or other harmful
            technical materials.
          </li>
          <li>
            Use automated bots, scrapers, or spidering tools to extract data
            from our site without written authorization.
          </li>
          <li>
            Interfere with or compromise the security, integrity, or
            performance of the website.
          </li>
        </ul>
      </section>

      <section id="third-party-links" aria-labelledby="terms-section-4">
        <h2 id="terms-section-4">
          4. Third-Party Links &amp; External Resources
        </h2>
        <p>
          Our website may contain links to external third-party websites,
          industry reports, or partner platforms. These links are provided
          solely for convenience. Kelari has no control over the content,
          privacy policies, or practices of third-party sites and accepts no
          responsibility or liability for any loss or damage arising from your
          use of them.
        </p>
      </section>

      <section id="limitation-of-liability" aria-labelledby="terms-section-5">
        <h2 id="terms-section-5">5. Limitation of Liability</h2>
        <p>
          To the fullest extent permitted by law, Kelari, its partners,
          directors, employees, and agents shall not be liable for any direct,
          indirect, incidental, consequential, special, or punitive damages
          resulting from:
        </p>
        <ul>
          <li>Your access to, use of, or inability to access or use this website.</li>
          <li>
            Any reliance placed by you on the completeness, accuracy, or
            timeliness of any content or Insights published on the site.
          </li>
          <li>
            System failures, network interruptions, technical bugs, or
            unauthorized access to our servers.
          </li>
        </ul>
        <p>
          All website content is provided on an &quot;AS IS&quot; and
          &quot;AS AVAILABLE&quot; basis without warranties of any kind, whether
          express or implied.
        </p>
      </section>

      <section id="indemnification" aria-labelledby="terms-section-6">
        <h2 id="terms-section-6">6. Indemnification</h2>
        <p>
          You agree to indemnify, defend, and hold harmless Kelari, its
          executive leadership, employees, and affiliates from and against any
          claims, liabilities, damages, losses, or expenses (including
          reasonable legal fees) arising out of your violation of these Terms
          or misuse of this website.
        </p>
      </section>

      <section id="governing-law" aria-labelledby="terms-section-7">
        <h2 id="terms-section-7">7. Governing Law &amp; Jurisdiction</h2>
        <p>
          These Terms are governed by and construed in accordance with the laws
          of the operating jurisdiction of Kelari. Any disputes or legal
          proceedings arising out of or in connection with these Terms or
          website usage shall be subject to the exclusive jurisdiction of the
          competent courts in that region.
        </p>
      </section>

      <section id="modifications" aria-labelledby="terms-section-8">
        <h2 id="terms-section-8">8. Modifications to Terms</h2>
        <p>
          We reserve the right to revise, modify, or update these Terms and
          Conditions at any time without prior notice. Changes take effect
          immediately upon being posted to this page with an updated
          &quot;Last Updated&quot; date. Your continued use of the website
          following any changes signifies your acceptance of the revised
          Terms.
        </p>
      </section>

      <section id="contact-information" aria-labelledby="terms-section-9">
        <h2 id="terms-section-9">9. Contact Information</h2>
        <p>
          For questions, concerns, or legal inquiries regarding these Terms and
          Conditions, please contact us:
        </p>
        <address className="not-italic">
          Kelari Corporate Advisory<br />
          Attn: Office of the General Counsel<br />
          Email: <a href="mailto:legal@kelari.com">legal@kelari.com</a><br />
          Website:{' '}
          <a href="https://www.kelari.com">https://www.kelari.com</a>
        </address>
      </section>
    </LegalPageLayout>
  );
}
