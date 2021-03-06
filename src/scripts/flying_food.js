    const addAllFlyingFoodListeners = () => {

        let foodCounters = {};

        const addFlyingFoodListener = idx => {
            let foodIcon = document.getElementById(`food-svg-container-${idx}`);

            let justClicked = false;
            
            const flyingFoodClickCallback = e => {
                if (justClicked) {
                } else {
                    foodIcon.classList.remove("flying-food-click-enabled");
                    foodIcon.classList.add("flying-food-click-disabled");
                    document.getElementById(`click-bubble-${idx}`).classList.remove("show");

                let foodChildren = foodIcon.childNodes;

                window.setTimeout(() => {
                    if (foodChildren[3]) {
                        for (let i = 0; i < 30; i++) {
                            foodIcon.removeChild(foodChildren[3]);
                        }
                    }
                }, 2000);

                let movementFunc = newFood => {
                    let start = null;

                    let signedOnes = [-1, 1];
                    let randomIdx = Math.floor(Math.random() * 2);
                    let randomlySignedOne = signedOnes[randomIdx];

                    const step = timestamp => {
                        if (!start) start = timestamp;
                        let progress = timestamp - start;
                        newFood.style.transform = "translate(" + (progress * randomlySignedOne) + "px, " + progress + "px)";
                        if (progress < 2500) {
                            window.requestAnimationFrame(step);
                        }
                    };

                    window.requestAnimationFrame(step);
                };

                for (let i = foodCounters[idx]; i < foodCounters[idx] + 30; i++) {
                    let newFood = document.createElement("div");
                    newFood.setAttribute("id", `flying-food-of-type-${idx}-${i}`);
                    newFood.classList.add(`flying-food-${idx}`);
                    newFood.classList.add(`flying-food`);
                    foodIcon.appendChild(newFood);

                    let thisOneParticularFood = document.getElementById(
                        `flying-food-of-type-${idx}-${i}`
                    );
                    thisOneParticularFood.style.top = (Math.random() * -300) + window.scrollY + "px";
                    thisOneParticularFood.style.left =
                        Math.floor(Math.random() * window.innerWidth) + "px";

                    movementFunc(thisOneParticularFood);
                }

                foodCounters[idx] += 10;

                justClicked = true;
                window.setTimeout(() => {
                    justClicked = false;
                    foodIcon.classList.remove("flying-food-click-disabled");
                    foodIcon.classList.add("flying-food-click-enabled");
                }, 2000);
                }
            }

            foodIcon.addEventListener("click", flyingFoodClickCallback);

        };

        for (let i = 0; i < 18; i++) {
            foodCounters[i] = 0;
            addFlyingFoodListener(i);
        }



    }

    export default addAllFlyingFoodListeners;