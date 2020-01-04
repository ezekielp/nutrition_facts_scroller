
# Nutrition Facts Scroller

### Table of contents
1. [Background and overview](#background)
2. [Functionality & MVP](#functionality)
3. [Wireframes](#wireframes)
4. [Architecture and technologies](#technologies)
5. [Implementation timeline](#timeline)
6. [Bonus features](#bonus)


## <a name="background"></a> Background and overview

This project will be a scroller with data visualizations about nutrition facts of staple foods. It will emphasize lesser-known facts about well-known food items (and a few that are commonly neglected). The scroller format and hover effects on the visualizations will provide interactivity, and the order of the visualizations will serve to compare and contrast the properties of various foods.

## <a name="functionality"></a> Functionality & MVP

Users of the nutrition facts scroller will be able to:

- [ ] Scroll through the visualizations (minimum of 10 slides)
- [ ] Hover over each of the charts to see additional information
- [ ] Toggle between visualizations of the various featured foods on the last slide

Additionally, this project will include:

- [ ] A sidebar of scrollable text providing some context and highlights about the food featured in a given visualization
- [ ] A production README


## <a name="wireframes"></a> Wireframes



## <a name="technologies"></a> Architecture and technologies

The project will be completed using the following technologies:

* `JavaScript` (specifically the Intersection Observer API) for scrolling logic
* `D3.js` for data visualization
* `Webpack` for bundling JS files

<!-- The project will include the following files:

* 
* 
*  -->

## <a name="timeline"></a> Implementation timeline

**Day 1**: Setup necessary Node modules and get the entry file running correctly with Webpack. Learn how the Intersection Observer API works and set up the skeleton for the scroller. Goals for the day:

* Get a working entry file with all necessary Node modules bundled
* Have the logic for the basic scroller working

**Day 2**: Learn enough D3.js to create an attractive visualization. Get started creating one chart with real nutrition data. Organize / gather the necessary nutrition data to make all the visualizations you're planning. Goals for the day:

* Create an operational visualization similar in structure and rough appearance to the final intended chart
* Gather and organize all the data necessary for the entire scroller

**Day 3**: Write the necessary logic for integrating the visualizations into the scroller and creating transitions between them. Write the draft text to accompany each visualization. Goal for the day:

* Create a basic, functional but unstyled version of the scrolling visualizations

**Day 4**: Style the visualizations, including colors, a nice font, and hover effects. Goal for the day:

* Get 90% of the styling completed for the scroller

**Day 5**: Create the final slide with the toggle-able version of the visualization with a dropdown for choosing which food's nutrition facts to display.

* Have a polished version of the scroller complete


## <a name="bonus"></a> Bonus features

The scroller could potentially integrate a number of additional features, including:

- [ ] Multiple types of visualization for each food
- [ ] A visualization showing the nutrition facts of various foods on the same chart