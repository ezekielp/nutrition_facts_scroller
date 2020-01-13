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




var nutritionData; // let foodCounters = {};
// let bananaCounter = 0;

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
  var svg = d3.select("#vis").append("svg").attr("class", "".concat(targetSVG, " hidden")).attr("viewBox", "0 0 ".concat(h + margin.top + margin.bottom, " ").concat(w + margin.left + margin.right)); // .attr("preserveAspectRatio", "xMinYMin meet");
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
}); //     document
//       .getElementById("banana-svg-container")
//       .addEventListener("click", e => {
//         let bananaIcon = document.getElementById(
//             "banana-svg-container"
//         );
//         let bananaChildren = bananaIcon.childNodes;
//         if (bananaChildren[3]) {
//             for (let i = 0; i < 20; i++) {
//                 bananaIcon.removeChild(bananaChildren[3]);
//             }
//         }
//         let movementFunc = newBanana => {
//           let start = null;
//           const step = (timestamp) => {
//             if (!start) start = timestamp;
//             let progress = timestamp - start;
//             newBanana.style.transform =
//               "translateY(" + (progress) + "px)";
//             if (progress < 5000) {
//               window.requestAnimationFrame(step);
//             }
//           }
//           window.requestAnimationFrame(step);
//         }
//         for (let i = bananaCounter; i < bananaCounter + 20; i++) {
//             let newBanana = document.createElement("div");
//             newBanana.setAttribute("id", `flying-banana-${i}`);
//             newBanana.classList.add(`flying-banana`);
//             bananaIcon.appendChild(newBanana);
//             let thisOneParticularBanana = document.getElementById(
//             `flying-banana-${i}`
//             );
//             thisOneParticularBanana.style.top = (Math.random() * -700) + "px";
//             thisOneParticularBanana.style.left = Math.floor(Math.random() * window.innerWidth) + "px";
//             movementFunc(thisOneParticularBanana);
//         }
//         bananaCounter += 10;
//       });
// })

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL2ZseWluZ19mb29kLmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL3Njcm9sbC9zbGlkZXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0eWxlcy9pbmRleC5zY3NzP2M4MDciXSwibmFtZXMiOlsibnV0cml0aW9uRGF0YSIsImQzIiwiY3N2IiwiZCIsImZvb2RfbmFtZSIsInNlcnZpbmdfc2l6ZSIsImZpYmVyIiwiaXJvbiIsIm1hZ25lc2l1bSIsInBvdGFzc2l1bSIsInppbmMiLCJmb2xhdGUiLCJjaG9sZXN0ZXJvbCIsInRoZW4iLCJkYXRhIiwiY29uc29sZSIsImxvZyIsImNyZWF0ZVZpc3VhbGl6YXRpb24iLCJjcmVhdGVOYXZMaSIsImNyZWF0ZUFuY2hvciIsImkiLCJsZW5ndGgiLCJmb29kRGF0YSIsImlkeCIsImNyZWF0ZVhBeGlzQm9vbCIsIm1hcmdpbiIsInRvcCIsInJpZ2h0IiwiYm90dG9tIiwibGVmdCIsInciLCJoIiwiT2JqZWN0IiwidmFsdWVzIiwic2xpY2UiLCJudW1iZXJPZkNvbHVtbnMiLCJtYXhWYWx1ZSIsIk1hdGgiLCJtYXgiLCJ4X2F4aXNMZW5ndGgiLCJ5X2F4aXNMZW5ndGgiLCJ0YXJnZXRTVkciLCJ0YXJnZXRTbGlkZVJlY3QiLCJ4U2NhbGUiLCJzY2FsZUxpbmVhciIsImRvbWFpbiIsInJhbmdlIiwieVNjYWxlIiwic3ZnIiwic2VsZWN0IiwiYXBwZW5kIiwiYXR0ciIsInhBeGlzIiwiYXhpc0JvdHRvbSIsInRpY2tTaXplIiwidGlja0Zvcm1hdCIsImtleXMiLCJ1bmRlZmluZWQiLCJ0cmFuc2l0aW9uIiwiZHVyYXRpb24iLCJjYWxsIiwic2VsZWN0QWxsIiwic3R5bGUiLCJ0ZXh0IiwieUF4aXMiLCJheGlzTGVmdCIsInRpY2tzIiwiZW50ZXIiLCJoYW5kbGVNb3VzZW92ZXIiLCJlYXNlIiwid2luZG93IiwiYWRkRXZlbnRMaXN0ZW5lciIsImUiLCJzbGlkZXMiLCJzbGlkZU5hbWUiLCJuZXdTbGlkZSIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsInB1c2giLCJjcmVhdGVPYnNlcnZlcnMiLCJhZGRBbGxGbHlpbmdGb29kTGlzdGVuZXJzIiwib3B0aW9ucyIsInJvb3QiLCJyb290TWFyZ2luIiwidGhyZXNob2xkIiwiU2xpZGVzIiwibmF2Q29sdW1uIiwiYW5jaG9yTGluayIsImNyZWF0ZUVsZW1lbnQiLCJzZXRBdHRyaWJ1dGUiLCJhcHBlbmRDaGlsZCIsIm5hdkxpIiwiY2xhc3NMaXN0IiwiYWRkIiwic2xpZGVDb250YWluZXIiLCJnZXRFbGVtZW50QnlJZCIsImFuY2hvclRhZyIsImZvb2RDb3VudGVycyIsImFkZEZseWluZ0Zvb2RMaXN0ZW5lciIsImZvb2RJY29uIiwiZm9vZENoaWxkcmVuIiwiY2hpbGROb2RlcyIsInJlbW92ZUNoaWxkIiwibW92ZW1lbnRGdW5jIiwibmV3Rm9vZCIsInN0YXJ0Iiwic2lnbmVkT25lcyIsInJhbmRvbUlkeCIsImZsb29yIiwicmFuZG9tIiwicmFuZG9tbHlTaWduZWRPbmUiLCJzdGVwIiwidGltZXN0YW1wIiwicHJvZ3Jlc3MiLCJ0cmFuc2Zvcm0iLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJ0aGlzT25lUGFydGljdWxhckZvb2QiLCJpbm5lcldpZHRoIiwicmVuZGVyU2xpZGUiLCJzbGlkZSIsImhhbmRsZVNjcm9sbE9udG8iLCJlbnRyaWVzIiwib2JzZXJ2ZXIiLCJmb3JFYWNoIiwiZW50cnkiLCJpc0ludGVyc2VjdGluZyIsInJlbW92ZSIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJyZWN0IiwibmF2Q2lyY2xlIiwiSW50ZXJzZWN0aW9uT2JzZXJ2ZXIiLCJvYnNlcnZlIl0sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtR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InNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL2Rpc3QvXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LmpzXCIpO1xuIiwiaW1wb3J0ICcuL3N0eWxlcy9pbmRleC5zY3NzJztcbmltcG9ydCAqIGFzIFNsaWRlcyBmcm9tICcuL3NjcmlwdHMvc2Nyb2xsL3NsaWRlcyc7XG5pbXBvcnQgYWRkQWxsRmx5aW5nRm9vZExpc3RlbmVycyBmcm9tICcuL3NjcmlwdHMvZmx5aW5nX2Zvb2QnO1xuXG5sZXQgbnV0cml0aW9uRGF0YTtcbi8vIGxldCBmb29kQ291bnRlcnMgPSB7fTtcblxuLy8gbGV0IGJhbmFuYUNvdW50ZXIgPSAwO1xuXG5kMy5jc3YoXCJudXRyaXRpb25fZmFjdHNfZm9yX3Njcm9sbGVyLmNzdlwiLCBkID0+IHtcbiAgcmV0dXJuIHtcbiAgICBmb29kX25hbWU6IGRbXCJGb29kIG5hbWVcIl0sXG4gICAgc2VydmluZ19zaXplOiBkW1wiQW1vdW50XCJdLFxuICAgIGZpYmVyOiArZFtcIkZpYmVyXCJdLFxuICAgIGlyb246ICtkW1wiSXJvblwiXSxcbiAgICBtYWduZXNpdW06ICtkW1wiTWFnbmVzaXVtXCJdLFxuICAgIHBvdGFzc2l1bTogK2RbXCJQb3Rhc3NpdW1cIl0sXG4gICAgemluYzogK2RbXCJaaW5jXCJdLFxuICAgIFwidml0YW1pbiBDXCI6ICtkW1wiVml0YW1pbiBDXCJdLFxuICAgIGZvbGF0ZTogK2RbXCJGb2xhdGVcIl0sXG4gICAgXCJ2aXRhbWluIEIxMlwiOiArZFtcIlZpdGFtaW4gQi0xMlwiXSxcbiAgICBcInZpdGFtaW4gQVwiOiArZFtcIlZpdGFtaW4gQVwiXSxcbiAgICBcInZpdGFtaW4gRFwiOiArZFtcIlZpdGFtaW4gRFwiXSxcbiAgICBjaG9sZXN0ZXJvbDogK2RbXCJDaG9sZXN0ZXJvbFwiXVxuICB9O1xufSkudGhlbihkYXRhID0+IHtcbiAgICBudXRyaXRpb25EYXRhID0gZGF0YTtcbiAgICBjb25zb2xlLmxvZyhudXRyaXRpb25EYXRhKTtcbiAgICBcbiAgICBjcmVhdGVWaXN1YWxpemF0aW9uKG51dHJpdGlvbkRhdGFbMF0sIDAsIHRydWUpO1xuICAgIGNyZWF0ZU5hdkxpKDApO1xuICAgIGNyZWF0ZUFuY2hvcigwKTtcbiAgICBcbiAgICBmb3IgKGxldCBpID0gMTsgaSA8IG51dHJpdGlvbkRhdGEubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNyZWF0ZVZpc3VhbGl6YXRpb24obnV0cml0aW9uRGF0YVtpXSwgaSk7XG4gICAgICBjcmVhdGVOYXZMaShpKTtcbiAgICAgIGNyZWF0ZUFuY2hvcihpKTtcbiAgICB9XG5cbn0pO1xuXG5jb25zdCBjcmVhdGVWaXN1YWxpemF0aW9uID0gKGZvb2REYXRhLCBpZHgsIGNyZWF0ZVhBeGlzQm9vbCkgPT4ge1xuICBsZXQgbWFyZ2luID0ge3RvcDogMjAsIHJpZ2h0OiA0MCwgYm90dG9tOiAyNSwgbGVmdDogNjB9XG4gIGxldCB3ID0gNzAwIC0gbWFyZ2luLmxlZnQgLSBtYXJnaW4ucmlnaHQ7XG4gIGxldCBoID0gNjAwIC0gbWFyZ2luLnRvcCAtIG1hcmdpbi5ib3R0b207XG5cbiAgbGV0IGRhdGEgPSBPYmplY3QudmFsdWVzKGZvb2REYXRhKS5zbGljZSgyLCAtMSk7XG4gIGxldCBudW1iZXJPZkNvbHVtbnMgPSAxMDtcbiAgbGV0IG1heFZhbHVlID0gTWF0aC5tYXgoLjUwLCBkMy5tYXgoZGF0YSwgZnVuY3Rpb24oZCkge1xuICAgIHJldHVybiAoK2QgLyAxMDApO1xuICB9KSk7XG4gIGxldCB4X2F4aXNMZW5ndGggPSB3O1xuICBsZXQgeV9heGlzTGVuZ3RoID0gaDtcbiAgbGV0IHRhcmdldFNWRyA9IFwic2xpZGUtc3ZnLVwiICsgaWR4O1xuICBsZXQgdGFyZ2V0U2xpZGVSZWN0ID0gXCJzbGlkZS1zdmctXCIgKyBpZHggKyBcIi1yZWN0XCI7XG5cbiAgbGV0IHhTY2FsZSA9IGQzXG4gICAgLnNjYWxlTGluZWFyKClcbiAgICAuZG9tYWluKFswLCBudW1iZXJPZkNvbHVtbnNdKVxuICAgIC5yYW5nZShbMCwgd10pO1xuXG4gIGxldCB5U2NhbGUgPSBkM1xuICAgIC5zY2FsZUxpbmVhcigpXG4gICAgLmRvbWFpbihbMCwgbWF4VmFsdWVdKVxuICAgIC5yYW5nZShbaCAtIG1hcmdpbi50b3AsIG1hcmdpbi5ib3R0b21dKTtcblxuICBsZXQgc3ZnID0gZDNcbiAgICAuc2VsZWN0KFwiI3Zpc1wiKVxuICAgIC5hcHBlbmQoXCJzdmdcIilcbiAgICAuYXR0cihcImNsYXNzXCIsIGAke3RhcmdldFNWR30gaGlkZGVuYClcbiAgICAuYXR0cihcInZpZXdCb3hcIiwgYDAgMCAke2ggKyBtYXJnaW4udG9wICsgbWFyZ2luLmJvdHRvbX0gJHt3ICsgbWFyZ2luLmxlZnQgKyBtYXJnaW4ucmlnaHR9YClcbiAgICAvLyAuYXR0cihcInByZXNlcnZlQXNwZWN0UmF0aW9cIiwgXCJ4TWluWU1pbiBtZWV0XCIpO1xuICAgIC8vIC5hdHRyKFwid2lkdGhcIiwgdyArIG1hcmdpbi5sZWZ0ICsgbWFyZ2luLnJpZ2h0KVxuICAgIC8vIC5hdHRyKFwiaGVpZ2h0XCIsIGggKyBtYXJnaW4udG9wICsgbWFyZ2luLmJvdHRvbSk7XG5cbiAgbGV0IHhBeGlzID0gZDNcbiAgICAuYXhpc0JvdHRvbSh4U2NhbGUpXG4gICAgLnRpY2tTaXplKDApXG4gICAgLnRpY2tGb3JtYXQoZnVuY3Rpb24oZCkge1xuICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKGZvb2REYXRhKS5zbGljZSgyLCAtMSlbZF07XG4gICAgfSk7XG5cbiAgaWYgKGNyZWF0ZVhBeGlzQm9vbCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgc3ZnXG4gICAgICAuYXBwZW5kKFwiZ1wiKVxuICAgICAgLmF0dHIoXCJjbGFzc1wiLCBgJHt0YXJnZXRTVkd9LXgtYXhpcyB4LWF4aXNgKVxuICAgICAgLmF0dHIoXG4gICAgICAgIFwidHJhbnNmb3JtXCIsXG4gICAgICAgIFwidHJhbnNsYXRlKFwiICsgbWFyZ2luLmxlZnQgKyBcIiwgXCIgKyAoaCAtIG1hcmdpbi50b3ApICsgXCIpXCJcbiAgICAgIClcbiAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgIC5kdXJhdGlvbigxMDAwKVxuICAgICAgLmNhbGwoeEF4aXMpO1xuXG4gICAgc3ZnLnNlbGVjdEFsbChcIi54LWF4aXMgdGV4dFwiKS5hdHRyKFwidHJhbnNmb3JtXCIsIGZ1bmN0aW9uKGQpIHtcbiAgICAgIHJldHVybiBcInRyYW5zbGF0ZSgyNSwgMjUpcm90YXRlKC00NSlcIjtcbiAgICB9KTtcblxuICAgIHN2Z1xuICAgICAgLmFwcGVuZChcInRleHRcIilcbiAgICAgIC5hdHRyKFwidHJhbnNmb3JtXCIsIFwicm90YXRlKC05MClcIilcbiAgICAgIC5hdHRyKFwiY2xhc3NcIiwgXCJ5LWF4aXMtbGFiZWxcIilcbiAgICAgIC5hdHRyKFwieVwiLCAtNSlcbiAgICAgIC5hdHRyKFwieFwiLCAwIC0gaCAvIDIpXG4gICAgICAuYXR0cihcImR5XCIsIFwiMWVtXCIpXG4gICAgICAuc3R5bGUoXCJ0ZXh0LWFuY2hvclwiLCBcIm1pZGRsZVwiKVxuICAgICAgLnRleHQoXCJQZXJjZW50YWdlIG9mIHJlY29tbWVuZGVkIGRhaWx5IGFsbG93YW5jZShSREEpXCIpO1xuICB9XG5cbiAgbGV0IHlBeGlzID0gZDMuYXhpc0xlZnQoeVNjYWxlKS50aWNrcyg0LCBcIiVcIik7XG5cbiAgc3ZnXG4gICAgLmFwcGVuZChcImdcIilcbiAgICAuYXR0cihcImNsYXNzXCIsIGAke3RhcmdldFNWR30teS1heGlzIHktYXhpc2ApXG4gICAgLmF0dHIoXCJ0cmFuc2Zvcm1cIiwgXCJ0cmFuc2xhdGUoXCIgKyBtYXJnaW4ubGVmdCArIFwiLDApXCIpXG4gICAgLnN0eWxlKFwib3BhY2l0eVwiLCBcIjAlXCIpXG4gICAgLmNhbGwoeUF4aXMpO1xuXG4gIHN2Z1xuICAgIC5zZWxlY3RBbGwoXCJyZWN0XCIpXG4gICAgLmRhdGEoZGF0YSlcbiAgICAuZW50ZXIoKVxuICAgIC5hcHBlbmQoXCJyZWN0XCIpXG4gICAgLmF0dHIoXCJjbGFzc1wiLCBgJHt0YXJnZXRTbGlkZVJlY3R9YClcbiAgICAuYXR0cihcInhcIiwgZnVuY3Rpb24oZCwgaSkge1xuICAgICAgcmV0dXJuIGkgKiAoeF9heGlzTGVuZ3RoIC8gbnVtYmVyT2ZDb2x1bW5zKSArIG1hcmdpbi5sZWZ0ICsgMTA7XG4gICAgfSlcbiAgICAuYXR0cihcInlcIiwgZnVuY3Rpb24oZCkge1xuICAgICAgcmV0dXJuIHlTY2FsZShkIC8gMTAwKTtcbiAgICB9KVxuICAgIC5hdHRyKFwid2lkdGhcIiwgeF9heGlzTGVuZ3RoIC8gbnVtYmVyT2ZDb2x1bW5zIC0gMSlcbiAgICAuYXR0cihcImhlaWdodFwiLCBmdW5jdGlvbihkKSB7XG4gICAgICByZXR1cm4gaCAtIHlTY2FsZShkIC8gMTAwKSAtIG1hcmdpbi50b3A7XG4gICAgfSlcbiAgICAuYXR0cihcImZpbGxcIiwgXCJyZWRcIilcbiAgICAudHJhbnNpdGlvbigpXG4gICAgLmR1cmF0aW9uKDUwMCk7XG4gICAgLy8gLm9uKFwibW91c2VvdmVyXCIsIGhhbmRsZU1vdXNlb3Zlcik7XG5cblxuICAgIGNvbnN0IGhhbmRsZU1vdXNlb3ZlciA9IChkLCBpKSA9PiB7XG4gICAgICBkMy5zZWxlY3QodGhpcylcbiAgICAgICAgLnRyYW5zaXRpb24oKVxuICAgICAgICAuZWFzZShcImVhc2VcIilcbiAgICAgICAgLmR1cmF0aW9uKDUwMClcbiAgICAgICAgLmF0dHIoXCJmaWxsXCIsIFwid2hpdGVcIik7XG4gICAgfTtcbn07XG5cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLCAoZSkgPT4ge1xuICAgIFxuICAgIGxldCBzbGlkZXMgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDE5OyBpKyspIHtcbiAgICAgICAgbGV0IHNsaWRlTmFtZSA9IFwiI3NsaWRlLWNvbnRhaW5lci1cIiArIGk7XG4gICAgICAgIGxldCBuZXdTbGlkZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2xpZGVOYW1lKTtcbiAgICAgICAgc2xpZGVzLnB1c2gobmV3U2xpZGUpO1xuICAgIH1cbiAgICBjcmVhdGVPYnNlcnZlcnMoc2xpZGVzKTtcbn0sIGZhbHNlKTtcblxuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCAoKSA9PiB7XG5cbiAgICBhZGRBbGxGbHlpbmdGb29kTGlzdGVuZXJzKCk7XG5cbn0pXG5cbi8vICAgICBkb2N1bWVudFxuLy8gICAgICAgLmdldEVsZW1lbnRCeUlkKFwiYmFuYW5hLXN2Zy1jb250YWluZXJcIilcbi8vICAgICAgIC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZSA9PiB7XG5cbi8vICAgICAgICAgbGV0IGJhbmFuYUljb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcbi8vICAgICAgICAgICAgIFwiYmFuYW5hLXN2Zy1jb250YWluZXJcIlxuLy8gICAgICAgICApO1xuXG4vLyAgICAgICAgIGxldCBiYW5hbmFDaGlsZHJlbiA9IGJhbmFuYUljb24uY2hpbGROb2Rlcztcbi8vICAgICAgICAgaWYgKGJhbmFuYUNoaWxkcmVuWzNdKSB7XG4vLyAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDIwOyBpKyspIHtcbi8vICAgICAgICAgICAgICAgICBiYW5hbmFJY29uLnJlbW92ZUNoaWxkKGJhbmFuYUNoaWxkcmVuWzNdKTtcbi8vICAgICAgICAgICAgIH1cbi8vICAgICAgICAgfVxuXG4vLyAgICAgICAgIGxldCBtb3ZlbWVudEZ1bmMgPSBuZXdCYW5hbmEgPT4ge1xuXG4vLyAgICAgICAgICAgbGV0IHN0YXJ0ID0gbnVsbDtcblxuLy8gICAgICAgICAgIGNvbnN0IHN0ZXAgPSAodGltZXN0YW1wKSA9PiB7XG4vLyAgICAgICAgICAgICBpZiAoIXN0YXJ0KSBzdGFydCA9IHRpbWVzdGFtcDtcbi8vICAgICAgICAgICAgIGxldCBwcm9ncmVzcyA9IHRpbWVzdGFtcCAtIHN0YXJ0O1xuLy8gICAgICAgICAgICAgbmV3QmFuYW5hLnN0eWxlLnRyYW5zZm9ybSA9XG4vLyAgICAgICAgICAgICAgIFwidHJhbnNsYXRlWShcIiArIChwcm9ncmVzcykgKyBcInB4KVwiO1xuLy8gICAgICAgICAgICAgaWYgKHByb2dyZXNzIDwgNTAwMCkge1xuLy8gICAgICAgICAgICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKHN0ZXApO1xuLy8gICAgICAgICAgICAgfVxuLy8gICAgICAgICAgIH1cblxuLy8gICAgICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoc3RlcCk7XG5cbi8vICAgICAgICAgfVxuXG4vLyAgICAgICAgIGZvciAobGV0IGkgPSBiYW5hbmFDb3VudGVyOyBpIDwgYmFuYW5hQ291bnRlciArIDIwOyBpKyspIHtcbi8vICAgICAgICAgICAgIGxldCBuZXdCYW5hbmEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuLy8gICAgICAgICAgICAgbmV3QmFuYW5hLnNldEF0dHJpYnV0ZShcImlkXCIsIGBmbHlpbmctYmFuYW5hLSR7aX1gKTtcbi8vICAgICAgICAgICAgIG5ld0JhbmFuYS5jbGFzc0xpc3QuYWRkKGBmbHlpbmctYmFuYW5hYCk7XG4vLyAgICAgICAgICAgICBiYW5hbmFJY29uLmFwcGVuZENoaWxkKG5ld0JhbmFuYSk7XG5cbi8vICAgICAgICAgICAgIGxldCB0aGlzT25lUGFydGljdWxhckJhbmFuYSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFxuLy8gICAgICAgICAgICAgYGZseWluZy1iYW5hbmEtJHtpfWBcbi8vICAgICAgICAgICAgICk7XG4vLyAgICAgICAgICAgICB0aGlzT25lUGFydGljdWxhckJhbmFuYS5zdHlsZS50b3AgPSAoTWF0aC5yYW5kb20oKSAqIC03MDApICsgXCJweFwiO1xuLy8gICAgICAgICAgICAgdGhpc09uZVBhcnRpY3VsYXJCYW5hbmEuc3R5bGUubGVmdCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHdpbmRvdy5pbm5lcldpZHRoKSArIFwicHhcIjtcblxuLy8gICAgICAgICAgICAgbW92ZW1lbnRGdW5jKHRoaXNPbmVQYXJ0aWN1bGFyQmFuYW5hKTtcbi8vICAgICAgICAgfVxuXG4vLyAgICAgICAgIGJhbmFuYUNvdW50ZXIgKz0gMTA7XG5cbi8vICAgICAgIH0pO1xuXG4vLyB9KVxuXG5jb25zdCBjcmVhdGVPYnNlcnZlcnMgPSAoc2xpZGVzKSA9PiB7XG4gICAgXG4gICAgbGV0IG9wdGlvbnMgPSB7XG4gICAgICByb290OiBudWxsLFxuICAgICAgcm9vdE1hcmdpbjogXCIwcHggMHB4IDBweCAwcHhcIixcbiAgICAgIHRocmVzaG9sZDogLjVcbiAgICB9O1xuXG4gICAgY29uc29sZS5sb2coc2xpZGVzKTtcbiAgICBcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNsaWRlcy5sZW5ndGggLSAxOyBpKyspIHtcbiAgICAgIFNsaWRlcy5yZW5kZXJTbGlkZShvcHRpb25zLCBzbGlkZXNbaV0sIGkpO1xuICAgIH1cblxufVxuXG5jb25zdCBjcmVhdGVOYXZMaSA9IChpZHgpID0+IHtcbiAgbGV0IG5hdkNvbHVtbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5uYXYtY29sdW1uJyk7XG5cbiAgbGV0IGFuY2hvckxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYVwiKTtcbiAgYW5jaG9yTGluay5zZXRBdHRyaWJ1dGUoXCJocmVmXCIsIGAjYW5jaG9yLSR7aWR4fWApO1xuICBuYXZDb2x1bW4uYXBwZW5kQ2hpbGQoYW5jaG9yTGluayk7XG5cbiAgbGV0IG5hdkxpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpO1xuICBuYXZMaS5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBgbmF2LWxpLSR7aWR4fWApO1xuICBuYXZMaS5jbGFzc0xpc3QuYWRkKFwibmF2LWxpXCIpO1xuICBhbmNob3JMaW5rLmFwcGVuZENoaWxkKG5hdkxpKTtcblxufVxuXG5jb25zdCBjcmVhdGVBbmNob3IgPSAoaWR4KSA9PiB7XG4gIGxldCBzbGlkZUNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBzbGlkZS1jb250YWluZXItJHtpZHh9YCk7XG5cbiAgbGV0IGFuY2hvclRhZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJhXCIpO1xuICBhbmNob3JUYWcuc2V0QXR0cmlidXRlKFwiaWRcIiwgYGFuY2hvci0ke2lkeH1gKTtcbiAgYW5jaG9yVGFnLmNsYXNzTGlzdC5hZGQoXCJhbmNob3JcIik7XG5cbiAgc2xpZGVDb250YWluZXIuYXBwZW5kQ2hpbGQoYW5jaG9yVGFnKTtcbn1cblxuXG4iLCIgICAgY29uc3QgYWRkQWxsRmx5aW5nRm9vZExpc3RlbmVycyA9ICgpID0+IHtcblxuICAgICAgICBsZXQgZm9vZENvdW50ZXJzID0ge307XG5cbiAgICAgICAgY29uc3QgYWRkRmx5aW5nRm9vZExpc3RlbmVyID0gaWR4ID0+IHtcbiAgICAgICAgICAgIGxldCBmb29kSWNvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBmb29kLXN2Zy1jb250YWluZXItJHtpZHh9YCk7XG5cbiAgICAgICAgICAgIGZvb2RJY29uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBlID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgZm9vZENoaWxkcmVuID0gZm9vZEljb24uY2hpbGROb2RlcztcbiAgICAgICAgICAgICAgICBpZiAoZm9vZENoaWxkcmVuWzNdKSB7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAzMDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvb2RJY29uLnJlbW92ZUNoaWxkKGZvb2RDaGlsZHJlblszXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGxldCBtb3ZlbWVudEZ1bmMgPSBuZXdGb29kID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgc3RhcnQgPSBudWxsO1xuXG4gICAgICAgICAgICAgICAgbGV0IHNpZ25lZE9uZXMgPSBbLTEsIDFdO1xuICAgICAgICAgICAgICAgIGxldCByYW5kb21JZHggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAyKTtcbiAgICAgICAgICAgICAgICBsZXQgcmFuZG9tbHlTaWduZWRPbmUgPSBzaWduZWRPbmVzW3JhbmRvbUlkeF07XG5cbiAgICAgICAgICAgICAgICBjb25zdCBzdGVwID0gdGltZXN0YW1wID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFzdGFydCkgc3RhcnQgPSB0aW1lc3RhbXA7XG4gICAgICAgICAgICAgICAgICAgIGxldCBwcm9ncmVzcyA9IHRpbWVzdGFtcCAtIHN0YXJ0O1xuICAgICAgICAgICAgICAgICAgICBuZXdGb29kLnN0eWxlLnRyYW5zZm9ybSA9IFwidHJhbnNsYXRlKFwiICsgKHByb2dyZXNzICogcmFuZG9tbHlTaWduZWRPbmUpICsgXCJweCwgXCIgKyBwcm9ncmVzcyArIFwicHgpXCI7XG4gICAgICAgICAgICAgICAgICAgIGlmIChwcm9ncmVzcyA8IDE1MDApIHtcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShzdGVwKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKHN0ZXApO1xuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gZm9vZENvdW50ZXJzW2lkeF07IGkgPCBmb29kQ291bnRlcnNbaWR4XSArIDMwOyBpKyspIHtcbiAgICAgICAgICAgICAgICBsZXQgbmV3Rm9vZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgICAgICAgICAgbmV3Rm9vZC5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBgZmx5aW5nLWZvb2Qtb2YtdHlwZS0ke2lkeH0tJHtpfWApO1xuICAgICAgICAgICAgICAgIG5ld0Zvb2QuY2xhc3NMaXN0LmFkZChgZmx5aW5nLWZvb2QtJHtpZHh9YCk7XG4gICAgICAgICAgICAgICAgbmV3Rm9vZC5jbGFzc0xpc3QuYWRkKGBmbHlpbmctZm9vZGApO1xuICAgICAgICAgICAgICAgIGZvb2RJY29uLmFwcGVuZENoaWxkKG5ld0Zvb2QpO1xuXG4gICAgICAgICAgICAgICAgbGV0IHRoaXNPbmVQYXJ0aWN1bGFyRm9vZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFxuICAgICAgICAgICAgICAgICAgICBgZmx5aW5nLWZvb2Qtb2YtdHlwZS0ke2lkeH0tJHtpfWBcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIHRoaXNPbmVQYXJ0aWN1bGFyRm9vZC5zdHlsZS50b3AgPSBNYXRoLnJhbmRvbSgpICogLTcwMCArIFwicHhcIjtcbiAgICAgICAgICAgICAgICB0aGlzT25lUGFydGljdWxhckZvb2Quc3R5bGUubGVmdCA9XG4gICAgICAgICAgICAgICAgICAgIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHdpbmRvdy5pbm5lcldpZHRoKSArIFwicHhcIjtcblxuICAgICAgICAgICAgICAgIG1vdmVtZW50RnVuYyh0aGlzT25lUGFydGljdWxhckZvb2QpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGZvb2RDb3VudGVyc1tpZHhdICs9IDEwO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxODsgaSsrKSB7XG4gICAgICAgICAgICBmb29kQ291bnRlcnNbaV0gPSAwO1xuICAgICAgICAgICAgYWRkRmx5aW5nRm9vZExpc3RlbmVyKGkpO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBleHBvcnQgZGVmYXVsdCBhZGRBbGxGbHlpbmdGb29kTGlzdGVuZXJzOyIsImV4cG9ydCBjb25zdCByZW5kZXJTbGlkZSA9IChvcHRpb25zLCBzbGlkZSwgaWR4KSA9PiB7XG5cbiAgY29uc3QgaGFuZGxlU2Nyb2xsT250byA9IChlbnRyaWVzLCBvYnNlcnZlcikgPT4ge1xuICAgIGVudHJpZXMuZm9yRWFjaChlbnRyeSA9PiB7XG4gICAgICBpZiAoZW50cnkuaXNJbnRlcnNlY3RpbmcpIHtcblxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuc2xpZGUtc3ZnLSR7aWR4fWApXG4gICAgICAgICAgLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIik7XG5cbiAgICAgICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC5zbGlkZS1zdmctJHtpZHggLSAxfWApKSB7XG4gICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLnNsaWRlLXN2Zy0ke2lkeCAtIDF9YClcbiAgICAgICAgICAuY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuc2xpZGUtc3ZnLSR7aWR4ICsgMX1gKSkge1xuICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC5zbGlkZS1zdmctJHtpZHggKyAxfWApXG4gICAgICAgICAgLmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XG4gICAgICAgIH1cblxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGAuc2xpZGUtc3ZnLSR7aWR4fS1yZWN0YCkuZm9yRWFjaChyZWN0ID0+IHtcbiAgICAgICAgICAvLyByZWN0LmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIik7XG4gICAgICAgICAgcmVjdC5jbGFzc0xpc3QuYWRkKFwiY2hhcnQtcmVjdFwiKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZDMuc2VsZWN0KGAuc2xpZGUtc3ZnLSR7aWR4fS15LWF4aXNgKVxuICAgICAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgICAgICAuc3R5bGUoXCJvcGFjaXR5XCIsIFwiMTAwJVwiKVxuICAgICAgICAgIC5kdXJhdGlvbig1MDApO1xuXG4gICAgICAgIGxldCBuYXZDaXJjbGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgbmF2LWxpLSR7aWR4fWApO1xuICAgICAgICBuYXZDaXJjbGUuY2xhc3NMaXN0LmFkZChgbmF2LWxpLSR7aWR4fWApO1xuXG5cblxuICAgICAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgLnNsaWRlLXN2Zy0ke2lkeCAtIDF9LXJlY3RgKSkge1xuICAgICAgICAgICAgZG9jdW1lbnRcbiAgICAgICAgICAgICAgLnF1ZXJ5U2VsZWN0b3JBbGwoYC5zbGlkZS1zdmctJHtpZHggLSAxfS1yZWN0YClcbiAgICAgICAgICAgICAgLmZvckVhY2gocmVjdCA9PiB7XG4gICAgICAgICAgICAgICAgLy8gcmVjdC5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xuICAgICAgICAgICAgICAgIHJlY3QuY2xhc3NMaXN0LnJlbW92ZShcImNoYXJ0LXJlY3RcIik7XG4gICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBkMy5zZWxlY3QoYC5zbGlkZS1zdmctJHtpZHggLSAxfS15LWF4aXNgKVxuICAgICAgICAgICAgICAudHJhbnNpdGlvbigpXG4gICAgICAgICAgICAgIC5zdHlsZShcIm9wYWNpdHlcIiwgXCIwJVwiKVxuICAgICAgICAgICAgICAuZHVyYXRpb24oNTAwKTtcbiAgICAgICAgICAgIFxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBuYXYtbGktJHtpZHggLSAxfWApKSB7XG4gICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYG5hdi1saS0ke2lkeCAtIDF9YCkuY2xhc3NMaXN0LnJlbW92ZShgbmF2LWxpLSR7aWR4IC0gMX1gKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGAuc2xpZGUtc3ZnLSR7aWR4ICsgMX0tcmVjdGApKSB7XG4gICAgICAgICAgICAvLyBkZWJ1Z2dlcjtcbiAgICAgICAgICAgIGRvY3VtZW50XG4gICAgICAgICAgICAgIC5xdWVyeVNlbGVjdG9yQWxsKGAuc2xpZGUtc3ZnLSR7aWR4ICsgMX0tcmVjdGApXG4gICAgICAgICAgICAgIC5mb3JFYWNoKHJlY3QgPT4ge1xuICAgICAgICAgICAgICAgIC8vIHJlY3QuY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcbiAgICAgICAgICAgICAgICByZWN0LmNsYXNzTGlzdC5yZW1vdmUoXCJjaGFydC1yZWN0XCIpO1xuICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgZDMuc2VsZWN0KGAuc2xpZGUtc3ZnLSR7aWR4ICsgMX0teS1heGlzYClcbiAgICAgICAgICAgICAgLnRyYW5zaXRpb24oKVxuICAgICAgICAgICAgICAuc3R5bGUoXCJvcGFjaXR5XCIsIFwiMCVcIilcbiAgICAgICAgICAgICAgLmR1cmF0aW9uKDUwMCk7XG5cbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBuYXYtbGktJHtpZHggKyAxfWApLmNsYXNzTGlzdC5yZW1vdmUoYG5hdi1saS0ke2lkeCArIDF9YCk7ICAgICAgICAgICAgICBcbiAgICAgICAgfVxuXG4gICAgICAgICAgXG4gICAgICB9XG4gICAgfSk7XG4gIH07XG5cbiAgbGV0IG9ic2VydmVyID0gbmV3IEludGVyc2VjdGlvbk9ic2VydmVyKGhhbmRsZVNjcm9sbE9udG8sIG9wdGlvbnMpO1xuICBvYnNlcnZlci5vYnNlcnZlKHNsaWRlKTtcblxufSIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpbiJdLCJzb3VyY2VSb290IjoiIn0=