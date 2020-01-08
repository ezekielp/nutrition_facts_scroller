import './styles/index.scss';
import * as Slides from './scripts/scroll/slides';

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
  
  createVisualization(nutritionData[0], 0);
  createVisualization(nutritionData[1], 1);
//   nutritionData.forEach((foodData, idx) => {
//       createVisualization(foodData, idx);
//   });

});

const createVisualization = (foodData, idx) => {
  let margin = {top: 40, right: 40, bottom: 65, left: 50}
  let w = 700 - margin.left - margin.right;
  let h = 600 - margin.top - margin.bottom;

  let data = Object.values(foodData).slice(2, -1);
  let numberOfColumns = 10;
//   let maxValue = .50;
  let maxValue = Math.max(.50, d3.max(data, function(d) {
    return (+d / 100);
  }));
//   let maxValue = d3.max(data, function(d) {
//     return +d;
//   });
  let x_axisLength = w;
  let y_axisLength = h;
  let targetSVG = "slide-svg-" + idx;
  let targetSlideRect = "slide-svg-" + idx + "-rect";

//   debugger;
  let xScale = d3
    .scaleLinear()
    // .domain(d3.extent(Object.keys(foodData).slice(2, -1), function(d) { return d }))
    .domain([0, numberOfColumns])
    // .domain([data[0], data[data.length - 1]])
    .range([0, w]);

  let yScale = d3
    .scaleLinear()
    .domain([0, maxValue])
    // .domain([maxValue, 0])
    // .range([h, 0]);
    .range([h - margin.top, margin.bottom]);
//   let yScale = d3
//     .scaleLinear()
//     .domain([0, maxValue])
//     .range([0, y_axisLength + 50]);

//   debugger;

  let svg = d3
    // .select(`${targetSlide}`)
    .select("#vis")
    .append("svg")
    // .attr("class", `${targetSVG}`)
    .attr("width", w + margin.left + margin.right)
    .attr("height", h + margin.top + margin.bottom);

  svg
    .selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("class", `${targetSlideRect}`)
    .attr("x", function(d, i) {
      return i * (x_axisLength / numberOfColumns) + margin.left + 10;
    })
    .attr("y", h + 200)
    // .attr("y", function(d) {
    // //   return yScale(d / 100);
    // })
    .attr("width", x_axisLength / numberOfColumns - 1)
    .attr("height", function(d) {
    //  return 0;
      return h - yScale(d / 100) - margin.top;
   })
    .attr("fill", "red")
    .transition()
    .duration(500);

    let xAxis = d3
                .axisBottom(xScale)
                .tickSize(0)
                .tickFormat(function(d) {
                    return Object.keys(foodData).slice(2, -1)[d];
                });

    svg
        .append("g")
        .attr("class", `${targetSVG}-x-axis x-axis`)
        //   .attr("class", `y-axis`)
        // .attr("transform", "translate(0, " + h + ")")
        .attr("transform", "translate(" + margin.left + ", " + (h - margin.top) + ")")
        .transition()
        .duration(1000)
        .call(xAxis)
        // .selectAll("text");

    svg.selectAll(".x-axis text")
        .attr("transform", function(d) {
            return "translate(20, 20)rotate(-45)"; 
        });

    let yAxis = d3.axisLeft(yScale).ticks(4, "%");

    svg
      .append("g")
      .attr("class", `${targetSVG}-y-axis y-axis`)
    //   .attr("class", `y-axis`)
      .attr("transform", "translate(" + margin.left + ",0)")
      .transition()
      .duration(1000)
      .call(yAxis);

    //   .axis()
    //   .scale(yScale)
    //   .orient("left")
    //   .tickSize(0);




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
      threshold: .3
    };

    
    Slides.bananaSlide(0, options, slides[0], nutritionData);
    Slides.potatoSlide(1, options, slides[1], nutritionData);

}
