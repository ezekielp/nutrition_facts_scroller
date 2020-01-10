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
var _this = undefined;



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
          });
        } // if (document.querySelector(`#slide-container-${idx - 1}`)) {
        //   document
        //     .querySelector(`#slide-container-${idx - 1}`)
        //     .classList.add("opaque");
        // }


        if (document.querySelectorAll(".slide-svg-".concat(idx + 1, "-rect"))) {
          document.querySelectorAll(".slide-svg-".concat(idx + 1, "-rect")).forEach(function (rect) {
            rect.classList.add("hidden");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL3Njcm9sbC9zbGlkZXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0eWxlcy9pbmRleC5zY3NzP2M4MDciXSwibmFtZXMiOlsibnV0cml0aW9uRGF0YSIsImJhbmFuYUNvdW50ZXIiLCJkMyIsImNzdiIsImQiLCJmb29kX25hbWUiLCJzZXJ2aW5nX3NpemUiLCJmaWJlciIsImlyb24iLCJtYWduZXNpdW0iLCJwb3Rhc3NpdW0iLCJ6aW5jIiwiZm9sYXRlIiwiY2hvbGVzdGVyb2wiLCJ0aGVuIiwiZGF0YSIsImNvbnNvbGUiLCJsb2ciLCJjcmVhdGVWaXN1YWxpemF0aW9uIiwiaSIsImxlbmd0aCIsImZvb2REYXRhIiwiaWR4IiwiY3JlYXRlWEF4aXNCb29sIiwibWFyZ2luIiwidG9wIiwicmlnaHQiLCJib3R0b20iLCJsZWZ0IiwidyIsImgiLCJPYmplY3QiLCJ2YWx1ZXMiLCJzbGljZSIsIm51bWJlck9mQ29sdW1ucyIsIm1heFZhbHVlIiwiTWF0aCIsIm1heCIsInhfYXhpc0xlbmd0aCIsInlfYXhpc0xlbmd0aCIsInRhcmdldFNWRyIsInRhcmdldFNsaWRlUmVjdCIsInhTY2FsZSIsInNjYWxlTGluZWFyIiwiZG9tYWluIiwicmFuZ2UiLCJ5U2NhbGUiLCJzdmciLCJzZWxlY3QiLCJhcHBlbmQiLCJhdHRyIiwieEF4aXMiLCJheGlzQm90dG9tIiwidGlja1NpemUiLCJ0aWNrRm9ybWF0Iiwia2V5cyIsInVuZGVmaW5lZCIsInRyYW5zaXRpb24iLCJkdXJhdGlvbiIsImNhbGwiLCJzZWxlY3RBbGwiLCJ5QXhpcyIsImF4aXNMZWZ0IiwidGlja3MiLCJzdHlsZSIsImVudGVyIiwiaGFuZGxlTW91c2VvdmVyIiwiZWFzZSIsIndpbmRvdyIsImFkZEV2ZW50TGlzdGVuZXIiLCJlIiwic2xpZGVzIiwic2xpZGVOYW1lIiwibmV3U2xpZGUiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJwdXNoIiwiY3JlYXRlT2JzZXJ2ZXJzIiwiZ2V0RWxlbWVudEJ5SWQiLCJiYW5hbmFJY29uIiwiYmFuYW5hQ2hpbGRyZW4iLCJjaGlsZE5vZGVzIiwicmVtb3ZlQ2hpbGQiLCJtb3ZlbWVudEZ1bmMiLCJuZXdCYW5hbmEiLCJzdGFydCIsInN0ZXAiLCJ0aW1lc3RhbXAiLCJwcm9ncmVzcyIsInRyYW5zZm9ybSIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsImNyZWF0ZUVsZW1lbnQiLCJzZXRBdHRyaWJ1dGUiLCJjbGFzc0xpc3QiLCJhZGQiLCJhcHBlbmRDaGlsZCIsInRoaXNPbmVQYXJ0aWN1bGFyQmFuYW5hIiwicmFuZG9tIiwiZmxvb3IiLCJpbm5lcldpZHRoIiwib3B0aW9ucyIsInJvb3QiLCJyb290TWFyZ2luIiwidGhyZXNob2xkIiwiU2xpZGVzIiwicmVuZGVyU2xpZGUiLCJzbGlkZSIsImhhbmRsZVNjcm9sbE9udG8iLCJlbnRyaWVzIiwib2JzZXJ2ZXIiLCJmb3JFYWNoIiwiZW50cnkiLCJpc0ludGVyc2VjdGluZyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJyZWN0IiwicmVtb3ZlIiwiSW50ZXJzZWN0aW9uT2JzZXJ2ZXIiLCJvYnNlcnZlIl0sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FB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RHhDLFlBRUd3RixPQUZILENBRVcsVUFBQUksSUFBSSxFQUFJO0FBQ2ZBLGdCQUFJLENBQUNyQixTQUFMLENBQWVDLEdBQWYsQ0FBbUIsUUFBbkI7QUFDRCxXQUpIO0FBS0gsU0ExQ3VCLENBNEN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTVGLFVBQUUsQ0FBQzhDLE1BQUgsc0JBQXdCMUIsR0FBeEIsY0FDR21DLFVBREgsR0FFR08sS0FGSCxDQUVTLFNBRlQsRUFFb0IsTUFGcEIsRUFHR04sUUFISCxDQUdZLEdBSFo7O0FBTUEsWUFBSWdCLFFBQVEsQ0FBQ0MsYUFBVCxzQkFBcUNyRCxHQUFHLEdBQUcsQ0FBM0MsYUFBSixFQUE0RDtBQUN4RHBCLFlBQUUsQ0FBQzhDLE1BQUgsc0JBQXdCMUIsR0FBRyxHQUFHLENBQTlCLGNBQ0dtQyxVQURILEdBRUdPLEtBRkgsQ0FFUyxTQUZULEVBRW9CLElBRnBCLEVBR0dOLFFBSEgsQ0FHWSxHQUhaO0FBSUg7O0FBRUQsWUFBSWdCLFFBQVEsQ0FBQ0MsYUFBVCxzQkFBcUNyRCxHQUFHLEdBQUcsQ0FBM0MsYUFBSixFQUE0RDtBQUN4RHBCLFlBQUUsQ0FBQzhDLE1BQUgsc0JBQXdCMUIsR0FBRyxHQUFHLENBQTlCLGNBQ0dtQyxVQURILEdBRUdPLEtBRkgsQ0FFUyxTQUZULEVBRW9CLElBRnBCLEVBR0dOLFFBSEgsQ0FHWSxHQUhaO0FBSUg7QUFFRjtBQUNGLEtBeEVEO0FBeUVELEdBMUVEOztBQTRFQSxNQUFJbUQsUUFBUSxHQUFHLElBQUlPLG9CQUFKLENBQXlCVCxnQkFBekIsRUFBMkNQLE9BQTNDLENBQWY7QUFDQVMsVUFBUSxDQUFDUSxPQUFULENBQWlCWCxLQUFqQjtBQUVELENBakZNLEM7Ozs7Ozs7Ozs7O0FDQVAsdUMiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL2Rpc3QvXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LmpzXCIpO1xuIiwiaW1wb3J0ICcuL3N0eWxlcy9pbmRleC5zY3NzJztcbmltcG9ydCAqIGFzIFNsaWRlcyBmcm9tICcuL3NjcmlwdHMvc2Nyb2xsL3NsaWRlcyc7XG5cbmxldCBudXRyaXRpb25EYXRhO1xubGV0IGJhbmFuYUNvdW50ZXIgPSAwO1xuXG5kMy5jc3YoXCJudXRyaXRpb25fZmFjdHNfZm9yX3Njcm9sbGVyLmNzdlwiLCBkID0+IHtcbiAgcmV0dXJuIHtcbiAgICBmb29kX25hbWU6IGRbXCJGb29kIG5hbWVcIl0sXG4gICAgc2VydmluZ19zaXplOiBkW1wiQW1vdW50XCJdLFxuICAgIGZpYmVyOiArZFtcIkZpYmVyXCJdLFxuICAgIGlyb246ICtkW1wiSXJvblwiXSxcbiAgICBtYWduZXNpdW06ICtkW1wiTWFnbmVzaXVtXCJdLFxuICAgIHBvdGFzc2l1bTogK2RbXCJQb3Rhc3NpdW1cIl0sXG4gICAgemluYzogK2RbXCJaaW5jXCJdLFxuICAgIFwidml0YW1pbiBDXCI6ICtkW1wiVml0YW1pbiBDXCJdLFxuICAgIGZvbGF0ZTogK2RbXCJGb2xhdGVcIl0sXG4gICAgXCJ2aXRhbWluIEIxMlwiOiArZFtcIlZpdGFtaW4gQi0xMlwiXSxcbiAgICBcInZpdGFtaW4gQVwiOiArZFtcIlZpdGFtaW4gQVwiXSxcbiAgICBcInZpdGFtaW4gRFwiOiArZFtcIlZpdGFtaW4gRFwiXSxcbiAgICBjaG9sZXN0ZXJvbDogK2RbXCJDaG9sZXN0ZXJvbFwiXVxuICB9O1xufSkudGhlbihkYXRhID0+IHtcbiAgICBudXRyaXRpb25EYXRhID0gZGF0YTtcbiAgICBjb25zb2xlLmxvZyhudXRyaXRpb25EYXRhKTtcbiAgICBcbiAgICBjcmVhdGVWaXN1YWxpemF0aW9uKG51dHJpdGlvbkRhdGFbMF0sIDAsIHRydWUpO1xuXG4gICAgZm9yIChsZXQgaSA9IDE7IGkgPCBudXRyaXRpb25EYXRhLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNyZWF0ZVZpc3VhbGl6YXRpb24obnV0cml0aW9uRGF0YVtpXSwgaSk7XG4gICAgfVxuXG59KTtcblxuY29uc3QgY3JlYXRlVmlzdWFsaXphdGlvbiA9IChmb29kRGF0YSwgaWR4LCBjcmVhdGVYQXhpc0Jvb2wpID0+IHtcbiAgbGV0IG1hcmdpbiA9IHt0b3A6IDQwLCByaWdodDogNDAsIGJvdHRvbTogNjUsIGxlZnQ6IDUwfVxuICBsZXQgdyA9IDcwMCAtIG1hcmdpbi5sZWZ0IC0gbWFyZ2luLnJpZ2h0O1xuICBsZXQgaCA9IDYwMCAtIG1hcmdpbi50b3AgLSBtYXJnaW4uYm90dG9tO1xuXG4gIGxldCBkYXRhID0gT2JqZWN0LnZhbHVlcyhmb29kRGF0YSkuc2xpY2UoMiwgLTEpO1xuICBsZXQgbnVtYmVyT2ZDb2x1bW5zID0gMTA7XG4gIGxldCBtYXhWYWx1ZSA9IE1hdGgubWF4KC41MCwgZDMubWF4KGRhdGEsIGZ1bmN0aW9uKGQpIHtcbiAgICByZXR1cm4gKCtkIC8gMTAwKTtcbiAgfSkpO1xuICBsZXQgeF9heGlzTGVuZ3RoID0gdztcbiAgbGV0IHlfYXhpc0xlbmd0aCA9IGg7XG4gIGxldCB0YXJnZXRTVkcgPSBcInNsaWRlLXN2Zy1cIiArIGlkeDtcbiAgbGV0IHRhcmdldFNsaWRlUmVjdCA9IFwic2xpZGUtc3ZnLVwiICsgaWR4ICsgXCItcmVjdFwiO1xuXG4gIGxldCB4U2NhbGUgPSBkM1xuICAgIC5zY2FsZUxpbmVhcigpXG4gICAgLmRvbWFpbihbMCwgbnVtYmVyT2ZDb2x1bW5zXSlcbiAgICAucmFuZ2UoWzAsIHddKTtcblxuICBsZXQgeVNjYWxlID0gZDNcbiAgICAuc2NhbGVMaW5lYXIoKVxuICAgIC5kb21haW4oWzAsIG1heFZhbHVlXSlcbiAgICAucmFuZ2UoW2ggLSBtYXJnaW4udG9wLCBtYXJnaW4uYm90dG9tXSk7XG5cbiAgbGV0IHN2ZyA9IGQzXG4gICAgLnNlbGVjdChcIiN2aXNcIilcbiAgICAuYXBwZW5kKFwic3ZnXCIpXG4gICAgLmF0dHIoXCJ3aWR0aFwiLCB3ICsgbWFyZ2luLmxlZnQgKyBtYXJnaW4ucmlnaHQpXG4gICAgLmF0dHIoXCJoZWlnaHRcIiwgaCArIG1hcmdpbi50b3AgKyBtYXJnaW4uYm90dG9tKTtcblxuICBsZXQgeEF4aXMgPSBkM1xuICAgIC5heGlzQm90dG9tKHhTY2FsZSlcbiAgICAudGlja1NpemUoMClcbiAgICAudGlja0Zvcm1hdChmdW5jdGlvbihkKSB7XG4gICAgICByZXR1cm4gT2JqZWN0LmtleXMoZm9vZERhdGEpLnNsaWNlKDIsIC0xKVtkXTtcbiAgICB9KTtcblxuICBpZiAoY3JlYXRlWEF4aXNCb29sICE9PSB1bmRlZmluZWQpIHtcbiAgICBzdmdcbiAgICAgIC5hcHBlbmQoXCJnXCIpXG4gICAgICAuYXR0cihcImNsYXNzXCIsIGAke3RhcmdldFNWR30teC1heGlzIHgtYXhpc2ApXG4gICAgICAuYXR0cihcbiAgICAgICAgXCJ0cmFuc2Zvcm1cIixcbiAgICAgICAgXCJ0cmFuc2xhdGUoXCIgKyBtYXJnaW4ubGVmdCArIFwiLCBcIiArIChoIC0gbWFyZ2luLnRvcCkgKyBcIilcIlxuICAgICAgKVxuICAgICAgLnRyYW5zaXRpb24oKVxuICAgICAgLmR1cmF0aW9uKDEwMDApXG4gICAgICAuY2FsbCh4QXhpcyk7XG5cbiAgICBzdmcuc2VsZWN0QWxsKFwiLngtYXhpcyB0ZXh0XCIpLmF0dHIoXCJ0cmFuc2Zvcm1cIiwgZnVuY3Rpb24oZCkge1xuICAgICAgcmV0dXJuIFwidHJhbnNsYXRlKDI1LCAyNSlyb3RhdGUoLTQ1KVwiO1xuICAgIH0pO1xuICB9XG5cbiAgbGV0IHlBeGlzID0gZDMuYXhpc0xlZnQoeVNjYWxlKS50aWNrcyg0LCBcIiVcIik7XG5cbiAgc3ZnXG4gICAgLmFwcGVuZChcImdcIilcbiAgICAuYXR0cihcImNsYXNzXCIsIGAke3RhcmdldFNWR30teS1heGlzIHktYXhpc2ApXG4gICAgLmF0dHIoXCJ0cmFuc2Zvcm1cIiwgXCJ0cmFuc2xhdGUoXCIgKyBtYXJnaW4ubGVmdCArIFwiLDApXCIpXG4gICAgLnN0eWxlKFwib3BhY2l0eVwiLCBcIjAlXCIpXG4gICAgLmNhbGwoeUF4aXMpO1xuXG4gIHN2Z1xuICAgIC5zZWxlY3RBbGwoXCJyZWN0XCIpXG4gICAgLmRhdGEoZGF0YSlcbiAgICAuZW50ZXIoKVxuICAgIC5hcHBlbmQoXCJyZWN0XCIpXG4gICAgLmF0dHIoXCJjbGFzc1wiLCBgJHt0YXJnZXRTbGlkZVJlY3R9IGhpZGRlbiBjaGFydC1yZWN0YClcbiAgICAuYXR0cihcInhcIiwgZnVuY3Rpb24oZCwgaSkge1xuICAgICAgcmV0dXJuIGkgKiAoeF9heGlzTGVuZ3RoIC8gbnVtYmVyT2ZDb2x1bW5zKSArIG1hcmdpbi5sZWZ0ICsgMTA7XG4gICAgfSlcbiAgICAuYXR0cihcInlcIiwgZnVuY3Rpb24oZCkge1xuICAgICAgcmV0dXJuIHlTY2FsZShkIC8gMTAwKTtcbiAgICB9KVxuICAgIC5hdHRyKFwid2lkdGhcIiwgeF9heGlzTGVuZ3RoIC8gbnVtYmVyT2ZDb2x1bW5zIC0gMSlcbiAgICAuYXR0cihcImhlaWdodFwiLCBmdW5jdGlvbihkKSB7XG4gICAgICByZXR1cm4gaCAtIHlTY2FsZShkIC8gMTAwKSAtIG1hcmdpbi50b3A7XG4gICAgfSlcbiAgICAuYXR0cihcImZpbGxcIiwgXCJyZWRcIilcbiAgICAudHJhbnNpdGlvbigpXG4gICAgLmR1cmF0aW9uKDUwMCk7XG4gICAgLy8gLm9uKFwibW91c2VvdmVyXCIsIGhhbmRsZU1vdXNlb3Zlcik7XG5cblxuICAgIGNvbnN0IGhhbmRsZU1vdXNlb3ZlciA9IChkLCBpKSA9PiB7XG4gICAgICBkMy5zZWxlY3QodGhpcylcbiAgICAgICAgLnRyYW5zaXRpb24oKVxuICAgICAgICAuZWFzZShcImVhc2VcIilcbiAgICAgICAgLmR1cmF0aW9uKDUwMClcbiAgICAgICAgLmF0dHIoXCJmaWxsXCIsIFwid2hpdGVcIik7XG4gICAgfTtcbn07XG5cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLCAoZSkgPT4ge1xuICAgIFxuICAgIGxldCBzbGlkZXMgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDE5OyBpKyspIHtcbiAgICAgICAgbGV0IHNsaWRlTmFtZSA9IFwiI3NsaWRlLWNvbnRhaW5lci1cIiArIGk7XG4gICAgICAgIGxldCBuZXdTbGlkZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2xpZGVOYW1lKTtcbiAgICAgICAgc2xpZGVzLnB1c2gobmV3U2xpZGUpO1xuICAgIH1cbiAgICBjcmVhdGVPYnNlcnZlcnMoc2xpZGVzKTtcbn0sIGZhbHNlKTtcblxuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCAoKSA9PiB7XG5cbiAgICBkb2N1bWVudFxuICAgICAgLmdldEVsZW1lbnRCeUlkKFwiYmFuYW5hLXN2Zy1jb250YWluZXJcIilcbiAgICAgIC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZSA9PiB7XG5cbiAgICAgICAgbGV0IGJhbmFuYUljb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcbiAgICAgICAgICAgIFwiYmFuYW5hLXN2Zy1jb250YWluZXJcIlxuICAgICAgICApO1xuXG4gICAgICAgIGxldCBiYW5hbmFDaGlsZHJlbiA9IGJhbmFuYUljb24uY2hpbGROb2RlcztcbiAgICAgICAgaWYgKGJhbmFuYUNoaWxkcmVuWzNdKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDIwOyBpKyspIHtcbiAgICAgICAgICAgICAgICBiYW5hbmFJY29uLnJlbW92ZUNoaWxkKGJhbmFuYUNoaWxkcmVuWzNdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBtb3ZlbWVudEZ1bmMgPSBuZXdCYW5hbmEgPT4ge1xuXG4gICAgICAgICAgbGV0IHN0YXJ0ID0gbnVsbDtcblxuICAgICAgICAgIGNvbnN0IHN0ZXAgPSAodGltZXN0YW1wKSA9PiB7XG4gICAgICAgICAgICBpZiAoIXN0YXJ0KSBzdGFydCA9IHRpbWVzdGFtcDtcbiAgICAgICAgICAgIGxldCBwcm9ncmVzcyA9IHRpbWVzdGFtcCAtIHN0YXJ0O1xuICAgICAgICAgICAgbmV3QmFuYW5hLnN0eWxlLnRyYW5zZm9ybSA9XG4gICAgICAgICAgICAgIFwidHJhbnNsYXRlWShcIiArIChwcm9ncmVzcykgKyBcInB4KVwiO1xuICAgICAgICAgICAgaWYgKHByb2dyZXNzIDwgNTAwMCkge1xuICAgICAgICAgICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKHN0ZXApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoc3RlcCk7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAobGV0IGkgPSBiYW5hbmFDb3VudGVyOyBpIDwgYmFuYW5hQ291bnRlciArIDIwOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBuZXdCYW5hbmEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICAgICAgbmV3QmFuYW5hLnNldEF0dHJpYnV0ZShcImlkXCIsIGBmbHlpbmctYmFuYW5hLSR7aX1gKTtcbiAgICAgICAgICAgIG5ld0JhbmFuYS5jbGFzc0xpc3QuYWRkKGBmbHlpbmctYmFuYW5hYCk7XG4gICAgICAgICAgICBiYW5hbmFJY29uLmFwcGVuZENoaWxkKG5ld0JhbmFuYSk7XG5cbiAgICAgICAgICAgIGxldCB0aGlzT25lUGFydGljdWxhckJhbmFuYSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFxuICAgICAgICAgICAgYGZseWluZy1iYW5hbmEtJHtpfWBcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICB0aGlzT25lUGFydGljdWxhckJhbmFuYS5zdHlsZS50b3AgPSAoTWF0aC5yYW5kb20oKSAqIC0yMDApICsgXCJweFwiO1xuICAgICAgICAgICAgdGhpc09uZVBhcnRpY3VsYXJCYW5hbmEuc3R5bGUubGVmdCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHdpbmRvdy5pbm5lcldpZHRoKSArIFwicHhcIjtcblxuICAgICAgICAgICAgbW92ZW1lbnRGdW5jKHRoaXNPbmVQYXJ0aWN1bGFyQmFuYW5hKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGJhbmFuYUNvdW50ZXIgKz0gMTA7XG5cbiAgICAgIH0pO1xuXG59KVxuXG5jb25zdCBjcmVhdGVPYnNlcnZlcnMgPSAoc2xpZGVzKSA9PiB7XG4gICAgXG4gICAgbGV0IG9wdGlvbnMgPSB7XG4gICAgICByb290OiBudWxsLFxuICAgICAgcm9vdE1hcmdpbjogXCIwcHggMHB4IDBweCAwcHhcIixcbiAgICAgIHRocmVzaG9sZDogLjVcbiAgICB9O1xuXG4gICAgY29uc29sZS5sb2coc2xpZGVzKTtcbiAgICBcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNsaWRlcy5sZW5ndGggLSAxOyBpKyspIHtcbiAgICAgIFNsaWRlcy5yZW5kZXJTbGlkZShvcHRpb25zLCBzbGlkZXNbaV0sIGkpO1xuICAgIH1cblxufVxuIiwiZXhwb3J0IGNvbnN0IHJlbmRlclNsaWRlID0gKG9wdGlvbnMsIHNsaWRlLCBpZHgpID0+IHtcblxuICBjb25zdCBoYW5kbGVTY3JvbGxPbnRvID0gKGVudHJpZXMsIG9ic2VydmVyKSA9PiB7XG4gICAgZW50cmllcy5mb3JFYWNoKGVudHJ5ID0+IHtcbiAgICAgIGlmIChlbnRyeS5pc0ludGVyc2VjdGluZykge1xuXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYC5zbGlkZS1zdmctJHtpZHh9LXJlY3RgKS5mb3JFYWNoKHJlY3QgPT4ge1xuICAgICAgICAgIHJlY3QuY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gZG9jdW1lbnRcbiAgICAgICAgLy8gICAucXVlcnlTZWxlY3RvcihgI3NsaWRlLWNvbnRhaW5lci0ke2lkeH1gKVxuICAgICAgICAvLyAgIC5jbGFzc0xpc3QucmVtb3ZlKFwib3BhcXVlXCIpO1xuICAgICAgICBcbiAgICAgICAgLy8gZDMuc2VsZWN0QWxsKGAuc2xpZGUtc3ZnLSR7aWR4fS1yZWN0YCkub24oXCJtb3VzZW92ZXJcIiwgaGFuZGxlTW91c2VvdmVyKTtcblxuICAgICAgICAvLyBjb25zdCBoYW5kbGVNb3VzZW92ZXIgPSAoZCwgaSkgPT4ge1xuICAgICAgICAvLyAgIGRlYnVnZ2VyO1xuICAgICAgICAvLyAgIGQzLnNlbGVjdCh0aGlzKVxuICAgICAgICAvLyAgICAgLnRyYW5zaXRpb24oKVxuICAgICAgICAvLyAgICAgLmVhc2UoXCJlYXNlXCIpXG4gICAgICAgIC8vICAgICAuZHVyYXRpb24oNTAwKVxuICAgICAgICAvLyAgICAgLmF0dHIoXCJmaWxsXCIsIFwid2hpdGVcIik7XG4gICAgICAgIC8vIH07XG5cblxuICAgICAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgLnNsaWRlLXN2Zy0ke2lkeCAtIDF9LXJlY3RgKSkge1xuICAgICAgICAgICAgZG9jdW1lbnRcbiAgICAgICAgICAgICAgLnF1ZXJ5U2VsZWN0b3JBbGwoYC5zbGlkZS1zdmctJHtpZHggLSAxfS1yZWN0YClcbiAgICAgICAgICAgICAgLmZvckVhY2gocmVjdCA9PiB7XG4gICAgICAgICAgICAgICAgcmVjdC5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjc2xpZGUtY29udGFpbmVyLSR7aWR4IC0gMX1gKSkge1xuICAgICAgICAvLyAgIGRvY3VtZW50XG4gICAgICAgIC8vICAgICAucXVlcnlTZWxlY3RvcihgI3NsaWRlLWNvbnRhaW5lci0ke2lkeCAtIDF9YClcbiAgICAgICAgLy8gICAgIC5jbGFzc0xpc3QuYWRkKFwib3BhcXVlXCIpO1xuICAgICAgICAvLyB9XG5cbiAgICAgICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYC5zbGlkZS1zdmctJHtpZHggKyAxfS1yZWN0YCkpIHtcbiAgICAgICAgICAgIGRvY3VtZW50XG4gICAgICAgICAgICAgIC5xdWVyeVNlbGVjdG9yQWxsKGAuc2xpZGUtc3ZnLSR7aWR4ICsgMX0tcmVjdGApXG4gICAgICAgICAgICAgIC5mb3JFYWNoKHJlY3QgPT4ge1xuICAgICAgICAgICAgICAgIHJlY3QuY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgI3NsaWRlLWNvbnRhaW5lci0ke2lkeCArIDF9YCkpIHtcbiAgICAgICAgLy8gICBkb2N1bWVudFxuICAgICAgICAvLyAgICAgLnF1ZXJ5U2VsZWN0b3IoYCNzbGlkZS1jb250YWluZXItJHtpZHggKyAxfWApXG4gICAgICAgIC8vICAgICAuY2xhc3NMaXN0LmFkZChcIm9wYXF1ZVwiKTsgICAgICAgICAgICBcbiAgICAgICAgLy8gfVxuXG4gICAgICAgIGQzLnNlbGVjdChgLnNsaWRlLXN2Zy0ke2lkeH0teS1heGlzYClcbiAgICAgICAgICAudHJhbnNpdGlvbigpXG4gICAgICAgICAgLnN0eWxlKFwib3BhY2l0eVwiLCBcIjEwMCVcIilcbiAgICAgICAgICAuZHVyYXRpb24oNTAwKTtcblxuXG4gICAgICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuc2xpZGUtc3ZnLSR7aWR4IC0gMX0teS1heGlzYCkpIHtcbiAgICAgICAgICAgIGQzLnNlbGVjdChgLnNsaWRlLXN2Zy0ke2lkeCAtIDF9LXktYXhpc2ApXG4gICAgICAgICAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgICAgICAgICAgLnN0eWxlKFwib3BhY2l0eVwiLCBcIjAlXCIpXG4gICAgICAgICAgICAgIC5kdXJhdGlvbig1MDApO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC5zbGlkZS1zdmctJHtpZHggKyAxfS15LWF4aXNgKSkge1xuICAgICAgICAgICAgZDMuc2VsZWN0KGAuc2xpZGUtc3ZnLSR7aWR4ICsgMX0teS1heGlzYClcbiAgICAgICAgICAgICAgLnRyYW5zaXRpb24oKVxuICAgICAgICAgICAgICAuc3R5bGUoXCJvcGFjaXR5XCIsIFwiMCVcIilcbiAgICAgICAgICAgICAgLmR1cmF0aW9uKDUwMCk7XG4gICAgICAgIH1cblxuICAgICAgfVxuICAgIH0pO1xuICB9O1xuXG4gIGxldCBvYnNlcnZlciA9IG5ldyBJbnRlcnNlY3Rpb25PYnNlcnZlcihoYW5kbGVTY3JvbGxPbnRvLCBvcHRpb25zKTtcbiAgb2JzZXJ2ZXIub2JzZXJ2ZShzbGlkZSk7XG5cbn0iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW4iXSwic291cmNlUm9vdCI6IiJ9