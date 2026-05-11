/* ------------------------------------------------------------
   1. SCROLL PROGRESS BAR
   ------------------------------------------------------------ */

if (document.body.dataset.progress === "true") {
  const progressBar = document.createElement("div");
  progressBar.classList.add("scroll-progress-bar");
  document.body.prepend(progressBar);

  window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / docHeight) * 100;
    progressBar.style.width = progress + "%";
  });
}

/* ------------------------------------------------------------
   2. SCROLL ANIMATIONS — INTERSECTION OBSERVER
   ------------------------------------------------------------ */

const animatedElements = document.querySelectorAll(".animate");

const observerOptions = {
  root: null,
  rootMargin: "0px 0px -60px 0px",
  threshold: 0.1,
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const parent = entry.target.parentElement;
      const siblings = Array.from(parent.children);
      const cols = getComputedStyle(parent).gridTemplateColumns.split(" ").length;
      const index = siblings.indexOf(entry.target) % cols;
      entry.target.style.transitionDelay = index * 0.1 + "s";
      entry.target.classList.add("in-view");
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

animatedElements.forEach((el) => {
  observer.observe(el);
});
