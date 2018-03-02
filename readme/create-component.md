# Create a component

A component in CWEL is the meat of its code-base, what gives it purpose. That's
if you were to compare this library to a cow as a meat eater.


## Create files

To start, let's look at the files necessary for each component. They're all
located under `~/cwel/component/{name}`: `{name}.es`, `{name}.scss`,
`{name}.njk`, `{name}.e2e.es`, `{name}.pageobject.es`, and `{name}.gspec`
files. Not all components need every file e.g. some don't need JavaScript.

**Note:** `{name}` denotes the name of a component in file path or file name
examples.

Let's group some of these files by language domain to clarify which files
you need.

- Script: `{name}.es`, `{name}.e2e.es`, `{name}.pageobject.es`.
- Style: `{name}.scss`, `{name}.gspec`.
- Markup: `{name}.njk`.

Markup and styling will always be needed. JavaScript, on the other hand, not
always. Some components like button shouldn't come with prescribed JavaScript.
Maybe that's wrong, but the thought counts in principal. For this reason, all
script related files shouldn't be necessary to create.

For the rest of this document, however, we are going to build a component that
requires all language domains. We'll call it the "Patriot Badge". So to start,
create all files like such:

- `patriot-badge.html`
- `patriot-badge.scss`
- `patriot-badge.gspec`
- `patriot-badge.es`
- `patriot-badge.e2e.es`
- `patriot-badge.pageobject.es`

**Note:** All filenames in this project are written in [kebab case](kebabcase)
as noted in the main [readme](readme).


## Sandbox

To actually see what you're developing in a browser, you need to create a
sandbox page.

Create the following files in `~/sandbox/component/patriot-badge/`:

- `index.njk`
- `script.es`
- `style.scss`

The markup should look like this:

``` nunjucks
```




[kebabcase]: http://wiki.c2.com/?KebabCase
[readme]: ../README.md
