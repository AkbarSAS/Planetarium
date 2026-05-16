// Get the Back to Top button element
const btn = document.getElementById("backToTop");

// Show button only after user scrolls down 300px, hide at top
window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
        btn.style.display = "flex";
    } else {
        btn.style.display = "none";
    }
});

// When the button is clicked, scroll smoothly to top
btn.onclick = () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
};

// Select all stat numbers across planet pages
const statNums = document.querySelectorAll(".stat-num");

// IntersectionObserver triggers the count-up of numbers when a stat comes into view
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        const el = entry.target;

        // Extract the numeric value handling the minus sign on negative numbers
        const target = parseFloat(el.textContent.replace("−", "-"));
        // Extract any suffix after the number
        const suffix = el.textContent.replace(/[−\d.]+/, "");

        // Record the start time for the animation
        const start = performance.now();

        // Smoothly count up using requestAnimationFrame
        const update = (now) => {
            const progress = Math.min((now - start) / 1500, 1);
            const eased = progress < 0.5 ? 2 * progress * progress : 1 - Math.pow(-2 * progress + 2, 2) / 2;
            el.textContent = (target * eased).toFixed(1).replace(".0", "") + suffix;
            if (progress < 1) requestAnimationFrame(update);
        };

        requestAnimationFrame(update);
        // Stop observing once the animation has played
        observer.unobserve(el);
    });

// Trigger when at least 50% of the element is visible
}, { threshold: 0.5 });

statNums.forEach(el => observer.observe(el));