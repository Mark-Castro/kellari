import type { Metadata } from 'next';
import StrategyPracticeExperience from '../../../components/services/StrategyPracticeExperience';
import servicePageCopy from '../../../lib/service-page-copy.json';
import { serviceCategories } from '../../../lib/navigation';

export const metadata: Metadata = {
  title: 'Strategy & Digital Transformation | Kelari Group',
  description:
    'Strategy, organizational and digital advisory, including AI, data analytics and cybersecurity, to help you lead change.',
};

const categoryContent = servicePageCopy.categories[0];
const categoryServices = serviceCategories[0].services;
const services = categoryContent.servicesInDetail.map((service) => ({
  ...service,
  description:
    categoryServices.find((categoryService) => categoryService.title === service.title)
      ?.description ?? '',
}));

export default function StrategyPeopleDigitalPage() {
  return (
    <StrategyPracticeExperience
      services={services}
      fit={categoryContent.fit}
      whyItMatters={categoryContent.whyItMatters}
      waysToWork={categoryContent.waysToWork}
      faqs={categoryContent.faqs}
    />
  );
}
