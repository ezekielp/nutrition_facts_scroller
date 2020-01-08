export const avocadoSlide = (idx, options, slide, data) => {
  let foodData = data[idx];

  let targetSlide = ".slide-svg-" + idx;
  let targetSlideRect = targetSlide + "-rect";

  const handleAvocadoScrollOnto = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        let singleFoodData = Object.values(foodData).slice(2, -1);

        let maxValue = d3.max(singleFoodData, function(d) {
          return +d;
        });
        let y_axisLength = 450;

        let yScale = d3
          .scaleLinear()
          .domain([0, maxValue])
          .range([0, y_axisLength]);

        d3.selectAll(`${targetSlideRect}`)
          .data(singleFoodData)
          .transition()
          .attr("y", function(d) {
            return 500 - yScale(d);
          })
          .attr("height", function(d) {
            return yScale(d);
          })
          .delay(750)
          .duration(500);

        d3.selectAll(".slide-svg-1-rect")
            .transition()
            .attr("y", 500)
            .duration(500);

      }
    });
  };

  let observer = new IntersectionObserver(handleAvocadoScrollOnto, options);
  observer.observe(slide);
};    

export const bananaSlide = (idx, options, slide, data) => {
  let foodData = data[idx];

  let targetSlide = ".slide-svg-" + idx;
  let targetSlideRect = targetSlide + "-rect";

  const handleBananaScrollOnto = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        let singleFoodData = Object.values(foodData).slice(2, -1);

        let maxValue = d3.max(singleFoodData, function(d) {
          return +d;
        });
        let y_axisLength = 450;

        let yScale = d3
          .scaleLinear()
          .domain([0, maxValue])
          .range([0, y_axisLength]);

        d3.selectAll(`${targetSlideRect}`)
          .data(singleFoodData)
          .transition()
          .attr("y", function(d) {
            return 500 - yScale(d);
          })
          .attr("height", function(d) {
            return yScale(d);
          })
          .delay(750)
          .duration(500);

        d3.selectAll(".slide-svg-0-rect")
          .transition()
          .attr("y", 500)
          .duration(500);
      }
    });
  };

  let observer = new IntersectionObserver(handleBananaScrollOnto, options);
  observer.observe(slide);
};

export const potatoSlide = (idx, options, slide, data) => {



}

export const butterSlide = (idx, options, slide, data) => {



}

export const beefLiverSlide = (idx, options, slide, data) => {



}

export const codLiverSlide = (idx, options, slide, data) => {



}

export const eggSlide = (idx, options, slide, data) => {



}

export const herringSlide = (idx, options, slide, data) => {



}

export const tunaSlide = (idx, options, slide, data) => {



}

export const broccoliSlide = (idx, options, slide, data) => {



}

export const peasSlide = (idx, options, slide, data) => {



}

export const redPepperSlide = (idx, options, slide, data) => {



}

export const oysterSlide = (idx, options, slide, data) => {



}

export const spinachSlide = (idx, options, slide, data) => {



}

export const quinoaSlide = (idx, options, slide, data) => {



}

export const chocolateSlide = (idx, options, slide, data) => {



}

export const strawberrySlide = (idx, options, slide, data) => {



}

export const beanSlide = (idx, options, slide, data) => {



}