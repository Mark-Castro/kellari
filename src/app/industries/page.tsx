import type { Metadata } from 'next';
import CTABanner from '../../components/features/cta-banner';
import Hero from '../../components/features/hero';
import Reveal from '../../components/motion/reveal';
import { industryClusters } from '../../lib/navigation';

export const metadata: Metadata = {
  title: 'Industries',
};

export default function IndustriesPage() {
  return (
    <main>
      <Hero
        eyebrow="Who we work with"
        title="Industries We Serve"
        description="We bring cross-sector experience and practical insight to the challenges organizations face across these connected sectors."
      />
      <div className="industry-clusters">
        {industryClusters.map((cluster, clusterIndex) => (
          <Reveal
            as="section"
            className="industry-cluster"
            id={cluster.id}
            key={cluster.id}
            aria-labelledby={`${cluster.id}-heading`}
            staggerIndex={clusterIndex}
          >
            <Reveal
              as="div"
              className="industry-cluster-heading"
              duration={0.48}
            >
              <p className="eyebrow">Industry cluster</p>
              <h2 id={`${cluster.id}-heading`}>{cluster.title}</h2>
              <p>{cluster.description}</p>
            </Reveal>
            <div className="industry-sector-grid">
              {cluster.industries.map((industry, index) => (
                <Reveal
                  as="article"
                  className="industry-sector-card"
                  id={industry.id}
                  key={industry.id}
                  staggerIndex={index}
                >
                  <h3>{industry.title}</h3>
                  <p>{industry.description}</p>
                </Reveal>
              ))}
            </div>
          </Reveal>
        ))}
      </div>
      <CTABanner title="Have a challenge in mind?" />
    </main>
  );
}
