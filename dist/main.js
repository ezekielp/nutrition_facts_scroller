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
  createVisualization(nutritionData[0], 0);
  createVisualization(nutritionData[1], 1); //   nutritionData.forEach((foodData, idx) => {
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
  var numberOfColumns = 10; //   let maxValue = .50;

  var maxValue = Math.max(.50, d3.max(data, function (d) {
    return +d / 100;
  })); //   let maxValue = d3.max(data, function(d) {
  //     return +d;
  //   });

  var x_axisLength = w;
  var y_axisLength = h;
  var targetSVG = "slide-svg-" + idx;
  var targetSlideRect = "slide-svg-" + idx + "-rect"; //   debugger;

  var xScale = d3.scaleLinear() // .domain(d3.extent(Object.keys(foodData).slice(2, -1), function(d) { return d }))
  .domain([0, numberOfColumns]) // .domain([data[0], data[data.length - 1]])
  .range([0, w]);
  var yScale = d3.scaleLinear().domain([0, maxValue]) // .domain([maxValue, 0])
  // .range([h, 0]);
  .range([h - margin.top, margin.bottom]); //   let yScale = d3
  //     .scaleLinear()
  //     .domain([0, maxValue])
  //     .range([0, y_axisLength + 50]);
  //   debugger;

  var svg = d3 // .select(`${targetSlide}`)
  .select("#vis").append("svg") // .attr("class", `${targetSVG}`)
  .attr("width", w + margin.left + margin.right).attr("height", h + margin.top + margin.bottom);
  svg.selectAll("rect").data(data).enter().append("rect").attr("class", "".concat(targetSlideRect)).attr("x", function (d, i) {
    return i * (x_axisLength / numberOfColumns) + margin.left + 10;
  }).attr("y", h + 200) // .attr("y", function(d) {
  // //   return yScale(d / 100);
  // })
  .attr("width", x_axisLength / numberOfColumns - 1).attr("height", function (d) {
    //  return 0;
    return h - yScale(d / 100) - margin.top;
  }).attr("fill", "red").transition().duration(500);
  var xAxis = d3.axisBottom(xScale).tickSize(0).tickFormat(function (d) {
    return Object.keys(foodData).slice(2, -1)[d];
  });
  svg.append("g").attr("class", "".concat(targetSVG, "-x-axis x-axis")) //   .attr("class", `y-axis`)
  // .attr("transform", "translate(0, " + h + ")")
  .attr("transform", "translate(" + margin.left + ", " + (h - margin.top) + ")").transition().duration(1000).call(xAxis); // .selectAll("text");

  svg.selectAll(".x-axis text").attr("transform", function (d) {
    return "translate(20, 20)rotate(-45)";
  });
  var yAxis = d3.axisLeft(yScale).ticks(4, "%");
  svg.append("g").attr("class", "".concat(targetSVG, "-y-axis y-axis")) //   .attr("class", `y-axis`)
  .attr("transform", "translate(" + margin.left + ",0)").transition().duration(1000).call(yAxis); //   .axis()
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
    threshold: .3
  };
  _scripts_scroll_slides__WEBPACK_IMPORTED_MODULE_1__["bananaSlide"](0, options, slides[0], nutritionData);
  _scripts_scroll_slides__WEBPACK_IMPORTED_MODULE_1__["potatoSlide"](1, options, slides[1], nutritionData);
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
var bananaSlide = function bananaSlide(idx, options, slide, data) {
  var foodData = data[idx];
  var targetSlide = ".slide-svg-" + idx;
  var targetSlideRect = targetSlide + "-rect";

  var handleBananaScrollOnto = function handleBananaScrollOnto(entries, observer) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var margin = {
          top: 40,
          right: 40,
          bottom: 65,
          left: 50
        };
        var w = 700 - margin.left - margin.right;
        var h = 600 - margin.top - margin.bottom;
        var singleFoodData = Object.values(foodData).slice(2, -1);
        var maxValue = Math.max(0.5, d3.max(singleFoodData, function (d) {
          return +d / 100;
        }));
        var yScale = d3.scaleLinear().domain([0, maxValue]).range([h - margin.top, margin.bottom]);
        d3.selectAll("".concat(targetSlideRect)).data(singleFoodData).transition().attr("y", function (d) {
          return yScale(d / 100);
        }) //   .attr("height", function(d) {
        //       debugger;
        //     return h - yScale(d / 100) - margin.top;
        //   })
        .delay(750).duration(500);
        d3.selectAll(".slide-svg-1-rect").transition().attr("y", h + 200) //   .attr("height", "0px")
        .duration(500);
        d3.select(".slide-svg-0-y-axis").transition().style("opacity", "100%").delay(750).duration(500);
        d3.select(".slide-svg-1-y-axis").transition().style("opacity", "0%").duration(500);
      }
    });
  };

  var observer = new IntersectionObserver(handleBananaScrollOnto, options);
  observer.observe(slide);
};
var potatoSlide = function potatoSlide(idx, options, slide, data) {
  var foodData = data[idx];
  var targetSlide = ".slide-svg-" + idx;
  var targetSlideRect = targetSlide + "-rect";

  var handlePotatoScrollOnto = function handlePotatoScrollOnto(entries, observer) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var margin = {
          top: 40,
          right: 40,
          bottom: 65,
          left: 50
        };
        var w = 700 - margin.left - margin.right;
        var h = 600 - margin.top - margin.bottom;
        var singleFoodData = Object.values(foodData).slice(2, -1);
        var maxValue = Math.max(0.5, d3.max(singleFoodData, function (d) {
          return +d / 100;
        }));
        var yScale = d3.scaleLinear().domain([0, maxValue]).range([h - margin.top, margin.bottom]);
        d3.selectAll("".concat(targetSlideRect)).data(singleFoodData).transition().attr("y", function (d) {
          return yScale(d / 100);
        }) //   .attr("height", function(d) {
        //     return h - yScale(d / 100) - margin.top;
        //   })
        .delay(750).duration(500);
        d3.select(".slide-svg-1-y-axis").transition().style("opacity", "100%").delay(750).duration(500);
        d3.selectAll(".slide-svg-0-rect").transition().attr("y", h + 200) //   .attr("height", "0px")
        .duration(500);
        d3.select(".slide-svg-0-y-axis").transition().style("opacity", "0%").duration(500);
      }
    });
  };

  var observer = new IntersectionObserver(handlePotatoScrollOnto, options);
  observer.observe(slide);
};
var butterSlide = function butterSlide(idx, options, slide, data) {};
var avocadoSlide = function avocadoSlide(idx, options, slide, data) {
  var foodData = data[idx];
  var targetSlide = ".slide-svg-" + idx;
  var targetSlideRect = targetSlide + "-rect";
  var observer = new IntersectionObserver(handleAvocadoScrollOnto, options);
  observer.observe(slide);
};
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL3Njcm9sbC9zbGlkZXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0eWxlcy9pbmRleC5zY3NzIl0sIm5hbWVzIjpbIm51dHJpdGlvbkRhdGEiLCJkMyIsImNzdiIsImQiLCJmb29kX25hbWUiLCJzZXJ2aW5nX3NpemUiLCJmaWJlciIsImlyb24iLCJtYWduZXNpdW0iLCJwb3Rhc3NpdW0iLCJ6aW5jIiwidml0YW1pbl9jIiwiZm9sYXRlIiwidml0YW1pbl9iMTIiLCJ2aXRhbWluX2EiLCJ2aXRhbWluX2QiLCJjaG9sZXN0ZXJvbCIsInRoZW4iLCJkYXRhIiwiY29uc29sZSIsImxvZyIsImNyZWF0ZVZpc3VhbGl6YXRpb24iLCJmb29kRGF0YSIsImlkeCIsIm1hcmdpbiIsInRvcCIsInJpZ2h0IiwiYm90dG9tIiwibGVmdCIsInciLCJoIiwiT2JqZWN0IiwidmFsdWVzIiwic2xpY2UiLCJudW1iZXJPZkNvbHVtbnMiLCJtYXhWYWx1ZSIsIk1hdGgiLCJtYXgiLCJ4X2F4aXNMZW5ndGgiLCJ5X2F4aXNMZW5ndGgiLCJ0YXJnZXRTVkciLCJ0YXJnZXRTbGlkZVJlY3QiLCJ4U2NhbGUiLCJzY2FsZUxpbmVhciIsImRvbWFpbiIsInJhbmdlIiwieVNjYWxlIiwic3ZnIiwic2VsZWN0IiwiYXBwZW5kIiwiYXR0ciIsInNlbGVjdEFsbCIsImVudGVyIiwiaSIsInRyYW5zaXRpb24iLCJkdXJhdGlvbiIsInhBeGlzIiwiYXhpc0JvdHRvbSIsInRpY2tTaXplIiwidGlja0Zvcm1hdCIsImtleXMiLCJjYWxsIiwieUF4aXMiLCJheGlzTGVmdCIsInRpY2tzIiwid2luZG93IiwiYWRkRXZlbnRMaXN0ZW5lciIsImUiLCJzbGlkZXMiLCJzbGlkZU5hbWUiLCJuZXdTbGlkZSIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsInB1c2giLCJjcmVhdGVPYnNlcnZlcnMiLCJvcHRpb25zIiwicm9vdCIsInJvb3RNYXJnaW4iLCJ0aHJlc2hvbGQiLCJTbGlkZXMiLCJiYW5hbmFTbGlkZSIsInNsaWRlIiwidGFyZ2V0U2xpZGUiLCJoYW5kbGVCYW5hbmFTY3JvbGxPbnRvIiwiZW50cmllcyIsIm9ic2VydmVyIiwiZm9yRWFjaCIsImVudHJ5IiwiaXNJbnRlcnNlY3RpbmciLCJzaW5nbGVGb29kRGF0YSIsImRlbGF5Iiwic3R5bGUiLCJJbnRlcnNlY3Rpb25PYnNlcnZlciIsIm9ic2VydmUiLCJwb3RhdG9TbGlkZSIsImhhbmRsZVBvdGF0b1Njcm9sbE9udG8iLCJidXR0ZXJTbGlkZSIsImF2b2NhZG9TbGlkZSIsImhhbmRsZUF2b2NhZG9TY3JvbGxPbnRvIiwiYmVlZkxpdmVyU2xpZGUiLCJjb2RMaXZlclNsaWRlIiwiZWdnU2xpZGUiLCJoZXJyaW5nU2xpZGUiLCJ0dW5hU2xpZGUiLCJicm9jY29saVNsaWRlIiwicGVhc1NsaWRlIiwicmVkUGVwcGVyU2xpZGUiLCJveXN0ZXJTbGlkZSIsInNwaW5hY2hTbGlkZSIsInF1aW5vYVNsaWRlIiwiY2hvY29sYXRlU2xpZGUiLCJzdHJhd2JlcnJ5U2xpZGUiLCJiZWFuU2xpZGUiXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hB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QUF0QixFQUErQixDQUk1RCxDQUpNO0FBTUEsSUFBTTZGLGVBQWUsR0FBRyxTQUFsQkEsZUFBa0IsQ0FBQ3hGLEdBQUQsRUFBTW9ELE9BQU4sRUFBZU0sS0FBZixFQUFzQi9ELElBQXRCLEVBQStCLENBSTdELENBSk07QUFNQSxJQUFNOEYsU0FBUyxHQUFHLFNBQVpBLFNBQVksQ0FBQ3pGLEdBQUQsRUFBTW9ELE9BQU4sRUFBZU0sS0FBZixFQUFzQi9ELElBQXRCLEVBQStCLENBSXZELENBSk0sQzs7Ozs7Ozs7Ozs7QUNuT1AsdUMiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL2Rpc3QvXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LmpzXCIpO1xuIiwiaW1wb3J0ICcuL3N0eWxlcy9pbmRleC5zY3NzJztcbmltcG9ydCAqIGFzIFNsaWRlcyBmcm9tICcuL3NjcmlwdHMvc2Nyb2xsL3NsaWRlcyc7XG5cbmxldCBudXRyaXRpb25EYXRhO1xuXG5kMy5jc3YoXCJudXRyaXRpb25fZmFjdHNfZm9yX3Njcm9sbGVyLmNzdlwiLCBkID0+IHtcbiAgcmV0dXJuIHtcbiAgICBmb29kX25hbWU6IGRbXCJGb29kIG5hbWVcIl0sXG4gICAgc2VydmluZ19zaXplOiBkW1wiQW1vdW50XCJdLFxuICAgIGZpYmVyOiArZFtcIkZpYmVyXCJdLFxuICAgIGlyb246ICtkW1wiSXJvblwiXSxcbiAgICBtYWduZXNpdW06ICtkW1wiTWFnbmVzaXVtXCJdLFxuICAgIHBvdGFzc2l1bTogK2RbXCJQb3Rhc3NpdW1cIl0sXG4gICAgemluYzogK2RbXCJaaW5jXCJdLFxuICAgIHZpdGFtaW5fYzogK2RbXCJWaXRhbWluIENcIl0sXG4gICAgZm9sYXRlOiArZFtcIkZvbGF0ZVwiXSxcbiAgICB2aXRhbWluX2IxMjogK2RbXCJWaXRhbWluIEItMTJcIl0sXG4gICAgdml0YW1pbl9hOiArZFtcIlZpdGFtaW4gQVwiXSxcbiAgICB2aXRhbWluX2Q6ICtkW1wiVml0YW1pbiBEXCJdLFxuICAgIGNob2xlc3Rlcm9sOiArZFtcIkNob2xlc3Rlcm9sXCJdXG4gIH07XG59KS50aGVuKGRhdGEgPT4ge1xuICBudXRyaXRpb25EYXRhID0gZGF0YTtcbiAgY29uc29sZS5sb2cobnV0cml0aW9uRGF0YSk7XG4gIFxuICBjcmVhdGVWaXN1YWxpemF0aW9uKG51dHJpdGlvbkRhdGFbMF0sIDApO1xuICBjcmVhdGVWaXN1YWxpemF0aW9uKG51dHJpdGlvbkRhdGFbMV0sIDEpO1xuLy8gICBudXRyaXRpb25EYXRhLmZvckVhY2goKGZvb2REYXRhLCBpZHgpID0+IHtcbi8vICAgICAgIGNyZWF0ZVZpc3VhbGl6YXRpb24oZm9vZERhdGEsIGlkeCk7XG4vLyAgIH0pO1xuXG59KTtcblxuY29uc3QgY3JlYXRlVmlzdWFsaXphdGlvbiA9IChmb29kRGF0YSwgaWR4KSA9PiB7XG4gIGxldCBtYXJnaW4gPSB7dG9wOiA0MCwgcmlnaHQ6IDQwLCBib3R0b206IDY1LCBsZWZ0OiA1MH1cbiAgbGV0IHcgPSA3MDAgLSBtYXJnaW4ubGVmdCAtIG1hcmdpbi5yaWdodDtcbiAgbGV0IGggPSA2MDAgLSBtYXJnaW4udG9wIC0gbWFyZ2luLmJvdHRvbTtcblxuICBsZXQgZGF0YSA9IE9iamVjdC52YWx1ZXMoZm9vZERhdGEpLnNsaWNlKDIsIC0xKTtcbiAgbGV0IG51bWJlck9mQ29sdW1ucyA9IDEwO1xuLy8gICBsZXQgbWF4VmFsdWUgPSAuNTA7XG4gIGxldCBtYXhWYWx1ZSA9IE1hdGgubWF4KC41MCwgZDMubWF4KGRhdGEsIGZ1bmN0aW9uKGQpIHtcbiAgICByZXR1cm4gKCtkIC8gMTAwKTtcbiAgfSkpO1xuLy8gICBsZXQgbWF4VmFsdWUgPSBkMy5tYXgoZGF0YSwgZnVuY3Rpb24oZCkge1xuLy8gICAgIHJldHVybiArZDtcbi8vICAgfSk7XG4gIGxldCB4X2F4aXNMZW5ndGggPSB3O1xuICBsZXQgeV9heGlzTGVuZ3RoID0gaDtcbiAgbGV0IHRhcmdldFNWRyA9IFwic2xpZGUtc3ZnLVwiICsgaWR4O1xuICBsZXQgdGFyZ2V0U2xpZGVSZWN0ID0gXCJzbGlkZS1zdmctXCIgKyBpZHggKyBcIi1yZWN0XCI7XG5cbi8vICAgZGVidWdnZXI7XG4gIGxldCB4U2NhbGUgPSBkM1xuICAgIC5zY2FsZUxpbmVhcigpXG4gICAgLy8gLmRvbWFpbihkMy5leHRlbnQoT2JqZWN0LmtleXMoZm9vZERhdGEpLnNsaWNlKDIsIC0xKSwgZnVuY3Rpb24oZCkgeyByZXR1cm4gZCB9KSlcbiAgICAuZG9tYWluKFswLCBudW1iZXJPZkNvbHVtbnNdKVxuICAgIC8vIC5kb21haW4oW2RhdGFbMF0sIGRhdGFbZGF0YS5sZW5ndGggLSAxXV0pXG4gICAgLnJhbmdlKFswLCB3XSk7XG5cbiAgbGV0IHlTY2FsZSA9IGQzXG4gICAgLnNjYWxlTGluZWFyKClcbiAgICAuZG9tYWluKFswLCBtYXhWYWx1ZV0pXG4gICAgLy8gLmRvbWFpbihbbWF4VmFsdWUsIDBdKVxuICAgIC8vIC5yYW5nZShbaCwgMF0pO1xuICAgIC5yYW5nZShbaCAtIG1hcmdpbi50b3AsIG1hcmdpbi5ib3R0b21dKTtcbi8vICAgbGV0IHlTY2FsZSA9IGQzXG4vLyAgICAgLnNjYWxlTGluZWFyKClcbi8vICAgICAuZG9tYWluKFswLCBtYXhWYWx1ZV0pXG4vLyAgICAgLnJhbmdlKFswLCB5X2F4aXNMZW5ndGggKyA1MF0pO1xuXG4vLyAgIGRlYnVnZ2VyO1xuXG4gIGxldCBzdmcgPSBkM1xuICAgIC8vIC5zZWxlY3QoYCR7dGFyZ2V0U2xpZGV9YClcbiAgICAuc2VsZWN0KFwiI3Zpc1wiKVxuICAgIC5hcHBlbmQoXCJzdmdcIilcbiAgICAvLyAuYXR0cihcImNsYXNzXCIsIGAke3RhcmdldFNWR31gKVxuICAgIC5hdHRyKFwid2lkdGhcIiwgdyArIG1hcmdpbi5sZWZ0ICsgbWFyZ2luLnJpZ2h0KVxuICAgIC5hdHRyKFwiaGVpZ2h0XCIsIGggKyBtYXJnaW4udG9wICsgbWFyZ2luLmJvdHRvbSk7XG5cbiAgc3ZnXG4gICAgLnNlbGVjdEFsbChcInJlY3RcIilcbiAgICAuZGF0YShkYXRhKVxuICAgIC5lbnRlcigpXG4gICAgLmFwcGVuZChcInJlY3RcIilcbiAgICAuYXR0cihcImNsYXNzXCIsIGAke3RhcmdldFNsaWRlUmVjdH1gKVxuICAgIC5hdHRyKFwieFwiLCBmdW5jdGlvbihkLCBpKSB7XG4gICAgICByZXR1cm4gaSAqICh4X2F4aXNMZW5ndGggLyBudW1iZXJPZkNvbHVtbnMpICsgbWFyZ2luLmxlZnQgKyAxMDtcbiAgICB9KVxuICAgIC5hdHRyKFwieVwiLCBoICsgMjAwKVxuICAgIC8vIC5hdHRyKFwieVwiLCBmdW5jdGlvbihkKSB7XG4gICAgLy8gLy8gICByZXR1cm4geVNjYWxlKGQgLyAxMDApO1xuICAgIC8vIH0pXG4gICAgLmF0dHIoXCJ3aWR0aFwiLCB4X2F4aXNMZW5ndGggLyBudW1iZXJPZkNvbHVtbnMgLSAxKVxuICAgIC5hdHRyKFwiaGVpZ2h0XCIsIGZ1bmN0aW9uKGQpIHtcbiAgICAvLyAgcmV0dXJuIDA7XG4gICAgICByZXR1cm4gaCAtIHlTY2FsZShkIC8gMTAwKSAtIG1hcmdpbi50b3A7XG4gICB9KVxuICAgIC5hdHRyKFwiZmlsbFwiLCBcInJlZFwiKVxuICAgIC50cmFuc2l0aW9uKClcbiAgICAuZHVyYXRpb24oNTAwKTtcblxuICAgIGxldCB4QXhpcyA9IGQzXG4gICAgICAgICAgICAgICAgLmF4aXNCb3R0b20oeFNjYWxlKVxuICAgICAgICAgICAgICAgIC50aWNrU2l6ZSgwKVxuICAgICAgICAgICAgICAgIC50aWNrRm9ybWF0KGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKGZvb2REYXRhKS5zbGljZSgyLCAtMSlbZF07XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICBzdmdcbiAgICAgICAgLmFwcGVuZChcImdcIilcbiAgICAgICAgLmF0dHIoXCJjbGFzc1wiLCBgJHt0YXJnZXRTVkd9LXgtYXhpcyB4LWF4aXNgKVxuICAgICAgICAvLyAgIC5hdHRyKFwiY2xhc3NcIiwgYHktYXhpc2ApXG4gICAgICAgIC8vIC5hdHRyKFwidHJhbnNmb3JtXCIsIFwidHJhbnNsYXRlKDAsIFwiICsgaCArIFwiKVwiKVxuICAgICAgICAuYXR0cihcInRyYW5zZm9ybVwiLCBcInRyYW5zbGF0ZShcIiArIG1hcmdpbi5sZWZ0ICsgXCIsIFwiICsgKGggLSBtYXJnaW4udG9wKSArIFwiKVwiKVxuICAgICAgICAudHJhbnNpdGlvbigpXG4gICAgICAgIC5kdXJhdGlvbigxMDAwKVxuICAgICAgICAuY2FsbCh4QXhpcylcbiAgICAgICAgLy8gLnNlbGVjdEFsbChcInRleHRcIik7XG5cbiAgICBzdmcuc2VsZWN0QWxsKFwiLngtYXhpcyB0ZXh0XCIpXG4gICAgICAgIC5hdHRyKFwidHJhbnNmb3JtXCIsIGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgICAgIHJldHVybiBcInRyYW5zbGF0ZSgyMCwgMjApcm90YXRlKC00NSlcIjsgXG4gICAgICAgIH0pO1xuXG4gICAgbGV0IHlBeGlzID0gZDMuYXhpc0xlZnQoeVNjYWxlKS50aWNrcyg0LCBcIiVcIik7XG5cbiAgICBzdmdcbiAgICAgIC5hcHBlbmQoXCJnXCIpXG4gICAgICAuYXR0cihcImNsYXNzXCIsIGAke3RhcmdldFNWR30teS1heGlzIHktYXhpc2ApXG4gICAgLy8gICAuYXR0cihcImNsYXNzXCIsIGB5LWF4aXNgKVxuICAgICAgLmF0dHIoXCJ0cmFuc2Zvcm1cIiwgXCJ0cmFuc2xhdGUoXCIgKyBtYXJnaW4ubGVmdCArIFwiLDApXCIpXG4gICAgICAudHJhbnNpdGlvbigpXG4gICAgICAuZHVyYXRpb24oMTAwMClcbiAgICAgIC5jYWxsKHlBeGlzKTtcblxuICAgIC8vICAgLmF4aXMoKVxuICAgIC8vICAgLnNjYWxlKHlTY2FsZSlcbiAgICAvLyAgIC5vcmllbnQoXCJsZWZ0XCIpXG4gICAgLy8gICAudGlja1NpemUoMCk7XG5cblxuXG5cbn07XG5cblxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsIChlKSA9PiB7XG4gICAgXG4gICAgbGV0IHNsaWRlcyA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTk7IGkrKykge1xuICAgICAgICBsZXQgc2xpZGVOYW1lID0gXCIjc2xpZGUtY29udGFpbmVyLVwiICsgaTtcbiAgICAgICAgbGV0IG5ld1NsaWRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzbGlkZU5hbWUpO1xuICAgICAgICBzbGlkZXMucHVzaChuZXdTbGlkZSk7XG4gICAgfVxuICAgIGNyZWF0ZU9ic2VydmVycyhzbGlkZXMpO1xufSwgZmFsc2UpO1xuXG5jb25zdCBjcmVhdGVPYnNlcnZlcnMgPSAoc2xpZGVzKSA9PiB7XG4gICAgXG4gICAgbGV0IG9wdGlvbnMgPSB7XG4gICAgICByb290OiBudWxsLFxuICAgICAgcm9vdE1hcmdpbjogXCIwcHggMHB4IDBweCAwcHhcIixcbiAgICAgIHRocmVzaG9sZDogLjNcbiAgICB9O1xuXG4gICAgXG4gICAgU2xpZGVzLmJhbmFuYVNsaWRlKDAsIG9wdGlvbnMsIHNsaWRlc1swXSwgbnV0cml0aW9uRGF0YSk7XG4gICAgU2xpZGVzLnBvdGF0b1NsaWRlKDEsIG9wdGlvbnMsIHNsaWRlc1sxXSwgbnV0cml0aW9uRGF0YSk7XG5cbn1cbiIsImV4cG9ydCBjb25zdCBiYW5hbmFTbGlkZSA9IChpZHgsIG9wdGlvbnMsIHNsaWRlLCBkYXRhKSA9PiB7XG4gIGxldCBmb29kRGF0YSA9IGRhdGFbaWR4XTtcblxuICBsZXQgdGFyZ2V0U2xpZGUgPSBcIi5zbGlkZS1zdmctXCIgKyBpZHg7XG4gIGxldCB0YXJnZXRTbGlkZVJlY3QgPSB0YXJnZXRTbGlkZSArIFwiLXJlY3RcIjtcblxuICBjb25zdCBoYW5kbGVCYW5hbmFTY3JvbGxPbnRvID0gKGVudHJpZXMsIG9ic2VydmVyKSA9PiB7XG4gICAgZW50cmllcy5mb3JFYWNoKGVudHJ5ID0+IHtcbiAgICAgIGlmIChlbnRyeS5pc0ludGVyc2VjdGluZykge1xuICAgICAgICBsZXQgbWFyZ2luID0geyB0b3A6IDQwLCByaWdodDogNDAsIGJvdHRvbTogNjUsIGxlZnQ6IDUwIH07XG4gICAgICAgIGxldCB3ID0gNzAwIC0gbWFyZ2luLmxlZnQgLSBtYXJnaW4ucmlnaHQ7XG4gICAgICAgIGxldCBoID0gNjAwIC0gbWFyZ2luLnRvcCAtIG1hcmdpbi5ib3R0b207XG5cbiAgICAgICAgbGV0IHNpbmdsZUZvb2REYXRhID0gT2JqZWN0LnZhbHVlcyhmb29kRGF0YSkuc2xpY2UoMiwgLTEpO1xuXG4gICAgICAgIGxldCBtYXhWYWx1ZSA9IE1hdGgubWF4KFxuICAgICAgICAgICAgMC41LFxuICAgICAgICAgICAgZDMubWF4KHNpbmdsZUZvb2REYXRhLCBmdW5jdGlvbihkKSB7XG4gICAgICAgICAgICAgIHJldHVybiArZCAvIDEwMDtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICk7XG5cbiAgICAgICAgbGV0IHlTY2FsZSA9IGQzXG4gICAgICAgICAgICAuc2NhbGVMaW5lYXIoKVxuICAgICAgICAgICAgLmRvbWFpbihbMCwgbWF4VmFsdWVdKVxuICAgICAgICAgICAgLnJhbmdlKFtoIC0gbWFyZ2luLnRvcCwgbWFyZ2luLmJvdHRvbV0pO1xuXG5cbiAgICAgICAgZDMuc2VsZWN0QWxsKGAke3RhcmdldFNsaWRlUmVjdH1gKVxuICAgICAgICAgIC5kYXRhKHNpbmdsZUZvb2REYXRhKVxuICAgICAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgICAgICAuYXR0cihcInlcIiwgZnVuY3Rpb24oZCkge1xuICAgICAgICAgICAgcmV0dXJuIHlTY2FsZShkIC8gMTAwKTtcbiAgICAgICAgICB9KVxuICAgICAgICAvLyAgIC5hdHRyKFwiaGVpZ2h0XCIsIGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgLy8gICAgICAgZGVidWdnZXI7XG4gICAgICAgIC8vICAgICByZXR1cm4gaCAtIHlTY2FsZShkIC8gMTAwKSAtIG1hcmdpbi50b3A7XG4gICAgICAgIC8vICAgfSlcbiAgICAgICAgICAuZGVsYXkoNzUwKVxuICAgICAgICAgIC5kdXJhdGlvbig1MDApO1xuXG4gICAgICAgIGQzLnNlbGVjdEFsbChcIi5zbGlkZS1zdmctMS1yZWN0XCIpXG4gICAgICAgICAgLnRyYW5zaXRpb24oKVxuICAgICAgICAgIC5hdHRyKFwieVwiLCBoICsgMjAwKVxuICAgICAgICAvLyAgIC5hdHRyKFwiaGVpZ2h0XCIsIFwiMHB4XCIpXG4gICAgICAgICAgLmR1cmF0aW9uKDUwMCk7XG5cbiAgICAgICAgZDMuc2VsZWN0KFwiLnNsaWRlLXN2Zy0wLXktYXhpc1wiKVxuICAgICAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgICAgICAuc3R5bGUoXCJvcGFjaXR5XCIsIFwiMTAwJVwiKVxuICAgICAgICAgIC5kZWxheSg3NTApXG4gICAgICAgICAgLmR1cmF0aW9uKDUwMCk7ICAgICAgICBcblxuICAgICAgICBkMy5zZWxlY3QoXCIuc2xpZGUtc3ZnLTEteS1heGlzXCIpXG4gICAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgICAgLnN0eWxlKFwib3BhY2l0eVwiLCBcIjAlXCIpXG4gICAgICAgIC5kdXJhdGlvbig1MDApO1xuICAgICAgfVxuICAgIH0pO1xuICB9O1xuXG4gIGxldCBvYnNlcnZlciA9IG5ldyBJbnRlcnNlY3Rpb25PYnNlcnZlcihoYW5kbGVCYW5hbmFTY3JvbGxPbnRvLCBvcHRpb25zKTtcbiAgb2JzZXJ2ZXIub2JzZXJ2ZShzbGlkZSk7XG59O1xuXG5leHBvcnQgY29uc3QgcG90YXRvU2xpZGUgPSAoaWR4LCBvcHRpb25zLCBzbGlkZSwgZGF0YSkgPT4ge1xuXG4gIGxldCBmb29kRGF0YSA9IGRhdGFbaWR4XTtcblxuICBsZXQgdGFyZ2V0U2xpZGUgPSBcIi5zbGlkZS1zdmctXCIgKyBpZHg7XG4gIGxldCB0YXJnZXRTbGlkZVJlY3QgPSB0YXJnZXRTbGlkZSArIFwiLXJlY3RcIjtcblxuICBjb25zdCBoYW5kbGVQb3RhdG9TY3JvbGxPbnRvID0gKGVudHJpZXMsIG9ic2VydmVyKSA9PiB7XG4gICAgZW50cmllcy5mb3JFYWNoKGVudHJ5ID0+IHtcbiAgICAgIGlmIChlbnRyeS5pc0ludGVyc2VjdGluZykge1xuICAgICAgICBsZXQgbWFyZ2luID0geyB0b3A6IDQwLCByaWdodDogNDAsIGJvdHRvbTogNjUsIGxlZnQ6IDUwIH07XG4gICAgICAgIGxldCB3ID0gNzAwIC0gbWFyZ2luLmxlZnQgLSBtYXJnaW4ucmlnaHQ7XG4gICAgICAgIGxldCBoID0gNjAwIC0gbWFyZ2luLnRvcCAtIG1hcmdpbi5ib3R0b207XG5cbiAgICAgICAgbGV0IHNpbmdsZUZvb2REYXRhID0gT2JqZWN0LnZhbHVlcyhmb29kRGF0YSkuc2xpY2UoMiwgLTEpO1xuXG4gICAgICAgIGxldCBtYXhWYWx1ZSA9IE1hdGgubWF4KFxuICAgICAgICAgIDAuNSxcbiAgICAgICAgICBkMy5tYXgoc2luZ2xlRm9vZERhdGEsIGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgICAgIHJldHVybiArZCAvIDEwMDtcbiAgICAgICAgICB9KVxuICAgICAgICApO1xuXG4gICAgICAgIGxldCB5U2NhbGUgPSBkM1xuICAgICAgICAgIC5zY2FsZUxpbmVhcigpXG4gICAgICAgICAgLmRvbWFpbihbMCwgbWF4VmFsdWVdKVxuICAgICAgICAgIC5yYW5nZShbaCAtIG1hcmdpbi50b3AsIG1hcmdpbi5ib3R0b21dKTtcblxuICAgICAgICBkMy5zZWxlY3RBbGwoYCR7dGFyZ2V0U2xpZGVSZWN0fWApXG4gICAgICAgICAgLmRhdGEoc2luZ2xlRm9vZERhdGEpXG4gICAgICAgICAgLnRyYW5zaXRpb24oKVxuICAgICAgICAgIC5hdHRyKFwieVwiLCBmdW5jdGlvbihkKSB7XG4gICAgICAgICAgICByZXR1cm4geVNjYWxlKGQgLyAxMDApO1xuICAgICAgICAgIH0pXG4gICAgICAgIC8vICAgLmF0dHIoXCJoZWlnaHRcIiwgZnVuY3Rpb24oZCkge1xuICAgICAgICAvLyAgICAgcmV0dXJuIGggLSB5U2NhbGUoZCAvIDEwMCkgLSBtYXJnaW4udG9wO1xuICAgICAgICAvLyAgIH0pXG4gICAgICAgICAgLmRlbGF5KDc1MClcbiAgICAgICAgICAuZHVyYXRpb24oNTAwKTtcblxuICAgICAgICBkMy5zZWxlY3QoXCIuc2xpZGUtc3ZnLTEteS1heGlzXCIpXG4gICAgICAgICAgLnRyYW5zaXRpb24oKVxuICAgICAgICAgIC5zdHlsZShcIm9wYWNpdHlcIiwgXCIxMDAlXCIpXG4gICAgICAgICAgLmRlbGF5KDc1MClcbiAgICAgICAgICAuZHVyYXRpb24oNTAwKTsgICAgICAgIFxuXG4gICAgICAgIGQzLnNlbGVjdEFsbChcIi5zbGlkZS1zdmctMC1yZWN0XCIpXG4gICAgICAgICAgLnRyYW5zaXRpb24oKVxuICAgICAgICAgIC5hdHRyKFwieVwiLCBoICsgMjAwKVxuICAgICAgICAvLyAgIC5hdHRyKFwiaGVpZ2h0XCIsIFwiMHB4XCIpXG4gICAgICAgICAgLmR1cmF0aW9uKDUwMCk7XG5cbiAgICAgICAgZDMuc2VsZWN0KFwiLnNsaWRlLXN2Zy0wLXktYXhpc1wiKVxuICAgICAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgICAgICAuc3R5bGUoXCJvcGFjaXR5XCIsIFwiMCVcIilcbiAgICAgICAgICAuZHVyYXRpb24oNTAwKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfTtcblxuICBsZXQgb2JzZXJ2ZXIgPSBuZXcgSW50ZXJzZWN0aW9uT2JzZXJ2ZXIoaGFuZGxlUG90YXRvU2Nyb2xsT250bywgb3B0aW9ucyk7XG4gIG9ic2VydmVyLm9ic2VydmUoc2xpZGUpO1xuXG59XG5cbmV4cG9ydCBjb25zdCBidXR0ZXJTbGlkZSA9IChpZHgsIG9wdGlvbnMsIHNsaWRlLCBkYXRhKSA9PiB7XG5cblxuXG59XG5cbmV4cG9ydCBjb25zdCBhdm9jYWRvU2xpZGUgPSAoaWR4LCBvcHRpb25zLCBzbGlkZSwgZGF0YSkgPT4ge1xuICBsZXQgZm9vZERhdGEgPSBkYXRhW2lkeF07XG5cbiAgbGV0IHRhcmdldFNsaWRlID0gXCIuc2xpZGUtc3ZnLVwiICsgaWR4O1xuICBsZXQgdGFyZ2V0U2xpZGVSZWN0ID0gdGFyZ2V0U2xpZGUgKyBcIi1yZWN0XCI7XG5cblxuXG4gIGxldCBvYnNlcnZlciA9IG5ldyBJbnRlcnNlY3Rpb25PYnNlcnZlcihoYW5kbGVBdm9jYWRvU2Nyb2xsT250bywgb3B0aW9ucyk7XG4gIG9ic2VydmVyLm9ic2VydmUoc2xpZGUpO1xufTsgICAgXG5cblxuZXhwb3J0IGNvbnN0IGJlZWZMaXZlclNsaWRlID0gKGlkeCwgb3B0aW9ucywgc2xpZGUsIGRhdGEpID0+IHtcblxuXG5cbn1cblxuZXhwb3J0IGNvbnN0IGNvZExpdmVyU2xpZGUgPSAoaWR4LCBvcHRpb25zLCBzbGlkZSwgZGF0YSkgPT4ge1xuXG5cblxufVxuXG5leHBvcnQgY29uc3QgZWdnU2xpZGUgPSAoaWR4LCBvcHRpb25zLCBzbGlkZSwgZGF0YSkgPT4ge1xuXG5cblxufVxuXG5leHBvcnQgY29uc3QgaGVycmluZ1NsaWRlID0gKGlkeCwgb3B0aW9ucywgc2xpZGUsIGRhdGEpID0+IHtcblxuXG5cbn1cblxuZXhwb3J0IGNvbnN0IHR1bmFTbGlkZSA9IChpZHgsIG9wdGlvbnMsIHNsaWRlLCBkYXRhKSA9PiB7XG5cblxuXG59XG5cbmV4cG9ydCBjb25zdCBicm9jY29saVNsaWRlID0gKGlkeCwgb3B0aW9ucywgc2xpZGUsIGRhdGEpID0+IHtcblxuXG5cbn1cblxuZXhwb3J0IGNvbnN0IHBlYXNTbGlkZSA9IChpZHgsIG9wdGlvbnMsIHNsaWRlLCBkYXRhKSA9PiB7XG5cblxuXG59XG5cbmV4cG9ydCBjb25zdCByZWRQZXBwZXJTbGlkZSA9IChpZHgsIG9wdGlvbnMsIHNsaWRlLCBkYXRhKSA9PiB7XG5cblxuXG59XG5cbmV4cG9ydCBjb25zdCBveXN0ZXJTbGlkZSA9IChpZHgsIG9wdGlvbnMsIHNsaWRlLCBkYXRhKSA9PiB7XG5cblxuXG59XG5cbmV4cG9ydCBjb25zdCBzcGluYWNoU2xpZGUgPSAoaWR4LCBvcHRpb25zLCBzbGlkZSwgZGF0YSkgPT4ge1xuXG5cblxufVxuXG5leHBvcnQgY29uc3QgcXVpbm9hU2xpZGUgPSAoaWR4LCBvcHRpb25zLCBzbGlkZSwgZGF0YSkgPT4ge1xuXG5cblxufVxuXG5leHBvcnQgY29uc3QgY2hvY29sYXRlU2xpZGUgPSAoaWR4LCBvcHRpb25zLCBzbGlkZSwgZGF0YSkgPT4ge1xuXG5cblxufVxuXG5leHBvcnQgY29uc3Qgc3RyYXdiZXJyeVNsaWRlID0gKGlkeCwgb3B0aW9ucywgc2xpZGUsIGRhdGEpID0+IHtcblxuXG5cbn1cblxuZXhwb3J0IGNvbnN0IGJlYW5TbGlkZSA9IChpZHgsIG9wdGlvbnMsIHNsaWRlLCBkYXRhKSA9PiB7XG5cblxuXG59IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luIl0sInNvdXJjZVJvb3QiOiIifQ==