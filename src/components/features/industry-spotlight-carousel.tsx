'use client';

import Link from 'next/link';
import { useState } from 'react';
import Reveal from '../motion/reveal';
import { industryClusters } from '../../lib/navigation';

const spotlightIndustries = industryClusters.flatMap((cluster) =>
  cluster.industries.map((industry) => ({
    ...industry,
    cluster: cluster.title,
  })),
);

export default function IndustrySpotlightCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const industry = spotlightIndustries[activeIndex];

  function showPrevious() {
    setActiveIndex((index) =>
      index === 0 ? spotlightIndustries.length - 1 : index - 1,
    );
  }

  function showNext() {
    setActiveIndex((index) => (index + 1) % spotlightIndustries.length);
  }

  return (
    <section
      className="industry-spotlight"
      aria-labelledby="industry-spotlight-heading"
      aria-roledescription="carousel"
    >
      <Reveal as="div" className="industry-spotlight-header" duration={0.48}>
        <div>
          <p className="eyebrow">Industry spotlight</p>
          <h2 id="industry-spotlight-heading">Insight for your sector</h2>
        </div>
        <div className="carousel-controls">
          <button
            type="button"
            aria-label="Show previous industry"
            onClick={showPrevious}
          >
            <span aria-hidden="true">←</span>
          </button>
          <button
            type="button"
            aria-label="Show next industry"
            onClick={showNext}
          >
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </Reveal>

      <article
        className="industry-spotlight-card"
        aria-live="polite"
        aria-atomic="true"
      >
        <div className="spotlight-index" aria-hidden="true">
          {String(activeIndex + 1).padStart(2, '0')}
        </div>
        <div className="spotlight-copy">
          <p className="spotlight-cluster">{industry.cluster}</p>
          <h3>{industry.title}</h3>
          <p>{industry.description}</p>
          <Link href={`/industries#${industry.id}`}>
            Explore this sector <span aria-hidden="true">→</span>
          </Link>
        </div>
        <p className="carousel-position">
          {activeIndex + 1} of {spotlightIndustries.length}
        </p>
      </article>
    </section>
  );
}
