export const renderSlide = (options, slide, idx) => {

  const handleScrollOnto = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {

        document.querySelectorAll(`.slide-svg-${idx}-rect`).forEach(rect => {
          rect.classList.remove("hidden");
          rect.classList.add("chart-rect");
        });

        // document
        //   .querySelector(`#slide-container-${idx}`)
        //   .classList.remove("opaque");
        
        // d3.selectAll(`.slide-svg-${idx}-rect`).on("mouseover", handleMouseover);

        // const handleMouseover = (d, i) => {
        //   debugger;
        //   d3.select(this)
        //     .transition()
        //     .ease("ease")
        //     .duration(500)
        //     .attr("fill", "white");
        // };


        if (document.querySelectorAll(`.slide-svg-${idx - 1}-rect`)) {
            document
              .querySelectorAll(`.slide-svg-${idx - 1}-rect`)
              .forEach(rect => {
                rect.classList.add("hidden");
                rect.classList.remove("chart-rect");
              });
        }

        // if (document.querySelector(`#slide-container-${idx - 1}`)) {
        //   document
        //     .querySelector(`#slide-container-${idx - 1}`)
        //     .classList.add("opaque");
        // }

        if (document.querySelectorAll(`.slide-svg-${idx + 1}-rect`)) {
            document
              .querySelectorAll(`.slide-svg-${idx + 1}-rect`)
              .forEach(rect => {
                rect.classList.add("hidden");
                rect.classList.remove("chart-rect");
              });
        }

        // if (document.querySelector(`#slide-container-${idx + 1}`)) {
        //   document
        //     .querySelector(`#slide-container-${idx + 1}`)
        //     .classList.add("opaque");            
        // }

        d3.select(`.slide-svg-${idx}-y-axis`)
          .transition()
          .style("opacity", "100%")
          .duration(500);


        if (document.querySelector(`.slide-svg-${idx - 1}-y-axis`)) {
            d3.select(`.slide-svg-${idx - 1}-y-axis`)
              .transition()
              .style("opacity", "0%")
              .duration(500);
        }

        if (document.querySelector(`.slide-svg-${idx + 1}-y-axis`)) {
            d3.select(`.slide-svg-${idx + 1}-y-axis`)
              .transition()
              .style("opacity", "0%")
              .duration(500);
        }

      }
    });
  };

  let observer = new IntersectionObserver(handleScrollOnto, options);
  observer.observe(slide);

}