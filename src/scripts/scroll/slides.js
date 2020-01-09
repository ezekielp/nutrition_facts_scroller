export const bananaSlide = (options, slide) => {

  const handleBananaScrollOnto = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        
        let bananaRects = document.querySelectorAll(`.slide-svg-0-rect`);
        bananaRects.forEach(rect => {
            rect.classList.remove("hidden");
        });
        
        let potatoRects = document.querySelectorAll(`.slide-svg-1-rect`);
        potatoRects.forEach(rect => {
            rect.classList.add("hidden");
        });

        d3.select(".slide-svg-0-y-axis")
            .transition()
            .style("opacity", "100%")
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

export const potatoSlide = (options, slide) => {

  const handlePotatoScrollOnto = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {

        let potatoRects = document.querySelectorAll(`.slide-svg-1-rect`);
        potatoRects.forEach(rect => {
            rect.classList.remove('hidden');
        });

        let bananaRects = document.querySelectorAll(`.slide-svg-0-rect`);
        bananaRects.forEach(rect => {
            rect.classList.add('hidden');
        });

        let butterRects = document.querySelectorAll(`.slide-svg-2-rect`);
        butterRects.forEach(rect => {
            rect.classList.add('hidden');
        });
        
        d3.select(".slide-svg-1-y-axis")
          .transition()
          .style("opacity", "100%")
          .duration(500);        

        d3.select(".slide-svg-0-y-axis")
          .transition()
          .style("opacity", "0%")
          .duration(500);

          d3.select(".slide-svg-2-y-axis")
          .transition()
          .style("opacity", "0%")
          .duration(500);
      }
    });
  };

  let observer = new IntersectionObserver(handlePotatoScrollOnto, options);
  observer.observe(slide);

}

export const butterSlide = (options, slide) => {

  const handleButterScrollOnto = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
          let butterRects = document.querySelectorAll(`.slide-svg-2-rect`);
          butterRects.forEach(rect => {
            rect.classList.remove("hidden");
          });

        let potatoRects = document.querySelectorAll(`.slide-svg-1-rect`);
        potatoRects.forEach(rect => {
          rect.classList.add("hidden");
        });

        let avocadoRects = document.querySelectorAll(`.slide-svg-3-rect`);
        avocadoRects.forEach(rect => {
          rect.classList.add("hidden");
        });


        d3.select(".slide-svg-2-y-axis")
          .transition()
          .style("opacity", "100%")
          .duration(500);

        d3.select(".slide-svg-1-y-axis")
          .transition()
          .style("opacity", "0%")
          .duration(500);

        d3.select(".slide-svg-3-y-axis")
          .transition()
          .style("opacity", "0%")
          .duration(500);
      }
    });
  };

  let observer = new IntersectionObserver(handleButterScrollOnto, options);
  observer.observe(slide);

}

export const avocadoSlide = (options, slide) => {

  const handleAvocadoScrollOnto = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {

        let avocadoRects = document.querySelectorAll(`.slide-svg-3-rect`);
        avocadoRects.forEach(rect => {
        rect.classList.remove("hidden");
        });

        let butterRects = document.querySelectorAll(`.slide-svg-2-rect`);
        butterRects.forEach(rect => {
          rect.classList.add("hidden");
        });

        let beefLiverRects = document.querySelectorAll(`.slide-svg-4-rect`);
        beefLiverRects.forEach(rect => {
          rect.classList.add("hidden");
        });

        d3.select(".slide-svg-3-y-axis")
          .transition()
          .style("opacity", "100%")
          .duration(500);

        d3.select(".slide-svg-2-y-axis")
          .transition()
          .style("opacity", "0%")
          .duration(500);

        d3.select(".slide-svg-4-y-axis")
          .transition()
          .style("opacity", "0%")
          .duration(500);
      }
    });
  };

  let observer = new IntersectionObserver(handleAvocadoScrollOnto, options);
  observer.observe(slide);
};    

export const beefLiverSlide = (options, slide) => {

  const handleBeefLiverScrollOnto = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        let beefLiverRects = document.querySelectorAll(`.slide-svg-4-rect`);
        beefLiverRects.forEach(rect => {
        rect.classList.remove("hidden");
        });

        let avocadoRects = document.querySelectorAll(`.slide-svg-3-rect`);
        avocadoRects.forEach(rect => {
          rect.classList.add("hidden");
        });

        let codLiverRects = document.querySelectorAll(`.slide-svg-5-rect`);
        codLiverRects.forEach(rect => {
          rect.classList.add("hidden");
        });

        d3.select(".slide-svg-4-y-axis")
          .transition()
          .style("opacity", "100%")
          .duration(500);

        d3.select(".slide-svg-3-y-axis")
          .transition()
          .style("opacity", "0%")
          .duration(500);

        d3.select(".slide-svg-5-y-axis")
          .transition()
          .style("opacity", "0%")
          .duration(500);
      }
    });
  };

  let observer = new IntersectionObserver(handleBeefLiverScrollOnto, options);
  observer.observe(slide);

}

export const codLiverSlide = (options, slide) => {

  const handleCodLiverScrollOnto = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        let codLiverRects = document.querySelectorAll(`.slide-svg-5-rect`);
        codLiverRects.forEach(rect => {
        rect.classList.remove("hidden");
        });

        let beefLiverRects = document.querySelectorAll(`.slide-svg-4-rect`);
        beefLiverRects.forEach(rect => {
          rect.classList.add("hidden");
        });

        let eggRects = document.querySelectorAll(`.slide-svg-6-rect`);
        eggRects.forEach(rect => {
          rect.classList.add("hidden");
        });

        d3.select(".slide-svg-5-y-axis")
          .transition()
          .style("opacity", "100%")
          .duration(500);

        d3.select(".slide-svg-4-y-axis")
          .transition()
          .style("opacity", "0%")
          .duration(500);

        d3.select(".slide-svg-6-y-axis")
          .transition()
          .style("opacity", "0%")
          .duration(500);
      }
    });
  };

  let observer = new IntersectionObserver(handleCodLiverScrollOnto, options);
  observer.observe(slide);

}



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

        // document.querySelectorAll(`.slide-svg-${idx + 1}-rect`).forEach(rect => {
        //   rect.classList.add("hidden");
        // });

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



        // d3.select(`.slide-svg-${idx + 1}-y-axis`)
        //   .transition()
        //   .style("opacity", "0%")
        //   .duration(500);
      }
    });
  };

  let observer = new IntersectionObserver(handleScrollOnto, options);
  observer.observe(slide);

}
// export const eggSlide = (options, slide) => {

//     let idx = 6;

//   const handleEggScrollOnto = (entries, observer) => {
//     entries.forEach(entry => {
//       if (entry.isIntersecting) {

//         document.querySelectorAll(`.slide-svg-${idx}-rect`).forEach(rect => {
//           rect.classList.remove("hidden");
//         });

//         document.querySelectorAll(`.slide-svg-${idx - 1}-rect`).forEach(rect => {
//           rect.classList.add("hidden");
//         });

//         document.querySelectorAll(`.slide-svg-${idx + 1}-rect`).forEach(rect => {
//           rect.classList.add("hidden");
//         });

//         d3.select(`.slide-svg-${idx}-y-axis`)
//           .transition()
//           .style("opacity", "100%")
//           .duration(500);

//         d3.select(`.slide-svg-${idx - 1}-y-axis`)
//           .transition()
//           .style("opacity", "0%")
//           .duration(500);

//         d3.select(`.slide-svg-${idx + 1}-y-axis`)
//           .transition()
//           .style("opacity", "0%")
//           .duration(500);
//       }
//     });
//   };

//   let observer = new IntersectionObserver(handleEggScrollOnto, options);
//   observer.observe(slide);

// }

export const herringSlide = (options, slide) => {



}

export const tunaSlide = (options, slide) => {



}

export const broccoliSlide = (options, slide) => {



}

export const peasSlide = (options, slide) => {



}

export const redPepperSlide = (options, slide) => {



}

export const oysterSlide = (options, slide) => {



}

export const spinachSlide = (options, slide) => {



}

export const quinoaSlide = (options, slide) => {



}

export const chocolateSlide = (options, slide) => {



}

export const strawberrySlide = (options, slide) => {



}

export const beanSlide = (options, slide) => {



}