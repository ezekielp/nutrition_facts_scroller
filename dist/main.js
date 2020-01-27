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
  }); // if (createXAxisBool !== undefined) {

  svg.append("g").attr("class", "".concat(targetSVG, "-x-axis x-axis")).attr("transform", "translate(" + margin.left + ", " + (h - margin.top) + ")").transition().duration(1000).call(xAxis);
  svg.selectAll(".x-axis text").attr("transform", function (d) {
    return "translate(10, 25)rotate(-45)";
  });
  svg.append("text").attr("transform", "rotate(-90)").attr("class", "y-axis-label").attr("y", 0).attr("x", 0 - h / 2).attr("dy", "1em").style("text-anchor", "middle").text("Percentage of recommended daily allowance(RDA)");
  svg.append("text").attr("class", "source-text").attr("transform", "translate(35, " + (h + margin.top + 40) + ")") // .attr("dy", "1em")
  .style("text-anchor", "left").text("Source: USDA"); // }

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
  }); // document.getElementById('food-svg-container-0').addEventListener("mouseout", () => {
  //   document.querySelector('.click-bubble').classList.remove("show");
  // })
  // document.getElementById('food-svg-container-1').addEventListener("mouseover", () => {
  //   document.querySelector('#click-bubble-1').classList.add("show");
  // })
  // document.getElementById('food-svg-container-1').addEventListener("mouseout", () => {
  //   document.querySelector('#click-bubble-1').classList.remove("show");
  // })
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL2ZseWluZ19mb29kLmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL3Njcm9sbC9zbGlkZXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0eWxlcy9pbmRleC5zY3NzP2M4MDciXSwibmFtZXMiOlsibnV0cml0aW9uRGF0YSIsImQzIiwiY3N2IiwiZCIsImZvb2RfbmFtZSIsInNlcnZpbmdfc2l6ZSIsImZpYmVyIiwiaXJvbiIsIm1hZ25lc2l1bSIsInBvdGFzc2l1bSIsInppbmMiLCJmb2xhdGUiLCJjaG9sZXN0ZXJvbCIsInRoZW4iLCJkYXRhIiwiY3JlYXRlVmlzdWFsaXphdGlvbiIsImNyZWF0ZU5hdkxpIiwiY3JlYXRlQW5jaG9yIiwiaSIsImxlbmd0aCIsImZvb2REYXRhIiwiaWR4IiwiY3JlYXRlWEF4aXNCb29sIiwibWFyZ2luIiwidG9wIiwicmlnaHQiLCJib3R0b20iLCJsZWZ0IiwidyIsImgiLCJPYmplY3QiLCJ2YWx1ZXMiLCJzbGljZSIsIm51bWJlck9mQ29sdW1ucyIsIm1heFZhbHVlIiwiTWF0aCIsIm1heCIsInhfYXhpc0xlbmd0aCIsInlfYXhpc0xlbmd0aCIsInRhcmdldFNWRyIsInRhcmdldFNsaWRlUmVjdCIsInhTY2FsZSIsInNjYWxlTGluZWFyIiwiZG9tYWluIiwicmFuZ2UiLCJ5U2NhbGUiLCJzdmciLCJzZWxlY3QiLCJhcHBlbmQiLCJhdHRyIiwieEF4aXMiLCJheGlzQm90dG9tIiwidGlja1NpemUiLCJ0aWNrRm9ybWF0Iiwia2V5cyIsInRyYW5zaXRpb24iLCJkdXJhdGlvbiIsImNhbGwiLCJzZWxlY3RBbGwiLCJzdHlsZSIsInRleHQiLCJ5QXhpcyIsImF4aXNMZWZ0IiwidGlja3MiLCJlbnRlciIsIndpbmRvdyIsImFkZEV2ZW50TGlzdGVuZXIiLCJlIiwic2xpZGVzIiwic2xpZGVOYW1lIiwibmV3U2xpZGUiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJwdXNoIiwiY3JlYXRlT2JzZXJ2ZXJzIiwiYWRkQWxsRmx5aW5nRm9vZExpc3RlbmVycyIsImZseWluZ0Zvb2RJZHMiLCJmb3JFYWNoIiwiaWQiLCJnZXRFbGVtZW50QnlJZCIsImNsYXNzTGlzdCIsImFkZCIsInJlbW92ZSIsIm9wdGlvbnMiLCJyb290Iiwicm9vdE1hcmdpbiIsInRocmVzaG9sZCIsIlNsaWRlcyIsIm5hdkNvbHVtbiIsImFuY2hvckxpbmsiLCJjcmVhdGVFbGVtZW50Iiwic2V0QXR0cmlidXRlIiwiYXBwZW5kQ2hpbGQiLCJuYXZMaSIsInNsaWRlQ29udGFpbmVyIiwiYW5jaG9yVGFnIiwiZm9vZENvdW50ZXJzIiwiYWRkRmx5aW5nRm9vZExpc3RlbmVyIiwiZm9vZEljb24iLCJmb29kQ2hpbGRyZW4iLCJjaGlsZE5vZGVzIiwic2V0VGltZW91dCIsInJlbW92ZUNoaWxkIiwibW92ZW1lbnRGdW5jIiwibmV3Rm9vZCIsInN0YXJ0Iiwic2lnbmVkT25lcyIsInJhbmRvbUlkeCIsImZsb29yIiwicmFuZG9tIiwicmFuZG9tbHlTaWduZWRPbmUiLCJzdGVwIiwidGltZXN0YW1wIiwicHJvZ3Jlc3MiLCJ0cmFuc2Zvcm0iLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJ0aGlzT25lUGFydGljdWxhckZvb2QiLCJzY3JvbGxZIiwiaW5uZXJXaWR0aCIsInJlbmRlclNsaWRlIiwic2xpZGUiLCJoYW5kbGVTY3JvbGxPbnRvIiwiZW50cmllcyIsIm9ic2VydmVyIiwiZW50cnkiLCJpc0ludGVyc2VjdGluZyIsImN1cnJlbnRTVkciLCJ0b29sdGlwIiwibnV0cmllbnRzIiwib24iLCJldmVudCIsInBhZ2VZIiwicGFnZVgiLCJxdWVyeVNlbGVjdG9yQWxsIiwicmVjdCIsIm5hdkNpcmNsZSIsIkludGVyc2VjdGlvbk9ic2VydmVyIiwib2JzZXJ2ZSJdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FB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LEdBQUcsR0FBRyxDQUR4QyxZQUVHd0QsT0FGSCxDQUVXLFVBQUF5RCxJQUFJLEVBQUk7QUFDZkEsZ0JBQUksQ0FBQ3RELFNBQUwsQ0FBZUUsTUFBZixDQUFzQixZQUF0QjtBQUNELFdBSkg7QUFNQWpGLFlBQUUsQ0FBQzhDLE1BQUgsc0JBQXdCMUIsR0FBRyxHQUFHLENBQTlCLGNBQ0drQyxVQURILEdBRUdJLEtBRkgsQ0FFUyxTQUZULEVBRW9CLElBRnBCLEVBR0dILFFBSEgsQ0FHWSxHQUhaO0FBS0FlLGtCQUFRLENBQUNRLGNBQVQsa0JBQWtDMUQsR0FBRyxHQUFHLENBQXhDLEdBQTZDMkQsU0FBN0MsQ0FBdURFLE1BQXZELGtCQUF3RTdELEdBQUcsR0FBRyxDQUE5RTtBQUNIO0FBR0Y7QUFDRixLQWxHRDtBQW1HRCxHQXBHRDs7QUFzR0EsTUFBSXNHLFFBQVEsR0FBRyxJQUFJYSxvQkFBSixDQUF5QmYsZ0JBQXpCLEVBQTJDdEMsT0FBM0MsQ0FBZjtBQUNBd0MsVUFBUSxDQUFDYyxPQUFULENBQWlCakIsS0FBakI7QUFFRCxDQTNHTSxDOzs7Ozs7Ozs7OztBQ0FQLHVDIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9kaXN0L1wiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC5qc1wiKTtcbiIsImltcG9ydCAnLi9zdHlsZXMvaW5kZXguc2Nzcyc7XG5pbXBvcnQgKiBhcyBTbGlkZXMgZnJvbSAnLi9zY3JpcHRzL3Njcm9sbC9zbGlkZXMnO1xuaW1wb3J0IGFkZEFsbEZseWluZ0Zvb2RMaXN0ZW5lcnMgZnJvbSAnLi9zY3JpcHRzL2ZseWluZ19mb29kJztcblxubGV0IG51dHJpdGlvbkRhdGE7XG5cbmQzLmNzdihcIm51dHJpdGlvbl9mYWN0c19mb3Jfc2Nyb2xsZXIuY3N2XCIsIGQgPT4ge1xuICByZXR1cm4ge1xuICAgIGZvb2RfbmFtZTogZFtcIkZvb2QgbmFtZVwiXSxcbiAgICBzZXJ2aW5nX3NpemU6IGRbXCJBbW91bnRcIl0sXG4gICAgZmliZXI6ICtkW1wiRmliZXJcIl0sXG4gICAgaXJvbjogK2RbXCJJcm9uXCJdLFxuICAgIG1hZ25lc2l1bTogK2RbXCJNYWduZXNpdW1cIl0sXG4gICAgcG90YXNzaXVtOiArZFtcIlBvdGFzc2l1bVwiXSxcbiAgICB6aW5jOiArZFtcIlppbmNcIl0sXG4gICAgXCJ2aXRhbWluIENcIjogK2RbXCJWaXRhbWluIENcIl0sXG4gICAgZm9sYXRlOiArZFtcIkZvbGF0ZVwiXSxcbiAgICBcInZpdGFtaW4gQjEyXCI6ICtkW1wiVml0YW1pbiBCLTEyXCJdLFxuICAgIFwidml0YW1pbiBBXCI6ICtkW1wiVml0YW1pbiBBXCJdLFxuICAgIFwidml0YW1pbiBEXCI6ICtkW1wiVml0YW1pbiBEXCJdLFxuICAgIGNob2xlc3Rlcm9sOiArZFtcIkNob2xlc3Rlcm9sXCJdXG4gIH07XG59KS50aGVuKGRhdGEgPT4ge1xuICAgIG51dHJpdGlvbkRhdGEgPSBkYXRhO1xuICAgIFxuICAgIGNyZWF0ZVZpc3VhbGl6YXRpb24obnV0cml0aW9uRGF0YVswXSwgMCwgdHJ1ZSk7XG4gICAgY3JlYXRlTmF2TGkoMCk7XG4gICAgY3JlYXRlQW5jaG9yKDApO1xuICAgIFxuICAgIGZvciAobGV0IGkgPSAxOyBpIDwgbnV0cml0aW9uRGF0YS5sZW5ndGg7IGkrKykge1xuICAgICAgY3JlYXRlVmlzdWFsaXphdGlvbihudXRyaXRpb25EYXRhW2ldLCBpKTtcbiAgICAgIGNyZWF0ZU5hdkxpKGkpO1xuICAgICAgY3JlYXRlQW5jaG9yKGkpO1xuICAgIH1cblxufSk7XG5cbmNvbnN0IGNyZWF0ZVZpc3VhbGl6YXRpb24gPSAoZm9vZERhdGEsIGlkeCwgY3JlYXRlWEF4aXNCb29sKSA9PiB7XG4gIGxldCBtYXJnaW4gPSB7dG9wOiAyMCwgcmlnaHQ6IDQwLCBib3R0b206IDI1LCBsZWZ0OiA2MH1cbiAgbGV0IHcgPSA2MDAgLSBtYXJnaW4ubGVmdCAtIG1hcmdpbi5yaWdodDtcbiAgbGV0IGggPSA0NzUgLSBtYXJnaW4udG9wIC0gbWFyZ2luLmJvdHRvbTtcblxuICBsZXQgZGF0YSA9IE9iamVjdC52YWx1ZXMoZm9vZERhdGEpLnNsaWNlKDIsIC0xKTtcbiAgbGV0IG51bWJlck9mQ29sdW1ucyA9IDEwO1xuICBsZXQgbWF4VmFsdWUgPSBNYXRoLm1heCguNTAsIGQzLm1heChkYXRhLCBmdW5jdGlvbihkKSB7XG4gICAgcmV0dXJuICgrZCAvIDEwMCk7XG4gIH0pKTtcbiAgbGV0IHhfYXhpc0xlbmd0aCA9IHc7XG4gIGxldCB5X2F4aXNMZW5ndGggPSBoO1xuICBsZXQgdGFyZ2V0U1ZHID0gXCJzbGlkZS1zdmctXCIgKyBpZHg7XG4gIGxldCB0YXJnZXRTbGlkZVJlY3QgPSBcInNsaWRlLXN2Zy1cIiArIGlkeCArIFwiLXJlY3RcIjtcblxuICBsZXQgeFNjYWxlID0gZDNcbiAgICAuc2NhbGVMaW5lYXIoKVxuICAgIC5kb21haW4oWzAsIG51bWJlck9mQ29sdW1uc10pXG4gICAgLnJhbmdlKFswLCB3XSk7XG5cbiAgbGV0IHlTY2FsZSA9IGQzXG4gICAgLnNjYWxlTGluZWFyKClcbiAgICAuZG9tYWluKFswLCBtYXhWYWx1ZV0pXG4gICAgLnJhbmdlKFtoIC0gbWFyZ2luLnRvcCwgbWFyZ2luLmJvdHRvbV0pO1xuXG4gIGxldCBzdmcgPSBkM1xuICAgIC5zZWxlY3QoXCIjdmlzXCIpXG4gICAgLy8gLnNlbGVjdChgI3N2Zy1jb250YWluZXItJHtpZHh9YClcbiAgICAuYXBwZW5kKFwic3ZnXCIpXG4gICAgLmF0dHIoXCJjbGFzc1wiLCBgJHt0YXJnZXRTVkd9IGhpZGRlbmApXG4gICAgLmF0dHIoXCJ2aWV3Qm94XCIsIGAwIDAgNjUwIDcwMGApXG4gICAgLmF0dHIoXCJwcmVzZXJ2ZUFzcGVjdFJhdGlvXCIsIFwieE1pbllNaW4gbWVldFwiKTtcbiAgICAvLyAuYXR0cihcIndpZHRoXCIsIHcgKyBtYXJnaW4ubGVmdCArIG1hcmdpbi5yaWdodClcbiAgICAvLyAuYXR0cihcImhlaWdodFwiLCBoICsgbWFyZ2luLnRvcCArIG1hcmdpbi5ib3R0b20pO1xuXG4gIGxldCB4QXhpcyA9IGQzXG4gICAgLmF4aXNCb3R0b20oeFNjYWxlKVxuICAgIC50aWNrU2l6ZSgwKVxuICAgIC50aWNrRm9ybWF0KGZ1bmN0aW9uKGQpIHtcbiAgICAgIHJldHVybiBPYmplY3Qua2V5cyhmb29kRGF0YSkuc2xpY2UoMiwgLTEpW2RdO1xuICAgIH0pO1xuXG4gIC8vIGlmIChjcmVhdGVYQXhpc0Jvb2wgIT09IHVuZGVmaW5lZCkge1xuICAgIHN2Z1xuICAgICAgLmFwcGVuZChcImdcIilcbiAgICAgIC5hdHRyKFwiY2xhc3NcIiwgYCR7dGFyZ2V0U1ZHfS14LWF4aXMgeC1heGlzYClcbiAgICAgIC5hdHRyKFxuICAgICAgICBcInRyYW5zZm9ybVwiLFxuICAgICAgICBcInRyYW5zbGF0ZShcIiArIG1hcmdpbi5sZWZ0ICsgXCIsIFwiICsgKGggLSBtYXJnaW4udG9wKSArIFwiKVwiXG4gICAgICApXG4gICAgICAudHJhbnNpdGlvbigpXG4gICAgICAuZHVyYXRpb24oMTAwMClcbiAgICAgIC5jYWxsKHhBeGlzKTtcblxuICAgIHN2Zy5zZWxlY3RBbGwoXCIueC1heGlzIHRleHRcIikuYXR0cihcInRyYW5zZm9ybVwiLCBmdW5jdGlvbihkKSB7XG4gICAgICByZXR1cm4gXCJ0cmFuc2xhdGUoMTAsIDI1KXJvdGF0ZSgtNDUpXCI7XG4gICAgfSk7XG5cbiAgICBzdmdcbiAgICAgIC5hcHBlbmQoXCJ0ZXh0XCIpXG4gICAgICAuYXR0cihcInRyYW5zZm9ybVwiLCBcInJvdGF0ZSgtOTApXCIpXG4gICAgICAuYXR0cihcImNsYXNzXCIsIFwieS1heGlzLWxhYmVsXCIpXG4gICAgICAuYXR0cihcInlcIiwgMClcbiAgICAgIC5hdHRyKFwieFwiLCAwIC0gaCAvIDIpXG4gICAgICAuYXR0cihcImR5XCIsIFwiMWVtXCIpXG4gICAgICAuc3R5bGUoXCJ0ZXh0LWFuY2hvclwiLCBcIm1pZGRsZVwiKVxuICAgICAgLnRleHQoXCJQZXJjZW50YWdlIG9mIHJlY29tbWVuZGVkIGRhaWx5IGFsbG93YW5jZShSREEpXCIpO1xuXG4gICAgc3ZnXG4gICAgICAuYXBwZW5kKFwidGV4dFwiKVxuICAgICAgLmF0dHIoXCJjbGFzc1wiLCBcInNvdXJjZS10ZXh0XCIpXG4gICAgICAuYXR0cihcInRyYW5zZm9ybVwiLFxuICAgICAgICBcInRyYW5zbGF0ZSgzNSwgXCIgK1xuICAgICAgICAoaCArIG1hcmdpbi50b3AgKyA0MCkgKyBcIilcIilcbiAgICAgIC8vIC5hdHRyKFwiZHlcIiwgXCIxZW1cIilcbiAgICAgIC5zdHlsZShcInRleHQtYW5jaG9yXCIsIFwibGVmdFwiKVxuICAgICAgLnRleHQoXCJTb3VyY2U6IFVTREFcIik7XG4gIC8vIH1cblxuICBsZXQgeUF4aXMgPSBkMy5heGlzTGVmdCh5U2NhbGUpLnRpY2tzKDQsIFwiJVwiKTtcblxuICBzdmdcbiAgICAuYXBwZW5kKFwiZ1wiKVxuICAgIC5hdHRyKFwiY2xhc3NcIiwgYCR7dGFyZ2V0U1ZHfS15LWF4aXMgeS1heGlzYClcbiAgICAuYXR0cihcInRyYW5zZm9ybVwiLCBcInRyYW5zbGF0ZShcIiArIG1hcmdpbi5sZWZ0ICsgXCIsMClcIilcbiAgICAuc3R5bGUoXCJvcGFjaXR5XCIsIFwiMCVcIilcbiAgICAuY2FsbCh5QXhpcyk7XG4gICAgICAgIFxuICBzdmdcbiAgICAuc2VsZWN0QWxsKFwicmVjdFwiKVxuICAgIC5kYXRhKGRhdGEpXG4gICAgLmVudGVyKClcbiAgICAuYXBwZW5kKFwicmVjdFwiKVxuICAgIC5hdHRyKFwiY2xhc3NcIiwgYCR7dGFyZ2V0U2xpZGVSZWN0fWApXG4gICAgLmF0dHIoXCJ4XCIsIGZ1bmN0aW9uKGQsIGkpIHtcbiAgICAgIHJldHVybiBpICogKHhfYXhpc0xlbmd0aCAvIG51bWJlck9mQ29sdW1ucykgKyBtYXJnaW4ubGVmdCArIDEwO1xuICAgIH0pXG4gICAgLmF0dHIoXCJ5XCIsIGZ1bmN0aW9uKGQpIHtcbiAgICAgIHJldHVybiB5U2NhbGUoZCAvIDEwMCk7XG4gICAgfSlcbiAgICAuYXR0cihcIndpZHRoXCIsIHhfYXhpc0xlbmd0aCAvIG51bWJlck9mQ29sdW1ucyAtIDEpXG4gICAgLmF0dHIoXCJoZWlnaHRcIiwgZnVuY3Rpb24oZCkge1xuICAgICAgcmV0dXJuIGggLSB5U2NhbGUoZCAvIDEwMCkgLSBtYXJnaW4udG9wO1xuICAgIH0pXG4gICAgLnRyYW5zaXRpb24oKVxuICAgIC5kdXJhdGlvbig1MDApO1xuXG59O1xuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgKGUpID0+IHtcbiAgICBcbiAgICBsZXQgc2xpZGVzID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxOTsgaSsrKSB7XG4gICAgICAgIGxldCBzbGlkZU5hbWUgPSBcIiNzbGlkZS1jb250YWluZXItXCIgKyBpO1xuICAgICAgICBsZXQgbmV3U2xpZGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNsaWRlTmFtZSk7XG4gICAgICAgIHNsaWRlcy5wdXNoKG5ld1NsaWRlKTtcbiAgICB9XG4gICAgY3JlYXRlT2JzZXJ2ZXJzKHNsaWRlcyk7XG59LCBmYWxzZSk7XG5cblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgKCkgPT4ge1xuXG4gICAgYWRkQWxsRmx5aW5nRm9vZExpc3RlbmVycygpO1xuXG4gICAgY29uc3QgZmx5aW5nRm9vZElkcyA9IFswLCAxLCAyLCAzLCA0LCA2LCA3LCA5LCAxMSwgMTIsIDEzLCAxNCwgMTYsIDE3XTtcblxuICAgIGZseWluZ0Zvb2RJZHMuZm9yRWFjaChpZCA9PiB7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgZm9vZC1zdmctY29udGFpbmVyLSR7aWR9YCkuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlb3ZlclwiLCAoKSA9PiB7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBjbGljay1idWJibGUtJHtpZH1gKS5jbGFzc0xpc3QuYWRkKFwic2hvd1wiKTtcbiAgICAgIH0pXG5cbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBmb29kLXN2Zy1jb250YWluZXItJHtpZH1gKS5hZGRFdmVudExpc3RlbmVyKFwibW91c2VvdXRcIiwgKCkgPT4ge1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgY2xpY2stYnViYmxlLSR7aWR9YCkuY2xhc3NMaXN0LnJlbW92ZShcInNob3dcIik7XG4gICAgICB9KVxuXG4gICAgfSlcblxuXG4gICAgLy8gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Zvb2Qtc3ZnLWNvbnRhaW5lci0wJykuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlb3V0XCIsICgpID0+IHtcblxuICAgIC8vICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNsaWNrLWJ1YmJsZScpLmNsYXNzTGlzdC5yZW1vdmUoXCJzaG93XCIpO1xuICAgIC8vIH0pXG5cbiAgICAvLyBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZm9vZC1zdmctY29udGFpbmVyLTEnKS5hZGRFdmVudExpc3RlbmVyKFwibW91c2VvdmVyXCIsICgpID0+IHtcblxuICAgIC8vICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NsaWNrLWJ1YmJsZS0xJykuY2xhc3NMaXN0LmFkZChcInNob3dcIik7XG4gICAgLy8gfSlcblxuICAgIC8vIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmb29kLXN2Zy1jb250YWluZXItMScpLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW91dFwiLCAoKSA9PiB7XG5cbiAgICAvLyAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjbGljay1idWJibGUtMScpLmNsYXNzTGlzdC5yZW1vdmUoXCJzaG93XCIpO1xuICAgIC8vIH0pXG5cbn0pXG5cbmNvbnN0IGNyZWF0ZU9ic2VydmVycyA9IChzbGlkZXMpID0+IHtcbiAgICBcbiAgICBsZXQgb3B0aW9ucyA9IHtcbiAgICAgIHJvb3Q6IG51bGwsXG4gICAgICByb290TWFyZ2luOiBcIjBweCAwcHggMHB4IDBweFwiLFxuICAgICAgdGhyZXNob2xkOiAuNVxuICAgIH07XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNsaWRlcy5sZW5ndGggLSAxOyBpKyspIHtcbiAgICAgIFNsaWRlcy5yZW5kZXJTbGlkZShvcHRpb25zLCBzbGlkZXNbaV0sIGkpO1xuICAgIH1cblxufVxuXG5jb25zdCBjcmVhdGVOYXZMaSA9IChpZHgpID0+IHtcbiAgbGV0IG5hdkNvbHVtbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5uYXYtY29sdW1uJyk7XG5cbiAgbGV0IGFuY2hvckxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYVwiKTtcbiAgYW5jaG9yTGluay5zZXRBdHRyaWJ1dGUoXCJocmVmXCIsIGAjYW5jaG9yLSR7aWR4fWApO1xuICBuYXZDb2x1bW4uYXBwZW5kQ2hpbGQoYW5jaG9yTGluayk7XG5cbiAgbGV0IG5hdkxpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpO1xuICBuYXZMaS5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBgbmF2LWxpLSR7aWR4fWApO1xuICBuYXZMaS5jbGFzc0xpc3QuYWRkKFwibmF2LWxpXCIpO1xuICBhbmNob3JMaW5rLmFwcGVuZENoaWxkKG5hdkxpKTtcblxufVxuXG5jb25zdCBjcmVhdGVBbmNob3IgPSAoaWR4KSA9PiB7XG4gIGxldCBzbGlkZUNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBzbGlkZS1jb250YWluZXItJHtpZHh9YCk7XG5cbiAgbGV0IGFuY2hvclRhZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJhXCIpO1xuICBhbmNob3JUYWcuc2V0QXR0cmlidXRlKFwiaWRcIiwgYGFuY2hvci0ke2lkeH1gKTtcbiAgYW5jaG9yVGFnLmNsYXNzTGlzdC5hZGQoXCJhbmNob3JcIik7XG5cbiAgc2xpZGVDb250YWluZXIuYXBwZW5kQ2hpbGQoYW5jaG9yVGFnKTtcbn1cblxuXG4iLCIgICAgY29uc3QgYWRkQWxsRmx5aW5nRm9vZExpc3RlbmVycyA9ICgpID0+IHtcblxuICAgICAgICBsZXQgZm9vZENvdW50ZXJzID0ge307XG5cbiAgICAgICAgY29uc3QgYWRkRmx5aW5nRm9vZExpc3RlbmVyID0gaWR4ID0+IHtcbiAgICAgICAgICAgIGxldCBmb29kSWNvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBmb29kLXN2Zy1jb250YWluZXItJHtpZHh9YCk7XG5cbiAgICAgICAgICAgIGZvb2RJY29uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBlID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgZm9vZENoaWxkcmVuID0gZm9vZEljb24uY2hpbGROb2RlcztcbiAgICAgICAgICAgICAgICB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChmb29kQ2hpbGRyZW5bM10pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMzA7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvb2RJY29uLnJlbW92ZUNoaWxkKGZvb2RDaGlsZHJlblszXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LCAzMDAwKTtcblxuICAgICAgICAgICAgICAgIGxldCBtb3ZlbWVudEZ1bmMgPSBuZXdGb29kID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgc3RhcnQgPSBudWxsO1xuXG4gICAgICAgICAgICAgICAgbGV0IHNpZ25lZE9uZXMgPSBbLTEsIDFdO1xuICAgICAgICAgICAgICAgIGxldCByYW5kb21JZHggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAyKTtcbiAgICAgICAgICAgICAgICBsZXQgcmFuZG9tbHlTaWduZWRPbmUgPSBzaWduZWRPbmVzW3JhbmRvbUlkeF07XG5cbiAgICAgICAgICAgICAgICBjb25zdCBzdGVwID0gdGltZXN0YW1wID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFzdGFydCkgc3RhcnQgPSB0aW1lc3RhbXA7XG4gICAgICAgICAgICAgICAgICAgIGxldCBwcm9ncmVzcyA9IHRpbWVzdGFtcCAtIHN0YXJ0O1xuICAgICAgICAgICAgICAgICAgICBuZXdGb29kLnN0eWxlLnRyYW5zZm9ybSA9IFwidHJhbnNsYXRlKFwiICsgKHByb2dyZXNzICogcmFuZG9tbHlTaWduZWRPbmUpICsgXCJweCwgXCIgKyBwcm9ncmVzcyArIFwicHgpXCI7XG4gICAgICAgICAgICAgICAgICAgIGlmIChwcm9ncmVzcyA8IDI1MDApIHtcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShzdGVwKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKHN0ZXApO1xuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gZm9vZENvdW50ZXJzW2lkeF07IGkgPCBmb29kQ291bnRlcnNbaWR4XSArIDMwOyBpKyspIHtcbiAgICAgICAgICAgICAgICBsZXQgbmV3Rm9vZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgICAgICAgICAgbmV3Rm9vZC5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBgZmx5aW5nLWZvb2Qtb2YtdHlwZS0ke2lkeH0tJHtpfWApO1xuICAgICAgICAgICAgICAgIG5ld0Zvb2QuY2xhc3NMaXN0LmFkZChgZmx5aW5nLWZvb2QtJHtpZHh9YCk7XG4gICAgICAgICAgICAgICAgbmV3Rm9vZC5jbGFzc0xpc3QuYWRkKGBmbHlpbmctZm9vZGApO1xuICAgICAgICAgICAgICAgIGZvb2RJY29uLmFwcGVuZENoaWxkKG5ld0Zvb2QpO1xuXG4gICAgICAgICAgICAgICAgbGV0IHRoaXNPbmVQYXJ0aWN1bGFyRm9vZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFxuICAgICAgICAgICAgICAgICAgICBgZmx5aW5nLWZvb2Qtb2YtdHlwZS0ke2lkeH0tJHtpfWBcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIHRoaXNPbmVQYXJ0aWN1bGFyRm9vZC5zdHlsZS50b3AgPSAoTWF0aC5yYW5kb20oKSAqIC0zMDApICsgd2luZG93LnNjcm9sbFkgKyBcInB4XCI7XG4gICAgICAgICAgICAgICAgdGhpc09uZVBhcnRpY3VsYXJGb29kLnN0eWxlLmxlZnQgPVxuICAgICAgICAgICAgICAgICAgICBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiB3aW5kb3cuaW5uZXJXaWR0aCkgKyBcInB4XCI7XG5cbiAgICAgICAgICAgICAgICBtb3ZlbWVudEZ1bmModGhpc09uZVBhcnRpY3VsYXJGb29kKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBmb29kQ291bnRlcnNbaWR4XSArPSAxMDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTg7IGkrKykge1xuICAgICAgICAgICAgZm9vZENvdW50ZXJzW2ldID0gMDtcbiAgICAgICAgICAgIGFkZEZseWluZ0Zvb2RMaXN0ZW5lcihpKTtcbiAgICAgICAgfVxuXG5cblxuICAgIH1cblxuICAgIGV4cG9ydCBkZWZhdWx0IGFkZEFsbEZseWluZ0Zvb2RMaXN0ZW5lcnM7IiwiZXhwb3J0IGNvbnN0IHJlbmRlclNsaWRlID0gKG9wdGlvbnMsIHNsaWRlLCBpZHgpID0+IHtcblxuICBjb25zdCBoYW5kbGVTY3JvbGxPbnRvID0gKGVudHJpZXMsIG9ic2VydmVyKSA9PiB7XG4gICAgZW50cmllcy5mb3JFYWNoKGVudHJ5ID0+IHtcbiAgICAgIGlmIChlbnRyeS5pc0ludGVyc2VjdGluZykge1xuXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC5zbGlkZS1zdmctJHtpZHh9YClcbiAgICAgICAgICAuY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKTtcblxuICAgICAgICBsZXQgY3VycmVudFNWRyA9IGQzLnNlbGVjdChgLnNsaWRlLXN2Zy0ke2lkeH1gKTtcblxuICAgICAgICBsZXQgdG9vbHRpcCA9IGQzXG4gICAgICAgICAgLnNlbGVjdChcImJvZHlcIilcbiAgICAgICAgICAuYXBwZW5kKFwiZGl2XCIpXG4gICAgICAgICAgLnN0eWxlKFwicG9zaXRpb25cIiwgXCJhYnNvbHV0ZVwiKVxuICAgICAgICAgIC5zdHlsZShcImZvbnQtc2l6ZVwiLCBcIjEycHhcIilcbiAgICAgICAgICAuc3R5bGUoXCJ6LWluZGV4XCIsIFwiMTBcIilcbiAgICAgICAgICAuc3R5bGUoXCJ2aXNpYmlsaXR5XCIsIFwiaGlkZGVuXCIpO1xuICAgICAgICBcbiAgICAgICAgY29uc3QgbnV0cmllbnRzID0gW1wiZmliZXJcIiwgXCJpcm9uXCIsIFwibWFnbmVzaXVtXCIsIFwicG90YXNzaXVtXCIsIFwiemluY1wiLCBcInZpdGFtaW4gQ1wiLCBcImZvbGF0ZVwiLCBcInZpdGFtaW4gQjEyXCIsIFwidml0YW1pbiBBXCIsIFwidml0YW1pbiBEXCJdO1xuXG4gICAgICAgIGN1cnJlbnRTVkdcbiAgICAgICAgICAuc2VsZWN0QWxsKFwicmVjdFwiKVxuICAgICAgICAgIC5vbihcIm1vdXNlb3ZlclwiLCBmdW5jdGlvbihkKSB7XG4gICAgICAgICAgICByZXR1cm4gdG9vbHRpcC5zdHlsZShcInZpc2liaWxpdHlcIiwgXCJ2aXNpYmxlXCIpO1xuICAgICAgICAgIH0pXG4gICAgICAgICAgLm9uKFwibW91c2Vtb3ZlXCIsIGZ1bmN0aW9uKGQsIGkpIHtcbiAgICAgICAgICAgIHJldHVybiB0b29sdGlwXG4gICAgICAgICAgICAgIC5zdHlsZShcInRvcFwiLCBldmVudC5wYWdlWSAtIDYwICsgXCJweFwiKVxuICAgICAgICAgICAgICAuc3R5bGUoXCJsZWZ0XCIsIGV2ZW50LnBhZ2VYIC0gMzAgKyBcInB4XCIpXG4gICAgICAgICAgICAgIC5zdHlsZShcImJhY2tncm91bmQtY29sb3JcIiwgXCJ3aGl0ZVwiKVxuICAgICAgICAgICAgICAuc3R5bGUoXCJib3JkZXJcIiwgXCIycHggc29saWQgYmxhY2tcIilcbiAgICAgICAgICAgICAgLnN0eWxlKFwicGFkZGluZ1wiLCBcIjVweFwiKVxuICAgICAgICAgICAgICAuc3R5bGUoXCJib3JkZXItcmFkaXVzXCIsIFwiM3B4XCIpXG4gICAgICAgICAgICAgIC50ZXh0KGAke251dHJpZW50c1tpXX06ICR7ZH0lYCk7XG4gICAgICAgICAgfSlcbiAgICAgICAgICAub24oXCJtb3VzZW91dFwiLCBmdW5jdGlvbihkKSB7XG4gICAgICAgICAgICByZXR1cm4gdG9vbHRpcC5zdHlsZShcInZpc2liaWxpdHlcIiwgXCJoaWRkZW5cIik7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC5zbGlkZS1zdmctJHtpZHggLSAxfWApKSB7XG4gICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLnNsaWRlLXN2Zy0ke2lkeCAtIDF9YClcbiAgICAgICAgICAuY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuc2xpZGUtc3ZnLSR7aWR4ICsgMX1gKSkge1xuICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC5zbGlkZS1zdmctJHtpZHggKyAxfWApXG4gICAgICAgICAgLmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XG4gICAgICAgIH1cblxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGAuc2xpZGUtc3ZnLSR7aWR4fS1yZWN0YCkuZm9yRWFjaChyZWN0ID0+IHtcbiAgICAgICAgICAvLyByZWN0LmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIik7XG4gICAgICAgICAgcmVjdC5jbGFzc0xpc3QuYWRkKFwiY2hhcnQtcmVjdFwiKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZDMuc2VsZWN0KGAuc2xpZGUtc3ZnLSR7aWR4fS15LWF4aXNgKVxuICAgICAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgICAgICAuc3R5bGUoXCJvcGFjaXR5XCIsIFwiMTAwJVwiKVxuICAgICAgICAgIC5kdXJhdGlvbig1MDApO1xuXG4gICAgICAgIGxldCBuYXZDaXJjbGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgbmF2LWxpLSR7aWR4fWApO1xuICAgICAgICBuYXZDaXJjbGUuY2xhc3NMaXN0LmFkZChgbmF2LWxpLSR7aWR4fWApO1xuXG5cblxuICAgICAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgLnNsaWRlLXN2Zy0ke2lkeCAtIDF9LXJlY3RgKSkge1xuICAgICAgICAgICAgZG9jdW1lbnRcbiAgICAgICAgICAgICAgLnF1ZXJ5U2VsZWN0b3JBbGwoYC5zbGlkZS1zdmctJHtpZHggLSAxfS1yZWN0YClcbiAgICAgICAgICAgICAgLmZvckVhY2gocmVjdCA9PiB7XG4gICAgICAgICAgICAgICAgLy8gcmVjdC5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xuICAgICAgICAgICAgICAgIHJlY3QuY2xhc3NMaXN0LnJlbW92ZShcImNoYXJ0LXJlY3RcIik7XG4gICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBkMy5zZWxlY3QoYC5zbGlkZS1zdmctJHtpZHggLSAxfS15LWF4aXNgKVxuICAgICAgICAgICAgICAudHJhbnNpdGlvbigpXG4gICAgICAgICAgICAgIC5zdHlsZShcIm9wYWNpdHlcIiwgXCIwJVwiKVxuICAgICAgICAgICAgICAuZHVyYXRpb24oNTAwKTtcbiAgICAgICAgICAgIFxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBuYXYtbGktJHtpZHggLSAxfWApKSB7XG4gICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYG5hdi1saS0ke2lkeCAtIDF9YCkuY2xhc3NMaXN0LnJlbW92ZShgbmF2LWxpLSR7aWR4IC0gMX1gKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGAuc2xpZGUtc3ZnLSR7aWR4ICsgMX0tcmVjdGApKSB7XG4gICAgICAgICAgICBkb2N1bWVudFxuICAgICAgICAgICAgICAucXVlcnlTZWxlY3RvckFsbChgLnNsaWRlLXN2Zy0ke2lkeCArIDF9LXJlY3RgKVxuICAgICAgICAgICAgICAuZm9yRWFjaChyZWN0ID0+IHtcbiAgICAgICAgICAgICAgICByZWN0LmNsYXNzTGlzdC5yZW1vdmUoXCJjaGFydC1yZWN0XCIpO1xuICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgZDMuc2VsZWN0KGAuc2xpZGUtc3ZnLSR7aWR4ICsgMX0teS1heGlzYClcbiAgICAgICAgICAgICAgLnRyYW5zaXRpb24oKVxuICAgICAgICAgICAgICAuc3R5bGUoXCJvcGFjaXR5XCIsIFwiMCVcIilcbiAgICAgICAgICAgICAgLmR1cmF0aW9uKDUwMCk7XG5cbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBuYXYtbGktJHtpZHggKyAxfWApLmNsYXNzTGlzdC5yZW1vdmUoYG5hdi1saS0ke2lkeCArIDF9YCk7ICAgICAgICAgICAgICBcbiAgICAgICAgfVxuXG4gICAgICAgICAgXG4gICAgICB9XG4gICAgfSk7XG4gIH07XG5cbiAgbGV0IG9ic2VydmVyID0gbmV3IEludGVyc2VjdGlvbk9ic2VydmVyKGhhbmRsZVNjcm9sbE9udG8sIG9wdGlvbnMpO1xuICBvYnNlcnZlci5vYnNlcnZlKHNsaWRlKTtcblxufSIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpbiJdLCJzb3VyY2VSb290IjoiIn0=