# SCSS file organization

There are currently two ways of generating compiled CSS from CWEL:
1. From CWEL itself (using its own 'brand' colours; should really be the same as Corporate or at least very similar)
2. From within a product (such as Corporate) when CWEL is installed as a NuGet package

SCSS files can be found within `~/cwel/style`.

## core.scss

`core.scss` includes just the bare bones in order to get CWEL up and running.
This is to provide some freedom with SCSS's `@import`s whilst not having to
import every individual piece of the SCSS source.

## main.scss

`main.scss` includes `core.scss` plus each of CWEL's components and patterns.
The rendered CSS will therefore include the entirety of CWEL's style code.
