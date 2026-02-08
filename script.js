const noButton = document.querySelector(".no");
const step = 20; // how far to move per trigger
const offset = 80; // trigger distance
let lastMoveTime = 0;
const cooldown = 50; // milliseconds

// initialize fixed position
const rect = noButton.getBoundingClientRect();
noButton.style.left = `${rect.left}px`;
noButton.style.top = `54.4%`;
noButton.style.position = "fixed";
noButton.style.transition = "left 0.1s ease, top 0.1s ease";

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
