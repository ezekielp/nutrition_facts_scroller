import './styles/index.scss';
import * as Slides from './scripts/scroll/slides';
import addAllFlyingFoodListeners from './scripts/flying_food';

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
    "vitamin C": +d["Vitamin C"],
    folate: +d["Folate"],
    "vitamin B12": +d["Vitamin B-12"],
    "vitamin A": +d["Vitamin A"],
    "vitamin D": +d["Vitamin D"],
    cholesterol: +d["Cholesterol"]
  };
}).then(data => {
    nutritionData = data;
    console.log(nutritionData);
    
    createVisualization(nutritionData[0], 0, true);
    createNavLi(0);
    createAnchor(0);
    
    for (let i = 1; i < nutritionData.length; i++) {
      createVisualization(nutritionData[i], i);
      createNavLi(i);
      createAnchor(i);
    }

});

const createVisualization = (foodData, idx, createXAxisBool) => {
  let margin = {top: 20, right: 40, bottom: 25, left: 60}
  let w = 600 - margin.left - margin.right;
  let h = 475 - margin.top - margin.bottom;

  let data = Object.values(foodData).slice(2, -1);
  let numberOfColumns = 10;
  let maxValue = Math.max(.50, d3.max(data, function(d) {
    return (+d / 100);
  }));
  let x_axisLength = w;
  let y_axisLength = h;
  let targetSVG = "slide-svg-" + idx;
  let targetSlideRect = "slide-svg-" + idx + "-rect";

  let xScale = d3
    .scaleLinear()
    .domain([0, numberOfColumns])
    .range([0, w]);

  let yScale = d3
    .scaleLinear()
    .domain([0, maxValue])
    .range([h - margin.top, margin.bottom]);

  let svg = d3
    .select("#vis")
    // .select(`#svg-container-${idx}`)
    .append("svg")
    .attr("class", `${targetSVG} hidden`)
    .attr("viewBox", `0 0 650 700`)
    .attr("preserveAspectRatio", "xMinYMin meet");
    // .attr("width", w + margin.left + margin.right)
    // .attr("height", h + margin.top + margin.bottom);

  let xAxis = d3
    .axisBottom(xScale)
    .tickSize(0)
    .tickFormat(function(d) {
      return Object.keys(foodData).slice(2, -1)[d];
    });

  // if (createXAxisBool !== undefined) {
    svg
      .append("g")
      .attr("class", `${targetSVG}-x-axis x-axis`)
      .attr(
        "transform",
        "translate(" + margin.left + ", " + (h - margin.top) + ")"
      )
      .transition()
      .duration(1000)
      .call(xAxis);

    svg.selectAll(".x-axis text").attr("transform", function(d) {
      return "translate(10, 25)rotate(-45)";
    });

    svg
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("class", "y-axis-label")
      .attr("y", 0)
      .attr("x", 0 - h / 2)
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Percentage of recommended daily allowance(RDA)");

    svg
      .append("text")
      .attr("class", "source-text")
      .attr("transform",
        "translate(35, " +
        (h + margin.top + 40) + ")")
      // .attr("dy", "1em")
      .style("text-anchor", "left")
      .text("Source: USDA");
  // }

  let yAxis = d3.axisLeft(yScale).ticks(4, "%");

  svg
    .append("g")
    .attr("class", `${targetSVG}-y-axis y-axis`)
    .attr("transform", "translate(" + margin.left + ",0)")
    .style("opacity", "0%")
    .call(yAxis);
        
  svg
    .selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("class", `${targetSlideRect}`)
    .attr("x", function(d, i) {
      return i * (x_axisLength / numberOfColumns) + margin.left + 10;
    })
    .attr("y", function(d) {
      return yScale(d / 100);
    })
    .attr("width", x_axisLength / numberOfColumns - 1)
    .attr("height", function(d) {
      return h - yScale(d / 100) - margin.top;
    })
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


document.addEventListener("DOMContentLoaded", () => {

    addAllFlyingFoodListeners();

    const flyingFoodIds = [0, 1, 2, 3, 4, 6, 7, 9, 11, 12, 13, 14, 16, 17];

    flyingFoodIds.forEach(id => {
      document.getElementById(`food-svg-container-${id}`).addEventListener("mouseover", () => {
        document.getElementById(`click-bubble-${id}`).classList.add("show");
      })

      document.getElementById(`food-svg-container-${id}`).addEventListener("mouseout", () => {
        document.getElementById(`click-bubble-${id}`).classList.remove("show");
      })

    })


    // document.getElementById('food-svg-container-0').addEventListener("mouseout", () => {

    //   document.querySelector('.click-bubble').classList.remove("show");
    // })

    // document.getElementById('food-svg-container-1').addEventListener("mouseover", () => {

    //   document.querySelector('#click-bubble-1').classList.add("show");
    // })

    // document.getElementById('food-svg-container-1').addEventListener("mouseout", () => {

    //   document.querySelector('#click-bubble-1').classList.remove("show");
    // })

})

const createObservers = (slides) => {
    
    let options = {
      root: null,
      rootMargin: "0px 0px 0px 0px",
      threshold: .5
    };

    console.log(slides);
    
    for (let i = 0; i < slides.length - 1; i++) {
      Slides.renderSlide(options, slides[i], i);
    }

}

const createNavLi = (idx) => {
  let navColumn = document.querySelector('.nav-column');

  let anchorLink = document.createElement("a");
  anchorLink.setAttribute("href", `#anchor-${idx}`);
  navColumn.appendChild(anchorLink);

  let navLi = document.createElement("li");
  navLi.setAttribute("id", `nav-li-${idx}`);
  navLi.classList.add("nav-li");
  anchorLink.appendChild(navLi);

}

const createAnchor = (idx) => {
  let slideContainer = document.getElementById(`slide-container-${idx}`);

  let anchorTag = document.createElement("a");
  anchorTag.setAttribute("id", `anchor-${idx}`);
  anchorTag.classList.add("anchor");

  slideContainer.appendChild(anchorTag);
}


