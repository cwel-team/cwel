# Countrywide Experience Language (CWEL)

Welcome to CWEL, a front-end framework and experience language for the web.


## Setup instructions

Setup involves a set of gulp commands:

- Active development: `gulp watch` to get the sandbox and documentation page up.
- Build: `gulp build` to build the entire project.
- Lint: `gulp lint` to lint the SCSS and JS in this project.
	- `gulp lint:script` to only lint the JS
	- `gulp lint:style` to only lint the SCSS
- Test
	- unit (karma): `gulp test-unit`
	- end to end (protractor): `gulp test-e2e`
	- visual (galen): `gulp test-visual`


## Contributing

For any pull requests to be accepted, the following guidelines must be followed.
These cover code style and methodologies. Suggested tooling is listed at the end
to help follow these guides.

**Note:** Tildes (`~`) in paths like `~/package.json` denote the project's
root folder.

### Filenames

Make sure all filenames in this project adhere to [kebab case](kebabcase).
Exceptions to this are `~/LICENSE` and `~/README.md` to make them stand-out.

### Create something

To create something for CWEL, read how to [create something](create-something).
This covers the steps necessary to contribute source code.

### Code styleguides

Use [eslint](eslint) and [stylelint](stylelint) to ensure your code style
generally conforms with the project's standards; see setup instructions above
for lint commands.

#### SCSS styleguide
Some things are not caught by linters, so please read the [scss styleguide](scss-styleguide)
and for clarification.

#### JS styleguide
These are all covered by [eslint](eslint).

### Sandbox pages

To work on the CWEL library or experiment with new ideas, sandbox pages
can be made. To do so, follow the steps outlined in the [sandbox readme](sandbox-readme).

### Documenation pages

To document new components, or any piece of CWEL, documentation pages
can be written. For instuctions, read the readme for [documentation pages](docs-readme).

## To do

For a list of miscellaneous tasks, see the [todo readme](todo-readme).



[eslint]: https://eslint.org/
[stylelint]: https://stylelint.io/
[grid-docs]: https://cwel-team.github.io/cwel/#!/layout/grid
[scss-organization]: ./readme/scss-organization.md
[scss-styleguide]: ./readme/scss-styleguide.md
[sandbox-readme]: ./readme/sandbox.md
[docs-readme]: ./readme/docs-site.md
[todo-readme]: ./readme/todo.md
[create-something]: ./readme/create-something.md
[kebabcase]: http://wiki.c2.com/?KebabCase
