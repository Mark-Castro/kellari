import { factories } from '@strapi/strapi';

export default factories.createCoreRouter(
  'api::application-submission.application-submission',
  {
    config: {
      create: {
        policies: ['global::validate-application-resume'],
      },
    },
  },
);
