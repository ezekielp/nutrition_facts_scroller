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
  svg.selectAll("rect").data(data).enter().append("rect").attr("class", "".concat(targetSlideRect, " hidden chart-rect")).attr("x", function (d, i) {
    return i * (x_axisLength / numberOfColumns) + margin.left + 10;
  }).attr("y", function (d) {
    return yScale(d / 100);
  }).attr("width", x_axisLength / numberOfColumns - 1).attr("height", function (d) {
    return h - yScale(d / 100) - margin.top;
  }).attr("fill", "red").transition().duration(500); //   .on("mouseover", handleMouseover);
  // const handleMouseover = (d, i) => {
  //   d3.select(this)
  //     .transition()
  //     .ease("exp")
  //     .duration(500)
  //     .attr("fill", "white");
  // };
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL3Njcm9sbC9zbGlkZXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0eWxlcy9pbmRleC5zY3NzIl0sIm5hbWVzIjpbIm51dHJpdGlvbkRhdGEiLCJiYW5hbmFDb3VudGVyIiwiZDMiLCJjc3YiLCJkIiwiZm9vZF9uYW1lIiwic2VydmluZ19zaXplIiwiZmliZXIiLCJpcm9uIiwibWFnbmVzaXVtIiwicG90YXNzaXVtIiwiemluYyIsImZvbGF0ZSIsImNob2xlc3Rlcm9sIiwidGhlbiIsImRhdGEiLCJjb25zb2xlIiwibG9nIiwiY3JlYXRlVmlzdWFsaXphdGlvbiIsImkiLCJsZW5ndGgiLCJmb29kRGF0YSIsImlkeCIsImNyZWF0ZVhBeGlzQm9vbCIsIm1hcmdpbiIsInRvcCIsInJpZ2h0IiwiYm90dG9tIiwibGVmdCIsInciLCJoIiwiT2JqZWN0IiwidmFsdWVzIiwic2xpY2UiLCJudW1iZXJPZkNvbHVtbnMiLCJtYXhWYWx1ZSIsIk1hdGgiLCJtYXgiLCJ4X2F4aXNMZW5ndGgiLCJ5X2F4aXNMZW5ndGgiLCJ0YXJnZXRTVkciLCJ0YXJnZXRTbGlkZVJlY3QiLCJ4U2NhbGUiLCJzY2FsZUxpbmVhciIsImRvbWFpbiIsInJhbmdlIiwieVNjYWxlIiwic3ZnIiwic2VsZWN0IiwiYXBwZW5kIiwiYXR0ciIsInhBeGlzIiwiYXhpc0JvdHRvbSIsInRpY2tTaXplIiwidGlja0Zvcm1hdCIsImtleXMiLCJ1bmRlZmluZWQiLCJ0cmFuc2l0aW9uIiwiZHVyYXRpb24iLCJjYWxsIiwic2VsZWN0QWxsIiwieUF4aXMiLCJheGlzTGVmdCIsInRpY2tzIiwic3R5bGUiLCJlbnRlciIsIndpbmRvdyIsImFkZEV2ZW50TGlzdGVuZXIiLCJlIiwic2xpZGVzIiwic2xpZGVOYW1lIiwibmV3U2xpZGUiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJwdXNoIiwiY3JlYXRlT2JzZXJ2ZXJzIiwiZ2V0RWxlbWVudEJ5SWQiLCJiYW5hbmFJY29uIiwiYmFuYW5hQ2hpbGRyZW4iLCJjaGlsZE5vZGVzIiwicmVtb3ZlQ2hpbGQiLCJtb3ZlbWVudEZ1bmMiLCJuZXdCYW5hbmEiLCJzdGFydCIsInN0ZXAiLCJ0aW1lc3RhbXAiLCJwcm9ncmVzcyIsInRyYW5zZm9ybSIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsImNyZWF0ZUVsZW1lbnQiLCJzZXRBdHRyaWJ1dGUiLCJjbGFzc0xpc3QiLCJhZGQiLCJhcHBlbmRDaGlsZCIsInRoaXNPbmVQYXJ0aWN1bGFyQmFuYW5hIiwicmFuZG9tIiwiZmxvb3IiLCJpbm5lcldpZHRoIiwib3B0aW9ucyIsInJvb3QiLCJyb290TWFyZ2luIiwidGhyZXNob2xkIiwiU2xpZGVzIiwicmVuZGVyU2xpZGUiLCJzbGlkZSIsImhhbmRsZVNjcm9sbE9udG8iLCJlbnRyaWVzIiwib2JzZXJ2ZXIiLCJmb3JFYWNoIiwiZW50cnkiLCJpc0ludGVyc2VjdGluZyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJyZWN0IiwicmVtb3ZlIiwiSW50ZXJzZWN0aW9uT2JzZXJ2ZXIiLCJvYnNlcnZlIl0sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIs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QUFFLENBQUM4QyxNQUFILHNCQUF3QjFCLEdBQUcsR0FBRyxDQUE5QixjQUNHbUMsVUFESCxHQUVHTyxLQUZILENBRVMsU0FGVCxFQUVvQixJQUZwQixFQUdHTixRQUhILENBR1ksR0FIWjtBQUlIOztBQUVELFlBQUljLFFBQVEsQ0FBQ0MsYUFBVCxzQkFBcUNuRCxHQUFHLEdBQUcsQ0FBM0MsYUFBSixFQUE0RDtBQUN4RHBCLFlBQUUsQ0FBQzhDLE1BQUgsc0JBQXdCMUIsR0FBRyxHQUFHLENBQTlCLGNBQ0dtQyxVQURILEdBRUdPLEtBRkgsQ0FFUyxTQUZULEVBRW9CLElBRnBCLEVBR0dOLFFBSEgsQ0FHWSxHQUhaO0FBSUg7QUFFRjtBQUNGLEtBNUNEO0FBNkNELEdBOUNEOztBQWdEQSxNQUFJaUQsUUFBUSxHQUFHLElBQUlPLG9CQUFKLENBQXlCVCxnQkFBekIsRUFBMkNQLE9BQTNDLENBQWY7QUFDQVMsVUFBUSxDQUFDUSxPQUFULENBQWlCWCxLQUFqQjtBQUVELENBckRNLEM7Ozs7Ozs7Ozs7O0FDQVAsdUMiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL2Rpc3QvXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LmpzXCIpO1xuIiwiaW1wb3J0ICcuL3N0eWxlcy9pbmRleC5zY3NzJztcbmltcG9ydCAqIGFzIFNsaWRlcyBmcm9tICcuL3NjcmlwdHMvc2Nyb2xsL3NsaWRlcyc7XG5cbmxldCBudXRyaXRpb25EYXRhO1xubGV0IGJhbmFuYUNvdW50ZXIgPSAwO1xuXG5kMy5jc3YoXCJudXRyaXRpb25fZmFjdHNfZm9yX3Njcm9sbGVyLmNzdlwiLCBkID0+IHtcbiAgcmV0dXJuIHtcbiAgICBmb29kX25hbWU6IGRbXCJGb29kIG5hbWVcIl0sXG4gICAgc2VydmluZ19zaXplOiBkW1wiQW1vdW50XCJdLFxuICAgIGZpYmVyOiArZFtcIkZpYmVyXCJdLFxuICAgIGlyb246ICtkW1wiSXJvblwiXSxcbiAgICBtYWduZXNpdW06ICtkW1wiTWFnbmVzaXVtXCJdLFxuICAgIHBvdGFzc2l1bTogK2RbXCJQb3Rhc3NpdW1cIl0sXG4gICAgemluYzogK2RbXCJaaW5jXCJdLFxuICAgIFwidml0YW1pbiBDXCI6ICtkW1wiVml0YW1pbiBDXCJdLFxuICAgIGZvbGF0ZTogK2RbXCJGb2xhdGVcIl0sXG4gICAgXCJ2aXRhbWluIEIxMlwiOiArZFtcIlZpdGFtaW4gQi0xMlwiXSxcbiAgICBcInZpdGFtaW4gQVwiOiArZFtcIlZpdGFtaW4gQVwiXSxcbiAgICBcInZpdGFtaW4gRFwiOiArZFtcIlZpdGFtaW4gRFwiXSxcbiAgICBjaG9sZXN0ZXJvbDogK2RbXCJDaG9sZXN0ZXJvbFwiXVxuICB9O1xufSkudGhlbihkYXRhID0+IHtcbiAgICBudXRyaXRpb25EYXRhID0gZGF0YTtcbiAgICBjb25zb2xlLmxvZyhudXRyaXRpb25EYXRhKTtcbiAgICBcbiAgICBjcmVhdGVWaXN1YWxpemF0aW9uKG51dHJpdGlvbkRhdGFbMF0sIDAsIHRydWUpO1xuXG4gICAgZm9yIChsZXQgaSA9IDE7IGkgPCBudXRyaXRpb25EYXRhLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNyZWF0ZVZpc3VhbGl6YXRpb24obnV0cml0aW9uRGF0YVtpXSwgaSk7XG4gICAgfVxuXG59KTtcblxuY29uc3QgY3JlYXRlVmlzdWFsaXphdGlvbiA9IChmb29kRGF0YSwgaWR4LCBjcmVhdGVYQXhpc0Jvb2wpID0+IHtcbiAgbGV0IG1hcmdpbiA9IHt0b3A6IDQwLCByaWdodDogNDAsIGJvdHRvbTogNjUsIGxlZnQ6IDUwfVxuICBsZXQgdyA9IDcwMCAtIG1hcmdpbi5sZWZ0IC0gbWFyZ2luLnJpZ2h0O1xuICBsZXQgaCA9IDYwMCAtIG1hcmdpbi50b3AgLSBtYXJnaW4uYm90dG9tO1xuXG4gIGxldCBkYXRhID0gT2JqZWN0LnZhbHVlcyhmb29kRGF0YSkuc2xpY2UoMiwgLTEpO1xuICBsZXQgbnVtYmVyT2ZDb2x1bW5zID0gMTA7XG4gIGxldCBtYXhWYWx1ZSA9IE1hdGgubWF4KC41MCwgZDMubWF4KGRhdGEsIGZ1bmN0aW9uKGQpIHtcbiAgICByZXR1cm4gKCtkIC8gMTAwKTtcbiAgfSkpO1xuICBsZXQgeF9heGlzTGVuZ3RoID0gdztcbiAgbGV0IHlfYXhpc0xlbmd0aCA9IGg7XG4gIGxldCB0YXJnZXRTVkcgPSBcInNsaWRlLXN2Zy1cIiArIGlkeDtcbiAgbGV0IHRhcmdldFNsaWRlUmVjdCA9IFwic2xpZGUtc3ZnLVwiICsgaWR4ICsgXCItcmVjdFwiO1xuXG4gIGxldCB4U2NhbGUgPSBkM1xuICAgIC5zY2FsZUxpbmVhcigpXG4gICAgLmRvbWFpbihbMCwgbnVtYmVyT2ZDb2x1bW5zXSlcbiAgICAucmFuZ2UoWzAsIHddKTtcblxuICBsZXQgeVNjYWxlID0gZDNcbiAgICAuc2NhbGVMaW5lYXIoKVxuICAgIC5kb21haW4oWzAsIG1heFZhbHVlXSlcbiAgICAucmFuZ2UoW2ggLSBtYXJnaW4udG9wLCBtYXJnaW4uYm90dG9tXSk7XG5cbiAgbGV0IHN2ZyA9IGQzXG4gICAgLnNlbGVjdChcIiN2aXNcIilcbiAgICAuYXBwZW5kKFwic3ZnXCIpXG4gICAgLmF0dHIoXCJ3aWR0aFwiLCB3ICsgbWFyZ2luLmxlZnQgKyBtYXJnaW4ucmlnaHQpXG4gICAgLmF0dHIoXCJoZWlnaHRcIiwgaCArIG1hcmdpbi50b3AgKyBtYXJnaW4uYm90dG9tKTtcblxuICBsZXQgeEF4aXMgPSBkM1xuICAgIC5heGlzQm90dG9tKHhTY2FsZSlcbiAgICAudGlja1NpemUoMClcbiAgICAudGlja0Zvcm1hdChmdW5jdGlvbihkKSB7XG4gICAgICByZXR1cm4gT2JqZWN0LmtleXMoZm9vZERhdGEpLnNsaWNlKDIsIC0xKVtkXTtcbiAgICB9KTtcblxuICBpZiAoY3JlYXRlWEF4aXNCb29sICE9PSB1bmRlZmluZWQpIHtcbiAgICBzdmdcbiAgICAgIC5hcHBlbmQoXCJnXCIpXG4gICAgICAuYXR0cihcImNsYXNzXCIsIGAke3RhcmdldFNWR30teC1heGlzIHgtYXhpc2ApXG4gICAgICAuYXR0cihcbiAgICAgICAgXCJ0cmFuc2Zvcm1cIixcbiAgICAgICAgXCJ0cmFuc2xhdGUoXCIgKyBtYXJnaW4ubGVmdCArIFwiLCBcIiArIChoIC0gbWFyZ2luLnRvcCkgKyBcIilcIlxuICAgICAgKVxuICAgICAgLnRyYW5zaXRpb24oKVxuICAgICAgLmR1cmF0aW9uKDEwMDApXG4gICAgICAuY2FsbCh4QXhpcyk7XG5cbiAgICBzdmcuc2VsZWN0QWxsKFwiLngtYXhpcyB0ZXh0XCIpLmF0dHIoXCJ0cmFuc2Zvcm1cIiwgZnVuY3Rpb24oZCkge1xuICAgICAgcmV0dXJuIFwidHJhbnNsYXRlKDI1LCAyNSlyb3RhdGUoLTQ1KVwiO1xuICAgIH0pO1xuICB9XG5cbiAgbGV0IHlBeGlzID0gZDMuYXhpc0xlZnQoeVNjYWxlKS50aWNrcyg0LCBcIiVcIik7XG5cbiAgc3ZnXG4gICAgLmFwcGVuZChcImdcIilcbiAgICAuYXR0cihcImNsYXNzXCIsIGAke3RhcmdldFNWR30teS1heGlzIHktYXhpc2ApXG4gICAgLmF0dHIoXCJ0cmFuc2Zvcm1cIiwgXCJ0cmFuc2xhdGUoXCIgKyBtYXJnaW4ubGVmdCArIFwiLDApXCIpXG4gICAgLnN0eWxlKFwib3BhY2l0eVwiLCBcIjAlXCIpXG4gICAgLmNhbGwoeUF4aXMpO1xuXG4gIHN2Z1xuICAgIC5zZWxlY3RBbGwoXCJyZWN0XCIpXG4gICAgLmRhdGEoZGF0YSlcbiAgICAuZW50ZXIoKVxuICAgIC5hcHBlbmQoXCJyZWN0XCIpXG4gICAgLmF0dHIoXCJjbGFzc1wiLCBgJHt0YXJnZXRTbGlkZVJlY3R9IGhpZGRlbiBjaGFydC1yZWN0YClcbiAgICAuYXR0cihcInhcIiwgZnVuY3Rpb24oZCwgaSkge1xuICAgICAgcmV0dXJuIGkgKiAoeF9heGlzTGVuZ3RoIC8gbnVtYmVyT2ZDb2x1bW5zKSArIG1hcmdpbi5sZWZ0ICsgMTA7XG4gICAgfSlcbiAgICAuYXR0cihcInlcIiwgZnVuY3Rpb24oZCkge1xuICAgICAgcmV0dXJuIHlTY2FsZShkIC8gMTAwKTtcbiAgICB9KVxuICAgIC5hdHRyKFwid2lkdGhcIiwgeF9heGlzTGVuZ3RoIC8gbnVtYmVyT2ZDb2x1bW5zIC0gMSlcbiAgICAuYXR0cihcImhlaWdodFwiLCBmdW5jdGlvbihkKSB7XG4gICAgICByZXR1cm4gaCAtIHlTY2FsZShkIC8gMTAwKSAtIG1hcmdpbi50b3A7XG4gICB9KVxuICAgIC5hdHRyKFwiZmlsbFwiLCBcInJlZFwiKVxuICAgIC50cmFuc2l0aW9uKClcbiAgICAuZHVyYXRpb24oNTAwKTtcbiAgLy8gICAub24oXCJtb3VzZW92ZXJcIiwgaGFuZGxlTW91c2VvdmVyKTtcblxuICAvLyBjb25zdCBoYW5kbGVNb3VzZW92ZXIgPSAoZCwgaSkgPT4ge1xuICAvLyAgIGQzLnNlbGVjdCh0aGlzKVxuICAvLyAgICAgLnRyYW5zaXRpb24oKVxuICAvLyAgICAgLmVhc2UoXCJleHBcIilcbiAgLy8gICAgIC5kdXJhdGlvbig1MDApXG4gIC8vICAgICAuYXR0cihcImZpbGxcIiwgXCJ3aGl0ZVwiKTtcbiAgLy8gfTtcblxuXG5cblxufTtcblxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsIChlKSA9PiB7XG4gICAgXG4gICAgbGV0IHNsaWRlcyA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTk7IGkrKykge1xuICAgICAgICBsZXQgc2xpZGVOYW1lID0gXCIjc2xpZGUtY29udGFpbmVyLVwiICsgaTtcbiAgICAgICAgbGV0IG5ld1NsaWRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzbGlkZU5hbWUpO1xuICAgICAgICBzbGlkZXMucHVzaChuZXdTbGlkZSk7XG4gICAgfVxuICAgIGNyZWF0ZU9ic2VydmVycyhzbGlkZXMpO1xufSwgZmFsc2UpO1xuXG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsICgpID0+IHtcblxuICAgIGRvY3VtZW50XG4gICAgICAuZ2V0RWxlbWVudEJ5SWQoXCJiYW5hbmEtc3ZnLWNvbnRhaW5lclwiKVxuICAgICAgLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBlID0+IHtcblxuICAgICAgICBsZXQgYmFuYW5hSWNvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFxuICAgICAgICAgICAgXCJiYW5hbmEtc3ZnLWNvbnRhaW5lclwiXG4gICAgICAgICk7XG5cbiAgICAgICAgbGV0IGJhbmFuYUNoaWxkcmVuID0gYmFuYW5hSWNvbi5jaGlsZE5vZGVzO1xuICAgICAgICBpZiAoYmFuYW5hQ2hpbGRyZW5bM10pIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMjA7IGkrKykge1xuICAgICAgICAgICAgICAgIGJhbmFuYUljb24ucmVtb3ZlQ2hpbGQoYmFuYW5hQ2hpbGRyZW5bM10pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgbGV0IG1vdmVtZW50RnVuYyA9IG5ld0JhbmFuYSA9PiB7XG5cbiAgICAgICAgICBsZXQgc3RhcnQgPSBudWxsO1xuXG4gICAgICAgICAgY29uc3Qgc3RlcCA9ICh0aW1lc3RhbXApID0+IHtcbiAgICAgICAgICAgIGlmICghc3RhcnQpIHN0YXJ0ID0gdGltZXN0YW1wO1xuICAgICAgICAgICAgbGV0IHByb2dyZXNzID0gdGltZXN0YW1wIC0gc3RhcnQ7XG4gICAgICAgICAgICBuZXdCYW5hbmEuc3R5bGUudHJhbnNmb3JtID1cbiAgICAgICAgICAgICAgXCJ0cmFuc2xhdGVZKFwiICsgKHByb2dyZXNzKSArIFwicHgpXCI7XG4gICAgICAgICAgICBpZiAocHJvZ3Jlc3MgPCA1MDAwKSB7XG4gICAgICAgICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoc3RlcCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShzdGVwKTtcblxuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IGJhbmFuYUNvdW50ZXI7IGkgPCBiYW5hbmFDb3VudGVyICsgMjA7IGkrKykge1xuICAgICAgICAgICAgbGV0IG5ld0JhbmFuYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgICAgICBuZXdCYW5hbmEuc2V0QXR0cmlidXRlKFwiaWRcIiwgYGZseWluZy1iYW5hbmEtJHtpfWApO1xuICAgICAgICAgICAgbmV3QmFuYW5hLmNsYXNzTGlzdC5hZGQoYGZseWluZy1iYW5hbmFgKTtcbiAgICAgICAgICAgIGJhbmFuYUljb24uYXBwZW5kQ2hpbGQobmV3QmFuYW5hKTtcblxuICAgICAgICAgICAgbGV0IHRoaXNPbmVQYXJ0aWN1bGFyQmFuYW5hID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXG4gICAgICAgICAgICBgZmx5aW5nLWJhbmFuYS0ke2l9YFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHRoaXNPbmVQYXJ0aWN1bGFyQmFuYW5hLnN0eWxlLnRvcCA9IChNYXRoLnJhbmRvbSgpICogLTIwMCkgKyBcInB4XCI7XG4gICAgICAgICAgICB0aGlzT25lUGFydGljdWxhckJhbmFuYS5zdHlsZS5sZWZ0ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogd2luZG93LmlubmVyV2lkdGgpICsgXCJweFwiO1xuXG4gICAgICAgICAgICBtb3ZlbWVudEZ1bmModGhpc09uZVBhcnRpY3VsYXJCYW5hbmEpO1xuICAgICAgICB9XG5cbiAgICAgICAgYmFuYW5hQ291bnRlciArPSAxMDtcblxuICAgICAgfSk7XG5cbn0pXG5cbmNvbnN0IGNyZWF0ZU9ic2VydmVycyA9IChzbGlkZXMpID0+IHtcbiAgICBcbiAgICBsZXQgb3B0aW9ucyA9IHtcbiAgICAgIHJvb3Q6IG51bGwsXG4gICAgICByb290TWFyZ2luOiBcIjBweCAwcHggMHB4IDBweFwiLFxuICAgICAgdGhyZXNob2xkOiAuNVxuICAgIH07XG5cbiAgICBjb25zb2xlLmxvZyhzbGlkZXMpO1xuICAgIFxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2xpZGVzLmxlbmd0aCAtIDE7IGkrKykge1xuICAgICAgU2xpZGVzLnJlbmRlclNsaWRlKG9wdGlvbnMsIHNsaWRlc1tpXSwgaSk7XG4gICAgfVxuXG59XG4iLCJleHBvcnQgY29uc3QgcmVuZGVyU2xpZGUgPSAob3B0aW9ucywgc2xpZGUsIGlkeCkgPT4ge1xuXG4gIGNvbnN0IGhhbmRsZVNjcm9sbE9udG8gPSAoZW50cmllcywgb2JzZXJ2ZXIpID0+IHtcbiAgICBlbnRyaWVzLmZvckVhY2goZW50cnkgPT4ge1xuICAgICAgaWYgKGVudHJ5LmlzSW50ZXJzZWN0aW5nKSB7XG5cbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgLnNsaWRlLXN2Zy0ke2lkeH0tcmVjdGApLmZvckVhY2gocmVjdCA9PiB7XG4gICAgICAgICAgcmVjdC5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZGVuXCIpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgLnNsaWRlLXN2Zy0ke2lkeCAtIDF9LXJlY3RgKSkge1xuICAgICAgICAgICAgZG9jdW1lbnRcbiAgICAgICAgICAgICAgLnF1ZXJ5U2VsZWN0b3JBbGwoYC5zbGlkZS1zdmctJHtpZHggLSAxfS1yZWN0YClcbiAgICAgICAgICAgICAgLmZvckVhY2gocmVjdCA9PiB7XG4gICAgICAgICAgICAgICAgcmVjdC5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGAuc2xpZGUtc3ZnLSR7aWR4ICsgMX0tcmVjdGApKSB7XG4gICAgICAgICAgICBkb2N1bWVudFxuICAgICAgICAgICAgICAucXVlcnlTZWxlY3RvckFsbChgLnNsaWRlLXN2Zy0ke2lkeCArIDF9LXJlY3RgKVxuICAgICAgICAgICAgICAuZm9yRWFjaChyZWN0ID0+IHtcbiAgICAgICAgICAgICAgICByZWN0LmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgZDMuc2VsZWN0KGAuc2xpZGUtc3ZnLSR7aWR4fS15LWF4aXNgKVxuICAgICAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgICAgICAuc3R5bGUoXCJvcGFjaXR5XCIsIFwiMTAwJVwiKVxuICAgICAgICAgIC5kdXJhdGlvbig1MDApO1xuXG5cbiAgICAgICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC5zbGlkZS1zdmctJHtpZHggLSAxfS15LWF4aXNgKSkge1xuICAgICAgICAgICAgZDMuc2VsZWN0KGAuc2xpZGUtc3ZnLSR7aWR4IC0gMX0teS1heGlzYClcbiAgICAgICAgICAgICAgLnRyYW5zaXRpb24oKVxuICAgICAgICAgICAgICAuc3R5bGUoXCJvcGFjaXR5XCIsIFwiMCVcIilcbiAgICAgICAgICAgICAgLmR1cmF0aW9uKDUwMCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLnNsaWRlLXN2Zy0ke2lkeCArIDF9LXktYXhpc2ApKSB7XG4gICAgICAgICAgICBkMy5zZWxlY3QoYC5zbGlkZS1zdmctJHtpZHggKyAxfS15LWF4aXNgKVxuICAgICAgICAgICAgICAudHJhbnNpdGlvbigpXG4gICAgICAgICAgICAgIC5zdHlsZShcIm9wYWNpdHlcIiwgXCIwJVwiKVxuICAgICAgICAgICAgICAuZHVyYXRpb24oNTAwKTtcbiAgICAgICAgfVxuXG4gICAgICB9XG4gICAgfSk7XG4gIH07XG5cbiAgbGV0IG9ic2VydmVyID0gbmV3IEludGVyc2VjdGlvbk9ic2VydmVyKGhhbmRsZVNjcm9sbE9udG8sIG9wdGlvbnMpO1xuICBvYnNlcnZlci5vYnNlcnZlKHNsaWRlKTtcblxufSIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpbiJdLCJzb3VyY2VSb290IjoiIn0=