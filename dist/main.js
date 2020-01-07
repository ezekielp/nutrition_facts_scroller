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

var redBox, blueBox, textBox;
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
  console.log(Object.values(nutritionData[0]).slice(2, -1));
  createVisualization(nutritionData[0]);
});

var createVisualization = function createVisualization(objectData) {
  var w = 600;
  var h = 500;
  var data = Object.values(objectData).slice(2, -1);
  var numberOfColumns = 10;
  var maxValue = d3.max(data, function (d) {
    return +d;
  });
  var x_axisLength = w - 50;
  var y_axisLength = h - 50;
  var yScale = d3.scaleLinear().domain([0, maxValue]).range([0, y_axisLength]);
  var svg = d3.select("#text-box").append("svg").attr("width", w).attr("height", h);
  svg.selectAll("rect").data(data).enter().append("rect").attr("x", function (d, i) {
    return i * (x_axisLength / numberOfColumns) + 25;
  }).attr("y", function (d) {
    return h - yScale(d);
  }).attr("width", x_axisLength / numberOfColumns - 1).attr("height", function (d) {
    return yScale(d);
  }).attr("fill", "red");
};

window.addEventListener("load", function (e) {
  textBox = document.querySelector("#text-box");
  redBox = document.querySelector("#red-box");
  blueBox = document.querySelector("#blue-box");
  createObserver();
}, false);

var createObserver = function createObserver() {
  var observer;
  var options = {
    root: null,
    rootMargin: "0px 0px 0px 0px",
    threshold: .50
  };
  observer = new IntersectionObserver(handleScrollOnto, options); // observer.observe(redBox);

  observer.observe(textBox); // observer.observe(blueBox);
};

var handleScrollOnto = function handleScrollOnto(entries, observer) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      var singleFoodData = Object.values(nutritionData[0]).slice(2, -1);
      var maxValue = d3.max(singleFoodData, function (d) {
        return +d;
      }); // let x_axisLength = w - 50;

      var y_axisLength = 450;
      var yScale = d3.scaleLinear().domain([0, maxValue]).range([0, y_axisLength]);
      d3.selectAll("rect").data(singleFoodData).transition().attr("y", function (d) {
        return 500 - yScale(d);
      }).attr("height", function (d) {
        return yScale(d);
      }).duration(1000).delay(500); // createVisualization(nutritionData[0]);
      // entry.target.style.opacity = "100%";
      // entry.target.style.transform = "translateX(0%)";
      // entry.target.style.visibility = "visible";
    } else {
      d3.selectAll("rect").transition().attr("y", 500).duration(1000); // entry.target.style.opacity = "0%";
      // entry.target.style.visibility = "hidden";
      // entry.target.style.transform = "translateX(50%)";
    }
  });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9zdHlsZXMvaW5kZXguc2NzcyJdLCJuYW1lcyI6WyJyZWRCb3giLCJibHVlQm94IiwidGV4dEJveCIsIm51dHJpdGlvbkRhdGEiLCJkMyIsImNzdiIsImQiLCJmb29kX25hbWUiLCJzZXJ2aW5nX3NpemUiLCJmaWJlciIsImlyb24iLCJtYWduZXNpdW0iLCJwb3Rhc3NpdW0iLCJ6aW5jIiwidml0YW1pbl9jIiwiZm9sYXRlIiwidml0YW1pbl9iMTIiLCJ2aXRhbWluX2EiLCJ2aXRhbWluX2QiLCJjaG9sZXN0ZXJvbCIsInRoZW4iLCJkYXRhIiwiY29uc29sZSIsImxvZyIsIk9iamVjdCIsInZhbHVlcyIsInNsaWNlIiwiY3JlYXRlVmlzdWFsaXphdGlvbiIsIm9iamVjdERhdGEiLCJ3IiwiaCIsIm51bWJlck9mQ29sdW1ucyIsIm1heFZhbHVlIiwibWF4IiwieF9heGlzTGVuZ3RoIiwieV9heGlzTGVuZ3RoIiwieVNjYWxlIiwic2NhbGVMaW5lYXIiLCJkb21haW4iLCJyYW5nZSIsInN2ZyIsInNlbGVjdCIsImFwcGVuZCIsImF0dHIiLCJzZWxlY3RBbGwiLCJlbnRlciIsImkiLCJ3aW5kb3ciLCJhZGRFdmVudExpc3RlbmVyIiwiZSIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImNyZWF0ZU9ic2VydmVyIiwib2JzZXJ2ZXIiLCJvcHRpb25zIiwicm9vdCIsInJvb3RNYXJnaW4iLCJ0aHJlc2hvbGQiLCJJbnRlcnNlY3Rpb25PYnNlcnZlciIsImhhbmRsZVNjcm9sbE9udG8iLCJvYnNlcnZlIiwiZW50cmllcyIsImZvckVhY2giLCJlbnRyeSIsImlzSW50ZXJzZWN0aW5nIiwic2luZ2xlRm9vZERhdGEiLCJ0cmFuc2l0aW9uIiwiZHVyYXRpb24iLCJkZWxheSJdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7OztBQ2xGQTtBQUFBO0FBQUE7QUFBQTtBQUVBLElBQUlBLE1BQUosRUFBWUMsT0FBWixFQUFxQkMsT0FBckI7QUFFQSxJQUFJQyxhQUFKO0FBRUFDLEVBQUUsQ0FBQ0MsR0FBSCxDQUFPLGtDQUFQLEVBQTJDLFVBQUFDLENBQUMsRUFBSTtBQUM5QyxTQUFPO0FBQ0xDLGFBQVMsRUFBRUQsQ0FBQyxDQUFDLFdBQUQsQ0FEUDtBQUVMRSxnQkFBWSxFQUFFRixDQUFDLENBQUMsUUFBRCxDQUZWO0FBR0xHLFNBQUssRUFBRSxDQUFDSCxDQUFDLENBQUMsT0FBRCxDQUhKO0FBSUxJLFFBQUksRUFBRSxDQUFDSixDQUFDLENBQUMsTUFBRCxDQUpIO0FBS0xLLGFBQVMsRUFBRSxDQUFDTCxDQUFDLENBQUMsV0FBRCxDQUxSO0FBTUxNLGFBQVMsRUFBRSxDQUFDTixDQUFDLENBQUMsV0FBRCxDQU5SO0FBT0xPLFFBQUksRUFBRSxDQUFDUCxDQUFDLENBQUMsTUFBRCxDQVBIO0FBUUxRLGFBQVMsRUFBRSxDQUFDUixDQUFDLENBQUMsV0FBRCxDQVJSO0FBU0xTLFVBQU0sRUFBRSxDQUFDVCxDQUFDLENBQUMsUUFBRCxDQVRMO0FBVUxVLGVBQVcsRUFBRSxDQUFDVixDQUFDLENBQUMsY0FBRCxDQVZWO0FBV0xXLGFBQVMsRUFBRSxDQUFDWCxDQUFDLENBQUMsV0FBRCxDQVhSO0FBWUxZLGFBQVMsRUFBRSxDQUFDWixDQUFDLENBQUMsV0FBRCxDQVpSO0FBYUxhLGVBQVcsRUFBRSxDQUFDYixDQUFDLENBQUMsYUFBRDtBQWJWLEdBQVA7QUFlRCxDQWhCRCxFQWdCR2MsSUFoQkgsQ0FnQlEsVUFBQUMsSUFBSSxFQUFJO0FBQ2RsQixlQUFhLEdBQUdrQixJQUFoQjtBQUNBQyxTQUFPLENBQUNDLEdBQVIsQ0FBWXBCLGFBQVo7QUFDQW1CLFNBQU8sQ0FBQ0MsR0FBUixDQUFZQyxNQUFNLENBQUNDLE1BQVAsQ0FBY3RCLGFBQWEsQ0FBQyxDQUFELENBQTNCLEVBQWdDdUIsS0FBaEMsQ0FBc0MsQ0FBdEMsRUFBeUMsQ0FBQyxDQUExQyxDQUFaO0FBQ0FDLHFCQUFtQixDQUFDeEIsYUFBYSxDQUFDLENBQUQsQ0FBZCxDQUFuQjtBQUNELENBckJEOztBQXVCQSxJQUFNd0IsbUJBQW1CLEdBQUcsU0FBdEJBLG1CQUFzQixDQUFBQyxVQUFVLEVBQUk7QUFDeEMsTUFBSUMsQ0FBQyxHQUFHLEdBQVI7QUFDQSxNQUFJQyxDQUFDLEdBQUcsR0FBUjtBQUVBLE1BQUlULElBQUksR0FBR0csTUFBTSxDQUFDQyxNQUFQLENBQWNHLFVBQWQsRUFBMEJGLEtBQTFCLENBQWdDLENBQWhDLEVBQW1DLENBQUMsQ0FBcEMsQ0FBWDtBQUNBLE1BQUlLLGVBQWUsR0FBRyxFQUF0QjtBQUNBLE1BQUlDLFFBQVEsR0FBRzVCLEVBQUUsQ0FBQzZCLEdBQUgsQ0FBT1osSUFBUCxFQUFhLFVBQVNmLENBQVQsRUFBWTtBQUN0QyxXQUFPLENBQUNBLENBQVI7QUFDRCxHQUZjLENBQWY7QUFHQSxNQUFJNEIsWUFBWSxHQUFHTCxDQUFDLEdBQUcsRUFBdkI7QUFDQSxNQUFJTSxZQUFZLEdBQUdMLENBQUMsR0FBRyxFQUF2QjtBQUVBLE1BQUlNLE1BQU0sR0FBR2hDLEVBQUUsQ0FDWmlDLFdBRFUsR0FFVkMsTUFGVSxDQUVILENBQUMsQ0FBRCxFQUFJTixRQUFKLENBRkcsRUFHVk8sS0FIVSxDQUdKLENBQUMsQ0FBRCxFQUFJSixZQUFKLENBSEksQ0FBYjtBQUtBLE1BQUlLLEdBQUcsR0FBR3BDLEVBQUUsQ0FDVHFDLE1BRE8sQ0FDQSxXQURBLEVBRVBDLE1BRk8sQ0FFQSxLQUZBLEVBR1BDLElBSE8sQ0FHRixPQUhFLEVBR09kLENBSFAsRUFJUGMsSUFKTyxDQUlGLFFBSkUsRUFJUWIsQ0FKUixDQUFWO0FBTUFVLEtBQUcsQ0FDQUksU0FESCxDQUNhLE1BRGIsRUFFR3ZCLElBRkgsQ0FFUUEsSUFGUixFQUdHd0IsS0FISCxHQUlHSCxNQUpILENBSVUsTUFKVixFQUtHQyxJQUxILENBS1EsR0FMUixFQUthLFVBQVNyQyxDQUFULEVBQVl3QyxDQUFaLEVBQWU7QUFDeEIsV0FBT0EsQ0FBQyxJQUFJWixZQUFZLEdBQUdILGVBQW5CLENBQUQsR0FBdUMsRUFBOUM7QUFDRCxHQVBILEVBUUdZLElBUkgsQ0FRUSxHQVJSLEVBUWEsVUFBU3JDLENBQVQsRUFBWTtBQUNyQixXQUFPd0IsQ0FBQyxHQUFHTSxNQUFNLENBQUM5QixDQUFELENBQWpCO0FBQ0QsR0FWSCxFQVdHcUMsSUFYSCxDQVdRLE9BWFIsRUFXaUJULFlBQVksR0FBR0gsZUFBZixHQUFpQyxDQVhsRCxFQVlHWSxJQVpILENBWVEsUUFaUixFQVlrQixVQUFTckMsQ0FBVCxFQUFZO0FBQzFCLFdBQU84QixNQUFNLENBQUM5QixDQUFELENBQWI7QUFDRCxHQWRILEVBZUdxQyxJQWZILENBZVEsTUFmUixFQWVnQixLQWZoQjtBQWdCRCxDQXZDRDs7QUEwQ0FJLE1BQU0sQ0FBQ0MsZ0JBQVAsQ0FBd0IsTUFBeEIsRUFBZ0MsVUFBQ0MsQ0FBRCxFQUFPO0FBQ25DL0MsU0FBTyxHQUFHZ0QsUUFBUSxDQUFDQyxhQUFULENBQXVCLFdBQXZCLENBQVY7QUFDQW5ELFFBQU0sR0FBR2tELFFBQVEsQ0FBQ0MsYUFBVCxDQUF1QixVQUF2QixDQUFUO0FBQ0FsRCxTQUFPLEdBQUdpRCxRQUFRLENBQUNDLGFBQVQsQ0FBdUIsV0FBdkIsQ0FBVjtBQUVBQyxnQkFBYztBQUNqQixDQU5ELEVBTUcsS0FOSDs7QUFRQSxJQUFNQSxjQUFjLEdBQUcsU0FBakJBLGNBQWlCLEdBQU07QUFDekIsTUFBSUMsUUFBSjtBQUVBLE1BQUlDLE9BQU8sR0FBRztBQUNaQyxRQUFJLEVBQUUsSUFETTtBQUVaQyxjQUFVLEVBQUUsaUJBRkE7QUFHWkMsYUFBUyxFQUFFO0FBSEMsR0FBZDtBQU1BSixVQUFRLEdBQUcsSUFBSUssb0JBQUosQ0FBeUJDLGdCQUF6QixFQUEyQ0wsT0FBM0MsQ0FBWCxDQVR5QixDQVV6Qjs7QUFDQUQsVUFBUSxDQUFDTyxPQUFULENBQWlCMUQsT0FBakIsRUFYeUIsQ0FZekI7QUFDSCxDQWJEOztBQWVBLElBQU15RCxnQkFBZ0IsR0FBRyxTQUFuQkEsZ0JBQW1CLENBQUNFLE9BQUQsRUFBVVIsUUFBVixFQUF1QjtBQUM1Q1EsU0FBTyxDQUFDQyxPQUFSLENBQWdCLFVBQUFDLEtBQUssRUFBSTtBQUNyQixRQUFJQSxLQUFLLENBQUNDLGNBQVYsRUFBMEI7QUFFdEIsVUFBSUMsY0FBYyxHQUFHekMsTUFBTSxDQUFDQyxNQUFQLENBQWN0QixhQUFhLENBQUMsQ0FBRCxDQUEzQixFQUFnQ3VCLEtBQWhDLENBQXNDLENBQXRDLEVBQXlDLENBQUMsQ0FBMUMsQ0FBckI7QUFDQSxVQUFJTSxRQUFRLEdBQUc1QixFQUFFLENBQUM2QixHQUFILENBQU9nQyxjQUFQLEVBQXVCLFVBQVMzRCxDQUFULEVBQVk7QUFDbEQsZUFBTyxDQUFDQSxDQUFSO0FBQ0MsT0FGYyxDQUFmLENBSHNCLENBTXRCOztBQUNBLFVBQUk2QixZQUFZLEdBQUcsR0FBbkI7QUFFQSxVQUFJQyxNQUFNLEdBQUdoQyxFQUFFLENBQ2RpQyxXQURZLEdBRVpDLE1BRlksQ0FFTCxDQUFDLENBQUQsRUFBSU4sUUFBSixDQUZLLEVBR1pPLEtBSFksQ0FHTixDQUFDLENBQUQsRUFBSUosWUFBSixDQUhNLENBQWI7QUFNQS9CLFFBQUUsQ0FBQ3dDLFNBQUgsQ0FBYSxNQUFiLEVBQ0d2QixJQURILENBQ1E0QyxjQURSLEVBRUdDLFVBRkgsR0FHR3ZCLElBSEgsQ0FHUSxHQUhSLEVBR2EsVUFBU3JDLENBQVQsRUFBWTtBQUNyQixlQUFPLE1BQU04QixNQUFNLENBQUM5QixDQUFELENBQW5CO0FBQ0QsT0FMSCxFQU1HcUMsSUFOSCxDQU1RLFFBTlIsRUFNa0IsVUFBU3JDLENBQVQsRUFBWTtBQUMxQixlQUFPOEIsTUFBTSxDQUFDOUIsQ0FBRCxDQUFiO0FBQ0QsT0FSSCxFQVNHNkQsUUFUSCxDQVNZLElBVFosRUFVR0MsS0FWSCxDQVVTLEdBVlQsRUFmc0IsQ0EyQnRCO0FBQ0E7QUFDQTtBQUNBO0FBQ0gsS0EvQkQsTUErQk87QUFDSGhFLFFBQUUsQ0FBQ3dDLFNBQUgsQ0FBYSxNQUFiLEVBQ0NzQixVQURELEdBRUN2QixJQUZELENBRU0sR0FGTixFQUVXLEdBRlgsRUFHQ3dCLFFBSEQsQ0FHVSxJQUhWLEVBREcsQ0FLSDtBQUNBO0FBQ0E7QUFDSDtBQUNKLEdBekNEO0FBMENILENBM0NELEM7Ozs7Ozs7Ozs7O0FDOUZBLHVDIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9kaXN0L1wiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC5qc1wiKTtcbiIsImltcG9ydCAnLi9zdHlsZXMvaW5kZXguc2Nzcyc7XG5cbmxldCByZWRCb3gsIGJsdWVCb3gsIHRleHRCb3g7XG5cbmxldCBudXRyaXRpb25EYXRhO1xuXG5kMy5jc3YoXCJudXRyaXRpb25fZmFjdHNfZm9yX3Njcm9sbGVyLmNzdlwiLCBkID0+IHtcbiAgcmV0dXJuIHtcbiAgICBmb29kX25hbWU6IGRbXCJGb29kIG5hbWVcIl0sXG4gICAgc2VydmluZ19zaXplOiBkW1wiQW1vdW50XCJdLFxuICAgIGZpYmVyOiArZFtcIkZpYmVyXCJdLFxuICAgIGlyb246ICtkW1wiSXJvblwiXSxcbiAgICBtYWduZXNpdW06ICtkW1wiTWFnbmVzaXVtXCJdLFxuICAgIHBvdGFzc2l1bTogK2RbXCJQb3Rhc3NpdW1cIl0sXG4gICAgemluYzogK2RbXCJaaW5jXCJdLFxuICAgIHZpdGFtaW5fYzogK2RbXCJWaXRhbWluIENcIl0sXG4gICAgZm9sYXRlOiArZFtcIkZvbGF0ZVwiXSxcbiAgICB2aXRhbWluX2IxMjogK2RbXCJWaXRhbWluIEItMTJcIl0sXG4gICAgdml0YW1pbl9hOiArZFtcIlZpdGFtaW4gQVwiXSxcbiAgICB2aXRhbWluX2Q6ICtkW1wiVml0YW1pbiBEXCJdLFxuICAgIGNob2xlc3Rlcm9sOiArZFtcIkNob2xlc3Rlcm9sXCJdXG4gIH07XG59KS50aGVuKGRhdGEgPT4ge1xuICBudXRyaXRpb25EYXRhID0gZGF0YTtcbiAgY29uc29sZS5sb2cobnV0cml0aW9uRGF0YSk7XG4gIGNvbnNvbGUubG9nKE9iamVjdC52YWx1ZXMobnV0cml0aW9uRGF0YVswXSkuc2xpY2UoMiwgLTEpKTtcbiAgY3JlYXRlVmlzdWFsaXphdGlvbihudXRyaXRpb25EYXRhWzBdKTtcbn0pO1xuXG5jb25zdCBjcmVhdGVWaXN1YWxpemF0aW9uID0gb2JqZWN0RGF0YSA9PiB7XG4gIGxldCB3ID0gNjAwO1xuICBsZXQgaCA9IDUwMDtcblxuICBsZXQgZGF0YSA9IE9iamVjdC52YWx1ZXMob2JqZWN0RGF0YSkuc2xpY2UoMiwgLTEpO1xuICBsZXQgbnVtYmVyT2ZDb2x1bW5zID0gMTA7XG4gIGxldCBtYXhWYWx1ZSA9IGQzLm1heChkYXRhLCBmdW5jdGlvbihkKSB7XG4gICAgcmV0dXJuICtkO1xuICB9KTtcbiAgbGV0IHhfYXhpc0xlbmd0aCA9IHcgLSA1MDtcbiAgbGV0IHlfYXhpc0xlbmd0aCA9IGggLSA1MDtcblxuICBsZXQgeVNjYWxlID0gZDNcbiAgICAuc2NhbGVMaW5lYXIoKVxuICAgIC5kb21haW4oWzAsIG1heFZhbHVlXSlcbiAgICAucmFuZ2UoWzAsIHlfYXhpc0xlbmd0aF0pO1xuXG4gIGxldCBzdmcgPSBkM1xuICAgIC5zZWxlY3QoXCIjdGV4dC1ib3hcIilcbiAgICAuYXBwZW5kKFwic3ZnXCIpXG4gICAgLmF0dHIoXCJ3aWR0aFwiLCB3KVxuICAgIC5hdHRyKFwiaGVpZ2h0XCIsIGgpO1xuXG4gIHN2Z1xuICAgIC5zZWxlY3RBbGwoXCJyZWN0XCIpXG4gICAgLmRhdGEoZGF0YSlcbiAgICAuZW50ZXIoKVxuICAgIC5hcHBlbmQoXCJyZWN0XCIpXG4gICAgLmF0dHIoXCJ4XCIsIGZ1bmN0aW9uKGQsIGkpIHtcbiAgICAgIHJldHVybiBpICogKHhfYXhpc0xlbmd0aCAvIG51bWJlck9mQ29sdW1ucykgKyAyNTtcbiAgICB9KVxuICAgIC5hdHRyKFwieVwiLCBmdW5jdGlvbihkKSB7XG4gICAgICByZXR1cm4gaCAtIHlTY2FsZShkKTtcbiAgICB9KVxuICAgIC5hdHRyKFwid2lkdGhcIiwgeF9heGlzTGVuZ3RoIC8gbnVtYmVyT2ZDb2x1bW5zIC0gMSlcbiAgICAuYXR0cihcImhlaWdodFwiLCBmdW5jdGlvbihkKSB7XG4gICAgICByZXR1cm4geVNjYWxlKGQpO1xuICAgIH0pXG4gICAgLmF0dHIoXCJmaWxsXCIsIFwicmVkXCIpO1xufTtcblxuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgKGUpID0+IHtcbiAgICB0ZXh0Qm94ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN0ZXh0LWJveFwiKTtcbiAgICByZWRCb3ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3JlZC1ib3hcIik7XG4gICAgYmx1ZUJveCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYmx1ZS1ib3hcIik7XG5cbiAgICBjcmVhdGVPYnNlcnZlcigpO1xufSwgZmFsc2UpO1xuXG5jb25zdCBjcmVhdGVPYnNlcnZlciA9ICgpID0+IHtcbiAgICBsZXQgb2JzZXJ2ZXI7XG4gICAgXG4gICAgbGV0IG9wdGlvbnMgPSB7XG4gICAgICByb290OiBudWxsLFxuICAgICAgcm9vdE1hcmdpbjogXCIwcHggMHB4IDBweCAwcHhcIixcbiAgICAgIHRocmVzaG9sZDogLjUwXG4gICAgfTtcblxuICAgIG9ic2VydmVyID0gbmV3IEludGVyc2VjdGlvbk9ic2VydmVyKGhhbmRsZVNjcm9sbE9udG8sIG9wdGlvbnMpO1xuICAgIC8vIG9ic2VydmVyLm9ic2VydmUocmVkQm94KTtcbiAgICBvYnNlcnZlci5vYnNlcnZlKHRleHRCb3gpO1xuICAgIC8vIG9ic2VydmVyLm9ic2VydmUoYmx1ZUJveCk7XG59XG5cbmNvbnN0IGhhbmRsZVNjcm9sbE9udG8gPSAoZW50cmllcywgb2JzZXJ2ZXIpID0+IHtcbiAgICBlbnRyaWVzLmZvckVhY2goZW50cnkgPT4ge1xuICAgICAgICBpZiAoZW50cnkuaXNJbnRlcnNlY3RpbmcpIHtcblxuICAgICAgICAgICAgbGV0IHNpbmdsZUZvb2REYXRhID0gT2JqZWN0LnZhbHVlcyhudXRyaXRpb25EYXRhWzBdKS5zbGljZSgyLCAtMSk7XG4gICAgICAgICAgICBsZXQgbWF4VmFsdWUgPSBkMy5tYXgoc2luZ2xlRm9vZERhdGEsIGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgICAgIHJldHVybiArZDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgLy8gbGV0IHhfYXhpc0xlbmd0aCA9IHcgLSA1MDtcbiAgICAgICAgICAgIGxldCB5X2F4aXNMZW5ndGggPSA0NTA7XG5cbiAgICAgICAgICAgIGxldCB5U2NhbGUgPSBkM1xuICAgICAgICAgICAgLnNjYWxlTGluZWFyKClcbiAgICAgICAgICAgIC5kb21haW4oWzAsIG1heFZhbHVlXSlcbiAgICAgICAgICAgIC5yYW5nZShbMCwgeV9heGlzTGVuZ3RoXSk7XG5cblxuICAgICAgICAgICAgZDMuc2VsZWN0QWxsKFwicmVjdFwiKVxuICAgICAgICAgICAgICAuZGF0YShzaW5nbGVGb29kRGF0YSlcbiAgICAgICAgICAgICAgLnRyYW5zaXRpb24oKVxuICAgICAgICAgICAgICAuYXR0cihcInlcIiwgZnVuY3Rpb24oZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiA1MDAgLSB5U2NhbGUoZCk7XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIC5hdHRyKFwiaGVpZ2h0XCIsIGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geVNjYWxlKGQpO1xuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAuZHVyYXRpb24oMTAwMClcbiAgICAgICAgICAgICAgLmRlbGF5KDUwMCk7XG5cbiAgICAgICAgICAgIC8vIGNyZWF0ZVZpc3VhbGl6YXRpb24obnV0cml0aW9uRGF0YVswXSk7XG4gICAgICAgICAgICAvLyBlbnRyeS50YXJnZXQuc3R5bGUub3BhY2l0eSA9IFwiMTAwJVwiO1xuICAgICAgICAgICAgLy8gZW50cnkudGFyZ2V0LnN0eWxlLnRyYW5zZm9ybSA9IFwidHJhbnNsYXRlWCgwJSlcIjtcbiAgICAgICAgICAgIC8vIGVudHJ5LnRhcmdldC5zdHlsZS52aXNpYmlsaXR5ID0gXCJ2aXNpYmxlXCI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkMy5zZWxlY3RBbGwoXCJyZWN0XCIpXG4gICAgICAgICAgICAudHJhbnNpdGlvbigpXG4gICAgICAgICAgICAuYXR0cihcInlcIiwgNTAwKVxuICAgICAgICAgICAgLmR1cmF0aW9uKDEwMDApO1xuICAgICAgICAgICAgLy8gZW50cnkudGFyZ2V0LnN0eWxlLm9wYWNpdHkgPSBcIjAlXCI7XG4gICAgICAgICAgICAvLyBlbnRyeS50YXJnZXQuc3R5bGUudmlzaWJpbGl0eSA9IFwiaGlkZGVuXCI7XG4gICAgICAgICAgICAvLyBlbnRyeS50YXJnZXQuc3R5bGUudHJhbnNmb3JtID0gXCJ0cmFuc2xhdGVYKDUwJSlcIjtcbiAgICAgICAgfVxuICAgIH0pXG59XG5cblxuIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luIl0sInNvdXJjZVJvb3QiOiIifQ==