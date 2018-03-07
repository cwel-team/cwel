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
var BadgePageObject=__webpack_require__(1).default;describe('Badge Component',function(){var a;beforeEach(function(){a=new BadgePageObject}),it('should increment counter by 1',function(){a.navigate('/component/badge'),expect(a.text).toBe('1'),a.click(),expect(a.text).toBe('2')})});

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var _createClass=function(){function a(a,b){for(var c,d=0;d<b.length;d++)c=b[d],c.enumerable=c.enumerable||!1,c.configurable=!0,'value'in c&&(c.writable=!0),Object.defineProperty(a,c.key,c)}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}(),_pageObject=__webpack_require__(2),_pageObject2=_interopRequireDefault(_pageObject);Object.defineProperty(exports,'__esModule',{value:!0});function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}function _classCallCheck(a,b){if(!(a instanceof b))throw new TypeError('Cannot call a class as a function')}function _possibleConstructorReturn(a,b){if(!a)throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called');return b&&('object'==typeof b||'function'==typeof b)?b:a}function _inherits(a,b){if('function'!=typeof b&&null!==b)throw new TypeError('Super expression must either be null or a function, not '+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}var BadgePageObject=function(a){function b(){_classCallCheck(this,b);var a=_possibleConstructorReturn(this,(b.__proto__||Object.getPrototypeOf(b)).call(this,'Component','Badge'));return a.selector='.badge',a}return _inherits(b,a),_createClass(b,[{key:'click',value:function click(){return this.domElement.click()}},{key:'domElement',get:function get(){return element(by.css(this.selector))}},{key:'text',get:function get(){return this.domElement.getText()}}]),b}(_pageObject2.default);exports.default=BadgePageObject;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var _createClass=function(){function a(a,b){for(var c,d=0;d<b.length;d++)c=b[d],c.enumerable=c.enumerable||!1,c.configurable=!0,'value'in c&&(c.writable=!0),Object.defineProperty(a,c.key,c)}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}();Object.defineProperty(exports,'__esModule',{value:!0});function _classCallCheck(a,b){if(!(a instanceof b))throw new TypeError('Cannot call a class as a function')}var CwomponentPageObject=function(){function a(b,c){_classCallCheck(this,a),this.playgroundUrl=browser.params.protocol+'//'+browser.params.hostname+':'+browser.params.port,this.type=b,this.name=c,this.windowSizes=[{deviceSize:'xs',width:320,breakpoint:0},{deviceSize:'s',width:400,breakpoint:400},{deviceSize:'m',width:768,breakpoint:600},{deviceSize:'l',width:1100,breakpoint:1004},{deviceSize:'xl',width:1366,breakpoint:1280}]}return _createClass(a,[{key:'getPlaygroundUrl',value:function getPlaygroundUrl(){return''+this.playgroundUrl}},{key:'navigate',value:function navigate(a){browser.get(''+this.getPlaygroundUrl()+a)}},{key:'breakpointMatch',value:function breakpointMatch(a){var b=this,c=1<arguments.length&&void 0!==arguments[1]?arguments[1]:function(){};browser.driver.manage().window().getSize().then(function(d){var e=d.width,f=b.windowSizes.filter(function(b){return b.deviceSize===a}).shift()||{},g=b.windowSizes.filter(function(a){return e>=a.breakpoint}).pop()||{},h=f.deviceSize===g.deviceSize;h&&c()})}}]),a}();exports.default=CwomponentPageObject;

/***/ })
/******/ ]);
//# sourceMappingURL=badge.e2e.js.map