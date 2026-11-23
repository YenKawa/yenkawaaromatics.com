const menuDialog = document.querySelector("#site-menu");
const menuOpen = document.querySelector("[data-menu-open]");
const menuClose = document.querySelector("[data-menu-close]");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
let closeTimer;
let openingFrame;
let menuClosing = false;

const finishClose = () => {
  window.clearTimeout(closeTimer);
  menuDialog.close();
};

const closeMenu = () => {
  if (!menuDialog.open || menuClosing) return;
  menuClosing = true;
  window.cancelAnimationFrame(openingFrame);
  menuDialog.classList.remove("is-open");
  document.body.classList.remove("menu-open");
  menuOpen.setAttribute("aria-expanded", "false");
  if (reduceMotion.matches) {
    finishClose();
  } else {
    closeTimer = window.setTimeout(finishClose, 320);
  }
};

menuOpen.addEventListener("click", () => {
  if (menuDialog.open) return;
  menuClosing = false;
  menuDialog.showModal();
  menuOpen.setAttribute("aria-expanded", "true");
  document.body.classList.add("menu-open");
  openingFrame = window.requestAnimationFrame(() => {
    openingFrame = window.requestAnimationFrame(() => {
      if (!menuClosing) menuDialog.classList.add("is-open");
    });
  });
});

menuClose.addEventListener("click", closeMenu);
menuDialog.addEventListener("cancel", (event) => {
  event.preventDefault();
  closeMenu();
});
menuDialog.addEventListener("click", (event) => {
  if (event.target === menuDialog) closeMenu();
});
menuDialog.addEventListener("close", () => {
  window.clearTimeout(closeTimer);
  window.cancelAnimationFrame(openingFrame);
  menuClosing = false;
  menuDialog.classList.remove("is-open");
  document.body.classList.remove("menu-open");
  menuOpen.setAttribute("aria-expanded", "false");
  menuOpen.focus({ preventScroll: true });
});

menuOpen.hidden = false;