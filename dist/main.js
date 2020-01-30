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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL2ZseWluZ19mb29kLmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL3Njcm9sbC9zbGlkZXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0eWxlcy9pbmRleC5zY3NzIl0sIm5hbWVzIjpbIm51dHJpdGlvbkRhdGEiLCJkMyIsImNzdiIsImQiLCJmb29kX25hbWUiLCJzZXJ2aW5nX3NpemUiLCJmaWJlciIsImlyb24iLCJtYWduZXNpdW0iLCJwb3Rhc3NpdW0iLCJ6aW5jIiwiZm9sYXRlIiwiY2hvbGVzdGVyb2wiLCJ0aGVuIiwiZGF0YSIsImNyZWF0ZVZpc3VhbGl6YXRpb24iLCJjcmVhdGVOYXZMaSIsImNyZWF0ZUFuY2hvciIsImkiLCJsZW5ndGgiLCJmb29kRGF0YSIsImlkeCIsImNyZWF0ZVhBeGlzQm9vbCIsIm1hcmdpbiIsInRvcCIsInJpZ2h0IiwiYm90dG9tIiwibGVmdCIsInciLCJoIiwiT2JqZWN0IiwidmFsdWVzIiwic2xpY2UiLCJudW1iZXJPZkNvbHVtbnMiLCJtYXhWYWx1ZSIsIk1hdGgiLCJtYXgiLCJ4X2F4aXNMZW5ndGgiLCJ5X2F4aXNMZW5ndGgiLCJ0YXJnZXRTVkciLCJ0YXJnZXRTbGlkZVJlY3QiLCJ4U2NhbGUiLCJzY2FsZUxpbmVhciIsImRvbWFpbiIsInJhbmdlIiwieVNjYWxlIiwic3ZnIiwic2VsZWN0IiwiYXBwZW5kIiwiYXR0ciIsInhBeGlzIiwiYXhpc0JvdHRvbSIsInRpY2tTaXplIiwidGlja0Zvcm1hdCIsImtleXMiLCJ0cmFuc2l0aW9uIiwiZHVyYXRpb24iLCJjYWxsIiwic2VsZWN0QWxsIiwic3R5bGUiLCJ0ZXh0IiwieUF4aXMiLCJheGlzTGVmdCIsInRpY2tzIiwiZW50ZXIiLCJ3aW5kb3ciLCJhZGRFdmVudExpc3RlbmVyIiwiZSIsInNsaWRlcyIsInNsaWRlTmFtZSIsIm5ld1NsaWRlIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwicHVzaCIsImNyZWF0ZU9ic2VydmVycyIsImFkZEFsbEZseWluZ0Zvb2RMaXN0ZW5lcnMiLCJmbHlpbmdGb29kSWRzIiwiZm9yRWFjaCIsImlkIiwiZ2V0RWxlbWVudEJ5SWQiLCJjbGFzc0xpc3QiLCJhZGQiLCJyZW1vdmUiLCJvcHRpb25zIiwicm9vdCIsInJvb3RNYXJnaW4iLCJ0aHJlc2hvbGQiLCJTbGlkZXMiLCJuYXZDb2x1bW4iLCJhbmNob3JMaW5rIiwiY3JlYXRlRWxlbWVudCIsInNldEF0dHJpYnV0ZSIsImFwcGVuZENoaWxkIiwibmF2TGkiLCJzbGlkZUNvbnRhaW5lciIsImFuY2hvclRhZyIsImZvb2RDb3VudGVycyIsImFkZEZseWluZ0Zvb2RMaXN0ZW5lciIsImZvb2RJY29uIiwianVzdENsaWNrZWQiLCJmbHlpbmdGb29kQ2xpY2tDYWxsYmFjayIsImZvb2RDaGlsZHJlbiIsImNoaWxkTm9kZXMiLCJzZXRUaW1lb3V0IiwicmVtb3ZlQ2hpbGQiLCJtb3ZlbWVudEZ1bmMiLCJuZXdGb29kIiwic3RhcnQiLCJzaWduZWRPbmVzIiwicmFuZG9tSWR4IiwiZmxvb3IiLCJyYW5kb20iLCJyYW5kb21seVNpZ25lZE9uZSIsInN0ZXAiLCJ0aW1lc3RhbXAiLCJwcm9ncmVzcyIsInRyYW5zZm9ybSIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsInRoaXNPbmVQYXJ0aWN1bGFyRm9vZCIsInNjcm9sbFkiLCJpbm5lcldpZHRoIiwicmVuZGVyU2xpZGUiLCJzbGlkZSIsImhhbmRsZVNjcm9sbE9udG8iLCJlbnRyaWVzIiwib2JzZXJ2ZXIiLCJlbnRyeSIsImlzSW50ZXJzZWN0aW5nIiwiY3VycmVudFNWRyIsInRvb2x0aXAiLCJudXRyaWVudHMiLCJvbiIsImV2ZW50IiwicGFnZVkiLCJwYWdlWCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJyZWN0IiwibmF2Q2lyY2xlIiwiSW50ZXJzZWN0aW9uT2JzZXJ2ZXIiLCJvYnNlcnZlIl0sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFFQSxJQUFJQSxhQUFKO0FBRUFDLEVBQUUsQ0FBQ0MsR0FBSCxDQUFPLGtDQUFQLEVBQTJDLFVBQUFDLENBQUMsRUFBSTtBQUM5QyxTQUFPO0FBQ0xDLGFBQVMsRUFBRUQsQ0FBQyxDQUFDLFdBQUQsQ0FEUDtBQUVMRSxnQkFBWSxFQUFFRixDQUFDLENBQUMsUUFBRCxDQUZWO0FBR0xHLFNBQUssRUFBRSxDQUFDSCxDQUFDLENBQUMsT0FBRCxDQUhKO0FBSUxJLFFBQUksRUFBRSxDQUFDSixDQUFDLENBQUMsTUFBRCxDQUpIO0FBS0xLLGFBQVMsRUFBRSxDQUFDTCxDQUFDLENBQUMsV0FBRCxDQUxSO0FBTUxNLGFBQVMsRUFBRSxDQUFDTixDQUFDLENBQUMsV0FBRCxDQU5SO0FBT0xPLFFBQUksRUFBRSxDQUFDUCxDQUFDLENBQUMsTUFBRCxDQVBIO0FBUUwsaUJBQWEsQ0FBQ0EsQ0FBQyxDQUFDLFdBQUQsQ0FSVjtBQVNMUSxVQUFNLEVBQUUsQ0FBQ1IsQ0FBQyxDQUFDLFFBQUQsQ0FUTDtBQVVMLG1CQUFlLENBQUNBLENBQUMsQ0FBQyxjQUFELENBVlo7QUFXTCxpQkFBYSxDQUFDQSxDQUFDLENBQUMsV0FBRCxDQVhWO0FBWUwsaUJBQWEsQ0FBQ0EsQ0FBQyxDQUFDLFdBQUQsQ0FaVjtBQWFMUyxlQUFXLEVBQUUsQ0FBQ1QsQ0FBQyxDQUFDLGFBQUQ7QUFiVixHQUFQO0FBZUQsQ0FoQkQsRUFnQkdVLElBaEJILENBZ0JRLFVBQUFDLElBQUksRUFBSTtBQUNaZCxlQUFhLEdBQUdjLElBQWhCO0FBRUFDLHFCQUFtQixDQUFDZixhQUFhLENBQUMsQ0FBRCxDQUFkLEVBQW1CLENBQW5CLEVBQXNCLElBQXRCLENBQW5CO0FBQ0FnQixhQUFXLENBQUMsQ0FBRCxDQUFYO0FBQ0FDLGNBQVksQ0FBQyxDQUFELENBQVo7O0FBRUEsT0FBSyxJQUFJQyxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHbEIsYUFBYSxDQUFDbUIsTUFBbEMsRUFBMENELENBQUMsRUFBM0MsRUFBK0M7QUFDN0NILHVCQUFtQixDQUFDZixhQUFhLENBQUNrQixDQUFELENBQWQsRUFBbUJBLENBQW5CLENBQW5CO0FBQ0FGLGVBQVcsQ0FBQ0UsQ0FBRCxDQUFYO0FBQ0FELGdCQUFZLENBQUNDLENBQUQsQ0FBWjtBQUNEO0FBRUosQ0E3QkQ7O0FBK0JBLElBQU1ILG1CQUFtQixHQUFHLFNBQXRCQSxtQkFBc0IsQ0FBQ0ssUUFBRCxFQUFXQyxHQUFYLEVBQWdCQyxlQUFoQixFQUFvQztBQUM5RCxNQUFJQyxNQUFNLEdBQUc7QUFBQ0MsT0FBRyxFQUFFLEVBQU47QUFBVUMsU0FBSyxFQUFFLEVBQWpCO0FBQXFCQyxVQUFNLEVBQUUsRUFBN0I7QUFBaUNDLFFBQUksRUFBRTtBQUF2QyxHQUFiO0FBQ0EsTUFBSUMsQ0FBQyxHQUFHLE1BQU1MLE1BQU0sQ0FBQ0ksSUFBYixHQUFvQkosTUFBTSxDQUFDRSxLQUFuQztBQUNBLE1BQUlJLENBQUMsR0FBRyxNQUFNTixNQUFNLENBQUNDLEdBQWIsR0FBbUJELE1BQU0sQ0FBQ0csTUFBbEM7QUFFQSxNQUFJWixJQUFJLEdBQUdnQixNQUFNLENBQUNDLE1BQVAsQ0FBY1gsUUFBZCxFQUF3QlksS0FBeEIsQ0FBOEIsQ0FBOUIsRUFBaUMsQ0FBQyxDQUFsQyxDQUFYO0FBQ0EsTUFBSUMsZUFBZSxHQUFHLEVBQXRCO0FBQ0EsTUFBSUMsUUFBUSxHQUFHQyxJQUFJLENBQUNDLEdBQUwsQ0FBUyxHQUFULEVBQWNuQyxFQUFFLENBQUNtQyxHQUFILENBQU90QixJQUFQLEVBQWEsVUFBU1gsQ0FBVCxFQUFZO0FBQ3BELFdBQVEsQ0FBQ0EsQ0FBRCxHQUFLLEdBQWI7QUFDRCxHQUY0QixDQUFkLENBQWY7QUFHQSxNQUFJa0MsWUFBWSxHQUFHVCxDQUFuQjtBQUNBLE1BQUlVLFlBQVksR0FBR1QsQ0FBbkI7QUFDQSxNQUFJVSxTQUFTLEdBQUcsZUFBZWxCLEdBQS9CO0FBQ0EsTUFBSW1CLGVBQWUsR0FBRyxlQUFlbkIsR0FBZixHQUFxQixPQUEzQztBQUVBLE1BQUlvQixNQUFNLEdBQUd4QyxFQUFFLENBQ1p5QyxXQURVLEdBRVZDLE1BRlUsQ0FFSCxDQUFDLENBQUQsRUFBSVYsZUFBSixDQUZHLEVBR1ZXLEtBSFUsQ0FHSixDQUFDLENBQUQsRUFBSWhCLENBQUosQ0FISSxDQUFiO0FBS0EsTUFBSWlCLE1BQU0sR0FBRzVDLEVBQUUsQ0FDWnlDLFdBRFUsR0FFVkMsTUFGVSxDQUVILENBQUMsQ0FBRCxFQUFJVCxRQUFKLENBRkcsRUFHVlUsS0FIVSxDQUdKLENBQUNmLENBQUMsR0FBR04sTUFBTSxDQUFDQyxHQUFaLEVBQWlCRCxNQUFNLENBQUNHLE1BQXhCLENBSEksQ0FBYjtBQUtBLE1BQUlvQixHQUFHLEdBQUc3QyxFQUFFLENBQ1Q4QyxNQURPLENBQ0EsTUFEQSxFQUVSO0FBRlEsR0FHUEMsTUFITyxDQUdBLEtBSEEsRUFJUEMsSUFKTyxDQUlGLE9BSkUsWUFJVVYsU0FKVixjQUtQVSxJQUxPLENBS0YsU0FMRSxpQkFNUEEsSUFOTyxDQU1GLHFCQU5FLEVBTXFCLGVBTnJCLENBQVYsQ0F6QjhELENBZ0M1RDtBQUNBOztBQUVGLE1BQUlDLEtBQUssR0FBR2pELEVBQUUsQ0FDWGtELFVBRFMsQ0FDRVYsTUFERixFQUVUVyxRQUZTLENBRUEsQ0FGQSxFQUdUQyxVQUhTLENBR0UsVUFBU2xELENBQVQsRUFBWTtBQUN0QixXQUFPMkIsTUFBTSxDQUFDd0IsSUFBUCxDQUFZbEMsUUFBWixFQUFzQlksS0FBdEIsQ0FBNEIsQ0FBNUIsRUFBK0IsQ0FBQyxDQUFoQyxFQUFtQzdCLENBQW5DLENBQVA7QUFDRCxHQUxTLENBQVo7QUFPRTJDLEtBQUcsQ0FDQUUsTUFESCxDQUNVLEdBRFYsRUFFR0MsSUFGSCxDQUVRLE9BRlIsWUFFb0JWLFNBRnBCLHFCQUdHVSxJQUhILENBSUksV0FKSixFQUtJLGVBQWUxQixNQUFNLENBQUNJLElBQXRCLEdBQTZCLElBQTdCLElBQXFDRSxDQUFDLEdBQUdOLE1BQU0sQ0FBQ0MsR0FBaEQsSUFBdUQsR0FMM0QsRUFPRytCLFVBUEgsR0FRR0MsUUFSSCxDQVFZLElBUlosRUFTR0MsSUFUSCxDQVNRUCxLQVRSO0FBV0FKLEtBQUcsQ0FBQ1ksU0FBSixDQUFjLGNBQWQsRUFBOEJULElBQTlCLENBQW1DLFdBQW5DLEVBQWdELFVBQVM5QyxDQUFULEVBQVk7QUFDMUQsV0FBTyw4QkFBUDtBQUNELEdBRkQ7QUFJQTJDLEtBQUcsQ0FDQUUsTUFESCxDQUNVLE1BRFYsRUFFR0MsSUFGSCxDQUVRLFdBRlIsRUFFcUIsYUFGckIsRUFHR0EsSUFISCxDQUdRLE9BSFIsRUFHaUIsY0FIakIsRUFJR0EsSUFKSCxDQUlRLEdBSlIsRUFJYSxDQUpiLEVBS0dBLElBTEgsQ0FLUSxHQUxSLEVBS2EsSUFBSXBCLENBQUMsR0FBRyxDQUxyQixFQU1Hb0IsSUFOSCxDQU1RLElBTlIsRUFNYyxLQU5kLEVBT0dVLEtBUEgsQ0FPUyxhQVBULEVBT3dCLFFBUHhCLEVBUUdDLElBUkgsQ0FRUSxnREFSUjtBQVVBZCxLQUFHLENBQ0FFLE1BREgsQ0FDVSxNQURWLEVBRUdDLElBRkgsQ0FFUSxPQUZSLEVBRWlCLGFBRmpCLEVBR0dBLElBSEgsQ0FHUSxXQUhSLEVBSUksb0JBQ0NwQixDQUFDLEdBQUdOLE1BQU0sQ0FBQ0MsR0FBWCxHQUFpQixFQURsQixJQUN3QixHQUw1QixFQU1HbUMsS0FOSCxDQU1TLGFBTlQsRUFNd0IsTUFOeEIsRUFPR0MsSUFQSCxDQU9RLGNBUFI7QUFTRixNQUFJQyxLQUFLLEdBQUc1RCxFQUFFLENBQUM2RCxRQUFILENBQVlqQixNQUFaLEVBQW9Ca0IsS0FBcEIsQ0FBMEIsQ0FBMUIsRUFBNkIsR0FBN0IsQ0FBWjtBQUVBakIsS0FBRyxDQUNBRSxNQURILENBQ1UsR0FEVixFQUVHQyxJQUZILENBRVEsT0FGUixZQUVvQlYsU0FGcEIscUJBR0dVLElBSEgsQ0FHUSxXQUhSLEVBR3FCLGVBQWUxQixNQUFNLENBQUNJLElBQXRCLEdBQTZCLEtBSGxELEVBSUdnQyxLQUpILENBSVMsU0FKVCxFQUlvQixJQUpwQixFQUtHRixJQUxILENBS1FJLEtBTFI7QUFPQWYsS0FBRyxDQUNBWSxTQURILENBQ2EsTUFEYixFQUVHNUMsSUFGSCxDQUVRQSxJQUZSLEVBR0drRCxLQUhILEdBSUdoQixNQUpILENBSVUsTUFKVixFQUtHQyxJQUxILENBS1EsT0FMUixZQUtvQlQsZUFMcEIsR0FNR1MsSUFOSCxDQU1RLEdBTlIsRUFNYSxVQUFTOUMsQ0FBVCxFQUFZZSxDQUFaLEVBQWU7QUFDeEIsV0FBT0EsQ0FBQyxJQUFJbUIsWUFBWSxHQUFHSixlQUFuQixDQUFELEdBQXVDVixNQUFNLENBQUNJLElBQTlDLEdBQXFELEVBQTVEO0FBQ0QsR0FSSCxFQVNHc0IsSUFUSCxDQVNRLEdBVFIsRUFTYSxVQUFTOUMsQ0FBVCxFQUFZO0FBQ3JCLFdBQU8wQyxNQUFNLENBQUMxQyxDQUFDLEdBQUcsR0FBTCxDQUFiO0FBQ0QsR0FYSCxFQVlHOEMsSUFaSCxDQVlRLE9BWlIsRUFZaUJaLFlBQVksR0FBR0osZUFBZixHQUFpQyxDQVpsRCxFQWFHZ0IsSUFiSCxDQWFRLFFBYlIsRUFha0IsVUFBUzlDLENBQVQsRUFBWTtBQUMxQixXQUFPMEIsQ0FBQyxHQUFHZ0IsTUFBTSxDQUFDMUMsQ0FBQyxHQUFHLEdBQUwsQ0FBVixHQUFzQm9CLE1BQU0sQ0FBQ0MsR0FBcEM7QUFDRCxHQWZILEVBZ0JHK0IsVUFoQkgsR0FpQkdDLFFBakJILENBaUJZLEdBakJaO0FBbUJELENBeEdEOztBQTBHQVMsTUFBTSxDQUFDQyxnQkFBUCxDQUF3QixNQUF4QixFQUFnQyxVQUFDQyxDQUFELEVBQU87QUFFbkMsTUFBSUMsTUFBTSxHQUFHLEVBQWI7O0FBQ0EsT0FBSyxJQUFJbEQsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBRyxFQUFwQixFQUF3QkEsQ0FBQyxFQUF6QixFQUE2QjtBQUN6QixRQUFJbUQsU0FBUyxHQUFHLHNCQUFzQm5ELENBQXRDO0FBQ0EsUUFBSW9ELFFBQVEsR0FBR0MsUUFBUSxDQUFDQyxhQUFULENBQXVCSCxTQUF2QixDQUFmO0FBQ0FELFVBQU0sQ0FBQ0ssSUFBUCxDQUFZSCxRQUFaO0FBQ0g7O0FBQ0RJLGlCQUFlLENBQUNOLE1BQUQsQ0FBZjtBQUNILENBVEQsRUFTRyxLQVRIO0FBWUFHLFFBQVEsQ0FBQ0wsZ0JBQVQsQ0FBMEIsa0JBQTFCLEVBQThDLFlBQU07QUFFaERTLHNFQUF5QjtBQUV6QixNQUFNQyxhQUFhLEdBQUcsQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVAsRUFBVSxDQUFWLEVBQWEsQ0FBYixFQUFnQixDQUFoQixFQUFtQixDQUFuQixFQUFzQixDQUF0QixFQUF5QixFQUF6QixFQUE2QixFQUE3QixFQUFpQyxFQUFqQyxFQUFxQyxFQUFyQyxFQUF5QyxFQUF6QyxFQUE2QyxFQUE3QyxDQUF0QjtBQUVBQSxlQUFhLENBQUNDLE9BQWQsQ0FBc0IsVUFBQUMsRUFBRSxFQUFJO0FBQzFCUCxZQUFRLENBQUNRLGNBQVQsOEJBQThDRCxFQUE5QyxHQUFvRFosZ0JBQXBELENBQXFFLFdBQXJFLEVBQWtGLFlBQU07QUFDdEZLLGNBQVEsQ0FBQ1EsY0FBVCx3QkFBd0NELEVBQXhDLEdBQThDRSxTQUE5QyxDQUF3REMsR0FBeEQsQ0FBNEQsTUFBNUQ7QUFDRCxLQUZEO0FBSUFWLFlBQVEsQ0FBQ1EsY0FBVCw4QkFBOENELEVBQTlDLEdBQW9EWixnQkFBcEQsQ0FBcUUsVUFBckUsRUFBaUYsWUFBTTtBQUNyRkssY0FBUSxDQUFDUSxjQUFULHdCQUF3Q0QsRUFBeEMsR0FBOENFLFNBQTlDLENBQXdERSxNQUF4RCxDQUErRCxNQUEvRDtBQUNELEtBRkQ7QUFJRCxHQVREO0FBV0gsQ0FqQkQ7O0FBbUJBLElBQU1SLGVBQWUsR0FBRyxTQUFsQkEsZUFBa0IsQ0FBQ04sTUFBRCxFQUFZO0FBRWhDLE1BQUllLE9BQU8sR0FBRztBQUNaQyxRQUFJLEVBQUUsSUFETTtBQUVaQyxjQUFVLEVBQUUsaUJBRkE7QUFHWkMsYUFBUyxFQUFFO0FBSEMsR0FBZDs7QUFNQSxPQUFLLElBQUlwRSxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHa0QsTUFBTSxDQUFDakQsTUFBUCxHQUFnQixDQUFwQyxFQUF1Q0QsQ0FBQyxFQUF4QyxFQUE0QztBQUMxQ3FFLHNFQUFBLENBQW1CSixPQUFuQixFQUE0QmYsTUFBTSxDQUFDbEQsQ0FBRCxDQUFsQyxFQUF1Q0EsQ0FBdkM7QUFDRDtBQUVKLENBWkQ7O0FBY0EsSUFBTUYsV0FBVyxHQUFHLFNBQWRBLFdBQWMsQ0FBQ0ssR0FBRCxFQUFTO0FBQzNCLE1BQUltRSxTQUFTLEdBQUdqQixRQUFRLENBQUNDLGFBQVQsQ0FBdUIsYUFBdkIsQ0FBaEI7QUFFQSxNQUFJaUIsVUFBVSxHQUFHbEIsUUFBUSxDQUFDbUIsYUFBVCxDQUF1QixHQUF2QixDQUFqQjtBQUNBRCxZQUFVLENBQUNFLFlBQVgsQ0FBd0IsTUFBeEIsb0JBQTJDdEUsR0FBM0M7QUFDQW1FLFdBQVMsQ0FBQ0ksV0FBVixDQUFzQkgsVUFBdEI7QUFFQSxNQUFJSSxLQUFLLEdBQUd0QixRQUFRLENBQUNtQixhQUFULENBQXVCLElBQXZCLENBQVo7QUFDQUcsT0FBSyxDQUFDRixZQUFOLENBQW1CLElBQW5CLG1CQUFtQ3RFLEdBQW5DO0FBQ0F3RSxPQUFLLENBQUNiLFNBQU4sQ0FBZ0JDLEdBQWhCLENBQW9CLFFBQXBCO0FBQ0FRLFlBQVUsQ0FBQ0csV0FBWCxDQUF1QkMsS0FBdkI7QUFFRCxDQVpEOztBQWNBLElBQU01RSxZQUFZLEdBQUcsU0FBZkEsWUFBZSxDQUFDSSxHQUFELEVBQVM7QUFDNUIsTUFBSXlFLGNBQWMsR0FBR3ZCLFFBQVEsQ0FBQ1EsY0FBVCwyQkFBMkMxRCxHQUEzQyxFQUFyQjtBQUVBLE1BQUkwRSxTQUFTLEdBQUd4QixRQUFRLENBQUNtQixhQUFULENBQXVCLEdBQXZCLENBQWhCO0FBQ0FLLFdBQVMsQ0FBQ0osWUFBVixDQUF1QixJQUF2QixtQkFBdUN0RSxHQUF2QztBQUNBMEUsV0FBUyxDQUFDZixTQUFWLENBQW9CQyxHQUFwQixDQUF3QixRQUF4QjtBQUVBYSxnQkFBYyxDQUFDRixXQUFmLENBQTJCRyxTQUEzQjtBQUNELENBUkQsQzs7Ozs7Ozs7Ozs7O0FDMU1JO0FBQUEsSUFBTXBCLHlCQUF5QixHQUFHLFNBQTVCQSx5QkFBNEIsR0FBTTtBQUVwQyxNQUFJcUIsWUFBWSxHQUFHLEVBQW5COztBQUVBLE1BQU1DLHFCQUFxQixHQUFHLFNBQXhCQSxxQkFBd0IsQ0FBQTVFLEdBQUcsRUFBSTtBQUNqQyxRQUFJNkUsUUFBUSxHQUFHM0IsUUFBUSxDQUFDUSxjQUFULDhCQUE4QzFELEdBQTlDLEVBQWY7QUFFQSxRQUFJOEUsV0FBVyxHQUFHLEtBQWxCOztBQUVBLFFBQU1DLHVCQUF1QixHQUFHLFNBQTFCQSx1QkFBMEIsQ0FBQWpDLENBQUMsRUFBSTtBQUNqQyxVQUFJZ0MsV0FBSixFQUFpQixDQUNoQixDQURELE1BQ087QUFDSEQsZ0JBQVEsQ0FBQ2xCLFNBQVQsQ0FBbUJFLE1BQW5CLENBQTBCLDJCQUExQjtBQUNBZ0IsZ0JBQVEsQ0FBQ2xCLFNBQVQsQ0FBbUJDLEdBQW5CLENBQXVCLDRCQUF2QjtBQUNBVixnQkFBUSxDQUFDUSxjQUFULHdCQUF3QzFELEdBQXhDLEdBQStDMkQsU0FBL0MsQ0FBeURFLE1BQXpELENBQWdFLE1BQWhFO0FBRUosWUFBSW1CLFlBQVksR0FBR0gsUUFBUSxDQUFDSSxVQUE1QjtBQUVBckMsY0FBTSxDQUFDc0MsVUFBUCxDQUFrQixZQUFNO0FBQ3BCLGNBQUlGLFlBQVksQ0FBQyxDQUFELENBQWhCLEVBQXFCO0FBQ2pCLGlCQUFLLElBQUluRixDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHLEVBQXBCLEVBQXdCQSxDQUFDLEVBQXpCLEVBQTZCO0FBQ3pCZ0Ysc0JBQVEsQ0FBQ00sV0FBVCxDQUFxQkgsWUFBWSxDQUFDLENBQUQsQ0FBakM7QUFDSDtBQUNKO0FBQ0osU0FORCxFQU1HLElBTkg7O0FBUUEsWUFBSUksWUFBWSxHQUFHLFNBQWZBLFlBQWUsQ0FBQUMsT0FBTyxFQUFJO0FBQzFCLGNBQUlDLEtBQUssR0FBRyxJQUFaO0FBRUEsY0FBSUMsVUFBVSxHQUFHLENBQUMsQ0FBQyxDQUFGLEVBQUssQ0FBTCxDQUFqQjtBQUNBLGNBQUlDLFNBQVMsR0FBRzFFLElBQUksQ0FBQzJFLEtBQUwsQ0FBVzNFLElBQUksQ0FBQzRFLE1BQUwsS0FBZ0IsQ0FBM0IsQ0FBaEI7QUFDQSxjQUFJQyxpQkFBaUIsR0FBR0osVUFBVSxDQUFDQyxTQUFELENBQWxDOztBQUVBLGNBQU1JLElBQUksR0FBRyxTQUFQQSxJQUFPLENBQUFDLFNBQVMsRUFBSTtBQUN0QixnQkFBSSxDQUFDUCxLQUFMLEVBQVlBLEtBQUssR0FBR08sU0FBUjtBQUNaLGdCQUFJQyxRQUFRLEdBQUdELFNBQVMsR0FBR1AsS0FBM0I7QUFDQUQsbUJBQU8sQ0FBQy9DLEtBQVIsQ0FBY3lELFNBQWQsR0FBMEIsZUFBZ0JELFFBQVEsR0FBR0gsaUJBQTNCLEdBQWdELE1BQWhELEdBQXlERyxRQUF6RCxHQUFvRSxLQUE5Rjs7QUFDQSxnQkFBSUEsUUFBUSxHQUFHLElBQWYsRUFBcUI7QUFDakJsRCxvQkFBTSxDQUFDb0QscUJBQVAsQ0FBNkJKLElBQTdCO0FBQ0g7QUFDSixXQVBEOztBQVNBaEQsZ0JBQU0sQ0FBQ29ELHFCQUFQLENBQTZCSixJQUE3QjtBQUNILFNBakJEOztBQW1CQSxhQUFLLElBQUkvRixDQUFDLEdBQUc4RSxZQUFZLENBQUMzRSxHQUFELENBQXpCLEVBQWdDSCxDQUFDLEdBQUc4RSxZQUFZLENBQUMzRSxHQUFELENBQVosR0FBb0IsRUFBeEQsRUFBNERILENBQUMsRUFBN0QsRUFBaUU7QUFDN0QsY0FBSXdGLE9BQU8sR0FBR25DLFFBQVEsQ0FBQ21CLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBZDtBQUNBZ0IsaUJBQU8sQ0FBQ2YsWUFBUixDQUFxQixJQUFyQixnQ0FBa0R0RSxHQUFsRCxjQUF5REgsQ0FBekQ7QUFDQXdGLGlCQUFPLENBQUMxQixTQUFSLENBQWtCQyxHQUFsQix1QkFBcUM1RCxHQUFyQztBQUNBcUYsaUJBQU8sQ0FBQzFCLFNBQVIsQ0FBa0JDLEdBQWxCO0FBQ0FpQixrQkFBUSxDQUFDTixXQUFULENBQXFCYyxPQUFyQjtBQUVBLGNBQUlZLHFCQUFxQixHQUFHL0MsUUFBUSxDQUFDUSxjQUFULCtCQUNEMUQsR0FEQyxjQUNNSCxDQUROLEVBQTVCO0FBR0FvRywrQkFBcUIsQ0FBQzNELEtBQXRCLENBQTRCbkMsR0FBNUIsR0FBbUNXLElBQUksQ0FBQzRFLE1BQUwsS0FBZ0IsQ0FBQyxHQUFsQixHQUF5QjlDLE1BQU0sQ0FBQ3NELE9BQWhDLEdBQTBDLElBQTVFO0FBQ0FELCtCQUFxQixDQUFDM0QsS0FBdEIsQ0FBNEJoQyxJQUE1QixHQUNJUSxJQUFJLENBQUMyRSxLQUFMLENBQVczRSxJQUFJLENBQUM0RSxNQUFMLEtBQWdCOUMsTUFBTSxDQUFDdUQsVUFBbEMsSUFBZ0QsSUFEcEQ7QUFHQWYsc0JBQVksQ0FBQ2EscUJBQUQsQ0FBWjtBQUNIOztBQUVEdEIsb0JBQVksQ0FBQzNFLEdBQUQsQ0FBWixJQUFxQixFQUFyQjtBQUVBOEUsbUJBQVcsR0FBRyxJQUFkO0FBQ0FsQyxjQUFNLENBQUNzQyxVQUFQLENBQWtCLFlBQU07QUFDcEJKLHFCQUFXLEdBQUcsS0FBZDtBQUNBRCxrQkFBUSxDQUFDbEIsU0FBVCxDQUFtQkUsTUFBbkIsQ0FBMEIsNEJBQTFCO0FBQ0FnQixrQkFBUSxDQUFDbEIsU0FBVCxDQUFtQkMsR0FBbkIsQ0FBdUIsMkJBQXZCO0FBQ0gsU0FKRCxFQUlHLElBSkg7QUFLQztBQUNKLEtBOUREOztBQWdFQWlCLFlBQVEsQ0FBQ2hDLGdCQUFULENBQTBCLE9BQTFCLEVBQW1Da0MsdUJBQW5DO0FBRUgsR0F2RUQ7O0FBeUVBLE9BQUssSUFBSWxGLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUcsRUFBcEIsRUFBd0JBLENBQUMsRUFBekIsRUFBNkI7QUFDekI4RSxnQkFBWSxDQUFDOUUsQ0FBRCxDQUFaLEdBQWtCLENBQWxCO0FBQ0ErRSx5QkFBcUIsQ0FBQy9FLENBQUQsQ0FBckI7QUFDSDtBQUlKLENBcEZEOztBQXNGZXlELHdGQUFmLEU7Ozs7Ozs7Ozs7OztBQ3RGSjtBQUFBO0FBQU8sSUFBTThDLFdBQVcsR0FBRyxTQUFkQSxXQUFjLENBQUN0QyxPQUFELEVBQVV1QyxLQUFWLEVBQWlCckcsR0FBakIsRUFBeUI7QUFFbEQsTUFBTXNHLGdCQUFnQixHQUFHLFNBQW5CQSxnQkFBbUIsQ0FBQ0MsT0FBRCxFQUFVQyxRQUFWLEVBQXVCO0FBQzlDRCxXQUFPLENBQUMvQyxPQUFSLENBQWdCLFVBQUFpRCxLQUFLLEVBQUk7QUFDdkIsVUFBSUEsS0FBSyxDQUFDQyxjQUFWLEVBQTBCO0FBRXhCeEQsZ0JBQVEsQ0FBQ0MsYUFBVCxzQkFBcUNuRCxHQUFyQyxHQUNHMkQsU0FESCxDQUNhRSxNQURiLENBQ29CLFFBRHBCO0FBR0EsWUFBSThDLFVBQVUsR0FBRy9ILEVBQUUsQ0FBQzhDLE1BQUgsc0JBQXdCMUIsR0FBeEIsRUFBakI7QUFFQSxZQUFJNEcsT0FBTyxHQUFHaEksRUFBRSxDQUNiOEMsTUFEVyxDQUNKLE1BREksRUFFWEMsTUFGVyxDQUVKLEtBRkksRUFHWFcsS0FIVyxDQUdMLFVBSEssRUFHTyxVQUhQLEVBSVhBLEtBSlcsQ0FJTCxXQUpLLEVBSVEsTUFKUixFQUtYQSxLQUxXLENBS0wsU0FMSyxFQUtNLElBTE4sRUFNWEEsS0FOVyxDQU1MLFlBTkssRUFNUyxRQU5ULENBQWQ7QUFRQSxZQUFNdUUsU0FBUyxHQUFHLENBQUMsT0FBRCxFQUFVLE1BQVYsRUFBa0IsV0FBbEIsRUFBK0IsV0FBL0IsRUFBNEMsTUFBNUMsRUFBb0QsV0FBcEQsRUFBaUUsUUFBakUsRUFBMkUsYUFBM0UsRUFBMEYsV0FBMUYsRUFBdUcsV0FBdkcsQ0FBbEI7QUFFQUYsa0JBQVUsQ0FDUHRFLFNBREgsQ0FDYSxNQURiLEVBRUd5RSxFQUZILENBRU0sV0FGTixFQUVtQixVQUFTaEksQ0FBVCxFQUFZO0FBQzNCLGlCQUFPOEgsT0FBTyxDQUFDdEUsS0FBUixDQUFjLFlBQWQsRUFBNEIsU0FBNUIsQ0FBUDtBQUNELFNBSkgsRUFLR3dFLEVBTEgsQ0FLTSxXQUxOLEVBS21CLFVBQVNoSSxDQUFULEVBQVllLENBQVosRUFBZTtBQUM5QixpQkFBTytHLE9BQU8sQ0FDWHRFLEtBREksQ0FDRSxLQURGLEVBQ1N5RSxLQUFLLENBQUNDLEtBQU4sR0FBYyxFQUFkLEdBQW1CLElBRDVCLEVBRUoxRSxLQUZJLENBRUUsTUFGRixFQUVVeUUsS0FBSyxDQUFDRSxLQUFOLEdBQWMsRUFBZCxHQUFtQixJQUY3QixFQUdKM0UsS0FISSxDQUdFLGtCQUhGLEVBR3NCLE9BSHRCLEVBSUpBLEtBSkksQ0FJRSxRQUpGLEVBSVksaUJBSlosRUFLSkEsS0FMSSxDQUtFLFNBTEYsRUFLYSxLQUxiLEVBTUpBLEtBTkksQ0FNRSxlQU5GLEVBTW1CLEtBTm5CLEVBT0pDLElBUEksV0FPSXNFLFNBQVMsQ0FBQ2hILENBQUQsQ0FQYixlQU9xQmYsQ0FQckIsT0FBUDtBQVFELFNBZEgsRUFlR2dJLEVBZkgsQ0FlTSxVQWZOLEVBZWtCLFVBQVNoSSxDQUFULEVBQVk7QUFDMUIsaUJBQU84SCxPQUFPLENBQUN0RSxLQUFSLENBQWMsWUFBZCxFQUE0QixRQUE1QixDQUFQO0FBQ0QsU0FqQkg7O0FBbUJBLFlBQUlZLFFBQVEsQ0FBQ0MsYUFBVCxzQkFBcUNuRCxHQUFHLEdBQUcsQ0FBM0MsRUFBSixFQUFxRDtBQUNuRGtELGtCQUFRLENBQUNDLGFBQVQsc0JBQXFDbkQsR0FBRyxHQUFHLENBQTNDLEdBQ0MyRCxTQURELENBQ1dDLEdBRFgsQ0FDZSxRQURmO0FBRUQ7O0FBRUQsWUFBSVYsUUFBUSxDQUFDQyxhQUFULHNCQUFxQ25ELEdBQUcsR0FBRyxDQUEzQyxFQUFKLEVBQXFEO0FBQ25Ea0Qsa0JBQVEsQ0FBQ0MsYUFBVCxzQkFBcUNuRCxHQUFHLEdBQUcsQ0FBM0MsR0FDQzJELFNBREQsQ0FDV0MsR0FEWCxDQUNlLFFBRGY7QUFFRDs7QUFFRFYsZ0JBQVEsQ0FBQ2dFLGdCQUFULHNCQUF3Q2xILEdBQXhDLFlBQW9Ed0QsT0FBcEQsQ0FBNEQsVUFBQTJELElBQUksRUFBSTtBQUNsRUEsY0FBSSxDQUFDeEQsU0FBTCxDQUFlQyxHQUFmLENBQW1CLFlBQW5CO0FBQ0QsU0FGRDtBQUlBaEYsVUFBRSxDQUFDOEMsTUFBSCxzQkFBd0IxQixHQUF4QixjQUNHa0MsVUFESCxHQUVHSSxLQUZILENBRVMsU0FGVCxFQUVvQixNQUZwQixFQUdHSCxRQUhILENBR1ksR0FIWjtBQUtBLFlBQUlpRixTQUFTLEdBQUdsRSxRQUFRLENBQUNRLGNBQVQsa0JBQWtDMUQsR0FBbEMsRUFBaEI7QUFDQW9ILGlCQUFTLENBQUN6RCxTQUFWLENBQW9CQyxHQUFwQixrQkFBa0M1RCxHQUFsQzs7QUFJQSxZQUFJa0QsUUFBUSxDQUFDZ0UsZ0JBQVQsc0JBQXdDbEgsR0FBRyxHQUFHLENBQTlDLFdBQUosRUFBNkQ7QUFDekRrRCxrQkFBUSxDQUNMZ0UsZ0JBREgsc0JBQ2tDbEgsR0FBRyxHQUFHLENBRHhDLFlBRUd3RCxPQUZILENBRVcsVUFBQTJELElBQUksRUFBSTtBQUNmQSxnQkFBSSxDQUFDeEQsU0FBTCxDQUFlRSxNQUFmLENBQXNCLFlBQXRCO0FBQ0QsV0FKSDtBQU1BakYsWUFBRSxDQUFDOEMsTUFBSCxzQkFBd0IxQixHQUFHLEdBQUcsQ0FBOUIsY0FDR2tDLFVBREgsR0FFR0ksS0FGSCxDQUVTLFNBRlQsRUFFb0IsSUFGcEIsRUFHR0gsUUFISCxDQUdZLEdBSFo7QUFLSDs7QUFFRCxZQUFJZSxRQUFRLENBQUNRLGNBQVQsa0JBQWtDMUQsR0FBRyxHQUFHLENBQXhDLEVBQUosRUFBa0Q7QUFDaERrRCxrQkFBUSxDQUFDUSxjQUFULGtCQUFrQzFELEdBQUcsR0FBRyxDQUF4QyxHQUE2QzJELFNBQTdDLENBQXVERSxNQUF2RCxrQkFBd0U3RCxHQUFHLEdBQUcsQ0FBOUU7QUFDRDs7QUFFRCxZQUFJa0QsUUFBUSxDQUFDZ0UsZ0JBQVQsc0JBQXdDbEgsR0FBRyxHQUFHLENBQTlDLFdBQUosRUFBNkQ7QUFDekRrRCxrQkFBUSxDQUNMZ0UsZ0JBREgsc0JBQ2tDbEgsR0FBRyxHQUFHLENBRHhDLFlBRUd3RCxPQUZILENBRVcsVUFBQTJELElBQUksRUFBSTtBQUNmQSxnQkFBSSxDQUFDeEQsU0FBTCxDQUFlRSxNQUFmLENBQXNCLFlBQXRCO0FBQ0QsV0FKSDtBQU1BakYsWUFBRSxDQUFDOEMsTUFBSCxzQkFBd0IxQixHQUFHLEdBQUcsQ0FBOUIsY0FDR2tDLFVBREgsR0FFR0ksS0FGSCxDQUVTLFNBRlQsRUFFb0IsSUFGcEIsRUFHR0gsUUFISCxDQUdZLEdBSFo7QUFLQWUsa0JBQVEsQ0FBQ1EsY0FBVCxrQkFBa0MxRCxHQUFHLEdBQUcsQ0FBeEMsR0FBNkMyRCxTQUE3QyxDQUF1REUsTUFBdkQsa0JBQXdFN0QsR0FBRyxHQUFHLENBQTlFO0FBQ0g7QUFHRjtBQUNGLEtBaEdEO0FBaUdELEdBbEdEOztBQW9HQSxNQUFJd0csUUFBUSxHQUFHLElBQUlhLG9CQUFKLENBQXlCZixnQkFBekIsRUFBMkN4QyxPQUEzQyxDQUFmO0FBQ0EwQyxVQUFRLENBQUNjLE9BQVQsQ0FBaUJqQixLQUFqQjtBQUVELENBekdNLEM7Ozs7Ozs7Ozs7O0FDQVAsdUMiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL2Rpc3QvXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LmpzXCIpO1xuIiwiaW1wb3J0ICcuL3N0eWxlcy9pbmRleC5zY3NzJztcbmltcG9ydCAqIGFzIFNsaWRlcyBmcm9tICcuL3NjcmlwdHMvc2Nyb2xsL3NsaWRlcyc7XG5pbXBvcnQgYWRkQWxsRmx5aW5nRm9vZExpc3RlbmVycyBmcm9tICcuL3NjcmlwdHMvZmx5aW5nX2Zvb2QnO1xuXG5sZXQgbnV0cml0aW9uRGF0YTtcblxuZDMuY3N2KFwibnV0cml0aW9uX2ZhY3RzX2Zvcl9zY3JvbGxlci5jc3ZcIiwgZCA9PiB7XG4gIHJldHVybiB7XG4gICAgZm9vZF9uYW1lOiBkW1wiRm9vZCBuYW1lXCJdLFxuICAgIHNlcnZpbmdfc2l6ZTogZFtcIkFtb3VudFwiXSxcbiAgICBmaWJlcjogK2RbXCJGaWJlclwiXSxcbiAgICBpcm9uOiArZFtcIklyb25cIl0sXG4gICAgbWFnbmVzaXVtOiArZFtcIk1hZ25lc2l1bVwiXSxcbiAgICBwb3Rhc3NpdW06ICtkW1wiUG90YXNzaXVtXCJdLFxuICAgIHppbmM6ICtkW1wiWmluY1wiXSxcbiAgICBcInZpdGFtaW4gQ1wiOiArZFtcIlZpdGFtaW4gQ1wiXSxcbiAgICBmb2xhdGU6ICtkW1wiRm9sYXRlXCJdLFxuICAgIFwidml0YW1pbiBCMTJcIjogK2RbXCJWaXRhbWluIEItMTJcIl0sXG4gICAgXCJ2aXRhbWluIEFcIjogK2RbXCJWaXRhbWluIEFcIl0sXG4gICAgXCJ2aXRhbWluIERcIjogK2RbXCJWaXRhbWluIERcIl0sXG4gICAgY2hvbGVzdGVyb2w6ICtkW1wiQ2hvbGVzdGVyb2xcIl1cbiAgfTtcbn0pLnRoZW4oZGF0YSA9PiB7XG4gICAgbnV0cml0aW9uRGF0YSA9IGRhdGE7XG4gICAgXG4gICAgY3JlYXRlVmlzdWFsaXphdGlvbihudXRyaXRpb25EYXRhWzBdLCAwLCB0cnVlKTtcbiAgICBjcmVhdGVOYXZMaSgwKTtcbiAgICBjcmVhdGVBbmNob3IoMCk7XG4gICAgXG4gICAgZm9yIChsZXQgaSA9IDE7IGkgPCBudXRyaXRpb25EYXRhLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjcmVhdGVWaXN1YWxpemF0aW9uKG51dHJpdGlvbkRhdGFbaV0sIGkpO1xuICAgICAgY3JlYXRlTmF2TGkoaSk7XG4gICAgICBjcmVhdGVBbmNob3IoaSk7XG4gICAgfVxuXG59KTtcblxuY29uc3QgY3JlYXRlVmlzdWFsaXphdGlvbiA9IChmb29kRGF0YSwgaWR4LCBjcmVhdGVYQXhpc0Jvb2wpID0+IHtcbiAgbGV0IG1hcmdpbiA9IHt0b3A6IDIwLCByaWdodDogNDAsIGJvdHRvbTogMjUsIGxlZnQ6IDYwfVxuICBsZXQgdyA9IDYwMCAtIG1hcmdpbi5sZWZ0IC0gbWFyZ2luLnJpZ2h0O1xuICBsZXQgaCA9IDQ3NSAtIG1hcmdpbi50b3AgLSBtYXJnaW4uYm90dG9tO1xuXG4gIGxldCBkYXRhID0gT2JqZWN0LnZhbHVlcyhmb29kRGF0YSkuc2xpY2UoMiwgLTEpO1xuICBsZXQgbnVtYmVyT2ZDb2x1bW5zID0gMTA7XG4gIGxldCBtYXhWYWx1ZSA9IE1hdGgubWF4KC41MCwgZDMubWF4KGRhdGEsIGZ1bmN0aW9uKGQpIHtcbiAgICByZXR1cm4gKCtkIC8gMTAwKTtcbiAgfSkpO1xuICBsZXQgeF9heGlzTGVuZ3RoID0gdztcbiAgbGV0IHlfYXhpc0xlbmd0aCA9IGg7XG4gIGxldCB0YXJnZXRTVkcgPSBcInNsaWRlLXN2Zy1cIiArIGlkeDtcbiAgbGV0IHRhcmdldFNsaWRlUmVjdCA9IFwic2xpZGUtc3ZnLVwiICsgaWR4ICsgXCItcmVjdFwiO1xuXG4gIGxldCB4U2NhbGUgPSBkM1xuICAgIC5zY2FsZUxpbmVhcigpXG4gICAgLmRvbWFpbihbMCwgbnVtYmVyT2ZDb2x1bW5zXSlcbiAgICAucmFuZ2UoWzAsIHddKTtcblxuICBsZXQgeVNjYWxlID0gZDNcbiAgICAuc2NhbGVMaW5lYXIoKVxuICAgIC5kb21haW4oWzAsIG1heFZhbHVlXSlcbiAgICAucmFuZ2UoW2ggLSBtYXJnaW4udG9wLCBtYXJnaW4uYm90dG9tXSk7XG5cbiAgbGV0IHN2ZyA9IGQzXG4gICAgLnNlbGVjdChcIiN2aXNcIilcbiAgICAvLyAuc2VsZWN0KGAjc3ZnLWNvbnRhaW5lci0ke2lkeH1gKVxuICAgIC5hcHBlbmQoXCJzdmdcIilcbiAgICAuYXR0cihcImNsYXNzXCIsIGAke3RhcmdldFNWR30gaGlkZGVuYClcbiAgICAuYXR0cihcInZpZXdCb3hcIiwgYDAgMCA2NTAgNzAwYClcbiAgICAuYXR0cihcInByZXNlcnZlQXNwZWN0UmF0aW9cIiwgXCJ4TWluWU1pbiBtZWV0XCIpO1xuICAgIC8vIC5hdHRyKFwid2lkdGhcIiwgdyArIG1hcmdpbi5sZWZ0ICsgbWFyZ2luLnJpZ2h0KVxuICAgIC8vIC5hdHRyKFwiaGVpZ2h0XCIsIGggKyBtYXJnaW4udG9wICsgbWFyZ2luLmJvdHRvbSk7XG5cbiAgbGV0IHhBeGlzID0gZDNcbiAgICAuYXhpc0JvdHRvbSh4U2NhbGUpXG4gICAgLnRpY2tTaXplKDApXG4gICAgLnRpY2tGb3JtYXQoZnVuY3Rpb24oZCkge1xuICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKGZvb2REYXRhKS5zbGljZSgyLCAtMSlbZF07XG4gICAgfSk7XG5cbiAgICBzdmdcbiAgICAgIC5hcHBlbmQoXCJnXCIpXG4gICAgICAuYXR0cihcImNsYXNzXCIsIGAke3RhcmdldFNWR30teC1heGlzIHgtYXhpc2ApXG4gICAgICAuYXR0cihcbiAgICAgICAgXCJ0cmFuc2Zvcm1cIixcbiAgICAgICAgXCJ0cmFuc2xhdGUoXCIgKyBtYXJnaW4ubGVmdCArIFwiLCBcIiArIChoIC0gbWFyZ2luLnRvcCkgKyBcIilcIlxuICAgICAgKVxuICAgICAgLnRyYW5zaXRpb24oKVxuICAgICAgLmR1cmF0aW9uKDEwMDApXG4gICAgICAuY2FsbCh4QXhpcyk7XG5cbiAgICBzdmcuc2VsZWN0QWxsKFwiLngtYXhpcyB0ZXh0XCIpLmF0dHIoXCJ0cmFuc2Zvcm1cIiwgZnVuY3Rpb24oZCkge1xuICAgICAgcmV0dXJuIFwidHJhbnNsYXRlKDEwLCAyNSlyb3RhdGUoLTQ1KVwiO1xuICAgIH0pO1xuXG4gICAgc3ZnXG4gICAgICAuYXBwZW5kKFwidGV4dFwiKVxuICAgICAgLmF0dHIoXCJ0cmFuc2Zvcm1cIiwgXCJyb3RhdGUoLTkwKVwiKVxuICAgICAgLmF0dHIoXCJjbGFzc1wiLCBcInktYXhpcy1sYWJlbFwiKVxuICAgICAgLmF0dHIoXCJ5XCIsIDApXG4gICAgICAuYXR0cihcInhcIiwgMCAtIGggLyAyKVxuICAgICAgLmF0dHIoXCJkeVwiLCBcIjFlbVwiKVxuICAgICAgLnN0eWxlKFwidGV4dC1hbmNob3JcIiwgXCJtaWRkbGVcIilcbiAgICAgIC50ZXh0KFwiUGVyY2VudGFnZSBvZiByZWNvbW1lbmRlZCBkYWlseSBhbGxvd2FuY2UoUkRBKVwiKTtcblxuICAgIHN2Z1xuICAgICAgLmFwcGVuZChcInRleHRcIilcbiAgICAgIC5hdHRyKFwiY2xhc3NcIiwgXCJzb3VyY2UtdGV4dFwiKVxuICAgICAgLmF0dHIoXCJ0cmFuc2Zvcm1cIixcbiAgICAgICAgXCJ0cmFuc2xhdGUoMzUsIFwiICtcbiAgICAgICAgKGggKyBtYXJnaW4udG9wICsgNDApICsgXCIpXCIpXG4gICAgICAuc3R5bGUoXCJ0ZXh0LWFuY2hvclwiLCBcImxlZnRcIilcbiAgICAgIC50ZXh0KFwiU291cmNlOiBVU0RBXCIpO1xuXG4gIGxldCB5QXhpcyA9IGQzLmF4aXNMZWZ0KHlTY2FsZSkudGlja3MoNCwgXCIlXCIpO1xuXG4gIHN2Z1xuICAgIC5hcHBlbmQoXCJnXCIpXG4gICAgLmF0dHIoXCJjbGFzc1wiLCBgJHt0YXJnZXRTVkd9LXktYXhpcyB5LWF4aXNgKVxuICAgIC5hdHRyKFwidHJhbnNmb3JtXCIsIFwidHJhbnNsYXRlKFwiICsgbWFyZ2luLmxlZnQgKyBcIiwwKVwiKVxuICAgIC5zdHlsZShcIm9wYWNpdHlcIiwgXCIwJVwiKVxuICAgIC5jYWxsKHlBeGlzKTtcbiAgICAgICAgXG4gIHN2Z1xuICAgIC5zZWxlY3RBbGwoXCJyZWN0XCIpXG4gICAgLmRhdGEoZGF0YSlcbiAgICAuZW50ZXIoKVxuICAgIC5hcHBlbmQoXCJyZWN0XCIpXG4gICAgLmF0dHIoXCJjbGFzc1wiLCBgJHt0YXJnZXRTbGlkZVJlY3R9YClcbiAgICAuYXR0cihcInhcIiwgZnVuY3Rpb24oZCwgaSkge1xuICAgICAgcmV0dXJuIGkgKiAoeF9heGlzTGVuZ3RoIC8gbnVtYmVyT2ZDb2x1bW5zKSArIG1hcmdpbi5sZWZ0ICsgMTA7XG4gICAgfSlcbiAgICAuYXR0cihcInlcIiwgZnVuY3Rpb24oZCkge1xuICAgICAgcmV0dXJuIHlTY2FsZShkIC8gMTAwKTtcbiAgICB9KVxuICAgIC5hdHRyKFwid2lkdGhcIiwgeF9heGlzTGVuZ3RoIC8gbnVtYmVyT2ZDb2x1bW5zIC0gMSlcbiAgICAuYXR0cihcImhlaWdodFwiLCBmdW5jdGlvbihkKSB7XG4gICAgICByZXR1cm4gaCAtIHlTY2FsZShkIC8gMTAwKSAtIG1hcmdpbi50b3A7XG4gICAgfSlcbiAgICAudHJhbnNpdGlvbigpXG4gICAgLmR1cmF0aW9uKDUwMCk7XG5cbn07XG5cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLCAoZSkgPT4ge1xuICAgIFxuICAgIGxldCBzbGlkZXMgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDE5OyBpKyspIHtcbiAgICAgICAgbGV0IHNsaWRlTmFtZSA9IFwiI3NsaWRlLWNvbnRhaW5lci1cIiArIGk7XG4gICAgICAgIGxldCBuZXdTbGlkZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2xpZGVOYW1lKTtcbiAgICAgICAgc2xpZGVzLnB1c2gobmV3U2xpZGUpO1xuICAgIH1cbiAgICBjcmVhdGVPYnNlcnZlcnMoc2xpZGVzKTtcbn0sIGZhbHNlKTtcblxuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCAoKSA9PiB7XG5cbiAgICBhZGRBbGxGbHlpbmdGb29kTGlzdGVuZXJzKCk7XG5cbiAgICBjb25zdCBmbHlpbmdGb29kSWRzID0gWzAsIDEsIDIsIDMsIDQsIDYsIDcsIDksIDExLCAxMiwgMTMsIDE0LCAxNiwgMTddO1xuXG4gICAgZmx5aW5nRm9vZElkcy5mb3JFYWNoKGlkID0+IHtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBmb29kLXN2Zy1jb250YWluZXItJHtpZH1gKS5hZGRFdmVudExpc3RlbmVyKFwibW91c2VvdmVyXCIsICgpID0+IHtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYGNsaWNrLWJ1YmJsZS0ke2lkfWApLmNsYXNzTGlzdC5hZGQoXCJzaG93XCIpO1xuICAgICAgfSlcblxuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYGZvb2Qtc3ZnLWNvbnRhaW5lci0ke2lkfWApLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW91dFwiLCAoKSA9PiB7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBjbGljay1idWJibGUtJHtpZH1gKS5jbGFzc0xpc3QucmVtb3ZlKFwic2hvd1wiKTtcbiAgICAgIH0pXG5cbiAgICB9KVxuXG59KVxuXG5jb25zdCBjcmVhdGVPYnNlcnZlcnMgPSAoc2xpZGVzKSA9PiB7XG4gICAgXG4gICAgbGV0IG9wdGlvbnMgPSB7XG4gICAgICByb290OiBudWxsLFxuICAgICAgcm9vdE1hcmdpbjogXCIwcHggMHB4IDBweCAwcHhcIixcbiAgICAgIHRocmVzaG9sZDogLjVcbiAgICB9O1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzbGlkZXMubGVuZ3RoIC0gMTsgaSsrKSB7XG4gICAgICBTbGlkZXMucmVuZGVyU2xpZGUob3B0aW9ucywgc2xpZGVzW2ldLCBpKTtcbiAgICB9XG5cbn1cblxuY29uc3QgY3JlYXRlTmF2TGkgPSAoaWR4KSA9PiB7XG4gIGxldCBuYXZDb2x1bW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubmF2LWNvbHVtbicpO1xuXG4gIGxldCBhbmNob3JMaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImFcIik7XG4gIGFuY2hvckxpbmsuc2V0QXR0cmlidXRlKFwiaHJlZlwiLCBgI2FuY2hvci0ke2lkeH1gKTtcbiAgbmF2Q29sdW1uLmFwcGVuZENoaWxkKGFuY2hvckxpbmspO1xuXG4gIGxldCBuYXZMaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKTtcbiAgbmF2TGkuc2V0QXR0cmlidXRlKFwiaWRcIiwgYG5hdi1saS0ke2lkeH1gKTtcbiAgbmF2TGkuY2xhc3NMaXN0LmFkZChcIm5hdi1saVwiKTtcbiAgYW5jaG9yTGluay5hcHBlbmRDaGlsZChuYXZMaSk7XG5cbn1cblxuY29uc3QgY3JlYXRlQW5jaG9yID0gKGlkeCkgPT4ge1xuICBsZXQgc2xpZGVDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgc2xpZGUtY29udGFpbmVyLSR7aWR4fWApO1xuXG4gIGxldCBhbmNob3JUYWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYVwiKTtcbiAgYW5jaG9yVGFnLnNldEF0dHJpYnV0ZShcImlkXCIsIGBhbmNob3ItJHtpZHh9YCk7XG4gIGFuY2hvclRhZy5jbGFzc0xpc3QuYWRkKFwiYW5jaG9yXCIpO1xuXG4gIHNsaWRlQ29udGFpbmVyLmFwcGVuZENoaWxkKGFuY2hvclRhZyk7XG59XG5cblxuIiwiICAgIGNvbnN0IGFkZEFsbEZseWluZ0Zvb2RMaXN0ZW5lcnMgPSAoKSA9PiB7XG5cbiAgICAgICAgbGV0IGZvb2RDb3VudGVycyA9IHt9O1xuXG4gICAgICAgIGNvbnN0IGFkZEZseWluZ0Zvb2RMaXN0ZW5lciA9IGlkeCA9PiB7XG4gICAgICAgICAgICBsZXQgZm9vZEljb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgZm9vZC1zdmctY29udGFpbmVyLSR7aWR4fWApO1xuXG4gICAgICAgICAgICBsZXQganVzdENsaWNrZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgY29uc3QgZmx5aW5nRm9vZENsaWNrQ2FsbGJhY2sgPSBlID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoanVzdENsaWNrZWQpIHtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBmb29kSWNvbi5jbGFzc0xpc3QucmVtb3ZlKFwiZmx5aW5nLWZvb2QtY2xpY2stZW5hYmxlZFwiKTtcbiAgICAgICAgICAgICAgICAgICAgZm9vZEljb24uY2xhc3NMaXN0LmFkZChcImZseWluZy1mb29kLWNsaWNrLWRpc2FibGVkXCIpO1xuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgY2xpY2stYnViYmxlLSR7aWR4fWApLmNsYXNzTGlzdC5yZW1vdmUoXCJzaG93XCIpO1xuXG4gICAgICAgICAgICAgICAgbGV0IGZvb2RDaGlsZHJlbiA9IGZvb2RJY29uLmNoaWxkTm9kZXM7XG5cbiAgICAgICAgICAgICAgICB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChmb29kQ2hpbGRyZW5bM10pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMzA7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvb2RJY29uLnJlbW92ZUNoaWxkKGZvb2RDaGlsZHJlblszXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LCAyMDAwKTtcblxuICAgICAgICAgICAgICAgIGxldCBtb3ZlbWVudEZ1bmMgPSBuZXdGb29kID0+IHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHN0YXJ0ID0gbnVsbDtcblxuICAgICAgICAgICAgICAgICAgICBsZXQgc2lnbmVkT25lcyA9IFstMSwgMV07XG4gICAgICAgICAgICAgICAgICAgIGxldCByYW5kb21JZHggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAyKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJhbmRvbWx5U2lnbmVkT25lID0gc2lnbmVkT25lc1tyYW5kb21JZHhdO1xuXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHN0ZXAgPSB0aW1lc3RhbXAgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFzdGFydCkgc3RhcnQgPSB0aW1lc3RhbXA7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgcHJvZ3Jlc3MgPSB0aW1lc3RhbXAgLSBzdGFydDtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld0Zvb2Quc3R5bGUudHJhbnNmb3JtID0gXCJ0cmFuc2xhdGUoXCIgKyAocHJvZ3Jlc3MgKiByYW5kb21seVNpZ25lZE9uZSkgKyBcInB4LCBcIiArIHByb2dyZXNzICsgXCJweClcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwcm9ncmVzcyA8IDI1MDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKHN0ZXApO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoc3RlcCk7XG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSBmb29kQ291bnRlcnNbaWR4XTsgaSA8IGZvb2RDb3VudGVyc1tpZHhdICsgMzA7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBsZXQgbmV3Rm9vZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgICAgICAgICAgICAgIG5ld0Zvb2Quc2V0QXR0cmlidXRlKFwiaWRcIiwgYGZseWluZy1mb29kLW9mLXR5cGUtJHtpZHh9LSR7aX1gKTtcbiAgICAgICAgICAgICAgICAgICAgbmV3Rm9vZC5jbGFzc0xpc3QuYWRkKGBmbHlpbmctZm9vZC0ke2lkeH1gKTtcbiAgICAgICAgICAgICAgICAgICAgbmV3Rm9vZC5jbGFzc0xpc3QuYWRkKGBmbHlpbmctZm9vZGApO1xuICAgICAgICAgICAgICAgICAgICBmb29kSWNvbi5hcHBlbmRDaGlsZChuZXdGb29kKTtcblxuICAgICAgICAgICAgICAgICAgICBsZXQgdGhpc09uZVBhcnRpY3VsYXJGb29kID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXG4gICAgICAgICAgICAgICAgICAgICAgICBgZmx5aW5nLWZvb2Qtb2YtdHlwZS0ke2lkeH0tJHtpfWBcbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpc09uZVBhcnRpY3VsYXJGb29kLnN0eWxlLnRvcCA9IChNYXRoLnJhbmRvbSgpICogLTMwMCkgKyB3aW5kb3cuc2Nyb2xsWSArIFwicHhcIjtcbiAgICAgICAgICAgICAgICAgICAgdGhpc09uZVBhcnRpY3VsYXJGb29kLnN0eWxlLmxlZnQgPVxuICAgICAgICAgICAgICAgICAgICAgICAgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogd2luZG93LmlubmVyV2lkdGgpICsgXCJweFwiO1xuXG4gICAgICAgICAgICAgICAgICAgIG1vdmVtZW50RnVuYyh0aGlzT25lUGFydGljdWxhckZvb2QpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGZvb2RDb3VudGVyc1tpZHhdICs9IDEwO1xuXG4gICAgICAgICAgICAgICAganVzdENsaWNrZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAganVzdENsaWNrZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgZm9vZEljb24uY2xhc3NMaXN0LnJlbW92ZShcImZseWluZy1mb29kLWNsaWNrLWRpc2FibGVkXCIpO1xuICAgICAgICAgICAgICAgICAgICBmb29kSWNvbi5jbGFzc0xpc3QuYWRkKFwiZmx5aW5nLWZvb2QtY2xpY2stZW5hYmxlZFwiKTtcbiAgICAgICAgICAgICAgICB9LCAyMDAwKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZvb2RJY29uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmbHlpbmdGb29kQ2xpY2tDYWxsYmFjayk7XG5cbiAgICAgICAgfTtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDE4OyBpKyspIHtcbiAgICAgICAgICAgIGZvb2RDb3VudGVyc1tpXSA9IDA7XG4gICAgICAgICAgICBhZGRGbHlpbmdGb29kTGlzdGVuZXIoaSk7XG4gICAgICAgIH1cblxuXG5cbiAgICB9XG5cbiAgICBleHBvcnQgZGVmYXVsdCBhZGRBbGxGbHlpbmdGb29kTGlzdGVuZXJzOyIsImV4cG9ydCBjb25zdCByZW5kZXJTbGlkZSA9IChvcHRpb25zLCBzbGlkZSwgaWR4KSA9PiB7XG5cbiAgY29uc3QgaGFuZGxlU2Nyb2xsT250byA9IChlbnRyaWVzLCBvYnNlcnZlcikgPT4ge1xuICAgIGVudHJpZXMuZm9yRWFjaChlbnRyeSA9PiB7XG4gICAgICBpZiAoZW50cnkuaXNJbnRlcnNlY3RpbmcpIHtcblxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuc2xpZGUtc3ZnLSR7aWR4fWApXG4gICAgICAgICAgLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIik7XG5cbiAgICAgICAgbGV0IGN1cnJlbnRTVkcgPSBkMy5zZWxlY3QoYC5zbGlkZS1zdmctJHtpZHh9YCk7XG5cbiAgICAgICAgbGV0IHRvb2x0aXAgPSBkM1xuICAgICAgICAgIC5zZWxlY3QoXCJib2R5XCIpXG4gICAgICAgICAgLmFwcGVuZChcImRpdlwiKVxuICAgICAgICAgIC5zdHlsZShcInBvc2l0aW9uXCIsIFwiYWJzb2x1dGVcIilcbiAgICAgICAgICAuc3R5bGUoXCJmb250LXNpemVcIiwgXCIxMnB4XCIpXG4gICAgICAgICAgLnN0eWxlKFwiei1pbmRleFwiLCBcIjEwXCIpXG4gICAgICAgICAgLnN0eWxlKFwidmlzaWJpbGl0eVwiLCBcImhpZGRlblwiKTtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IG51dHJpZW50cyA9IFtcImZpYmVyXCIsIFwiaXJvblwiLCBcIm1hZ25lc2l1bVwiLCBcInBvdGFzc2l1bVwiLCBcInppbmNcIiwgXCJ2aXRhbWluIENcIiwgXCJmb2xhdGVcIiwgXCJ2aXRhbWluIEIxMlwiLCBcInZpdGFtaW4gQVwiLCBcInZpdGFtaW4gRFwiXTtcblxuICAgICAgICBjdXJyZW50U1ZHXG4gICAgICAgICAgLnNlbGVjdEFsbChcInJlY3RcIilcbiAgICAgICAgICAub24oXCJtb3VzZW92ZXJcIiwgZnVuY3Rpb24oZCkge1xuICAgICAgICAgICAgcmV0dXJuIHRvb2x0aXAuc3R5bGUoXCJ2aXNpYmlsaXR5XCIsIFwidmlzaWJsZVwiKTtcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5vbihcIm1vdXNlbW92ZVwiLCBmdW5jdGlvbihkLCBpKSB7XG4gICAgICAgICAgICByZXR1cm4gdG9vbHRpcFxuICAgICAgICAgICAgICAuc3R5bGUoXCJ0b3BcIiwgZXZlbnQucGFnZVkgLSA2MCArIFwicHhcIilcbiAgICAgICAgICAgICAgLnN0eWxlKFwibGVmdFwiLCBldmVudC5wYWdlWCAtIDMwICsgXCJweFwiKVxuICAgICAgICAgICAgICAuc3R5bGUoXCJiYWNrZ3JvdW5kLWNvbG9yXCIsIFwid2hpdGVcIilcbiAgICAgICAgICAgICAgLnN0eWxlKFwiYm9yZGVyXCIsIFwiMnB4IHNvbGlkIGJsYWNrXCIpXG4gICAgICAgICAgICAgIC5zdHlsZShcInBhZGRpbmdcIiwgXCI1cHhcIilcbiAgICAgICAgICAgICAgLnN0eWxlKFwiYm9yZGVyLXJhZGl1c1wiLCBcIjNweFwiKVxuICAgICAgICAgICAgICAudGV4dChgJHtudXRyaWVudHNbaV19OiAke2R9JWApO1xuICAgICAgICAgIH0pXG4gICAgICAgICAgLm9uKFwibW91c2VvdXRcIiwgZnVuY3Rpb24oZCkge1xuICAgICAgICAgICAgcmV0dXJuIHRvb2x0aXAuc3R5bGUoXCJ2aXNpYmlsaXR5XCIsIFwiaGlkZGVuXCIpO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuc2xpZGUtc3ZnLSR7aWR4IC0gMX1gKSkge1xuICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC5zbGlkZS1zdmctJHtpZHggLSAxfWApXG4gICAgICAgICAgLmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLnNsaWRlLXN2Zy0ke2lkeCArIDF9YCkpIHtcbiAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuc2xpZGUtc3ZnLSR7aWR4ICsgMX1gKVxuICAgICAgICAgIC5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgLnNsaWRlLXN2Zy0ke2lkeH0tcmVjdGApLmZvckVhY2gocmVjdCA9PiB7XG4gICAgICAgICAgcmVjdC5jbGFzc0xpc3QuYWRkKFwiY2hhcnQtcmVjdFwiKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZDMuc2VsZWN0KGAuc2xpZGUtc3ZnLSR7aWR4fS15LWF4aXNgKVxuICAgICAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgICAgICAuc3R5bGUoXCJvcGFjaXR5XCIsIFwiMTAwJVwiKVxuICAgICAgICAgIC5kdXJhdGlvbig1MDApO1xuXG4gICAgICAgIGxldCBuYXZDaXJjbGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgbmF2LWxpLSR7aWR4fWApO1xuICAgICAgICBuYXZDaXJjbGUuY2xhc3NMaXN0LmFkZChgbmF2LWxpLSR7aWR4fWApO1xuXG5cblxuICAgICAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgLnNsaWRlLXN2Zy0ke2lkeCAtIDF9LXJlY3RgKSkge1xuICAgICAgICAgICAgZG9jdW1lbnRcbiAgICAgICAgICAgICAgLnF1ZXJ5U2VsZWN0b3JBbGwoYC5zbGlkZS1zdmctJHtpZHggLSAxfS1yZWN0YClcbiAgICAgICAgICAgICAgLmZvckVhY2gocmVjdCA9PiB7XG4gICAgICAgICAgICAgICAgcmVjdC5jbGFzc0xpc3QucmVtb3ZlKFwiY2hhcnQtcmVjdFwiKTtcbiAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGQzLnNlbGVjdChgLnNsaWRlLXN2Zy0ke2lkeCAtIDF9LXktYXhpc2ApXG4gICAgICAgICAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgICAgICAgICAgLnN0eWxlKFwib3BhY2l0eVwiLCBcIjAlXCIpXG4gICAgICAgICAgICAgIC5kdXJhdGlvbig1MDApO1xuICAgICAgICAgICAgXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYG5hdi1saS0ke2lkeCAtIDF9YCkpIHtcbiAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgbmF2LWxpLSR7aWR4IC0gMX1gKS5jbGFzc0xpc3QucmVtb3ZlKGBuYXYtbGktJHtpZHggLSAxfWApO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYC5zbGlkZS1zdmctJHtpZHggKyAxfS1yZWN0YCkpIHtcbiAgICAgICAgICAgIGRvY3VtZW50XG4gICAgICAgICAgICAgIC5xdWVyeVNlbGVjdG9yQWxsKGAuc2xpZGUtc3ZnLSR7aWR4ICsgMX0tcmVjdGApXG4gICAgICAgICAgICAgIC5mb3JFYWNoKHJlY3QgPT4ge1xuICAgICAgICAgICAgICAgIHJlY3QuY2xhc3NMaXN0LnJlbW92ZShcImNoYXJ0LXJlY3RcIik7XG4gICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBkMy5zZWxlY3QoYC5zbGlkZS1zdmctJHtpZHggKyAxfS15LWF4aXNgKVxuICAgICAgICAgICAgICAudHJhbnNpdGlvbigpXG4gICAgICAgICAgICAgIC5zdHlsZShcIm9wYWNpdHlcIiwgXCIwJVwiKVxuICAgICAgICAgICAgICAuZHVyYXRpb24oNTAwKTtcblxuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYG5hdi1saS0ke2lkeCArIDF9YCkuY2xhc3NMaXN0LnJlbW92ZShgbmF2LWxpLSR7aWR4ICsgMX1gKTsgICAgICAgICAgICAgIFxuICAgICAgICB9XG5cbiAgICAgICAgICBcbiAgICAgIH1cbiAgICB9KTtcbiAgfTtcblxuICBsZXQgb2JzZXJ2ZXIgPSBuZXcgSW50ZXJzZWN0aW9uT2JzZXJ2ZXIoaGFuZGxlU2Nyb2xsT250bywgb3B0aW9ucyk7XG4gIG9ic2VydmVyLm9ic2VydmUoc2xpZGUpO1xuXG59IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luIl0sInNvdXJjZVJvb3QiOiIifQ==