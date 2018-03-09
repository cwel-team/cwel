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
var _createClass=function(){function a(a,b){for(var c,d=0;d<b.length;d++)c=b[d],c.enumerable=c.enumerable||!1,c.configurable=!0,'value'in c&&(c.writable=!0),Object.defineProperty(a,c.key,c)}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}();function _classCallCheck(a,b){if(!(a instanceof b))throw new TypeError('Cannot call a class as a function')}angular.module('cwel').service('Breakpoint',['$window','$rootScope',function(a,b){return new(function(){function c(){var b=this;_classCallCheck(this,c),this.events=[],this.deviceSizes=[{name:'xs',breakpoint:0,standardWidth:320,standardHeight:568},{name:'s',breakpoint:400,standardWidth:400,standardHeight:736},{name:'m',breakpoint:600,standardWidth:600,standardHeight:1024},{name:'l',breakpoint:1004,standardWidth:1004,standardHeight:1366},{name:'xl',breakpoint:1280,standardWidth:1280,standardHeight:1600}],this.currentDevice=this.deviceSizes.filter(function(a){return b.generateMediaQuery(a.name).matches}).shift(),angular.element(a).bind('resize',function(){b.deviceSizes.forEach(function(a,c){var d=b.generateMediaQuery(a.name),e=b.deviceSizes[c-1]||void 0,f=b.deviceSizes[c+1]||void 0;b.currentDevice.name!==a.name&&!0===d.matches&&(b.currentDevice=a,b.emit(a.name,{previous:e,current:a,next:f}))})})}return _createClass(c,[{key:'on',value:function on(a,b){var c=this;return'string'==typeof a&&(a=[a]),a.forEach(function(a){c.events.push({name:a,callback:b})}),this}},{key:'emit',value:function emit(a){for(var c=arguments.length,d=Array(1<c?c-1:0),e=1;e<c;e++)d[e-1]=arguments[e];var f=this.events.filter(function(b){return b.name===a||'all'===b.name});b.$applyAsync(function(){f.forEach(function(a){return a.callback.apply(a,d)})})}},{key:'getDeviceSizesSmallerThanCurrent',value:function getDeviceSizesSmallerThanCurrent(){return this.deviceSizes.filter(function(b){var c='(max-width: '+b.breakpoint+'px)';return!a.matchMedia(c).matches})}},{key:'generateMediaQuery',value:function generateMediaQuery(b){var c=this.deviceSizes.map(function(a){return a.name}).indexOf(b),d=this.deviceSizes[c],e=this.deviceSizes[c+1],f=['(min-width: '+d.breakpoint+'px)'];return e&&f.push('(max-width: '+(e.breakpoint-1)+'px)'),a.matchMedia(''+f.join(' and '))}}]),c}())}]);

/***/ })
/******/ ]);
//# sourceMappingURL=breakpoint.js.map