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
create all files in `~/cwel/component`:

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

#### index.njk

``` html
{% extends '_layout.njk' %}
{% set title = 'Patriot Badge' %}

{% import 'cwel/component/patriot-badge/patriot-badge.html' as patriotBadge %}

{% block content %}
	{[ patriotBadge.default() ]}
{% endblock %}
```

#### style.scss

``` scss
@import 'cwel/style/main';
```

#### script.es

``` js
import 'cwel/script/main';
```


## Component

Now populate the aforementioned files under "Create files" with each
of these samples.

#### patriot-badge.html

``` html
<button class="patriot-badge" data-start="1" ng-click="increment()">
    <span class="patriot-badge__counter" ng-bind="counter">1</span>
</button>
```

**Note:** Attributes not documented in the [W3C spec](html-spec-attributes)
should be prefixed with `data-`: e.g. `data-start` in the example above.

#### patriot-badge.scss

``` scss
.patriot-badge {
    position: relative;
    padding: $s_xl;
    border: none;
    border-radius: 50%;
    outline: none;
    background-color: transparent;
    background-image: url('http://wallzoa.com/wp-content/uploads/2013/05/american-flag-eagle-wallpaper.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
}

.patriot-badge__counter {
    position: absolute;
    top: 0;
    right: 0;
    width: $s_lg;
    height: $s_lg;
    padding-top: $s_md;
    border-radius: 50%;
    background-color: #14192d;
    color: white;
    font-weight: 800;
}
```

#### patriot-badge.es

``` js
/**
 * @name patriotBadge
 * @type component
 * @angulartype directive
 * @module cwel
 * @dependencies CwomponentFactory
*/
angular.module('cwel').directive('patriotBadge', (CwomponentFactory) => {
    return CwomponentFactory({
        restrict: 'C',
        scope: {
            start: '@',
        },
        link: (scope) => {
            /**
             * Number of badge clicks
             * @scope
             * @name counter
             * @type int
             */
            scope.counter = parseInt(scope.start, 10);

            /**
             * Increment the badge counter by one.
             * @scope
             * @name increment
             * @return {void}
             */
            scope.increment = () => {
                scope.counter = scope.counter + 1;
            };
        },
    });
});
```


## Add to CWEL

Finally, import the patriot badge's script and style in CWEL by adding the
following lines to their respective files.

#### ~/cwel/script/components.es

``` js
import '../component/patriot-badge/patriot-badge';
```

#### ~/cwel/style/main.scss

``` scss
@import '../component/patriot-badge/patriot-badge';
```


## Render in sandbox

Now run gulp watch to see the patriot badge in the sandbox

``` plain
$ gulp watch
```

Visit `http://localhost:3030/component/patriot-badge/` and you should see an
eagle with faded text of the USA's constitution.

![Eagle with faded text of the USA's constitution and a counter on its top right](https://i.imgur.com/sIVG7V6.jpg)


## End to end tests

It's imperative to have as full a test coverage possible for CWEL. Most
components only need end to end tests for JavaScript. For these we use
protractor; it's aware of Angularjs' digest cycle, making it our preferred
choice. Two files are necessary to create for these tests, one for the tests
themselves, another for the pageobject.

#### patriot-badge.e2e.es

``` js
const PatriotBadgePageObject = require('./patriot-badge.pageobject').default;

describe('Patriot badge component', () => {
    let patriotBadgePo;

    beforeEach(() => {
        patriotBadgePo = new PatriotBadgePageObject();
    });

    it('should increment counter by 1', () => {
        patriotBadgePo.navigate('/component/patriot-badge');

        expect(patriotBadgePo.text).toBe('1');
        patriotBadgePo.click();
        expect(patriotBadgePo.text).toBe('2');
    });
});
```

#### patriot-badge.pageobject.es

``` js
import PageObject from '../../../test/e2e/page-object';

export default class PatriotBadgePageObject extends PageObject {
    constructor() {
        super('Component', 'PatriotBadge');
        this.selector = '.patriot-badge';
    }

    get domElement() {
        return element(by.css(this.selector));
    }

    get text() {
        return this.domElement.getText();
    }

    click() {
        return this.domElement.click();
    }
}
```


## Visual tests

To catch any visual regressions regarding layout, [galen tests](galen-framework)
are used. These are tests that check the DOM instead of screenshot pixels to
determine if elements are certain distances away from each other, aligned
in certain ways, certain widths or heights, etc. To write these, you'll need to
create one file, as well as edit two others; these are the spec as well as two
suites, respectively.

The spec file should be `~/cwel/component/patriot-badge/patriot-badge.gspec`.

The suite files are `~/test/visual/local.test`,
`~/test/visual/browserstack.test`.

#### patriot-badge.gspec

``` galen
@objects
	patriot-badge*                      .patriot-badge
	patriot-badge__counter*             .patriot-badge__counter
```

Add the following to the test files, respectively.

#### local.test

``` galen
@@ parameterized using breakpoints
Patriot Badge at breakpoint: ${breakpointName}
    ${host_url}/component/patriot-badge ${size}
        check cwel/component/patriot-badge/patriot-badge.gspec --include '${tags}'
```

#### browserstack.test

``` galen
@@ parameterized using devices
Patriot Badge on: ${deviceName}
    selenium grid ${grid_url} --page ${host_url}/component/patriot-badge ${gridArgs} ${gridArgsForAll}
        check cwel/component/patriot-badge/patriot-badge.gspec --include '${tags}'
```

Finally, run the tests locally:

``` plain
$ gulp test-visual
```





[kebabcase]: http://wiki.c2.com/?KebabCase
[readme]: ../README.md
[html-spec-attributes]: https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes
