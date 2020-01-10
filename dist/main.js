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
    top: 40,
    right: 40,
    bottom: 65,
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
  var svg = d3.select("#vis").append("svg").attr("class", "".concat(targetSVG)).attr("width", w + margin.left + margin.right).attr("height", h + margin.top + margin.bottom);
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
  svg.selectAll("rect").data(data).enter().append("rect").attr("class", "".concat(targetSlideRect, " hidden")).attr("x", function (d, i) {
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
        document.querySelectorAll(".slide-svg-".concat(idx, "-rect")).forEach(function (rect) {
          rect.classList.remove("hidden");
          rect.classList.add("chart-rect");
        }); // document
        //   .querySelector(`#slide-container-${idx}`)
        //   .classList.remove("opaque");
        // d3.selectAll(`.slide-svg-${idx}-rect`).on("mouseover", handleMouseover);
        // const handleMouseover = (d, i) => {
        //   debugger;
        //   d3.select(this)
        //     .transition()
        //     .ease("ease")
        //     .duration(500)
        //     .attr("fill", "white");
        // };

        if (document.querySelectorAll(".slide-svg-".concat(idx - 1, "-rect"))) {
          document.querySelectorAll(".slide-svg-".concat(idx - 1, "-rect")).forEach(function (rect) {
            rect.classList.add("hidden");
            rect.classList.remove("chart-rect");
          });
        } // if (document.querySelector(`#slide-container-${idx - 1}`)) {
        //   document
        //     .querySelector(`#slide-container-${idx - 1}`)
        //     .classList.add("opaque");
        // }


        if (document.querySelectorAll(".slide-svg-".concat(idx + 1, "-rect"))) {
          document.querySelectorAll(".slide-svg-".concat(idx + 1, "-rect")).forEach(function (rect) {
            rect.classList.add("hidden");
            rect.classList.remove("chart-rect");
          });
        } // if (document.querySelector(`#slide-container-${idx + 1}`)) {
        //   document
        //     .querySelector(`#slide-container-${idx + 1}`)
        //     .classList.add("opaque");            
        // }


        d3.select(".slide-svg-".concat(idx, "-y-axis")).transition().style("opacity", "100%").duration(500);

        if (document.querySelector(".slide-svg-".concat(idx - 1, "-y-axis"))) {
          d3.select(".slide-svg-".concat(idx - 1, "-y-axis")).transition().style("opacity", "0%").duration(500);
        }

        if (document.querySelector(".slide-svg-".concat(idx + 1, "-y-axis"))) {
          d3.select(".slide-svg-".concat(idx + 1, "-y-axis")).transition().style("opacity", "0%").duration(500);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL2ZseWluZ19mb29kLmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL3Njcm9sbC9zbGlkZXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0eWxlcy9pbmRleC5zY3NzP2M4MDciXSwibmFtZXMiOlsibnV0cml0aW9uRGF0YSIsImQzIiwiY3N2IiwiZCIsImZvb2RfbmFtZSIsInNlcnZpbmdfc2l6ZSIsImZpYmVyIiwiaXJvbiIsIm1hZ25lc2l1bSIsInBvdGFzc2l1bSIsInppbmMiLCJmb2xhdGUiLCJjaG9sZXN0ZXJvbCIsInRoZW4iLCJkYXRhIiwiY29uc29sZSIsImxvZyIsImNyZWF0ZVZpc3VhbGl6YXRpb24iLCJjcmVhdGVOYXZMaSIsImNyZWF0ZUFuY2hvciIsImkiLCJsZW5ndGgiLCJmb29kRGF0YSIsImlkeCIsImNyZWF0ZVhBeGlzQm9vbCIsIm1hcmdpbiIsInRvcCIsInJpZ2h0IiwiYm90dG9tIiwibGVmdCIsInciLCJoIiwiT2JqZWN0IiwidmFsdWVzIiwic2xpY2UiLCJudW1iZXJPZkNvbHVtbnMiLCJtYXhWYWx1ZSIsIk1hdGgiLCJtYXgiLCJ4X2F4aXNMZW5ndGgiLCJ5X2F4aXNMZW5ndGgiLCJ0YXJnZXRTVkciLCJ0YXJnZXRTbGlkZVJlY3QiLCJ4U2NhbGUiLCJzY2FsZUxpbmVhciIsImRvbWFpbiIsInJhbmdlIiwieVNjYWxlIiwic3ZnIiwic2VsZWN0IiwiYXBwZW5kIiwiYXR0ciIsInhBeGlzIiwiYXhpc0JvdHRvbSIsInRpY2tTaXplIiwidGlja0Zvcm1hdCIsImtleXMiLCJ1bmRlZmluZWQiLCJ0cmFuc2l0aW9uIiwiZHVyYXRpb24iLCJjYWxsIiwic2VsZWN0QWxsIiwic3R5bGUiLCJ0ZXh0IiwieUF4aXMiLCJheGlzTGVmdCIsInRpY2tzIiwiZW50ZXIiLCJoYW5kbGVNb3VzZW92ZXIiLCJlYXNlIiwid2luZG93IiwiYWRkRXZlbnRMaXN0ZW5lciIsImUiLCJzbGlkZXMiLCJzbGlkZU5hbWUiLCJuZXdTbGlkZSIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsInB1c2giLCJjcmVhdGVPYnNlcnZlcnMiLCJhZGRBbGxGbHlpbmdGb29kTGlzdGVuZXJzIiwib3B0aW9ucyIsInJvb3QiLCJyb290TWFyZ2luIiwidGhyZXNob2xkIiwiU2xpZGVzIiwibmF2Q29sdW1uIiwiYW5jaG9yTGluayIsImNyZWF0ZUVsZW1lbnQiLCJzZXRBdHRyaWJ1dGUiLCJhcHBlbmRDaGlsZCIsIm5hdkxpIiwiY2xhc3NMaXN0IiwiYWRkIiwic2xpZGVDb250YWluZXIiLCJnZXRFbGVtZW50QnlJZCIsImFuY2hvclRhZyIsImZvb2RDb3VudGVycyIsImFkZEZseWluZ0Zvb2RMaXN0ZW5lciIsImZvb2RJY29uIiwiZm9vZENoaWxkcmVuIiwiY2hpbGROb2RlcyIsInJlbW92ZUNoaWxkIiwibW92ZW1lbnRGdW5jIiwibmV3Rm9vZCIsInN0YXJ0Iiwic2lnbmVkT25lcyIsInJhbmRvbUlkeCIsImZsb29yIiwicmFuZG9tIiwicmFuZG9tbHlTaWduZWRPbmUiLCJzdGVwIiwidGltZXN0YW1wIiwicHJvZ3Jlc3MiLCJ0cmFuc2Zvcm0iLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJ0aGlzT25lUGFydGljdWxhckZvb2QiLCJpbm5lcldpZHRoIiwicmVuZGVyU2xpZGUiLCJzbGlkZSIsImhhbmRsZVNjcm9sbE9udG8iLCJlbnRyaWVzIiwib2JzZXJ2ZXIiLCJmb3JFYWNoIiwiZW50cnkiLCJpc0ludGVyc2VjdGluZyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJyZWN0IiwicmVtb3ZlIiwiSW50ZXJzZWN0aW9uT2JzZXJ2ZXIiLCJvYnNlcnZlIl0sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FB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R0FBRyxDQUEzQyxhQUFKLEVBQTREO0FBQ3hEdEIsWUFBRSxDQUFDZ0QsTUFBSCxzQkFBd0IxQixHQUFHLEdBQUcsQ0FBOUIsY0FDR21DLFVBREgsR0FFR0ksS0FGSCxDQUVTLFNBRlQsRUFFb0IsSUFGcEIsRUFHR0gsUUFISCxDQUdZLEdBSFo7QUFJSDs7QUFFRCxZQUFJaUIsUUFBUSxDQUFDQyxhQUFULHNCQUFxQ3RELEdBQUcsR0FBRyxDQUEzQyxhQUFKLEVBQTREO0FBQ3hEdEIsWUFBRSxDQUFDZ0QsTUFBSCxzQkFBd0IxQixHQUFHLEdBQUcsQ0FBOUIsY0FDR21DLFVBREgsR0FFR0ksS0FGSCxDQUVTLFNBRlQsRUFFb0IsSUFGcEIsRUFHR0gsUUFISCxDQUdZLEdBSFo7QUFJSDtBQUVGO0FBQ0YsS0EzRUQ7QUE0RUQsR0E3RUQ7O0FBK0VBLE1BQUkrRCxRQUFRLEdBQUcsSUFBSU8sb0JBQUosQ0FBeUJULGdCQUF6QixFQUEyQ3ZDLE9BQTNDLENBQWY7QUFDQXlDLFVBQVEsQ0FBQ1EsT0FBVCxDQUFpQlgsS0FBakI7QUFFRCxDQXBGTSxDOzs7Ozs7Ozs7OztBQ0FQLHVDIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9kaXN0L1wiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC5qc1wiKTtcbiIsImltcG9ydCAnLi9zdHlsZXMvaW5kZXguc2Nzcyc7XG5pbXBvcnQgKiBhcyBTbGlkZXMgZnJvbSAnLi9zY3JpcHRzL3Njcm9sbC9zbGlkZXMnO1xuaW1wb3J0IGFkZEFsbEZseWluZ0Zvb2RMaXN0ZW5lcnMgZnJvbSAnLi9zY3JpcHRzL2ZseWluZ19mb29kJztcblxubGV0IG51dHJpdGlvbkRhdGE7XG4vLyBsZXQgZm9vZENvdW50ZXJzID0ge307XG5cbi8vIGxldCBiYW5hbmFDb3VudGVyID0gMDtcblxuZDMuY3N2KFwibnV0cml0aW9uX2ZhY3RzX2Zvcl9zY3JvbGxlci5jc3ZcIiwgZCA9PiB7XG4gIHJldHVybiB7XG4gICAgZm9vZF9uYW1lOiBkW1wiRm9vZCBuYW1lXCJdLFxuICAgIHNlcnZpbmdfc2l6ZTogZFtcIkFtb3VudFwiXSxcbiAgICBmaWJlcjogK2RbXCJGaWJlclwiXSxcbiAgICBpcm9uOiArZFtcIklyb25cIl0sXG4gICAgbWFnbmVzaXVtOiArZFtcIk1hZ25lc2l1bVwiXSxcbiAgICBwb3Rhc3NpdW06ICtkW1wiUG90YXNzaXVtXCJdLFxuICAgIHppbmM6ICtkW1wiWmluY1wiXSxcbiAgICBcInZpdGFtaW4gQ1wiOiArZFtcIlZpdGFtaW4gQ1wiXSxcbiAgICBmb2xhdGU6ICtkW1wiRm9sYXRlXCJdLFxuICAgIFwidml0YW1pbiBCMTJcIjogK2RbXCJWaXRhbWluIEItMTJcIl0sXG4gICAgXCJ2aXRhbWluIEFcIjogK2RbXCJWaXRhbWluIEFcIl0sXG4gICAgXCJ2aXRhbWluIERcIjogK2RbXCJWaXRhbWluIERcIl0sXG4gICAgY2hvbGVzdGVyb2w6ICtkW1wiQ2hvbGVzdGVyb2xcIl1cbiAgfTtcbn0pLnRoZW4oZGF0YSA9PiB7XG4gICAgbnV0cml0aW9uRGF0YSA9IGRhdGE7XG4gICAgY29uc29sZS5sb2cobnV0cml0aW9uRGF0YSk7XG4gICAgXG4gICAgY3JlYXRlVmlzdWFsaXphdGlvbihudXRyaXRpb25EYXRhWzBdLCAwLCB0cnVlKTtcbiAgICBjcmVhdGVOYXZMaSgwKTtcbiAgICBjcmVhdGVBbmNob3IoMCk7XG4gICAgXG4gICAgZm9yIChsZXQgaSA9IDE7IGkgPCBudXRyaXRpb25EYXRhLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjcmVhdGVWaXN1YWxpemF0aW9uKG51dHJpdGlvbkRhdGFbaV0sIGkpO1xuICAgICAgY3JlYXRlTmF2TGkoaSk7XG4gICAgICBjcmVhdGVBbmNob3IoaSk7XG4gICAgfVxuXG59KTtcblxuY29uc3QgY3JlYXRlVmlzdWFsaXphdGlvbiA9IChmb29kRGF0YSwgaWR4LCBjcmVhdGVYQXhpc0Jvb2wpID0+IHtcbiAgbGV0IG1hcmdpbiA9IHt0b3A6IDQwLCByaWdodDogNDAsIGJvdHRvbTogNjUsIGxlZnQ6IDYwfVxuICBsZXQgdyA9IDcwMCAtIG1hcmdpbi5sZWZ0IC0gbWFyZ2luLnJpZ2h0O1xuICBsZXQgaCA9IDYwMCAtIG1hcmdpbi50b3AgLSBtYXJnaW4uYm90dG9tO1xuXG4gIGxldCBkYXRhID0gT2JqZWN0LnZhbHVlcyhmb29kRGF0YSkuc2xpY2UoMiwgLTEpO1xuICBsZXQgbnVtYmVyT2ZDb2x1bW5zID0gMTA7XG4gIGxldCBtYXhWYWx1ZSA9IE1hdGgubWF4KC41MCwgZDMubWF4KGRhdGEsIGZ1bmN0aW9uKGQpIHtcbiAgICByZXR1cm4gKCtkIC8gMTAwKTtcbiAgfSkpO1xuICBsZXQgeF9heGlzTGVuZ3RoID0gdztcbiAgbGV0IHlfYXhpc0xlbmd0aCA9IGg7XG4gIGxldCB0YXJnZXRTVkcgPSBcInNsaWRlLXN2Zy1cIiArIGlkeDtcbiAgbGV0IHRhcmdldFNsaWRlUmVjdCA9IFwic2xpZGUtc3ZnLVwiICsgaWR4ICsgXCItcmVjdFwiO1xuXG4gIGxldCB4U2NhbGUgPSBkM1xuICAgIC5zY2FsZUxpbmVhcigpXG4gICAgLmRvbWFpbihbMCwgbnVtYmVyT2ZDb2x1bW5zXSlcbiAgICAucmFuZ2UoWzAsIHddKTtcblxuICBsZXQgeVNjYWxlID0gZDNcbiAgICAuc2NhbGVMaW5lYXIoKVxuICAgIC5kb21haW4oWzAsIG1heFZhbHVlXSlcbiAgICAucmFuZ2UoW2ggLSBtYXJnaW4udG9wLCBtYXJnaW4uYm90dG9tXSk7XG5cbiAgbGV0IHN2ZyA9IGQzXG4gICAgLnNlbGVjdChcIiN2aXNcIilcbiAgICAuYXBwZW5kKFwic3ZnXCIpXG4gICAgLmF0dHIoXCJjbGFzc1wiLCBgJHt0YXJnZXRTVkd9YClcbiAgICAuYXR0cihcIndpZHRoXCIsIHcgKyBtYXJnaW4ubGVmdCArIG1hcmdpbi5yaWdodClcbiAgICAuYXR0cihcImhlaWdodFwiLCBoICsgbWFyZ2luLnRvcCArIG1hcmdpbi5ib3R0b20pO1xuXG4gIGxldCB4QXhpcyA9IGQzXG4gICAgLmF4aXNCb3R0b20oeFNjYWxlKVxuICAgIC50aWNrU2l6ZSgwKVxuICAgIC50aWNrRm9ybWF0KGZ1bmN0aW9uKGQpIHtcbiAgICAgIHJldHVybiBPYmplY3Qua2V5cyhmb29kRGF0YSkuc2xpY2UoMiwgLTEpW2RdO1xuICAgIH0pO1xuXG4gIGlmIChjcmVhdGVYQXhpc0Jvb2wgIT09IHVuZGVmaW5lZCkge1xuICAgIHN2Z1xuICAgICAgLmFwcGVuZChcImdcIilcbiAgICAgIC5hdHRyKFwiY2xhc3NcIiwgYCR7dGFyZ2V0U1ZHfS14LWF4aXMgeC1heGlzYClcbiAgICAgIC5hdHRyKFxuICAgICAgICBcInRyYW5zZm9ybVwiLFxuICAgICAgICBcInRyYW5zbGF0ZShcIiArIG1hcmdpbi5sZWZ0ICsgXCIsIFwiICsgKGggLSBtYXJnaW4udG9wKSArIFwiKVwiXG4gICAgICApXG4gICAgICAudHJhbnNpdGlvbigpXG4gICAgICAuZHVyYXRpb24oMTAwMClcbiAgICAgIC5jYWxsKHhBeGlzKTtcblxuICAgIHN2Zy5zZWxlY3RBbGwoXCIueC1heGlzIHRleHRcIikuYXR0cihcInRyYW5zZm9ybVwiLCBmdW5jdGlvbihkKSB7XG4gICAgICByZXR1cm4gXCJ0cmFuc2xhdGUoMjUsIDI1KXJvdGF0ZSgtNDUpXCI7XG4gICAgfSk7XG5cbiAgICBzdmdcbiAgICAgIC5hcHBlbmQoXCJ0ZXh0XCIpXG4gICAgICAuYXR0cihcInRyYW5zZm9ybVwiLCBcInJvdGF0ZSgtOTApXCIpXG4gICAgICAuYXR0cihcImNsYXNzXCIsIFwieS1heGlzLWxhYmVsXCIpXG4gICAgICAuYXR0cihcInlcIiwgLTUpXG4gICAgICAuYXR0cihcInhcIiwgMCAtIGggLyAyKVxuICAgICAgLmF0dHIoXCJkeVwiLCBcIjFlbVwiKVxuICAgICAgLnN0eWxlKFwidGV4dC1hbmNob3JcIiwgXCJtaWRkbGVcIilcbiAgICAgIC50ZXh0KFwiUGVyY2VudGFnZSBvZiByZWNvbW1lbmRlZCBkYWlseSBhbGxvd2FuY2UoUkRBKVwiKTtcbiAgfVxuXG4gIGxldCB5QXhpcyA9IGQzLmF4aXNMZWZ0KHlTY2FsZSkudGlja3MoNCwgXCIlXCIpO1xuXG4gIHN2Z1xuICAgIC5hcHBlbmQoXCJnXCIpXG4gICAgLmF0dHIoXCJjbGFzc1wiLCBgJHt0YXJnZXRTVkd9LXktYXhpcyB5LWF4aXNgKVxuICAgIC5hdHRyKFwidHJhbnNmb3JtXCIsIFwidHJhbnNsYXRlKFwiICsgbWFyZ2luLmxlZnQgKyBcIiwwKVwiKVxuICAgIC5zdHlsZShcIm9wYWNpdHlcIiwgXCIwJVwiKVxuICAgIC5jYWxsKHlBeGlzKTtcblxuICBzdmdcbiAgICAuc2VsZWN0QWxsKFwicmVjdFwiKVxuICAgIC5kYXRhKGRhdGEpXG4gICAgLmVudGVyKClcbiAgICAuYXBwZW5kKFwicmVjdFwiKVxuICAgIC5hdHRyKFwiY2xhc3NcIiwgYCR7dGFyZ2V0U2xpZGVSZWN0fSBoaWRkZW5gKVxuICAgIC5hdHRyKFwieFwiLCBmdW5jdGlvbihkLCBpKSB7XG4gICAgICByZXR1cm4gaSAqICh4X2F4aXNMZW5ndGggLyBudW1iZXJPZkNvbHVtbnMpICsgbWFyZ2luLmxlZnQgKyAxMDtcbiAgICB9KVxuICAgIC5hdHRyKFwieVwiLCBmdW5jdGlvbihkKSB7XG4gICAgICByZXR1cm4geVNjYWxlKGQgLyAxMDApO1xuICAgIH0pXG4gICAgLmF0dHIoXCJ3aWR0aFwiLCB4X2F4aXNMZW5ndGggLyBudW1iZXJPZkNvbHVtbnMgLSAxKVxuICAgIC5hdHRyKFwiaGVpZ2h0XCIsIGZ1bmN0aW9uKGQpIHtcbiAgICAgIHJldHVybiBoIC0geVNjYWxlKGQgLyAxMDApIC0gbWFyZ2luLnRvcDtcbiAgICB9KVxuICAgIC5hdHRyKFwiZmlsbFwiLCBcInJlZFwiKVxuICAgIC50cmFuc2l0aW9uKClcbiAgICAuZHVyYXRpb24oNTAwKTtcbiAgICAvLyAub24oXCJtb3VzZW92ZXJcIiwgaGFuZGxlTW91c2VvdmVyKTtcblxuXG4gICAgY29uc3QgaGFuZGxlTW91c2VvdmVyID0gKGQsIGkpID0+IHtcbiAgICAgIGQzLnNlbGVjdCh0aGlzKVxuICAgICAgICAudHJhbnNpdGlvbigpXG4gICAgICAgIC5lYXNlKFwiZWFzZVwiKVxuICAgICAgICAuZHVyYXRpb24oNTAwKVxuICAgICAgICAuYXR0cihcImZpbGxcIiwgXCJ3aGl0ZVwiKTtcbiAgICB9O1xufTtcblxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsIChlKSA9PiB7XG4gICAgXG4gICAgbGV0IHNsaWRlcyA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTk7IGkrKykge1xuICAgICAgICBsZXQgc2xpZGVOYW1lID0gXCIjc2xpZGUtY29udGFpbmVyLVwiICsgaTtcbiAgICAgICAgbGV0IG5ld1NsaWRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzbGlkZU5hbWUpO1xuICAgICAgICBzbGlkZXMucHVzaChuZXdTbGlkZSk7XG4gICAgfVxuICAgIGNyZWF0ZU9ic2VydmVycyhzbGlkZXMpO1xufSwgZmFsc2UpO1xuXG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsICgpID0+IHtcblxuICAgIGFkZEFsbEZseWluZ0Zvb2RMaXN0ZW5lcnMoKTtcblxufSlcblxuLy8gICAgIGRvY3VtZW50XG4vLyAgICAgICAuZ2V0RWxlbWVudEJ5SWQoXCJiYW5hbmEtc3ZnLWNvbnRhaW5lclwiKVxuLy8gICAgICAgLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBlID0+IHtcblxuLy8gICAgICAgICBsZXQgYmFuYW5hSWNvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFxuLy8gICAgICAgICAgICAgXCJiYW5hbmEtc3ZnLWNvbnRhaW5lclwiXG4vLyAgICAgICAgICk7XG5cbi8vICAgICAgICAgbGV0IGJhbmFuYUNoaWxkcmVuID0gYmFuYW5hSWNvbi5jaGlsZE5vZGVzO1xuLy8gICAgICAgICBpZiAoYmFuYW5hQ2hpbGRyZW5bM10pIHtcbi8vICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMjA7IGkrKykge1xuLy8gICAgICAgICAgICAgICAgIGJhbmFuYUljb24ucmVtb3ZlQ2hpbGQoYmFuYW5hQ2hpbGRyZW5bM10pO1xuLy8gICAgICAgICAgICAgfVxuLy8gICAgICAgICB9XG5cbi8vICAgICAgICAgbGV0IG1vdmVtZW50RnVuYyA9IG5ld0JhbmFuYSA9PiB7XG5cbi8vICAgICAgICAgICBsZXQgc3RhcnQgPSBudWxsO1xuXG4vLyAgICAgICAgICAgY29uc3Qgc3RlcCA9ICh0aW1lc3RhbXApID0+IHtcbi8vICAgICAgICAgICAgIGlmICghc3RhcnQpIHN0YXJ0ID0gdGltZXN0YW1wO1xuLy8gICAgICAgICAgICAgbGV0IHByb2dyZXNzID0gdGltZXN0YW1wIC0gc3RhcnQ7XG4vLyAgICAgICAgICAgICBuZXdCYW5hbmEuc3R5bGUudHJhbnNmb3JtID1cbi8vICAgICAgICAgICAgICAgXCJ0cmFuc2xhdGVZKFwiICsgKHByb2dyZXNzKSArIFwicHgpXCI7XG4vLyAgICAgICAgICAgICBpZiAocHJvZ3Jlc3MgPCA1MDAwKSB7XG4vLyAgICAgICAgICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoc3RlcCk7XG4vLyAgICAgICAgICAgICB9XG4vLyAgICAgICAgICAgfVxuXG4vLyAgICAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShzdGVwKTtcblxuLy8gICAgICAgICB9XG5cbi8vICAgICAgICAgZm9yIChsZXQgaSA9IGJhbmFuYUNvdW50ZXI7IGkgPCBiYW5hbmFDb3VudGVyICsgMjA7IGkrKykge1xuLy8gICAgICAgICAgICAgbGV0IG5ld0JhbmFuYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4vLyAgICAgICAgICAgICBuZXdCYW5hbmEuc2V0QXR0cmlidXRlKFwiaWRcIiwgYGZseWluZy1iYW5hbmEtJHtpfWApO1xuLy8gICAgICAgICAgICAgbmV3QmFuYW5hLmNsYXNzTGlzdC5hZGQoYGZseWluZy1iYW5hbmFgKTtcbi8vICAgICAgICAgICAgIGJhbmFuYUljb24uYXBwZW5kQ2hpbGQobmV3QmFuYW5hKTtcblxuLy8gICAgICAgICAgICAgbGV0IHRoaXNPbmVQYXJ0aWN1bGFyQmFuYW5hID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXG4vLyAgICAgICAgICAgICBgZmx5aW5nLWJhbmFuYS0ke2l9YFxuLy8gICAgICAgICAgICAgKTtcbi8vICAgICAgICAgICAgIHRoaXNPbmVQYXJ0aWN1bGFyQmFuYW5hLnN0eWxlLnRvcCA9IChNYXRoLnJhbmRvbSgpICogLTcwMCkgKyBcInB4XCI7XG4vLyAgICAgICAgICAgICB0aGlzT25lUGFydGljdWxhckJhbmFuYS5zdHlsZS5sZWZ0ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogd2luZG93LmlubmVyV2lkdGgpICsgXCJweFwiO1xuXG4vLyAgICAgICAgICAgICBtb3ZlbWVudEZ1bmModGhpc09uZVBhcnRpY3VsYXJCYW5hbmEpO1xuLy8gICAgICAgICB9XG5cbi8vICAgICAgICAgYmFuYW5hQ291bnRlciArPSAxMDtcblxuLy8gICAgICAgfSk7XG5cbi8vIH0pXG5cbmNvbnN0IGNyZWF0ZU9ic2VydmVycyA9IChzbGlkZXMpID0+IHtcbiAgICBcbiAgICBsZXQgb3B0aW9ucyA9IHtcbiAgICAgIHJvb3Q6IG51bGwsXG4gICAgICByb290TWFyZ2luOiBcIjBweCAwcHggMHB4IDBweFwiLFxuICAgICAgdGhyZXNob2xkOiAuNVxuICAgIH07XG5cbiAgICBjb25zb2xlLmxvZyhzbGlkZXMpO1xuICAgIFxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2xpZGVzLmxlbmd0aCAtIDE7IGkrKykge1xuICAgICAgU2xpZGVzLnJlbmRlclNsaWRlKG9wdGlvbnMsIHNsaWRlc1tpXSwgaSk7XG4gICAgfVxuXG59XG5cbmNvbnN0IGNyZWF0ZU5hdkxpID0gKGlkeCkgPT4ge1xuICBsZXQgbmF2Q29sdW1uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm5hdi1jb2x1bW4nKTtcblxuICBsZXQgYW5jaG9yTGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJhXCIpO1xuICBhbmNob3JMaW5rLnNldEF0dHJpYnV0ZShcImhyZWZcIiwgYCNhbmNob3ItJHtpZHh9YCk7XG4gIG5hdkNvbHVtbi5hcHBlbmRDaGlsZChhbmNob3JMaW5rKTtcblxuICBsZXQgbmF2TGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlcIik7XG4gIG5hdkxpLnNldEF0dHJpYnV0ZShcImlkXCIsIGBuYXYtbGktJHtpZHh9YCk7XG4gIG5hdkxpLmNsYXNzTGlzdC5hZGQoXCJuYXYtbGlcIik7XG4gIGFuY2hvckxpbmsuYXBwZW5kQ2hpbGQobmF2TGkpO1xuXG59XG5cbmNvbnN0IGNyZWF0ZUFuY2hvciA9IChpZHgpID0+IHtcbiAgbGV0IHNsaWRlQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYHNsaWRlLWNvbnRhaW5lci0ke2lkeH1gKTtcblxuICBsZXQgYW5jaG9yVGFnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImFcIik7XG4gIGFuY2hvclRhZy5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBgYW5jaG9yLSR7aWR4fWApO1xuICBhbmNob3JUYWcuY2xhc3NMaXN0LmFkZChcImFuY2hvclwiKTtcblxuICBzbGlkZUNvbnRhaW5lci5hcHBlbmRDaGlsZChhbmNob3JUYWcpO1xufVxuXG5cbiIsIiAgICBjb25zdCBhZGRBbGxGbHlpbmdGb29kTGlzdGVuZXJzID0gKCkgPT4ge1xuXG4gICAgICAgIGxldCBmb29kQ291bnRlcnMgPSB7fTtcblxuICAgICAgICBjb25zdCBhZGRGbHlpbmdGb29kTGlzdGVuZXIgPSBpZHggPT4ge1xuICAgICAgICAgICAgbGV0IGZvb2RJY29uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYGZvb2Qtc3ZnLWNvbnRhaW5lci0ke2lkeH1gKTtcblxuICAgICAgICAgICAgZm9vZEljb24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGUgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBmb29kQ2hpbGRyZW4gPSBmb29kSWNvbi5jaGlsZE5vZGVzO1xuICAgICAgICAgICAgICAgIGlmIChmb29kQ2hpbGRyZW5bM10pIHtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDMwOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgZm9vZEljb24ucmVtb3ZlQ2hpbGQoZm9vZENoaWxkcmVuWzNdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgbGV0IG1vdmVtZW50RnVuYyA9IG5ld0Zvb2QgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBzdGFydCA9IG51bGw7XG5cbiAgICAgICAgICAgICAgICBsZXQgc2lnbmVkT25lcyA9IFstMSwgMV07XG4gICAgICAgICAgICAgICAgbGV0IHJhbmRvbUlkeCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDIpO1xuICAgICAgICAgICAgICAgIGxldCByYW5kb21seVNpZ25lZE9uZSA9IHNpZ25lZE9uZXNbcmFuZG9tSWR4XTtcblxuICAgICAgICAgICAgICAgIGNvbnN0IHN0ZXAgPSB0aW1lc3RhbXAgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXN0YXJ0KSBzdGFydCA9IHRpbWVzdGFtcDtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHByb2dyZXNzID0gdGltZXN0YW1wIC0gc3RhcnQ7XG4gICAgICAgICAgICAgICAgICAgIG5ld0Zvb2Quc3R5bGUudHJhbnNmb3JtID0gXCJ0cmFuc2xhdGUoXCIgKyAocHJvZ3Jlc3MgKiByYW5kb21seVNpZ25lZE9uZSkgKyBcInB4LCBcIiArIHByb2dyZXNzICsgXCJweClcIjtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHByb2dyZXNzIDwgMTUwMCkge1xuICAgICAgICAgICAgICAgICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKHN0ZXApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoc3RlcCk7XG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSBmb29kQ291bnRlcnNbaWR4XTsgaSA8IGZvb2RDb3VudGVyc1tpZHhdICsgMzA7IGkrKykge1xuICAgICAgICAgICAgICAgIGxldCBuZXdGb29kID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgICAgICAgICBuZXdGb29kLnNldEF0dHJpYnV0ZShcImlkXCIsIGBmbHlpbmctZm9vZC1vZi10eXBlLSR7aWR4fS0ke2l9YCk7XG4gICAgICAgICAgICAgICAgbmV3Rm9vZC5jbGFzc0xpc3QuYWRkKGBmbHlpbmctZm9vZC0ke2lkeH1gKTtcbiAgICAgICAgICAgICAgICBuZXdGb29kLmNsYXNzTGlzdC5hZGQoYGZseWluZy1mb29kYCk7XG4gICAgICAgICAgICAgICAgZm9vZEljb24uYXBwZW5kQ2hpbGQobmV3Rm9vZCk7XG5cbiAgICAgICAgICAgICAgICBsZXQgdGhpc09uZVBhcnRpY3VsYXJGb29kID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXG4gICAgICAgICAgICAgICAgICAgIGBmbHlpbmctZm9vZC1vZi10eXBlLSR7aWR4fS0ke2l9YFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgdGhpc09uZVBhcnRpY3VsYXJGb29kLnN0eWxlLnRvcCA9IE1hdGgucmFuZG9tKCkgKiAtNzAwICsgXCJweFwiO1xuICAgICAgICAgICAgICAgIHRoaXNPbmVQYXJ0aWN1bGFyRm9vZC5zdHlsZS5sZWZ0ID1cbiAgICAgICAgICAgICAgICAgICAgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogd2luZG93LmlubmVyV2lkdGgpICsgXCJweFwiO1xuXG4gICAgICAgICAgICAgICAgbW92ZW1lbnRGdW5jKHRoaXNPbmVQYXJ0aWN1bGFyRm9vZCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgZm9vZENvdW50ZXJzW2lkeF0gKz0gMTA7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDE4OyBpKyspIHtcbiAgICAgICAgICAgIGZvb2RDb3VudGVyc1tpXSA9IDA7XG4gICAgICAgICAgICBhZGRGbHlpbmdGb29kTGlzdGVuZXIoaSk7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIGV4cG9ydCBkZWZhdWx0IGFkZEFsbEZseWluZ0Zvb2RMaXN0ZW5lcnM7IiwiZXhwb3J0IGNvbnN0IHJlbmRlclNsaWRlID0gKG9wdGlvbnMsIHNsaWRlLCBpZHgpID0+IHtcblxuICBjb25zdCBoYW5kbGVTY3JvbGxPbnRvID0gKGVudHJpZXMsIG9ic2VydmVyKSA9PiB7XG4gICAgZW50cmllcy5mb3JFYWNoKGVudHJ5ID0+IHtcbiAgICAgIGlmIChlbnRyeS5pc0ludGVyc2VjdGluZykge1xuXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYC5zbGlkZS1zdmctJHtpZHh9LXJlY3RgKS5mb3JFYWNoKHJlY3QgPT4ge1xuICAgICAgICAgIHJlY3QuY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKTtcbiAgICAgICAgICByZWN0LmNsYXNzTGlzdC5hZGQoXCJjaGFydC1yZWN0XCIpO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyBkb2N1bWVudFxuICAgICAgICAvLyAgIC5xdWVyeVNlbGVjdG9yKGAjc2xpZGUtY29udGFpbmVyLSR7aWR4fWApXG4gICAgICAgIC8vICAgLmNsYXNzTGlzdC5yZW1vdmUoXCJvcGFxdWVcIik7XG4gICAgICAgIFxuICAgICAgICAvLyBkMy5zZWxlY3RBbGwoYC5zbGlkZS1zdmctJHtpZHh9LXJlY3RgKS5vbihcIm1vdXNlb3ZlclwiLCBoYW5kbGVNb3VzZW92ZXIpO1xuXG4gICAgICAgIC8vIGNvbnN0IGhhbmRsZU1vdXNlb3ZlciA9IChkLCBpKSA9PiB7XG4gICAgICAgIC8vICAgZGVidWdnZXI7XG4gICAgICAgIC8vICAgZDMuc2VsZWN0KHRoaXMpXG4gICAgICAgIC8vICAgICAudHJhbnNpdGlvbigpXG4gICAgICAgIC8vICAgICAuZWFzZShcImVhc2VcIilcbiAgICAgICAgLy8gICAgIC5kdXJhdGlvbig1MDApXG4gICAgICAgIC8vICAgICAuYXR0cihcImZpbGxcIiwgXCJ3aGl0ZVwiKTtcbiAgICAgICAgLy8gfTtcblxuXG4gICAgICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGAuc2xpZGUtc3ZnLSR7aWR4IC0gMX0tcmVjdGApKSB7XG4gICAgICAgICAgICBkb2N1bWVudFxuICAgICAgICAgICAgICAucXVlcnlTZWxlY3RvckFsbChgLnNsaWRlLXN2Zy0ke2lkeCAtIDF9LXJlY3RgKVxuICAgICAgICAgICAgICAuZm9yRWFjaChyZWN0ID0+IHtcbiAgICAgICAgICAgICAgICByZWN0LmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XG4gICAgICAgICAgICAgICAgcmVjdC5jbGFzc0xpc3QucmVtb3ZlKFwiY2hhcnQtcmVjdFwiKTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgI3NsaWRlLWNvbnRhaW5lci0ke2lkeCAtIDF9YCkpIHtcbiAgICAgICAgLy8gICBkb2N1bWVudFxuICAgICAgICAvLyAgICAgLnF1ZXJ5U2VsZWN0b3IoYCNzbGlkZS1jb250YWluZXItJHtpZHggLSAxfWApXG4gICAgICAgIC8vICAgICAuY2xhc3NMaXN0LmFkZChcIm9wYXF1ZVwiKTtcbiAgICAgICAgLy8gfVxuXG4gICAgICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGAuc2xpZGUtc3ZnLSR7aWR4ICsgMX0tcmVjdGApKSB7XG4gICAgICAgICAgICBkb2N1bWVudFxuICAgICAgICAgICAgICAucXVlcnlTZWxlY3RvckFsbChgLnNsaWRlLXN2Zy0ke2lkeCArIDF9LXJlY3RgKVxuICAgICAgICAgICAgICAuZm9yRWFjaChyZWN0ID0+IHtcbiAgICAgICAgICAgICAgICByZWN0LmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XG4gICAgICAgICAgICAgICAgcmVjdC5jbGFzc0xpc3QucmVtb3ZlKFwiY2hhcnQtcmVjdFwiKTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgI3NsaWRlLWNvbnRhaW5lci0ke2lkeCArIDF9YCkpIHtcbiAgICAgICAgLy8gICBkb2N1bWVudFxuICAgICAgICAvLyAgICAgLnF1ZXJ5U2VsZWN0b3IoYCNzbGlkZS1jb250YWluZXItJHtpZHggKyAxfWApXG4gICAgICAgIC8vICAgICAuY2xhc3NMaXN0LmFkZChcIm9wYXF1ZVwiKTsgICAgICAgICAgICBcbiAgICAgICAgLy8gfVxuXG4gICAgICAgIGQzLnNlbGVjdChgLnNsaWRlLXN2Zy0ke2lkeH0teS1heGlzYClcbiAgICAgICAgICAudHJhbnNpdGlvbigpXG4gICAgICAgICAgLnN0eWxlKFwib3BhY2l0eVwiLCBcIjEwMCVcIilcbiAgICAgICAgICAuZHVyYXRpb24oNTAwKTtcblxuXG4gICAgICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuc2xpZGUtc3ZnLSR7aWR4IC0gMX0teS1heGlzYCkpIHtcbiAgICAgICAgICAgIGQzLnNlbGVjdChgLnNsaWRlLXN2Zy0ke2lkeCAtIDF9LXktYXhpc2ApXG4gICAgICAgICAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgICAgICAgICAgLnN0eWxlKFwib3BhY2l0eVwiLCBcIjAlXCIpXG4gICAgICAgICAgICAgIC5kdXJhdGlvbig1MDApO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC5zbGlkZS1zdmctJHtpZHggKyAxfS15LWF4aXNgKSkge1xuICAgICAgICAgICAgZDMuc2VsZWN0KGAuc2xpZGUtc3ZnLSR7aWR4ICsgMX0teS1heGlzYClcbiAgICAgICAgICAgICAgLnRyYW5zaXRpb24oKVxuICAgICAgICAgICAgICAuc3R5bGUoXCJvcGFjaXR5XCIsIFwiMCVcIilcbiAgICAgICAgICAgICAgLmR1cmF0aW9uKDUwMCk7XG4gICAgICAgIH1cblxuICAgICAgfVxuICAgIH0pO1xuICB9O1xuXG4gIGxldCBvYnNlcnZlciA9IG5ldyBJbnRlcnNlY3Rpb25PYnNlcnZlcihoYW5kbGVTY3JvbGxPbnRvLCBvcHRpb25zKTtcbiAgb2JzZXJ2ZXIub2JzZXJ2ZShzbGlkZSk7XG5cbn0iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW4iXSwic291cmNlUm9vdCI6IiJ9