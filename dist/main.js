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
  var svg = d3 // .select("#slide-svg-0")
  .select("".concat(targetSlide)).append("svg").attr("width", w).attr("height", h);
  svg.selectAll("rect").data(data).enter().append("rect") // .attr("class", "#slide-svg-0-rect")
  .attr("class", "".concat(targetSlideRect)).attr("x", function (d, i) {
    return i * (x_axisLength / numberOfColumns) + 25;
  }).attr("y", function (d) {
    return h - yScale(d);
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
    threshold: [.15, .85] //   threshold: .05

  };

  for (var i = 0; i < 18; i++) {
    handleScrollOntoWrapper(i, options, slides[i]);
  }
};

var handleScrollOntoWrapper = function handleScrollOntoWrapper(idx, options, slide) {
  debugger;
  var foodData = nutritionData[idx];
  var targetSlide = ".slide-svg-" + idx;
  var targetSlideRect = targetSlide + "-rect";

  var handleScrollOnto = function handleScrollOnto(entries, observer) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        // if (entry.intersectionRatio <= 0.80) {
        var singleFoodData = Object.values(foodData).slice(2, -1); // console.log(singleFoodData);

        console.log(nutritionData[idx].food_name);
        console.log(entry.intersectionRatio);
        console.log(entry.boundingClientRect); // createVisualization(foodData, idx);

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

/***/ "./src/styles/index.scss":
/*!*******************************!*\
  !*** ./src/styles/index.scss ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9zdHlsZXMvaW5kZXguc2NzcyJdLCJuYW1lcyI6WyJudXRyaXRpb25EYXRhIiwiZDMiLCJjc3YiLCJkIiwiZm9vZF9uYW1lIiwic2VydmluZ19zaXplIiwiZmliZXIiLCJpcm9uIiwibWFnbmVzaXVtIiwicG90YXNzaXVtIiwiemluYyIsInZpdGFtaW5fYyIsImZvbGF0ZSIsInZpdGFtaW5fYjEyIiwidml0YW1pbl9hIiwidml0YW1pbl9kIiwiY2hvbGVzdGVyb2wiLCJ0aGVuIiwiZGF0YSIsImNvbnNvbGUiLCJsb2ciLCJmb3JFYWNoIiwiZm9vZERhdGEiLCJpZHgiLCJjcmVhdGVWaXN1YWxpemF0aW9uIiwidyIsImgiLCJPYmplY3QiLCJ2YWx1ZXMiLCJzbGljZSIsIm51bWJlck9mQ29sdW1ucyIsIm1heFZhbHVlIiwibWF4IiwieF9heGlzTGVuZ3RoIiwieV9heGlzTGVuZ3RoIiwidGFyZ2V0U2xpZGUiLCJ0YXJnZXRTbGlkZVJlY3QiLCJ5U2NhbGUiLCJzY2FsZUxpbmVhciIsImRvbWFpbiIsInJhbmdlIiwic3ZnIiwic2VsZWN0IiwiYXBwZW5kIiwiYXR0ciIsInNlbGVjdEFsbCIsImVudGVyIiwiaSIsInRyYW5zaXRpb24iLCJkdXJhdGlvbiIsIndpbmRvdyIsImFkZEV2ZW50TGlzdGVuZXIiLCJlIiwic2xpZGVzIiwic2xpZGVOYW1lIiwibmV3U2xpZGUiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJwdXNoIiwiY3JlYXRlT2JzZXJ2ZXJzIiwib3B0aW9ucyIsInJvb3QiLCJyb290TWFyZ2luIiwidGhyZXNob2xkIiwiaGFuZGxlU2Nyb2xsT250b1dyYXBwZXIiLCJzbGlkZSIsImhhbmRsZVNjcm9sbE9udG8iLCJlbnRyaWVzIiwib2JzZXJ2ZXIiLCJlbnRyeSIsImlzSW50ZXJzZWN0aW5nIiwic2luZ2xlRm9vZERhdGEiLCJpbnRlcnNlY3Rpb25SYXRpbyIsImJvdW5kaW5nQ2xpZW50UmVjdCIsIkludGVyc2VjdGlvbk9ic2VydmVyIiwib2JzZXJ2ZSJdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7OztBQ2xGQTtBQUFBO0FBQUE7QUFBQTtBQUVBLElBQUlBLGFBQUo7QUFFQUMsRUFBRSxDQUFDQyxHQUFILENBQU8sa0NBQVAsRUFBMkMsVUFBQUMsQ0FBQyxFQUFJO0FBQzlDLFNBQU87QUFDTEMsYUFBUyxFQUFFRCxDQUFDLENBQUMsV0FBRCxDQURQO0FBRUxFLGdCQUFZLEVBQUVGLENBQUMsQ0FBQyxRQUFELENBRlY7QUFHTEcsU0FBSyxFQUFFLENBQUNILENBQUMsQ0FBQyxPQUFELENBSEo7QUFJTEksUUFBSSxFQUFFLENBQUNKLENBQUMsQ0FBQyxNQUFELENBSkg7QUFLTEssYUFBUyxFQUFFLENBQUNMLENBQUMsQ0FBQyxXQUFELENBTFI7QUFNTE0sYUFB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LEVBRUd2QixVQUZILEdBR0dKLElBSEgsQ0FHUSxHQUhSLEVBR2EsVUFBU3pDLENBQVQsRUFBWTtBQUNyQixpQkFBTyxNQUFNa0MsTUFBTSxDQUFDbEMsQ0FBRCxDQUFuQjtBQUNELFNBTEgsRUFNR3lDLElBTkgsQ0FNUSxRQU5SLEVBTWtCLFVBQVN6QyxDQUFULEVBQVk7QUFDMUIsaUJBQU9rQyxNQUFNLENBQUNsQyxDQUFELENBQWI7QUFDRCxTQVJILEVBU0c4QyxRQVRILENBU1ksR0FUWjtBQVVELE9BOUJELE1BOEJPO0FBQ1A7QUFDQTtBQUNFaEQsVUFBRSxDQUFDNEMsU0FBSCxTQUNFO0FBQ0E7QUFGRixTQUdHRyxVQUhILEdBSUdKLElBSkgsQ0FJUSxHQUpSLEVBSWEsR0FKYixFQUtHSyxRQUxILENBS1ksR0FMWjtBQU1EO0FBQ0osS0F6Q0Q7QUEwQ0gsR0EzQ0Q7O0FBNkNBLE1BQUltQixRQUFRLEdBQUcsSUFBSU0sb0JBQUosQ0FBeUJSLGdCQUF6QixFQUEyQ04sT0FBM0MsQ0FBZjtBQUNBUSxVQUFRLENBQUNPLE9BQVQsQ0FBaUJWLEtBQWpCO0FBRUgsQ0F2REQsQyxDQXdFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSTs7Ozs7Ozs7Ozs7QUM3TkEsdUMiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL2Rpc3QvXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LmpzXCIpO1xuIiwiaW1wb3J0ICcuL3N0eWxlcy9pbmRleC5zY3NzJztcblxubGV0IG51dHJpdGlvbkRhdGE7XG5cbmQzLmNzdihcIm51dHJpdGlvbl9mYWN0c19mb3Jfc2Nyb2xsZXIuY3N2XCIsIGQgPT4ge1xuICByZXR1cm4ge1xuICAgIGZvb2RfbmFtZTogZFtcIkZvb2QgbmFtZVwiXSxcbiAgICBzZXJ2aW5nX3NpemU6IGRbXCJBbW91bnRcIl0sXG4gICAgZmliZXI6ICtkW1wiRmliZXJcIl0sXG4gICAgaXJvbjogK2RbXCJJcm9uXCJdLFxuICAgIG1hZ25lc2l1bTogK2RbXCJNYWduZXNpdW1cIl0sXG4gICAgcG90YXNzaXVtOiArZFtcIlBvdGFzc2l1bVwiXSxcbiAgICB6aW5jOiArZFtcIlppbmNcIl0sXG4gICAgdml0YW1pbl9jOiArZFtcIlZpdGFtaW4gQ1wiXSxcbiAgICBmb2xhdGU6ICtkW1wiRm9sYXRlXCJdLFxuICAgIHZpdGFtaW5fYjEyOiArZFtcIlZpdGFtaW4gQi0xMlwiXSxcbiAgICB2aXRhbWluX2E6ICtkW1wiVml0YW1pbiBBXCJdLFxuICAgIHZpdGFtaW5fZDogK2RbXCJWaXRhbWluIERcIl0sXG4gICAgY2hvbGVzdGVyb2w6ICtkW1wiQ2hvbGVzdGVyb2xcIl1cbiAgfTtcbn0pLnRoZW4oZGF0YSA9PiB7XG4gIG51dHJpdGlvbkRhdGEgPSBkYXRhO1xuICBjb25zb2xlLmxvZyhudXRyaXRpb25EYXRhKTtcblxuICBudXRyaXRpb25EYXRhLmZvckVhY2goKGZvb2REYXRhLCBpZHgpID0+IHtcbiAgICAgIGNyZWF0ZVZpc3VhbGl6YXRpb24oZm9vZERhdGEsIGlkeCk7XG4gIH0pO1xuXG59KTtcblxuY29uc3QgY3JlYXRlVmlzdWFsaXphdGlvbiA9IChmb29kRGF0YSwgaWR4KSA9PiB7XG4gIGxldCB3ID0gNjAwO1xuICBsZXQgaCA9IDUwMDtcblxuICBsZXQgZGF0YSA9IE9iamVjdC52YWx1ZXMoZm9vZERhdGEpLnNsaWNlKDIsIC0xKTtcbiAgbGV0IG51bWJlck9mQ29sdW1ucyA9IDEwO1xuICBsZXQgbWF4VmFsdWUgPSBkMy5tYXgoZGF0YSwgZnVuY3Rpb24oZCkge1xuICAgIHJldHVybiArZDtcbiAgfSk7XG4gIGxldCB4X2F4aXNMZW5ndGggPSB3IC0gNTA7XG4gIGxldCB5X2F4aXNMZW5ndGggPSBoIC0gNTA7XG4gIGxldCB0YXJnZXRTbGlkZSA9IFwiI3NsaWRlLXN2Zy1cIiArIGlkeDtcbiAgbGV0IHRhcmdldFNsaWRlUmVjdCA9IFwic2xpZGUtc3ZnLVwiICsgaWR4ICsgXCItcmVjdFwiO1xuXG4gIGxldCB5U2NhbGUgPSBkM1xuICAgIC5zY2FsZUxpbmVhcigpXG4gICAgLmRvbWFpbihbMCwgbWF4VmFsdWVdKVxuICAgIC5yYW5nZShbMCwgeV9heGlzTGVuZ3RoXSk7XG5cbiAgbGV0IHN2ZyA9IGQzXG4gICAgLy8gLnNlbGVjdChcIiNzbGlkZS1zdmctMFwiKVxuICAgIC5zZWxlY3QoYCR7dGFyZ2V0U2xpZGV9YClcbiAgICAuYXBwZW5kKFwic3ZnXCIpXG4gICAgLmF0dHIoXCJ3aWR0aFwiLCB3KVxuICAgIC5hdHRyKFwiaGVpZ2h0XCIsIGgpO1xuXG4gIHN2Z1xuICAgIC5zZWxlY3RBbGwoXCJyZWN0XCIpXG4gICAgLmRhdGEoZGF0YSlcbiAgICAuZW50ZXIoKVxuICAgIC5hcHBlbmQoXCJyZWN0XCIpXG4gICAgLy8gLmF0dHIoXCJjbGFzc1wiLCBcIiNzbGlkZS1zdmctMC1yZWN0XCIpXG4gICAgLmF0dHIoXCJjbGFzc1wiLCBgJHt0YXJnZXRTbGlkZVJlY3R9YClcbiAgICAuYXR0cihcInhcIiwgZnVuY3Rpb24oZCwgaSkge1xuICAgICAgcmV0dXJuIGkgKiAoeF9heGlzTGVuZ3RoIC8gbnVtYmVyT2ZDb2x1bW5zKSArIDI1O1xuICAgIH0pXG4gICAgLmF0dHIoXCJ5XCIsIGZ1bmN0aW9uKGQpIHtcbiAgICAgIHJldHVybiBoIC0geVNjYWxlKGQpO1xuICAgIH0pXG4gICAgLmF0dHIoXCJ3aWR0aFwiLCB4X2F4aXNMZW5ndGggLyBudW1iZXJPZkNvbHVtbnMgLSAxKVxuICAgIC5hdHRyKFwiaGVpZ2h0XCIsIGZ1bmN0aW9uKGQpIHtcbiAgICAgIHJldHVybiB5U2NhbGUoZCk7XG4gICAgfSlcbiAgICAuYXR0cihcImZpbGxcIiwgXCJyZWRcIilcbiAgICAudHJhbnNpdGlvbigpXG4gICAgLmR1cmF0aW9uKDUwMCk7XG59O1xuXG5cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLCAoZSkgPT4ge1xuICAgIFxuICAgIGxldCBzbGlkZXMgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDE5OyBpKyspIHtcbiAgICAgICAgbGV0IHNsaWRlTmFtZSA9IFwiI3NsaWRlLWNvbnRhaW5lci1cIiArIGk7XG4gICAgICAgIGxldCBuZXdTbGlkZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2xpZGVOYW1lKTtcbiAgICAgICAgc2xpZGVzLnB1c2gobmV3U2xpZGUpO1xuICAgIH1cbiAgICBjcmVhdGVPYnNlcnZlcnMoc2xpZGVzKTtcbn0sIGZhbHNlKTtcblxuY29uc3QgY3JlYXRlT2JzZXJ2ZXJzID0gKHNsaWRlcykgPT4ge1xuICAgIFxuICAgIGxldCBvcHRpb25zID0ge1xuICAgICAgcm9vdDogbnVsbCxcbiAgICAgIHJvb3RNYXJnaW46IFwiMHB4IDBweCAwcHggMHB4XCIsXG4gICAgICB0aHJlc2hvbGQ6IFsuMTUsIC44NV1cbiAgICAvLyAgIHRocmVzaG9sZDogLjA1XG4gICAgfTtcblxuICAgIFxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTg7IGkrKykge1xuICAgICAgICBoYW5kbGVTY3JvbGxPbnRvV3JhcHBlcihpLCBvcHRpb25zLCBzbGlkZXNbaV0pO1xuICAgIH1cblxufVxuXG5jb25zdCBoYW5kbGVTY3JvbGxPbnRvV3JhcHBlciA9IChpZHgsIG9wdGlvbnMsIHNsaWRlKSA9PiB7XG4gICAgZGVidWdnZXI7XG4gICAgbGV0IGZvb2REYXRhID0gbnV0cml0aW9uRGF0YVtpZHhdO1xuXG4gICAgbGV0IHRhcmdldFNsaWRlID0gXCIuc2xpZGUtc3ZnLVwiICsgaWR4O1xuICAgIGxldCB0YXJnZXRTbGlkZVJlY3QgPSB0YXJnZXRTbGlkZSArIFwiLXJlY3RcIjtcblxuICAgIGNvbnN0IGhhbmRsZVNjcm9sbE9udG8gPSAoZW50cmllcywgb2JzZXJ2ZXIpID0+IHtcbiAgICAgICAgZW50cmllcy5mb3JFYWNoKGVudHJ5ID0+IHtcbiAgICAgICAgICAgIGlmIChlbnRyeS5pc0ludGVyc2VjdGluZykge1xuICAgICAgICAgICAgLy8gaWYgKGVudHJ5LmludGVyc2VjdGlvblJhdGlvIDw9IDAuODApIHtcbiAgICAgICAgICAgICAgbGV0IHNpbmdsZUZvb2REYXRhID0gT2JqZWN0LnZhbHVlcyhmb29kRGF0YSkuc2xpY2UoMiwgLTEpO1xuXG4gICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHNpbmdsZUZvb2REYXRhKTtcbiAgICAgICAgICAgICAgY29uc29sZS5sb2cobnV0cml0aW9uRGF0YVtpZHhdLmZvb2RfbmFtZSk7XG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVudHJ5LmludGVyc2VjdGlvblJhdGlvKTtcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coZW50cnkuYm91bmRpbmdDbGllbnRSZWN0KTtcbiAgICAgICAgICAgICAgLy8gY3JlYXRlVmlzdWFsaXphdGlvbihmb29kRGF0YSwgaWR4KTtcbiAgICAgICAgICAgICAgbGV0IG1heFZhbHVlID0gZDMubWF4KHNpbmdsZUZvb2REYXRhLCBmdW5jdGlvbihkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICtkO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgbGV0IHlfYXhpc0xlbmd0aCA9IDQ1MDtcblxuICAgICAgICAgICAgICBsZXQgeVNjYWxlID0gZDNcbiAgICAgICAgICAgICAgICAuc2NhbGVMaW5lYXIoKVxuICAgICAgICAgICAgICAgIC5kb21haW4oWzAsIG1heFZhbHVlXSlcbiAgICAgICAgICAgICAgICAucmFuZ2UoWzAsIHlfYXhpc0xlbmd0aF0pO1xuXG4gICAgICAgICAgICAgIC8vIGQzLnNlbGVjdEFsbChgJHt0YXJnZXRTbGlkZVJlY3R9YClcbiAgICAgICAgICAgICAgZDMuc2VsZWN0QWxsKGByZWN0YClcbiAgICAgICAgICAgICAgICAuZGF0YShzaW5nbGVGb29kRGF0YSlcbiAgICAgICAgICAgICAgICAudHJhbnNpdGlvbigpXG4gICAgICAgICAgICAgICAgLmF0dHIoXCJ5XCIsIGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiA1MDAgLSB5U2NhbGUoZCk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuYXR0cihcImhlaWdodFwiLCBmdW5jdGlvbihkKSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4geVNjYWxlKGQpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmR1cmF0aW9uKDUwMCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gICBjb25zb2xlLmxvZyhudXRyaXRpb25EYXRhW2lkeF0uZm9vZF9uYW1lKTtcbiAgICAgICAgICAgIC8vICAgY29uc29sZS5sb2coZW50cnkuaW50ZXJzZWN0aW9uUmF0aW8pO1xuICAgICAgICAgICAgICBkMy5zZWxlY3RBbGwoYHJlY3RgKVxuICAgICAgICAgICAgICAgIC8vIGQzLnNlbGVjdEFsbChgJHt0YXJnZXRTbGlkZVJlY3R9YClcbiAgICAgICAgICAgICAgICAvLyBkMy5zZWxlY3RBbGwoXCIjc2xpZGUtc3ZnLTAtcmVjdFwiKVxuICAgICAgICAgICAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgICAgICAgICAgICAuYXR0cihcInlcIiwgNTAwKVxuICAgICAgICAgICAgICAgIC5kdXJhdGlvbig1MDApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgbGV0IG9ic2VydmVyID0gbmV3IEludGVyc2VjdGlvbk9ic2VydmVyKGhhbmRsZVNjcm9sbE9udG8sIG9wdGlvbnMpO1xuICAgIG9ic2VydmVyLm9ic2VydmUoc2xpZGUpO1xuXG59XG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cbi8vIGNvbnN0IGhhbmRsZVNjcm9sbE9udG8gPSAoZW50cmllcywgb2JzZXJ2ZXIpID0+IHtcbi8vICAgICBlbnRyaWVzLmZvckVhY2goZW50cnkgPT4ge1xuLy8gICAgICAgICBpZiAoZW50cnkuaXNJbnRlcnNlY3RpbmcpIHtcblxuLy8gICAgICAgICAgICAgbGV0IHNpbmdsZUZvb2REYXRhID0gT2JqZWN0LnZhbHVlcyhudXRyaXRpb25EYXRhWzBdKS5zbGljZSgyLCAtMSk7XG4vLyAgICAgICAgICAgICBsZXQgbWF4VmFsdWUgPSBkMy5tYXgoc2luZ2xlRm9vZERhdGEsIGZ1bmN0aW9uKGQpIHtcbi8vICAgICAgICAgICAgIHJldHVybiArZDtcbi8vICAgICAgICAgICAgIH0pO1xuLy8gICAgICAgICAgICAgLy8gbGV0IHhfYXhpc0xlbmd0aCA9IHcgLSA1MDtcbi8vICAgICAgICAgICAgIGxldCB5X2F4aXNMZW5ndGggPSA0NTA7XG5cbi8vICAgICAgICAgICAgIGxldCB5U2NhbGUgPSBkM1xuLy8gICAgICAgICAgICAgLnNjYWxlTGluZWFyKClcbi8vICAgICAgICAgICAgIC5kb21haW4oWzAsIG1heFZhbHVlXSlcbi8vICAgICAgICAgICAgIC5yYW5nZShbMCwgeV9heGlzTGVuZ3RoXSk7XG5cblxuLy8gICAgICAgICAgICAgZDMuc2VsZWN0QWxsKFwicmVjdFwiKVxuLy8gICAgICAgICAgICAgICAuZGF0YShzaW5nbGVGb29kRGF0YSlcbi8vICAgICAgICAgICAgICAgLnRyYW5zaXRpb24oKVxuLy8gICAgICAgICAgICAgICAuYXR0cihcInlcIiwgZnVuY3Rpb24oZCkge1xuLy8gICAgICAgICAgICAgICAgIHJldHVybiA1MDAgLSB5U2NhbGUoZCk7XG4vLyAgICAgICAgICAgICAgIH0pXG4vLyAgICAgICAgICAgICAgIC5hdHRyKFwiaGVpZ2h0XCIsIGZ1bmN0aW9uKGQpIHtcbi8vICAgICAgICAgICAgICAgICByZXR1cm4geVNjYWxlKGQpO1xuLy8gICAgICAgICAgICAgICB9KVxuLy8gICAgICAgICAgICAgICAuZHVyYXRpb24oNTAwKVxuLy8gICAgICAgICAgICAgLy8gICAuZGVsYXkoNTAwKTtcblxuLy8gICAgICAgICAgICAgLy8gY3JlYXRlVmlzdWFsaXphdGlvbihudXRyaXRpb25EYXRhWzBdKTtcbi8vICAgICAgICAgICAgIC8vIGVudHJ5LnRhcmdldC5zdHlsZS5vcGFjaXR5ID0gXCIxMDAlXCI7XG4vLyAgICAgICAgICAgICAvLyBlbnRyeS50YXJnZXQuc3R5bGUudHJhbnNmb3JtID0gXCJ0cmFuc2xhdGVYKDAlKVwiO1xuLy8gICAgICAgICAgICAgLy8gZW50cnkudGFyZ2V0LnN0eWxlLnZpc2liaWxpdHkgPSBcInZpc2libGVcIjtcbi8vICAgICAgICAgfSBlbHNlIHtcbi8vICAgICAgICAgICAgIGQzLnNlbGVjdEFsbChcInJlY3RcIilcbi8vICAgICAgICAgICAgIC50cmFuc2l0aW9uKClcbi8vICAgICAgICAgICAgIC5hdHRyKFwieVwiLCA1MDApXG4vLyAgICAgICAgICAgICAuZHVyYXRpb24oNTAwKTtcbi8vICAgICAgICAgICAgIC8vIGVudHJ5LnRhcmdldC5zdHlsZS5vcGFjaXR5ID0gXCIwJVwiO1xuLy8gICAgICAgICAgICAgLy8gZW50cnkudGFyZ2V0LnN0eWxlLnZpc2liaWxpdHkgPSBcImhpZGRlblwiO1xuLy8gICAgICAgICAgICAgLy8gZW50cnkudGFyZ2V0LnN0eWxlLnRyYW5zZm9ybSA9IFwidHJhbnNsYXRlWCg1MCUpXCI7XG4vLyAgICAgICAgIH1cbi8vICAgICB9KVxuLy8gfVxuXG5cbiIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpbiJdLCJzb3VyY2VSb290IjoiIn0=