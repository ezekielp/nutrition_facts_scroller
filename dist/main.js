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
  .select("#svg-container-".concat(idx)).append("svg").attr("class", "".concat(targetSVG, " hidden")).attr("viewBox", "0 0 650 700").attr("preserveAspectRatio", "xMinYMin meet"); // .attr("width", w + margin.left + margin.right)
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
  document.getElementById('food-svg-container-0').addEventListener("mouseover", function () {
    document.querySelector('.click-bubble').classList.add("show");
  });
  document.getElementById('food-svg-container-0').addEventListener("mouseout", function () {
    document.querySelector('.click-bubble').classList.remove("show");
  });
  document.getElementById('food-svg-container-1').addEventListener("mouseover", function () {
    document.querySelector('#potato-party').classList.add("show");
  });
  document.getElementById('food-svg-container-1').addEventListener("mouseout", function () {
    document.querySelector('#potato-party').classList.remove("show");
  });
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

          if (progress < 2500) {
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
        console.log(window.scrollY);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL2ZseWluZ19mb29kLmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL3Njcm9sbC9zbGlkZXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0eWxlcy9pbmRleC5zY3NzP2M4MDciXSwibmFtZXMiOlsibnV0cml0aW9uRGF0YSIsImQzIiwiY3N2IiwiZCIsImZvb2RfbmFtZSIsInNlcnZpbmdfc2l6ZSIsImZpYmVyIiwiaXJvbiIsIm1hZ25lc2l1bSIsInBvdGFzc2l1bSIsInppbmMiLCJmb2xhdGUiLCJjaG9sZXN0ZXJvbCIsInRoZW4iLCJkYXRhIiwiY29uc29sZSIsImxvZyIsImNyZWF0ZVZpc3VhbGl6YXRpb24iLCJjcmVhdGVOYXZMaSIsImNyZWF0ZUFuY2hvciIsImkiLCJsZW5ndGgiLCJmb29kRGF0YSIsImlkeCIsImNyZWF0ZVhBeGlzQm9vbCIsIm1hcmdpbiIsInRvcCIsInJpZ2h0IiwiYm90dG9tIiwibGVmdCIsInciLCJoIiwiT2JqZWN0IiwidmFsdWVzIiwic2xpY2UiLCJudW1iZXJPZkNvbHVtbnMiLCJtYXhWYWx1ZSIsIk1hdGgiLCJtYXgiLCJ4X2F4aXNMZW5ndGgiLCJ5X2F4aXNMZW5ndGgiLCJ0YXJnZXRTVkciLCJ0YXJnZXRTbGlkZVJlY3QiLCJ4U2NhbGUiLCJzY2FsZUxpbmVhciIsImRvbWFpbiIsInJhbmdlIiwieVNjYWxlIiwic3ZnIiwic2VsZWN0IiwiYXBwZW5kIiwiYXR0ciIsInhBeGlzIiwiYXhpc0JvdHRvbSIsInRpY2tTaXplIiwidGlja0Zvcm1hdCIsImtleXMiLCJ0cmFuc2l0aW9uIiwiZHVyYXRpb24iLCJjYWxsIiwic2VsZWN0QWxsIiwic3R5bGUiLCJ0ZXh0IiwieUF4aXMiLCJheGlzTGVmdCIsInRpY2tzIiwiZW50ZXIiLCJ3aW5kb3ciLCJhZGRFdmVudExpc3RlbmVyIiwiZSIsInNsaWRlcyIsInNsaWRlTmFtZSIsIm5ld1NsaWRlIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwicHVzaCIsImNyZWF0ZU9ic2VydmVycyIsImFkZEFsbEZseWluZ0Zvb2RMaXN0ZW5lcnMiLCJnZXRFbGVtZW50QnlJZCIsImNsYXNzTGlzdCIsImFkZCIsInJlbW92ZSIsIm9wdGlvbnMiLCJyb290Iiwicm9vdE1hcmdpbiIsInRocmVzaG9sZCIsIlNsaWRlcyIsIm5hdkNvbHVtbiIsImFuY2hvckxpbmsiLCJjcmVhdGVFbGVtZW50Iiwic2V0QXR0cmlidXRlIiwiYXBwZW5kQ2hpbGQiLCJuYXZMaSIsInNsaWRlQ29udGFpbmVyIiwiYW5jaG9yVGFnIiwiZm9vZENvdW50ZXJzIiwiYWRkRmx5aW5nRm9vZExpc3RlbmVyIiwiZm9vZEljb24iLCJmb29kQ2hpbGRyZW4iLCJjaGlsZE5vZGVzIiwicmVtb3ZlQ2hpbGQiLCJtb3ZlbWVudEZ1bmMiLCJuZXdGb29kIiwic3RhcnQiLCJzaWduZWRPbmVzIiwicmFuZG9tSWR4IiwiZmxvb3IiLCJyYW5kb20iLCJyYW5kb21seVNpZ25lZE9uZSIsInN0ZXAiLCJ0aW1lc3RhbXAiLCJwcm9ncmVzcyIsInRyYW5zZm9ybSIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsInRoaXNPbmVQYXJ0aWN1bGFyRm9vZCIsInNjcm9sbFkiLCJpbm5lcldpZHRoIiwicmVuZGVyU2xpZGUiLCJzbGlkZSIsImhhbmRsZVNjcm9sbE9udG8iLCJlbnRyaWVzIiwib2JzZXJ2ZXIiLCJmb3JFYWNoIiwiZW50cnkiLCJpc0ludGVyc2VjdGluZyIsImN1cnJlbnRTVkciLCJ0b29sdGlwIiwibnV0cmllbnRzIiwib24iLCJldmVudCIsInBhZ2VZIiwicGFnZVgiLCJxdWVyeVNlbGVjdG9yQWxsIiwicmVjdCIsIm5hdkNpcmNsZSIsIkludGVyc2VjdGlvbk9ic2VydmVyIiwib2JzZXJ2ZSJdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNB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QUFHLEdBQUcsQ0FBOUMsV0FBSixFQUE2RDtBQUN6RGtELGtCQUFRLENBQ0wyRCxnQkFESCxzQkFDa0M3RyxHQUFHLEdBQUcsQ0FEeEMsWUFFR21HLE9BRkgsQ0FFVyxVQUFBVyxJQUFJLEVBQUk7QUFDZkEsZ0JBQUksQ0FBQ3RELFNBQUwsQ0FBZUUsTUFBZixDQUFzQixZQUF0QjtBQUNELFdBSkg7QUFNQWhGLFlBQUUsQ0FBQ2dELE1BQUgsc0JBQXdCMUIsR0FBRyxHQUFHLENBQTlCLGNBQ0drQyxVQURILEdBRUdJLEtBRkgsQ0FFUyxTQUZULEVBRW9CLElBRnBCLEVBR0dILFFBSEgsQ0FHWSxHQUhaO0FBS0FlLGtCQUFRLENBQUNLLGNBQVQsa0JBQWtDdkQsR0FBRyxHQUFHLENBQXhDLEdBQTZDd0QsU0FBN0MsQ0FBdURFLE1BQXZELGtCQUF3RTFELEdBQUcsR0FBRyxDQUE5RTtBQUNIO0FBR0Y7QUFDRixLQXBHRDtBQXFHRCxHQXRHRDs7QUF3R0EsTUFBSWtHLFFBQVEsR0FBRyxJQUFJYyxvQkFBSixDQUF5QmhCLGdCQUF6QixFQUEyQ3JDLE9BQTNDLENBQWY7QUFDQXVDLFVBQVEsQ0FBQ2UsT0FBVCxDQUFpQmxCLEtBQWpCO0FBRUQsQ0E3R00sQzs7Ozs7Ozs7Ozs7QUNBUCx1QyIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvZGlzdC9cIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXguanNcIik7XG4iLCJpbXBvcnQgJy4vc3R5bGVzL2luZGV4LnNjc3MnO1xuaW1wb3J0ICogYXMgU2xpZGVzIGZyb20gJy4vc2NyaXB0cy9zY3JvbGwvc2xpZGVzJztcbmltcG9ydCBhZGRBbGxGbHlpbmdGb29kTGlzdGVuZXJzIGZyb20gJy4vc2NyaXB0cy9mbHlpbmdfZm9vZCc7XG5cbmxldCBudXRyaXRpb25EYXRhO1xuXG5kMy5jc3YoXCJudXRyaXRpb25fZmFjdHNfZm9yX3Njcm9sbGVyLmNzdlwiLCBkID0+IHtcbiAgcmV0dXJuIHtcbiAgICBmb29kX25hbWU6IGRbXCJGb29kIG5hbWVcIl0sXG4gICAgc2VydmluZ19zaXplOiBkW1wiQW1vdW50XCJdLFxuICAgIGZpYmVyOiArZFtcIkZpYmVyXCJdLFxuICAgIGlyb246ICtkW1wiSXJvblwiXSxcbiAgICBtYWduZXNpdW06ICtkW1wiTWFnbmVzaXVtXCJdLFxuICAgIHBvdGFzc2l1bTogK2RbXCJQb3Rhc3NpdW1cIl0sXG4gICAgemluYzogK2RbXCJaaW5jXCJdLFxuICAgIFwidml0YW1pbiBDXCI6ICtkW1wiVml0YW1pbiBDXCJdLFxuICAgIGZvbGF0ZTogK2RbXCJGb2xhdGVcIl0sXG4gICAgXCJ2aXRhbWluIEIxMlwiOiArZFtcIlZpdGFtaW4gQi0xMlwiXSxcbiAgICBcInZpdGFtaW4gQVwiOiArZFtcIlZpdGFtaW4gQVwiXSxcbiAgICBcInZpdGFtaW4gRFwiOiArZFtcIlZpdGFtaW4gRFwiXSxcbiAgICBjaG9sZXN0ZXJvbDogK2RbXCJDaG9sZXN0ZXJvbFwiXVxuICB9O1xufSkudGhlbihkYXRhID0+IHtcbiAgICBudXRyaXRpb25EYXRhID0gZGF0YTtcbiAgICBjb25zb2xlLmxvZyhudXRyaXRpb25EYXRhKTtcbiAgICBcbiAgICBjcmVhdGVWaXN1YWxpemF0aW9uKG51dHJpdGlvbkRhdGFbMF0sIDAsIHRydWUpO1xuICAgIGNyZWF0ZU5hdkxpKDApO1xuICAgIGNyZWF0ZUFuY2hvcigwKTtcbiAgICBcbiAgICBmb3IgKGxldCBpID0gMTsgaSA8IG51dHJpdGlvbkRhdGEubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNyZWF0ZVZpc3VhbGl6YXRpb24obnV0cml0aW9uRGF0YVtpXSwgaSk7XG4gICAgICBjcmVhdGVOYXZMaShpKTtcbiAgICAgIGNyZWF0ZUFuY2hvcihpKTtcbiAgICB9XG5cbn0pO1xuXG5jb25zdCBjcmVhdGVWaXN1YWxpemF0aW9uID0gKGZvb2REYXRhLCBpZHgsIGNyZWF0ZVhBeGlzQm9vbCkgPT4ge1xuICBsZXQgbWFyZ2luID0ge3RvcDogMjAsIHJpZ2h0OiA0MCwgYm90dG9tOiAyNSwgbGVmdDogNjB9XG4gIGxldCB3ID0gNjAwIC0gbWFyZ2luLmxlZnQgLSBtYXJnaW4ucmlnaHQ7XG4gIGxldCBoID0gNDc1IC0gbWFyZ2luLnRvcCAtIG1hcmdpbi5ib3R0b207XG5cbiAgbGV0IGRhdGEgPSBPYmplY3QudmFsdWVzKGZvb2REYXRhKS5zbGljZSgyLCAtMSk7XG4gIGxldCBudW1iZXJPZkNvbHVtbnMgPSAxMDtcbiAgbGV0IG1heFZhbHVlID0gTWF0aC5tYXgoLjUwLCBkMy5tYXgoZGF0YSwgZnVuY3Rpb24oZCkge1xuICAgIHJldHVybiAoK2QgLyAxMDApO1xuICB9KSk7XG4gIGxldCB4X2F4aXNMZW5ndGggPSB3O1xuICBsZXQgeV9heGlzTGVuZ3RoID0gaDtcbiAgbGV0IHRhcmdldFNWRyA9IFwic2xpZGUtc3ZnLVwiICsgaWR4O1xuICBsZXQgdGFyZ2V0U2xpZGVSZWN0ID0gXCJzbGlkZS1zdmctXCIgKyBpZHggKyBcIi1yZWN0XCI7XG5cbiAgbGV0IHhTY2FsZSA9IGQzXG4gICAgLnNjYWxlTGluZWFyKClcbiAgICAuZG9tYWluKFswLCBudW1iZXJPZkNvbHVtbnNdKVxuICAgIC5yYW5nZShbMCwgd10pO1xuXG4gIGxldCB5U2NhbGUgPSBkM1xuICAgIC5zY2FsZUxpbmVhcigpXG4gICAgLmRvbWFpbihbMCwgbWF4VmFsdWVdKVxuICAgIC5yYW5nZShbaCAtIG1hcmdpbi50b3AsIG1hcmdpbi5ib3R0b21dKTtcblxuICBsZXQgc3ZnID0gZDNcbiAgICAvLyAuc2VsZWN0KFwiI3Zpc1wiKVxuICAgIC5zZWxlY3QoYCNzdmctY29udGFpbmVyLSR7aWR4fWApXG4gICAgLmFwcGVuZChcInN2Z1wiKVxuICAgIC5hdHRyKFwiY2xhc3NcIiwgYCR7dGFyZ2V0U1ZHfSBoaWRkZW5gKVxuICAgIC5hdHRyKFwidmlld0JveFwiLCBgMCAwIDY1MCA3MDBgKVxuICAgIC5hdHRyKFwicHJlc2VydmVBc3BlY3RSYXRpb1wiLCBcInhNaW5ZTWluIG1lZXRcIik7XG4gICAgLy8gLmF0dHIoXCJ3aWR0aFwiLCB3ICsgbWFyZ2luLmxlZnQgKyBtYXJnaW4ucmlnaHQpXG4gICAgLy8gLmF0dHIoXCJoZWlnaHRcIiwgaCArIG1hcmdpbi50b3AgKyBtYXJnaW4uYm90dG9tKTtcblxuICBsZXQgeEF4aXMgPSBkM1xuICAgIC5heGlzQm90dG9tKHhTY2FsZSlcbiAgICAudGlja1NpemUoMClcbiAgICAudGlja0Zvcm1hdChmdW5jdGlvbihkKSB7XG4gICAgICByZXR1cm4gT2JqZWN0LmtleXMoZm9vZERhdGEpLnNsaWNlKDIsIC0xKVtkXTtcbiAgICB9KTtcblxuICAvLyBpZiAoY3JlYXRlWEF4aXNCb29sICE9PSB1bmRlZmluZWQpIHtcbiAgICBzdmdcbiAgICAgIC5hcHBlbmQoXCJnXCIpXG4gICAgICAuYXR0cihcImNsYXNzXCIsIGAke3RhcmdldFNWR30teC1heGlzIHgtYXhpc2ApXG4gICAgICAuYXR0cihcbiAgICAgICAgXCJ0cmFuc2Zvcm1cIixcbiAgICAgICAgXCJ0cmFuc2xhdGUoXCIgKyBtYXJnaW4ubGVmdCArIFwiLCBcIiArIChoIC0gbWFyZ2luLnRvcCkgKyBcIilcIlxuICAgICAgKVxuICAgICAgLnRyYW5zaXRpb24oKVxuICAgICAgLmR1cmF0aW9uKDEwMDApXG4gICAgICAuY2FsbCh4QXhpcyk7XG5cbiAgICBzdmcuc2VsZWN0QWxsKFwiLngtYXhpcyB0ZXh0XCIpLmF0dHIoXCJ0cmFuc2Zvcm1cIiwgZnVuY3Rpb24oZCkge1xuICAgICAgcmV0dXJuIFwidHJhbnNsYXRlKDEwLCAyNSlyb3RhdGUoLTQ1KVwiO1xuICAgIH0pO1xuXG4gICAgc3ZnXG4gICAgICAuYXBwZW5kKFwidGV4dFwiKVxuICAgICAgLmF0dHIoXCJ0cmFuc2Zvcm1cIiwgXCJyb3RhdGUoLTkwKVwiKVxuICAgICAgLmF0dHIoXCJjbGFzc1wiLCBcInktYXhpcy1sYWJlbFwiKVxuICAgICAgLmF0dHIoXCJ5XCIsIDApXG4gICAgICAuYXR0cihcInhcIiwgMCAtIGggLyAyKVxuICAgICAgLmF0dHIoXCJkeVwiLCBcIjFlbVwiKVxuICAgICAgLnN0eWxlKFwidGV4dC1hbmNob3JcIiwgXCJtaWRkbGVcIilcbiAgICAgIC50ZXh0KFwiUGVyY2VudGFnZSBvZiByZWNvbW1lbmRlZCBkYWlseSBhbGxvd2FuY2UoUkRBKVwiKTtcblxuICAgIHN2Z1xuICAgICAgLmFwcGVuZChcInRleHRcIilcbiAgICAgIC5hdHRyKFwiY2xhc3NcIiwgXCJzb3VyY2UtdGV4dFwiKVxuICAgICAgLmF0dHIoXCJ0cmFuc2Zvcm1cIixcbiAgICAgICAgXCJ0cmFuc2xhdGUoMzUsIFwiICtcbiAgICAgICAgKGggKyBtYXJnaW4udG9wICsgNDApICsgXCIpXCIpXG4gICAgICAvLyAuYXR0cihcImR5XCIsIFwiMWVtXCIpXG4gICAgICAuc3R5bGUoXCJ0ZXh0LWFuY2hvclwiLCBcImxlZnRcIilcbiAgICAgIC50ZXh0KFwiU291cmNlOiBVU0RBXCIpO1xuICAvLyB9XG5cbiAgbGV0IHlBeGlzID0gZDMuYXhpc0xlZnQoeVNjYWxlKS50aWNrcyg0LCBcIiVcIik7XG5cbiAgc3ZnXG4gICAgLmFwcGVuZChcImdcIilcbiAgICAuYXR0cihcImNsYXNzXCIsIGAke3RhcmdldFNWR30teS1heGlzIHktYXhpc2ApXG4gICAgLmF0dHIoXCJ0cmFuc2Zvcm1cIiwgXCJ0cmFuc2xhdGUoXCIgKyBtYXJnaW4ubGVmdCArIFwiLDApXCIpXG4gICAgLnN0eWxlKFwib3BhY2l0eVwiLCBcIjAlXCIpXG4gICAgLmNhbGwoeUF4aXMpO1xuICAgICAgICBcbiAgc3ZnXG4gICAgLnNlbGVjdEFsbChcInJlY3RcIilcbiAgICAuZGF0YShkYXRhKVxuICAgIC5lbnRlcigpXG4gICAgLmFwcGVuZChcInJlY3RcIilcbiAgICAuYXR0cihcImNsYXNzXCIsIGAke3RhcmdldFNsaWRlUmVjdH1gKVxuICAgIC5hdHRyKFwieFwiLCBmdW5jdGlvbihkLCBpKSB7XG4gICAgICByZXR1cm4gaSAqICh4X2F4aXNMZW5ndGggLyBudW1iZXJPZkNvbHVtbnMpICsgbWFyZ2luLmxlZnQgKyAxMDtcbiAgICB9KVxuICAgIC5hdHRyKFwieVwiLCBmdW5jdGlvbihkKSB7XG4gICAgICByZXR1cm4geVNjYWxlKGQgLyAxMDApO1xuICAgIH0pXG4gICAgLmF0dHIoXCJ3aWR0aFwiLCB4X2F4aXNMZW5ndGggLyBudW1iZXJPZkNvbHVtbnMgLSAxKVxuICAgIC5hdHRyKFwiaGVpZ2h0XCIsIGZ1bmN0aW9uKGQpIHtcbiAgICAgIHJldHVybiBoIC0geVNjYWxlKGQgLyAxMDApIC0gbWFyZ2luLnRvcDtcbiAgICB9KVxuICAgIC50cmFuc2l0aW9uKClcbiAgICAuZHVyYXRpb24oNTAwKTtcblxufTtcblxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsIChlKSA9PiB7XG4gICAgXG4gICAgbGV0IHNsaWRlcyA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTk7IGkrKykge1xuICAgICAgICBsZXQgc2xpZGVOYW1lID0gXCIjc2xpZGUtY29udGFpbmVyLVwiICsgaTtcbiAgICAgICAgbGV0IG5ld1NsaWRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzbGlkZU5hbWUpO1xuICAgICAgICBzbGlkZXMucHVzaChuZXdTbGlkZSk7XG4gICAgfVxuICAgIGNyZWF0ZU9ic2VydmVycyhzbGlkZXMpO1xufSwgZmFsc2UpO1xuXG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsICgpID0+IHtcblxuICAgIGFkZEFsbEZseWluZ0Zvb2RMaXN0ZW5lcnMoKTtcblxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmb29kLXN2Zy1jb250YWluZXItMCcpLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW92ZXJcIiwgKCkgPT4ge1xuXG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2xpY2stYnViYmxlJykuY2xhc3NMaXN0LmFkZChcInNob3dcIik7XG4gICAgfSlcblxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmb29kLXN2Zy1jb250YWluZXItMCcpLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW91dFwiLCAoKSA9PiB7XG5cbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jbGljay1idWJibGUnKS5jbGFzc0xpc3QucmVtb3ZlKFwic2hvd1wiKTtcbiAgICB9KVxuXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Zvb2Qtc3ZnLWNvbnRhaW5lci0xJykuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlb3ZlclwiLCAoKSA9PiB7XG5cbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwb3RhdG8tcGFydHknKS5jbGFzc0xpc3QuYWRkKFwic2hvd1wiKTtcbiAgICB9KVxuXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Zvb2Qtc3ZnLWNvbnRhaW5lci0xJykuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlb3V0XCIsICgpID0+IHtcblxuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3BvdGF0by1wYXJ0eScpLmNsYXNzTGlzdC5yZW1vdmUoXCJzaG93XCIpO1xuICAgIH0pXG5cbn0pXG5cbmNvbnN0IGNyZWF0ZU9ic2VydmVycyA9IChzbGlkZXMpID0+IHtcbiAgICBcbiAgICBsZXQgb3B0aW9ucyA9IHtcbiAgICAgIHJvb3Q6IG51bGwsXG4gICAgICByb290TWFyZ2luOiBcIjBweCAwcHggMHB4IDBweFwiLFxuICAgICAgdGhyZXNob2xkOiAuNVxuICAgIH07XG5cbiAgICBjb25zb2xlLmxvZyhzbGlkZXMpO1xuICAgIFxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2xpZGVzLmxlbmd0aCAtIDE7IGkrKykge1xuICAgICAgU2xpZGVzLnJlbmRlclNsaWRlKG9wdGlvbnMsIHNsaWRlc1tpXSwgaSk7XG4gICAgfVxuXG59XG5cbmNvbnN0IGNyZWF0ZU5hdkxpID0gKGlkeCkgPT4ge1xuICBsZXQgbmF2Q29sdW1uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm5hdi1jb2x1bW4nKTtcblxuICBsZXQgYW5jaG9yTGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJhXCIpO1xuICBhbmNob3JMaW5rLnNldEF0dHJpYnV0ZShcImhyZWZcIiwgYCNhbmNob3ItJHtpZHh9YCk7XG4gIG5hdkNvbHVtbi5hcHBlbmRDaGlsZChhbmNob3JMaW5rKTtcblxuICBsZXQgbmF2TGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlcIik7XG4gIG5hdkxpLnNldEF0dHJpYnV0ZShcImlkXCIsIGBuYXYtbGktJHtpZHh9YCk7XG4gIG5hdkxpLmNsYXNzTGlzdC5hZGQoXCJuYXYtbGlcIik7XG4gIGFuY2hvckxpbmsuYXBwZW5kQ2hpbGQobmF2TGkpO1xuXG59XG5cbmNvbnN0IGNyZWF0ZUFuY2hvciA9IChpZHgpID0+IHtcbiAgbGV0IHNsaWRlQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYHNsaWRlLWNvbnRhaW5lci0ke2lkeH1gKTtcblxuICBsZXQgYW5jaG9yVGFnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImFcIik7XG4gIGFuY2hvclRhZy5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBgYW5jaG9yLSR7aWR4fWApO1xuICBhbmNob3JUYWcuY2xhc3NMaXN0LmFkZChcImFuY2hvclwiKTtcblxuICBzbGlkZUNvbnRhaW5lci5hcHBlbmRDaGlsZChhbmNob3JUYWcpO1xufVxuXG5cbiIsIiAgICBjb25zdCBhZGRBbGxGbHlpbmdGb29kTGlzdGVuZXJzID0gKCkgPT4ge1xuXG4gICAgICAgIGxldCBmb29kQ291bnRlcnMgPSB7fTtcblxuICAgICAgICBjb25zdCBhZGRGbHlpbmdGb29kTGlzdGVuZXIgPSBpZHggPT4ge1xuICAgICAgICAgICAgbGV0IGZvb2RJY29uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYGZvb2Qtc3ZnLWNvbnRhaW5lci0ke2lkeH1gKTtcblxuICAgICAgICAgICAgZm9vZEljb24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGUgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBmb29kQ2hpbGRyZW4gPSBmb29kSWNvbi5jaGlsZE5vZGVzO1xuICAgICAgICAgICAgICAgIGlmIChmb29kQ2hpbGRyZW5bM10pIHtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDMwOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgZm9vZEljb24ucmVtb3ZlQ2hpbGQoZm9vZENoaWxkcmVuWzNdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgbGV0IG1vdmVtZW50RnVuYyA9IG5ld0Zvb2QgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBzdGFydCA9IG51bGw7XG5cbiAgICAgICAgICAgICAgICBsZXQgc2lnbmVkT25lcyA9IFstMSwgMV07XG4gICAgICAgICAgICAgICAgbGV0IHJhbmRvbUlkeCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDIpO1xuICAgICAgICAgICAgICAgIGxldCByYW5kb21seVNpZ25lZE9uZSA9IHNpZ25lZE9uZXNbcmFuZG9tSWR4XTtcblxuICAgICAgICAgICAgICAgIGNvbnN0IHN0ZXAgPSB0aW1lc3RhbXAgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXN0YXJ0KSBzdGFydCA9IHRpbWVzdGFtcDtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHByb2dyZXNzID0gdGltZXN0YW1wIC0gc3RhcnQ7XG4gICAgICAgICAgICAgICAgICAgIG5ld0Zvb2Quc3R5bGUudHJhbnNmb3JtID0gXCJ0cmFuc2xhdGUoXCIgKyAocHJvZ3Jlc3MgKiByYW5kb21seVNpZ25lZE9uZSkgKyBcInB4LCBcIiArIHByb2dyZXNzICsgXCJweClcIjtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHByb2dyZXNzIDwgMjUwMCkge1xuICAgICAgICAgICAgICAgICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKHN0ZXApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoc3RlcCk7XG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSBmb29kQ291bnRlcnNbaWR4XTsgaSA8IGZvb2RDb3VudGVyc1tpZHhdICsgMzA7IGkrKykge1xuICAgICAgICAgICAgICAgIGxldCBuZXdGb29kID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgICAgICAgICBuZXdGb29kLnNldEF0dHJpYnV0ZShcImlkXCIsIGBmbHlpbmctZm9vZC1vZi10eXBlLSR7aWR4fS0ke2l9YCk7XG4gICAgICAgICAgICAgICAgbmV3Rm9vZC5jbGFzc0xpc3QuYWRkKGBmbHlpbmctZm9vZC0ke2lkeH1gKTtcbiAgICAgICAgICAgICAgICBuZXdGb29kLmNsYXNzTGlzdC5hZGQoYGZseWluZy1mb29kYCk7XG4gICAgICAgICAgICAgICAgZm9vZEljb24uYXBwZW5kQ2hpbGQobmV3Rm9vZCk7XG5cbiAgICAgICAgICAgICAgICBsZXQgdGhpc09uZVBhcnRpY3VsYXJGb29kID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXG4gICAgICAgICAgICAgICAgICAgIGBmbHlpbmctZm9vZC1vZi10eXBlLSR7aWR4fS0ke2l9YFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgdGhpc09uZVBhcnRpY3VsYXJGb29kLnN0eWxlLnRvcCA9IChNYXRoLnJhbmRvbSgpICogLTMwMCkgKyB3aW5kb3cuc2Nyb2xsWSArIFwicHhcIjtcbiAgICAgICAgICAgICAgICB0aGlzT25lUGFydGljdWxhckZvb2Quc3R5bGUubGVmdCA9XG4gICAgICAgICAgICAgICAgICAgIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHdpbmRvdy5pbm5lcldpZHRoKSArIFwicHhcIjtcblxuICAgICAgICAgICAgICAgIG1vdmVtZW50RnVuYyh0aGlzT25lUGFydGljdWxhckZvb2QpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGZvb2RDb3VudGVyc1tpZHhdICs9IDEwO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxODsgaSsrKSB7XG4gICAgICAgICAgICBmb29kQ291bnRlcnNbaV0gPSAwO1xuICAgICAgICAgICAgYWRkRmx5aW5nRm9vZExpc3RlbmVyKGkpO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBleHBvcnQgZGVmYXVsdCBhZGRBbGxGbHlpbmdGb29kTGlzdGVuZXJzOyIsImV4cG9ydCBjb25zdCByZW5kZXJTbGlkZSA9IChvcHRpb25zLCBzbGlkZSwgaWR4KSA9PiB7XG5cbiAgY29uc3QgaGFuZGxlU2Nyb2xsT250byA9IChlbnRyaWVzLCBvYnNlcnZlcikgPT4ge1xuICAgIGVudHJpZXMuZm9yRWFjaChlbnRyeSA9PiB7XG4gICAgICBpZiAoZW50cnkuaXNJbnRlcnNlY3RpbmcpIHtcblxuICAgICAgICBjb25zb2xlLmxvZyh3aW5kb3cuc2Nyb2xsWSk7XG5cbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLnNsaWRlLXN2Zy0ke2lkeH1gKVxuICAgICAgICAgIC5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZGVuXCIpO1xuXG4gICAgICAgIGxldCBjdXJyZW50U1ZHID0gZDMuc2VsZWN0KGAuc2xpZGUtc3ZnLSR7aWR4fWApO1xuXG4gICAgICAgIGxldCB0b29sdGlwID0gZDNcbiAgICAgICAgICAuc2VsZWN0KFwiYm9keVwiKVxuICAgICAgICAgIC5hcHBlbmQoXCJkaXZcIilcbiAgICAgICAgICAuc3R5bGUoXCJwb3NpdGlvblwiLCBcImFic29sdXRlXCIpXG4gICAgICAgICAgLnN0eWxlKFwiZm9udC1zaXplXCIsIFwiMTJweFwiKVxuICAgICAgICAgIC5zdHlsZShcInotaW5kZXhcIiwgXCIxMFwiKVxuICAgICAgICAgIC5zdHlsZShcInZpc2liaWxpdHlcIiwgXCJoaWRkZW5cIik7XG4gICAgICAgIFxuICAgICAgICBjb25zdCBudXRyaWVudHMgPSBbXCJmaWJlclwiLCBcImlyb25cIiwgXCJtYWduZXNpdW1cIiwgXCJwb3Rhc3NpdW1cIiwgXCJ6aW5jXCIsIFwidml0YW1pbiBDXCIsIFwiZm9sYXRlXCIsIFwidml0YW1pbiBCMTJcIiwgXCJ2aXRhbWluIEFcIiwgXCJ2aXRhbWluIERcIl07XG5cbiAgICAgICAgY3VycmVudFNWR1xuICAgICAgICAgIC5zZWxlY3RBbGwoXCJyZWN0XCIpXG4gICAgICAgICAgLm9uKFwibW91c2VvdmVyXCIsIGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgICAgIHJldHVybiB0b29sdGlwLnN0eWxlKFwidmlzaWJpbGl0eVwiLCBcInZpc2libGVcIik7XG4gICAgICAgICAgfSlcbiAgICAgICAgICAub24oXCJtb3VzZW1vdmVcIiwgZnVuY3Rpb24oZCwgaSkge1xuICAgICAgICAgICAgcmV0dXJuIHRvb2x0aXBcbiAgICAgICAgICAgICAgLnN0eWxlKFwidG9wXCIsIGV2ZW50LnBhZ2VZIC0gNjAgKyBcInB4XCIpXG4gICAgICAgICAgICAgIC5zdHlsZShcImxlZnRcIiwgZXZlbnQucGFnZVggLSAzMCArIFwicHhcIilcbiAgICAgICAgICAgICAgLnN0eWxlKFwiYmFja2dyb3VuZC1jb2xvclwiLCBcIndoaXRlXCIpXG4gICAgICAgICAgICAgIC5zdHlsZShcImJvcmRlclwiLCBcIjJweCBzb2xpZCBibGFja1wiKVxuICAgICAgICAgICAgICAuc3R5bGUoXCJwYWRkaW5nXCIsIFwiNXB4XCIpXG4gICAgICAgICAgICAgIC5zdHlsZShcImJvcmRlci1yYWRpdXNcIiwgXCIzcHhcIilcbiAgICAgICAgICAgICAgLnRleHQoYCR7bnV0cmllbnRzW2ldfTogJHtkfSVgKTtcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5vbihcIm1vdXNlb3V0XCIsIGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgICAgIHJldHVybiB0b29sdGlwLnN0eWxlKFwidmlzaWJpbGl0eVwiLCBcImhpZGRlblwiKTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLnNsaWRlLXN2Zy0ke2lkeCAtIDF9YCkpIHtcbiAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuc2xpZGUtc3ZnLSR7aWR4IC0gMX1gKVxuICAgICAgICAgIC5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC5zbGlkZS1zdmctJHtpZHggKyAxfWApKSB7XG4gICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLnNsaWRlLXN2Zy0ke2lkeCArIDF9YClcbiAgICAgICAgICAuY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYC5zbGlkZS1zdmctJHtpZHh9LXJlY3RgKS5mb3JFYWNoKHJlY3QgPT4ge1xuICAgICAgICAgIC8vIHJlY3QuY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKTtcbiAgICAgICAgICByZWN0LmNsYXNzTGlzdC5hZGQoXCJjaGFydC1yZWN0XCIpO1xuICAgICAgICB9KTtcblxuICAgICAgICBkMy5zZWxlY3QoYC5zbGlkZS1zdmctJHtpZHh9LXktYXhpc2ApXG4gICAgICAgICAgLnRyYW5zaXRpb24oKVxuICAgICAgICAgIC5zdHlsZShcIm9wYWNpdHlcIiwgXCIxMDAlXCIpXG4gICAgICAgICAgLmR1cmF0aW9uKDUwMCk7XG5cbiAgICAgICAgbGV0IG5hdkNpcmNsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBuYXYtbGktJHtpZHh9YCk7XG4gICAgICAgIG5hdkNpcmNsZS5jbGFzc0xpc3QuYWRkKGBuYXYtbGktJHtpZHh9YCk7XG5cblxuXG4gICAgICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGAuc2xpZGUtc3ZnLSR7aWR4IC0gMX0tcmVjdGApKSB7XG4gICAgICAgICAgICBkb2N1bWVudFxuICAgICAgICAgICAgICAucXVlcnlTZWxlY3RvckFsbChgLnNsaWRlLXN2Zy0ke2lkeCAtIDF9LXJlY3RgKVxuICAgICAgICAgICAgICAuZm9yRWFjaChyZWN0ID0+IHtcbiAgICAgICAgICAgICAgICAvLyByZWN0LmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XG4gICAgICAgICAgICAgICAgcmVjdC5jbGFzc0xpc3QucmVtb3ZlKFwiY2hhcnQtcmVjdFwiKTtcbiAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGQzLnNlbGVjdChgLnNsaWRlLXN2Zy0ke2lkeCAtIDF9LXktYXhpc2ApXG4gICAgICAgICAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgICAgICAgICAgLnN0eWxlKFwib3BhY2l0eVwiLCBcIjAlXCIpXG4gICAgICAgICAgICAgIC5kdXJhdGlvbig1MDApO1xuICAgICAgICAgICAgXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYG5hdi1saS0ke2lkeCAtIDF9YCkpIHtcbiAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgbmF2LWxpLSR7aWR4IC0gMX1gKS5jbGFzc0xpc3QucmVtb3ZlKGBuYXYtbGktJHtpZHggLSAxfWApO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYC5zbGlkZS1zdmctJHtpZHggKyAxfS1yZWN0YCkpIHtcbiAgICAgICAgICAgIGRvY3VtZW50XG4gICAgICAgICAgICAgIC5xdWVyeVNlbGVjdG9yQWxsKGAuc2xpZGUtc3ZnLSR7aWR4ICsgMX0tcmVjdGApXG4gICAgICAgICAgICAgIC5mb3JFYWNoKHJlY3QgPT4ge1xuICAgICAgICAgICAgICAgIHJlY3QuY2xhc3NMaXN0LnJlbW92ZShcImNoYXJ0LXJlY3RcIik7XG4gICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBkMy5zZWxlY3QoYC5zbGlkZS1zdmctJHtpZHggKyAxfS15LWF4aXNgKVxuICAgICAgICAgICAgICAudHJhbnNpdGlvbigpXG4gICAgICAgICAgICAgIC5zdHlsZShcIm9wYWNpdHlcIiwgXCIwJVwiKVxuICAgICAgICAgICAgICAuZHVyYXRpb24oNTAwKTtcblxuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYG5hdi1saS0ke2lkeCArIDF9YCkuY2xhc3NMaXN0LnJlbW92ZShgbmF2LWxpLSR7aWR4ICsgMX1gKTsgICAgICAgICAgICAgIFxuICAgICAgICB9XG5cbiAgICAgICAgICBcbiAgICAgIH1cbiAgICB9KTtcbiAgfTtcblxuICBsZXQgb2JzZXJ2ZXIgPSBuZXcgSW50ZXJzZWN0aW9uT2JzZXJ2ZXIoaGFuZGxlU2Nyb2xsT250bywgb3B0aW9ucyk7XG4gIG9ic2VydmVyLm9ic2VydmUoc2xpZGUpO1xuXG59IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luIl0sInNvdXJjZVJvb3QiOiIifQ==