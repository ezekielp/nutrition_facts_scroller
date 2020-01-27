# Brain Food

![](brain_food_scroller.gif)

### Table of contents
1. [Background and overview](#background)
2. [Project link](#demo)
3. [Functionality & MVP](#functionality)
4. [Wireframes](#wireframes)
5. [Architecture and technologies](#technologies)


## <a name="background"></a> Background and overview

Brain Food is a scroller with data visualizations about nutrition facts of staple foods. It emphasizes lesser-known facts about well-known food items (and a few that are often neglected). The scroller format and hover effects on the visualizations provide interactivity, and the order of the visualizations serves to compare and contrast the properties of various foods.

## <a name="demo"></a> Project link

Here is a link to the live project: http://ezekielp.com/nutrition_facts_scroller/

## <a name="functionality"></a> Functionality & MVP

Users of the nutrition facts scroller are able to:

- [x] Scroll through the visualizations (17 slides)
- [x] Hover over each of the charts to see more detailed information
- [x] Toggle between visualizations of the various featured foods using the navigation bar
- [x] Click on most of the food images to display a playful animation

Additionally, this project includes:

- [x] A sidebar of scrollable text providing context and highlights about the food featured in each visualization

## <a name="wireframes"></a> Wireframes

<p>
    <img src="https://raw.githubusercontent.com/ezekielp/nutrition_facts_scroller/master/nutrition_facts_scroller_wireframe.png">
</p>

## <a name="technologies"></a> Architecture and technologies

The project uses the following technologies:

* `JavaScript` (specifically the Intersection Observer API) for scrolling logic, interactivity, and animations
* `D3.js` for data visualization
* `Webpack` for bundling JS files

The Interesction Observer API allows you to create transition points when scrolling over DOM elements. The first step I took was to create references to each data visualization slide in the scroller, then call a `createObservers` function on the slides:

```
window.addEventListener("load", (e) => {
    
    let slides = [];
    for (let i = 0; i < 19; i++) {
        let slideName = "#slide-container-" + i;
        let newSlide = document.querySelector(slideName);
        slides.push(newSlide);
    }
    createObservers(slides);
}, false);
```

The `createObservers` function sets up the threshold at which a transition callback function should be called, as well as sets other options. I chose a threshold of 50%, meaning the callback inside the `Slides.renderSlide` function will be called when the user scrolls halfway down a given slide.

```
const createObservers = (slides) => {
    
    let options = {
      root: null,
      rootMargin: "0px 0px 0px 0px",
      threshold: .5
    };

    for (let i = 0; i < slides.length - 1; i++) {
      Slides.renderSlide(options, slides[i], i);
    }

}
```

The callback then executes the logic of displaying the current slide and hiding the previous slide (if one exists) and the following slide (again, if one exists, to account for the last slide in the scroller).

```
    document.querySelector(`.slide-svg-${idx}`)
        .classList.remove("hidden");

    if (document.querySelector(`.slide-svg-${idx - 1}`)) {
        document.querySelector(`.slide-svg-${idx - 1}`)
        .classList.add("hidden");
    }

    if (document.querySelector(`.slide-svg-${idx + 1}`)) {
        document.querySelector(`.slide-svg-${idx + 1}`)
        .classList.add("hidden");
    }
```

The `slides.js` file contains this function, which also carries out other transition logic, such as displaying the tooltips for the current chart, animating the chart, and replacing the y-axis on each slide.