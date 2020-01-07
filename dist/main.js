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
    threshold: .75
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
      }).duration(500); //   .delay(500);
      // createVisualization(nutritionData[0]);
      // entry.target.style.opacity = "100%";
      // entry.target.style.transform = "translateX(0%)";
      // entry.target.style.visibility = "visible";
    } else {
      d3.selectAll("rect").transition().attr("y", 500).duration(500); // entry.target.style.opacity = "0%";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9zdHlsZXMvaW5kZXguc2Nzcz9kYzJhIl0sIm5hbWVzIjpbInJlZEJveCIsImJsdWVCb3giLCJ0ZXh0Qm94IiwibnV0cml0aW9uRGF0YSIsImQzIiwiY3N2IiwiZCIsImZvb2RfbmFtZSIsInNlcnZpbmdfc2l6ZSIsImZpYmVyIiwiaXJvbiIsIm1hZ25lc2l1bSIsInBvdGFzc2l1bSIsInppbmMiLCJ2aXRhbWluX2MiLCJmb2xhdGUiLCJ2aXRhbWluX2IxMiIsInZpdGFtaW5fYSIsInZpdGFtaW5fZCIsImNob2xlc3Rlcm9sIiwidGhlbiIsImRhdGEiLCJjb25zb2xlIiwibG9nIiwiT2JqZWN0IiwidmFsdWVzIiwic2xpY2UiLCJjcmVhdGVWaXN1YWxpemF0aW9uIiwib2JqZWN0RGF0YSIsInciLCJoIiwibnVtYmVyT2ZDb2x1bW5zIiwibWF4VmFsdWUiLCJtYXgiLCJ4X2F4aXNMZW5ndGgiLCJ5X2F4aXNMZW5ndGgiLCJ5U2NhbGUiLCJzY2FsZUxpbmVhciIsImRvbWFpbiIsInJhbmdlIiwic3ZnIiwic2VsZWN0IiwiYXBwZW5kIiwiYXR0ciIsInNlbGVjdEFsbCIsImVudGVyIiwiaSIsIndpbmRvdyIsImFkZEV2ZW50TGlzdGVuZXIiLCJlIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiY3JlYXRlT2JzZXJ2ZXIiLCJvYnNlcnZlciIsIm9wdGlvbnMiLCJyb290Iiwicm9vdE1hcmdpbiIsInRocmVzaG9sZCIsIkludGVyc2VjdGlvbk9ic2VydmVyIiwiaGFuZGxlU2Nyb2xsT250byIsIm9ic2VydmUiLCJlbnRyaWVzIiwiZm9yRWFjaCIsImVudHJ5IiwiaXNJbnRlcnNlY3RpbmciLCJzaW5nbGVGb29kRGF0YSIsInRyYW5zaXRpb24iLCJkdXJhdGlvbiJdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFD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Q2RpQyxXQURZLEdBRVpDLE1BRlksQ0FFTCxDQUFDLENBQUQsRUFBSU4sUUFBSixDQUZLLEVBR1pPLEtBSFksQ0FHTixDQUFDLENBQUQsRUFBSUosWUFBSixDQUhNLENBQWI7QUFNQS9CLFFBQUUsQ0FBQ3dDLFNBQUgsQ0FBYSxNQUFiLEVBQ0d2QixJQURILENBQ1E0QyxjQURSLEVBRUdDLFVBRkgsR0FHR3ZCLElBSEgsQ0FHUSxHQUhSLEVBR2EsVUFBU3JDLENBQVQsRUFBWTtBQUNyQixlQUFPLE1BQU04QixNQUFNLENBQUM5QixDQUFELENBQW5CO0FBQ0QsT0FMSCxFQU1HcUMsSUFOSCxDQU1RLFFBTlIsRUFNa0IsVUFBU3JDLENBQVQsRUFBWTtBQUMxQixlQUFPOEIsTUFBTSxDQUFDOUIsQ0FBRCxDQUFiO0FBQ0QsT0FSSCxFQVNHNkQsUUFUSCxDQVNZLEdBVFosRUFmc0IsQ0F5QnRCO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDSCxLQS9CRCxNQStCTztBQUNIL0QsUUFBRSxDQUFDd0MsU0FBSCxDQUFhLE1BQWIsRUFDQ3NCLFVBREQsR0FFQ3ZCLElBRkQsQ0FFTSxHQUZOLEVBRVcsR0FGWCxFQUdDd0IsUUFIRCxDQUdVLEdBSFYsRUFERyxDQUtIO0FBQ0E7QUFDQTtBQUNIO0FBQ0osR0F6Q0Q7QUEwQ0gsQ0EzQ0QsQzs7Ozs7Ozs7Ozs7QUM5RkEsdUMiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL2Rpc3QvXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LmpzXCIpO1xuIiwiaW1wb3J0ICcuL3N0eWxlcy9pbmRleC5zY3NzJztcblxubGV0IHJlZEJveCwgYmx1ZUJveCwgdGV4dEJveDtcblxubGV0IG51dHJpdGlvbkRhdGE7XG5cbmQzLmNzdihcIm51dHJpdGlvbl9mYWN0c19mb3Jfc2Nyb2xsZXIuY3N2XCIsIGQgPT4ge1xuICByZXR1cm4ge1xuICAgIGZvb2RfbmFtZTogZFtcIkZvb2QgbmFtZVwiXSxcbiAgICBzZXJ2aW5nX3NpemU6IGRbXCJBbW91bnRcIl0sXG4gICAgZmliZXI6ICtkW1wiRmliZXJcIl0sXG4gICAgaXJvbjogK2RbXCJJcm9uXCJdLFxuICAgIG1hZ25lc2l1bTogK2RbXCJNYWduZXNpdW1cIl0sXG4gICAgcG90YXNzaXVtOiArZFtcIlBvdGFzc2l1bVwiXSxcbiAgICB6aW5jOiArZFtcIlppbmNcIl0sXG4gICAgdml0YW1pbl9jOiArZFtcIlZpdGFtaW4gQ1wiXSxcbiAgICBmb2xhdGU6ICtkW1wiRm9sYXRlXCJdLFxuICAgIHZpdGFtaW5fYjEyOiArZFtcIlZpdGFtaW4gQi0xMlwiXSxcbiAgICB2aXRhbWluX2E6ICtkW1wiVml0YW1pbiBBXCJdLFxuICAgIHZpdGFtaW5fZDogK2RbXCJWaXRhbWluIERcIl0sXG4gICAgY2hvbGVzdGVyb2w6ICtkW1wiQ2hvbGVzdGVyb2xcIl1cbiAgfTtcbn0pLnRoZW4oZGF0YSA9PiB7XG4gIG51dHJpdGlvbkRhdGEgPSBkYXRhO1xuICBjb25zb2xlLmxvZyhudXRyaXRpb25EYXRhKTtcbiAgY29uc29sZS5sb2coT2JqZWN0LnZhbHVlcyhudXRyaXRpb25EYXRhWzBdKS5zbGljZSgyLCAtMSkpO1xuICBjcmVhdGVWaXN1YWxpemF0aW9uKG51dHJpdGlvbkRhdGFbMF0pO1xufSk7XG5cbmNvbnN0IGNyZWF0ZVZpc3VhbGl6YXRpb24gPSBvYmplY3REYXRhID0+IHtcbiAgbGV0IHcgPSA2MDA7XG4gIGxldCBoID0gNTAwO1xuXG4gIGxldCBkYXRhID0gT2JqZWN0LnZhbHVlcyhvYmplY3REYXRhKS5zbGljZSgyLCAtMSk7XG4gIGxldCBudW1iZXJPZkNvbHVtbnMgPSAxMDtcbiAgbGV0IG1heFZhbHVlID0gZDMubWF4KGRhdGEsIGZ1bmN0aW9uKGQpIHtcbiAgICByZXR1cm4gK2Q7XG4gIH0pO1xuICBsZXQgeF9heGlzTGVuZ3RoID0gdyAtIDUwO1xuICBsZXQgeV9heGlzTGVuZ3RoID0gaCAtIDUwO1xuXG4gIGxldCB5U2NhbGUgPSBkM1xuICAgIC5zY2FsZUxpbmVhcigpXG4gICAgLmRvbWFpbihbMCwgbWF4VmFsdWVdKVxuICAgIC5yYW5nZShbMCwgeV9heGlzTGVuZ3RoXSk7XG5cbiAgbGV0IHN2ZyA9IGQzXG4gICAgLnNlbGVjdChcIiN0ZXh0LWJveFwiKVxuICAgIC5hcHBlbmQoXCJzdmdcIilcbiAgICAuYXR0cihcIndpZHRoXCIsIHcpXG4gICAgLmF0dHIoXCJoZWlnaHRcIiwgaCk7XG5cbiAgc3ZnXG4gICAgLnNlbGVjdEFsbChcInJlY3RcIilcbiAgICAuZGF0YShkYXRhKVxuICAgIC5lbnRlcigpXG4gICAgLmFwcGVuZChcInJlY3RcIilcbiAgICAuYXR0cihcInhcIiwgZnVuY3Rpb24oZCwgaSkge1xuICAgICAgcmV0dXJuIGkgKiAoeF9heGlzTGVuZ3RoIC8gbnVtYmVyT2ZDb2x1bW5zKSArIDI1O1xuICAgIH0pXG4gICAgLmF0dHIoXCJ5XCIsIGZ1bmN0aW9uKGQpIHtcbiAgICAgIHJldHVybiBoIC0geVNjYWxlKGQpO1xuICAgIH0pXG4gICAgLmF0dHIoXCJ3aWR0aFwiLCB4X2F4aXNMZW5ndGggLyBudW1iZXJPZkNvbHVtbnMgLSAxKVxuICAgIC5hdHRyKFwiaGVpZ2h0XCIsIGZ1bmN0aW9uKGQpIHtcbiAgICAgIHJldHVybiB5U2NhbGUoZCk7XG4gICAgfSlcbiAgICAuYXR0cihcImZpbGxcIiwgXCJyZWRcIik7XG59O1xuXG5cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLCAoZSkgPT4ge1xuICAgIHRleHRCb3ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3RleHQtYm94XCIpO1xuICAgIHJlZEJveCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcmVkLWJveFwiKTtcbiAgICBibHVlQm94ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNibHVlLWJveFwiKTtcblxuICAgIGNyZWF0ZU9ic2VydmVyKCk7XG59LCBmYWxzZSk7XG5cbmNvbnN0IGNyZWF0ZU9ic2VydmVyID0gKCkgPT4ge1xuICAgIGxldCBvYnNlcnZlcjtcbiAgICBcbiAgICBsZXQgb3B0aW9ucyA9IHtcbiAgICAgIHJvb3Q6IG51bGwsXG4gICAgICByb290TWFyZ2luOiBcIjBweCAwcHggMHB4IDBweFwiLFxuICAgICAgdGhyZXNob2xkOiAuNzVcbiAgICB9O1xuXG4gICAgb2JzZXJ2ZXIgPSBuZXcgSW50ZXJzZWN0aW9uT2JzZXJ2ZXIoaGFuZGxlU2Nyb2xsT250bywgb3B0aW9ucyk7XG4gICAgLy8gb2JzZXJ2ZXIub2JzZXJ2ZShyZWRCb3gpO1xuICAgIG9ic2VydmVyLm9ic2VydmUodGV4dEJveCk7XG4gICAgLy8gb2JzZXJ2ZXIub2JzZXJ2ZShibHVlQm94KTtcbn1cblxuY29uc3QgaGFuZGxlU2Nyb2xsT250byA9IChlbnRyaWVzLCBvYnNlcnZlcikgPT4ge1xuICAgIGVudHJpZXMuZm9yRWFjaChlbnRyeSA9PiB7XG4gICAgICAgIGlmIChlbnRyeS5pc0ludGVyc2VjdGluZykge1xuXG4gICAgICAgICAgICBsZXQgc2luZ2xlRm9vZERhdGEgPSBPYmplY3QudmFsdWVzKG51dHJpdGlvbkRhdGFbMF0pLnNsaWNlKDIsIC0xKTtcbiAgICAgICAgICAgIGxldCBtYXhWYWx1ZSA9IGQzLm1heChzaW5nbGVGb29kRGF0YSwgZnVuY3Rpb24oZCkge1xuICAgICAgICAgICAgcmV0dXJuICtkO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAvLyBsZXQgeF9heGlzTGVuZ3RoID0gdyAtIDUwO1xuICAgICAgICAgICAgbGV0IHlfYXhpc0xlbmd0aCA9IDQ1MDtcblxuICAgICAgICAgICAgbGV0IHlTY2FsZSA9IGQzXG4gICAgICAgICAgICAuc2NhbGVMaW5lYXIoKVxuICAgICAgICAgICAgLmRvbWFpbihbMCwgbWF4VmFsdWVdKVxuICAgICAgICAgICAgLnJhbmdlKFswLCB5X2F4aXNMZW5ndGhdKTtcblxuXG4gICAgICAgICAgICBkMy5zZWxlY3RBbGwoXCJyZWN0XCIpXG4gICAgICAgICAgICAgIC5kYXRhKHNpbmdsZUZvb2REYXRhKVxuICAgICAgICAgICAgICAudHJhbnNpdGlvbigpXG4gICAgICAgICAgICAgIC5hdHRyKFwieVwiLCBmdW5jdGlvbihkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIDUwMCAtIHlTY2FsZShkKTtcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgLmF0dHIoXCJoZWlnaHRcIiwgZnVuY3Rpb24oZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB5U2NhbGUoZCk7XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIC5kdXJhdGlvbig1MDApXG4gICAgICAgICAgICAvLyAgIC5kZWxheSg1MDApO1xuXG4gICAgICAgICAgICAvLyBjcmVhdGVWaXN1YWxpemF0aW9uKG51dHJpdGlvbkRhdGFbMF0pO1xuICAgICAgICAgICAgLy8gZW50cnkudGFyZ2V0LnN0eWxlLm9wYWNpdHkgPSBcIjEwMCVcIjtcbiAgICAgICAgICAgIC8vIGVudHJ5LnRhcmdldC5zdHlsZS50cmFuc2Zvcm0gPSBcInRyYW5zbGF0ZVgoMCUpXCI7XG4gICAgICAgICAgICAvLyBlbnRyeS50YXJnZXQuc3R5bGUudmlzaWJpbGl0eSA9IFwidmlzaWJsZVwiO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZDMuc2VsZWN0QWxsKFwicmVjdFwiKVxuICAgICAgICAgICAgLnRyYW5zaXRpb24oKVxuICAgICAgICAgICAgLmF0dHIoXCJ5XCIsIDUwMClcbiAgICAgICAgICAgIC5kdXJhdGlvbig1MDApO1xuICAgICAgICAgICAgLy8gZW50cnkudGFyZ2V0LnN0eWxlLm9wYWNpdHkgPSBcIjAlXCI7XG4gICAgICAgICAgICAvLyBlbnRyeS50YXJnZXQuc3R5bGUudmlzaWJpbGl0eSA9IFwiaGlkZGVuXCI7XG4gICAgICAgICAgICAvLyBlbnRyeS50YXJnZXQuc3R5bGUudHJhbnNmb3JtID0gXCJ0cmFuc2xhdGVYKDUwJSlcIjtcbiAgICAgICAgfVxuICAgIH0pXG59XG5cblxuIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luIl0sInNvdXJjZVJvb3QiOiIifQ==