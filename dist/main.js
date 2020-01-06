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

var redBox, blueBox;
window.addEventListener("load", function (e) {
  redBox = document.querySelector("#red-box");
  blueBox = document.querySelector("#blue-box");
  createObserver();
}, false);

var createObserver = function createObserver() {
  var observer;
  var options = {
    root: null,
    rootMargin: "0px 0px 0px 0px",
    threshold: .25
  };
  observer = new IntersectionObserver(handleScrollOnto, options);
  observer.observe(redBox);
  observer.observe(blueBox);
};

var handleScrollOnto = function handleScrollOnto(entries, observer) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      // entry.target.style.opacity = "100%";
      entry.target.style.transform = "translateX(0%)"; // entry.target.style.visibility = "visible";
    } else {
      // entry.target.style.opacity = "0%";
      // entry.target.style.visibility = "hidden";
      entry.target.style.transform = "translateX(150%)";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9zdHlsZXMvaW5kZXguc2Nzcz9kYzJhIl0sIm5hbWVzIjpbInJlZEJveCIsImJsdWVCb3giLCJ3aW5kb3ciLCJhZGRFdmVudExpc3RlbmVyIiwiZSIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImNyZWF0ZU9ic2VydmVyIiwib2JzZXJ2ZXIiLCJvcHRpb25zIiwicm9vdCIsInJvb3RNYXJnaW4iLCJ0aHJlc2hvbGQiLCJJbnRlcnNlY3Rpb25PYnNlcnZlciIsImhhbmRsZVNjcm9sbE9udG8iLCJvYnNlcnZlIiwiZW50cmllcyIsImZvckVhY2giLCJlbnRyeSIsImlzSW50ZXJzZWN0aW5nIiwidGFyZ2V0Iiwic3R5bGUiLCJ0cmFuc2Zvcm0iXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNsRkE7QUFBQTtBQUFBO0FBQUE7QUFFQSxJQUFJQSxNQUFKLEVBQVlDLE9BQVo7QUFFQUMsTUFBTSxDQUFDQyxnQkFBUCxDQUF3QixNQUF4QixFQUFnQyxVQUFDQyxDQUFELEVBQU87QUFDbkNKLFFBQU0sR0FBR0ssUUFBUSxDQUFDQyxhQUFULENBQXVCLFVBQXZCLENBQVQ7QUFDQUwsU0FBTyxHQUFHSSxRQUFRLENBQUNDLGFBQVQsQ0FBdUIsV0FBdkIsQ0FBVjtBQUVBQyxnQkFBYztBQUNqQixDQUxELEVBS0csS0FMSDs7QUFPQSxJQUFNQSxjQUFjLEdBQUcsU0FBakJBLGNBQWlCLEdBQU07QUFDekIsTUFBSUMsUUFBSjtBQUVBLE1BQUlDLE9BQU8sR0FBRztBQUNaQyxRQUFJLEVBQUUsSUFETTtBQUVaQyxjQUFVLEVBQUUsaUJBRkE7QUFHWkMsYUFBUyxFQUFFO0FBSEMsR0FBZDtBQU1BSixVQUFRLEdBQUcsSUFBSUssb0JBQUosQ0FBeUJDLGdCQUF6QixFQUEyQ0wsT0FBM0MsQ0FBWDtBQUNBRCxVQUFRLENBQUNPLE9BQVQsQ0FBaUJmLE1BQWpCO0FBQ0FRLFVBQVEsQ0FBQ08sT0FBVCxDQUFpQmQsT0FBakI7QUFDSCxDQVpEOztBQWNBLElBQU1hLGdCQUFnQixHQUFHLFNBQW5CQSxnQkFBbUIsQ0FBQ0UsT0FBRCxFQUFVUixRQUFWLEVBQXVCO0FBQzVDUSxTQUFPLENBQUNDLE9BQVIsQ0FBZ0IsVUFBQUMsS0FBSyxFQUFJO0FBQ3JCLFFBQUlBLEtBQUssQ0FBQ0MsY0FBVixFQUEwQjtBQUN0QjtBQUNBRCxXQUFLLENBQUNFLE1BQU4sQ0FBYUMsS0FBYixDQUFtQkMsU0FBbkIsR0FBK0IsZ0JBQS9CLENBRnNCLENBR3RCO0FBQ0gsS0FKRCxNQUlPO0FBQ0g7QUFDQTtBQUNBSixXQUFLLENBQUNFLE1BQU4sQ0FBYUMsS0FBYixDQUFtQkMsU0FBbkIsR0FBK0Isa0JBQS9CO0FBQ0g7QUFDSixHQVZEO0FBV0gsQ0FaRCxDOzs7Ozs7Ozs7OztBQ3pCQSx1QyIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvZGlzdC9cIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXguanNcIik7XG4iLCJpbXBvcnQgJy4vc3R5bGVzL2luZGV4LnNjc3MnO1xuXG5sZXQgcmVkQm94LCBibHVlQm94O1xuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgKGUpID0+IHtcbiAgICByZWRCb3ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3JlZC1ib3hcIik7XG4gICAgYmx1ZUJveCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYmx1ZS1ib3hcIik7XG5cbiAgICBjcmVhdGVPYnNlcnZlcigpO1xufSwgZmFsc2UpO1xuXG5jb25zdCBjcmVhdGVPYnNlcnZlciA9ICgpID0+IHtcbiAgICBsZXQgb2JzZXJ2ZXI7XG4gICAgXG4gICAgbGV0IG9wdGlvbnMgPSB7XG4gICAgICByb290OiBudWxsLFxuICAgICAgcm9vdE1hcmdpbjogXCIwcHggMHB4IDBweCAwcHhcIixcbiAgICAgIHRocmVzaG9sZDogLjI1XG4gICAgfTtcblxuICAgIG9ic2VydmVyID0gbmV3IEludGVyc2VjdGlvbk9ic2VydmVyKGhhbmRsZVNjcm9sbE9udG8sIG9wdGlvbnMpO1xuICAgIG9ic2VydmVyLm9ic2VydmUocmVkQm94KTtcbiAgICBvYnNlcnZlci5vYnNlcnZlKGJsdWVCb3gpO1xufVxuXG5jb25zdCBoYW5kbGVTY3JvbGxPbnRvID0gKGVudHJpZXMsIG9ic2VydmVyKSA9PiB7XG4gICAgZW50cmllcy5mb3JFYWNoKGVudHJ5ID0+IHtcbiAgICAgICAgaWYgKGVudHJ5LmlzSW50ZXJzZWN0aW5nKSB7XG4gICAgICAgICAgICAvLyBlbnRyeS50YXJnZXQuc3R5bGUub3BhY2l0eSA9IFwiMTAwJVwiO1xuICAgICAgICAgICAgZW50cnkudGFyZ2V0LnN0eWxlLnRyYW5zZm9ybSA9IFwidHJhbnNsYXRlWCgwJSlcIjtcbiAgICAgICAgICAgIC8vIGVudHJ5LnRhcmdldC5zdHlsZS52aXNpYmlsaXR5ID0gXCJ2aXNpYmxlXCI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBlbnRyeS50YXJnZXQuc3R5bGUub3BhY2l0eSA9IFwiMCVcIjtcbiAgICAgICAgICAgIC8vIGVudHJ5LnRhcmdldC5zdHlsZS52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIjtcbiAgICAgICAgICAgIGVudHJ5LnRhcmdldC5zdHlsZS50cmFuc2Zvcm0gPSBcInRyYW5zbGF0ZVgoMTUwJSlcIjtcbiAgICAgICAgfVxuICAgIH0pXG59XG5cblxuIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luIl0sInNvdXJjZVJvb3QiOiIifQ==