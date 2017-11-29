module.exports = {
    'plugins': [
        'stylelint-order'
    ],
    'rules': {
        'order/properties-order': [{
            order: '',
            properties: [
                'content',
                'position',
                'top',
                'right',
                'bottom',
                'left',
                'z-index',
            ],
        },
        {
            order: '',
            properties: [
                'display',
                'visibility',
                'flex',
                'flex-grow',
                'flex-shrink',
                'flex-basis',
                'flex-direction',
                'order',
                'flex-order',
                'flex-wrap',
                'flex-flow',
                'justify-content',
                'align-self',
                'align-items',
                'align-content',
                'flex-pack',
                'flex-align',
                'float',
                'clear',
                'box-sizing',
                'table-layout',
                'width',
                'height',
                'min-width',
                'min-height',
                'max-width',
                'max-height',
                'margin',
                'margin-top',
                'margin-right',
                'margin-bottom',
                'margin-left',
                'padding',
                'padding-top',
                'padding-right',
                'padding-bottom',
                'padding-left',
                'overflow',
                'overflow-x',
                'overflow-y',
                'vertical-align',
                'clip',
            ],
        },
        {
            order: '',
            properties: [
                'color',
                'font',
                'font-family',
                'font-size',
                'font-weight',
                'font-style',
                'font-variant',
                'font-size-adjust',
                'font-stretch',
                'line-height',
                'letter-spacing',
                'text-align',
                'text-align-last',
                'text-decoration',
                'text-indent',
                'text-justify',
                'text-outline',
                'text-transform',
                'text-wrap',
                'text-overflow',
                'text-overflow-ellipsis',
                'text-overflow-mode',
                'text-shadow',
                'white-space',
                'word-spacing',
                'word-wrap',
                'word-break',
                'counter-increment',
                'counter-reset',
                'list-style',
                'list-style-position',
                'list-style-type',
                'list-style-image',
            ],
        },
        {
            order: '',
            properties: [
                'background',
                'background-color',
                'background-image',
                'background-position',
                'background-position-x',
                'background-position-y',
                'background-size',
                'background-repeat',
                'background-attachment',
                'background-clip',
                'background-origin',
                'box-shadow',
                'filter',
            ],
        },
        {
            order: '',
            properties: [
                'outline',
                'outline-width',
                'outline-style',
                'outline-color',
                'outline-offset',
                'border',
                'border-width',
                'border-style',
                'border-color',
                'border-spacing',
                'border-collapse',
                'border-top',
                'border-top-width',
                'border-top-style',
                'border-top-color',
                'border-right',
                'border-right-width',
                'border-right-style',
                'border-right-color',
                'border-bottom',
                'border-bottom-width',
                'border-bottom-style',
                'border-bottom-color',
                'border-left',
                'border-left-width',
                'border-left-style',
                'border-left-color',
                'border-radius',
                'border-top-right-radius',
                'border-top-left-radius',
                'border-bottom-right-radius',
                'border-bottom-left-radius',
            ],
        },
             {
            order: '',
            properties: [
                'transition',
                'transition-delay',
                'transition-timing-function',
                'transition-duration',
                'transition-property',
                'transform',
                'transform-origin',
                'animation',
                'animation-name',
                'animation-duration',
                'animation-play-state',
                'animation-timing-function',
                'animation-delay',
                'animation-iteration-count',
                'animation-direction',
            ],
        },
        {
            order: 'flexible',
            properties: [
                'opacity',
                'resize',
                'cursor',
                'counter-increment',
                'counter-reset',
                'pointer-events',
            ],
        }],
        'color-no-invalid-hex': true,
        'color-hex-case': 'lower',
        'comment-whitespace-inside': 'always',
        'comment-no-empty': true,
        'font-family-no-duplicate-names': true,
        'font-weight-notation': 'numeric',
        'number-max-precision': 8,
        'number-no-trailing-zeros': true,
        'function-comma-space-after': 'always',
        'function-url-quotes': 'always',
        'function-calc-no-unspaced-operator': true,
        'function-linear-gradient-no-nonstandard-direction': true,
        'function-max-empty-lines': 0,
        'string-quotes': 'single',
        'string-no-newline': true,
        'length-zero-no-unit': true,
        'indentation': 4|'tab',
        'unit-whitelist': ['rem', 'em', '%', 'deg', 'px', 's', 'vw', 'vh'],
        'unit-case': 'lower',
        'unit-no-unknown': true,
        'value-keyword-case': 'lower',
        'value-no-vendor-prefix': true,
        'value-list-max-empty-lines': 0,
        'value-list-comma-space-after': 'always-single-line',
        'property-case': 'lower',
        'property-no-unknown': true,
        'block-no-empty': 'true',
        'declaration-colon-space-after': 'always',
        'declaration-colon-space-before': 'never',
        'declaration-block-no-duplicate-properties': [ true, {
          'ignore': ['consecutive-duplicates-with-different-values']
        }],
        'declaration-block-semicolon-newline-after': 'always',
        'declaration-block-single-line-max-declarations': 1,
        'block-no-empty': null,
        'selector-list-comma-space-before': 'never',
        'selector-list-comma-newline-after': 'always',
        'at-rule-blacklist': ['extend'],
        'media-feature-colon-space-after': 'always',
        'media-feature-colon-space-before': 'never',
        'media-feature-name-no-vendor-prefix': true,
        'media-feature-name-case': 'lower',
        'max-empty-lines': 1,
        'max-nesting-depth': 3,
        'number-leading-zero': 'always',
        'number-no-trailing-zeros': true,
        'selector-max-specificity': '1,2,1',
        'no-extra-semicolons': true,
        'no-duplicate-selectors': true,
        'declaration-no-important' : true,
        'declaration-property-unit-blacklist': {
            'font-size': ['px', 'em', 'deg', '%', 'vw', 'vh'],
            '/^height/': ['px', 'em', 'deg', 's'],
            '/^width/': ['px', 'em', 'deg', 's'],
            '/^padding/': ['px', 'em', 'deg', 's', 'vw', 'vh'],
            '/^margin/': ['px', 'em', 'deg', 's', 'vw', 'vh'],
            '/^border/': ['px', 'em', 'deg', 's', 'vw', 'vh'],
            'box-shadow': ['px', 'em', 'deg', 's', 'vw', 'vh'],
        }
    },
};
