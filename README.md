# Brain Food

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