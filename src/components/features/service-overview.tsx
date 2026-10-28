import SectionHeading from '../ui/section-heading';

type ServiceItem = {
  title: string;
  description?: string;
  href?: string;
};

type ServiceOverviewProps = {
  title?: string;
  items: ServiceItem[];
};

export default function ServiceOverview({ title = 'Our Services', items }: ServiceOverviewProps) {
  return (
    <section>
      <SectionHeading title={title} />
      <div>
        {items.map((item) => (
          <article key={item.title}>
            <h3>{item.title}</h3>
            {item.description ? <p>{item.description}</p> : null}
            {item.href ? <a href={item.href}>Learn more</a> : null}
          </article>
        ))}
      </div>
    </section>
  );
}
