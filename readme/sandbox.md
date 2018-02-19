# Sandbox Pages

To develop miscellaneous CWEL features or experiment with ideas worth keeping
in source control, sandbox pages can be made. To do so, follow the steps below.

## Nunjucks Template
Create a new nunjucks template with this path:
`~/Sandbox/{name}/index.njk`, where `{name}`
is the name of the new sandbox page. Note, there's no limit to nesting for
sandbox pages. If it makes sense, feel free to have structures like
`~/Sandbox/{name}/{sub-name}/index.njk`.

Resulting URL paths for templates would be along the lines
of `localhost/{name}/{sub-name}`.

## Scripts
Every sandbox page has its own dedicated `script.es` file. Any shared assets
are imported using ES6 import statements at the top of the `script.es` file.
Compiling entire bundles of code for each sandbox page is important as it
allows us to control exactly what code goes into which sandbox page, without
having to manage an insurmountable amount of configs for task runners. Instead,
we use Webpack!

**Note:** The exception to our rule about bundling is that the `cwel.js`
script file is bundled independently and shared across all sandbox pages. This
is to prematurely avoid unexpected side-effects between components.

## Styles
Like with our scripts, every sandbox page has its own dedicated `style.scss`
file. Any styles for a page should go into `~/Sandbox/{name}/style.scss`,
where `{name}` is the name of the new sandbox page.

**Note:** The exception to our rule about bundling is that the `cwel.css`
style file is bundled independently and shared across all sandbox pages. This
is to prematurely avoid unexpected side-effects between components.

## Shared Assets
Any shared assets for scripts, styles, or template layouts should go into
the `~/Sandbox/Shared` folder.

- Scripts: `~/Sandbox/Shared/Asset/Script`
- Styles: `~/Sandbox/Shared/Asset/Style`
- Layouts: `~/Sandbox/Shared/Asset/Layout`
