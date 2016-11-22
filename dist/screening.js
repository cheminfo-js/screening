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
	var IconNMR=__webpack_require__(3);

	module.exports = {
	    Util,
	    Plate,
	    IconNMR
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

	    getWells() {
	        return this.wells;
	    }

	    select(range) {
	        if (range) {
	            this.wells.forEach(function(well) {
	                well.selected=false;
	            });
	            var reg = /(\d+)(-(\d+))?,?/g;
	            var m;
	            while(m = reg.exec(range)) {
	                var from = +m[1];
	                var to = +m[3];
	                if(to && from <= to) {
	                    for (var i=from; i<=to; i++) {
	                        var well = this.wells[i-1];
	                        if (! isEmpty(well.info)) well.selected=true;
	                    }
	                } else {
	                    var well = this.wells[from-1];
	                    if (! isEmpty(well.info)) well.selected=true;
	                }
	            }
	        } else {
	            this.wells.forEach(function(well) {
	                if (isEmpty(well.info)) {
	                    well.selected=false;
	                } else {
	                    well.selected=true;
	                }
	            });
	        }
	    }

	    getArrayElement(index) {
	        return this.wells[index];
	    }

	    updateColor(options) {
	        this.wells.forEach(function(well) {
	            if (isEmpty(well.info)) {
	                well.color='white';
	            } else if (well.selected) {
	                well.info.color= 'rgba(144, 238, 144, 1)';
	            } else {
	                well.info.color='rgba(144, 238, 144, 0.3)';
	            }
	        })
	    }


	    getByPosition(position) {
	        return this.wells[Util.positionToNumber(position, this.width)-1];
	    }

	    getByNumber(number) {
	        return this.wells[number-1];
	    }

	    initialize() {
	        this.wells=new Array(this.size);
	        for (var row=0; row<this.height; row++) {
	            for (var column=0; column<this.width; column++) {
	                var i=row*this.width+column;
	                this.wells[i]={
	                    number: i+1,
	                    position: Util.numberToPosition(i+1, this.width),
	                    info: {}
	                };
	            }
	        }
	    }
	}

	function isEmpty(object) {
	    var isEmpty = Object.keys(object).length === 0 && object.constructor === Object;
	    return isEmpty;
	}

	module.exports=Plate;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict'

	var Util=__webpack_require__(1);


	/*
	options:
	- eol : end of line delimiter (Default: \r\n)
	- plateNumber : the position of the plate (Default: 1)
	- deleteExistingHolder : flag specifying if existing experiments should be deleted (Default: false)
	- autosubmit : submit automatically (Default: false)
	 */

	function generateFile (requests, options) {
	    var options = options || {};
	    var EOL = options.eol || "\r\n";
	    var plateNumber = options.plateNumber || 1;
	    var textFile = [];

	    for (var request of requests) {
	        var holder=getHolder(request.position, plateNumber);
	        var experimentNumber=getExperimentNumber(request.position);
	        if (options.deleteExistingHolder) {
	            textFile.push("USER "+request.user);
	            textFile.push("HOLDER "+holder);
	            textFile.push("DELETE"); // this is required to delete already existing entries
	        }
	        textFile.push("USER "+request.user);
	        textFile.push("HOLDER "+holder);
	        if (! options.autosubmit) textFile.push("NO_SUBMIT");
	        textFile.push("NAME "+request.name);
	        textFile.push("TITLE "+request.title);
	        for (var experiment of request.experiments) {
	            textFile.push("EXPNO "+experimentNumber++);
	            textFile.push("SOLVENT "+experiment.solvent);
	            textFile.push("EXPERIMENT "+experiment.experiment);
	            if (experiment.parameters && experiment.parameters.length>0) {
	                var parameters=[];
	                for (var parameter of experiment.parameters) {
	                    parameters.push(parameter.label, parameter.value);
	                }
	                textFile.push("PARAMETERS "+parameters.join(','));
	            }
	        }
	        textFile.push("");
	    }
	    return textFile.join(EOL);
	}

	function getHolder(position, plateNumber) {
	    return plateNumber*100+Util.positionToNumber(position, 12);
	}

	function getExperimentNumber(position) {
	    return Util.positionToNumber(position, 12)*10;
	}

	module.exports={
	    generateFile
	}

/***/ }
/******/ ])
});
;