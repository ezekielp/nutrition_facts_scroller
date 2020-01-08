export const bananaSlide = (idx, options, slide, data) => {
  let foodData = data[idx];

  let targetSlide = ".slide-svg-" + idx;
  let targetSlideRect = targetSlide + "-rect";

  const handleBananaScrollOnto = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        let margin = { top: 40, right: 40, bottom: 65, left: 50 };
        let w = 700 - margin.left - margin.right;
        let h = 600 - margin.top - margin.bottom;

        let singleFoodData = Object.values(foodData).slice(2, -1);

        let maxValue = Math.max(
            0.5,
            d3.max(singleFoodData, function(d) {
              return +d / 100;
            })
        );

        let yScale = d3
            .scaleLinear()
            .domain([0, maxValue])
            .range([h - margin.top, margin.bottom]);


        d3.selectAll(`${targetSlideRect}`)
          .data(singleFoodData)
          .transition()
          .attr("y", function(d) {
            return yScale(d / 100);
          })
        //   .attr("height", function(d) {
        //       debugger;
        //     return h - yScale(d / 100) - margin.top;
        //   })
          .delay(750)
          .duration(500);

        d3.selectAll(".slide-svg-1-rect")
          .transition()
          .attr("y", h + 200)
        //   .attr("height", "0px")
          .duration(500);

        d3.select(".slide-svg-0-y-axis")
          .transition()
          .style("opacity", "100%")
          .delay(750)
          .duration(500);        

        d3.select(".slide-svg-1-y-axis")
        .transition()
        .style("opacity", "0%")
        .duration(500);
      }
    });
  };

  let observer = new IntersectionObserver(handleBananaScrollOnto, options);
  observer.observe(slide);
};

export const potatoSlide = (idx, options, slide, data) => {

  let foodData = data[idx];

  let targetSlide = ".slide-svg-" + idx;
  let targetSlideRect = targetSlide + "-rect";

  const handlePotatoScrollOnto = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        let margin = { top: 40, right: 40, bottom: 65, left: 50 };
        let w = 700 - margin.left - margin.right;
        let h = 600 - margin.top - margin.bottom;

        let singleFoodData = Object.values(foodData).slice(2, -1);

        let maxValue = Math.max(
          0.5,
          d3.max(singleFoodData, function(d) {
            return +d / 100;
          })
        );

        let yScale = d3
          .scaleLinear()
          .domain([0, maxValue])
          .range([h - margin.top, margin.bottom]);

        d3.selectAll(`${targetSlideRect}`)
          .data(singleFoodData)
          .transition()
          .attr("y", function(d) {
            return yScale(d / 100);
          })
        //   .attr("height", function(d) {
        //     return h - yScale(d / 100) - margin.top;
        //   })
          .delay(750)
          .duration(500);

        d3.select(".slide-svg-1-y-axis")
          .transition()
          .style("opacity", "100%")
          .delay(750)
          .duration(500);        

        d3.selectAll(".slide-svg-0-rect")
          .transition()
          .attr("y", h + 200)
        //   .attr("height", "0px")
          .duration(500);

        d3.select(".slide-svg-0-y-axis")
          .transition()
          .style("opacity", "0%")
          .duration(500);
      }
    });
  };

  let observer = new IntersectionObserver(handlePotatoScrollOnto, options);
  observer.observe(slide);

}

export const butterSlide = (idx, options, slide, data) => {



}

export const avocadoSlide = (idx, options, slide, data) => {
  let foodData = data[idx];

  let targetSlide = ".slide-svg-" + idx;
  let targetSlideRect = targetSlide + "-rect";



  let observer = new IntersectionObserver(handleAvocadoScrollOnto, options);
  observer.observe(slide);
};    


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