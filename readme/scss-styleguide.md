## SCSS styleguide


## Variable name syntax

Avoid variable name collisions by adhering to the following syntax that
uses underscores (`_`) for namespacing, and [camel case](camelcase) for words in
between. Any numbers in a variable name should not be given more digits than
necessary: i.e. single digit number should not be represented in double digits.
Numbers should be used to denote the terms 'primary' or 'secondary' for the
sake of brevity.

**Good syntax:**

``` scss
$c_button_color_1: purple !default; // this is a color type of the button
$s_button_borderWidth_1: 1px !default; // this is a space type like `px` or `rem` of the button component's primary border width
$c_button_borderCol_1: white !default; // this is a color type of the button
```

**Bad syntax:**

``` scss
// These are all unthemeable
$button_color: black; // what if projects using these
$button_color_black: #000; // values in names defeat the purpose of variables
$c-button-borderColor-1: #fff; // inconsistent with the rest by using `-` instead of `_`
$c_btn_borderColor_1: #000; // only valid if the component is actually called `btn`
$c_button_borderCol_01: white; // single digit number written in double digits
```

### Namespacing

Namespaces in variable names should follow this structure:

1. global, representing SCSS type of the variable
1. component, representing a component or similar
1. property name, representing a CSS property name
1. order, representing the order of a variable: i.e. `1` for primary, `2` for secondary, etc.

Take `$c_button_borderCol_1` as an example:

1. SCSS type of color
1. component 'button'
1. property name of border-color
1. order of primary

This variable name could be read as "the button component's primary border color".
The global namespace simply makes it easy to denote the type.


## Mixins

Mixins follow the same syntax as variable names, except they go by `-` instead of `_`, and no global prefix for type is necessary.

**Good syntax:**

``` scss
@mixin grid() { ... }
@mixin grid-cell() { ... }
@mixin display-callToAction { ... } // uses camel case for words between hyphens
```

**Bad syntax:**

``` scss
@mixin Grid() { ... } // don't start with capital letters
@mixin grid_cell { ... } // don't use underscores
```


## Single declarations

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


## Media query placement

Always use the provided breakpoint mixin for media queries and place them within
their relevant rule sets. Everything should work with the CWEL breakpoints.
Don't bundle them all in a separate stylesheet or at the end of the document.
Doing so only makes it easier to create spaghetti code. Also try to avoid large
blocks of rulesets within media queries as it's easy to lose overview. Here's a
typical setup.

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


## Shorthand notation

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


## Nesting in Sass

Avoid unnecessary nesting. Just because you can nest, doesn't mean you always
should. Consider nesting only if you can't scope styles to a parent using BEM.

**Good nesting:**

``` scss
.article {

    // DOM state is also great to have nested as long as they maintain code readability
    &:hover { ... }

    // modifiers are good to nest as long as they maintain code readability
    &--left-align { ... }
}

// unnest the BEM elements for better code readability
// and consistency
.article__title { ... }
```

**Bad nesting:**

``` scss
.article {

    // selecting by nested tag name makes it impossible to deploy stylistic changes
    // without having to also change markup.
    h1 {
        // nesting tags deeply creates overly specific selectors
        span { ... }
        // nesting with full classes is even more specific.
        .bold { ... }
    }

    // nesting BEM elements like this can affect code readability if too much content.
    &__title { ... }
}
```



[eslint]: https://eslint.org/
[stylelint]: https://stylelint.io/
[readme]: ../README.md
[grid-docs]: https://cwel-team.github.io/cwel/#!/layout/grid
[camelcase]: https://en.wikipedia.org/wiki/Camel_case
