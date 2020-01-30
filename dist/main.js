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
    var justClicked = false;

    var flyingFoodClickCallback = function flyingFoodClickCallback(e) {
      if (justClicked) {} else {
        foodIcon.classList.remove("flying-food-click-enabled");
        foodIcon.classList.add("flying-food-click-disabled");
        document.getElementById("click-bubble-".concat(idx)).classList.remove("show");
        var foodChildren = foodIcon.childNodes;
        window.setTimeout(function () {
          if (foodChildren[3]) {
            for (var i = 0; i < 30; i++) {
              foodIcon.removeChild(foodChildren[3]);
            }
          }
        }, 2000);

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
        justClicked = true;
        window.setTimeout(function () {
          justClicked = false;
          foodIcon.classList.remove("flying-food-click-disabled");
          foodIcon.classList.add("flying-food-click-enabled");
        }, 2000);
      }
    };

    foodIcon.addEventListener("click", flyingFoodClickCallback);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL2ZseWluZ19mb29kLmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL3Njcm9sbC9zbGlkZXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0eWxlcy9pbmRleC5zY3NzP2M4MDciXSwibmFtZXMiOlsibnV0cml0aW9uRGF0YSIsImQzIiwiY3N2IiwiZCIsImZvb2RfbmFtZSIsInNlcnZpbmdfc2l6ZSIsImZpYmVyIiwiaXJvbiIsIm1hZ25lc2l1bSIsInBvdGFzc2l1bSIsInppbmMiLCJmb2xhdGUiLCJjaG9sZXN0ZXJvbCIsInRoZW4iLCJkYXRhIiwiY3JlYXRlVmlzdWFsaXphdGlvbiIsImNyZWF0ZU5hdkxpIiwiY3JlYXRlQW5jaG9yIiwiaSIsImxlbmd0aCIsImZvb2REYXRhIiwiaWR4IiwiY3JlYXRlWEF4aXNCb29sIiwibWFyZ2luIiwidG9wIiwicmlnaHQiLCJib3R0b20iLCJsZWZ0IiwidyIsImgiLCJPYmplY3QiLCJ2YWx1ZXMiLCJzbGljZSIsIm51bWJlck9mQ29sdW1ucyIsIm1heFZhbHVlIiwiTWF0aCIsIm1heCIsInhfYXhpc0xlbmd0aCIsInlfYXhpc0xlbmd0aCIsInRhcmdldFNWRyIsInRhcmdldFNsaWRlUmVjdCIsInhTY2FsZSIsInNjYWxlTGluZWFyIiwiZG9tYWluIiwicmFuZ2UiLCJ5U2NhbGUiLCJzdmciLCJzZWxlY3QiLCJhcHBlbmQiLCJhdHRyIiwieEF4aXMiLCJheGlzQm90dG9tIiwidGlja1NpemUiLCJ0aWNrRm9ybWF0Iiwia2V5cyIsInRyYW5zaXRpb24iLCJkdXJhdGlvbiIsImNhbGwiLCJzZWxlY3RBbGwiLCJzdHlsZSIsInRleHQiLCJ5QXhpcyIsImF4aXNMZWZ0IiwidGlja3MiLCJlbnRlciIsIndpbmRvdyIsImFkZEV2ZW50TGlzdGVuZXIiLCJlIiwic2xpZGVzIiwic2xpZGVOYW1lIiwibmV3U2xpZGUiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJwdXNoIiwiY3JlYXRlT2JzZXJ2ZXJzIiwiYWRkQWxsRmx5aW5nRm9vZExpc3RlbmVycyIsImZseWluZ0Zvb2RJZHMiLCJmb3JFYWNoIiwiaWQiLCJnZXRFbGVtZW50QnlJZCIsImNsYXNzTGlzdCIsImFkZCIsInJlbW92ZSIsIm9wdGlvbnMiLCJyb290Iiwicm9vdE1hcmdpbiIsInRocmVzaG9sZCIsIlNsaWRlcyIsIm5hdkNvbHVtbiIsImFuY2hvckxpbmsiLCJjcmVhdGVFbGVtZW50Iiwic2V0QXR0cmlidXRlIiwiYXBwZW5kQ2hpbGQiLCJuYXZMaSIsInNsaWRlQ29udGFpbmVyIiwiYW5jaG9yVGFnIiwiZm9vZENvdW50ZXJzIiwiYWRkRmx5aW5nRm9vZExpc3RlbmVyIiwiZm9vZEljb24iLCJqdXN0Q2xpY2tlZCIsImZseWluZ0Zvb2RDbGlja0NhbGxiYWNrIiwiZm9vZENoaWxkcmVuIiwiY2hpbGROb2RlcyIsInNldFRpbWVvdXQiLCJyZW1vdmVDaGlsZCIsIm1vdmVtZW50RnVuYyIsIm5ld0Zvb2QiLCJzdGFydCIsInNpZ25lZE9uZXMiLCJyYW5kb21JZHgiLCJmbG9vciIsInJhbmRvbSIsInJhbmRvbWx5U2lnbmVkT25lIiwic3RlcCIsInRpbWVzdGFtcCIsInByb2dyZXNzIiwidHJhbnNmb3JtIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwidGhpc09uZVBhcnRpY3VsYXJGb29kIiwic2Nyb2xsWSIsImlubmVyV2lkdGgiLCJyZW5kZXJTbGlkZSIsInNsaWRlIiwiaGFuZGxlU2Nyb2xsT250byIsImVudHJpZXMiLCJvYnNlcnZlciIsImVudHJ5IiwiaXNJbnRlcnNlY3RpbmciLCJjdXJyZW50U1ZHIiwidG9vbHRpcCIsIm51dHJpZW50cyIsIm9uIiwiZXZlbnQiLCJwYWdlWSIsInBhZ2VYIiwicXVlcnlTZWxlY3RvckFsbCIsInJlY3QiLCJuYXZDaXJjbGUiLCJJbnRlcnNlY3Rpb25PYnNlcnZl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QmpCLEtBQWpCO0FBRUQsQ0F6R00sQzs7Ozs7Ozs7Ozs7QUNBUCx1QyIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvZGlzdC9cIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXguanNcIik7XG4iLCJpbXBvcnQgJy4vc3R5bGVzL2luZGV4LnNjc3MnO1xuaW1wb3J0ICogYXMgU2xpZGVzIGZyb20gJy4vc2NyaXB0cy9zY3JvbGwvc2xpZGVzJztcbmltcG9ydCBhZGRBbGxGbHlpbmdGb29kTGlzdGVuZXJzIGZyb20gJy4vc2NyaXB0cy9mbHlpbmdfZm9vZCc7XG5cbmxldCBudXRyaXRpb25EYXRhO1xuXG5kMy5jc3YoXCJudXRyaXRpb25fZmFjdHNfZm9yX3Njcm9sbGVyLmNzdlwiLCBkID0+IHtcbiAgcmV0dXJuIHtcbiAgICBmb29kX25hbWU6IGRbXCJGb29kIG5hbWVcIl0sXG4gICAgc2VydmluZ19zaXplOiBkW1wiQW1vdW50XCJdLFxuICAgIGZpYmVyOiArZFtcIkZpYmVyXCJdLFxuICAgIGlyb246ICtkW1wiSXJvblwiXSxcbiAgICBtYWduZXNpdW06ICtkW1wiTWFnbmVzaXVtXCJdLFxuICAgIHBvdGFzc2l1bTogK2RbXCJQb3Rhc3NpdW1cIl0sXG4gICAgemluYzogK2RbXCJaaW5jXCJdLFxuICAgIFwidml0YW1pbiBDXCI6ICtkW1wiVml0YW1pbiBDXCJdLFxuICAgIGZvbGF0ZTogK2RbXCJGb2xhdGVcIl0sXG4gICAgXCJ2aXRhbWluIEIxMlwiOiArZFtcIlZpdGFtaW4gQi0xMlwiXSxcbiAgICBcInZpdGFtaW4gQVwiOiArZFtcIlZpdGFtaW4gQVwiXSxcbiAgICBcInZpdGFtaW4gRFwiOiArZFtcIlZpdGFtaW4gRFwiXSxcbiAgICBjaG9sZXN0ZXJvbDogK2RbXCJDaG9sZXN0ZXJvbFwiXVxuICB9O1xufSkudGhlbihkYXRhID0+IHtcbiAgICBudXRyaXRpb25EYXRhID0gZGF0YTtcbiAgICBcbiAgICBjcmVhdGVWaXN1YWxpemF0aW9uKG51dHJpdGlvbkRhdGFbMF0sIDAsIHRydWUpO1xuICAgIGNyZWF0ZU5hdkxpKDApO1xuICAgIGNyZWF0ZUFuY2hvcigwKTtcbiAgICBcbiAgICBmb3IgKGxldCBpID0gMTsgaSA8IG51dHJpdGlvbkRhdGEubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNyZWF0ZVZpc3VhbGl6YXRpb24obnV0cml0aW9uRGF0YVtpXSwgaSk7XG4gICAgICBjcmVhdGVOYXZMaShpKTtcbiAgICAgIGNyZWF0ZUFuY2hvcihpKTtcbiAgICB9XG5cbn0pO1xuXG5jb25zdCBjcmVhdGVWaXN1YWxpemF0aW9uID0gKGZvb2REYXRhLCBpZHgsIGNyZWF0ZVhBeGlzQm9vbCkgPT4ge1xuICBsZXQgbWFyZ2luID0ge3RvcDogMjAsIHJpZ2h0OiA0MCwgYm90dG9tOiAyNSwgbGVmdDogNjB9XG4gIGxldCB3ID0gNjAwIC0gbWFyZ2luLmxlZnQgLSBtYXJnaW4ucmlnaHQ7XG4gIGxldCBoID0gNDc1IC0gbWFyZ2luLnRvcCAtIG1hcmdpbi5ib3R0b207XG5cbiAgbGV0IGRhdGEgPSBPYmplY3QudmFsdWVzKGZvb2REYXRhKS5zbGljZSgyLCAtMSk7XG4gIGxldCBudW1iZXJPZkNvbHVtbnMgPSAxMDtcbiAgbGV0IG1heFZhbHVlID0gTWF0aC5tYXgoLjUwLCBkMy5tYXgoZGF0YSwgZnVuY3Rpb24oZCkge1xuICAgIHJldHVybiAoK2QgLyAxMDApO1xuICB9KSk7XG4gIGxldCB4X2F4aXNMZW5ndGggPSB3O1xuICBsZXQgeV9heGlzTGVuZ3RoID0gaDtcbiAgbGV0IHRhcmdldFNWRyA9IFwic2xpZGUtc3ZnLVwiICsgaWR4O1xuICBsZXQgdGFyZ2V0U2xpZGVSZWN0ID0gXCJzbGlkZS1zdmctXCIgKyBpZHggKyBcIi1yZWN0XCI7XG5cbiAgbGV0IHhTY2FsZSA9IGQzXG4gICAgLnNjYWxlTGluZWFyKClcbiAgICAuZG9tYWluKFswLCBudW1iZXJPZkNvbHVtbnNdKVxuICAgIC5yYW5nZShbMCwgd10pO1xuXG4gIGxldCB5U2NhbGUgPSBkM1xuICAgIC5zY2FsZUxpbmVhcigpXG4gICAgLmRvbWFpbihbMCwgbWF4VmFsdWVdKVxuICAgIC5yYW5nZShbaCAtIG1hcmdpbi50b3AsIG1hcmdpbi5ib3R0b21dKTtcblxuICBsZXQgc3ZnID0gZDNcbiAgICAuc2VsZWN0KFwiI3Zpc1wiKVxuICAgIC8vIC5zZWxlY3QoYCNzdmctY29udGFpbmVyLSR7aWR4fWApXG4gICAgLmFwcGVuZChcInN2Z1wiKVxuICAgIC5hdHRyKFwiY2xhc3NcIiwgYCR7dGFyZ2V0U1ZHfSBoaWRkZW5gKVxuICAgIC5hdHRyKFwidmlld0JveFwiLCBgMCAwIDY1MCA3MDBgKVxuICAgIC5hdHRyKFwicHJlc2VydmVBc3BlY3RSYXRpb1wiLCBcInhNaW5ZTWluIG1lZXRcIik7XG4gICAgLy8gLmF0dHIoXCJ3aWR0aFwiLCB3ICsgbWFyZ2luLmxlZnQgKyBtYXJnaW4ucmlnaHQpXG4gICAgLy8gLmF0dHIoXCJoZWlnaHRcIiwgaCArIG1hcmdpbi50b3AgKyBtYXJnaW4uYm90dG9tKTtcblxuICBsZXQgeEF4aXMgPSBkM1xuICAgIC5heGlzQm90dG9tKHhTY2FsZSlcbiAgICAudGlja1NpemUoMClcbiAgICAudGlja0Zvcm1hdChmdW5jdGlvbihkKSB7XG4gICAgICByZXR1cm4gT2JqZWN0LmtleXMoZm9vZERhdGEpLnNsaWNlKDIsIC0xKVtkXTtcbiAgICB9KTtcblxuICAgIHN2Z1xuICAgICAgLmFwcGVuZChcImdcIilcbiAgICAgIC5hdHRyKFwiY2xhc3NcIiwgYCR7dGFyZ2V0U1ZHfS14LWF4aXMgeC1heGlzYClcbiAgICAgIC5hdHRyKFxuICAgICAgICBcInRyYW5zZm9ybVwiLFxuICAgICAgICBcInRyYW5zbGF0ZShcIiArIG1hcmdpbi5sZWZ0ICsgXCIsIFwiICsgKGggLSBtYXJnaW4udG9wKSArIFwiKVwiXG4gICAgICApXG4gICAgICAudHJhbnNpdGlvbigpXG4gICAgICAuZHVyYXRpb24oMTAwMClcbiAgICAgIC5jYWxsKHhBeGlzKTtcblxuICAgIHN2Zy5zZWxlY3RBbGwoXCIueC1heGlzIHRleHRcIikuYXR0cihcInRyYW5zZm9ybVwiLCBmdW5jdGlvbihkKSB7XG4gICAgICByZXR1cm4gXCJ0cmFuc2xhdGUoMTAsIDI1KXJvdGF0ZSgtNDUpXCI7XG4gICAgfSk7XG5cbiAgICBzdmdcbiAgICAgIC5hcHBlbmQoXCJ0ZXh0XCIpXG4gICAgICAuYXR0cihcInRyYW5zZm9ybVwiLCBcInJvdGF0ZSgtOTApXCIpXG4gICAgICAuYXR0cihcImNsYXNzXCIsIFwieS1heGlzLWxhYmVsXCIpXG4gICAgICAuYXR0cihcInlcIiwgMClcbiAgICAgIC5hdHRyKFwieFwiLCAwIC0gaCAvIDIpXG4gICAgICAuYXR0cihcImR5XCIsIFwiMWVtXCIpXG4gICAgICAuc3R5bGUoXCJ0ZXh0LWFuY2hvclwiLCBcIm1pZGRsZVwiKVxuICAgICAgLnRleHQoXCJQZXJjZW50YWdlIG9mIHJlY29tbWVuZGVkIGRhaWx5IGFsbG93YW5jZShSREEpXCIpO1xuXG4gICAgc3ZnXG4gICAgICAuYXBwZW5kKFwidGV4dFwiKVxuICAgICAgLmF0dHIoXCJjbGFzc1wiLCBcInNvdXJjZS10ZXh0XCIpXG4gICAgICAuYXR0cihcInRyYW5zZm9ybVwiLFxuICAgICAgICBcInRyYW5zbGF0ZSgzNSwgXCIgK1xuICAgICAgICAoaCArIG1hcmdpbi50b3AgKyA0MCkgKyBcIilcIilcbiAgICAgIC5zdHlsZShcInRleHQtYW5jaG9yXCIsIFwibGVmdFwiKVxuICAgICAgLnRleHQoXCJTb3VyY2U6IFVTREFcIik7XG5cbiAgbGV0IHlBeGlzID0gZDMuYXhpc0xlZnQoeVNjYWxlKS50aWNrcyg0LCBcIiVcIik7XG5cbiAgc3ZnXG4gICAgLmFwcGVuZChcImdcIilcbiAgICAuYXR0cihcImNsYXNzXCIsIGAke3RhcmdldFNWR30teS1heGlzIHktYXhpc2ApXG4gICAgLmF0dHIoXCJ0cmFuc2Zvcm1cIiwgXCJ0cmFuc2xhdGUoXCIgKyBtYXJnaW4ubGVmdCArIFwiLDApXCIpXG4gICAgLnN0eWxlKFwib3BhY2l0eVwiLCBcIjAlXCIpXG4gICAgLmNhbGwoeUF4aXMpO1xuICAgICAgICBcbiAgc3ZnXG4gICAgLnNlbGVjdEFsbChcInJlY3RcIilcbiAgICAuZGF0YShkYXRhKVxuICAgIC5lbnRlcigpXG4gICAgLmFwcGVuZChcInJlY3RcIilcbiAgICAuYXR0cihcImNsYXNzXCIsIGAke3RhcmdldFNsaWRlUmVjdH1gKVxuICAgIC5hdHRyKFwieFwiLCBmdW5jdGlvbihkLCBpKSB7XG4gICAgICByZXR1cm4gaSAqICh4X2F4aXNMZW5ndGggLyBudW1iZXJPZkNvbHVtbnMpICsgbWFyZ2luLmxlZnQgKyAxMDtcbiAgICB9KVxuICAgIC5hdHRyKFwieVwiLCBmdW5jdGlvbihkKSB7XG4gICAgICByZXR1cm4geVNjYWxlKGQgLyAxMDApO1xuICAgIH0pXG4gICAgLmF0dHIoXCJ3aWR0aFwiLCB4X2F4aXNMZW5ndGggLyBudW1iZXJPZkNvbHVtbnMgLSAxKVxuICAgIC5hdHRyKFwiaGVpZ2h0XCIsIGZ1bmN0aW9uKGQpIHtcbiAgICAgIHJldHVybiBoIC0geVNjYWxlKGQgLyAxMDApIC0gbWFyZ2luLnRvcDtcbiAgICB9KVxuICAgIC50cmFuc2l0aW9uKClcbiAgICAuZHVyYXRpb24oNTAwKTtcblxufTtcblxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsIChlKSA9PiB7XG4gICAgXG4gICAgbGV0IHNsaWRlcyA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTk7IGkrKykge1xuICAgICAgICBsZXQgc2xpZGVOYW1lID0gXCIjc2xpZGUtY29udGFpbmVyLVwiICsgaTtcbiAgICAgICAgbGV0IG5ld1NsaWRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzbGlkZU5hbWUpO1xuICAgICAgICBzbGlkZXMucHVzaChuZXdTbGlkZSk7XG4gICAgfVxuICAgIGNyZWF0ZU9ic2VydmVycyhzbGlkZXMpO1xufSwgZmFsc2UpO1xuXG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsICgpID0+IHtcblxuICAgIGFkZEFsbEZseWluZ0Zvb2RMaXN0ZW5lcnMoKTtcblxuICAgIGNvbnN0IGZseWluZ0Zvb2RJZHMgPSBbMCwgMSwgMiwgMywgNCwgNiwgNywgOSwgMTEsIDEyLCAxMywgMTQsIDE2LCAxN107XG5cbiAgICBmbHlpbmdGb29kSWRzLmZvckVhY2goaWQgPT4ge1xuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYGZvb2Qtc3ZnLWNvbnRhaW5lci0ke2lkfWApLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW92ZXJcIiwgKCkgPT4ge1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgY2xpY2stYnViYmxlLSR7aWR9YCkuY2xhc3NMaXN0LmFkZChcInNob3dcIik7XG4gICAgICB9KVxuXG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgZm9vZC1zdmctY29udGFpbmVyLSR7aWR9YCkuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlb3V0XCIsICgpID0+IHtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYGNsaWNrLWJ1YmJsZS0ke2lkfWApLmNsYXNzTGlzdC5yZW1vdmUoXCJzaG93XCIpO1xuICAgICAgfSlcblxuICAgIH0pXG5cbn0pXG5cbmNvbnN0IGNyZWF0ZU9ic2VydmVycyA9IChzbGlkZXMpID0+IHtcbiAgICBcbiAgICBsZXQgb3B0aW9ucyA9IHtcbiAgICAgIHJvb3Q6IG51bGwsXG4gICAgICByb290TWFyZ2luOiBcIjBweCAwcHggMHB4IDBweFwiLFxuICAgICAgdGhyZXNob2xkOiAuNVxuICAgIH07XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNsaWRlcy5sZW5ndGggLSAxOyBpKyspIHtcbiAgICAgIFNsaWRlcy5yZW5kZXJTbGlkZShvcHRpb25zLCBzbGlkZXNbaV0sIGkpO1xuICAgIH1cblxufVxuXG5jb25zdCBjcmVhdGVOYXZMaSA9IChpZHgpID0+IHtcbiAgbGV0IG5hdkNvbHVtbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5uYXYtY29sdW1uJyk7XG5cbiAgbGV0IGFuY2hvckxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYVwiKTtcbiAgYW5jaG9yTGluay5zZXRBdHRyaWJ1dGUoXCJocmVmXCIsIGAjYW5jaG9yLSR7aWR4fWApO1xuICBuYXZDb2x1bW4uYXBwZW5kQ2hpbGQoYW5jaG9yTGluayk7XG5cbiAgbGV0IG5hdkxpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpO1xuICBuYXZMaS5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBgbmF2LWxpLSR7aWR4fWApO1xuICBuYXZMaS5jbGFzc0xpc3QuYWRkKFwibmF2LWxpXCIpO1xuICBhbmNob3JMaW5rLmFwcGVuZENoaWxkKG5hdkxpKTtcblxufVxuXG5jb25zdCBjcmVhdGVBbmNob3IgPSAoaWR4KSA9PiB7XG4gIGxldCBzbGlkZUNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBzbGlkZS1jb250YWluZXItJHtpZHh9YCk7XG5cbiAgbGV0IGFuY2hvclRhZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJhXCIpO1xuICBhbmNob3JUYWcuc2V0QXR0cmlidXRlKFwiaWRcIiwgYGFuY2hvci0ke2lkeH1gKTtcbiAgYW5jaG9yVGFnLmNsYXNzTGlzdC5hZGQoXCJhbmNob3JcIik7XG5cbiAgc2xpZGVDb250YWluZXIuYXBwZW5kQ2hpbGQoYW5jaG9yVGFnKTtcbn1cblxuXG4iLCIgICAgY29uc3QgYWRkQWxsRmx5aW5nRm9vZExpc3RlbmVycyA9ICgpID0+IHtcblxuICAgICAgICBsZXQgZm9vZENvdW50ZXJzID0ge307XG5cbiAgICAgICAgY29uc3QgYWRkRmx5aW5nRm9vZExpc3RlbmVyID0gaWR4ID0+IHtcbiAgICAgICAgICAgIGxldCBmb29kSWNvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBmb29kLXN2Zy1jb250YWluZXItJHtpZHh9YCk7XG5cbiAgICAgICAgICAgIGxldCBqdXN0Q2xpY2tlZCA9IGZhbHNlO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBjb25zdCBmbHlpbmdGb29kQ2xpY2tDYWxsYmFjayA9IGUgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChqdXN0Q2xpY2tlZCkge1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGZvb2RJY29uLmNsYXNzTGlzdC5yZW1vdmUoXCJmbHlpbmctZm9vZC1jbGljay1lbmFibGVkXCIpO1xuICAgICAgICAgICAgICAgICAgICBmb29kSWNvbi5jbGFzc0xpc3QuYWRkKFwiZmx5aW5nLWZvb2QtY2xpY2stZGlzYWJsZWRcIik7XG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBjbGljay1idWJibGUtJHtpZHh9YCkuY2xhc3NMaXN0LnJlbW92ZShcInNob3dcIik7XG5cbiAgICAgICAgICAgICAgICBsZXQgZm9vZENoaWxkcmVuID0gZm9vZEljb24uY2hpbGROb2RlcztcblxuICAgICAgICAgICAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZvb2RDaGlsZHJlblszXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAzMDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9vZEljb24ucmVtb3ZlQ2hpbGQoZm9vZENoaWxkcmVuWzNdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sIDIwMDApO1xuXG4gICAgICAgICAgICAgICAgbGV0IG1vdmVtZW50RnVuYyA9IG5ld0Zvb2QgPT4ge1xuICAgICAgICAgICAgICAgICAgICBsZXQgc3RhcnQgPSBudWxsO1xuXG4gICAgICAgICAgICAgICAgICAgIGxldCBzaWduZWRPbmVzID0gWy0xLCAxXTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJhbmRvbUlkeCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDIpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgcmFuZG9tbHlTaWduZWRPbmUgPSBzaWduZWRPbmVzW3JhbmRvbUlkeF07XG5cbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3RlcCA9IHRpbWVzdGFtcCA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXN0YXJ0KSBzdGFydCA9IHRpbWVzdGFtcDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBwcm9ncmVzcyA9IHRpbWVzdGFtcCAtIHN0YXJ0O1xuICAgICAgICAgICAgICAgICAgICAgICAgbmV3Rm9vZC5zdHlsZS50cmFuc2Zvcm0gPSBcInRyYW5zbGF0ZShcIiArIChwcm9ncmVzcyAqIHJhbmRvbWx5U2lnbmVkT25lKSArIFwicHgsIFwiICsgcHJvZ3Jlc3MgKyBcInB4KVwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHByb2dyZXNzIDwgMjUwMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoc3RlcCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShzdGVwKTtcbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IGZvb2RDb3VudGVyc1tpZHhdOyBpIDwgZm9vZENvdW50ZXJzW2lkeF0gKyAzMDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBuZXdGb29kID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgICAgICAgICAgICAgbmV3Rm9vZC5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBgZmx5aW5nLWZvb2Qtb2YtdHlwZS0ke2lkeH0tJHtpfWApO1xuICAgICAgICAgICAgICAgICAgICBuZXdGb29kLmNsYXNzTGlzdC5hZGQoYGZseWluZy1mb29kLSR7aWR4fWApO1xuICAgICAgICAgICAgICAgICAgICBuZXdGb29kLmNsYXNzTGlzdC5hZGQoYGZseWluZy1mb29kYCk7XG4gICAgICAgICAgICAgICAgICAgIGZvb2RJY29uLmFwcGVuZENoaWxkKG5ld0Zvb2QpO1xuXG4gICAgICAgICAgICAgICAgICAgIGxldCB0aGlzT25lUGFydGljdWxhckZvb2QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcbiAgICAgICAgICAgICAgICAgICAgICAgIGBmbHlpbmctZm9vZC1vZi10eXBlLSR7aWR4fS0ke2l9YFxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICB0aGlzT25lUGFydGljdWxhckZvb2Quc3R5bGUudG9wID0gKE1hdGgucmFuZG9tKCkgKiAtMzAwKSArIHdpbmRvdy5zY3JvbGxZICsgXCJweFwiO1xuICAgICAgICAgICAgICAgICAgICB0aGlzT25lUGFydGljdWxhckZvb2Quc3R5bGUubGVmdCA9XG4gICAgICAgICAgICAgICAgICAgICAgICBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiB3aW5kb3cuaW5uZXJXaWR0aCkgKyBcInB4XCI7XG5cbiAgICAgICAgICAgICAgICAgICAgbW92ZW1lbnRGdW5jKHRoaXNPbmVQYXJ0aWN1bGFyRm9vZCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgZm9vZENvdW50ZXJzW2lkeF0gKz0gMTA7XG5cbiAgICAgICAgICAgICAgICBqdXN0Q2xpY2tlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgd2luZG93LnNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBqdXN0Q2xpY2tlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICBmb29kSWNvbi5jbGFzc0xpc3QucmVtb3ZlKFwiZmx5aW5nLWZvb2QtY2xpY2stZGlzYWJsZWRcIik7XG4gICAgICAgICAgICAgICAgICAgIGZvb2RJY29uLmNsYXNzTGlzdC5hZGQoXCJmbHlpbmctZm9vZC1jbGljay1lbmFibGVkXCIpO1xuICAgICAgICAgICAgICAgIH0sIDIwMDApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZm9vZEljb24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZseWluZ0Zvb2RDbGlja0NhbGxiYWNrKTtcblxuICAgICAgICB9O1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTg7IGkrKykge1xuICAgICAgICAgICAgZm9vZENvdW50ZXJzW2ldID0gMDtcbiAgICAgICAgICAgIGFkZEZseWluZ0Zvb2RMaXN0ZW5lcihpKTtcbiAgICAgICAgfVxuXG5cblxuICAgIH1cblxuICAgIGV4cG9ydCBkZWZhdWx0IGFkZEFsbEZseWluZ0Zvb2RMaXN0ZW5lcnM7IiwiZXhwb3J0IGNvbnN0IHJlbmRlclNsaWRlID0gKG9wdGlvbnMsIHNsaWRlLCBpZHgpID0+IHtcblxuICBjb25zdCBoYW5kbGVTY3JvbGxPbnRvID0gKGVudHJpZXMsIG9ic2VydmVyKSA9PiB7XG4gICAgZW50cmllcy5mb3JFYWNoKGVudHJ5ID0+IHtcbiAgICAgIGlmIChlbnRyeS5pc0ludGVyc2VjdGluZykge1xuXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC5zbGlkZS1zdmctJHtpZHh9YClcbiAgICAgICAgICAuY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKTtcblxuICAgICAgICBsZXQgY3VycmVudFNWRyA9IGQzLnNlbGVjdChgLnNsaWRlLXN2Zy0ke2lkeH1gKTtcblxuICAgICAgICBsZXQgdG9vbHRpcCA9IGQzXG4gICAgICAgICAgLnNlbGVjdChcImJvZHlcIilcbiAgICAgICAgICAuYXBwZW5kKFwiZGl2XCIpXG4gICAgICAgICAgLnN0eWxlKFwicG9zaXRpb25cIiwgXCJhYnNvbHV0ZVwiKVxuICAgICAgICAgIC5zdHlsZShcImZvbnQtc2l6ZVwiLCBcIjEycHhcIilcbiAgICAgICAgICAuc3R5bGUoXCJ6LWluZGV4XCIsIFwiMTBcIilcbiAgICAgICAgICAuc3R5bGUoXCJ2aXNpYmlsaXR5XCIsIFwiaGlkZGVuXCIpO1xuICAgICAgICBcbiAgICAgICAgY29uc3QgbnV0cmllbnRzID0gW1wiZmliZXJcIiwgXCJpcm9uXCIsIFwibWFnbmVzaXVtXCIsIFwicG90YXNzaXVtXCIsIFwiemluY1wiLCBcInZpdGFtaW4gQ1wiLCBcImZvbGF0ZVwiLCBcInZpdGFtaW4gQjEyXCIsIFwidml0YW1pbiBBXCIsIFwidml0YW1pbiBEXCJdO1xuXG4gICAgICAgIGN1cnJlbnRTVkdcbiAgICAgICAgICAuc2VsZWN0QWxsKFwicmVjdFwiKVxuICAgICAgICAgIC5vbihcIm1vdXNlb3ZlclwiLCBmdW5jdGlvbihkKSB7XG4gICAgICAgICAgICByZXR1cm4gdG9vbHRpcC5zdHlsZShcInZpc2liaWxpdHlcIiwgXCJ2aXNpYmxlXCIpO1xuICAgICAgICAgIH0pXG4gICAgICAgICAgLm9uKFwibW91c2Vtb3ZlXCIsIGZ1bmN0aW9uKGQsIGkpIHtcbiAgICAgICAgICAgIHJldHVybiB0b29sdGlwXG4gICAgICAgICAgICAgIC5zdHlsZShcInRvcFwiLCBldmVudC5wYWdlWSAtIDYwICsgXCJweFwiKVxuICAgICAgICAgICAgICAuc3R5bGUoXCJsZWZ0XCIsIGV2ZW50LnBhZ2VYIC0gMzAgKyBcInB4XCIpXG4gICAgICAgICAgICAgIC5zdHlsZShcImJhY2tncm91bmQtY29sb3JcIiwgXCJ3aGl0ZVwiKVxuICAgICAgICAgICAgICAuc3R5bGUoXCJib3JkZXJcIiwgXCIycHggc29saWQgYmxhY2tcIilcbiAgICAgICAgICAgICAgLnN0eWxlKFwicGFkZGluZ1wiLCBcIjVweFwiKVxuICAgICAgICAgICAgICAuc3R5bGUoXCJib3JkZXItcmFkaXVzXCIsIFwiM3B4XCIpXG4gICAgICAgICAgICAgIC50ZXh0KGAke251dHJpZW50c1tpXX06ICR7ZH0lYCk7XG4gICAgICAgICAgfSlcbiAgICAgICAgICAub24oXCJtb3VzZW91dFwiLCBmdW5jdGlvbihkKSB7XG4gICAgICAgICAgICByZXR1cm4gdG9vbHRpcC5zdHlsZShcInZpc2liaWxpdHlcIiwgXCJoaWRkZW5cIik7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC5zbGlkZS1zdmctJHtpZHggLSAxfWApKSB7XG4gICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLnNsaWRlLXN2Zy0ke2lkeCAtIDF9YClcbiAgICAgICAgICAuY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuc2xpZGUtc3ZnLSR7aWR4ICsgMX1gKSkge1xuICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC5zbGlkZS1zdmctJHtpZHggKyAxfWApXG4gICAgICAgICAgLmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XG4gICAgICAgIH1cblxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGAuc2xpZGUtc3ZnLSR7aWR4fS1yZWN0YCkuZm9yRWFjaChyZWN0ID0+IHtcbiAgICAgICAgICByZWN0LmNsYXNzTGlzdC5hZGQoXCJjaGFydC1yZWN0XCIpO1xuICAgICAgICB9KTtcblxuICAgICAgICBkMy5zZWxlY3QoYC5zbGlkZS1zdmctJHtpZHh9LXktYXhpc2ApXG4gICAgICAgICAgLnRyYW5zaXRpb24oKVxuICAgICAgICAgIC5zdHlsZShcIm9wYWNpdHlcIiwgXCIxMDAlXCIpXG4gICAgICAgICAgLmR1cmF0aW9uKDUwMCk7XG5cbiAgICAgICAgbGV0IG5hdkNpcmNsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBuYXYtbGktJHtpZHh9YCk7XG4gICAgICAgIG5hdkNpcmNsZS5jbGFzc0xpc3QuYWRkKGBuYXYtbGktJHtpZHh9YCk7XG5cblxuXG4gICAgICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGAuc2xpZGUtc3ZnLSR7aWR4IC0gMX0tcmVjdGApKSB7XG4gICAgICAgICAgICBkb2N1bWVudFxuICAgICAgICAgICAgICAucXVlcnlTZWxlY3RvckFsbChgLnNsaWRlLXN2Zy0ke2lkeCAtIDF9LXJlY3RgKVxuICAgICAgICAgICAgICAuZm9yRWFjaChyZWN0ID0+IHtcbiAgICAgICAgICAgICAgICByZWN0LmNsYXNzTGlzdC5yZW1vdmUoXCJjaGFydC1yZWN0XCIpO1xuICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgZDMuc2VsZWN0KGAuc2xpZGUtc3ZnLSR7aWR4IC0gMX0teS1heGlzYClcbiAgICAgICAgICAgICAgLnRyYW5zaXRpb24oKVxuICAgICAgICAgICAgICAuc3R5bGUoXCJvcGFjaXR5XCIsIFwiMCVcIilcbiAgICAgICAgICAgICAgLmR1cmF0aW9uKDUwMCk7XG4gICAgICAgICAgICBcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgbmF2LWxpLSR7aWR4IC0gMX1gKSkge1xuICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBuYXYtbGktJHtpZHggLSAxfWApLmNsYXNzTGlzdC5yZW1vdmUoYG5hdi1saS0ke2lkeCAtIDF9YCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgLnNsaWRlLXN2Zy0ke2lkeCArIDF9LXJlY3RgKSkge1xuICAgICAgICAgICAgZG9jdW1lbnRcbiAgICAgICAgICAgICAgLnF1ZXJ5U2VsZWN0b3JBbGwoYC5zbGlkZS1zdmctJHtpZHggKyAxfS1yZWN0YClcbiAgICAgICAgICAgICAgLmZvckVhY2gocmVjdCA9PiB7XG4gICAgICAgICAgICAgICAgcmVjdC5jbGFzc0xpc3QucmVtb3ZlKFwiY2hhcnQtcmVjdFwiKTtcbiAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGQzLnNlbGVjdChgLnNsaWRlLXN2Zy0ke2lkeCArIDF9LXktYXhpc2ApXG4gICAgICAgICAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgICAgICAgICAgLnN0eWxlKFwib3BhY2l0eVwiLCBcIjAlXCIpXG4gICAgICAgICAgICAgIC5kdXJhdGlvbig1MDApO1xuXG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgbmF2LWxpLSR7aWR4ICsgMX1gKS5jbGFzc0xpc3QucmVtb3ZlKGBuYXYtbGktJHtpZHggKyAxfWApOyAgICAgICAgICAgICAgXG4gICAgICAgIH1cblxuICAgICAgICAgIFxuICAgICAgfVxuICAgIH0pO1xuICB9O1xuXG4gIGxldCBvYnNlcnZlciA9IG5ldyBJbnRlcnNlY3Rpb25PYnNlcnZlcihoYW5kbGVTY3JvbGxPbnRvLCBvcHRpb25zKTtcbiAgb2JzZXJ2ZXIub2JzZXJ2ZShzbGlkZSk7XG5cbn0iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW4iXSwic291cmNlUm9vdCI6IiJ9