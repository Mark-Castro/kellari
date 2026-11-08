import type { Metadata } from 'next';
import CTABanner from '../../components/features/cta-banner';
import Hero from '../../components/features/hero';
import ServiceOverview from '../../components/features/service-overview';
import {
  getServiceHref,
  serviceCategories,
} from '../../lib/navigation';

export const metadata: Metadata = {
  title: 'Services',
};

export default function ServicesPage() {
  return (
    <main>
      <Hero
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services' },
        ]}
        eyebrow="Services"
        title="Services built around your priorities"
        description="Nineteen specialist services across four practice areas, delivered independently or as one coordinated engagement."
        primaryAction={{ label: 'Speak with an advisor', href: '/contact' }}
      />
      <section className="service-page-overview" aria-label="Introduction">
        <p>
          The challenges organizations face rarely sit in one discipline. A
          growth plan depends on sound finances; a digital transformation needs
          the right people; a sustainability strategy must be communicated with
          credibility.
        </p>
        <p>
          KELARI GROUP LLC brings these disciplines together. Our specialists work
          across practice areas so you receive joined-up advice and a single
          point of accountability.
        </p>
      </section>
      <ServiceOverview
        title="Practice areas"
        items={serviceCategories.map((category) => ({
          title: category.shortTitle,
          description: category.description,
          href: category.href,
          itemCount: category.services.length,
          serviceHighlights: category.services.map((service) => ({
            title: service.title,
            href: getServiceHref(service.title),
          })),
        }))}
      />
      <section className="services-approach">
        <div>
          <p className="eyebrow">How we work</p>
          <h2>A clear, collaborative approach</h2>
        </div>
        <ol className="services-steps">
          <li>
            <h3>Understand</h3>
            <p>We start with your objectives, context, and constraints.</p>
          </li>
          <li>
            <h3>Assess</h3>
            <p>
              We analyze where you are today and identify the opportunities and
              risks.
            </p>
          </li>
          <li>
            <h3>Recommend</h3>
            <p>
              We set out clear, practical options, with the reasoning behind
              each.
            </p>
          </li>
          <li>
            <h3>Deliver</h3>
            <p>
              We support implementation and measure results against agreed
              goals.
            </p>
          </li>
        </ol>
      </section>
      <section className="services-approach services-integrated">
        <div>
          <p className="eyebrow">Integrated solutions</p>
          <h2>Connected expertise, coordinated around you</h2>
        </div>
        <p>
          Many clients engage more than one practice area. For example, a
          growing business may combine SME & Growth Advisory with Bookkeeping &
          Financial Reporting Support and Digital Marketing, all coordinated by
          one KELARI GROUP LLC lead.
        </p>
      </section>
      <CTABanner
        title="Not sure where to start?"
        description="Tell us about your challenge, and we will connect you with the right specialists."
        buttonLabel="Request a consultation"
      />
    </main>
  );
}
