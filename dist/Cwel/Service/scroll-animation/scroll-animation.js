/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var Choreographer=__webpack_require__(1);angular.module('cwel').factory('animationFactory',function(){var a={"no-animation":[],"top-right":[{type:'scale',style:'top',from:0,to:-2,unit:'rem'},{type:'scale',style:'left',from:0,to:2,unit:'rem'}],"top-left":[{type:'scale',style:'top',from:0,to:-2,unit:'rem'},{type:'scale',style:'left',from:0,to:-2,unit:'rem'}]};return{getAnimation:function getAnimation(b,c,d){var e=a[b];if('undefined'!=typeof e){var f=[],g={range:d,selector:c};return angular.forEach(e,function(a){f.push(angular.extend({},a,g))}),f}return!1}}}),angular.module('cwel').directive('animate',['animationFactory','$window',function(a,b){return{scope:{animate:'@'},link:function link(c,d){function e(){var e=d[0].getBoundingClientRect().top,f=b.innerHeight,i=b.pageYOffset||j.scrollTop,k=j.clientTop||0,l=e+i-k;g=l<f?[(i-e)/e,l]:[l-f,l];var m=c.animate;h=a.getAnimation(m,d[0],g),d.parent().addClass(m)}function f(){e(),k.updateAnimations(h)}var g,h,i,j=document.body;e();var k=new Choreographer({animations:h});angular.element(b).on('scroll',function(){var a=-1*(j.getBoundingClientRect().top-j.offsetTop);k.runAnimationsAt(a)}),angular.element(b).on('resize',function(){clearTimeout(i),i=setTimeout(function(){f()},250)})}}}]);

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Choreographer = __webpack_require__(2);
module.exports = Choreographer;

window.Choreographer = Choreographer;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Animation = __webpack_require__(3);
var defaultAnimations = __webpack_require__(4);

// Store a no-op
var noop = function noop() {};

/** Choreographer
  * constructed with a config object with the following keys and values:
      {Object} customFunctions | [optional] Keys are function names, values are animation functions.
      {Array} animations       | An array of Animation class config objects.
 **/

var Choreographer = function () {
  function Choreographer(config) {
    var _this = this;

    _classCallCheck(this, Choreographer);

    this.customFunctions = config.customFunctions || {};
    this.animations = config.animations.map(function (anim) {
      anim.fn = _this.getAnimationFn(anim.type);
      return new Animation(anim);
    });
  }

  /** Helper to grab a function by its type. First try the defaults, then custom, then no-op.
    * @param {String} type | the name (or key value) of the animation function.
   **/


  _createClass(Choreographer, [{
    key: 'getAnimationFn',
    value: function getAnimationFn(type) {
      return defaultAnimations[type] || this.customFunctions[type] || noop;
    }

    /** If you need to update the animation configs at any point.
      * @param {Array} animations | An array of your new Animation class config objects.
     **/

  }, {
    key: 'updateAnimations',
    value: function updateAnimations(animations) {
      var _this2 = this;

      // Wipe out the old animations and replace 'em.
      this.animations = animations.map(function (anim) {
        anim.fn = _this2.getAnimationFn(anim.type);
        return new Animation(anim);
      });
    }

    /** Run those animations based on a given location!
      * @param {Number} position | the location marker - could be a scroll location, a timestamp, a mouseX position...
     **/

  }, {
    key: 'runAnimationsAt',
    value: function runAnimationsAt(position) {

      // Clear all the nodes' 'animated' attribute.
      this.animations.forEach(function (anim) {
        anim.nodes.forEach(function (node) {
          return node.setAttribute('animated', '');
        });
      });

      // Run and done.
      this.animations.forEach(function (anim) {
        return anim.runAt(position);
      });
    }
  }]);

  return Choreographer;
}();

module.exports = Choreographer;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/** The Animation class.
  *
  * constructed with the following config object properties:
    {String} type     | the name of the animation function
    {Function} fn     | the animation function
    {Array} range     | either a one- or two-dimensional array of ranges, i.e. [0,5] or [[0,3], [4,5]]
    NOTE: Bugs will occur if you overlap animation ranges that affect the same style properties!

    [ Only one of the below (selector or selectors) is necessary. If they both exist, 'selectors' will be used. ]
    {String} selector | a valid DOM Element selector string, ex. '.classname' or '#box .thing[data-attr=true]'
    {Array} selectors | an array of selector strings (described above).

    {String} style    | a valid CSS style property.
    NOTE: If you are using 'transform', follow it with a colon and the property name, ex. 'transform:scaleX'

    {Number} from     | The minimum value to set to the style property. Useful when progressively calculating a value.
    {Number} to       | The value to set to the style property. (Or the max, when progressively calculating a value.)
    NOTE: If you are ONLY using the 'to' value, like with a 'change' animation, this could also be {String} to.

    {String} unit     | The unit string to append to the value, ex. '%', 'px', 'deg'
 **/

var Animation = function () {
  function Animation(config) {
    _classCallCheck(this, Animation);

    this.config = config;
    this.storeNodes();
  }

  // Either use 'selector' or 'selectors' to find and store all the DOM nodes.


  _createClass(Animation, [{
    key: 'storeNodes',
    value: function storeNodes() {
      var _this = this;

      if (this.config.selector) {

        if (typeof this.config.selector === 'string') {
          this.nodes = Array.prototype.slice.call(document.querySelectorAll(this.config.selector));
        } else if (this.config.selector.length) {
          this.nodes = Array.prototype.slice.call(this.config.selector);
        } else {
          this.nodes = [this.config.selector];
        }
      }

      if (this.config.selectors) {
        this.nodes = [];
        this.config.selectors.forEach(function (s) {

          if (typeof s === 'string') {
            var nodes = Array.prototype.slice.call(document.querySelectorAll(s));
            _this.nodes = _this.nodes.concat(nodes);
          } else if (_this.config.selector.length) {
            _this.nodes = _this.nodes.concat(Array.prototype.slice.call(s));
          } else {
            _this.nodes = _this.nodes.push(s);
          }
        });
      }
    }

    // Just a helper to get the relative location of a value within a range.
    // example: getProgress(1, [0, 2]) = 0.5

  }, {
    key: 'getProgress',
    value: function getProgress(val, _ref) {
      var _ref2 = _slicedToArray(_ref, 2);

      var min = _ref2[0];
      var max = _ref2[1];

      return (val - min) / (max - min);
    }

    /** Returns the 'progress' - relative position within the animation range.
      * @param {Number} position  | passed in value from 'runAt' (below)
      * @return {Number} progress | the relative location (between 0 and 1 when in range) within a range.
                                    if there are multiple ranges and the position is not in any of them,
                                    return -1. Otherwise, return the value (even if out of range).
     **/

  }, {
    key: 'getProgressAt',
    value: function getProgressAt(position) {
      // If there are multiple ranges, then figure out which one is relevant and
      // calculate the progress within that one. You can't have multiple active
      // ranges unless they're overlapping -- in which case it is YOUR bug, dude.
      if (_typeof(this.config.range[0]) === 'object') {

        var activeRange = void 0;

        // If there's a range that is active, store it!
        this.config.range.forEach(function (r) {
          if (isBetween(postion, r[0], r[1])) activeRange = r;
        });

        if (!activeRange) return -1;else return this.getProgress(position, activeRange);
      }

      return this.getProgress(position, this.config.range);
    }

    /** And this is where all of that work ~finally~ pays off!
      * This runs the animation by getting the relative progress and running accordingly.
      * @param {Number} position  | the location marker - could be a scroll location, a timestamp, a mouseX position...
     **/

  }, {
    key: 'runAt',
    value: function runAt(position) {
      var _this2 = this;

      var progress = this.getProgressAt(position);

      // If we are OUT OF RANGE, then we have to do a few extra things.
      if (progress < 0 || progress > 1) {

        // First, check if any of our nodes were already animated at this same style prop, at this same location.
        var animated = void 0;
        this.nodes.forEach(function (node) {
          if (node.getAttribute('animated').indexOf(_this2.config.style) > -1) animated = true;
        });

        // If NOT, then you can go ahead and animate it here.
        // We need this checkpoint to avoid overriding each other.

        // If you're using class instead of style props, it don't matter.
        if (this.config.style === 'class' || !animated) {
          // If it's a simple 'change' function, we just need a value outside of 0 to 1. Could be -9.87. Doesn't matter.
          if (this.config.type === 'change') progress = -1;

          // If it's a 'scale' function, then get the min or max progress.
          if (this.config.type === 'scale') {
            if (progress < 0) progress = 0;
            if (progress > 1) progress = 1;
          }
        } else {

          // If we are OUT OF RANGE and some of our nodes are already animated, then get out of here!!!!
          return;
        }
      }

      // OK, finally ready? Run that animation, baby.
      this.nodes.forEach(function (node) {

        // If in range ---
        // (Notice that we're NOT doing >= and <= here. This is because if you're on the edges of the
        // range, you should be able to override this animation with another one.)
        if (progress > 0 && progress < 1) {
          node.setAttribute('animated', node.getAttribute('animated') + '|' + _this2.config.style);
        }

        _this2.config.fn({
          node: node,
          style: _this2.config.style,
          from: _this2.config.from,
          to: _this2.config.to,
          unit: _this2.config.unit,
          progress: progress
        });
      });
    }
  }]);

  return Animation;
}();

module.exports = Animation;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var getInjectedTransformString = __webpack_require__(5);

/** @method scale
  * [built-in animation function]
  * Based on the data provided, your node will receive an updated, scaled style value.
  *
  * @param {Object} data : {
  *          {Node} node       | the node you want to modify
  *          {String} style    | the style property you want to modify
  *          {Number} from     | minimum value
  *          {Number} to       | maximum value
  *          {Number} progress | a value between 0 and 1; the proportion of value we should use
  *          {String} unit     | optional - unit value, e.g. 'px' or '%'
  *        }
 **/
var scale = function scale(data) {
  // Get the relative value (proportional to the min-max range you gave.)
  var scaledValue = (data.to - data.from) * data.progress + data.from;
  // Stick on the unit, if there is one.
  var scaledValueString = data.unit ? scaledValue + data.unit : scaledValue;

  // If it's a regular old style property, just replace the value. No fuss.
  if (data.style.split(':').length === 1) {
    data.node.style[data.style] = scaledValueString;
    return;
  }

  /*~~ If the style is a CSS transform, we gotta do some funky shit. ~~*/
  var transformProp = data.style.split(':')[1];
  data.node.style.transform = getInjectedTransformString(data.node, transformProp, scaledValueString);
};

/** @method change
  * [built-in animation function]
  * Based on the data provided, your node will have the style value assigned or remok
  * @param {Object} data : {
  *          {Node} node       | the node you want to modify
  *          {String} style    | the style property you want to modify
  *          {Value} to        | the style value (number, string -- whatever valid type this CSS prop takes)
  *          {Number} progress | a value between 0 and 1; the proportion of value we should use
  *        }
 **/
var change = function change(data) {
  var newValue = data.progress < 0 ? null : data.to;
  var newValueString = newValue && data.unit ? newValue + data.unit : newValue;

  // If the progress is less than 0, we just need to nullify this style value.
  // But, if the style prop is 'transition', apply it only after the last transition ends.
  if (data.progress < 0 && data.style === 'transition') {
    data.node.addEventListener('transitionend', function (e) {
      if (e.target === data.node) data.node.style[data.style] = null;
    });
    return;
  }

  // If it's a regular old style property, just replace the value. No fuss.
  if (data.style.split(':').length === 1) {
    if (data.style === 'class') {
      data.node.classList[newValue ? 'add' : 'remove'](data.to);
      return;
    }

    data.node.style[data.style] = newValueString;
    return;
  }

  /*~~ If the style is a CSS transform, we gotta do some funky shit. ~~*/
  var transformProp = data.style.split(':')[1];
  data.node.style.transform = getInjectedTransformString(data.node, transformProp, newValueString);
};

module.exports = { scale: scale, change: change };

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var translations = {
  translateX: 0,
  translateY: 1,
  translateZ: 2
};

var scales = {
  scaleX: 0,
  scaleY: 1,
  scaleZ: 2
};

var transformKeys = {
  'transform': 'transform',
  'webkitTransform': '-webkit-transform',
  'MozTransform': '-moz-transform',
  'msTransform': '-ms-transform',
  'OTransform': '-o-transform'
};

// Get the correct transform key value, either plain 'transform' or a prefixed one.
var getTransformKey = function getTransformKey() {
  if (!window.getComputedStyle) return null;

  var el = document.createElement('div');
  document.body.insertBefore(el, null);

  for (var t in transformKeys) {
    if (window.getComputedStyle(el)[t]) {
      document.body.removeChild(el);
      return t;
    }
  }

  document.body.removeChild(el);
  return null;
};

// Check if we have 3d support
var getHas3d = function getHas3d() {
  if (!transformKey) return false; // No transform, no 3d. GET A NEW BROWSER YO

  var el = document.createElement('div');
  document.body.insertBefore(el, null);
  el.style[transformKey] = 'translate3d(1px,1px,1px)';

  var has3d = !!window.getComputedStyle(el).getPropertyValue(transformKey);
  document.body.removeChild(el);

  return has3d;
};

// Cache these values
var transformKey = getTransformKey();
var has3d = getHas3d();

var getInjectedTransformString = function getInjectedTransformString(node, prop, val) {

  // If your browser doesn't support even prefixed transforms... get a new browser. Bye.
  if (!transformKey) return;

  // Get the node's previous transform value and store it.
  var oldTransformString = node.style[transformKey] || '';

  // set up variable declarations for 3d stuff
  var transform3dString = void 0;
  var axis = void 0;
  var xyz = void 0;

  // If we've got 3d, then USE IT! It's sooo much smoother. #blessed
  if (has3d) {

    // If it's a translate or scale, we can 3d-ify that. (I know there's some duplication but I'd rather be explicit here.)

    // Axis is the index of the value we'll want to change (X is 0, Y is 1, Z is 3)
    // Prop is the name of the property
    // XYZ holds our actual values.
    if (translations[prop] !== undefined) {
      axis = translations[prop];
      prop = 'translate3d';
      xyz = ['0', '0', '0'];
      if (val === null) val = 0;
    } else if (scales[prop] !== undefined) {
      axis = scales[prop];
      prop = 'scale3d';
      xyz = ['1', '1', '1'];
      if (val === null) val = 1;
    }

    // If everything checks out, we should have our values set!
    if (axis !== undefined) {
      if (oldTransformString.indexOf(prop) > -1) {
        var startOfString = oldTransformString.split(prop + '(')[0];
        var extractedValue = oldTransformString.split(prop + '(')[1].split(')')[0];
        xyz = extractedValue.split(',');
      }

      // Replace the value in the array, then join that sucker together.
      xyz[axis] = val;
      transform3dString = prop + '(' + xyz.join(',') + ')';
    }
  }

  // Make a nice new string out of it with the scaled value.
  var transformInjection = transform3dString || prop + '(' + val + ')';

  var newTransformString = oldTransformString;

  // Check if the new prop is already declared somehow in the old style value
  var transformPropExists = oldTransformString.indexOf(prop) > -1;

  // Because if it is, you don't want to add another copy.
  if (transformPropExists) {
    var _startOfString = oldTransformString.split(prop)[0];
    var endOfString = oldTransformString.split(prop)[1].split(')')[1];
    newTransformString = _startOfString + transformInjection + endOfString;
  }
  // In the same vein, if it isn't, you can't just replace the value because there might
  // be some other transform properties hangin' out in there.
  else newTransformString += ' ' + transformInjection;

  return newTransformString;
};

module.exports = getInjectedTransformString;

/***/ })
/******/ ]);
//# sourceMappingURL=scroll-animation.js.map