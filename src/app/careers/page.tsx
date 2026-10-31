import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import CTABanner from '../../components/features/cta-banner';
import Hero from '../../components/features/hero';
import {
  getCareers,
  type StrapiCareer,
  type StrapiCareerBlock,
  type StrapiCareerInline,
  type StrapiCareerListBlock,
} from '../../lib/strapi';

export const metadata: Metadata = {
  title: 'Careers',
};

function renderCareerInline(node: StrapiCareerInline, key: string): ReactNode {
  if (node.type === 'link') {
    const children = node.children.map((child, index) =>
      renderCareerInline(child, `${key}-${index}`),
    );
    const isSafeUrl =
      node.url.startsWith('/') ||
      node.url.startsWith('https://') ||
      node.url.startsWith('http://') ||
      node.url.startsWith('mailto:');

    return isSafeUrl ? (
      <a key={key} href={node.url}>
        {children}
      </a>
    ) : (
      <span key={key}>{children}</span>
    );
  }

  let content: ReactNode = node.text;
  if (node.code) content = <code>{content}</code>;
  if (node.strikethrough) content = <s>{content}</s>;
  if (node.underline) content = <u>{content}</u>;
  if (node.italic) content = <em>{content}</em>;
  if (node.bold) content = <strong>{content}</strong>;

  return <span key={key}>{content}</span>;
}

function renderCareerList(block: StrapiCareerListBlock, key: string): ReactNode {
  const List = block.format === 'ordered' ? 'ol' : 'ul';

  return (
    <List key={key}>
      {block.children.map((child, index) =>
        child.type === 'list' ? (
          <li key={`${key}-${index}`}>
            {renderCareerList(child, `${key}-${index}`)}
          </li>
        ) : (
          <li key={`${key}-${index}`}>
            {child.children.map((inline, inlineIndex) =>
              renderCareerInline(inline, `${key}-${index}-${inlineIndex}`),
            )}
          </li>
        ),
      )}
    </List>
  );
}

function renderCareerBlock(block: StrapiCareerBlock, index: number): ReactNode {
  const key = `career-content-${index}`;
  if (block.type === 'list') return renderCareerList(block, key);

  const children = block.children.map((child, childIndex) =>
    renderCareerInline(child, `${key}-${childIndex}`),
  );

  if (block.type === 'heading') {
    switch (block.level) {
      case 1:
      case 2:
        return <h2 key={key}>{children}</h2>;
      case 3:
        return <h3 key={key}>{children}</h3>;
      case 4:
        return <h4 key={key}>{children}</h4>;
      case 5:
        return <h5 key={key}>{children}</h5>;
      case 6:
        return <h6 key={key}>{children}</h6>;
    }
  }
  if (block.type === 'quote') return <blockquote key={key}>{children}</blockquote>;
  if (block.type === 'code') return <pre key={key}>{children}</pre>;

  return <p key={key}>{children}</p>;
}

function CareerDescription({ career }: { career: StrapiCareer }) {
  return (
    <div className="career-description">
      {career.description.map(renderCareerBlock)}
    </div>
  );
}

export default async function CareersPage() {
  const careersResult = await getCareers().then(
    (careers) => ({ careers, unavailable: false }),
    (error: unknown) => {
      console.error('Unable to load Careers from Strapi:', error);
      return { careers: [], unavailable: true };
    },
  );

  return (
    <main>
      <Hero
        eyebrow="Careers at Kellari"
        title="Bring your perspective. Build what matters."
        description="Join a thoughtful, collaborative team helping organizations navigate change and create lasting value."
        primaryAction={{ label: 'Explore opportunities', href: '#open-roles' }}
        secondaryAction={{ label: 'Get in touch', href: '/contact' }}
      />
      <section className="careers-culture" aria-labelledby="careers-culture-heading">
        <div className="about-section-intro">
          <p className="eyebrow">Our culture</p>
          <h2 id="careers-culture-heading">Good work starts with good people.</h2>
        </div>
        <div className="careers-culture-copy">
          <p>
            We value curiosity, thoughtful collaboration, and clear communication.
            Our work brings different disciplines together, making room for people
            to contribute their strengths while learning from one another.
          </p>
          <ul className="culture-values">
            <li><strong>Purposeful</strong><span>Focus on work that creates practical, lasting value.</span></li>
            <li><strong>Collaborative</strong><span>Share perspectives and build better answers together.</span></li>
            <li><strong>Always learning</strong><span>Stay curious, reflective, and open to new ideas.</span></li>
          </ul>
        </div>
      </section>
      <section className="work-paths" aria-labelledby="work-paths-heading">
        <div className="about-section-intro">
          <p className="eyebrow">Ways to work with us</p>
          <h2 id="work-paths-heading">Find the right path.</h2>
          <p>
            We welcome both people looking to grow with a team and independent
            specialists who want to contribute to meaningful projects.
          </p>
        </div>
        <div className="work-path-grid">
          <article className="work-path-card">
            <span className="work-path-index" aria-hidden="true">01</span>
            <h3>As an employee</h3>
            <p>
              Build a long-term career, grow your expertise, and collaborate
              across our service areas.
            </p>
            <a href="/contact?interest=employee">Introduce yourself <span aria-hidden="true">→</span></a>
          </article>
          <article className="work-path-card">
            <span className="work-path-index" aria-hidden="true">02</span>
            <h3>As a contractor</h3>
            <p>
              Bring specialized experience to projects where your perspective
              can make a difference.
            </p>
            <a href="/contact?interest=contractor">Share your expertise <span aria-hidden="true">→</span></a>
          </article>
        </div>
      </section>
      <section
        className="open-roles"
        id="open-roles"
        aria-labelledby="open-roles-heading"
      >
        <div className="about-section-intro">
          <p className="eyebrow">Opportunities</p>
          <h2 id="open-roles-heading">Open roles</h2>
        </div>
        {careersResult.unavailable ? (
          <p role="status">
            Current opportunities are temporarily unavailable. Please try again
            later or contact us about joining the team.
          </p>
        ) : careersResult.careers.length > 0 ? (
          <div className="open-roles-list">
            {careersResult.careers.map((career) => (
              <article
                className="open-roles-panel"
                key={career.documentId ?? career.id}
              >
                <div>
                  <p className="eyebrow">
                    {career.department} · {career.employmentType}
                  </p>
                  <h3>{career.title}</h3>
                  <p>{career.location}</p>
                  <CareerDescription career={career} />
                </div>
                <a
                  className="button"
                  href={`/contact?interest=career&role=${encodeURIComponent(career.title)}`}
                >
                  Apply / get in touch
                </a>
              </article>
            ))}
          </div>
        ) : (
          <div className="open-roles-panel">
            <div>
              <h3>We’re building our team.</h3>
              <p>
                There are no current openings. If you see a fit with the work we
                do, we’d still like to hear from you.
              </p>
            </div>
            <a className="button" href="/contact?interest=career">
              Introduce yourself
            </a>
          </div>
        )}
      </section>
      <CTABanner
        title="Interested in working with Kellari?"
        description="Tell us how you would like to contribute."
        buttonLabel="Get in touch"
      />
    </main>
  );
}
