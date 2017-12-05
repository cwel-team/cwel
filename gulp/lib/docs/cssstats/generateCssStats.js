const _                    = require('lodash');                     // JavaScript utility library
const camelCase            = require('camel-case');                 // Convert a dash/dot/underscore/space separated string to camelCase
const isBlank              = require('is-blank');                   // Check whether a value is empty or blank
const isPresent            = require('is-present');                 // Check whether a value is nonblank
const shorthandExpand      = require('css-shorthand-expand');       // Expand CSS shorthand properties to their longhand equivalent
const specificity          = require('specificity');                // A JavaScript module for calculating and comparing the specificity of CSS selectors

function fontSizeToPx(value) {
    let raw = '';

    if (typeof value !== 'string') {
        value = value.toString();
    }

    raw = parseFloat(value, 10);
    if (value.match(/px$/)) {
        return raw;
    }
    if (value.match(/em$/)) {
        return raw * 16;
    }
    if (value.match(/%$/)) {
        return raw * 0.16;
    }
    switch (value) {
    case 'inherit':
        return 16;
    case 'xx-small':
        return 9;
    case 'x-small':
        return 10;
    case 'small':
        return 13;
    case 'medium':
        return 16;
    case 'large':
        return 18;
    case 'larger':
        return 19;
    case 'x-large':
        return 24;
    case 'xx-large':
        return 32;
    default:
        return 1024;
    }
}

function getAllFontSizes(properties) {
    properties = properties || this.properties;

    if (!properties) {
        return 0;
    }

    let fontSizes = properties['font-size'] || [];

    if (properties.font) {
        fontSizes = fontSizes.concat(properties.font
        .map((value) => { // eslint-disable-line consistent-return, array-callback-return
            try {
                return shorthandExpand('font', value)['font-family'];
            } catch (e) {} // eslint-disable-line no-empty
        })
        .filter((value) => {
            return value;
        }),
        );
    }

    return fontSizes;
}

function sortFontSizes(fontSizes) {
    const sortBy = (a, b) => {
        const c = fontSizeToPx(a);
        const d = fontSizeToPx(b);
        if (c > d) {
            return -1;
        }
        return 1;
    };
    const sorted = fontSizes;
    if (!sorted) return false;
    return sorted.sort(sortBy);
}

function getAllFontFamilies(properties) {
    properties = properties || this.properties;

    if (!properties) {
        return 0;
    }

    let families = properties['font-family'] || [];

    if (properties.font) {
        families = families.concat(properties.font
        .map((value) => { // eslint-disable-line consistent-return, array-callback-return
            try {
                return shorthandExpand('font', value)['font-family'];
            } catch (e) {} // eslint-disable-line no-empty
        })
        .filter((value) => {
            return value;
        }),
        );
    }
    return families;
}

function sortZIndices(zIndices) {
    const sorted = zIndices;
    if (!sorted) return false;
    return sorted.sort((a, b) => {
        return a - b;
    });
}

function getUniquePropertyCount(property) {
    if (!property) return 0;
    return _.uniq(property).length;
}

function getSpecificityGraph(selectors) {
    function graph(selector) {
        return specificity.calculate(selector)[0]
        .specificity
        .split(',')
        .map((n) => {
            return parseFloat(n);
        })
        .reverse()
        .reduce((a, b, i) => {
            b = b < 10 ? b : 9;
            return a + (b * Math.pow(10, i)); // eslint-disable-line no-restricted-properties
        });
    }
    selectors = selectors || this.values;

    if (isBlank(selectors)) {
        return false;
    }

    return selectors.values.filter(isPresent).map(graph);
}

function getPropertyValueCount(property, value) {
    if (!this.properties || !this.properties[property]) {
        return 0;
    }

    return this.properties[property]
    .filter((val) => {
        return val === value;
    }).length;
}

function parseTotals(stats) {
    if (!stats) return false;
    const totals = {};
    totals.properties = _.size(stats.data.declarations.properties);
    const totalProperties = ['float', 'width', 'height', 'color', 'background-color'];
    for (const property of totalProperties) { // eslint-disable-line no-restricted-syntax
        const prop = stats.data.declarations.properties[property];
        totals[camelCase(property)] = prop ? prop.length : 0;
    }

    totals.fontSize = getAllFontSizes(stats.data.declarations.properties).length;

    return totals;
}

function parseUniques(stats) {
    if (!stats) return false;

    const uniques = {};
    const uniqueProperties = ['width', 'height', 'color', 'background-color',
        'margin', 'padding', 'border-radius', 'z-index',
    ];
    for (const property of uniqueProperties) { // eslint-disable-line no-restricted-syntax
        uniques[camelCase(property)] = _.uniq(stats.data.declarations.properties[property]);
    }

    uniques.fontSize = _.uniq(getAllFontSizes(stats.data.declarations.properties));
    uniques.fontFamily = _.uniq(getAllFontFamilies(stats.data.declarations.properties));
    uniques.fontSizeSorted = sortFontSizes(uniques.fontSize);
    uniques.zIndexSorted = sortZIndices(uniques.zIndex);

    return uniques;
}

function uniquesGraph(stats) {
    const obj = {};
    obj.max = 0;
    const keys = ['width', 'height', 'margin', 'padding', 'color', 'background-color'];
    let camelKey = '';
    keys.forEach((key) => {
        camelKey = camelCase(key);
        obj[camelKey] = {};
        if (!stats.data.declarations.properties[key]) {
            obj[camelKey].total = 0;
            obj[camelKey].unique = 0;
        } else {
            obj[camelKey].total = stats.data.declarations.properties[key].length;
            obj[camelKey].unique = getUniquePropertyCount(stats.data.declarations.properties[key]);
            if (obj[camelKey].total > obj.max) {
                obj.max = obj[camelKey].total;
            }
        }
    });
    keys.forEach(() => { // eslint-disable-line consistent-return
        if (!obj[camelKey]) return false;
        obj[camelKey].percentTotal = obj[camelKey].total / obj.max;
        obj[camelKey].percentUnique = obj[camelKey].unique / obj.max;
    });
    return obj;
}

function spacingResets(stats) {
    const spacing = {};
    const spacingProperties = ['margin', 'margin-top', 'margin-left',
        'margin-right', 'margin-bottom', 'padding', 'padding-top', 'padding-left',
        'padding-bottom', 'padding-right',
    ];
    for (const property of spacingProperties) { // eslint-disable-line no-restricted-syntax
        spacing[camelCase(property)] = getPropertyValueCount(stats.data.declarations.property, '0');
    }
    return spacing;
}

module.exports = (obj) => {
    const model = {};
    model.stats = obj;
    model.totals = parseTotals(model.stats);
    model.uniques = parseUniques(model.stats);
    model.uniquesGraph = uniquesGraph(model.stats);
    model.specificityGraph = getSpecificityGraph(model.stats.selectors);
    model.rulesizeGraph = model.stats.data.rules.size.graph;
    model.mediaQueries = _.uniq(model.stats.data.mediaQueries.values);
    model.spacingResets = spacingResets(model.stats);

    return JSON.stringify(model);
};
