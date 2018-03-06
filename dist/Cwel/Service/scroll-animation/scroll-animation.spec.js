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
/* WEBPACK VAR INJECTION */(function(module) {describe('Animation Factory',function(){var a;beforeEach(function(){module('cwel'),inject(function(b){a=b})}),it('should handle the animation if the name doesnt exist',function(){var b=a.getAnimation('fakeAnimation');expect(b).toBe(!1)}),it('should handle when no animation is used',function(){var b=a.getAnimation('no-animation');expect(b).toEqual([])}),it('should handle when elm does exist but range doesnt',function(){var b=document.querySelectorAll('[animate="top-right"]'),c=a.getAnimation('no-animation',b,'');expect(c).not.toEqual([{type:'scale',style:'top',from:0,to:-2,unit:'rem',range:'0 , 0',selector:b},{type:'scale',style:'left',from:0,to:2,unit:'rem',range:'0 , 0',selector:b}])}),it('should handle when range does exist but elm doesnt',function(){var b=document.querySelectorAll('[animate="fakeAnimation"]'),c=a.getAnimation('top-right',b,'0 , 0');expect(c).not.toEqual([{type:'scale',style:'top',from:0,to:-2,unit:'rem',range:'0 , 0',selector:b},{type:'scale',style:'left',from:0,to:2,unit:'rem',range:'0 , 0',selector:b}])}),it('should handle when both range and elm dont exist',function(){var b=document.querySelectorAll('[animate="top-right"]'),c=a.getAnimation('no-animation','','');expect(c).not.toEqual([{type:'scale',style:'top',from:0,to:-2,unit:'rem',range:'0 , 0',selector:b},{type:'scale',style:'left',from:0,to:2,unit:'rem',range:'0 , 0',selector:b}])}),it('should handle when both range and elm exist',function(){var b=document.querySelectorAll('[animate="top-right"]'),c=a.getAnimation('top-right',b,'0 , 0');expect(c).toEqual([{type:'scale',style:'top',from:0,to:-2,unit:'rem',range:'0 , 0',selector:b},{type:'scale',style:'left',from:0,to:2,unit:'rem',range:'0 , 0',selector:b}])})});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)(module)))

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = function(module) {
	if(!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ })
/******/ ]);
//# sourceMappingURL=scroll-animation.spec.js.map