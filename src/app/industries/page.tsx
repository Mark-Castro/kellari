import type { Metadata } from 'next';
import CTABanner from '../../components/features/cta-banner';
import IndustryClusterSection, {
  type IndustryCluster,
} from '../../components/industries/IndustryClusterSection';
import IndustryHero from '../../components/industries/IndustryHero';
import IndustryOverview from '../../components/industries/IndustryOverview';
import {
  industryClosingCopy,
  industryContent,
  industryIntroduction,
} from '../../lib/industry-content';
import { industryClusters } from '../../lib/navigation';

export const metadata: Metadata = {
  title: 'Industries We Serve | KELARI GROUP LLC',
  description:
    'KELARI GROUP LLC supports financial services, healthcare, government, energy, real estate, consumer, technology and growth-stage businesses.',
};

export default function IndustriesPage() {
  const clusters: IndustryCluster[] = industryClusters.map((cluster) => ({
    ...cluster,
    industries: cluster.industries.map((industry) => ({
      ...industry,
      description:
        industryContent.find((entry) => entry.id === industry.id)
          ?.description ?? industry.description,
    })),
  }));

  return (
    <main className="w-full overflow-x-clip">
      <IndustryHero />
      <div className="mx-auto w-full max-w-7xl overflow-x-clip px-4 sm:px-6 lg:px-8">
        <IndustryOverview
          clusters={clusters}
          introduction={industryIntroduction}
        />
        <div className="w-full min-w-0">
          {clusters.map((cluster, index) => (
            <IndustryClusterSection
              key={cluster.id}
              cluster={cluster}
              index={index}
            />
          ))}
        </div>
      </div>
      <CTABanner
        title="Don’t see your industry?"
        description={industryClosingCopy}
        buttonLabel="Request a consultation"
      />
    </main>
  );
}
