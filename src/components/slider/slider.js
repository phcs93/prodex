document.addEventListener("DOMContentLoaded", async () => {

    document.querySelectorAll("div.slider > div").forEach(slider => {

        const options = {
            root: slider,
            rootMargin: "0px",
            threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]
        };

        const callback = (elements, o) => {
            elements.forEach(e => {
                const ratio = e.intersectionRatio;
                e.target.style.setProperty('--opacity', ratio > 0.1 ? ratio : 0.1);
            });
        };
        
        const observer = new IntersectionObserver(callback, options);

        slider.querySelectorAll("&>div").forEach(e => {
            observer.observe(e);
        });    

    });

});