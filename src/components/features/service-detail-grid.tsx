type ServiceDetail = {
  title: string;
  description: string;
};

type ServiceDetailGridProps = {
  items: readonly ServiceDetail[];
};

export default function ServiceDetailGrid({ items }: ServiceDetailGridProps) {
  return (
    <section className="service-detail-section" aria-labelledby="service-detail-heading">
      <Reveal className="service-detail-intro" duration={0.48}>
        <p className="eyebrow">Our capabilities</p>
        <h2 id="service-detail-heading">How we can help</h2>
        <p>
          Explore the capabilities in this area. We shape each engagement around
          your organization’s needs and context.
        </p>
      </Reveal>
      <div className="service-detail-grid">
        {items.map((service, index) => (
          <Reveal
            as="article"
            className="service-detail-card"
            interactive
            key={service.title}
            staggerIndex={index}
          >
            <span className="service-detail-number" aria-hidden="true">
              {String(index + 1).padStart(2, '0')}
            </span>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
import Reveal from '../motion/reveal';
