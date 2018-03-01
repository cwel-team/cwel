# Contribution guidelines

For any pull requests to be accepted, the following guidelines must be followed.
These cover code style, methodologies. Suggested tooling is listed at the end
to help following these guides.

**Note:** `~` in paths like `~/package.json` denotes this project's root folder.


## File locations

All source code for the library can be found in the `~/cwel` directory.

### Components

Each component has all its required files located under
`~/cwel/component/{componentName}`. This includes `.es`, `.scss`, and `.html`
files.

### SCSS

Other, non-component related styles for CWEL are located in the `~/cwel/style`
directory: e.g. the [CWEL grid](grid-docs)


## Code style

Use [eslint](eslint) and [stylelint](stylelint) to ensure your code style
generally conforms with the project's standards; see [readme](readme) for lint
commands.

Some things are not caught by stylelint:

### Variable name syntax

Please avoid variable name collisions by adhering to the following syntax:

**Good syntax:**

``` scss
$c_button_color_1: purple !default; // this is a color type of the button
$s_button_borderWidth_1: 1px !default; // this is a space type of the button
$c_button_borderCol_1: white !default; // this is a color type of the button
```

**Bad syntax:**

``` scss
// These are all unthemeable
$button_color: black; // what if projects using these
$button_color_black: #000; // values in names defeat the purpose of variables
$c-button-borderColor-1: #fff; // inconsistent with the rest
$c_btn_borderColor_1: #000; // only valid if the component is actually called `btn`
```

Where each `_` denotes a namespace: the first is global, representing a SCSS
type, the second should be component or of the like, the third a property name,
and finally, the fourth should represent the order of that property. Order
should be represented in number format instead of verbose `primary` or
`secondary` -- please avoid double digits for single digit numbers i.e. primary
is `1`, not `01`. Property names are not required to be verbose, but camel cased
instead of CSS's kebab case syntax (for purposes of legibility).

**Note:** feel free to add extra levels of name spacing for nested components.
This is most useful if there is a component used within another component.
For example, button being used within header: `$c_header_button_bg_1`, denotes
the primary background color of a header button.

### Shorthand notation

Strive to limit use of shorthand declarations to instances where you must
explicitly set all the available values. Common overused shorthand
properties include:

- padding
- margin
- font
- background
- border
- border-radius

### Single declarations

In instances where a rule set includes only one declaration, consider removing
line breaks for readability and faster editing. Any rule set with multiple
declarations should be split to separate lines.

The key factor here is error detection -- e.g., a CSS validator stating you
have a syntax error on Line 183. With a single declaration, there's no missing
it. With multiple declarations, separate lines is a must for your sanity.

``` css
/* Single declarations on one line */
.span1 { width: 60px; }
.span2 { width: 140px; }
.span3 { width: 220px; }

/* Multiple declarations, one per line */
.sprite {
  display: inline-block;
  width: 16px;
  height: 15px;
  background-image: url(../img/sprite.png);
}
.icon           { background-position: 0 0; }
.icon-home      { background-position: 0 -20px; }
.icon-account   { background-position: 0 -40px; }
```

### Media query placement

Place media queries within their relevant rule sets whenever possible. Also
use the breakpoint mixin to avoid using arbitrary pixel values. Everything
should work with the CWEL breakpoints. Don't bundle them all in a separate
stylesheet or at the end of the document. Doing so only makes it easier for
folks to miss them in the future. Also try to avoid large blocks of rulesets
within media queries as it's easy to lose overview. Here's a typical setup.

**Good media query usage:**

``` scss
.component {
	...

	// styles at md breakpoint for non-modified component
	@include breakpoint('md') { ... }

	// styles at xs breakpoint for modified component
	&--selected {
		...

		// styles at md breakpoint for modified component
		@include breakpoint('md') { ... }
	}
}
```

**Bad media query usage:**

``` scss
// correct breakpoint value, but will break horribly if browser font-size changed by user or breakpoints changed in the spec.
// grouped by media query also makes it difficult to find styles for components.
@media (min-width: 600px) {
	.component { ... }
	.other-component { ... }
}
```

### Shorthand notation

Strive to limit use of shorthand declarations to instances where you must
explicitly set all the available values. Common overused shorthand
properties include:

- padding
- margin
- font
- background
- border
- border-radius

Strict rules for this don't exist as they are sometimes as easy to read as
longhand properties. General rule of thumb is: if it's difficult to discern the
difference between the values of a shorthand property, it will be flagged
during code review.

### Nesting in Sass

Avoid unnecessary nesting. Just because you can nest, doesn't mean you always
should. Consider nesting only if you must scope styles to a parent and if
there are multiple elements to be nested. Read this article on
[nesting in Sass](http://markdotto.com/2015/07/20/css-nesting/) for
a more detailed explanation.

**Note:** in case you are too lazy to read the article above and are using BEM,
don't nest classes if they already define the scope of a ruleset.

**Bad nesting:**

``` scss
.article {

}
```



[eslint]: https://eslint.org/
[stylelint]: https://stylelint.io/
[readme]: ../README.md
[grid-docs]: https://cwel-team.github.io/cwel/#!/layout/grid
