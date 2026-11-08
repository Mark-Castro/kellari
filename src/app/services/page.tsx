import type { Metadata } from 'next';
import CTABanner from '../../components/features/cta-banner';
import PracticeAreasGrid from '../../components/services/PracticeAreasGrid';
import ProcessSection from '../../components/services/ProcessSection';
import ServicesHero from '../../components/services/ServicesHero';
import {
  getServiceHref,
  serviceCategories,
} from '../../lib/navigation';

export const metadata: Metadata = {
  title: 'Services | Kelari Group',
  description:
    'Explore Kelari Group’s 19 advisory services across strategy, finance and tax, sustainability, and marketing and communications.',
};

export default function ServicesPage() {
  return (
    <main>
      <ServicesHero />
      <section className="service-page-overview" aria-label="Introduction">
        <p>
          The challenges organizations face rarely sit in one discipline. A
          growth plan depends on sound finances; a digital transformation needs
          the right people; a sustainability strategy must be communicated with
          credibility.
        </p>
        <p>
          Kelari Group brings these disciplines together. Our specialists work
          across practice areas so you receive joined-up advice and a single
          point of accountability.
        </p>
      </section>
      <PracticeAreasGrid
        areas={serviceCategories.map((category) => ({
          title: category.title,
          description: category.description,
          href: category.href,
          services: category.services.map((service) => ({
            title: service.title,
            href: getServiceHref(service.title),
          })),
        }))}
      />
      <ProcessSection />
      <section className="services-approach services-integrated">
        <div>
          <p className="eyebrow">Integrated solutions</p>
          <h2>Connected expertise, coordinated around you</h2>
        </div>
        <p>
          Many clients engage more than one practice area. For example, a
          growing business may combine SME & Growth Advisory with Bookkeeping &
          Financial Reporting Support and Digital Marketing, all coordinated by
          one Kelari Group lead.
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
