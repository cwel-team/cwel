# Next Gen Code Revolution

Welcome to Countrywide's next generation code-base. Here is where technology
bleeds from the swift katana that is its development team.

## Setup Instructions

Follow these instructions if depending on your role in the team.

- [Front-End Zen warrior](./readme/FED.md)

## SCSS File Organization

To read up on how the SCSS is files are organized for CWEL, read the
[readme on scss file organization]('./readme/SCSS-organization.md').

## Sandbox Pages

To experiment with new ideas in the CWEL code-base, outside the
constraints of our wonderful playground editor, sandbox pages can be made. To
do so, follow the steps outlined in the [sandbox readme]('./readme/Sandbox.md').

## Documenation Pages

To document new components, patterns, or any piece of CWEL, documentation pages
can be generated. Gulp tasks are used to generate them, of which the inner
workings are explained in the
[readme for documentation pages]('./readme/Docs-pages.md').

## To Do

Reset styles to implement for miscellaneous components in the future

```
* Embedded content
   ========================================================================== */

/**
 * Add the correct display in IE 9-.
 */

audio,
video {
  display: inline-block;
}

/**
 * Add the correct display in iOS 4-7.
 */

audio:not([controls]) {
  display: none;
  height: 0;
}
```

```
/**
 * 1. Change the font styles in all browsers (opinionated).
 * 2. Remove the margin in Firefox and Safari.
 */

button,
input,
optgroup,
select,
textarea {
  font-family: sans-serif; /* 1 */
  font-size: 100%; /* 1 */
  line-height: 1.15; /* 1 */
  margin: 0; /* 2 */
}
```

```
/**
 * Show the overflow in IE.
 * 1. Show the overflow in Edge.
 */

button,
input { /* 1 */
  overflow: visible;
}

/**
 * Remove the inner border and padding in Firefox.
 */

button::-moz-focus-inner,
[type="button"]::-moz-focus-inner,
[type="reset"]::-moz-focus-inner,
[type="submit"]::-moz-focus-inner {
  border-style: none;
  padding: 0;
}

/**
 * Restore the focus styles unset by the previous rule.
 */

button:-moz-focusring,
[type="button"]:-moz-focusring,
[type="reset"]:-moz-focusring,
[type="submit"]:-moz-focusring {
  outline: 1px dotted ButtonText;
}

/**
 * Correct the cursor style of increment and decrement buttons in Chrome.
 */

[type="number"]::-webkit-inner-spin-button,
[type="number"]::-webkit-outer-spin-button {
  height: auto;
}

/**
 * 1. Correct the odd appearance in Chrome and Safari.
 * 2. Correct the outline style in Safari.
 */

[type="search"] {
  -webkit-appearance: textfield; /* 1 */
  outline-offset: -2px; /* 2 */
}

/**
 * Remove the inner padding and cancel buttons in Chrome and Safari on macOS.
 */

[type="search"]::-webkit-search-cancel-button,
[type="search"]::-webkit-search-decoration {
  -webkit-appearance: none;
}

/**
 * 1. Correct the inability to style clickable types in iOS and Safari.
 * 2. Change font properties to `inherit` in Safari.
 */

::-webkit-file-upload-button {
  -webkit-appearance: button; /* 1 */
  font: inherit; /* 2 */
}
```
