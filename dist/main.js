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
  createVisualization(nutritionData[0], 0); //   nutritionData.forEach((foodData, idx) => {
  //       createVisualization(foodData, idx);
  //   });
});

var createVisualization = function createVisualization(foodData, idx) {
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
  var maxValue = .50; //   let maxValue = d3.max(data, function(d) {
  //     return +d;
  //   });

  var x_axisLength = w;
  var y_axisLength = h;
  var targetSlide = "#slide-svg-" + idx;
  var targetSlideRect = "slide-svg-" + idx + "-rect";
  var xScale = d3.scaleLinear().domain([0, numberOfColumns]).range([0, w]);
  var yScale = d3.scaleLinear().domain([0, maxValue]) // .domain([maxValue, 0])
  // .range([h, 0]);
  .range([h - margin.top, margin.bottom]); //   let yScale = d3
  //     .scaleLinear()
  //     .domain([0, maxValue])
  //     .range([0, y_axisLength + 50]);

  var svg = d3 // .select(`${targetSlide}`)
  .select("#vis").append("svg").attr("width", w + margin.left + margin.right).attr("height", h + margin.top + margin.bottom);
  svg.selectAll("rect").data(data).enter().append("rect").attr("class", "".concat(targetSlideRect)).attr("x", function (d, i) {
    return i * (x_axisLength / numberOfColumns) + margin.left + 10;
  }).attr("y", function (d) {
    //   return yScale(d);
    return yScale(d / 100);
  }).attr("width", x_axisLength / numberOfColumns - 1).attr("height", function (d) {
    return h - yScale(d / 100) - margin.top;
  }).attr("fill", "red").transition().duration(500); // d3
  //   .tickValues(
  //       ['Fiber', 'Iron', 'Magnesium', 'Potassium', 'Zinc', 'Vitamin C', 'Folate', 'Vitamin B-12', 'Vitamin A', 'Vitamin D']
  //   )

  var yAxis = d3.axisLeft(yScale).ticks(4, "%");
  svg.append("g").attr("class", "y-axis").attr("transform", "translate(" + margin.left + ",0)").transition().duration(1000).call(yAxis); //   .axis()
  //   .scale(yScale)
  //   .orient("left")
  //   .tickSize(0);
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
    threshold: .5
  }; // Slides.avocadoSlide(0, options, slides[0], nutritionData);
  // Slides.bananaSlide(1, options, slides[1], nutritionData);
};

/***/ }),

/***/ "./src/scripts/scroll/slides.js":
/*!**************************************!*\
  !*** ./src/scripts/scroll/slides.js ***!
  \**************************************/
/*! exports provided: avocadoSlide, bananaSlide, potatoSlide, butterSlide, beefLiverSlide, codLiverSlide, eggSlide, herringSlide, tunaSlide, broccoliSlide, peasSlide, redPepperSlide, oysterSlide, spinachSlide, quinoaSlide, chocolateSlide, strawberrySlide, beanSlide */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "avocadoSlide", function() { return avocadoSlide; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "bananaSlide", function() { return bananaSlide; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "potatoSlide", function() { return potatoSlide; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "butterSlide", function() { return butterSlide; });
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
var avocadoSlide = function avocadoSlide(idx, options, slide, data) {
  var foodData = data[idx];
  var targetSlide = ".slide-svg-" + idx;
  var targetSlideRect = targetSlide + "-rect";

  var handleAvocadoScrollOnto = function handleAvocadoScrollOnto(entries, observer) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var singleFoodData = Object.values(foodData).slice(2, -1);
        var maxValue = 25; // let maxValue = d3.max(singleFoodData, function(d) {
        //   return +d;
        // });

        var y_axisLength = 450;
        var yScale = d3.scaleLinear().domain([0, maxValue]).range([0, y_axisLength]);
        d3.selectAll("".concat(targetSlideRect)).data(singleFoodData).transition().attr("y", function (d) {
          return 500 - yScale(d);
        }).attr("height", function (d) {
          return yScale(d); //   return Math.min(yScale(d), 25);
        }).delay(750).duration(500);
        d3.selectAll(".slide-svg-1-rect").transition().attr("y", 500).duration(500);
      }
    });
  };

  var observer = new IntersectionObserver(handleAvocadoScrollOnto, options);
  observer.observe(slide);
};
var bananaSlide = function bananaSlide(idx, options, slide, data) {
  var foodData = data[idx];
  var targetSlide = ".slide-svg-" + idx;
  var targetSlideRect = targetSlide + "-rect";

  var handleBananaScrollOnto = function handleBananaScrollOnto(entries, observer) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var singleFoodData = Object.values(foodData).slice(2, -1);
        var maxValue = d3.max(singleFoodData, function (d) {
          return +d;
        });
        var y_axisLength = 450;
        var yScale = d3.scaleLinear().domain([0, maxValue]).range([0, y_axisLength]);
        d3.selectAll("".concat(targetSlideRect)).data(singleFoodData).transition().attr("y", function (d) {
          return 500 - yScale(d);
        }).attr("height", function (d) {
          return yScale(d);
        }).delay(750).duration(500);
        d3.selectAll(".slide-svg-0-rect").transition().attr("y", 500).duration(500);
      }
    });
  };

  var observer = new IntersectionObserver(handleBananaScrollOnto, options);
  observer.observe(slide);
};
var potatoSlide = function potatoSlide(idx, options, slide, data) {};
var butterSlide = function butterSlide(idx, options, slide, data) {};
var beefLiverSlide = function beefLiverSlide(idx, options, slide, data) {};
var codLiverSlide = function codLiverSlide(idx, options, slide, data) {};
var eggSlide = function eggSlide(idx, options, slide, data) {};
var herringSlide = function herringSlide(idx, options, slide, data) {};
var tunaSlide = function tunaSlide(idx, options, slide, data) {};
var broccoliSlide = function broccoliSlide(idx, options, slide, data) {};
var peasSlide = function peasSlide(idx, options, slide, data) {};
var redPepperSlide = function redPepperSlide(idx, options, slide, data) {};
var oysterSlide = function oysterSlide(idx, options, slide, data) {};
var spinachSlide = function spinachSlide(idx, options, slide, data) {};
var quinoaSlide = function quinoaSlide(idx, options, slide, data) {};
var chocolateSlide = function chocolateSlide(idx, options, slide, data) {};
var strawberrySlide = function strawberrySlide(idx, options, slide, data) {};
var beanSlide = function beanSlide(idx, options, slide, data) {};

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL3Njcm9sbC9zbGlkZXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0eWxlcy9pbmRleC5zY3NzIl0sIm5hbWVzIjpbIm51dHJpdGlvbkRhdGEiLCJkMyIsImNzdiIsImQiLCJmb29kX25hbWUiLCJzZXJ2aW5nX3NpemUiLCJmaWJlciIsImlyb24iLCJtYWduZXNpdW0iLCJwb3Rhc3NpdW0iLCJ6aW5jIiwidml0YW1pbl9jIiwiZm9sYXRlIiwidml0YW1pbl9iMTIiLCJ2aXRhbWluX2EiLCJ2aXRhbWluX2QiLCJjaG9sZXN0ZXJvbCIsInRoZW4iLCJkYXRhIiwiY29uc29sZSIsImxvZyIsImNyZWF0ZVZpc3VhbGl6YXRpb24iLCJmb29kRGF0YSIsImlkeCIsIm1hcmdpbiIsInRvcCIsInJpZ2h0IiwiYm90dG9tIiwibGVmdCIsInciLCJoIiwiT2JqZWN0IiwidmFsdWVzIiwic2xpY2UiLCJudW1iZXJPZkNvbHVtbnMiLCJtYXhWYWx1ZSIsInhfYXhpc0xlbmd0aCIsInlfYXhpc0xlbmd0aCIsInRhcmdldFNsaWRlIiwidGFyZ2V0U2xpZGVSZWN0IiwieFNjYWxlIiwic2NhbGVMaW5lYXIiLCJkb21haW4iLCJyYW5nZSIsInlTY2FsZSIsInN2ZyIsInNlbGVjdCIsImFwcGVuZCIsImF0dHIiLCJzZWxlY3RBbGwiLCJlbnRlciIsImkiLCJ0cmFuc2l0aW9uIiwiZHVyYXRpb24iLCJ5QXhpcyIsImF4aXNMZWZ0IiwidGlja3MiLCJjYWxsIiwid2luZG93IiwiYWRkRXZlbnRMaXN0ZW5lciIsImUiLCJzbGlkZXMiLCJzbGlkZU5hbWUiLCJuZXdTbGlkZSIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsInB1c2giLCJjcmVhdGVPYnNlcnZlcnMiLCJvcHRpb25zIiwicm9vdCIsInJvb3RNYXJnaW4iLCJ0aHJlc2hvbGQiLCJhdm9jYWRvU2xpZGUiLCJzbGlkZSIsImhhbmRsZUF2b2NhZG9TY3JvbGxPbnRvIiwiZW50cmllcyIsIm9ic2VydmVyIiwiZm9yRWFjaCIsImVudHJ5IiwiaXNJbnRlcnNlY3RpbmciLCJzaW5nbGVGb29kRGF0YSIsImRlbGF5IiwiSW50ZXJzZWN0aW9uT2JzZXJ2ZXIiLCJvYnNlcnZlIiwiYmFuYW5hU2xpZGUiLCJoYW5kbGVCYW5hbmFTY3JvbGxPbnRvIiwibWF4IiwicG90YXRvU2xpZGUiLCJidXR0ZXJTbGlkZSIsImJlZWZMaXZlclNsaWRlIiwiY29kTGl2ZXJTbGlkZSIsImVnZ1NsaWRlIiwiaGVycmluZ1NsaWRlIiwidHVuYVNsaWRlIiwiYnJvY2NvbGlTbGlkZSIsInBlYXNTbGlkZSIsInJlZFBlcHBlclNsaWRlIiwib3lzdGVyU2xpZGUiLCJzcGluYWNoU2xpZGUiLCJxdWlub2FTbGlkZSIsImNob2NvbGF0ZVNsaWRlIiwic3RyYXdiZXJyeVNsaWRlIiwiYmVhblNsaWRlIl0sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxz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TUEsSUFBTStFLFdBQVcsR0FBRyxTQUFkQSxXQUFjLENBQUMxRSxHQUFELEVBQU02QyxPQUFOLEVBQWVLLEtBQWYsRUFBc0J2RCxJQUF0QixFQUErQixDQUl6RCxDQUpNO0FBTUEsSUFBTWdGLFlBQVksR0FBRyxTQUFmQSxZQUFlLENBQUMzRSxHQUFELEVBQU02QyxPQUFOLEVBQWVLLEtBQWYsRUFBc0J2RCxJQUF0QixFQUErQixDQUkxRCxDQUpNO0FBTUEsSUFBTWlGLFdBQVcsR0FBRyxTQUFkQSxXQUFjLENBQUM1RSxHQUFELEVBQU02QyxPQUFOLEVBQWVLLEtBQWYsRUFBc0J2RCxJQUF0QixFQUErQixDQUl6RCxDQUpNO0FBTUEsSUFBTWtGLGNBQWMsR0FBRyxTQUFqQkEsY0FBaUIsQ0FBQzdFLEdBQUQsRUFBTTZDLE9BQU4sRUFBZUssS0FBZixFQUFzQnZELElBQXRCLEVBQStCLENBSTVELENBSk07QUFNQSxJQUFNbUYsZUFBZSxHQUFHLFNBQWxCQSxlQUFrQixDQUFDOUUsR0FBRCxFQUFNNkMsT0FBTixFQUFlSyxLQUFmLEVBQXNCdkQsSUFBdEIsRUFBK0IsQ0FJN0QsQ0FKTTtBQU1BLElBQU1vRixTQUFTLEdBQUcsU0FBWkEsU0FBWSxDQUFDL0UsR0FBRCxFQUFNNkMsT0FBTixFQUFlSyxLQUFmLEVBQXNCdkQsSUFBdEIsRUFBK0IsQ0FJdkQsQ0FKTSxDOzs7Ozs7Ozs7OztBQ3ZMUCx1QyIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvZGlzdC9cIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXguanNcIik7XG4iLCJpbXBvcnQgJy4vc3R5bGVzL2luZGV4LnNjc3MnO1xuaW1wb3J0ICogYXMgU2xpZGVzIGZyb20gJy4vc2NyaXB0cy9zY3JvbGwvc2xpZGVzJztcblxubGV0IG51dHJpdGlvbkRhdGE7XG5cbmQzLmNzdihcIm51dHJpdGlvbl9mYWN0c19mb3Jfc2Nyb2xsZXIuY3N2XCIsIGQgPT4ge1xuICByZXR1cm4ge1xuICAgIGZvb2RfbmFtZTogZFtcIkZvb2QgbmFtZVwiXSxcbiAgICBzZXJ2aW5nX3NpemU6IGRbXCJBbW91bnRcIl0sXG4gICAgZmliZXI6ICtkW1wiRmliZXJcIl0sXG4gICAgaXJvbjogK2RbXCJJcm9uXCJdLFxuICAgIG1hZ25lc2l1bTogK2RbXCJNYWduZXNpdW1cIl0sXG4gICAgcG90YXNzaXVtOiArZFtcIlBvdGFzc2l1bVwiXSxcbiAgICB6aW5jOiArZFtcIlppbmNcIl0sXG4gICAgdml0YW1pbl9jOiArZFtcIlZpdGFtaW4gQ1wiXSxcbiAgICBmb2xhdGU6ICtkW1wiRm9sYXRlXCJdLFxuICAgIHZpdGFtaW5fYjEyOiArZFtcIlZpdGFtaW4gQi0xMlwiXSxcbiAgICB2aXRhbWluX2E6ICtkW1wiVml0YW1pbiBBXCJdLFxuICAgIHZpdGFtaW5fZDogK2RbXCJWaXRhbWluIERcIl0sXG4gICAgY2hvbGVzdGVyb2w6ICtkW1wiQ2hvbGVzdGVyb2xcIl1cbiAgfTtcbn0pLnRoZW4oZGF0YSA9PiB7XG4gIG51dHJpdGlvbkRhdGEgPSBkYXRhO1xuICBjb25zb2xlLmxvZyhudXRyaXRpb25EYXRhKTtcbiAgXG4gIGNyZWF0ZVZpc3VhbGl6YXRpb24obnV0cml0aW9uRGF0YVswXSwgMCk7XG4vLyAgIG51dHJpdGlvbkRhdGEuZm9yRWFjaCgoZm9vZERhdGEsIGlkeCkgPT4ge1xuLy8gICAgICAgY3JlYXRlVmlzdWFsaXphdGlvbihmb29kRGF0YSwgaWR4KTtcbi8vICAgfSk7XG5cbn0pO1xuXG5jb25zdCBjcmVhdGVWaXN1YWxpemF0aW9uID0gKGZvb2REYXRhLCBpZHgpID0+IHtcbiAgbGV0IG1hcmdpbiA9IHt0b3A6IDQwLCByaWdodDogNDAsIGJvdHRvbTogNjUsIGxlZnQ6IDUwfVxuICBsZXQgdyA9IDcwMCAtIG1hcmdpbi5sZWZ0IC0gbWFyZ2luLnJpZ2h0O1xuICBsZXQgaCA9IDYwMCAtIG1hcmdpbi50b3AgLSBtYXJnaW4uYm90dG9tO1xuXG4gIGxldCBkYXRhID0gT2JqZWN0LnZhbHVlcyhmb29kRGF0YSkuc2xpY2UoMiwgLTEpO1xuICBsZXQgbnVtYmVyT2ZDb2x1bW5zID0gMTA7XG4gIGxldCBtYXhWYWx1ZSA9IC41MDtcbi8vICAgbGV0IG1heFZhbHVlID0gZDMubWF4KGRhdGEsIGZ1bmN0aW9uKGQpIHtcbi8vICAgICByZXR1cm4gK2Q7XG4vLyAgIH0pO1xuICBsZXQgeF9heGlzTGVuZ3RoID0gdztcbiAgbGV0IHlfYXhpc0xlbmd0aCA9IGg7XG4gIGxldCB0YXJnZXRTbGlkZSA9IFwiI3NsaWRlLXN2Zy1cIiArIGlkeDtcbiAgbGV0IHRhcmdldFNsaWRlUmVjdCA9IFwic2xpZGUtc3ZnLVwiICsgaWR4ICsgXCItcmVjdFwiO1xuXG4gIGxldCB4U2NhbGUgPSBkM1xuICAgIC5zY2FsZUxpbmVhcigpXG4gICAgLmRvbWFpbihbMCwgbnVtYmVyT2ZDb2x1bW5zXSlcbiAgICAucmFuZ2UoWzAsIHddKTtcblxuICBsZXQgeVNjYWxlID0gZDNcbiAgICAuc2NhbGVMaW5lYXIoKVxuICAgIC5kb21haW4oWzAsIG1heFZhbHVlXSlcbiAgICAvLyAuZG9tYWluKFttYXhWYWx1ZSwgMF0pXG4gICAgLy8gLnJhbmdlKFtoLCAwXSk7XG4gICAgLnJhbmdlKFtoIC0gbWFyZ2luLnRvcCwgbWFyZ2luLmJvdHRvbV0pO1xuLy8gICBsZXQgeVNjYWxlID0gZDNcbi8vICAgICAuc2NhbGVMaW5lYXIoKVxuLy8gICAgIC5kb21haW4oWzAsIG1heFZhbHVlXSlcbi8vICAgICAucmFuZ2UoWzAsIHlfYXhpc0xlbmd0aCArIDUwXSk7XG5cbiAgbGV0IHN2ZyA9IGQzXG4gICAgLy8gLnNlbGVjdChgJHt0YXJnZXRTbGlkZX1gKVxuICAgIC5zZWxlY3QoXCIjdmlzXCIpXG4gICAgLmFwcGVuZChcInN2Z1wiKVxuICAgIC5hdHRyKFwid2lkdGhcIiwgdyArIG1hcmdpbi5sZWZ0ICsgbWFyZ2luLnJpZ2h0KVxuICAgIC5hdHRyKFwiaGVpZ2h0XCIsIGggKyBtYXJnaW4udG9wICsgbWFyZ2luLmJvdHRvbSk7XG5cbiAgc3ZnXG4gICAgLnNlbGVjdEFsbChcInJlY3RcIilcbiAgICAuZGF0YShkYXRhKVxuICAgIC5lbnRlcigpXG4gICAgLmFwcGVuZChcInJlY3RcIilcbiAgICAuYXR0cihcImNsYXNzXCIsIGAke3RhcmdldFNsaWRlUmVjdH1gKVxuICAgIC5hdHRyKFwieFwiLCBmdW5jdGlvbihkLCBpKSB7XG4gICAgICByZXR1cm4gaSAqICh4X2F4aXNMZW5ndGggLyBudW1iZXJPZkNvbHVtbnMpICsgbWFyZ2luLmxlZnQgKyAxMDtcbiAgICB9KVxuICAgIC5hdHRyKFwieVwiLCBmdW5jdGlvbihkKSB7XG4gICAgLy8gICByZXR1cm4geVNjYWxlKGQpO1xuICAgICAgcmV0dXJuIHlTY2FsZShkIC8gMTAwKTtcbiAgICB9KVxuICAgIC5hdHRyKFwid2lkdGhcIiwgeF9heGlzTGVuZ3RoIC8gbnVtYmVyT2ZDb2x1bW5zIC0gMSlcbiAgICAuYXR0cihcImhlaWdodFwiLCBmdW5jdGlvbihkKSB7XG4gICAgICByZXR1cm4gaCAtIHlTY2FsZShkIC8gMTAwKSAtIG1hcmdpbi50b3A7XG4gICAgfSlcbiAgICAuYXR0cihcImZpbGxcIiwgXCJyZWRcIilcbiAgICAudHJhbnNpdGlvbigpXG4gICAgLmR1cmF0aW9uKDUwMCk7XG5cbiAgICAvLyBkM1xuICAgIC8vICAgLnRpY2tWYWx1ZXMoXG4gICAgLy8gICAgICAgWydGaWJlcicsICdJcm9uJywgJ01hZ25lc2l1bScsICdQb3Rhc3NpdW0nLCAnWmluYycsICdWaXRhbWluIEMnLCAnRm9sYXRlJywgJ1ZpdGFtaW4gQi0xMicsICdWaXRhbWluIEEnLCAnVml0YW1pbiBEJ11cbiAgICAvLyAgIClcblxuICAgIGxldCB5QXhpcyA9IGQzLmF4aXNMZWZ0KHlTY2FsZSkudGlja3MoNCwgXCIlXCIpO1xuXG4gICAgc3ZnXG4gICAgICAuYXBwZW5kKFwiZ1wiKVxuICAgICAgLmF0dHIoXCJjbGFzc1wiLCBcInktYXhpc1wiKVxuICAgICAgLmF0dHIoXG4gICAgICAgIFwidHJhbnNmb3JtXCIsXG4gICAgICAgIFwidHJhbnNsYXRlKFwiICsgbWFyZ2luLmxlZnQgKyBcIiwwKVwiXG4gICAgICApXG4gICAgICAudHJhbnNpdGlvbigpXG4gICAgICAuZHVyYXRpb24oMTAwMClcbiAgICAgIC5jYWxsKHlBeGlzKTtcblxuICAgIC8vICAgLmF4aXMoKVxuICAgIC8vICAgLnNjYWxlKHlTY2FsZSlcbiAgICAvLyAgIC5vcmllbnQoXCJsZWZ0XCIpXG4gICAgLy8gICAudGlja1NpemUoMCk7XG5cblxuXG5cbn07XG5cblxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsIChlKSA9PiB7XG4gICAgXG4gICAgbGV0IHNsaWRlcyA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTk7IGkrKykge1xuICAgICAgICBsZXQgc2xpZGVOYW1lID0gXCIjc2xpZGUtY29udGFpbmVyLVwiICsgaTtcbiAgICAgICAgbGV0IG5ld1NsaWRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzbGlkZU5hbWUpO1xuICAgICAgICBzbGlkZXMucHVzaChuZXdTbGlkZSk7XG4gICAgfVxuICAgIGNyZWF0ZU9ic2VydmVycyhzbGlkZXMpO1xufSwgZmFsc2UpO1xuXG5jb25zdCBjcmVhdGVPYnNlcnZlcnMgPSAoc2xpZGVzKSA9PiB7XG4gICAgXG4gICAgbGV0IG9wdGlvbnMgPSB7XG4gICAgICByb290OiBudWxsLFxuICAgICAgcm9vdE1hcmdpbjogXCIwcHggMHB4IDBweCAwcHhcIixcbiAgICAgIHRocmVzaG9sZDogLjVcbiAgICB9O1xuXG4gICAgXG4gICAgLy8gU2xpZGVzLmF2b2NhZG9TbGlkZSgwLCBvcHRpb25zLCBzbGlkZXNbMF0sIG51dHJpdGlvbkRhdGEpO1xuICAgIC8vIFNsaWRlcy5iYW5hbmFTbGlkZSgxLCBvcHRpb25zLCBzbGlkZXNbMV0sIG51dHJpdGlvbkRhdGEpO1xuXG59XG4iLCJleHBvcnQgY29uc3QgYXZvY2Fkb1NsaWRlID0gKGlkeCwgb3B0aW9ucywgc2xpZGUsIGRhdGEpID0+IHtcbiAgbGV0IGZvb2REYXRhID0gZGF0YVtpZHhdO1xuXG4gIGxldCB0YXJnZXRTbGlkZSA9IFwiLnNsaWRlLXN2Zy1cIiArIGlkeDtcbiAgbGV0IHRhcmdldFNsaWRlUmVjdCA9IHRhcmdldFNsaWRlICsgXCItcmVjdFwiO1xuXG4gIGNvbnN0IGhhbmRsZUF2b2NhZG9TY3JvbGxPbnRvID0gKGVudHJpZXMsIG9ic2VydmVyKSA9PiB7XG4gICAgZW50cmllcy5mb3JFYWNoKGVudHJ5ID0+IHtcbiAgICAgIGlmIChlbnRyeS5pc0ludGVyc2VjdGluZykge1xuICAgICAgICBsZXQgc2luZ2xlRm9vZERhdGEgPSBPYmplY3QudmFsdWVzKGZvb2REYXRhKS5zbGljZSgyLCAtMSk7XG5cbiAgICAgICAgbGV0IG1heFZhbHVlID0gMjU7XG4gICAgICAgIC8vIGxldCBtYXhWYWx1ZSA9IGQzLm1heChzaW5nbGVGb29kRGF0YSwgZnVuY3Rpb24oZCkge1xuICAgICAgICAvLyAgIHJldHVybiArZDtcbiAgICAgICAgLy8gfSk7XG4gICAgICAgIGxldCB5X2F4aXNMZW5ndGggPSA0NTA7XG5cbiAgICAgICAgbGV0IHlTY2FsZSA9IGQzXG4gICAgICAgICAgLnNjYWxlTGluZWFyKClcbiAgICAgICAgICAuZG9tYWluKFswLCBtYXhWYWx1ZV0pXG4gICAgICAgICAgLnJhbmdlKFswLCB5X2F4aXNMZW5ndGhdKTtcblxuICAgICAgICBkMy5zZWxlY3RBbGwoYCR7dGFyZ2V0U2xpZGVSZWN0fWApXG4gICAgICAgICAgLmRhdGEoc2luZ2xlRm9vZERhdGEpXG4gICAgICAgICAgLnRyYW5zaXRpb24oKVxuICAgICAgICAgIC5hdHRyKFwieVwiLCBmdW5jdGlvbihkKSB7XG4gICAgICAgICAgICByZXR1cm4gNTAwIC0geVNjYWxlKGQpO1xuICAgICAgICAgIH0pXG4gICAgICAgICAgLmF0dHIoXCJoZWlnaHRcIiwgZnVuY3Rpb24oZCkge1xuICAgICAgICAgICAgICByZXR1cm4geVNjYWxlKGQpO1xuICAgICAgICAgICAgLy8gICByZXR1cm4gTWF0aC5taW4oeVNjYWxlKGQpLCAyNSk7XG4gICAgICAgICAgfSlcbiAgICAgICAgICAuZGVsYXkoNzUwKVxuICAgICAgICAgIC5kdXJhdGlvbig1MDApO1xuXG4gICAgICAgIGQzLnNlbGVjdEFsbChcIi5zbGlkZS1zdmctMS1yZWN0XCIpXG4gICAgICAgICAgICAudHJhbnNpdGlvbigpXG4gICAgICAgICAgICAuYXR0cihcInlcIiwgNTAwKVxuICAgICAgICAgICAgLmR1cmF0aW9uKDUwMCk7XG5cbiAgICAgIH1cbiAgICB9KTtcbiAgfTtcblxuICBsZXQgb2JzZXJ2ZXIgPSBuZXcgSW50ZXJzZWN0aW9uT2JzZXJ2ZXIoaGFuZGxlQXZvY2Fkb1Njcm9sbE9udG8sIG9wdGlvbnMpO1xuICBvYnNlcnZlci5vYnNlcnZlKHNsaWRlKTtcbn07ICAgIFxuXG5leHBvcnQgY29uc3QgYmFuYW5hU2xpZGUgPSAoaWR4LCBvcHRpb25zLCBzbGlkZSwgZGF0YSkgPT4ge1xuICBsZXQgZm9vZERhdGEgPSBkYXRhW2lkeF07XG5cbiAgbGV0IHRhcmdldFNsaWRlID0gXCIuc2xpZGUtc3ZnLVwiICsgaWR4O1xuICBsZXQgdGFyZ2V0U2xpZGVSZWN0ID0gdGFyZ2V0U2xpZGUgKyBcIi1yZWN0XCI7XG5cbiAgY29uc3QgaGFuZGxlQmFuYW5hU2Nyb2xsT250byA9IChlbnRyaWVzLCBvYnNlcnZlcikgPT4ge1xuICAgIGVudHJpZXMuZm9yRWFjaChlbnRyeSA9PiB7XG4gICAgICBpZiAoZW50cnkuaXNJbnRlcnNlY3RpbmcpIHtcbiAgICAgICAgbGV0IHNpbmdsZUZvb2REYXRhID0gT2JqZWN0LnZhbHVlcyhmb29kRGF0YSkuc2xpY2UoMiwgLTEpO1xuXG4gICAgICAgIGxldCBtYXhWYWx1ZSA9IGQzLm1heChzaW5nbGVGb29kRGF0YSwgZnVuY3Rpb24oZCkge1xuICAgICAgICAgIHJldHVybiArZDtcbiAgICAgICAgfSk7XG4gICAgICAgIGxldCB5X2F4aXNMZW5ndGggPSA0NTA7XG5cbiAgICAgICAgbGV0IHlTY2FsZSA9IGQzXG4gICAgICAgICAgLnNjYWxlTGluZWFyKClcbiAgICAgICAgICAuZG9tYWluKFswLCBtYXhWYWx1ZV0pXG4gICAgICAgICAgLnJhbmdlKFswLCB5X2F4aXNMZW5ndGhdKTtcblxuICAgICAgICBkMy5zZWxlY3RBbGwoYCR7dGFyZ2V0U2xpZGVSZWN0fWApXG4gICAgICAgICAgLmRhdGEoc2luZ2xlRm9vZERhdGEpXG4gICAgICAgICAgLnRyYW5zaXRpb24oKVxuICAgICAgICAgIC5hdHRyKFwieVwiLCBmdW5jdGlvbihkKSB7XG4gICAgICAgICAgICByZXR1cm4gNTAwIC0geVNjYWxlKGQpO1xuICAgICAgICAgIH0pXG4gICAgICAgICAgLmF0dHIoXCJoZWlnaHRcIiwgZnVuY3Rpb24oZCkge1xuICAgICAgICAgICAgcmV0dXJuIHlTY2FsZShkKTtcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5kZWxheSg3NTApXG4gICAgICAgICAgLmR1cmF0aW9uKDUwMCk7XG5cbiAgICAgICAgZDMuc2VsZWN0QWxsKFwiLnNsaWRlLXN2Zy0wLXJlY3RcIilcbiAgICAgICAgICAudHJhbnNpdGlvbigpXG4gICAgICAgICAgLmF0dHIoXCJ5XCIsIDUwMClcbiAgICAgICAgICAuZHVyYXRpb24oNTAwKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfTtcblxuICBsZXQgb2JzZXJ2ZXIgPSBuZXcgSW50ZXJzZWN0aW9uT2JzZXJ2ZXIoaGFuZGxlQmFuYW5hU2Nyb2xsT250bywgb3B0aW9ucyk7XG4gIG9ic2VydmVyLm9ic2VydmUoc2xpZGUpO1xufTtcblxuZXhwb3J0IGNvbnN0IHBvdGF0b1NsaWRlID0gKGlkeCwgb3B0aW9ucywgc2xpZGUsIGRhdGEpID0+IHtcblxuXG5cbn1cblxuZXhwb3J0IGNvbnN0IGJ1dHRlclNsaWRlID0gKGlkeCwgb3B0aW9ucywgc2xpZGUsIGRhdGEpID0+IHtcblxuXG5cbn1cblxuZXhwb3J0IGNvbnN0IGJlZWZMaXZlclNsaWRlID0gKGlkeCwgb3B0aW9ucywgc2xpZGUsIGRhdGEpID0+IHtcblxuXG5cbn1cblxuZXhwb3J0IGNvbnN0IGNvZExpdmVyU2xpZGUgPSAoaWR4LCBvcHRpb25zLCBzbGlkZSwgZGF0YSkgPT4ge1xuXG5cblxufVxuXG5leHBvcnQgY29uc3QgZWdnU2xpZGUgPSAoaWR4LCBvcHRpb25zLCBzbGlkZSwgZGF0YSkgPT4ge1xuXG5cblxufVxuXG5leHBvcnQgY29uc3QgaGVycmluZ1NsaWRlID0gKGlkeCwgb3B0aW9ucywgc2xpZGUsIGRhdGEpID0+IHtcblxuXG5cbn1cblxuZXhwb3J0IGNvbnN0IHR1bmFTbGlkZSA9IChpZHgsIG9wdGlvbnMsIHNsaWRlLCBkYXRhKSA9PiB7XG5cblxuXG59XG5cbmV4cG9ydCBjb25zdCBicm9jY29saVNsaWRlID0gKGlkeCwgb3B0aW9ucywgc2xpZGUsIGRhdGEpID0+IHtcblxuXG5cbn1cblxuZXhwb3J0IGNvbnN0IHBlYXNTbGlkZSA9IChpZHgsIG9wdGlvbnMsIHNsaWRlLCBkYXRhKSA9PiB7XG5cblxuXG59XG5cbmV4cG9ydCBjb25zdCByZWRQZXBwZXJTbGlkZSA9IChpZHgsIG9wdGlvbnMsIHNsaWRlLCBkYXRhKSA9PiB7XG5cblxuXG59XG5cbmV4cG9ydCBjb25zdCBveXN0ZXJTbGlkZSA9IChpZHgsIG9wdGlvbnMsIHNsaWRlLCBkYXRhKSA9PiB7XG5cblxuXG59XG5cbmV4cG9ydCBjb25zdCBzcGluYWNoU2xpZGUgPSAoaWR4LCBvcHRpb25zLCBzbGlkZSwgZGF0YSkgPT4ge1xuXG5cblxufVxuXG5leHBvcnQgY29uc3QgcXVpbm9hU2xpZGUgPSAoaWR4LCBvcHRpb25zLCBzbGlkZSwgZGF0YSkgPT4ge1xuXG5cblxufVxuXG5leHBvcnQgY29uc3QgY2hvY29sYXRlU2xpZGUgPSAoaWR4LCBvcHRpb25zLCBzbGlkZSwgZGF0YSkgPT4ge1xuXG5cblxufVxuXG5leHBvcnQgY29uc3Qgc3RyYXdiZXJyeVNsaWRlID0gKGlkeCwgb3B0aW9ucywgc2xpZGUsIGRhdGEpID0+IHtcblxuXG5cbn1cblxuZXhwb3J0IGNvbnN0IGJlYW5TbGlkZSA9IChpZHgsIG9wdGlvbnMsIHNsaWRlLCBkYXRhKSA9PiB7XG5cblxuXG59IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luIl0sInNvdXJjZVJvb3QiOiIifQ==