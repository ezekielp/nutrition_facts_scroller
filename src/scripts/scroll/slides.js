export const renderSlide = (options, slide, idx) => {

  const handleScrollOnto = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {

        document.querySelectorAll(`.slide-svg-${idx}-rect`).forEach(rect => {
          rect.classList.remove("hidden");
        });

        if (document.querySelectorAll(`.slide-svg-${idx - 1}-rect`)) {
            document
              .querySelectorAll(`.slide-svg-${idx - 1}-rect`)
              .forEach(rect => {
                rect.classList.add("hidden");
              });
        }

        if (document.querySelectorAll(`.slide-svg-${idx + 1}-rect`)) {
            document
              .querySelectorAll(`.slide-svg-${idx + 1}-rect`)
              .forEach(rect => {
                rect.classList.add("hidden");
              });
        }

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