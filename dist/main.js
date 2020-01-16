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
  var svg = d3 // .select("#vis")
  .select("#svg-container-".concat(idx)).append("svg").attr("class", "".concat(targetSVG, " hidden")).attr("viewBox", "0 0 575 675").attr("preserveAspectRatio", "xMinYMin meet"); // .attr("width", w + margin.left + margin.right)
  // .attr("height", h + margin.top + margin.bottom);

  var xAxis = d3.axisBottom(xScale).tickSize(0).tickFormat(function (d) {
    return Object.keys(foodData).slice(2, -1)[d];
  });

  if (createXAxisBool !== undefined) {
    svg.append("g").attr("class", "".concat(targetSVG, "-x-axis x-axis")).attr("transform", "translate(" + margin.left + ", " + (h - margin.top) + ")").transition().duration(1000).call(xAxis);
    svg.selectAll(".x-axis text").attr("transform", function (d) {
      return "translate(10, 25)rotate(-45)";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL2ZseWluZ19mb29kLmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL3Njcm9sbC9zbGlkZXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0eWxlcy9pbmRleC5zY3NzIl0sIm5hbWVzIjpbIm51dHJpdGlvbkRhdGEiLCJkMyIsImNzdiIsImQiLCJmb29kX25hbWUiLCJzZXJ2aW5nX3NpemUiLCJmaWJlciIsImlyb24iLCJtYWduZXNpdW0iLCJwb3Rhc3NpdW0iLCJ6aW5jIiwiZm9sYXRlIiwiY2hvbGVzdGVyb2wiLCJ0aGVuIiwiZGF0YSIsImNvbnNvbGUiLCJsb2ciLCJjcmVhdGVWaXN1YWxpemF0aW9uIiwiY3JlYXRlTmF2TGkiLCJjcmVhdGVBbmNob3IiLCJpIiwibGVuZ3RoIiwiZm9vZERhdGEiLCJpZHgiLCJjcmVhdGVYQXhpc0Jvb2wiLCJtYXJnaW4iLCJ0b3AiLCJyaWdodCIsImJvdHRvbSIsImxlZnQiLCJ3IiwiaCIsIk9iamVjdCIsInZhbHVlcyIsInNsaWNlIiwibnVtYmVyT2ZDb2x1bW5zIiwibWF4VmFsdWUiLCJNYXRoIiwibWF4IiwieF9heGlzTGVuZ3RoIiwieV9heGlzTGVuZ3RoIiwidGFyZ2V0U1ZHIiwidGFyZ2V0U2xpZGVSZWN0IiwieFNjYWxlIiwic2NhbGVMaW5lYXIiLCJkb21haW4iLCJyYW5nZSIsInlTY2FsZSIsInN2ZyIsInNlbGVjdCIsImFwcGVuZCIsImF0dHIiLCJ4QXhpcyIsImF4aXNCb3R0b20iLCJ0aWNrU2l6ZSIsInRpY2tGb3JtYXQiLCJrZXlzIiwidW5kZWZpbmVkIiwidHJhbnNpdGlvbiIsImR1cmF0aW9uIiwiY2FsbCIsInNlbGVjdEFsbCIsInN0eWxlIiwidGV4dCIsInlBeGlzIiwiYXhpc0xlZnQiLCJ0aWNrcyIsImVudGVyIiwiaGFuZGxlTW91c2VvdmVyIiwiZWFzZSIsIndpbmRvdyIsImFkZEV2ZW50TGlzdGVuZXIiLCJlIiwic2xpZGVzIiwic2xpZGVOYW1lIiwibmV3U2xpZGUiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJwdXNoIiwiY3JlYXRlT2JzZXJ2ZXJzIiwiYWRkQWxsRmx5aW5nRm9vZExpc3RlbmVycyIsIm9wdGlvbnMiLCJyb290Iiwicm9vdE1hcmdpbiIsInRocmVzaG9sZCIsIlNsaWRlcyIsIm5hdkNvbHVtbiIsImFuY2hvckxpbmsiLCJjcmVhdGVFbGVtZW50Iiwic2V0QXR0cmlidXRlIiwiYXBwZW5kQ2hpbGQiLCJuYXZMaSIsImNsYXNzTGlzdCIsImFkZCIsInNsaWRlQ29udGFpbmVyIiwiZ2V0RWxlbWVudEJ5SWQiLCJhbmNob3JUYWciLCJmb29kQ291bnRlcnMiLCJhZGRGbHlpbmdGb29kTGlzdGVuZXIiLCJmb29kSWNvbiIsImZvb2RDaGlsZHJlbiIsImNoaWxkTm9kZXMiLCJyZW1vdmVDaGlsZCIsIm1vdmVtZW50RnVuYyIsIm5ld0Zvb2QiLCJzdGFydCIsInNpZ25lZE9uZXMiLCJyYW5kb21JZHgiLCJmbG9vciIsInJhbmRvbSIsInJhbmRvbWx5U2lnbmVkT25lIiwic3RlcCIsInRpbWVzdGFtcCIsInByb2dyZXNzIiwidHJhbnNmb3JtIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwidGhpc09uZVBhcnRpY3VsYXJGb29kIiwiaW5uZXJXaWR0aCIsInJlbmRlclNsaWRlIiwic2xpZGUiLCJoYW5kbGVTY3JvbGxPbnRvIiwiZW50cmllcyIsIm9ic2VydmVyIiwiZm9yRWFjaCIsImVudHJ5IiwiaXNJbnRlcnNlY3RpbmciLCJyZW1vdmUiLCJxdWVyeVNlbGVjdG9yQWxsIiwicmVjdCIsIm5hdkNpcmNsZSIsIkludGVyc2VjdGlvbk9ic2VydmVyIiwib2JzZXJ2ZSJdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7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Q0FBQ21ELGdCQUFULHNCQUF3Q3hHLEdBQUcsR0FBRyxDQUE5QyxXQUFKLEVBQTZEO0FBQ3pEO0FBQ0FxRCxrQkFBUSxDQUNMbUQsZ0JBREgsc0JBQ2tDeEcsR0FBRyxHQUFHLENBRHhDLFlBRUdvRyxPQUZILENBRVcsVUFBQUssSUFBSSxFQUFJO0FBQ2Y7QUFDQUEsZ0JBQUksQ0FBQ3BDLFNBQUwsQ0FBZWtDLE1BQWYsQ0FBc0IsWUFBdEI7QUFDRCxXQUxIO0FBT0E3SCxZQUFFLENBQUNnRCxNQUFILHNCQUF3QjFCLEdBQUcsR0FBRyxDQUE5QixjQUNHbUMsVUFESCxHQUVHSSxLQUZILENBRVMsU0FGVCxFQUVvQixJQUZwQixFQUdHSCxRQUhILENBR1ksR0FIWjtBQUtBaUIsa0JBQVEsQ0FBQ21CLGNBQVQsa0JBQWtDeEUsR0FBRyxHQUFHLENBQXhDLEdBQTZDcUUsU0FBN0MsQ0FBdURrQyxNQUF2RCxrQkFBd0V2RyxHQUFHLEdBQUcsQ0FBOUU7QUFDSDtBQUdGO0FBQ0YsS0FyRUQ7QUFzRUQsR0F2RUQ7O0FBeUVBLE1BQUltRyxRQUFRLEdBQUcsSUFBSVEsb0JBQUosQ0FBeUJWLGdCQUF6QixFQUEyQ3ZDLE9BQTNDLENBQWY7QUFDQXlDLFVBQVEsQ0FBQ1MsT0FBVCxDQUFpQlosS0FBakI7QUFFRCxDQTlFTSxDOzs7Ozs7Ozs7OztBQ0FQLHVDIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9kaXN0L1wiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC5qc1wiKTtcbiIsImltcG9ydCAnLi9zdHlsZXMvaW5kZXguc2Nzcyc7XG5pbXBvcnQgKiBhcyBTbGlkZXMgZnJvbSAnLi9zY3JpcHRzL3Njcm9sbC9zbGlkZXMnO1xuaW1wb3J0IGFkZEFsbEZseWluZ0Zvb2RMaXN0ZW5lcnMgZnJvbSAnLi9zY3JpcHRzL2ZseWluZ19mb29kJztcblxubGV0IG51dHJpdGlvbkRhdGE7XG5cbmQzLmNzdihcIm51dHJpdGlvbl9mYWN0c19mb3Jfc2Nyb2xsZXIuY3N2XCIsIGQgPT4ge1xuICByZXR1cm4ge1xuICAgIGZvb2RfbmFtZTogZFtcIkZvb2QgbmFtZVwiXSxcbiAgICBzZXJ2aW5nX3NpemU6IGRbXCJBbW91bnRcIl0sXG4gICAgZmliZXI6ICtkW1wiRmliZXJcIl0sXG4gICAgaXJvbjogK2RbXCJJcm9uXCJdLFxuICAgIG1hZ25lc2l1bTogK2RbXCJNYWduZXNpdW1cIl0sXG4gICAgcG90YXNzaXVtOiArZFtcIlBvdGFzc2l1bVwiXSxcbiAgICB6aW5jOiArZFtcIlppbmNcIl0sXG4gICAgXCJ2aXRhbWluIENcIjogK2RbXCJWaXRhbWluIENcIl0sXG4gICAgZm9sYXRlOiArZFtcIkZvbGF0ZVwiXSxcbiAgICBcInZpdGFtaW4gQjEyXCI6ICtkW1wiVml0YW1pbiBCLTEyXCJdLFxuICAgIFwidml0YW1pbiBBXCI6ICtkW1wiVml0YW1pbiBBXCJdLFxuICAgIFwidml0YW1pbiBEXCI6ICtkW1wiVml0YW1pbiBEXCJdLFxuICAgIGNob2xlc3Rlcm9sOiArZFtcIkNob2xlc3Rlcm9sXCJdXG4gIH07XG59KS50aGVuKGRhdGEgPT4ge1xuICAgIG51dHJpdGlvbkRhdGEgPSBkYXRhO1xuICAgIGNvbnNvbGUubG9nKG51dHJpdGlvbkRhdGEpO1xuICAgIFxuICAgIGNyZWF0ZVZpc3VhbGl6YXRpb24obnV0cml0aW9uRGF0YVswXSwgMCwgdHJ1ZSk7XG4gICAgY3JlYXRlTmF2TGkoMCk7XG4gICAgY3JlYXRlQW5jaG9yKDApO1xuICAgIFxuICAgIGZvciAobGV0IGkgPSAxOyBpIDwgbnV0cml0aW9uRGF0YS5sZW5ndGg7IGkrKykge1xuICAgICAgY3JlYXRlVmlzdWFsaXphdGlvbihudXRyaXRpb25EYXRhW2ldLCBpKTtcbiAgICAgIGNyZWF0ZU5hdkxpKGkpO1xuICAgICAgY3JlYXRlQW5jaG9yKGkpO1xuICAgIH1cblxufSk7XG5cbmNvbnN0IGNyZWF0ZVZpc3VhbGl6YXRpb24gPSAoZm9vZERhdGEsIGlkeCwgY3JlYXRlWEF4aXNCb29sKSA9PiB7XG4gIGxldCBtYXJnaW4gPSB7dG9wOiAyMCwgcmlnaHQ6IDQwLCBib3R0b206IDI1LCBsZWZ0OiA2MH1cbiAgbGV0IHcgPSA2MDAgLSBtYXJnaW4ubGVmdCAtIG1hcmdpbi5yaWdodDtcbiAgbGV0IGggPSA0NzUgLSBtYXJnaW4udG9wIC0gbWFyZ2luLmJvdHRvbTtcblxuICBsZXQgZGF0YSA9IE9iamVjdC52YWx1ZXMoZm9vZERhdGEpLnNsaWNlKDIsIC0xKTtcbiAgbGV0IG51bWJlck9mQ29sdW1ucyA9IDEwO1xuICBsZXQgbWF4VmFsdWUgPSBNYXRoLm1heCguNTAsIGQzLm1heChkYXRhLCBmdW5jdGlvbihkKSB7XG4gICAgcmV0dXJuICgrZCAvIDEwMCk7XG4gIH0pKTtcbiAgbGV0IHhfYXhpc0xlbmd0aCA9IHc7XG4gIGxldCB5X2F4aXNMZW5ndGggPSBoO1xuICBsZXQgdGFyZ2V0U1ZHID0gXCJzbGlkZS1zdmctXCIgKyBpZHg7XG4gIGxldCB0YXJnZXRTbGlkZVJlY3QgPSBcInNsaWRlLXN2Zy1cIiArIGlkeCArIFwiLXJlY3RcIjtcblxuICBsZXQgeFNjYWxlID0gZDNcbiAgICAuc2NhbGVMaW5lYXIoKVxuICAgIC5kb21haW4oWzAsIG51bWJlck9mQ29sdW1uc10pXG4gICAgLnJhbmdlKFswLCB3XSk7XG5cbiAgbGV0IHlTY2FsZSA9IGQzXG4gICAgLnNjYWxlTGluZWFyKClcbiAgICAuZG9tYWluKFswLCBtYXhWYWx1ZV0pXG4gICAgLnJhbmdlKFtoIC0gbWFyZ2luLnRvcCwgbWFyZ2luLmJvdHRvbV0pO1xuXG4gIGxldCBzdmcgPSBkM1xuICAgIC8vIC5zZWxlY3QoXCIjdmlzXCIpXG4gICAgLnNlbGVjdChgI3N2Zy1jb250YWluZXItJHtpZHh9YClcbiAgICAuYXBwZW5kKFwic3ZnXCIpXG4gICAgLmF0dHIoXCJjbGFzc1wiLCBgJHt0YXJnZXRTVkd9IGhpZGRlbmApXG4gICAgLmF0dHIoXCJ2aWV3Qm94XCIsIGAwIDAgNTc1IDY3NWApXG4gICAgLmF0dHIoXCJwcmVzZXJ2ZUFzcGVjdFJhdGlvXCIsIFwieE1pbllNaW4gbWVldFwiKTtcbiAgICAvLyAuYXR0cihcIndpZHRoXCIsIHcgKyBtYXJnaW4ubGVmdCArIG1hcmdpbi5yaWdodClcbiAgICAvLyAuYXR0cihcImhlaWdodFwiLCBoICsgbWFyZ2luLnRvcCArIG1hcmdpbi5ib3R0b20pO1xuXG4gIGxldCB4QXhpcyA9IGQzXG4gICAgLmF4aXNCb3R0b20oeFNjYWxlKVxuICAgIC50aWNrU2l6ZSgwKVxuICAgIC50aWNrRm9ybWF0KGZ1bmN0aW9uKGQpIHtcbiAgICAgIHJldHVybiBPYmplY3Qua2V5cyhmb29kRGF0YSkuc2xpY2UoMiwgLTEpW2RdO1xuICAgIH0pO1xuXG4gIGlmIChjcmVhdGVYQXhpc0Jvb2wgIT09IHVuZGVmaW5lZCkge1xuICAgIHN2Z1xuICAgICAgLmFwcGVuZChcImdcIilcbiAgICAgIC5hdHRyKFwiY2xhc3NcIiwgYCR7dGFyZ2V0U1ZHfS14LWF4aXMgeC1heGlzYClcbiAgICAgIC5hdHRyKFxuICAgICAgICBcInRyYW5zZm9ybVwiLFxuICAgICAgICBcInRyYW5zbGF0ZShcIiArIG1hcmdpbi5sZWZ0ICsgXCIsIFwiICsgKGggLSBtYXJnaW4udG9wKSArIFwiKVwiXG4gICAgICApXG4gICAgICAudHJhbnNpdGlvbigpXG4gICAgICAuZHVyYXRpb24oMTAwMClcbiAgICAgIC5jYWxsKHhBeGlzKTtcblxuICAgIHN2Zy5zZWxlY3RBbGwoXCIueC1heGlzIHRleHRcIikuYXR0cihcInRyYW5zZm9ybVwiLCBmdW5jdGlvbihkKSB7XG4gICAgICByZXR1cm4gXCJ0cmFuc2xhdGUoMTAsIDI1KXJvdGF0ZSgtNDUpXCI7XG4gICAgfSk7XG5cbiAgICBzdmdcbiAgICAgIC5hcHBlbmQoXCJ0ZXh0XCIpXG4gICAgICAuYXR0cihcInRyYW5zZm9ybVwiLCBcInJvdGF0ZSgtOTApXCIpXG4gICAgICAuYXR0cihcImNsYXNzXCIsIFwieS1heGlzLWxhYmVsXCIpXG4gICAgICAuYXR0cihcInlcIiwgLTUpXG4gICAgICAuYXR0cihcInhcIiwgMCAtIGggLyAyKVxuICAgICAgLmF0dHIoXCJkeVwiLCBcIjFlbVwiKVxuICAgICAgLnN0eWxlKFwidGV4dC1hbmNob3JcIiwgXCJtaWRkbGVcIilcbiAgICAgIC50ZXh0KFwiUGVyY2VudGFnZSBvZiByZWNvbW1lbmRlZCBkYWlseSBhbGxvd2FuY2UoUkRBKVwiKTtcbiAgfVxuXG4gIGxldCB5QXhpcyA9IGQzLmF4aXNMZWZ0KHlTY2FsZSkudGlja3MoNCwgXCIlXCIpO1xuXG4gIHN2Z1xuICAgIC5hcHBlbmQoXCJnXCIpXG4gICAgLmF0dHIoXCJjbGFzc1wiLCBgJHt0YXJnZXRTVkd9LXktYXhpcyB5LWF4aXNgKVxuICAgIC5hdHRyKFwidHJhbnNmb3JtXCIsIFwidHJhbnNsYXRlKFwiICsgbWFyZ2luLmxlZnQgKyBcIiwwKVwiKVxuICAgIC5zdHlsZShcIm9wYWNpdHlcIiwgXCIwJVwiKVxuICAgIC5jYWxsKHlBeGlzKTtcblxuICBzdmdcbiAgICAuc2VsZWN0QWxsKFwicmVjdFwiKVxuICAgIC5kYXRhKGRhdGEpXG4gICAgLmVudGVyKClcbiAgICAuYXBwZW5kKFwicmVjdFwiKVxuICAgIC5hdHRyKFwiY2xhc3NcIiwgYCR7dGFyZ2V0U2xpZGVSZWN0fWApXG4gICAgLmF0dHIoXCJ4XCIsIGZ1bmN0aW9uKGQsIGkpIHtcbiAgICAgIHJldHVybiBpICogKHhfYXhpc0xlbmd0aCAvIG51bWJlck9mQ29sdW1ucykgKyBtYXJnaW4ubGVmdCArIDEwO1xuICAgIH0pXG4gICAgLmF0dHIoXCJ5XCIsIGZ1bmN0aW9uKGQpIHtcbiAgICAgIHJldHVybiB5U2NhbGUoZCAvIDEwMCk7XG4gICAgfSlcbiAgICAuYXR0cihcIndpZHRoXCIsIHhfYXhpc0xlbmd0aCAvIG51bWJlck9mQ29sdW1ucyAtIDEpXG4gICAgLmF0dHIoXCJoZWlnaHRcIiwgZnVuY3Rpb24oZCkge1xuICAgICAgcmV0dXJuIGggLSB5U2NhbGUoZCAvIDEwMCkgLSBtYXJnaW4udG9wO1xuICAgIH0pXG4gICAgLmF0dHIoXCJmaWxsXCIsIFwicmVkXCIpXG4gICAgLnRyYW5zaXRpb24oKVxuICAgIC5kdXJhdGlvbig1MDApO1xuICAgIC8vIC5vbihcIm1vdXNlb3ZlclwiLCBoYW5kbGVNb3VzZW92ZXIpO1xuXG5cbiAgICBjb25zdCBoYW5kbGVNb3VzZW92ZXIgPSAoZCwgaSkgPT4ge1xuICAgICAgZDMuc2VsZWN0KHRoaXMpXG4gICAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgICAgLmVhc2UoXCJlYXNlXCIpXG4gICAgICAgIC5kdXJhdGlvbig1MDApXG4gICAgICAgIC5hdHRyKFwiZmlsbFwiLCBcIndoaXRlXCIpO1xuICAgIH07XG59O1xuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgKGUpID0+IHtcbiAgICBcbiAgICBsZXQgc2xpZGVzID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxOTsgaSsrKSB7XG4gICAgICAgIGxldCBzbGlkZU5hbWUgPSBcIiNzbGlkZS1jb250YWluZXItXCIgKyBpO1xuICAgICAgICBsZXQgbmV3U2xpZGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNsaWRlTmFtZSk7XG4gICAgICAgIHNsaWRlcy5wdXNoKG5ld1NsaWRlKTtcbiAgICB9XG4gICAgY3JlYXRlT2JzZXJ2ZXJzKHNsaWRlcyk7XG59LCBmYWxzZSk7XG5cblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgKCkgPT4ge1xuXG4gICAgYWRkQWxsRmx5aW5nRm9vZExpc3RlbmVycygpO1xuXG59KVxuXG5jb25zdCBjcmVhdGVPYnNlcnZlcnMgPSAoc2xpZGVzKSA9PiB7XG4gICAgXG4gICAgbGV0IG9wdGlvbnMgPSB7XG4gICAgICByb290OiBudWxsLFxuICAgICAgcm9vdE1hcmdpbjogXCIwcHggMHB4IDBweCAwcHhcIixcbiAgICAgIHRocmVzaG9sZDogLjVcbiAgICB9O1xuXG4gICAgY29uc29sZS5sb2coc2xpZGVzKTtcbiAgICBcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNsaWRlcy5sZW5ndGggLSAxOyBpKyspIHtcbiAgICAgIFNsaWRlcy5yZW5kZXJTbGlkZShvcHRpb25zLCBzbGlkZXNbaV0sIGkpO1xuICAgIH1cblxufVxuXG5jb25zdCBjcmVhdGVOYXZMaSA9IChpZHgpID0+IHtcbiAgbGV0IG5hdkNvbHVtbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5uYXYtY29sdW1uJyk7XG5cbiAgbGV0IGFuY2hvckxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYVwiKTtcbiAgYW5jaG9yTGluay5zZXRBdHRyaWJ1dGUoXCJocmVmXCIsIGAjYW5jaG9yLSR7aWR4fWApO1xuICBuYXZDb2x1bW4uYXBwZW5kQ2hpbGQoYW5jaG9yTGluayk7XG5cbiAgbGV0IG5hdkxpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpO1xuICBuYXZMaS5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBgbmF2LWxpLSR7aWR4fWApO1xuICBuYXZMaS5jbGFzc0xpc3QuYWRkKFwibmF2LWxpXCIpO1xuICBhbmNob3JMaW5rLmFwcGVuZENoaWxkKG5hdkxpKTtcblxufVxuXG5jb25zdCBjcmVhdGVBbmNob3IgPSAoaWR4KSA9PiB7XG4gIGxldCBzbGlkZUNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBzbGlkZS1jb250YWluZXItJHtpZHh9YCk7XG5cbiAgbGV0IGFuY2hvclRhZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJhXCIpO1xuICBhbmNob3JUYWcuc2V0QXR0cmlidXRlKFwiaWRcIiwgYGFuY2hvci0ke2lkeH1gKTtcbiAgYW5jaG9yVGFnLmNsYXNzTGlzdC5hZGQoXCJhbmNob3JcIik7XG5cbiAgc2xpZGVDb250YWluZXIuYXBwZW5kQ2hpbGQoYW5jaG9yVGFnKTtcbn1cblxuXG4iLCIgICAgY29uc3QgYWRkQWxsRmx5aW5nRm9vZExpc3RlbmVycyA9ICgpID0+IHtcblxuICAgICAgICBsZXQgZm9vZENvdW50ZXJzID0ge307XG5cbiAgICAgICAgY29uc3QgYWRkRmx5aW5nRm9vZExpc3RlbmVyID0gaWR4ID0+IHtcbiAgICAgICAgICAgIGxldCBmb29kSWNvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBmb29kLXN2Zy1jb250YWluZXItJHtpZHh9YCk7XG5cbiAgICAgICAgICAgIGZvb2RJY29uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBlID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgZm9vZENoaWxkcmVuID0gZm9vZEljb24uY2hpbGROb2RlcztcbiAgICAgICAgICAgICAgICBpZiAoZm9vZENoaWxkcmVuWzNdKSB7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAzMDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvb2RJY29uLnJlbW92ZUNoaWxkKGZvb2RDaGlsZHJlblszXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGxldCBtb3ZlbWVudEZ1bmMgPSBuZXdGb29kID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgc3RhcnQgPSBudWxsO1xuXG4gICAgICAgICAgICAgICAgbGV0IHNpZ25lZE9uZXMgPSBbLTEsIDFdO1xuICAgICAgICAgICAgICAgIGxldCByYW5kb21JZHggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAyKTtcbiAgICAgICAgICAgICAgICBsZXQgcmFuZG9tbHlTaWduZWRPbmUgPSBzaWduZWRPbmVzW3JhbmRvbUlkeF07XG5cbiAgICAgICAgICAgICAgICBjb25zdCBzdGVwID0gdGltZXN0YW1wID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFzdGFydCkgc3RhcnQgPSB0aW1lc3RhbXA7XG4gICAgICAgICAgICAgICAgICAgIGxldCBwcm9ncmVzcyA9IHRpbWVzdGFtcCAtIHN0YXJ0O1xuICAgICAgICAgICAgICAgICAgICBuZXdGb29kLnN0eWxlLnRyYW5zZm9ybSA9IFwidHJhbnNsYXRlKFwiICsgKHByb2dyZXNzICogcmFuZG9tbHlTaWduZWRPbmUpICsgXCJweCwgXCIgKyBwcm9ncmVzcyArIFwicHgpXCI7XG4gICAgICAgICAgICAgICAgICAgIGlmIChwcm9ncmVzcyA8IDE1MDApIHtcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShzdGVwKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKHN0ZXApO1xuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gZm9vZENvdW50ZXJzW2lkeF07IGkgPCBmb29kQ291bnRlcnNbaWR4XSArIDMwOyBpKyspIHtcbiAgICAgICAgICAgICAgICBsZXQgbmV3Rm9vZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgICAgICAgICAgbmV3Rm9vZC5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBgZmx5aW5nLWZvb2Qtb2YtdHlwZS0ke2lkeH0tJHtpfWApO1xuICAgICAgICAgICAgICAgIG5ld0Zvb2QuY2xhc3NMaXN0LmFkZChgZmx5aW5nLWZvb2QtJHtpZHh9YCk7XG4gICAgICAgICAgICAgICAgbmV3Rm9vZC5jbGFzc0xpc3QuYWRkKGBmbHlpbmctZm9vZGApO1xuICAgICAgICAgICAgICAgIGZvb2RJY29uLmFwcGVuZENoaWxkKG5ld0Zvb2QpO1xuXG4gICAgICAgICAgICAgICAgbGV0IHRoaXNPbmVQYXJ0aWN1bGFyRm9vZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFxuICAgICAgICAgICAgICAgICAgICBgZmx5aW5nLWZvb2Qtb2YtdHlwZS0ke2lkeH0tJHtpfWBcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIHRoaXNPbmVQYXJ0aWN1bGFyRm9vZC5zdHlsZS50b3AgPSBNYXRoLnJhbmRvbSgpICogLTcwMCArIFwicHhcIjtcbiAgICAgICAgICAgICAgICB0aGlzT25lUGFydGljdWxhckZvb2Quc3R5bGUubGVmdCA9XG4gICAgICAgICAgICAgICAgICAgIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHdpbmRvdy5pbm5lcldpZHRoKSArIFwicHhcIjtcblxuICAgICAgICAgICAgICAgIG1vdmVtZW50RnVuYyh0aGlzT25lUGFydGljdWxhckZvb2QpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGZvb2RDb3VudGVyc1tpZHhdICs9IDEwO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxODsgaSsrKSB7XG4gICAgICAgICAgICBmb29kQ291bnRlcnNbaV0gPSAwO1xuICAgICAgICAgICAgYWRkRmx5aW5nRm9vZExpc3RlbmVyKGkpO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBleHBvcnQgZGVmYXVsdCBhZGRBbGxGbHlpbmdGb29kTGlzdGVuZXJzOyIsImV4cG9ydCBjb25zdCByZW5kZXJTbGlkZSA9IChvcHRpb25zLCBzbGlkZSwgaWR4KSA9PiB7XG5cbiAgY29uc3QgaGFuZGxlU2Nyb2xsT250byA9IChlbnRyaWVzLCBvYnNlcnZlcikgPT4ge1xuICAgIGVudHJpZXMuZm9yRWFjaChlbnRyeSA9PiB7XG4gICAgICBpZiAoZW50cnkuaXNJbnRlcnNlY3RpbmcpIHtcblxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuc2xpZGUtc3ZnLSR7aWR4fWApXG4gICAgICAgICAgLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIik7XG5cbiAgICAgICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC5zbGlkZS1zdmctJHtpZHggLSAxfWApKSB7XG4gICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLnNsaWRlLXN2Zy0ke2lkeCAtIDF9YClcbiAgICAgICAgICAuY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuc2xpZGUtc3ZnLSR7aWR4ICsgMX1gKSkge1xuICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC5zbGlkZS1zdmctJHtpZHggKyAxfWApXG4gICAgICAgICAgLmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XG4gICAgICAgIH1cblxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGAuc2xpZGUtc3ZnLSR7aWR4fS1yZWN0YCkuZm9yRWFjaChyZWN0ID0+IHtcbiAgICAgICAgICAvLyByZWN0LmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIik7XG4gICAgICAgICAgcmVjdC5jbGFzc0xpc3QuYWRkKFwiY2hhcnQtcmVjdFwiKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZDMuc2VsZWN0KGAuc2xpZGUtc3ZnLSR7aWR4fS15LWF4aXNgKVxuICAgICAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgICAgICAuc3R5bGUoXCJvcGFjaXR5XCIsIFwiMTAwJVwiKVxuICAgICAgICAgIC5kdXJhdGlvbig1MDApO1xuXG4gICAgICAgIGxldCBuYXZDaXJjbGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgbmF2LWxpLSR7aWR4fWApO1xuICAgICAgICBuYXZDaXJjbGUuY2xhc3NMaXN0LmFkZChgbmF2LWxpLSR7aWR4fWApO1xuXG5cblxuICAgICAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgLnNsaWRlLXN2Zy0ke2lkeCAtIDF9LXJlY3RgKSkge1xuICAgICAgICAgICAgZG9jdW1lbnRcbiAgICAgICAgICAgICAgLnF1ZXJ5U2VsZWN0b3JBbGwoYC5zbGlkZS1zdmctJHtpZHggLSAxfS1yZWN0YClcbiAgICAgICAgICAgICAgLmZvckVhY2gocmVjdCA9PiB7XG4gICAgICAgICAgICAgICAgLy8gcmVjdC5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xuICAgICAgICAgICAgICAgIHJlY3QuY2xhc3NMaXN0LnJlbW92ZShcImNoYXJ0LXJlY3RcIik7XG4gICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBkMy5zZWxlY3QoYC5zbGlkZS1zdmctJHtpZHggLSAxfS15LWF4aXNgKVxuICAgICAgICAgICAgICAudHJhbnNpdGlvbigpXG4gICAgICAgICAgICAgIC5zdHlsZShcIm9wYWNpdHlcIiwgXCIwJVwiKVxuICAgICAgICAgICAgICAuZHVyYXRpb24oNTAwKTtcbiAgICAgICAgICAgIFxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBuYXYtbGktJHtpZHggLSAxfWApKSB7XG4gICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYG5hdi1saS0ke2lkeCAtIDF9YCkuY2xhc3NMaXN0LnJlbW92ZShgbmF2LWxpLSR7aWR4IC0gMX1gKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGAuc2xpZGUtc3ZnLSR7aWR4ICsgMX0tcmVjdGApKSB7XG4gICAgICAgICAgICAvLyBkZWJ1Z2dlcjtcbiAgICAgICAgICAgIGRvY3VtZW50XG4gICAgICAgICAgICAgIC5xdWVyeVNlbGVjdG9yQWxsKGAuc2xpZGUtc3ZnLSR7aWR4ICsgMX0tcmVjdGApXG4gICAgICAgICAgICAgIC5mb3JFYWNoKHJlY3QgPT4ge1xuICAgICAgICAgICAgICAgIC8vIHJlY3QuY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcbiAgICAgICAgICAgICAgICByZWN0LmNsYXNzTGlzdC5yZW1vdmUoXCJjaGFydC1yZWN0XCIpO1xuICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgZDMuc2VsZWN0KGAuc2xpZGUtc3ZnLSR7aWR4ICsgMX0teS1heGlzYClcbiAgICAgICAgICAgICAgLnRyYW5zaXRpb24oKVxuICAgICAgICAgICAgICAuc3R5bGUoXCJvcGFjaXR5XCIsIFwiMCVcIilcbiAgICAgICAgICAgICAgLmR1cmF0aW9uKDUwMCk7XG5cbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBuYXYtbGktJHtpZHggKyAxfWApLmNsYXNzTGlzdC5yZW1vdmUoYG5hdi1saS0ke2lkeCArIDF9YCk7ICAgICAgICAgICAgICBcbiAgICAgICAgfVxuXG4gICAgICAgICAgXG4gICAgICB9XG4gICAgfSk7XG4gIH07XG5cbiAgbGV0IG9ic2VydmVyID0gbmV3IEludGVyc2VjdGlvbk9ic2VydmVyKGhhbmRsZVNjcm9sbE9udG8sIG9wdGlvbnMpO1xuICBvYnNlcnZlci5vYnNlcnZlKHNsaWRlKTtcblxufSIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpbiJdLCJzb3VyY2VSb290IjoiIn0=