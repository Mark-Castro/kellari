import type { Metadata } from 'next';
import CTABanner from '../../components/features/cta-banner';
import Hero from '../../components/features/hero';
import ServiceOverview from '../../components/features/service-overview';
import { serviceCategories } from '../../lib/navigation';

export const metadata: Metadata = {
  title: 'Services',
};

export default function ServicesPage() {
  return (
    <main>
      <Hero
        eyebrow="What we do"
        title="Expertise for what comes next."
        description="Four connected pillars bring practical expertise to the opportunities and challenges organizations face."
        primaryAction={{ label: 'Talk to our team', href: '/contact' }}
        secondaryAction={{ label: 'Explore our approach', href: '/about#how-we-work' }}
      />
      <ServiceOverview
        title="Our four service pillars"
        items={serviceCategories.map((category) => ({
          title: category.shortTitle,
          description: category.description,
          href: category.href,
          itemCount: category.services.length,
          serviceHighlights: category.services.map((service) => service.title),
        }))}
      />
      <section className="services-approach">
        <div>
          <p className="eyebrow">Connected expertise</p>
          <h2>One partner. The right perspective.</h2>
        </div>
        <p>
          Many organizational challenges cross traditional boundaries. We
          bring the right mix of strategy, financial, sustainability, and
          communications expertise together around your priorities.
        </p>
      </section>
      <CTABanner
        title="Find the right support for your next step"
        description="Tell us where you want to go. We’ll help you explore a practical way forward."
        buttonLabel="Start a conversation"
      />
    </main>
  );
}
