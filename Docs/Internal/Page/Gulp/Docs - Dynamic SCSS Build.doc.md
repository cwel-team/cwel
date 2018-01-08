## The problem

Documenting source code is essential, yet can be tricky to get right. There's always a balance to strike between maintainability and readability, which most solutions don't seem to offer. While arguably the cleanest way is to keep the source code and documentation concerns separate, this can quickly lead to the documentation going stale - especially when it comes to providing code examples.

## The solution

We use [SassDoc](http://sassdoc.com/gulp/) to generate all our SCSS documentation with each CWEL build. This is a mature and very capable product that does everything that we need it to (and much more besides) so felt no need to write our own. We use it as part of the `cwel-docs-generate-dynamic-scss-docs` in `gulp/tasks/docs/generate.js` Gulp task, which is in turn part of the main CWEL build task.

## How it works

SassDoc relies on well-crafted comments within the source files to generate a structured HTML document, with a navigable sidebar, live code examples, and automatic anchor creation, making understanding the relationship between the project's functions, mixins, and variables a breeze.

## The syntax

SassDoc uses 'annotations'. There are two types of annotations available - 'file-level' and 'rule-level'. Any file-level annotations are inherited by rule-level annotations, but can be overridden if required. This could be useful when using the `@@since` annotation for example, where the file was created at version 0.1, but a rule within it was created at version 0.2.

File-level annotations should always exist at the top of a document, and look a bit like this:

``` scss
////
/// @@group _reset.scss
/// @@since 0.0.1
////
```

Note the 4 slashes at the start and end of the block. For the full documentation see http://sassdoc.com/file-level-annotations/.

Rule-level annotation should always exist just above the rule to be annotated, and look a bit like this:

``` scss
/// 1. Declare global box-sizing
/// @@link https://www.paulirish.com/2012/box-sizing-border-box-ftw/
```

Annotations include:

| Annotation                                                          | Description                                               | Aliases                    |
|---------------------------------------------------------------------|-----------------------------------------------------------|----------------------------|
| Description [[source]](http://sassdoc.com/annotations/#description) | Description of the documented item                        |                            |
| @@author [[source]](http://sassdoc.com/annotations/#author)         | Author of the documented item                             |                            |
| @@content [[source]](http://sassdoc.com/annotations/#content)       | Whether the documented mixin uses the @@content directive |                            |
| @@deprecated [[source]](http://sassdoc.com/annotations/#deprecated) | Whether the documented item is deprecated                 |                            |
| @@example [[source]](http://sassdoc.com/annotations/#example)       | Example for the documented item                           |                            |
| @@group [[source]](http://sassdoc.com/annotations/#group)           | Group the documented item belongs to                      |                            |
| @@link [[source]](http://sassdoc.com/annotations/#link)             | Link related to the documented item                       | @@source                   |
| @@output [[source]](http://sassdoc.com/annotations/#output)         | Output from the documented mixin                          |                            |
| @@parameter [[source]](http://sassdoc.com/annotations/#parameter)   | Parameters from the documented mixin or function          | @@param, @@arg, @@argument |
| @@property [[source]](http://sassdoc.com/annotations/#property)     | Property of the documented map                            | @@prop                     |
| @@require [[source]](http://sassdoc.com/annotations/#require)       | Requirements from the documented item                     | @@requires                 |
| @@return [[source]](http://sassdoc.com/annotations/#return)         | Return from the documented function                       | @@returns                  |
| @@see [[source]](http://sassdoc.com/annotations/#see)               | Resource related to the documented item                   |                            |
| @@since [[source]](http://sassdoc.com/annotations/#since)           | Changelog for the documented item                         |                            |
| @@throw [[source]](http://sassdoc.com/annotations/#throw)           | Exceptions raised by the documented item                  | @@throws, @@exception      |
| @@todo [[source]](http://sassdoc.com/annotations/#todo)             | Things to do related to the documented item               |                            |
| @@type [[source]](http://sassdoc.com/annotations/#type)             | Describes the type of a variable                          |                            |


For the full documentation see http://sassdoc.com/annotations/.

**Note:** For a rule to be documented it **must** have an annotation above it, else SassDoc will skip over it. The bare minimum required for an annotation is an empty comment, which looks like this:

``` scss
///
```

## The theme

SassDoc is fully theme-capable, and we have rolled our own to fit in seamlessly with the rest of CWEL's documentation. The code is based on SassDoc's own [theme generator](https://www.npmjs.com/package/generator-sassdoc-theme) along with parts of a theme called [Pheek](https://github.com/pete-hotchkiss/sassdoc-theme-pheek).

## The caveats

SassDoc's documentation generator renders a static HTML file by default, which isn't really what we want. In order to bend it to our own needs, our template only generates a _partial_ file (`Cwel/.tmp/docs/sassdoc/index.html`) which then gets consumed by `Cwel.Docs.Web/FrontEnd/Template/docs/scss.nunjucks` during the main documentation build tasks.

There are also a couple of extra tasks within the `cwel-docs-generate-dynamic-scss-docs` task that edit the temporary file once it has been created.

1. Load the file into memory.
2. Replace all `@@` symbols with double `@@` symbols so that C# doesn't get confused when it renders the page.
3. Replace 'csss' with 'CSS' - this is a known SassDoc bug which tries to pluralize 'CSS'.
4. Rewrite the file to disk.
