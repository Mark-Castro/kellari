import SectionHeading from '../ui/section-heading';

type IndustryItem = {
  title: string;
  description?: string;
  href?: string;
};

type IndustryGridProps = {
  title?: string;
  items: IndustryItem[];
};

export default function IndustryGrid({ title = 'Industries', items }: IndustryGridProps) {
  return (
    <section>
      <SectionHeading title={title} />
      <div>
        {items.map((item) => (
          <article key={item.title}>
            <h3>{item.title}</h3>
            {item.description ? <p>{item.description}</p> : null}
            {item.href ? <a href={item.href}>Explore</a> : null}
          </article>
        ))}
      </div>
    </section>
  );
}
