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
  nutritionData.forEach(function (foodData, idx) {
    createVisualization(foodData, idx);
  });
});

var createVisualization = function createVisualization(foodData, idx) {
  var w = 600;
  var h = 500;
  var data = Object.values(foodData).slice(2, -1);
  var numberOfColumns = 10;
  var maxValue = d3.max(data, function (d) {
    return +d;
  });
  var x_axisLength = w - 50;
  var y_axisLength = h - 50;
  var targetSlide = "#slide-svg-" + idx;
  var targetSlideRect = "slide-svg-" + idx + "-rect";
  var yScale = d3.scaleLinear().domain([0, maxValue]).range([0, y_axisLength]);
  var svg = d3 // .select(`${targetSlide}`)
  .select("#slide-svg-0").append("svg").attr("width", w).attr("height", h);
  svg.selectAll("rect").data(data).enter().append("rect").attr("class", "".concat(targetSlideRect)).attr("x", function (d, i) {
    return i * (x_axisLength / numberOfColumns) + 25;
  }).attr("y", function (d) {
    //   return h - yScale(d);
    return 500;
  }).attr("width", x_axisLength / numberOfColumns - 1).attr("height", function (d) {
    return yScale(d);
  }).attr("fill", "red").transition().duration(500);
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

var createObservers = function createObservers(slides) {
  var options = {
    root: null,
    rootMargin: "0px 0px 0px 0px",
    threshold: .5 //   threshold: .05

  };
  _scripts_scroll_slides__WEBPACK_IMPORTED_MODULE_1__["avocadoSlide"](0, options, slides[0], nutritionData);
  _scripts_scroll_slides__WEBPACK_IMPORTED_MODULE_1__["bananaSlide"](1, options, slides[1], nutritionData); // for (let i = 0; i < 18; i++) {
  //     handleScrollOntoWrapper(i, options, slides[i]);
  // }
};

var handleScrollOntoWrapper = function handleScrollOntoWrapper(idx, options, slide) {
  // debugger;
  var foodData = nutritionData[idx];
  var targetSlide = ".slide-svg-" + idx;
  var targetSlideRect = targetSlide + "-rect";

  var handleScrollOnto = function handleScrollOnto(entries, observer) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        // if (entry.intersectionRatio <= 0.80) {
        var singleFoodData = Object.values(foodData).slice(2, -1); // console.log(singleFoodData);

        console.log(nutritionData[idx].food_name);
        console.log(entry.intersectionRatio); //   console.log(entry.boundingClientRect);

        var maxValue = d3.max(singleFoodData, function (d) {
          return +d;
        });
        var y_axisLength = 450;
        var yScale = d3.scaleLinear().domain([0, maxValue]).range([0, y_axisLength]); // d3.selectAll(`${targetSlideRect}`)

        d3.selectAll("rect").data(singleFoodData).transition().attr("y", function (d) {
          return 500 - yScale(d);
        }).attr("height", function (d) {
          return yScale(d);
        }).duration(500);
      } else {
        //   console.log(nutritionData[idx].food_name);
        //   console.log(entry.intersectionRatio);
        d3.selectAll("rect") // d3.selectAll(`${targetSlideRect}`)
        // d3.selectAll("#slide-svg-0-rect")
        .transition().attr("y", 500).duration(500);
      }
    });
  };

  var observer = new IntersectionObserver(handleScrollOnto, options);
  observer.observe(slide);
}; // const handleScrollOnto = (entries, observer) => {
//     entries.forEach(entry => {
//         if (entry.isIntersecting) {
//             let singleFoodData = Object.values(nutritionData[0]).slice(2, -1);
//             let maxValue = d3.max(singleFoodData, function(d) {
//             return +d;
//             });
//             // let x_axisLength = w - 50;
//             let y_axisLength = 450;
//             let yScale = d3
//             .scaleLinear()
//             .domain([0, maxValue])
//             .range([0, y_axisLength]);
//             d3.selectAll("rect")
//               .data(singleFoodData)
//               .transition()
//               .attr("y", function(d) {
//                 return 500 - yScale(d);
//               })
//               .attr("height", function(d) {
//                 return yScale(d);
//               })
//               .duration(500)
//             //   .delay(500);
//             // createVisualization(nutritionData[0]);
//             // entry.target.style.opacity = "100%";
//             // entry.target.style.transform = "translateX(0%)";
//             // entry.target.style.visibility = "visible";
//         } else {
//             d3.selectAll("rect")
//             .transition()
//             .attr("y", 500)
//             .duration(500);
//             // entry.target.style.opacity = "0%";
//             // entry.target.style.visibility = "hidden";
//             // entry.target.style.transform = "translateX(50%)";
//         }
//     })
// }

/***/ }),

/***/ "./src/scripts/scroll/slides.js":
/*!**************************************!*\
  !*** ./src/scripts/scroll/slides.js ***!
  \**************************************/
/*! exports provided: avocadoSlide, bananaSlide, potatoSlide, butterSlide, beefLiverSlide, codLiverSlide, eggSlide, herringSlide, tunaSlide, broccoliSlide, peasSlide, redPepperSlide, oysterSlide, spinachSlide, quinoaSlide, chocolateSlide, strawberrySlide, beanSlide */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "avocadoSlide", function() { return avocadoSlide; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "bananaSlide", function() { return bananaSlide; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "potatoSlide", function() { return potatoSlide; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "butterSlide", function() { return butterSlide; });
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
var avocadoSlide = function avocadoSlide(idx, options, slide, data) {
  var foodData = data[idx];
  var targetSlide = ".slide-svg-" + idx;
  var targetSlideRect = targetSlide + "-rect";

  var handleAvocadoScrollOnto = function handleAvocadoScrollOnto(entries, observer) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var singleFoodData = Object.values(foodData).slice(2, -1);
        var maxValue = d3.max(singleFoodData, function (d) {
          return +d;
        });
        var y_axisLength = 450;
        var yScale = d3.scaleLinear().domain([0, maxValue]).range([0, y_axisLength]);
        d3.selectAll("".concat(targetSlideRect)).data(singleFoodData).transition().attr("y", function (d) {
          return 500 - yScale(d);
        }).attr("height", function (d) {
          return yScale(d);
        }).delay(750).duration(500);
        d3.selectAll(".slide-svg-1-rect").transition().attr("y", 500).duration(500);
      }
    });
  };

  var observer = new IntersectionObserver(handleAvocadoScrollOnto, options);
  observer.observe(slide);
};
var bananaSlide = function bananaSlide(idx, options, slide, data) {
  var foodData = data[idx];
  var targetSlide = ".slide-svg-" + idx;
  var targetSlideRect = targetSlide + "-rect";

  var handleBananaScrollOnto = function handleBananaScrollOnto(entries, observer) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var singleFoodData = Object.values(foodData).slice(2, -1);
        var maxValue = d3.max(singleFoodData, function (d) {
          return +d;
        });
        var y_axisLength = 450;
        var yScale = d3.scaleLinear().domain([0, maxValue]).range([0, y_axisLength]);
        d3.selectAll("".concat(targetSlideRect)).data(singleFoodData).transition().attr("y", function (d) {
          return 500 - yScale(d);
        }).attr("height", function (d) {
          return yScale(d);
        }).delay(750).duration(500);
        d3.selectAll(".slide-svg-0-rect").transition().attr("y", 500).duration(500);
      }
    });
  };

  var observer = new IntersectionObserver(handleBananaScrollOnto, options);
  observer.observe(slide);
};
var potatoSlide = function potatoSlide(idx, options, slide, data) {};
var butterSlide = function butterSlide(idx, options, slide, data) {};
var beefLiverSlide = function beefLiverSlide(idx, options, slide, data) {};
var codLiverSlide = function codLiverSlide(idx, options, slide, data) {};
var eggSlide = function eggSlide(idx, options, slide, data) {};
var herringSlide = function herringSlide(idx, options, slide, data) {};
var tunaSlide = function tunaSlide(idx, options, slide, data) {};
var broccoliSlide = function broccoliSlide(idx, options, slide, data) {};
var peasSlide = function peasSlide(idx, options, slide, data) {};
var redPepperSlide = function redPepperSlide(idx, options, slide, data) {};
var oysterSlide = function oysterSlide(idx, options, slide, data) {};
var spinachSlide = function spinachSlide(idx, options, slide, data) {};
var quinoaSlide = function quinoaSlide(idx, options, slide, data) {};
var chocolateSlide = function chocolateSlide(idx, options, slide, data) {};
var strawberrySlide = function strawberrySlide(idx, options, slide, data) {};
var beanSlide = function beanSlide(idx, options, slide, data) {};

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL3Njcm9sbC9zbGlkZXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0eWxlcy9pbmRleC5zY3NzIl0sIm5hbWVzIjpbIm51dHJpdGlvbkRhdGEiLCJkMyIsImNzdiIsImQiLCJmb29kX25hbWUiLCJzZXJ2aW5nX3NpemUiLCJmaWJlciIsImlyb24iLCJtYWduZXNpdW0iLCJwb3Rhc3NpdW0iLCJ6aW5jIiwidml0YW1pbl9jIiwiZm9sYXRlIiwidml0YW1pbl9iMTIiLCJ2aXRhbWluX2EiLCJ2aXRhbWluX2QiLCJjaG9sZXN0ZXJvbCIsInRoZW4iLCJkYXRhIiwiY29uc29sZSIsImxvZyIsImZvckVhY2giLCJmb29kRGF0YSIsImlkeCIsImNyZWF0ZVZpc3VhbGl6YXRpb24iLCJ3IiwiaCIsIk9iamVjdCIsInZhbHVlcyIsInNsaWNlIiwibnVtYmVyT2ZDb2x1bW5zIiwibWF4VmFsdWUiLCJtYXgiLCJ4X2F4aXNMZW5ndGgiLCJ5X2F4aXNMZW5ndGgiLCJ0YXJnZXRTbGlkZSIsInRhcmdldFNsaWRlUmVjdCIsInlTY2FsZSIsInNjYWxlTGluZWFyIiwiZG9tYWluIiwicmFuZ2UiLCJzdmciLCJzZWxlY3QiLCJhcHBlbmQiLCJhdHRyIiwic2VsZWN0QWxsIiwiZW50ZXIiLCJpIiwidHJhbnNpdGlvbiIsImR1cmF0aW9uIiwid2luZG93IiwiYWRkRXZlbnRMaXN0ZW5lciIsImUiLCJzbGlkZXMiLCJzbGlkZU5hbWUiLCJuZXdTbGlkZSIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsInB1c2giLCJjcmVhdGVPYnNlcnZlcnMiLCJvcHRpb25zIiwicm9vdCIsInJvb3RNYXJnaW4iLCJ0aHJlc2hvbGQiLCJTbGlkZXMiLCJoYW5kbGVTY3JvbGxPbnRvV3JhcHBlciIsInNsaWRlIiwiaGFuZGxlU2Nyb2xsT250byIsImVudHJpZXMiLCJvYnNlcnZlciIsImVudHJ5IiwiaXNJbnRlcnNlY3RpbmciLCJzaW5nbGVGb29kRGF0YSIsImludGVyc2VjdGlvblJhdGlvIiwiSW50ZXJzZWN0aW9uT2JzZXJ2ZXIiLCJvYnNlcnZlIiwiYXZvY2Fkb1NsaWRlIiwiaGFuZGxlQXZvY2Fkb1Njcm9sbE9udG8iLCJkZWxheSIsImJhbmFuYVNsaWRlIiwiaGFuZGxlQmFuYW5hU2Nyb2xsT250byIsInBvdGF0b1NsaWRlIiwiYnV0dGVyU2xpZGUiLCJiZWVmTGl2ZXJTbGlkZSIsImNvZExpdmVyU2xpZGUiLCJlZ2dTbGlkZSIsImhlcnJpbmdTbGlkZSIsInR1bmFTbGlkZSIsImJyb2Njb2xpU2xpZGUiLCJwZWFzU2xpZGUiLCJyZWRQZXBwZXJTbGlkZSIsIm95c3RlclNsaWRlIiwic3BpbmFjaFNsaWRlIiwicXVpbm9hU2xpZGUiLCJjaG9jb2xhdGVTbGlkZSIsInN0cmF3YmVycnlTbGlkZSIsImJlYW5TbGlkZSJdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtE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QUpNO0FBTUEsSUFBTXdFLGNBQWMsR0FBRyxTQUFqQkEsY0FBaUIsQ0FBQ25FLEdBQUQsRUFBTXFDLE9BQU4sRUFBZU0sS0FBZixFQUFzQmhELElBQXRCLEVBQStCLENBSTVELENBSk07QUFNQSxJQUFNeUUsV0FBVyxHQUFHLFNBQWRBLFdBQWMsQ0FBQ3BFLEdBQUQsRUFBTXFDLE9BQU4sRUFBZU0sS0FBZixFQUFzQmhELElBQXRCLEVBQStCLENBSXpELENBSk07QUFNQSxJQUFNMEUsWUFBWSxHQUFHLFNBQWZBLFlBQWUsQ0FBQ3JFLEdBQUQsRUFBTXFDLE9BQU4sRUFBZU0sS0FBZixFQUFzQmhELElBQXRCLEVBQStCLENBSTFELENBSk07QUFNQSxJQUFNMkUsV0FBVyxHQUFHLFNBQWRBLFdBQWMsQ0FBQ3RFLEdBQUQsRUFBTXFDLE9BQU4sRUFBZU0sS0FBZixFQUFzQmhELElBQXRCLEVBQStCLENBSXpELENBSk07QUFNQSxJQUFNNEUsY0FBYyxHQUFHLFNBQWpCQSxjQUFpQixDQUFDdkUsR0FBRCxFQUFNcUMsT0FBTixFQUFlTSxLQUFmLEVBQXNCaEQsSUFBdEIsRUFBK0IsQ0FJNUQsQ0FKTTtBQU1BLElBQU02RSxlQUFlLEdBQUcsU0FBbEJBLGVBQWtCLENBQUN4RSxHQUFELEVBQU1xQyxPQUFOLEVBQWVNLEtBQWYsRUFBc0JoRCxJQUF0QixFQUErQixDQUk3RCxDQUpNO0FBTUEsSUFBTThFLFNBQVMsR0FBRyxTQUFaQSxTQUFZLENBQUN6RSxHQUFELEVBQU1xQyxPQUFOLEVBQWVNLEtBQWYsRUFBc0JoRCxJQUF0QixFQUErQixDQUl2RCxDQUpNLEM7Ozs7Ozs7Ozs7O0FDckxQLHVDIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9kaXN0L1wiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC5qc1wiKTtcbiIsImltcG9ydCAnLi9zdHlsZXMvaW5kZXguc2Nzcyc7XG5pbXBvcnQgKiBhcyBTbGlkZXMgZnJvbSAnLi9zY3JpcHRzL3Njcm9sbC9zbGlkZXMnO1xuXG5sZXQgbnV0cml0aW9uRGF0YTtcblxuZDMuY3N2KFwibnV0cml0aW9uX2ZhY3RzX2Zvcl9zY3JvbGxlci5jc3ZcIiwgZCA9PiB7XG4gIHJldHVybiB7XG4gICAgZm9vZF9uYW1lOiBkW1wiRm9vZCBuYW1lXCJdLFxuICAgIHNlcnZpbmdfc2l6ZTogZFtcIkFtb3VudFwiXSxcbiAgICBmaWJlcjogK2RbXCJGaWJlclwiXSxcbiAgICBpcm9uOiArZFtcIklyb25cIl0sXG4gICAgbWFnbmVzaXVtOiArZFtcIk1hZ25lc2l1bVwiXSxcbiAgICBwb3Rhc3NpdW06ICtkW1wiUG90YXNzaXVtXCJdLFxuICAgIHppbmM6ICtkW1wiWmluY1wiXSxcbiAgICB2aXRhbWluX2M6ICtkW1wiVml0YW1pbiBDXCJdLFxuICAgIGZvbGF0ZTogK2RbXCJGb2xhdGVcIl0sXG4gICAgdml0YW1pbl9iMTI6ICtkW1wiVml0YW1pbiBCLTEyXCJdLFxuICAgIHZpdGFtaW5fYTogK2RbXCJWaXRhbWluIEFcIl0sXG4gICAgdml0YW1pbl9kOiArZFtcIlZpdGFtaW4gRFwiXSxcbiAgICBjaG9sZXN0ZXJvbDogK2RbXCJDaG9sZXN0ZXJvbFwiXVxuICB9O1xufSkudGhlbihkYXRhID0+IHtcbiAgbnV0cml0aW9uRGF0YSA9IGRhdGE7XG4gIGNvbnNvbGUubG9nKG51dHJpdGlvbkRhdGEpO1xuXG4gIG51dHJpdGlvbkRhdGEuZm9yRWFjaCgoZm9vZERhdGEsIGlkeCkgPT4ge1xuICAgICAgY3JlYXRlVmlzdWFsaXphdGlvbihmb29kRGF0YSwgaWR4KTtcbiAgfSk7XG5cbn0pO1xuXG5jb25zdCBjcmVhdGVWaXN1YWxpemF0aW9uID0gKGZvb2REYXRhLCBpZHgpID0+IHtcbiAgbGV0IHcgPSA2MDA7XG4gIGxldCBoID0gNTAwO1xuXG4gIGxldCBkYXRhID0gT2JqZWN0LnZhbHVlcyhmb29kRGF0YSkuc2xpY2UoMiwgLTEpO1xuICBsZXQgbnVtYmVyT2ZDb2x1bW5zID0gMTA7XG4gIGxldCBtYXhWYWx1ZSA9IGQzLm1heChkYXRhLCBmdW5jdGlvbihkKSB7XG4gICAgcmV0dXJuICtkO1xuICB9KTtcbiAgbGV0IHhfYXhpc0xlbmd0aCA9IHcgLSA1MDtcbiAgbGV0IHlfYXhpc0xlbmd0aCA9IGggLSA1MDtcbiAgbGV0IHRhcmdldFNsaWRlID0gXCIjc2xpZGUtc3ZnLVwiICsgaWR4O1xuICBsZXQgdGFyZ2V0U2xpZGVSZWN0ID0gXCJzbGlkZS1zdmctXCIgKyBpZHggKyBcIi1yZWN0XCI7XG5cbiAgbGV0IHlTY2FsZSA9IGQzXG4gICAgLnNjYWxlTGluZWFyKClcbiAgICAuZG9tYWluKFswLCBtYXhWYWx1ZV0pXG4gICAgLnJhbmdlKFswLCB5X2F4aXNMZW5ndGhdKTtcblxuICBsZXQgc3ZnID0gZDNcbiAgICAvLyAuc2VsZWN0KGAke3RhcmdldFNsaWRlfWApXG4gICAgLnNlbGVjdChgI3NsaWRlLXN2Zy0wYClcbiAgICAuYXBwZW5kKFwic3ZnXCIpXG4gICAgLmF0dHIoXCJ3aWR0aFwiLCB3KVxuICAgIC5hdHRyKFwiaGVpZ2h0XCIsIGgpO1xuXG4gIHN2Z1xuICAgIC5zZWxlY3RBbGwoXCJyZWN0XCIpXG4gICAgLmRhdGEoZGF0YSlcbiAgICAuZW50ZXIoKVxuICAgIC5hcHBlbmQoXCJyZWN0XCIpXG4gICAgLmF0dHIoXCJjbGFzc1wiLCBgJHt0YXJnZXRTbGlkZVJlY3R9YClcbiAgICAuYXR0cihcInhcIiwgZnVuY3Rpb24oZCwgaSkge1xuICAgICAgcmV0dXJuIGkgKiAoeF9heGlzTGVuZ3RoIC8gbnVtYmVyT2ZDb2x1bW5zKSArIDI1O1xuICAgIH0pXG4gICAgLmF0dHIoXCJ5XCIsIGZ1bmN0aW9uKGQpIHtcbiAgICAvLyAgIHJldHVybiBoIC0geVNjYWxlKGQpO1xuICAgICAgcmV0dXJuIDUwMDtcbiAgICB9KVxuICAgIC5hdHRyKFwid2lkdGhcIiwgeF9heGlzTGVuZ3RoIC8gbnVtYmVyT2ZDb2x1bW5zIC0gMSlcbiAgICAuYXR0cihcImhlaWdodFwiLCBmdW5jdGlvbihkKSB7XG4gICAgICByZXR1cm4geVNjYWxlKGQpO1xuICAgIH0pXG4gICAgLmF0dHIoXCJmaWxsXCIsIFwicmVkXCIpXG4gICAgLnRyYW5zaXRpb24oKVxuICAgIC5kdXJhdGlvbig1MDApO1xufTtcblxuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgKGUpID0+IHtcbiAgICBcbiAgICBsZXQgc2xpZGVzID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxOTsgaSsrKSB7XG4gICAgICAgIGxldCBzbGlkZU5hbWUgPSBcIiNzbGlkZS1jb250YWluZXItXCIgKyBpO1xuICAgICAgICBsZXQgbmV3U2xpZGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNsaWRlTmFtZSk7XG4gICAgICAgIHNsaWRlcy5wdXNoKG5ld1NsaWRlKTtcbiAgICB9XG4gICAgY3JlYXRlT2JzZXJ2ZXJzKHNsaWRlcyk7XG59LCBmYWxzZSk7XG5cbmNvbnN0IGNyZWF0ZU9ic2VydmVycyA9IChzbGlkZXMpID0+IHtcbiAgICBcbiAgICBsZXQgb3B0aW9ucyA9IHtcbiAgICAgIHJvb3Q6IG51bGwsXG4gICAgICByb290TWFyZ2luOiBcIjBweCAwcHggMHB4IDBweFwiLFxuICAgICAgdGhyZXNob2xkOiAuNVxuICAgIC8vICAgdGhyZXNob2xkOiAuMDVcbiAgICB9O1xuXG4gICAgXG4gICAgU2xpZGVzLmF2b2NhZG9TbGlkZSgwLCBvcHRpb25zLCBzbGlkZXNbMF0sIG51dHJpdGlvbkRhdGEpO1xuICAgIFNsaWRlcy5iYW5hbmFTbGlkZSgxLCBvcHRpb25zLCBzbGlkZXNbMV0sIG51dHJpdGlvbkRhdGEpO1xuXG4gICAgLy8gZm9yIChsZXQgaSA9IDA7IGkgPCAxODsgaSsrKSB7XG4gICAgLy8gICAgIGhhbmRsZVNjcm9sbE9udG9XcmFwcGVyKGksIG9wdGlvbnMsIHNsaWRlc1tpXSk7XG4gICAgLy8gfVxuXG59XG5cbmNvbnN0IGhhbmRsZVNjcm9sbE9udG9XcmFwcGVyID0gKGlkeCwgb3B0aW9ucywgc2xpZGUpID0+IHtcbiAgICAvLyBkZWJ1Z2dlcjtcbiAgICBsZXQgZm9vZERhdGEgPSBudXRyaXRpb25EYXRhW2lkeF07XG5cbiAgICBsZXQgdGFyZ2V0U2xpZGUgPSBcIi5zbGlkZS1zdmctXCIgKyBpZHg7XG4gICAgbGV0IHRhcmdldFNsaWRlUmVjdCA9IHRhcmdldFNsaWRlICsgXCItcmVjdFwiO1xuXG4gICAgY29uc3QgaGFuZGxlU2Nyb2xsT250byA9IChlbnRyaWVzLCBvYnNlcnZlcikgPT4ge1xuICAgICAgICBlbnRyaWVzLmZvckVhY2goZW50cnkgPT4ge1xuICAgICAgICAgICAgaWYgKGVudHJ5LmlzSW50ZXJzZWN0aW5nKSB7XG4gICAgICAgICAgICAvLyBpZiAoZW50cnkuaW50ZXJzZWN0aW9uUmF0aW8gPD0gMC44MCkge1xuICAgICAgICAgICAgICBsZXQgc2luZ2xlRm9vZERhdGEgPSBPYmplY3QudmFsdWVzKGZvb2REYXRhKS5zbGljZSgyLCAtMSk7XG5cblxuICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhzaW5nbGVGb29kRGF0YSk7XG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKG51dHJpdGlvbkRhdGFbaWR4XS5mb29kX25hbWUpO1xuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlbnRyeS5pbnRlcnNlY3Rpb25SYXRpbyk7XG4gICAgICAgICAgICAvLyAgIGNvbnNvbGUubG9nKGVudHJ5LmJvdW5kaW5nQ2xpZW50UmVjdCk7XG4gICAgICAgICAgICAgIGxldCBtYXhWYWx1ZSA9IGQzLm1heChzaW5nbGVGb29kRGF0YSwgZnVuY3Rpb24oZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiArZDtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIGxldCB5X2F4aXNMZW5ndGggPSA0NTA7XG5cbiAgICAgICAgICAgICAgbGV0IHlTY2FsZSA9IGQzXG4gICAgICAgICAgICAgICAgLnNjYWxlTGluZWFyKClcbiAgICAgICAgICAgICAgICAuZG9tYWluKFswLCBtYXhWYWx1ZV0pXG4gICAgICAgICAgICAgICAgLnJhbmdlKFswLCB5X2F4aXNMZW5ndGhdKTtcblxuICAgICAgICAgICAgICAvLyBkMy5zZWxlY3RBbGwoYCR7dGFyZ2V0U2xpZGVSZWN0fWApXG4gICAgICAgICAgICAgIGQzLnNlbGVjdEFsbChgcmVjdGApXG4gICAgICAgICAgICAgICAgLmRhdGEoc2luZ2xlRm9vZERhdGEpXG4gICAgICAgICAgICAgICAgLnRyYW5zaXRpb24oKVxuICAgICAgICAgICAgICAgIC5hdHRyKFwieVwiLCBmdW5jdGlvbihkKSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gNTAwIC0geVNjYWxlKGQpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmF0dHIoXCJoZWlnaHRcIiwgZnVuY3Rpb24oZCkge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIHlTY2FsZShkKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5kdXJhdGlvbig1MDApO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vICAgY29uc29sZS5sb2cobnV0cml0aW9uRGF0YVtpZHhdLmZvb2RfbmFtZSk7XG4gICAgICAgICAgICAvLyAgIGNvbnNvbGUubG9nKGVudHJ5LmludGVyc2VjdGlvblJhdGlvKTtcbiAgICAgICAgICAgICAgZDMuc2VsZWN0QWxsKGByZWN0YClcbiAgICAgICAgICAgICAgICAvLyBkMy5zZWxlY3RBbGwoYCR7dGFyZ2V0U2xpZGVSZWN0fWApXG4gICAgICAgICAgICAgICAgLy8gZDMuc2VsZWN0QWxsKFwiI3NsaWRlLXN2Zy0wLXJlY3RcIilcbiAgICAgICAgICAgICAgICAudHJhbnNpdGlvbigpXG4gICAgICAgICAgICAgICAgLmF0dHIoXCJ5XCIsIDUwMClcbiAgICAgICAgICAgICAgICAuZHVyYXRpb24oNTAwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIGxldCBvYnNlcnZlciA9IG5ldyBJbnRlcnNlY3Rpb25PYnNlcnZlcihoYW5kbGVTY3JvbGxPbnRvLCBvcHRpb25zKTtcbiAgICBvYnNlcnZlci5vYnNlcnZlKHNsaWRlKTtcblxufVxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG4vLyBjb25zdCBoYW5kbGVTY3JvbGxPbnRvID0gKGVudHJpZXMsIG9ic2VydmVyKSA9PiB7XG4vLyAgICAgZW50cmllcy5mb3JFYWNoKGVudHJ5ID0+IHtcbi8vICAgICAgICAgaWYgKGVudHJ5LmlzSW50ZXJzZWN0aW5nKSB7XG5cbi8vICAgICAgICAgICAgIGxldCBzaW5nbGVGb29kRGF0YSA9IE9iamVjdC52YWx1ZXMobnV0cml0aW9uRGF0YVswXSkuc2xpY2UoMiwgLTEpO1xuLy8gICAgICAgICAgICAgbGV0IG1heFZhbHVlID0gZDMubWF4KHNpbmdsZUZvb2REYXRhLCBmdW5jdGlvbihkKSB7XG4vLyAgICAgICAgICAgICByZXR1cm4gK2Q7XG4vLyAgICAgICAgICAgICB9KTtcbi8vICAgICAgICAgICAgIC8vIGxldCB4X2F4aXNMZW5ndGggPSB3IC0gNTA7XG4vLyAgICAgICAgICAgICBsZXQgeV9heGlzTGVuZ3RoID0gNDUwO1xuXG4vLyAgICAgICAgICAgICBsZXQgeVNjYWxlID0gZDNcbi8vICAgICAgICAgICAgIC5zY2FsZUxpbmVhcigpXG4vLyAgICAgICAgICAgICAuZG9tYWluKFswLCBtYXhWYWx1ZV0pXG4vLyAgICAgICAgICAgICAucmFuZ2UoWzAsIHlfYXhpc0xlbmd0aF0pO1xuXG5cbi8vICAgICAgICAgICAgIGQzLnNlbGVjdEFsbChcInJlY3RcIilcbi8vICAgICAgICAgICAgICAgLmRhdGEoc2luZ2xlRm9vZERhdGEpXG4vLyAgICAgICAgICAgICAgIC50cmFuc2l0aW9uKClcbi8vICAgICAgICAgICAgICAgLmF0dHIoXCJ5XCIsIGZ1bmN0aW9uKGQpIHtcbi8vICAgICAgICAgICAgICAgICByZXR1cm4gNTAwIC0geVNjYWxlKGQpO1xuLy8gICAgICAgICAgICAgICB9KVxuLy8gICAgICAgICAgICAgICAuYXR0cihcImhlaWdodFwiLCBmdW5jdGlvbihkKSB7XG4vLyAgICAgICAgICAgICAgICAgcmV0dXJuIHlTY2FsZShkKTtcbi8vICAgICAgICAgICAgICAgfSlcbi8vICAgICAgICAgICAgICAgLmR1cmF0aW9uKDUwMClcbi8vICAgICAgICAgICAgIC8vICAgLmRlbGF5KDUwMCk7XG5cbi8vICAgICAgICAgICAgIC8vIGNyZWF0ZVZpc3VhbGl6YXRpb24obnV0cml0aW9uRGF0YVswXSk7XG4vLyAgICAgICAgICAgICAvLyBlbnRyeS50YXJnZXQuc3R5bGUub3BhY2l0eSA9IFwiMTAwJVwiO1xuLy8gICAgICAgICAgICAgLy8gZW50cnkudGFyZ2V0LnN0eWxlLnRyYW5zZm9ybSA9IFwidHJhbnNsYXRlWCgwJSlcIjtcbi8vICAgICAgICAgICAgIC8vIGVudHJ5LnRhcmdldC5zdHlsZS52aXNpYmlsaXR5ID0gXCJ2aXNpYmxlXCI7XG4vLyAgICAgICAgIH0gZWxzZSB7XG4vLyAgICAgICAgICAgICBkMy5zZWxlY3RBbGwoXCJyZWN0XCIpXG4vLyAgICAgICAgICAgICAudHJhbnNpdGlvbigpXG4vLyAgICAgICAgICAgICAuYXR0cihcInlcIiwgNTAwKVxuLy8gICAgICAgICAgICAgLmR1cmF0aW9uKDUwMCk7XG4vLyAgICAgICAgICAgICAvLyBlbnRyeS50YXJnZXQuc3R5bGUub3BhY2l0eSA9IFwiMCVcIjtcbi8vICAgICAgICAgICAgIC8vIGVudHJ5LnRhcmdldC5zdHlsZS52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIjtcbi8vICAgICAgICAgICAgIC8vIGVudHJ5LnRhcmdldC5zdHlsZS50cmFuc2Zvcm0gPSBcInRyYW5zbGF0ZVgoNTAlKVwiO1xuLy8gICAgICAgICB9XG4vLyAgICAgfSlcbi8vIH1cblxuXG4iLCJleHBvcnQgY29uc3QgYXZvY2Fkb1NsaWRlID0gKGlkeCwgb3B0aW9ucywgc2xpZGUsIGRhdGEpID0+IHtcbiAgbGV0IGZvb2REYXRhID0gZGF0YVtpZHhdO1xuXG4gIGxldCB0YXJnZXRTbGlkZSA9IFwiLnNsaWRlLXN2Zy1cIiArIGlkeDtcbiAgbGV0IHRhcmdldFNsaWRlUmVjdCA9IHRhcmdldFNsaWRlICsgXCItcmVjdFwiO1xuXG4gIGNvbnN0IGhhbmRsZUF2b2NhZG9TY3JvbGxPbnRvID0gKGVudHJpZXMsIG9ic2VydmVyKSA9PiB7XG4gICAgZW50cmllcy5mb3JFYWNoKGVudHJ5ID0+IHtcbiAgICAgIGlmIChlbnRyeS5pc0ludGVyc2VjdGluZykge1xuICAgICAgICBsZXQgc2luZ2xlRm9vZERhdGEgPSBPYmplY3QudmFsdWVzKGZvb2REYXRhKS5zbGljZSgyLCAtMSk7XG5cbiAgICAgICAgbGV0IG1heFZhbHVlID0gZDMubWF4KHNpbmdsZUZvb2REYXRhLCBmdW5jdGlvbihkKSB7XG4gICAgICAgICAgcmV0dXJuICtkO1xuICAgICAgICB9KTtcbiAgICAgICAgbGV0IHlfYXhpc0xlbmd0aCA9IDQ1MDtcblxuICAgICAgICBsZXQgeVNjYWxlID0gZDNcbiAgICAgICAgICAuc2NhbGVMaW5lYXIoKVxuICAgICAgICAgIC5kb21haW4oWzAsIG1heFZhbHVlXSlcbiAgICAgICAgICAucmFuZ2UoWzAsIHlfYXhpc0xlbmd0aF0pO1xuXG4gICAgICAgIGQzLnNlbGVjdEFsbChgJHt0YXJnZXRTbGlkZVJlY3R9YClcbiAgICAgICAgICAuZGF0YShzaW5nbGVGb29kRGF0YSlcbiAgICAgICAgICAudHJhbnNpdGlvbigpXG4gICAgICAgICAgLmF0dHIoXCJ5XCIsIGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgICAgIHJldHVybiA1MDAgLSB5U2NhbGUoZCk7XG4gICAgICAgICAgfSlcbiAgICAgICAgICAuYXR0cihcImhlaWdodFwiLCBmdW5jdGlvbihkKSB7XG4gICAgICAgICAgICByZXR1cm4geVNjYWxlKGQpO1xuICAgICAgICAgIH0pXG4gICAgICAgICAgLmRlbGF5KDc1MClcbiAgICAgICAgICAuZHVyYXRpb24oNTAwKTtcblxuICAgICAgICBkMy5zZWxlY3RBbGwoXCIuc2xpZGUtc3ZnLTEtcmVjdFwiKVxuICAgICAgICAgICAgLnRyYW5zaXRpb24oKVxuICAgICAgICAgICAgLmF0dHIoXCJ5XCIsIDUwMClcbiAgICAgICAgICAgIC5kdXJhdGlvbig1MDApO1xuXG4gICAgICB9XG4gICAgfSk7XG4gIH07XG5cbiAgbGV0IG9ic2VydmVyID0gbmV3IEludGVyc2VjdGlvbk9ic2VydmVyKGhhbmRsZUF2b2NhZG9TY3JvbGxPbnRvLCBvcHRpb25zKTtcbiAgb2JzZXJ2ZXIub2JzZXJ2ZShzbGlkZSk7XG59OyAgICBcblxuZXhwb3J0IGNvbnN0IGJhbmFuYVNsaWRlID0gKGlkeCwgb3B0aW9ucywgc2xpZGUsIGRhdGEpID0+IHtcbiAgbGV0IGZvb2REYXRhID0gZGF0YVtpZHhdO1xuXG4gIGxldCB0YXJnZXRTbGlkZSA9IFwiLnNsaWRlLXN2Zy1cIiArIGlkeDtcbiAgbGV0IHRhcmdldFNsaWRlUmVjdCA9IHRhcmdldFNsaWRlICsgXCItcmVjdFwiO1xuXG4gIGNvbnN0IGhhbmRsZUJhbmFuYVNjcm9sbE9udG8gPSAoZW50cmllcywgb2JzZXJ2ZXIpID0+IHtcbiAgICBlbnRyaWVzLmZvckVhY2goZW50cnkgPT4ge1xuICAgICAgaWYgKGVudHJ5LmlzSW50ZXJzZWN0aW5nKSB7XG4gICAgICAgIGxldCBzaW5nbGVGb29kRGF0YSA9IE9iamVjdC52YWx1ZXMoZm9vZERhdGEpLnNsaWNlKDIsIC0xKTtcblxuICAgICAgICBsZXQgbWF4VmFsdWUgPSBkMy5tYXgoc2luZ2xlRm9vZERhdGEsIGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgICByZXR1cm4gK2Q7XG4gICAgICAgIH0pO1xuICAgICAgICBsZXQgeV9heGlzTGVuZ3RoID0gNDUwO1xuXG4gICAgICAgIGxldCB5U2NhbGUgPSBkM1xuICAgICAgICAgIC5zY2FsZUxpbmVhcigpXG4gICAgICAgICAgLmRvbWFpbihbMCwgbWF4VmFsdWVdKVxuICAgICAgICAgIC5yYW5nZShbMCwgeV9heGlzTGVuZ3RoXSk7XG5cbiAgICAgICAgZDMuc2VsZWN0QWxsKGAke3RhcmdldFNsaWRlUmVjdH1gKVxuICAgICAgICAgIC5kYXRhKHNpbmdsZUZvb2REYXRhKVxuICAgICAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgICAgICAuYXR0cihcInlcIiwgZnVuY3Rpb24oZCkge1xuICAgICAgICAgICAgcmV0dXJuIDUwMCAtIHlTY2FsZShkKTtcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5hdHRyKFwiaGVpZ2h0XCIsIGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgICAgIHJldHVybiB5U2NhbGUoZCk7XG4gICAgICAgICAgfSlcbiAgICAgICAgICAuZGVsYXkoNzUwKVxuICAgICAgICAgIC5kdXJhdGlvbig1MDApO1xuXG4gICAgICAgIGQzLnNlbGVjdEFsbChcIi5zbGlkZS1zdmctMC1yZWN0XCIpXG4gICAgICAgICAgLnRyYW5zaXRpb24oKVxuICAgICAgICAgIC5hdHRyKFwieVwiLCA1MDApXG4gICAgICAgICAgLmR1cmF0aW9uKDUwMCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH07XG5cbiAgbGV0IG9ic2VydmVyID0gbmV3IEludGVyc2VjdGlvbk9ic2VydmVyKGhhbmRsZUJhbmFuYVNjcm9sbE9udG8sIG9wdGlvbnMpO1xuICBvYnNlcnZlci5vYnNlcnZlKHNsaWRlKTtcbn07XG5cbmV4cG9ydCBjb25zdCBwb3RhdG9TbGlkZSA9IChpZHgsIG9wdGlvbnMsIHNsaWRlLCBkYXRhKSA9PiB7XG5cblxuXG59XG5cbmV4cG9ydCBjb25zdCBidXR0ZXJTbGlkZSA9IChpZHgsIG9wdGlvbnMsIHNsaWRlLCBkYXRhKSA9PiB7XG5cblxuXG59XG5cbmV4cG9ydCBjb25zdCBiZWVmTGl2ZXJTbGlkZSA9IChpZHgsIG9wdGlvbnMsIHNsaWRlLCBkYXRhKSA9PiB7XG5cblxuXG59XG5cbmV4cG9ydCBjb25zdCBjb2RMaXZlclNsaWRlID0gKGlkeCwgb3B0aW9ucywgc2xpZGUsIGRhdGEpID0+IHtcblxuXG5cbn1cblxuZXhwb3J0IGNvbnN0IGVnZ1NsaWRlID0gKGlkeCwgb3B0aW9ucywgc2xpZGUsIGRhdGEpID0+IHtcblxuXG5cbn1cblxuZXhwb3J0IGNvbnN0IGhlcnJpbmdTbGlkZSA9IChpZHgsIG9wdGlvbnMsIHNsaWRlLCBkYXRhKSA9PiB7XG5cblxuXG59XG5cbmV4cG9ydCBjb25zdCB0dW5hU2xpZGUgPSAoaWR4LCBvcHRpb25zLCBzbGlkZSwgZGF0YSkgPT4ge1xuXG5cblxufVxuXG5leHBvcnQgY29uc3QgYnJvY2NvbGlTbGlkZSA9IChpZHgsIG9wdGlvbnMsIHNsaWRlLCBkYXRhKSA9PiB7XG5cblxuXG59XG5cbmV4cG9ydCBjb25zdCBwZWFzU2xpZGUgPSAoaWR4LCBvcHRpb25zLCBzbGlkZSwgZGF0YSkgPT4ge1xuXG5cblxufVxuXG5leHBvcnQgY29uc3QgcmVkUGVwcGVyU2xpZGUgPSAoaWR4LCBvcHRpb25zLCBzbGlkZSwgZGF0YSkgPT4ge1xuXG5cblxufVxuXG5leHBvcnQgY29uc3Qgb3lzdGVyU2xpZGUgPSAoaWR4LCBvcHRpb25zLCBzbGlkZSwgZGF0YSkgPT4ge1xuXG5cblxufVxuXG5leHBvcnQgY29uc3Qgc3BpbmFjaFNsaWRlID0gKGlkeCwgb3B0aW9ucywgc2xpZGUsIGRhdGEpID0+IHtcblxuXG5cbn1cblxuZXhwb3J0IGNvbnN0IHF1aW5vYVNsaWRlID0gKGlkeCwgb3B0aW9ucywgc2xpZGUsIGRhdGEpID0+IHtcblxuXG5cbn1cblxuZXhwb3J0IGNvbnN0IGNob2NvbGF0ZVNsaWRlID0gKGlkeCwgb3B0aW9ucywgc2xpZGUsIGRhdGEpID0+IHtcblxuXG5cbn1cblxuZXhwb3J0IGNvbnN0IHN0cmF3YmVycnlTbGlkZSA9IChpZHgsIG9wdGlvbnMsIHNsaWRlLCBkYXRhKSA9PiB7XG5cblxuXG59XG5cbmV4cG9ydCBjb25zdCBiZWFuU2xpZGUgPSAoaWR4LCBvcHRpb25zLCBzbGlkZSwgZGF0YSkgPT4ge1xuXG5cblxufSIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpbiJdLCJzb3VyY2VSb290IjoiIn0=