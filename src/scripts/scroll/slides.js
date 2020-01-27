export const renderSlide = (options, slide, idx) => {

  const handleScrollOnto = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {

        document.querySelector(`.slide-svg-${idx}`)
          .classList.remove("hidden");

        let currentSVG = d3.select(`.slide-svg-${idx}`);

        let tooltip = d3
          .select("body")
          .append("div")
          .style("position", "absolute")
          .style("font-size", "12px")
          .style("z-index", "10")
          .style("visibility", "hidden");
        
        const nutrients = ["fiber", "iron", "magnesium", "potassium", "zinc", "vitamin C", "folate", "vitamin B12", "vitamin A", "vitamin D"];

        currentSVG
          .selectAll("rect")
          .on("mouseover", function(d) {
            return tooltip.style("visibility", "visible");
          })
          .on("mousemove", function(d, i) {
            return tooltip
              .style("top", event.pageY - 60 + "px")
              .style("left", event.pageX - 30 + "px")
              .style("background-color", "white")
              .style("border", "2px solid black")
              .style("padding", "5px")
              .style("border-radius", "3px")
              .text(`${nutrients[i]}: ${d}%`);
          })
          .on("mouseout", function(d) {
            return tooltip.style("visibility", "hidden");
          });

        if (document.querySelector(`.slide-svg-${idx - 1}`)) {
          document.querySelector(`.slide-svg-${idx - 1}`)
          .classList.add("hidden");
        }

        if (document.querySelector(`.slide-svg-${idx + 1}`)) {
          document.querySelector(`.slide-svg-${idx + 1}`)
          .classList.add("hidden");
        }

        document.querySelectorAll(`.slide-svg-${idx}-rect`).forEach(rect => {
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
            document
              .querySelectorAll(`.slide-svg-${idx + 1}-rect`)
              .forEach(rect => {
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