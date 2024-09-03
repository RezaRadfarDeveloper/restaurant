console.log(" index works");

const slides = document.querySelectorAll(".testimonials__box");
const slidesCount = slides.length;
let currSlide = 0;
goToSlide(0);

function goToSlide(number) {
  slides.forEach((s, i) => {
    if (i !== number)
      s.style.transform = `translate(${
        (i - number) * 100 - 50
      }%, -50%) scale(0.6)`;
    else
      s.style.transform = `translate(${
        (i - number) * 100 - 50
      }%, -50%) scale(1)`;
  });
}

const lArrow = document.querySelector(".testimonials__arrow--left");
const rArrow = document.querySelector(".testimonials__arrow--right");

console.log(lArrow);

const nextSlide = function () {
  currSlide++;
  if (currSlide > slidesCount - 1) currSlide = 0;

  goToSlide(currSlide);
};

const prevSlide = function () {
  currSlide--;
  if (currSlide < 0) currSlide = slidesCount - 1;

  goToSlide(currSlide);
};
rArrow.addEventListener("click", nextSlide);

lArrow.addEventListener("click", prevSlide);

const options = {
  root: null,
  threshold: 0.25,
};

function revealSection(entries, observer) {
  entries.forEach((entry, i) => {
    console.log(entry);
    if (entry.isIntersecting) {
      entry.target.classList.add("revealed");
      observer.unobserve(entry.target);
    }
  });
}

const featureElements = document.querySelectorAll(".feature");
const featureObs = new IntersectionObserver(revealSection, options);

featureElements.forEach((feature) => {
  featureObs.observe(feature);
});
