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
  var svg = d3.select("#vis").append("svg").attr("class", "".concat(targetSVG)).attr("width", w + margin.left + margin.right).attr("height", h + margin.top + margin.bottom);
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
      thisOneParticularBanana.style.top = Math.random() * -700 + "px";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL3Njcm9sbC9zbGlkZXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0eWxlcy9pbmRleC5zY3NzP2M4MDciXSwibmFtZXMiOlsibnV0cml0aW9uRGF0YSIsImJhbmFuYUNvdW50ZXIiLCJkMyIsImNzdiIsImQiLCJmb29kX25hbWUiLCJzZXJ2aW5nX3NpemUiLCJmaWJlciIsImlyb24iLCJtYWduZXNpdW0iLCJwb3Rhc3NpdW0iLCJ6aW5jIiwiZm9sYXRlIiwiY2hvbGVzdGVyb2wiLCJ0aGVuIiwiZGF0YSIsImNvbnNvbGUiLCJsb2ciLCJjcmVhdGVWaXN1YWxpemF0aW9uIiwiY3JlYXRlTmF2TGkiLCJjcmVhdGVBbmNob3IiLCJpIiwibGVuZ3RoIiwiZm9vZERhdGEiLCJpZHgiLCJjcmVhdGVYQXhpc0Jvb2wiLCJtYXJnaW4iLCJ0b3AiLCJyaWdodCIsImJvdHRvbSIsImxlZnQiLCJ3IiwiaCIsIk9iamVjdCIsInZhbHVlcyIsInNsaWNlIiwibnVtYmVyT2ZDb2x1bW5zIiwibWF4VmFsdWUiLCJNYXRoIiwibWF4IiwieF9heGlzTGVuZ3RoIiwieV9heGlzTGVuZ3RoIiwidGFyZ2V0U1ZHIiwidGFyZ2V0U2xpZGVSZWN0IiwieFNjYWxlIiwic2NhbGVMaW5lYXIiLCJkb21haW4iLCJyYW5nZSIsInlTY2FsZSIsInN2ZyIsInNlbGVjdCIsImFwcGVuZCIsImF0dHIiLCJ4QXhpcyIsImF4aXNCb3R0b20iLCJ0aWNrU2l6ZSIsInRpY2tGb3JtYXQiLCJrZXlzIiwidW5kZWZpbmVkIiwidHJhbnNpdGlvbiIsImR1cmF0aW9uIiwiY2FsbCIsInNlbGVjdEFsbCIsInlBeGlzIiwiYXhpc0xlZnQiLCJ0aWNrcyIsInN0eWxlIiwiZW50ZXIiLCJoYW5kbGVNb3VzZW92ZXIiLCJlYXNlIiwid2luZG93IiwiYWRkRXZlbnRMaXN0ZW5lciIsImUiLCJzbGlkZXMiLCJzbGlkZU5hbWUiLCJuZXdTbGlkZSIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsInB1c2giLCJjcmVhdGVPYnNlcnZlcnMiLCJnZXRFbGVtZW50QnlJZCIsImJhbmFuYUljb24iLCJiYW5hbmFDaGlsZHJlbiIsImNoaWxkTm9kZXMiLCJyZW1vdmVDaGlsZCIsIm1vdmVtZW50RnVuYyIsIm5ld0JhbmFuYSIsInN0YXJ0Iiwic3RlcCIsInRpbWVzdGFtcCIsInByb2dyZXNzIiwidHJhbnNmb3JtIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwiY3JlYXRlRWxlbWVudCIsInNldEF0dHJpYnV0ZSIsImNsYXNzTGlzdCIsImFkZCIsImFwcGVuZENoaWxkIiwidGhpc09uZVBhcnRpY3VsYXJCYW5hbmEiLCJyYW5kb20iLCJmbG9vciIsImlubmVyV2lkdGgiLCJvcHRpb25zIiwicm9vdCIsInJvb3RNYXJnaW4iLCJ0aHJlc2hvbGQiLCJTbGlkZXMiLCJuYXZDb2x1bW4iLCJhbmNob3JMaW5rIiwibmF2TGkiLCJzbGlkZUNvbnRhaW5lciIsImFuY2hvclRhZyIsInJlbmRlclNsaWRlIiwic2xpZGUiLCJoYW5kbGVTY3JvbGxPbnRvIiwiZW50cmllcyIsIm9ic2VydmVyIiwiZm9yRWFjaCIsImVudHJ5IiwiaXNJbnRlcnNlY3RpbmciLCJxdWVyeVNlbGVjdG9yQWxsIiwicmVjdCIsInJlbW92ZSIsIkludGVyc2VjdGlvbk9ic2VydmVyIiwib2JzZXJ2ZSJdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFD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QVEsR0FBRyxJQUFJTyxvQkFBSixDQUF5QlQsZ0JBQXpCLEVBQTJDWixPQUEzQyxDQUFmO0FBQ0FjLFVBQVEsQ0FBQ1EsT0FBVCxDQUFpQlgsS0FBakI7QUFFRCxDQXBGTSxDOzs7Ozs7Ozs7OztBQ0FQLHVDIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9kaXN0L1wiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC5qc1wiKTtcbiIsImltcG9ydCAnLi9zdHlsZXMvaW5kZXguc2Nzcyc7XG5pbXBvcnQgKiBhcyBTbGlkZXMgZnJvbSAnLi9zY3JpcHRzL3Njcm9sbC9zbGlkZXMnO1xuXG5sZXQgbnV0cml0aW9uRGF0YTtcbmxldCBiYW5hbmFDb3VudGVyID0gMDtcblxuZDMuY3N2KFwibnV0cml0aW9uX2ZhY3RzX2Zvcl9zY3JvbGxlci5jc3ZcIiwgZCA9PiB7XG4gIHJldHVybiB7XG4gICAgZm9vZF9uYW1lOiBkW1wiRm9vZCBuYW1lXCJdLFxuICAgIHNlcnZpbmdfc2l6ZTogZFtcIkFtb3VudFwiXSxcbiAgICBmaWJlcjogK2RbXCJGaWJlclwiXSxcbiAgICBpcm9uOiArZFtcIklyb25cIl0sXG4gICAgbWFnbmVzaXVtOiArZFtcIk1hZ25lc2l1bVwiXSxcbiAgICBwb3Rhc3NpdW06ICtkW1wiUG90YXNzaXVtXCJdLFxuICAgIHppbmM6ICtkW1wiWmluY1wiXSxcbiAgICBcInZpdGFtaW4gQ1wiOiArZFtcIlZpdGFtaW4gQ1wiXSxcbiAgICBmb2xhdGU6ICtkW1wiRm9sYXRlXCJdLFxuICAgIFwidml0YW1pbiBCMTJcIjogK2RbXCJWaXRhbWluIEItMTJcIl0sXG4gICAgXCJ2aXRhbWluIEFcIjogK2RbXCJWaXRhbWluIEFcIl0sXG4gICAgXCJ2aXRhbWluIERcIjogK2RbXCJWaXRhbWluIERcIl0sXG4gICAgY2hvbGVzdGVyb2w6ICtkW1wiQ2hvbGVzdGVyb2xcIl1cbiAgfTtcbn0pLnRoZW4oZGF0YSA9PiB7XG4gICAgbnV0cml0aW9uRGF0YSA9IGRhdGE7XG4gICAgY29uc29sZS5sb2cobnV0cml0aW9uRGF0YSk7XG4gICAgXG4gICAgY3JlYXRlVmlzdWFsaXphdGlvbihudXRyaXRpb25EYXRhWzBdLCAwLCB0cnVlKTtcbiAgICBjcmVhdGVOYXZMaSgwKTtcbiAgICBjcmVhdGVBbmNob3IoMCk7XG4gICAgXG4gICAgZm9yIChsZXQgaSA9IDE7IGkgPCBudXRyaXRpb25EYXRhLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjcmVhdGVWaXN1YWxpemF0aW9uKG51dHJpdGlvbkRhdGFbaV0sIGkpO1xuICAgICAgY3JlYXRlTmF2TGkoaSk7XG4gICAgICBjcmVhdGVBbmNob3IoaSk7XG4gICAgfVxuXG59KTtcblxuY29uc3QgY3JlYXRlVmlzdWFsaXphdGlvbiA9IChmb29kRGF0YSwgaWR4LCBjcmVhdGVYQXhpc0Jvb2wpID0+IHtcbiAgbGV0IG1hcmdpbiA9IHt0b3A6IDQwLCByaWdodDogNDAsIGJvdHRvbTogNjUsIGxlZnQ6IDUwfVxuICBsZXQgdyA9IDcwMCAtIG1hcmdpbi5sZWZ0IC0gbWFyZ2luLnJpZ2h0O1xuICBsZXQgaCA9IDYwMCAtIG1hcmdpbi50b3AgLSBtYXJnaW4uYm90dG9tO1xuXG4gIGxldCBkYXRhID0gT2JqZWN0LnZhbHVlcyhmb29kRGF0YSkuc2xpY2UoMiwgLTEpO1xuICBsZXQgbnVtYmVyT2ZDb2x1bW5zID0gMTA7XG4gIGxldCBtYXhWYWx1ZSA9IE1hdGgubWF4KC41MCwgZDMubWF4KGRhdGEsIGZ1bmN0aW9uKGQpIHtcbiAgICByZXR1cm4gKCtkIC8gMTAwKTtcbiAgfSkpO1xuICBsZXQgeF9heGlzTGVuZ3RoID0gdztcbiAgbGV0IHlfYXhpc0xlbmd0aCA9IGg7XG4gIGxldCB0YXJnZXRTVkcgPSBcInNsaWRlLXN2Zy1cIiArIGlkeDtcbiAgbGV0IHRhcmdldFNsaWRlUmVjdCA9IFwic2xpZGUtc3ZnLVwiICsgaWR4ICsgXCItcmVjdFwiO1xuXG4gIGxldCB4U2NhbGUgPSBkM1xuICAgIC5zY2FsZUxpbmVhcigpXG4gICAgLmRvbWFpbihbMCwgbnVtYmVyT2ZDb2x1bW5zXSlcbiAgICAucmFuZ2UoWzAsIHddKTtcblxuICBsZXQgeVNjYWxlID0gZDNcbiAgICAuc2NhbGVMaW5lYXIoKVxuICAgIC5kb21haW4oWzAsIG1heFZhbHVlXSlcbiAgICAucmFuZ2UoW2ggLSBtYXJnaW4udG9wLCBtYXJnaW4uYm90dG9tXSk7XG5cbiAgbGV0IHN2ZyA9IGQzXG4gICAgLnNlbGVjdChcIiN2aXNcIilcbiAgICAuYXBwZW5kKFwic3ZnXCIpXG4gICAgLmF0dHIoXCJjbGFzc1wiLCBgJHt0YXJnZXRTVkd9YClcbiAgICAuYXR0cihcIndpZHRoXCIsIHcgKyBtYXJnaW4ubGVmdCArIG1hcmdpbi5yaWdodClcbiAgICAuYXR0cihcImhlaWdodFwiLCBoICsgbWFyZ2luLnRvcCArIG1hcmdpbi5ib3R0b20pO1xuXG4gIGxldCB4QXhpcyA9IGQzXG4gICAgLmF4aXNCb3R0b20oeFNjYWxlKVxuICAgIC50aWNrU2l6ZSgwKVxuICAgIC50aWNrRm9ybWF0KGZ1bmN0aW9uKGQpIHtcbiAgICAgIHJldHVybiBPYmplY3Qua2V5cyhmb29kRGF0YSkuc2xpY2UoMiwgLTEpW2RdO1xuICAgIH0pO1xuXG4gIGlmIChjcmVhdGVYQXhpc0Jvb2wgIT09IHVuZGVmaW5lZCkge1xuICAgIHN2Z1xuICAgICAgLmFwcGVuZChcImdcIilcbiAgICAgIC5hdHRyKFwiY2xhc3NcIiwgYCR7dGFyZ2V0U1ZHfS14LWF4aXMgeC1heGlzYClcbiAgICAgIC5hdHRyKFxuICAgICAgICBcInRyYW5zZm9ybVwiLFxuICAgICAgICBcInRyYW5zbGF0ZShcIiArIG1hcmdpbi5sZWZ0ICsgXCIsIFwiICsgKGggLSBtYXJnaW4udG9wKSArIFwiKVwiXG4gICAgICApXG4gICAgICAudHJhbnNpdGlvbigpXG4gICAgICAuZHVyYXRpb24oMTAwMClcbiAgICAgIC5jYWxsKHhBeGlzKTtcblxuICAgIHN2Zy5zZWxlY3RBbGwoXCIueC1heGlzIHRleHRcIikuYXR0cihcInRyYW5zZm9ybVwiLCBmdW5jdGlvbihkKSB7XG4gICAgICByZXR1cm4gXCJ0cmFuc2xhdGUoMjUsIDI1KXJvdGF0ZSgtNDUpXCI7XG4gICAgfSk7XG4gIH1cblxuICBsZXQgeUF4aXMgPSBkMy5heGlzTGVmdCh5U2NhbGUpLnRpY2tzKDQsIFwiJVwiKTtcblxuICBzdmdcbiAgICAuYXBwZW5kKFwiZ1wiKVxuICAgIC5hdHRyKFwiY2xhc3NcIiwgYCR7dGFyZ2V0U1ZHfS15LWF4aXMgeS1heGlzYClcbiAgICAuYXR0cihcInRyYW5zZm9ybVwiLCBcInRyYW5zbGF0ZShcIiArIG1hcmdpbi5sZWZ0ICsgXCIsMClcIilcbiAgICAuc3R5bGUoXCJvcGFjaXR5XCIsIFwiMCVcIilcbiAgICAuY2FsbCh5QXhpcyk7XG5cbiAgc3ZnXG4gICAgLnNlbGVjdEFsbChcInJlY3RcIilcbiAgICAuZGF0YShkYXRhKVxuICAgIC5lbnRlcigpXG4gICAgLmFwcGVuZChcInJlY3RcIilcbiAgICAuYXR0cihcImNsYXNzXCIsIGAke3RhcmdldFNsaWRlUmVjdH0gaGlkZGVuYClcbiAgICAuYXR0cihcInhcIiwgZnVuY3Rpb24oZCwgaSkge1xuICAgICAgcmV0dXJuIGkgKiAoeF9heGlzTGVuZ3RoIC8gbnVtYmVyT2ZDb2x1bW5zKSArIG1hcmdpbi5sZWZ0ICsgMTA7XG4gICAgfSlcbiAgICAuYXR0cihcInlcIiwgZnVuY3Rpb24oZCkge1xuICAgICAgcmV0dXJuIHlTY2FsZShkIC8gMTAwKTtcbiAgICB9KVxuICAgIC5hdHRyKFwid2lkdGhcIiwgeF9heGlzTGVuZ3RoIC8gbnVtYmVyT2ZDb2x1bW5zIC0gMSlcbiAgICAuYXR0cihcImhlaWdodFwiLCBmdW5jdGlvbihkKSB7XG4gICAgICByZXR1cm4gaCAtIHlTY2FsZShkIC8gMTAwKSAtIG1hcmdpbi50b3A7XG4gICAgfSlcbiAgICAuYXR0cihcImZpbGxcIiwgXCJyZWRcIilcbiAgICAudHJhbnNpdGlvbigpXG4gICAgLmR1cmF0aW9uKDUwMCk7XG4gICAgLy8gLm9uKFwibW91c2VvdmVyXCIsIGhhbmRsZU1vdXNlb3Zlcik7XG5cblxuICAgIGNvbnN0IGhhbmRsZU1vdXNlb3ZlciA9IChkLCBpKSA9PiB7XG4gICAgICBkMy5zZWxlY3QodGhpcylcbiAgICAgICAgLnRyYW5zaXRpb24oKVxuICAgICAgICAuZWFzZShcImVhc2VcIilcbiAgICAgICAgLmR1cmF0aW9uKDUwMClcbiAgICAgICAgLmF0dHIoXCJmaWxsXCIsIFwid2hpdGVcIik7XG4gICAgfTtcbn07XG5cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLCAoZSkgPT4ge1xuICAgIFxuICAgIGxldCBzbGlkZXMgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDE5OyBpKyspIHtcbiAgICAgICAgbGV0IHNsaWRlTmFtZSA9IFwiI3NsaWRlLWNvbnRhaW5lci1cIiArIGk7XG4gICAgICAgIGxldCBuZXdTbGlkZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2xpZGVOYW1lKTtcbiAgICAgICAgc2xpZGVzLnB1c2gobmV3U2xpZGUpO1xuICAgIH1cbiAgICBjcmVhdGVPYnNlcnZlcnMoc2xpZGVzKTtcbn0sIGZhbHNlKTtcblxuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCAoKSA9PiB7XG5cbiAgICBkb2N1bWVudFxuICAgICAgLmdldEVsZW1lbnRCeUlkKFwiYmFuYW5hLXN2Zy1jb250YWluZXJcIilcbiAgICAgIC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZSA9PiB7XG5cbiAgICAgICAgbGV0IGJhbmFuYUljb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcbiAgICAgICAgICAgIFwiYmFuYW5hLXN2Zy1jb250YWluZXJcIlxuICAgICAgICApO1xuXG4gICAgICAgIGxldCBiYW5hbmFDaGlsZHJlbiA9IGJhbmFuYUljb24uY2hpbGROb2RlcztcbiAgICAgICAgaWYgKGJhbmFuYUNoaWxkcmVuWzNdKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDIwOyBpKyspIHtcbiAgICAgICAgICAgICAgICBiYW5hbmFJY29uLnJlbW92ZUNoaWxkKGJhbmFuYUNoaWxkcmVuWzNdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBtb3ZlbWVudEZ1bmMgPSBuZXdCYW5hbmEgPT4ge1xuXG4gICAgICAgICAgbGV0IHN0YXJ0ID0gbnVsbDtcblxuICAgICAgICAgIGNvbnN0IHN0ZXAgPSAodGltZXN0YW1wKSA9PiB7XG4gICAgICAgICAgICBpZiAoIXN0YXJ0KSBzdGFydCA9IHRpbWVzdGFtcDtcbiAgICAgICAgICAgIGxldCBwcm9ncmVzcyA9IHRpbWVzdGFtcCAtIHN0YXJ0O1xuICAgICAgICAgICAgbmV3QmFuYW5hLnN0eWxlLnRyYW5zZm9ybSA9XG4gICAgICAgICAgICAgIFwidHJhbnNsYXRlWShcIiArIChwcm9ncmVzcykgKyBcInB4KVwiO1xuICAgICAgICAgICAgaWYgKHByb2dyZXNzIDwgNTAwMCkge1xuICAgICAgICAgICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKHN0ZXApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoc3RlcCk7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAobGV0IGkgPSBiYW5hbmFDb3VudGVyOyBpIDwgYmFuYW5hQ291bnRlciArIDIwOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBuZXdCYW5hbmEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICAgICAgbmV3QmFuYW5hLnNldEF0dHJpYnV0ZShcImlkXCIsIGBmbHlpbmctYmFuYW5hLSR7aX1gKTtcbiAgICAgICAgICAgIG5ld0JhbmFuYS5jbGFzc0xpc3QuYWRkKGBmbHlpbmctYmFuYW5hYCk7XG4gICAgICAgICAgICBiYW5hbmFJY29uLmFwcGVuZENoaWxkKG5ld0JhbmFuYSk7XG5cbiAgICAgICAgICAgIGxldCB0aGlzT25lUGFydGljdWxhckJhbmFuYSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFxuICAgICAgICAgICAgYGZseWluZy1iYW5hbmEtJHtpfWBcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICB0aGlzT25lUGFydGljdWxhckJhbmFuYS5zdHlsZS50b3AgPSAoTWF0aC5yYW5kb20oKSAqIC03MDApICsgXCJweFwiO1xuICAgICAgICAgICAgdGhpc09uZVBhcnRpY3VsYXJCYW5hbmEuc3R5bGUubGVmdCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHdpbmRvdy5pbm5lcldpZHRoKSArIFwicHhcIjtcblxuICAgICAgICAgICAgbW92ZW1lbnRGdW5jKHRoaXNPbmVQYXJ0aWN1bGFyQmFuYW5hKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGJhbmFuYUNvdW50ZXIgKz0gMTA7XG5cbiAgICAgIH0pO1xuXG59KVxuXG5jb25zdCBjcmVhdGVPYnNlcnZlcnMgPSAoc2xpZGVzKSA9PiB7XG4gICAgXG4gICAgbGV0IG9wdGlvbnMgPSB7XG4gICAgICByb290OiBudWxsLFxuICAgICAgcm9vdE1hcmdpbjogXCIwcHggMHB4IDBweCAwcHhcIixcbiAgICAgIHRocmVzaG9sZDogLjVcbiAgICB9O1xuXG4gICAgY29uc29sZS5sb2coc2xpZGVzKTtcbiAgICBcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNsaWRlcy5sZW5ndGggLSAxOyBpKyspIHtcbiAgICAgIFNsaWRlcy5yZW5kZXJTbGlkZShvcHRpb25zLCBzbGlkZXNbaV0sIGkpO1xuICAgIH1cblxufVxuXG5jb25zdCBjcmVhdGVOYXZMaSA9IChpZHgpID0+IHtcbiAgbGV0IG5hdkNvbHVtbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5uYXYtY29sdW1uJyk7XG5cbiAgbGV0IGFuY2hvckxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYVwiKTtcbiAgYW5jaG9yTGluay5zZXRBdHRyaWJ1dGUoXCJocmVmXCIsIGAjYW5jaG9yLSR7aWR4fWApO1xuICBuYXZDb2x1bW4uYXBwZW5kQ2hpbGQoYW5jaG9yTGluayk7XG5cbiAgbGV0IG5hdkxpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpO1xuICBuYXZMaS5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBgbmF2LWxpLSR7aWR4fWApO1xuICBuYXZMaS5jbGFzc0xpc3QuYWRkKFwibmF2LWxpXCIpO1xuICBhbmNob3JMaW5rLmFwcGVuZENoaWxkKG5hdkxpKTtcblxufVxuXG5jb25zdCBjcmVhdGVBbmNob3IgPSAoaWR4KSA9PiB7XG4gIGxldCBzbGlkZUNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBzbGlkZS1jb250YWluZXItJHtpZHh9YCk7XG5cbiAgbGV0IGFuY2hvclRhZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJhXCIpO1xuICBhbmNob3JUYWcuc2V0QXR0cmlidXRlKFwiaWRcIiwgYGFuY2hvci0ke2lkeH1gKTtcbiAgYW5jaG9yVGFnLmNsYXNzTGlzdC5hZGQoXCJhbmNob3JcIik7XG5cbiAgc2xpZGVDb250YWluZXIuYXBwZW5kQ2hpbGQoYW5jaG9yVGFnKTtcbn1cblxuXG4iLCJleHBvcnQgY29uc3QgcmVuZGVyU2xpZGUgPSAob3B0aW9ucywgc2xpZGUsIGlkeCkgPT4ge1xuXG4gIGNvbnN0IGhhbmRsZVNjcm9sbE9udG8gPSAoZW50cmllcywgb2JzZXJ2ZXIpID0+IHtcbiAgICBlbnRyaWVzLmZvckVhY2goZW50cnkgPT4ge1xuICAgICAgaWYgKGVudHJ5LmlzSW50ZXJzZWN0aW5nKSB7XG5cbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgLnNsaWRlLXN2Zy0ke2lkeH0tcmVjdGApLmZvckVhY2gocmVjdCA9PiB7XG4gICAgICAgICAgcmVjdC5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZGVuXCIpO1xuICAgICAgICAgIHJlY3QuY2xhc3NMaXN0LmFkZChcImNoYXJ0LXJlY3RcIik7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIGRvY3VtZW50XG4gICAgICAgIC8vICAgLnF1ZXJ5U2VsZWN0b3IoYCNzbGlkZS1jb250YWluZXItJHtpZHh9YClcbiAgICAgICAgLy8gICAuY2xhc3NMaXN0LnJlbW92ZShcIm9wYXF1ZVwiKTtcbiAgICAgICAgXG4gICAgICAgIC8vIGQzLnNlbGVjdEFsbChgLnNsaWRlLXN2Zy0ke2lkeH0tcmVjdGApLm9uKFwibW91c2VvdmVyXCIsIGhhbmRsZU1vdXNlb3Zlcik7XG5cbiAgICAgICAgLy8gY29uc3QgaGFuZGxlTW91c2VvdmVyID0gKGQsIGkpID0+IHtcbiAgICAgICAgLy8gICBkZWJ1Z2dlcjtcbiAgICAgICAgLy8gICBkMy5zZWxlY3QodGhpcylcbiAgICAgICAgLy8gICAgIC50cmFuc2l0aW9uKClcbiAgICAgICAgLy8gICAgIC5lYXNlKFwiZWFzZVwiKVxuICAgICAgICAvLyAgICAgLmR1cmF0aW9uKDUwMClcbiAgICAgICAgLy8gICAgIC5hdHRyKFwiZmlsbFwiLCBcIndoaXRlXCIpO1xuICAgICAgICAvLyB9O1xuXG5cbiAgICAgICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYC5zbGlkZS1zdmctJHtpZHggLSAxfS1yZWN0YCkpIHtcbiAgICAgICAgICAgIGRvY3VtZW50XG4gICAgICAgICAgICAgIC5xdWVyeVNlbGVjdG9yQWxsKGAuc2xpZGUtc3ZnLSR7aWR4IC0gMX0tcmVjdGApXG4gICAgICAgICAgICAgIC5mb3JFYWNoKHJlY3QgPT4ge1xuICAgICAgICAgICAgICAgIHJlY3QuY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcbiAgICAgICAgICAgICAgICByZWN0LmNsYXNzTGlzdC5yZW1vdmUoXCJjaGFydC1yZWN0XCIpO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjc2xpZGUtY29udGFpbmVyLSR7aWR4IC0gMX1gKSkge1xuICAgICAgICAvLyAgIGRvY3VtZW50XG4gICAgICAgIC8vICAgICAucXVlcnlTZWxlY3RvcihgI3NsaWRlLWNvbnRhaW5lci0ke2lkeCAtIDF9YClcbiAgICAgICAgLy8gICAgIC5jbGFzc0xpc3QuYWRkKFwib3BhcXVlXCIpO1xuICAgICAgICAvLyB9XG5cbiAgICAgICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYC5zbGlkZS1zdmctJHtpZHggKyAxfS1yZWN0YCkpIHtcbiAgICAgICAgICAgIGRvY3VtZW50XG4gICAgICAgICAgICAgIC5xdWVyeVNlbGVjdG9yQWxsKGAuc2xpZGUtc3ZnLSR7aWR4ICsgMX0tcmVjdGApXG4gICAgICAgICAgICAgIC5mb3JFYWNoKHJlY3QgPT4ge1xuICAgICAgICAgICAgICAgIHJlY3QuY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcbiAgICAgICAgICAgICAgICByZWN0LmNsYXNzTGlzdC5yZW1vdmUoXCJjaGFydC1yZWN0XCIpO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjc2xpZGUtY29udGFpbmVyLSR7aWR4ICsgMX1gKSkge1xuICAgICAgICAvLyAgIGRvY3VtZW50XG4gICAgICAgIC8vICAgICAucXVlcnlTZWxlY3RvcihgI3NsaWRlLWNvbnRhaW5lci0ke2lkeCArIDF9YClcbiAgICAgICAgLy8gICAgIC5jbGFzc0xpc3QuYWRkKFwib3BhcXVlXCIpOyAgICAgICAgICAgIFxuICAgICAgICAvLyB9XG5cbiAgICAgICAgZDMuc2VsZWN0KGAuc2xpZGUtc3ZnLSR7aWR4fS15LWF4aXNgKVxuICAgICAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgICAgICAuc3R5bGUoXCJvcGFjaXR5XCIsIFwiMTAwJVwiKVxuICAgICAgICAgIC5kdXJhdGlvbig1MDApO1xuXG5cbiAgICAgICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC5zbGlkZS1zdmctJHtpZHggLSAxfS15LWF4aXNgKSkge1xuICAgICAgICAgICAgZDMuc2VsZWN0KGAuc2xpZGUtc3ZnLSR7aWR4IC0gMX0teS1heGlzYClcbiAgICAgICAgICAgICAgLnRyYW5zaXRpb24oKVxuICAgICAgICAgICAgICAuc3R5bGUoXCJvcGFjaXR5XCIsIFwiMCVcIilcbiAgICAgICAgICAgICAgLmR1cmF0aW9uKDUwMCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLnNsaWRlLXN2Zy0ke2lkeCArIDF9LXktYXhpc2ApKSB7XG4gICAgICAgICAgICBkMy5zZWxlY3QoYC5zbGlkZS1zdmctJHtpZHggKyAxfS15LWF4aXNgKVxuICAgICAgICAgICAgICAudHJhbnNpdGlvbigpXG4gICAgICAgICAgICAgIC5zdHlsZShcIm9wYWNpdHlcIiwgXCIwJVwiKVxuICAgICAgICAgICAgICAuZHVyYXRpb24oNTAwKTtcbiAgICAgICAgfVxuXG4gICAgICB9XG4gICAgfSk7XG4gIH07XG5cbiAgbGV0IG9ic2VydmVyID0gbmV3IEludGVyc2VjdGlvbk9ic2VydmVyKGhhbmRsZVNjcm9sbE9udG8sIG9wdGlvbnMpO1xuICBvYnNlcnZlci5vYnNlcnZlKHNsaWRlKTtcblxufSIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpbiJdLCJzb3VyY2VSb290IjoiIn0=