// DOM ELEMENTS
const carousel = document.querySelector(".carousel"),
  main = document.querySelector("main"),
  firstCard = document.querySelector(".card"),
  leftArrow = document.querySelector(".left-nav"),
  rightArrow = document.querySelector(".right-nav");
// DOM ELEMENTS END

// INiCIAL SETUP
let swipe = false,
  inicialX,
  startScrollLeft,
  deviceType;
const events = {
  mouse: {
    start: "mousedown",
    end: "mouseup",
    move: "mousemove",
  },
  touch: {
    start: "touchstart",
    end: "touchend",
    move: "touchmove",
  },
};
hideLeftArrow();
checkDeviceType();
// INiCIAL SETUP END

// EVENTS
carousel.addEventListener(events[deviceType].start, startDragging);
carousel.addEventListener(events[deviceType].end, endDragging);
carousel.addEventListener(events[deviceType].move, dragging);
carousel.addEventListener("scroll", checkArrows);
rightArrow.addEventListener("click", scrollToRight);
leftArrow.addEventListener("click", scrollToLeft);
// EVENTS END

//FUNCTIONS
function checkDeviceType() {
  try {
    document.createEvent("TouchEvent");

    deviceType = "touch";
  } catch (e) {
    deviceType = "mouse";
  }
}
function startDragging(e) {
  allowSwiping();
  inicialX = deviceType == "mouse" ? e.pageX : e.touches[0].pageX;
  startScrollLeft = carousel.scrollLeft;
}
function dragging(e) {
  if (!swipe) return;
  main.classList.add("dragging");
  let newX = deviceType == "mouse" ? e.pageX : e.touches[0].pageX;
  carousel.scrollLeft = startScrollLeft - getCursorMovedSpace(newX);
}
function endDragging() {
  disableSwiping();
  main.classList.remove("dragging");
}

function availableScrollRight() {
  const rightCarouselGap = 50;
  return (
    carousel.scrollWidth - carousel.scrollLeft >
    carousel.clientWidth + rightCarouselGap
  );
}

function availableScrollLeft() {
  return carousel.scrollLeft >= firstCard.scrollWidth;
}

function getCursorMovedSpace(newX) {
  return newX - inicialX;
}

function allowSwiping() {
  swipe = true;
}
function disableSwiping() {
  swipe = false;
}

function scrollToLeft() {
  carousel.scroll({
    left: carousel.scrollLeft - firstCard.offsetWidth,
    behavior: "smooth",
  });
}

function scrollToRight() {
  carousel.scroll({
    left: carousel.scrollLeft + firstCard.offsetWidth,
    behavior: "smooth",
  });
}

function hideLeftArrow() {
  leftArrow.style.display = "none";
}

function checkArrows() {
  availableScrollRight()
    ? (rightArrow.style.display = "flex")
    : (rightArrow.style.display = "none");

  availableScrollLeft()
    ? (leftArrow.style.display = "flex")
    : (leftArrow.style.display = "none");
}
//FUNCTIONS END
