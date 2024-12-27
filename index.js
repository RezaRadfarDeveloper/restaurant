import "./sass/main.scss";
const slides = document.querySelectorAll(".testimonials__box");
const slidesCount = slides.length;
let currSlide = 0;
let oldActiveSlide = 0;

const lArrow = document.querySelector(".testimonials__arrow--left");
const rArrow = document.querySelector(".testimonials__arrow--right");

const setArrowsColor = (currSlide, number) => {
  lArrow.classList.remove(`testimonials__box--${currSlide + 1}`);
  rArrow.classList.remove(`testimonials__box--${currSlide + 1}`);
  lArrow.classList.add(`testimonials__box--${number + 1}`);
  rArrow.classList.add(`testimonials__box--${number + 1}`);
  // rArrow.classList.add(`testimonials__box--${currSlide}`);
};

function goToSlide(number) {
  setArrowsColor(oldActiveSlide, number);
  currSlide = number;
  slides.forEach((s, i) => {
    if (i !== number)
      s.style.transform = `translate(${
        (i - number) * 100 - 50
      }%, -50%) scale(0.6)`;
    else
      s.style.transform = `translate(${
        (i - number) * 100 - 50
      }%, -50%) scale(1)`;
    //TBC ....***
  });
}
const dashesContainer = document.querySelector(".testimonials__dashes");

slides.forEach((dash, i) => {
  dashesContainer.insertAdjacentHTML(
    "beforeend",
    `<span class="dash" data-slide="${i}"></span>`
  );
});

function activateDash(number) {
  document.querySelectorAll(".dash").forEach((dash) => {
    dash.classList.remove("active");
  });
  document
    .querySelector(`.dash[data-slide='${number}']`)
    .classList.add("active");
}

goToSlide(0);
activateDash(0);

const nextSlide = function () {
  oldActiveSlide = currSlide;
  currSlide++;
  if (currSlide > slidesCount - 1) currSlide = 0;

  goToSlide(currSlide);
  activateDash(currSlide);
};

const prevSlide = function () {
  oldActiveSlide = currSlide;
  currSlide--;
  if (currSlide < 0) currSlide = slidesCount - 1;

  goToSlide(currSlide);
  activateDash(currSlide);
};
rArrow.addEventListener("click", nextSlide);

lArrow.addEventListener("click", prevSlide);

dashesContainer.addEventListener("click", function (e) {
  if (e.target.classList.contains("dash")) {
    const slideNum = parseInt(e.target.dataset.slide);
    oldActiveSlide = currSlide;
    goToSlide(slideNum);
    activateDash(slideNum);
  }
});
// revealing features ....

const options = {
  root: null,
  threshold: 0.25,
};

function revealSection(entries, observer) {
  entries.forEach((entry, i) => {
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
