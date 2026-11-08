import SectionHeading from '../ui/section-heading';
import Reveal, { type RevealVariant } from '../motion/reveal';
import Link from 'next/link';

type ServiceItem = {
  title: string;
  description?: string;
  href?: string;
  itemCount?: number;
  serviceHighlights?: readonly {
    title: string;
    href: string;
  }[];
};

type ServiceOverviewProps = {
  title?: string;
  description?: string;
  items: ServiceItem[];
  revealVariant?: RevealVariant;
};

export default function ServiceOverview({
  title = 'Our Services',
  description,
  items,
  revealVariant,
}: ServiceOverviewProps) {
  return (
    <section className="service-overview">
      <Reveal duration={0.48} variant={revealVariant}>
        <SectionHeading title={title} description={description} />
      </Reveal>
      <div>
        {items.map((item, index) => (
          <Reveal
            as="article"
            className="service-overview-card"
            interactive
            key={item.title}
            staggerIndex={index}
            variant={revealVariant}
          >
            <h3>{item.title}</h3>
            {item.description ? <p>{item.description}</p> : null}
            {item.itemCount !== undefined ? (
              <p className="service-count">
                {item.itemCount} services
              </p>
            ) : null}
            {item.serviceHighlights ? (
              <ul className="service-highlights">
                {item.serviceHighlights.map((service) => (
                  <li key={service.title}>
                    <Link href={service.href}>{service.title}</Link>
                  </li>
                ))}
              </ul>
            ) : null}
            {item.href ? <a href={item.href}>Learn more</a> : null}
          </Reveal>
        ))}
      </div>
    </section>
  );
}
