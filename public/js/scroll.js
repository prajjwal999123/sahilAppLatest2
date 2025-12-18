document.addEventListener("DOMContentLoaded", function() {
    const header = document.querySelector("header");

    window.addEventListener("scroll", function() {
        if (window.scrollY > 50) { // Adjust this value to control when the header becomes opaque
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    });
});
