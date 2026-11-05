# 🚀 Getting started with Strapi

## Kelari Group LLC content APIs

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

## Draft previews

The Strapi v5 Preview button is enabled for Insights and Careers. It sends
editors through the Next.js draft endpoint, which enables a browser-only Draft
Mode cookie and redirects to the content page. Draft fetches use Strapi v5's
`status=draft` parameter and bypass the Next.js cache; published fetches keep
the normal published-only response and 60-second cache.

For local development, set these matching values in the frontend
`.env.local` and Strapi `.env`:

```env
# Next.js .env.local
STRAPI_PREVIEW_SECRET=<shared-development-secret>
STRAPI_URL=http://localhost:1337
STRAPI_API_TOKEN=<read-only Strapi API token>

# Strapi .env
PREVIEW_SECRET=<same-shared-development-secret>
PREVIEW_URL=http://localhost:3333
PREVIEW_ALLOWED_ORIGINS=http://localhost:3333,http://127.0.0.1:3333
```

Create a restricted Strapi API token that can only find Insights and Careers;
keep it in the server-only `STRAPI_API_TOKEN` variable. Restart both servers
after updating environment variables. Use `localhost` consistently in the
browser so the draft cookie is sent to the same host. The Strapi Preview button
generates the Insights and Careers URLs from each saved document; save the
draft before previewing it.

Local test procedure:

1. Start Strapi at `http://localhost:1337` and Next.js at
   `http://localhost:3333`; use `localhost` in both tabs (not `127.0.0.1`).
2. In Strapi, create and save an unpublished Insight or Career.
3. Use **Preview** in the Strapi Content Manager. For manual Insight testing,
   open `http://localhost:3333/api/draft?secret=<shared-development-secret>&type=insights&slug=<insight-slug>`.
   Careers use `type=careers` and the Career `documentId` as `slug`.
4. Confirm the yellow preview banner appears, then select **Exit Preview** to
   clear the cookie. No browser-to-Strapi fetch is made, so CORS is not
   involved in draft loading.

## Candidate applications

The public careers page opens a three-step modal for each opening. The direct
route `/careers/<documentId>/apply` opens the same modal. The form submits one
`multipart/form-data` request to `/api/application-submissions`, with
candidate fields in the `data` part and the resume in `files.resume`. The
submission links to its job using Strapi v5's relation `connect` format.

The `Application Submission` content type stores first and last name, email,
phone, date of birth, nationality, optional school, course of study, recent
company and position, years of experience, minimum remuneration, skills and
certifications as JSON arrays, required cover note, privacy consent, resume
media, and a relation to the Career opening. The responsive three-step
application modal validates each step and submits the details and resume in
one multipart request. Resumes are limited to PDF, DOC, or DOCX files up to
10 MB by the form, Strapi body parser, and an API policy.

In the Strapi admin, open **Settings → Users & Permissions Plugin → Roles →
Public** and grant only **create** on **Application Submission**. Do not grant
`find`, `findOne`, or `findMany` to the Public role because submissions contain
personal information. Set `CORS_ORIGINS` in the backend `.env` to the exact
frontend origin(s), comma-separated. The local defaults permit ports 3000 and
3333 on both `localhost` and `127.0.0.1`. Set
`NEXT_PUBLIC_STRAPI_API_URL` in the frontend `.env.local` to the Strapi base
URL. No Strapi API token is exposed to the browser.

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
