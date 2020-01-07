import './styles/index.scss';

let redBox, blueBox, textBox;

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
  console.log(Object.values(nutritionData[0]).slice(2, -1));
  createVisualization(nutritionData[0]);
});

const createVisualization = objectData => {
  let w = 600;
  let h = 500;

  let data = Object.values(objectData).slice(2, -1);
  let numberOfColumns = 10;
  let maxValue = d3.max(data, function(d) {
    return +d;
  });
  let x_axisLength = w - 50;
  let y_axisLength = h - 50;

  let yScale = d3
    .scaleLinear()
    .domain([0, maxValue])
    .range([0, y_axisLength]);

  let svg = d3
    .select("#text-box")
    .append("svg")
    .attr("width", w)
    .attr("height", h);

  svg
    .selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
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
    .attr("fill", "red");
};


window.addEventListener("load", (e) => {
    textBox = document.querySelector("#text-box");
    redBox = document.querySelector("#red-box");
    blueBox = document.querySelector("#blue-box");

    createObserver();
}, false);

const createObserver = () => {
    let observer;
    
    let options = {
      root: null,
      rootMargin: "0px 0px 0px 0px",
      threshold: .50
    };

    observer = new IntersectionObserver(handleScrollOnto, options);
    // observer.observe(redBox);
    observer.observe(textBox);
    // observer.observe(blueBox);
}

const handleScrollOnto = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {

            let singleFoodData = Object.values(nutritionData[0]).slice(2, -1);
            let maxValue = d3.max(singleFoodData, function(d) {
            return +d;
            });
            // let x_axisLength = w - 50;
            let y_axisLength = 450;

            let yScale = d3
            .scaleLinear()
            .domain([0, maxValue])
            .range([0, y_axisLength]);


            d3.selectAll("rect")
              .data(singleFoodData)
              .transition()
              .attr("y", function(d) {
                return 500 - yScale(d);
              })
              .attr("height", function(d) {
                return yScale(d);
              })
              .duration(1000)
              .delay(500);

            // createVisualization(nutritionData[0]);
            // entry.target.style.opacity = "100%";
            // entry.target.style.transform = "translateX(0%)";
            // entry.target.style.visibility = "visible";
        } else {
            d3.selectAll("rect")
            .transition()
            .attr("y", 500)
            .duration(1000);
            // entry.target.style.opacity = "0%";
            // entry.target.style.visibility = "hidden";
            // entry.target.style.transform = "translateX(50%)";
        }
    })
}


