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
    var bananaIcon = document.getElementById("banana-svg-container");
    var bananaChildren = bananaIcon.childNodes;

    if (bananaChildren[3]) {
      for (var i = 0; i < 20; i++) {
        bananaIcon.removeChild(bananaChildren[3]);
      }
    } // for (let i = 3; i < bananaChildren.length + 3; i++) {
    // }


    var upwardMove, downwardMove;
    var bananaIconPos = {
      top: bananaIcon.getBoundingClientRect().top,
      left: bananaIcon.getBoundingClientRect().left
    };

    var movementFunc = function movementFunc(newBanana) {
      var newBananaPos = {
        top: Math.floor(Math.random() * -5),
        left: Math.floor(Math.random() * window.innerWidth)
      }; //   let frameUpward = () => {
      //       if (newBananaPos.left > 350) {
      //         clearInterval(upwardMove);
      //         downwardMove = setInterval(frameDownward, 3);
      //       } else {
      //         newBananaPos.top -= Math.floor(Math.random() * 5);
      //         newBananaPos.left += Math.floor(Math.random() * 8);
      //         newBanana.style.top = newBananaPos.top + "px";
      //         newBanana.style.left = newBananaPos.left + "px";
      //       }
      //   }
      //     upwardMove = setInterval(frameUpward, 3);
      //   let velocity = 0;

      var velocity = Math.floor(Math.random() * 10);

      var frameDownward = function frameDownward() {
        if (newBananaPos.top > 1500) {
          clearInterval(downwardMove); //   bananaIcon.removeChild(newBanana);
        } else {
          newBananaPos.top += velocity + 5; //   newBananaPos.top *= -1.1;
          //   newBananaPos.left += Math.floor(Math.random() * 8);
          //   newBananaPos.right += Math.floor(Math.random() * 8);

          newBanana.style.top = newBananaPos.top + "px"; //   newBanana.style.left = newBananaPos.left + "px";
          //   newBanana.style.right = newBananaPos.right + "px";
        }
      };

      downwardMove = setInterval(frameDownward, 2); //   setTimeout(() => {
      //     bananaIcon.removeChild(newBanana);
      // let bananaChildren = bananaIcon.childNodes;
      // debugger;
      // for (let i = 0; i < 20; i++) {
      //     debugger;
      // }
      // for (let i = 3; i < bananaChildren.length + 3; i++) {
      //     bananaIcon.removeChild(bananaChildren[i]);
      // }
      //   }, 1000);
    }; // let movementFunc = newBanana => {
    //   let newBananaPos = {
    //     top: newBanana.getBoundingClientRect().top,
    //     left: newBanana.getBoundingClientRect().left
    //   };
    //   let frameUpward = () => {
    //       if (newBananaPos.left > 350) {
    //         clearInterval(upwardMove);
    //         downwardMove = setInterval(frameDownward, 3);
    //       } else {
    //         newBananaPos.top -= Math.floor(Math.random() * 5);
    //         newBananaPos.left += Math.floor(Math.random() * 8);
    //         newBanana.style.top = newBananaPos.top + "px";
    //         newBanana.style.left = newBananaPos.left + "px";
    //       }
    //   }
    //     upwardMove = setInterval(frameUpward, 3);
    //   let frameDownward = () => {
    //     if (newBananaPos.top > 1500) {
    //       clearInterval(downwardMove);
    //     } else {
    //       newBananaPos.top += Math.floor(Math.random() * 5);
    //       newBananaPos.left += Math.floor(Math.random() * 8);
    //       newBanana.style.top = newBananaPos.top + "px";
    //       newBanana.style.left = newBananaPos.left + "px";
    //     }
    //   };
    // };


    for (var _i = bananaCounter; _i < bananaCounter + 20; _i++) {
      var newBanana = document.createElement("div");
      newBanana.setAttribute("id", "flying-banana-".concat(_i));
      newBanana.classList.add("flying-banana");
      bananaIcon.appendChild(newBanana);
      var thisOneParticularBanana = document.getElementById("flying-banana-".concat(_i));
      thisOneParticularBanana.style.top = "-5px";
      thisOneParticularBanana.style.left = Math.floor(Math.random() * window.innerWidth) + "px";
      movementFunc(thisOneParticularBanana);
    }

    bananaCounter += 10; // let i = bananaCounter;
    // bananaCounter += 1;
    // let newBanana = document.createElement("div");
    // newBanana.setAttribute('id', `flying-banana-${i}`);
    // newBanana.classList.add(`flying-banana`);
    // bananaIcon.appendChild(newBanana);
    // let thisOneParticularBanana = document.getElementById(
    //     `flying-banana-${i}`
    // );
    // thisOneParticularBanana.style.top = bananaIconPos.top + "px";
    // thisOneParticularBanana.style.left = bananaIconPos.left + "px";
    // movementFunc(thisOneParticularBanana);
  });
});

var createObservers = function createObservers(slides) {
  var options = {
    root: null,
    rootMargin: "0px 0px 0px 0px",
    threshold: .3
  };
  console.log(slides); // Slides.bananaSlide(options, slides[0]);
  // Slides.potatoSlide(options, slides[1]);
  // Slides.butterSlide(options, slides[2]);
  // Slides.avocadoSlide(options, slides[3]);
  // Slides.beefLiverSlide(options, slides[4]);
  // Slides.codLiverSlide(options, slides[5]);

  for (var i = 0; i < slides.length - 1; i++) {
    _scripts_scroll_slides__WEBPACK_IMPORTED_MODULE_1__["renderSlide"](options, slides[i], i);
  }
};

/***/ }),

/***/ "./src/scripts/scroll/slides.js":
/*!**************************************!*\
  !*** ./src/scripts/scroll/slides.js ***!
  \**************************************/
/*! exports provided: bananaSlide, potatoSlide, butterSlide, avocadoSlide, beefLiverSlide, codLiverSlide, renderSlide, herringSlide, tunaSlide, broccoliSlide, peasSlide, redPepperSlide, oysterSlide, spinachSlide, quinoaSlide, chocolateSlide, strawberrySlide, beanSlide */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "bananaSlide", function() { return bananaSlide; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "potatoSlide", function() { return potatoSlide; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "butterSlide", function() { return butterSlide; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "avocadoSlide", function() { return avocadoSlide; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "beefLiverSlide", function() { return beefLiverSlide; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "codLiverSlide", function() { return codLiverSlide; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "renderSlide", function() { return renderSlide; });
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
var beefLiverSlide = function beefLiverSlide(options, slide) {
  var handleBeefLiverScrollOnto = function handleBeefLiverScrollOnto(entries, observer) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var beefLiverRects = document.querySelectorAll(".slide-svg-4-rect");
        beefLiverRects.forEach(function (rect) {
          rect.classList.remove("hidden");
        });
        var avocadoRects = document.querySelectorAll(".slide-svg-3-rect");
        avocadoRects.forEach(function (rect) {
          rect.classList.add("hidden");
        });
        var codLiverRects = document.querySelectorAll(".slide-svg-5-rect");
        codLiverRects.forEach(function (rect) {
          rect.classList.add("hidden");
        });
        d3.select(".slide-svg-4-y-axis").transition().style("opacity", "100%").duration(500);
        d3.select(".slide-svg-3-y-axis").transition().style("opacity", "0%").duration(500);
        d3.select(".slide-svg-5-y-axis").transition().style("opacity", "0%").duration(500);
      }
    });
  };

  var observer = new IntersectionObserver(handleBeefLiverScrollOnto, options);
  observer.observe(slide);
};
var codLiverSlide = function codLiverSlide(options, slide) {
  var handleCodLiverScrollOnto = function handleCodLiverScrollOnto(entries, observer) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var codLiverRects = document.querySelectorAll(".slide-svg-5-rect");
        codLiverRects.forEach(function (rect) {
          rect.classList.remove("hidden");
        });
        var beefLiverRects = document.querySelectorAll(".slide-svg-4-rect");
        beefLiverRects.forEach(function (rect) {
          rect.classList.add("hidden");
        });
        var eggRects = document.querySelectorAll(".slide-svg-6-rect");
        eggRects.forEach(function (rect) {
          rect.classList.add("hidden");
        });
        d3.select(".slide-svg-5-y-axis").transition().style("opacity", "100%").duration(500);
        d3.select(".slide-svg-4-y-axis").transition().style("opacity", "0%").duration(500);
        d3.select(".slide-svg-6-y-axis").transition().style("opacity", "0%").duration(500);
      }
    });
  };

  var observer = new IntersectionObserver(handleCodLiverScrollOnto, options);
  observer.observe(slide);
};
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
        } // document.querySelectorAll(`.slide-svg-${idx + 1}-rect`).forEach(rect => {
        //   rect.classList.add("hidden");
        // });


        d3.select(".slide-svg-".concat(idx, "-y-axis")).transition().style("opacity", "100%").duration(500);

        if (document.querySelector(".slide-svg-".concat(idx - 1, "-y-axis"))) {
          d3.select(".slide-svg-".concat(idx - 1, "-y-axis")).transition().style("opacity", "0%").duration(500);
        }

        if (document.querySelector(".slide-svg-".concat(idx + 1, "-y-axis"))) {
          d3.select(".slide-svg-".concat(idx + 1, "-y-axis")).transition().style("opacity", "0%").duration(500);
        } // d3.select(`.slide-svg-${idx + 1}-y-axis`)
        //   .transition()
        //   .style("opacity", "0%")
        //   .duration(500);

      }
    });
  };

  var observer = new IntersectionObserver(handleScrollOnto, options);
  observer.observe(slide);
}; // export const eggSlide = (options, slide) => {
//     let idx = 6;
//   const handleEggScrollOnto = (entries, observer) => {
//     entries.forEach(entry => {
//       if (entry.isIntersecting) {
//         document.querySelectorAll(`.slide-svg-${idx}-rect`).forEach(rect => {
//           rect.classList.remove("hidden");
//         });
//         document.querySelectorAll(`.slide-svg-${idx - 1}-rect`).forEach(rect => {
//           rect.classList.add("hidden");
//         });
//         document.querySelectorAll(`.slide-svg-${idx + 1}-rect`).forEach(rect => {
//           rect.classList.add("hidden");
//         });
//         d3.select(`.slide-svg-${idx}-y-axis`)
//           .transition()
//           .style("opacity", "100%")
//           .duration(500);
//         d3.select(`.slide-svg-${idx - 1}-y-axis`)
//           .transition()
//           .style("opacity", "0%")
//           .duration(500);
//         d3.select(`.slide-svg-${idx + 1}-y-axis`)
//           .transition()
//           .style("opacity", "0%")
//           .duration(500);
//       }
//     });
//   };
//   let observer = new IntersectionObserver(handleEggScrollOnto, options);
//   observer.observe(slide);
// }

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL3Njcm9sbC9zbGlkZXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0eWxlcy9pbmRleC5zY3NzIl0sIm5hbWVzIjpbIm51dHJpdGlvbkRhdGEiLCJiYW5hbmFDb3VudGVyIiwiZDMiLCJjc3YiLCJkIiwiZm9vZF9uYW1lIiwic2VydmluZ19zaXplIiwiZmliZXIiLCJpcm9uIiwibWFnbmVzaXVtIiwicG90YXNzaXVtIiwiemluYyIsInZpdGFtaW5fYyIsImZvbGF0ZSIsInZpdGFtaW5fYjEyIiwidml0YW1pbl9hIiwidml0YW1pbl9kIiwiY2hvbGVzdGVyb2wiLCJ0aGVuIiwiZGF0YSIsImNvbnNvbGUiLCJsb2ciLCJjcmVhdGVWaXN1YWxpemF0aW9uIiwiaSIsImxlbmd0aCIsImZvb2REYXRhIiwiaWR4IiwiY3JlYXRlWEF4aXNCb29sIiwibWFyZ2luIiwidG9wIiwicmlnaHQiLCJib3R0b20iLCJsZWZ0IiwidyIsImgiLCJPYmplY3QiLCJ2YWx1ZXMiLCJzbGljZSIsIm51bWJlck9mQ29sdW1ucyIsIm1heFZhbHVlIiwiTWF0aCIsIm1heCIsInhfYXhpc0xlbmd0aCIsInlfYXhpc0xlbmd0aCIsInRhcmdldFNWRyIsInRhcmdldFNsaWRlUmVjdCIsInhTY2FsZSIsInNjYWxlTGluZWFyIiwiZG9tYWluIiwicmFuZ2UiLCJ5U2NhbGUiLCJzdmciLCJzZWxlY3QiLCJhcHBlbmQiLCJhdHRyIiwic2VsZWN0QWxsIiwiZW50ZXIiLCJ0cmFuc2l0aW9uIiwiZHVyYXRpb24iLCJ4QXhpcyIsImF4aXNCb3R0b20iLCJ0aWNrU2l6ZSIsInRpY2tGb3JtYXQiLCJrZXlzIiwidW5kZWZpbmVkIiwiY2FsbCIsInlBeGlzIiwiYXhpc0xlZnQiLCJ0aWNrcyIsInN0eWxlIiwid2luZG93IiwiYWRkRXZlbnRMaXN0ZW5lciIsImUiLCJzbGlkZXMiLCJzbGlkZU5hbWUiLCJuZXdTbGlkZSIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsInB1c2giLCJjcmVhdGVPYnNlcnZlcnMiLCJnZXRFbGVtZW50QnlJZCIsImJhbmFuYUljb24iLCJiYW5hbmFDaGlsZHJlbiIsImNoaWxkTm9kZXMiLCJyZW1vdmVDaGlsZCIsInVwd2FyZE1vdmUiLCJkb3dud2FyZE1vdmUiLCJiYW5hbmFJY29uUG9zIiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwibW92ZW1lbnRGdW5jIiwibmV3QmFuYW5hIiwibmV3QmFuYW5hUG9zIiwiZmxvb3IiLCJyYW5kb20iLCJpbm5lcldpZHRoIiwidmVsb2NpdHkiLCJmcmFtZURvd253YXJkIiwiY2xlYXJJbnRlcnZhbCIsInNldEludGVydmFsIiwiY3JlYXRlRWxlbWVudCIsInNldEF0dHJpYnV0ZSIsImNsYXNzTGlzdCIsImFkZCIsImFwcGVuZENoaWxkIiwidGhpc09uZVBhcnRpY3VsYXJCYW5hbmEiLCJvcHRpb25zIiwicm9vdCIsInJvb3RNYXJnaW4iLCJ0aHJlc2hvbGQiLCJTbGlkZXMiLCJiYW5hbmFTbGlkZSIsInNsaWRlIiwiaGFuZGxlQmFuYW5hU2Nyb2xsT250byIsImVudHJpZXMiLCJvYnNlcnZlciIsImZvckVhY2giLCJlbnRyeSIsImlzSW50ZXJzZWN0aW5nIiwiYmFuYW5hUmVjdHMiLCJxdWVyeVNlbGVjdG9yQWxsIiwicmVjdCIsInJlbW92ZSIsInBvdGF0b1JlY3RzIiwiSW50ZXJzZWN0aW9uT2JzZXJ2ZXIiLCJvYnNlcnZlIiwicG90YXRvU2xpZGUiLCJoYW5kbGVQb3RhdG9TY3JvbGxPbnRvIiwiYnV0dGVyUmVjdHMiLCJidXR0ZXJTbGlkZSIsImhhbmRsZUJ1dHRlclNjcm9sbE9udG8iLCJhdm9jYWRvUmVjdHMiLCJhdm9jYWRvU2xpZGUiLCJoYW5kbGVBdm9jYWRvU2Nyb2xsT250byIsImJlZWZMaXZlclJlY3RzIiwiYmVlZkxpdmVyU2xpZGUiLCJoYW5kbGVCZWVmTGl2ZXJTY3JvbGxPbnRvIiwiY29kTGl2ZXJSZWN0cyIsImNvZExpdmVyU2xpZGUiLCJoYW5kbGVDb2RMaXZlclNjcm9sbE9udG8iLCJlZ2dSZWN0cyIsInJlbmRlclNsaWRlIiwiaGFuZGxlU2Nyb2xsT250byIsImhlcnJpbmdTbGlkZSIsInR1bmFTbGlkZSIsImJyb2Njb2xpU2xpZGUiLCJwZWFzU2xpZGUiLCJyZWRQZXBwZXJTbGlkZSIsIm95c3RlclNsaWRlIiwic3BpbmFjaFNsaWRlIiwicXVpbm9hU2xpZGUiLCJjaG9jb2xhdGVTbGlkZSIsInN0cmF3YmVycnlTbGlkZSIsImJlYW5TbGlkZSJdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7OztBQ2xGQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFFQSxJQUFJQSxhQUFKO0FBQ0EsSUFBSUMsYUFBYSxHQUFHLENBQXBCO0FBRUFDLEVBQUUsQ0FBQ0MsR0FBSCxDQUFPLGtDQUFQLEVBQTJDLFVBQUFDLENBQUMs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OUMsQ0FKTTtBQU1BLElBQU1xQyxZQUFZLEdBQUcsU0FBZkEsWUFBZSxDQUFDM0MsT0FBRCxFQUFVTSxLQUFWLEVBQW9CLENBSS9DLENBSk07QUFNQSxJQUFNc0MsV0FBVyxHQUFHLFNBQWRBLFdBQWMsQ0FBQzVDLE9BQUQsRUFBVU0sS0FBVixFQUFvQixDQUk5QyxDQUpNO0FBTUEsSUFBTXVDLGNBQWMsR0FBRyxTQUFqQkEsY0FBaUIsQ0FBQzdDLE9BQUQsRUFBVU0sS0FBVixFQUFvQixDQUlqRCxDQUpNO0FBTUEsSUFBTXdDLGVBQWUsR0FBRyxTQUFsQkEsZUFBa0IsQ0FBQzlDLE9BQUQsRUFBVU0sS0FBVixFQUFvQixDQUlsRCxDQUpNO0FBTUEsSUFBTXlDLFNBQVMsR0FBRyxTQUFaQSxTQUFZLENBQUMvQyxPQUFELEVBQVVNLEtBQVYsRUFBb0IsQ0FJNUMsQ0FKTSxDOzs7Ozs7Ozs7OztBQ25hUCx1QyIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvZGlzdC9cIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXguanNcIik7XG4iLCJpbXBvcnQgJy4vc3R5bGVzL2luZGV4LnNjc3MnO1xuaW1wb3J0ICogYXMgU2xpZGVzIGZyb20gJy4vc2NyaXB0cy9zY3JvbGwvc2xpZGVzJztcblxubGV0IG51dHJpdGlvbkRhdGE7XG5sZXQgYmFuYW5hQ291bnRlciA9IDA7XG5cbmQzLmNzdihcIm51dHJpdGlvbl9mYWN0c19mb3Jfc2Nyb2xsZXIuY3N2XCIsIGQgPT4ge1xuICByZXR1cm4ge1xuICAgIGZvb2RfbmFtZTogZFtcIkZvb2QgbmFtZVwiXSxcbiAgICBzZXJ2aW5nX3NpemU6IGRbXCJBbW91bnRcIl0sXG4gICAgZmliZXI6ICtkW1wiRmliZXJcIl0sXG4gICAgaXJvbjogK2RbXCJJcm9uXCJdLFxuICAgIG1hZ25lc2l1bTogK2RbXCJNYWduZXNpdW1cIl0sXG4gICAgcG90YXNzaXVtOiArZFtcIlBvdGFzc2l1bVwiXSxcbiAgICB6aW5jOiArZFtcIlppbmNcIl0sXG4gICAgdml0YW1pbl9jOiArZFtcIlZpdGFtaW4gQ1wiXSxcbiAgICBmb2xhdGU6ICtkW1wiRm9sYXRlXCJdLFxuICAgIHZpdGFtaW5fYjEyOiArZFtcIlZpdGFtaW4gQi0xMlwiXSxcbiAgICB2aXRhbWluX2E6ICtkW1wiVml0YW1pbiBBXCJdLFxuICAgIHZpdGFtaW5fZDogK2RbXCJWaXRhbWluIERcIl0sXG4gICAgY2hvbGVzdGVyb2w6ICtkW1wiQ2hvbGVzdGVyb2xcIl1cbiAgfTtcbn0pLnRoZW4oZGF0YSA9PiB7XG4gICAgbnV0cml0aW9uRGF0YSA9IGRhdGE7XG4gICAgY29uc29sZS5sb2cobnV0cml0aW9uRGF0YSk7XG4gICAgXG4gICAgY3JlYXRlVmlzdWFsaXphdGlvbihudXRyaXRpb25EYXRhWzBdLCAwLCB0cnVlKTtcblxuICAgIGZvciAobGV0IGkgPSAxOyBpIDwgbnV0cml0aW9uRGF0YS5sZW5ndGg7IGkrKykge1xuICAgICAgICBjcmVhdGVWaXN1YWxpemF0aW9uKG51dHJpdGlvbkRhdGFbaV0sIGkpO1xuICAgIH1cblxufSk7XG5cbmNvbnN0IGNyZWF0ZVZpc3VhbGl6YXRpb24gPSAoZm9vZERhdGEsIGlkeCwgY3JlYXRlWEF4aXNCb29sKSA9PiB7XG4gIGxldCBtYXJnaW4gPSB7dG9wOiA0MCwgcmlnaHQ6IDQwLCBib3R0b206IDY1LCBsZWZ0OiA1MH1cbiAgbGV0IHcgPSA3MDAgLSBtYXJnaW4ubGVmdCAtIG1hcmdpbi5yaWdodDtcbiAgbGV0IGggPSA2MDAgLSBtYXJnaW4udG9wIC0gbWFyZ2luLmJvdHRvbTtcblxuICBsZXQgZGF0YSA9IE9iamVjdC52YWx1ZXMoZm9vZERhdGEpLnNsaWNlKDIsIC0xKTtcbiAgbGV0IG51bWJlck9mQ29sdW1ucyA9IDEwO1xuICBsZXQgbWF4VmFsdWUgPSBNYXRoLm1heCguNTAsIGQzLm1heChkYXRhLCBmdW5jdGlvbihkKSB7XG4gICAgcmV0dXJuICgrZCAvIDEwMCk7XG4gIH0pKTtcbiAgbGV0IHhfYXhpc0xlbmd0aCA9IHc7XG4gIGxldCB5X2F4aXNMZW5ndGggPSBoO1xuICBsZXQgdGFyZ2V0U1ZHID0gXCJzbGlkZS1zdmctXCIgKyBpZHg7XG4gIGxldCB0YXJnZXRTbGlkZVJlY3QgPSBcInNsaWRlLXN2Zy1cIiArIGlkeCArIFwiLXJlY3RcIjtcblxuICBsZXQgeFNjYWxlID0gZDNcbiAgICAuc2NhbGVMaW5lYXIoKVxuICAgIC5kb21haW4oWzAsIG51bWJlck9mQ29sdW1uc10pXG4gICAgLnJhbmdlKFswLCB3XSk7XG5cbiAgbGV0IHlTY2FsZSA9IGQzXG4gICAgLnNjYWxlTGluZWFyKClcbiAgICAuZG9tYWluKFswLCBtYXhWYWx1ZV0pXG4gICAgLnJhbmdlKFtoIC0gbWFyZ2luLnRvcCwgbWFyZ2luLmJvdHRvbV0pO1xuXG4gIGxldCBzdmcgPSBkM1xuICAgIC5zZWxlY3QoXCIjdmlzXCIpXG4gICAgLmFwcGVuZChcInN2Z1wiKVxuICAgIC5hdHRyKFwid2lkdGhcIiwgdyArIG1hcmdpbi5sZWZ0ICsgbWFyZ2luLnJpZ2h0KVxuICAgIC5hdHRyKFwiaGVpZ2h0XCIsIGggKyBtYXJnaW4udG9wICsgbWFyZ2luLmJvdHRvbSk7XG5cbiAgc3ZnXG4gICAgLnNlbGVjdEFsbChcInJlY3RcIilcbiAgICAuZGF0YShkYXRhKVxuICAgIC5lbnRlcigpXG4gICAgLmFwcGVuZChcInJlY3RcIilcbiAgICAuYXR0cihcImNsYXNzXCIsIGAke3RhcmdldFNsaWRlUmVjdH0gaGlkZGVuIGNoYXJ0LXJlY3RgKVxuICAgIC5hdHRyKFwieFwiLCBmdW5jdGlvbihkLCBpKSB7XG4gICAgICByZXR1cm4gaSAqICh4X2F4aXNMZW5ndGggLyBudW1iZXJPZkNvbHVtbnMpICsgbWFyZ2luLmxlZnQgKyAxMDtcbiAgICB9KVxuICAgIC5hdHRyKFwieVwiLCBmdW5jdGlvbihkKSB7XG4gICAgICByZXR1cm4geVNjYWxlKGQgLyAxMDApO1xuICAgIH0pXG4gICAgLmF0dHIoXCJ3aWR0aFwiLCB4X2F4aXNMZW5ndGggLyBudW1iZXJPZkNvbHVtbnMgLSAxKVxuICAgIC5hdHRyKFwiaGVpZ2h0XCIsIGZ1bmN0aW9uKGQpIHtcbiAgICAgIHJldHVybiBoIC0geVNjYWxlKGQgLyAxMDApIC0gbWFyZ2luLnRvcDtcbiAgIH0pXG4gICAgLmF0dHIoXCJmaWxsXCIsIFwicmVkXCIpXG4gICAgLnRyYW5zaXRpb24oKVxuICAgIC5kdXJhdGlvbig1MDApO1xuXG4gICAgbGV0IHhBeGlzID0gZDNcbiAgICAgICAgICAgICAgICAuYXhpc0JvdHRvbSh4U2NhbGUpXG4gICAgICAgICAgICAgICAgLnRpY2tTaXplKDApXG4gICAgICAgICAgICAgICAgLnRpY2tGb3JtYXQoZnVuY3Rpb24oZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gT2JqZWN0LmtleXMoZm9vZERhdGEpLnNsaWNlKDIsIC0xKVtkXTtcbiAgICAgICAgICAgICAgICB9KTtcblxuXG4gICAgaWYgKGNyZWF0ZVhBeGlzQm9vbCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHN2Z1xuICAgICAgICAgICAgLmFwcGVuZChcImdcIilcbiAgICAgICAgICAgIC5hdHRyKFwiY2xhc3NcIiwgYCR7dGFyZ2V0U1ZHfS14LWF4aXMgeC1heGlzYClcbiAgICAgICAgICAgIC5hdHRyKFwidHJhbnNmb3JtXCIsIFwidHJhbnNsYXRlKFwiICsgbWFyZ2luLmxlZnQgKyBcIiwgXCIgKyAoaCAtIG1hcmdpbi50b3ApICsgXCIpXCIpXG4gICAgICAgICAgICAudHJhbnNpdGlvbigpXG4gICAgICAgICAgICAuZHVyYXRpb24oMTAwMClcbiAgICAgICAgICAgIC5jYWxsKHhBeGlzKVxuICAgIFxuICAgICAgICBzdmcuc2VsZWN0QWxsKFwiLngtYXhpcyB0ZXh0XCIpXG4gICAgICAgICAgICAuYXR0cihcInRyYW5zZm9ybVwiLCBmdW5jdGlvbihkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFwidHJhbnNsYXRlKDI1LCAyNSlyb3RhdGUoLTQ1KVwiOyBcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuXG4gICAgbGV0IHlBeGlzID0gZDMuYXhpc0xlZnQoeVNjYWxlKS50aWNrcyg0LCBcIiVcIik7XG5cbiAgICBzdmdcbiAgICAgIC5hcHBlbmQoXCJnXCIpXG4gICAgICAuYXR0cihcImNsYXNzXCIsIGAke3RhcmdldFNWR30teS1heGlzIHktYXhpc2ApXG4gICAgICAuYXR0cihcInRyYW5zZm9ybVwiLCBcInRyYW5zbGF0ZShcIiArIG1hcmdpbi5sZWZ0ICsgXCIsMClcIilcbiAgICAgIC5zdHlsZShcIm9wYWNpdHlcIiwgXCIwJVwiKVxuICAgICAgLmNhbGwoeUF4aXMpO1xuXG59O1xuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgKGUpID0+IHtcbiAgICBcbiAgICBsZXQgc2xpZGVzID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxOTsgaSsrKSB7XG4gICAgICAgIGxldCBzbGlkZU5hbWUgPSBcIiNzbGlkZS1jb250YWluZXItXCIgKyBpO1xuICAgICAgICBsZXQgbmV3U2xpZGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNsaWRlTmFtZSk7XG4gICAgICAgIHNsaWRlcy5wdXNoKG5ld1NsaWRlKTtcbiAgICB9XG4gICAgY3JlYXRlT2JzZXJ2ZXJzKHNsaWRlcyk7XG59LCBmYWxzZSk7XG5cblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgKCkgPT4ge1xuXG4gICAgZG9jdW1lbnRcbiAgICAgIC5nZXRFbGVtZW50QnlJZChcImJhbmFuYS1zdmctY29udGFpbmVyXCIpXG4gICAgICAuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGUgPT4ge1xuXG4gICAgICAgIGxldCBiYW5hbmFJY29uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXG4gICAgICAgICAgICBcImJhbmFuYS1zdmctY29udGFpbmVyXCJcbiAgICAgICAgKTtcblxuICAgICAgICBsZXQgYmFuYW5hQ2hpbGRyZW4gPSBiYW5hbmFJY29uLmNoaWxkTm9kZXM7XG4gICAgICAgIGlmIChiYW5hbmFDaGlsZHJlblszXSkge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAyMDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgYmFuYW5hSWNvbi5yZW1vdmVDaGlsZChiYW5hbmFDaGlsZHJlblszXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gZm9yIChsZXQgaSA9IDM7IGkgPCBiYW5hbmFDaGlsZHJlbi5sZW5ndGggKyAzOyBpKyspIHtcbiAgICAgICAgLy8gfVxuXG5cbiAgICAgICAgbGV0IHVwd2FyZE1vdmUsIGRvd253YXJkTW92ZTtcblxuICAgICAgICBsZXQgYmFuYW5hSWNvblBvcyA9IHtcbiAgICAgICAgICAgIHRvcDogYmFuYW5hSWNvbi5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3AsXG4gICAgICAgICAgICBsZWZ0OiBiYW5hbmFJY29uLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmxlZnRcbiAgICAgICAgfTtcblxuICAgICAgICBsZXQgbW92ZW1lbnRGdW5jID0gbmV3QmFuYW5hID0+IHtcbiAgICAgICAgICBsZXQgbmV3QmFuYW5hUG9zID0ge1xuICAgICAgICAgICAgdG9wOiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAtNSksXG4gICAgICAgICAgICBsZWZ0OiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiB3aW5kb3cuaW5uZXJXaWR0aClcbiAgICAgICAgICB9O1xuXG4gICAgICAgIC8vICAgbGV0IGZyYW1lVXB3YXJkID0gKCkgPT4ge1xuICAgICAgICAvLyAgICAgICBpZiAobmV3QmFuYW5hUG9zLmxlZnQgPiAzNTApIHtcbiAgICAgICAgLy8gICAgICAgICBjbGVhckludGVydmFsKHVwd2FyZE1vdmUpO1xuICAgICAgICAvLyAgICAgICAgIGRvd253YXJkTW92ZSA9IHNldEludGVydmFsKGZyYW1lRG93bndhcmQsIDMpO1xuICAgICAgICAvLyAgICAgICB9IGVsc2Uge1xuICAgICAgICAvLyAgICAgICAgIG5ld0JhbmFuYVBvcy50b3AgLT0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogNSk7XG4gICAgICAgIC8vICAgICAgICAgbmV3QmFuYW5hUG9zLmxlZnQgKz0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogOCk7XG5cbiAgICAgICAgLy8gICAgICAgICBuZXdCYW5hbmEuc3R5bGUudG9wID0gbmV3QmFuYW5hUG9zLnRvcCArIFwicHhcIjtcbiAgICAgICAgLy8gICAgICAgICBuZXdCYW5hbmEuc3R5bGUubGVmdCA9IG5ld0JhbmFuYVBvcy5sZWZ0ICsgXCJweFwiO1xuICAgICAgICAvLyAgICAgICB9XG4gICAgICAgIC8vICAgfVxuXG4gICAgICAgIC8vICAgICB1cHdhcmRNb3ZlID0gc2V0SW50ZXJ2YWwoZnJhbWVVcHdhcmQsIDMpO1xuXG4gICAgICAgIC8vICAgbGV0IHZlbG9jaXR5ID0gMDtcblxuICAgICAgICAgIGxldCB2ZWxvY2l0eSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcblxuICAgICAgICAgIGxldCBmcmFtZURvd253YXJkID0gKCkgPT4ge1xuICAgICAgICAgICAgaWYgKG5ld0JhbmFuYVBvcy50b3AgPiAxNTAwKSB7XG4gICAgICAgICAgICBjbGVhckludGVydmFsKGRvd253YXJkTW92ZSk7XG4gICAgICAgICAgICAvLyAgIGJhbmFuYUljb24ucmVtb3ZlQ2hpbGQobmV3QmFuYW5hKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIG5ld0JhbmFuYVBvcy50b3AgKz0gKHZlbG9jaXR5ICsgNSk7XG4gICAgICAgICAgICAvLyAgIG5ld0JhbmFuYVBvcy50b3AgKj0gLTEuMTtcbiAgICAgICAgICAgIC8vICAgbmV3QmFuYW5hUG9zLmxlZnQgKz0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogOCk7XG4gICAgICAgICAgICAvLyAgIG5ld0JhbmFuYVBvcy5yaWdodCArPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiA4KTtcblxuICAgICAgICAgICAgICBuZXdCYW5hbmEuc3R5bGUudG9wID0gbmV3QmFuYW5hUG9zLnRvcCArIFwicHhcIjtcbiAgICAgICAgICAgIC8vICAgbmV3QmFuYW5hLnN0eWxlLmxlZnQgPSBuZXdCYW5hbmFQb3MubGVmdCArIFwicHhcIjtcbiAgICAgICAgICAgIC8vICAgbmV3QmFuYW5hLnN0eWxlLnJpZ2h0ID0gbmV3QmFuYW5hUG9zLnJpZ2h0ICsgXCJweFwiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH07XG4gICAgICAgICAgZG93bndhcmRNb3ZlID0gc2V0SW50ZXJ2YWwoZnJhbWVEb3dud2FyZCwgMik7XG5cbiAgICAgICAgLy8gICBzZXRUaW1lb3V0KCgpID0+IHtcblxuICAgICAgICAvLyAgICAgYmFuYW5hSWNvbi5yZW1vdmVDaGlsZChuZXdCYW5hbmEpO1xuXG4gICAgICAgICAgICAvLyBsZXQgYmFuYW5hQ2hpbGRyZW4gPSBiYW5hbmFJY29uLmNoaWxkTm9kZXM7XG4gICAgICAgICAgICAvLyBkZWJ1Z2dlcjtcblxuICAgICAgICAgICAgLy8gZm9yIChsZXQgaSA9IDA7IGkgPCAyMDsgaSsrKSB7XG4gICAgICAgICAgICAvLyAgICAgZGVidWdnZXI7XG4gICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICAvLyBmb3IgKGxldCBpID0gMzsgaSA8IGJhbmFuYUNoaWxkcmVuLmxlbmd0aCArIDM7IGkrKykge1xuICAgICAgICAgICAgLy8gICAgIGJhbmFuYUljb24ucmVtb3ZlQ2hpbGQoYmFuYW5hQ2hpbGRyZW5baV0pO1xuICAgICAgICAgICAgLy8gfVxuICAgICAgICAvLyAgIH0sIDEwMDApO1xuXG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gbGV0IG1vdmVtZW50RnVuYyA9IG5ld0JhbmFuYSA9PiB7XG4gICAgICAgIC8vICAgbGV0IG5ld0JhbmFuYVBvcyA9IHtcbiAgICAgICAgLy8gICAgIHRvcDogbmV3QmFuYW5hLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcCxcbiAgICAgICAgLy8gICAgIGxlZnQ6IG5ld0JhbmFuYS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5sZWZ0XG4gICAgICAgIC8vICAgfTtcblxuICAgICAgICAvLyAgIGxldCBmcmFtZVVwd2FyZCA9ICgpID0+IHtcbiAgICAgICAgLy8gICAgICAgaWYgKG5ld0JhbmFuYVBvcy5sZWZ0ID4gMzUwKSB7XG4gICAgICAgIC8vICAgICAgICAgY2xlYXJJbnRlcnZhbCh1cHdhcmRNb3ZlKTtcbiAgICAgICAgLy8gICAgICAgICBkb3dud2FyZE1vdmUgPSBzZXRJbnRlcnZhbChmcmFtZURvd253YXJkLCAzKTtcbiAgICAgICAgLy8gICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gICAgICAgICBuZXdCYW5hbmFQb3MudG9wIC09IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDUpO1xuICAgICAgICAvLyAgICAgICAgIG5ld0JhbmFuYVBvcy5sZWZ0ICs9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDgpO1xuXG4gICAgICAgIC8vICAgICAgICAgbmV3QmFuYW5hLnN0eWxlLnRvcCA9IG5ld0JhbmFuYVBvcy50b3AgKyBcInB4XCI7XG4gICAgICAgIC8vICAgICAgICAgbmV3QmFuYW5hLnN0eWxlLmxlZnQgPSBuZXdCYW5hbmFQb3MubGVmdCArIFwicHhcIjtcbiAgICAgICAgLy8gICAgICAgfVxuICAgICAgICAvLyAgIH1cblxuICAgICAgICAvLyAgICAgdXB3YXJkTW92ZSA9IHNldEludGVydmFsKGZyYW1lVXB3YXJkLCAzKTtcblxuICAgICAgICAvLyAgIGxldCBmcmFtZURvd253YXJkID0gKCkgPT4ge1xuICAgICAgICAvLyAgICAgaWYgKG5ld0JhbmFuYVBvcy50b3AgPiAxNTAwKSB7XG4gICAgICAgIC8vICAgICAgIGNsZWFySW50ZXJ2YWwoZG93bndhcmRNb3ZlKTtcbiAgICAgICAgLy8gICAgIH0gZWxzZSB7XG4gICAgICAgIC8vICAgICAgIG5ld0JhbmFuYVBvcy50b3AgKz0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogNSk7XG4gICAgICAgIC8vICAgICAgIG5ld0JhbmFuYVBvcy5sZWZ0ICs9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDgpO1xuXG4gICAgICAgIC8vICAgICAgIG5ld0JhbmFuYS5zdHlsZS50b3AgPSBuZXdCYW5hbmFQb3MudG9wICsgXCJweFwiO1xuICAgICAgICAvLyAgICAgICBuZXdCYW5hbmEuc3R5bGUubGVmdCA9IG5ld0JhbmFuYVBvcy5sZWZ0ICsgXCJweFwiO1xuICAgICAgICAvLyAgICAgfVxuICAgICAgICAvLyAgIH07XG4gICAgICAgIC8vIH07XG5cblxuICAgICAgICBmb3IgKGxldCBpID0gYmFuYW5hQ291bnRlcjsgaSA8IGJhbmFuYUNvdW50ZXIgKyAyMDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgbmV3QmFuYW5hID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgICAgIG5ld0JhbmFuYS5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBgZmx5aW5nLWJhbmFuYS0ke2l9YCk7XG4gICAgICAgICAgICBuZXdCYW5hbmEuY2xhc3NMaXN0LmFkZChgZmx5aW5nLWJhbmFuYWApO1xuICAgICAgICAgICAgYmFuYW5hSWNvbi5hcHBlbmRDaGlsZChuZXdCYW5hbmEpO1xuXG4gICAgICAgICAgICBsZXQgdGhpc09uZVBhcnRpY3VsYXJCYW5hbmEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcbiAgICAgICAgICAgIGBmbHlpbmctYmFuYW5hLSR7aX1gXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgdGhpc09uZVBhcnRpY3VsYXJCYW5hbmEuc3R5bGUudG9wID0gXCItNXB4XCI7XG4gICAgICAgICAgICB0aGlzT25lUGFydGljdWxhckJhbmFuYS5zdHlsZS5sZWZ0ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogd2luZG93LmlubmVyV2lkdGgpICsgXCJweFwiO1xuXG4gICAgICAgICAgICBtb3ZlbWVudEZ1bmModGhpc09uZVBhcnRpY3VsYXJCYW5hbmEpO1xuICAgICAgICB9XG5cbiAgICAgICAgYmFuYW5hQ291bnRlciArPSAxMDtcbiAgICAgICAgLy8gbGV0IGkgPSBiYW5hbmFDb3VudGVyO1xuICAgICAgICAvLyBiYW5hbmFDb3VudGVyICs9IDE7XG4gICAgICAgIC8vIGxldCBuZXdCYW5hbmEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICAvLyBuZXdCYW5hbmEuc2V0QXR0cmlidXRlKCdpZCcsIGBmbHlpbmctYmFuYW5hLSR7aX1gKTtcbiAgICAgICAgLy8gbmV3QmFuYW5hLmNsYXNzTGlzdC5hZGQoYGZseWluZy1iYW5hbmFgKTtcbiAgICAgICAgLy8gYmFuYW5hSWNvbi5hcHBlbmRDaGlsZChuZXdCYW5hbmEpO1xuXG5cbiAgICAgICAgLy8gbGV0IHRoaXNPbmVQYXJ0aWN1bGFyQmFuYW5hID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXG4gICAgICAgIC8vICAgICBgZmx5aW5nLWJhbmFuYS0ke2l9YFxuICAgICAgICAvLyApO1xuICAgICAgICAvLyB0aGlzT25lUGFydGljdWxhckJhbmFuYS5zdHlsZS50b3AgPSBiYW5hbmFJY29uUG9zLnRvcCArIFwicHhcIjtcbiAgICAgICAgLy8gdGhpc09uZVBhcnRpY3VsYXJCYW5hbmEuc3R5bGUubGVmdCA9IGJhbmFuYUljb25Qb3MubGVmdCArIFwicHhcIjtcblxuICAgICAgICAvLyBtb3ZlbWVudEZ1bmModGhpc09uZVBhcnRpY3VsYXJCYW5hbmEpO1xuICAgICAgfSk7XG5cbn0pXG5cblxuY29uc3QgY3JlYXRlT2JzZXJ2ZXJzID0gKHNsaWRlcykgPT4ge1xuICAgIFxuICAgIGxldCBvcHRpb25zID0ge1xuICAgICAgcm9vdDogbnVsbCxcbiAgICAgIHJvb3RNYXJnaW46IFwiMHB4IDBweCAwcHggMHB4XCIsXG4gICAgICB0aHJlc2hvbGQ6IC4zXG4gICAgfTtcblxuICAgIGNvbnNvbGUubG9nKHNsaWRlcyk7XG4gICAgXG4gICAgLy8gU2xpZGVzLmJhbmFuYVNsaWRlKG9wdGlvbnMsIHNsaWRlc1swXSk7XG4gICAgLy8gU2xpZGVzLnBvdGF0b1NsaWRlKG9wdGlvbnMsIHNsaWRlc1sxXSk7XG4gICAgLy8gU2xpZGVzLmJ1dHRlclNsaWRlKG9wdGlvbnMsIHNsaWRlc1syXSk7XG4gICAgLy8gU2xpZGVzLmF2b2NhZG9TbGlkZShvcHRpb25zLCBzbGlkZXNbM10pO1xuICAgIC8vIFNsaWRlcy5iZWVmTGl2ZXJTbGlkZShvcHRpb25zLCBzbGlkZXNbNF0pO1xuICAgIC8vIFNsaWRlcy5jb2RMaXZlclNsaWRlKG9wdGlvbnMsIHNsaWRlc1s1XSk7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNsaWRlcy5sZW5ndGggLSAxOyBpKyspIHtcbiAgICAgIFNsaWRlcy5yZW5kZXJTbGlkZShvcHRpb25zLCBzbGlkZXNbaV0sIGkpO1xuICAgIH1cblxuXG59XG4iLCJleHBvcnQgY29uc3QgYmFuYW5hU2xpZGUgPSAob3B0aW9ucywgc2xpZGUpID0+IHtcblxuICBjb25zdCBoYW5kbGVCYW5hbmFTY3JvbGxPbnRvID0gKGVudHJpZXMsIG9ic2VydmVyKSA9PiB7XG4gICAgZW50cmllcy5mb3JFYWNoKGVudHJ5ID0+IHtcbiAgICAgIGlmIChlbnRyeS5pc0ludGVyc2VjdGluZykge1xuICAgICAgICBcbiAgICAgICAgbGV0IGJhbmFuYVJlY3RzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgLnNsaWRlLXN2Zy0wLXJlY3RgKTtcbiAgICAgICAgYmFuYW5hUmVjdHMuZm9yRWFjaChyZWN0ID0+IHtcbiAgICAgICAgICAgIHJlY3QuY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKTtcbiAgICAgICAgfSk7XG4gICAgICAgIFxuICAgICAgICBsZXQgcG90YXRvUmVjdHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGAuc2xpZGUtc3ZnLTEtcmVjdGApO1xuICAgICAgICBwb3RhdG9SZWN0cy5mb3JFYWNoKHJlY3QgPT4ge1xuICAgICAgICAgICAgcmVjdC5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xuICAgICAgICB9KTtcblxuICAgICAgICBkMy5zZWxlY3QoXCIuc2xpZGUtc3ZnLTAteS1heGlzXCIpXG4gICAgICAgICAgICAudHJhbnNpdGlvbigpXG4gICAgICAgICAgICAuc3R5bGUoXCJvcGFjaXR5XCIsIFwiMTAwJVwiKVxuICAgICAgICAgICAgLmR1cmF0aW9uKDUwMCk7ICAgICAgICBcblxuICAgICAgICBkMy5zZWxlY3QoXCIuc2xpZGUtc3ZnLTEteS1heGlzXCIpXG4gICAgICAgICAgICAudHJhbnNpdGlvbigpXG4gICAgICAgICAgICAuc3R5bGUoXCJvcGFjaXR5XCIsIFwiMCVcIilcbiAgICAgICAgICAgIC5kdXJhdGlvbig1MDApO1xuICAgICAgfVxuICAgIH0pO1xuICB9O1xuXG4gIGxldCBvYnNlcnZlciA9IG5ldyBJbnRlcnNlY3Rpb25PYnNlcnZlcihoYW5kbGVCYW5hbmFTY3JvbGxPbnRvLCBvcHRpb25zKTtcbiAgb2JzZXJ2ZXIub2JzZXJ2ZShzbGlkZSk7XG59O1xuXG5leHBvcnQgY29uc3QgcG90YXRvU2xpZGUgPSAob3B0aW9ucywgc2xpZGUpID0+IHtcblxuICBjb25zdCBoYW5kbGVQb3RhdG9TY3JvbGxPbnRvID0gKGVudHJpZXMsIG9ic2VydmVyKSA9PiB7XG4gICAgZW50cmllcy5mb3JFYWNoKGVudHJ5ID0+IHtcbiAgICAgIGlmIChlbnRyeS5pc0ludGVyc2VjdGluZykge1xuXG4gICAgICAgIGxldCBwb3RhdG9SZWN0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYC5zbGlkZS1zdmctMS1yZWN0YCk7XG4gICAgICAgIHBvdGF0b1JlY3RzLmZvckVhY2gocmVjdCA9PiB7XG4gICAgICAgICAgICByZWN0LmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpO1xuICAgICAgICB9KTtcblxuICAgICAgICBsZXQgYmFuYW5hUmVjdHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGAuc2xpZGUtc3ZnLTAtcmVjdGApO1xuICAgICAgICBiYW5hbmFSZWN0cy5mb3JFYWNoKHJlY3QgPT4ge1xuICAgICAgICAgICAgcmVjdC5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgbGV0IGJ1dHRlclJlY3RzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgLnNsaWRlLXN2Zy0yLXJlY3RgKTtcbiAgICAgICAgYnV0dGVyUmVjdHMuZm9yRWFjaChyZWN0ID0+IHtcbiAgICAgICAgICAgIHJlY3QuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7XG4gICAgICAgIH0pO1xuICAgICAgICBcbiAgICAgICAgZDMuc2VsZWN0KFwiLnNsaWRlLXN2Zy0xLXktYXhpc1wiKVxuICAgICAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgICAgICAuc3R5bGUoXCJvcGFjaXR5XCIsIFwiMTAwJVwiKVxuICAgICAgICAgIC5kdXJhdGlvbig1MDApOyAgICAgICAgXG5cbiAgICAgICAgZDMuc2VsZWN0KFwiLnNsaWRlLXN2Zy0wLXktYXhpc1wiKVxuICAgICAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgICAgICAuc3R5bGUoXCJvcGFjaXR5XCIsIFwiMCVcIilcbiAgICAgICAgICAuZHVyYXRpb24oNTAwKTtcblxuICAgICAgICAgIGQzLnNlbGVjdChcIi5zbGlkZS1zdmctMi15LWF4aXNcIilcbiAgICAgICAgICAudHJhbnNpdGlvbigpXG4gICAgICAgICAgLnN0eWxlKFwib3BhY2l0eVwiLCBcIjAlXCIpXG4gICAgICAgICAgLmR1cmF0aW9uKDUwMCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH07XG5cbiAgbGV0IG9ic2VydmVyID0gbmV3IEludGVyc2VjdGlvbk9ic2VydmVyKGhhbmRsZVBvdGF0b1Njcm9sbE9udG8sIG9wdGlvbnMpO1xuICBvYnNlcnZlci5vYnNlcnZlKHNsaWRlKTtcblxufVxuXG5leHBvcnQgY29uc3QgYnV0dGVyU2xpZGUgPSAob3B0aW9ucywgc2xpZGUpID0+IHtcblxuICBjb25zdCBoYW5kbGVCdXR0ZXJTY3JvbGxPbnRvID0gKGVudHJpZXMsIG9ic2VydmVyKSA9PiB7XG4gICAgZW50cmllcy5mb3JFYWNoKGVudHJ5ID0+IHtcbiAgICAgIGlmIChlbnRyeS5pc0ludGVyc2VjdGluZykge1xuICAgICAgICAgIGxldCBidXR0ZXJSZWN0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYC5zbGlkZS1zdmctMi1yZWN0YCk7XG4gICAgICAgICAgYnV0dGVyUmVjdHMuZm9yRWFjaChyZWN0ID0+IHtcbiAgICAgICAgICAgIHJlY3QuY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICBsZXQgcG90YXRvUmVjdHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGAuc2xpZGUtc3ZnLTEtcmVjdGApO1xuICAgICAgICBwb3RhdG9SZWN0cy5mb3JFYWNoKHJlY3QgPT4ge1xuICAgICAgICAgIHJlY3QuY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgbGV0IGF2b2NhZG9SZWN0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYC5zbGlkZS1zdmctMy1yZWN0YCk7XG4gICAgICAgIGF2b2NhZG9SZWN0cy5mb3JFYWNoKHJlY3QgPT4ge1xuICAgICAgICAgIHJlY3QuY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcbiAgICAgICAgfSk7XG5cblxuICAgICAgICBkMy5zZWxlY3QoXCIuc2xpZGUtc3ZnLTIteS1heGlzXCIpXG4gICAgICAgICAgLnRyYW5zaXRpb24oKVxuICAgICAgICAgIC5zdHlsZShcIm9wYWNpdHlcIiwgXCIxMDAlXCIpXG4gICAgICAgICAgLmR1cmF0aW9uKDUwMCk7XG5cbiAgICAgICAgZDMuc2VsZWN0KFwiLnNsaWRlLXN2Zy0xLXktYXhpc1wiKVxuICAgICAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgICAgICAuc3R5bGUoXCJvcGFjaXR5XCIsIFwiMCVcIilcbiAgICAgICAgICAuZHVyYXRpb24oNTAwKTtcblxuICAgICAgICBkMy5zZWxlY3QoXCIuc2xpZGUtc3ZnLTMteS1heGlzXCIpXG4gICAgICAgICAgLnRyYW5zaXRpb24oKVxuICAgICAgICAgIC5zdHlsZShcIm9wYWNpdHlcIiwgXCIwJVwiKVxuICAgICAgICAgIC5kdXJhdGlvbig1MDApO1xuICAgICAgfVxuICAgIH0pO1xuICB9O1xuXG4gIGxldCBvYnNlcnZlciA9IG5ldyBJbnRlcnNlY3Rpb25PYnNlcnZlcihoYW5kbGVCdXR0ZXJTY3JvbGxPbnRvLCBvcHRpb25zKTtcbiAgb2JzZXJ2ZXIub2JzZXJ2ZShzbGlkZSk7XG5cbn1cblxuZXhwb3J0IGNvbnN0IGF2b2NhZG9TbGlkZSA9IChvcHRpb25zLCBzbGlkZSkgPT4ge1xuXG4gIGNvbnN0IGhhbmRsZUF2b2NhZG9TY3JvbGxPbnRvID0gKGVudHJpZXMsIG9ic2VydmVyKSA9PiB7XG4gICAgZW50cmllcy5mb3JFYWNoKGVudHJ5ID0+IHtcbiAgICAgIGlmIChlbnRyeS5pc0ludGVyc2VjdGluZykge1xuXG4gICAgICAgIGxldCBhdm9jYWRvUmVjdHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGAuc2xpZGUtc3ZnLTMtcmVjdGApO1xuICAgICAgICBhdm9jYWRvUmVjdHMuZm9yRWFjaChyZWN0ID0+IHtcbiAgICAgICAgcmVjdC5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZGVuXCIpO1xuICAgICAgICB9KTtcblxuICAgICAgICBsZXQgYnV0dGVyUmVjdHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGAuc2xpZGUtc3ZnLTItcmVjdGApO1xuICAgICAgICBidXR0ZXJSZWN0cy5mb3JFYWNoKHJlY3QgPT4ge1xuICAgICAgICAgIHJlY3QuY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgbGV0IGJlZWZMaXZlclJlY3RzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgLnNsaWRlLXN2Zy00LXJlY3RgKTtcbiAgICAgICAgYmVlZkxpdmVyUmVjdHMuZm9yRWFjaChyZWN0ID0+IHtcbiAgICAgICAgICByZWN0LmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGQzLnNlbGVjdChcIi5zbGlkZS1zdmctMy15LWF4aXNcIilcbiAgICAgICAgICAudHJhbnNpdGlvbigpXG4gICAgICAgICAgLnN0eWxlKFwib3BhY2l0eVwiLCBcIjEwMCVcIilcbiAgICAgICAgICAuZHVyYXRpb24oNTAwKTtcblxuICAgICAgICBkMy5zZWxlY3QoXCIuc2xpZGUtc3ZnLTIteS1heGlzXCIpXG4gICAgICAgICAgLnRyYW5zaXRpb24oKVxuICAgICAgICAgIC5zdHlsZShcIm9wYWNpdHlcIiwgXCIwJVwiKVxuICAgICAgICAgIC5kdXJhdGlvbig1MDApO1xuXG4gICAgICAgIGQzLnNlbGVjdChcIi5zbGlkZS1zdmctNC15LWF4aXNcIilcbiAgICAgICAgICAudHJhbnNpdGlvbigpXG4gICAgICAgICAgLnN0eWxlKFwib3BhY2l0eVwiLCBcIjAlXCIpXG4gICAgICAgICAgLmR1cmF0aW9uKDUwMCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH07XG5cbiAgbGV0IG9ic2VydmVyID0gbmV3IEludGVyc2VjdGlvbk9ic2VydmVyKGhhbmRsZUF2b2NhZG9TY3JvbGxPbnRvLCBvcHRpb25zKTtcbiAgb2JzZXJ2ZXIub2JzZXJ2ZShzbGlkZSk7XG59OyAgICBcblxuZXhwb3J0IGNvbnN0IGJlZWZMaXZlclNsaWRlID0gKG9wdGlvbnMsIHNsaWRlKSA9PiB7XG5cbiAgY29uc3QgaGFuZGxlQmVlZkxpdmVyU2Nyb2xsT250byA9IChlbnRyaWVzLCBvYnNlcnZlcikgPT4ge1xuICAgIGVudHJpZXMuZm9yRWFjaChlbnRyeSA9PiB7XG4gICAgICBpZiAoZW50cnkuaXNJbnRlcnNlY3RpbmcpIHtcbiAgICAgICAgbGV0IGJlZWZMaXZlclJlY3RzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgLnNsaWRlLXN2Zy00LXJlY3RgKTtcbiAgICAgICAgYmVlZkxpdmVyUmVjdHMuZm9yRWFjaChyZWN0ID0+IHtcbiAgICAgICAgcmVjdC5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZGVuXCIpO1xuICAgICAgICB9KTtcblxuICAgICAgICBsZXQgYXZvY2Fkb1JlY3RzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgLnNsaWRlLXN2Zy0zLXJlY3RgKTtcbiAgICAgICAgYXZvY2Fkb1JlY3RzLmZvckVhY2gocmVjdCA9PiB7XG4gICAgICAgICAgcmVjdC5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xuICAgICAgICB9KTtcblxuICAgICAgICBsZXQgY29kTGl2ZXJSZWN0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYC5zbGlkZS1zdmctNS1yZWN0YCk7XG4gICAgICAgIGNvZExpdmVyUmVjdHMuZm9yRWFjaChyZWN0ID0+IHtcbiAgICAgICAgICByZWN0LmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGQzLnNlbGVjdChcIi5zbGlkZS1zdmctNC15LWF4aXNcIilcbiAgICAgICAgICAudHJhbnNpdGlvbigpXG4gICAgICAgICAgLnN0eWxlKFwib3BhY2l0eVwiLCBcIjEwMCVcIilcbiAgICAgICAgICAuZHVyYXRpb24oNTAwKTtcblxuICAgICAgICBkMy5zZWxlY3QoXCIuc2xpZGUtc3ZnLTMteS1heGlzXCIpXG4gICAgICAgICAgLnRyYW5zaXRpb24oKVxuICAgICAgICAgIC5zdHlsZShcIm9wYWNpdHlcIiwgXCIwJVwiKVxuICAgICAgICAgIC5kdXJhdGlvbig1MDApO1xuXG4gICAgICAgIGQzLnNlbGVjdChcIi5zbGlkZS1zdmctNS15LWF4aXNcIilcbiAgICAgICAgICAudHJhbnNpdGlvbigpXG4gICAgICAgICAgLnN0eWxlKFwib3BhY2l0eVwiLCBcIjAlXCIpXG4gICAgICAgICAgLmR1cmF0aW9uKDUwMCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH07XG5cbiAgbGV0IG9ic2VydmVyID0gbmV3IEludGVyc2VjdGlvbk9ic2VydmVyKGhhbmRsZUJlZWZMaXZlclNjcm9sbE9udG8sIG9wdGlvbnMpO1xuICBvYnNlcnZlci5vYnNlcnZlKHNsaWRlKTtcblxufVxuXG5leHBvcnQgY29uc3QgY29kTGl2ZXJTbGlkZSA9IChvcHRpb25zLCBzbGlkZSkgPT4ge1xuXG4gIGNvbnN0IGhhbmRsZUNvZExpdmVyU2Nyb2xsT250byA9IChlbnRyaWVzLCBvYnNlcnZlcikgPT4ge1xuICAgIGVudHJpZXMuZm9yRWFjaChlbnRyeSA9PiB7XG4gICAgICBpZiAoZW50cnkuaXNJbnRlcnNlY3RpbmcpIHtcbiAgICAgICAgbGV0IGNvZExpdmVyUmVjdHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGAuc2xpZGUtc3ZnLTUtcmVjdGApO1xuICAgICAgICBjb2RMaXZlclJlY3RzLmZvckVhY2gocmVjdCA9PiB7XG4gICAgICAgIHJlY3QuY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgbGV0IGJlZWZMaXZlclJlY3RzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgLnNsaWRlLXN2Zy00LXJlY3RgKTtcbiAgICAgICAgYmVlZkxpdmVyUmVjdHMuZm9yRWFjaChyZWN0ID0+IHtcbiAgICAgICAgICByZWN0LmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGxldCBlZ2dSZWN0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYC5zbGlkZS1zdmctNi1yZWN0YCk7XG4gICAgICAgIGVnZ1JlY3RzLmZvckVhY2gocmVjdCA9PiB7XG4gICAgICAgICAgcmVjdC5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xuICAgICAgICB9KTtcblxuICAgICAgICBkMy5zZWxlY3QoXCIuc2xpZGUtc3ZnLTUteS1heGlzXCIpXG4gICAgICAgICAgLnRyYW5zaXRpb24oKVxuICAgICAgICAgIC5zdHlsZShcIm9wYWNpdHlcIiwgXCIxMDAlXCIpXG4gICAgICAgICAgLmR1cmF0aW9uKDUwMCk7XG5cbiAgICAgICAgZDMuc2VsZWN0KFwiLnNsaWRlLXN2Zy00LXktYXhpc1wiKVxuICAgICAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgICAgICAuc3R5bGUoXCJvcGFjaXR5XCIsIFwiMCVcIilcbiAgICAgICAgICAuZHVyYXRpb24oNTAwKTtcblxuICAgICAgICBkMy5zZWxlY3QoXCIuc2xpZGUtc3ZnLTYteS1heGlzXCIpXG4gICAgICAgICAgLnRyYW5zaXRpb24oKVxuICAgICAgICAgIC5zdHlsZShcIm9wYWNpdHlcIiwgXCIwJVwiKVxuICAgICAgICAgIC5kdXJhdGlvbig1MDApO1xuICAgICAgfVxuICAgIH0pO1xuICB9O1xuXG4gIGxldCBvYnNlcnZlciA9IG5ldyBJbnRlcnNlY3Rpb25PYnNlcnZlcihoYW5kbGVDb2RMaXZlclNjcm9sbE9udG8sIG9wdGlvbnMpO1xuICBvYnNlcnZlci5vYnNlcnZlKHNsaWRlKTtcblxufVxuXG5cblxuZXhwb3J0IGNvbnN0IHJlbmRlclNsaWRlID0gKG9wdGlvbnMsIHNsaWRlLCBpZHgpID0+IHtcblxuICBjb25zdCBoYW5kbGVTY3JvbGxPbnRvID0gKGVudHJpZXMsIG9ic2VydmVyKSA9PiB7XG4gICAgZW50cmllcy5mb3JFYWNoKGVudHJ5ID0+IHtcbiAgICAgIGlmIChlbnRyeS5pc0ludGVyc2VjdGluZykge1xuXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYC5zbGlkZS1zdmctJHtpZHh9LXJlY3RgKS5mb3JFYWNoKHJlY3QgPT4ge1xuICAgICAgICAgIHJlY3QuY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYC5zbGlkZS1zdmctJHtpZHggLSAxfS1yZWN0YCkpIHtcbiAgICAgICAgICAgIGRvY3VtZW50XG4gICAgICAgICAgICAgIC5xdWVyeVNlbGVjdG9yQWxsKGAuc2xpZGUtc3ZnLSR7aWR4IC0gMX0tcmVjdGApXG4gICAgICAgICAgICAgIC5mb3JFYWNoKHJlY3QgPT4ge1xuICAgICAgICAgICAgICAgIHJlY3QuY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgLnNsaWRlLXN2Zy0ke2lkeCArIDF9LXJlY3RgKSkge1xuICAgICAgICAgICAgZG9jdW1lbnRcbiAgICAgICAgICAgICAgLnF1ZXJ5U2VsZWN0b3JBbGwoYC5zbGlkZS1zdmctJHtpZHggKyAxfS1yZWN0YClcbiAgICAgICAgICAgICAgLmZvckVhY2gocmVjdCA9PiB7XG4gICAgICAgICAgICAgICAgcmVjdC5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYC5zbGlkZS1zdmctJHtpZHggKyAxfS1yZWN0YCkuZm9yRWFjaChyZWN0ID0+IHtcbiAgICAgICAgLy8gICByZWN0LmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XG4gICAgICAgIC8vIH0pO1xuXG4gICAgICAgIGQzLnNlbGVjdChgLnNsaWRlLXN2Zy0ke2lkeH0teS1heGlzYClcbiAgICAgICAgICAudHJhbnNpdGlvbigpXG4gICAgICAgICAgLnN0eWxlKFwib3BhY2l0eVwiLCBcIjEwMCVcIilcbiAgICAgICAgICAuZHVyYXRpb24oNTAwKTtcblxuXG4gICAgICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuc2xpZGUtc3ZnLSR7aWR4IC0gMX0teS1heGlzYCkpIHtcbiAgICAgICAgICAgIGQzLnNlbGVjdChgLnNsaWRlLXN2Zy0ke2lkeCAtIDF9LXktYXhpc2ApXG4gICAgICAgICAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgICAgICAgICAgLnN0eWxlKFwib3BhY2l0eVwiLCBcIjAlXCIpXG4gICAgICAgICAgICAgIC5kdXJhdGlvbig1MDApO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC5zbGlkZS1zdmctJHtpZHggKyAxfS15LWF4aXNgKSkge1xuICAgICAgICAgICAgZDMuc2VsZWN0KGAuc2xpZGUtc3ZnLSR7aWR4ICsgMX0teS1heGlzYClcbiAgICAgICAgICAgICAgLnRyYW5zaXRpb24oKVxuICAgICAgICAgICAgICAuc3R5bGUoXCJvcGFjaXR5XCIsIFwiMCVcIilcbiAgICAgICAgICAgICAgLmR1cmF0aW9uKDUwMCk7XG4gICAgICAgIH1cblxuXG5cbiAgICAgICAgLy8gZDMuc2VsZWN0KGAuc2xpZGUtc3ZnLSR7aWR4ICsgMX0teS1heGlzYClcbiAgICAgICAgLy8gICAudHJhbnNpdGlvbigpXG4gICAgICAgIC8vICAgLnN0eWxlKFwib3BhY2l0eVwiLCBcIjAlXCIpXG4gICAgICAgIC8vICAgLmR1cmF0aW9uKDUwMCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH07XG5cbiAgbGV0IG9ic2VydmVyID0gbmV3IEludGVyc2VjdGlvbk9ic2VydmVyKGhhbmRsZVNjcm9sbE9udG8sIG9wdGlvbnMpO1xuICBvYnNlcnZlci5vYnNlcnZlKHNsaWRlKTtcblxufVxuLy8gZXhwb3J0IGNvbnN0IGVnZ1NsaWRlID0gKG9wdGlvbnMsIHNsaWRlKSA9PiB7XG5cbi8vICAgICBsZXQgaWR4ID0gNjtcblxuLy8gICBjb25zdCBoYW5kbGVFZ2dTY3JvbGxPbnRvID0gKGVudHJpZXMsIG9ic2VydmVyKSA9PiB7XG4vLyAgICAgZW50cmllcy5mb3JFYWNoKGVudHJ5ID0+IHtcbi8vICAgICAgIGlmIChlbnRyeS5pc0ludGVyc2VjdGluZykge1xuXG4vLyAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYC5zbGlkZS1zdmctJHtpZHh9LXJlY3RgKS5mb3JFYWNoKHJlY3QgPT4ge1xuLy8gICAgICAgICAgIHJlY3QuY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKTtcbi8vICAgICAgICAgfSk7XG5cbi8vICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgLnNsaWRlLXN2Zy0ke2lkeCAtIDF9LXJlY3RgKS5mb3JFYWNoKHJlY3QgPT4ge1xuLy8gICAgICAgICAgIHJlY3QuY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcbi8vICAgICAgICAgfSk7XG5cbi8vICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgLnNsaWRlLXN2Zy0ke2lkeCArIDF9LXJlY3RgKS5mb3JFYWNoKHJlY3QgPT4ge1xuLy8gICAgICAgICAgIHJlY3QuY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcbi8vICAgICAgICAgfSk7XG5cbi8vICAgICAgICAgZDMuc2VsZWN0KGAuc2xpZGUtc3ZnLSR7aWR4fS15LWF4aXNgKVxuLy8gICAgICAgICAgIC50cmFuc2l0aW9uKClcbi8vICAgICAgICAgICAuc3R5bGUoXCJvcGFjaXR5XCIsIFwiMTAwJVwiKVxuLy8gICAgICAgICAgIC5kdXJhdGlvbig1MDApO1xuXG4vLyAgICAgICAgIGQzLnNlbGVjdChgLnNsaWRlLXN2Zy0ke2lkeCAtIDF9LXktYXhpc2ApXG4vLyAgICAgICAgICAgLnRyYW5zaXRpb24oKVxuLy8gICAgICAgICAgIC5zdHlsZShcIm9wYWNpdHlcIiwgXCIwJVwiKVxuLy8gICAgICAgICAgIC5kdXJhdGlvbig1MDApO1xuXG4vLyAgICAgICAgIGQzLnNlbGVjdChgLnNsaWRlLXN2Zy0ke2lkeCArIDF9LXktYXhpc2ApXG4vLyAgICAgICAgICAgLnRyYW5zaXRpb24oKVxuLy8gICAgICAgICAgIC5zdHlsZShcIm9wYWNpdHlcIiwgXCIwJVwiKVxuLy8gICAgICAgICAgIC5kdXJhdGlvbig1MDApO1xuLy8gICAgICAgfVxuLy8gICAgIH0pO1xuLy8gICB9O1xuXG4vLyAgIGxldCBvYnNlcnZlciA9IG5ldyBJbnRlcnNlY3Rpb25PYnNlcnZlcihoYW5kbGVFZ2dTY3JvbGxPbnRvLCBvcHRpb25zKTtcbi8vICAgb2JzZXJ2ZXIub2JzZXJ2ZShzbGlkZSk7XG5cbi8vIH1cblxuZXhwb3J0IGNvbnN0IGhlcnJpbmdTbGlkZSA9IChvcHRpb25zLCBzbGlkZSkgPT4ge1xuXG5cblxufVxuXG5leHBvcnQgY29uc3QgdHVuYVNsaWRlID0gKG9wdGlvbnMsIHNsaWRlKSA9PiB7XG5cblxuXG59XG5cbmV4cG9ydCBjb25zdCBicm9jY29saVNsaWRlID0gKG9wdGlvbnMsIHNsaWRlKSA9PiB7XG5cblxuXG59XG5cbmV4cG9ydCBjb25zdCBwZWFzU2xpZGUgPSAob3B0aW9ucywgc2xpZGUpID0+IHtcblxuXG5cbn1cblxuZXhwb3J0IGNvbnN0IHJlZFBlcHBlclNsaWRlID0gKG9wdGlvbnMsIHNsaWRlKSA9PiB7XG5cblxuXG59XG5cbmV4cG9ydCBjb25zdCBveXN0ZXJTbGlkZSA9IChvcHRpb25zLCBzbGlkZSkgPT4ge1xuXG5cblxufVxuXG5leHBvcnQgY29uc3Qgc3BpbmFjaFNsaWRlID0gKG9wdGlvbnMsIHNsaWRlKSA9PiB7XG5cblxuXG59XG5cbmV4cG9ydCBjb25zdCBxdWlub2FTbGlkZSA9IChvcHRpb25zLCBzbGlkZSkgPT4ge1xuXG5cblxufVxuXG5leHBvcnQgY29uc3QgY2hvY29sYXRlU2xpZGUgPSAob3B0aW9ucywgc2xpZGUpID0+IHtcblxuXG5cbn1cblxuZXhwb3J0IGNvbnN0IHN0cmF3YmVycnlTbGlkZSA9IChvcHRpb25zLCBzbGlkZSkgPT4ge1xuXG5cblxufVxuXG5leHBvcnQgY29uc3QgYmVhblNsaWRlID0gKG9wdGlvbnMsIHNsaWRlKSA9PiB7XG5cblxuXG59IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luIl0sInNvdXJjZVJvb3QiOiIifQ==