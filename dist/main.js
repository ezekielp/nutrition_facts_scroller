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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL2ZseWluZ19mb29kLmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL3Njcm9sbC9zbGlkZXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0eWxlcy9pbmRleC5zY3NzIl0sIm5hbWVzIjpbIm51dHJpdGlvbkRhdGEiLCJkMyIsImNzdiIsImQiLCJmb29kX25hbWUiLCJzZXJ2aW5nX3NpemUiLCJmaWJlciIsImlyb24iLCJtYWduZXNpdW0iLCJwb3Rhc3NpdW0iLCJ6aW5jIiwiZm9sYXRlIiwiY2hvbGVzdGVyb2wiLCJ0aGVuIiwiZGF0YSIsImNvbnNvbGUiLCJsb2ciLCJjcmVhdGVWaXN1YWxpemF0aW9uIiwiY3JlYXRlTmF2TGkiLCJjcmVhdGVBbmNob3IiLCJpIiwibGVuZ3RoIiwiZm9vZERhdGEiLCJpZHgiLCJjcmVhdGVYQXhpc0Jvb2wiLCJtYXJnaW4iLCJ0b3AiLCJyaWdodCIsImJvdHRvbSIsImxlZnQiLCJ3IiwiaCIsIk9iamVjdCIsInZhbHVlcyIsInNsaWNlIiwibnVtYmVyT2ZDb2x1bW5zIiwibWF4VmFsdWUiLCJNYXRoIiwibWF4IiwieF9heGlzTGVuZ3RoIiwieV9heGlzTGVuZ3RoIiwidGFyZ2V0U1ZHIiwidGFyZ2V0U2xpZGVSZWN0IiwieFNjYWxlIiwic2NhbGVMaW5lYXIiLCJkb21haW4iLCJyYW5nZSIsInlTY2FsZSIsInN2ZyIsInNlbGVjdCIsImFwcGVuZCIsImF0dHIiLCJ4QXhpcyIsImF4aXNCb3R0b20iLCJ0aWNrU2l6ZSIsInRpY2tGb3JtYXQiLCJrZXlzIiwidW5kZWZpbmVkIiwidHJhbnNpdGlvbiIsImR1cmF0aW9uIiwiY2FsbCIsInNlbGVjdEFsbCIsInN0eWxlIiwidGV4dCIsInlBeGlzIiwiYXhpc0xlZnQiLCJ0aWNrcyIsImVudGVyIiwiaGFuZGxlTW91c2VvdmVyIiwiZWFzZSIsIndpbmRvdyIsImFkZEV2ZW50TGlzdGVuZXIiLCJlIiwic2xpZGVzIiwic2xpZGVOYW1lIiwibmV3U2xpZGUiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJwdXNoIiwiY3JlYXRlT2JzZXJ2ZXJzIiwiYWRkQWxsRmx5aW5nRm9vZExpc3RlbmVycyIsIm9wdGlvbnMiLCJyb290Iiwicm9vdE1hcmdpbiIsInRocmVzaG9sZCIsIlNsaWRlcyIsIm5hdkNvbHVtbiIsImFuY2hvckxpbmsiLCJjcmVhdGVFbGVtZW50Iiwic2V0QXR0cmlidXRlIiwiYXBwZW5kQ2hpbGQiLCJuYXZMaSIsImNsYXNzTGlzdCIsImFkZCIsInNsaWRlQ29udGFpbmVyIiwiZ2V0RWxlbWVudEJ5SWQiLCJhbmNob3JUYWciLCJmb29kQ291bnRlcnMiLCJhZGRGbHlpbmdGb29kTGlzdGVuZXIiLCJmb29kSWNvbiIsImZvb2RDaGlsZHJlbiIsImNoaWxkTm9kZXMiLCJyZW1vdmVDaGlsZCIsIm1vdmVtZW50RnVuYyIsIm5ld0Zvb2QiLCJzdGFydCIsInNpZ25lZE9uZXMiLCJyYW5kb21JZHgiLCJmbG9vciIsInJhbmRvbSIsInJhbmRvbWx5U2lnbmVkT25lIiwic3RlcCIsInRpbWVzdGFtcCIsInByb2dyZXNzIiwidHJhbnNmb3JtIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwidGhpc09uZVBhcnRpY3VsYXJGb29kIiwiaW5uZXJXaWR0aCIsInJlbmRlclNsaWRlIiwic2xpZGUiLCJoYW5kbGVTY3JvbGxPbnRvIiwiZW50cmllcyIsIm9ic2VydmVyIiwiZm9yRWFjaCIsImVudHJ5IiwiaXNJbnRlcnNlY3RpbmciLCJyZW1vdmUiLCJxdWVyeVNlbGVjdG9yQWxsIiwicmVjdCIsIm5hdkNpcmNsZSIsIkludGVyc2VjdGlvbk9ic2VydmVyIiwib2JzZXJ2ZSJdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7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Y2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9kaXN0L1wiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC5qc1wiKTtcbiIsImltcG9ydCAnLi9zdHlsZXMvaW5kZXguc2Nzcyc7XG5pbXBvcnQgKiBhcyBTbGlkZXMgZnJvbSAnLi9zY3JpcHRzL3Njcm9sbC9zbGlkZXMnO1xuaW1wb3J0IGFkZEFsbEZseWluZ0Zvb2RMaXN0ZW5lcnMgZnJvbSAnLi9zY3JpcHRzL2ZseWluZ19mb29kJztcblxubGV0IG51dHJpdGlvbkRhdGE7XG4vLyBsZXQgZm9vZENvdW50ZXJzID0ge307XG5cbi8vIGxldCBiYW5hbmFDb3VudGVyID0gMDtcblxuZDMuY3N2KFwibnV0cml0aW9uX2ZhY3RzX2Zvcl9zY3JvbGxlci5jc3ZcIiwgZCA9PiB7XG4gIHJldHVybiB7XG4gICAgZm9vZF9uYW1lOiBkW1wiRm9vZCBuYW1lXCJdLFxuICAgIHNlcnZpbmdfc2l6ZTogZFtcIkFtb3VudFwiXSxcbiAgICBmaWJlcjogK2RbXCJGaWJlclwiXSxcbiAgICBpcm9uOiArZFtcIklyb25cIl0sXG4gICAgbWFnbmVzaXVtOiArZFtcIk1hZ25lc2l1bVwiXSxcbiAgICBwb3Rhc3NpdW06ICtkW1wiUG90YXNzaXVtXCJdLFxuICAgIHppbmM6ICtkW1wiWmluY1wiXSxcbiAgICBcInZpdGFtaW4gQ1wiOiArZFtcIlZpdGFtaW4gQ1wiXSxcbiAgICBmb2xhdGU6ICtkW1wiRm9sYXRlXCJdLFxuICAgIFwidml0YW1pbiBCMTJcIjogK2RbXCJWaXRhbWluIEItMTJcIl0sXG4gICAgXCJ2aXRhbWluIEFcIjogK2RbXCJWaXRhbWluIEFcIl0sXG4gICAgXCJ2aXRhbWluIERcIjogK2RbXCJWaXRhbWluIERcIl0sXG4gICAgY2hvbGVzdGVyb2w6ICtkW1wiQ2hvbGVzdGVyb2xcIl1cbiAgfTtcbn0pLnRoZW4oZGF0YSA9PiB7XG4gICAgbnV0cml0aW9uRGF0YSA9IGRhdGE7XG4gICAgY29uc29sZS5sb2cobnV0cml0aW9uRGF0YSk7XG4gICAgXG4gICAgY3JlYXRlVmlzdWFsaXphdGlvbihudXRyaXRpb25EYXRhWzBdLCAwLCB0cnVlKTtcbiAgICBjcmVhdGVOYXZMaSgwKTtcbiAgICBjcmVhdGVBbmNob3IoMCk7XG4gICAgXG4gICAgZm9yIChsZXQgaSA9IDE7IGkgPCBudXRyaXRpb25EYXRhLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjcmVhdGVWaXN1YWxpemF0aW9uKG51dHJpdGlvbkRhdGFbaV0sIGkpO1xuICAgICAgY3JlYXRlTmF2TGkoaSk7XG4gICAgICBjcmVhdGVBbmNob3IoaSk7XG4gICAgfVxuXG59KTtcblxuY29uc3QgY3JlYXRlVmlzdWFsaXphdGlvbiA9IChmb29kRGF0YSwgaWR4LCBjcmVhdGVYQXhpc0Jvb2wpID0+IHtcbiAgbGV0IG1hcmdpbiA9IHt0b3A6IDIwLCByaWdodDogNDAsIGJvdHRvbTogMjUsIGxlZnQ6IDYwfVxuICBsZXQgdyA9IDY3MCAtIG1hcmdpbi5sZWZ0IC0gbWFyZ2luLnJpZ2h0O1xuICBsZXQgaCA9IDYwMCAtIG1hcmdpbi50b3AgLSBtYXJnaW4uYm90dG9tO1xuXG4gIGxldCBkYXRhID0gT2JqZWN0LnZhbHVlcyhmb29kRGF0YSkuc2xpY2UoMiwgLTEpO1xuICBsZXQgbnVtYmVyT2ZDb2x1bW5zID0gMTA7XG4gIGxldCBtYXhWYWx1ZSA9IE1hdGgubWF4KC41MCwgZDMubWF4KGRhdGEsIGZ1bmN0aW9uKGQpIHtcbiAgICByZXR1cm4gKCtkIC8gMTAwKTtcbiAgfSkpO1xuICBsZXQgeF9heGlzTGVuZ3RoID0gdztcbiAgbGV0IHlfYXhpc0xlbmd0aCA9IGg7XG4gIGxldCB0YXJnZXRTVkcgPSBcInNsaWRlLXN2Zy1cIiArIGlkeDtcbiAgbGV0IHRhcmdldFNsaWRlUmVjdCA9IFwic2xpZGUtc3ZnLVwiICsgaWR4ICsgXCItcmVjdFwiO1xuXG4gIGxldCB4U2NhbGUgPSBkM1xuICAgIC5zY2FsZUxpbmVhcigpXG4gICAgLmRvbWFpbihbMCwgbnVtYmVyT2ZDb2x1bW5zXSlcbiAgICAucmFuZ2UoWzAsIHddKTtcblxuICBsZXQgeVNjYWxlID0gZDNcbiAgICAuc2NhbGVMaW5lYXIoKVxuICAgIC5kb21haW4oWzAsIG1heFZhbHVlXSlcbiAgICAucmFuZ2UoW2ggLSBtYXJnaW4udG9wLCBtYXJnaW4uYm90dG9tXSk7XG5cbiAgbGV0IHN2ZyA9IGQzXG4gICAgLnNlbGVjdChcIiN2aXNcIilcbiAgICAuYXBwZW5kKFwic3ZnXCIpXG4gICAgLmF0dHIoXCJjbGFzc1wiLCBgJHt0YXJnZXRTVkd9IGhpZGRlbmApXG4gICAgLmF0dHIoXCJ2aWV3Qm94XCIsIGAwIDAgJHtoICsgbWFyZ2luLnRvcCArIG1hcmdpbi5ib3R0b219ICR7dyArIG1hcmdpbi5sZWZ0ICsgbWFyZ2luLnJpZ2h0fWApXG4gICAgLy8gLmF0dHIoXCJwcmVzZXJ2ZUFzcGVjdFJhdGlvXCIsIFwieE1pbllNaW4gbWVldFwiKTtcbiAgICAvLyAuYXR0cihcIndpZHRoXCIsIHcgKyBtYXJnaW4ubGVmdCArIG1hcmdpbi5yaWdodClcbiAgICAvLyAuYXR0cihcImhlaWdodFwiLCBoICsgbWFyZ2luLnRvcCArIG1hcmdpbi5ib3R0b20pO1xuXG4gIGxldCB4QXhpcyA9IGQzXG4gICAgLmF4aXNCb3R0b20oeFNjYWxlKVxuICAgIC50aWNrU2l6ZSgwKVxuICAgIC50aWNrRm9ybWF0KGZ1bmN0aW9uKGQpIHtcbiAgICAgIHJldHVybiBPYmplY3Qua2V5cyhmb29kRGF0YSkuc2xpY2UoMiwgLTEpW2RdO1xuICAgIH0pO1xuXG4gIGlmIChjcmVhdGVYQXhpc0Jvb2wgIT09IHVuZGVmaW5lZCkge1xuICAgIHN2Z1xuICAgICAgLmFwcGVuZChcImdcIilcbiAgICAgIC5hdHRyKFwiY2xhc3NcIiwgYCR7dGFyZ2V0U1ZHfS14LWF4aXMgeC1heGlzYClcbiAgICAgIC5hdHRyKFxuICAgICAgICBcInRyYW5zZm9ybVwiLFxuICAgICAgICBcInRyYW5zbGF0ZShcIiArIG1hcmdpbi5sZWZ0ICsgXCIsIFwiICsgKGggLSBtYXJnaW4udG9wKSArIFwiKVwiXG4gICAgICApXG4gICAgICAudHJhbnNpdGlvbigpXG4gICAgICAuZHVyYXRpb24oMTAwMClcbiAgICAgIC5jYWxsKHhBeGlzKTtcblxuICAgIHN2Zy5zZWxlY3RBbGwoXCIueC1heGlzIHRleHRcIikuYXR0cihcInRyYW5zZm9ybVwiLCBmdW5jdGlvbihkKSB7XG4gICAgICByZXR1cm4gXCJ0cmFuc2xhdGUoMjUsIDI1KXJvdGF0ZSgtNDUpXCI7XG4gICAgfSk7XG5cbiAgICBzdmdcbiAgICAgIC5hcHBlbmQoXCJ0ZXh0XCIpXG4gICAgICAuYXR0cihcInRyYW5zZm9ybVwiLCBcInJvdGF0ZSgtOTApXCIpXG4gICAgICAuYXR0cihcImNsYXNzXCIsIFwieS1heGlzLWxhYmVsXCIpXG4gICAgICAuYXR0cihcInlcIiwgLTUpXG4gICAgICAuYXR0cihcInhcIiwgMCAtIGggLyAyKVxuICAgICAgLmF0dHIoXCJkeVwiLCBcIjFlbVwiKVxuICAgICAgLnN0eWxlKFwidGV4dC1hbmNob3JcIiwgXCJtaWRkbGVcIilcbiAgICAgIC50ZXh0KFwiUGVyY2VudGFnZSBvZiByZWNvbW1lbmRlZCBkYWlseSBhbGxvd2FuY2UoUkRBKVwiKTtcbiAgfVxuXG4gIGxldCB5QXhpcyA9IGQzLmF4aXNMZWZ0KHlTY2FsZSkudGlja3MoNCwgXCIlXCIpO1xuXG4gIHN2Z1xuICAgIC5hcHBlbmQoXCJnXCIpXG4gICAgLmF0dHIoXCJjbGFzc1wiLCBgJHt0YXJnZXRTVkd9LXktYXhpcyB5LWF4aXNgKVxuICAgIC5hdHRyKFwidHJhbnNmb3JtXCIsIFwidHJhbnNsYXRlKFwiICsgbWFyZ2luLmxlZnQgKyBcIiwwKVwiKVxuICAgIC5zdHlsZShcIm9wYWNpdHlcIiwgXCIwJVwiKVxuICAgIC5jYWxsKHlBeGlzKTtcblxuICBzdmdcbiAgICAuc2VsZWN0QWxsKFwicmVjdFwiKVxuICAgIC5kYXRhKGRhdGEpXG4gICAgLmVudGVyKClcbiAgICAuYXBwZW5kKFwicmVjdFwiKVxuICAgIC5hdHRyKFwiY2xhc3NcIiwgYCR7dGFyZ2V0U2xpZGVSZWN0fWApXG4gICAgLmF0dHIoXCJ4XCIsIGZ1bmN0aW9uKGQsIGkpIHtcbiAgICAgIHJldHVybiBpICogKHhfYXhpc0xlbmd0aCAvIG51bWJlck9mQ29sdW1ucykgKyBtYXJnaW4ubGVmdCArIDEwO1xuICAgIH0pXG4gICAgLmF0dHIoXCJ5XCIsIGZ1bmN0aW9uKGQpIHtcbiAgICAgIHJldHVybiB5U2NhbGUoZCAvIDEwMCk7XG4gICAgfSlcbiAgICAuYXR0cihcIndpZHRoXCIsIHhfYXhpc0xlbmd0aCAvIG51bWJlck9mQ29sdW1ucyAtIDEpXG4gICAgLmF0dHIoXCJoZWlnaHRcIiwgZnVuY3Rpb24oZCkge1xuICAgICAgcmV0dXJuIGggLSB5U2NhbGUoZCAvIDEwMCkgLSBtYXJnaW4udG9wO1xuICAgIH0pXG4gICAgLmF0dHIoXCJmaWxsXCIsIFwicmVkXCIpXG4gICAgLnRyYW5zaXRpb24oKVxuICAgIC5kdXJhdGlvbig1MDApO1xuICAgIC8vIC5vbihcIm1vdXNlb3ZlclwiLCBoYW5kbGVNb3VzZW92ZXIpO1xuXG5cbiAgICBjb25zdCBoYW5kbGVNb3VzZW92ZXIgPSAoZCwgaSkgPT4ge1xuICAgICAgZDMuc2VsZWN0KHRoaXMpXG4gICAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgICAgLmVhc2UoXCJlYXNlXCIpXG4gICAgICAgIC5kdXJhdGlvbig1MDApXG4gICAgICAgIC5hdHRyKFwiZmlsbFwiLCBcIndoaXRlXCIpO1xuICAgIH07XG59O1xuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgKGUpID0+IHtcbiAgICBcbiAgICBsZXQgc2xpZGVzID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxOTsgaSsrKSB7XG4gICAgICAgIGxldCBzbGlkZU5hbWUgPSBcIiNzbGlkZS1jb250YWluZXItXCIgKyBpO1xuICAgICAgICBsZXQgbmV3U2xpZGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNsaWRlTmFtZSk7XG4gICAgICAgIHNsaWRlcy5wdXNoKG5ld1NsaWRlKTtcbiAgICB9XG4gICAgY3JlYXRlT2JzZXJ2ZXJzKHNsaWRlcyk7XG59LCBmYWxzZSk7XG5cblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgKCkgPT4ge1xuXG4gICAgYWRkQWxsRmx5aW5nRm9vZExpc3RlbmVycygpO1xuXG59KVxuXG4vLyAgICAgZG9jdW1lbnRcbi8vICAgICAgIC5nZXRFbGVtZW50QnlJZChcImJhbmFuYS1zdmctY29udGFpbmVyXCIpXG4vLyAgICAgICAuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGUgPT4ge1xuXG4vLyAgICAgICAgIGxldCBiYW5hbmFJY29uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXG4vLyAgICAgICAgICAgICBcImJhbmFuYS1zdmctY29udGFpbmVyXCJcbi8vICAgICAgICAgKTtcblxuLy8gICAgICAgICBsZXQgYmFuYW5hQ2hpbGRyZW4gPSBiYW5hbmFJY29uLmNoaWxkTm9kZXM7XG4vLyAgICAgICAgIGlmIChiYW5hbmFDaGlsZHJlblszXSkge1xuLy8gICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAyMDsgaSsrKSB7XG4vLyAgICAgICAgICAgICAgICAgYmFuYW5hSWNvbi5yZW1vdmVDaGlsZChiYW5hbmFDaGlsZHJlblszXSk7XG4vLyAgICAgICAgICAgICB9XG4vLyAgICAgICAgIH1cblxuLy8gICAgICAgICBsZXQgbW92ZW1lbnRGdW5jID0gbmV3QmFuYW5hID0+IHtcblxuLy8gICAgICAgICAgIGxldCBzdGFydCA9IG51bGw7XG5cbi8vICAgICAgICAgICBjb25zdCBzdGVwID0gKHRpbWVzdGFtcCkgPT4ge1xuLy8gICAgICAgICAgICAgaWYgKCFzdGFydCkgc3RhcnQgPSB0aW1lc3RhbXA7XG4vLyAgICAgICAgICAgICBsZXQgcHJvZ3Jlc3MgPSB0aW1lc3RhbXAgLSBzdGFydDtcbi8vICAgICAgICAgICAgIG5ld0JhbmFuYS5zdHlsZS50cmFuc2Zvcm0gPVxuLy8gICAgICAgICAgICAgICBcInRyYW5zbGF0ZVkoXCIgKyAocHJvZ3Jlc3MpICsgXCJweClcIjtcbi8vICAgICAgICAgICAgIGlmIChwcm9ncmVzcyA8IDUwMDApIHtcbi8vICAgICAgICAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShzdGVwKTtcbi8vICAgICAgICAgICAgIH1cbi8vICAgICAgICAgICB9XG5cbi8vICAgICAgICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKHN0ZXApO1xuXG4vLyAgICAgICAgIH1cblxuLy8gICAgICAgICBmb3IgKGxldCBpID0gYmFuYW5hQ291bnRlcjsgaSA8IGJhbmFuYUNvdW50ZXIgKyAyMDsgaSsrKSB7XG4vLyAgICAgICAgICAgICBsZXQgbmV3QmFuYW5hID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbi8vICAgICAgICAgICAgIG5ld0JhbmFuYS5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBgZmx5aW5nLWJhbmFuYS0ke2l9YCk7XG4vLyAgICAgICAgICAgICBuZXdCYW5hbmEuY2xhc3NMaXN0LmFkZChgZmx5aW5nLWJhbmFuYWApO1xuLy8gICAgICAgICAgICAgYmFuYW5hSWNvbi5hcHBlbmRDaGlsZChuZXdCYW5hbmEpO1xuXG4vLyAgICAgICAgICAgICBsZXQgdGhpc09uZVBhcnRpY3VsYXJCYW5hbmEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcbi8vICAgICAgICAgICAgIGBmbHlpbmctYmFuYW5hLSR7aX1gXG4vLyAgICAgICAgICAgICApO1xuLy8gICAgICAgICAgICAgdGhpc09uZVBhcnRpY3VsYXJCYW5hbmEuc3R5bGUudG9wID0gKE1hdGgucmFuZG9tKCkgKiAtNzAwKSArIFwicHhcIjtcbi8vICAgICAgICAgICAgIHRoaXNPbmVQYXJ0aWN1bGFyQmFuYW5hLnN0eWxlLmxlZnQgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiB3aW5kb3cuaW5uZXJXaWR0aCkgKyBcInB4XCI7XG5cbi8vICAgICAgICAgICAgIG1vdmVtZW50RnVuYyh0aGlzT25lUGFydGljdWxhckJhbmFuYSk7XG4vLyAgICAgICAgIH1cblxuLy8gICAgICAgICBiYW5hbmFDb3VudGVyICs9IDEwO1xuXG4vLyAgICAgICB9KTtcblxuLy8gfSlcblxuY29uc3QgY3JlYXRlT2JzZXJ2ZXJzID0gKHNsaWRlcykgPT4ge1xuICAgIFxuICAgIGxldCBvcHRpb25zID0ge1xuICAgICAgcm9vdDogbnVsbCxcbiAgICAgIHJvb3RNYXJnaW46IFwiMHB4IDBweCAwcHggMHB4XCIsXG4gICAgICB0aHJlc2hvbGQ6IC41XG4gICAgfTtcblxuICAgIGNvbnNvbGUubG9nKHNsaWRlcyk7XG4gICAgXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzbGlkZXMubGVuZ3RoIC0gMTsgaSsrKSB7XG4gICAgICBTbGlkZXMucmVuZGVyU2xpZGUob3B0aW9ucywgc2xpZGVzW2ldLCBpKTtcbiAgICB9XG5cbn1cblxuY29uc3QgY3JlYXRlTmF2TGkgPSAoaWR4KSA9PiB7XG4gIGxldCBuYXZDb2x1bW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubmF2LWNvbHVtbicpO1xuXG4gIGxldCBhbmNob3JMaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImFcIik7XG4gIGFuY2hvckxpbmsuc2V0QXR0cmlidXRlKFwiaHJlZlwiLCBgI2FuY2hvci0ke2lkeH1gKTtcbiAgbmF2Q29sdW1uLmFwcGVuZENoaWxkKGFuY2hvckxpbmspO1xuXG4gIGxldCBuYXZMaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKTtcbiAgbmF2TGkuc2V0QXR0cmlidXRlKFwiaWRcIiwgYG5hdi1saS0ke2lkeH1gKTtcbiAgbmF2TGkuY2xhc3NMaXN0LmFkZChcIm5hdi1saVwiKTtcbiAgYW5jaG9yTGluay5hcHBlbmRDaGlsZChuYXZMaSk7XG5cbn1cblxuY29uc3QgY3JlYXRlQW5jaG9yID0gKGlkeCkgPT4ge1xuICBsZXQgc2xpZGVDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgc2xpZGUtY29udGFpbmVyLSR7aWR4fWApO1xuXG4gIGxldCBhbmNob3JUYWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYVwiKTtcbiAgYW5jaG9yVGFnLnNldEF0dHJpYnV0ZShcImlkXCIsIGBhbmNob3ItJHtpZHh9YCk7XG4gIGFuY2hvclRhZy5jbGFzc0xpc3QuYWRkKFwiYW5jaG9yXCIpO1xuXG4gIHNsaWRlQ29udGFpbmVyLmFwcGVuZENoaWxkKGFuY2hvclRhZyk7XG59XG5cblxuIiwiICAgIGNvbnN0IGFkZEFsbEZseWluZ0Zvb2RMaXN0ZW5lcnMgPSAoKSA9PiB7XG5cbiAgICAgICAgbGV0IGZvb2RDb3VudGVycyA9IHt9O1xuXG4gICAgICAgIGNvbnN0IGFkZEZseWluZ0Zvb2RMaXN0ZW5lciA9IGlkeCA9PiB7XG4gICAgICAgICAgICBsZXQgZm9vZEljb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgZm9vZC1zdmctY29udGFpbmVyLSR7aWR4fWApO1xuXG4gICAgICAgICAgICBmb29kSWNvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGZvb2RDaGlsZHJlbiA9IGZvb2RJY29uLmNoaWxkTm9kZXM7XG4gICAgICAgICAgICAgICAgaWYgKGZvb2RDaGlsZHJlblszXSkge1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMzA7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBmb29kSWNvbi5yZW1vdmVDaGlsZChmb29kQ2hpbGRyZW5bM10pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBsZXQgbW92ZW1lbnRGdW5jID0gbmV3Rm9vZCA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IHN0YXJ0ID0gbnVsbDtcblxuICAgICAgICAgICAgICAgIGxldCBzaWduZWRPbmVzID0gWy0xLCAxXTtcbiAgICAgICAgICAgICAgICBsZXQgcmFuZG9tSWR4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMik7XG4gICAgICAgICAgICAgICAgbGV0IHJhbmRvbWx5U2lnbmVkT25lID0gc2lnbmVkT25lc1tyYW5kb21JZHhdO1xuXG4gICAgICAgICAgICAgICAgY29uc3Qgc3RlcCA9IHRpbWVzdGFtcCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghc3RhcnQpIHN0YXJ0ID0gdGltZXN0YW1wO1xuICAgICAgICAgICAgICAgICAgICBsZXQgcHJvZ3Jlc3MgPSB0aW1lc3RhbXAgLSBzdGFydDtcbiAgICAgICAgICAgICAgICAgICAgbmV3Rm9vZC5zdHlsZS50cmFuc2Zvcm0gPSBcInRyYW5zbGF0ZShcIiArIChwcm9ncmVzcyAqIHJhbmRvbWx5U2lnbmVkT25lKSArIFwicHgsIFwiICsgcHJvZ3Jlc3MgKyBcInB4KVwiO1xuICAgICAgICAgICAgICAgICAgICBpZiAocHJvZ3Jlc3MgPCAxNTAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoc3RlcCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShzdGVwKTtcbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IGZvb2RDb3VudGVyc1tpZHhdOyBpIDwgZm9vZENvdW50ZXJzW2lkeF0gKyAzMDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgbGV0IG5ld0Zvb2QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICAgICAgICAgIG5ld0Zvb2Quc2V0QXR0cmlidXRlKFwiaWRcIiwgYGZseWluZy1mb29kLW9mLXR5cGUtJHtpZHh9LSR7aX1gKTtcbiAgICAgICAgICAgICAgICBuZXdGb29kLmNsYXNzTGlzdC5hZGQoYGZseWluZy1mb29kLSR7aWR4fWApO1xuICAgICAgICAgICAgICAgIG5ld0Zvb2QuY2xhc3NMaXN0LmFkZChgZmx5aW5nLWZvb2RgKTtcbiAgICAgICAgICAgICAgICBmb29kSWNvbi5hcHBlbmRDaGlsZChuZXdGb29kKTtcblxuICAgICAgICAgICAgICAgIGxldCB0aGlzT25lUGFydGljdWxhckZvb2QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcbiAgICAgICAgICAgICAgICAgICAgYGZseWluZy1mb29kLW9mLXR5cGUtJHtpZHh9LSR7aX1gXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB0aGlzT25lUGFydGljdWxhckZvb2Quc3R5bGUudG9wID0gTWF0aC5yYW5kb20oKSAqIC03MDAgKyBcInB4XCI7XG4gICAgICAgICAgICAgICAgdGhpc09uZVBhcnRpY3VsYXJGb29kLnN0eWxlLmxlZnQgPVxuICAgICAgICAgICAgICAgICAgICBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiB3aW5kb3cuaW5uZXJXaWR0aCkgKyBcInB4XCI7XG5cbiAgICAgICAgICAgICAgICBtb3ZlbWVudEZ1bmModGhpc09uZVBhcnRpY3VsYXJGb29kKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBmb29kQ291bnRlcnNbaWR4XSArPSAxMDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTg7IGkrKykge1xuICAgICAgICAgICAgZm9vZENvdW50ZXJzW2ldID0gMDtcbiAgICAgICAgICAgIGFkZEZseWluZ0Zvb2RMaXN0ZW5lcihpKTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgZXhwb3J0IGRlZmF1bHQgYWRkQWxsRmx5aW5nRm9vZExpc3RlbmVyczsiLCJleHBvcnQgY29uc3QgcmVuZGVyU2xpZGUgPSAob3B0aW9ucywgc2xpZGUsIGlkeCkgPT4ge1xuXG4gIGNvbnN0IGhhbmRsZVNjcm9sbE9udG8gPSAoZW50cmllcywgb2JzZXJ2ZXIpID0+IHtcbiAgICBlbnRyaWVzLmZvckVhY2goZW50cnkgPT4ge1xuICAgICAgaWYgKGVudHJ5LmlzSW50ZXJzZWN0aW5nKSB7XG5cbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLnNsaWRlLXN2Zy0ke2lkeH1gKVxuICAgICAgICAgIC5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZGVuXCIpO1xuXG4gICAgICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuc2xpZGUtc3ZnLSR7aWR4IC0gMX1gKSkge1xuICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC5zbGlkZS1zdmctJHtpZHggLSAxfWApXG4gICAgICAgICAgLmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLnNsaWRlLXN2Zy0ke2lkeCArIDF9YCkpIHtcbiAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuc2xpZGUtc3ZnLSR7aWR4ICsgMX1gKVxuICAgICAgICAgIC5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgLnNsaWRlLXN2Zy0ke2lkeH0tcmVjdGApLmZvckVhY2gocmVjdCA9PiB7XG4gICAgICAgICAgLy8gcmVjdC5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZGVuXCIpO1xuICAgICAgICAgIHJlY3QuY2xhc3NMaXN0LmFkZChcImNoYXJ0LXJlY3RcIik7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGQzLnNlbGVjdChgLnNsaWRlLXN2Zy0ke2lkeH0teS1heGlzYClcbiAgICAgICAgICAudHJhbnNpdGlvbigpXG4gICAgICAgICAgLnN0eWxlKFwib3BhY2l0eVwiLCBcIjEwMCVcIilcbiAgICAgICAgICAuZHVyYXRpb24oNTAwKTtcblxuICAgICAgICBsZXQgbmF2Q2lyY2xlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYG5hdi1saS0ke2lkeH1gKTtcbiAgICAgICAgbmF2Q2lyY2xlLmNsYXNzTGlzdC5hZGQoYG5hdi1saS0ke2lkeH1gKTtcblxuXG5cbiAgICAgICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYC5zbGlkZS1zdmctJHtpZHggLSAxfS1yZWN0YCkpIHtcbiAgICAgICAgICAgIGRvY3VtZW50XG4gICAgICAgICAgICAgIC5xdWVyeVNlbGVjdG9yQWxsKGAuc2xpZGUtc3ZnLSR7aWR4IC0gMX0tcmVjdGApXG4gICAgICAgICAgICAgIC5mb3JFYWNoKHJlY3QgPT4ge1xuICAgICAgICAgICAgICAgIC8vIHJlY3QuY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcbiAgICAgICAgICAgICAgICByZWN0LmNsYXNzTGlzdC5yZW1vdmUoXCJjaGFydC1yZWN0XCIpO1xuICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgZDMuc2VsZWN0KGAuc2xpZGUtc3ZnLSR7aWR4IC0gMX0teS1heGlzYClcbiAgICAgICAgICAgICAgLnRyYW5zaXRpb24oKVxuICAgICAgICAgICAgICAuc3R5bGUoXCJvcGFjaXR5XCIsIFwiMCVcIilcbiAgICAgICAgICAgICAgLmR1cmF0aW9uKDUwMCk7XG4gICAgICAgICAgICBcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgbmF2LWxpLSR7aWR4IC0gMX1gKSkge1xuICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBuYXYtbGktJHtpZHggLSAxfWApLmNsYXNzTGlzdC5yZW1vdmUoYG5hdi1saS0ke2lkeCAtIDF9YCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgLnNsaWRlLXN2Zy0ke2lkeCArIDF9LXJlY3RgKSkge1xuICAgICAgICAgICAgLy8gZGVidWdnZXI7XG4gICAgICAgICAgICBkb2N1bWVudFxuICAgICAgICAgICAgICAucXVlcnlTZWxlY3RvckFsbChgLnNsaWRlLXN2Zy0ke2lkeCArIDF9LXJlY3RgKVxuICAgICAgICAgICAgICAuZm9yRWFjaChyZWN0ID0+IHtcbiAgICAgICAgICAgICAgICAvLyByZWN0LmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XG4gICAgICAgICAgICAgICAgcmVjdC5jbGFzc0xpc3QucmVtb3ZlKFwiY2hhcnQtcmVjdFwiKTtcbiAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGQzLnNlbGVjdChgLnNsaWRlLXN2Zy0ke2lkeCArIDF9LXktYXhpc2ApXG4gICAgICAgICAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgICAgICAgICAgLnN0eWxlKFwib3BhY2l0eVwiLCBcIjAlXCIpXG4gICAgICAgICAgICAgIC5kdXJhdGlvbig1MDApO1xuXG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgbmF2LWxpLSR7aWR4ICsgMX1gKS5jbGFzc0xpc3QucmVtb3ZlKGBuYXYtbGktJHtpZHggKyAxfWApOyAgICAgICAgICAgICAgXG4gICAgICAgIH1cblxuICAgICAgICAgIFxuICAgICAgfVxuICAgIH0pO1xuICB9O1xuXG4gIGxldCBvYnNlcnZlciA9IG5ldyBJbnRlcnNlY3Rpb25PYnNlcnZlcihoYW5kbGVTY3JvbGxPbnRvLCBvcHRpb25zKTtcbiAgb2JzZXJ2ZXIub2JzZXJ2ZShzbGlkZSk7XG5cbn0iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW4iXSwic291cmNlUm9vdCI6IiJ9