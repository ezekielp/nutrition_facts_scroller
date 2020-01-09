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


var nutritionData;
var bananaCounter = 0;
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

  for (var i = 1; i < nutritionData.length; i++) {
    createVisualization(nutritionData[i], i);
  }
});

var createVisualization = function createVisualization(foodData, idx, createXAxisBool) {
  var margin = {
    top: 40,
    right: 40,
    bottom: 65,
    left: 50
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
  var svg = d3.select("#vis").append("svg").attr("width", w + margin.left + margin.right).attr("height", h + margin.top + margin.bottom);
  svg.selectAll("rect").data(data).enter().append("rect").attr("class", "".concat(targetSlideRect, " hidden chart-rect")).attr("x", function (d, i) {
    return i * (x_axisLength / numberOfColumns) + margin.left + 10;
  }).attr("y", function (d) {
    return yScale(d / 100);
  }).attr("width", x_axisLength / numberOfColumns - 1).attr("height", function (d) {
    return h - yScale(d / 100) - margin.top;
  }).attr("fill", "red").transition().duration(500);
  var xAxis = d3.axisBottom(xScale).tickSize(0).tickFormat(function (d) {
    return Object.keys(foodData).slice(2, -1)[d];
  });

  if (createXAxisBool !== undefined) {
    svg.append("g").attr("class", "".concat(targetSVG, "-x-axis x-axis")).attr("transform", "translate(" + margin.left + ", " + (h - margin.top) + ")").transition().duration(1000).call(xAxis);
    svg.selectAll(".x-axis text").attr("transform", function (d) {
      return "translate(25, 25)rotate(-45)";
    });
  }

  var yAxis = d3.axisLeft(yScale).ticks(4, "%");
  svg.append("g").attr("class", "".concat(targetSVG, "-y-axis y-axis")).attr("transform", "translate(" + margin.left + ",0)").style("opacity", "0%").call(yAxis);
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
  document.getElementById("banana-svg-container").addEventListener("click", function (e) {
    var bananaIcon = document.getElementById("banana-svg-container");
    var bananaChildren = bananaIcon.childNodes;

    if (bananaChildren[3]) {
      for (var i = 0; i < 20; i++) {
        bananaIcon.removeChild(bananaChildren[3]);
      }
    }

    var movementFunc = function movementFunc(newBanana) {
      var start = null;

      var step = function step(timestamp) {
        if (!start) start = timestamp;
        var progress = timestamp - start;
        newBanana.style.transform = "translateY(" + progress + "px)";

        if (progress < 5000) {
          window.requestAnimationFrame(step);
        }
      };

      window.requestAnimationFrame(step);
    };

    for (var _i = bananaCounter; _i < bananaCounter + 20; _i++) {
      var newBanana = document.createElement("div");
      newBanana.setAttribute("id", "flying-banana-".concat(_i));
      newBanana.classList.add("flying-banana");
      bananaIcon.appendChild(newBanana);
      var thisOneParticularBanana = document.getElementById("flying-banana-".concat(_i));
      thisOneParticularBanana.style.top = Math.random() * -200 + "px";
      thisOneParticularBanana.style.left = Math.floor(Math.random() * window.innerWidth) + "px";
      movementFunc(thisOneParticularBanana);
    }

    bananaCounter += 10;
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
        });

        if (document.querySelectorAll(".slide-svg-".concat(idx - 1, "-rect"))) {
          document.querySelectorAll(".slide-svg-".concat(idx - 1, "-rect")).forEach(function (rect) {
            rect.classList.add("hidden");
          });
        }

        if (document.querySelectorAll(".slide-svg-".concat(idx + 1, "-rect"))) {
          document.querySelectorAll(".slide-svg-".concat(idx + 1, "-rect")).forEach(function (rect) {
            rect.classList.add("hidden");
          });
        }

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL3Njcm9sbC9zbGlkZXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0eWxlcy9pbmRleC5zY3NzIl0sIm5hbWVzIjpbIm51dHJpdGlvbkRhdGEiLCJiYW5hbmFDb3VudGVyIiwiZDMiLCJjc3YiLCJkIiwiZm9vZF9uYW1lIiwic2VydmluZ19zaXplIiwiZmliZXIiLCJpcm9uIiwibWFnbmVzaXVtIiwicG90YXNzaXVtIiwiemluYyIsImZvbGF0ZSIsImNob2xlc3Rlcm9sIiwidGhlbiIsImRhdGEiLCJjb25zb2xlIiwibG9nIiwiY3JlYXRlVmlzdWFsaXphdGlvbiIsImkiLCJsZW5ndGgiLCJmb29kRGF0YSIsImlkeCIsImNyZWF0ZVhBeGlzQm9vbCIsIm1hcmdpbiIsInRvcCIsInJpZ2h0IiwiYm90dG9tIiwibGVmdCIsInciLCJoIiwiT2JqZWN0IiwidmFsdWVzIiwic2xpY2UiLCJudW1iZXJPZkNvbHVtbnMiLCJtYXhWYWx1ZSIsIk1hdGgiLCJtYXgiLCJ4X2F4aXNMZW5ndGgiLCJ5X2F4aXNMZW5ndGgiLCJ0YXJnZXRTVkciLCJ0YXJnZXRTbGlkZVJlY3QiLCJ4U2NhbGUiLCJzY2FsZUxpbmVhciIsImRvbWFpbiIsInJhbmdlIiwieVNjYWxlIiwic3ZnIiwic2VsZWN0IiwiYXBwZW5kIiwiYXR0ciIsInNlbGVjdEFsbCIsImVudGVyIiwidHJhbnNpdGlvbiIsImR1cmF0aW9uIiwieEF4aXMiLCJheGlzQm90dG9tIiwidGlja1NpemUiLCJ0aWNrRm9ybWF0Iiwia2V5cyIsInVuZGVmaW5lZCIsImNhbGwiLCJ5QXhpcyIsImF4aXNMZWZ0IiwidGlja3MiLCJzdHlsZSIsIndpbmRvdyIsImFkZEV2ZW50TGlzdGVuZXIiLCJlIiwic2xpZGVzIiwic2xpZGVOYW1lIiwibmV3U2xpZGUiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJwdXNoIiwiY3JlYXRlT2JzZXJ2ZXJzIiwiZ2V0RWxlbWVudEJ5SWQiLCJiYW5hbmFJY29uIiwiYmFuYW5hQ2hpbGRyZW4iLCJjaGlsZE5vZGVzIiwicmVtb3ZlQ2hpbGQiLCJtb3ZlbWVudEZ1bmMiLCJuZXdCYW5hbmEiLCJzdGFydCIsInN0ZXAiLCJ0aW1lc3RhbXAiLCJwcm9ncmVzcyIsInRyYW5zZm9ybSIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsImNyZWF0ZUVsZW1lbnQiLCJzZXRBdHRyaWJ1dGUiLCJjbGFzc0xpc3QiLCJhZGQiLCJhcHBlbmRDaGlsZCIsInRoaXNPbmVQYXJ0aWN1bGFyQmFuYW5hIiwicmFuZG9tIiwiZmxvb3IiLCJpbm5lcldpZHRoIiwib3B0aW9ucyIsInJvb3QiLCJyb290TWFyZ2luIiwidGhyZXNob2xkIiwiU2xpZGVzIiwicmVuZGVyU2xpZGUiLCJzbGlkZSIsImhhbmRsZVNjcm9sbE9udG8iLCJlbnRyaWVzIiwib2JzZXJ2ZXIiLCJmb3JFYWNoIiwiZW50cnkiLCJpc0ludGVyc2VjdGluZyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJyZWN0IiwicmVtb3ZlIiwiSW50ZXJzZWN0aW9uT2JzZXJ2ZXIiLCJvYnNlcnZlIl0sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIs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SCxHQUVHWSxLQUZILENBRVMsU0FGVCxFQUVvQixJQUZwQixFQUdHWCxRQUhILENBR1ksR0FIWjtBQUlIOztBQUVELFlBQUlrQixRQUFRLENBQUNDLGFBQVQsc0JBQXFDbkQsR0FBRyxHQUFHLENBQTNDLGFBQUosRUFBNEQ7QUFDeERwQixZQUFFLENBQUM4QyxNQUFILHNCQUF3QjFCLEdBQUcsR0FBRyxDQUE5QixjQUNHK0IsVUFESCxHQUVHWSxLQUZILENBRVMsU0FGVCxFQUVvQixJQUZwQixFQUdHWCxRQUhILENBR1ksR0FIWjtBQUlIO0FBRUY7QUFDRixLQTVDRDtBQTZDRCxHQTlDRDs7QUFnREEsTUFBSXFELFFBQVEsR0FBRyxJQUFJTyxvQkFBSixDQUF5QlQsZ0JBQXpCLEVBQTJDUCxPQUEzQyxDQUFmO0FBQ0FTLFVBQVEsQ0FBQ1EsT0FBVCxDQUFpQlgsS0FBakI7QUFFRCxDQXJETSxDOzs7Ozs7Ozs7OztBQ0FQLHVDIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9kaXN0L1wiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC5qc1wiKTtcbiIsImltcG9ydCAnLi9zdHlsZXMvaW5kZXguc2Nzcyc7XG5pbXBvcnQgKiBhcyBTbGlkZXMgZnJvbSAnLi9zY3JpcHRzL3Njcm9sbC9zbGlkZXMnO1xuXG5sZXQgbnV0cml0aW9uRGF0YTtcbmxldCBiYW5hbmFDb3VudGVyID0gMDtcblxuZDMuY3N2KFwibnV0cml0aW9uX2ZhY3RzX2Zvcl9zY3JvbGxlci5jc3ZcIiwgZCA9PiB7XG4gIHJldHVybiB7XG4gICAgZm9vZF9uYW1lOiBkW1wiRm9vZCBuYW1lXCJdLFxuICAgIHNlcnZpbmdfc2l6ZTogZFtcIkFtb3VudFwiXSxcbiAgICBmaWJlcjogK2RbXCJGaWJlclwiXSxcbiAgICBpcm9uOiArZFtcIklyb25cIl0sXG4gICAgbWFnbmVzaXVtOiArZFtcIk1hZ25lc2l1bVwiXSxcbiAgICBwb3Rhc3NpdW06ICtkW1wiUG90YXNzaXVtXCJdLFxuICAgIHppbmM6ICtkW1wiWmluY1wiXSxcbiAgICBcInZpdGFtaW4gQ1wiOiArZFtcIlZpdGFtaW4gQ1wiXSxcbiAgICBmb2xhdGU6ICtkW1wiRm9sYXRlXCJdLFxuICAgIFwidml0YW1pbiBCMTJcIjogK2RbXCJWaXRhbWluIEItMTJcIl0sXG4gICAgXCJ2aXRhbWluIEFcIjogK2RbXCJWaXRhbWluIEFcIl0sXG4gICAgXCJ2aXRhbWluIERcIjogK2RbXCJWaXRhbWluIERcIl0sXG4gICAgY2hvbGVzdGVyb2w6ICtkW1wiQ2hvbGVzdGVyb2xcIl1cbiAgfTtcbn0pLnRoZW4oZGF0YSA9PiB7XG4gICAgbnV0cml0aW9uRGF0YSA9IGRhdGE7XG4gICAgY29uc29sZS5sb2cobnV0cml0aW9uRGF0YSk7XG4gICAgXG4gICAgY3JlYXRlVmlzdWFsaXphdGlvbihudXRyaXRpb25EYXRhWzBdLCAwLCB0cnVlKTtcblxuICAgIGZvciAobGV0IGkgPSAxOyBpIDwgbnV0cml0aW9uRGF0YS5sZW5ndGg7IGkrKykge1xuICAgICAgICBjcmVhdGVWaXN1YWxpemF0aW9uKG51dHJpdGlvbkRhdGFbaV0sIGkpO1xuICAgIH1cblxufSk7XG5cbmNvbnN0IGNyZWF0ZVZpc3VhbGl6YXRpb24gPSAoZm9vZERhdGEsIGlkeCwgY3JlYXRlWEF4aXNCb29sKSA9PiB7XG4gIGxldCBtYXJnaW4gPSB7dG9wOiA0MCwgcmlnaHQ6IDQwLCBib3R0b206IDY1LCBsZWZ0OiA1MH1cbiAgbGV0IHcgPSA3MDAgLSBtYXJnaW4ubGVmdCAtIG1hcmdpbi5yaWdodDtcbiAgbGV0IGggPSA2MDAgLSBtYXJnaW4udG9wIC0gbWFyZ2luLmJvdHRvbTtcblxuICBsZXQgZGF0YSA9IE9iamVjdC52YWx1ZXMoZm9vZERhdGEpLnNsaWNlKDIsIC0xKTtcbiAgbGV0IG51bWJlck9mQ29sdW1ucyA9IDEwO1xuICBsZXQgbWF4VmFsdWUgPSBNYXRoLm1heCguNTAsIGQzLm1heChkYXRhLCBmdW5jdGlvbihkKSB7XG4gICAgcmV0dXJuICgrZCAvIDEwMCk7XG4gIH0pKTtcbiAgbGV0IHhfYXhpc0xlbmd0aCA9IHc7XG4gIGxldCB5X2F4aXNMZW5ndGggPSBoO1xuICBsZXQgdGFyZ2V0U1ZHID0gXCJzbGlkZS1zdmctXCIgKyBpZHg7XG4gIGxldCB0YXJnZXRTbGlkZVJlY3QgPSBcInNsaWRlLXN2Zy1cIiArIGlkeCArIFwiLXJlY3RcIjtcblxuICBsZXQgeFNjYWxlID0gZDNcbiAgICAuc2NhbGVMaW5lYXIoKVxuICAgIC5kb21haW4oWzAsIG51bWJlck9mQ29sdW1uc10pXG4gICAgLnJhbmdlKFswLCB3XSk7XG5cbiAgbGV0IHlTY2FsZSA9IGQzXG4gICAgLnNjYWxlTGluZWFyKClcbiAgICAuZG9tYWluKFswLCBtYXhWYWx1ZV0pXG4gICAgLnJhbmdlKFtoIC0gbWFyZ2luLnRvcCwgbWFyZ2luLmJvdHRvbV0pO1xuXG4gIGxldCBzdmcgPSBkM1xuICAgIC5zZWxlY3QoXCIjdmlzXCIpXG4gICAgLmFwcGVuZChcInN2Z1wiKVxuICAgIC5hdHRyKFwid2lkdGhcIiwgdyArIG1hcmdpbi5sZWZ0ICsgbWFyZ2luLnJpZ2h0KVxuICAgIC5hdHRyKFwiaGVpZ2h0XCIsIGggKyBtYXJnaW4udG9wICsgbWFyZ2luLmJvdHRvbSk7XG5cbiAgc3ZnXG4gICAgLnNlbGVjdEFsbChcInJlY3RcIilcbiAgICAuZGF0YShkYXRhKVxuICAgIC5lbnRlcigpXG4gICAgLmFwcGVuZChcInJlY3RcIilcbiAgICAuYXR0cihcImNsYXNzXCIsIGAke3RhcmdldFNsaWRlUmVjdH0gaGlkZGVuIGNoYXJ0LXJlY3RgKVxuICAgIC5hdHRyKFwieFwiLCBmdW5jdGlvbihkLCBpKSB7XG4gICAgICByZXR1cm4gaSAqICh4X2F4aXNMZW5ndGggLyBudW1iZXJPZkNvbHVtbnMpICsgbWFyZ2luLmxlZnQgKyAxMDtcbiAgICB9KVxuICAgIC5hdHRyKFwieVwiLCBmdW5jdGlvbihkKSB7XG4gICAgICByZXR1cm4geVNjYWxlKGQgLyAxMDApO1xuICAgIH0pXG4gICAgLmF0dHIoXCJ3aWR0aFwiLCB4X2F4aXNMZW5ndGggLyBudW1iZXJPZkNvbHVtbnMgLSAxKVxuICAgIC5hdHRyKFwiaGVpZ2h0XCIsIGZ1bmN0aW9uKGQpIHtcbiAgICAgIHJldHVybiBoIC0geVNjYWxlKGQgLyAxMDApIC0gbWFyZ2luLnRvcDtcbiAgIH0pXG4gICAgLmF0dHIoXCJmaWxsXCIsIFwicmVkXCIpXG4gICAgLnRyYW5zaXRpb24oKVxuICAgIC5kdXJhdGlvbig1MDApO1xuXG4gICAgbGV0IHhBeGlzID0gZDNcbiAgICAgICAgICAgICAgICAuYXhpc0JvdHRvbSh4U2NhbGUpXG4gICAgICAgICAgICAgICAgLnRpY2tTaXplKDApXG4gICAgICAgICAgICAgICAgLnRpY2tGb3JtYXQoZnVuY3Rpb24oZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gT2JqZWN0LmtleXMoZm9vZERhdGEpLnNsaWNlKDIsIC0xKVtkXTtcbiAgICAgICAgICAgICAgICB9KTtcblxuXG4gICAgaWYgKGNyZWF0ZVhBeGlzQm9vbCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHN2Z1xuICAgICAgICAgICAgLmFwcGVuZChcImdcIilcbiAgICAgICAgICAgIC5hdHRyKFwiY2xhc3NcIiwgYCR7dGFyZ2V0U1ZHfS14LWF4aXMgeC1heGlzYClcbiAgICAgICAgICAgIC5hdHRyKFwidHJhbnNmb3JtXCIsIFwidHJhbnNsYXRlKFwiICsgbWFyZ2luLmxlZnQgKyBcIiwgXCIgKyAoaCAtIG1hcmdpbi50b3ApICsgXCIpXCIpXG4gICAgICAgICAgICAudHJhbnNpdGlvbigpXG4gICAgICAgICAgICAuZHVyYXRpb24oMTAwMClcbiAgICAgICAgICAgIC5jYWxsKHhBeGlzKVxuICAgIFxuICAgICAgICBzdmcuc2VsZWN0QWxsKFwiLngtYXhpcyB0ZXh0XCIpXG4gICAgICAgICAgICAuYXR0cihcInRyYW5zZm9ybVwiLCBmdW5jdGlvbihkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFwidHJhbnNsYXRlKDI1LCAyNSlyb3RhdGUoLTQ1KVwiOyBcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuXG4gICAgbGV0IHlBeGlzID0gZDMuYXhpc0xlZnQoeVNjYWxlKS50aWNrcyg0LCBcIiVcIik7XG5cbiAgICBzdmdcbiAgICAgIC5hcHBlbmQoXCJnXCIpXG4gICAgICAuYXR0cihcImNsYXNzXCIsIGAke3RhcmdldFNWR30teS1heGlzIHktYXhpc2ApXG4gICAgICAuYXR0cihcInRyYW5zZm9ybVwiLCBcInRyYW5zbGF0ZShcIiArIG1hcmdpbi5sZWZ0ICsgXCIsMClcIilcbiAgICAgIC5zdHlsZShcIm9wYWNpdHlcIiwgXCIwJVwiKVxuICAgICAgLmNhbGwoeUF4aXMpO1xuXG59O1xuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgKGUpID0+IHtcbiAgICBcbiAgICBsZXQgc2xpZGVzID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxOTsgaSsrKSB7XG4gICAgICAgIGxldCBzbGlkZU5hbWUgPSBcIiNzbGlkZS1jb250YWluZXItXCIgKyBpO1xuICAgICAgICBsZXQgbmV3U2xpZGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNsaWRlTmFtZSk7XG4gICAgICAgIHNsaWRlcy5wdXNoKG5ld1NsaWRlKTtcbiAgICB9XG4gICAgY3JlYXRlT2JzZXJ2ZXJzKHNsaWRlcyk7XG59LCBmYWxzZSk7XG5cblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgKCkgPT4ge1xuXG4gICAgZG9jdW1lbnRcbiAgICAgIC5nZXRFbGVtZW50QnlJZChcImJhbmFuYS1zdmctY29udGFpbmVyXCIpXG4gICAgICAuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGUgPT4ge1xuXG4gICAgICAgIGxldCBiYW5hbmFJY29uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXG4gICAgICAgICAgICBcImJhbmFuYS1zdmctY29udGFpbmVyXCJcbiAgICAgICAgKTtcblxuICAgICAgICBsZXQgYmFuYW5hQ2hpbGRyZW4gPSBiYW5hbmFJY29uLmNoaWxkTm9kZXM7XG4gICAgICAgIGlmIChiYW5hbmFDaGlsZHJlblszXSkge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAyMDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgYmFuYW5hSWNvbi5yZW1vdmVDaGlsZChiYW5hbmFDaGlsZHJlblszXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgbW92ZW1lbnRGdW5jID0gbmV3QmFuYW5hID0+IHtcblxuICAgICAgICAgIGxldCBzdGFydCA9IG51bGw7XG5cbiAgICAgICAgICBjb25zdCBzdGVwID0gKHRpbWVzdGFtcCkgPT4ge1xuICAgICAgICAgICAgaWYgKCFzdGFydCkgc3RhcnQgPSB0aW1lc3RhbXA7XG4gICAgICAgICAgICBsZXQgcHJvZ3Jlc3MgPSB0aW1lc3RhbXAgLSBzdGFydDtcbiAgICAgICAgICAgIG5ld0JhbmFuYS5zdHlsZS50cmFuc2Zvcm0gPVxuICAgICAgICAgICAgICBcInRyYW5zbGF0ZVkoXCIgKyAocHJvZ3Jlc3MpICsgXCJweClcIjtcbiAgICAgICAgICAgIGlmIChwcm9ncmVzcyA8IDUwMDApIHtcbiAgICAgICAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShzdGVwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKHN0ZXApO1xuXG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGxldCBpID0gYmFuYW5hQ291bnRlcjsgaSA8IGJhbmFuYUNvdW50ZXIgKyAyMDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgbmV3QmFuYW5hID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgICAgIG5ld0JhbmFuYS5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBgZmx5aW5nLWJhbmFuYS0ke2l9YCk7XG4gICAgICAgICAgICBuZXdCYW5hbmEuY2xhc3NMaXN0LmFkZChgZmx5aW5nLWJhbmFuYWApO1xuICAgICAgICAgICAgYmFuYW5hSWNvbi5hcHBlbmRDaGlsZChuZXdCYW5hbmEpO1xuXG4gICAgICAgICAgICBsZXQgdGhpc09uZVBhcnRpY3VsYXJCYW5hbmEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcbiAgICAgICAgICAgIGBmbHlpbmctYmFuYW5hLSR7aX1gXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgdGhpc09uZVBhcnRpY3VsYXJCYW5hbmEuc3R5bGUudG9wID0gKE1hdGgucmFuZG9tKCkgKiAtMjAwKSArIFwicHhcIjtcbiAgICAgICAgICAgIHRoaXNPbmVQYXJ0aWN1bGFyQmFuYW5hLnN0eWxlLmxlZnQgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiB3aW5kb3cuaW5uZXJXaWR0aCkgKyBcInB4XCI7XG5cbiAgICAgICAgICAgIG1vdmVtZW50RnVuYyh0aGlzT25lUGFydGljdWxhckJhbmFuYSk7XG4gICAgICAgIH1cblxuICAgICAgICBiYW5hbmFDb3VudGVyICs9IDEwO1xuXG4gICAgICB9KTtcblxufSlcblxuY29uc3QgY3JlYXRlT2JzZXJ2ZXJzID0gKHNsaWRlcykgPT4ge1xuICAgIFxuICAgIGxldCBvcHRpb25zID0ge1xuICAgICAgcm9vdDogbnVsbCxcbiAgICAgIHJvb3RNYXJnaW46IFwiMHB4IDBweCAwcHggMHB4XCIsXG4gICAgICB0aHJlc2hvbGQ6IC41XG4gICAgfTtcblxuICAgIGNvbnNvbGUubG9nKHNsaWRlcyk7XG4gICAgXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzbGlkZXMubGVuZ3RoIC0gMTsgaSsrKSB7XG4gICAgICBTbGlkZXMucmVuZGVyU2xpZGUob3B0aW9ucywgc2xpZGVzW2ldLCBpKTtcbiAgICB9XG5cbn1cbiIsImV4cG9ydCBjb25zdCByZW5kZXJTbGlkZSA9IChvcHRpb25zLCBzbGlkZSwgaWR4KSA9PiB7XG5cbiAgY29uc3QgaGFuZGxlU2Nyb2xsT250byA9IChlbnRyaWVzLCBvYnNlcnZlcikgPT4ge1xuICAgIGVudHJpZXMuZm9yRWFjaChlbnRyeSA9PiB7XG4gICAgICBpZiAoZW50cnkuaXNJbnRlcnNlY3RpbmcpIHtcblxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGAuc2xpZGUtc3ZnLSR7aWR4fS1yZWN0YCkuZm9yRWFjaChyZWN0ID0+IHtcbiAgICAgICAgICByZWN0LmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIik7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGAuc2xpZGUtc3ZnLSR7aWR4IC0gMX0tcmVjdGApKSB7XG4gICAgICAgICAgICBkb2N1bWVudFxuICAgICAgICAgICAgICAucXVlcnlTZWxlY3RvckFsbChgLnNsaWRlLXN2Zy0ke2lkeCAtIDF9LXJlY3RgKVxuICAgICAgICAgICAgICAuZm9yRWFjaChyZWN0ID0+IHtcbiAgICAgICAgICAgICAgICByZWN0LmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYC5zbGlkZS1zdmctJHtpZHggKyAxfS1yZWN0YCkpIHtcbiAgICAgICAgICAgIGRvY3VtZW50XG4gICAgICAgICAgICAgIC5xdWVyeVNlbGVjdG9yQWxsKGAuc2xpZGUtc3ZnLSR7aWR4ICsgMX0tcmVjdGApXG4gICAgICAgICAgICAgIC5mb3JFYWNoKHJlY3QgPT4ge1xuICAgICAgICAgICAgICAgIHJlY3QuY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBkMy5zZWxlY3QoYC5zbGlkZS1zdmctJHtpZHh9LXktYXhpc2ApXG4gICAgICAgICAgLnRyYW5zaXRpb24oKVxuICAgICAgICAgIC5zdHlsZShcIm9wYWNpdHlcIiwgXCIxMDAlXCIpXG4gICAgICAgICAgLmR1cmF0aW9uKDUwMCk7XG5cblxuICAgICAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLnNsaWRlLXN2Zy0ke2lkeCAtIDF9LXktYXhpc2ApKSB7XG4gICAgICAgICAgICBkMy5zZWxlY3QoYC5zbGlkZS1zdmctJHtpZHggLSAxfS15LWF4aXNgKVxuICAgICAgICAgICAgICAudHJhbnNpdGlvbigpXG4gICAgICAgICAgICAgIC5zdHlsZShcIm9wYWNpdHlcIiwgXCIwJVwiKVxuICAgICAgICAgICAgICAuZHVyYXRpb24oNTAwKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuc2xpZGUtc3ZnLSR7aWR4ICsgMX0teS1heGlzYCkpIHtcbiAgICAgICAgICAgIGQzLnNlbGVjdChgLnNsaWRlLXN2Zy0ke2lkeCArIDF9LXktYXhpc2ApXG4gICAgICAgICAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgICAgICAgICAgLnN0eWxlKFwib3BhY2l0eVwiLCBcIjAlXCIpXG4gICAgICAgICAgICAgIC5kdXJhdGlvbig1MDApO1xuICAgICAgICB9XG5cbiAgICAgIH1cbiAgICB9KTtcbiAgfTtcblxuICBsZXQgb2JzZXJ2ZXIgPSBuZXcgSW50ZXJzZWN0aW9uT2JzZXJ2ZXIoaGFuZGxlU2Nyb2xsT250bywgb3B0aW9ucyk7XG4gIG9ic2VydmVyLm9ic2VydmUoc2xpZGUpO1xuXG59IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luIl0sInNvdXJjZVJvb3QiOiIifQ==