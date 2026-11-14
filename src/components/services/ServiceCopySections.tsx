import Link from 'next/link';
import servicePageCopy from '../../lib/service-page-copy.json';
import { getServiceHref } from '../../lib/navigation';

type PracticeAreaCopy = (typeof servicePageCopy.categories)[number];
type ServiceDetailCopy =
  (typeof servicePageCopy.details)[keyof typeof servicePageCopy.details];

export function PracticeAreaCopySections({
  content,
}: {
  content: PracticeAreaCopy;
}) {
  return (
    <>
      <section
        className="service-copy-section"
        aria-labelledby="why-it-matters-heading"
      >
        <div className="service-copy-intro">
          <p className="eyebrow">Why it matters now</p>
          <h2 id="why-it-matters-heading">Why it matters now</h2>
        </div>
        <div className="service-copy-grid">
          {content.whyItMatters.map((item, index) => (
            <article className="service-copy-card" key={item}>
              <span className="service-copy-number" aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>
              <p>{item}</p>
            </article>
          ))}
        </div>
      </section>

      <section
        className="service-copy-section service-copy-fit"
        aria-labelledby="practice-fit-heading"
      >
        <div className="service-copy-intro">
          <p className="eyebrow">Is this right for you?</p>
          <h2 id="practice-fit-heading">When this practice area can help</h2>
        </div>
        <ul className="service-copy-list">
          {content.fit.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section
        className="service-copy-section"
        aria-labelledby="services-in-detail-heading"
      >
        <div className="service-copy-intro">
          <p className="eyebrow">Explore more</p>
          <h2 id="services-in-detail-heading">Our services in detail</h2>
        </div>
        <div className="service-copy-detail-grid">
          {content.servicesInDetail.map((service) => (
            <article className="service-copy-detail" key={service.title}>
              <h3>
                <Link href={getServiceHref(service.title)}>{service.title}</Link>
              </h3>
              {service.overview.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              <h4>What we offer</h4>
              <dl className="service-copy-offerings">
                {service.offerings.map((offer) => (
                  <div key={offer.title}>
                    <dt>{offer.title}</dt>
                    <dd>{offer.description}</dd>
                  </div>
                ))}
              </dl>
              <p className="service-copy-audience">
                <strong>Ideal for:</strong> {service.audience}
              </p>
              <Link
                className="service-copy-link"
                href={getServiceHref(service.title)}
              >
                Explore this service <span aria-hidden="true">→</span>
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section
        className="service-copy-section service-copy-ways"
        aria-labelledby="ways-to-work-heading"
      >
        <div className="service-copy-intro">
          <p className="eyebrow">Working together</p>
          <h2 id="ways-to-work-heading">Ways to work with us</h2>
        </div>
        <div className="service-copy-grid">
          {content.waysToWork.map((option) => (
            <article className="service-copy-card" key={option.title}>
              <h3>{option.title}</h3>
              <p>{option.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section
        className="service-copy-section service-copy-faq"
        aria-labelledby="practice-faq-heading"
      >
        <div className="service-copy-intro">
          <p className="eyebrow">Common questions</p>
          <h2 id="practice-faq-heading">Frequently asked questions</h2>
        </div>
        <div className="service-copy-faq-list">
          {content.faqs.map((faq) => (
            <details key={faq.question}>
              <summary>{faq.question}</summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}

export function ServiceDetailCopySections({
  content,
}: {
  content: ServiceDetailCopy;
}) {
  return (
    <>
      <section className="service-page-overview" aria-label="Overview">
        {content.overview.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </section>

      <section
        className="service-copy-section service-copy-fit"
        aria-labelledby="service-challenges-heading"
      >
        <div className="service-copy-intro">
          <p className="eyebrow">The challenge</p>
          <h2 id="service-challenges-heading">Challenges we help you solve</h2>
        </div>
        <ul className="service-copy-list">
          {content.challenges.map((challenge) => (
            <li key={challenge}>{challenge}</li>
          ))}
        </ul>
      </section>

      <section
        className="service-copy-section"
        aria-labelledby="service-offerings-heading"
      >
        <div className="service-copy-intro">
          <p className="eyebrow">Our approach</p>
          <h2 id="service-offerings-heading">What we offer</h2>
        </div>
        <dl className="service-copy-offerings service-copy-offerings-grid">
          {content.offerings.map((offer) => (
            <div className="service-copy-card" key={offer.title}>
              <dt>{offer.title}</dt>
              <dd>{offer.description}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section
        className="service-copy-section service-copy-fit"
        aria-labelledby="service-outcomes-heading"
      >
        <div className="service-copy-intro">
          <p className="eyebrow">The outcome</p>
          <h2 id="service-outcomes-heading">What you can expect</h2>
        </div>
        <ul className="service-copy-list">
          {content.expectations.map((expectation) => (
            <li key={expectation}>{expectation}</li>
          ))}
        </ul>
      </section>

      <section
        className="service-copy-audience-section"
        aria-labelledby="service-audience-heading"
      >
        <p className="eyebrow">Who we serve</p>
        <h2 id="service-audience-heading">Built around your needs</h2>
        <p>{content.audience}</p>
      </section>

      <section
        className="service-copy-related"
        aria-labelledby="related-services-heading"
      >
        <h2 id="related-services-heading">Related services</h2>
        <ul>
          {content.relatedServices.map((service) => (
            <li key={service}>
              <Link href={getServiceHref(service)}>{service}</Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
