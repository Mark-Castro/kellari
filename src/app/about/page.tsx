import type { Metadata } from 'next';
import CTABanner from '../../components/features/cta-banner';
import Hero from '../../components/features/hero';
import Reveal from '../../components/motion/reveal';

export const metadata: Metadata = {
  title: 'About',
};

export default function AboutPage() {
  return (
    <main>
      <Hero
        eyebrow="About Kellari"
        title="Progress starts with understanding."
        description="We bring thoughtful advice and practical partnership to the organizations shaping a better future."
        primaryAction={{ label: 'How we work', href: '#how-we-work' }}
        secondaryAction={{ label: 'Meet our leaders', href: '#leadership' }}
      />
      <section className="about-story" aria-labelledby="our-story-heading">
        <Reveal as="div" className="about-section-intro" duration={0.48}>
          <p className="eyebrow">Our story</p>
          <h2 id="our-story-heading">Built around meaningful progress.</h2>
        </Reveal>
        <div className="about-story-copy">
          <p>
            Kellari was created to help organizations make confident decisions
            through change. We bring strategy, people, finance, sustainability,
            and communications into one connected conversation.
          </p>
          <p>
            Our work begins by listening closely, understanding what matters to
            the people involved, and shaping a practical path from ambition to
            action.
          </p>
        </div>
      </section>
      <section
        className="how-we-work"
        id="how-we-work"
        aria-labelledby="how-we-work-heading"
      >
        <Reveal as="div" className="about-section-intro" duration={0.48}>
          <p className="eyebrow">How we work</p>
          <h2 id="how-we-work-heading">A clear path from question to action.</h2>
          <p>
            The right process depends on the challenge. Our approach keeps the
            work collaborative, focused, and useful at every step.
          </p>
        </Reveal>
        <ol className="method-steps">
          <Reveal as="li">
            <span className="method-step-number">01</span>
            <h3>Listen & understand</h3>
            <p>We learn your context, priorities, and what success means to you.</p>
          </Reveal>
          <Reveal as="li" staggerIndex={1}>
            <span className="method-step-number">02</span>
            <h3>Align on direction</h3>
            <p>We turn insight into a shared view of the challenge and opportunity.</p>
          </Reveal>
          <Reveal as="li" staggerIndex={2}>
            <span className="method-step-number">03</span>
            <h3>Shape the approach</h3>
            <p>We build a practical plan around your people, needs, and resources.</p>
          </Reveal>
          <Reveal as="li" staggerIndex={3}>
            <span className="method-step-number">04</span>
            <h3>Deliver & learn</h3>
            <p>We work alongside your team, track progress, and adapt as needed.</p>
          </Reveal>
        </ol>
      </section>
      <section
        className="leadership"
        id="leadership"
        aria-labelledby="leadership-heading"
      >
        <Reveal as="div" className="about-section-intro" duration={0.48}>
          <p className="eyebrow">Leadership</p>
          <h2 id="leadership-heading">People committed to your progress.</h2>
          <p>
            Meet the leaders who bring our work to life. Team biographies will
            be added as leadership profiles are finalized.
          </p>
        </Reveal>
        <div className="leadership-grid">
          {[1, 2, 3].map((profile) => (
            <Reveal
              as="article"
              className="leadership-card"
              key={profile}
              staggerIndex={profile - 1}
            >
              <div className="leadership-portrait" aria-hidden="true">
                K
              </div>
              <p className="eyebrow">Leadership team</p>
              <h3>Profile coming soon</h3>
              <p>Leadership biography and area of expertise will appear here.</p>
            </Reveal>
          ))}
        </div>
      </section>
      <CTABanner
        title="Let's work on what matters"
        description="Tell us what your organization is working through."
        buttonLabel="Start a conversation"
      />
    </main>
  );
}
