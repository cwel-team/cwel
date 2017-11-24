## The problem

Documenting source code is essential, yet can be tricky to get right. There's always a balance to strike between maintainability and readability, which most solutions don't seem to offer. While arguably the cleanest way is to keep the source code and documentation separate, this can quickly lead to stale and incorrect documentation - especially when it comes to code examples.

## The solution

We use [SassDoc](http://sassdoc.com/gulp/) to generate all our SCSS documentation dynamically. This is a mature and very capable product that does everything that we need it to (and much more besides) so felt no need to write our own. We use it as part of the `cwel-docs-generate-dynamic-scss-docs` Gulp task, which is in turn part of the main CWEL build task.

## How it works

SassDoc relies on well-crafted comments within the source files to generate a well-structured HTML document, with a navigable sidebar, live code examples, and automatic anchor creation, making understanding the relationship between the project's functions, mixins, and variables a breeze.

## The syntax

There are two types of annotations available - file-level and rule-level. Any file-level annotations are inherited by rule-level annotations, but can be overridden. This could be useful when using the `@@since` annotation, where the file was created in version 0.1, but a rule within it was created in version 0.2.

File-level annotations look like this:

``` scss
////
/// @@group _reset.scss
/// @@since 0.0.1
////
```

Note the 4 slashes at the start and end of the block. For the full documentation see http://sassdoc.com/file-level-annotations/.

Rule-level annotation look like this:

``` scss
/// 1. Declare global box-sizing
/// @@link https://www.paulirish.com/2012/box-sizing-border-box-ftw/
///
```
For the full documentation see http://sassdoc.com/annotations/.

## The theme

SassDoc is fully theme-capable. Due to time constraints we didn't have time to roll our own from scratch, so have repurposed one called [Pheek](https://github.com/pete-hotchkiss/sassdoc-theme-pheek). Pheek is loosely based on BEM, but doesn't conform to CWEL's strick usage or DOM structure, so isn't entirely fit for purpose. Because of this, the Gulp task performs the following tasks once SassDoc has generated its output to a temporary location.

1. Load the file into memory.
2. Replace all `@@` symbols with double `@@` symbols so that C# doesn't get confused when it renders the page.
3. Replace `src` references (CSS, JS etc) with new references.
4. Replace the reference to the Pheek stylesheet with our own (which is more inkeeping with CWEL).
5. Rewrite the file to disk.

## The future

In time it would be great to roll our own theme. SassDoc provides help and tools to create one [here](http://sassdoc.com/using-your-own-theme/) and [here](http://sassdoc.com/theme-generator/).
