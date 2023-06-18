const rangerSlider = document.querySelector("input");
const container = document.querySelector(".container");

rangerSlider.oninput = (e) => {
  container.style.setProperty("--position", `${e.target.value}%`);
};
