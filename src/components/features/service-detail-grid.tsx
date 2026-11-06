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
        <h2 id="service-detail-heading">Our services</h2>
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
            <Link
              className="service-detail-link"
              href={getServiceHref(service.title)}
            >
              Learn more
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
import Link from 'next/link';
import Reveal from '../motion/reveal';
import { getServiceHref } from '../../lib/navigation';
