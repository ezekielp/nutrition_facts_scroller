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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _styles_index_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles/index.scss */ "./src/styles/index.scss");
/* harmony import */ var _styles_index_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_styles_index_scss__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _scripts_scroll_slides__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./scripts/scroll/slides */ "./src/scripts/scroll/slides.js");


var nutritionData;
d3.csv("nutrition_facts_for_scroller.csv", function (d) {
  return {
    food_name: d["Food name"],
    serving_size: d["Amount"],
    fiber: +d["Fiber"],
    iron: +d["Iron"],
    magnesium: +d["Magnesium"],
    potassium: +d["Potassium"],
    zinc: +d["Zinc"],
    vitamin_c: +d["Vitamin C"],
    folate: +d["Folate"],
    vitamin_b12: +d["Vitamin B-12"],
    vitamin_a: +d["Vitamin A"],
    vitamin_d: +d["Vitamin D"],
    cholesterol: +d["Cholesterol"]
  };
}).then(function (data) {
  nutritionData = data;
  console.log(nutritionData);
  createVisualization(nutritionData[0], 0, true);

  for (var i = 1; i < nutritionData.length; i++) {
    createVisualization(nutritionData[i], i);
  }
});

var createVisualization = function createVisualization(foodData, idx, createXAxisBool) {
  var margin = {
    top: 40,
    right: 40,
    bottom: 65,
    left: 50
  };
  var w = 700 - margin.left - margin.right;
  var h = 600 - margin.top - margin.bottom;
  var data = Object.values(foodData).slice(2, -1);
  var numberOfColumns = 10;
  var maxValue = Math.max(.50, d3.max(data, function (d) {
    return +d / 100;
  }));
  var x_axisLength = w;
  var y_axisLength = h;
  var targetSVG = "slide-svg-" + idx;
  var targetSlideRect = "slide-svg-" + idx + "-rect";
  var xScale = d3.scaleLinear().domain([0, numberOfColumns]).range([0, w]);
  var yScale = d3.scaleLinear().domain([0, maxValue]).range([h - margin.top, margin.bottom]);
  var svg = d3.select("#vis").append("svg").attr("width", w + margin.left + margin.right).attr("height", h + margin.top + margin.bottom);
  svg.selectAll("rect").data(data).enter().append("rect").attr("class", "".concat(targetSlideRect, " hidden chart-rect")).attr("x", function (d, i) {
    return i * (x_axisLength / numberOfColumns) + margin.left + 10;
  }).attr("y", function (d) {
    return yScale(d / 100);
  }).attr("width", x_axisLength / numberOfColumns - 1).attr("height", function (d) {
    return h - yScale(d / 100) - margin.top;
  }).attr("fill", "red").transition().duration(500);
  var xAxis = d3.axisBottom(xScale).tickSize(0).tickFormat(function (d) {
    return Object.keys(foodData).slice(2, -1)[d];
  });

  if (createXAxisBool !== undefined) {
    svg.append("g").attr("class", "".concat(targetSVG, "-x-axis x-axis")).attr("transform", "translate(" + margin.left + ", " + (h - margin.top) + ")").transition().duration(1000).call(xAxis);
    svg.selectAll(".x-axis text").attr("transform", function (d) {
      return "translate(25, 25)rotate(-45)";
    });
  }

  var yAxis = d3.axisLeft(yScale).ticks(4, "%");
  svg.append("g").attr("class", "".concat(targetSVG, "-y-axis y-axis")).attr("transform", "translate(" + margin.left + ",0)").style("opacity", "0%").call(yAxis);
};

window.addEventListener("load", function (e) {
  var slides = [];

  for (var i = 0; i < 19; i++) {
    var slideName = "#slide-container-" + i;
    var newSlide = document.querySelector(slideName);
    slides.push(newSlide);
  }

  createObservers(slides);
}, false);

var createObservers = function createObservers(slides) {
  var options = {
    root: null,
    rootMargin: "0px 0px 0px 0px",
    threshold: .3
  };
  _scripts_scroll_slides__WEBPACK_IMPORTED_MODULE_1__["bananaSlide"](options, slides[0]);
  _scripts_scroll_slides__WEBPACK_IMPORTED_MODULE_1__["potatoSlide"](options, slides[1]);
  _scripts_scroll_slides__WEBPACK_IMPORTED_MODULE_1__["butterSlide"](options, slides[2]);
  _scripts_scroll_slides__WEBPACK_IMPORTED_MODULE_1__["avocadoSlide"](options, slides[3]);
};

/***/ }),

/***/ "./src/scripts/scroll/slides.js":
/*!**************************************!*\
  !*** ./src/scripts/scroll/slides.js ***!
  \**************************************/
/*! exports provided: bananaSlide, potatoSlide, butterSlide, avocadoSlide, beefLiverSlide, codLiverSlide, eggSlide, herringSlide, tunaSlide, broccoliSlide, peasSlide, redPepperSlide, oysterSlide, spinachSlide, quinoaSlide, chocolateSlide, strawberrySlide, beanSlide */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "bananaSlide", function() { return bananaSlide; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "potatoSlide", function() { return potatoSlide; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "butterSlide", function() { return butterSlide; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "avocadoSlide", function() { return avocadoSlide; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "beefLiverSlide", function() { return beefLiverSlide; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "codLiverSlide", function() { return codLiverSlide; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "eggSlide", function() { return eggSlide; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "herringSlide", function() { return herringSlide; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tunaSlide", function() { return tunaSlide; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "broccoliSlide", function() { return broccoliSlide; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "peasSlide", function() { return peasSlide; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "redPepperSlide", function() { return redPepperSlide; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "oysterSlide", function() { return oysterSlide; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spinachSlide", function() { return spinachSlide; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "quinoaSlide", function() { return quinoaSlide; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "chocolateSlide", function() { return chocolateSlide; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "strawberrySlide", function() { return strawberrySlide; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "beanSlide", function() { return beanSlide; });
var bananaSlide = function bananaSlide(options, slide) {
  var handleBananaScrollOnto = function handleBananaScrollOnto(entries, observer) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var bananaRects = document.querySelectorAll(".slide-svg-0-rect");
        bananaRects.forEach(function (rect) {
          rect.classList.remove("hidden");
        });
        var potatoRects = document.querySelectorAll(".slide-svg-1-rect");
        potatoRects.forEach(function (rect) {
          rect.classList.add("hidden");
        });
        d3.select(".slide-svg-0-y-axis").transition().style("opacity", "100%").duration(500);
        d3.select(".slide-svg-1-y-axis").transition().style("opacity", "0%").duration(500);
      }
    });
  };

  var observer = new IntersectionObserver(handleBananaScrollOnto, options);
  observer.observe(slide);
};
var potatoSlide = function potatoSlide(options, slide) {
  var handlePotatoScrollOnto = function handlePotatoScrollOnto(entries, observer) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var potatoRects = document.querySelectorAll(".slide-svg-1-rect");
        potatoRects.forEach(function (rect) {
          rect.classList.remove('hidden');
        });
        var bananaRects = document.querySelectorAll(".slide-svg-0-rect");
        bananaRects.forEach(function (rect) {
          rect.classList.add('hidden');
        });
        var butterRects = document.querySelectorAll(".slide-svg-2-rect");
        butterRects.forEach(function (rect) {
          rect.classList.add('hidden');
        });
        d3.select(".slide-svg-1-y-axis").transition().style("opacity", "100%").duration(500);
        d3.select(".slide-svg-0-y-axis").transition().style("opacity", "0%").duration(500);
        d3.select(".slide-svg-2-y-axis").transition().style("opacity", "0%").duration(500);
      }
    });
  };

  var observer = new IntersectionObserver(handlePotatoScrollOnto, options);
  observer.observe(slide);
};
var butterSlide = function butterSlide(options, slide) {
  var handleButterScrollOnto = function handleButterScrollOnto(entries, observer) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var butterRects = document.querySelectorAll(".slide-svg-2-rect");
        butterRects.forEach(function (rect) {
          rect.classList.remove("hidden");
        });
        var potatoRects = document.querySelectorAll(".slide-svg-1-rect");
        potatoRects.forEach(function (rect) {
          rect.classList.add("hidden");
        });
        var avocadoRects = document.querySelectorAll(".slide-svg-3-rect");
        avocadoRects.forEach(function (rect) {
          rect.classList.add("hidden");
        });
        d3.select(".slide-svg-2-y-axis").transition().style("opacity", "100%").duration(500);
        d3.select(".slide-svg-1-y-axis").transition().style("opacity", "0%").duration(500);
        d3.select(".slide-svg-3-y-axis").transition().style("opacity", "0%").duration(500);
      }
    });
  };

  var observer = new IntersectionObserver(handleButterScrollOnto, options);
  observer.observe(slide);
};
var avocadoSlide = function avocadoSlide(options, slide) {
  var handleAvocadoScrollOnto = function handleAvocadoScrollOnto(entries, observer) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var avocadoRects = document.querySelectorAll(".slide-svg-3-rect");
        avocadoRects.forEach(function (rect) {
          rect.classList.remove("hidden");
        });
        var butterRects = document.querySelectorAll(".slide-svg-2-rect");
        butterRects.forEach(function (rect) {
          rect.classList.add("hidden");
        });
        var beefLiverRects = document.querySelectorAll(".slide-svg-4-rect");
        beefLiverRects.forEach(function (rect) {
          rect.classList.add("hidden");
        });
        d3.select(".slide-svg-3-y-axis").transition().style("opacity", "100%").duration(500);
        d3.select(".slide-svg-2-y-axis").transition().style("opacity", "0%").duration(500);
        d3.select(".slide-svg-4-y-axis").transition().style("opacity", "0%").duration(500);
      }
    });
  };

  var observer = new IntersectionObserver(handleAvocadoScrollOnto, options);
  observer.observe(slide);
};
var beefLiverSlide = function beefLiverSlide(options, slide) {};
var codLiverSlide = function codLiverSlide(options, slide) {};
var eggSlide = function eggSlide(options, slide) {};
var herringSlide = function herringSlide(options, slide) {};
var tunaSlide = function tunaSlide(options, slide) {};
var broccoliSlide = function broccoliSlide(options, slide) {};
var peasSlide = function peasSlide(options, slide) {};
var redPepperSlide = function redPepperSlide(options, slide) {};
var oysterSlide = function oysterSlide(options, slide) {};
var spinachSlide = function spinachSlide(options, slide) {};
var quinoaSlide = function quinoaSlide(options, slide) {};
var chocolateSlide = function chocolateSlide(options, slide) {};
var strawberrySlide = function strawberrySlide(options, slide) {};
var beanSlide = function beanSlide(options, slide) {};

/***/ }),

/***/ "./src/styles/index.scss":
/*!*******************************!*\
  !*** ./src/styles/index.scss ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL3Njcm9sbC9zbGlkZXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0eWxlcy9pbmRleC5zY3NzIl0sIm5hbWVzIjpbIm51dHJpdGlvbkRhdGEiLCJkMyIsImNzdiIsImQiLCJmb29kX25hbWUiLCJzZXJ2aW5nX3NpemUiLCJmaWJlciIsImlyb24iLCJtYWduZXNpdW0iLCJwb3Rhc3NpdW0iLCJ6aW5jIiwidml0YW1pbl9jIiwiZm9sYXRlIiwidml0YW1pbl9iMTIiLCJ2aXRhbWluX2EiLCJ2aXRhbWluX2QiLCJjaG9sZXN0ZXJvbCIsInRoZW4iLCJkYXRhIiwiY29uc29sZSIsImxvZyIsImNyZWF0ZVZpc3VhbGl6YXRpb24iLCJpIiwibGVuZ3RoIiwiZm9vZERhdGEiLCJpZHgiLCJjcmVhdGVYQXhpc0Jvb2wiLCJtYXJnaW4iLCJ0b3AiLCJyaWdodCIsImJvdHRvbSIsImxlZnQiLCJ3IiwiaCIsIk9iamVjdCIsInZhbHVlcyIsInNsaWNlIiwibnVtYmVyT2ZDb2x1bW5zIiwibWF4VmFsdWUiLCJNYXRoIiwibWF4IiwieF9heGlzTGVuZ3RoIiwieV9heGlzTGVuZ3RoIiwidGFyZ2V0U1ZHIiwidGFyZ2V0U2xpZGVSZWN0IiwieFNjYWxlIiwic2NhbGVMaW5lYXIiLCJkb21haW4iLCJyYW5nZSIsInlTY2FsZSIsInN2ZyIsInNlbGVjdCIsImFwcGVuZCIsImF0dHIiLCJzZWxlY3RBbGwiLCJlbnRlciIsInRyYW5zaXRpb24iLCJkdXJhdGlvbiIsInhBeGlzIiwiYXhpc0JvdHRvbSIsInRpY2tTaXplIiwidGlja0Zvcm1hdCIsImtleXMiLCJ1bmRlZmluZWQiLCJjYWxsIiwieUF4aXMiLCJheGlzTGVmdCIsInRpY2tzIiwic3R5bGUiLCJ3aW5kb3ciLCJhZGRFdmVudExpc3RlbmVyIiwiZSIsInNsaWRlcyIsInNsaWRlTmFtZSIsIm5ld1NsaWRlIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwicHVzaCIsImNyZWF0ZU9ic2VydmVycyIsIm9wdGlvbnMiLCJyb290Iiwicm9vdE1hcmdpbiIsInRocmVzaG9sZCIsIlNsaWRlcyIsImJhbmFuYVNsaWRlIiwic2xpZGUiLCJoYW5kbGVCYW5hbmFTY3JvbGxPbnRvIiwiZW50cmllcyIsIm9ic2VydmVyIiwiZm9yRWFjaCIsImVudHJ5IiwiaXNJbnRlcnNlY3RpbmciLCJiYW5hbmFSZWN0cyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJyZWN0IiwiY2xhc3NMaXN0IiwicmVtb3ZlIiwicG90YXRvUmVjdHMiLCJhZGQiLCJJbnRlcnNlY3Rpb25PYnNlcnZlciIsIm9ic2VydmUiLCJwb3RhdG9TbGlkZSIsImhhbmRsZVBvdGF0b1Njcm9sbE9udG8iLCJidXR0ZXJSZWN0cyIsImJ1dHRlclNsaWRlIiwiaGFuZGxlQnV0dGVyU2Nyb2xsT250byIsImF2b2NhZG9SZWN0cyIsImF2b2NhZG9TbGlkZSIsImhhbmRsZUF2b2NhZG9TY3JvbGxPbnRvIiwiYmVlZkxpdmVyUmVjdHMiLCJiZWVmTGl2ZXJTbGlkZSIsImNvZExpdmVyU2xpZGUiLCJlZ2dTbGlkZSIsImhlcnJpbmdTbGlkZSIsInR1bmFTbGlkZSIsImJyb2Njb2xpU2xpZGUiLCJwZWFzU2xpZGUiLCJyZWRQZXBwZXJTbGlkZSIsIm95c3RlclNsaWRlIiwic3BpbmFjaFNsaWRlIiwicXVpbm9hU2xpZGUiLCJjaG9jb2xhdGVTbGlkZSIsInN0cmF3YmVycnlTbGlkZSIsImJlYW5TbGlkZSJdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtR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LEtBQVYsRUFBb0IsQ0FJOUMsQ0FKTTtBQU1BLElBQU1vQyxjQUFjLEdBQUcsU0FBakJBLGNBQWlCLENBQUMxQyxPQUFELEVBQVVNLEtBQVYsRUFBb0IsQ0FJakQsQ0FKTTtBQU1BLElBQU1xQyxlQUFlLEdBQUcsU0FBbEJBLGVBQWtCLENBQUMzQyxPQUFELEVBQVVNLEtBQVYsRUFBb0IsQ0FJbEQsQ0FKTTtBQU1BLElBQU1zQyxTQUFTLEdBQUcsU0FBWkEsU0FBWSxDQUFDNUMsT0FBRCxFQUFVTSxLQUFWLEVBQW9CLENBSTVDLENBSk0sQzs7Ozs7Ozs7Ozs7QUNwUFAsdUMiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL2Rpc3QvXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LmpzXCIpO1xuIiwiaW1wb3J0ICcuL3N0eWxlcy9pbmRleC5zY3NzJztcbmltcG9ydCAqIGFzIFNsaWRlcyBmcm9tICcuL3NjcmlwdHMvc2Nyb2xsL3NsaWRlcyc7XG5cbmxldCBudXRyaXRpb25EYXRhO1xuXG5kMy5jc3YoXCJudXRyaXRpb25fZmFjdHNfZm9yX3Njcm9sbGVyLmNzdlwiLCBkID0+IHtcbiAgcmV0dXJuIHtcbiAgICBmb29kX25hbWU6IGRbXCJGb29kIG5hbWVcIl0sXG4gICAgc2VydmluZ19zaXplOiBkW1wiQW1vdW50XCJdLFxuICAgIGZpYmVyOiArZFtcIkZpYmVyXCJdLFxuICAgIGlyb246ICtkW1wiSXJvblwiXSxcbiAgICBtYWduZXNpdW06ICtkW1wiTWFnbmVzaXVtXCJdLFxuICAgIHBvdGFzc2l1bTogK2RbXCJQb3Rhc3NpdW1cIl0sXG4gICAgemluYzogK2RbXCJaaW5jXCJdLFxuICAgIHZpdGFtaW5fYzogK2RbXCJWaXRhbWluIENcIl0sXG4gICAgZm9sYXRlOiArZFtcIkZvbGF0ZVwiXSxcbiAgICB2aXRhbWluX2IxMjogK2RbXCJWaXRhbWluIEItMTJcIl0sXG4gICAgdml0YW1pbl9hOiArZFtcIlZpdGFtaW4gQVwiXSxcbiAgICB2aXRhbWluX2Q6ICtkW1wiVml0YW1pbiBEXCJdLFxuICAgIGNob2xlc3Rlcm9sOiArZFtcIkNob2xlc3Rlcm9sXCJdXG4gIH07XG59KS50aGVuKGRhdGEgPT4ge1xuICAgIG51dHJpdGlvbkRhdGEgPSBkYXRhO1xuICAgIGNvbnNvbGUubG9nKG51dHJpdGlvbkRhdGEpO1xuICAgIFxuICAgIGNyZWF0ZVZpc3VhbGl6YXRpb24obnV0cml0aW9uRGF0YVswXSwgMCwgdHJ1ZSk7XG5cbiAgICBmb3IgKGxldCBpID0gMTsgaSA8IG51dHJpdGlvbkRhdGEubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY3JlYXRlVmlzdWFsaXphdGlvbihudXRyaXRpb25EYXRhW2ldLCBpKTtcbiAgICB9XG5cbn0pO1xuXG5jb25zdCBjcmVhdGVWaXN1YWxpemF0aW9uID0gKGZvb2REYXRhLCBpZHgsIGNyZWF0ZVhBeGlzQm9vbCkgPT4ge1xuICBsZXQgbWFyZ2luID0ge3RvcDogNDAsIHJpZ2h0OiA0MCwgYm90dG9tOiA2NSwgbGVmdDogNTB9XG4gIGxldCB3ID0gNzAwIC0gbWFyZ2luLmxlZnQgLSBtYXJnaW4ucmlnaHQ7XG4gIGxldCBoID0gNjAwIC0gbWFyZ2luLnRvcCAtIG1hcmdpbi5ib3R0b207XG5cbiAgbGV0IGRhdGEgPSBPYmplY3QudmFsdWVzKGZvb2REYXRhKS5zbGljZSgyLCAtMSk7XG4gIGxldCBudW1iZXJPZkNvbHVtbnMgPSAxMDtcbiAgbGV0IG1heFZhbHVlID0gTWF0aC5tYXgoLjUwLCBkMy5tYXgoZGF0YSwgZnVuY3Rpb24oZCkge1xuICAgIHJldHVybiAoK2QgLyAxMDApO1xuICB9KSk7XG4gIGxldCB4X2F4aXNMZW5ndGggPSB3O1xuICBsZXQgeV9heGlzTGVuZ3RoID0gaDtcbiAgbGV0IHRhcmdldFNWRyA9IFwic2xpZGUtc3ZnLVwiICsgaWR4O1xuICBsZXQgdGFyZ2V0U2xpZGVSZWN0ID0gXCJzbGlkZS1zdmctXCIgKyBpZHggKyBcIi1yZWN0XCI7XG5cbiAgbGV0IHhTY2FsZSA9IGQzXG4gICAgLnNjYWxlTGluZWFyKClcbiAgICAuZG9tYWluKFswLCBudW1iZXJPZkNvbHVtbnNdKVxuICAgIC5yYW5nZShbMCwgd10pO1xuXG4gIGxldCB5U2NhbGUgPSBkM1xuICAgIC5zY2FsZUxpbmVhcigpXG4gICAgLmRvbWFpbihbMCwgbWF4VmFsdWVdKVxuICAgIC5yYW5nZShbaCAtIG1hcmdpbi50b3AsIG1hcmdpbi5ib3R0b21dKTtcblxuICBsZXQgc3ZnID0gZDNcbiAgICAuc2VsZWN0KFwiI3Zpc1wiKVxuICAgIC5hcHBlbmQoXCJzdmdcIilcbiAgICAuYXR0cihcIndpZHRoXCIsIHcgKyBtYXJnaW4ubGVmdCArIG1hcmdpbi5yaWdodClcbiAgICAuYXR0cihcImhlaWdodFwiLCBoICsgbWFyZ2luLnRvcCArIG1hcmdpbi5ib3R0b20pO1xuXG4gIHN2Z1xuICAgIC5zZWxlY3RBbGwoXCJyZWN0XCIpXG4gICAgLmRhdGEoZGF0YSlcbiAgICAuZW50ZXIoKVxuICAgIC5hcHBlbmQoXCJyZWN0XCIpXG4gICAgLmF0dHIoXCJjbGFzc1wiLCBgJHt0YXJnZXRTbGlkZVJlY3R9IGhpZGRlbiBjaGFydC1yZWN0YClcbiAgICAuYXR0cihcInhcIiwgZnVuY3Rpb24oZCwgaSkge1xuICAgICAgcmV0dXJuIGkgKiAoeF9heGlzTGVuZ3RoIC8gbnVtYmVyT2ZDb2x1bW5zKSArIG1hcmdpbi5sZWZ0ICsgMTA7XG4gICAgfSlcbiAgICAuYXR0cihcInlcIiwgZnVuY3Rpb24oZCkge1xuICAgICAgcmV0dXJuIHlTY2FsZShkIC8gMTAwKTtcbiAgICB9KVxuICAgIC5hdHRyKFwid2lkdGhcIiwgeF9heGlzTGVuZ3RoIC8gbnVtYmVyT2ZDb2x1bW5zIC0gMSlcbiAgICAuYXR0cihcImhlaWdodFwiLCBmdW5jdGlvbihkKSB7XG4gICAgICByZXR1cm4gaCAtIHlTY2FsZShkIC8gMTAwKSAtIG1hcmdpbi50b3A7XG4gICB9KVxuICAgIC5hdHRyKFwiZmlsbFwiLCBcInJlZFwiKVxuICAgIC50cmFuc2l0aW9uKClcbiAgICAuZHVyYXRpb24oNTAwKTtcblxuICAgIGxldCB4QXhpcyA9IGQzXG4gICAgICAgICAgICAgICAgLmF4aXNCb3R0b20oeFNjYWxlKVxuICAgICAgICAgICAgICAgIC50aWNrU2l6ZSgwKVxuICAgICAgICAgICAgICAgIC50aWNrRm9ybWF0KGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKGZvb2REYXRhKS5zbGljZSgyLCAtMSlbZF07XG4gICAgICAgICAgICAgICAgfSk7XG5cblxuICAgIGlmIChjcmVhdGVYQXhpc0Jvb2wgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBzdmdcbiAgICAgICAgICAgIC5hcHBlbmQoXCJnXCIpXG4gICAgICAgICAgICAuYXR0cihcImNsYXNzXCIsIGAke3RhcmdldFNWR30teC1heGlzIHgtYXhpc2ApXG4gICAgICAgICAgICAuYXR0cihcInRyYW5zZm9ybVwiLCBcInRyYW5zbGF0ZShcIiArIG1hcmdpbi5sZWZ0ICsgXCIsIFwiICsgKGggLSBtYXJnaW4udG9wKSArIFwiKVwiKVxuICAgICAgICAgICAgLnRyYW5zaXRpb24oKVxuICAgICAgICAgICAgLmR1cmF0aW9uKDEwMDApXG4gICAgICAgICAgICAuY2FsbCh4QXhpcylcbiAgICBcbiAgICAgICAgc3ZnLnNlbGVjdEFsbChcIi54LWF4aXMgdGV4dFwiKVxuICAgICAgICAgICAgLmF0dHIoXCJ0cmFuc2Zvcm1cIiwgZnVuY3Rpb24oZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBcInRyYW5zbGF0ZSgyNSwgMjUpcm90YXRlKC00NSlcIjsgXG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cblxuICAgIGxldCB5QXhpcyA9IGQzLmF4aXNMZWZ0KHlTY2FsZSkudGlja3MoNCwgXCIlXCIpO1xuXG4gICAgc3ZnXG4gICAgICAuYXBwZW5kKFwiZ1wiKVxuICAgICAgLmF0dHIoXCJjbGFzc1wiLCBgJHt0YXJnZXRTVkd9LXktYXhpcyB5LWF4aXNgKVxuICAgICAgLmF0dHIoXCJ0cmFuc2Zvcm1cIiwgXCJ0cmFuc2xhdGUoXCIgKyBtYXJnaW4ubGVmdCArIFwiLDApXCIpXG4gICAgICAuc3R5bGUoXCJvcGFjaXR5XCIsIFwiMCVcIilcbiAgICAgIC5jYWxsKHlBeGlzKTtcblxufTtcblxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsIChlKSA9PiB7XG4gICAgXG4gICAgbGV0IHNsaWRlcyA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTk7IGkrKykge1xuICAgICAgICBsZXQgc2xpZGVOYW1lID0gXCIjc2xpZGUtY29udGFpbmVyLVwiICsgaTtcbiAgICAgICAgbGV0IG5ld1NsaWRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzbGlkZU5hbWUpO1xuICAgICAgICBzbGlkZXMucHVzaChuZXdTbGlkZSk7XG4gICAgfVxuICAgIGNyZWF0ZU9ic2VydmVycyhzbGlkZXMpO1xufSwgZmFsc2UpO1xuXG5jb25zdCBjcmVhdGVPYnNlcnZlcnMgPSAoc2xpZGVzKSA9PiB7XG4gICAgXG4gICAgbGV0IG9wdGlvbnMgPSB7XG4gICAgICByb290OiBudWxsLFxuICAgICAgcm9vdE1hcmdpbjogXCIwcHggMHB4IDBweCAwcHhcIixcbiAgICAgIHRocmVzaG9sZDogLjNcbiAgICB9O1xuXG4gICAgXG4gICAgU2xpZGVzLmJhbmFuYVNsaWRlKG9wdGlvbnMsIHNsaWRlc1swXSk7XG4gICAgU2xpZGVzLnBvdGF0b1NsaWRlKG9wdGlvbnMsIHNsaWRlc1sxXSk7XG4gICAgU2xpZGVzLmJ1dHRlclNsaWRlKG9wdGlvbnMsIHNsaWRlc1syXSk7XG4gICAgU2xpZGVzLmF2b2NhZG9TbGlkZShvcHRpb25zLCBzbGlkZXNbM10pO1xuXG59XG4iLCJleHBvcnQgY29uc3QgYmFuYW5hU2xpZGUgPSAob3B0aW9ucywgc2xpZGUpID0+IHtcblxuICBjb25zdCBoYW5kbGVCYW5hbmFTY3JvbGxPbnRvID0gKGVudHJpZXMsIG9ic2VydmVyKSA9PiB7XG4gICAgZW50cmllcy5mb3JFYWNoKGVudHJ5ID0+IHtcbiAgICAgIGlmIChlbnRyeS5pc0ludGVyc2VjdGluZykge1xuICAgICAgICBcbiAgICAgICAgbGV0IGJhbmFuYVJlY3RzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgLnNsaWRlLXN2Zy0wLXJlY3RgKTtcbiAgICAgICAgYmFuYW5hUmVjdHMuZm9yRWFjaChyZWN0ID0+IHtcbiAgICAgICAgICAgIHJlY3QuY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKTtcbiAgICAgICAgfSk7XG4gICAgICAgIFxuICAgICAgICBsZXQgcG90YXRvUmVjdHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGAuc2xpZGUtc3ZnLTEtcmVjdGApO1xuICAgICAgICBwb3RhdG9SZWN0cy5mb3JFYWNoKHJlY3QgPT4ge1xuICAgICAgICAgICAgcmVjdC5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xuICAgICAgICB9KTtcblxuICAgICAgICBkMy5zZWxlY3QoXCIuc2xpZGUtc3ZnLTAteS1heGlzXCIpXG4gICAgICAgICAgICAudHJhbnNpdGlvbigpXG4gICAgICAgICAgICAuc3R5bGUoXCJvcGFjaXR5XCIsIFwiMTAwJVwiKVxuICAgICAgICAgICAgLmR1cmF0aW9uKDUwMCk7ICAgICAgICBcblxuICAgICAgICBkMy5zZWxlY3QoXCIuc2xpZGUtc3ZnLTEteS1heGlzXCIpXG4gICAgICAgICAgICAudHJhbnNpdGlvbigpXG4gICAgICAgICAgICAuc3R5bGUoXCJvcGFjaXR5XCIsIFwiMCVcIilcbiAgICAgICAgICAgIC5kdXJhdGlvbig1MDApO1xuICAgICAgfVxuICAgIH0pO1xuICB9O1xuXG4gIGxldCBvYnNlcnZlciA9IG5ldyBJbnRlcnNlY3Rpb25PYnNlcnZlcihoYW5kbGVCYW5hbmFTY3JvbGxPbnRvLCBvcHRpb25zKTtcbiAgb2JzZXJ2ZXIub2JzZXJ2ZShzbGlkZSk7XG59O1xuXG5leHBvcnQgY29uc3QgcG90YXRvU2xpZGUgPSAob3B0aW9ucywgc2xpZGUpID0+IHtcblxuICBjb25zdCBoYW5kbGVQb3RhdG9TY3JvbGxPbnRvID0gKGVudHJpZXMsIG9ic2VydmVyKSA9PiB7XG4gICAgZW50cmllcy5mb3JFYWNoKGVudHJ5ID0+IHtcbiAgICAgIGlmIChlbnRyeS5pc0ludGVyc2VjdGluZykge1xuXG4gICAgICAgIGxldCBwb3RhdG9SZWN0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYC5zbGlkZS1zdmctMS1yZWN0YCk7XG4gICAgICAgIHBvdGF0b1JlY3RzLmZvckVhY2gocmVjdCA9PiB7XG4gICAgICAgICAgICByZWN0LmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpO1xuICAgICAgICB9KTtcblxuICAgICAgICBsZXQgYmFuYW5hUmVjdHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGAuc2xpZGUtc3ZnLTAtcmVjdGApO1xuICAgICAgICBiYW5hbmFSZWN0cy5mb3JFYWNoKHJlY3QgPT4ge1xuICAgICAgICAgICAgcmVjdC5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgbGV0IGJ1dHRlclJlY3RzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgLnNsaWRlLXN2Zy0yLXJlY3RgKTtcbiAgICAgICAgYnV0dGVyUmVjdHMuZm9yRWFjaChyZWN0ID0+IHtcbiAgICAgICAgICAgIHJlY3QuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7XG4gICAgICAgIH0pO1xuICAgICAgICBcbiAgICAgICAgZDMuc2VsZWN0KFwiLnNsaWRlLXN2Zy0xLXktYXhpc1wiKVxuICAgICAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgICAgICAuc3R5bGUoXCJvcGFjaXR5XCIsIFwiMTAwJVwiKVxuICAgICAgICAgIC5kdXJhdGlvbig1MDApOyAgICAgICAgXG5cbiAgICAgICAgZDMuc2VsZWN0KFwiLnNsaWRlLXN2Zy0wLXktYXhpc1wiKVxuICAgICAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgICAgICAuc3R5bGUoXCJvcGFjaXR5XCIsIFwiMCVcIilcbiAgICAgICAgICAuZHVyYXRpb24oNTAwKTtcblxuICAgICAgICAgIGQzLnNlbGVjdChcIi5zbGlkZS1zdmctMi15LWF4aXNcIilcbiAgICAgICAgICAudHJhbnNpdGlvbigpXG4gICAgICAgICAgLnN0eWxlKFwib3BhY2l0eVwiLCBcIjAlXCIpXG4gICAgICAgICAgLmR1cmF0aW9uKDUwMCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH07XG5cbiAgbGV0IG9ic2VydmVyID0gbmV3IEludGVyc2VjdGlvbk9ic2VydmVyKGhhbmRsZVBvdGF0b1Njcm9sbE9udG8sIG9wdGlvbnMpO1xuICBvYnNlcnZlci5vYnNlcnZlKHNsaWRlKTtcblxufVxuXG5leHBvcnQgY29uc3QgYnV0dGVyU2xpZGUgPSAob3B0aW9ucywgc2xpZGUpID0+IHtcblxuICBjb25zdCBoYW5kbGVCdXR0ZXJTY3JvbGxPbnRvID0gKGVudHJpZXMsIG9ic2VydmVyKSA9PiB7XG4gICAgZW50cmllcy5mb3JFYWNoKGVudHJ5ID0+IHtcbiAgICAgIGlmIChlbnRyeS5pc0ludGVyc2VjdGluZykge1xuICAgICAgICAgIGxldCBidXR0ZXJSZWN0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYC5zbGlkZS1zdmctMi1yZWN0YCk7XG4gICAgICAgICAgYnV0dGVyUmVjdHMuZm9yRWFjaChyZWN0ID0+IHtcbiAgICAgICAgICAgIHJlY3QuY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICBsZXQgcG90YXRvUmVjdHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGAuc2xpZGUtc3ZnLTEtcmVjdGApO1xuICAgICAgICBwb3RhdG9SZWN0cy5mb3JFYWNoKHJlY3QgPT4ge1xuICAgICAgICAgIHJlY3QuY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgbGV0IGF2b2NhZG9SZWN0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYC5zbGlkZS1zdmctMy1yZWN0YCk7XG4gICAgICAgIGF2b2NhZG9SZWN0cy5mb3JFYWNoKHJlY3QgPT4ge1xuICAgICAgICAgIHJlY3QuY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcbiAgICAgICAgfSk7XG5cblxuICAgICAgICBkMy5zZWxlY3QoXCIuc2xpZGUtc3ZnLTIteS1heGlzXCIpXG4gICAgICAgICAgLnRyYW5zaXRpb24oKVxuICAgICAgICAgIC5zdHlsZShcIm9wYWNpdHlcIiwgXCIxMDAlXCIpXG4gICAgICAgICAgLmR1cmF0aW9uKDUwMCk7XG5cbiAgICAgICAgZDMuc2VsZWN0KFwiLnNsaWRlLXN2Zy0xLXktYXhpc1wiKVxuICAgICAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgICAgICAuc3R5bGUoXCJvcGFjaXR5XCIsIFwiMCVcIilcbiAgICAgICAgICAuZHVyYXRpb24oNTAwKTtcblxuICAgICAgICBkMy5zZWxlY3QoXCIuc2xpZGUtc3ZnLTMteS1heGlzXCIpXG4gICAgICAgICAgLnRyYW5zaXRpb24oKVxuICAgICAgICAgIC5zdHlsZShcIm9wYWNpdHlcIiwgXCIwJVwiKVxuICAgICAgICAgIC5kdXJhdGlvbig1MDApO1xuICAgICAgfVxuICAgIH0pO1xuICB9O1xuXG4gIGxldCBvYnNlcnZlciA9IG5ldyBJbnRlcnNlY3Rpb25PYnNlcnZlcihoYW5kbGVCdXR0ZXJTY3JvbGxPbnRvLCBvcHRpb25zKTtcbiAgb2JzZXJ2ZXIub2JzZXJ2ZShzbGlkZSk7XG5cbn1cblxuZXhwb3J0IGNvbnN0IGF2b2NhZG9TbGlkZSA9IChvcHRpb25zLCBzbGlkZSkgPT4ge1xuXG4gIGNvbnN0IGhhbmRsZUF2b2NhZG9TY3JvbGxPbnRvID0gKGVudHJpZXMsIG9ic2VydmVyKSA9PiB7XG4gICAgZW50cmllcy5mb3JFYWNoKGVudHJ5ID0+IHtcbiAgICAgIGlmIChlbnRyeS5pc0ludGVyc2VjdGluZykge1xuXG4gICAgICAgIGxldCBhdm9jYWRvUmVjdHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGAuc2xpZGUtc3ZnLTMtcmVjdGApO1xuICAgICAgICBhdm9jYWRvUmVjdHMuZm9yRWFjaChyZWN0ID0+IHtcbiAgICAgICAgcmVjdC5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZGVuXCIpO1xuICAgICAgICB9KTtcblxuICAgICAgICBsZXQgYnV0dGVyUmVjdHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGAuc2xpZGUtc3ZnLTItcmVjdGApO1xuICAgICAgICBidXR0ZXJSZWN0cy5mb3JFYWNoKHJlY3QgPT4ge1xuICAgICAgICAgIHJlY3QuY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgbGV0IGJlZWZMaXZlclJlY3RzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgLnNsaWRlLXN2Zy00LXJlY3RgKTtcbiAgICAgICAgYmVlZkxpdmVyUmVjdHMuZm9yRWFjaChyZWN0ID0+IHtcbiAgICAgICAgICByZWN0LmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XG4gICAgICAgIH0pO1xuXG5cbiAgICAgICAgZDMuc2VsZWN0KFwiLnNsaWRlLXN2Zy0zLXktYXhpc1wiKVxuICAgICAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgICAgICAuc3R5bGUoXCJvcGFjaXR5XCIsIFwiMTAwJVwiKVxuICAgICAgICAgIC5kdXJhdGlvbig1MDApO1xuXG4gICAgICAgIGQzLnNlbGVjdChcIi5zbGlkZS1zdmctMi15LWF4aXNcIilcbiAgICAgICAgICAudHJhbnNpdGlvbigpXG4gICAgICAgICAgLnN0eWxlKFwib3BhY2l0eVwiLCBcIjAlXCIpXG4gICAgICAgICAgLmR1cmF0aW9uKDUwMCk7XG5cbiAgICAgICAgZDMuc2VsZWN0KFwiLnNsaWRlLXN2Zy00LXktYXhpc1wiKVxuICAgICAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgICAgICAuc3R5bGUoXCJvcGFjaXR5XCIsIFwiMCVcIilcbiAgICAgICAgICAuZHVyYXRpb24oNTAwKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfTtcblxuICBsZXQgb2JzZXJ2ZXIgPSBuZXcgSW50ZXJzZWN0aW9uT2JzZXJ2ZXIoaGFuZGxlQXZvY2Fkb1Njcm9sbE9udG8sIG9wdGlvbnMpO1xuICBvYnNlcnZlci5vYnNlcnZlKHNsaWRlKTtcbn07ICAgIFxuXG5cbmV4cG9ydCBjb25zdCBiZWVmTGl2ZXJTbGlkZSA9IChvcHRpb25zLCBzbGlkZSkgPT4ge1xuXG5cblxufVxuXG5leHBvcnQgY29uc3QgY29kTGl2ZXJTbGlkZSA9IChvcHRpb25zLCBzbGlkZSkgPT4ge1xuXG5cblxufVxuXG5leHBvcnQgY29uc3QgZWdnU2xpZGUgPSAob3B0aW9ucywgc2xpZGUpID0+IHtcblxuXG5cbn1cblxuZXhwb3J0IGNvbnN0IGhlcnJpbmdTbGlkZSA9IChvcHRpb25zLCBzbGlkZSkgPT4ge1xuXG5cblxufVxuXG5leHBvcnQgY29uc3QgdHVuYVNsaWRlID0gKG9wdGlvbnMsIHNsaWRlKSA9PiB7XG5cblxuXG59XG5cbmV4cG9ydCBjb25zdCBicm9jY29saVNsaWRlID0gKG9wdGlvbnMsIHNsaWRlKSA9PiB7XG5cblxuXG59XG5cbmV4cG9ydCBjb25zdCBwZWFzU2xpZGUgPSAob3B0aW9ucywgc2xpZGUpID0+IHtcblxuXG5cbn1cblxuZXhwb3J0IGNvbnN0IHJlZFBlcHBlclNsaWRlID0gKG9wdGlvbnMsIHNsaWRlKSA9PiB7XG5cblxuXG59XG5cbmV4cG9ydCBjb25zdCBveXN0ZXJTbGlkZSA9IChvcHRpb25zLCBzbGlkZSkgPT4ge1xuXG5cblxufVxuXG5leHBvcnQgY29uc3Qgc3BpbmFjaFNsaWRlID0gKG9wdGlvbnMsIHNsaWRlKSA9PiB7XG5cblxuXG59XG5cbmV4cG9ydCBjb25zdCBxdWlub2FTbGlkZSA9IChvcHRpb25zLCBzbGlkZSkgPT4ge1xuXG5cblxufVxuXG5leHBvcnQgY29uc3QgY2hvY29sYXRlU2xpZGUgPSAob3B0aW9ucywgc2xpZGUpID0+IHtcblxuXG5cbn1cblxuZXhwb3J0IGNvbnN0IHN0cmF3YmVycnlTbGlkZSA9IChvcHRpb25zLCBzbGlkZSkgPT4ge1xuXG5cblxufVxuXG5leHBvcnQgY29uc3QgYmVhblNsaWRlID0gKG9wdGlvbnMsIHNsaWRlKSA9PiB7XG5cblxuXG59IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luIl0sInNvdXJjZVJvb3QiOiIifQ==