# 🚀 Getting started with Strapi

## Kellari content APIs

This Strapi project provides the `Insight` collection type at `/api/insights`
and the `Career / Opening` collection type at `/api/careers`. Insights have a
title, slug, rich-text content, and optional cover image, publication date,
author, category, and reading time. Careers have a title, department, location,
employment type, and rich-text description. Draft entries are not returned by
the Content API.

The Next.js app reads this API on the server. Set `STRAPI_URL` in the
frontend's `.env.local` (normally `http://localhost:1337`). For private access,
create a **Read-only** API token in Strapi and set it as `STRAPI_API_TOKEN` in
that same file. Never expose it with a `NEXT_PUBLIC_` prefix.

To let the public website read published entries without a token, open
**Settings → Users & Permissions Plugin → Roles → Public**, enable only the
`find` and `findOne` permissions for the content types the website needs, and
save. Verify `http://localhost:1337/api/insights` and
`http://localhost:1337/api/careers` return JSON. The frontend refreshes cached
Insights data once per minute.

Run Strapi with Node.js 22.19.0 or newer; `.nvmrc` pins 22.19.0 for local
development. After the server is ready, create an administrator and manage
Insights and Careers entries in the Content Manager. Publish entries to make
them available through the Content API.

Strapi comes with a full featured [Command Line Interface](https://docs.strapi.io/dev-docs/cli) (CLI) which lets you scaffold and manage your project in seconds.

### `develop`

Start your Strapi application with autoReload enabled. [Learn more](https://docs.strapi.io/dev-docs/cli#strapi-develop)

```
npm run develop
# or
yarn develop
```

### `start`

Start your Strapi application with autoReload disabled. [Learn more](https://docs.strapi.io/dev-docs/cli#strapi-start)

```
npm run start
# or
yarn start
```

### `build`

Build your admin panel. [Learn more](https://docs.strapi.io/dev-docs/cli#strapi-build)

```
npm run build
# or
yarn build
```

## ⚙️ Deployment

Strapi gives you many possible deployment options for your project including [Strapi Cloud](https://cloud.strapi.io). Browse the [deployment section of the documentation](https://docs.strapi.io/dev-docs/deployment) to find the best solution for your use case.

```
yarn strapi deploy
```

## 📚 Learn more

- [Resource center](https://strapi.io/resource-center) - Strapi resource center.
- [Strapi documentation](https://docs.strapi.io) - Official Strapi documentation.
- [Strapi tutorials](https://strapi.io/tutorials) - List of tutorials made by the core team and the community.
- [Strapi blog](https://strapi.io/blog) - Official Strapi blog containing articles made by the Strapi team and the community.
- [Changelog](https://strapi.io/changelog) - Find out about the Strapi product updates, new features and general improvements.

Feel free to check out the [Strapi GitHub repository](https://github.com/strapi/strapi). Your feedback and contributions are welcome!

## ✨ Community

- [Discord](https://discord.strapi.io) - Come chat with the Strapi community including the core team.
- [Forum](https://forum.strapi.io/) - Place to discuss, ask questions and find answers, show your Strapi project and get feedback or just talk with other Community members.
- [Awesome Strapi](https://github.com/strapi/awesome-strapi) - A curated list of awesome things related to Strapi.

---

<sub>🤫 Psst! [Strapi is hiring](https://strapi.io/careers).</sub>
