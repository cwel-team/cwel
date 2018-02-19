# Documentation Site

In a nutshell, the documentation site is a single-page Angularjs app. It's
static assets are generated using [nunjucks](https://mozilla.github.io/nunjucks/),
of which all templates can be found in the `~/Docs` directory. Templates for
sample markup of components and patterns are kept in the
CWEL source files (`~/CWEL/*`). These are then used by Angularjs whenever
necessary. Content is hosted on Contentful, where the maintainers can make
changes without a code release.

## Gulp Tasks

All docs releated gulp tasks are found under `~/gulp-tasks/docs`.

To build the static assets, run `gulp docs:build`.

## Templating

The primary engine used is [nunjucks](https://mozilla.github.io/nunjucks/)
with a markdown extension
([nunjucks-markdown](https://www.npmjs.com/package/nunjucks-markdown)) that can
be invoked using a [nunjucks](https://mozilla.github.io/nunjucks/) macro. This
generates a razor view that is then rendered when visiting a documentation page
on the docs site.

To illustrate this in a series of steps:

1. Nunjucks parses the given documentation page template.
2. Markdown macro includes a markdown file and parses it as a nunjucks template,
as well.
3. On page view, the resulting razor view is rendered.

### HTML

The markdown renderer used for the docs support HTML syntax within the Markdown
syntax, including `<script></script>` tags.
