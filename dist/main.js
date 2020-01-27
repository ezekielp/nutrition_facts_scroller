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
  var w = 600 - margin.left - margin.right;
  var h = 475 - margin.top - margin.bottom;
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
  var svg = d3.select("#vis") // .select(`#svg-container-${idx}`)
  .append("svg").attr("class", "".concat(targetSVG, " hidden")).attr("viewBox", "0 0 650 700").attr("preserveAspectRatio", "xMinYMin meet"); // .attr("width", w + margin.left + margin.right)
  // .attr("height", h + margin.top + margin.bottom);

  var xAxis = d3.axisBottom(xScale).tickSize(0).tickFormat(function (d) {
    return Object.keys(foodData).slice(2, -1)[d];
  });
  svg.append("g").attr("class", "".concat(targetSVG, "-x-axis x-axis")).attr("transform", "translate(" + margin.left + ", " + (h - margin.top) + ")").transition().duration(1000).call(xAxis);
  svg.selectAll(".x-axis text").attr("transform", function (d) {
    return "translate(10, 25)rotate(-45)";
  });
  svg.append("text").attr("transform", "rotate(-90)").attr("class", "y-axis-label").attr("y", 0).attr("x", 0 - h / 2).attr("dy", "1em").style("text-anchor", "middle").text("Percentage of recommended daily allowance(RDA)");
  svg.append("text").attr("class", "source-text").attr("transform", "translate(35, " + (h + margin.top + 40) + ")").style("text-anchor", "left").text("Source: USDA");
  var yAxis = d3.axisLeft(yScale).ticks(4, "%");
  svg.append("g").attr("class", "".concat(targetSVG, "-y-axis y-axis")).attr("transform", "translate(" + margin.left + ",0)").style("opacity", "0%").call(yAxis);
  svg.selectAll("rect").data(data).enter().append("rect").attr("class", "".concat(targetSlideRect)).attr("x", function (d, i) {
    return i * (x_axisLength / numberOfColumns) + margin.left + 10;
  }).attr("y", function (d) {
    return yScale(d / 100);
  }).attr("width", x_axisLength / numberOfColumns - 1).attr("height", function (d) {
    return h - yScale(d / 100) - margin.top;
  }).transition().duration(500);
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
  var flyingFoodIds = [0, 1, 2, 3, 4, 6, 7, 9, 11, 12, 13, 14, 16, 17];
  flyingFoodIds.forEach(function (id) {
    document.getElementById("food-svg-container-".concat(id)).addEventListener("mouseover", function () {
      document.getElementById("click-bubble-".concat(id)).classList.add("show");
    });
    document.getElementById("food-svg-container-".concat(id)).addEventListener("mouseout", function () {
      document.getElementById("click-bubble-".concat(id)).classList.remove("show");
    });
  });
});

var createObservers = function createObservers(slides) {
  var options = {
    root: null,
    rootMargin: "0px 0px 0px 0px",
    threshold: .5
  };

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
      window.setTimeout(function () {
        if (foodChildren[3]) {
          for (var i = 0; i < 30; i++) {
            foodIcon.removeChild(foodChildren[3]);
          }
        }
      }, 3000);

      var movementFunc = function movementFunc(newFood) {
        var start = null;
        var signedOnes = [-1, 1];
        var randomIdx = Math.floor(Math.random() * 2);
        var randomlySignedOne = signedOnes[randomIdx];

        var step = function step(timestamp) {
          if (!start) start = timestamp;
          var progress = timestamp - start;
          newFood.style.transform = "translate(" + progress * randomlySignedOne + "px, " + progress + "px)";

          if (progress < 2500) {
            window.requestAnimationFrame(step);
          }
        };

        window.requestAnimationFrame(step);
      };

      for (var i = foodCounters[idx]; i < foodCounters[idx] + 30; i++) {
        var newFood = document.createElement("div");
        newFood.setAttribute("id", "flying-food-of-type-".concat(idx, "-").concat(i));
        newFood.classList.add("flying-food-".concat(idx));
        newFood.classList.add("flying-food");
        foodIcon.appendChild(newFood);
        var thisOneParticularFood = document.getElementById("flying-food-of-type-".concat(idx, "-").concat(i));
        thisOneParticularFood.style.top = Math.random() * -300 + window.scrollY + "px";
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
        var currentSVG = d3.select(".slide-svg-".concat(idx));
        var tooltip = d3.select("body").append("div").style("position", "absolute").style("font-size", "12px").style("z-index", "10").style("visibility", "hidden");
        var nutrients = ["fiber", "iron", "magnesium", "potassium", "zinc", "vitamin C", "folate", "vitamin B12", "vitamin A", "vitamin D"];
        currentSVG.selectAll("rect").on("mouseover", function (d) {
          return tooltip.style("visibility", "visible");
        }).on("mousemove", function (d, i) {
          return tooltip.style("top", event.pageY - 60 + "px").style("left", event.pageX - 30 + "px").style("background-color", "white").style("border", "2px solid black").style("padding", "5px").style("border-radius", "3px").text("".concat(nutrients[i], ": ").concat(d, "%"));
        }).on("mouseout", function (d) {
          return tooltip.style("visibility", "hidden");
        });

        if (document.querySelector(".slide-svg-".concat(idx - 1))) {
          document.querySelector(".slide-svg-".concat(idx - 1)).classList.add("hidden");
        }

        if (document.querySelector(".slide-svg-".concat(idx + 1))) {
          document.querySelector(".slide-svg-".concat(idx + 1)).classList.add("hidden");
        }

        document.querySelectorAll(".slide-svg-".concat(idx, "-rect")).forEach(function (rect) {
          rect.classList.add("chart-rect");
        });
        d3.select(".slide-svg-".concat(idx, "-y-axis")).transition().style("opacity", "100%").duration(500);
        var navCircle = document.getElementById("nav-li-".concat(idx));
        navCircle.classList.add("nav-li-".concat(idx));

        if (document.querySelectorAll(".slide-svg-".concat(idx - 1, "-rect"))) {
          document.querySelectorAll(".slide-svg-".concat(idx - 1, "-rect")).forEach(function (rect) {
            rect.classList.remove("chart-rect");
          });
          d3.select(".slide-svg-".concat(idx - 1, "-y-axis")).transition().style("opacity", "0%").duration(500);
        }

        if (document.getElementById("nav-li-".concat(idx - 1))) {
          document.getElementById("nav-li-".concat(idx - 1)).classList.remove("nav-li-".concat(idx - 1));
        }

        if (document.querySelectorAll(".slide-svg-".concat(idx + 1, "-rect"))) {
          document.querySelectorAll(".slide-svg-".concat(idx + 1, "-rect")).forEach(function (rect) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL2ZseWluZ19mb29kLmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL3Njcm9sbC9zbGlkZXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0eWxlcy9pbmRleC5zY3NzP2M4MDciXSwibmFtZXMiOlsibnV0cml0aW9uRGF0YSIsImQzIiwiY3N2IiwiZCIsImZvb2RfbmFtZSIsInNlcnZpbmdfc2l6ZSIsImZpYmVyIiwiaXJvbiIsIm1hZ25lc2l1bSIsInBvdGFzc2l1bSIsInppbmMiLCJmb2xhdGUiLCJjaG9sZXN0ZXJvbCIsInRoZW4iLCJkYXRhIiwiY3JlYXRlVmlzdWFsaXphdGlvbiIsImNyZWF0ZU5hdkxpIiwiY3JlYXRlQW5jaG9yIiwiaSIsImxlbmd0aCIsImZvb2REYXRhIiwiaWR4IiwiY3JlYXRlWEF4aXNCb29sIiwibWFyZ2luIiwidG9wIiwicmlnaHQiLCJib3R0b20iLCJsZWZ0IiwidyIsImgiLCJPYmplY3QiLCJ2YWx1ZXMiLCJzbGljZSIsIm51bWJlck9mQ29sdW1ucyIsIm1heFZhbHVlIiwiTWF0aCIsIm1heCIsInhfYXhpc0xlbmd0aCIsInlfYXhpc0xlbmd0aCIsInRhcmdldFNWRyIsInRhcmdldFNsaWRlUmVjdCIsInhTY2FsZSIsInNjYWxlTGluZWFyIiwiZG9tYWluIiwicmFuZ2UiLCJ5U2NhbGUiLCJzdmciLCJzZWxlY3QiLCJhcHBlbmQiLCJhdHRyIiwieEF4aXMiLCJheGlzQm90dG9tIiwidGlja1NpemUiLCJ0aWNrRm9ybWF0Iiwia2V5cyIsInRyYW5zaXRpb24iLCJkdXJhdGlvbiIsImNhbGwiLCJzZWxlY3RBbGwiLCJzdHlsZSIsInRleHQiLCJ5QXhpcyIsImF4aXNMZWZ0IiwidGlja3MiLCJlbnRlciIsIndpbmRvdyIsImFkZEV2ZW50TGlzdGVuZXIiLCJlIiwic2xpZGVzIiwic2xpZGVOYW1lIiwibmV3U2xpZGUiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJwdXNoIiwiY3JlYXRlT2JzZXJ2ZXJzIiwiYWRkQWxsRmx5aW5nRm9vZExpc3RlbmVycyIsImZseWluZ0Zvb2RJZHMiLCJmb3JFYWNoIiwiaWQiLCJnZXRFbGVtZW50QnlJZCIsImNsYXNzTGlzdCIsImFkZCIsInJlbW92ZSIsIm9wdGlvbnMiLCJyb290Iiwicm9vdE1hcmdpbiIsInRocmVzaG9sZCIsIlNsaWRlcyIsIm5hdkNvbHVtbiIsImFuY2hvckxpbmsiLCJjcmVhdGVFbGVtZW50Iiwic2V0QXR0cmlidXRlIiwiYXBwZW5kQ2hpbGQiLCJuYXZMaSIsInNsaWRlQ29udGFpbmVyIiwiYW5jaG9yVGFnIiwiZm9vZENvdW50ZXJzIiwiYWRkRmx5aW5nRm9vZExpc3RlbmVyIiwiZm9vZEljb24iLCJmb29kQ2hpbGRyZW4iLCJjaGlsZE5vZGVzIiwic2V0VGltZW91dCIsInJlbW92ZUNoaWxkIiwibW92ZW1lbnRGdW5jIiwibmV3Rm9vZCIsInN0YXJ0Iiwic2lnbmVkT25lcyIsInJhbmRvbUlkeCIsImZsb29yIiwicmFuZG9tIiwicmFuZG9tbHlTaWduZWRPbmUiLCJzdGVwIiwidGltZXN0YW1wIiwicHJvZ3Jlc3MiLCJ0cmFuc2Zvcm0iLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJ0aGlzT25lUGFydGljdWxhckZvb2QiLCJzY3JvbGxZIiwiaW5uZXJXaWR0aCIsInJlbmRlclNsaWRlIiwic2xpZGUiLCJoYW5kbGVTY3JvbGxPbnRvIiwiZW50cmllcyIsIm9ic2VydmVyIiwiZW50cnkiLCJpc0ludGVyc2VjdGluZyIsImN1cnJlbnRTVkciLCJ0b29sdGlwIiwibnV0cmllbnRzIiwib24iLCJldmVudCIsInBhZ2VZIiwicGFnZVgiLCJxdWVyeVNlbGVjdG9yQWxsIiwicmVjdCIsIm5hdkNpcmNsZSIsIkludGVyc2VjdGlvbk9ic2VydmVyIiwib2JzZXJ2ZSJdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FB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V0FKSDtBQU1BakYsWUFBRSxDQUFDOEMsTUFBSCxzQkFBd0IxQixHQUFHLEdBQUcsQ0FBOUIsY0FDR2tDLFVBREgsR0FFR0ksS0FGSCxDQUVTLFNBRlQsRUFFb0IsSUFGcEIsRUFHR0gsUUFISCxDQUdZLEdBSFo7QUFLQWUsa0JBQVEsQ0FBQ1EsY0FBVCxrQkFBa0MxRCxHQUFHLEdBQUcsQ0FBeEMsR0FBNkMyRCxTQUE3QyxDQUF1REUsTUFBdkQsa0JBQXdFN0QsR0FBRyxHQUFHLENBQTlFO0FBQ0g7QUFHRjtBQUNGLEtBaEdEO0FBaUdELEdBbEdEOztBQW9HQSxNQUFJc0csUUFBUSxHQUFHLElBQUlhLG9CQUFKLENBQXlCZixnQkFBekIsRUFBMkN0QyxPQUEzQyxDQUFmO0FBQ0F3QyxVQUFRLENBQUNjLE9BQVQsQ0FBaUJqQixLQUFqQjtBQUVELENBekdNLEM7Ozs7Ozs7Ozs7O0FDQVAsdUMiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL2Rpc3QvXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LmpzXCIpO1xuIiwiaW1wb3J0ICcuL3N0eWxlcy9pbmRleC5zY3NzJztcbmltcG9ydCAqIGFzIFNsaWRlcyBmcm9tICcuL3NjcmlwdHMvc2Nyb2xsL3NsaWRlcyc7XG5pbXBvcnQgYWRkQWxsRmx5aW5nRm9vZExpc3RlbmVycyBmcm9tICcuL3NjcmlwdHMvZmx5aW5nX2Zvb2QnO1xuXG5sZXQgbnV0cml0aW9uRGF0YTtcblxuZDMuY3N2KFwibnV0cml0aW9uX2ZhY3RzX2Zvcl9zY3JvbGxlci5jc3ZcIiwgZCA9PiB7XG4gIHJldHVybiB7XG4gICAgZm9vZF9uYW1lOiBkW1wiRm9vZCBuYW1lXCJdLFxuICAgIHNlcnZpbmdfc2l6ZTogZFtcIkFtb3VudFwiXSxcbiAgICBmaWJlcjogK2RbXCJGaWJlclwiXSxcbiAgICBpcm9uOiArZFtcIklyb25cIl0sXG4gICAgbWFnbmVzaXVtOiArZFtcIk1hZ25lc2l1bVwiXSxcbiAgICBwb3Rhc3NpdW06ICtkW1wiUG90YXNzaXVtXCJdLFxuICAgIHppbmM6ICtkW1wiWmluY1wiXSxcbiAgICBcInZpdGFtaW4gQ1wiOiArZFtcIlZpdGFtaW4gQ1wiXSxcbiAgICBmb2xhdGU6ICtkW1wiRm9sYXRlXCJdLFxuICAgIFwidml0YW1pbiBCMTJcIjogK2RbXCJWaXRhbWluIEItMTJcIl0sXG4gICAgXCJ2aXRhbWluIEFcIjogK2RbXCJWaXRhbWluIEFcIl0sXG4gICAgXCJ2aXRhbWluIERcIjogK2RbXCJWaXRhbWluIERcIl0sXG4gICAgY2hvbGVzdGVyb2w6ICtkW1wiQ2hvbGVzdGVyb2xcIl1cbiAgfTtcbn0pLnRoZW4oZGF0YSA9PiB7XG4gICAgbnV0cml0aW9uRGF0YSA9IGRhdGE7XG4gICAgXG4gICAgY3JlYXRlVmlzdWFsaXphdGlvbihudXRyaXRpb25EYXRhWzBdLCAwLCB0cnVlKTtcbiAgICBjcmVhdGVOYXZMaSgwKTtcbiAgICBjcmVhdGVBbmNob3IoMCk7XG4gICAgXG4gICAgZm9yIChsZXQgaSA9IDE7IGkgPCBudXRyaXRpb25EYXRhLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjcmVhdGVWaXN1YWxpemF0aW9uKG51dHJpdGlvbkRhdGFbaV0sIGkpO1xuICAgICAgY3JlYXRlTmF2TGkoaSk7XG4gICAgICBjcmVhdGVBbmNob3IoaSk7XG4gICAgfVxuXG59KTtcblxuY29uc3QgY3JlYXRlVmlzdWFsaXphdGlvbiA9IChmb29kRGF0YSwgaWR4LCBjcmVhdGVYQXhpc0Jvb2wpID0+IHtcbiAgbGV0IG1hcmdpbiA9IHt0b3A6IDIwLCByaWdodDogNDAsIGJvdHRvbTogMjUsIGxlZnQ6IDYwfVxuICBsZXQgdyA9IDYwMCAtIG1hcmdpbi5sZWZ0IC0gbWFyZ2luLnJpZ2h0O1xuICBsZXQgaCA9IDQ3NSAtIG1hcmdpbi50b3AgLSBtYXJnaW4uYm90dG9tO1xuXG4gIGxldCBkYXRhID0gT2JqZWN0LnZhbHVlcyhmb29kRGF0YSkuc2xpY2UoMiwgLTEpO1xuICBsZXQgbnVtYmVyT2ZDb2x1bW5zID0gMTA7XG4gIGxldCBtYXhWYWx1ZSA9IE1hdGgubWF4KC41MCwgZDMubWF4KGRhdGEsIGZ1bmN0aW9uKGQpIHtcbiAgICByZXR1cm4gKCtkIC8gMTAwKTtcbiAgfSkpO1xuICBsZXQgeF9heGlzTGVuZ3RoID0gdztcbiAgbGV0IHlfYXhpc0xlbmd0aCA9IGg7XG4gIGxldCB0YXJnZXRTVkcgPSBcInNsaWRlLXN2Zy1cIiArIGlkeDtcbiAgbGV0IHRhcmdldFNsaWRlUmVjdCA9IFwic2xpZGUtc3ZnLVwiICsgaWR4ICsgXCItcmVjdFwiO1xuXG4gIGxldCB4U2NhbGUgPSBkM1xuICAgIC5zY2FsZUxpbmVhcigpXG4gICAgLmRvbWFpbihbMCwgbnVtYmVyT2ZDb2x1bW5zXSlcbiAgICAucmFuZ2UoWzAsIHddKTtcblxuICBsZXQgeVNjYWxlID0gZDNcbiAgICAuc2NhbGVMaW5lYXIoKVxuICAgIC5kb21haW4oWzAsIG1heFZhbHVlXSlcbiAgICAucmFuZ2UoW2ggLSBtYXJnaW4udG9wLCBtYXJnaW4uYm90dG9tXSk7XG5cbiAgbGV0IHN2ZyA9IGQzXG4gICAgLnNlbGVjdChcIiN2aXNcIilcbiAgICAvLyAuc2VsZWN0KGAjc3ZnLWNvbnRhaW5lci0ke2lkeH1gKVxuICAgIC5hcHBlbmQoXCJzdmdcIilcbiAgICAuYXR0cihcImNsYXNzXCIsIGAke3RhcmdldFNWR30gaGlkZGVuYClcbiAgICAuYXR0cihcInZpZXdCb3hcIiwgYDAgMCA2NTAgNzAwYClcbiAgICAuYXR0cihcInByZXNlcnZlQXNwZWN0UmF0aW9cIiwgXCJ4TWluWU1pbiBtZWV0XCIpO1xuICAgIC8vIC5hdHRyKFwid2lkdGhcIiwgdyArIG1hcmdpbi5sZWZ0ICsgbWFyZ2luLnJpZ2h0KVxuICAgIC8vIC5hdHRyKFwiaGVpZ2h0XCIsIGggKyBtYXJnaW4udG9wICsgbWFyZ2luLmJvdHRvbSk7XG5cbiAgbGV0IHhBeGlzID0gZDNcbiAgICAuYXhpc0JvdHRvbSh4U2NhbGUpXG4gICAgLnRpY2tTaXplKDApXG4gICAgLnRpY2tGb3JtYXQoZnVuY3Rpb24oZCkge1xuICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKGZvb2REYXRhKS5zbGljZSgyLCAtMSlbZF07XG4gICAgfSk7XG5cbiAgICBzdmdcbiAgICAgIC5hcHBlbmQoXCJnXCIpXG4gICAgICAuYXR0cihcImNsYXNzXCIsIGAke3RhcmdldFNWR30teC1heGlzIHgtYXhpc2ApXG4gICAgICAuYXR0cihcbiAgICAgICAgXCJ0cmFuc2Zvcm1cIixcbiAgICAgICAgXCJ0cmFuc2xhdGUoXCIgKyBtYXJnaW4ubGVmdCArIFwiLCBcIiArIChoIC0gbWFyZ2luLnRvcCkgKyBcIilcIlxuICAgICAgKVxuICAgICAgLnRyYW5zaXRpb24oKVxuICAgICAgLmR1cmF0aW9uKDEwMDApXG4gICAgICAuY2FsbCh4QXhpcyk7XG5cbiAgICBzdmcuc2VsZWN0QWxsKFwiLngtYXhpcyB0ZXh0XCIpLmF0dHIoXCJ0cmFuc2Zvcm1cIiwgZnVuY3Rpb24oZCkge1xuICAgICAgcmV0dXJuIFwidHJhbnNsYXRlKDEwLCAyNSlyb3RhdGUoLTQ1KVwiO1xuICAgIH0pO1xuXG4gICAgc3ZnXG4gICAgICAuYXBwZW5kKFwidGV4dFwiKVxuICAgICAgLmF0dHIoXCJ0cmFuc2Zvcm1cIiwgXCJyb3RhdGUoLTkwKVwiKVxuICAgICAgLmF0dHIoXCJjbGFzc1wiLCBcInktYXhpcy1sYWJlbFwiKVxuICAgICAgLmF0dHIoXCJ5XCIsIDApXG4gICAgICAuYXR0cihcInhcIiwgMCAtIGggLyAyKVxuICAgICAgLmF0dHIoXCJkeVwiLCBcIjFlbVwiKVxuICAgICAgLnN0eWxlKFwidGV4dC1hbmNob3JcIiwgXCJtaWRkbGVcIilcbiAgICAgIC50ZXh0KFwiUGVyY2VudGFnZSBvZiByZWNvbW1lbmRlZCBkYWlseSBhbGxvd2FuY2UoUkRBKVwiKTtcblxuICAgIHN2Z1xuICAgICAgLmFwcGVuZChcInRleHRcIilcbiAgICAgIC5hdHRyKFwiY2xhc3NcIiwgXCJzb3VyY2UtdGV4dFwiKVxuICAgICAgLmF0dHIoXCJ0cmFuc2Zvcm1cIixcbiAgICAgICAgXCJ0cmFuc2xhdGUoMzUsIFwiICtcbiAgICAgICAgKGggKyBtYXJnaW4udG9wICsgNDApICsgXCIpXCIpXG4gICAgICAuc3R5bGUoXCJ0ZXh0LWFuY2hvclwiLCBcImxlZnRcIilcbiAgICAgIC50ZXh0KFwiU291cmNlOiBVU0RBXCIpO1xuXG4gIGxldCB5QXhpcyA9IGQzLmF4aXNMZWZ0KHlTY2FsZSkudGlja3MoNCwgXCIlXCIpO1xuXG4gIHN2Z1xuICAgIC5hcHBlbmQoXCJnXCIpXG4gICAgLmF0dHIoXCJjbGFzc1wiLCBgJHt0YXJnZXRTVkd9LXktYXhpcyB5LWF4aXNgKVxuICAgIC5hdHRyKFwidHJhbnNmb3JtXCIsIFwidHJhbnNsYXRlKFwiICsgbWFyZ2luLmxlZnQgKyBcIiwwKVwiKVxuICAgIC5zdHlsZShcIm9wYWNpdHlcIiwgXCIwJVwiKVxuICAgIC5jYWxsKHlBeGlzKTtcbiAgICAgICAgXG4gIHN2Z1xuICAgIC5zZWxlY3RBbGwoXCJyZWN0XCIpXG4gICAgLmRhdGEoZGF0YSlcbiAgICAuZW50ZXIoKVxuICAgIC5hcHBlbmQoXCJyZWN0XCIpXG4gICAgLmF0dHIoXCJjbGFzc1wiLCBgJHt0YXJnZXRTbGlkZVJlY3R9YClcbiAgICAuYXR0cihcInhcIiwgZnVuY3Rpb24oZCwgaSkge1xuICAgICAgcmV0dXJuIGkgKiAoeF9heGlzTGVuZ3RoIC8gbnVtYmVyT2ZDb2x1bW5zKSArIG1hcmdpbi5sZWZ0ICsgMTA7XG4gICAgfSlcbiAgICAuYXR0cihcInlcIiwgZnVuY3Rpb24oZCkge1xuICAgICAgcmV0dXJuIHlTY2FsZShkIC8gMTAwKTtcbiAgICB9KVxuICAgIC5hdHRyKFwid2lkdGhcIiwgeF9heGlzTGVuZ3RoIC8gbnVtYmVyT2ZDb2x1bW5zIC0gMSlcbiAgICAuYXR0cihcImhlaWdodFwiLCBmdW5jdGlvbihkKSB7XG4gICAgICByZXR1cm4gaCAtIHlTY2FsZShkIC8gMTAwKSAtIG1hcmdpbi50b3A7XG4gICAgfSlcbiAgICAudHJhbnNpdGlvbigpXG4gICAgLmR1cmF0aW9uKDUwMCk7XG5cbn07XG5cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLCAoZSkgPT4ge1xuICAgIFxuICAgIGxldCBzbGlkZXMgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDE5OyBpKyspIHtcbiAgICAgICAgbGV0IHNsaWRlTmFtZSA9IFwiI3NsaWRlLWNvbnRhaW5lci1cIiArIGk7XG4gICAgICAgIGxldCBuZXdTbGlkZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2xpZGVOYW1lKTtcbiAgICAgICAgc2xpZGVzLnB1c2gobmV3U2xpZGUpO1xuICAgIH1cbiAgICBjcmVhdGVPYnNlcnZlcnMoc2xpZGVzKTtcbn0sIGZhbHNlKTtcblxuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCAoKSA9PiB7XG5cbiAgICBhZGRBbGxGbHlpbmdGb29kTGlzdGVuZXJzKCk7XG5cbiAgICBjb25zdCBmbHlpbmdGb29kSWRzID0gWzAsIDEsIDIsIDMsIDQsIDYsIDcsIDksIDExLCAxMiwgMTMsIDE0LCAxNiwgMTddO1xuXG4gICAgZmx5aW5nRm9vZElkcy5mb3JFYWNoKGlkID0+IHtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBmb29kLXN2Zy1jb250YWluZXItJHtpZH1gKS5hZGRFdmVudExpc3RlbmVyKFwibW91c2VvdmVyXCIsICgpID0+IHtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYGNsaWNrLWJ1YmJsZS0ke2lkfWApLmNsYXNzTGlzdC5hZGQoXCJzaG93XCIpO1xuICAgICAgfSlcblxuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYGZvb2Qtc3ZnLWNvbnRhaW5lci0ke2lkfWApLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW91dFwiLCAoKSA9PiB7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBjbGljay1idWJibGUtJHtpZH1gKS5jbGFzc0xpc3QucmVtb3ZlKFwic2hvd1wiKTtcbiAgICAgIH0pXG5cbiAgICB9KVxuXG59KVxuXG5jb25zdCBjcmVhdGVPYnNlcnZlcnMgPSAoc2xpZGVzKSA9PiB7XG4gICAgXG4gICAgbGV0IG9wdGlvbnMgPSB7XG4gICAgICByb290OiBudWxsLFxuICAgICAgcm9vdE1hcmdpbjogXCIwcHggMHB4IDBweCAwcHhcIixcbiAgICAgIHRocmVzaG9sZDogLjVcbiAgICB9O1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzbGlkZXMubGVuZ3RoIC0gMTsgaSsrKSB7XG4gICAgICBTbGlkZXMucmVuZGVyU2xpZGUob3B0aW9ucywgc2xpZGVzW2ldLCBpKTtcbiAgICB9XG5cbn1cblxuY29uc3QgY3JlYXRlTmF2TGkgPSAoaWR4KSA9PiB7XG4gIGxldCBuYXZDb2x1bW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubmF2LWNvbHVtbicpO1xuXG4gIGxldCBhbmNob3JMaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImFcIik7XG4gIGFuY2hvckxpbmsuc2V0QXR0cmlidXRlKFwiaHJlZlwiLCBgI2FuY2hvci0ke2lkeH1gKTtcbiAgbmF2Q29sdW1uLmFwcGVuZENoaWxkKGFuY2hvckxpbmspO1xuXG4gIGxldCBuYXZMaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKTtcbiAgbmF2TGkuc2V0QXR0cmlidXRlKFwiaWRcIiwgYG5hdi1saS0ke2lkeH1gKTtcbiAgbmF2TGkuY2xhc3NMaXN0LmFkZChcIm5hdi1saVwiKTtcbiAgYW5jaG9yTGluay5hcHBlbmRDaGlsZChuYXZMaSk7XG5cbn1cblxuY29uc3QgY3JlYXRlQW5jaG9yID0gKGlkeCkgPT4ge1xuICBsZXQgc2xpZGVDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgc2xpZGUtY29udGFpbmVyLSR7aWR4fWApO1xuXG4gIGxldCBhbmNob3JUYWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYVwiKTtcbiAgYW5jaG9yVGFnLnNldEF0dHJpYnV0ZShcImlkXCIsIGBhbmNob3ItJHtpZHh9YCk7XG4gIGFuY2hvclRhZy5jbGFzc0xpc3QuYWRkKFwiYW5jaG9yXCIpO1xuXG4gIHNsaWRlQ29udGFpbmVyLmFwcGVuZENoaWxkKGFuY2hvclRhZyk7XG59XG5cblxuIiwiICAgIGNvbnN0IGFkZEFsbEZseWluZ0Zvb2RMaXN0ZW5lcnMgPSAoKSA9PiB7XG5cbiAgICAgICAgbGV0IGZvb2RDb3VudGVycyA9IHt9O1xuXG4gICAgICAgIGNvbnN0IGFkZEZseWluZ0Zvb2RMaXN0ZW5lciA9IGlkeCA9PiB7XG4gICAgICAgICAgICBsZXQgZm9vZEljb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgZm9vZC1zdmctY29udGFpbmVyLSR7aWR4fWApO1xuXG4gICAgICAgICAgICBmb29kSWNvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGZvb2RDaGlsZHJlbiA9IGZvb2RJY29uLmNoaWxkTm9kZXM7XG4gICAgICAgICAgICAgICAgd2luZG93LnNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZm9vZENoaWxkcmVuWzNdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDMwOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb29kSWNvbi5yZW1vdmVDaGlsZChmb29kQ2hpbGRyZW5bM10pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSwgMzAwMCk7XG5cbiAgICAgICAgICAgICAgICBsZXQgbW92ZW1lbnRGdW5jID0gbmV3Rm9vZCA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IHN0YXJ0ID0gbnVsbDtcblxuICAgICAgICAgICAgICAgIGxldCBzaWduZWRPbmVzID0gWy0xLCAxXTtcbiAgICAgICAgICAgICAgICBsZXQgcmFuZG9tSWR4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMik7XG4gICAgICAgICAgICAgICAgbGV0IHJhbmRvbWx5U2lnbmVkT25lID0gc2lnbmVkT25lc1tyYW5kb21JZHhdO1xuXG4gICAgICAgICAgICAgICAgY29uc3Qgc3RlcCA9IHRpbWVzdGFtcCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghc3RhcnQpIHN0YXJ0ID0gdGltZXN0YW1wO1xuICAgICAgICAgICAgICAgICAgICBsZXQgcHJvZ3Jlc3MgPSB0aW1lc3RhbXAgLSBzdGFydDtcbiAgICAgICAgICAgICAgICAgICAgbmV3Rm9vZC5zdHlsZS50cmFuc2Zvcm0gPSBcInRyYW5zbGF0ZShcIiArIChwcm9ncmVzcyAqIHJhbmRvbWx5U2lnbmVkT25lKSArIFwicHgsIFwiICsgcHJvZ3Jlc3MgKyBcInB4KVwiO1xuICAgICAgICAgICAgICAgICAgICBpZiAocHJvZ3Jlc3MgPCAyNTAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoc3RlcCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShzdGVwKTtcbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IGZvb2RDb3VudGVyc1tpZHhdOyBpIDwgZm9vZENvdW50ZXJzW2lkeF0gKyAzMDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgbGV0IG5ld0Zvb2QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICAgICAgICAgIG5ld0Zvb2Quc2V0QXR0cmlidXRlKFwiaWRcIiwgYGZseWluZy1mb29kLW9mLXR5cGUtJHtpZHh9LSR7aX1gKTtcbiAgICAgICAgICAgICAgICBuZXdGb29kLmNsYXNzTGlzdC5hZGQoYGZseWluZy1mb29kLSR7aWR4fWApO1xuICAgICAgICAgICAgICAgIG5ld0Zvb2QuY2xhc3NMaXN0LmFkZChgZmx5aW5nLWZvb2RgKTtcbiAgICAgICAgICAgICAgICBmb29kSWNvbi5hcHBlbmRDaGlsZChuZXdGb29kKTtcblxuICAgICAgICAgICAgICAgIGxldCB0aGlzT25lUGFydGljdWxhckZvb2QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcbiAgICAgICAgICAgICAgICAgICAgYGZseWluZy1mb29kLW9mLXR5cGUtJHtpZHh9LSR7aX1gXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB0aGlzT25lUGFydGljdWxhckZvb2Quc3R5bGUudG9wID0gKE1hdGgucmFuZG9tKCkgKiAtMzAwKSArIHdpbmRvdy5zY3JvbGxZICsgXCJweFwiO1xuICAgICAgICAgICAgICAgIHRoaXNPbmVQYXJ0aWN1bGFyRm9vZC5zdHlsZS5sZWZ0ID1cbiAgICAgICAgICAgICAgICAgICAgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogd2luZG93LmlubmVyV2lkdGgpICsgXCJweFwiO1xuXG4gICAgICAgICAgICAgICAgbW92ZW1lbnRGdW5jKHRoaXNPbmVQYXJ0aWN1bGFyRm9vZCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgZm9vZENvdW50ZXJzW2lkeF0gKz0gMTA7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDE4OyBpKyspIHtcbiAgICAgICAgICAgIGZvb2RDb3VudGVyc1tpXSA9IDA7XG4gICAgICAgICAgICBhZGRGbHlpbmdGb29kTGlzdGVuZXIoaSk7XG4gICAgICAgIH1cblxuXG5cbiAgICB9XG5cbiAgICBleHBvcnQgZGVmYXVsdCBhZGRBbGxGbHlpbmdGb29kTGlzdGVuZXJzOyIsImV4cG9ydCBjb25zdCByZW5kZXJTbGlkZSA9IChvcHRpb25zLCBzbGlkZSwgaWR4KSA9PiB7XG5cbiAgY29uc3QgaGFuZGxlU2Nyb2xsT250byA9IChlbnRyaWVzLCBvYnNlcnZlcikgPT4ge1xuICAgIGVudHJpZXMuZm9yRWFjaChlbnRyeSA9PiB7XG4gICAgICBpZiAoZW50cnkuaXNJbnRlcnNlY3RpbmcpIHtcblxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuc2xpZGUtc3ZnLSR7aWR4fWApXG4gICAgICAgICAgLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIik7XG5cbiAgICAgICAgbGV0IGN1cnJlbnRTVkcgPSBkMy5zZWxlY3QoYC5zbGlkZS1zdmctJHtpZHh9YCk7XG5cbiAgICAgICAgbGV0IHRvb2x0aXAgPSBkM1xuICAgICAgICAgIC5zZWxlY3QoXCJib2R5XCIpXG4gICAgICAgICAgLmFwcGVuZChcImRpdlwiKVxuICAgICAgICAgIC5zdHlsZShcInBvc2l0aW9uXCIsIFwiYWJzb2x1dGVcIilcbiAgICAgICAgICAuc3R5bGUoXCJmb250LXNpemVcIiwgXCIxMnB4XCIpXG4gICAgICAgICAgLnN0eWxlKFwiei1pbmRleFwiLCBcIjEwXCIpXG4gICAgICAgICAgLnN0eWxlKFwidmlzaWJpbGl0eVwiLCBcImhpZGRlblwiKTtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IG51dHJpZW50cyA9IFtcImZpYmVyXCIsIFwiaXJvblwiLCBcIm1hZ25lc2l1bVwiLCBcInBvdGFzc2l1bVwiLCBcInppbmNcIiwgXCJ2aXRhbWluIENcIiwgXCJmb2xhdGVcIiwgXCJ2aXRhbWluIEIxMlwiLCBcInZpdGFtaW4gQVwiLCBcInZpdGFtaW4gRFwiXTtcblxuICAgICAgICBjdXJyZW50U1ZHXG4gICAgICAgICAgLnNlbGVjdEFsbChcInJlY3RcIilcbiAgICAgICAgICAub24oXCJtb3VzZW92ZXJcIiwgZnVuY3Rpb24oZCkge1xuICAgICAgICAgICAgcmV0dXJuIHRvb2x0aXAuc3R5bGUoXCJ2aXNpYmlsaXR5XCIsIFwidmlzaWJsZVwiKTtcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5vbihcIm1vdXNlbW92ZVwiLCBmdW5jdGlvbihkLCBpKSB7XG4gICAgICAgICAgICByZXR1cm4gdG9vbHRpcFxuICAgICAgICAgICAgICAuc3R5bGUoXCJ0b3BcIiwgZXZlbnQucGFnZVkgLSA2MCArIFwicHhcIilcbiAgICAgICAgICAgICAgLnN0eWxlKFwibGVmdFwiLCBldmVudC5wYWdlWCAtIDMwICsgXCJweFwiKVxuICAgICAgICAgICAgICAuc3R5bGUoXCJiYWNrZ3JvdW5kLWNvbG9yXCIsIFwid2hpdGVcIilcbiAgICAgICAgICAgICAgLnN0eWxlKFwiYm9yZGVyXCIsIFwiMnB4IHNvbGlkIGJsYWNrXCIpXG4gICAgICAgICAgICAgIC5zdHlsZShcInBhZGRpbmdcIiwgXCI1cHhcIilcbiAgICAgICAgICAgICAgLnN0eWxlKFwiYm9yZGVyLXJhZGl1c1wiLCBcIjNweFwiKVxuICAgICAgICAgICAgICAudGV4dChgJHtudXRyaWVudHNbaV19OiAke2R9JWApO1xuICAgICAgICAgIH0pXG4gICAgICAgICAgLm9uKFwibW91c2VvdXRcIiwgZnVuY3Rpb24oZCkge1xuICAgICAgICAgICAgcmV0dXJuIHRvb2x0aXAuc3R5bGUoXCJ2aXNpYmlsaXR5XCIsIFwiaGlkZGVuXCIpO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuc2xpZGUtc3ZnLSR7aWR4IC0gMX1gKSkge1xuICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC5zbGlkZS1zdmctJHtpZHggLSAxfWApXG4gICAgICAgICAgLmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLnNsaWRlLXN2Zy0ke2lkeCArIDF9YCkpIHtcbiAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuc2xpZGUtc3ZnLSR7aWR4ICsgMX1gKVxuICAgICAgICAgIC5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgLnNsaWRlLXN2Zy0ke2lkeH0tcmVjdGApLmZvckVhY2gocmVjdCA9PiB7XG4gICAgICAgICAgcmVjdC5jbGFzc0xpc3QuYWRkKFwiY2hhcnQtcmVjdFwiKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZDMuc2VsZWN0KGAuc2xpZGUtc3ZnLSR7aWR4fS15LWF4aXNgKVxuICAgICAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgICAgICAuc3R5bGUoXCJvcGFjaXR5XCIsIFwiMTAwJVwiKVxuICAgICAgICAgIC5kdXJhdGlvbig1MDApO1xuXG4gICAgICAgIGxldCBuYXZDaXJjbGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgbmF2LWxpLSR7aWR4fWApO1xuICAgICAgICBuYXZDaXJjbGUuY2xhc3NMaXN0LmFkZChgbmF2LWxpLSR7aWR4fWApO1xuXG5cblxuICAgICAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgLnNsaWRlLXN2Zy0ke2lkeCAtIDF9LXJlY3RgKSkge1xuICAgICAgICAgICAgZG9jdW1lbnRcbiAgICAgICAgICAgICAgLnF1ZXJ5U2VsZWN0b3JBbGwoYC5zbGlkZS1zdmctJHtpZHggLSAxfS1yZWN0YClcbiAgICAgICAgICAgICAgLmZvckVhY2gocmVjdCA9PiB7XG4gICAgICAgICAgICAgICAgcmVjdC5jbGFzc0xpc3QucmVtb3ZlKFwiY2hhcnQtcmVjdFwiKTtcbiAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGQzLnNlbGVjdChgLnNsaWRlLXN2Zy0ke2lkeCAtIDF9LXktYXhpc2ApXG4gICAgICAgICAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgICAgICAgICAgLnN0eWxlKFwib3BhY2l0eVwiLCBcIjAlXCIpXG4gICAgICAgICAgICAgIC5kdXJhdGlvbig1MDApO1xuICAgICAgICAgICAgXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYG5hdi1saS0ke2lkeCAtIDF9YCkpIHtcbiAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgbmF2LWxpLSR7aWR4IC0gMX1gKS5jbGFzc0xpc3QucmVtb3ZlKGBuYXYtbGktJHtpZHggLSAxfWApO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYC5zbGlkZS1zdmctJHtpZHggKyAxfS1yZWN0YCkpIHtcbiAgICAgICAgICAgIGRvY3VtZW50XG4gICAgICAgICAgICAgIC5xdWVyeVNlbGVjdG9yQWxsKGAuc2xpZGUtc3ZnLSR7aWR4ICsgMX0tcmVjdGApXG4gICAgICAgICAgICAgIC5mb3JFYWNoKHJlY3QgPT4ge1xuICAgICAgICAgICAgICAgIHJlY3QuY2xhc3NMaXN0LnJlbW92ZShcImNoYXJ0LXJlY3RcIik7XG4gICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBkMy5zZWxlY3QoYC5zbGlkZS1zdmctJHtpZHggKyAxfS15LWF4aXNgKVxuICAgICAgICAgICAgICAudHJhbnNpdGlvbigpXG4gICAgICAgICAgICAgIC5zdHlsZShcIm9wYWNpdHlcIiwgXCIwJVwiKVxuICAgICAgICAgICAgICAuZHVyYXRpb24oNTAwKTtcblxuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYG5hdi1saS0ke2lkeCArIDF9YCkuY2xhc3NMaXN0LnJlbW92ZShgbmF2LWxpLSR7aWR4ICsgMX1gKTsgICAgICAgICAgICAgIFxuICAgICAgICB9XG5cbiAgICAgICAgICBcbiAgICAgIH1cbiAgICB9KTtcbiAgfTtcblxuICBsZXQgb2JzZXJ2ZXIgPSBuZXcgSW50ZXJzZWN0aW9uT2JzZXJ2ZXIoaGFuZGxlU2Nyb2xsT250bywgb3B0aW9ucyk7XG4gIG9ic2VydmVyLm9ic2VydmUoc2xpZGUpO1xuXG59IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luIl0sInNvdXJjZVJvb3QiOiIifQ==