export const renderSlide = (options, slide, idx) => {

  const handleScrollOnto = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {

        document.querySelectorAll(`.slide-svg-${idx}-rect`).forEach(rect => {
          rect.classList.remove("hidden");
          rect.classList.add("chart-rect");
        });

        d3.select(`.slide-svg-${idx}-y-axis`)
          .transition()
          .style("opacity", "100%")
          .duration(500);

        let navCircle = document.getElementById(`nav-li-${idx}`);
        navCircle.classList.add(`nav-li-${idx}`);



        if (document.querySelectorAll(`.slide-svg-${idx - 1}-rect`)) {
            document
              .querySelectorAll(`.slide-svg-${idx - 1}-rect`)
              .forEach(rect => {
                rect.classList.add("hidden");
                rect.classList.remove("chart-rect");
              });

            d3.select(`.slide-svg-${idx - 1}-y-axis`)
              .transition()
              .style("opacity", "0%")
              .duration(500);
            
        }

        if (document.getElementById(`nav-li-${idx - 1}`)) {
          document.getElementById(`nav-li-${idx - 1}`).classList.remove(`nav-li-${idx - 1}`);
        }

        if (document.querySelectorAll(`.slide-svg-${idx + 1}-rect`)) {
            // debugger;
            document
              .querySelectorAll(`.slide-svg-${idx + 1}-rect`)
              .forEach(rect => {
                rect.classList.add("hidden");
                rect.classList.remove("chart-rect");
              });

            d3.select(`.slide-svg-${idx + 1}-y-axis`)
              .transition()
              .style("opacity", "0%")
              .duration(500);

            document.getElementById(`nav-li-${idx + 1}`).classList.remove(`nav-li-${idx + 1}`);              
        }

          
      }
    });
  };

  let observer = new IntersectionObserver(handleScrollOnto, options);
  observer.observe(slide);

}