import type { Metadata } from 'next';
import PracticeAreaExperience from '../../../components/services/PracticeAreaExperience';
import servicePageCopy from '../../../lib/service-page-copy.json';
import { serviceCategories } from '../../../lib/navigation';

export const metadata: Metadata = {
  title: 'Marketing & Communications | Kelari Group',
  description:
    'Brand, web, PR, digital marketing and research services to strengthen your reputation and reach your audience.',
};

const category = servicePageCopy.categories[3];

export default function CreativeMarketingCommunicationsPage() {
  return (
    <PracticeAreaExperience
      practiceTitle={serviceCategories[3].shortTitle}
      heroTitle="Build a brand people trust."
      heroDescription="Design, digital and communications expertise to strengthen your reputation and reach the audiences that matter."
      thesis="A clear brand, useful digital experiences and consistent communication turn attention into trust. Connect your story to the people you need to reach."
      pillars={[
        {
          title: 'Distinctive Brand',
          description:
            'Build a credible identity and clear positioning that help your organization stand apart.',
        },
        {
          title: 'Useful Digital Experiences',
          description:
            'Make it easier for customers and partners to discover, understand and engage with your offer.',
        },
        {
          title: 'Measurable Communication',
          description:
            'Reach the right audiences with focused campaigns, relevant content and insight-led decisions.',
        },
      ]}
      services={category.servicesInDetail}
      fit={category.fit}
      capabilities={[
        'Brand strategy and visual identity',
        'Website design, development and user experience',
        'Media relations and reputation management',
        'Campaign planning, execution and reporting',
        'Market and consumer research',
      ]}
      whyItMatters={category.whyItMatters}
      waysToWork={category.waysToWork}
      faqs={category.faqs}
      ctaHeading={category.ctaHeading}
      ctaText={category.ctaText}
    />
  );
}
