(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["screening"] = factory();
	else
		root["screening"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict'


	var Util=__webpack_require__(1);
	var Plate=__webpack_require__(2);


	module.exports = {
	    Util,
	    Plate
	};


/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict'

	/*
	 Convert 'A5' to
	 */
	function positionToNumber(position, width) {
	    if (width===undefined) throw Error('need to specify width for numberToPosition');
	    position=position.toUpperCase().replace(/[^0-9A-Z]/g,'');
	    var string=position.replace(/[0-9]+/,'');
	    var number=position.replace(/[A-Z]+/,'');
	    return (stringToNumber(string)-1)*width+(number*1);
	}

	function numberToPosition(number, width) {
	    if (width===undefined) throw Error('need to specify width for numberToPosition');
	    number--;
	    return numberToString(Math.floor(number/width)+1)+(number%width+1);
	}

	function stringToNumber(string) {
	    var number = 0;
	    for (var i=0; i<string.length; i++) {
	        number *= 26;
	        number += string.charCodeAt(i)-64;
	    }
	    return number;
	}

	function numberToString(number) {
	    var string='';
	    while (number!=0) {
	        string = String.fromCharCode((number-1)%26+65) + string;
	        number = Math.floor((number-1)/26);
	    }
	    return string;
	}

	module.exports = {
	    numberToString,
	    stringToNumber,
	    numberToPosition,
	    positionToNumber
	}

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Util=__webpack_require__(1);

	/*
	index starts at 1 !

	 */

	class Plate {
	    constructor(options) {
	        options = options || {};
	        
	        this.width = options.width || 12;
	        this.height = options.height || this.width / 3 * 2;
	        this.size = this.width * this.height;
	        this.initialize();
	    }

	    getData() {
	        return this.data;
	    }

	    get(index) {
	        return this.data[index-1];
	    }

	    initialize() {
	        this.data=new Array(this.size);
	        for (var row=0; row<this.height; row++) {
	            for (var column=0; column<this.width; column++) {
	                var i=row*this.width+column;
	                this.data[i]={
	                    number: i+1,
	                    position: Util.numberToPosition(i+1, this.width),
	                    value: {}
	                };
	            }
	        }
	        console.log('done');
	    }
	}



	module.exports=Plate;


/***/ }
/******/ ])
});
;