import type { Metadata } from 'next';
import CTABanner from '../../components/features/cta-banner';
import EditorialAboutHero from '../../components/about/EditorialAboutHero';
import LeadershipGrid from '../../components/about/LeadershipGrid';
import MethodologyTimeline from '../../components/about/MethodologyTimeline';
import ScrollStoryManifesto from '../../components/about/ScrollStoryManifesto';

export const metadata: Metadata = {
  title: 'About Kelari Group',
  description:
    'Meet Kelari Group: an integrated advisory partner helping organizations make confident decisions through change.',
};

export default function AboutPage() {
  return (
    <main className="w-full overflow-x-clip">
      <EditorialAboutHero />
      <ScrollStoryManifesto />
      <MethodologyTimeline />
      <LeadershipGrid />
      <CTABanner
        title="Let's work on what matters"
        description="Tell us what your organization is working through."
        buttonLabel="Start a conversation"
      />
    </main>
  );
}
