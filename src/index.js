import './styles/index.scss';

let newBox;

window.addEventListener("load", (e) => {
    newBox = document.querySelector("#new-box");

    createObserver();
}, false);

const createObserver = () => {
    let observer;
    
    let options = {
      root: null,
      rootMargin: "0px 0px 0px 0px",
      threshold: 0.25
    };

    observer = new IntersectionObserver(handleScrollOnto, options);
    observer.observe(newBox);
}

const handleScrollOnto = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.visibility = "visible";
        }
    })
}


