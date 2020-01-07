import './styles/index.scss';

let nutritionData;

d3.csv("nutrition_facts_for_scroller.csv", d => {
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
}).then(data => {
  nutritionData = data;
  console.log(nutritionData);

  nutritionData.forEach((foodData, idx) => {
      createVisualization(foodData, idx);
  });

});

const createVisualization = (foodData, idx) => {
  let w = 600;
  let h = 500;

  let data = Object.values(foodData).slice(2, -1);
  let numberOfColumns = 10;
  let maxValue = d3.max(data, function(d) {
    return +d;
  });
  let x_axisLength = w - 50;
  let y_axisLength = h - 50;
  let targetSlide = "#slide-svg-" + idx;
  let targetSlideRect = "slide-svg-" + idx + "-rect";

  let yScale = d3
    .scaleLinear()
    .domain([0, maxValue])
    .range([0, y_axisLength]);

  let svg = d3
    // .select("#slide-svg-0")
    .select(`${targetSlide}`)
    .append("svg")
    .attr("width", w)
    .attr("height", h);

  svg
    .selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    // .attr("class", "#slide-svg-0-rect")
    .attr("class", `${targetSlideRect}`)
    .attr("x", function(d, i) {
      return i * (x_axisLength / numberOfColumns) + 25;
    })
    .attr("y", function(d) {
      return h - yScale(d);
    })
    .attr("width", x_axisLength / numberOfColumns - 1)
    .attr("height", function(d) {
      return yScale(d);
    })
    .attr("fill", "red")
    .transition()
    .duration(500);
};


window.addEventListener("load", (e) => {
    
    let slides = [];
    for (let i = 0; i < 19; i++) {
        let slideName = "#slide-container-" + i;
        let newSlide = document.querySelector(slideName);
        slides.push(newSlide);
    }
    createObservers(slides);
}, false);

const createObservers = (slides) => {
    
    let options = {
      root: null,
      rootMargin: "0px 0px 0px 0px",
      threshold: [.15, .85]
    //   threshold: .05
    };

    
    for (let i = 0; i < 18; i++) {
        handleScrollOntoWrapper(i, options, slides[i]);
    }

}

const handleScrollOntoWrapper = (idx, options, slide) => {
    debugger;
    let foodData = nutritionData[idx];

    let targetSlide = ".slide-svg-" + idx;
    let targetSlideRect = targetSlide + "-rect";

    const handleScrollOnto = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
            // if (entry.intersectionRatio <= 0.80) {
              let singleFoodData = Object.values(foodData).slice(2, -1);

              // console.log(singleFoodData);
              console.log(nutritionData[idx].food_name);
              console.log(entry.intersectionRatio);
              console.log(entry.boundingClientRect);
              // createVisualization(foodData, idx);
              let maxValue = d3.max(singleFoodData, function(d) {
                return +d;
              });
              let y_axisLength = 450;

              let yScale = d3
                .scaleLinear()
                .domain([0, maxValue])
                .range([0, y_axisLength]);

              // d3.selectAll(`${targetSlideRect}`)
              d3.selectAll(`rect`)
                .data(singleFoodData)
                .transition()
                .attr("y", function(d) {
                  return 500 - yScale(d);
                })
                .attr("height", function(d) {
                  return yScale(d);
                })
                .duration(500);
            } else {
            //   console.log(nutritionData[idx].food_name);
            //   console.log(entry.intersectionRatio);
              d3.selectAll(`rect`)
                // d3.selectAll(`${targetSlideRect}`)
                // d3.selectAll("#slide-svg-0-rect")
                .transition()
                .attr("y", 500)
                .duration(500);
            }
        });
    };

    let observer = new IntersectionObserver(handleScrollOnto, options);
    observer.observe(slide);

}
















// const handleScrollOnto = (entries, observer) => {
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


