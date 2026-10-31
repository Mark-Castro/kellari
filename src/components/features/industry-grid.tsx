import SectionHeading from '../ui/section-heading';
import Reveal from '../motion/reveal';

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
    <section className="industry-grid">
      <Reveal duration={0.48}>
        <SectionHeading title={title} />
      </Reveal>
      <div>
        {items.map((item, index) => (
          <Reveal
            as="article"
            className="industry-grid-card"
            interactive
            key={item.title}
            staggerIndex={index}
          >
            <h3>{item.title}</h3>
            {item.description ? <p>{item.description}</p> : null}
            {item.href ? <a href={item.href}>Explore</a> : null}
          </Reveal>
        ))}
      </div>
    </section>
  );
}
