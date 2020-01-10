import './styles/index.scss';
import * as Slides from './scripts/scroll/slides';

let nutritionData;
let bananaCounter = 0;

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
  let margin = {top: 40, right: 40, bottom: 65, left: 60}
  let w = 700 - margin.left - margin.right;
  let h = 600 - margin.top - margin.bottom;

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
    .append("svg")
    .attr("class", `${targetSVG}`)
    .attr("width", w + margin.left + margin.right)
    .attr("height", h + margin.top + margin.bottom);

  let xAxis = d3
    .axisBottom(xScale)
    .tickSize(0)
    .tickFormat(function(d) {
      return Object.keys(foodData).slice(2, -1)[d];
    });

  if (createXAxisBool !== undefined) {
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
      return "translate(25, 25)rotate(-45)";
    });

    svg
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("class", "y-axis-label")
      .attr("y", -5)
      .attr("x", 0 - h / 2)
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Percentage of recommended daily allowance(RDA)");
  }

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
    .attr("class", `${targetSlideRect} hidden`)
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
    .attr("fill", "red")
    .transition()
    .duration(500);
    // .on("mouseover", handleMouseover);


    const handleMouseover = (d, i) => {
      d3.select(this)
        .transition()
        .ease("ease")
        .duration(500)
        .attr("fill", "white");
    };
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

    document
      .getElementById("banana-svg-container")
      .addEventListener("click", e => {

        let bananaIcon = document.getElementById(
            "banana-svg-container"
        );

        let bananaChildren = bananaIcon.childNodes;
        if (bananaChildren[3]) {
            for (let i = 0; i < 20; i++) {
                bananaIcon.removeChild(bananaChildren[3]);
            }
        }

        let movementFunc = newBanana => {

          let start = null;

          const step = (timestamp) => {
            if (!start) start = timestamp;
            let progress = timestamp - start;
            newBanana.style.transform =
              "translateY(" + (progress) + "px)";
            if (progress < 5000) {
              window.requestAnimationFrame(step);
            }
          }

          window.requestAnimationFrame(step);

        }

        for (let i = bananaCounter; i < bananaCounter + 20; i++) {
            let newBanana = document.createElement("div");
            newBanana.setAttribute("id", `flying-banana-${i}`);
            newBanana.classList.add(`flying-banana`);
            bananaIcon.appendChild(newBanana);

            let thisOneParticularBanana = document.getElementById(
            `flying-banana-${i}`
            );
            thisOneParticularBanana.style.top = (Math.random() * -700) + "px";
            thisOneParticularBanana.style.left = Math.floor(Math.random() * window.innerWidth) + "px";

            movementFunc(thisOneParticularBanana);
        }

        bananaCounter += 10;

      });

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


