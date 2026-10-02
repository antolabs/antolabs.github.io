document.addEventListener("DOMContentLoaded", () => {
  // Expose the existing image zoom to keyboard users as well as touch/mouse.
  document.querySelectorAll(".project-body img[data-zoomable]").forEach((image) => {
    image.tabIndex = 0;
    image.setAttribute("role", "button");
    image.setAttribute("aria-label", `Enlarge figure: ${image.alt || image.title}`);
    image.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        image.click();
      }
    });
  });

  const animations = document.querySelectorAll("video[data-project-animation]");
  if (!animations.length) return;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (!reducedMotion.matches) {
    animations.forEach((video) => {
      // Native controls remain available if the browser blocks autoplay.
      video.play().catch(() => {});
    });
  }
  reducedMotion.addEventListener("change", (event) => {
    if (event.matches) animations.forEach((video) => video.pause());
  });
});
