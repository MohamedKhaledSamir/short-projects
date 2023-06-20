const carousel = document.querySelector(".carousel"),
  main = document.querySelector("main"),
  firstCard = document.querySelector(".card"),
  leftNav = document.querySelector(".left-nav"),
  rightNav = document.querySelector(".right-nav");
let swipe = false,
  incialX,
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

//By default no left nav arrow
leftNav.style.display = "none";
//By default no left nav arrow

checkDeviceType();
carousel.addEventListener(events[deviceType].start, startDragging);
carousel.addEventListener(events[deviceType].end, endDragging);
carousel.addEventListener(events[deviceType].move, dragging);
carousel.addEventListener("scroll", () => {
  const remainingScrollRight = 50;

  //check if there's no more right scroll space
  carousel.scrollWidth - carousel.scrollLeft <=
  carousel.clientWidth + remainingScrollRight
    ? (rightNav.style.display = "none")
    : (rightNav.style.display = "flex");

  //check if there's no more left scroll space
  carousel.scrollLeft < firstCard.scrollWidth
    ? (leftNav.style.display = "none")
    : (leftNav.style.display = "flex");
});

rightNav.addEventListener("click", () => {
  carousel.scrollLeft += firstCard.offsetWidth;
});
leftNav.addEventListener("click", () => {
  carousel.scrollLeft -= firstCard.offsetWidth;
});

/*FUNCTIONS*/
function checkDeviceType() {
  try {
    document.createEvent("TouchEvent");

    deviceType = "touch";
  } catch (e) {
    deviceType = "mouse";
  }
}
function startDragging(e) {
  swipe = true;
  incialX = deviceType == "mouse" ? e.pageX : e.touches[0].pageX;
  startScrollLeft = carousel.scrollLeft;
}
function dragging(e) {
  if (!swipe) return;

  let newX = deviceType == "mouse" ? e.pageX : e.touches[0].pageX;
  main.classList.add("dragging");
  carousel.scrollLeft = startScrollLeft - (newX - incialX);
}
function endDragging() {
  swipe = false;
  main.classList.remove("dragging");
}
