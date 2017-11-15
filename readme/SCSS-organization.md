# SCSS File Organization

There are currently two ways of generating compiled CSS from CWEL:
1. From CWEL itself (using its own 'brand' colours; should really be the same as Corporate or at least very similar)
2. From within a product (such as Corporate) when CWEL is installed as a NuGet package

SCSS files can be found within `cwel\Cwel\src\Core\scss\`.

## core.scss

`core.scss` includes just the bare bones in order to get CWEL up and running. This should be used by external products, as it doesn't include references to any components or patterns; it is up to the developer of a product to include the components and patterns used for that product (as `@include`s in the product's SCSS), in order to reduce the amount of redundant code hanging around. This also gives the developer the opportunity to overwrite CWEL's 'theme' by overwriting CWEL's variable values with ones appropriate for that product at a SCSS level, instead of having to overwrite classes. This should never be done in the CWEL folder, as the entire folder will be overwritten when the NuGet package is updated. Taking Corporate as an example, product-specific SCSS files are found in `corporate\Cwo.Corporate.Web\Assets\scss\`.

## main.scss

`main.scss` includes `core.scss` plus each of CWEL's components and patterns. The rendered CSS will therefore include the entirety of CWEL (useful for third parties who just want to include one static CSS file to gain access to all of CWEL.
