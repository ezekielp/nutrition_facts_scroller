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


