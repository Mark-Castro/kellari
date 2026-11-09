import type { Metadata } from 'next';
import CTABanner from '../../components/features/cta-banner';
import Hero from '../../components/features/hero';
import JobList from '../../components/careers/JobList';
import { getCareers } from '../../lib/strapi';

export const metadata: Metadata = {
  title: 'Careers',
};

export default async function CareersPage() {
  const careersResult = await getCareers().then(
    (careers) => ({ careers, unavailable: false }),
    (error: unknown) => {
      console.error('Unable to load Careers from Strapi:', error);
      return { careers: [], unavailable: true };
    },
  );

  return (
    <main>
      <Hero
        eyebrow="Careers at Kelari Group"
        title="Bring your perspective. Build what matters."
        description="Join a thoughtful, collaborative team helping organizations navigate change and create lasting value."
        primaryAction={{ label: 'Explore opportunities', href: '#open-roles' }}
        secondaryAction={{ label: 'Get in touch', href: '/contact' }}
      />
      <section className="careers-culture" aria-labelledby="careers-culture-heading">
        <div className="about-section-intro">
          <p className="eyebrow">Our culture</p>
          <h2 id="careers-culture-heading">Good work starts with good people.</h2>
        </div>
        <div className="careers-culture-copy">
          <p>
            We value curiosity, thoughtful collaboration, and clear communication.
            Our work brings different disciplines together, making room for people
            to contribute their strengths while learning from one another.
          </p>
          <ul className="culture-values">
            <li><strong>Purposeful</strong><span>Focus on work that creates practical, lasting value.</span></li>
            <li><strong>Collaborative</strong><span>Share perspectives and build better answers together.</span></li>
            <li><strong>Always learning</strong><span>Stay curious, reflective, and open to new ideas.</span></li>
          </ul>
        </div>
      </section>
      <section className="work-paths" aria-labelledby="work-paths-heading">
        <div className="about-section-intro">
          <p className="eyebrow">Ways to work with us</p>
          <h2 id="work-paths-heading">Find the right path.</h2>
          <p>
            We welcome both people looking to grow with a team and independent
            specialists who want to contribute to meaningful projects.
          </p>
        </div>
        <div className="work-path-grid">
          <article className="work-path-card">
            <span className="work-path-index" aria-hidden="true">01</span>
            <h3>As an employee</h3>
            <p>
              Build a long-term career, grow your expertise, and collaborate
              across our service areas.
            </p>
            <a href="/contact?interest=employee">Introduce yourself <span aria-hidden="true">→</span></a>
          </article>
          <article className="work-path-card">
            <span className="work-path-index" aria-hidden="true">02</span>
            <h3>As a contractor</h3>
            <p>
              Bring specialized experience to projects where your perspective
              can make a difference.
            </p>
            <a href="/contact?interest=contractor">Share your expertise <span aria-hidden="true">→</span></a>
          </article>
        </div>
      </section>
      <section
        className="open-roles"
        id="open-roles"
        aria-labelledby="open-roles-heading"
      >
        <div className="about-section-intro">
          <p className="eyebrow">Opportunities</p>
          <h2 id="open-roles-heading">Open roles</h2>
        </div>
        {careersResult.unavailable ? (
          <p role="status">
            Current opportunities are temporarily unavailable. Please try again
            later or contact us about joining the team.
          </p>
        ) : careersResult.careers.length > 0 ? (
          <JobList careers={careersResult.careers} />
        ) : (
          <div className="open-roles-panel">
            <div>
              <h3>We’re building our team.</h3>
              <p>
                There are no current openings. If you see a fit with the work we
                do, we’d still like to hear from you.
              </p>
            </div>
            <a className="button" href="/contact?interest=career">
              Introduce yourself
            </a>
          </div>
        )}
      </section>
      <CTABanner
        title="Interested in working with Kelari Group?"
        description="Tell us how you would like to contribute."
        buttonLabel="Get in touch"
      />
    </main>
  );
}
