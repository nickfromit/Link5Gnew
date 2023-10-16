var items = null;
var currentIndex = 0;
var itemSize = 0;
var canChangeSlide = true;
var largeurEcran = 0;

function resizeDiv() {
  var slider = document.querySelector(".slider");
  largeurEcran = slider.getBoundingClientRect().width;
  items.forEach((element) => {
    itemSize = largeurEcran / 6;
    element.style.minWidth = itemSize * 4 + "px";
  });
}

function initSlider() {
  var size = itemSize;
  items[0].style.marginLeft = size + "px";
  items[0].style.transform = "rotateY(0)";
  items[items.length - 1].style.marginRight = size * 4 + "px";
  rotateAroundSlide(currentIndex);
  changeBackground();
}

function resetSlider() {
  currentIndex = 0;
  var slider = document.querySelector(".slider");
  slider.scrollLeft = 0;
}

function changeBackground() {
  var movies = document.querySelector(".movies");
  var image = items[currentIndex].querySelector("img").src;
  movies.style.backgroundImage =
    'linear-gradient(to bottom, rgba(20, 22, 31, 0) 0%, rgba(20, 22, 31, 1) 75%, rgba(20, 22, 31, 1) 100%), url("' +
    image +
    '")';
}

function rotateAroundSlide(index) {
  console.log(index);
  canChangeSlide = false;
  var slice = largeurEcran / 3;
  items[index].style.minWidth = slice * 2 + "px";
  items[index].style.animation = "spin 1s";

  if (index > 0) {
    items[index - 1].style.animation = "left 1s";
  }

  if (index < items.length - 1) {
    items[index + 1].style.animation = "right 1s";
  }
}

document.addEventListener("DOMContentLoaded", function () {
  items = document.querySelectorAll(".movie-card");
  slider = document.querySelector(".slider");
  resizeDiv();
  console.log(items);
  initSlider();
  items.forEach((element, index) => {
    element.addEventListener("animationend", () => {
      if (index == currentIndex) {
        element.style.transform = "rotateY(0deg)";
        element.style.animation = "";
      }

      if (index == currentIndex + 1) {
        element.style.transform = "rotateY(-40deg) scale(0.85)";
        element.style.animation = "";
        element.style.padding = 0;
      }

      if (index == currentIndex - 1) {
        element.style.transform = "rotateY(40deg) scale(0.85)";
        element.style.animation = "";
        element.style.padding = 0;
      }

      canChangeSlide = true;
    });
  });

  var nextButton = document.querySelector("#next");
  var previousButton = document.querySelector("#previous");

  nextButton.addEventListener("click", () => {
    if (currentIndex < items.length - 1 && canChangeSlide) {
      slider.scrollLeft += itemSize * 4;
      currentIndex += 1;

      rotateAroundSlide(currentIndex);
      changeBackground();
    }
  });

  previousButton.addEventListener("click", () => {
    if (currentIndex > 0 && canChangeSlide) {
      slider.scrollLeft -= itemSize * 4;
      currentIndex -= 1;
      rotateAroundSlide(currentIndex);
      changeBackground();
    }
  });
});

window.addEventListener("resize", function () {
  resizeDiv();
  initSlider();
  resetSlider();
});