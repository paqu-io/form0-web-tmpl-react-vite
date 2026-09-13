# form0 React + Vite Template

[![CI](https://github.com/paqu-io/form0-web-tmpl-react-vite/actions/workflows/ci.yml/badge.svg)](https://github.com/paqu-io/form0-web-tmpl-react-vite/actions/workflows/ci.yml)
![License](https://img.shields.io/badge/license-MIT-blue.svg)
[![Docs](https://img.shields.io/badge/docs-docs.form0.dev-2563eb)](https://docs.form0.dev)
[![Website](https://img.shields.io/badge/site-form0.dev-0f172a)](https://form0.dev)

> [!NOTE]
> form0 is in active development and is available to use today. Its schema format and core
> concepts are stable in practice, but releases before 1.0 may include breaking changes. Pin your
> versions and review the release notes when upgrading. A formally stable release is coming.

A maintained React and Vite starter for building a schema-driven form application with
[form0-react](https://github.com/paqu-io/form0-react). It includes default renderers, centralized
form0 configuration, example schemas, routing, theme customization, and optional submission to a
form0-cli connector.

## 🚀 Create a project with `form0-cli`

[`form0-cli`](https://github.com/paqu-io/form0-cli) is the canonical way to create a form0 project:

```bash
npm install -g form0-cli
form0
```

Run `init`, choose **Web app**, and select **React + Vite**. Then enter the generated directory and
start the application:

```bash
npm install
npm run dev
```

Open the URL printed by Vite, normally <http://localhost:5173>.

You can also create a repository from this starter with GitHub's **Use this template** button. The
CLI remains the recommended route because it guides project and package-manager selection.

## What is included

- React 19 and Vite
- form0-core and form0-react
- Default and replaceable field renderers
- Tailwind CSS, shadcn/ui primitives, and Vanilla Extract theming
- Light, dark, and system color modes
- Page, modal, spotlight, standard, and simplified form presentations
- Example form routing and schema loading
- Optional submission to form0-cli connector endpoints

## Project layout

```text
.
├── form0.config.js       # form layout, theme, schemas, and dev-server integration
├── src/
│   ├── components/       # application and custom form components
│   ├── forms/            # form schemas
│   ├── pages/            # home and form routes
│   └── themes/           # optional application themes
└── vite.config.js
```

The example application serves a form at `/:formId` and accepts an optional presentation variant
at `/:formId/:variant`.

## Configure form0

Edit `form0.config.js` to change:

- global and per-presentation layout;
- light, dark, system, or custom themes;
- edit and read-only interaction behavior;
- the schema directory, which defaults to `./src/forms`;
- the application development-server command; and
- whether submissions are sent to form0-cli connector endpoints.

Configuration values are ordinary JavaScript and can be imported by application components. Keep
environment-specific URLs and credentials in ignored local environment files rather than
committing them to the template.

## Add or edit a form

Place schema files in `src/forms`, then use the existing page and form components as the integration
point. For interactive schema editing and preview, run `form0-cli` from the project directory:

```bash
form0
```

Load the schema and use `schema edit`, `preview`, `validate`, or `serve --app` as needed. See the
[quickstart](https://docs.form0.dev/getting-started/quickstart) for the complete workflow.

## Customize rendering and styling

`form0-react` provides the engine-to-React integration and default styles. This template adds an
application-owned layer for custom field renderers and themes. Prefer those extension points over
editing package code:

- Register application field components through form0-react's renderer registry.
- Add theme contracts under `src/themes` and select them in `form0.config.js`.
- Keep application layout around `Form0Form`; keep schema behavior in the schema.
- Import `form0-react/index.css` before application-level overrides.

The source contains working examples of these patterns. Detailed API and schema guidance belongs
in the [form0 documentation](https://docs.form0.dev) so the template README can remain focused on
getting a project running.

## Available scripts

- `npm run dev` — start the Vite development server.
- `npm run build` — create a production build in `dist`.
- `npm run preview` — preview the production build locally.
- `npm run lint` — run ESLint.
- `npm run check` — run lint and create a production build.
- `npm run security:audit:prod` — audit production dependencies at high severity.

## ✅ Requirements

- Node.js 22 or newer
- npm, pnpm, Yarn, or Bun; the committed lockfile uses npm
- A modern browser supported by the selected Vite configuration

## 📚 Documentation

- [React + Vite starter guide](https://docs.form0.dev/starter-apps/react-vite/create-run)
- [Project structure and configuration](https://docs.form0.dev/starter-apps/react-vite/project-structure-configuration)
- [Forms, routes, and presentations](https://docs.form0.dev/starter-apps/react-vite/forms-routes-presentations)
- [Renderers, themes, and styling](https://docs.form0.dev/starter-apps/react-vite/renderers-themes-styling)
- [Submissions and connectors](https://docs.form0.dev/starter-apps/react-vite/submissions-connectors)
- [Build and deployment](https://docs.form0.dev/starter-apps/react-vite/build-deployment)
- [Troubleshooting](https://docs.form0.dev/starter-apps/react-vite/troubleshooting)
- [form0 CLI quickstart](https://docs.form0.dev/getting-started/quickstart)
- [React binding reference](https://docs.form0.dev/bindings/react/install-render)

## 🔒 Security

Schema expressions are evaluated by `form0-core`. Only use schemas from trusted authors and review
the [form0-core security policy](https://github.com/paqu-io/form0-core/blob/main/SECURITY.md).
Report vulnerabilities according to this repository's [security policy](./SECURITY.md).

## 🤝 Support and contributing

See [SUPPORT.md](https://github.com/paqu-io/form0-web-tmpl-react-vite/blob/main/SUPPORT.md) for help and
[CONTRIBUTING.md](https://github.com/paqu-io/form0-web-tmpl-react-vite/blob/main/CONTRIBUTING.md) to contribute.

## 📄 License

[MIT](./LICENSE)
