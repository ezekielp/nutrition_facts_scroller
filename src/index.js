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
    
    createVisualization(nutritionData[0], 0, true);

    for (let i = 1; i < nutritionData.length; i++) {
        createVisualization(nutritionData[i], i);
    }

});

const createVisualization = (foodData, idx, createXAxisBool) => {
  let margin = {top: 40, right: 40, bottom: 65, left: 50}
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
    .attr("width", w + margin.left + margin.right)
    .attr("height", h + margin.top + margin.bottom);

  svg
    .selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("class", `${targetSlideRect} hidden chart-rect`)
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
            .attr("transform", "translate(" + margin.left + ", " + (h - margin.top) + ")")
            .transition()
            .duration(1000)
            .call(xAxis)
    
        svg.selectAll(".x-axis text")
            .attr("transform", function(d) {
                return "translate(25, 25)rotate(-45)"; 
            });
    }


    let yAxis = d3.axisLeft(yScale).ticks(4, "%");

    svg
      .append("g")
      .attr("class", `${targetSVG}-y-axis y-axis`)
      .attr("transform", "translate(" + margin.left + ",0)")
      .style("opacity", "0%")
      .call(yAxis);

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
        // for (let i = 3; i < bananaChildren.length + 3; i++) {
        // }


        let upwardMove, downwardMove;

        let bananaIconPos = {
            top: bananaIcon.getBoundingClientRect().top,
            left: bananaIcon.getBoundingClientRect().left
        };

        let movementFunc = newBanana => {
          let newBananaPos = {
            top: Math.floor(Math.random() * -5),
            left: Math.floor(Math.random() * window.innerWidth)
          };

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

        //   let velocity = 0;

          let velocity = Math.floor(Math.random() * 10);

          let frameDownward = () => {
            if (newBananaPos.top > 1500) {
            clearInterval(downwardMove);
            //   bananaIcon.removeChild(newBanana);
            } else {
              newBananaPos.top += (velocity + 5);
            //   newBananaPos.top *= -1.1;
            //   newBananaPos.left += Math.floor(Math.random() * 8);
            //   newBananaPos.right += Math.floor(Math.random() * 8);

              newBanana.style.top = newBananaPos.top + "px";
            //   newBanana.style.left = newBananaPos.left + "px";
            //   newBanana.style.right = newBananaPos.right + "px";
            }
          };
          downwardMove = setInterval(frameDownward, 2);

        //   setTimeout(() => {

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

        };

        // let movementFunc = newBanana => {
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


        for (let i = bananaCounter; i < bananaCounter + 20; i++) {
            let newBanana = document.createElement("div");
            newBanana.setAttribute("id", `flying-banana-${i}`);
            newBanana.classList.add(`flying-banana`);
            bananaIcon.appendChild(newBanana);

            let thisOneParticularBanana = document.getElementById(
            `flying-banana-${i}`
            );
            thisOneParticularBanana.style.top = "-5px";
            thisOneParticularBanana.style.left = Math.floor(Math.random() * window.innerWidth) + "px";

            movementFunc(thisOneParticularBanana);
        }

        bananaCounter += 10;
        // let i = bananaCounter;
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

})


const createObservers = (slides) => {
    
    let options = {
      root: null,
      rootMargin: "0px 0px 0px 0px",
      threshold: .3
    };

    console.log(slides);
    
    // Slides.bananaSlide(options, slides[0]);
    // Slides.potatoSlide(options, slides[1]);
    // Slides.butterSlide(options, slides[2]);
    // Slides.avocadoSlide(options, slides[3]);
    // Slides.beefLiverSlide(options, slides[4]);
    // Slides.codLiverSlide(options, slides[5]);

    for (let i = 0; i < slides.length - 1; i++) {
      Slides.renderSlide(options, slides[i], i);
    }


}
