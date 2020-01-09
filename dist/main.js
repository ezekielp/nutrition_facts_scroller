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
    vitamin_c: +d["Vitamin C"],
    folate: +d["Folate"],
    vitamin_b12: +d["Vitamin B-12"],
    vitamin_a: +d["Vitamin A"],
    vitamin_d: +d["Vitamin D"],
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
    var upwardMove, downwardMove;
    var bananaIcon = document.getElementById("banana-svg-container");
    var bananaIconPos = {
      top: bananaIcon.getBoundingClientRect().top,
      left: bananaIcon.getBoundingClientRect().left
    };

    var movementFunc = function movementFunc(newBanana) {
      var newBananaPos = {
        top: newBanana.getBoundingClientRect().top,
        left: newBanana.getBoundingClientRect().left
      };

      var frameUpward = function frameUpward() {
        if (newBananaPos.left > 350) {
          clearInterval(upwardMove);
          downwardMove = setInterval(frameDownward, 3);
        } else {
          newBananaPos.top -= Math.floor(Math.random() * 5);
          newBananaPos.left += Math.floor(Math.random() * 8);
          newBanana.style.top = newBananaPos.top + "px";
          newBanana.style.left = newBananaPos.left + "px";
        }
      };

      upwardMove = setInterval(frameUpward, 3);

      var frameDownward = function frameDownward() {
        if (newBananaPos.top > 1500) {
          clearInterval(downwardMove);
        } else {
          newBananaPos.top += Math.floor(Math.random() * 5);
          newBananaPos.left += Math.floor(Math.random() * 8);
          newBanana.style.top = newBananaPos.top + "px";
          newBanana.style.left = newBananaPos.left + "px";
        }
      };
    };

    var i = bananaCounter;
    bananaCounter += 1;
    var newBanana = document.createElement("div");
    newBanana.setAttribute('id', "flying-banana-".concat(i));
    newBanana.classList.add("flying-banana");
    bananaIcon.appendChild(newBanana);
    var thisOneParticularBanana = document.getElementById("flying-banana-".concat(i));
    thisOneParticularBanana.style.top = bananaIconPos.top + "px";
    thisOneParticularBanana.style.left = bananaIconPos.left + "px";
    movementFunc(thisOneParticularBanana);
  });
});

var createObservers = function createObservers(slides) {
  var options = {
    root: null,
    rootMargin: "0px 0px 0px 0px",
    threshold: .3
  };
  _scripts_scroll_slides__WEBPACK_IMPORTED_MODULE_1__["bananaSlide"](options, slides[0]);
  _scripts_scroll_slides__WEBPACK_IMPORTED_MODULE_1__["potatoSlide"](options, slides[1]);
  _scripts_scroll_slides__WEBPACK_IMPORTED_MODULE_1__["butterSlide"](options, slides[2]);
  _scripts_scroll_slides__WEBPACK_IMPORTED_MODULE_1__["avocadoSlide"](options, slides[3]);
};

/***/ }),

/***/ "./src/scripts/scroll/slides.js":
/*!**************************************!*\
  !*** ./src/scripts/scroll/slides.js ***!
  \**************************************/
/*! exports provided: bananaSlide, potatoSlide, butterSlide, avocadoSlide, beefLiverSlide, codLiverSlide, eggSlide, herringSlide, tunaSlide, broccoliSlide, peasSlide, redPepperSlide, oysterSlide, spinachSlide, quinoaSlide, chocolateSlide, strawberrySlide, beanSlide */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "bananaSlide", function() { return bananaSlide; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "potatoSlide", function() { return potatoSlide; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "butterSlide", function() { return butterSlide; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "avocadoSlide", function() { return avocadoSlide; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "beefLiverSlide", function() { return beefLiverSlide; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "codLiverSlide", function() { return codLiverSlide; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "eggSlide", function() { return eggSlide; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "herringSlide", function() { return herringSlide; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tunaSlide", function() { return tunaSlide; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "broccoliSlide", function() { return broccoliSlide; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "peasSlide", function() { return peasSlide; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "redPepperSlide", function() { return redPepperSlide; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "oysterSlide", function() { return oysterSlide; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spinachSlide", function() { return spinachSlide; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "quinoaSlide", function() { return quinoaSlide; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "chocolateSlide", function() { return chocolateSlide; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "strawberrySlide", function() { return strawberrySlide; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "beanSlide", function() { return beanSlide; });
var bananaSlide = function bananaSlide(options, slide) {
  var handleBananaScrollOnto = function handleBananaScrollOnto(entries, observer) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var bananaRects = document.querySelectorAll(".slide-svg-0-rect");
        bananaRects.forEach(function (rect) {
          rect.classList.remove("hidden");
        });
        var potatoRects = document.querySelectorAll(".slide-svg-1-rect");
        potatoRects.forEach(function (rect) {
          rect.classList.add("hidden");
        });
        d3.select(".slide-svg-0-y-axis").transition().style("opacity", "100%").duration(500);
        d3.select(".slide-svg-1-y-axis").transition().style("opacity", "0%").duration(500);
      }
    });
  };

  var observer = new IntersectionObserver(handleBananaScrollOnto, options);
  observer.observe(slide);
};
var potatoSlide = function potatoSlide(options, slide) {
  var handlePotatoScrollOnto = function handlePotatoScrollOnto(entries, observer) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var potatoRects = document.querySelectorAll(".slide-svg-1-rect");
        potatoRects.forEach(function (rect) {
          rect.classList.remove('hidden');
        });
        var bananaRects = document.querySelectorAll(".slide-svg-0-rect");
        bananaRects.forEach(function (rect) {
          rect.classList.add('hidden');
        });
        var butterRects = document.querySelectorAll(".slide-svg-2-rect");
        butterRects.forEach(function (rect) {
          rect.classList.add('hidden');
        });
        d3.select(".slide-svg-1-y-axis").transition().style("opacity", "100%").duration(500);
        d3.select(".slide-svg-0-y-axis").transition().style("opacity", "0%").duration(500);
        d3.select(".slide-svg-2-y-axis").transition().style("opacity", "0%").duration(500);
      }
    });
  };

  var observer = new IntersectionObserver(handlePotatoScrollOnto, options);
  observer.observe(slide);
};
var butterSlide = function butterSlide(options, slide) {
  var handleButterScrollOnto = function handleButterScrollOnto(entries, observer) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var butterRects = document.querySelectorAll(".slide-svg-2-rect");
        butterRects.forEach(function (rect) {
          rect.classList.remove("hidden");
        });
        var potatoRects = document.querySelectorAll(".slide-svg-1-rect");
        potatoRects.forEach(function (rect) {
          rect.classList.add("hidden");
        });
        var avocadoRects = document.querySelectorAll(".slide-svg-3-rect");
        avocadoRects.forEach(function (rect) {
          rect.classList.add("hidden");
        });
        d3.select(".slide-svg-2-y-axis").transition().style("opacity", "100%").duration(500);
        d3.select(".slide-svg-1-y-axis").transition().style("opacity", "0%").duration(500);
        d3.select(".slide-svg-3-y-axis").transition().style("opacity", "0%").duration(500);
      }
    });
  };

  var observer = new IntersectionObserver(handleButterScrollOnto, options);
  observer.observe(slide);
};
var avocadoSlide = function avocadoSlide(options, slide) {
  var handleAvocadoScrollOnto = function handleAvocadoScrollOnto(entries, observer) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var avocadoRects = document.querySelectorAll(".slide-svg-3-rect");
        avocadoRects.forEach(function (rect) {
          rect.classList.remove("hidden");
        });
        var butterRects = document.querySelectorAll(".slide-svg-2-rect");
        butterRects.forEach(function (rect) {
          rect.classList.add("hidden");
        });
        var beefLiverRects = document.querySelectorAll(".slide-svg-4-rect");
        beefLiverRects.forEach(function (rect) {
          rect.classList.add("hidden");
        });
        d3.select(".slide-svg-3-y-axis").transition().style("opacity", "100%").duration(500);
        d3.select(".slide-svg-2-y-axis").transition().style("opacity", "0%").duration(500);
        d3.select(".slide-svg-4-y-axis").transition().style("opacity", "0%").duration(500);
      }
    });
  };

  var observer = new IntersectionObserver(handleAvocadoScrollOnto, options);
  observer.observe(slide);
};
var beefLiverSlide = function beefLiverSlide(options, slide) {};
var codLiverSlide = function codLiverSlide(options, slide) {};
var eggSlide = function eggSlide(options, slide) {};
var herringSlide = function herringSlide(options, slide) {};
var tunaSlide = function tunaSlide(options, slide) {};
var broccoliSlide = function broccoliSlide(options, slide) {};
var peasSlide = function peasSlide(options, slide) {};
var redPepperSlide = function redPepperSlide(options, slide) {};
var oysterSlide = function oysterSlide(options, slide) {};
var spinachSlide = function spinachSlide(options, slide) {};
var quinoaSlide = function quinoaSlide(options, slide) {};
var chocolateSlide = function chocolateSlide(options, slide) {};
var strawberrySlide = function strawberrySlide(options, slide) {};
var beanSlide = function beanSlide(options, slide) {};

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL3Njcm9sbC9zbGlkZXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0eWxlcy9pbmRleC5zY3NzIl0sIm5hbWVzIjpbIm51dHJpdGlvbkRhdGEiLCJiYW5hbmFDb3VudGVyIiwiZDMiLCJjc3YiLCJkIiwiZm9vZF9uYW1lIiwic2VydmluZ19zaXplIiwiZmliZXIiLCJpcm9uIiwibWFnbmVzaXVtIiwicG90YXNzaXVtIiwiemluYyIsInZpdGFtaW5fYyIsImZvbGF0ZSIsInZpdGFtaW5fYjEyIiwidml0YW1pbl9hIiwidml0YW1pbl9kIiwiY2hvbGVzdGVyb2wiLCJ0aGVuIiwiZGF0YSIsImNvbnNvbGUiLCJsb2ciLCJjcmVhdGVWaXN1YWxpemF0aW9uIiwiaSIsImxlbmd0aCIsImZvb2REYXRhIiwiaWR4IiwiY3JlYXRlWEF4aXNCb29sIiwibWFyZ2luIiwidG9wIiwicmlnaHQiLCJib3R0b20iLCJsZWZ0IiwidyIsImgiLCJPYmplY3QiLCJ2YWx1ZXMiLCJzbGljZSIsIm51bWJlck9mQ29sdW1ucyIsIm1heFZhbHVlIiwiTWF0aCIsIm1heCIsInhfYXhpc0xlbmd0aCIsInlfYXhpc0xlbmd0aCIsInRhcmdldFNWRyIsInRhcmdldFNsaWRlUmVjdCIsInhTY2FsZSIsInNjYWxlTGluZWFyIiwiZG9tYWluIiwicmFuZ2UiLCJ5U2NhbGUiLCJzdmciLCJzZWxlY3QiLCJhcHBlbmQiLCJhdHRyIiwic2VsZWN0QWxsIiwiZW50ZXIiLCJ0cmFuc2l0aW9uIiwiZHVyYXRpb24iLCJ4QXhpcyIsImF4aXNCb3R0b20iLCJ0aWNrU2l6ZSIsInRpY2tGb3JtYXQiLCJrZXlzIiwidW5kZWZpbmVkIiwiY2FsbCIsInlBeGlzIiwiYXhpc0xlZnQiLCJ0aWNrcyIsInN0eWxlIiwid2luZG93IiwiYWRkRXZlbnRMaXN0ZW5lciIsImUiLCJzbGlkZXMiLCJzbGlkZU5hbWUiLCJuZXdTbGlkZSIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsInB1c2giLCJjcmVhdGVPYnNlcnZlcnMiLCJnZXRFbGVtZW50QnlJZCIsInVwd2FyZE1vdmUiLCJkb3dud2FyZE1vdmUiLCJiYW5hbmFJY29uIiwiYmFuYW5hSWNvblBvcyIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsIm1vdmVtZW50RnVuYyIsIm5ld0JhbmFuYSIsIm5ld0JhbmFuYVBvcyIsImZyYW1lVXB3YXJkIiwiY2xlYXJJbnRlcnZhbCIsInNldEludGVydmFsIiwiZnJhbWVEb3dud2FyZCIsImZsb29yIiwicmFuZG9tIiwiY3JlYXRlRWxlbWVudCIsInNldEF0dHJpYnV0ZSIsImNsYXNzTGlzdCIsImFkZCIsImFwcGVuZENoaWxkIiwidGhpc09uZVBhcnRpY3VsYXJCYW5hbmEiLCJvcHRpb25zIiwicm9vdCIsInJvb3RNYXJnaW4iLCJ0aHJlc2hvbGQiLCJTbGlkZXMiLCJiYW5hbmFTbGlkZSIsInNsaWRlIiwiaGFuZGxlQmFuYW5hU2Nyb2xsT250byIsImVudHJpZXMiLCJvYnNlcnZlciIsImZvckVhY2giLCJlbnRyeSIsImlzSW50ZXJzZWN0aW5nIiwiYmFuYW5hUmVjdHMiLCJxdWVyeVNlbGVjdG9yQWxsIiwicmVjdCIsInJlbW92ZSIsInBvdGF0b1JlY3RzIiwiSW50ZXJzZWN0aW9uT2JzZXJ2ZXIiLCJvYnNlcnZlIiwicG90YXRvU2xpZGUiLCJoYW5kbGVQb3RhdG9TY3JvbGxPbnRvIiwiYnV0dGVyUmVjdHMiLCJidXR0ZXJTbGlkZSIsImhhbmRsZUJ1dHRlclNjcm9sbE9udG8iLCJhdm9jYWRvUmVjdHMiLCJhdm9jYWRvU2xpZGUiLCJoYW5kbGVBdm9jYWRvU2Nyb2xsT250byIsImJlZWZMaXZlclJlY3RzIiwiYmVlZkxpdmVyU2xpZGUiLCJjb2RMaXZlclNsaWRlIiwiZWdnU2xpZGUiLCJoZXJyaW5nU2xpZGUiLCJ0dW5hU2xpZGUiLCJicm9jY29saVNsaWRlIiwicGVhc1NsaWRlIiwicmVkUGVwcGVyU2xpZGUiLCJveXN0ZXJTbGlkZSIsInNwaW5hY2hTbGlkZSIsInF1aW5vYVNsaWRlIiwiY2hvY29sYXRlU2xpZGUiLCJzdHJhd2JlcnJ5U2xpZGUiLCJiZWFuU2xpZGUiXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNsRkE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBRUEsSUFBSUEsYUFBSjtBQUNBLElBQUlDLGFBQWEsR0FBRyxDQUFwQjtBQUVBQyxFQUFFLENBQUNDLEdBQUgsQ0FBTyxrQ0FBUCxFQUEyQyxVQUFBQyxDQUFDLEVBQUk7QUFDOUMsU0FBTztBQUNMQyxhQUFTLEVBQUVELENBQUMsQ0FBQyxXQUFELENBRFA7QUFFTEUsZ0JBQVksRUFBRUYsQ0FBQyxDQUFDLFFBQUQsQ0FGVjtBQUdMRyxTQUFLLEVBQUUsQ0FBQ0gsQ0FBQyxDQUFDLE9BQUQsQ0FISjtBQUlMSSxRQUFJLEVBQUUsQ0FBQ0osQ0FBQyxDQUFDLE1BQUQsQ0FKSDtBQUtMSyxhQUFTLEVBQUUsQ0FBQ0wsQ0FBQyxDQUFDLFdBQUQsQ0FMUjtBQU1MTSxhQUFTLEVBQUUsQ0FBQ04sQ0FBQyxDQUFDLFdBQUQsQ0FOUjtBQU9MTyxRQUFJLEVBQUUsQ0FBQ1AsQ0FBQyxDQUFDLE1BQUQsQ0FQSDtBQVFMUSxhQUFTLEVBQUUsQ0FBQ1IsQ0FBQyxDQUFDLFdBQUQsQ0FSUjtBQVNMUyxVQUFNLEVBQUUsQ0FBQ1QsQ0FBQyxDQUFDLFFBQUQsQ0FUTDtBQVVMVSxlQUFXLEVBQUUsQ0FBQ1YsQ0FBQyxDQUFDLGNBQUQsQ0FWVjtBQVdMVyxhQUFTLEVBQUUsQ0FBQ1gsQ0FBQyxDQUFDLFdBQUQsQ0FYUjtBQVlMWSxhQUFTLEVBQUUsQ0FBQ1osQ0FBQyxDQUFDLFdBQUQsQ0FaUjtBQWFMYSxlQUFXLEVBQUUsQ0FBQ2IsQ0FBQyxDQUFDLGFBQUQ7QUFiVixHQUFQO0FBZUQsQ0FoQkQsRUFnQkdjLElBaEJILENBZ0JRLFVBQUFDLElBQUksRUFBSTtBQUNabkIsZUFBYSxHQUFHbUIsSUFBaEI7QUFDQUMsU0FBTyxDQUFDQyxHQUFSLENBQVlyQixhQUFaO0FBRUFzQixxQkFBbUIsQ0FBQ3RCLGFBQWEsQ0FBQyxDQUFELENBQWQsRUFBbUIsQ0FBbkIsRUFBc0IsSUFBdEIsQ0FBbkI7O0FBRUEsT0FBSyxJQUFJdUIsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBR3ZCLGFBQWEsQ0FBQ3dCLE1BQWxDLEVBQTBDRCxDQUFDLEVBQTNDLEVBQStDO0FBQzNDRCx1QkFBbUIsQ0FBQ3RCLGFBQWEsQ0FBQ3VCLENBQUQsQ0FBZCxFQUFtQkEsQ0FBbkIsQ0FBbkI7QUFDSDtBQUVKLENBMUJEOztBQTRCQSxJQUFNRCxtQkFBbUIsR0FBRyxTQUF0QkEsbUJBQXNCLENBQUNHLFFBQUQsRUFBV0MsR0FBWCxFQUFnQkMsZUFBaEIsRUFBb0M7QUFDOUQsTUFBSUMsTUFBTSxHQUFHO0FBQUNDLE9BQUcsRUFBRSxFQUFOO0FBQVVDLFNBQUssRUFBRSxFQUFqQjtBQUFxQkMsVUFBTSxFQUFFLEVBQTdCO0FBQWlDQyxRQUFJLEVBQUU7QUFBdkMsR0FBYjtBQUNBLE1BQUlDLENBQUMsR0FBRyxNQUFNTCxNQUFNLENBQUNJLElBQWIsR0FBb0JKLE1BQU0sQ0FBQ0UsS0FBbkM7QUFDQSxNQUFJSSxDQUFDLEdBQUcsTUFBTU4sTUFBTSxDQUFDQyxHQUFiLEdBQW1CRCxNQUFNLENBQUNHLE1BQWxDO0FBRUEsTUFBSVosSUFBSSxHQUFHZ0IsTUFBTSxDQUFDQyxNQUFQLENBQWNYLFFBQWQsRUFBd0JZLEtBQXhCLENBQThCLENBQTlCLEVBQWlDLENBQUMsQ0FBbEMsQ0FBWDtBQUNBLE1BQUlDLGVBQWUsR0FBRyxFQUF0QjtBQUNBLE1BQUlDLFFBQVEsR0FBR0MsSUFBSSxDQUFDQyxHQUFMLENBQVMsR0FBVCxFQUFjdkMsRUFBRSxDQUFDdUMsR0FBSCxDQUFPdEIsSUFBUCxFQUFhLFVBQVNmLENBQVQsRUFBWTtBQUNwRCxXQUFRLENBQUNBLENBQUQsR0FBSyxHQUFiO0FBQ0QsR0FGNEIsQ0FBZCxDQUFmO0FBR0EsTUFBSXNDLFlBQVksR0FBR1QsQ0FBbkI7QUFDQSxNQUFJVSxZQUFZLEdBQUdULENBQW5CO0FBQ0EsTUFBSVUsU0FBUyxHQUFHLGVBQWVsQixHQUEvQjtBQUNBLE1BQUltQixlQUFlLEdBQUcsZUFBZW5CLEdBQWYsR0FBcUIsT0FBM0M7QUFFQSxNQUFJb0IsTUFBTSxHQUFHNUMsRUFBRSxDQUNaNkMsV0FEVSxHQUVWQyxNQUZVLENBRUgsQ0FBQyxDQUFELEVBQUlWLGVBQUosQ0FGRyxFQUdWVyxLQUhVLENBR0osQ0FBQyxDQUFELEVBQUloQixDQUFKLENBSEksQ0FBYjtBQUtBLE1BQUlpQixNQUFNLEdBQUdoRCxFQUFFLENBQ1o2QyxXQURVLEdBRVZDLE1BRlUsQ0FFSCxDQUFDLENBQUQsRUFBSVQsUUFBSixDQUZHLEVBR1ZVLEtBSFUsQ0FHSixDQUFDZixDQUFDLEdBQUdOLE1BQU0sQ0FBQ0MsR0FBWixFQUFpQkQsTUFBTSxDQUFDRyxNQUF4QixDQUhJLENBQWI7QUFLQSxNQUFJb0IsR0FBRyxHQUFHakQsRUFBRSxDQUNUa0QsTUFETyxDQUNBLE1BREEsRUFFUEMsTUFGTyxDQUVBLEtBRkEsRUFHUEMsSUFITyxDQUdGLE9BSEUsRUFHT3JCLENBQUMsR0FBR0wsTUFBTSxDQUFDSSxJQUFYLEdBQWtCSixNQUFNLENBQUNFLEtBSGhDLEVBSVB3QixJQUpPLENBSUYsUUFKRSxFQUlRcEIsQ0FBQyxHQUFHTixNQUFNLENBQUNDLEdBQVgsR0FBaUJELE1BQU0sQ0FBQ0csTUFKaEMsQ0FBVjtBQU1Bb0IsS0FBRyxDQUNBSSxTQURILENBQ2EsTUFEYixFQUVHcEMsSUFGSCxDQUVRQSxJQUZSLEVBR0dxQyxLQUhILEdBSUdILE1BSkgsQ0FJVSxNQUpWLEVBS0dDLElBTEgsQ0FLUSxPQUxSLFlBS29CVCxlQUxwQix5QkFNR1MsSUFOSCxDQU1RLEdBTlIsRUFNYSxVQUFTbEQsQ0FBVCxFQUFZbUIsQ0FBWixFQUFlO0FBQ3hCLFdBQU9BLENBQUMsSUFBSW1CLFlBQVksR0FBR0osZUFBbkIsQ0FBRCxHQUF1Q1YsTUFBTSxDQUFDSSxJQUE5QyxHQUFxRCxFQUE1RDtBQUNELEdBUkgsRUFTR3NCLElBVEgsQ0FTUSxHQVRSLEVBU2EsVUFBU2xELENBQVQsRUFBWTtBQUNyQixXQUFPOEMsTUFBTSxDQUFDOUMsQ0FBQyxHQUFHLEdBQUwsQ0FBYjtBQUNELEdBWEgsRUFZR2tELElBWkgsQ0FZUSxPQVpSLEVBWWlCWixZQUFZLEdBQUdKLGVBQWYsR0FBaUMsQ0FabEQsRUFhR2dCLElBYkgsQ0FhUSxRQWJSLEVBYWtCLFVBQVNsRCxDQUFULEVBQVk7QUFDMUIsV0FBTzhCLENBQUMsR0FBR2dCLE1BQU0sQ0FBQzlDLENBQUMsR0FBRyxHQUFMLENBQVYsR0FBc0J3QixNQUFNLENBQUNDLEdBQXBDO0FBQ0YsR0FmRixFQWdCR3lCLElBaEJILENBZ0JRLE1BaEJSLEVBZ0JnQixLQWhCaEIsRUFpQkdHLFVBakJILEdBa0JHQyxRQWxCSCxDQWtCWSxHQWxCWjtBQW9CRSxNQUFJQyxLQUFLLEdBQUd6RCxFQUFFLENBQ0QwRCxVQURELENBQ1lkLE1BRFosRUFFQ2UsUUFGRCxDQUVVLENBRlYsRUFHQ0MsVUFIRCxDQUdZLFVBQVMxRCxDQUFULEVBQVk7QUFDcEIsV0FBTytCLE1BQU0sQ0FBQzRCLElBQVAsQ0FBWXRDLFFBQVosRUFBc0JZLEtBQXRCLENBQTRCLENBQTVCLEVBQStCLENBQUMsQ0FBaEMsRUFBbUNqQyxDQUFuQyxDQUFQO0FBQ0gsR0FMRCxDQUFaOztBQVFBLE1BQUl1QixlQUFlLEtBQUtxQyxTQUF4QixFQUFtQztBQUMvQmIsT0FBRyxDQUNFRSxNQURMLENBQ1ksR0FEWixFQUVLQyxJQUZMLENBRVUsT0FGVixZQUVzQlYsU0FGdEIscUJBR0tVLElBSEwsQ0FHVSxXQUhWLEVBR3VCLGVBQWUxQixNQUFNLENBQUNJLElBQXRCLEdBQTZCLElBQTdCLElBQXFDRSxDQUFDLEdBQUdOLE1BQU0sQ0FBQ0MsR0FBaEQsSUFBdUQsR0FIOUUsRUFJSzRCLFVBSkwsR0FLS0MsUUFMTCxDQUtjLElBTGQsRUFNS08sSUFOTCxDQU1VTixLQU5WO0FBUUFSLE9BQUcsQ0FBQ0ksU0FBSixDQUFjLGNBQWQsRUFDS0QsSUFETCxDQUNVLFdBRFYsRUFDdUIsVUFBU2xELENBQVQsRUFBWTtBQUMzQixhQUFPLDhCQUFQO0FBQ0gsS0FITDtBQUlIOztBQUdELE1BQUk4RCxLQUFLLEdBQUdoRSxFQUFFLENBQUNpRSxRQUFILENBQVlqQixNQUFaLEVBQW9Ca0IsS0FBcEIsQ0FBMEIsQ0FBMUIsRUFBNkIsR0FBN0IsQ0FBWjtBQUVBakIsS0FBRyxDQUNBRSxNQURILENBQ1UsR0FEVixFQUVHQyxJQUZILENBRVEsT0FGUixZQUVvQlYsU0FGcEIscUJBR0dVLElBSEgsQ0FHUSxXQUhSLEVBR3FCLGVBQWUxQixNQUFNLENBQUNJLElBQXRCLEdBQTZCLEtBSGxELEVBSUdxQyxLQUpILENBSVMsU0FKVCxFQUlvQixJQUpwQixFQUtHSixJQUxILENBS1FDLEtBTFI7QUFPSCxDQXBGRDs7QUFzRkFJLE1BQU0sQ0FBQ0MsZ0JBQVAsQ0FBd0IsTUFBeEIsRUFBZ0MsVUFBQ0MsQ0FBRCxFQUFPO0FBRW5DLE1BQUlDLE1BQU0sR0FBRyxFQUFiOztBQUNBLE9BQUssSUFBSWxELENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUcsRUFBcEIsRUFBd0JBLENBQUMsRUFBekIsRUFBNkI7QUFDekIsUUFBSW1ELFNBQVMsR0FBRyxzQkFBc0JuRCxDQUF0QztBQUNBLFFBQUlvRCxRQUFRLEdBQUdDLFFBQVEsQ0FBQ0MsYUFBVCxDQUF1QkgsU0FBdkIsQ0FBZjtBQUNBRCxVQUFNLENBQUNLLElBQVAsQ0FBWUgsUUFBWjtBQUNIOztBQUNESSxpQkFBZSxDQUFDTixNQUFELENBQWY7QUFDSCxDQVRELEVBU0csS0FUSDtBQVlBRyxRQUFRLENBQUNMLGdCQUFULENBQTBCLGtCQUExQixFQUE4QyxZQUFNO0FBRWhESyxVQUFRLENBQ0xJLGNBREgsQ0FDa0Isc0JBRGxCLEVBRUdULGdCQUZILENBRW9CLE9BRnBCLEVBRTZCLFVBQUFDLENBQUMsRUFBSTtBQUU5QixRQUFJUyxVQUFKLEVBQWdCQyxZQUFoQjtBQUVBLFFBQUlDLFVBQVUsR0FBR1AsUUFBUSxDQUFDSSxjQUFULENBQ2Isc0JBRGEsQ0FBakI7QUFHQSxRQUFJSSxhQUFhLEdBQUc7QUFDaEJ2RCxTQUFHLEVBQUVzRCxVQUFVLENBQUNFLHFCQUFYLEdBQW1DeEQsR0FEeEI7QUFFaEJHLFVBQUksRUFBRW1ELFVBQVUsQ0FBQ0UscUJBQVgsR0FBbUNyRDtBQUZ6QixLQUFwQjs7QUFLQSxRQUFJc0QsWUFBWSxHQUFHLFNBQWZBLFlBQWUsQ0FBQUMsU0FBUyxFQUFJO0FBQzlCLFVBQUlDLFlBQVksR0FBRztBQUNqQjNELFdBQUcsRUFBRTBELFNBQVMsQ0FBQ0YscUJBQVYsR0FBa0N4RCxHQUR0QjtBQUVqQkcsWUFBSSxFQUFFdUQsU0FBUyxDQUFDRixxQkFBVixHQUFrQ3JEO0FBRnZCLE9BQW5COztBQUtBLFVBQUl5RCxXQUFXLEdBQUcsU0FBZEEsV0FBYyxHQUFNO0FBQ3BCLFlBQUlELFlBQVksQ0FBQ3hELElBQWIsR0FBb0IsR0FBeEIsRUFBNkI7QUFDM0IwRCx1QkFBYSxDQUFDVCxVQUFELENBQWI7QUFDQUMsc0JBQVksR0FBR1MsV0FBVyxDQUFDQyxhQUFELEVBQWdCLENBQWhCLENBQTFCO0FBQ0QsU0FIRCxNQUdPO0FBQ0xKLHNCQUFZLENBQUMzRCxHQUFiLElBQW9CVyxJQUFJLENBQUNxRCxLQUFMLENBQVdyRCxJQUFJLENBQUNzRCxNQUFMLEtBQWdCLENBQTNCLENBQXBCO0FBQ0FOLHNCQUFZLENBQUN4RCxJQUFiLElBQXFCUSxJQUFJLENBQUNxRCxLQUFMLENBQVdyRCxJQUFJLENBQUNzRCxNQUFMLEtBQWdCLENBQTNCLENBQXJCO0FBRUFQLG1CQUFTLENBQUNsQixLQUFWLENBQWdCeEMsR0FBaEIsR0FBc0IyRCxZQUFZLENBQUMzRCxHQUFiLEdBQW1CLElBQXpDO0FBQ0EwRCxtQkFBUyxDQUFDbEIsS0FBVixDQUFnQnJDLElBQWhCLEdBQXVCd0QsWUFBWSxDQUFDeEQsSUFBYixHQUFvQixJQUEzQztBQUNEO0FBQ0osT0FYRDs7QUFhRWlELGdCQUFVLEdBQUdVLFdBQVcsQ0FBQ0YsV0FBRCxFQUFjLENBQWQsQ0FBeEI7O0FBRUYsVUFBSUcsYUFBYSxHQUFHLFNBQWhCQSxhQUFnQixHQUFNO0FBQ3hCLFlBQUlKLFlBQVksQ0FBQzNELEdBQWIsR0FBbUIsSUFBdkIsRUFBNkI7QUFDM0I2RCx1QkFBYSxDQUFDUixZQUFELENBQWI7QUFDRCxTQUZELE1BRU87QUFDTE0sc0JBQVksQ0FBQzNELEdBQWIsSUFBb0JXLElBQUksQ0FBQ3FELEtBQUwsQ0FBV3JELElBQUksQ0FBQ3NELE1BQUwsS0FBZ0IsQ0FBM0IsQ0FBcEI7QUFDQU4sc0JBQVksQ0FBQ3hELElBQWIsSUFBcUJRLElBQUksQ0FBQ3FELEtBQUwsQ0FBV3JELElBQUksQ0FBQ3NELE1BQUwsS0FBZ0IsQ0FBM0IsQ0FBckI7QUFFQVAsbUJBQVMsQ0FBQ2xCLEtBQVYsQ0FBZ0J4QyxHQUFoQixHQUFzQjJELFlBQVksQ0FBQzNELEdBQWIsR0FBbUIsSUFBekM7QUFDQTBELG1CQUFTLENBQUNsQixLQUFWLENBQWdCckMsSUFBaEIsR0FBdUJ3RCxZQUFZLENBQUN4RCxJQUFiLEdBQW9CLElBQTNDO0FBQ0Q7QUFDRixPQVZEO0FBV0QsS0FoQ0Q7O0FBa0NBLFFBQUlULENBQUMsR0FBR3RCLGFBQVI7QUFDQUEsaUJBQWEsSUFBSSxDQUFqQjtBQUNBLFFBQUlzRixTQUFTLEdBQUdYLFFBQVEsQ0FBQ21CLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBaEI7QUFDQVIsYUFBUyxDQUFDUyxZQUFWLENBQXVCLElBQXZCLDBCQUE4Q3pFLENBQTlDO0FBQ0FnRSxhQUFTLENBQUNVLFNBQVYsQ0FBb0JDLEdBQXBCO0FBQ0FmLGNBQVUsQ0FBQ2dCLFdBQVgsQ0FBdUJaLFNBQXZCO0FBR0EsUUFBSWEsdUJBQXVCLEdBQUd4QixRQUFRLENBQUNJLGNBQVQseUJBQ1R6RCxDQURTLEVBQTlCO0FBR0E2RSwyQkFBdUIsQ0FBQy9CLEtBQXhCLENBQThCeEMsR0FBOUIsR0FBb0N1RCxhQUFhLENBQUN2RCxHQUFkLEdBQW9CLElBQXhEO0FBQ0F1RSwyQkFBdUIsQ0FBQy9CLEtBQXhCLENBQThCckMsSUFBOUIsR0FBcUNvRCxhQUFhLENBQUNwRCxJQUFkLEdBQXFCLElBQTFEO0FBRUFzRCxnQkFBWSxDQUFDYyx1QkFBRCxDQUFaO0FBQ0QsR0EvREg7QUFpRUgsQ0FuRUQ7O0FBc0VBLElBQU1yQixlQUFlLEdBQUcsU0FBbEJBLGVBQWtCLENBQUNOLE1BQUQsRUFBWTtBQUVoQyxNQUFJNEIsT0FBTyxHQUFHO0FBQ1pDLFFBQUksRUFBRSxJQURNO0FBRVpDLGNBQVUsRUFBRSxpQkFGQTtBQUdaQyxhQUFTLEVBQUU7QUFIQyxHQUFkO0FBT0FDLG9FQUFBLENBQW1CSixPQUFuQixFQUE0QjVCLE1BQU0sQ0FBQyxDQUFELENBQWxDO0FBQ0FnQyxvRUFBQSxDQUFtQkosT0FBbkIsRUFBNEI1QixNQUFNLENBQUMsQ0FBRCxDQUFsQztBQUNBZ0Msb0VBQUEsQ0FBbUJKLE9BQW5CLEVBQTRCNUIsTUFBTSxDQUFDLENBQUQsQ0FBbEM7QUFDQWdDLHFFQUFBLENBQW9CSixPQUFwQixFQUE2QjVCLE1BQU0sQ0FBQyxDQUFELENBQW5DO0FBRUgsQ0FkRCxDOzs7Ozs7Ozs7Ozs7QUMxTUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBTyxJQUFNaUMsV0FBVyxHQUFHLFNBQWRBLFdBQWMsQ0FBQ0wsT0FBRCxFQUFVTSxLQUFWLEVBQW9CO0FBRTdDLE1BQU1DLHNCQUFzQixHQUFHLFNBQXpCQSxzQkFBeUIsQ0FBQ0MsT0FBRCxFQUFVQyxRQUFWLEVBQXVCO0FBQ3BERCxXQUFPLENBQUNFLE9BQVIsQ0FBZ0IsVUFBQUMsS0FBSyxFQUFJO0FBQ3ZCLFVBQUlBLEtBQUssQ0FBQ0MsY0FBVixFQUEwQjtBQUV4QixZQUFJQyxXQUFXLEdBQUd0QyxRQUFRLENBQUN1QyxnQkFBVCxxQkFBbEI7QUFDQUQsbUJBQVcsQ0FBQ0gsT0FBWixDQUFvQixVQUFBSyxJQUFJLEVBQUk7QUFDeEJBLGNBQUksQ0FBQ25CLFNBQUwsQ0FBZW9CLE1BQWYsQ0FBc0IsUUFBdEI7QUFDSCxTQUZEO0FBSUEsWUFBSUMsV0FBVyxHQUFHMUMsUUFBUSxDQUFDdUMsZ0JBQVQscUJBQWxCO0FBQ0FHLG1CQUFXLENBQUNQLE9BQVosQ0FBb0IsVUFBQUssSUFBSSxFQUFJO0FBQ3hCQSxjQUFJLENBQUNuQixTQUFMLENBQWVDLEdBQWYsQ0FBbUIsUUFBbkI7QUFDSCxTQUZEO0FBSUFoRyxVQUFFLENBQUNrRCxNQUFILENBQVUscUJBQVYsRUFDS0ssVUFETCxHQUVLWSxLQUZMLENBRVcsU0FGWCxFQUVzQixNQUZ0QixFQUdLWCxRQUhMLENBR2MsR0FIZDtBQUtBeEQsVUFBRSxDQUFDa0QsTUFBSCxDQUFVLHFCQUFWLEVBQ0tLLFVBREwsR0FFS1ksS0FGTCxDQUVXLFNBRlgsRUFFc0IsSUFGdEIsRUFHS1gsUUFITCxDQUdjLEdBSGQ7QUFJRDtBQUNGLEtBdkJEO0FBd0JELEdBekJEOztBQTJCQSxNQUFJb0QsUUFBUSxHQUFHLElBQUlTLG9CQUFKLENBQXlCWCxzQkFBekIsRUFBaURQLE9BQWpELENBQWY7QUFDQVMsVUFBUSxDQUFDVSxPQUFULENBQWlCYixLQUFqQjtBQUNELENBL0JNO0FBaUNBLElBQU1jLFdBQVcsR0FBRyxTQUFkQSxXQUFjLENBQUNwQixPQUFELEVBQVVNLEtBQVYsRUFBb0I7QUFFN0MsTUFBTWUsc0JBQXNCLEdBQUcsU0FBekJBLHNCQUF5QixDQUFDYixPQUFELEVBQVVDLFFBQVYsRUFBdUI7QUFDcERELFdBQU8sQ0FBQ0UsT0FBUixDQUFnQixVQUFBQyxLQUFLLEVBQUk7QUFDdkIsVUFBSUEsS0FBSyxDQUFDQyxjQUFWLEVBQTBCO0FBRXhCLFlBQUlLLFdBQVcsR0FBRzFDLFFBQVEsQ0FBQ3VDLGdCQUFULHFCQUFsQjtBQUNBRyxtQkFBVyxDQUFDUCxPQUFaLENBQW9CLFVBQUFLLElBQUksRUFBSTtBQUN4QkEsY0FBSSxDQUFDbkIsU0FBTCxDQUFlb0IsTUFBZixDQUFzQixRQUF0QjtBQUNILFNBRkQ7QUFJQSxZQUFJSCxXQUFXLEdBQUd0QyxRQUFRLENBQUN1QyxnQkFBVCxxQkFBbEI7QUFDQUQsbUJBQVcsQ0FBQ0gsT0FBWixDQUFvQixVQUFBSyxJQUFJLEVBQUk7QUFDeEJBLGNBQUksQ0FBQ25CLFNBQUwsQ0FBZUMsR0FBZixDQUFtQixRQUFuQjtBQUNILFNBRkQ7QUFJQSxZQUFJeUIsV0FBVyxHQUFHL0MsUUFBUSxDQUFDdUMsZ0JBQVQscUJBQWxCO0FBQ0FRLG1CQUFXLENBQUNaLE9BQVosQ0FBb0IsVUFBQUssSUFBSSxFQUFJO0FBQ3hCQSxjQUFJLENBQUNuQixTQUFMLENBQWVDLEdBQWYsQ0FBbUIsUUFBbkI7QUFDSCxTQUZEO0FBSUFoRyxVQUFFLENBQUNrRCxNQUFILENBQVUscUJBQVYsRUFDR0ssVUFESCxHQUVHWSxLQUZILENBRVMsU0FGVCxFQUVvQixNQUZwQixFQUdHWCxRQUhILENBR1ksR0FIWjtBQUtBeEQsVUFBRSxDQUFDa0QsTUFBSCxDQUFVLHFCQUFWLEVBQ0dLLFVBREgsR0FFR1ksS0FGSCxDQUVTLFNBRlQsRUFFb0IsSUFGcEIsRUFHR1gsUUFISCxDQUdZLEdBSFo7QUFLRXhELFVBQUUsQ0FBQ2tELE1BQUgsQ0FBVSxxQkFBVixFQUNDSyxVQURELEdBRUNZLEtBRkQsQ0FFTyxTQUZQLEVBRWtCLElBRmxCLEVBR0NYLFFBSEQsQ0FHVSxHQUhWO0FBSUg7QUFDRixLQWpDRDtBQWtDRCxHQW5DRDs7QUFxQ0EsTUFBSW9ELFFBQVEsR0FBRyxJQUFJUyxvQkFBSixDQUF5Qkcsc0JBQXpCLEVBQWlEckIsT0FBakQsQ0FBZjtBQUNBUyxVQUFRLENBQUNVLE9BQVQsQ0FBaUJiLEtBQWpCO0FBRUQsQ0ExQ007QUE0Q0EsSUFBTWlCLFdBQVcsR0FBRyxTQUFkQSxXQUFjLENBQUN2QixPQUFELEVBQVVNLEtBQVYsRUFBb0I7QUFFN0MsTUFBTWtCLHNCQUFzQixHQUFHLFNBQXpCQSxzQkFBeUIsQ0FBQ2hCLE9BQUQsRUFBVUMsUUFBVixFQUF1QjtBQUNwREQsV0FBTyxDQUFDRSxPQUFSLENBQWdCLFVBQUFDLEtBQUssRUFBSTtBQUN2QixVQUFJQSxLQUFLLENBQUNDLGNBQVYsRUFBMEI7QUFDdEIsWUFBSVUsV0FBVyxHQUFHL0MsUUFBUSxDQUFDdUMsZ0JBQVQscUJBQWxCO0FBQ0FRLG1CQUFXLENBQUNaLE9BQVosQ0FBb0IsVUFBQUssSUFBSSxFQUFJO0FBQzFCQSxjQUFJLENBQUNuQixTQUFMLENBQWVvQixNQUFmLENBQXNCLFFBQXRCO0FBQ0QsU0FGRDtBQUlGLFlBQUlDLFdBQVcsR0FBRzFDLFFBQVEsQ0FBQ3VDLGdCQUFULHFCQUFsQjtBQUNBRyxtQkFBVyxDQUFDUCxPQUFaLENBQW9CLFVBQUFLLElBQUksRUFBSTtBQUMxQkEsY0FBSSxDQUFDbkIsU0FBTCxDQUFlQyxHQUFmLENBQW1CLFFBQW5CO0FBQ0QsU0FGRDtBQUlBLFlBQUk0QixZQUFZLEdBQUdsRCxRQUFRLENBQUN1QyxnQkFBVCxxQkFBbkI7QUFDQVcsb0JBQVksQ0FBQ2YsT0FBYixDQUFxQixVQUFBSyxJQUFJLEVBQUk7QUFDM0JBLGNBQUksQ0FBQ25CLFNBQUwsQ0FBZUMsR0FBZixDQUFtQixRQUFuQjtBQUNELFNBRkQ7QUFLQWhHLFVBQUUsQ0FBQ2tELE1BQUgsQ0FBVSxxQkFBVixFQUNHSyxVQURILEdBRUdZLEtBRkgsQ0FFUyxTQUZULEVBRW9CLE1BRnBCLEVBR0dYLFFBSEgsQ0FHWSxHQUhaO0FBS0F4RCxVQUFFLENBQUNrRCxNQUFILENBQVUscUJBQVYsRUFDR0ssVUFESCxHQUVHWSxLQUZILENBRVMsU0FGVCxFQUVvQixJQUZwQixFQUdHWCxRQUhILENBR1ksR0FIWjtBQUtBeEQsVUFBRSxDQUFDa0QsTUFBSCxDQUFVLHFCQUFWLEVBQ0dLLFVBREgsR0FFR1ksS0FGSCxDQUVTLFNBRlQsRUFFb0IsSUFGcEIsRUFHR1gsUUFISCxDQUdZLEdBSFo7QUFJRDtBQUNGLEtBakNEO0FBa0NELEdBbkNEOztBQXFDQSxNQUFJb0QsUUFBUSxHQUFHLElBQUlTLG9CQUFKLENBQXlCTSxzQkFBekIsRUFBaUR4QixPQUFqRCxDQUFmO0FBQ0FTLFVBQVEsQ0FBQ1UsT0FBVCxDQUFpQmIsS0FBakI7QUFFRCxDQTFDTTtBQTRDQSxJQUFNb0IsWUFBWSxHQUFHLFNBQWZBLFlBQWUsQ0FBQzFCLE9BQUQsRUFBVU0sS0FBVixFQUFvQjtBQUU5QyxNQUFNcUIsdUJBQXVCLEdBQUcsU0FBMUJBLHVCQUEwQixDQUFDbkIsT0FBRCxFQUFVQyxRQUFWLEVBQXVCO0FBQ3JERCxXQUFPLENBQUNFLE9BQVIsQ0FBZ0IsVUFBQUMsS0FBSyxFQUFJO0FBQ3ZCLFVBQUlBLEtBQUssQ0FBQ0MsY0FBVixFQUEwQjtBQUV4QixZQUFJYSxZQUFZLEdBQUdsRCxRQUFRLENBQUN1QyxnQkFBVCxxQkFBbkI7QUFDQVcsb0JBQVksQ0FBQ2YsT0FBYixDQUFxQixVQUFBSyxJQUFJLEVBQUk7QUFDN0JBLGNBQUksQ0FBQ25CLFNBQUwsQ0FBZW9CLE1BQWYsQ0FBc0IsUUFBdEI7QUFDQyxTQUZEO0FBSUEsWUFBSU0sV0FBVyxHQUFHL0MsUUFBUSxDQUFDdUMsZ0JBQVQscUJBQWxCO0FBQ0FRLG1CQUFXLENBQUNaLE9BQVosQ0FBb0IsVUFBQUssSUFBSSxFQUFJO0FBQzFCQSxjQUFJLENBQUNuQixTQUFMLENBQWVDLEdBQWYsQ0FBbUIsUUFBbkI7QUFDRCxTQUZEO0FBSUEsWUFBSStCLGNBQWMsR0FBR3JELFFBQVEsQ0FBQ3VDLGdCQUFULHFCQUFyQjtBQUNBYyxzQkFBYyxDQUFDbEIsT0FBZixDQUF1QixVQUFBSyxJQUFJLEVBQUk7QUFDN0JBLGNBQUksQ0FBQ25CLFNBQUwsQ0FBZUMsR0FBZixDQUFtQixRQUFuQjtBQUNELFNBRkQ7QUFLQWhHLFVBQUUsQ0FBQ2tELE1BQUgsQ0FBVSxxQkFBVixFQUNHSyxVQURILEdBRUdZLEtBRkgsQ0FFUyxTQUZULEVBRW9CLE1BRnBCLEVBR0dYLFFBSEgsQ0FHWSxHQUhaO0FBS0F4RCxVQUFFLENBQUNrRCxNQUFILENBQVUscUJBQVYsRUFDR0ssVUFESCxHQUVHWSxLQUZILENBRVMsU0FGVCxFQUVvQixJQUZwQixFQUdHWCxRQUhILENBR1ksR0FIWjtBQUtBeEQsVUFBRSxDQUFDa0QsTUFBSCxDQUFVLHFCQUFWLEVBQ0dLLFVBREgsR0FFR1ksS0FGSCxDQUVTLFNBRlQsRUFFb0IsSUFGcEIsRUFHR1gsUUFISCxDQUdZLEdBSFo7QUFJRDtBQUNGLEtBbENEO0FBbUNELEdBcENEOztBQXNDQSxNQUFJb0QsUUFBUSxHQUFHLElBQUlTLG9CQUFKLENBQXlCUyx1QkFBekIsRUFBa0QzQixPQUFsRCxDQUFmO0FBQ0FTLFVBQVEsQ0FBQ1UsT0FBVCxDQUFpQmIsS0FBakI7QUFDRCxDQTFDTTtBQTZDQSxJQUFNdUIsY0FBYyxHQUFHLFNBQWpCQSxjQUFpQixDQUFDN0IsT0FBRCxFQUFVTSxLQUFWLEVBQW9CLENBSWpELENBSk07QUFNQSxJQUFNd0IsYUFBYSxHQUFHLFNBQWhCQSxhQUFnQixDQUFDOUIsT0FBRCxFQUFVTSxLQUFWLEVBQW9CLENBSWhELENBSk07QUFNQSxJQUFNeUIsUUFBUSxHQUFHLFNBQVhBLFFBQVcsQ0FBQy9CLE9BQUQsRUFBVU0sS0FBVixFQUFvQixDQUkzQyxDQUpNO0FBTUEsSUFBTTBCLFlBQVksR0FBRyxTQUFmQSxZQUFlLENBQUNoQyxPQUFELEVBQVVNLEtBQVYsRUFBb0IsQ0FJL0MsQ0FKTTtBQU1BLElBQU0yQixTQUFTLEdBQUcsU0FBWkEsU0FBWSxDQUFDakMsT0FBRCxFQUFVTSxLQUFWLEVBQW9CLENBSTVDLENBSk07QUFNQSxJQUFNNEIsYUFBYSxHQUFHLFNBQWhCQSxhQUFnQixDQUFDbEMsT0FBRCxFQUFVTSxLQUFWLEVBQW9CLENBSWhELENBSk07QUFNQSxJQUFNNkIsU0FBUyxHQUFHLFNBQVpBLFNBQVksQ0FBQ25DLE9BQUQsRUFBVU0sS0FBVixFQUFvQixDQUk1QyxDQUpNO0FBTUEsSUFBTThCLGNBQWMsR0FBRyxTQUFqQkEsY0FBaUIsQ0FBQ3BDLE9BQUQsRUFBVU0sS0FBVixFQUFvQixDQUlqRCxDQUpNO0FBTUEsSUFBTStCLFdBQVcsR0FBRyxTQUFkQSxXQUFjLENBQUNyQyxPQUFELEVBQVVNLEtBQVYsRUFBb0IsQ0FJOUMsQ0FKTTtBQU1BLElBQU1nQyxZQUFZLEdBQUcsU0FBZkEsWUFBZSxDQUFDdEMsT0FBRCxFQUFVTSxLQUFWLEVBQW9CLENBSS9DLENBSk07QUFNQSxJQUFNaUMsV0FBVyxHQUFHLFNBQWRBLFdBQWMsQ0FBQ3ZDLE9BQUQsRUFBVU0sS0FBVixFQUFvQixDQUk5QyxDQUpNO0FBTUEsSUFBTWtDLGNBQWMsR0FBRyxTQUFqQkEsY0FBaUIsQ0FBQ3hDLE9BQUQsRUFBVU0sS0FBVixFQUFvQixDQUlqRCxDQUpNO0FBTUEsSUFBTW1DLGVBQWUsR0FBRyxTQUFsQkEsZUFBa0IsQ0FBQ3pDLE9BQUQsRUFBVU0sS0FBVixFQUFvQixDQUlsRCxDQUpNO0FBTUEsSUFBTW9DLFNBQVMsR0FBRyxTQUFaQSxTQUFZLENBQUMxQyxPQUFELEVBQVVNLEtBQVYsRUFBb0IsQ0FJNUMsQ0FKTSxDOzs7Ozs7Ozs7OztBQ3BQUCx1QyIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvZGlzdC9cIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXguanNcIik7XG4iLCJpbXBvcnQgJy4vc3R5bGVzL2luZGV4LnNjc3MnO1xuaW1wb3J0ICogYXMgU2xpZGVzIGZyb20gJy4vc2NyaXB0cy9zY3JvbGwvc2xpZGVzJztcblxubGV0IG51dHJpdGlvbkRhdGE7XG5sZXQgYmFuYW5hQ291bnRlciA9IDA7XG5cbmQzLmNzdihcIm51dHJpdGlvbl9mYWN0c19mb3Jfc2Nyb2xsZXIuY3N2XCIsIGQgPT4ge1xuICByZXR1cm4ge1xuICAgIGZvb2RfbmFtZTogZFtcIkZvb2QgbmFtZVwiXSxcbiAgICBzZXJ2aW5nX3NpemU6IGRbXCJBbW91bnRcIl0sXG4gICAgZmliZXI6ICtkW1wiRmliZXJcIl0sXG4gICAgaXJvbjogK2RbXCJJcm9uXCJdLFxuICAgIG1hZ25lc2l1bTogK2RbXCJNYWduZXNpdW1cIl0sXG4gICAgcG90YXNzaXVtOiArZFtcIlBvdGFzc2l1bVwiXSxcbiAgICB6aW5jOiArZFtcIlppbmNcIl0sXG4gICAgdml0YW1pbl9jOiArZFtcIlZpdGFtaW4gQ1wiXSxcbiAgICBmb2xhdGU6ICtkW1wiRm9sYXRlXCJdLFxuICAgIHZpdGFtaW5fYjEyOiArZFtcIlZpdGFtaW4gQi0xMlwiXSxcbiAgICB2aXRhbWluX2E6ICtkW1wiVml0YW1pbiBBXCJdLFxuICAgIHZpdGFtaW5fZDogK2RbXCJWaXRhbWluIERcIl0sXG4gICAgY2hvbGVzdGVyb2w6ICtkW1wiQ2hvbGVzdGVyb2xcIl1cbiAgfTtcbn0pLnRoZW4oZGF0YSA9PiB7XG4gICAgbnV0cml0aW9uRGF0YSA9IGRhdGE7XG4gICAgY29uc29sZS5sb2cobnV0cml0aW9uRGF0YSk7XG4gICAgXG4gICAgY3JlYXRlVmlzdWFsaXphdGlvbihudXRyaXRpb25EYXRhWzBdLCAwLCB0cnVlKTtcblxuICAgIGZvciAobGV0IGkgPSAxOyBpIDwgbnV0cml0aW9uRGF0YS5sZW5ndGg7IGkrKykge1xuICAgICAgICBjcmVhdGVWaXN1YWxpemF0aW9uKG51dHJpdGlvbkRhdGFbaV0sIGkpO1xuICAgIH1cblxufSk7XG5cbmNvbnN0IGNyZWF0ZVZpc3VhbGl6YXRpb24gPSAoZm9vZERhdGEsIGlkeCwgY3JlYXRlWEF4aXNCb29sKSA9PiB7XG4gIGxldCBtYXJnaW4gPSB7dG9wOiA0MCwgcmlnaHQ6IDQwLCBib3R0b206IDY1LCBsZWZ0OiA1MH1cbiAgbGV0IHcgPSA3MDAgLSBtYXJnaW4ubGVmdCAtIG1hcmdpbi5yaWdodDtcbiAgbGV0IGggPSA2MDAgLSBtYXJnaW4udG9wIC0gbWFyZ2luLmJvdHRvbTtcblxuICBsZXQgZGF0YSA9IE9iamVjdC52YWx1ZXMoZm9vZERhdGEpLnNsaWNlKDIsIC0xKTtcbiAgbGV0IG51bWJlck9mQ29sdW1ucyA9IDEwO1xuICBsZXQgbWF4VmFsdWUgPSBNYXRoLm1heCguNTAsIGQzLm1heChkYXRhLCBmdW5jdGlvbihkKSB7XG4gICAgcmV0dXJuICgrZCAvIDEwMCk7XG4gIH0pKTtcbiAgbGV0IHhfYXhpc0xlbmd0aCA9IHc7XG4gIGxldCB5X2F4aXNMZW5ndGggPSBoO1xuICBsZXQgdGFyZ2V0U1ZHID0gXCJzbGlkZS1zdmctXCIgKyBpZHg7XG4gIGxldCB0YXJnZXRTbGlkZVJlY3QgPSBcInNsaWRlLXN2Zy1cIiArIGlkeCArIFwiLXJlY3RcIjtcblxuICBsZXQgeFNjYWxlID0gZDNcbiAgICAuc2NhbGVMaW5lYXIoKVxuICAgIC5kb21haW4oWzAsIG51bWJlck9mQ29sdW1uc10pXG4gICAgLnJhbmdlKFswLCB3XSk7XG5cbiAgbGV0IHlTY2FsZSA9IGQzXG4gICAgLnNjYWxlTGluZWFyKClcbiAgICAuZG9tYWluKFswLCBtYXhWYWx1ZV0pXG4gICAgLnJhbmdlKFtoIC0gbWFyZ2luLnRvcCwgbWFyZ2luLmJvdHRvbV0pO1xuXG4gIGxldCBzdmcgPSBkM1xuICAgIC5zZWxlY3QoXCIjdmlzXCIpXG4gICAgLmFwcGVuZChcInN2Z1wiKVxuICAgIC5hdHRyKFwid2lkdGhcIiwgdyArIG1hcmdpbi5sZWZ0ICsgbWFyZ2luLnJpZ2h0KVxuICAgIC5hdHRyKFwiaGVpZ2h0XCIsIGggKyBtYXJnaW4udG9wICsgbWFyZ2luLmJvdHRvbSk7XG5cbiAgc3ZnXG4gICAgLnNlbGVjdEFsbChcInJlY3RcIilcbiAgICAuZGF0YShkYXRhKVxuICAgIC5lbnRlcigpXG4gICAgLmFwcGVuZChcInJlY3RcIilcbiAgICAuYXR0cihcImNsYXNzXCIsIGAke3RhcmdldFNsaWRlUmVjdH0gaGlkZGVuIGNoYXJ0LXJlY3RgKVxuICAgIC5hdHRyKFwieFwiLCBmdW5jdGlvbihkLCBpKSB7XG4gICAgICByZXR1cm4gaSAqICh4X2F4aXNMZW5ndGggLyBudW1iZXJPZkNvbHVtbnMpICsgbWFyZ2luLmxlZnQgKyAxMDtcbiAgICB9KVxuICAgIC5hdHRyKFwieVwiLCBmdW5jdGlvbihkKSB7XG4gICAgICByZXR1cm4geVNjYWxlKGQgLyAxMDApO1xuICAgIH0pXG4gICAgLmF0dHIoXCJ3aWR0aFwiLCB4X2F4aXNMZW5ndGggLyBudW1iZXJPZkNvbHVtbnMgLSAxKVxuICAgIC5hdHRyKFwiaGVpZ2h0XCIsIGZ1bmN0aW9uKGQpIHtcbiAgICAgIHJldHVybiBoIC0geVNjYWxlKGQgLyAxMDApIC0gbWFyZ2luLnRvcDtcbiAgIH0pXG4gICAgLmF0dHIoXCJmaWxsXCIsIFwicmVkXCIpXG4gICAgLnRyYW5zaXRpb24oKVxuICAgIC5kdXJhdGlvbig1MDApO1xuXG4gICAgbGV0IHhBeGlzID0gZDNcbiAgICAgICAgICAgICAgICAuYXhpc0JvdHRvbSh4U2NhbGUpXG4gICAgICAgICAgICAgICAgLnRpY2tTaXplKDApXG4gICAgICAgICAgICAgICAgLnRpY2tGb3JtYXQoZnVuY3Rpb24oZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gT2JqZWN0LmtleXMoZm9vZERhdGEpLnNsaWNlKDIsIC0xKVtkXTtcbiAgICAgICAgICAgICAgICB9KTtcblxuXG4gICAgaWYgKGNyZWF0ZVhBeGlzQm9vbCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHN2Z1xuICAgICAgICAgICAgLmFwcGVuZChcImdcIilcbiAgICAgICAgICAgIC5hdHRyKFwiY2xhc3NcIiwgYCR7dGFyZ2V0U1ZHfS14LWF4aXMgeC1heGlzYClcbiAgICAgICAgICAgIC5hdHRyKFwidHJhbnNmb3JtXCIsIFwidHJhbnNsYXRlKFwiICsgbWFyZ2luLmxlZnQgKyBcIiwgXCIgKyAoaCAtIG1hcmdpbi50b3ApICsgXCIpXCIpXG4gICAgICAgICAgICAudHJhbnNpdGlvbigpXG4gICAgICAgICAgICAuZHVyYXRpb24oMTAwMClcbiAgICAgICAgICAgIC5jYWxsKHhBeGlzKVxuICAgIFxuICAgICAgICBzdmcuc2VsZWN0QWxsKFwiLngtYXhpcyB0ZXh0XCIpXG4gICAgICAgICAgICAuYXR0cihcInRyYW5zZm9ybVwiLCBmdW5jdGlvbihkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFwidHJhbnNsYXRlKDI1LCAyNSlyb3RhdGUoLTQ1KVwiOyBcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuXG4gICAgbGV0IHlBeGlzID0gZDMuYXhpc0xlZnQoeVNjYWxlKS50aWNrcyg0LCBcIiVcIik7XG5cbiAgICBzdmdcbiAgICAgIC5hcHBlbmQoXCJnXCIpXG4gICAgICAuYXR0cihcImNsYXNzXCIsIGAke3RhcmdldFNWR30teS1heGlzIHktYXhpc2ApXG4gICAgICAuYXR0cihcInRyYW5zZm9ybVwiLCBcInRyYW5zbGF0ZShcIiArIG1hcmdpbi5sZWZ0ICsgXCIsMClcIilcbiAgICAgIC5zdHlsZShcIm9wYWNpdHlcIiwgXCIwJVwiKVxuICAgICAgLmNhbGwoeUF4aXMpO1xuXG59O1xuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgKGUpID0+IHtcbiAgICBcbiAgICBsZXQgc2xpZGVzID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxOTsgaSsrKSB7XG4gICAgICAgIGxldCBzbGlkZU5hbWUgPSBcIiNzbGlkZS1jb250YWluZXItXCIgKyBpO1xuICAgICAgICBsZXQgbmV3U2xpZGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNsaWRlTmFtZSk7XG4gICAgICAgIHNsaWRlcy5wdXNoKG5ld1NsaWRlKTtcbiAgICB9XG4gICAgY3JlYXRlT2JzZXJ2ZXJzKHNsaWRlcyk7XG59LCBmYWxzZSk7XG5cblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgKCkgPT4ge1xuXG4gICAgZG9jdW1lbnRcbiAgICAgIC5nZXRFbGVtZW50QnlJZChcImJhbmFuYS1zdmctY29udGFpbmVyXCIpXG4gICAgICAuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGUgPT4ge1xuXG4gICAgICAgIGxldCB1cHdhcmRNb3ZlLCBkb3dud2FyZE1vdmU7XG5cbiAgICAgICAgbGV0IGJhbmFuYUljb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcbiAgICAgICAgICAgIFwiYmFuYW5hLXN2Zy1jb250YWluZXJcIlxuICAgICAgICApO1xuICAgICAgICBsZXQgYmFuYW5hSWNvblBvcyA9IHtcbiAgICAgICAgICAgIHRvcDogYmFuYW5hSWNvbi5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3AsXG4gICAgICAgICAgICBsZWZ0OiBiYW5hbmFJY29uLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmxlZnRcbiAgICAgICAgfTtcblxuICAgICAgICBsZXQgbW92ZW1lbnRGdW5jID0gbmV3QmFuYW5hID0+IHtcbiAgICAgICAgICBsZXQgbmV3QmFuYW5hUG9zID0ge1xuICAgICAgICAgICAgdG9wOiBuZXdCYW5hbmEuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wLFxuICAgICAgICAgICAgbGVmdDogbmV3QmFuYW5hLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmxlZnRcbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgbGV0IGZyYW1lVXB3YXJkID0gKCkgPT4ge1xuICAgICAgICAgICAgICBpZiAobmV3QmFuYW5hUG9zLmxlZnQgPiAzNTApIHtcbiAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKHVwd2FyZE1vdmUpO1xuICAgICAgICAgICAgICAgIGRvd253YXJkTW92ZSA9IHNldEludGVydmFsKGZyYW1lRG93bndhcmQsIDMpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG5ld0JhbmFuYVBvcy50b3AgLT0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogNSk7XG4gICAgICAgICAgICAgICAgbmV3QmFuYW5hUG9zLmxlZnQgKz0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogOCk7XG5cbiAgICAgICAgICAgICAgICBuZXdCYW5hbmEuc3R5bGUudG9wID0gbmV3QmFuYW5hUG9zLnRvcCArIFwicHhcIjtcbiAgICAgICAgICAgICAgICBuZXdCYW5hbmEuc3R5bGUubGVmdCA9IG5ld0JhbmFuYVBvcy5sZWZ0ICsgXCJweFwiO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgICB1cHdhcmRNb3ZlID0gc2V0SW50ZXJ2YWwoZnJhbWVVcHdhcmQsIDMpO1xuXG4gICAgICAgICAgbGV0IGZyYW1lRG93bndhcmQgPSAoKSA9PiB7XG4gICAgICAgICAgICBpZiAobmV3QmFuYW5hUG9zLnRvcCA+IDE1MDApIHtcbiAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChkb3dud2FyZE1vdmUpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgbmV3QmFuYW5hUG9zLnRvcCArPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiA1KTtcbiAgICAgICAgICAgICAgbmV3QmFuYW5hUG9zLmxlZnQgKz0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogOCk7XG5cbiAgICAgICAgICAgICAgbmV3QmFuYW5hLnN0eWxlLnRvcCA9IG5ld0JhbmFuYVBvcy50b3AgKyBcInB4XCI7XG4gICAgICAgICAgICAgIG5ld0JhbmFuYS5zdHlsZS5sZWZ0ID0gbmV3QmFuYW5hUG9zLmxlZnQgKyBcInB4XCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfTtcbiAgICAgICAgfTtcblxuICAgICAgICBsZXQgaSA9IGJhbmFuYUNvdW50ZXI7XG4gICAgICAgIGJhbmFuYUNvdW50ZXIgKz0gMTtcbiAgICAgICAgbGV0IG5ld0JhbmFuYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIG5ld0JhbmFuYS5zZXRBdHRyaWJ1dGUoJ2lkJywgYGZseWluZy1iYW5hbmEtJHtpfWApO1xuICAgICAgICBuZXdCYW5hbmEuY2xhc3NMaXN0LmFkZChgZmx5aW5nLWJhbmFuYWApO1xuICAgICAgICBiYW5hbmFJY29uLmFwcGVuZENoaWxkKG5ld0JhbmFuYSk7XG5cblxuICAgICAgICBsZXQgdGhpc09uZVBhcnRpY3VsYXJCYW5hbmEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcbiAgICAgICAgICAgIGBmbHlpbmctYmFuYW5hLSR7aX1gXG4gICAgICAgICk7XG4gICAgICAgIHRoaXNPbmVQYXJ0aWN1bGFyQmFuYW5hLnN0eWxlLnRvcCA9IGJhbmFuYUljb25Qb3MudG9wICsgXCJweFwiO1xuICAgICAgICB0aGlzT25lUGFydGljdWxhckJhbmFuYS5zdHlsZS5sZWZ0ID0gYmFuYW5hSWNvblBvcy5sZWZ0ICsgXCJweFwiO1xuXG4gICAgICAgIG1vdmVtZW50RnVuYyh0aGlzT25lUGFydGljdWxhckJhbmFuYSk7XG4gICAgICB9KTtcblxufSlcblxuXG5jb25zdCBjcmVhdGVPYnNlcnZlcnMgPSAoc2xpZGVzKSA9PiB7XG4gICAgXG4gICAgbGV0IG9wdGlvbnMgPSB7XG4gICAgICByb290OiBudWxsLFxuICAgICAgcm9vdE1hcmdpbjogXCIwcHggMHB4IDBweCAwcHhcIixcbiAgICAgIHRocmVzaG9sZDogLjNcbiAgICB9O1xuXG4gICAgXG4gICAgU2xpZGVzLmJhbmFuYVNsaWRlKG9wdGlvbnMsIHNsaWRlc1swXSk7XG4gICAgU2xpZGVzLnBvdGF0b1NsaWRlKG9wdGlvbnMsIHNsaWRlc1sxXSk7XG4gICAgU2xpZGVzLmJ1dHRlclNsaWRlKG9wdGlvbnMsIHNsaWRlc1syXSk7XG4gICAgU2xpZGVzLmF2b2NhZG9TbGlkZShvcHRpb25zLCBzbGlkZXNbM10pO1xuXG59XG4iLCJleHBvcnQgY29uc3QgYmFuYW5hU2xpZGUgPSAob3B0aW9ucywgc2xpZGUpID0+IHtcblxuICBjb25zdCBoYW5kbGVCYW5hbmFTY3JvbGxPbnRvID0gKGVudHJpZXMsIG9ic2VydmVyKSA9PiB7XG4gICAgZW50cmllcy5mb3JFYWNoKGVudHJ5ID0+IHtcbiAgICAgIGlmIChlbnRyeS5pc0ludGVyc2VjdGluZykge1xuICAgICAgICBcbiAgICAgICAgbGV0IGJhbmFuYVJlY3RzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgLnNsaWRlLXN2Zy0wLXJlY3RgKTtcbiAgICAgICAgYmFuYW5hUmVjdHMuZm9yRWFjaChyZWN0ID0+IHtcbiAgICAgICAgICAgIHJlY3QuY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKTtcbiAgICAgICAgfSk7XG4gICAgICAgIFxuICAgICAgICBsZXQgcG90YXRvUmVjdHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGAuc2xpZGUtc3ZnLTEtcmVjdGApO1xuICAgICAgICBwb3RhdG9SZWN0cy5mb3JFYWNoKHJlY3QgPT4ge1xuICAgICAgICAgICAgcmVjdC5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xuICAgICAgICB9KTtcblxuICAgICAgICBkMy5zZWxlY3QoXCIuc2xpZGUtc3ZnLTAteS1heGlzXCIpXG4gICAgICAgICAgICAudHJhbnNpdGlvbigpXG4gICAgICAgICAgICAuc3R5bGUoXCJvcGFjaXR5XCIsIFwiMTAwJVwiKVxuICAgICAgICAgICAgLmR1cmF0aW9uKDUwMCk7ICAgICAgICBcblxuICAgICAgICBkMy5zZWxlY3QoXCIuc2xpZGUtc3ZnLTEteS1heGlzXCIpXG4gICAgICAgICAgICAudHJhbnNpdGlvbigpXG4gICAgICAgICAgICAuc3R5bGUoXCJvcGFjaXR5XCIsIFwiMCVcIilcbiAgICAgICAgICAgIC5kdXJhdGlvbig1MDApO1xuICAgICAgfVxuICAgIH0pO1xuICB9O1xuXG4gIGxldCBvYnNlcnZlciA9IG5ldyBJbnRlcnNlY3Rpb25PYnNlcnZlcihoYW5kbGVCYW5hbmFTY3JvbGxPbnRvLCBvcHRpb25zKTtcbiAgb2JzZXJ2ZXIub2JzZXJ2ZShzbGlkZSk7XG59O1xuXG5leHBvcnQgY29uc3QgcG90YXRvU2xpZGUgPSAob3B0aW9ucywgc2xpZGUpID0+IHtcblxuICBjb25zdCBoYW5kbGVQb3RhdG9TY3JvbGxPbnRvID0gKGVudHJpZXMsIG9ic2VydmVyKSA9PiB7XG4gICAgZW50cmllcy5mb3JFYWNoKGVudHJ5ID0+IHtcbiAgICAgIGlmIChlbnRyeS5pc0ludGVyc2VjdGluZykge1xuXG4gICAgICAgIGxldCBwb3RhdG9SZWN0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYC5zbGlkZS1zdmctMS1yZWN0YCk7XG4gICAgICAgIHBvdGF0b1JlY3RzLmZvckVhY2gocmVjdCA9PiB7XG4gICAgICAgICAgICByZWN0LmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpO1xuICAgICAgICB9KTtcblxuICAgICAgICBsZXQgYmFuYW5hUmVjdHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGAuc2xpZGUtc3ZnLTAtcmVjdGApO1xuICAgICAgICBiYW5hbmFSZWN0cy5mb3JFYWNoKHJlY3QgPT4ge1xuICAgICAgICAgICAgcmVjdC5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgbGV0IGJ1dHRlclJlY3RzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgLnNsaWRlLXN2Zy0yLXJlY3RgKTtcbiAgICAgICAgYnV0dGVyUmVjdHMuZm9yRWFjaChyZWN0ID0+IHtcbiAgICAgICAgICAgIHJlY3QuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7XG4gICAgICAgIH0pO1xuICAgICAgICBcbiAgICAgICAgZDMuc2VsZWN0KFwiLnNsaWRlLXN2Zy0xLXktYXhpc1wiKVxuICAgICAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgICAgICAuc3R5bGUoXCJvcGFjaXR5XCIsIFwiMTAwJVwiKVxuICAgICAgICAgIC5kdXJhdGlvbig1MDApOyAgICAgICAgXG5cbiAgICAgICAgZDMuc2VsZWN0KFwiLnNsaWRlLXN2Zy0wLXktYXhpc1wiKVxuICAgICAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgICAgICAuc3R5bGUoXCJvcGFjaXR5XCIsIFwiMCVcIilcbiAgICAgICAgICAuZHVyYXRpb24oNTAwKTtcblxuICAgICAgICAgIGQzLnNlbGVjdChcIi5zbGlkZS1zdmctMi15LWF4aXNcIilcbiAgICAgICAgICAudHJhbnNpdGlvbigpXG4gICAgICAgICAgLnN0eWxlKFwib3BhY2l0eVwiLCBcIjAlXCIpXG4gICAgICAgICAgLmR1cmF0aW9uKDUwMCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH07XG5cbiAgbGV0IG9ic2VydmVyID0gbmV3IEludGVyc2VjdGlvbk9ic2VydmVyKGhhbmRsZVBvdGF0b1Njcm9sbE9udG8sIG9wdGlvbnMpO1xuICBvYnNlcnZlci5vYnNlcnZlKHNsaWRlKTtcblxufVxuXG5leHBvcnQgY29uc3QgYnV0dGVyU2xpZGUgPSAob3B0aW9ucywgc2xpZGUpID0+IHtcblxuICBjb25zdCBoYW5kbGVCdXR0ZXJTY3JvbGxPbnRvID0gKGVudHJpZXMsIG9ic2VydmVyKSA9PiB7XG4gICAgZW50cmllcy5mb3JFYWNoKGVudHJ5ID0+IHtcbiAgICAgIGlmIChlbnRyeS5pc0ludGVyc2VjdGluZykge1xuICAgICAgICAgIGxldCBidXR0ZXJSZWN0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYC5zbGlkZS1zdmctMi1yZWN0YCk7XG4gICAgICAgICAgYnV0dGVyUmVjdHMuZm9yRWFjaChyZWN0ID0+IHtcbiAgICAgICAgICAgIHJlY3QuY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICBsZXQgcG90YXRvUmVjdHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGAuc2xpZGUtc3ZnLTEtcmVjdGApO1xuICAgICAgICBwb3RhdG9SZWN0cy5mb3JFYWNoKHJlY3QgPT4ge1xuICAgICAgICAgIHJlY3QuY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgbGV0IGF2b2NhZG9SZWN0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYC5zbGlkZS1zdmctMy1yZWN0YCk7XG4gICAgICAgIGF2b2NhZG9SZWN0cy5mb3JFYWNoKHJlY3QgPT4ge1xuICAgICAgICAgIHJlY3QuY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcbiAgICAgICAgfSk7XG5cblxuICAgICAgICBkMy5zZWxlY3QoXCIuc2xpZGUtc3ZnLTIteS1heGlzXCIpXG4gICAgICAgICAgLnRyYW5zaXRpb24oKVxuICAgICAgICAgIC5zdHlsZShcIm9wYWNpdHlcIiwgXCIxMDAlXCIpXG4gICAgICAgICAgLmR1cmF0aW9uKDUwMCk7XG5cbiAgICAgICAgZDMuc2VsZWN0KFwiLnNsaWRlLXN2Zy0xLXktYXhpc1wiKVxuICAgICAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgICAgICAuc3R5bGUoXCJvcGFjaXR5XCIsIFwiMCVcIilcbiAgICAgICAgICAuZHVyYXRpb24oNTAwKTtcblxuICAgICAgICBkMy5zZWxlY3QoXCIuc2xpZGUtc3ZnLTMteS1heGlzXCIpXG4gICAgICAgICAgLnRyYW5zaXRpb24oKVxuICAgICAgICAgIC5zdHlsZShcIm9wYWNpdHlcIiwgXCIwJVwiKVxuICAgICAgICAgIC5kdXJhdGlvbig1MDApO1xuICAgICAgfVxuICAgIH0pO1xuICB9O1xuXG4gIGxldCBvYnNlcnZlciA9IG5ldyBJbnRlcnNlY3Rpb25PYnNlcnZlcihoYW5kbGVCdXR0ZXJTY3JvbGxPbnRvLCBvcHRpb25zKTtcbiAgb2JzZXJ2ZXIub2JzZXJ2ZShzbGlkZSk7XG5cbn1cblxuZXhwb3J0IGNvbnN0IGF2b2NhZG9TbGlkZSA9IChvcHRpb25zLCBzbGlkZSkgPT4ge1xuXG4gIGNvbnN0IGhhbmRsZUF2b2NhZG9TY3JvbGxPbnRvID0gKGVudHJpZXMsIG9ic2VydmVyKSA9PiB7XG4gICAgZW50cmllcy5mb3JFYWNoKGVudHJ5ID0+IHtcbiAgICAgIGlmIChlbnRyeS5pc0ludGVyc2VjdGluZykge1xuXG4gICAgICAgIGxldCBhdm9jYWRvUmVjdHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGAuc2xpZGUtc3ZnLTMtcmVjdGApO1xuICAgICAgICBhdm9jYWRvUmVjdHMuZm9yRWFjaChyZWN0ID0+IHtcbiAgICAgICAgcmVjdC5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZGVuXCIpO1xuICAgICAgICB9KTtcblxuICAgICAgICBsZXQgYnV0dGVyUmVjdHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGAuc2xpZGUtc3ZnLTItcmVjdGApO1xuICAgICAgICBidXR0ZXJSZWN0cy5mb3JFYWNoKHJlY3QgPT4ge1xuICAgICAgICAgIHJlY3QuY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgbGV0IGJlZWZMaXZlclJlY3RzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgLnNsaWRlLXN2Zy00LXJlY3RgKTtcbiAgICAgICAgYmVlZkxpdmVyUmVjdHMuZm9yRWFjaChyZWN0ID0+IHtcbiAgICAgICAgICByZWN0LmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XG4gICAgICAgIH0pO1xuXG5cbiAgICAgICAgZDMuc2VsZWN0KFwiLnNsaWRlLXN2Zy0zLXktYXhpc1wiKVxuICAgICAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgICAgICAuc3R5bGUoXCJvcGFjaXR5XCIsIFwiMTAwJVwiKVxuICAgICAgICAgIC5kdXJhdGlvbig1MDApO1xuXG4gICAgICAgIGQzLnNlbGVjdChcIi5zbGlkZS1zdmctMi15LWF4aXNcIilcbiAgICAgICAgICAudHJhbnNpdGlvbigpXG4gICAgICAgICAgLnN0eWxlKFwib3BhY2l0eVwiLCBcIjAlXCIpXG4gICAgICAgICAgLmR1cmF0aW9uKDUwMCk7XG5cbiAgICAgICAgZDMuc2VsZWN0KFwiLnNsaWRlLXN2Zy00LXktYXhpc1wiKVxuICAgICAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgICAgICAuc3R5bGUoXCJvcGFjaXR5XCIsIFwiMCVcIilcbiAgICAgICAgICAuZHVyYXRpb24oNTAwKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfTtcblxuICBsZXQgb2JzZXJ2ZXIgPSBuZXcgSW50ZXJzZWN0aW9uT2JzZXJ2ZXIoaGFuZGxlQXZvY2Fkb1Njcm9sbE9udG8sIG9wdGlvbnMpO1xuICBvYnNlcnZlci5vYnNlcnZlKHNsaWRlKTtcbn07ICAgIFxuXG5cbmV4cG9ydCBjb25zdCBiZWVmTGl2ZXJTbGlkZSA9IChvcHRpb25zLCBzbGlkZSkgPT4ge1xuXG5cblxufVxuXG5leHBvcnQgY29uc3QgY29kTGl2ZXJTbGlkZSA9IChvcHRpb25zLCBzbGlkZSkgPT4ge1xuXG5cblxufVxuXG5leHBvcnQgY29uc3QgZWdnU2xpZGUgPSAob3B0aW9ucywgc2xpZGUpID0+IHtcblxuXG5cbn1cblxuZXhwb3J0IGNvbnN0IGhlcnJpbmdTbGlkZSA9IChvcHRpb25zLCBzbGlkZSkgPT4ge1xuXG5cblxufVxuXG5leHBvcnQgY29uc3QgdHVuYVNsaWRlID0gKG9wdGlvbnMsIHNsaWRlKSA9PiB7XG5cblxuXG59XG5cbmV4cG9ydCBjb25zdCBicm9jY29saVNsaWRlID0gKG9wdGlvbnMsIHNsaWRlKSA9PiB7XG5cblxuXG59XG5cbmV4cG9ydCBjb25zdCBwZWFzU2xpZGUgPSAob3B0aW9ucywgc2xpZGUpID0+IHtcblxuXG5cbn1cblxuZXhwb3J0IGNvbnN0IHJlZFBlcHBlclNsaWRlID0gKG9wdGlvbnMsIHNsaWRlKSA9PiB7XG5cblxuXG59XG5cbmV4cG9ydCBjb25zdCBveXN0ZXJTbGlkZSA9IChvcHRpb25zLCBzbGlkZSkgPT4ge1xuXG5cblxufVxuXG5leHBvcnQgY29uc3Qgc3BpbmFjaFNsaWRlID0gKG9wdGlvbnMsIHNsaWRlKSA9PiB7XG5cblxuXG59XG5cbmV4cG9ydCBjb25zdCBxdWlub2FTbGlkZSA9IChvcHRpb25zLCBzbGlkZSkgPT4ge1xuXG5cblxufVxuXG5leHBvcnQgY29uc3QgY2hvY29sYXRlU2xpZGUgPSAob3B0aW9ucywgc2xpZGUpID0+IHtcblxuXG5cbn1cblxuZXhwb3J0IGNvbnN0IHN0cmF3YmVycnlTbGlkZSA9IChvcHRpb25zLCBzbGlkZSkgPT4ge1xuXG5cblxufVxuXG5leHBvcnQgY29uc3QgYmVhblNsaWRlID0gKG9wdGlvbnMsIHNsaWRlKSA9PiB7XG5cblxuXG59IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luIl0sInNvdXJjZVJvb3QiOiIifQ==