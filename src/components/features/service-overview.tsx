import SectionHeading from '../ui/section-heading';
import Reveal from '../motion/reveal';

type ServiceItem = {
  title: string;
  description?: string;
  href?: string;
  itemCount?: number;
  serviceHighlights?: readonly string[];
};

type ServiceOverviewProps = {
  title?: string;
  items: ServiceItem[];
};

export default function ServiceOverview({ title = 'Our Services', items }: ServiceOverviewProps) {
  return (
    <section className="service-overview">
      <Reveal duration={0.48}>
        <SectionHeading title={title} />
      </Reveal>
      <div>
        {items.map((item, index) => (
          <Reveal
            as="article"
            className="service-overview-card"
            interactive
            key={item.title}
            staggerIndex={index}
          >
            <h3>{item.title}</h3>
            {item.description ? <p>{item.description}</p> : null}
            {item.itemCount !== undefined ? (
              <p className="service-count">
                {item.itemCount} areas of expertise
              </p>
            ) : null}
            {item.serviceHighlights ? (
              <ul className="service-highlights">
                {item.serviceHighlights.map((service) => (
                  <li key={service}>{service}</li>
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
