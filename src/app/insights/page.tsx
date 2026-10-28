import type { Metadata } from 'next';
import Hero from '../../components/features/hero';
import Card from '../../components/ui/card';

export const metadata: Metadata = {
  title: 'Insights',
};

export default function InsightsPage() {
  return (
    <main>
      <Hero
        eyebrow="Ideas and perspectives"
        title="Insights & Articles"
        description="Perspectives to help you make sense of change and identify new opportunities."
      />
      <section>
        <h2>Latest insights</h2>
        <div>
          <Card
            title="Ideas for what comes next"
            description="Our latest perspectives and updates will be featured here."
            actionLabel="Explore insights"
            actionHref="/insights"
          />
        </div>
      </section>
    </main>
  );
}
