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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL2ZseWluZ19mb29kLmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL3Njcm9sbC9zbGlkZXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0eWxlcy9pbmRleC5zY3NzP2M4MDciXSwibmFtZXMiOlsibnV0cml0aW9uRGF0YSIsImQzIiwiY3N2IiwiZCIsImZvb2RfbmFtZSIsInNlcnZpbmdfc2l6ZSIsImZpYmVyIiwiaXJvbiIsIm1hZ25lc2l1bSIsInBvdGFzc2l1bSIsInppbmMiLCJmb2xhdGUiLCJjaG9sZXN0ZXJvbCIsInRoZW4iLCJkYXRhIiwiY29uc29sZSIsImxvZyIsImNyZWF0ZVZpc3VhbGl6YXRpb24iLCJjcmVhdGVOYXZMaSIsImNyZWF0ZUFuY2hvciIsImkiLCJsZW5ndGgiLCJmb29kRGF0YSIsImlkeCIsImNyZWF0ZVhBeGlzQm9vbCIsIm1hcmdpbiIsInRvcCIsInJpZ2h0IiwiYm90dG9tIiwibGVmdCIsInciLCJoIiwiT2JqZWN0IiwidmFsdWVzIiwic2xpY2UiLCJudW1iZXJPZkNvbHVtbnMiLCJtYXhWYWx1ZSIsIk1hdGgiLCJtYXgiLCJ4X2F4aXNMZW5ndGgiLCJ5X2F4aXNMZW5ndGgiLCJ0YXJnZXRTVkciLCJ0YXJnZXRTbGlkZVJlY3QiLCJ4U2NhbGUiLCJzY2FsZUxpbmVhciIsImRvbWFpbiIsInJhbmdlIiwieVNjYWxlIiwic3ZnIiwic2VsZWN0IiwiYXBwZW5kIiwiYXR0ciIsInhBeGlzIiwiYXhpc0JvdHRvbSIsInRpY2tTaXplIiwidGlja0Zvcm1hdCIsImtleXMiLCJ0cmFuc2l0aW9uIiwiZHVyYXRpb24iLCJjYWxsIiwic2VsZWN0QWxsIiwic3R5bGUiLCJ0ZXh0IiwieUF4aXMiLCJheGlzTGVmdCIsInRpY2tzIiwiZW50ZXIiLCJ3aW5kb3ciLCJhZGRFdmVudExpc3RlbmVyIiwiZSIsInNsaWRlcyIsInNsaWRlTmFtZSIsIm5ld1NsaWRlIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwicHVzaCIsImNyZWF0ZU9ic2VydmVycyIsImFkZEFsbEZseWluZ0Zvb2RMaXN0ZW5lcnMiLCJmbHlpbmdGb29kSWRzIiwiZm9yRWFjaCIsImlkIiwiZ2V0RWxlbWVudEJ5SWQiLCJjbGFzc0xpc3QiLCJhZGQiLCJyZW1vdmUiLCJvcHRpb25zIiwicm9vdCIsInJvb3RNYXJnaW4iLCJ0aHJlc2hvbGQiLCJTbGlkZXMiLCJuYXZDb2x1bW4iLCJhbmNob3JMaW5rIiwiY3JlYXRlRWxlbWVudCIsInNldEF0dHJpYnV0ZSIsImFwcGVuZENoaWxkIiwibmF2TGkiLCJzbGlkZUNvbnRhaW5lciIsImFuY2hvclRhZyIsImZvb2RDb3VudGVycyIsImFkZEZseWluZ0Zvb2RMaXN0ZW5lciIsImZvb2RJY29uIiwiZm9vZENoaWxkcmVuIiwiY2hpbGROb2RlcyIsInNldFRpbWVvdXQiLCJyZW1vdmVDaGlsZCIsIm1vdmVtZW50RnVuYyIsIm5ld0Zvb2QiLCJzdGFydCIsInNpZ25lZE9uZXMiLCJyYW5kb21JZHgiLCJmbG9vciIsInJhbmRvbSIsInJhbmRvbWx5U2lnbmVkT25lIiwic3RlcCIsInRpbWVzdGFtcCIsInByb2dyZXNzIiwidHJhbnNmb3JtIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwidGhpc09uZVBhcnRpY3VsYXJGb29kIiwic2Nyb2xsWSIsImlubmVyV2lkdGgiLCJyZW5kZXJTbGlkZSIsInNsaWRlIiwiaGFuZGxlU2Nyb2xsT250byIsImVudHJpZXMiLCJvYnNlcnZlciIsImVudHJ5IiwiaXNJbnRlcnNlY3RpbmciLCJjdXJyZW50U1ZHIiwidG9vbHRpcCIsIm51dHJpZW50cyIsIm9uIiwiZXZlbnQiLCJwYWdlWSIsInBhZ2VYIiwicXVlcnlTZWxlY3RvckFsbCIsInJlY3QiLCJuYXZDaXJjbGUiLCJJbnRlcnNlY3Rpb25PYnNlcnZlciIsIm9ic2VydmUiXSwibWFwcGluZ3Mi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RSxNQUF2RCxrQkFBd0U3RCxHQUFHLEdBQUcsQ0FBOUU7QUFDRDs7QUFFRCxZQUFJa0QsUUFBUSxDQUFDOEQsZ0JBQVQsc0JBQXdDaEgsR0FBRyxHQUFHLENBQTlDLFdBQUosRUFBNkQ7QUFDekRrRCxrQkFBUSxDQUNMOEQsZ0JBREgsc0JBQ2tDaEgsR0FBRyxHQUFHLENBRHhDLFlBRUd3RCxPQUZILENBRVcsVUFBQXlELElBQUksRUFBSTtBQUNmQSxnQkFBSSxDQUFDdEQsU0FBTCxDQUFlRSxNQUFmLENBQXNCLFlBQXRCO0FBQ0QsV0FKSDtBQU1BbkYsWUFBRSxDQUFDZ0QsTUFBSCxzQkFBd0IxQixHQUFHLEdBQUcsQ0FBOUIsY0FDR2tDLFVBREgsR0FFR0ksS0FGSCxDQUVTLFNBRlQsRUFFb0IsSUFGcEIsRUFHR0gsUUFISCxDQUdZLEdBSFo7QUFLQWUsa0JBQVEsQ0FBQ1EsY0FBVCxrQkFBa0MxRCxHQUFHLEdBQUcsQ0FBeEMsR0FBNkMyRCxTQUE3QyxDQUF1REUsTUFBdkQsa0JBQXdFN0QsR0FBRyxHQUFHLENBQTlFO0FBQ0g7QUFHRjtBQUNGLEtBcEdEO0FBcUdELEdBdEdEOztBQXdHQSxNQUFJc0csUUFBUSxHQUFHLElBQUlhLG9CQUFKLENBQXlCZixnQkFBekIsRUFBMkN0QyxPQUEzQyxDQUFmO0FBQ0F3QyxVQUFRLENBQUNjLE9BQVQsQ0FBaUJqQixLQUFqQjtBQUVELENBN0dNLEM7Ozs7Ozs7Ozs7O0FDQVAsdUMiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL2Rpc3QvXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LmpzXCIpO1xuIiwiaW1wb3J0ICcuL3N0eWxlcy9pbmRleC5zY3NzJztcbmltcG9ydCAqIGFzIFNsaWRlcyBmcm9tICcuL3NjcmlwdHMvc2Nyb2xsL3NsaWRlcyc7XG5pbXBvcnQgYWRkQWxsRmx5aW5nRm9vZExpc3RlbmVycyBmcm9tICcuL3NjcmlwdHMvZmx5aW5nX2Zvb2QnO1xuXG5sZXQgbnV0cml0aW9uRGF0YTtcblxuZDMuY3N2KFwibnV0cml0aW9uX2ZhY3RzX2Zvcl9zY3JvbGxlci5jc3ZcIiwgZCA9PiB7XG4gIHJldHVybiB7XG4gICAgZm9vZF9uYW1lOiBkW1wiRm9vZCBuYW1lXCJdLFxuICAgIHNlcnZpbmdfc2l6ZTogZFtcIkFtb3VudFwiXSxcbiAgICBmaWJlcjogK2RbXCJGaWJlclwiXSxcbiAgICBpcm9uOiArZFtcIklyb25cIl0sXG4gICAgbWFnbmVzaXVtOiArZFtcIk1hZ25lc2l1bVwiXSxcbiAgICBwb3Rhc3NpdW06ICtkW1wiUG90YXNzaXVtXCJdLFxuICAgIHppbmM6ICtkW1wiWmluY1wiXSxcbiAgICBcInZpdGFtaW4gQ1wiOiArZFtcIlZpdGFtaW4gQ1wiXSxcbiAgICBmb2xhdGU6ICtkW1wiRm9sYXRlXCJdLFxuICAgIFwidml0YW1pbiBCMTJcIjogK2RbXCJWaXRhbWluIEItMTJcIl0sXG4gICAgXCJ2aXRhbWluIEFcIjogK2RbXCJWaXRhbWluIEFcIl0sXG4gICAgXCJ2aXRhbWluIERcIjogK2RbXCJWaXRhbWluIERcIl0sXG4gICAgY2hvbGVzdGVyb2w6ICtkW1wiQ2hvbGVzdGVyb2xcIl1cbiAgfTtcbn0pLnRoZW4oZGF0YSA9PiB7XG4gICAgbnV0cml0aW9uRGF0YSA9IGRhdGE7XG4gICAgY29uc29sZS5sb2cobnV0cml0aW9uRGF0YSk7XG4gICAgXG4gICAgY3JlYXRlVmlzdWFsaXphdGlvbihudXRyaXRpb25EYXRhWzBdLCAwLCB0cnVlKTtcbiAgICBjcmVhdGVOYXZMaSgwKTtcbiAgICBjcmVhdGVBbmNob3IoMCk7XG4gICAgXG4gICAgZm9yIChsZXQgaSA9IDE7IGkgPCBudXRyaXRpb25EYXRhLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjcmVhdGVWaXN1YWxpemF0aW9uKG51dHJpdGlvbkRhdGFbaV0sIGkpO1xuICAgICAgY3JlYXRlTmF2TGkoaSk7XG4gICAgICBjcmVhdGVBbmNob3IoaSk7XG4gICAgfVxuXG59KTtcblxuY29uc3QgY3JlYXRlVmlzdWFsaXphdGlvbiA9IChmb29kRGF0YSwgaWR4LCBjcmVhdGVYQXhpc0Jvb2wpID0+IHtcbiAgbGV0IG1hcmdpbiA9IHt0b3A6IDIwLCByaWdodDogNDAsIGJvdHRvbTogMjUsIGxlZnQ6IDYwfVxuICBsZXQgdyA9IDYwMCAtIG1hcmdpbi5sZWZ0IC0gbWFyZ2luLnJpZ2h0O1xuICBsZXQgaCA9IDQ3NSAtIG1hcmdpbi50b3AgLSBtYXJnaW4uYm90dG9tO1xuXG4gIGxldCBkYXRhID0gT2JqZWN0LnZhbHVlcyhmb29kRGF0YSkuc2xpY2UoMiwgLTEpO1xuICBsZXQgbnVtYmVyT2ZDb2x1bW5zID0gMTA7XG4gIGxldCBtYXhWYWx1ZSA9IE1hdGgubWF4KC41MCwgZDMubWF4KGRhdGEsIGZ1bmN0aW9uKGQpIHtcbiAgICByZXR1cm4gKCtkIC8gMTAwKTtcbiAgfSkpO1xuICBsZXQgeF9heGlzTGVuZ3RoID0gdztcbiAgbGV0IHlfYXhpc0xlbmd0aCA9IGg7XG4gIGxldCB0YXJnZXRTVkcgPSBcInNsaWRlLXN2Zy1cIiArIGlkeDtcbiAgbGV0IHRhcmdldFNsaWRlUmVjdCA9IFwic2xpZGUtc3ZnLVwiICsgaWR4ICsgXCItcmVjdFwiO1xuXG4gIGxldCB4U2NhbGUgPSBkM1xuICAgIC5zY2FsZUxpbmVhcigpXG4gICAgLmRvbWFpbihbMCwgbnVtYmVyT2ZDb2x1bW5zXSlcbiAgICAucmFuZ2UoWzAsIHddKTtcblxuICBsZXQgeVNjYWxlID0gZDNcbiAgICAuc2NhbGVMaW5lYXIoKVxuICAgIC5kb21haW4oWzAsIG1heFZhbHVlXSlcbiAgICAucmFuZ2UoW2ggLSBtYXJnaW4udG9wLCBtYXJnaW4uYm90dG9tXSk7XG5cbiAgbGV0IHN2ZyA9IGQzXG4gICAgLnNlbGVjdChcIiN2aXNcIilcbiAgICAvLyAuc2VsZWN0KGAjc3ZnLWNvbnRhaW5lci0ke2lkeH1gKVxuICAgIC5hcHBlbmQoXCJzdmdcIilcbiAgICAuYXR0cihcImNsYXNzXCIsIGAke3RhcmdldFNWR30gaGlkZGVuYClcbiAgICAuYXR0cihcInZpZXdCb3hcIiwgYDAgMCA2NTAgNzAwYClcbiAgICAuYXR0cihcInByZXNlcnZlQXNwZWN0UmF0aW9cIiwgXCJ4TWluWU1pbiBtZWV0XCIpO1xuICAgIC8vIC5hdHRyKFwid2lkdGhcIiwgdyArIG1hcmdpbi5sZWZ0ICsgbWFyZ2luLnJpZ2h0KVxuICAgIC8vIC5hdHRyKFwiaGVpZ2h0XCIsIGggKyBtYXJnaW4udG9wICsgbWFyZ2luLmJvdHRvbSk7XG5cbiAgbGV0IHhBeGlzID0gZDNcbiAgICAuYXhpc0JvdHRvbSh4U2NhbGUpXG4gICAgLnRpY2tTaXplKDApXG4gICAgLnRpY2tGb3JtYXQoZnVuY3Rpb24oZCkge1xuICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKGZvb2REYXRhKS5zbGljZSgyLCAtMSlbZF07XG4gICAgfSk7XG5cbiAgLy8gaWYgKGNyZWF0ZVhBeGlzQm9vbCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgc3ZnXG4gICAgICAuYXBwZW5kKFwiZ1wiKVxuICAgICAgLmF0dHIoXCJjbGFzc1wiLCBgJHt0YXJnZXRTVkd9LXgtYXhpcyB4LWF4aXNgKVxuICAgICAgLmF0dHIoXG4gICAgICAgIFwidHJhbnNmb3JtXCIsXG4gICAgICAgIFwidHJhbnNsYXRlKFwiICsgbWFyZ2luLmxlZnQgKyBcIiwgXCIgKyAoaCAtIG1hcmdpbi50b3ApICsgXCIpXCJcbiAgICAgIClcbiAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgIC5kdXJhdGlvbigxMDAwKVxuICAgICAgLmNhbGwoeEF4aXMpO1xuXG4gICAgc3ZnLnNlbGVjdEFsbChcIi54LWF4aXMgdGV4dFwiKS5hdHRyKFwidHJhbnNmb3JtXCIsIGZ1bmN0aW9uKGQpIHtcbiAgICAgIHJldHVybiBcInRyYW5zbGF0ZSgxMCwgMjUpcm90YXRlKC00NSlcIjtcbiAgICB9KTtcblxuICAgIHN2Z1xuICAgICAgLmFwcGVuZChcInRleHRcIilcbiAgICAgIC5hdHRyKFwidHJhbnNmb3JtXCIsIFwicm90YXRlKC05MClcIilcbiAgICAgIC5hdHRyKFwiY2xhc3NcIiwgXCJ5LWF4aXMtbGFiZWxcIilcbiAgICAgIC5hdHRyKFwieVwiLCAwKVxuICAgICAgLmF0dHIoXCJ4XCIsIDAgLSBoIC8gMilcbiAgICAgIC5hdHRyKFwiZHlcIiwgXCIxZW1cIilcbiAgICAgIC5zdHlsZShcInRleHQtYW5jaG9yXCIsIFwibWlkZGxlXCIpXG4gICAgICAudGV4dChcIlBlcmNlbnRhZ2Ugb2YgcmVjb21tZW5kZWQgZGFpbHkgYWxsb3dhbmNlKFJEQSlcIik7XG5cbiAgICBzdmdcbiAgICAgIC5hcHBlbmQoXCJ0ZXh0XCIpXG4gICAgICAuYXR0cihcImNsYXNzXCIsIFwic291cmNlLXRleHRcIilcbiAgICAgIC5hdHRyKFwidHJhbnNmb3JtXCIsXG4gICAgICAgIFwidHJhbnNsYXRlKDM1LCBcIiArXG4gICAgICAgIChoICsgbWFyZ2luLnRvcCArIDQwKSArIFwiKVwiKVxuICAgICAgLy8gLmF0dHIoXCJkeVwiLCBcIjFlbVwiKVxuICAgICAgLnN0eWxlKFwidGV4dC1hbmNob3JcIiwgXCJsZWZ0XCIpXG4gICAgICAudGV4dChcIlNvdXJjZTogVVNEQVwiKTtcbiAgLy8gfVxuXG4gIGxldCB5QXhpcyA9IGQzLmF4aXNMZWZ0KHlTY2FsZSkudGlja3MoNCwgXCIlXCIpO1xuXG4gIHN2Z1xuICAgIC5hcHBlbmQoXCJnXCIpXG4gICAgLmF0dHIoXCJjbGFzc1wiLCBgJHt0YXJnZXRTVkd9LXktYXhpcyB5LWF4aXNgKVxuICAgIC5hdHRyKFwidHJhbnNmb3JtXCIsIFwidHJhbnNsYXRlKFwiICsgbWFyZ2luLmxlZnQgKyBcIiwwKVwiKVxuICAgIC5zdHlsZShcIm9wYWNpdHlcIiwgXCIwJVwiKVxuICAgIC5jYWxsKHlBeGlzKTtcbiAgICAgICAgXG4gIHN2Z1xuICAgIC5zZWxlY3RBbGwoXCJyZWN0XCIpXG4gICAgLmRhdGEoZGF0YSlcbiAgICAuZW50ZXIoKVxuICAgIC5hcHBlbmQoXCJyZWN0XCIpXG4gICAgLmF0dHIoXCJjbGFzc1wiLCBgJHt0YXJnZXRTbGlkZVJlY3R9YClcbiAgICAuYXR0cihcInhcIiwgZnVuY3Rpb24oZCwgaSkge1xuICAgICAgcmV0dXJuIGkgKiAoeF9heGlzTGVuZ3RoIC8gbnVtYmVyT2ZDb2x1bW5zKSArIG1hcmdpbi5sZWZ0ICsgMTA7XG4gICAgfSlcbiAgICAuYXR0cihcInlcIiwgZnVuY3Rpb24oZCkge1xuICAgICAgcmV0dXJuIHlTY2FsZShkIC8gMTAwKTtcbiAgICB9KVxuICAgIC5hdHRyKFwid2lkdGhcIiwgeF9heGlzTGVuZ3RoIC8gbnVtYmVyT2ZDb2x1bW5zIC0gMSlcbiAgICAuYXR0cihcImhlaWdodFwiLCBmdW5jdGlvbihkKSB7XG4gICAgICByZXR1cm4gaCAtIHlTY2FsZShkIC8gMTAwKSAtIG1hcmdpbi50b3A7XG4gICAgfSlcbiAgICAudHJhbnNpdGlvbigpXG4gICAgLmR1cmF0aW9uKDUwMCk7XG5cbn07XG5cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLCAoZSkgPT4ge1xuICAgIFxuICAgIGxldCBzbGlkZXMgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDE5OyBpKyspIHtcbiAgICAgICAgbGV0IHNsaWRlTmFtZSA9IFwiI3NsaWRlLWNvbnRhaW5lci1cIiArIGk7XG4gICAgICAgIGxldCBuZXdTbGlkZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2xpZGVOYW1lKTtcbiAgICAgICAgc2xpZGVzLnB1c2gobmV3U2xpZGUpO1xuICAgIH1cbiAgICBjcmVhdGVPYnNlcnZlcnMoc2xpZGVzKTtcbn0sIGZhbHNlKTtcblxuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCAoKSA9PiB7XG5cbiAgICBhZGRBbGxGbHlpbmdGb29kTGlzdGVuZXJzKCk7XG5cbiAgICBjb25zdCBmbHlpbmdGb29kSWRzID0gWzAsIDEsIDIsIDMsIDQsIDYsIDcsIDksIDExLCAxMiwgMTMsIDE0LCAxNiwgMTddO1xuXG4gICAgZmx5aW5nRm9vZElkcy5mb3JFYWNoKGlkID0+IHtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBmb29kLXN2Zy1jb250YWluZXItJHtpZH1gKS5hZGRFdmVudExpc3RlbmVyKFwibW91c2VvdmVyXCIsICgpID0+IHtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYGNsaWNrLWJ1YmJsZS0ke2lkfWApLmNsYXNzTGlzdC5hZGQoXCJzaG93XCIpO1xuICAgICAgfSlcblxuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYGZvb2Qtc3ZnLWNvbnRhaW5lci0ke2lkfWApLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW91dFwiLCAoKSA9PiB7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBjbGljay1idWJibGUtJHtpZH1gKS5jbGFzc0xpc3QucmVtb3ZlKFwic2hvd1wiKTtcbiAgICAgIH0pXG5cbiAgICB9KVxuXG5cbiAgICAvLyBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZm9vZC1zdmctY29udGFpbmVyLTAnKS5hZGRFdmVudExpc3RlbmVyKFwibW91c2VvdXRcIiwgKCkgPT4ge1xuXG4gICAgLy8gICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2xpY2stYnViYmxlJykuY2xhc3NMaXN0LnJlbW92ZShcInNob3dcIik7XG4gICAgLy8gfSlcblxuICAgIC8vIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmb29kLXN2Zy1jb250YWluZXItMScpLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW92ZXJcIiwgKCkgPT4ge1xuXG4gICAgLy8gICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY2xpY2stYnViYmxlLTEnKS5jbGFzc0xpc3QuYWRkKFwic2hvd1wiKTtcbiAgICAvLyB9KVxuXG4gICAgLy8gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Zvb2Qtc3ZnLWNvbnRhaW5lci0xJykuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlb3V0XCIsICgpID0+IHtcblxuICAgIC8vICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NsaWNrLWJ1YmJsZS0xJykuY2xhc3NMaXN0LnJlbW92ZShcInNob3dcIik7XG4gICAgLy8gfSlcblxufSlcblxuY29uc3QgY3JlYXRlT2JzZXJ2ZXJzID0gKHNsaWRlcykgPT4ge1xuICAgIFxuICAgIGxldCBvcHRpb25zID0ge1xuICAgICAgcm9vdDogbnVsbCxcbiAgICAgIHJvb3RNYXJnaW46IFwiMHB4IDBweCAwcHggMHB4XCIsXG4gICAgICB0aHJlc2hvbGQ6IC41XG4gICAgfTtcblxuICAgIGNvbnNvbGUubG9nKHNsaWRlcyk7XG4gICAgXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzbGlkZXMubGVuZ3RoIC0gMTsgaSsrKSB7XG4gICAgICBTbGlkZXMucmVuZGVyU2xpZGUob3B0aW9ucywgc2xpZGVzW2ldLCBpKTtcbiAgICB9XG5cbn1cblxuY29uc3QgY3JlYXRlTmF2TGkgPSAoaWR4KSA9PiB7XG4gIGxldCBuYXZDb2x1bW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubmF2LWNvbHVtbicpO1xuXG4gIGxldCBhbmNob3JMaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImFcIik7XG4gIGFuY2hvckxpbmsuc2V0QXR0cmlidXRlKFwiaHJlZlwiLCBgI2FuY2hvci0ke2lkeH1gKTtcbiAgbmF2Q29sdW1uLmFwcGVuZENoaWxkKGFuY2hvckxpbmspO1xuXG4gIGxldCBuYXZMaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKTtcbiAgbmF2TGkuc2V0QXR0cmlidXRlKFwiaWRcIiwgYG5hdi1saS0ke2lkeH1gKTtcbiAgbmF2TGkuY2xhc3NMaXN0LmFkZChcIm5hdi1saVwiKTtcbiAgYW5jaG9yTGluay5hcHBlbmRDaGlsZChuYXZMaSk7XG5cbn1cblxuY29uc3QgY3JlYXRlQW5jaG9yID0gKGlkeCkgPT4ge1xuICBsZXQgc2xpZGVDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgc2xpZGUtY29udGFpbmVyLSR7aWR4fWApO1xuXG4gIGxldCBhbmNob3JUYWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYVwiKTtcbiAgYW5jaG9yVGFnLnNldEF0dHJpYnV0ZShcImlkXCIsIGBhbmNob3ItJHtpZHh9YCk7XG4gIGFuY2hvclRhZy5jbGFzc0xpc3QuYWRkKFwiYW5jaG9yXCIpO1xuXG4gIHNsaWRlQ29udGFpbmVyLmFwcGVuZENoaWxkKGFuY2hvclRhZyk7XG59XG5cblxuIiwiICAgIGNvbnN0IGFkZEFsbEZseWluZ0Zvb2RMaXN0ZW5lcnMgPSAoKSA9PiB7XG5cbiAgICAgICAgbGV0IGZvb2RDb3VudGVycyA9IHt9O1xuXG4gICAgICAgIGNvbnN0IGFkZEZseWluZ0Zvb2RMaXN0ZW5lciA9IGlkeCA9PiB7XG4gICAgICAgICAgICBsZXQgZm9vZEljb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgZm9vZC1zdmctY29udGFpbmVyLSR7aWR4fWApO1xuXG4gICAgICAgICAgICBmb29kSWNvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGZvb2RDaGlsZHJlbiA9IGZvb2RJY29uLmNoaWxkTm9kZXM7XG4gICAgICAgICAgICAgICAgd2luZG93LnNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZm9vZENoaWxkcmVuWzNdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDMwOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb29kSWNvbi5yZW1vdmVDaGlsZChmb29kQ2hpbGRyZW5bM10pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSwgMzAwMCk7XG5cbiAgICAgICAgICAgICAgICBsZXQgbW92ZW1lbnRGdW5jID0gbmV3Rm9vZCA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IHN0YXJ0ID0gbnVsbDtcblxuICAgICAgICAgICAgICAgIGxldCBzaWduZWRPbmVzID0gWy0xLCAxXTtcbiAgICAgICAgICAgICAgICBsZXQgcmFuZG9tSWR4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMik7XG4gICAgICAgICAgICAgICAgbGV0IHJhbmRvbWx5U2lnbmVkT25lID0gc2lnbmVkT25lc1tyYW5kb21JZHhdO1xuXG4gICAgICAgICAgICAgICAgY29uc3Qgc3RlcCA9IHRpbWVzdGFtcCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghc3RhcnQpIHN0YXJ0ID0gdGltZXN0YW1wO1xuICAgICAgICAgICAgICAgICAgICBsZXQgcHJvZ3Jlc3MgPSB0aW1lc3RhbXAgLSBzdGFydDtcbiAgICAgICAgICAgICAgICAgICAgbmV3Rm9vZC5zdHlsZS50cmFuc2Zvcm0gPSBcInRyYW5zbGF0ZShcIiArIChwcm9ncmVzcyAqIHJhbmRvbWx5U2lnbmVkT25lKSArIFwicHgsIFwiICsgcHJvZ3Jlc3MgKyBcInB4KVwiO1xuICAgICAgICAgICAgICAgICAgICBpZiAocHJvZ3Jlc3MgPCAyNTAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoc3RlcCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShzdGVwKTtcbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IGZvb2RDb3VudGVyc1tpZHhdOyBpIDwgZm9vZENvdW50ZXJzW2lkeF0gKyAzMDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgbGV0IG5ld0Zvb2QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICAgICAgICAgIG5ld0Zvb2Quc2V0QXR0cmlidXRlKFwiaWRcIiwgYGZseWluZy1mb29kLW9mLXR5cGUtJHtpZHh9LSR7aX1gKTtcbiAgICAgICAgICAgICAgICBuZXdGb29kLmNsYXNzTGlzdC5hZGQoYGZseWluZy1mb29kLSR7aWR4fWApO1xuICAgICAgICAgICAgICAgIG5ld0Zvb2QuY2xhc3NMaXN0LmFkZChgZmx5aW5nLWZvb2RgKTtcbiAgICAgICAgICAgICAgICBmb29kSWNvbi5hcHBlbmRDaGlsZChuZXdGb29kKTtcblxuICAgICAgICAgICAgICAgIGxldCB0aGlzT25lUGFydGljdWxhckZvb2QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcbiAgICAgICAgICAgICAgICAgICAgYGZseWluZy1mb29kLW9mLXR5cGUtJHtpZHh9LSR7aX1gXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB0aGlzT25lUGFydGljdWxhckZvb2Quc3R5bGUudG9wID0gKE1hdGgucmFuZG9tKCkgKiAtMzAwKSArIHdpbmRvdy5zY3JvbGxZICsgXCJweFwiO1xuICAgICAgICAgICAgICAgIHRoaXNPbmVQYXJ0aWN1bGFyRm9vZC5zdHlsZS5sZWZ0ID1cbiAgICAgICAgICAgICAgICAgICAgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogd2luZG93LmlubmVyV2lkdGgpICsgXCJweFwiO1xuXG4gICAgICAgICAgICAgICAgbW92ZW1lbnRGdW5jKHRoaXNPbmVQYXJ0aWN1bGFyRm9vZCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgZm9vZENvdW50ZXJzW2lkeF0gKz0gMTA7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDE4OyBpKyspIHtcbiAgICAgICAgICAgIGZvb2RDb3VudGVyc1tpXSA9IDA7XG4gICAgICAgICAgICBhZGRGbHlpbmdGb29kTGlzdGVuZXIoaSk7XG4gICAgICAgIH1cblxuXG5cbiAgICB9XG5cbiAgICBleHBvcnQgZGVmYXVsdCBhZGRBbGxGbHlpbmdGb29kTGlzdGVuZXJzOyIsImV4cG9ydCBjb25zdCByZW5kZXJTbGlkZSA9IChvcHRpb25zLCBzbGlkZSwgaWR4KSA9PiB7XG5cbiAgY29uc3QgaGFuZGxlU2Nyb2xsT250byA9IChlbnRyaWVzLCBvYnNlcnZlcikgPT4ge1xuICAgIGVudHJpZXMuZm9yRWFjaChlbnRyeSA9PiB7XG4gICAgICBpZiAoZW50cnkuaXNJbnRlcnNlY3RpbmcpIHtcblxuICAgICAgICBjb25zb2xlLmxvZyh3aW5kb3cuc2Nyb2xsWSk7XG5cbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLnNsaWRlLXN2Zy0ke2lkeH1gKVxuICAgICAgICAgIC5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZGVuXCIpO1xuXG4gICAgICAgIGxldCBjdXJyZW50U1ZHID0gZDMuc2VsZWN0KGAuc2xpZGUtc3ZnLSR7aWR4fWApO1xuXG4gICAgICAgIGxldCB0b29sdGlwID0gZDNcbiAgICAgICAgICAuc2VsZWN0KFwiYm9keVwiKVxuICAgICAgICAgIC5hcHBlbmQoXCJkaXZcIilcbiAgICAgICAgICAuc3R5bGUoXCJwb3NpdGlvblwiLCBcImFic29sdXRlXCIpXG4gICAgICAgICAgLnN0eWxlKFwiZm9udC1zaXplXCIsIFwiMTJweFwiKVxuICAgICAgICAgIC5zdHlsZShcInotaW5kZXhcIiwgXCIxMFwiKVxuICAgICAgICAgIC5zdHlsZShcInZpc2liaWxpdHlcIiwgXCJoaWRkZW5cIik7XG4gICAgICAgIFxuICAgICAgICBjb25zdCBudXRyaWVudHMgPSBbXCJmaWJlclwiLCBcImlyb25cIiwgXCJtYWduZXNpdW1cIiwgXCJwb3Rhc3NpdW1cIiwgXCJ6aW5jXCIsIFwidml0YW1pbiBDXCIsIFwiZm9sYXRlXCIsIFwidml0YW1pbiBCMTJcIiwgXCJ2aXRhbWluIEFcIiwgXCJ2aXRhbWluIERcIl07XG5cbiAgICAgICAgY3VycmVudFNWR1xuICAgICAgICAgIC5zZWxlY3RBbGwoXCJyZWN0XCIpXG4gICAgICAgICAgLm9uKFwibW91c2VvdmVyXCIsIGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgICAgIHJldHVybiB0b29sdGlwLnN0eWxlKFwidmlzaWJpbGl0eVwiLCBcInZpc2libGVcIik7XG4gICAgICAgICAgfSlcbiAgICAgICAgICAub24oXCJtb3VzZW1vdmVcIiwgZnVuY3Rpb24oZCwgaSkge1xuICAgICAgICAgICAgcmV0dXJuIHRvb2x0aXBcbiAgICAgICAgICAgICAgLnN0eWxlKFwidG9wXCIsIGV2ZW50LnBhZ2VZIC0gNjAgKyBcInB4XCIpXG4gICAgICAgICAgICAgIC5zdHlsZShcImxlZnRcIiwgZXZlbnQucGFnZVggLSAzMCArIFwicHhcIilcbiAgICAgICAgICAgICAgLnN0eWxlKFwiYmFja2dyb3VuZC1jb2xvclwiLCBcIndoaXRlXCIpXG4gICAgICAgICAgICAgIC5zdHlsZShcImJvcmRlclwiLCBcIjJweCBzb2xpZCBibGFja1wiKVxuICAgICAgICAgICAgICAuc3R5bGUoXCJwYWRkaW5nXCIsIFwiNXB4XCIpXG4gICAgICAgICAgICAgIC5zdHlsZShcImJvcmRlci1yYWRpdXNcIiwgXCIzcHhcIilcbiAgICAgICAgICAgICAgLnRleHQoYCR7bnV0cmllbnRzW2ldfTogJHtkfSVgKTtcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5vbihcIm1vdXNlb3V0XCIsIGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgICAgIHJldHVybiB0b29sdGlwLnN0eWxlKFwidmlzaWJpbGl0eVwiLCBcImhpZGRlblwiKTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLnNsaWRlLXN2Zy0ke2lkeCAtIDF9YCkpIHtcbiAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuc2xpZGUtc3ZnLSR7aWR4IC0gMX1gKVxuICAgICAgICAgIC5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC5zbGlkZS1zdmctJHtpZHggKyAxfWApKSB7XG4gICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLnNsaWRlLXN2Zy0ke2lkeCArIDF9YClcbiAgICAgICAgICAuY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYC5zbGlkZS1zdmctJHtpZHh9LXJlY3RgKS5mb3JFYWNoKHJlY3QgPT4ge1xuICAgICAgICAgIC8vIHJlY3QuY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKTtcbiAgICAgICAgICByZWN0LmNsYXNzTGlzdC5hZGQoXCJjaGFydC1yZWN0XCIpO1xuICAgICAgICB9KTtcblxuICAgICAgICBkMy5zZWxlY3QoYC5zbGlkZS1zdmctJHtpZHh9LXktYXhpc2ApXG4gICAgICAgICAgLnRyYW5zaXRpb24oKVxuICAgICAgICAgIC5zdHlsZShcIm9wYWNpdHlcIiwgXCIxMDAlXCIpXG4gICAgICAgICAgLmR1cmF0aW9uKDUwMCk7XG5cbiAgICAgICAgbGV0IG5hdkNpcmNsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBuYXYtbGktJHtpZHh9YCk7XG4gICAgICAgIG5hdkNpcmNsZS5jbGFzc0xpc3QuYWRkKGBuYXYtbGktJHtpZHh9YCk7XG5cblxuXG4gICAgICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGAuc2xpZGUtc3ZnLSR7aWR4IC0gMX0tcmVjdGApKSB7XG4gICAgICAgICAgICBkb2N1bWVudFxuICAgICAgICAgICAgICAucXVlcnlTZWxlY3RvckFsbChgLnNsaWRlLXN2Zy0ke2lkeCAtIDF9LXJlY3RgKVxuICAgICAgICAgICAgICAuZm9yRWFjaChyZWN0ID0+IHtcbiAgICAgICAgICAgICAgICAvLyByZWN0LmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XG4gICAgICAgICAgICAgICAgcmVjdC5jbGFzc0xpc3QucmVtb3ZlKFwiY2hhcnQtcmVjdFwiKTtcbiAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGQzLnNlbGVjdChgLnNsaWRlLXN2Zy0ke2lkeCAtIDF9LXktYXhpc2ApXG4gICAgICAgICAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgICAgICAgICAgLnN0eWxlKFwib3BhY2l0eVwiLCBcIjAlXCIpXG4gICAgICAgICAgICAgIC5kdXJhdGlvbig1MDApO1xuICAgICAgICAgICAgXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYG5hdi1saS0ke2lkeCAtIDF9YCkpIHtcbiAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgbmF2LWxpLSR7aWR4IC0gMX1gKS5jbGFzc0xpc3QucmVtb3ZlKGBuYXYtbGktJHtpZHggLSAxfWApO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYC5zbGlkZS1zdmctJHtpZHggKyAxfS1yZWN0YCkpIHtcbiAgICAgICAgICAgIGRvY3VtZW50XG4gICAgICAgICAgICAgIC5xdWVyeVNlbGVjdG9yQWxsKGAuc2xpZGUtc3ZnLSR7aWR4ICsgMX0tcmVjdGApXG4gICAgICAgICAgICAgIC5mb3JFYWNoKHJlY3QgPT4ge1xuICAgICAgICAgICAgICAgIHJlY3QuY2xhc3NMaXN0LnJlbW92ZShcImNoYXJ0LXJlY3RcIik7XG4gICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBkMy5zZWxlY3QoYC5zbGlkZS1zdmctJHtpZHggKyAxfS15LWF4aXNgKVxuICAgICAgICAgICAgICAudHJhbnNpdGlvbigpXG4gICAgICAgICAgICAgIC5zdHlsZShcIm9wYWNpdHlcIiwgXCIwJVwiKVxuICAgICAgICAgICAgICAuZHVyYXRpb24oNTAwKTtcblxuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYG5hdi1saS0ke2lkeCArIDF9YCkuY2xhc3NMaXN0LnJlbW92ZShgbmF2LWxpLSR7aWR4ICsgMX1gKTsgICAgICAgICAgICAgIFxuICAgICAgICB9XG5cbiAgICAgICAgICBcbiAgICAgIH1cbiAgICB9KTtcbiAgfTtcblxuICBsZXQgb2JzZXJ2ZXIgPSBuZXcgSW50ZXJzZWN0aW9uT2JzZXJ2ZXIoaGFuZGxlU2Nyb2xsT250bywgb3B0aW9ucyk7XG4gIG9ic2VydmVyLm9ic2VydmUoc2xpZGUpO1xuXG59IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luIl0sInNvdXJjZVJvb3QiOiIifQ==