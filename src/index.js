import './styles/index.scss';

let redBox, blueBox;

window.addEventListener("load", (e) => {
    redBox = document.querySelector("#red-box");
    blueBox = document.querySelector("#blue-box");

    createObserver();
}, false);

const createObserver = () => {
    let observer;
    
    let options = {
      root: null,
      rootMargin: "0px 0px 0px 0px",
      threshold: .50
    };

    observer = new IntersectionObserver(handleScrollOnto, options);
    observer.observe(redBox);
    observer.observe(blueBox);
}

const handleScrollOnto = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "100%";
            entry.target.style.transform = "translateX(0%)";
            // entry.target.style.visibility = "visible";
        } else {
            entry.target.style.opacity = "0%";
            // entry.target.style.visibility = "hidden";
            entry.target.style.transform = "translateX(150%)";
        }
    })
}

let nutritionData;

d3.csv("nutrition_facts_for_scroller.csv", d => {
    return {
      food_name: d["Food name"],
      serving_size: d["Amount"],
      fiber: +d["Fiber"],
      iron: +d["Iron"],
      magnesium: +d["Magnesium"],
      potassium: +d["Potassium"],
      zinc: +d["Zinc"],
      vitamin_c: +d["Vitamin C"],
      folate: +d["Folate"],
      vitamin_b12: +d["Vitamin B-12"],
      vitamin_a: +d["Vitamin A"],
      vitamin_d: +d["Vitamin D"],
      cholesterol: +d["Cholesterol"]
    };
}).then(data => {
    nutritionData = data;
    // console.log(nutritionData);
});

const createVisualization = () => {
    let w = 600;
    let h = 500;

}

