/* eslint-disable */

var cssstats = require('cssstats');
var camelCase = require('camel-case')
var _ = require('lodash');
var isBlank = require('is-blank')
var isPresent = require('is-present')
var specificity = require('specificity')

var shorthandExpand = require('css-shorthand-expand')

function getAllFontSizes(properties) {
  properties = properties || this.properties

  if (!properties) {
    return 0
  }

  var fontSizes = properties['font-size'] || []

  if (properties.font) {
    fontSizes = fontSizes.concat(properties.font
      .map(function (value) {
        try {
          return shorthandExpand('font', value)['font-family']
        } catch (e) {}
      })
      .filter(function (value) {
        return value
      })
    )
  }

  return fontSizes
}

function getAllFontFamilies(properties) {
  properties = properties || this.properties

  if (!properties) {
    return 0
  }

  var families = properties['font-family'] || []

  if (properties.font) {
    families = families.concat(properties.font
      .map(function (value) {
        try {
          return shorthandExpand('font', value)['font-family']
        } catch (e) {}
      })
      .filter(function (value) {
        return value
      })
    )
  }

  return families
}

function getUniquePropertyCount(property) {

  if (!this.properties || !this.properties[property]) {
    return 0
  }

  return _.uniq(this.properties[property]).length
}

function getSpecificityGraph(selectors) {
  selectors = selectors || this.values

  if (isBlank(selectors)) {
    return false
  }

  return selectors.values.filter(isPresent).map(graph)

  function graph (selector) {
    return specificity.calculate(selector)[0]
      .specificity
      .split(',')
      .map(function (n) {
        return parseFloat(n)
      })
      .reverse()
      .reduce(function (a, b, i, arr) {
        b = b < 10 ? b : 9
        return a + (b * Math.pow(10, i))
      })
  }
}

function getPropertyValueCount(property, value) {
  if (!this.properties || !this.properties[property]) {
    return 0
  }

  return this.properties[property]
    .filter(function (val) {
      return val === value
    })
    .length
}


function parseTotals(stats) {

  if (!stats) return false;

  stats.declarations.properties.total = _.size(stats.declarations.properties);

  var totals = {};
  var totalProperties = ['float', 'width', 'height', 'color', 'background-color'];
  for(var property of totalProperties) {
    var prop = stats.declarations.properties[property];
    totals[camelCase(property)] = prop ? prop.length : 0;
  }

  totals.fontSize = getAllFontSizes(stats.declarations.properties).length;

  return totals;
}

function parseUniques(stats) {

  if (!stats) return false;

  var uniques = {};
  var uniqueProperties = ['width', 'height', 'color', 'background-color',
    'margin', 'padding', 'border-radius', 'z-index'];
  for(var property of uniqueProperties) {
    uniques[camelCase(property)] = _.uniq(stats.declarations.properties[property]);
  }

  uniques.fontSize = _.uniq(getAllFontSizes(stats.declarations.properties));
  uniques.fontFamily = _.uniq(getAllFontFamilies(stats.declarations.properties));
  uniques.fontSizeSorted = sortFontSizes(uniques.fontSize);
  uniques.zIndexSorted = sortZIndices(uniques.zIndex);

  return uniques;

}

function parseSpecificity(selectors) {
  if (!selectors.length) return;
  var array = [];
  selectors.forEach(function(selector) {
    array.push(selector.specificity_10);
  });
  return array;
}

function fontSizeToPx(value) {
  var raw;

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
    return raw * .16;
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
    case 'x-large':
      return 24;
    case 'xx-large':
      return 32;
    case 'small':
      return 13;
    case 'larger':
      return 19;
    default:
      return 1024;
  }
}

function sortFontSizes(fontSizes) {
  var sortBy = function(a, b) {
    c = fontSizeToPx(a);
    d = fontSizeToPx(b);
    if (c > d) {
      return -1;
    } else {
      return 1;
    }
  }
  var sorted = fontSizes;
  if (!sorted) return false;
  return sorted.sort(sortBy);
}

function sortZIndices(zIndices) {
  var sorted = zIndices;
  if (!sorted) return false;
  return sorted.sort(function(a, b) { return a - b; });
}

function uniquesGraph(stats) {
  var obj = {};
  obj.max = 0;
  var keys = ['width', 'height', 'margin', 'padding', 'color', 'background-color'];
  keys.forEach(function(key) {
    camelKey = camelCase(key);
    obj[camelKey] = {};
    if (!stats.declarations.properties[key]) {
      obj[camelKey].total = 0;
      obj[camelKey].unique = 0;
    } else {
      obj[camelKey].total = stats.declarations.properties[key].length;
      obj[camelKey].unique = getUniquePropertyCount(key);
      if (obj[camelKey].total > obj.max) {
        obj.max = obj[camelKey].total;
      }
    }
  });
  keys.forEach(function(key) {
    if (!obj[camelKey]) return false;
    obj[camelKey].percentTotal = obj[camelKey].total / obj.max;
    obj[camelKey].percentUnique = obj[camelKey].unique / obj.max;
  });
  return obj;
}

function spacingResets(stats) {
  var spacing = {};
  var spacingProperties = ['margin', 'margin-top', 'margin-left',
    'margin-right', 'margin-bottom', 'padding', 'padding-top', 'padding-left',
    'padding-bottom', 'padding-right'
  ]
  for(var property of spacingProperties) {
    spacing[camelCase(property)] = getPropertyValueCount(stats.declarations.property, '0');
  }

  return spacing;
}

module.exports = function(obj) {

    var model = {};
    model.stats = obj;

    model.totals = parseTotals(model.stats);
    model.uniques = parseUniques(model.stats);
    model.uniquesGraph = uniquesGraph(model.stats);
    model.specificityGraph = getSpecificityGraph(model.stats.selectors);
    model.rulesizeGraph = model.stats.rules.size.graph;
    model.mediaQueries = _.uniq(model.stats.mediaQueries.values);
    model.spacingResets = spacingResets(model.stats);

    return model;

};
