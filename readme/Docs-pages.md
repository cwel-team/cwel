# Documentation Pages

Documentation pages are driven in two ways. Either by components and patterns
in the source, or miscellaneous pages written-up explicitly, irrespective of
the source code available. Despite being driven by different file sources, all
documentation pages are generated with the same templating method.

## Gulp Tasks

Two gulp tasks are used to generate documentation pages.

- Components and Patterns: `cwel-docs-generate-md-component`
- Miscellaneous Pages: `cwel-docs-generate-md-page`

## Templating

The primary engine used is [nunjucks](https://mozilla.github.io/nunjucks/)
with a markdown extension
([nunjucks-markdown](https://www.npmjs.com/package/nunjucks-markdown)) that can
be invoked using a [nunjucks](https://mozilla.github.io/nunjucks/) macro. This
generates a razor view that is then rendered when visiting a documentation page
on the docs site.

To illustrate this in a series of steps:

1. Nunjucks parses the given documentation page template.
1. Markdown macro includes a markdown file and parses it as a nunjucks template,
as well.
1. On page view, the resulting razor view is rendered.

### Macros

Macros are stored in `/gulp/lib/docs/template/macro`. These are loaded into an
object called `macro`, accessible in any of the docs templates. Using an
object to store macro template paths is used to avoid the need of long
file paths relative to the repo's root folder. Reason these file paths are
based off of the root folder is to ensure inclusion of all Component and Pattern
`doc.md` files e.g. `Cwel/src/Component/Badge/Badge.doc.md`.
Example on how to use macros in a template is shown below.

``` html
{% from macros['property-table'] import propertytable %}
```
