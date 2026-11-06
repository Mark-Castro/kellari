import type { Core } from '@strapi/strapi';

const publicActions = [
  'api::career.career.find',
  'api::career.career.findOne',
  'api::insight.insight.find',
  'api::insight.insight.findOne',
  'api::application-submission.application-submission.create',
];

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    const publicRole = await strapi.db
      .query('plugin::users-permissions.role')
      .findOne({ where: { type: 'public' }, populate: ['permissions'] });

    if (!publicRole) {
      throw new Error('Unable to grant public API access: Public role not found.');
    }

    const existingActions = new Set(
      publicRole.permissions.map(
        (permission: { action: string }) => permission.action,
      ),
    );
    const missingActions = publicActions.filter(
      (action) => !existingActions.has(action),
    );

    await Promise.all(
      missingActions.map((action) =>
        strapi.db
          .query('plugin::users-permissions.permission')
          .create({ data: { action, role: publicRole.id } }),
      ),
    );
  },
};
