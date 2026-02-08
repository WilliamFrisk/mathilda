const noButton = document.querySelector(".no");
const yesButton = document.querySelector(".yes");
const seal = document.querySelector(".seal");
const modal = document.querySelector(".modal");

const step = 20; // how far to move per trigger
const offset = 80; // trigger distance
let lastMoveTime = 0;
const cooldown = 50; // milliseconds

yesButton.addEventListener("click", () => {
  seal.classList.add("zoom");

  setTimeout(() => {
    seal.classList.add("love");
  }, 400);

  setTimeout(() => {
    modal.classList.add("show");
  }, 1600);

  setTimeout(() => {
    seal.classList.remove("love", "zoom");
  }, 2000);
});

// initialize fixed position
const rect = noButton.getBoundingClientRect();
noButton.style.left = `50.5%`;
noButton.style.top = `56.35%`;
noButton.style.position = "fixed";
noButton.style.transition = "left 0.1s ease, top 0.1s ease";

noButton.addEventListener("click", () => {
  seal.classList.add("sad");

  setTimeout(() => {
    seal.classList.remove("sad");
  }, 2000);
});

document.addEventListener("mousemove", (e) => {
  const now = Date.now();
  if (now - lastMoveTime < cooldown) return; // throttle
  lastMoveTime = now;

  const rect = noButton.getBoundingClientRect();
  const mouseX = e.clientX;
  const mouseY = e.clientY;

  // if mouse is near
  if (
    mouseX > rect.left - offset &&
    mouseX < rect.right + offset &&
    mouseY > rect.top - offset &&
    mouseY < rect.bottom + offset
  ) {
    // vector from mouse to button
    let dx = rect.left + rect.width / 2 - mouseX;
    let dy = rect.top + rect.height / 2 - mouseY;

    // normalize and apply step
    const distance = Math.sqrt(dx * dx + dy * dy) || 1;
    dx = (dx / distance) * step;
    dy = (dy / distance) * step;

    // new position
    let newX = rect.left + dx;
    let newY = rect.top + dy;

    // clamp inside viewport
    const maxX = window.innerWidth - rect.width;
    const maxY = window.innerHeight - rect.height;
    newX = Math.max(0, Math.min(newX, maxX));
    newY = Math.max(0, Math.min(newY, maxY));

    // move button
    noButton.style.left = `${newX}px`;
    noButton.style.top = `${newY}px`;
  }
});
