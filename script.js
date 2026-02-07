const square = document.getElementById("square");
const circle = document.getElementById("circle");
const button = document.getElementById("animateBtn");

let active = false;

button.addEventListener("click", () => {
  active = !active;

  square.classList.toggle("grow", active);
  circle.classList.toggle("pulse", active);
});
