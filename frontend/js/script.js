const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", function () {
        navLinks.classList.toggle("show");
        const isOpen = navLinks.classList.contains("show");
        menuToggle.setAttribute("aria-expanded", isOpen);
        menuToggle.textContent = isOpen ? "✕" : "☰";
    });
}

document.querySelectorAll(".nav-links a").forEach(function(link) {
    link.addEventListener("click", function() {
        if (navLinks) {
            navLinks.classList.remove("show");
            menuToggle.textContent = "☰";
            menuToggle.setAttribute("aria-expanded", "false");
        }
    });
});
