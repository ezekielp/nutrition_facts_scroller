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
/* harmony import */ var _scripts_flying_food__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./scripts/flying_food */ "./src/scripts/flying_food.js");
var _this = undefined;




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
    "vitamin C": +d["Vitamin C"],
    folate: +d["Folate"],
    "vitamin B12": +d["Vitamin B-12"],
    "vitamin A": +d["Vitamin A"],
    "vitamin D": +d["Vitamin D"],
    cholesterol: +d["Cholesterol"]
  };
}).then(function (data) {
  nutritionData = data;
  console.log(nutritionData);
  createVisualization(nutritionData[0], 0, true);
  createNavLi(0);
  createAnchor(0);

  for (var i = 1; i < nutritionData.length; i++) {
    createVisualization(nutritionData[i], i);
    createNavLi(i);
    createAnchor(i);
  }
});

var createVisualization = function createVisualization(foodData, idx, createXAxisBool) {
  var margin = {
    top: 20,
    right: 40,
    bottom: 25,
    left: 60
  };
  var w = 670 - margin.left - margin.right;
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
  var svg = d3 // .select("#vis")
  .select("#svg-container-".concat(idx)).append("svg").attr("class", "".concat(targetSVG, " hidden")).attr("viewBox", "0 0 ".concat(h + margin.top + margin.bottom, " ").concat(w + margin.left + margin.right)); // .attr("preserveAspectRatio", "xMinYMin meet");
  // .attr("width", w + margin.left + margin.right)
  // .attr("height", h + margin.top + margin.bottom);

  var xAxis = d3.axisBottom(xScale).tickSize(0).tickFormat(function (d) {
    return Object.keys(foodData).slice(2, -1)[d];
  });

  if (createXAxisBool !== undefined) {
    svg.append("g").attr("class", "".concat(targetSVG, "-x-axis x-axis")).attr("transform", "translate(" + margin.left + ", " + (h - margin.top) + ")").transition().duration(1000).call(xAxis);
    svg.selectAll(".x-axis text").attr("transform", function (d) {
      return "translate(25, 25)rotate(-45)";
    });
    svg.append("text").attr("transform", "rotate(-90)").attr("class", "y-axis-label").attr("y", -5).attr("x", 0 - h / 2).attr("dy", "1em").style("text-anchor", "middle").text("Percentage of recommended daily allowance(RDA)");
  }

  var yAxis = d3.axisLeft(yScale).ticks(4, "%");
  svg.append("g").attr("class", "".concat(targetSVG, "-y-axis y-axis")).attr("transform", "translate(" + margin.left + ",0)").style("opacity", "0%").call(yAxis);
  svg.selectAll("rect").data(data).enter().append("rect").attr("class", "".concat(targetSlideRect)).attr("x", function (d, i) {
    return i * (x_axisLength / numberOfColumns) + margin.left + 10;
  }).attr("y", function (d) {
    return yScale(d / 100);
  }).attr("width", x_axisLength / numberOfColumns - 1).attr("height", function (d) {
    return h - yScale(d / 100) - margin.top;
  }).attr("fill", "red").transition().duration(500); // .on("mouseover", handleMouseover);

  var handleMouseover = function handleMouseover(d, i) {
    d3.select(_this).transition().ease("ease").duration(500).attr("fill", "white");
  };
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
document.addEventListener("DOMContentLoaded", function () {
  Object(_scripts_flying_food__WEBPACK_IMPORTED_MODULE_2__["default"])();
});

var createObservers = function createObservers(slides) {
  var options = {
    root: null,
    rootMargin: "0px 0px 0px 0px",
    threshold: .5
  };
  console.log(slides);

  for (var i = 0; i < slides.length - 1; i++) {
    _scripts_scroll_slides__WEBPACK_IMPORTED_MODULE_1__["renderSlide"](options, slides[i], i);
  }
};

var createNavLi = function createNavLi(idx) {
  var navColumn = document.querySelector('.nav-column');
  var anchorLink = document.createElement("a");
  anchorLink.setAttribute("href", "#anchor-".concat(idx));
  navColumn.appendChild(anchorLink);
  var navLi = document.createElement("li");
  navLi.setAttribute("id", "nav-li-".concat(idx));
  navLi.classList.add("nav-li");
  anchorLink.appendChild(navLi);
};

var createAnchor = function createAnchor(idx) {
  var slideContainer = document.getElementById("slide-container-".concat(idx));
  var anchorTag = document.createElement("a");
  anchorTag.setAttribute("id", "anchor-".concat(idx));
  anchorTag.classList.add("anchor");
  slideContainer.appendChild(anchorTag);
};

/***/ }),

/***/ "./src/scripts/flying_food.js":
/*!************************************!*\
  !*** ./src/scripts/flying_food.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var addAllFlyingFoodListeners = function addAllFlyingFoodListeners() {
  var foodCounters = {};

  var addFlyingFoodListener = function addFlyingFoodListener(idx) {
    var foodIcon = document.getElementById("food-svg-container-".concat(idx));
    foodIcon.addEventListener("click", function (e) {
      var foodChildren = foodIcon.childNodes;

      if (foodChildren[3]) {
        for (var i = 0; i < 30; i++) {
          foodIcon.removeChild(foodChildren[3]);
        }
      }

      var movementFunc = function movementFunc(newFood) {
        var start = null;
        var signedOnes = [-1, 1];
        var randomIdx = Math.floor(Math.random() * 2);
        var randomlySignedOne = signedOnes[randomIdx];

        var step = function step(timestamp) {
          if (!start) start = timestamp;
          var progress = timestamp - start;
          newFood.style.transform = "translate(" + progress * randomlySignedOne + "px, " + progress + "px)";

          if (progress < 1500) {
            window.requestAnimationFrame(step);
          }
        };

        window.requestAnimationFrame(step);
      };

      for (var _i = foodCounters[idx]; _i < foodCounters[idx] + 30; _i++) {
        var newFood = document.createElement("div");
        newFood.setAttribute("id", "flying-food-of-type-".concat(idx, "-").concat(_i));
        newFood.classList.add("flying-food-".concat(idx));
        newFood.classList.add("flying-food");
        foodIcon.appendChild(newFood);
        var thisOneParticularFood = document.getElementById("flying-food-of-type-".concat(idx, "-").concat(_i));
        thisOneParticularFood.style.top = Math.random() * -700 + "px";
        thisOneParticularFood.style.left = Math.floor(Math.random() * window.innerWidth) + "px";
        movementFunc(thisOneParticularFood);
      }

      foodCounters[idx] += 10;
    });
  };

  for (var i = 0; i < 18; i++) {
    foodCounters[i] = 0;
    addFlyingFoodListener(i);
  }
};

/* harmony default export */ __webpack_exports__["default"] = (addAllFlyingFoodListeners);

/***/ }),

/***/ "./src/scripts/scroll/slides.js":
/*!**************************************!*\
  !*** ./src/scripts/scroll/slides.js ***!
  \**************************************/
/*! exports provided: renderSlide */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "renderSlide", function() { return renderSlide; });
var renderSlide = function renderSlide(options, slide, idx) {
  var handleScrollOnto = function handleScrollOnto(entries, observer) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        document.querySelector(".slide-svg-".concat(idx)).classList.remove("hidden");

        if (document.querySelector(".slide-svg-".concat(idx - 1))) {
          document.querySelector(".slide-svg-".concat(idx - 1)).classList.add("hidden");
        }

        if (document.querySelector(".slide-svg-".concat(idx + 1))) {
          document.querySelector(".slide-svg-".concat(idx + 1)).classList.add("hidden");
        }

        document.querySelectorAll(".slide-svg-".concat(idx, "-rect")).forEach(function (rect) {
          // rect.classList.remove("hidden");
          rect.classList.add("chart-rect");
        });
        d3.select(".slide-svg-".concat(idx, "-y-axis")).transition().style("opacity", "100%").duration(500);
        var navCircle = document.getElementById("nav-li-".concat(idx));
        navCircle.classList.add("nav-li-".concat(idx));

        if (document.querySelectorAll(".slide-svg-".concat(idx - 1, "-rect"))) {
          document.querySelectorAll(".slide-svg-".concat(idx - 1, "-rect")).forEach(function (rect) {
            // rect.classList.add("hidden");
            rect.classList.remove("chart-rect");
          });
          d3.select(".slide-svg-".concat(idx - 1, "-y-axis")).transition().style("opacity", "0%").duration(500);
        }

        if (document.getElementById("nav-li-".concat(idx - 1))) {
          document.getElementById("nav-li-".concat(idx - 1)).classList.remove("nav-li-".concat(idx - 1));
        }

        if (document.querySelectorAll(".slide-svg-".concat(idx + 1, "-rect"))) {
          // debugger;
          document.querySelectorAll(".slide-svg-".concat(idx + 1, "-rect")).forEach(function (rect) {
            // rect.classList.add("hidden");
            rect.classList.remove("chart-rect");
          });
          d3.select(".slide-svg-".concat(idx + 1, "-y-axis")).transition().style("opacity", "0%").duration(500);
          document.getElementById("nav-li-".concat(idx + 1)).classList.remove("nav-li-".concat(idx + 1));
        }
      }
    });
  };

  var observer = new IntersectionObserver(handleScrollOnto, options);
  observer.observe(slide);
};

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL2ZseWluZ19mb29kLmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL3Njcm9sbC9zbGlkZXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0eWxlcy9pbmRleC5zY3NzP2M4MDciXSwibmFtZXMiOlsibnV0cml0aW9uRGF0YSIsImQzIiwiY3N2IiwiZCIsImZvb2RfbmFtZSIsInNlcnZpbmdfc2l6ZSIsImZpYmVyIiwiaXJvbiIsIm1hZ25lc2l1bSIsInBvdGFzc2l1bSIsInppbmMiLCJmb2xhdGUiLCJjaG9sZXN0ZXJvbCIsInRoZW4iLCJkYXRhIiwiY29uc29sZSIsImxvZyIsImNyZWF0ZVZpc3VhbGl6YXRpb24iLCJjcmVhdGVOYXZMaSIsImNyZWF0ZUFuY2hvciIsImkiLCJsZW5ndGgiLCJmb29kRGF0YSIsImlkeCIsImNyZWF0ZVhBeGlzQm9vbCIsIm1hcmdpbiIsInRvcCIsInJpZ2h0IiwiYm90dG9tIiwibGVmdCIsInciLCJoIiwiT2JqZWN0IiwidmFsdWVzIiwic2xpY2UiLCJudW1iZXJPZkNvbHVtbnMiLCJtYXhWYWx1ZSIsIk1hdGgiLCJtYXgiLCJ4X2F4aXNMZW5ndGgiLCJ5X2F4aXNMZW5ndGgiLCJ0YXJnZXRTVkciLCJ0YXJnZXRTbGlkZVJlY3QiLCJ4U2NhbGUiLCJzY2FsZUxpbmVhciIsImRvbWFpbiIsInJhbmdlIiwieVNjYWxlIiwic3ZnIiwic2VsZWN0IiwiYXBwZW5kIiwiYXR0ciIsInhBeGlzIiwiYXhpc0JvdHRvbSIsInRpY2tTaXplIiwidGlja0Zvcm1hdCIsImtleXMiLCJ1bmRlZmluZWQiLCJ0cmFuc2l0aW9uIiwiZHVyYXRpb24iLCJjYWxsIiwic2VsZWN0QWxsIiwic3R5bGUiLCJ0ZXh0IiwieUF4aXMiLCJheGlzTGVmdCIsInRpY2tzIiwiZW50ZXIiLCJoYW5kbGVNb3VzZW92ZXIiLCJlYXNlIiwid2luZG93IiwiYWRkRXZlbnRMaXN0ZW5lciIsImUiLCJzbGlkZXMiLCJzbGlkZU5hbWUiLCJuZXdTbGlkZSIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsInB1c2giLCJjcmVhdGVPYnNlcnZlcnMiLCJhZGRBbGxGbHlpbmdGb29kTGlzdGVuZXJzIiwib3B0aW9ucyIsInJvb3QiLCJyb290TWFyZ2luIiwidGhyZXNob2xkIiwiU2xpZGVzIiwibmF2Q29sdW1uIiwiYW5jaG9yTGluayIsImNyZWF0ZUVsZW1lbnQiLCJzZXRBdHRyaWJ1dGUiLCJhcHBlbmRDaGlsZCIsIm5hdkxpIiwiY2xhc3NMaXN0IiwiYWRkIiwic2xpZGVDb250YWluZXIiLCJnZXRFbGVtZW50QnlJZCIsImFuY2hvclRhZyIsImZvb2RDb3VudGVycyIsImFkZEZseWluZ0Zvb2RMaXN0ZW5lciIsImZvb2RJY29uIiwiZm9vZENoaWxkcmVuIiwiY2hpbGROb2RlcyIsInJlbW92ZUNoaWxkIiwibW92ZW1lbnRGdW5jIiwibmV3Rm9vZCIsInN0YXJ0Iiwic2lnbmVkT25lcyIsInJhbmRvbUlkeCIsImZsb29yIiwicmFuZG9tIiwicmFuZG9tbHlTaWduZWRPbmUiLCJzdGVwIiwidGltZXN0YW1wIiwicHJvZ3Jlc3MiLCJ0cmFuc2Zvcm0iLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJ0aGlzT25lUGFydGljdWxhckZvb2QiLCJpbm5lcldpZHRoIiwicmVuZGVyU2xpZGUiLCJzbGlkZSIsImhhbmRsZVNjcm9sbE9udG8iLCJlbnRyaWVzIiwib2JzZXJ2ZXIiLCJmb3JFYWNoIiwiZW50cnkiLCJpc0ludGVyc2VjdGluZyIsInJlbW92ZSIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJyZWN0IiwibmF2Q2lyY2xlIiwiSW50ZXJzZWN0aW9uT2JzZXJ2ZXIiLCJvYnNlcnZlIl0sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtR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RSxHQUFHLEdBQUcsQ0FBeEMsR0FBNkNxRSxTQUE3QyxDQUF1RGtDLE1BQXZELGtCQUF3RXZHLEdBQUcsR0FBRyxDQUE5RTtBQUNEOztBQUVELFlBQUlxRCxRQUFRLENBQUNtRCxnQkFBVCxzQkFBd0N4RyxHQUFHLEdBQUcsQ0FBOUMsV0FBSixFQUE2RDtBQUN6RDtBQUNBcUQsa0JBQVEsQ0FDTG1ELGdCQURILHNCQUNrQ3hHLEdBQUcsR0FBRyxDQUR4QyxZQUVHb0csT0FGSCxDQUVXLFVBQUFLLElBQUksRUFBSTtBQUNmO0FBQ0FBLGdCQUFJLENBQUNwQyxTQUFMLENBQWVrQyxNQUFmLENBQXNCLFlBQXRCO0FBQ0QsV0FMSDtBQU9BN0gsWUFBRSxDQUFDZ0QsTUFBSCxzQkFBd0IxQixHQUFHLEdBQUcsQ0FBOUIsY0FDR21DLFVBREgsR0FFR0ksS0FGSCxDQUVTLFNBRlQsRUFFb0IsSUFGcEIsRUFHR0gsUUFISCxDQUdZLEdBSFo7QUFLQWlCLGtCQUFRLENBQUNtQixjQUFULGtCQUFrQ3hFLEdBQUcsR0FBRyxDQUF4QyxHQUE2Q3FFLFNBQTdDLENBQXVEa0MsTUFBdkQsa0JBQXdFdkcsR0FBRyxHQUFHLENBQTlFO0FBQ0g7QUFHRjtBQUNGLEtBckVEO0FBc0VELEdBdkVEOztBQXlFQSxNQUFJbUcsUUFBUSxHQUFHLElBQUlRLG9CQUFKLENBQXlCVixnQkFBekIsRUFBMkN2QyxPQUEzQyxDQUFmO0FBQ0F5QyxVQUFRLENBQUNTLE9BQVQsQ0FBaUJaLEtBQWpCO0FBRUQsQ0E5RU0sQzs7Ozs7Ozs7Ozs7QUNBUCx1QyIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvZGlzdC9cIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXguanNcIik7XG4iLCJpbXBvcnQgJy4vc3R5bGVzL2luZGV4LnNjc3MnO1xuaW1wb3J0ICogYXMgU2xpZGVzIGZyb20gJy4vc2NyaXB0cy9zY3JvbGwvc2xpZGVzJztcbmltcG9ydCBhZGRBbGxGbHlpbmdGb29kTGlzdGVuZXJzIGZyb20gJy4vc2NyaXB0cy9mbHlpbmdfZm9vZCc7XG5cbmxldCBudXRyaXRpb25EYXRhO1xuXG5kMy5jc3YoXCJudXRyaXRpb25fZmFjdHNfZm9yX3Njcm9sbGVyLmNzdlwiLCBkID0+IHtcbiAgcmV0dXJuIHtcbiAgICBmb29kX25hbWU6IGRbXCJGb29kIG5hbWVcIl0sXG4gICAgc2VydmluZ19zaXplOiBkW1wiQW1vdW50XCJdLFxuICAgIGZpYmVyOiArZFtcIkZpYmVyXCJdLFxuICAgIGlyb246ICtkW1wiSXJvblwiXSxcbiAgICBtYWduZXNpdW06ICtkW1wiTWFnbmVzaXVtXCJdLFxuICAgIHBvdGFzc2l1bTogK2RbXCJQb3Rhc3NpdW1cIl0sXG4gICAgemluYzogK2RbXCJaaW5jXCJdLFxuICAgIFwidml0YW1pbiBDXCI6ICtkW1wiVml0YW1pbiBDXCJdLFxuICAgIGZvbGF0ZTogK2RbXCJGb2xhdGVcIl0sXG4gICAgXCJ2aXRhbWluIEIxMlwiOiArZFtcIlZpdGFtaW4gQi0xMlwiXSxcbiAgICBcInZpdGFtaW4gQVwiOiArZFtcIlZpdGFtaW4gQVwiXSxcbiAgICBcInZpdGFtaW4gRFwiOiArZFtcIlZpdGFtaW4gRFwiXSxcbiAgICBjaG9sZXN0ZXJvbDogK2RbXCJDaG9sZXN0ZXJvbFwiXVxuICB9O1xufSkudGhlbihkYXRhID0+IHtcbiAgICBudXRyaXRpb25EYXRhID0gZGF0YTtcbiAgICBjb25zb2xlLmxvZyhudXRyaXRpb25EYXRhKTtcbiAgICBcbiAgICBjcmVhdGVWaXN1YWxpemF0aW9uKG51dHJpdGlvbkRhdGFbMF0sIDAsIHRydWUpO1xuICAgIGNyZWF0ZU5hdkxpKDApO1xuICAgIGNyZWF0ZUFuY2hvcigwKTtcbiAgICBcbiAgICBmb3IgKGxldCBpID0gMTsgaSA8IG51dHJpdGlvbkRhdGEubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNyZWF0ZVZpc3VhbGl6YXRpb24obnV0cml0aW9uRGF0YVtpXSwgaSk7XG4gICAgICBjcmVhdGVOYXZMaShpKTtcbiAgICAgIGNyZWF0ZUFuY2hvcihpKTtcbiAgICB9XG5cbn0pO1xuXG5jb25zdCBjcmVhdGVWaXN1YWxpemF0aW9uID0gKGZvb2REYXRhLCBpZHgsIGNyZWF0ZVhBeGlzQm9vbCkgPT4ge1xuICBsZXQgbWFyZ2luID0ge3RvcDogMjAsIHJpZ2h0OiA0MCwgYm90dG9tOiAyNSwgbGVmdDogNjB9XG4gIGxldCB3ID0gNjcwIC0gbWFyZ2luLmxlZnQgLSBtYXJnaW4ucmlnaHQ7XG4gIGxldCBoID0gNjAwIC0gbWFyZ2luLnRvcCAtIG1hcmdpbi5ib3R0b207XG5cbiAgbGV0IGRhdGEgPSBPYmplY3QudmFsdWVzKGZvb2REYXRhKS5zbGljZSgyLCAtMSk7XG4gIGxldCBudW1iZXJPZkNvbHVtbnMgPSAxMDtcbiAgbGV0IG1heFZhbHVlID0gTWF0aC5tYXgoLjUwLCBkMy5tYXgoZGF0YSwgZnVuY3Rpb24oZCkge1xuICAgIHJldHVybiAoK2QgLyAxMDApO1xuICB9KSk7XG4gIGxldCB4X2F4aXNMZW5ndGggPSB3O1xuICBsZXQgeV9heGlzTGVuZ3RoID0gaDtcbiAgbGV0IHRhcmdldFNWRyA9IFwic2xpZGUtc3ZnLVwiICsgaWR4O1xuICBsZXQgdGFyZ2V0U2xpZGVSZWN0ID0gXCJzbGlkZS1zdmctXCIgKyBpZHggKyBcIi1yZWN0XCI7XG5cbiAgbGV0IHhTY2FsZSA9IGQzXG4gICAgLnNjYWxlTGluZWFyKClcbiAgICAuZG9tYWluKFswLCBudW1iZXJPZkNvbHVtbnNdKVxuICAgIC5yYW5nZShbMCwgd10pO1xuXG4gIGxldCB5U2NhbGUgPSBkM1xuICAgIC5zY2FsZUxpbmVhcigpXG4gICAgLmRvbWFpbihbMCwgbWF4VmFsdWVdKVxuICAgIC5yYW5nZShbaCAtIG1hcmdpbi50b3AsIG1hcmdpbi5ib3R0b21dKTtcblxuICBsZXQgc3ZnID0gZDNcbiAgICAvLyAuc2VsZWN0KFwiI3Zpc1wiKVxuICAgIC5zZWxlY3QoYCNzdmctY29udGFpbmVyLSR7aWR4fWApXG4gICAgLmFwcGVuZChcInN2Z1wiKVxuICAgIC5hdHRyKFwiY2xhc3NcIiwgYCR7dGFyZ2V0U1ZHfSBoaWRkZW5gKVxuICAgIC5hdHRyKFwidmlld0JveFwiLCBgMCAwICR7aCArIG1hcmdpbi50b3AgKyBtYXJnaW4uYm90dG9tfSAke3cgKyBtYXJnaW4ubGVmdCArIG1hcmdpbi5yaWdodH1gKVxuICAgIC8vIC5hdHRyKFwicHJlc2VydmVBc3BlY3RSYXRpb1wiLCBcInhNaW5ZTWluIG1lZXRcIik7XG4gICAgLy8gLmF0dHIoXCJ3aWR0aFwiLCB3ICsgbWFyZ2luLmxlZnQgKyBtYXJnaW4ucmlnaHQpXG4gICAgLy8gLmF0dHIoXCJoZWlnaHRcIiwgaCArIG1hcmdpbi50b3AgKyBtYXJnaW4uYm90dG9tKTtcblxuICBsZXQgeEF4aXMgPSBkM1xuICAgIC5heGlzQm90dG9tKHhTY2FsZSlcbiAgICAudGlja1NpemUoMClcbiAgICAudGlja0Zvcm1hdChmdW5jdGlvbihkKSB7XG4gICAgICByZXR1cm4gT2JqZWN0LmtleXMoZm9vZERhdGEpLnNsaWNlKDIsIC0xKVtkXTtcbiAgICB9KTtcblxuICBpZiAoY3JlYXRlWEF4aXNCb29sICE9PSB1bmRlZmluZWQpIHtcbiAgICBzdmdcbiAgICAgIC5hcHBlbmQoXCJnXCIpXG4gICAgICAuYXR0cihcImNsYXNzXCIsIGAke3RhcmdldFNWR30teC1heGlzIHgtYXhpc2ApXG4gICAgICAuYXR0cihcbiAgICAgICAgXCJ0cmFuc2Zvcm1cIixcbiAgICAgICAgXCJ0cmFuc2xhdGUoXCIgKyBtYXJnaW4ubGVmdCArIFwiLCBcIiArIChoIC0gbWFyZ2luLnRvcCkgKyBcIilcIlxuICAgICAgKVxuICAgICAgLnRyYW5zaXRpb24oKVxuICAgICAgLmR1cmF0aW9uKDEwMDApXG4gICAgICAuY2FsbCh4QXhpcyk7XG5cbiAgICBzdmcuc2VsZWN0QWxsKFwiLngtYXhpcyB0ZXh0XCIpLmF0dHIoXCJ0cmFuc2Zvcm1cIiwgZnVuY3Rpb24oZCkge1xuICAgICAgcmV0dXJuIFwidHJhbnNsYXRlKDI1LCAyNSlyb3RhdGUoLTQ1KVwiO1xuICAgIH0pO1xuXG4gICAgc3ZnXG4gICAgICAuYXBwZW5kKFwidGV4dFwiKVxuICAgICAgLmF0dHIoXCJ0cmFuc2Zvcm1cIiwgXCJyb3RhdGUoLTkwKVwiKVxuICAgICAgLmF0dHIoXCJjbGFzc1wiLCBcInktYXhpcy1sYWJlbFwiKVxuICAgICAgLmF0dHIoXCJ5XCIsIC01KVxuICAgICAgLmF0dHIoXCJ4XCIsIDAgLSBoIC8gMilcbiAgICAgIC5hdHRyKFwiZHlcIiwgXCIxZW1cIilcbiAgICAgIC5zdHlsZShcInRleHQtYW5jaG9yXCIsIFwibWlkZGxlXCIpXG4gICAgICAudGV4dChcIlBlcmNlbnRhZ2Ugb2YgcmVjb21tZW5kZWQgZGFpbHkgYWxsb3dhbmNlKFJEQSlcIik7XG4gIH1cblxuICBsZXQgeUF4aXMgPSBkMy5heGlzTGVmdCh5U2NhbGUpLnRpY2tzKDQsIFwiJVwiKTtcblxuICBzdmdcbiAgICAuYXBwZW5kKFwiZ1wiKVxuICAgIC5hdHRyKFwiY2xhc3NcIiwgYCR7dGFyZ2V0U1ZHfS15LWF4aXMgeS1heGlzYClcbiAgICAuYXR0cihcInRyYW5zZm9ybVwiLCBcInRyYW5zbGF0ZShcIiArIG1hcmdpbi5sZWZ0ICsgXCIsMClcIilcbiAgICAuc3R5bGUoXCJvcGFjaXR5XCIsIFwiMCVcIilcbiAgICAuY2FsbCh5QXhpcyk7XG5cbiAgc3ZnXG4gICAgLnNlbGVjdEFsbChcInJlY3RcIilcbiAgICAuZGF0YShkYXRhKVxuICAgIC5lbnRlcigpXG4gICAgLmFwcGVuZChcInJlY3RcIilcbiAgICAuYXR0cihcImNsYXNzXCIsIGAke3RhcmdldFNsaWRlUmVjdH1gKVxuICAgIC5hdHRyKFwieFwiLCBmdW5jdGlvbihkLCBpKSB7XG4gICAgICByZXR1cm4gaSAqICh4X2F4aXNMZW5ndGggLyBudW1iZXJPZkNvbHVtbnMpICsgbWFyZ2luLmxlZnQgKyAxMDtcbiAgICB9KVxuICAgIC5hdHRyKFwieVwiLCBmdW5jdGlvbihkKSB7XG4gICAgICByZXR1cm4geVNjYWxlKGQgLyAxMDApO1xuICAgIH0pXG4gICAgLmF0dHIoXCJ3aWR0aFwiLCB4X2F4aXNMZW5ndGggLyBudW1iZXJPZkNvbHVtbnMgLSAxKVxuICAgIC5hdHRyKFwiaGVpZ2h0XCIsIGZ1bmN0aW9uKGQpIHtcbiAgICAgIHJldHVybiBoIC0geVNjYWxlKGQgLyAxMDApIC0gbWFyZ2luLnRvcDtcbiAgICB9KVxuICAgIC5hdHRyKFwiZmlsbFwiLCBcInJlZFwiKVxuICAgIC50cmFuc2l0aW9uKClcbiAgICAuZHVyYXRpb24oNTAwKTtcbiAgICAvLyAub24oXCJtb3VzZW92ZXJcIiwgaGFuZGxlTW91c2VvdmVyKTtcblxuXG4gICAgY29uc3QgaGFuZGxlTW91c2VvdmVyID0gKGQsIGkpID0+IHtcbiAgICAgIGQzLnNlbGVjdCh0aGlzKVxuICAgICAgICAudHJhbnNpdGlvbigpXG4gICAgICAgIC5lYXNlKFwiZWFzZVwiKVxuICAgICAgICAuZHVyYXRpb24oNTAwKVxuICAgICAgICAuYXR0cihcImZpbGxcIiwgXCJ3aGl0ZVwiKTtcbiAgICB9O1xufTtcblxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsIChlKSA9PiB7XG4gICAgXG4gICAgbGV0IHNsaWRlcyA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTk7IGkrKykge1xuICAgICAgICBsZXQgc2xpZGVOYW1lID0gXCIjc2xpZGUtY29udGFpbmVyLVwiICsgaTtcbiAgICAgICAgbGV0IG5ld1NsaWRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzbGlkZU5hbWUpO1xuICAgICAgICBzbGlkZXMucHVzaChuZXdTbGlkZSk7XG4gICAgfVxuICAgIGNyZWF0ZU9ic2VydmVycyhzbGlkZXMpO1xufSwgZmFsc2UpO1xuXG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsICgpID0+IHtcblxuICAgIGFkZEFsbEZseWluZ0Zvb2RMaXN0ZW5lcnMoKTtcblxufSlcblxuY29uc3QgY3JlYXRlT2JzZXJ2ZXJzID0gKHNsaWRlcykgPT4ge1xuICAgIFxuICAgIGxldCBvcHRpb25zID0ge1xuICAgICAgcm9vdDogbnVsbCxcbiAgICAgIHJvb3RNYXJnaW46IFwiMHB4IDBweCAwcHggMHB4XCIsXG4gICAgICB0aHJlc2hvbGQ6IC41XG4gICAgfTtcblxuICAgIGNvbnNvbGUubG9nKHNsaWRlcyk7XG4gICAgXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzbGlkZXMubGVuZ3RoIC0gMTsgaSsrKSB7XG4gICAgICBTbGlkZXMucmVuZGVyU2xpZGUob3B0aW9ucywgc2xpZGVzW2ldLCBpKTtcbiAgICB9XG5cbn1cblxuY29uc3QgY3JlYXRlTmF2TGkgPSAoaWR4KSA9PiB7XG4gIGxldCBuYXZDb2x1bW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubmF2LWNvbHVtbicpO1xuXG4gIGxldCBhbmNob3JMaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImFcIik7XG4gIGFuY2hvckxpbmsuc2V0QXR0cmlidXRlKFwiaHJlZlwiLCBgI2FuY2hvci0ke2lkeH1gKTtcbiAgbmF2Q29sdW1uLmFwcGVuZENoaWxkKGFuY2hvckxpbmspO1xuXG4gIGxldCBuYXZMaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKTtcbiAgbmF2TGkuc2V0QXR0cmlidXRlKFwiaWRcIiwgYG5hdi1saS0ke2lkeH1gKTtcbiAgbmF2TGkuY2xhc3NMaXN0LmFkZChcIm5hdi1saVwiKTtcbiAgYW5jaG9yTGluay5hcHBlbmRDaGlsZChuYXZMaSk7XG5cbn1cblxuY29uc3QgY3JlYXRlQW5jaG9yID0gKGlkeCkgPT4ge1xuICBsZXQgc2xpZGVDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgc2xpZGUtY29udGFpbmVyLSR7aWR4fWApO1xuXG4gIGxldCBhbmNob3JUYWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYVwiKTtcbiAgYW5jaG9yVGFnLnNldEF0dHJpYnV0ZShcImlkXCIsIGBhbmNob3ItJHtpZHh9YCk7XG4gIGFuY2hvclRhZy5jbGFzc0xpc3QuYWRkKFwiYW5jaG9yXCIpO1xuXG4gIHNsaWRlQ29udGFpbmVyLmFwcGVuZENoaWxkKGFuY2hvclRhZyk7XG59XG5cblxuIiwiICAgIGNvbnN0IGFkZEFsbEZseWluZ0Zvb2RMaXN0ZW5lcnMgPSAoKSA9PiB7XG5cbiAgICAgICAgbGV0IGZvb2RDb3VudGVycyA9IHt9O1xuXG4gICAgICAgIGNvbnN0IGFkZEZseWluZ0Zvb2RMaXN0ZW5lciA9IGlkeCA9PiB7XG4gICAgICAgICAgICBsZXQgZm9vZEljb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgZm9vZC1zdmctY29udGFpbmVyLSR7aWR4fWApO1xuXG4gICAgICAgICAgICBmb29kSWNvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGZvb2RDaGlsZHJlbiA9IGZvb2RJY29uLmNoaWxkTm9kZXM7XG4gICAgICAgICAgICAgICAgaWYgKGZvb2RDaGlsZHJlblszXSkge1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMzA7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBmb29kSWNvbi5yZW1vdmVDaGlsZChmb29kQ2hpbGRyZW5bM10pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBsZXQgbW92ZW1lbnRGdW5jID0gbmV3Rm9vZCA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IHN0YXJ0ID0gbnVsbDtcblxuICAgICAgICAgICAgICAgIGxldCBzaWduZWRPbmVzID0gWy0xLCAxXTtcbiAgICAgICAgICAgICAgICBsZXQgcmFuZG9tSWR4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMik7XG4gICAgICAgICAgICAgICAgbGV0IHJhbmRvbWx5U2lnbmVkT25lID0gc2lnbmVkT25lc1tyYW5kb21JZHhdO1xuXG4gICAgICAgICAgICAgICAgY29uc3Qgc3RlcCA9IHRpbWVzdGFtcCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghc3RhcnQpIHN0YXJ0ID0gdGltZXN0YW1wO1xuICAgICAgICAgICAgICAgICAgICBsZXQgcHJvZ3Jlc3MgPSB0aW1lc3RhbXAgLSBzdGFydDtcbiAgICAgICAgICAgICAgICAgICAgbmV3Rm9vZC5zdHlsZS50cmFuc2Zvcm0gPSBcInRyYW5zbGF0ZShcIiArIChwcm9ncmVzcyAqIHJhbmRvbWx5U2lnbmVkT25lKSArIFwicHgsIFwiICsgcHJvZ3Jlc3MgKyBcInB4KVwiO1xuICAgICAgICAgICAgICAgICAgICBpZiAocHJvZ3Jlc3MgPCAxNTAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoc3RlcCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShzdGVwKTtcbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IGZvb2RDb3VudGVyc1tpZHhdOyBpIDwgZm9vZENvdW50ZXJzW2lkeF0gKyAzMDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgbGV0IG5ld0Zvb2QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICAgICAgICAgIG5ld0Zvb2Quc2V0QXR0cmlidXRlKFwiaWRcIiwgYGZseWluZy1mb29kLW9mLXR5cGUtJHtpZHh9LSR7aX1gKTtcbiAgICAgICAgICAgICAgICBuZXdGb29kLmNsYXNzTGlzdC5hZGQoYGZseWluZy1mb29kLSR7aWR4fWApO1xuICAgICAgICAgICAgICAgIG5ld0Zvb2QuY2xhc3NMaXN0LmFkZChgZmx5aW5nLWZvb2RgKTtcbiAgICAgICAgICAgICAgICBmb29kSWNvbi5hcHBlbmRDaGlsZChuZXdGb29kKTtcblxuICAgICAgICAgICAgICAgIGxldCB0aGlzT25lUGFydGljdWxhckZvb2QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcbiAgICAgICAgICAgICAgICAgICAgYGZseWluZy1mb29kLW9mLXR5cGUtJHtpZHh9LSR7aX1gXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB0aGlzT25lUGFydGljdWxhckZvb2Quc3R5bGUudG9wID0gTWF0aC5yYW5kb20oKSAqIC03MDAgKyBcInB4XCI7XG4gICAgICAgICAgICAgICAgdGhpc09uZVBhcnRpY3VsYXJGb29kLnN0eWxlLmxlZnQgPVxuICAgICAgICAgICAgICAgICAgICBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiB3aW5kb3cuaW5uZXJXaWR0aCkgKyBcInB4XCI7XG5cbiAgICAgICAgICAgICAgICBtb3ZlbWVudEZ1bmModGhpc09uZVBhcnRpY3VsYXJGb29kKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBmb29kQ291bnRlcnNbaWR4XSArPSAxMDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTg7IGkrKykge1xuICAgICAgICAgICAgZm9vZENvdW50ZXJzW2ldID0gMDtcbiAgICAgICAgICAgIGFkZEZseWluZ0Zvb2RMaXN0ZW5lcihpKTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgZXhwb3J0IGRlZmF1bHQgYWRkQWxsRmx5aW5nRm9vZExpc3RlbmVyczsiLCJleHBvcnQgY29uc3QgcmVuZGVyU2xpZGUgPSAob3B0aW9ucywgc2xpZGUsIGlkeCkgPT4ge1xuXG4gIGNvbnN0IGhhbmRsZVNjcm9sbE9udG8gPSAoZW50cmllcywgb2JzZXJ2ZXIpID0+IHtcbiAgICBlbnRyaWVzLmZvckVhY2goZW50cnkgPT4ge1xuICAgICAgaWYgKGVudHJ5LmlzSW50ZXJzZWN0aW5nKSB7XG5cbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLnNsaWRlLXN2Zy0ke2lkeH1gKVxuICAgICAgICAgIC5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZGVuXCIpO1xuXG4gICAgICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuc2xpZGUtc3ZnLSR7aWR4IC0gMX1gKSkge1xuICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC5zbGlkZS1zdmctJHtpZHggLSAxfWApXG4gICAgICAgICAgLmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLnNsaWRlLXN2Zy0ke2lkeCArIDF9YCkpIHtcbiAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuc2xpZGUtc3ZnLSR7aWR4ICsgMX1gKVxuICAgICAgICAgIC5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgLnNsaWRlLXN2Zy0ke2lkeH0tcmVjdGApLmZvckVhY2gocmVjdCA9PiB7XG4gICAgICAgICAgLy8gcmVjdC5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZGVuXCIpO1xuICAgICAgICAgIHJlY3QuY2xhc3NMaXN0LmFkZChcImNoYXJ0LXJlY3RcIik7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGQzLnNlbGVjdChgLnNsaWRlLXN2Zy0ke2lkeH0teS1heGlzYClcbiAgICAgICAgICAudHJhbnNpdGlvbigpXG4gICAgICAgICAgLnN0eWxlKFwib3BhY2l0eVwiLCBcIjEwMCVcIilcbiAgICAgICAgICAuZHVyYXRpb24oNTAwKTtcblxuICAgICAgICBsZXQgbmF2Q2lyY2xlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYG5hdi1saS0ke2lkeH1gKTtcbiAgICAgICAgbmF2Q2lyY2xlLmNsYXNzTGlzdC5hZGQoYG5hdi1saS0ke2lkeH1gKTtcblxuXG5cbiAgICAgICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYC5zbGlkZS1zdmctJHtpZHggLSAxfS1yZWN0YCkpIHtcbiAgICAgICAgICAgIGRvY3VtZW50XG4gICAgICAgICAgICAgIC5xdWVyeVNlbGVjdG9yQWxsKGAuc2xpZGUtc3ZnLSR7aWR4IC0gMX0tcmVjdGApXG4gICAgICAgICAgICAgIC5mb3JFYWNoKHJlY3QgPT4ge1xuICAgICAgICAgICAgICAgIC8vIHJlY3QuY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcbiAgICAgICAgICAgICAgICByZWN0LmNsYXNzTGlzdC5yZW1vdmUoXCJjaGFydC1yZWN0XCIpO1xuICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgZDMuc2VsZWN0KGAuc2xpZGUtc3ZnLSR7aWR4IC0gMX0teS1heGlzYClcbiAgICAgICAgICAgICAgLnRyYW5zaXRpb24oKVxuICAgICAgICAgICAgICAuc3R5bGUoXCJvcGFjaXR5XCIsIFwiMCVcIilcbiAgICAgICAgICAgICAgLmR1cmF0aW9uKDUwMCk7XG4gICAgICAgICAgICBcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgbmF2LWxpLSR7aWR4IC0gMX1gKSkge1xuICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBuYXYtbGktJHtpZHggLSAxfWApLmNsYXNzTGlzdC5yZW1vdmUoYG5hdi1saS0ke2lkeCAtIDF9YCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgLnNsaWRlLXN2Zy0ke2lkeCArIDF9LXJlY3RgKSkge1xuICAgICAgICAgICAgLy8gZGVidWdnZXI7XG4gICAgICAgICAgICBkb2N1bWVudFxuICAgICAgICAgICAgICAucXVlcnlTZWxlY3RvckFsbChgLnNsaWRlLXN2Zy0ke2lkeCArIDF9LXJlY3RgKVxuICAgICAgICAgICAgICAuZm9yRWFjaChyZWN0ID0+IHtcbiAgICAgICAgICAgICAgICAvLyByZWN0LmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XG4gICAgICAgICAgICAgICAgcmVjdC5jbGFzc0xpc3QucmVtb3ZlKFwiY2hhcnQtcmVjdFwiKTtcbiAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGQzLnNlbGVjdChgLnNsaWRlLXN2Zy0ke2lkeCArIDF9LXktYXhpc2ApXG4gICAgICAgICAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgICAgICAgICAgLnN0eWxlKFwib3BhY2l0eVwiLCBcIjAlXCIpXG4gICAgICAgICAgICAgIC5kdXJhdGlvbig1MDApO1xuXG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgbmF2LWxpLSR7aWR4ICsgMX1gKS5jbGFzc0xpc3QucmVtb3ZlKGBuYXYtbGktJHtpZHggKyAxfWApOyAgICAgICAgICAgICAgXG4gICAgICAgIH1cblxuICAgICAgICAgIFxuICAgICAgfVxuICAgIH0pO1xuICB9O1xuXG4gIGxldCBvYnNlcnZlciA9IG5ldyBJbnRlcnNlY3Rpb25PYnNlcnZlcihoYW5kbGVTY3JvbGxPbnRvLCBvcHRpb25zKTtcbiAgb2JzZXJ2ZXIub2JzZXJ2ZShzbGlkZSk7XG5cbn0iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW4iXSwic291cmNlUm9vdCI6IiJ9