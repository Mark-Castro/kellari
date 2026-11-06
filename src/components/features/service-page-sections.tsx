import Reveal from '../motion/reveal';

type ServiceOverviewCopyProps = {
  paragraphs: readonly string[];
};

export function ServiceOverviewCopy({
  paragraphs,
}: ServiceOverviewCopyProps) {
  return (
    <section className="service-page-overview" aria-label="Overview">
      {paragraphs.map((paragraph, index) => (
        <Reveal key={paragraph} duration={0.48} staggerIndex={index}>
          <p>{paragraph}</p>
        </Reveal>
      ))}
    </section>
  );
}

type ServiceCapabilityListProps = {
  items: readonly string[];
};

export function ServiceCapabilityList({
  items,
}: ServiceCapabilityListProps) {
  return (
    <section className="service-capabilities" aria-labelledby="service-capabilities-heading">
      <Reveal duration={0.48}>
        <h2 id="service-capabilities-heading">How we help</h2>
      </Reveal>
      <ul>
        {items.map((item, index) => (
          <Reveal as="li" key={item} duration={0.48} staggerIndex={index}>
            {item}
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
