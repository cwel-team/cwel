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
angular.module('cwel').directive('cwelCardSlider',['CwoMI','CwomponentFactory','Breakpoint',function(a,b,c){function d(a,b){return(b-b%a+a)/a-1}return b({restrict:'A',scope:{startIndex:'@',count:'@'},link:function link(b,e){b.previousSwipe=Date.now(),b.deltaTime=function(){return Date.now()-b.previousSwipe},b.count=parseInt(b.count,10),b.cardsPerSlide='m'===c.currentDevice.name||'l'===c.currentDevice.name||'xl'===c.currentDevice.name?3:1;var f=new Hammer(e[0]);f.on('swipeleft',function(){b.$apply(function(){b.next()})}),f.on('swiperight',function(){b.$apply(function(){b.previous()})}),b.$watch('currentIndex',function(a){a>b.maxIndex()&&(b.currentIndex=b.maxIndex()),0>a&&(b.currentIndex=0)}),c.on(['xs','s'],function(){b.cardsPerSlide=1,b.responsiveAdjustIndex()}).on(['m','l','xl'],function(){b.cardsPerSlide=3,b.responsiveAdjustIndex()}),b.responsiveAdjustIndex=function(){b.currentIndex>b.maxIndex()&&(b.currentIndex=b.maxIndex()),0>b.currentIndex&&(b.currentIndex=0)},b.maxIndex=function(){return d(b.cardsPerSlide,b.count-1)},b.currentIndex=parseInt(b.startIndex,10),b.previous=function(){b.previousSwipe=Date.now(),b.currentIndex=Math.max(0,b.currentIndex-1),a.logEvent({event:'CardSlider-Previous-'+b.currentIndex})},b.next=function(){b.previousSwipe=Date.now(),b.currentIndex=Math.min(b.count-1,b.currentIndex+1),a.logEvent({event:'CardSlider-Next-'+b.currentIndex})}}})}]);

/***/ })
/******/ ]);
//# sourceMappingURL=CardSlider.js.map