## Vital Stats

| Language      | Type             | File Name     | Location                          | Reference             |
|---------------|------------------|---------------|-----------------------------------|-----------------------|
| SCSS (Sass 3) | CSS Preprocessor | `_reset.scss` | `\Cwel\src\Core\scss\components\` | http://sass-lang.com/ |

## Explanation

 Here you'll find all document-level rules
``` scss
/**************************
 * DOCUMENT
 *************************/
 ```

This sets up a sensible global box model
``` scss
*,
*::before,
*::after {
    box-sizing: border-box;
}
```

This adds basic fundamental rules to the `html` tag.
``` scss
html {
    overflow-x: hidden; // Never scroll the document horizontally.
    overflow-y: scroll; // Always include vertical scrollbar to avoid jumps when dynamic content causes page to grow beyond viewport height.
    line-height: 1.15;  // Correct the line height in all browsers.
    -webkit-text-size-adjust: 100%; // Prevent adjustments of font size after orientation changes on iOS.
    -ms-text-size-adjust: 100%; // Prevent adjustments of font size after orientation changes in IE on Windows Phone.
}
```
