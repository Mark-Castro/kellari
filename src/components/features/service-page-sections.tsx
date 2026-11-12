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
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, index) => (
          <Reveal
            as="li"
            key={item}
            className="list-none rounded-xl border border-slate-200 bg-white p-5 leading-7 text-slate-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300"
            duration={0.48}
            staggerIndex={index}
          >
            <span className="mb-3 grid h-8 w-8 place-items-center rounded-full bg-emerald-100 font-semibold text-emerald-900 dark:bg-[#74c8b3]/15 dark:text-[#74c8b3]">
              {String(index + 1).padStart(2, '0')}
            </span>
            {item}
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
